"""Find alternative Baukran firms for Greb project — 4t @ 11m, Würzburg/Gerolzhofen, Mehrfamilienhaus, 150d."""
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

BAUKRAN_TYPE_ID = "f1f86ce7-14b8-48ce-9004-5db8dde53949"
WUERZBURG_CITY_ID = "c114013f-3915-4505-abad-b2024912974b"
UEBEL_ID = "f392ffee-9f51-4f44-88a4-6cb9ec512aef"

# Step 1: all firm IDs that have Baukran in offer
cc = sb.table("company_cranes").select("company_id, max_capacity_kg, max_reach_m, max_height_m, brand, model, notes").eq("crane_type_id", BAUKRAN_TYPE_ID).execute().data
firm_ids_with_baukran = sorted({r["company_id"] for r in cc})
print(f"Baukran-tagged firms total: {len(firm_ids_with_baukran)}\n")

# Step 2: which of these cover Würzburg city?
cr = sb.table("company_regions").select("company_id").eq("city_id", WUERZBURG_CITY_ID).execute().data
firm_ids_wuerzburg = sorted({r["company_id"] for r in cr})
print(f"Firms with Würzburg in company_regions: {len(firm_ids_wuerzburg)}\n")

# Intersect
candidates = [f for f in firm_ids_with_baukran if f in firm_ids_wuerzburg]
print(f"Intersection (Baukran ∩ covers Würzburg): {len(candidates)}\n")

if not candidates:
    print("(none — widening search to Bayern Bundesland)")
    # Bayern Bundesland fallback
    bay = sb.table("companies").select("id, name, city, state, email, is_active, is_relevant, lat, lng").in_("id", firm_ids_with_baukran).eq("state", "Bayern").eq("is_active", True).eq("is_relevant", True).not_.is_("email", "null").execute().data
    print(f"Baukran firms in Bayern (active, relevant, with email): {len(bay)}\n")
    candidates = [f["id"] for f in bay]

# Fetch full firm details + their Baukran capacities
firms = sb.table("companies").select("id, name, city, state, email, phone, website, is_active, is_relevant, is_verified, lat, lng, service_radius_km").in_("id", candidates).eq("is_active", True).eq("is_relevant", True).execute().data
print("=" * 90)
print(f"{'#':3s} {'Name':45s} {'Stadt':18s} {'Max Tragkr':12s} {'Email':30s}")
print("=" * 90)

rows = []
for f in firms:
    is_uebel = " (CURRENT)" if f["id"] == UEBEL_ID else ""
    # Get all Baukran rows for this firm
    cranes_for_firm = [r for r in cc if r["company_id"] == f["id"]]
    cap_text = "/".join(f"{r.get('max_capacity_kg','?')}kg" for r in cranes_for_firm if r.get("max_capacity_kg") is not None) or "n/a"
    rows.append({
        "name": f["name"],
        "city": f.get("city") or "?",
        "state": f.get("state") or "?",
        "email": f.get("email") or "—",
        "phone": f.get("phone") or "—",
        "max_cap": cap_text,
        "is_verified": f.get("is_verified"),
        "is_uebel": f["id"] == UEBEL_ID,
        "cranes": cranes_for_firm,
        "id": f["id"],
    })

# Sort: verified first, then by max capacity desc
def cap_max(r):
    try:
        return max((c.get("max_capacity_kg") or 0) for c in r["cranes"]) if r["cranes"] else 0
    except ValueError:
        return 0
rows.sort(key=lambda r: (-int(r["is_verified"] or 0), -cap_max(r)))

for i, r in enumerate(rows, 1):
    marker = " ⚠️ undersized" if cap_max(r) and cap_max(r) < 4000 else " ✓ ≥4t" if cap_max(r) >= 4000 else " ? unknown cap"
    uebel_marker = " ← CURRENT (Uebel)" if r["is_uebel"] else ""
    print(f"{i:3d} {r['name'][:45]:45s} {r['city'][:18]:18s} {r['max_cap'][:12]:12s} {r['email'][:30]:30s}{marker}{uebel_marker}")

# Detailed dump for ≥4t candidates only
print("\n" + "=" * 90)
print("Detailed dump — firms with at least one crane ≥4000kg")
print("=" * 90)
qualifying = [r for r in rows if cap_max(r) >= 4000]
print(f"Qualifying (≥4t capacity): {len(qualifying)}\n")
for r in qualifying:
    print(f"\n→ {r['name']}  (id={r['id'][:8]})")
    print(f"   {r['city']}, {r['state']}  |  {r['email']}  |  {r['phone']}")
    print(f"   is_verified={r['is_verified']}")
    for c in r["cranes"]:
        print(f"   • {c.get('brand','?')} {c.get('model','?')}  max={c.get('max_capacity_kg')}kg  reach={c.get('max_reach_m')}m  height={c.get('max_height_m')}m")
        if c.get("notes"):
            print(f"     notes: {c['notes'][:140]}")
