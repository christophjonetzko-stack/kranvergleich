"""Verify lead Corinna Greb (Würzburg, 2026-05-19) + Fa. Uebel coverage of Gerolzhofen."""
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

UEBEL_ID = "f392ffee-9f51-4f44-88a4-6cb9ec512aef"

# Resolve Uebel's regions → city names
cr = sb.table("company_regions").select("*").eq("company_id", UEBEL_ID).execute().data
city_ids = [r["city_id"] for r in cr]
cities = sb.table("cities").select("*").in_("id", city_ids).execute().data
print("=" * 70)
print(f"Fa. Uebel — service cities ({len(cities)} rows)")
print("=" * 70)
for c in cities:
    print(f"  {c['name']:25s} PLZ={c.get('postal_codes')}  ({c.get('latitude')}, {c.get('longitude')})")

# Look up Würzburg, Gerolzhofen in cities
print("\n" + "=" * 70)
print("Würzburg / Gerolzhofen (97447) lookup")
print("=" * 70)
for name in ("Würzburg", "Wuerzburg", "Gerolzhofen"):
    rows = sb.table("cities").select("*").ilike("name", name).execute().data
    for r in rows:
        in_uebel = r["id"] in city_ids
        print(f"  {name:15s} → {r['name']:20s} id={r['id'][:8]}  PLZ={r.get('postal_codes')}  in_Uebel_regions={in_uebel}")
    if not rows:
        print(f"  {name:15s} → NOT in cities table")

# Distance from Wachenroth to Gerolzhofen (Uebel's HQ)
uebel = sb.table("companies").select("*").eq("id", UEBEL_ID).execute().data[0]
print(f"\n  Uebel HQ Wachenroth — full row keys: {list(uebel.keys())}")

print("\n" + "=" * 70)
print("MEASURE WINDOW — real leads since hero CTA commit (2026-05-15)")
print("=" * 70)
real_leads = (
    sb.table("leads")
    .select("created_at, customer_name, city, entry_path, status")
    .gte("created_at", "2026-05-15T00:00:00")
    .eq("is_test", False)
    .order("created_at", desc=True)
    .limit(100)
    .execute()
    .data
)
print(f"\nReal leads since 2026-05-15: {len(real_leads)} / target ≥3 by 2026-05-29")
for ld in real_leads:
    print(f"  {ld['created_at'][:19]}  {(ld.get('customer_name') or '?').strip():25s}  {ld.get('city','?'):20s}  entry={ld.get('entry_path')}")
