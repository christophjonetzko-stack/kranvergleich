"""
Test the rewritten /api/leads firm-notification template (2026-05-12) by
sending one mail to Christoph's gmail using Kara's exact lead data — which
is the perfect test because it carries the same crane-type mismatch
(DB: Ladekran, body: "Autokran") that 4K-Vierke Bau read as a portal pitch.

The template logic is duplicated here intentionally — we don't ship to
production until Christoph confirms the new framing reads as customer-led.
Once approved, /api/leads in route.ts already uses the same shape.
"""
from __future__ import annotations

import html
import os
import re
import sys
from pathlib import Path
import httpx
from dotenv import load_dotenv

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env.local")
RESEND_KEY = os.environ["RESEND_API_KEY"]

FROM_EMAIL = "Christoph Jonetzko <christoph@send.kranvergleich.de>"
TO_EMAIL = "christoph.jonetzko@gmail.com"
BRAND_NAME = "KranVergleich.de"
BASE_URL = "https://kranvergleich.de"

# Kara's lead 2026-04-23 — exact data so the test mail looks like what
# 4K-Vierke Bau would have received under the new template
LEAD = {
    "crane_type_id": "ladekran-id",  # selected
    "crane_type_name": "Ladekran",
    "customer_name": "Kara",
    "customer_email": "info@hanseatichaus.de",
    "customer_phone": "016096948766",
    "city": "Berlin",
    "preferred_date": "2026-04-27",
    "duration_days": 1,
    "project_description": (
        "Sehr geehrte Damen und Herren,\n\n"
        "wir möchten für Montagvormittag, den 27.04.2026, einen Autokran, der "
        "uns die Fensterpaletten aufs Dach, ca 22 m, hoch hebt. Die Paletten "
        "sind max 1,5 Tonnen schwer. Der Kran kann auf unserem Grundstück "
        "stehen.\n\nVielen Dank im Voraus."
    ),
}
# No "(TEST)" suffix — production /api/leads now defensively skips any firm
# whose companies.name matches /\(test\)/i, so a test send that included the
# marker would never render through the production code path and the visual
# comparison would diverge. Plain name keeps the test mail visually identical
# to what a real recipient would see.
COMPANY_NAME = "4K-Vierke Bau"

# Dispatch shape for this test — Kara's lead went to 7 firms (Sammelanfrage).
# isSammelanfrage drives the oversubscribed-framing copy under the table;
# otherSuppliersCount = receiving firm sees how many OTHERS got the same lead.
IS_SAMMELANFRAGE = True
OTHER_SUPPLIERS_COUNT = 6

# Catalog stat for the "Über KranVergleich.de" mini-pitch. Pulled live in
# production (getSiteStats); hard-coded here to current value 2026-05-12 so
# the visual test doesn't make a Supabase round-trip. Kept honest: catalog
# is DE + AT only (zero CH), so the German copy says "Deutschland und
# Österreich" — never "DACH" (memory feedback_dach_geographic_precision).
ANBIETER_COUNT = 713

# Founder signature defaults — mirror the env-driven path in production.
FOUNDER_NAME = os.environ.get("KRANVERGLEICH_FOUNDER_NAME") or "Christoph Jonetzko"
FOUNDER_EMAIL = os.environ.get("KRANVERGLEICH_FOUNDER_EMAIL") or "christoph@kranvergleich.de"

CRANE_KEYWORDS = [
    ("Autokran", re.compile(r"\bautokran\b", re.IGNORECASE)),
    ("Mobilkran", re.compile(r"\bmobilkran\b", re.IGNORECASE)),
    ("Ladekran", re.compile(r"\bladekran\b", re.IGNORECASE)),
    ("Minikran", re.compile(r"\bminikran\b", re.IGNORECASE)),
    ("Baukran", re.compile(r"\bbaukran\b", re.IGNORECASE)),
    ("Turmdrehkran", re.compile(r"\bturm(drehkran|kran)\b", re.IGNORECASE)),
    ("Dachdeckerkran", re.compile(r"\bdachdecker(kran)?\b", re.IGNORECASE)),
    ("Raupenkran", re.compile(r"\braupenkran\b", re.IGNORECASE)),
    ("Anhängerkran", re.compile(r"\banh(ä|a)nger(kran)?\b", re.IGNORECASE)),
]


def detect_mismatch(chosen: str, description: str) -> str | None:
    for name, regex in CRANE_KEYWORDS:
        if name == chosen:
            continue
        if regex.search(description):
            return name
    return None


def esc(s: str) -> str:
    return html.escape(s or "", quote=True)


def build_html(company_name: str, lead: dict) -> str:
    crane = lead["crane_type_name"]
    city = lead["city"]
    date = lead["preferred_date"]
    name = lead["customer_name"]
    email = lead["customer_email"]
    phone = lead["customer_phone"]
    duration = lead["duration_days"]
    desc = lead["project_description"]

    mismatch = detect_mismatch(crane, desc)
    headline_bits = [crane or "Kran"]
    if city:
        headline_bits.append(city)
    if date:
        headline_bits.append(date)
    headline = "Kundenanfrage: " + " · ".join(headline_bits)

    safe_desc_html = esc(desc).replace("\n", "<br>")
    rows = []
    if crane:
        rows.append(f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Krantyp</td><td><strong>{esc(crane)}</strong></td></tr>')
    rows.append(f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Name</td><td><strong>{esc(name)}</strong></td></tr>')
    rows.append(f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">E-Mail</td><td><a href="mailto:{esc(email)}">{esc(email)}</a></td></tr>')
    if phone:
        rows.append(f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Telefon</td><td>{esc(phone)}</td></tr>')
    rows.append(f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Stadt</td><td>{esc(city)}</td></tr>')
    if date:
        rows.append(f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Wunschtermin</td><td>{esc(date)}</td></tr>')
    if duration:
        rows.append(f'<tr><td style="padding:6px 12px 6px 0;color:#6b7280;white-space:nowrap;">Mietdauer</td><td>{duration} Tage</td></tr>')

    mismatch_html = ""
    if mismatch and crane:
        mismatch_html = (
            f'<p style="margin:8px 0;padding:8px 12px;background:#fffbeb;border:1px solid #fde68a;'
            f'border-radius:6px;font-size:13px;color:#78350f;">'
            f"Hinweis: Im Projekttext nennt der Kunde &bdquo;{esc(mismatch)}&ldquo; — bei der "
            f"Krantyp-Auswahl wurde &bdquo;{esc(crane)}&ldquo; gewählt. In vielen Fällen sind "
            f"beide Begriffe austauschbar; bei abweichender Tragklasse bitte vor Angebotserstellung "
            f"nachfragen."
            f"</p>"
        )

    if IS_SAMMELANFRAGE:
        urgency_html = (
            f'<p style="margin:12px 0;font-size:14px;color:#374151;line-height:1.55;">'
            f"<strong>Diese Anfrage wurde an {OTHER_SUPPLIERS_COUNT} weitere Anbieter "
            f"in {esc(city)} gesendet.</strong> Wer zuerst reagiert, hinterlässt den besten "
            f"Eindruck."
            f"</p>"
        )
    else:
        urgency_html = (
            f'<p style="margin:12px 0;font-size:14px;color:#374151;line-height:1.55;">'
            f"<strong>Diese Anfrage wurde exklusiv an Sie weitergeleitet.</strong> "
            f"Der Kunde hat Ihr Profil ausgewählt."
            f"</p>"
        )

    return f"""
            <div style="font-family:system-ui;max-width:560px;">
              <h2 style="font-size:18px;color:#1a1a1a;">{headline}</h2>
              <p style="color:#4b5563;font-size:14px;line-height:1.6;margin:0 0 6px 0;">
                Sehr geehrtes Team von <strong>{esc(company_name)}</strong>,
              </p>
              <p style="color:#4b5563;font-size:14px;line-height:1.6;">
                ein Kunde hat Sie auf {BRAND_NAME} ausgewählt und sucht ein Angebot für sein Projekt:
              </p>
              <p style="margin:16px 0;padding:12px;background:#f9fafb;border-radius:6px;font-size:14px;line-height:1.5;"><strong>Projektbeschreibung:</strong><br>{safe_desc_html}</p>
              <table style="border-collapse:collapse;font-size:14px;margin:16px 0;width:100%;">
                {''.join(rows)}
              </table>
              {urgency_html}
              {mismatch_html}
              <p style="font-size:14px;color:#4b5563;">Bitte antworten Sie direkt auf diese E-Mail oder kontaktieren Sie den Kunden über die oben genannten Kontaktdaten.</p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="font-size:13px;color:#4b5563;line-height:1.6;margin:0 0 16px 0;">
                <strong style="color:#1a1a1a;">Über {BRAND_NAME}</strong><br>
                {BRAND_NAME} ist die fokussierte Vergleichsplattform für Kranverleih in Deutschland und Österreich. Jede Anfrage prüfen wir manuell, bevor sie an Sie geht. Keine Bots, keine Massenmails. Über {ANBIETER_COUNT} geprüfte Kranfirmen aus 16 deutschen und 9 österreichischen Bundesländern sind bereits gelistet.
              </p>
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
              <p style="font-size:14px;color:#374151;line-height:1.55;margin:0;">
                Mit freundlichen Grüßen<br>
                <strong>{esc(FOUNDER_NAME)}</strong><br>
                Gründer, {BRAND_NAME}<br>
                <a href="mailto:{esc(FOUNDER_EMAIL)}" style="color:#2563eb;">{esc(FOUNDER_EMAIL)}</a>
              </p>
            </div>
    """


def main():
    subject = (
        f"Neue Kundenanfrage {LEAD['crane_type_name']} "
        f"({LEAD['city']}, {LEAD['preferred_date']}) — über {BRAND_NAME}"
    )
    mismatch = detect_mismatch(LEAD["crane_type_name"], LEAD["project_description"])

    print("=== Test mail config ===")
    print(f"  FROM        : {FROM_EMAIL}")
    print(f"  TO          : {TO_EMAIL}")
    print(f"  Subject     : {subject}")
    print(f"  Mismatch    : chosen={LEAD['crane_type_name']!r}  detected={mismatch!r}")
    print()

    payload = {
        "from": FROM_EMAIL,
        "to": [TO_EMAIL],
        "reply_to": LEAD["customer_email"],
        "subject": subject,
        "html": build_html(COMPANY_NAME, LEAD),
        "headers": {
            "X-KV-Lead-Id": "TEST-template-2026-05-12",
            "X-KV-Company-Id": "TEST-vierke-bau",
        },
        "tags": [{"name": "type", "value": "template_test_2026_05_12"}],
    }

    r = httpx.post(
        "https://api.resend.com/emails",
        headers={"Authorization": f"Bearer {RESEND_KEY}", "Content-Type": "application/json"},
        json=payload, timeout=20,
    )
    print(f"Resend HTTP {r.status_code}")
    if r.status_code >= 300:
        print(f"FAIL  body: {r.text[:400]}")
        sys.exit(1)
    print(f"OK    Resend id: {r.json().get('id')}")
    print()
    print(f"-> Check {TO_EMAIL} inbox. Verify:")
    print(f"   - Subject leads with 'Neue Kundenanfrage Ladekran (Berlin, 2026-04-27)' BEFORE portal name")
    print(f"   - Greeting: 'Sehr geehrtes Team von 4K-Vierke Bau' — no '(TEST)' suffix")
    print(f"   - H2: 'Kundenanfrage: Ladekran · Berlin · 2026-04-27' (project-led)")
    print(f"   - Order: Projektbeschreibung → Tabelle → urgency line → (optional Hinweis) → closing")
    print(f"   - Urgency line (Sammelanfrage): 'Diese Anfrage wurde an 6 weitere Anbieter in Berlin gesendet. Wer zuerst reagiert, hinterlässt den besten Eindruck.'")
    print(f"   - Amber 'Hinweis' under urgency line: 'Kunde nennt Autokran, gewählt wurde Ladekran'")
    print(f"   - Über-{BRAND_NAME} block: DE+AT only (no DACH/CH overshoot), '{ANBIETER_COUNT} geprüfte Kranfirmen'")
    print(f"   - Signature: 'Mit freundlichen Grüßen / {FOUNDER_NAME} / Gründer, {BRAND_NAME} / {FOUNDER_EMAIL}'")


if __name__ == "__main__":
    main()
