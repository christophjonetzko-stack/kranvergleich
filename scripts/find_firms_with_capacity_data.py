"""
Find firms with company_cranes.max_capacity_kg set — used to engineer
a smoke test for the D fit-check banner. Lists firm + city + crane_type
+ max_capacity_kg for each populated row.
"""
import os
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

for line in Path(".env.local").read_text(encoding="utf-8").splitlines():
    if "=" in line and not line.startswith("#"):
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

cranes = (
    sb.table("company_cranes")
    .select("company_id, crane_type_id, max_capacity_kg")
    .not_.is_("max_capacity_kg", "null")
    .limit(1000)
    .execute()
    .data
)
print(f"company_cranes rows with max_capacity_kg set: {len(cranes)}")

# Resolve companies + crane types
company_ids = list({c["company_id"] for c in cranes})
companies = (
    sb.table("companies")
    .select("id, name, city, zip, is_active, is_relevant")
    .in_("id", company_ids)
    .eq("is_active", True)
    .eq("is_relevant", True)
    .execute()
    .data
)
company_lookup = {c["id"]: c for c in companies}

type_ids = list({c["crane_type_id"] for c in cranes})
types = sb.table("crane_types").select("id, name, slug").in_("id", type_ids).execute().data
type_lookup = {t["id"]: t for t in types}

print(f"\nActive + relevant firms with cap data: {len(companies)}")
print()
print(f"{'Firm':<42} {'City':<22} {'Type':<18} {'MaxCap':>8}")
print("-" * 95)
for c in cranes:
    co = company_lookup.get(c["company_id"])
    if not co:
        continue
    ct = type_lookup.get(c["crane_type_id"])
    cap_t = c["max_capacity_kg"] / 1000
    print(f"{co['name'][:42]:<42} {(co.get('city') or '')[:22]:<22} {(ct['name'] if ct else '?')[:18]:<18} {cap_t:>5.1f}t")
