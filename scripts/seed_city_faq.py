#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Seed city_faq_override for top 5 cities.

FAQ uses {craneName} placeholder which gets replaced at render time
so one FAQ set works across all crane-type city pages.

Usage:
  python seed_city_faq.py              # dry-run
  python seed_city_faq.py --commit     # write to DB
"""
import argparse
import json
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

# ─── FAQ Content per city ─────────────────────────────────
# {craneName} is replaced at render time with the actual crane type name.
# Content is in formal German (Sie-Form), factual, locally specific.

CITY_FAQS = {
    "hamburg": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Hamburg?",
            "answer": "Auf privatem Grundstück ist keine Genehmigung erforderlich. Soll der {craneName} auf öffentlichem Grund (Straße, Gehweg) aufgestellt werden, benötigen Sie eine Sondernutzungserlaubnis vom Landesbetrieb Straßen, Brücken und Gewässer (LSBG). In Hamburg dauert die Bearbeitung ca. 2–4 Wochen. Für Schwerlastkrane über 40 Tonnen Gesamtgewicht ist zusätzlich eine Ausnahmegenehmigung für Straßenbenutzung erforderlich."
        },
        {
            "question": "Was kostet ein {craneName} in Hamburg?",
            "answer": "Die Mietpreise in Hamburg liegen im bundesdeutschen Durchschnitt — durch die hohe Anbieterdichte in der Metropolregion herrscht guter Wettbewerb. Für Einsätze im Hafengebiet oder auf den Elbinseln können Zuschläge für Sondertransport anfallen. Vergleichen Sie mindestens 3 Angebote über unsere kostenlose Sammelanfrage, um den besten Preis zu finden."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Hamburg geliefert werden?",
            "answer": "Die meisten Hamburger Kranvermieter liefern innerhalb von 24 Stunden in das gesamte Stadtgebiet. Bei Einsätzen in der HafenCity oder im Hafen gelten besondere Zufahrtsregelungen (HHLA-Gelände, Freihafen) — klären Sie die Zufahrtsgenehmigung vorab mit dem Vermieter. Für dringende Einsätze bieten mehrere Anbieter Same-Day-Service."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Hamburg?",
            "answer": "Hamburg hat strenge Auflagen für Kranarbeiten in der Nähe des Flughafens (Höhenbeschränkungen), in Wasserschutzgebieten und in denkmalgeschützten Bereichen (Speicherstadt, Kontorhaus­viertel). Bei Straßensperrungen ist die Verkehrsbehörde (Polizeikommissariat) einzubeziehen. Tipp: Viele Hamburger Vermieter übernehmen die Genehmigungsbeantragung als Service — fragen Sie bei der Angebotsanfrage danach."
        },
    ],
    "berlin": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Berlin?",
            "answer": "Auf Privatgelände ist keine Genehmigung nötig. Für die Aufstellung eines {craneName} auf öffentlichem Straßenland benötigen Sie eine Sondernutzungserlaubnis vom zuständigen Straßen- und Grünflächenamt des Bezirks. In Berlin sind die 12 Bezirksämter zuständig — nicht eine zentrale Stelle. Bearbeitungszeit: 2–6 Wochen je nach Bezirk. Für Baukrane (Turmdrehkrane) ist zusätzlich eine Baugenehmigung der Bauaufsicht erforderlich."
        },
        {
            "question": "Was kostet ein {craneName} in Berlin?",
            "answer": "Berlin hat mit über 60 Kranvermietern die höchste Anbieterdichte Deutschlands — entsprechend kompetitiv sind die Preise. Die Anfahrtskosten variieren je nach Stadtgebiet erheblich (Spandau ↔ Marzahn = 40+ km). Tipp: Wählen Sie einen Anbieter in Ihrem Bezirk, um Transportkosten zu minimieren. Über unsere Sammelanfrage erreichen Sie gezielt Vermieter in Ihrer Nähe."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Berlin geliefert werden?",
            "answer": "Aufgrund der Größe Berlins und häufiger Verkehrseinschränkungen (Baustellen, Sperrungen) sollten Sie mindestens 48 Stunden Vorlauf einplanen. Viele Berliner Vermieter bieten 24h-Express für Aufschlag (ca. 20–30%). Für Einsätze innerhalb des S-Bahn-Rings gelten teilweise Nachtanlieferungspflichten für Schwertransporte."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Berlin?",
            "answer": "Berlin hat besondere Auflagen in folgenden Bereichen: Regierungsviertel (Sicherheitszone, Voranmeldung BKA), Flughafenumfeld BER (Höhenbeschränkung), Denkmalschutzbereiche (Unter den Linden, Museumsinsel), und Umweltzone (alle Lieferfahrzeuge brauchen grüne Plakette). Für Schwertransporte über 3,5t in der Innenstadt ist eine Routengenehmigung der Verkehrslenkung Berlin (VLB) erforderlich."
        },
    ],
    "koeln": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Köln?",
            "answer": "Auf privatem Gelände ist keine Genehmigung erforderlich. Für Kranaufstellungen auf öffentlichen Straßen und Plätzen in Köln benötigen Sie eine Sondernutzungserlaubnis vom Amt für Straßen und Verkehrstechnik der Stadt Köln. Antragsfrist: mindestens 2 Wochen vor dem geplanten Einsatz. Für Einsätze in der Altstadt oder im Domumfeld gelten verschärfte Auflagen (Denkmalschutz)."
        },
        {
            "question": "Was kostet ein {craneName} in Köln?",
            "answer": "Die Kranmiete in Köln entspricht dem NRW-Durchschnitt. Durch die zentrale Lage im Rheinland gibt es viele Anbieter auch aus Düsseldorf, Bonn und dem Bergischen Land, die Köln bedienen — das drückt die Preise. Für linksrheinische Einsätze (Ehrenfeld, Lindenthal) sind Anbieter aus dem Kölner Westen günstiger; für rechtsrheinisch (Deutz, Porz) lohnt sich ein Vergleich mit Anbietern aus Leverkusen."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Köln geliefert werden?",
            "answer": "Die meisten Kölner Vermieter liefern innerhalb von 24 Stunden. Durch die gute Autobahnanbindung (A1, A3, A4, A57) erreichen auch überregionale Anbieter Köln schnell. Beachten Sie: In der Karnevalssaison (insb. Weiberfastnacht bis Aschermittwoch) kann es zu Einschränkungen bei Straßensperrungen kommen."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Köln?",
            "answer": "Köln hat besondere Regelungen für: Hohenzollernbrücke und Rheinufer (keine schweren Krane), Altstadt (enge Gassen, max. Achslast beachten), Dom-Umgebung (Höhenbeschränkungen, Denkmalschutz), und Messe-Gelände (eigene Zufahrtsregelungen). Für Arbeiten an historischen Gebäuden ist vorab eine Abstimmung mit der Unteren Denkmalbehörde empfehlenswert."
        },
    ],
    "muenchen": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in München?",
            "answer": "Auf Privatgrund ist keine Genehmigung erforderlich. Für die Aufstellung auf öffentlichem Grund benötigen Sie eine verkehrsrechtliche Anordnung und eine Sondernutzungserlaubnis vom Kreisverwaltungsreferat (KVR) München. München ist bekannt für strenge Auflagen — planen Sie 3–4 Wochen Vorlauf ein. Für Baukrane ist zusätzlich eine Baugenehmigung der Lokalbaukommission (LBK) nötig."
        },
        {
            "question": "Was kostet ein {craneName} in München?",
            "answer": "München gehört zu den teuersten Standorten für Kranmiete in Deutschland — ca. 10–20% über dem Bundesdurchschnitt. Gründe: hohe Nachfrage durch Bauboom, strenge städtische Auflagen, und lange Anfahrtswege innerhalb des Stadtgebiets. Tipp: Anbieter aus dem Umland (Erding, Freising, Dachau) sind oft günstiger als innerstädtische Vermieter. Vergleichen Sie über unsere Sammelanfrage."
        },
        {
            "question": "Wie schnell kann ein {craneName} in München geliefert werden?",
            "answer": "Lieferzeiten in München betragen in der Regel 24–72 Stunden. Der Münchner Mittlere Ring und die chronisch überlasteten Einfallstraßen können Schwertransporte verzögern. Viele Vermieter empfehlen Nachtanlieferung für den Innenstadtbereich. Bei Einsätzen nahe dem Flughafen MUC gelten Höhenbeschränkungen."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in München?",
            "answer": "München hat strenge Vorschriften für: Altstadt-Lehel und Maxvorstadt (enge Straßen, Denkmalschutz, Lastbeschränkungen auf historischen Brücken), Olympiagelände (Sondergenehmigung), und Englischer Garten Umgebung (Naturschutz). Die Lokalbaukommission prüft bei Baukranen das Orts- und Landschaftsbild. Für Nacht- und Wochenendarbeit gelten in Wohngebieten strenge Lärmschutzauflagen (TA Lärm)."
        },
    ],
    "duesseldorf": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Düsseldorf?",
            "answer": "Auf Privatgelände nicht. Für Aufstellungen im öffentlichen Verkehrsraum benötigen Sie eine Sondernutzungserlaubnis vom Amt für Verkehrsmanagement der Stadt Düsseldorf. Bearbeitungszeit: ca. 2 Wochen. In der Altstadt und am Medienhafen gelten besondere Regelungen wegen der hohen Fußgängerfrequenz. Für Kranarbeiten an der Königsallee ist eine frühzeitige Abstimmung empfohlen."
        },
        {
            "question": "Was kostet ein {craneName} in Düsseldorf?",
            "answer": "Düsseldorf liegt preislich im oberen NRW-Durchschnitt. Durch die Nähe zu den Ruhrgebiets-Vermietern (Duisburg, Essen, Dortmund — je 20–40 km) haben Sie eine große Auswahl und gute Verhandlungsposition. Für Einsätze im Medienhafen oder in der Innenstadt können Zuschläge für eingeschränkte Zufahrt anfallen."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Düsseldorf geliefert werden?",
            "answer": "Die meisten Düsseldorfer Kranvermieter liefern innerhalb von 24 Stunden. Durch die zentrale Lage im Rhein-Ruhr-Raum ist auch kurzfristige Verfügbarkeit von Spezialgeräten (Schwerlastkrane, Raupenkrane) gut. Tipp: Bei Messe-Veranstaltungen (drupa, MEDICA, boot) kann die Verfügbarkeit eingeschränkt sein — frühzeitig buchen."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Düsseldorf?",
            "answer": "Düsseldorf hat besondere Auflagen für: Flughafen-Umgebung (Höhenbeschränkung, Anmeldung bei DFS), Rheinufer-Promenade (keine schweren Fahrzeuge), Altstadt (Fußgängerzone, Nachtanlieferung), und Oberkassel (Brücken-Lastbeschränkungen). Der Medienhafen hat eigene Zufahrtsregelungen für Schwertransporte. Bei Arbeiten am Rhein ist die Wasser- und Schifffahrtsverwaltung einzubeziehen."
        },
    ],
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    args = ap.parse_args()
    dry = not args.commit

    print(f"=== seed_city_faq — {'DRY-RUN' if dry else 'COMMIT'} ===\n")

    for city_slug, faqs in CITY_FAQS.items():
        # Fetch city row
        rows = sb.table("cities").select("id,name,slug,city_faq_override").eq("slug", city_slug).execute().data
        if not rows:
            print(f"  MISS  city slug={city_slug} not found in DB")
            continue

        city = rows[0]
        existing = city.get("city_faq_override")

        if existing:
            print(f"  SKIP  {city['name']} — already has {len(existing)} override FAQs")
            continue

        print(f"  {'WOULD SET' if dry else 'UPDATE   '} {city['name']} — {len(faqs)} FAQs")
        for f in faqs:
            print(f"    Q: {f['question'][:70]}...")

        if not dry:
            sb.table("cities").update({"city_faq_override": faqs}).eq("id", city["id"]).execute()

    print("\nDone.")


if __name__ == "__main__":
    main()
