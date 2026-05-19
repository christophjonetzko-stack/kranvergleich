"""
Send DSGVO-clean opt-in email to Corinna Greb (lead 54403ab6).

Asks for explicit consent ("Ja" reply) before forwarding her existing inquiry
to additional Baukran providers. Original firm Fa. Uebel was matched on
Baukran type tag but their fleet (Potain HD 21A, 2000kg @ 12m, Schnellmontage
positioned for Zimmerer/Dachdecker) is undersized for her stated requirement
of 4t @ 11m for a Mehrfamilienhaus Neubau (150-day rental).

Framed neutrally — no negative comment about Uebel; phrased around the
customer's own requirement so she keeps agency over the decision.

Run:
  python send_optin_greb.py            # dry-run, prints payload
  python send_optin_greb.py --send     # actually send via Resend
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

import httpx
from dotenv import load_dotenv

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env.local")

RESEND_KEY = os.environ["RESEND_API_KEY"]

LEAD_ID = "54403ab6-14fa-4bac-88e6-6a3b55ef7c35"
DEFAULT_TO = "corinna.greb@gmx.net"
FROM_EMAIL = "Christoph Jonetzko · KranVergleich.de <christoph@send.kranvergleich.de>"
REPLY_TO = "christoph@kranvergleich.de"

SUBJECT = "Ihre Bauprojekt-Anfrage in Gerolzhofen — weitere Baukran-Anbieter verfügbar"

HTML = """\
<!doctype html>
<html lang="de">
<body style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.55; color: #111; max-width: 620px; margin: 0 auto; padding: 24px;">
  <p>Sehr geehrte Frau Greb,</p>

  <p>vielen Dank für Ihre Anfrage über <strong>KranVergleich.de</strong> für Ihr Neubauprojekt in 97447 Gerolzhofen (Mehrfamilienhaus, Mietzeit ca. 150 Tage, Wunschtermin 09.06.2026).</p>

  <p>Die Firma <strong>Uebel Baukran und Gerüstverleih</strong> hat Ihre Anfrage erhalten und meldet sich direkt bei Ihnen.</p>

  <p>Da Sie in Ihrer Projektbeschreibung eine Tragkraft von <strong>4 Tonnen bei 11 m Ausladung</strong> nennen, möchten wir Ihnen zusätzlich zwei Anbieter mit passenden Baukran-Flotten in dieser Größenordnung vorschlagen:</p>

  <ul>
    <li><strong>BKL Baukran Logistik</strong> (Schillingsfürst, ca. 80 km von Gerolzhofen) — Baukran-Spezialist mit über 500 Turmdrehkranen bis 1.100 mt</li>
    <li><strong>Baukrane Weidenhiller</strong> (Walting, ca. 140 km von Gerolzhofen) — Liebherr- und Potain-Baukrane mit 2–8 Tonnen Tragkraft</li>
  </ul>

  <p style="background:#f6f6f0; border-left: 3px solid #111; padding: 12px 14px; margin: 18px 0;">
    Möchten Sie, dass wir Ihre bestehende Anfrage zusätzlich an diese Anbieter weiterleiten? Antworten Sie einfach mit <strong>„Ja"</strong> auf diese E-Mail — wir leiten dann Ihre Kontaktdaten (Name, E-Mail, Telefon, Wunschtermin, Projektbeschreibung) an die genannten Firmen zur Angebotserstellung weiter.
  </p>

  <p>Falls Sie nur die ursprüngliche Auswahl mit der Firma Uebel behalten möchten, ignorieren Sie diese E-Mail einfach — es entstehen Ihnen keine Nachteile.</p>

  <p>Details zur Datenverarbeitung: <a href="https://kranvergleich.de/datenschutz">kranvergleich.de/datenschutz</a></p>

  <p>Mit freundlichen Grüßen<br>
  <strong>Christoph Jonetzko</strong><br>
  Gründer, KranVergleich.de<br>
  <a href="mailto:christoph@kranvergleich.de" style="color:#2563eb;">christoph@kranvergleich.de</a></p>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 12px;">
  <p style="color:#666; font-size:12px;">Anfrage-Nr: 54403ab6 · KranVergleich.de</p>
</body>
</html>
"""

TEXT = """\
Sehr geehrte Frau Greb,

vielen Dank für Ihre Anfrage über KranVergleich.de für Ihr Neubauprojekt
in 97447 Gerolzhofen (Mehrfamilienhaus, Mietzeit ca. 150 Tage,
Wunschtermin 09.06.2026).

Die Firma Uebel Baukran und Gerüstverleih hat Ihre Anfrage erhalten und
meldet sich direkt bei Ihnen.

Da Sie in Ihrer Projektbeschreibung eine Tragkraft von 4 Tonnen bei 11 m
Ausladung nennen, möchten wir Ihnen zusätzlich zwei Anbieter mit passenden
Baukran-Flotten in dieser Größenordnung vorschlagen:

  - BKL Baukran Logistik (Schillingsfürst, ca. 80 km von Gerolzhofen) —
    Baukran-Spezialist mit über 500 Turmdrehkranen bis 1.100 mt
  - Baukrane Weidenhiller (Walting, ca. 140 km von Gerolzhofen) —
    Liebherr- und Potain-Baukrane mit 2–8 Tonnen Tragkraft

Möchten Sie, dass wir Ihre bestehende Anfrage zusätzlich an diese Anbieter
weiterleiten? Antworten Sie einfach mit "Ja" auf diese E-Mail — wir leiten
dann Ihre Kontaktdaten (Name, E-Mail, Telefon, Wunschtermin,
Projektbeschreibung) an die genannten Firmen zur Angebotserstellung weiter.

Falls Sie nur die ursprüngliche Auswahl mit der Firma Uebel behalten
möchten, ignorieren Sie diese E-Mail einfach — es entstehen Ihnen keine
Nachteile.

Details zur Datenverarbeitung: https://kranvergleich.de/datenschutz

Mit freundlichen Grüßen
Christoph Jonetzko
Gründer, KranVergleich.de
christoph@kranvergleich.de

---
Anfrage-Nr: 54403ab6 · KranVergleich.de
"""


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--send", action="store_true", help="Actually send via Resend")
    p.add_argument("--to", default=DEFAULT_TO, help=f"Recipient (default: {DEFAULT_TO})")
    args = p.parse_args()

    payload = {
        "from": FROM_EMAIL,
        "to": [args.to],
        "reply_to": REPLY_TO,
        "subject": SUBJECT,
        "html": HTML,
        "text": TEXT,
        "tags": [
            {"name": "lead_id", "value": LEAD_ID},
            {"name": "type", "value": "rescue_optin"},
        ],
    }

    print("=== Resend payload ===")
    pretty = {**payload}
    pretty["html"] = pretty["html"][:200] + "...[truncated]"
    pretty["text"] = pretty["text"][:200] + "...[truncated]"
    print(json.dumps(pretty, indent=2, ensure_ascii=False))
    print()
    print("=== Full TEXT version (review before sending) ===")
    print(TEXT)
    print()

    if not args.send:
        print("Dry run only. Re-run with --send to dispatch via Resend.")
        return

    r = httpx.post(
        "https://api.resend.com/emails",
        headers={
            "Authorization": f"Bearer {RESEND_KEY}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=20,
    )
    if r.status_code >= 300:
        print(f"FAIL  HTTP {r.status_code}: {r.text}", file=sys.stderr)
        sys.exit(1)
    print(f"OK    Resend id: {r.json().get('id')}")


if __name__ == "__main__":
    main()
