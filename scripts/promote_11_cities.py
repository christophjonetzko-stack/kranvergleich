#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Promote the 11 remaining _extraCities (with sufficient signal per diagnosis)
into Supabase.cities.

Step 1 (dry-run by default): shows what INSERTs would happen.
Step 2 (--apply): actually INSERTs. Idempotent — skips if slug exists.

After this, run `normalize_service_regions.py --apply` to backfill
company_regions rows; that script reads cities table and matches firm
service_regions[] tokens.
"""
import argparse
import json
import os
import statistics
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

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

# (slug, name, state, population, home_count_from_diagnostic)
NEW_CITIES = [
    ("chemnitz",       "Chemnitz",       "Sachsen",              250000, 2),
    ("wuerzburg",      "Würzburg",       "Bayern",               130000, 1),
    ("gelsenkirchen",  "Gelsenkirchen",  "Nordrhein-Westfalen",  260000, 1),
    ("hagen",          "Hagen",          "Nordrhein-Westfalen",  190000, 1),
    ("oberhausen",     "Oberhausen",     "Nordrhein-Westfalen",  210000, 1),
    ("leverkusen",     "Leverkusen",     "Nordrhein-Westfalen",  165000, 1),
    ("paderborn",      "Paderborn",      "Nordrhein-Westfalen",  150000, 2),
    ("recklinghausen", "Recklinghausen", "Nordrhein-Westfalen",  110000, 1),
    ("jena",           "Jena",           "Thüringen",            110000, 1),
    ("goettingen",     "Göttingen",      "Niedersachsen",        120000, 2),
    ("osnabrueck",     "Osnabrück",      "Niedersachsen",        165000, 1),
]


def load_coords() -> dict[str, tuple[float, float]]:
    """For each target city pull all PLZ entries matching name+state, take the
    median lat/lng as the city centroid."""
    p = Path(__file__).parent.parent / "src" / "data" / "german-cities.json"
    with open(p, encoding="utf-8") as f:
        entries = json.load(f)

    out = {}
    for slug, name, state, _pop, _home in NEW_CITIES:
        matches = []
        state_key = state.lower()
        for c in entries:
            s = (c.get("s") or "").lower()
            if state_key in s and name.lower() in (c.get("n") or "").lower():
                matches.append((c["la"], c["ln"]))
        if not matches:
            print(f"ERROR: no coord match for {name} / {state}")
            sys.exit(1)
        lat = statistics.median(m[0] for m in matches)
        lng = statistics.median(m[1] for m in matches)
        out[slug] = (round(lat, 6), round(lng, 6))
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    coords = load_coords()

    # Pull one existing row to learn schema — needed for safe INSERT (avoids
    # guessing column names).
    sample = sb.table("cities").select("*").limit(1).execute().data[0]
    print(f"cities schema keys: {sorted(sample.keys())}")
    print()

    slugs = [c[0] for c in NEW_CITIES]
    existing = (
        sb.table("cities")
        .select("slug")
        .in_("slug", slugs)
        .execute()
        .data
    )
    existing_slugs = {r["slug"] for r in existing}
    print(f"Already in cities: {sorted(existing_slugs) or '(none)'}")
    print()

    to_insert = []
    for slug, name, state, pop, _home in NEW_CITIES:
        if slug in existing_slugs:
            print(f"  SKIP   {slug:18s} (already exists)")
            continue
        lat, lng = coords[slug]
        row = {
            "slug": slug,
            "name": name,
            "state": state,
            "population": pop,
            "lat": lat,
            "lng": lng,
            "is_active": True,
        }
        to_insert.append(row)
        print(f"  INSERT {slug:18s} {name:16s} {state:22s} pop={pop:>7d} lat={lat:.4f} lng={lng:.4f}")

    print()
    if not to_insert:
        print("Nothing to insert.")
        return

    if not args.apply:
        print(f"Dry-run. Pass --apply to insert {len(to_insert)} rows.")
        return

    res = sb.table("cities").insert(to_insert).execute()
    print(f"Inserted {len(res.data)} rows.")


if __name__ == "__main__":
    main()
