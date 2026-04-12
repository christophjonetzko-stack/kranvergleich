#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Quick query: existing Boels Verleih entries in companies table."""
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

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", os.environ.get("SUPABASE_URL", ""))
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

sb = create_client(SUPABASE_URL, SUPABASE_KEY)

# Case-insensitive match on Boels
res = sb.table("companies").select("id,name,slug,city,state,zip,address,email,phone").ilike("name", "%boels%").execute()
rows = res.data or []
print(f"Found {len(rows)} Boels entries:")
for r in rows:
    print(f"  - {r['name']} | {r['city']} ({r['zip']}) | slug={r['slug']} | email={r.get('email')}")
