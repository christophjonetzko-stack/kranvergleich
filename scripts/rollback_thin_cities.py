#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Rollback Göttingen + Osnabrück from Supabase. My earlier diagnostic
over-predicted declared coverage (9/8 expected, 2/2 actual after
normalize_service_regions.py ran) — real firm coverage is below
the ≥3-firms-per-type threshold that generateStaticParams enforces,
so no crane-type pages would generate. Leaving them as Supabase rows
with no pages means visitors hit 404 instead of the prior working 307
redirect to Hannover.

Delete company_regions rows first (FK), then cities rows. Both stay
in _extraCities so the 307 redirect continues to serve users.
"""
import os
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
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

SLUGS = ["goettingen", "osnabrueck"]

rows = sb.table("cities").select("id, slug, name").in_("slug", SLUGS).execute().data
if not rows:
    print("Nothing to rollback.")
    sys.exit(0)

for r in rows:
    cr = sb.table("company_regions").select("id", count="exact").eq("city_id", r["id"]).execute()
    print(f"{r['slug']:15s} city_id={r['id']} company_regions={cr.count}")

print()
for r in rows:
    sb.table("company_regions").delete().eq("city_id", r["id"]).execute()
    print(f"  DELETED company_regions for {r['slug']}")
    sb.table("cities").delete().eq("id", r["id"]).execute()
    print(f"  DELETED cities row for {r['slug']}")

print()
print("Done. These two slugs stay in _extraCities → 307 to nearestSlug continues.")
