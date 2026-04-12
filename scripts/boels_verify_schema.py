#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Sanity-check schema: crane_types slug + existing Boels column values."""
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

# 1. Minikran crane type
ct = sb.table("crane_types").select("id,slug,name").execute().data
print("Crane types:")
for t in ct:
    print(f"  {t['slug']:15} {t['name']}")

# 2. Full column dump of an existing Boels row
row = sb.table("companies").select("*").eq("slug", "boels-verleih-leipzig").execute().data
if row:
    print("\nExisting Boels Leipzig — all columns:")
    for k, v in row[0].items():
        if v not in (None, "", 0, False, []):
            print(f"  {k}: {v!r}")

# 3. Check if any slug conflict with planned inserts
import json
sel_path = os.path.join(os.path.dirname(__file__), "boels_selected.json")
with open(sel_path, encoding="utf-8") as f:
    selected = json.load(f)
slugs = [f"boels-verleih-gmbh-{s['seo_city_slug']}-bulk" for s in selected]
exist = sb.table("companies").select("slug").in_("slug", slugs).execute().data
print(f"\nPlanned {len(slugs)} slugs — existing conflicts: {len(exist)}")
for e in exist:
    print(f"  CONFLICT: {e['slug']}")
