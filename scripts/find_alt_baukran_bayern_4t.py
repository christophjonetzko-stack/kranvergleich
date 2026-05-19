"""Wider search: all Baukran firms in Bayern with cranes ≥4000kg, sorted by distance from Gerolzhofen."""
import os
import sys
import math
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

BAUKRAN_TYPE_ID = "f1f86ce7-14b8-48ce-9004-5db8dde53949"
GEROLZHOFEN_LAT, GEROLZHOFEN_LNG = 49.9956, 10.3406

def haversine(lat1, lng1, lat2, lng2):
    if None in (lat1, lng1, lat2, lng2): return None
    R = 6371
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lng2 - lng1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2 * R * math.asin(math.sqrt(a))

# All Baukran cranes with capacity ≥4000kg
cc = sb.table("company_cranes").select("*").eq("crane_type_id", BAUKRAN_TYPE_ID).gte("max_capacity_kg", 4000).execute().data
firm_ids = sorted({r["company_id"] for r in cc})
print(f"Cranes ≥4t with Baukran type: {len(cc)} rows across {len(firm_ids)} firms\n")

if not firm_ids:
    print("(no firms with max_capacity_kg ≥4000 — data missing)")
    sys.exit(0)

firms = sb.table("companies").select("id, name, city, state, email, phone, website, is_active, is_relevant, is_verified, lat, lng, service_radius_km, service_regions").in_("id", firm_ids).eq("is_active", True).eq("is_relevant", True).execute().data

rows = []
for f in firms:
    cranes_for_firm = [r for r in cc if r["company_id"] == f["id"]]
    max_cap = max((c.get("max_capacity_kg") or 0) for c in cranes_for_firm)
    dist = haversine(f.get("lat"), f.get("lng"), GEROLZHOFEN_LAT, GEROLZHOFEN_LNG)
    rows.append({
        "name": f["name"],
        "city": f.get("city") or "?",
        "state": f.get("state") or "?",
        "email": f.get("email") or "—",
        "phone": f.get("phone") or "—",
        "max_cap": max_cap,
        "dist_to_gerolz": dist,
        "service_radius_km": f.get("service_radius_km"),
        "is_verified": f.get("is_verified"),
        "cranes": cranes_for_firm,
        "id": f["id"],
    })

# Filter to Bayern + within plausible commute (≤150km from Gerolzhofen)
bayern = [r for r in rows if r["state"] == "Bayern"]
plausible = [r for r in rows if r["dist_to_gerolz"] is not None and r["dist_to_gerolz"] <= 150]
print(f"In Bayern with ≥4t: {len(bayern)}")
print(f"Within 150km of Gerolzhofen with ≥4t: {len(plausible)}\n")

# Show top by proximity, with email + verified preferred
plausible.sort(key=lambda r: (r["email"] == "—", -int(r["is_verified"] or 0), r["dist_to_gerolz"]))
print("=" * 100)
print(f"{'#':3s} {'Name':40s} {'Stadt':18s} {'km':6s} {'Verif':6s} {'MaxKg':7s} {'Email':30s}")
print("=" * 100)
for i, r in enumerate(plausible[:20], 1):
    print(f"{i:3d} {r['name'][:40]:40s} {r['city'][:18]:18s} {r['dist_to_gerolz']:5.0f}  {'✓' if r['is_verified'] else '—':5s} {r['max_cap']:6d}  {r['email'][:30]:30s}")

# Detailed view top 5
print("\n" + "=" * 100)
print("Top 5 closest firms with ≥4t Baukran — full detail")
print("=" * 100)
for r in plausible[:5]:
    print(f"\n→ {r['name']}  ({r['city']}, {r['state']})  ~{r['dist_to_gerolz']:.0f} km od Gerolzhofen")
    print(f"   ID: {r['id']}")
    print(f"   Email: {r['email']}  |  Phone: {r['phone']}  |  Verified: {r['is_verified']}")
    print(f"   service_radius_km: {r['service_radius_km']}")
    for c in r["cranes"]:
        print(f"   • {c.get('brand','?')} {c.get('model','?')}: {c.get('max_capacity_kg')}kg @ reach={c.get('max_reach_m')}m / height={c.get('max_height_m')}m")
        if c.get("notes"):
            print(f"     {c['notes'][:200]}")
