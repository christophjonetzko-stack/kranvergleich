#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 1 of the AT firm-sourcing pipeline (BAZA_WIEDZY §144-163).

Runs Outscraper Google Maps search for "Kranverleih <city>" across the 10 top
AT cities and saves raw results to scripts/at_firms_outscraper_raw.json.

NO writes to Supabase — this is sourcing only. Decisions about filter/dedupe/
verify/enrich happen in subsequent steps after reviewing the raw output.

Cost: ~$0.002 per result on the typical Outscraper plan; ~50-200 results expected
total → roughly $0.10-0.50. Verify against your actual plan.

Usage:
  python scripts/at_firms_outscraper_search.py             # full run
  python scripts/at_firms_outscraper_search.py --limit 20  # cheaper, fewer results per city
  python scripts/at_firms_outscraper_search.py --dry-run   # print plan, no API calls

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

CITIES = [
    "Wien",
    "Graz",
    "Linz",
    "Salzburg",
    "Innsbruck",
    "Klagenfurt",
    "Villach",
    "Wels",
    "St. Pölten",
    "Dornbirn",
]
QUERY_TEMPLATE = "Kranverleih {city}"
OUTPUT_FILE = Path(__file__).parent / "at_firms_outscraper_raw.json"
SLEEP_BETWEEN_QUERIES_SEC = 1.0  # be polite to the API


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=50, help="results per city query")
    parser.add_argument("--dry-run", action="store_true", help="print queries, no API calls")
    args = parser.parse_args()

    queries = [QUERY_TEMPLATE.format(city=city) for city in CITIES]

    print("=" * 60)
    print("AT firm sourcing — Outscraper Google Maps search")
    print(f"  cities: {len(CITIES)}, limit per query: {args.limit}")
    print("=" * 60)

    if args.dry_run:
        for city, query in zip(CITIES, queries):
            print(f"  {city:<14} → '{query}' (limit {args.limit})")
        print()
        print("Dry run — no API calls made. Re-run without --dry-run to fetch.")
        return 0

    api_key = os.environ.get("OUTSCRAPER_API_KEY", "").strip()
    if not api_key:
        print("ERROR: OUTSCRAPER_API_KEY missing in .env.local", file=sys.stderr)
        return 2

    # Lazy import so dry-run works without the package installed.
    try:
        from outscraper import ApiClient
    except ImportError:
        print("ERROR: `pip install outscraper` first", file=sys.stderr)
        return 2

    client = ApiClient(api_key=api_key)

    all_results = []
    total_count = 0
    started_at = _now_iso()

    for i, (city, query) in enumerate(zip(CITIES, queries), start=1):
        print(f"  [{i}/{len(CITIES)}] {query!r} ...", end=" ", flush=True)
        try:
            response = client.google_maps_search(
                query=query,
                limit=args.limit,
                language="de",
                region="AT",
            )
            # google_maps_search returns a list of result-lists (one per query).
            # We pass a single query string, so response[0] is our list.
            results = response[0] if response and isinstance(response, list) else []
            count = len(results)
            total_count += count
            sample_names = [r.get("name") for r in results[:3]]
            print(f"{count} results — e.g. {sample_names}")
            all_results.append({
                "city": city,
                "query": query,
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
                "limit": args.limit,
                "results_count": 0,
                "error": f"{type(e).__name__}: {e}",
                "fetched_at": _now_iso(),
                "results": [],
            })
        if i < len(CITIES):
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
    print("=" * 60)
    print(f"Total raw results: {total_count}")
    print(f"Saved to: {OUTPUT_FILE.relative_to(Path.cwd()) if OUTPUT_FILE.is_relative_to(Path.cwd()) else OUTPUT_FILE}")
    print("=" * 60)
    print()
    print("Next step: review the JSON, then run the filter/dedupe pass")
    print("(or paste a quick summary back to Claude for review).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
