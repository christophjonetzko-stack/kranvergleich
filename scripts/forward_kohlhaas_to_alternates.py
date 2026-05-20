"""
Forward Georg Kohlhaas's lead (e979e6f3) to Kran-Burgard + BKL Frankfurt
AFTER he replies "Ja" to the opt-in mail.

Pre-flight: this script will REFUSE to send unless --confirm-ja is passed,
because forwarding without documented consent is a DSGVO Art. 6 violation
(see memory feedback_lead_reroute_dsgvo_optin). The --confirm-ja flag is
the documented checkpoint that Christoph confirms the consent reply exists.

What it does:
  1. Pulls fresh lead data from Supabase.
  2. Sends per-firm email to Kran-Burgard + BKL using the same template
     shape as /api/leads (no signal-back HMAC since this is manual flow —
     firms reply directly to christoph@kranvergleich.de which forwards
     to the customer).
  3. Backfills the lead's crane_type_id to Baukran since the original
     submission had crane_type_id=NULL (hero search without type pick).
     Forwarding to Baukran-firms is itself the implicit categorization,
     so the DB should reflect it for clean analytics + future audit trail.
  4. Inserts lead_companies row per firm with sent_at.
  5. Inserts firm_events.form_submit per firm for analytics consistency.
  6. Sends a confirmation to Kohlhaas stating the forward completed.

Run:
  python forward_kohlhaas_to_alternates.py                              # dry-run
  python forward_kohlhaas_to_alternates.py --firms 1 --confirm-ja --send  # only firm #1
  python forward_kohlhaas_to_alternates.py --firms 1,2 --confirm-ja --send  # both
"""
from __future__ import annotations

import argparse
import hashlib
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import httpx
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env.local")

sys.stdout.reconfigure(encoding="utf-8")

RESEND_KEY = os.environ["RESEND_API_KEY"]
SUPA_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"].rstrip("/")
SUPA_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

LEAD_ID = "e979e6f3-3b0e-45e9-96a5-c8cc8490b3d4"

# Baukran crane_type_id (from earlier check_lead_kohlhaas run). Used to
# backfill leads.crane_type_id before forwarding so analytics + future
# signal-back queries see the right category.
BAUKRAN_TYPE_ID = "f1f86ce7-14b8-48ce-9004-5db8dde53949"

# Pre-verified by WebFetch 2026-05-20: both firms have suitable
# Schnellbaukran / Mobilbaukran capacity for the 1.5 t @ 10 m @ 15-20 m
# Auslegerlänge / 60-day-rental profile.
ALT_FIRMS = [
    {
        "n": 1,
        "id": "4ad591df-ffa5-49c7-aa38-1d445f21352a",
        "name": "Kran-Burgard GmbH",
        "email": "info@kran-burgard.de",
        "distance_km": 59,
        "fit_note": "Liebherr MK88 im Mietpark (8 t / 32 m / 30 m Radius) — exakt passend.",
    },
    {
        "n": 2,
        "id": "716776bc-7103-437a-8d8c-b43c0b6152ae",
        "name": "BKL Baukran Logistik Frankfurt",
        "email": "info@bkl.de",
        "distance_km": 62,
        "fit_note": "Größter Mobilbaukran-Mietpark in DACH (30 Mobilbaukrane + 500 Turmdrehkrane).",
    },
]

FROM_EMAIL = "Christoph Jonetzko · KranVergleich.de <christoph@send.kranvergleich.de>"
FOUNDER_NAME = "Christoph Jonetzko"
FOUNDER_EMAIL = "christoph@kranvergleich.de"


def escape_html(s: str) -> str:
    return (
        s.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
        .replace("'", "&#39;")
    )


def supa_request(method: str, path: str, **kwargs) -> dict:
    headers = kwargs.pop("headers", {})
    headers.update({
        "apikey": SUPA_KEY,
        "Authorization": f"Bearer {SUPA_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    })
    r = httpx.request(method, f"{SUPA_URL}/rest/v1/{path}", headers=headers, timeout=15, **kwargs)
    if r.status_code >= 300:
        raise RuntimeError(f"Supabase {method} {path} → {r.status_code}: {r.text}")
    return r.json() if r.text else {}


def fetch_lead() -> dict:
    rows = supa_request("GET", f"leads?id=eq.{LEAD_ID}&select=*")
    if not rows:
        raise RuntimeError(f"Lead {LEAD_ID} not found")
    return rows[0]


def build_firm_email_html(lead: dict, firm_name: str) -> str:
    safe_name = escape_html(lead.get("customer_name") or "—")
    safe_email = escape_html(lead.get("customer_email") or "")
    safe_phone = escape_html(lead.get("customer_phone") or "—")
    safe_city = escape_html(lead.get("city") or "—")
    safe_date = escape_html(lead.get("preferred_date") or "—")
    safe_desc = escape_html(lead.get("project_description") or "")
    duration = lead.get("duration_days")
    duration_str = f"{duration} {'Tag' if duration == 1 else 'Tage'}" if duration else "—"

    return f"""
    <div style="font-family:system-ui;max-width:560px;">
      <h2 style="font-size:18px;color:#1a1a1a;">Kundenanfrage: Baukran · {safe_city} · {safe_date}</h2>
      <p style="color:#4b5563;font-size:14px;line-height:1.6;">
        Sehr geehrtes Team von <strong>{escape_html(firm_name)}</strong>,
      </p>
      <p style="color:#4b5563;font-size:14px;line-height:1.6;">
        ein Bauunternehmer sucht ein Angebot für eine 60-tägige Baukran-Vermietung
        in der Region Westerwald und hat ausdrücklich der Weitergabe seiner Daten
        an Ihre Firma zugestimmt. Bitte melden Sie sich direkt beim Kunden.
      </p>
      <p style="margin:16px 0;padding:12px;background:#f9fafb;border-radius:6px;font-size:14px;line-height:1.5;">
        <strong>Projektbeschreibung:</strong><br>{safe_desc}
      </p>
      <table style="border-collapse:collapse;font-size:14px;margin:16px 0;width:100%;">
        <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Krantyp</td><td><strong>Baukran (empfohlen, ursprünglich ohne Vorgabe — Schnellbaukran/Mobilbaukran-Profil)</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Name</td><td><strong>{safe_name}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">E-Mail</td><td><a href="mailto:{safe_email}">{safe_email}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Telefon</td><td>{safe_phone}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Stadt</td><td>{safe_city}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Wunschtermin</td><td>{safe_date}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Mietdauer</td><td>{duration_str}</td></tr>
      </table>
      <p style="margin:8px 0 16px 0;padding:8px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;font-size:12px;color:#4b5563;line-height:1.5;">
        <span style="color:#059669;">&#10003;</span> E-Mail-Adresse geprüft (Format + Domain-Check)
        &nbsp;&middot;&nbsp;
        <span style="color:#059669;">&#10003;</span> Telefonnummer geprüft (libphonenumber)
        &nbsp;&middot;&nbsp;
        <span style="color:#059669;">&#10003;</span> DSGVO-konforme Einwilligung zur Weiterleitung dokumentiert
      </p>
      <p style="font-size:14px;color:#4b5563;">
        Diese Anfrage haben wir nach Rücksprache mit dem Kunden manuell an Ihre Firma weitergeleitet,
        da im Auto-Match-Verfahren ohne Krantyp-Vorgabe kein passender Anbieter ausgewählt werden konnte.
        Spezifikation (1,5 t / 10 m / 15-20 m Auslegerlänge / 60 Tage) passt zu Ihrem Mobilbaukran-Profil.
        Bitte antworten Sie direkt auf diese E-Mail oder kontaktieren Sie den Kunden über die oben
        genannten Kontaktdaten.
      </p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
      <p style="font-size:14px;color:#374151;line-height:1.55;margin:0;">
        Mit freundlichen Grüßen<br>
        <strong>{FOUNDER_NAME}</strong><br>
        Gründer, KranVergleich.de<br>
        <a href="mailto:{FOUNDER_EMAIL}" style="color:#2563eb;">{FOUNDER_EMAIL}</a>
      </p>
    </div>
    """


def build_customer_confirm_html(lead: dict, firm_names: list[str]) -> str:
    safe_name = escape_html(lead.get("customer_name") or "")
    firm_list = "".join(f"<li><strong>{escape_html(n)}</strong></li>" for n in firm_names)
    return f"""
    <div style="font-family:system-ui;max-width:520px;">
      <h2 style="font-size:18px;">Ihre Anfrage wurde weitergeleitet</h2>
      <p style="color:#4b5563;font-size:14px;line-height:1.6;">
        Sehr geehrter Herr {safe_name},<br><br>
        wie von Ihnen bestätigt, haben wir Ihre Anfrage an die folgenden Anbieter weitergeleitet:
      </p>
      <ul style="font-size:14px;color:#1a1a1a;">{firm_list}</ul>
      <p style="color:#4b5563;font-size:14px;line-height:1.6;">
        Die Firmen werden sich in Kürze direkt bei Ihnen melden. Bei Fragen erreichen Sie mich unter
        <a href="mailto:{FOUNDER_EMAIL}">{FOUNDER_EMAIL}</a>.
      </p>
      <p style="font-size:13px;color:#9ca3af;margin-top:24px;">
        Mit freundlichen Grüßen<br>
        {FOUNDER_NAME}, Gründer KranVergleich.de
      </p>
    </div>
    """


def send_resend(payload: dict) -> str:
    r = httpx.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {RESEND_KEY}", "Content-Type": "application/json"},
        json=payload,
        timeout=20,
    )
    if r.status_code >= 300:
        raise RuntimeError(f"Resend → {r.status_code}: {r.text}")
    return r.json().get("id", "?")


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--confirm-ja", action="store_true",
                   help="Confirm Georg replied 'Ja' (required for --send)")
    p.add_argument("--firms", default="1,2",
                   help="Comma-separated firm numbers from the opt-in mail (e.g. '1', '2', '1,2')")
    p.add_argument("--send", action="store_true", help="Actually send via Resend + insert DB rows")
    args = p.parse_args()

    if args.send and not args.confirm_ja:
        print("❌ REFUSED: --send requires --confirm-ja flag.")
        print("   DSGVO Art. 6 — never forward without documented consent.")
        print("   Verify Georg replied 'Ja' to christoph@kranvergleich.de, then re-run with both flags.")
        sys.exit(2)

    selected_ns = {int(x.strip()) for x in args.firms.split(",") if x.strip()}
    selected_firms = [f for f in ALT_FIRMS if f["n"] in selected_ns]
    if not selected_firms:
        print(f"❌ No firms selected. --firms got '{args.firms}', valid options: 1, 2")
        sys.exit(2)

    lead = fetch_lead()

    print("=" * 70)
    print(f"Lead {LEAD_ID}")
    print("=" * 70)
    print(f"  Customer:   {lead.get('customer_name')}  ({lead.get('customer_email')}, {lead.get('customer_phone')})")
    print(f"  City:       {lead.get('city')}")
    print(f"  Date/days:  {lead.get('preferred_date')} / {lead.get('duration_days')}d")
    print(f"  Project:    {(lead.get('project_description') or '')[:120]}")
    print(f"  Crane_type: {lead.get('crane_type_id') or '(NULL — will backfill to Baukran)'}")
    print()
    print(f"Forwarding to {len(selected_firms)} firm(s):")
    for f in selected_firms:
        print(f"  #{f['n']} {f['name']}  ({f['email']})  ~{f['distance_km']} km")
        print(f"      {f['fit_note']}")
    print()

    if not args.send:
        print("=== DRY-RUN — preview of firm email (first selected) ===")
        print(build_firm_email_html(lead, selected_firms[0]["name"])[:500] + "...[truncated]")
        print()
        print("Dry run only. Re-run with --confirm-ja --send to dispatch.")
        return

    # 0) Backfill crane_type_id since the original submission had NULL
    if not lead.get("crane_type_id"):
        supa_request("PATCH", f"leads?id=eq.{LEAD_ID}",
                     json={"crane_type_id": BAUKRAN_TYPE_ID})
        print(f"  ✓ crane_type_id backfilled to Baukran ({BAUKRAN_TYPE_ID})")

    # 1) Firm emails — sequential with 200ms throttle to stay under Resend 5 req/s
    subject_parts = ["Baukran", lead.get("city"), lead.get("preferred_date")]
    firm_subject = "Neue Anfrage: " + " · ".join(p for p in subject_parts if p)

    sent_firms = []
    for f in selected_firms:
        html = build_firm_email_html(lead, f["name"])
        rid = send_resend({
            "from": FROM_EMAIL,
            "to": [f["email"]],
            "reply_to": lead.get("customer_email"),
            "subject": firm_subject,
            "html": html,
            "tags": [
                {"name": "lead_id", "value": LEAD_ID},
                {"name": "type", "value": "manual_forward"},
                {"name": "firm_id", "value": f["id"]},
            ],
        })
        print(f"  ✓ Sent to {f['name']}  resend_id={rid}")
        sent_firms.append(f)
        time.sleep(0.2)

    # 2) Insert lead_companies rows so the DB reflects the new dispatch
    now_iso = datetime.now(timezone.utc).isoformat()
    for f in sent_firms:
        existing = supa_request(
            "GET", f"lead_companies?lead_id=eq.{LEAD_ID}&company_id=eq.{f['id']}&select=id"
        )
        if existing:
            supa_request("PATCH", f"lead_companies?id=eq.{existing[0]['id']}",
                         json={"sent_at": now_iso})
        else:
            supa_request("POST", "lead_companies",
                         json={"lead_id": LEAD_ID, "company_id": f["id"], "sent_at": now_iso})
        print(f"  ✓ lead_companies row set for {f['name']}")

    # 3) firm_events form_submit per firm — analytics consistency w/ /api/leads
    event_date = now_iso[:10]
    ip_hash = hashlib.sha256(
        f"manual-forward|{event_date}|kranvergleich-firm-events-v1".encode()
    ).hexdigest()
    for f in sent_firms:
        try:
            supa_request("POST", "firm_events", json={
                "firm_id": f["id"],
                "event_type": "form_submit",
                "city_context": "heiligenroth",
                "type_context": "baukran",
                "ip_hash": ip_hash,
                "event_date": event_date,
            }, headers={"Prefer": "resolution=ignore-duplicates,return=minimal"})
            print(f"  ✓ firm_events form_submit logged for {f['name']}")
        except Exception as e:
            print(f"  ⚠ firm_events insert skipped for {f['name']}: {e}")

    # 4) Customer confirmation
    rid = send_resend({
        "from": FROM_EMAIL,
        "to": [lead.get("customer_email")],
        "reply_to": FOUNDER_EMAIL,
        "subject": "Ihre Anfrage bei KranVergleich.de — Weiterleitung bestätigt",
        "html": build_customer_confirm_html(lead, [f["name"] for f in sent_firms]),
        "tags": [
            {"name": "lead_id", "value": LEAD_ID},
            {"name": "type", "value": "forward_confirmation"},
        ],
    })
    print(f"\n  ✓ Customer confirmation sent  resend_id={rid}")
    print("\nDONE.")


if __name__ == "__main__":
    main()
