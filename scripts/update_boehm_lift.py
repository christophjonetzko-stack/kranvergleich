#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""One-off: update Böhm-Lift GmbH two branches with emails supplied by user."""
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

# Source: user-provided Niederlassungen info
BRANDENBURG = {
    "email": "info@boehmlift.de",
    "address": "Mötzower Landstrasse 21A, 14776 Brandenburg an der Havel",
    "zip": "14776",
}
POTSDAM = {
    "email": "boehmlift@mac.com",
    "address": "Möbelhof 10, 14478 Potsdam",
    "zip": "14478",
}

# Find both rows (names have extra hyphens in DB — match loosely on name+city)
rows = sb.table("companies").select("id,name,city,email").ilike("name", "%öhm%ift%").execute().data
print(f"Found {len(rows)} Böhm-Lift rows:")
for r in rows:
    print(f"  - {r['name']} | {r['city']} | email={r['email']}")

for r in rows:
    if r["city"] == "Brandenburg":
        update = BRANDENBURG
    elif r["city"] == "Potsdam":
        update = POTSDAM
    else:
        print(f"  SKIP unknown city: {r['city']}")
        continue

    sb.table("companies").update(update).eq("id", r["id"]).execute()
    print(f"  UPDATED {r['name']} ({r['city']}) → {update['email']}")
