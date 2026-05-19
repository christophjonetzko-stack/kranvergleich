"""How much capacity data do we actually have for Baukran cranes?"""
import os, sys, math, json
from collections import Counter

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
sb = create_client(os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])

BAUKRAN_TYPE_ID = "f1f86ce7-14b8-48ce-9004-5db8dde53949"

cc = sb.table("company_cranes").select("*").eq("crane_type_id", BAUKRAN_TYPE_ID).execute().data
print(f"Total Baukran rows: {len(cc)}")
with_cap = [r for r in cc if r.get("max_capacity_kg") is not None]
print(f"  with max_capacity_kg: {len(with_cap)}  ({len(with_cap)/len(cc)*100:.1f}%)")

# Distribution of capacities
caps = Counter()
for r in with_cap:
    caps[r["max_capacity_kg"]] += 1
print(f"  capacity distribution: {dict(sorted(caps.items()))}")

# All Baukran-tagged firms — for those without crane data, what do we know?
firm_ids = sorted({r["company_id"] for r in cc})
print(f"\nUnique Baukran firms in catalog: {len(firm_ids)}")

# Bayern subset
firms_bayern = sb.table("companies").select("id, name, city, state, email, phone, website, is_active, is_relevant, is_verified, lat, lng").in_("id", firm_ids).eq("state", "Bayern").eq("is_active", True).eq("is_relevant", True).execute().data
print(f"Bayern Baukran firms (active, relevant): {len(firms_bayern)}")
with_email = [f for f in firms_bayern if f.get("email") and f["email"] != "—"]
print(f"  with email: {len(with_email)}")

# Distance to Gerolzhofen for all Bayern Baukran firms with email
import math
def haversine(lat1, lng1, lat2, lng2):
    if None in (lat1, lng1, lat2, lng2): return None
    R = 6371
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lng2 - lng1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2 * R * math.asin(math.sqrt(a))

GEROLZ = (49.9956, 10.3406)
candidates = []
for f in with_email:
    dist = haversine(f.get("lat"), f.get("lng"), GEROLZ[0], GEROLZ[1])
    candidates.append((f, dist))
candidates.sort(key=lambda x: x[1] if x[1] is not None else 9999)

print("\n" + "=" * 95)
print("Bayern Baukran firms with email — sorted by distance to Gerolzhofen")
print("=" * 95)
print(f"{'#':3s} {'Name':45s} {'Stadt':18s} {'km':6s} {'V':2s} {'Website':22s}")
for i, (f, dist) in enumerate(candidates[:25], 1):
    d_str = f"{dist:5.0f}" if dist is not None else "  ?  "
    verified = "✓" if f.get("is_verified") else "—"
    website = (f.get("website") or "—")[:22]
    print(f"{i:3d} {f['name'][:45]:45s} {(f.get('city') or '?')[:18]:18s} {d_str}  {verified:1s}  {website:22s}")
