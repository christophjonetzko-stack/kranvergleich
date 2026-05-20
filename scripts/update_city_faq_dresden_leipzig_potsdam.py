"""
Add/extend city_faq_override for Dresden, Potsdam (0 overrides each)
and Leipzig (4 → 6) per Sistrix audit 2026-05-20 — these city pages
rank pos 7-10 for "autokran mieten dresden", "mobilkran mieten leipzig",
"autokran mieten potsdam". Generic template intro + zero/thin FAQs =
boilerplate signal to Google. City-specific FAQs unique the page.

Each FAQ uses {craneName} template var (replaced at render time per
crane type — Autokran/Mobilkran/Baukran etc.) so a single FAQ row
covers all 8 type pages for that city.

Idempotent — overwrites city_faq_override column with new value.
Dry-run by default, --commit to write.
"""
import argparse
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


DRESDEN_FAQS = [
    {
        "question": "Brauche ich eine Genehmigung für einen {craneName} in Dresden?",
        "answer": "Auf privatem Gelände nicht. Für öffentliche Flächen (Straße, Gehweg) benötigen Sie eine Sondernutzungserlaubnis beim Verkehrs- und Tiefbauamt der Landeshauptstadt Dresden. Bearbeitungszeit ca. 2–3 Wochen, Gebühr 30–150€ je nach Standort und Dauer. Besonders streng in der Altstadt (Frauenkirche, Theaterplatz, Zwinger-Umgebung) — hier sind zusätzliche Auflagen zu Aufstellzeiten und Bildschutz möglich. Bei Großbaustellen mit Verkehrsbehinderung (z.B. an der Augustusbrücke oder Carolabrücke) verlangt das Amt einen Verkehrszeichenplan, der über einen anerkannten Verkehrssicherer (z.B. Verkehrssicherung Dresden) erstellt werden muss.",
    },
    {
        "question": "Was kostet ein {craneName} in Dresden?",
        "answer": "Dresden gehört preislich zum sächsischen Marktdurchschnitt — die {craneName}-Mietkosten liegen ca. 5–10% unter dem westdeutschen Niveau, vergleichbar mit Leipzig oder Chemnitz. Aktuell aktive Großprojekte wie GlobalFoundries-Erweiterung im Norden (Wilschdorf), TSMC/ESMC-Fabrikbau im Industriepark Klotzsche und die Sanierung der Carolabrücke binden lokale Kapazitäten, was Tagespreise und Vorlaufzeiten leicht in die Höhe treibt. Für Standardprojekte ohne Eile bekommen Sie in Dresden meist gute Konditionen.",
    },
    {
        "question": "Wie schnell kann ein {craneName} in Dresden geliefert werden?",
        "answer": "Die meisten Dresdner Vermieter liefern innerhalb von 24–48 Stunden. Durch die gute Anbindung über die A4 (Ost-West, Görlitz–Eisenach) und A17 (Dresden–Prag) erreichen auch Anbieter aus Chemnitz (60 km), Leipzig (110 km), Freiberg und der Lausitz Dresden schnell. Für Einsätze in Hanglagen der Sächsischen Schweiz (Pirna, Bad Schandau) planen Sie 2–3 Tage Vorlauf wegen Spezialfahrzeugen ein. Bei spontanen Anfragen lohnt sich der Anruf bei mehreren Vermietern parallel — die freien Kapazitäten variieren stark je nach Wochentag.",
    },
    {
        "question": "Welche Besonderheiten gelten für Kraneinsätze in Dresden?",
        "answer": "Dresden hat besondere Auflagen für mehrere Stadtgebiete: Altstadt und Innere Neustadt unterliegen dem Denkmalschutz — Kranaufbauten in Sichtweite von Frauenkirche, Semperoper oder Zwinger erfordern oft eine Abstimmung mit dem Amt für Kultur und Denkmalschutz. In der Äußeren Neustadt (Alaunstraße / Louisenstraße) ist die Aufstellung an Wochenenden wegen des Nachtlebens stark eingeschränkt. Pieschen und Mickten haben durch Industrievergangenheit teils Altlasten im Boden — bei Baukran-Aufstellungen Standsicherheits-Gutachten einplanen. Hanglagen am Loschwitzer Elbhang erfordern Mobilkrane mit Niveauausgleich.",
    },
    {
        "question": "Welche Krantypen sind in Dresden besonders gefragt?",
        "answer": "Mobilkrane 50–100 t dominieren das Industriegeschäft — GlobalFoundries, Infineon, Bosch und VW Manufaktur (Gläserne Manufaktur) ordern regelmäßig Schwerlast-Hebearbeiten für Fertigungsanlagen. Baukrane (Turmdrehkrane) sind durch den anhaltenden Wohnungsneubau in Pieschen, Striesen und Cotta gut ausgelastet — typische Mietdauer 4–9 Monate. Autokrane 30–50 t für mittelständische Handwerksbetriebe und Dachdeckerkrane für Altbausanierung (Striesen, Blasewitz, Plauen-Süd) sind ebenfalls stark nachgefragt. Spezialfahrzeuge für Bauwerksprüfung (Carolabrücke 2024–2026) sind oft vorgebucht.",
    },
    {
        "question": "Welche Anbieter sind die größten {craneName}-Vermieter in Dresden?",
        "answer": "Der Dresdner Markt teilt sich zwischen regionalen Spezialisten (KVS Kranvermietung Mross, Krandienst Kunze in Radeberg, Dresden Krane Industrie Service in Moritzburg) und überregionalen Anbietern mit Niederlassung in Sachsen. Für Schwerlast-Mobilkrane > 100 t arbeiten viele Industriekunden mit Anbietern aus Leipzig oder Chemnitz zusammen — die Anfahrt 60–110 km amortisiert sich bei mehrtägigen Einsätzen. Den passenden {craneName} finden Sie über unsere Sammelanfrage; ein Anbieter-Vergleich spart in Dresden typischerweise 10–20% gegenüber dem ersten Angebot.",
    },
]

POTSDAM_FAQS = [
    {
        "question": "Brauche ich eine Genehmigung für einen {craneName} in Potsdam?",
        "answer": "Auf privatem Gelände nicht. Für öffentliche Flächen benötigen Sie eine Sondernutzungserlaubnis beim Geschäftsbereich Stadtentwicklung, Bauen, Wirtschaft und Umwelt (Bereich Verkehr) der Landeshauptstadt Potsdam. Bearbeitungszeit ca. 2–4 Wochen, Gebühr 40–200€. Im UNESCO-Welterbe-Gebiet (Schlösser und Parks von Sanssouci, Park Babelsberg, Neuer Garten, Glienicker Park) gelten verschärfte Auflagen — hier ist zusätzlich die Stiftung Preußische Schlösser und Gärten Berlin-Brandenburg (SPSG) an Sichtachsen-Themen einzubeziehen. Bearbeitungszeit kann sich auf 4–8 Wochen verlängern.",
    },
    {
        "question": "Was kostet ein {craneName} in Potsdam?",
        "answer": "Potsdam liegt preislich im Brandenburger Mittelfeld — etwa 5–10% unter Berliner Preisen. Wegen der direkten Anbindung an Berlin (15 km bis Berlin-Wannsee, A115 / Avus) bedienen viele Berliner Vermieter Potsdam mit, was die Verfügbarkeit gut hält. Aktive Bauschwerpunkte wie das Bornstedter Feld (Wohnungsneubau Krampnitz und Krongut Bornstedt) und der Ausbau am Hauptbahnhof binden Kapazitäten zeitweise. Bei UNESCO-Welterbe-Einsätzen kalkulieren Sie zusätzlich Gutachterkosten und längere Aufbauzeiten ein.",
    },
    {
        "question": "Wie schnell kann ein {craneName} in Potsdam geliefert werden?",
        "answer": "Die meisten Potsdamer und Berliner Vermieter liefern innerhalb von 24 Stunden. Über die A115 (Anschluss A10 Berliner Ring) erreichen Anbieter aus Berlin (15 km), Brandenburg an der Havel (35 km) und Werder (15 km) das Stadtgebiet zügig. In Babelsberg (Filmstudios) und in Bornstedt sind die Anfahrtswege durch enge Altstadtstraßen und Brückenbeschränkungen (Lange Brücke) etwas länger zu planen — bei Großgeräten > 80 t lohnt sich ein Vorabbesuch des Aufstellortes durch den Vermieter.",
    },
    {
        "question": "Welche Besonderheiten gelten für Kraneinsätze in Potsdam?",
        "answer": "Potsdam hat besondere Auflagen für drei Gebietsklassen: (1) UNESCO-Welterbe (Sanssouci, Babelsberg-Park, Neuer Garten, Glienicker Brücke und Park) — strenge Sichtachsen-Vorgaben, SPSG-Stellungnahme nötig. (2) Holländisches Viertel und Russische Kolonie Alexandrowka — Denkmalschutz, beschränkte Aufstellflächen wegen historischer Gebäude. (3) Babelsberger Filmstudios (Studio Babelsberg) — Drehbetrieb regelmäßig sperrt Straßenzüge, frühe Koordination mit Filmproduktion empfohlen. Krankaufnahmen über Filmkulissen können bei laufender Produktion teuer werden.",
    },
    {
        "question": "Welche Krantypen sind in Potsdam besonders gefragt?",
        "answer": "Mobilkrane und Autokrane 30–80 t für die zahlreichen Sanierungsprojekte im Altbau-Bestand der Innenstadt — Holländisches Viertel, Berliner Vorstadt, Brandenburger Vorstadt — sind dauerhaft gut ausgelastet. Baukrane für die Neubaugebiete Bornstedter Feld, Krampnitz und Drewitz typischerweise auf Monatsmiete vergeben. Spezialeinsätze für Studio Babelsberg (Setbau, Kulissenmontage, Kamerakran-Logistik) erfordern oft kurzfristige Verfügbarkeit. Dachdeckerkrane für die zahlreichen denkmalgeschützten Schieferdächer im Holländischen Viertel und in der Russischen Kolonie sind ebenfalls regelmäßig nachgefragt.",
    },
    {
        "question": "Was muss ich bei UNESCO-Welterbe-Bereichen in Potsdam beachten?",
        "answer": "Krane in Sichtachsen von Schloss Sanssouci, Park Babelsberg oder Glienicker Brücke sind genehmigungspflichtig durch die Stiftung Preußische Schlösser und Gärten (SPSG). Praktische Regeln: Aufbauten möglichst niedrig halten, Auslegerstellung minimieren, Aufbau außerhalb der Öffnungszeiten der Parks bevorzugen, Farbgebung (helle Krane unauffälliger als rote). Bei Bauarbeiten an denkmalgeschützten Privatobjekten im Welterbe-Pufferbereich (z.B. Villen in der Berliner Vorstadt) ist oft ein verkürztes Genehmigungsverfahren möglich, wenn der Aufbau nicht von einer ausgewiesenen Sichtachse einsehbar ist.",
    },
]

# Leipzig — keep existing 4 FAQs, add 2 new (BMW/Porsche logistics + Spinnerei/Plagwitz)
LEIPZIG_FAQS_ADD = [
    {
        "question": "Sind in Leipzig Spezialkrane für die Automobil-Logistik verfügbar?",
        "answer": "Ja, BMW Werk Leipzig (Plaußig), Porsche Leipzig (Werk Süd) und die Zulieferer im Industriepark Nordost binden in Leipzig spezialisierte Schwerlast-Kapazitäten — Mobilkrane 100–500 t und Raupenkrane für Maschinenmontagen, Roboterzellen und Bauteil-Wechsel. Diese Einsätze laufen meist über Industrieservice-Dienstleister mit langfristigen Rahmenverträgen, sind aber projektweise auch für Mittelständler verfügbar. Für Kfz-Zulieferer im Norden (Halle-Leipzig-Korridor) lohnt sich der Vergleich auch mit Leipziger und Hallenser Vermietern parallel.",
    },
    {
        "question": "Welche Krane werden in Plagwitz und der Spinnerei eingesetzt?",
        "answer": "Die ehemaligen Industriequartiere Plagwitz, Lindenau und die Spinnerei (Westwerk, Tapetenwerk) werden seit Jahren saniert — Autokrane 30–50 t für Loft-Umbauten, Mobilkrane für Schornstein-Sanierung und Dachdeckerkrane für die typischen Sägezahn-Dächer der Spinnerei-Hallen sind hier regelmäßig im Einsatz. Aufgrund teils enger Hinterhofzufahrten in den Gründerzeithäusern sind Minikrane (Spinnenkrane) für Innenmontagen ebenfalls stark nachgefragt. Altlasten im Boden — typisch für die Industrievergangenheit der Karl-Heine-Straße und der Naumburger Straße — erfordern bei größeren Aufbauten ein Standsicherheits-Gutachten.",
    },
]


def merge_leipzig_faqs(existing: list, additions: list) -> list:
    """Append new Leipzig FAQs to existing ones, dedupe by question text."""
    existing_questions = {q["question"] for q in existing}
    merged = list(existing)
    for q in additions:
        if q["question"] not in existing_questions:
            merged.append(q)
    return merged


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--commit", action="store_true")
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )

    plan: list[tuple[str, str, list]] = []

    # Dresden — replace (was 0)
    plan.append(("dresden", "Dresden", DRESDEN_FAQS))

    # Potsdam — replace (was 0)
    plan.append(("potsdam", "Potsdam", POTSDAM_FAQS))

    # Leipzig — extend (was 4)
    leipzig = sb.table("cities").select("city_faq_override").eq("slug", "leipzig").single().execute().data
    existing = leipzig.get("city_faq_override") or []
    merged = merge_leipzig_faqs(existing, LEIPZIG_FAQS_ADD)
    plan.append(("leipzig", "Leipzig", merged))

    print("=" * 70)
    print("City FAQ override plan — Dresden / Potsdam / Leipzig")
    print("=" * 70)
    for slug, name, faqs in plan:
        print(f"\n  {name} ({slug}): {len(faqs)} FAQs")
        for i, f in enumerate(faqs, 1):
            print(f"    {i}. {f['question'][:90]}")

    if not args.commit:
        print("\n  Dry run — no DB writes. Re-run with --commit.")
        return 0

    for slug, name, faqs in plan:
        sb.table("cities").update({"city_faq_override": faqs}).eq("slug", slug).execute()
        print(f"  ✓ {name}: city_faq_override updated ({len(faqs)} entries)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
