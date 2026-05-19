"""
Faza-2 readiness audit: do we have enough per-firm engagement data
to ship outreach reports proving value?

Threshold to resume reports (per memory project_outreach_reports_live):
  top-10 firms must hit ≥30 PV + ≥5 form_submit in the measure window.

Time range: 2026-04-01 (Faza 1 catalog start) to today.
"""
import os
import sys
import json
from collections import defaultdict, Counter
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

for line in Path(".env.local").read_text(encoding="utf-8").splitlines():
    if "=" in line and not line.startswith("#"):
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client
sb = create_client(os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])

START = "2026-04-01"
TODAY = "2026-05-19"

# ============================================================
# 1) firm_events — phone_click / website_click / form_submit
# ============================================================
print("=" * 80)
print(f"FIRM EVENTS  (per-firm tracked actions)  {START} → {TODAY}")
print("=" * 80)

fe = (
    sb.table("firm_events")
    .select("firm_id, event_type, event_date")
    .gte("event_date", START)
    .limit(50000)
    .execute()
    .data
)
print(f"\nTotal firm_events: {len(fe)}")
type_dist = Counter(r["event_type"] for r in fe)
print(f"Event type distribution: {dict(type_dist)}")

# Per-firm counts
per_firm = defaultdict(lambda: Counter())
for r in fe:
    per_firm[r["firm_id"]][r["event_type"]] += 1
print(f"Unique firms touched: {len(per_firm)}")

# ============================================================
# 2) page_events — pageviews on /anbieter/{slug}
# ============================================================
print("\n" + "=" * 80)
print(f"PAGE EVENTS  (profile pageviews)  {START} → {TODAY}")
print("=" * 80)

# Peek schema
peek = sb.table("page_events").select("*").limit(1).execute().data
print(f"page_events columns: {list(peek[0].keys()) if peek else 'EMPTY'}")

pe = (
    sb.table("page_events")
    .select("*")
    .gte("created_at", START + "T00:00:00")
    .limit(50000)
    .execute()
    .data
)
print(f"Total page_events: {len(pe)}")
if pe:
    pe_type_dist = Counter(r.get("event_type") for r in pe)
    print(f"event_type distribution: {dict(pe_type_dist)}")

# Try to attribute pageviews to firm by URL path /anbieter/{slug}
# First find the URL/path field
path_field = None
for k in ("page_path", "path", "url", "pathname"):
    if pe and k in pe[0]:
        path_field = k
        break
print(f"Path field: {path_field}")

profile_pv_by_slug = Counter()
if path_field:
    for r in pe:
        p = r.get(path_field) or ""
        if p.startswith("/anbieter/"):
            slug = p[len("/anbieter/"):].rstrip("/").split("?")[0]
            if slug:
                profile_pv_by_slug[slug] += 1
print(f"Unique firm-profile pageviews (any firm): {sum(profile_pv_by_slug.values())} across {len(profile_pv_by_slug)} slugs")

# Resolve slug → company_id for the firms we care about
all_companies = sb.table("companies").select("id, name, slug").execute().data
slug_to_id = {c["slug"]: c["id"] for c in all_companies if c.get("slug")}
id_to_name = {c["id"]: c["name"] for c in all_companies}
id_to_slug = {c["id"]: c.get("slug") for c in all_companies}

# Cross-attribute PV onto the per-firm Counter
for slug, pv in profile_pv_by_slug.items():
    cid = slug_to_id.get(slug)
    if cid:
        per_firm[cid]["profile_pv"] += pv

# ============================================================
# 3) lead_companies — how many leads did each firm land in
# ============================================================
print("\n" + "=" * 80)
print(f"LEAD DISPATCHES  (lead_companies rows)  {START} → {TODAY}")
print("=" * 80)
lc = (
    sb.table("lead_companies")
    .select("company_id, sent_at")
    .gte("sent_at", START + "T00:00:00")
    .limit(50000)
    .execute()
    .data
)
print(f"Total lead_companies rows: {len(lc)}")
for r in lc:
    per_firm[r["company_id"]]["lead_dispatch"] += 1

# ============================================================
# 4) Per-firm aggregate — top 25 by composite engagement
# ============================================================
print("\n" + "=" * 80)
print(f"TOP 25 FIRMS BY ENGAGEMENT  ({START} → {TODAY})")
print("=" * 80)

# Composite score: PV + 5*phone_click + 5*website_click + 10*form_submit
def score(c):
    return (c.get("profile_view", 0)
            + 5 * c.get("phone_click", 0)
            + 5 * c.get("phone_reveal", 0)
            + 5 * c.get("website_click", 0)
            + 10 * c.get("form_submit", 0))

ranked = sorted(per_firm.items(), key=lambda x: -score(x[1]))
print(f"\n{'#':3s} {'Firma':40s} {'PV':5s} {'☎':4s} {'🌐':4s} {'📋':4s} {'leads':5s} score")
for i, (cid, counts) in enumerate(ranked[:25], 1):
    name = (id_to_name.get(cid) or "?")[:40]
    print(f"{i:3d} {name:40s} "
          f"{counts.get('profile_view',0):5d} "
          f"{counts.get('phone_click',0):4d} "
          f"{counts.get('website_click',0):4d} "
          f"{counts.get('form_submit',0):4d} "
          f"{counts.get('lead_dispatch',0):5d} "
          f"{score(counts):4d}")

# ============================================================
# 5) Threshold check: top-10 ≥30 PV + ≥5 form_submit?
# ============================================================
print("\n" + "=" * 80)
print("THRESHOLD CHECK  (top-10 ≥30 PV AND ≥5 form_submit)")
print("=" * 80)
top10 = ranked[:10]
pv_ok = sum(1 for cid, c in top10 if c.get("profile_view", 0) >= 30)
fs_ok = sum(1 for cid, c in top10 if c.get("form_submit", 0) >= 5)
print(f"  Top-10 firms with ≥30 PV:          {pv_ok}/10  {'✓' if pv_ok >= 10 else '✗ NOT YET'}")
print(f"  Top-10 firms with ≥5 form_submit:  {fs_ok}/10  {'✓' if fs_ok >= 10 else '✗ NOT YET'}")
print()
if pv_ok >= 10 and fs_ok >= 10:
    print("  → READY: resume outreach reports build")
else:
    print("  → NOT READY: data still too thin per project_outreach_reports_live threshold")
    print(f"  → Gap: need {10 - pv_ok} more firms hitting PV bar, {10 - fs_ok} more hitting form_submit bar")

# ============================================================
# 6) Funnel summary — what *can* we show today?
# ============================================================
print("\n" + "=" * 80)
print("FUNNEL TOTALS  (what story can we tell firms?)")
print("=" * 80)
total_pv = sum(c.get("profile_view", 0) for c in per_firm.values())
total_phone = sum(c.get("phone_click", 0) for c in per_firm.values())
total_web = sum(c.get("website_click", 0) for c in per_firm.values())
total_submit = sum(c.get("form_submit", 0) for c in per_firm.values())
total_leads = sum(c.get("lead_dispatch", 0) for c in per_firm.values())
print(f"  Profile pageviews:    {total_pv}")
print(f"  Phone clicks:         {total_phone}")
print(f"  Website clicks:       {total_web}")
print(f"  Form submits:         {total_submit}")
print(f"  Lead dispatches:      {total_leads}")
print(f"  Firms with ≥1 event:  {len([c for c in per_firm.values() if any(c.values())])}")
print(f"  Firms with 0 events:  {len(all_companies) - len([c for c in per_firm.values() if any(c.values())])}")

# ============================================================
# 7) Comparison to 2026-05-05 baseline
# ============================================================
print("\n" + "=" * 80)
print("DRIFT vs 2026-05-05 BASELINE")
print("=" * 80)
# 15d baseline: 97 PV total / top-10 ~2 form_submit / Thömen rank 42/108
print("Memory baseline (project_reminder_2026_05_04_engagement_data, 15d window):")
print("  - 97 PV total")
print("  - top-10 firms: ~2 form_submit each")
print(f"\nCurrent window (49 days {START} → {TODAY}):")
print(f"  - {total_pv} profile PV total  ({total_pv/97:.1f}× baseline)")
print(f"  - top-10 avg form_submit: {sum(c.get('form_submit',0) for _, c in top10)/10:.1f}")
