#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Report firms without a real email (NULL or '???')."""
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

# Page through all companies (Supabase default limit is 1000)
rows = []
page = 0
while True:
    batch = sb.table("companies").select(
        "id,name,city,state,email,website,phone,is_active,is_relevant"
    ).range(page * 1000, page * 1000 + 999).execute().data
    if not batch:
        break
    rows.extend(batch)
    if len(batch) < 1000:
        break
    page += 1

total = len(rows)
active = [r for r in rows if r.get("is_active") and r.get("is_relevant") is not False]

def is_real_email(e):
    return bool(e) and e.strip() not in ("", "???", "?", "-")

with_email = [r for r in active if is_real_email(r.get("email"))]
null_email = [r for r in active if r.get("email") is None]
skipped = [r for r in active if r.get("email") and r["email"].strip() in ("???", "?", "-")]

print(f"Total companies:       {total}")
print(f"Active + relevant:     {len(active)}")
print(f"  with real email:     {len(with_email)}  ({100*len(with_email)/len(active):.1f}%)")
print(f"  skipped (???):       {len(skipped)}")
print(f"  NULL email:          {len(null_email)}")
print()

# Show missing (NULL) firms — these are the ones the user still needs
print(f"=== {len(null_email)} firms with NULL email (need manual enrichment) ===")
# Group by state for easier triage
by_state: dict[str, list] = {}
for r in null_email:
    by_state.setdefault(r.get("state") or "(no state)", []).append(r)

for state in sorted(by_state.keys()):
    firms = by_state[state]
    print(f"\n[{state}] {len(firms)} firms:")
    for r in sorted(firms, key=lambda x: (x.get("city") or "", x.get("name") or "")):
        name = r.get("name") or "(no name)"
        city = r.get("city") or "(no city)"
        website = r.get("website") or "(no website)"
        phone = r.get("phone") or "(no phone)"
        print(f"  - {name[:50]:50} | {city:20} | {website[:45]:45} | {phone}")
