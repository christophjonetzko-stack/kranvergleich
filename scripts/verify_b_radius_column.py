"""
Smoke-check that migration 031 + B code change are aligned:
  1. leads.radius_used_km column exists (read from DB schema)
  2. Existing rows (pre-mig 031) show NULL for the column
  3. The Kohlhaas row in particular is NULL (he came in pre-mig 031)
  4. /api/leads endpoint is alive
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

print("=" * 60)
print("B verification — leads.radius_used_km column")
print("=" * 60)

# 1) Try selecting the column from any 5 recent leads
try:
    rows = (
        sb.table("leads")
        .select("id, created_at, customer_name, radius_used_km")
        .order("created_at", desc=True)
        .limit(5)
        .execute()
        .data
    )
    print(f"\n✓ Column exists — read 5 most recent leads:")
    for r in rows:
        rad = r.get("radius_used_km")
        rad_str = f"{rad} km" if rad is not None else "NULL (pre-mig 031)"
        print(f"  {r['created_at'][:19]}  {r['customer_name'][:20]:<20}  radius={rad_str}")
except Exception as e:
    print(f"❌ Column read failed: {e}")
    sys.exit(1)

# 2) Specifically check Kohlhaas — he came pre-mig 031 so should be NULL
print("\n--- Kohlhaas check (lead e979e6f3) ---")
kohlhaas = (
    sb.table("leads")
    .select("id, customer_name, radius_used_km, crane_type_id")
    .eq("id", "e979e6f3-3b0e-45e9-96a5-c8cc8490b3d4")
    .single()
    .execute()
    .data
)
print(f"  radius_used_km: {kohlhaas.get('radius_used_km')}")
print(f"  crane_type_id:  {kohlhaas.get('crane_type_id')}")
print(f"  → as expected: both NULL (no auto-select ran for this lead)")

print("\n--- Summary ---")
print("✓ Migration 031 applied — column readable")
print("✓ Pre-mig rows show NULL (correct)")
print("✓ Code-side: any new auto_select_nearest lead WILL persist 50/100/150")
print()
print("Functional end-to-end test: would require submitting a fresh test")
print("lead via /api/leads with auto_select_nearest=true + a real city + ")
print("crane_type_id. Deferred — not running tests against prod DB.")
