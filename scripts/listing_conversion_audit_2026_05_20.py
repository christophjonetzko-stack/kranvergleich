"""
P3 pre-redesign audit: do listings convert today, or is the
"35 click_type vs 6 click_city" diagnosis from 19.05 actually
about listing performance — or about header/footer/preise-table
click-through (where the data-track-* attrs live)?

Output: real funnel for /<type>-mieten and /<type>-mieten/<city>
over the last 30d.
"""
import os
import sys
from collections import Counter, defaultdict
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

START = "2026-04-20"  # 30d window
TODAY = "2026-05-20"

print("=" * 78)
print(f"LISTING CONVERSION AUDIT  {START} -> {TODAY}  (30d)")
print("=" * 78)

# ----------------------------------------------------------------------
# 1) Page events on listing paths — scroll_depth_25 is the cleanest PV
#    proxy: it fires automatically near the top of the page on any real
#    scroll. We use it as "page entered + scanned".
# ----------------------------------------------------------------------
pe = (
    sb.table("page_events")
    .select("event_type, page_path, ip_hash, event_date, context")
    .gte("event_date", START)
    .limit(100000)
    .execute()
    .data
)
print(f"\nTotal page_events: {len(pe)}")

LISTING_RE = lambda p: p.startswith("/") and "-mieten" in p and not p.startswith("/ratgeber/") and p not in ("/kran-mieten-preise",)

listing_events = [r for r in pe if isinstance(r.get("page_path"), str) and LISTING_RE(r["page_path"])]
print(f"Page events on listing paths: {len(listing_events)}")

# Distinct (ip_hash, page_path, event_date) → unique PV-day pairs
pv_per_listing = defaultdict(set)
for r in listing_events:
    if r["event_type"] in ("scroll_depth_25", "scroll_depth_50", "scroll_depth_75"):
        pv_per_listing[r["page_path"]].add((r["ip_hash"], r["event_date"]))

listing_paths_with_pv = {p: len(s) for p, s in pv_per_listing.items()}
total_listing_pv = sum(listing_paths_with_pv.values())
print(f"\nUnique listing PV-days (scroll-fired): {total_listing_pv}")
print(f"Listing paths with >=1 PV: {len(listing_paths_with_pv)}")

# Top listings
print("\nTop 10 listings by PV-days:")
for p, c in sorted(listing_paths_with_pv.items(), key=lambda x: -x[1])[:10]:
    print(f"  {c:4d}  {p}")

# Listing-internal click events
listing_click_type = sum(1 for r in listing_events if r["event_type"] == "click_type_link")
listing_click_city = sum(1 for r in listing_events if r["event_type"] == "click_city_link")
listing_sammelanfrage = sum(1 for r in listing_events if r["event_type"] == "inline_sammelanfrage_submit")
print(f"\nclick_type_link on listings   : {listing_click_type}")
print(f"click_city_link on listings   : {listing_click_city}")
print(f"inline_sammelanfrage_submit   : {listing_sammelanfrage}")

# ----------------------------------------------------------------------
# 2) Firm events — phone/website/email/form_submit attributed to a
#    listing via city_context + type_context.
# ----------------------------------------------------------------------
fe = (
    sb.table("firm_events")
    .select("event_type, city_context, type_context, event_date, firm_id")
    .gte("event_date", START)
    .limit(50000)
    .execute()
    .data
)
print(f"\n{'=' * 78}\nFirm events (all): {len(fe)}")
type_dist = Counter(r["event_type"] for r in fe)
for t, c in type_dist.most_common():
    print(f"  {c:5d}  {t}")

# Filter to listing-attributed (both city_context AND type_context set)
listing_fe = [r for r in fe if r.get("city_context") and r.get("type_context")]
print(f"\nFirm events attributed to a listing (city+type set): {len(listing_fe)}")
listing_fe_dist = Counter(r["event_type"] for r in listing_fe)
for t, c in listing_fe_dist.most_common():
    print(f"  {c:5d}  {t}")

# Listing-attributed conversion-y events
phone_clicks = listing_fe_dist.get("phone_click", 0)
phone_reveals = listing_fe_dist.get("phone_reveal", 0)
website_clicks = listing_fe_dist.get("website_click", 0)
email_clicks = listing_fe_dist.get("email_click", 0)
form_submits = listing_fe_dist.get("form_submit", 0)
map_clicks = listing_fe_dist.get("map_click", 0)

print(f"\n{'=' * 78}\nLISTING FUNNEL (30d)")
print(f"  PV-days (scroll-fired)      : {total_listing_pv:6d}")
print(f"  phone_reveal                : {phone_reveals:6d}  ({phone_reveals/max(total_listing_pv,1)*100:5.2f}% of PV)")
print(f"  phone_click                 : {phone_clicks:6d}  ({phone_clicks/max(total_listing_pv,1)*100:5.2f}% of PV)")
print(f"  website_click               : {website_clicks:6d}  ({website_clicks/max(total_listing_pv,1)*100:5.2f}% of PV)")
print(f"  email_click                 : {email_clicks:6d}  ({email_clicks/max(total_listing_pv,1)*100:5.2f}% of PV)")
print(f"  form_submit                 : {form_submits:6d}  ({form_submits/max(total_listing_pv,1)*100:5.2f}% of PV)")
print(f"  map_click                   : {map_clicks:6d}  ({map_clicks/max(total_listing_pv,1)*100:5.2f}% of PV)")
total_action = phone_clicks + website_clicks + email_clicks + form_submits
print(f"  ANY HIGH-INTENT ACTION      : {total_action:6d}  ({total_action/max(total_listing_pv,1)*100:5.2f}% of PV)")

# Per-city × type funnel (top 8 listings)
print(f"\n{'=' * 78}\nTOP 8 LISTINGS — pv vs action")
listing_action_count = defaultdict(int)
for r in listing_fe:
    if r["event_type"] in ("phone_click", "website_click", "email_click", "form_submit"):
        key = (r["type_context"], r["city_context"])
        listing_action_count[key] += 1

# Match to PV-days
listing_pv_keyed = defaultdict(int)
for p, n in listing_paths_with_pv.items():
    # /baukran-mieten/wuerzburg -> (baukran, wuerzburg)
    segs = p.strip("/").split("/")
    if not segs or "-mieten" not in segs[0]:
        continue
    type_slug = segs[0].replace("-mieten", "")
    city_slug = segs[1] if len(segs) > 1 else None
    listing_pv_keyed[(type_slug, city_slug)] += n

print(f"\n{'TYPE':<14} {'CITY':<20} {'PV':>5} {'ACT':>4} {'CR':>6}")
for key, pv in sorted(listing_pv_keyed.items(), key=lambda x: -x[1])[:8]:
    act = listing_action_count.get(key, 0)
    cr = act / pv * 100 if pv else 0
    type_slug, city_slug = key
    print(f"{type_slug:<14} {(city_slug or '(no city)'):<20} {pv:5d} {act:4d} {cr:5.1f}%")

# ----------------------------------------------------------------------
# 3) Leads with entry_path matching a listing — high-confidence conversions
# ----------------------------------------------------------------------
leads = (
    sb.table("leads")
    .select("entry_path, is_test, created_at")
    .gte("created_at", f"{START}T00:00:00")
    .limit(5000)
    .execute()
    .data
)
real_leads = [l for l in leads if not l.get("is_test")]
listing_leads = [l for l in real_leads if isinstance(l.get("entry_path"), str) and "-mieten" in l["entry_path"] and not l["entry_path"].startswith("/ratgeber/") and l["entry_path"] != "/kran-mieten-preise"]
print(f"\n{'=' * 78}\nLeads (30d, real only): {len(real_leads)}")
print(f"Leads with entry_path on a listing: {len(listing_leads)}")
for l in listing_leads:
    print(f"  {l['created_at'][:10]}  entry={l['entry_path']}")
