#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""One-off: trim whitespace from companies.zip for Boels entries."""
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

rows = sb.table("companies").select("id,slug,zip").ilike("name", "%boels%").execute().data
fixed = 0
for r in rows:
    z = r.get("zip")
    if z and z != z.strip():
        new_zip = z.strip()
        sb.table("companies").update({"zip": new_zip}).eq("id", r["id"]).execute()
        print(f"  {r['slug']}: {z!r} → {new_zip!r}")
        fixed += 1
print(f"\nFixed {fixed} zip(s)")
