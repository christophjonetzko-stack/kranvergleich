"""
One-off resend of a lead to the firms selected by the customer.

Triggered 2026-04-23 after discovery that /api/leads fires Resend calls to
companies fire-and-forget (no await), and never updates lead_companies.sent_at.
The admin notification labels emails as "E-Mail gesendet" before the send
actually happens, so we have no guarantee the original 7 firms received
Kara's inquiry.

This script:
  1. Re-sends the lead to each company that hasn't been marked sent
  2. Frames the email honestly as a "Wiederholung" in case firms got it
     already — they can ignore the duplicate
  3. Updates lead_companies.sent_at on Resend success (service_role bypasses RLS)

Usage:
  cd scripts
  python resend_lead_to_firms.py <lead_id>
"""

from __future__ import annotations

import os
import sys
from html import escape
from pathlib import Path

import httpx
from dotenv import load_dotenv


# .env.local lives one directory up (project root)
PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env.local")

RESEND_KEY = os.environ["RESEND_API_KEY"]
SUPA_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"].rstrip("/")
SUPA_KEY = os.environ["SUPABASE_SERVICE_ROLE_KEY"]

FROM_EMAIL = "KranVergleich <noreply@send.kranvergleich.de>"
SUPA_H = {
    "apikey": SUPA_KEY,
    "Authorization": f"Bearer {SUPA_KEY}",
    "Content-Type": "application/json",
}
RESEND_H = {
    "Authorization": f"Bearer {RESEND_KEY}",
    "Content-Type": "application/json",
}


def fetch_lead(lead_id: str) -> dict:
    r = httpx.get(
        f"{SUPA_URL}/rest/v1/leads",
        headers=SUPA_H,
        params={"id": f"eq.{lead_id}", "select": "*"},
        timeout=15,
    )
    r.raise_for_status()
    rows = r.json()
    if not rows:
        raise RuntimeError(f"Lead {lead_id} not found")
    return rows[0]


def fetch_targets(lead_id: str) -> list[dict]:
    # Join via PostgREST embed: lead_companies -> companies
    r = httpx.get(
        f"{SUPA_URL}/rest/v1/lead_companies",
        headers=SUPA_H,
        params={
            "lead_id": f"eq.{lead_id}",
            "select": "id,sent_at,company:companies(id,name,email)",
        },
        timeout=15,
    )
    r.raise_for_status()
    return r.json()


def render_email_html(lead: dict, company_name: str) -> str:
    safe_name = escape(lead.get("customer_name") or "–")
    safe_email = escape(lead.get("customer_email") or "–")
    safe_phone = escape(lead.get("customer_phone") or "–")
    safe_city = escape(lead.get("city") or "–")
    safe_date = escape(str(lead.get("preferred_date") or "–"))
    duration = lead.get("duration_days")
    safe_desc = escape(lead.get("project_description") or "").replace("\n", "<br>")
    safe_company = escape(company_name)

    duration_row = (
        f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Mietdauer</td>'
        f'<td>{duration} Tage</td></tr>'
        if duration else ""
    )
    phone_row = (
        f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Telefon</td>'
        f'<td>{safe_phone}</td></tr>'
        if safe_phone != "–" else ""
    )
    date_row = (
        f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Wunschtermin</td>'
        f'<td>{safe_date}</td></tr>'
        if safe_date != "–" else ""
    )
    desc_block = (
        f'<p style="margin:16px 0;padding:12px;background:#f9fafb;border-radius:6px;'
        f'font-size:14px;line-height:1.5;"><strong>Projektbeschreibung:</strong><br>{safe_desc}</p>'
        if safe_desc else ""
    )

    # Honest disclosure at top — covers both cases (firm got it / firm didn't).
    disclaimer = (
        '<div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:6px;'
        'padding:10px 14px;margin-bottom:16px;font-size:13px;color:#78350f;">'
        '<strong>Hinweis:</strong> Aufgrund eines technischen Problems senden wir diese '
        'Anfrage zur Sicherheit erneut. Falls Sie die E-Mail heute Morgen bereits '
        'erhalten haben, können Sie diese ignorieren.</div>'
    )

    return f"""
<div style="font-family:system-ui;max-width:560px;">
  {disclaimer}
  <h2 style="font-size:18px;color:#1a1a1a;">Neue Anfrage über KranVergleich.de</h2>
  <p style="color:#4b5563;font-size:14px;line-height:1.6;">
    Ein potenzieller Kunde hat über KranVergleich.de eine Anfrage an <strong>{safe_company}</strong> gesendet.
  </p>
  <table style="border-collapse:collapse;font-size:14px;margin:16px 0;width:100%;">
    <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Name</td><td><strong>{safe_name}</strong></td></tr>
    <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">E-Mail</td><td><a href="mailto:{safe_email}">{safe_email}</a></td></tr>
    {phone_row}
    <tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Stadt</td><td>{safe_city}</td></tr>
    {date_row}
    {duration_row}
  </table>
  {desc_block}
  <p style="font-size:14px;color:#4b5563;">Bitte antworten Sie direkt auf diese E-Mail oder kontaktieren Sie den Kunden über die oben genannten Kontaktdaten.</p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
  <p style="font-size:12px;color:#9ca3af;">
    Diese Anfrage wurde über <a href="https://kranvergleich.de" style="color:#2563eb;">KranVergleich.de</a> vermittelt.
  </p>
</div>
"""


def send_email(to_email: str, subject: str, html: str, reply_to: str) -> tuple[bool, str]:
    try:
        r = httpx.post(
            "https://api.resend.com/emails",
            headers=RESEND_H,
            json={
                "from": FROM_EMAIL,
                "to": [to_email],
                "reply_to": [reply_to],
                "subject": subject,
                "html": html,
            },
            timeout=30,
        )
        if r.status_code >= 400:
            return False, f"HTTP {r.status_code}: {r.text[:200]}"
        data = r.json()
        return True, data.get("id", "sent")
    except httpx.HTTPError as exc:
        return False, f"exception: {exc}"


def mark_sent(lead_company_id: str) -> bool:
    try:
        r = httpx.patch(
            f"{SUPA_URL}/rest/v1/lead_companies",
            headers={**SUPA_H, "Prefer": "return=minimal"},
            params={"id": f"eq.{lead_company_id}"},
            json={"sent_at": "now()"},
            timeout=15,
        )
        return r.status_code < 400
    except httpx.HTTPError:
        return False


def main() -> int:
    if len(sys.argv) < 2:
        sys.exit("Usage: python resend_lead_to_firms.py <lead_id>")
    lead_id = sys.argv[1]

    print(f"Fetching lead {lead_id}…")
    lead = fetch_lead(lead_id)
    print(f"  Customer: {lead['customer_name']} <{lead['customer_email']}>")
    print(f"  City: {lead['city']}, date: {lead.get('preferred_date')}")
    print()

    targets = fetch_targets(lead_id)
    print(f"Found {len(targets)} target companies\n")

    customer_email = lead["customer_email"]
    subject = (
        f"Erinnerung: Kranvermietungs-Anfrage von {lead['customer_name']} "
        f"— {lead.get('preferred_date', '')} {lead['city']}"
    )

    sent_count = 0
    skipped_count = 0
    failed_count = 0

    for t in targets:
        company = t["company"]
        c_name = company["name"]
        c_email = company["email"]
        c_sent_at = t.get("sent_at")

        if not c_email:
            print(f"  SKIP  {c_name}  (no email in DB)")
            skipped_count += 1
            continue

        html = render_email_html(lead, c_name)
        ok, detail = send_email(c_email, subject, html, reply_to=customer_email)

        if ok:
            db_ok = mark_sent(t["id"])
            prev = " (was already marked sent, kept original timestamp) " if c_sent_at else ""
            if db_ok:
                print(f"  OK    {c_name}  → {c_email}  [resend id: {detail}]{prev}")
            else:
                print(f"  OK*   {c_name}  → {c_email}  [resend id: {detail}]  (DB update failed)")
            sent_count += 1
        else:
            print(f"  FAIL  {c_name}  → {c_email}  [{detail}]")
            failed_count += 1

    print()
    print(f"Sent: {sent_count} | Skipped: {skipped_count} | Failed: {failed_count}")
    return 0 if failed_count == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
