"""
Find Baukran-capable firms with service area covering 56412 Heiligenroth
(Westerwald, RLP, ~5km north of Montabaur, ~30km north-east of Koblenz).

Project: 1.5t @ 10m height @ 15-20m Ausleger, 60 days from 2026-07-01.
Schnellbaukran territory (1-2t Spitzenlast, 16-24m Ausleger, monthly rental).
"""
import os
import sys
from pathlib import Path
import math

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

# Heiligenroth (56412) approx coords
HEILIGENROTH_LAT = 50.4400
HEILIGENROTH_LNG = 7.8500

def haversine_km(lat1, lng1, lat2, lng2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

# 1) Find Baukran crane_type id
baukran_type = (
    sb.table("crane_types")
    .select("id, name, slug")
    .eq("slug", "baukran-mieten")
    .single()
    .execute()
    .data
)
print(f"Baukran type: {baukran_type}")
print()

# 2) Find all firms with Baukran in company_cranes (active + relevant) within 150km
company_cranes = (
    sb.table("company_cranes")
    .select("company_id, max_capacity_kg, max_height_m, max_reach_m")
    .eq("crane_type_id", baukran_type["id"])
    .limit(1000)
    .execute()
    .data
)
print(f"Baukran company_cranes rows: {len(company_cranes)}")

baukran_firm_ids = list({c["company_id"] for c in company_cranes})
print(f"Unique Baukran firm IDs: {len(baukran_firm_ids)}")
print()

# 3) Fetch firm details
firms = (
    sb.table("companies")
    .select("id, name, city, zip, lat, lng, phone, email, website, is_active, is_relevant, country")
    .in_("id", baukran_firm_ids[:200])  # supabase URL limit guard
    .eq("is_active", True)
    .eq("is_relevant", True)
    .eq("country", "DE")
    .execute()
    .data
)

# Index company_cranes by firm
cc_by_firm = {}
for cc in company_cranes:
    cc_by_firm.setdefault(cc["company_id"], []).append(cc)

# Distance filter
with_dist = []
for f in firms:
    if f["lat"] is None or f["lng"] is None:
        continue
    d = haversine_km(HEILIGENROTH_LAT, HEILIGENROTH_LNG, f["lat"], f["lng"])
    if d <= 150:
        # Crane specs for this firm
        cranes = cc_by_firm.get(f["id"], [])
        cap_kgs = [c.get("max_capacity_kg") for c in cranes if c.get("max_capacity_kg")]
        max_cap = max(cap_kgs) if cap_kgs else None
        with_dist.append({
            **f,
            "dist_km": round(d, 1),
            "max_capacity_kg": max_cap,
            "n_baukrane": len(cranes),
        })

with_dist.sort(key=lambda x: x["dist_km"])

print(f"Baukran firms within 150 km of Heiligenroth: {len(with_dist)}")
print()
print(f"{'#':>2} {'Dist':>5} {'Name':<42} {'PLZ City':<28} {'Email?':<10} {'MaxCap':<10}")
print("-" * 105)
for i, f in enumerate(with_dist[:20], 1):
    has_email = "✓" if f.get("email") and f["email"] != "???" else "✗"
    cap = f"{f['max_capacity_kg']/1000:.1f}t" if f["max_capacity_kg"] else "?"
    plz_city = f"{f.get('zip') or ''} {f.get('city') or ''}".strip()[:28]
    print(f"{i:>2} {f['dist_km']:>5.1f} {f['name'][:42]:<42} {plz_city:<28} {has_email:<10} {cap:<10}")
print()

# Save top 8 for follow-up
top = with_dist[:8]
import json
Path("scripts/kohlhaas_baukran_candidates.json").write_text(
    json.dumps([{
        "id": f["id"],
        "name": f["name"],
        "city": f["city"],
        "zip": f["zip"],
        "dist_km": f["dist_km"],
        "phone": f["phone"],
        "email": f["email"],
        "website": f["website"],
        "max_capacity_kg": f["max_capacity_kg"],
        "n_baukrane": f["n_baukrane"],
    } for f in top], indent=2, ensure_ascii=False)
)
print(f"Saved top {len(top)} to scripts/kohlhaas_baukran_candidates.json")
