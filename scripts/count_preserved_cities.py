#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Read-only: count firms per city for the 11 preserved _extraCities so we can
promote them into seoCities with accurate companyCount.
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

SLUGS = [
    "aachen", "bielefeld", "bochum", "bonn", "erfurt",
    "freiburg", "kiel", "magdeburg", "mainz", "rostock",
    "saarbruecken",
]

cities = (
    sb.table("cities")
    .select("id, slug, name, state")
    .in_("slug", SLUGS)
    .execute()
    .data
)

print(f"Found {len(cities)} of {len(SLUGS)} in Supabase.cities")
print()
print(f"{'slug':22s}{'name':22s}{'state':26s}{'home':>6s}{'regions':>9s}")
print("-" * 85)

results = {}
for city in cities:
    home = (
        sb.table("companies")
        .select("id", count="exact")
        .eq("city", city["name"])
        .eq("is_active", True)
        .eq("is_relevant", True)
        .execute()
    )
    regions = (
        sb.table("company_regions")
        .select("company_id", count="exact")
        .eq("city_id", city["id"])
        .execute()
    )
    results[city["slug"]] = {
        "name": city["name"],
        "state": city["state"],
        "home": home.count,
        "regions": regions.count,
    }

for slug in SLUGS:
    r = results.get(slug)
    if not r:
        print(f"  MISSING in Supabase: {slug}")
        continue
    print(f"{slug:22s}{r['name']:22s}{r['state']:26s}{r['home']:>6d}{r['regions']:>9d}")
