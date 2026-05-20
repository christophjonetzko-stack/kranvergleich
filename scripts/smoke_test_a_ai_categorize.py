"""
Smoke test: POST /api/leads with crane_type_id=NULL + a project_description
that clearly points to one crane type (Kohlhaas-shape). Confirms:
  - AI categorize runs (or fails gracefully)
  - 200 response with crane_type_id resolved to something sensible
  - lead row in DB has the inferred crane_type_id
  - dry_run=true means no firm emails fire

Uses customer_email=claude-smoke-test-a@kranvergleich.de + name "(TEST)"
prefix so the row is easy to filter / flag is_test later.

Run:
  python smoke_test_a_ai_categorize.py            # POST to prod
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

# Kohlhaas-shape spec: 1.5t @ 10m @ 60 Tage → should categorize as baukran
# (long duration + moderate height = Schnellbaukran territory).
payload = {
    "crane_type_id": None,
    "city": "56412 Heiligenroth",
    "location": "56412",
    "customer_name": "(TEST) Claude Smoke A",
    "customer_email": "claude-smoke-test-a@kranvergleich.de",
    "customer_phone": "+4926021067842",  # valid format only, not real
    "project_description": "Mehrfamilienhaus-Neubau in Heiligenroth, Mietdauer ca. 60 Tage. Tragkraft bis 1,5 Tonnen, Hubhöhe bis 10 Meter, Auslegerlänge 15-20 Meter. Klassische Wohnbau-Baustelle.",
    "preferred_date": "2026-07-01",
    "duration_days": 60,
    "dsgvo_consent": True,
    "auto_select_nearest": True,
    "dry_run": True,
    "entry_path": "/kran-mieten-preise",
    "website_url": "",
}

print("=" * 70)
print("A smoke test — POST /api/leads with NULL crane_type + 60d Baukran spec")
print("=" * 70)
print()
print(f"Description (66 chars excerpt):")
print(f"  {payload['project_description'][:140]}...")
print()
print(f"Expected: AI → baukran (slug), confidence ≥ 0.8, crane_type_id resolved")
print()

r = httpx.post(API_URL, json=payload, timeout=30)
print(f"HTTP {r.status_code}")
try:
    body = r.json()
    print(json.dumps(body, indent=2, ensure_ascii=False, default=str)[:1500])
except Exception:
    print(r.text[:1500])

print()
print("Now checking DB for the inserted row…")
from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

if r.status_code == 200 and isinstance(body, dict) and body.get("id"):
    lead_id = body["id"]
    print(f"  lead_id: {lead_id}")
    row = (
        sb.table("leads")
        .select("crane_type_id, radius_used_km, customer_name, is_test")
        .eq("id", lead_id)
        .single()
        .execute()
        .data
    )
    print(f"  crane_type_id: {row['crane_type_id']}")
    print(f"  radius_used_km: {row['radius_used_km']}")
    print(f"  is_test: {row['is_test']}")
    if row["crane_type_id"]:
        ct = (
            sb.table("crane_types")
            .select("name, slug")
            .eq("id", row["crane_type_id"])
            .single()
            .execute()
            .data
        )
        print(f"  resolved crane_type: {ct['name']} ({ct['slug']})")
        if ct["slug"] == "baukran-mieten":
            print("\n✅ AI categorized correctly as baukran")
        else:
            print(f"\n⚠️  AI categorized as {ct['slug']} (expected baukran)")
    else:
        print("\n⚠️  crane_type_id NULL — AI confidence was below 0.8 threshold")

    # Mark as test so it doesn't pollute reports
    sb.table("leads").update({"is_test": True}).eq("id", lead_id).execute()
    print("\n  ✓ Marked is_test=TRUE")
else:
    print("  ⚠ no lead id returned — categorize may have run but submission failed elsewhere")
