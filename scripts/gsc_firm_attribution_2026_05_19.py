"""
GSC exposure per firm — attribute imported gsc_page_stats clicks/impressions
back to individual firms based on which listing pages they appear on.

Attribution model:
  /anbieter/{slug}              → direct 1:1 attribution
  /{type}-mieten                → split equally across firms with that crane type
  /{type}-mieten/{city}         → split equally across firms with that type AND
                                  covering that city in company_regions

Coverage gap callout: gsc_page_stats currently only has 4 weekly periods
(2026-04-01 → 2026-04-28). User mentioned ~670 clicks in GSC UI; DB has 241
because the last 3 weeks of CSV imports haven't been run.
"""
import sys
import os
from collections import defaultdict
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

for line in Path(".env.local").read_text(encoding="utf-8").splitlines():
    if "=" in line and not line.startswith("#"):
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client
sb = create_client(os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])

# ----------------------------------------------------------------------
# Load reference data
# ----------------------------------------------------------------------
crane_types = sb.table("crane_types").select("id, slug").execute().data
ct_id_to_slug = {c["id"]: c["slug"] for c in crane_types}

cities = sb.table("cities").select("id, slug").execute().data
city_id_to_slug = {c["id"]: c["slug"] for c in cities}

companies = (
    sb.table("companies")
    .select("id, name, slug, city, is_active, is_relevant, is_verified")
    .eq("is_active", True).eq("is_relevant", True)
    .execute().data
)
firm_by_id = {f["id"]: f for f in companies}
firm_id_by_slug = {f["slug"]: f["id"] for f in companies if f.get("slug")}
print(f"Active+relevant firms: {len(companies)}")

# Firm → set of crane_type slugs (from company_cranes)
cc = sb.table("company_cranes").select("company_id, crane_type_id").limit(50000).execute().data
firm_to_types = defaultdict(set)
for r in cc:
    slug = ct_id_to_slug.get(r["crane_type_id"])
    if slug:
        firm_to_types[r["company_id"]].add(slug)
print(f"company_cranes mappings: {len(cc)} rows, {len(firm_to_types)} firms with crane types")

# Firm → set of city slugs (from company_regions)
cr = sb.table("company_regions").select("company_id, city_id").limit(50000).execute().data
firm_to_cities = defaultdict(set)
for r in cr:
    slug = city_id_to_slug.get(r["city_id"])
    if slug:
        firm_to_cities[r["company_id"]].add(slug)
print(f"company_regions mappings: {len(cr)} rows, {len(firm_to_cities)} firms with city coverage")

# Reverse: per type, which firms; per (type, city), which firms — used for splitting clicks
type_to_firms = defaultdict(set)
for fid, types in firm_to_types.items():
    for t in types:
        type_to_firms[t].add(fid)

typecity_to_firms = defaultdict(set)
for fid, types in firm_to_types.items():
    cities_of_firm = firm_to_cities.get(fid, set())
    for t in types:
        for c in cities_of_firm:
            typecity_to_firms[(t, c)].add(fid)

# ----------------------------------------------------------------------
# Walk gsc_page_stats and attribute clicks
# ----------------------------------------------------------------------
gsc = sb.table("gsc_page_stats").select("page, clicks, impressions, period_start, period_end").limit(50000).execute().data
periods = sorted({(r["period_start"], r["period_end"]) for r in gsc})
print(f"\nGSC data periods imported: {len(periods)}")
for s, e in periods:
    print(f"  {s} → {e}")
print(f"Total GSC rows: {len(gsc)}")
print(f"Total clicks in DB: {sum(r['clicks'] for r in gsc)}")
print(f"Total impressions in DB: {sum(r['impressions'] for r in gsc)}")

# Per-firm accumulator
firm_clicks = defaultdict(float)
firm_impr = defaultdict(float)

unattributed_clicks = 0
unattributed_impr = 0
article_clicks = 0

for row in gsc:
    page = row["page"]
    clicks = row["clicks"]
    impr = row["impressions"]
    segs = [s for s in page.strip("/").split("/") if s]

    if not segs:  # homepage
        unattributed_clicks += clicks
        unattributed_impr += impr
        continue

    # Profile page: /anbieter/{slug}
    if len(segs) == 2 and segs[0] == "anbieter":
        slug = segs[1]
        fid = firm_id_by_slug.get(slug)
        if fid:
            firm_clicks[fid] += clicks
            firm_impr[fid] += impr
        else:
            unattributed_clicks += clicks
            unattributed_impr += impr
        continue

    # Hub: /{type-mieten}
    if len(segs) == 1 and segs[0].endswith("-mieten"):
        type_slug = segs[0]
        firms = type_to_firms.get(type_slug, set())
        if firms:
            share = 1.0 / len(firms)
            for fid in firms:
                firm_clicks[fid] += clicks * share
                firm_impr[fid] += impr * share
        else:
            unattributed_clicks += clicks
            unattributed_impr += impr
        continue

    # City × type: /{type-mieten}/{city-slug}
    if len(segs) == 2 and segs[0].endswith("-mieten"):
        type_slug = segs[0]
        city_slug = segs[1]
        firms = typecity_to_firms.get((type_slug, city_slug), set())
        if firms:
            share = 1.0 / len(firms)
            for fid in firms:
                firm_clicks[fid] += clicks * share
                firm_impr[fid] += impr * share
        else:
            unattributed_clicks += clicks
            unattributed_impr += impr
        continue

    # Articles / ratgeber / kostenrechner — don't list firms
    if segs[0] in ("kran-mieten-preise", "kostenrechner", "was-kostet-ein-kran", "ratgeber", "ueber-uns", "faq", "kontakt", "impressum", "datenschutz"):
        article_clicks += clicks
        continue

    # Anything else
    unattributed_clicks += clicks
    unattributed_impr += impr

# ----------------------------------------------------------------------
# Report
# ----------------------------------------------------------------------
print(f"\n{'='*78}")
print("ATTRIBUTION SUMMARY")
print(f"{'='*78}")
print(f"Total firm-attributable clicks:     {sum(firm_clicks.values()):.1f}")
print(f"Total firm-attributable impressions:{sum(firm_impr.values()):.0f}")
print(f"Article-page clicks (no firm):      {article_clicks}")
print(f"Unattributed clicks (other):        {unattributed_clicks}")
print(f"Unattributed impressions:           {unattributed_impr}")

print(f"\n{'='*78}")
print("TOP 20 FIRMS BY GSC-ATTRIBUTED EXPOSURE  (period: 2026-04-01 → 2026-04-28)")
print(f"{'='*78}")

ranked = sorted(firm_by_id.keys(), key=lambda fid: -firm_clicks.get(fid, 0))
print(f"{'#':3s} {'Firma':45s} {'Stadt':18s} {'V':2s} {'Klick':6s} {'Impr':8s}")
print("-" * 88)
for i, fid in enumerate(ranked[:20], 1):
    f = firm_by_id[fid]
    name = (f.get("name") or "?")[:45]
    city = (f.get("city") or "?")[:18]
    v = "OK" if f.get("is_verified") else "--"
    print(f"{i:3d} {name:45s} {city:18s} {v:2s} {firm_clicks[fid]:6.2f} {firm_impr[fid]:8.0f}")

# Coverage callout
print(f"\n{'='*78}")
print("DATA COVERAGE GAP")
print(f"{'='*78}")
print(f"  gsc_page_stats period covered:   2026-04-01 → 2026-04-28 (28 days)")
print(f"  Missing CSV imports:             2026-04-29 → 2026-05-19 (21 days)")
print(f"  GSC UI total mentioned:          ~670 clicks (full history)")
print(f"  DB total clicks:                 {sum(r['clicks'] for r in gsc)} (subset)")
print(f"  → import the missing CSVs to get current numbers")
