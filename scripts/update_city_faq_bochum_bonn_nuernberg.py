"""
Add city_faq_override for Bochum, Bonn, Nürnberg (0 overrides each → 5)
per SEO audit 2026-06-21. These city pages rank pos 11-13 for
"mobilkran/minikran/ladekran mieten <stadt>" with high impressions
(241-392/28d) but only the 4 generic template FAQs = near-duplicate
boilerplate signal. City-specific FAQs unique the page → push to page 1.
Commercial-local intent (NOT eaten by AI-Overview, unlike kosten cluster).

Each FAQ uses {craneName} (replaced at render per crane type), and the
override is city-wide → one row lifts all type pages for that city
(Bochum: mobilkran+minikran+ladekran simultaneously).

The first 3 questions deliberately reuse the template question text so
dedupeFaqs() replaces the generic versions with these richer ones; the
last 2 are net-new. Permit offices + lead-times WebSearch-verified
2026-06-21. No fabricated crane prices, no firm names/ranking (UWG).

Idempotent — overwrites city_faq_override. Dry-run by default, --commit to write.
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


BOCHUM_FAQS = [
    {
        "question": "Brauche ich eine Genehmigung für einen {craneName} in Bochum?",
        "answer": "Auf privatem Gelände nicht. Für öffentliche Flächen (Straße, Gehweg) benötigen Sie eine Sondernutzungserlaubnis beim Tiefbauamt Bochum (Verkehrsregelungen, Technisches Rathaus, Hans-Böckler-Straße 19). Den Antrag stellen Sie mindestens zwei Wochen vor dem gewünschten Termin. Die Verwaltungsgebühr richtet sich nach Umfang und Dauer (von wenigen Euro bis hin zu mehreren hundert Euro bei großen Aufstellungen), hinzu kommt eine Sondernutzungsgebühr nach Satzung. Wird der Verkehr auf Hauptverkehrsachsen wie Castroper Straße oder Herner Straße behindert, ist zusätzlich eine verkehrsrechtliche Anordnung mit Verkehrszeichenplan nötig.",
    },
    {
        "question": "Was kostet ein {craneName} in Bochum?",
        "answer": "Bochum liegt im dicht besetzten Kranmarkt des Ruhrgebiets. Durch die hohe Anbieterdichte — Dortmund, Essen, Gelsenkirchen und Herne liegen alle unter 20 km entfernt — ist der Wettbewerb groß, was sich tendenziell günstig auf die Preise auswirkt. Die {craneName}-Mietkosten bewegen sich im westdeutschen Marktdurchschnitt (konkrete Tagespreise finden Sie in der Preisübersicht oben). Ein Vergleich mehrerer Angebote spart in Bochum erfahrungsgemäß 10–20 % gegenüber dem erstbesten Angebot.",
    },
    {
        "question": "Wie schnell kann ein {craneName} in Bochum geliefert werden?",
        "answer": "Die meisten Anbieter liefern innerhalb von 24–48 Stunden. Über die A40 (Ruhrschnellweg), A43 und A44 erreichen Vermieter aus Dortmund (rund 20 km), Essen (rund 15 km), Herne, Gelsenkirchen und Recklinghausen das Bochumer Stadtgebiet sehr schnell — die Anbieterdichte im Ruhrgebiet ist eine der höchsten bundesweit. Bei kurzfristigem Bedarf lohnt sich die parallele Anfrage bei mehreren Betrieben, da die freien Kapazitäten je nach Wochentag stark schwanken.",
    },
    {
        "question": "Welche Besonderheiten gelten für Kraneinsätze in Bochum?",
        "answer": "Bochums dichte Innenstadt- und Altbaubebauung aus der Zechenzeit (etwa in Ehrenfeld oder Stiepel) bedeutet oft enge Hinterhofzufahrten — hier sind kompakte Minikrane bzw. Spinnenkrane im Vorteil. Auf dem ehemaligen Opel-Gelände Mark 51°7 und in den Gewerbegebieten entlang der A40 sind dagegen Mobilkrane für Industrie- und Hallenmontagen gefragt. Für Aufstellungen rund um die Ruhr-Universität und in der Innenstadt-Fußgängerzone (Kortumstraße) müssen Aufstellzeiten und Anlieferung eng mit dem Tiefbauamt abgestimmt werden.",
    },
    {
        "question": "Welche Krantypen sind in Bochum besonders gefragt?",
        "answer": "Im Ruhrgebiet prägen drei Einsatzfelder die Nachfrage: Mobil- und Autokrane für Industrie- und Hallenmontagen in den Gewerbegebieten entlang A40 und A43, Dachdecker- und Ladekrane für die Sanierung des großen Altbaubestands aus der Zechenzeit sowie Minikrane für beengte Hinterhöfe und Innenmontagen in den dicht bebauten Stadtteilen. Den passenden {craneName} für Ihr Projekt finden Sie über die kostenlose Sammelanfrage.",
    },
]

BONN_FAQS = [
    {
        "question": "Brauche ich eine Genehmigung für einen {craneName} in Bonn?",
        "answer": "Auf privatem Gelände nicht. Für öffentliche Verkehrsflächen benötigen Sie eine Sondernutzungserlaubnis beim Tiefbauamt der Bundesstadt Bonn (Amt 66, Dezernat III). Der Antrag ist nach § 5 der Sondernutzungssatzung in der Regel mindestens eine Woche vor Beginn schriftlich mit Angaben zu Ort, Art, Umfang und Dauer einzureichen; die Gebühr richtet sich nach Lage und Dauer. Im Bundesviertel (UN-Campus, Post Tower, Bundesbehörden) und am Rheinufer sind erhöhte Sicherheits- und Zufahrtsauflagen möglich — hier mehr Vorlauf einplanen.",
    },
    {
        "question": "Was kostet ein {craneName} in Bonn?",
        "answer": "Bonn profitiert von der unmittelbaren Nähe zu Köln (nur rund 25 km über die A555). Der große Kölner Markt mit hoher Anbieterzahl bedient Bonn mit und hält Verfügbarkeit wie Preise im rheinischen Marktdurchschnitt. Die {craneName}-Mietkosten entsprechen dem westdeutschen Niveau (Tagespreise siehe Preisübersicht oben). Da viele Anbieter aus Köln, Leverkusen und dem Rhein-Sieg-Kreis Bonn beliefern, lohnt der Vergleich mehrerer Angebote besonders — typische Ersparnis 10–20 %.",
    },
    {
        "question": "Wie schnell kann ein {craneName} in Bonn geliefert werden?",
        "answer": "Die meisten Bonner und Kölner Vermieter liefern innerhalb von 24–48 Stunden. Über die A555 (Köln), A565 und A59 erreichen Anbieter aus Köln (rund 25 km), Leverkusen, Düsseldorf und dem Rhein-Sieg-Kreis das Stadtgebiet zügig. In der engen Altstadt und in der Südstadt mit ihren Gründerzeitstraßen sind die Zufahrtswege länger zu kalkulieren; bei großen Mobilkranen empfiehlt sich ein vorheriger Ortstermin durch den Vermieter.",
    },
    {
        "question": "Welche Besonderheiten gelten für Kraneinsätze in Bonn?",
        "answer": "Als Bundesstadt hat Bonn besondere Auflagen: Im Bundesviertel rund um UN-Campus, Post Tower und World Conference Center sowie an Bundesbehörden gelten erhöhte Sicherheits- und Zufahrtskontrollen — Aufstellungen sind hier oft nur mit Vorlauf und Abstimmung möglich. Die Bonner Südstadt, eines der größten zusammenhängenden Gründerzeitviertel Deutschlands, sowie die Altstadt und Bad Godesberg haben enge Straßen und Denkmalschutz, sodass kompakte Krane und eine sorgfältige Stellplatzplanung nötig sind. Am Rheinufer sind Untergrund und Tragfähigkeit der Aufstellfläche vorab zu prüfen.",
    },
    {
        "question": "Welche Krantypen sind in Bonn besonders gefragt?",
        "answer": "Den Bonner Markt prägen Mobil- und Autokrane für die Büro- und Verwaltungsbauten im Bundesviertel, Dachdecker- und Minikrane für die Sanierung des großen Gründerzeitbestands in der Südstadt und in Bad Godesberg sowie Ladekrane für die Logistik rund um die großen Arbeitgeber Deutsche Post DHL und Telekom. Für beengte Innenhöfe und denkmalgeschützte Fassaden ist eine genaue Stellplatzplanung entscheidend — den passenden {craneName} finden Sie über die kostenlose Sammelanfrage.",
    },
]

NUERNBERG_FAQS = [
    {
        "question": "Brauche ich eine Genehmigung für einen {craneName} in Nürnberg?",
        "answer": "Auf privatem Gelände nicht. Für öffentliche Flächen benötigen Sie eine Sondernutzungserlaubnis beim Servicebetrieb Öffentlicher Raum (SÖR), Sulzbacher Straße 2–6. Wichtig: Nürnberg verlangt den Antrag deutlich früher als viele andere Städte — mindestens vier bis sechs Wochen vor Baubeginn. Sondernutzung (SoNu) und verkehrsrechtliche Anordnung (VRAO) werden dabei im kombinierten Verfahren beantragt, eine getrennte Antragstellung ist nicht nötig. Planen Sie diesen Vorlauf besonders bei Einsätzen in der Altstadt großzügig ein.",
    },
    {
        "question": "Was kostet ein {craneName} in Nürnberg?",
        "answer": "Nürnberg und Franken haben eine etwas geringere Anbieterdichte als die Ballungsräume Rhein-Ruhr oder München. Bei kurzfristigem Bedarf oder Spezialgeräten kann sich das auf Vorlauf und Preis auswirken; für planbare Standardprojekte sind die Konditionen marktüblich. Die {craneName}-Tagespreise finden Sie in der Preisübersicht oben. Ein Vergleich mehrerer Angebote — auch von Anbietern aus Ingolstadt, Regensburg oder Würzburg — lohnt sich hier besonders.",
    },
    {
        "question": "Wie schnell kann ein {craneName} in Nürnberg geliefert werden?",
        "answer": "Im Stadtgebiet liefern die meisten Anbieter innerhalb von 24–48 Stunden. Über die A3, A6, A9 und A73 erreichen auch Vermieter aus Ingolstadt, Regensburg, Würzburg und Augsburg den Großraum Nürnberg. Wegen der geringeren Gerätedichte in Franken empfiehlt sich für größere Mobilkrane etwas mehr Vorlauf als in den westdeutschen Ballungsräumen — bei spontanem Bedarf hilft die parallele Anfrage bei mehreren Betrieben.",
    },
    {
        "question": "Welche Besonderheiten gelten für Kraneinsätze in Nürnberg?",
        "answer": "Die denkmalgeschützte Altstadt innerhalb der Stadtmauer (Sebalder und Lorenzer Altstadt, Burgviertel) ist sehr eng und teils gepflastert — hier sind kompakte Minikrane bzw. Spinnenkrane und eine sorgfältige Lastplanung oft die einzige Lösung, größere Mobilkrane benötigen Sondergenehmigungen. In den Gewerbe- und Industriegebieten rund um den Hafen Nürnberg, in der Südstadt und auf dem Messegelände sind dagegen schwere Mobilkrane für Anlagen- und Messebau gefragt. Wegen der langen Genehmigungsvorlaufzeit beim SÖR sind innerstädtische Einsätze früh zu planen.",
    },
    {
        "question": "Welche Krantypen sind in Nürnberg besonders gefragt?",
        "answer": "Den Markt prägen Mobil- und Autokrane für Industrie, Hafenlogistik und Messebau auf dem Messegelände sowie an den großen Industriestandorten der Region, dazu Minikrane und Dachdeckerkrane für die Sanierung der Altstadt und der gründerzeitlichen Wohnviertel. Für die beengten Innenhöfe innerhalb der Stadtmauer ist eine genaue Stellplatzplanung entscheidend — den passenden {craneName} für Ihr Projekt finden Sie über die kostenlose Sammelanfrage.",
    },
]


def merge_keep_existing(existing: list, additions: list) -> list:
    """Keep existing FAQs verbatim; append only additions whose question text
    is not already present. Never overwrites hand-curated content."""
    seen = {q["question"] for q in existing}
    merged = list(existing)
    for q in additions:
        if q["question"] not in seen:
            merged.append(q)
    return merged


# Surgical text correction to a pre-existing Nürnberg FAQ answer: the prior
# override stated "Bearbeitungszeit: ca. 2 Wochen", but the Servicebetrieb
# Öffentlicher Raum (SÖR) officially asks for the application 4-6 weeks before
# start (WebSearch-verified 2026-06-21, nuernberg.de/internet/soer_nbg). Replace
# only that sentence; the rest of the curated answer stays untouched. Idempotent.
NUERNBERG_CORRECTIONS = [
    (
        "Bearbeitungszeit: ca. 2 Wochen.",
        "Den Antrag sollten Sie mindestens vier bis sechs Wochen vor Baubeginn stellen; Sondernutzung (SoNu) und verkehrsrechtliche Anordnung (VRAO) werden dabei im kombinierten Verfahren bearbeitet.",
    ),
]


def apply_corrections(faqs: list, corrections: list) -> list:
    """Replace outdated substrings in answers. Idempotent — only changes a FAQ
    if the old substring is present."""
    out = []
    for f in faqs:
        answer = f["answer"]
        for old, new in corrections:
            if old in answer:
                answer = answer.replace(old, new)
        out.append({**f, "answer": answer})
    return out


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--commit", action="store_true")
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )

    # mode: "replace" only for cities with 0 existing overrides (verified in
    # dry-run); "merge" preserves prior curated content (Nürnberg already had 4).
    plan = [
        ("bochum", "Bochum", BOCHUM_FAQS, "replace"),
        ("bonn", "Bonn", BONN_FAQS, "replace"),
        ("nuernberg", "Nürnberg", NUERNBERG_FAQS, "merge"),
    ]

    print("=" * 70)
    print("City FAQ override plan — Bochum / Bonn / Nürnberg")
    print("=" * 70)

    resolved: list[tuple[str, str, list]] = []
    for slug, name, faqs, mode in plan:
        row = sb.table("cities").select("slug, city_faq_override").eq("slug", slug).single().execute().data
        existing = (row.get("city_faq_override") or []) if row else None
        if existing is None:
            print(f"\n  {name} ({slug}): CITY MISSING — skipped")
            continue
        # Safety rail: refuse to replace a city that unexpectedly already has data.
        if mode == "replace" and len(existing) > 0:
            print(f"\n  {name} ({slug}): expected 0 overrides but found {len(existing)} — SKIPPED (use merge)")
            continue
        final = faqs if mode == "replace" else merge_keep_existing(existing, faqs)
        if slug == "nuernberg":
            final = apply_corrections(final, NUERNBERG_CORRECTIONS)
        resolved.append((slug, name, final))
        print(f"\n  {name} ({slug}) [{mode}]: current {len(existing)} → final {len(final)} FAQs")
        for i, f in enumerate(final, 1):
            tag = " (NEW)" if f not in existing else ""
            print(f"    {i}. {f['question'][:88]}{tag}")

    if not args.commit:
        print("\n  Dry run — no DB writes. Re-run with --commit.")
        return 0

    for slug, name, faqs in resolved:
        sb.table("cities").update({"city_faq_override": faqs}).eq("slug", slug).execute()
        print(f"  ✓ {name}: city_faq_override updated ({len(faqs)} entries)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
