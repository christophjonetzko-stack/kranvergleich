#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Populate cities.city_faq_override for Wien (kranvergleich.at top city, 16 firms).

5 manually written FAQ entries grounded in Wien-specific facts (Sondernutzung
via MA 46, Lärmschutzverordnung work hours, UNESCO 1010 restrictions, Innenhof-
typical building stock, Bezirke pricing nuance). The {craneName} token is
replaced at render time per crane type by [crane-type]/[city]/page.tsx.

Pattern matches the DE city overrides (Berlin/Hamburg/Köln have ~4 entries each
in the same JSONB shape).

Usage:
  python scripts/at_city_faq_wien.py            # show preview only
  python scripts/at_city_faq_wien.py --commit   # write to Supabase
"""
import argparse
import json
import os
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

WIEN_FAQ = [
    {
        "question": "Brauche ich eine Genehmigung für einen {craneName} in Wien?",
        "answer": (
            "Auf privatem Grundstück ist keine Genehmigung erforderlich. Soll der {craneName} auf "
            "öffentlichem Verkehrsraum (Straße, Gehweg, Parkstreifen) in Wien aufgestellt werden, "
            "benötigen Sie eine Sondernutzungsbewilligung bzw. eine Verkehrsmaßnahme. Zuständig ist "
            "je nach Vorgang die MA 46 (Verkehrsorganisation und technische Verkehrsangelegenheiten) "
            "oder das örtliche Magistratische Bezirksamt. Bewilligungen kosten je nach Dauer und Lage "
            "rund 50–500 €. Antrag mindestens 14 Tage vor Aufstellung empfehlenswert; bei Hauptstraßen "
            "und in der Inneren Stadt auch deutlich länger."
        ),
    },
    {
        "question": "Welcher Krantyp eignet sich für Wiener Innenhöfe und schmale Gassen?",
        "answer": (
            "Ein Großteil des Wiener Wohnungsbestands liegt in Gründerzeit-Häusern mit Innenhöfen. "
            "Für Aufstellung im Innenhof eignen sich vor allem Minikrane und Dachdeckerkrane mit "
            "kompaktem Fahrwerk — sie passen über Hausdurchfahrten und Toröffnungen, die in Wien "
            "typischerweise zwischen 2,10 m und 2,40 m Höhe haben. Vor der Buchung sollten Sie Fotos "
            "und Maße der Hof- bzw. Tordurchfahrt an den Vermieter senden, damit der Krantyp passend "
            "ausgewählt wird. Klassische Autokrane scheitern in der Inneren Stadt oft an der Zufahrt "
            "und werden meist über die Straßenseite eingesetzt."
        ),
    },
    {
        "question": "Welche Lärmschutzauflagen gelten in Wien für Krananarbeiten?",
        "answer": (
            "Bauarbeiten in Wien sind in der Regel an Werktagen tagsüber zulässig, mit zusätzlichen "
            "Einschränkungen am Samstag, Sonntag und Feiertag. Die genauen zulässigen Werktagszeiten "
            "und Lärmschwellen ergeben sich aus der Bauordnung für Wien und ergänzenden Bezirks-"
            "regelungen — informieren Sie sich beim örtlichen Magistratischen Bezirksamt vor "
            "Aufstellung des Krans. In Wohngebieten und in der Inneren Stadt gelten meist strengere "
            "Vorschriften. Für Arbeiten zu Randzeiten oder am Wochenende ist im Allgemeinen eine "
            "Ausnahmegenehmigung erforderlich; planen Sie diese mehrere Wochen im Voraus."
        ),
    },
    {
        "question": "Was kostet ein {craneName} in Wien?",
        "answer": (
            "Die Mietpreise in Wien liegen ähnlich dem österreichischen Durchschnitt — Minikrane ab "
            "ca. 250–350 €/Tag, Dachdeckerkrane ab ca. 230–300 €/Tag, Autokrane ab ca. 550–700 €/Tag, "
            "Mobilkrane ab ca. 700 €/Tag (Richtwerte, netto zzgl. USt., Stand 2026). Innerstädtische "
            "Standorte können durch längere Anfahrt, engere Logistik und Verkehrsmaßnahmen Mehrkosten "
            "verursachen. Vergleichen Sie kostenlos mehrere Angebote — die tatsächlichen Preise "
            "variieren erheblich je nach Krantyp, Mietdauer und Verfügbarkeit."
        ),
    },
    {
        "question": "Gibt es Sonderregelungen für die Innere Stadt (1010)?",
        "answer": (
            "Die Innere Stadt (1010) ist UNESCO-Weltkulturerbe und unterliegt strengeren Auflagen als "
            "andere Bezirke. Aufstellungen auf öffentlichem Grund sind in der Regel nur werktags "
            "tagsüber zulässig (Mo–Fr 7:00–18:00), am Wochenende meist nur eingeschränkt. "
            "Schwertransporte über 7,5 t benötigen eine Routenvorgabe von der MA 46 mit Polizei-"
            "Eskorte. Die meisten Krananarbeiten in 1010 werden mit Minikranen oder Dachdeckerkranen "
            "über Tordurchfahrten gelöst, da klassische Autokrane in den engen Gassen oft keinen "
            "Aufstellplatz finden. Planen Sie Anträge und Logistik mindestens sechs Wochen im "
            "Voraus."
        ),
    },
]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--commit", action="store_true")
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )

    print("=" * 60)
    print("Wien city_faq_override — preview")
    print("=" * 60)
    for i, entry in enumerate(WIEN_FAQ, 1):
        print(f"\n  {i}. {entry['question']}")
        # First sentence only for compactness
        first_sent = entry["answer"].split(". ")[0] + "."
        print(f"     → {first_sent[:140]}")

    if not args.commit:
        print("\n  Dry run — nothing written. Re-run with --commit to apply.")
        return 0

    res = (sb.table("cities")
              .update({"city_faq_override": WIEN_FAQ})
              .eq("slug", "wien")
              .eq("country", "AT")
              .execute())
    if res.data:
        print(f"\n  ✓ Wien city_faq_override updated ({len(WIEN_FAQ)} entries)")
    else:
        print(f"\n  ✗ No rows updated — check that wien/AT exists in cities")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
