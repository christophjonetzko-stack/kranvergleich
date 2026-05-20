#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 1 — Dachdeckerkran nationwide DE backfill (2026-05-20).

Adapted from at_firms_outscraper_search.py for the catalog-firm-sourcing
skill applied to the Dachdeckerkran-only systemic gap (coverage_gap_analysis_
2026_05_20.json: 43 firms catalog-wide, 58 of 72 regional buckets weak,
1 HARD gap Rostock).

The original kranvergleich-wide Outscraper sweep used the generic
"Kranverleih <city>" query and undercounted Dachdeckerkran-specialist
firms — many are listed under "Dachdecker-Kranverleih", "Dachdeckerkran-
Vermietung", or "Dachkran" (compound noun German speakers actually use
for the niche). This script targets those query variants.

Cost: ~$0.002/result on the standard Outscraper plan. 20 cities × 4
templates × ~10-25 results each → expected 200-400 raw results, ~$0.50-1.50.

Usage:
  python scripts/dachdeckerkran_de_outscraper_search.py --dry-run
  python scripts/dachdeckerkran_de_outscraper_search.py

Environment (from .env.local):
  OUTSCRAPER_API_KEY  (required)
"""
import argparse
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

# 20 cities — selected per coverage_gap_analysis_2026_05_20.json:
#   - 1 HARD gap (Rostock — only region with 0 Dachdeckerkran ≤150km)
#   - 3 ALL-types sparse (Kiel, Saarbrücken — Rostock already above)
#   - 12 Dachdeckerkran-weak by population (München, Stuttgart, Bremen,
#     Dresden, Nürnberg, Bielefeld, Hannover, Augsburg, Bonn, Mannheim,
#     Karlsruhe, Braunschweig)
#   - 4 baseline (Berlin, Hamburg, Köln, Frankfurt am Main) — even though
#     they're well-covered for OTHER crane types, Dachdeckerkran is sparse
#     everywhere and these contain the firm registries we should re-sweep
#   - Plus Leipzig + Würzburg + Lübeck rounding out underserved regions
CITIES = [
    # Hard gap + coastal-North sparse
    "Rostock",
    "Kiel",
    "Lübeck",
    "Bremen",
    "Schwerin",
    # Dachdeckerkran-weak high-pop
    "München",
    "Stuttgart",
    "Dresden",
    "Nürnberg",
    "Bielefeld",
    "Hannover",
    "Augsburg",
    "Bonn",
    "Mannheim",
    "Karlsruhe",
    "Braunschweig",
    "Saarbrücken",
    # Baseline + Mittelrhein/Hessen rounding out (Westerwald-area was the
    # Kohlhaas trigger — Frankfurt + Köln + Würzburg pickup secondary
    # firms that service the gap)
    "Berlin",
    "Hamburg",
    "Köln",
    "Frankfurt am Main",
    "Leipzig",
    "Würzburg",
]

# Dachdeckerkran-specific German terms. Order matters for cache locality
# in Outscraper (same query format repeated across cities).
DEFAULT_TEMPLATES = [
    "Dachdeckerkran Vermietung {city}",
    "Dachdecker Kranverleih {city}",
    "Dachkran mieten {city}",
    "Dachdecker Aufzug Kran {city}",
]

OUTPUT_FILE = Path(__file__).parent / "dachdeckerkran_de_outscraper_raw.json"
SLEEP_BETWEEN_QUERIES_SEC = 1.0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=25, help="results per city query")
    parser.add_argument("--dry-run", action="store_true", help="print queries, no API calls")
    parser.add_argument(
        "--templates",
        default=",".join(DEFAULT_TEMPLATES),
        help='comma-separated query templates with {city}',
    )
    parser.add_argument(
        "--cities",
        default="",
        help='comma-separated city overrides; default = nationwide 23-city list',
    )
    args = parser.parse_args()

    templates = [t.strip() for t in args.templates.split(",") if t.strip()]
    cities_to_query = [c.strip() for c in args.cities.split(",") if c.strip()] if args.cities else CITIES
    pairs = [(t, city) for t in templates for city in cities_to_query]

    existing_queries: list[dict] = []
    if OUTPUT_FILE.exists():
        try:
            existing_queries = json.loads(OUTPUT_FILE.read_text(encoding="utf-8")).get("queries", [])
        except Exception:
            existing_queries = []
    existing_query_strs = {q.get("query") for q in existing_queries}

    pairs_to_fetch = [(t, city) for t, city in pairs if t.format(city=city) not in existing_query_strs]
    queries = [t.format(city=city) for t, city in pairs_to_fetch]

    print("=" * 70)
    print("Dachdeckerkran DE backfill — Outscraper Google Maps search")
    print(f"  templates ({len(templates)}): {templates}")
    print(f"  cities ({len(cities_to_query)}): {cities_to_query}")
    print(f"  limit per query: {args.limit}")
    print(f"  total query slots: {len(pairs)}; already fetched: {len(pairs) - len(pairs_to_fetch)}; new: {len(pairs_to_fetch)}")
    print(f"  estimated cost: ~${len(pairs_to_fetch) * args.limit * 0.002:.2f} (max if every query returns {args.limit} results)")
    print("=" * 70)

    if not pairs_to_fetch:
        print("Nothing new to fetch — all (template × city) pairs already present.")
        return 0

    if args.dry_run:
        for (t, city), query in zip(pairs_to_fetch, queries):
            print(f"  [{t[:30]}] {city:<22} → '{query}' (limit {args.limit})")
        print()
        print("Dry run — no API calls made. Re-run without --dry-run to fetch.")
        return 0

    api_key = os.environ.get("OUTSCRAPER_API_KEY", "").strip()
    if not api_key:
        print("ERROR: OUTSCRAPER_API_KEY missing in .env.local", file=sys.stderr)
        return 2

    try:
        from outscraper import ApiClient
    except ImportError:
        print("ERROR: `pip install outscraper` first", file=sys.stderr)
        return 2

    client = ApiClient(api_key=api_key)

    all_results = list(existing_queries)
    total_count = sum(q.get("results_count", 0) for q in existing_queries)
    started_at = _now_iso()

    for i, ((template, city), query) in enumerate(zip(pairs_to_fetch, queries), start=1):
        print(f"  [{i}/{len(pairs_to_fetch)}] {query!r} ...", end=" ", flush=True)
        try:
            response = client.google_maps_search(
                query=query,
                limit=args.limit,
                language="de",
                region="DE",
            )
            results = response[0] if response and isinstance(response, list) else []
            count = len(results)
            total_count += count
            sample_names = [r.get("name") for r in results[:3]]
            print(f"{count} results — e.g. {sample_names}")
            all_results.append({
                "city": city,
                "query": query,
                "template": template,
                "limit": args.limit,
                "results_count": count,
                "fetched_at": _now_iso(),
                "results": results,
            })
        except Exception as e:
            print(f"FAIL — {type(e).__name__}: {e}")
            all_results.append({
                "city": city,
                "query": query,
                "template": template,
                "limit": args.limit,
                "results_count": 0,
                "error": f"{type(e).__name__}: {e}",
                "fetched_at": _now_iso(),
                "results": [],
            })
        if i < len(pairs_to_fetch):
            time.sleep(SLEEP_BETWEEN_QUERIES_SEC)

    finished_at = _now_iso()

    payload = {
        "started_at": started_at,
        "finished_at": finished_at,
        "limit_per_query": args.limit,
        "total_results": total_count,
        "queries": all_results,
    }
    OUTPUT_FILE.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")

    print()
    print("=" * 70)
    print(f"Total raw results: {total_count}")
    print(f"Saved to: {OUTPUT_FILE.relative_to(Path.cwd()) if OUTPUT_FILE.is_relative_to(Path.cwd()) else OUTPUT_FILE}")
    print("=" * 70)
    print()
    print("Next step: Step 2 filter+dedupe (free, no API calls).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
