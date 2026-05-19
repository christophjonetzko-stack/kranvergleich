"""Why no Fa. Uebel feedback yet? Check signal-back state + Baukran in offer."""
import os
import sys
import json

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE, encoding="utf-8") as f:
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

LEAD_ID = "54403ab6-14fa-4bac-88e6-6a3b55ef7c35"
UEBEL_ID = "f392ffee-9f51-4f44-88a4-6cb9ec512aef"
BAUKRAN_TYPE_ID = "f1f86ce7-14b8-48ce-9004-5db8dde53949"

# ---- 1. lead_companies feedback fields
print("=" * 70)
print("lead_companies row for Uebel ↔ lead 54403ab6")
print("=" * 70)
lc = (
    sb.table("lead_companies")
    .select("*")
    .eq("lead_id", LEAD_ID)
    .eq("company_id", UEBEL_ID)
    .execute()
    .data
)
for r in lc:
    print(json.dumps(r, default=str, ensure_ascii=False, indent=2))

# ---- 2. lead_responses table (signal-back loop, mig 026)
print("\n" + "=" * 70)
print("lead_responses for this lead (signal-back loop)")
print("=" * 70)
try:
    lr = (
        sb.table("lead_responses")
        .select("*")
        .eq("lead_id", LEAD_ID)
        .execute()
        .data
    )
    print(f"Rows: {len(lr)}")
    for r in lr:
        print(json.dumps(r, default=str, ensure_ascii=False, indent=2))
except Exception as e:
    print(f"  table query failed: {e}")

# ---- 3. firm_events for Uebel since 2026-05-19
print("\n" + "=" * 70)
print("firm_events for Uebel since 2026-05-19")
print("=" * 70)
fe = (
    sb.table("firm_events")
    .select("*")
    .eq("firm_id", UEBEL_ID)
    .gte("event_date", "2026-05-19")
    .execute()
    .data
)
print(f"Rows: {len(fe)}")
for r in fe:
    print(f"  {r.get('event_date')} {r.get('event_type'):20s} ctx_city={r.get('city_context')} ctx_type={r.get('type_context')}")

# ---- 4. Does Uebel have Baukran in company_cranes?
print("\n" + "=" * 70)
print("Fa. Uebel — crane_types in offer (company_cranes)")
print("=" * 70)
cc = (
    sb.table("company_cranes")
    .select("*")
    .eq("company_id", UEBEL_ID)
    .execute()
    .data
)
print(f"Rows: {len(cc)}")
for r in cc:
    print(f"  {json.dumps(r, default=str, ensure_ascii=False)}")

# Resolve crane_type_id → name
type_ids = list({r["crane_type_id"] for r in cc})
if type_ids:
    types = sb.table("crane_types").select("id, name, slug").in_("id", type_ids).execute().data
    type_map = {t["id"]: t for t in types}
    print("\n  Resolved:")
    for r in cc:
        t = type_map.get(r["crane_type_id"], {})
        is_baukran = "← THIS IS BAUKRAN" if r["crane_type_id"] == BAUKRAN_TYPE_ID else ""
        print(f"    {t.get('name','?'):25s} slug={t.get('slug','?'):25s} {is_baukran}")

# Cross-check what crane_type Baukran actually IS
print("\n" + "=" * 70)
print("Sanity: crane_types table — what is f1f86ce7?")
print("=" * 70)
ct = sb.table("crane_types").select("*").eq("id", BAUKRAN_TYPE_ID).execute().data
for r in ct:
    print(f"  {json.dumps(r, default=str, ensure_ascii=False)}")

# Has Uebel got Baukran in offer? Direct boolean
has_baukran = any(r["crane_type_id"] == BAUKRAN_TYPE_ID for r in cc)
print(f"\n>>> Uebel has Baukran in offer: {has_baukran}")
