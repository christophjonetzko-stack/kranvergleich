"""
Extract crane brands a firm RENTS (not just services) from description_enriched
into companies.brands_offered TEXT[] via Claude LLM with tool_use.

Why LLM vs regex: many descriptions mention brands as service-only context
("Repariert Liebherr-Krane", "wartet Böcker Schrägaufzüge", "Schiffskrane
(Liebherr)") — these are NOT rental brands. Regex can't distinguish; LLM
trivially can with proper prompt.

Coverage strategy:
  - Only firms with description_enriched (588 of 745 active+relevant)
  - Skip firms whose description has no recognizable brand-string-trigger
    (cheap regex pre-filter saves ~80% of API calls)
  - Idempotent — overwrites companies.brands_offered if --force, skips
    firms with non-null brands_offered by default

Cost ceiling: ~Cel:0.30 (sonnet/haiku) or ~Cel:1.50 (opus) for 70 firms at
~3k tokens system + ~1k tokens per firm. Haiku 4.5 is sufficient for this
extraction task (closed-domain, list-based, structured output).

Output: scripts/brands_extraction_proposal.json + DB UPDATE when --commit.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from collections import Counter
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
if ENV_FILE.exists():
    for raw in ENV_FILE.read_text(encoding="utf-8").splitlines():
        raw = raw.strip()
        if raw and not raw.startswith("#") and "=" in raw:
            k, _, v = raw.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

from anthropic import Anthropic
from supabase import create_client


# Recognized German crane brand strings (case-insensitive trigger for pre-filter)
KNOWN_BRAND_TRIGGERS = [
    "liebherr", "tadano", "grove", "manitowoc", "demag", "faun", "terex", "krupp",
    "klaas", "potain", "wolffkran", "böcker", "boecker", "spierings", "comansa",
    "sennebogen", "mantis", "hitachi", "kobelco", "maeda", "jekko", "hoeflon",
    "unic", "palfinger", "hiab", "fassi", "atlas", "cormach", "effer", "hmf",
    "amak", "dalbe", "cattaneo", "opti", "rothlehner", "mannesmann",
]
BRAND_TRIGGER_RE = re.compile("|".join(re.escape(b) for b in KNOWN_BRAND_TRIGGERS), re.IGNORECASE)


SYSTEM = """Du bist ein Datenextraktions-Werkzeug für einen deutschen Kranverleih-Katalog.

Aus einer kurzen Firmenbeschreibung extrahierst du AUSSCHLIESSLICH Kranmarken, die die Firma VERMIETET oder selbst betreibt (Mietpark, Flotte, "vermietet Krane der Marke X"). Du extrahierst KEINE Marken, die die Firma nur wartet, repariert, schult, transportiert oder als Ersatzteil-Lieferant bedient.

Beispiele:
- "vermietet über 100 Krane der Hersteller Liebherr und Potain" → rental_brands: ["Liebherr", "Potain"]
- "Der Mietpark besteht aus Liebherr-Kränen" → rental_brands: ["Liebherr"]
- "Autokrane der Marken Faun und Tadano" → rental_brands: ["Faun", "Tadano"]
- "Repariert Liebherr-Krane" → rental_brands: []  (nur Service, kein Mietpark)
- "wartet Böcker Schrägaufzüge" → rental_brands: []  (Wartung)
- "Erfahrung aus dem Servicebereich für Schiffskrane (Liebherr)" → rental_brands: []  (Service, nicht Vermietung)
- "spezialisiert auf Vermietung moderner Turmdrehkrane der Marke Potain" → rental_brands: ["Potain"]

Markennormierung:
- Liebherr (NICHT "Liebherr-Werk Ehingen", NICHT "Liebherr LTM" — nur "Liebherr")
- Potain (nicht "Potain MDT 178")
- Wolffkran (NICHT "Wolff" alleine — das ist Konjunktion/Name)
- Böcker (mit Umlaut)
- Tadano-Faun → ["Tadano", "Faun"] (zwei Marken)
- PM Onil, PM Group → ["PM"] nur wenn Kran-Hersteller, nicht Allgemeingut

Wenn die Beschreibung KEINE Vermietungsmarken nennt, gib leer zurück: rental_brands: [].

Sei strikt — lieber leere Liste als falsches Positiv."""

EXTRACT_TOOL = {
    "name": "extract_rental_brands",
    "description": "Extrahiert die Kranmarken, die die Firma vermietet (NICHT die, die sie nur wartet/repariert).",
    "input_schema": {
        "type": "object",
        "properties": {
            "rental_brands": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Liste der Kranmarken, die die Firma vermietet (normalisierte Schreibweise, z.B. ['Liebherr', 'Potain']). Leere Liste, wenn keine Vermietungsmarken erwähnt sind.",
            },
            "service_only_brands": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Marken, die die Firma NUR wartet/repariert/transportiert, aber NICHT vermietet. Für interne Datenqualität.",
            },
            "confidence": {
                "type": "string",
                "enum": ["high", "medium", "low"],
                "description": "high = explizit 'vermietet/Marke X'; medium = aus Kontext ableitbar; low = unklar oder vage",
            },
        },
        "required": ["rental_brands", "service_only_brands", "confidence"],
    },
}


def call_claude(client: Anthropic, model: str, name: str, description: str) -> dict | None:
    resp = client.messages.create(
        model=model,
        max_tokens=600,
        system=[{"type": "text", "text": SYSTEM, "cache_control": {"type": "ephemeral"}}],
        tools=[EXTRACT_TOOL],
        tool_choice={"type": "auto", "disable_parallel_tool_use": True},
        messages=[
            {
                "role": "user",
                "content": (
                    f"Firma: {name}\n\n"
                    f"Beschreibung:\n{description}\n\n"
                    "Rufe das Werkzeug `extract_rental_brands` auf und gib die Vermietungsmarken zurück."
                ),
            }
        ],
    )
    for block in resp.content:
        if getattr(block, "type", "") == "tool_use" and getattr(block, "name", "") == "extract_rental_brands":
            return dict(block.input)
    return None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--commit", action="store_true", help="Apply DB updates")
    parser.add_argument("--force", action="store_true", help="Re-extract for firms with existing brands_offered")
    parser.add_argument("--limit", type=int, default=None, help="Process at most N firms")
    parser.add_argument("--slugs", type=str, default=None, help="Comma-separated firm slugs to process")
    parser.add_argument("--model", type=str, default="claude-haiku-4-5", help="Anthropic model id")
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )
    client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    # Fetch candidates
    q = sb.table("companies").select(
        "id, slug, name, description_enriched, brands_offered"
    ).eq("is_active", True).eq("is_relevant", True)
    if args.slugs:
        slug_list = [s.strip() for s in args.slugs.split(",") if s.strip()]
        q = q.in_("slug", slug_list)
    rows = []
    start = 0
    while True:
        chunk = q.range(start, start + 999).execute().data
        rows.extend(chunk)
        if len(chunk) < 1000:
            break
        start += 1000

    # Filter to firms with description + brand trigger
    candidates = []
    for r in rows:
        desc = r.get("description_enriched")
        if not desc:
            continue
        if not BRAND_TRIGGER_RE.search(desc):
            continue
        if r.get("brands_offered") and not args.force:
            continue
        candidates.append(r)

    if args.limit:
        candidates = candidates[: args.limit]

    print(f"Candidates with description + brand trigger: {len(candidates)}")
    print(f"Model: {args.model}")
    print(f"Mode: {'COMMIT' if args.commit else 'DRY-RUN'}")
    print()

    results = []
    brand_counter: Counter[str] = Counter()
    for i, firm in enumerate(candidates, 1):
        try:
            extracted = call_claude(client, args.model, firm["name"], firm["description_enriched"])
        except Exception as e:
            print(f"  [{i}/{len(candidates)}] ERROR {firm['slug']}: {e}")
            results.append({"slug": firm["slug"], "error": str(e)})
            continue

        if extracted is None:
            print(f"  [{i}/{len(candidates)}] {firm['slug']}: no tool_use returned")
            results.append({"slug": firm["slug"], "error": "no_tool_use"})
            continue

        brands = extracted.get("rental_brands") or []
        service = extracted.get("service_only_brands") or []
        conf = extracted.get("confidence", "low")
        brand_counter.update(brands)

        results.append(
            {
                "slug": firm["slug"],
                "name": firm["name"],
                "rental_brands": brands,
                "service_only_brands": service,
                "confidence": conf,
            }
        )

        marker = "✓" if brands else "·"
        print(f"  [{i:>3}/{len(candidates)}] {marker} {firm['slug']:<50} {conf:<6} rental={brands}")

        if args.commit and brands:
            sb.table("companies").update({"brands_offered": brands}).eq("id", firm["id"]).execute()

        time.sleep(0.15)  # gentle pacing

    # Summary
    print()
    print("=" * 70)
    print("Summary")
    print("=" * 70)
    print(f"  Firms processed: {len(results)}")
    print(f"  Firms with ≥1 rental brand: {sum(1 for r in results if r.get('rental_brands'))}")
    print(f"  Firms with empty rental brands: {sum(1 for r in results if r.get('rental_brands') == [])}")
    print(f"  Errors: {sum(1 for r in results if 'error' in r)}")
    print()
    print("Top 20 brands (by firm count):")
    for brand, n in brand_counter.most_common(20):
        print(f"    {n:>4} firms | {brand}")

    out_path = Path(__file__).parent / "brands_extraction_proposal.json"
    out_path.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n  Proposal written: {out_path}")

    if not args.commit:
        print("\n  DRY RUN — no DB writes. Re-run with --commit to apply.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
