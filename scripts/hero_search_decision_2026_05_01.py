"""Pull every shred of engagement data we have to inform the hero-search
rebuild decision (classic / AI-only / hybrid). Read-only, last 30 days.

Outputs absolute counts, not just rates — caller wants to see whether
n=50 or n=5000."""
import os
import sys
from collections import Counter, defaultdict
from datetime import date, timedelta

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

TODAY = date.today()
SINCE = (TODAY - timedelta(days=30)).isoformat()
print(f"Window: {SINCE} → {TODAY.isoformat()} (30 days, inclusive of today)")
print("=" * 78)


def fetch_all(table, select, since_col, since_val, extra=None):
    """Paginate through every row matching since_col >= since_val."""
    out = []
    step = 1000
    start = 0
    while True:
        q = sb.table(table).select(select).gte(since_col, since_val)
        if extra:
            for op, args in extra:
                q = getattr(q, op)(*args)
        rows = q.range(start, start + step - 1).execute().data or []
        out.extend(rows)
        if len(rows) < step:
            break
        start += step
    return out


# --- 1. firm_events (last 30d) -------------------------------------------
fe = fetch_all("firm_events", "event_type, event_date, ip_hash, city_context, type_context, firm_id", "event_date", SINCE)
print(f"\n[1] firm_events rows in window: {len(fe)}")
by_type = Counter(r["event_type"] for r in fe)
for t in ("profile_view", "phone_reveal", "phone_click", "email_click", "website_click", "map_click", "form_submit"):
    print(f"    {t:18s} {by_type.get(t, 0):>6d}")

# Date span actually covered
fe_dates = sorted({r["event_date"] for r in fe})
if fe_dates:
    print(f"    actual span: {fe_dates[0]} → {fe_dates[-1]} ({len(fe_dates)} distinct days)")

# Phone reveal → click ratio
pr = by_type.get("phone_reveal", 0)
pc = by_type.get("phone_click", 0)
print(f"    phone_click / phone_reveal: {pc}/{pr} = {pc/pr:.1%}" if pr else "    phone_click / phone_reveal: n/a (no reveals)")


# --- 2. page_events (last 30d) -------------------------------------------
pe = fetch_all("page_events", "event_type, event_date, ip_hash, page_path, context", "event_date", SINCE)
print(f"\n[2] page_events rows in window: {len(pe)}")
pe_by_type = Counter(r["event_type"] for r in pe)
for t in (
    "scroll_depth_75",
    "click_city_link",
    "click_type_link",
    "calculator_step_completed",
    "calculator_recommendation_shown",
    "calculator_lead_submit_attempt",
    "calculator_lead_submit_success",
    "inline_sammelanfrage_submit",
):
    print(f"    {t:34s} {pe_by_type.get(t, 0):>6d}")
pe_dates = sorted({r["event_date"] for r in pe})
if pe_dates:
    print(f"    actual span: {pe_dates[0]} → {pe_dates[-1]} ({len(pe_dates)} distinct days)")


# --- 3. page_path breakdown for click/scroll events ----------------------
print("\n[3] page_events by page_path (top 15 per event_type)")
for et in ("scroll_depth_75", "click_city_link", "click_type_link"):
    paths = Counter(r["page_path"] for r in pe if r["event_type"] == et)
    if not paths:
        print(f"  {et}: 0 rows")
        continue
    print(f"  {et} (n={sum(paths.values())}, distinct paths={len(paths)})")
    for p, n in paths.most_common(15):
        print(f"    {n:>5d}  {p}")


# --- 4. Calculator funnel ------------------------------------------------
print("\n[4] Calculator funnel (page_events)")
calc_steps = Counter()
for r in pe:
    if r["event_type"] == "calculator_step_completed":
        ctx = r.get("context") or {}
        step = ctx.get("step")
        if step is not None:
            calc_steps[step] += 1
for s in sorted(calc_steps):
    print(f"    step {s} completed: {calc_steps[s]}")
print(f"    recommendation_shown    : {pe_by_type.get('calculator_recommendation_shown', 0)}")
print(f"    lead_submit_attempt     : {pe_by_type.get('calculator_lead_submit_attempt', 0)}")
print(f"    lead_submit_success     : {pe_by_type.get('calculator_lead_submit_success', 0)}")


# --- 5. firm_events: city / type context -------------------------------
print("\n[5] firm_events grouped by entry city_context (top 10) — where leads come from")
city_ctx = Counter(r["city_context"] for r in fe if r["city_context"])
for c, n in city_ctx.most_common(10):
    print(f"    {n:>5d}  {c}")
type_ctx = Counter(r["type_context"] for r in fe if r["type_context"])
print(f"\n    firm_events grouped by type_context (top 10)")
for t, n in type_ctx.most_common(10):
    print(f"    {n:>5d}  {t}")


# --- 6. Same-day ip_hash overlap ----------------------------------------
print("\n[6] Best-effort funnel: same-day ip_hash overlap page_events ↔ firm_events")
print("    (ip_hash is daily-rotating — proxy for 'visited X and converted same day')")
fe_by_day_iphash = defaultdict(set)
for r in fe:
    fe_by_day_iphash[(r["event_date"], r["event_type"])].add(r["ip_hash"])
pe_by_day_path_iphash = defaultdict(set)
for r in pe:
    pe_by_day_path_iphash[(r["event_date"], r["page_path"])].add(r["ip_hash"])

# How many ip_hashes saw /kran-mieten-preise (the only page with PageEventTracker)
# and converted (form_submit or phone_reveal/click) the same day?
pillar_paths = [p for (d, p), s in pe_by_day_path_iphash.items() if p.startswith("/kran-mieten-preise")]
distinct_pillar_iphash_days = sum(len(s) for (d, p), s in pe_by_day_path_iphash.items() if p.startswith("/kran-mieten-preise"))
print(f"    Distinct (day, ip_hash) seeing /kran-mieten-preise (any event): {distinct_pillar_iphash_days}")

# Cross: same-day form_submit
overlap_form = 0
overlap_reveal = 0
for (d, p), pe_set in pe_by_day_path_iphash.items():
    if not p.startswith("/kran-mieten-preise"):
        continue
    fs_set = fe_by_day_iphash.get((d, "form_submit"), set())
    pr_set = fe_by_day_iphash.get((d, "phone_reveal"), set())
    overlap_form += len(pe_set & fs_set)
    overlap_reveal += len(pe_set & pr_set)
print(f"    Same-day pillar-page ip_hash → form_submit: {overlap_form}")
print(f"    Same-day pillar-page ip_hash → phone_reveal: {overlap_reveal}")


# --- 7. Leads table (raw count, source breakdown if column exists) -------
print("\n[7] leads table")
try:
    leads = sb.table("leads").select("created_at, is_test", count="exact").gte("created_at", SINCE).execute()
    print(f"    Total leads in window: {leads.count}")
    real = [r for r in (leads.data or []) if not r.get("is_test")]
    print(f"    Non-test leads: {len(real)} (full row sample limited to first 1000 — ok for count)")
except Exception as e:
    print(f"    ERROR reading leads: {e}")

# Try to detect if any "source" column exists by sampling
try:
    sample = sb.table("leads").select("*").limit(1).execute().data
    if sample:
        cols = list(sample[0].keys())
        print(f"    leads columns: {sorted(cols)}")
        # If a source-like column exists, break down by it
        for col in ("source", "source_path", "entry_path", "referrer"):
            if col in cols:
                rows = sb.table("leads").select(col).gte("created_at", SINCE).execute().data or []
                bd = Counter(r.get(col) for r in rows)
                print(f"\n    leads.{col} breakdown:")
                for v, n in bd.most_common(15):
                    print(f"      {n:>5d}  {v!r}")
except Exception as e:
    print(f"    sample error: {e}")


# --- 8. profile_view top firms (intent quality proxy) -------------------
print("\n[8] profile_view → form_submit conversion at firm level (top 15 by views)")
firm_views = Counter(r["firm_id"] for r in fe if r["event_type"] == "profile_view")
firm_forms = Counter(r["firm_id"] for r in fe if r["event_type"] == "form_submit")
firm_phone = Counter(r["firm_id"] for r in fe if r["event_type"] in ("phone_reveal", "phone_click"))

top_firms = firm_views.most_common(15)
if top_firms:
    firm_ids = [fid for fid, _ in top_firms]
    names = sb.table("companies").select("id,name").in_("id", firm_ids).execute().data
    nm = {f["id"]: f["name"] for f in names}
    print(f"    {'views':>6s} {'forms':>6s} {'phone':>6s}  firm")
    for fid, v in top_firms:
        f_ = firm_forms.get(fid, 0)
        ph = firm_phone.get(fid, 0)
        print(f"    {v:>6d} {f_:>6d} {ph:>6d}  {nm.get(fid, fid)[:55]}")


# --- 9. Headline numbers summary -----------------------------------------
print("\n" + "=" * 78)
print("HEADLINE TOTALS (last 30 days)")
print("=" * 78)
print(f"  firm_events total          : {len(fe)}")
print(f"  page_events total          : {len(pe)}")
print(f"  profile_view               : {by_type.get('profile_view', 0)}")
print(f"  phone_reveal               : {by_type.get('phone_reveal', 0)}")
print(f"  phone_click                : {by_type.get('phone_click', 0)}")
print(f"  form_submit (firm-side)    : {by_type.get('form_submit', 0)}")
print(f"  inline_sammelanfrage_submit: {pe_by_type.get('inline_sammelanfrage_submit', 0)}")
print(f"  calc lead_submit_success   : {pe_by_type.get('calculator_lead_submit_success', 0)}")
print(f"  scroll_depth_75 (any page) : {pe_by_type.get('scroll_depth_75', 0)}")
print(f"  click_city_link            : {pe_by_type.get('click_city_link', 0)}")
print(f"  click_type_link            : {pe_by_type.get('click_type_link', 0)}")
