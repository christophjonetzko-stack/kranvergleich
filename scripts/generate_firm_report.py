#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate an HTML outreach report for a single firm (measurable proof).

Data combined:
  1. Leads table — anonymized project entries for cities/types the firm serves
  2. GSC page stats (from import_gsc_csv.py) — impressions/clicks/avg position
     for each /{crane-type}-mieten/{city} page where this firm appears
  3. Live position in the listing — replicates src/lib/queries.ts
     getCompaniesForCraneAndCity sort (is_premium desc → google_rating desc,
     with crane_type match partition, batch-50 limit)

Output: scripts/firm_reports/{slug}_{YYYY-MM-DD}.html — HTML email-ready.

Usage:
  python scripts/generate_firm_report.py --firm-id <uuid>
  python scripts/generate_firm_report.py --slug boels-verleih-gmbh
  python scripts/generate_firm_report.py --slug X --days 90 --top-n 10
"""
import argparse
import html
import os
import sys
from collections import defaultdict
from datetime import datetime, timedelta, timezone
from pathlib import Path

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

parser = argparse.ArgumentParser()
g = parser.add_mutually_exclusive_group(required=True)
g.add_argument("--firm-id", help="Firm UUID")
g.add_argument("--slug", help="Firm slug")
parser.add_argument("--days", type=int, default=30, help="Lookback window in days (default 30)")
parser.add_argument("--top-n", type=int, default=10, help="Top N (city × type) combos to show")
parser.add_argument("--out-dir", default=None, help="Output dir (default scripts/firm_reports)")
args = parser.parse_args()

# ---------- fetch firm ----------
q = sb.table("companies").select("*, company_cranes(crane_type_id), company_regions(city_id)")
firm_res = (q.eq("id", args.firm_id) if args.firm_id else q.eq("slug", args.slug)).execute()
if not firm_res.data:
    print(f"Firm not found: {args.firm_id or args.slug}")
    sys.exit(1)
firm = firm_res.data[0]
firm_id = firm["id"]
firm_name = firm["name"]
firm_slug = firm["slug"]

# ---------- load crane_types + cities catalog ----------
ct_rows = sb.table("crane_types").select("id,name,slug").execute().data
ct_by_id = {c["id"]: c for c in ct_rows}

city_rows = sb.table("cities").select("id,name,slug,is_active").eq("is_active", True).execute().data
city_by_id = {c["id"]: c for c in city_rows}

# ---------- firm's crane types & covered cities ----------
firm_crane_type_ids = {cc["crane_type_id"] for cc in firm.get("company_cranes", [])}
firm_city_ids = {cr["city_id"] for cr in firm.get("company_regions", [])}

# HQ city → resolve to cities table if possible
hq_city_name = firm.get("city")
hq_city_row = next((c for c in city_rows if c["name"] == hq_city_name), None)
if hq_city_row:
    firm_city_ids.add(hq_city_row["id"])


# ---------- replicate getCompaniesForCraneAndCity sort ----------
def firm_position_in_listing(firm_id: str, crane_type_id: str, city_id: str):
    """Return (position, total_shown, total_serving) mirroring the live site."""
    regions = sb.table("company_regions").select("company_id").eq("city_id", city_id).execute().data
    ids = list({r["company_id"] for r in regions})
    total_serving = len(ids)
    if not ids:
        return None, 0, 0

    # Match Supabase server-side: limit to first 50 ids, order is_premium desc, rating desc,
    # only is_active=true AND is_relevant=true
    first_batch = ids[:50]
    res = (
        sb.table("companies")
        .select("id,is_premium,google_rating,company_cranes(crane_type_id)")
        .in_("id", first_batch)
        .eq("is_active", True)
        .eq("is_relevant", True)
        .order("is_premium", desc=True)
        .order("google_rating", desc=True)
        .execute()
    )
    all_rows = res.data

    def has_ct(r):
        return any(cc["crane_type_id"] == crane_type_id for cc in r.get("company_cranes", []))

    with_type = [r for r in all_rows if has_ct(r)]
    without_type = [r for r in all_rows if not has_ct(r)]
    ordered = with_type + without_type
    for idx, r in enumerate(ordered, 1):
        if r["id"] == firm_id:
            return idx, len(ordered), total_serving
    return None, len(ordered), total_serving  # firm filtered out (e.g. inactive) or beyond top-50


# ---------- build list of (city × crane-type) combos where firm appears ----------
combos = []  # dicts with city_id, city_name, city_slug, ct_id, ct_name, ct_slug, path
for city_id in firm_city_ids:
    city = city_by_id.get(city_id)
    if not city:
        continue
    for ct_id in firm_crane_type_ids:
        ct = ct_by_id.get(ct_id)
        if not ct:
            continue
        # page path: /{type-slug}/{city-slug}   — note crane_type slug already contains "-mieten"
        path = f"/{ct['slug']}/{city['slug']}"
        combos.append({
            "city_id": city_id, "city_name": city["name"], "city_slug": city["slug"],
            "ct_id": ct_id, "ct_name": ct["name"], "ct_slug": ct["slug"],
            "path": path,
        })

# ---------- fetch leads for each combo ----------
since_dt = datetime.now(timezone.utc) - timedelta(days=args.days)
leads_res = (
    sb.table("leads")
    .select("id,crane_type_id,city,project_description,preferred_date,duration_days,created_at")
    .gte("created_at", since_dt.isoformat())
    .execute()
    .data
)
leads_by_combo = defaultdict(list)
for lead in leads_res:
    # normalize city name lookup
    city_name_lead = (lead.get("city") or "").strip()
    for combo in combos:
        if combo["ct_id"] == lead["crane_type_id"] and combo["city_name"].lower() == city_name_lead.lower():
            leads_by_combo[(combo["ct_id"], combo["city_id"])].append(lead)

# ---------- fetch GSC stats for each page path ----------
paths = list({c["path"] for c in combos})
gsc_by_path = {}
if paths:
    try:
        gsc_res = (
            sb.table("gsc_page_stats")
            .select("*")
            .in_("page", paths)
            .order("period_end", desc=True)
            .execute()
            .data
        )
        # Pick the most recent row per path
        for r in gsc_res:
            if r["page"] not in gsc_by_path:
                gsc_by_path[r["page"]] = r
    except Exception as e:
        # Table doesn't exist yet (migration not applied) or permission issue —
        # continue with empty GSC; the report renders a warning and leaves the
        # impressions/clicks columns blank.
        print(f"  (GSC stats unavailable: {type(e).__name__} — proceeding without GSC data)")

# ---------- fetch firm_events (on-site engagement) ----------
# profile_view / phone_click / email_click / website_click — see
# supabase/migrations/005_firm_events.sql. Table may not exist yet if the
# migration hasn't been applied; fall back to an empty dict in that case.
events_since = (datetime.now(timezone.utc) - timedelta(days=args.days)).date()
events_rows = []
first_event_date = None
try:
    events_res = (
        sb.table("firm_events")
        .select("event_type,city_context,type_context,event_date")
        .eq("firm_id", firm_id)
        .gte("event_date", events_since.isoformat())
        .execute()
        .data
    )
    events_rows = events_res or []
    # Find the earliest event for this firm ever — used to show the data-maturity
    # badge ("Frühphase — Daten werden noch gesammelt" if <14 days of history).
    first_res = (
        sb.table("firm_events")
        .select("event_date")
        .eq("firm_id", firm_id)
        .order("event_date", desc=False)
        .limit(1)
        .execute()
        .data
    )
    if first_res:
        first_event_date = first_res[0]["event_date"]
except Exception as e:
    print(f"  (firm_events unavailable: {type(e).__name__} — proceeding without engagement data)")

events_by_type = defaultdict(int)
events_by_type_city = defaultdict(lambda: defaultdict(int))
for e in events_rows:
    et = e["event_type"]
    events_by_type[et] += 1
    city_ctx = e.get("city_context")
    if city_ctx:
        events_by_type_city[et][city_ctx] += 1

engagement_total = sum(events_by_type.values())

# Days of data collection for this firm — used for maturity badge
days_collected = None
if first_event_date:
    try:
        first_dt = datetime.strptime(first_event_date, "%Y-%m-%d").date()
        days_collected = (datetime.now().date() - first_dt).days
    except Exception:
        pass


# ---------- compute firm position for each combo ----------
positions = {}
print(f"Computing positions for {len(combos)} combos...")
for combo in combos:
    key = (combo["ct_id"], combo["city_id"])
    pos, shown, serving = firm_position_in_listing(firm_id, combo["ct_id"], combo["city_id"])
    positions[key] = {"pos": pos, "shown": shown, "serving": serving}

# ---------- score combos — leads + GSC impressions, pick top-N ----------
def score(combo):
    key = (combo["ct_id"], combo["city_id"])
    n_leads = len(leads_by_combo.get(key, []))
    gsc = gsc_by_path.get(combo["path"], {})
    impr = int(gsc.get("impressions", 0) or 0)
    # Leads weighted 100x since they're rare + high intent
    return (n_leads * 100) + (impr * 0.1)


combos.sort(key=score, reverse=True)
top_combos = combos[: args.top_n]

# ---------- totals ----------
total_impressions = sum(int((gsc_by_path.get(c["path"]) or {}).get("impressions", 0) or 0) for c in top_combos)
total_clicks = sum(int((gsc_by_path.get(c["path"]) or {}).get("clicks", 0) or 0) for c in top_combos)
total_leads = sum(len(leads_by_combo.get((c["ct_id"], c["city_id"]), [])) for c in top_combos)
any_gsc = any(c["path"] in gsc_by_path for c in top_combos)


# ---------- conservative upsell math ----------
def upsell_delta(n_leads: int, clicks: int, pos, shown: int):
    """Return a conservative "+X-Y leads/month" string.

    Model: current leads_combo = L. If firm is not already premium+top,
    premium would roughly double/triple share on that page. Cap delta low.
    """
    if not any_gsc and n_leads == 0:
        return "—"
    # Baseline: observed leads in window scaled to per-month
    per_month = n_leads * 30 / args.days
    if pos and pos <= 3:
        return "bereits Top 3 — kein Upsell nötig"
    # Estimated total leads generated by this page (conservative: clicks × 5% form-fill rate)
    est_page_total = max(n_leads, clicks * 0.05)
    # Firm's current share vs. premium share (30% is generous top-1 share)
    current_share = 1 / max(shown, 1)
    premium_share = 0.30
    delta = est_page_total * (premium_share - current_share)
    if delta < 0.3:
        return "+0-1 Leads/Monat"
    lo = max(0, round(delta * 0.6))
    hi = round(delta * 1.2)
    if lo == hi:
        return f"+{lo} Leads/Monat"
    return f"+{lo}-{hi} Leads/Monat"


# ---------- render HTML ----------
def esc(s):
    return html.escape(str(s or ""))


EVENT_LABELS = {
    "profile_view": "Profilaufrufe",
    "phone_reveal": "Telefonnummer angezeigt",
    "phone_click": "Telefon-Klicks",
    "email_click": "E-Mail-Klicks",
    "website_click": "Website-Klicks",
}


def engagement_section_html() -> str:
    """Render the on-site engagement block. Returns empty string when the
    firm_events table isn't ready (migration not applied) or no events exist —
    caller keeps layout clean in that case."""
    if engagement_total == 0 and days_collected is None:
        return ""
    if days_collected is not None and days_collected < 14:
        maturity_badge = (
            f"<span style='display:inline-block;background:#fef3c7;color:#78350f;"
            f"border:1px solid #fde68a;border-radius:999px;padding:2px 10px;"
            f"font-size:11px;margin-left:8px;'>Frühphase — Datenerhebung seit "
            f"{days_collected} Tag{'en' if days_collected != 1 else ''}</span>"
        )
    else:
        days_str = f"{days_collected} Tagen" if days_collected else f"{args.days} Tagen"
        maturity_badge = (
            f"<span style='color:#64748b;font-size:12px;margin-left:8px;'>"
            f"Datenerhebung seit {days_str}</span>"
        )

    # Total tiles per event type
    tile_order = ["profile_view", "phone_reveal", "phone_click", "email_click", "website_click"]
    tiles = "".join(
        f"<div class='kpi'><div class='kpi-val'>{events_by_type.get(et, 0):,}</div>"
        f"<div class='kpi-label'>{EVENT_LABELS[et]}</div></div>"
        for et in tile_order
    )

    # Per-city breakdown (top 5 cities contributing most events, across types)
    city_totals = defaultdict(int)
    for et, city_map in events_by_type_city.items():
        for city_slug, n in city_map.items():
            city_totals[city_slug] += n
    top_cities = sorted(city_totals.items(), key=lambda kv: kv[1], reverse=True)[:5]

    if top_cities:
        city_rows_html = "".join(
            f"<tr><td>{esc(city_slug)}</td>"
            f"<td>{events_by_type_city['profile_view'].get(city_slug, 0):,}</td>"
            f"<td>{events_by_type_city['phone_reveal'].get(city_slug, 0):,}</td>"
            f"<td>{events_by_type_city['phone_click'].get(city_slug, 0):,}</td>"
            f"<td>{events_by_type_city['email_click'].get(city_slug, 0):,}</td>"
            f"<td>{events_by_type_city['website_click'].get(city_slug, 0):,}</td>"
            f"<td><strong>{total:,}</strong></td></tr>"
            for city_slug, total in top_cities
        )
        city_table_html = (
            "<h3 style='font-size:14px;margin:18px 0 8px;color:#334155;'>"
            "Herkunft der Interaktionen (Top-Städte)</h3>"
            "<table>"
            "<thead><tr><th>Stadt</th>"
            "<th>Profilaufrufe</th><th>Tel. angezeigt</th><th>Telefon</th><th>E-Mail</th><th>Website</th><th>Summe</th></tr></thead>"
            f"<tbody>{city_rows_html}</tbody></table>"
        )
    else:
        city_table_html = (
            "<p class='sub' style='margin-top:10px;'>"
            "Stadtweise Aufschlüsselung erscheint, sobald erste Interaktionen von Stadt-Seiten "
            "(z.B. /autokran-mieten/berlin) erfasst sind.</p>"
        )

    return (
        f"<h2>Interaktionen auf kranvergleich.de{maturity_badge}</h2>"
        "<p class='sub'>Wie oft Besucher in den letzten "
        f"{args.days} Tagen Ihr Profil aufgerufen oder einen Kontaktlink zu Ihrer Firma "
        "angeklickt haben. Nutzer werden pro Tag einmal gezählt (keine Mehrfach-Klicks).</p>"
        f"<div class='kpi-grid'>{tiles}</div>"
        f"{city_table_html}"
    )


def lead_one_liner(lead):
    """Anonymized description of one lead."""
    ct = ct_by_id.get(lead.get("crane_type_id"), {}).get("name", "?")
    city = lead.get("city", "?")
    dur = lead.get("duration_days")
    dur_str = f"{dur} Tag{'e' if dur != 1 else ''}" if dur else "—"
    pref = lead.get("preferred_date") or "flex"
    created = (lead.get("created_at") or "")[:10]
    return f"{esc(city)} · {esc(ct)} · {esc(dur_str)} · Termin {esc(pref)} · Anfrage vom {esc(created)}"


today = datetime.now().date()
report_title = f"Marktbericht — {firm_name}"

rows_html_parts = []
for c in top_combos:
    key = (c["ct_id"], c["city_id"])
    p = positions.get(key, {"pos": None, "shown": 0, "serving": 0})
    gsc = gsc_by_path.get(c["path"], {})
    n_leads = len(leads_by_combo.get(key, []))
    impr = int(gsc.get("impressions", 0) or 0)
    clicks = int(gsc.get("clicks", 0) or 0)
    pos_avg = gsc.get("position")
    pos_str = f"{p['pos']}/{p['shown']}" if p["pos"] else f"—/{p['shown']}"
    upsell = upsell_delta(n_leads, clicks, p["pos"], p["shown"])
    row_bg = "#fef3c7" if n_leads > 0 else "#ffffff"
    gsc_cell = (
        f"<td>{impr:,}</td><td>{clicks:,}</td><td>{pos_avg:.1f}</td>"
        if gsc else "<td>—</td><td>—</td><td>—</td>"
    )
    rows_html_parts.append(
        f"<tr style='background:{row_bg};'>"
        f"<td><a href='https://kranvergleich.de{esc(c['path'])}' style='color:#2563eb;'>{esc(c['ct_name'])} {esc(c['city_name'])}</a></td>"
        f"{gsc_cell}"
        f"<td><strong>{pos_str}</strong></td>"
        f"<td>{n_leads}</td>"
        f"<td style='font-size:12px;color:#64748b;'>{upsell}</td>"
        f"</tr>"
    )
table_rows = "\n".join(rows_html_parts)

# Concrete leads list (anonymized, last {days} days)
leads_shown = []
for c in top_combos:
    for l in leads_by_combo.get((c["ct_id"], c["city_id"]), []):
        leads_shown.append(lead_one_liner(l))
leads_shown = leads_shown[:20]
leads_list_html = (
    "<ul style='padding-left:20px;margin:8px 0;color:#0f172a;font-size:14px;'>"
    + "".join(f"<li style='margin-bottom:4px;'>{l}</li>" for l in leads_shown)
    + "</ul>"
) if leads_shown else "<p style='color:#64748b;font-size:14px;'>Keine konkreten Anfragen im Berichtszeitraum — die Übersicht oben zeigt Sichtbarkeit und Marktpotenzial.</p>"

gsc_warning = "" if any_gsc else (
    "<p style='background:#fef3c7;border-left:4px solid #f59e0b;padding:12px;font-size:13px;color:#78350f;'>"
    "Hinweis: Search-Console-Daten für diesen Zeitraum wurden noch nicht importiert. "
    "Die Impressions- und Klick-Spalten bleiben leer; Positionen und Lead-Zahlen sind dennoch aktuell.</p>"
)

html_doc = f"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>{esc(report_title)}</title>
<style>
  body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 780px; margin: 0 auto; padding: 24px; color: #0f172a; }}
  h1 {{ font-size: 22px; margin: 0 0 4px; }}
  h2 {{ font-size: 16px; margin: 28px 0 10px; color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }}
  .sub {{ color: #64748b; font-size: 13px; }}
  .kpi-grid {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 18px 0; }}
  .kpi {{ background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; text-align: center; }}
  .kpi-val {{ font-size: 22px; font-weight: 600; color: #0f172a; }}
  .kpi-label {{ font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 4px; }}
  table {{ width: 100%; border-collapse: collapse; font-size: 13px; }}
  th, td {{ text-align: left; padding: 8px 10px; border-bottom: 1px solid #e2e8f0; }}
  th {{ background: #f1f5f9; font-weight: 600; color: #334155; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }}
  .footer {{ margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; }}
  .upsell-box {{ background: #eff6ff; border-left: 4px solid #2563eb; padding: 14px 16px; margin: 16px 0; font-size: 13px; }}
</style>
</head>
<body>

<h1>{esc(report_title)}</h1>
<div class="sub">Berichtszeitraum: letzte {args.days} Tage · Stand: {today.isoformat()} · Firma: <strong>{esc(firm_name)}</strong>{' · ' + esc(firm.get('city')) if firm.get('city') else ''}</div>

{gsc_warning}

<h2>Auf einen Blick</h2>
<div class="kpi-grid">
  <div class="kpi"><div class="kpi-val">{total_impressions:,}</div><div class="kpi-label">Impressions (Google)</div></div>
  <div class="kpi"><div class="kpi-val">{total_clicks:,}</div><div class="kpi-label">Klicks auf Seiten</div></div>
  <div class="kpi"><div class="kpi-val">{total_leads}</div><div class="kpi-label">Konkrete Anfragen</div></div>
  <div class="kpi"><div class="kpi-val">{len(top_combos)}</div><div class="kpi-label">Stadt × Krantyp-Seiten</div></div>
</div>

{engagement_section_html()}

<h2>Sichtbarkeit pro Seite (Top {len(top_combos)})</h2>
<p class="sub">Seiten auf kranvergleich.de, auf denen Ihre Firma im Listing erscheint. Position zeigt, wo Sie unter den aktiv angezeigten Anbietern stehen.</p>
<table>
  <thead>
    <tr>
      <th>Seite</th>
      <th>Impr.</th>
      <th>Klicks</th>
      <th>⌀ Pos Google</th>
      <th>Ihre Position</th>
      <th>Leads</th>
      <th>Potenzial Premium</th>
    </tr>
  </thead>
  <tbody>
    {table_rows}
  </tbody>
</table>

<h2>Konkrete Anfragen ({len(leads_shown)} von {sum(len(leads_by_combo.get((c['ct_id'], c['city_id']), [])) for c in top_combos)})</h2>
{leads_list_html}

<div class="upsell-box">
  <strong>Premium Listing:</strong> Auf den Top-Seiten oben wären Sie mit Premium-Platzierung dauerhaft auf Position 1. Die rechte Spalte oben schätzt das Lead-Potenzial konservativ — basierend auf der aktuellen Klickrate der jeweiligen Seite, nicht auf Annahmen. Schätzung geht nur bis zu realistischen Werten; tatsächliche Performance hängt von Profil, Fotos und Bewertungen ab.
</div>

<div class="footer">
  Automatisch generiert von kranvergleich.de · Daten aus Google Search Console, internen Formularanfragen und aktueller Anbieter-Datenbank. Zahlen für den Zeitraum der letzten {args.days} Tage.
</div>

</body>
</html>
"""

out_dir = Path(args.out_dir) if args.out_dir else Path(__file__).parent / "firm_reports"
out_dir.mkdir(parents=True, exist_ok=True)
out_path = out_dir / f"{firm_slug}_{today.isoformat()}.html"
out_path.write_text(html_doc, encoding="utf-8")

print(f"\n✅ Report written: {out_path}")
print(f"   Firm: {firm_name}")
print(f"   Combos: {len(combos)} total, top {len(top_combos)} in report")
print(f"   Totals: {total_impressions:,} impr · {total_clicks:,} clicks · {total_leads} leads")
print(f"   GSC data available: {'YES' if any_gsc else 'NO — run import_gsc_csv.py first'}")
print(f"   On-site events: {engagement_total:,} total ({days_collected or 0} days collected)")
