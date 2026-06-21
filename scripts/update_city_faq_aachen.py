"""
Add city_faq_override for Aachen (0 → 5) per coverage audit 2026-06-21.
baukran-mieten/aachen (19 firms) was "Crawled - currently not indexed":
substantive firm count but generic template = near-duplicate signal.
City-specific FAQs unique the page. Aachen was the only one of the 5
audited cities WITHOUT an existing override (Stuttgart/Frankfurt/Hamburg/
Köln already had 4 curated each — left untouched, those need
request-indexing/internal-links, not more content).

Each FAQ uses {craneName} (replaced per crane type at render); the
override is city-wide → lifts all Aachen type pages. Permit office +
lead-time WebSearch-verified 2026-06-21 (aachen.de). No fabricated crane
prices, no firm names/ranking (UWG). Grenzlage mentioned as context only,
no cross-border operational claim.

Safety rail: replace mode refuses if the city unexpectedly already has
overrides (the Nürnberg lesson). Dry-run by default, --commit to write.
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


AACHEN_FAQS = [
    {
        "question": "Brauche ich eine Genehmigung für einen {craneName} in Aachen?",
        "answer": "Auf privatem Grund nicht. Für öffentliche Flächen ist eine Sondernutzungserlaubnis beim Fachbereich Sicherheit und Ordnung (FB 32/230) der Stadt Aachen nötig, für die zugehörige Verkehrsanordnung der Fachbereich Mobilität und Verkehr. Den Antrag stellen Sie spätestens drei Wochen vorher (Verkehrsanordnung mindestens 15 Werktage). In der Altstadt rund um den Aachener Dom (UNESCO-Welterbe) gelten verschärfte Auflagen wegen Denkmalschutz und enger, teils gepflasterter Gassen.",
    },
    {
        "question": "Was kostet ein {craneName} in Aachen?",
        "answer": "Aachen liegt im NRW-Marktdurchschnitt. Durch die Lage im Dreiländereck und die Nähe zu Köln, Düsseldorf und Mönchengladbach bedienen viele Anbieter Aachen mit, was Verfügbarkeit und Preise stabil hält. Die {craneName}-Tagespreise finden Sie in der Preisübersicht oben; ein Vergleich mehrerer Angebote lohnt sich.",
    },
    {
        "question": "Wie schnell kann ein {craneName} in Aachen geliefert werden?",
        "answer": "Die meisten Anbieter liefern innerhalb von 24–48 Stunden. Über die A4 (Köln–Aachen), A44 und A544 erreichen Vermieter aus Köln, Düsseldorf, Mönchengladbach und dem Umland Aachen zügig. Für Einsätze in der engen Altstadt rund um Dom und Rathaus planen Sie etwas mehr Vorlauf ein.",
    },
    {
        "question": "Welche Besonderheiten gelten für Kraneinsätze in Aachen?",
        "answer": "Aachen hat besondere Auflagen für mehrere Bereiche: Dom und Altstadt als UNESCO-Welterbe (Denkmalschutz, enge gepflasterte Gassen, Gewichtsbeschränkungen), den RWTH-Campus und das Universitätsklinikum (große Forschungs- und Hochbauten, hier sind schwere Mobilkrane gefragt) sowie die grenznahe Lage im Dreiländereck. Im Kurgebiet sind Untergrund und Aufstellfläche wegen der Thermalquellen vorab zu prüfen.",
    },
    {
        "question": "Welche Krantypen sind in Aachen besonders gefragt?",
        "answer": "Den Markt prägen Mobil- und Autokrane für RWTH-Campus, Klinikum und Gewerbe sowie Dachdecker- und Minikrane für die Sanierung der Altstadt- und Gründerzeitbebauung rund um den Dom. Für die engen Gassen der Welterbe-Zone ist eine sorgfältige Stellplatzplanung entscheidend; den passenden {craneName} finden Sie über die kostenlose Sammelanfrage.",
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

    slug, name, faqs = "aachen", "Aachen", AACHEN_FAQS

    print("=" * 70)
    print("City FAQ override — Aachen")
    print("=" * 70)

    row = sb.table("cities").select("slug, city_faq_override").eq("slug", slug).single().execute().data
    if not row:
        print(f"  {name} ({slug}): CITY MISSING — aborting")
        return 1
    existing = row.get("city_faq_override") or []
    if len(existing) > 0:
        print(f"  {name} ({slug}): expected 0 overrides but found {len(existing)} — ABORTING (do not overwrite)")
        return 1

    print(f"\n  {name} ({slug}): current 0 → final {len(faqs)} FAQs")
    for i, f in enumerate(faqs, 1):
        print(f"    {i}. {f['question'][:88]}")

    if not args.commit:
        print("\n  Dry run — no DB writes. Re-run with --commit.")
        return 0

    sb.table("cities").update({"city_faq_override": faqs}).eq("slug", slug).execute()
    print(f"\n  ✓ {name}: city_faq_override updated ({len(faqs)} entries)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
