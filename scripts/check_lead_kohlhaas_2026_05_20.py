"""
Look up the Kohlhaas lead from owner notification 2026-05-20 12:24.
We need lead_id + crane_type_id + full saved fields to plan rescue.
"""
import os
import sys
import json
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

# Pull all leads from today, find Kohlhaas
leads = (
    sb.table("leads")
    .select("*")
    .gte("created_at", "2026-05-20T00:00:00")
    .order("created_at", desc=True)
    .limit(20)
    .execute()
    .data
)

print(f"Leads today: {len(leads)}")
print()
for lead in leads:
    name = lead.get("customer_name") or ""
    email = lead.get("customer_email") or ""
    if "kohlhaas" in (name + email).lower():
        print("=" * 70)
        print(f"MATCH: {name}")
        print(json.dumps(lead, indent=2, ensure_ascii=False, default=str))
        print()
        # Look up matching lead_companies (should be 0)
        lc = (
            sb.table("lead_companies")
            .select("*")
            .eq("lead_id", lead["id"])
            .execute()
            .data
        )
        print(f"lead_companies rows: {len(lc)}")
        # Resolve crane_type if set
        if lead.get("crane_type_id"):
            ct = (
                sb.table("crane_types")
                .select("name, slug")
                .eq("id", lead["crane_type_id"])
                .single()
                .execute()
                .data
            )
            print(f"crane_type: {ct}")
        else:
            print("crane_type_id: NULL (calculator may have set crane_type=baukran or null)")
