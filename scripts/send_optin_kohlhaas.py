"""
Send DSGVO-clean opt-in email to Georg Kohlhaas (lead e979e6f3).

Lead came in 2026-05-20 12:24 via /api/leads with crane_type_id=NULL
(entry_path=/, hero search without type selection), so auto_select_nearest
returned 0 firms and the 🚨 LEAD OHNE ANBIETER owner alert fired.

Project profile: 1.5 t @ 10 m height @ 15-20 m Auslegerlänge, 60 days
from 2026-07-01 in 56412 Heiligenroth (Westerwald, RLP). That spec
points to a Schnellbaukran / Mobilbaukran — economical for 60-day site
rentals vs. classic Autokran (8-15k€/month).

The Westerwald catalog has 0 Baukran-firms within 50 km. Nearest
verified fits (WebFetch-checked 2026-05-20):
  1. Kran-Burgard GmbH (Butzbach, 59 km) — Liebherr MK88 in fleet,
     classic small mobile tower crane (8 t / 32 m hook height /
     30 m radius) — capacity match is exact, no Montage needed.
  2. BKL Baukran Logistik (Frankfurt, 62 km) — largest DACH Baukran-
     specialist, 30 Mobilbaukrane + 500 Turmdrehkrane in rental pool.

Two additional firms in the same distance band (Reichert Frankfurt,
Krandienst Schuch Frankfurt) listed in DB but NOT verified on website,
so they stay out of the mail until WebFetch confirms fit.

Run:
  python send_optin_kohlhaas.py            # dry-run, prints payload
  python send_optin_kohlhaas.py --send     # actually send via Resend
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

LEAD_ID = "e979e6f3-3b0e-45e9-96a5-c8cc8490b3d4"
DEFAULT_TO = "info@kohlhaasbau-heiligenroth.de"
FROM_EMAIL = "Christoph Jonetzko · KranVergleich.de <christoph@send.kranvergleich.de>"
REPLY_TO = "christoph@kranvergleich.de"

SUBJECT = "Ihre Kranvermietungs-Anfrage in Heiligenroth — kurze Bestätigung"

HTML = """\
<!doctype html>
<html lang="de">
<body style="font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.55; color: #111; max-width: 620px; margin: 0 auto; padding: 24px;">
  <p>Sehr geehrter Herr Kohlhaas,</p>

  <p>vielen Dank für Ihre Anfrage über <strong>KranVergleich.de</strong>.</p>

  <p>Bei der automatischen Zuordnung passender Anbieter haben wir festgestellt, dass in Ihrer Anfrage kein konkreter Krantyp angegeben war. Bevor wir Ihre Kontaktdaten weiterleiten, möchten wir kurz Ihre Vorgaben bestätigen:</p>

  <table style="border-collapse: collapse; margin: 14px 0 18px;">
    <tr><td style="padding: 3px 14px 3px 0; color:#666;">Standort:</td><td><strong>56412 Heiligenroth</strong></td></tr>
    <tr><td style="padding: 3px 14px 3px 0; color:#666;">Mietdauer:</td><td><strong>60 Tage ab 01.07.2026</strong></td></tr>
    <tr><td style="padding: 3px 14px 3px 0; color:#666;">Traglast:</td><td><strong>bis 1,5 t</strong></td></tr>
    <tr><td style="padding: 3px 14px 3px 0; color:#666;">Hubhöhe:</td><td><strong>bis 10 m</strong></td></tr>
    <tr><td style="padding: 3px 14px 3px 0; color:#666;">Auslegerlänge:</td><td><strong>15–20 m</strong></td></tr>
  </table>

  <p>Diese Spezifikation passt zu einem <strong>Schnellbaukran / Mobilbaukran</strong>, der bei einer Mietdauer von 60 Tagen wirtschaftlich deutlich günstiger ist als ein klassischer Autokran.</p>

  <p>In Ihrer engeren Region (Westerwald / Mittelrhein) haben wir derzeit keine eigenen Baukran-Anbieter im Verzeichnis. Zwei passende Spezialisten in vertretbarer Entfernung mit der exakt benötigten Flotte:</p>

  <ol style="padding-left: 20px;">
    <li style="margin-bottom: 10px;">
      <strong>Kran-Burgard GmbH</strong> (Butzbach, ca. 59 km)<br>
      <span style="color:#555;">Liebherr MK88 im Mietpark — Mobilbaukran 8 t / 32 m Hubhöhe / 30 m Radius. Schnell aufgestellt, kein separater Aufbau-Termin.</span>
    </li>
    <li style="margin-bottom: 10px;">
      <strong>BKL Baukran Logistik</strong> (Frankfurt, ca. 62 km)<br>
      <span style="color:#555;">Größter Mobilbaukran-Mietpark in DACH mit über 30 Mobilbaukranen und 500 Turmdrehkranen — passende Modelle in der 1–8 t Klasse.</span>
    </li>
  </ol>

  <p style="background:#f6f6f0; border-left: 3px solid #111; padding: 12px 14px; margin: 18px 0;">
    Möchten Sie, dass wir Ihre Anfrage an diese Anbieter weiterleiten?<br>
    Antworten Sie kurz mit <strong>„Ja, 1+2"</strong> (beide), <strong>„Ja, 1"</strong> (nur Kran-Burgard) oder <strong>„Ja, 2"</strong> (nur BKL). Wir leiten dann Ihre Kontaktdaten (Name, E-Mail, Telefon, Wunschtermin, Projektbeschreibung) an die genannten Firmen zur Angebotserstellung weiter.
  </p>

  <p>Falls Sie bereits einen Anbieter im Kopf haben oder lieber telefonisch besprechen möchten, antworten Sie einfach mit Ihrer Präferenz oder rufen uns unter <a href="mailto:christoph@kranvergleich.de" style="color:#2563eb;">christoph@kranvergleich.de</a> zurück.</p>

  <p>Details zur Datenverarbeitung: <a href="https://kranvergleich.de/datenschutz">kranvergleich.de/datenschutz</a></p>

  <p>Mit freundlichen Grüßen<br>
  <strong>Christoph Jonetzko</strong><br>
  Gründer, KranVergleich.de<br>
  <a href="mailto:christoph@kranvergleich.de" style="color:#2563eb;">christoph@kranvergleich.de</a></p>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 28px 0 12px;">
  <p style="color:#666; font-size:12px;">Anfrage-Nr: e979e6f3 · KranVergleich.de</p>
</body>
</html>
"""

TEXT = """\
Sehr geehrter Herr Kohlhaas,

vielen Dank für Ihre Anfrage über KranVergleich.de.

Bei der automatischen Zuordnung passender Anbieter haben wir festgestellt,
dass in Ihrer Anfrage kein konkreter Krantyp angegeben war. Bevor wir Ihre
Kontaktdaten weiterleiten, möchten wir kurz Ihre Vorgaben bestätigen:

  Standort:        56412 Heiligenroth
  Mietdauer:       60 Tage ab 01.07.2026
  Traglast:        bis 1,5 t
  Hubhöhe:         bis 10 m
  Auslegerlänge:   15-20 m

Diese Spezifikation passt zu einem Schnellbaukran / Mobilbaukran, der bei
einer Mietdauer von 60 Tagen wirtschaftlich deutlich günstiger ist als ein
klassischer Autokran.

In Ihrer engeren Region (Westerwald / Mittelrhein) haben wir derzeit keine
eigenen Baukran-Anbieter im Verzeichnis. Zwei passende Spezialisten in
vertretbarer Entfernung mit der exakt benötigten Flotte:

  1. Kran-Burgard GmbH (Butzbach, ca. 59 km)
     Liebherr MK88 im Mietpark - Mobilbaukran 8 t / 32 m Hubhoehe /
     30 m Radius. Schnell aufgestellt, kein separater Aufbau-Termin.

  2. BKL Baukran Logistik (Frankfurt, ca. 62 km)
     Groesster Mobilbaukran-Mietpark in DACH mit ueber 30 Mobilbaukranen
     und 500 Turmdrehkranen - passende Modelle in der 1-8 t Klasse.

Moechten Sie, dass wir Ihre Anfrage an diese Anbieter weiterleiten?
Antworten Sie kurz mit "Ja, 1+2" (beide), "Ja, 1" (nur Kran-Burgard) oder
"Ja, 2" (nur BKL). Wir leiten dann Ihre Kontaktdaten an die genannten
Firmen zur Angebotserstellung weiter.

Falls Sie bereits einen Anbieter im Kopf haben oder lieber telefonisch
besprechen moechten, antworten Sie einfach mit Ihrer Praeferenz oder
rufen uns unter christoph@kranvergleich.de zurueck.

Details zur Datenverarbeitung: https://kranvergleich.de/datenschutz

Mit freundlichen Gruessen
Christoph Jonetzko
Gruender, KranVergleich.de
christoph@kranvergleich.de

---
Anfrage-Nr: e979e6f3 · KranVergleich.de
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
