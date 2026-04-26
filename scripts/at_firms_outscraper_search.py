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
DEFAULT_TEMPLATES = ["Kranverleih {city}"]
OUTPUT_FILE = Path(__file__).parent / "at_firms_outscraper_raw.json"
SLEEP_BETWEEN_QUERIES_SEC = 1.0  # be polite to the API


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=50, help="results per city query")
    parser.add_argument("--dry-run", action="store_true", help="print queries, no API calls")
    parser.add_argument(
        "--templates",
        default=",".join(DEFAULT_TEMPLATES),
        help='comma-separated query templates with {city}; e.g. "Kranverleih {city},Autokran {city}"',
    )
    parser.add_argument(
        "--cities",
        default="",
        help='comma-separated city overrides; if empty, uses the seoCitiesAT-aligned CITIES constant',
    )
    args = parser.parse_args()

    templates = [t.strip() for t in args.templates.split(",") if t.strip()]
    cities_to_query = [c.strip() for c in args.cities.split(",") if c.strip()] if args.cities else CITIES
    pairs = [(t, city) for t in templates for city in cities_to_query]

    # Load existing results — append mode: skip queries already present so
    # re-runs with extra templates only pay for the new query strings.
    existing_queries: list[dict] = []
    if OUTPUT_FILE.exists():
        try:
            existing_queries = json.loads(OUTPUT_FILE.read_text(encoding="utf-8")).get("queries", [])
        except Exception:
            existing_queries = []
    existing_query_strs = {q.get("query") for q in existing_queries}

    pairs_to_fetch = [(t, city) for t, city in pairs if t.format(city=city) not in existing_query_strs]
    queries = [t.format(city=city) for t, city in pairs_to_fetch]

    print("=" * 60)
    print("AT firm sourcing — Outscraper Google Maps search")
    print(f"  templates: {templates}")
    print(f"  cities ({len(cities_to_query)}): {cities_to_query}")
    print(f"  limit per query: {args.limit}")
    print(f"  total query slots: {len(pairs)}; already fetched: {len(pairs) - len(pairs_to_fetch)}; new: {len(pairs_to_fetch)}")
    print("=" * 60)

    if not pairs_to_fetch:
        print("Nothing new to fetch — all (template × city) pairs already present in raw JSON.")
        return 0

    if args.dry_run:
        for (t, city), query in zip(pairs_to_fetch, queries):
            print(f"  [{t}] {city:<14} → '{query}' (limit {args.limit})")
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

    all_results = list(existing_queries)  # carry forward old results
    total_count = sum(q.get("results_count", 0) for q in existing_queries)
    started_at = _now_iso()

    for i, ((template, city), query) in enumerate(zip(pairs_to_fetch, queries), start=1):
        print(f"  [{i}/{len(pairs_to_fetch)}] {query!r} ...", end=" ", flush=True)
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
