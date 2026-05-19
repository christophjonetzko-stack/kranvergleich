"""
Import the 2026-05-18 GSC dump as a delta period that fills the gap
between the last weekly import (ending 2026-04-28) and 2026-05-16.

The 05-18 dump is CUMULATIVE (2026-03-31 → 2026-05-16, 652 clicks total).
The weekly imports already in DB cover 2026-04-01 → 2026-04-28. So the
delta to add = dump_totals − db_existing_totals, per page.

The script computes that delta automatically (no manual subtraction) and
upserts as period 2026-04-29 → 2026-05-16.

Run:
  python import_gsc_delta_2026_05_18.py            # dry-run preview
  python import_gsc_delta_2026_05_18.py --apply    # write to DB
"""
import argparse
import csv
import os
import sys
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

sys.stdout.reconfigure(encoding="utf-8")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
for line in (PROJECT_ROOT / ".env.local").read_text(encoding="utf-8").splitlines():
    if "=" in line and not line.startswith("#"):
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client
sb = create_client(os.environ["NEXT_PUBLIC_SUPABASE_URL"], os.environ["SUPABASE_SERVICE_ROLE_KEY"])

p = argparse.ArgumentParser()
p.add_argument("--apply", action="store_true")
args = p.parse_args()

CSV_PATH = PROJECT_ROOT.parent.parent / "gsc_2026_05_18" / "Seiten.csv"
PERIOD_START = "2026-04-29"
PERIOD_END = "2026-05-16"
DOMAIN = "kranvergleich.de"

def parse_pct(s):
    s = (s or "").strip().replace("%", "").replace(",", ".")
    return (float(s) / 100 if float(s) > 1 else float(s)) if s else 0.0

def parse_num(s):
    return float((s or "").strip().replace(",", ".")) if s else 0.0

# ---------- Read dump (cumulative totals per page) ----------
dump_rows = []
with open(CSV_PATH, encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for r in reader:
        url = (r["Die häufigsten Seiten"] or "").strip()
        if not url:
            continue
        parsed = urlparse(url)
        if DOMAIN not in parsed.netloc:
            continue
        path = (parsed.path or "/").rstrip("/") or "/"
        dump_rows.append({
            "page": path,
            "cum_clicks": int(parse_num(r["Klicks"])),
            "cum_impr": int(parse_num(r["Impressionen"])),
            "ctr": parse_pct(r.get("CTR", "")),
            "position": parse_num(r["Position"]),
        })

# Deduplicate /foo and /foo/ — keep max
dedup_dump = {}
for r in dump_rows:
    prev = dedup_dump.get(r["page"])
    if prev is None or r["cum_clicks"] > prev["cum_clicks"]:
        dedup_dump[r["page"]] = r
dump_rows = list(dedup_dump.values())
print(f"Dump: {len(dump_rows)} unique pages, {sum(r['cum_clicks'] for r in dump_rows)} total clicks")

# ---------- Read existing DB totals per page (across all prior periods) ----------
existing = sb.table("gsc_page_stats").select("page, clicks, impressions").lt("period_end", PERIOD_START).limit(50000).execute().data
db_sum = defaultdict(lambda: {"clicks": 0, "impr": 0})
for r in existing:
    db_sum[r["page"]]["clicks"] += r["clicks"]
    db_sum[r["page"]]["impr"] += r["impressions"]
print(f"DB (prior to {PERIOD_START}): {len(db_sum)} pages, {sum(d['clicks'] for d in db_sum.values())} total clicks")

# ---------- Compute delta rows ----------
delta_rows = []
neg_delta_pages = []
for d in dump_rows:
    page = d["page"]
    existing_clicks = db_sum.get(page, {}).get("clicks", 0)
    existing_impr = db_sum.get(page, {}).get("impr", 0)
    delta_clicks = d["cum_clicks"] - existing_clicks
    delta_impr = d["cum_impr"] - existing_impr
    if delta_clicks < 0 or delta_impr < 0:
        neg_delta_pages.append((page, d["cum_clicks"], existing_clicks, d["cum_impr"], existing_impr))
        delta_clicks = max(0, delta_clicks)
        delta_impr = max(0, delta_impr)
    if delta_clicks == 0 and delta_impr == 0:
        continue
    delta_rows.append({
        "page": page,
        "clicks": delta_clicks,
        "impressions": delta_impr,
        "ctr": d["ctr"],          # CTR + position taken from dump as period-average proxy
        "position": d["position"],
        "period_start": PERIOD_START,
        "period_end": PERIOD_END,
    })

print(f"\nDelta period {PERIOD_START} → {PERIOD_END}")
print(f"  Rows with positive delta: {len(delta_rows)}")
print(f"  Delta clicks total: {sum(r['clicks'] for r in delta_rows)}")
print(f"  Delta impressions total: {sum(r['impressions'] for r in delta_rows)}")

if neg_delta_pages:
    print(f"\n⚠ {len(neg_delta_pages)} pages had negative delta (DB > cumulative — GSC retroactively adjusted):")
    for pg, dc, ec, di, ei in neg_delta_pages[:5]:
        print(f"    {pg}  cum_clicks={dc} db={ec}  cum_impr={di} db={ei}")

# Preview top 20
delta_rows.sort(key=lambda r: -r["clicks"])
print(f"\nTop 20 pages by delta clicks (preview):")
for r in delta_rows[:20]:
    print(f"  {r['page']:55s}  +{r['clicks']:4d} clicks  +{r['impressions']:6d} impr  pos={r['position']:.1f}")

if not args.apply:
    print("\n(dry-run — pass --apply to upsert)")
    sys.exit(0)

# ---------- Upsert ----------
BATCH = 500
for i in range(0, len(delta_rows), BATCH):
    chunk = delta_rows[i:i+BATCH]
    sb.table("gsc_page_stats").upsert(chunk, on_conflict="page,period_start,period_end").execute()
    print(f"  upserted {i + len(chunk)} / {len(delta_rows)}")
print(f"\n✅ done — {len(delta_rows)} rows for period {PERIOD_START} → {PERIOD_END}")
