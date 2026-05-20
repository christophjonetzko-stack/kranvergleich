"""
Smoke test D — replays the Greb misroute scenario to confirm the fit-check
banner triggers in the owner notification email.

Scenario: 4 t Baukran request near Würzburg (97447 Gerolzhofen — the
original Greb PLZ). Auto-select picks firms within 150 km. Fa. Uebel
(Wachenroth, ~70 km) is in catalog with max_capacity_kg=2000 for both
Baukran + Dachdeckerkran (its real Potain HD 21A spec).

Expected:
  ✓ HTTP 200
  ✓ crane_type_id = Baukran UUID (explicit in payload)
  ✓ auto-select matches include Fa. Uebel
  ✓ Owner-side fit-check banner fires: "Fa. Uebel — max 2 t" listed
  ✓ Subject prefix gains "⚠️ FIT-MISMATCH (N) — "
  ✓ Other matched firms with NULL max_capacity_kg → "unverified" count
"""
import json
import os
import sys
from pathlib import Path

import httpx

sys.stdout.reconfigure(encoding="utf-8")

for line in Path(".env.local").read_text(encoding="utf-8").splitlines():
    if "=" in line and not line.startswith("#"):
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())

API_URL = "https://kranvergleich.de/api/leads"

# Baukran UUID — passed explicitly so AI categorize doesn't run; we want
# to test D in isolation, not A.
BAUKRAN_TYPE_ID = "f1f86ce7-14b8-48ce-9004-5db8dde53949"

# Greb-shape spec: 4 t Baukran for a Mehrfamilienhaus near Würzburg.
# Uebel (Wachenroth) is the closest catalog firm with Baukran tag + low
# max_capacity_kg (2.0t per company_cranes data) — expected to land in
# matches and trigger the fit-check banner.
payload = {
    "crane_type_id": BAUKRAN_TYPE_ID,
    "city": "97447 Gerolzhofen",
    "location": "97447",
    "customer_name": "(TEST) Claude Smoke D",
    "customer_email": "claude-smoke-test-d@kranvergleich.de",
    "customer_phone": "+4995235789012",  # valid format only, not real
    "project_description": "Mehrfamilienhaus-Neubau, Mietdauer 150 Tage. Tragkraft 4 t bei 11 m Ausladung. Hubhöhe 25 m. Tower crane / Turmdrehkran erforderlich.",
    "preferred_date": "2026-07-15",
    "duration_days": 150,
    "dsgvo_consent": True,
    "auto_select_nearest": True,
    "dry_run": True,
    "entry_path": "/kran-mieten-preise",
    "website_url": "",
}

print("=" * 72)
print("D smoke test — Greb-shape 4t Baukran near Würzburg")
print("=" * 72)
print()
print("Expected fit-check trigger:")
print("  Fa. Uebel Wachenroth (max 2.0 t Baukran) < 4.0 t × 1.2 = 4.8 t required")
print()

r = httpx.post(API_URL, json=payload, timeout=30)
print(f"HTTP {r.status_code}")
body = r.json()

# Show matched companies + radius
matched = body.get("matched_companies", [])
print(f"\nradius_used_km: {body.get('radius_used_km')}")
print(f"matched_companies: {len(matched)}")
for m in matched:
    print(f"  - {m['name'][:42]:<42}  {m['city'][:22]:<22}  ~{m['distance_km']} km")

# Look up actual max_capacity_kg for each match
print("\n--- Capacity data per matched firm ---")
from supabase import create_client
sb = create_client(os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])
firm_ids = [m["id"] for m in matched]
cranes = (
    sb.table("company_cranes")
    .select("company_id, max_capacity_kg")
    .in_("company_id", firm_ids)
    .eq("crane_type_id", BAUKRAN_TYPE_ID)
    .execute()
    .data
)
cap_by_firm = {c["company_id"]: c["max_capacity_kg"] for c in cranes}

required_kg = 4000 * 1.2  # spec * safety margin
undersized_predict = []
unverified_predict = 0
for m in matched:
    cap = cap_by_firm.get(m["id"])
    if cap is None:
        unverified_predict += 1
        print(f"  {m['name'][:42]:<42}  Baukran max: NULL (unverified)")
    elif cap < required_kg:
        undersized_predict.append((m["name"], cap))
        print(f"  {m['name'][:42]:<42}  Baukran max: {cap/1000:.1f} t  ⚠️ UNDERSIZED (< {required_kg/1000:.1f} t)")
    else:
        print(f"  {m['name'][:42]:<42}  Baukran max: {cap/1000:.1f} t  ✓")

print()
print(f"--- Fit-check predictions (D logic) ---")
print(f"  required (4t × 1.2): {required_kg/1000:.1f} t")
print(f"  undersized firms:    {len(undersized_predict)} → banner fires" if undersized_predict else "  undersized firms:    0 → banner silent")
print(f"  unverified firms:    {unverified_predict}")

# Mark as test in DB
if body.get("id"):
    sb.table("leads").update({"is_test": True}).eq("id", body["id"]).execute()
    print(f"\n  ✓ lead {body['id']} marked is_test=TRUE")

if undersized_predict:
    print("\n✅ D fit-check banner SHOULD have rendered in your inbox notification:")
    print(f"   Subject prefix: '⚠️ FIT-MISMATCH ({len(undersized_predict)}) — '")
    for name, cap in undersized_predict:
        print(f"   - {name} (max {cap/1000:.1f} t)")
else:
    print("\n⚠️  No undersized firms in matches — D banner NOT exercised this run.")
    print("   Try different PLZ to pick up a firm with capacity data (Uebel/Ahauser/UPERIO/BKL).")
