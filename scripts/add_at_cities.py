#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Insert the 10 top AT cities into Supabase `cities` for the kranvergleich.at launch.

Idempotent — safe to re-run. Uses upsert with on_conflict='slug' + ignore_duplicates,
so existing slugs are skipped (no overwrite). Country='AT' is set explicitly so the
migration-012 CHECK constraint accepts them.

Coverage gate is INTENTIONALLY skipped here: AT cities go into Supabase before AT
firms exist. /[crane-type]/[city] generateStaticParams uses
getCitiesWithMinCompanies(_, 3), which returns empty for cities with 0 firms — so
no thin city pages reach the sitemap or get prerendered. seoCitiesAT in
src/data/cities-static.ts also stays empty until tydzień 2 firm-add wave.

Source for population, coords, Bundesland: Statistik Austria + Wikipedia infoboxes
(facts, not copyrightable). Population values are 2024-01-01 official figures or
the most recent available.
"""
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

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

AT_CITIES = [
    {"name": "Wien",       "slug": "wien",          "state": "Wien",             "country": "AT", "population": 1982097, "lat": 48.2082, "lng": 16.3738},
    {"name": "Graz",       "slug": "graz",          "state": "Steiermark",       "country": "AT", "population":  291134, "lat": 47.0707, "lng": 15.4395},
    {"name": "Linz",       "slug": "linz",          "state": "Oberösterreich",   "country": "AT", "population":  206604, "lat": 48.3064, "lng": 14.2858},
    {"name": "Salzburg",   "slug": "salzburg",      "state": "Salzburg",         "country": "AT", "population":  155031, "lat": 47.8095, "lng": 13.0550},
    {"name": "Innsbruck",  "slug": "innsbruck",     "state": "Tirol",            "country": "AT", "population":  131961, "lat": 47.2692, "lng": 11.4041},
    {"name": "Klagenfurt", "slug": "klagenfurt",    "state": "Kärnten",          "country": "AT", "population":  101765, "lat": 46.6243, "lng": 14.3052},
    {"name": "Villach",    "slug": "villach",       "state": "Kärnten",          "country": "AT", "population":   62882, "lat": 46.6111, "lng": 13.8558},
    {"name": "Wels",       "slug": "wels",          "state": "Oberösterreich",   "country": "AT", "population":   62144, "lat": 48.1576, "lng": 14.0264},
    {"name": "St. Pölten", "slug": "sankt-poelten", "state": "Niederösterreich", "country": "AT", "population":   55434, "lat": 48.2058, "lng": 15.6232},
    {"name": "Dornbirn",   "slug": "dornbirn",      "state": "Vorarlberg",       "country": "AT", "population":   50007, "lat": 47.4125, "lng":  9.7417},
]

print("=" * 60)
print(f"Inserting {len(AT_CITIES)} AT cities into Supabase `cities`")
print("=" * 60)

# Pre-check: any slug collision with existing rows? (defensive — slug is UNIQUE)
all_slugs = [c["slug"] for c in AT_CITIES]
existing = sb.table("cities").select("slug, country").in_("slug", all_slugs).execute()
existing_rows = existing.data or []
collisions = [r for r in existing_rows if r["country"] != "AT"]
if collisions:
    print(f"  ✗ ABORT — slug collision with non-AT rows: {collisions}")
    sys.exit(1)
already_at = {r["slug"] for r in existing_rows if r["country"] == "AT"}
if already_at:
    print(f"  ℹ  {len(already_at)} AT cities already present (re-run safe): {sorted(already_at)}")

# Idempotent upsert: existing AT slugs are skipped (no overwrite).
res = sb.table("cities").upsert(AT_CITIES, on_conflict="slug", ignore_duplicates=True).execute()
inserted_now = len(res.data) if res.data else 0
print(f"  ✓ Inserted {inserted_now} new rows")

# Confirm final state.
final = sb.table("cities").select("slug, name, state, population").eq("country", "AT").order("population", desc=True).execute()
final_rows = final.data or []
print()
print(f"Total AT cities in cities table: {len(final_rows)}")
for r in final_rows:
    pop = r["population"] or 0
    print(f"  {r['slug']:<16} {r['name']:<14} {r['state']:<22} pop={pop:>10,}")

print()
print("=" * 60)
print(f"Done. Next step: when AT firms land (tydzień 2), populate seoCitiesAT")
print("in src/data/cities-static.ts so the home page tile grid + SearchBox")
print("autocomplete pick them up on kranvergleich.at.")
print("=" * 60)
