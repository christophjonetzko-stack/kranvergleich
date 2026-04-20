#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Read-only diagnostic for the 32 _extraCities still without a Supabase row.

For each city, reports:
  - home_count: companies.city == city_name AND active AND relevant
  - declared_count: companies with the city name (umlaut or ASCII) or the
    home Bundesland as a substring of any service_regions[] entry. This
    simulates what normalize_service_regions.py would match if we added
    the city to Supabase. Per-firm counted once.

Decision rule (from 2026-04-18 expansion, documented in memory):
  PROMOTE  = home >= 1 AND declared >= 8
  DROP     = declared < 5
  DEFER    = everything else (manual review)
"""
import os
import re
import sys
import unicodedata
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

# From src/data/cities-static.ts — the 32 _extraCities remaining after
# 2026-04-20 cleanup. Each row: (slug, display_name, state, nearest_slug).
CITIES = [
    ("chemnitz",      "Chemnitz",       "Sachsen",                 "dresden"),
    ("darmstadt",     "Darmstadt",      "Hessen",                  "frankfurt-am-main"),
    ("ehingen",       "Ehingen",        "Baden-Württemberg",       "ulm"),
    ("erlangen",      "Erlangen",       "Bayern",                  "nuernberg"),
    ("flensburg",     "Flensburg",      "Schleswig-Holstein",      "hamburg"),
    ("gelsenkirchen", "Gelsenkirchen",  "Nordrhein-Westfalen",     "essen"),
    ("goettingen",    "Göttingen",      "Niedersachsen",           "hannover"),
    ("hagen",         "Hagen",          "Nordrhein-Westfalen",     "dortmund"),
    ("halle",         "Halle",          "Sachsen-Anhalt",          "leipzig"),
    ("hamm",          "Hamm",           "Nordrhein-Westfalen",     "dortmund"),
    ("heidelberg",    "Heidelberg",     "Baden-Württemberg",       "mannheim"),
    ("jena",          "Jena",           "Thüringen",               "leipzig"),
    ("kassel",        "Kassel",         "Hessen",                  "hannover"),
    ("koblenz",       "Koblenz",        "Rheinland-Pfalz",         "koeln"),
    ("leverkusen",    "Leverkusen",     "Nordrhein-Westfalen",     "koeln"),
    ("ludwigshafen",  "Ludwigshafen",   "Rheinland-Pfalz",         "mannheim"),
    ("moers",         "Moers",          "Nordrhein-Westfalen",     "duisburg"),
    ("muelheim",      "Mülheim",        "Nordrhein-Westfalen",     "essen"),
    ("oberhausen",    "Oberhausen",     "Nordrhein-Westfalen",     "essen"),
    ("offenbach",     "Offenbach",      "Hessen",                  "frankfurt-am-main"),
    ("osnabrueck",    "Osnabrück",      "Niedersachsen",           "hannover"),
    ("paderborn",     "Paderborn",      "Nordrhein-Westfalen",     "dortmund"),
    ("pforzheim",     "Pforzheim",      "Baden-Württemberg",       "karlsruhe"),
    ("recklinghausen","Recklinghausen", "Nordrhein-Westfalen",     "dortmund"),
    ("remscheid",     "Remscheid",      "Nordrhein-Westfalen",     "wuppertal"),
    ("salzgitter",    "Salzgitter",     "Niedersachsen",           "braunschweig"),
    ("schwerin",      "Schwerin",       "Mecklenburg-Vorpommern",  "hamburg"),
    ("siegen",        "Siegen",         "Nordrhein-Westfalen",     "dortmund"),
    ("solingen",      "Solingen",       "Nordrhein-Westfalen",     "wuppertal"),
    ("trier",         "Trier",          "Rheinland-Pfalz",         "mannheim"),
    ("wolfsburg",     "Wolfsburg",      "Niedersachsen",           "braunschweig"),
    ("wuerzburg",     "Würzburg",       "Bayern",                  "nuernberg"),
]


def normalize(s: str) -> str:
    """Lowercase + strip diacritics for fuzzy substring matching."""
    s = s.lower()
    # ae/oe/ue collapse so "Muelheim" and "Mülheim" hit the same key
    s = s.replace("ae", "a").replace("oe", "o").replace("ue", "u")
    s = unicodedata.normalize("NFKD", s)
    s = "".join(ch for ch in s if not unicodedata.combining(ch))
    s = re.sub(r"[^a-z0-9]+", "", s)
    return s


# Fetch every active+relevant firm once — the 807-ish rows are small, and
# 32 per-firm loops is saner than 32×paginated-service_regions queries.
all_firms = []
offset = 0
while True:
    batch = (
        sb.table("companies")
        .select("id, city, service_regions")
        .eq("is_active", True)
        .eq("is_relevant", True)
        .range(offset, offset + 999)
        .execute()
        .data
    )
    if not batch:
        break
    all_firms.extend(batch)
    if len(batch) < 1000:
        break
    offset += 1000

print(f"Loaded {len(all_firms)} active+relevant firms")
print()
print(f"{'slug':18s}{'name':17s}{'home':>5s}{'declared':>10s}  verdict")
print("-" * 68)


def count_for(city_name: str, state: str) -> tuple[int, int]:
    city_key = normalize(city_name)
    state_key = normalize(state)
    home = 0
    declared = 0
    for f in all_firms:
        fc = f.get("city") or ""
        if normalize(fc) == city_key:
            home += 1
        sr = f.get("service_regions") or []
        if not isinstance(sr, list):
            continue
        matched = False
        for token in sr:
            if not token:
                continue
            tkey = normalize(str(token))
            if city_key and city_key in tkey:
                matched = True
                break
            # Bundesland match (normalize_service_regions.py also does this
            # with a 150km cap — we over-count here on purpose; the 8-declared
            # threshold is tuned against this looser match)
            if state_key and state_key in tkey:
                matched = True
                break
        if matched:
            declared += 1
    return home, declared


verdicts = {"PROMOTE": [], "DROP": [], "DEFER": []}
for slug, name, state, nearest in CITIES:
    home, declared = count_for(name, state)
    if home >= 1 and declared >= 8:
        v = "PROMOTE"
    elif declared < 5:
        v = "DROP"
    else:
        v = "DEFER"
    verdicts[v].append((slug, name, home, declared, nearest))
    print(f"{slug:18s}{name:17s}{home:>5d}{declared:>10d}  {v}")

print()
print("Summary:")
for v, rows in verdicts.items():
    print(f"  {v}: {len(rows)}")

print()
print("PROMOTE (add to Supabase + seoCities):")
for slug, name, home, declared, nearest in verdicts["PROMOTE"]:
    print(f"  {slug:18s} home={home} declared={declared}")

print()
print("DROP (remove from _extraCities, 307 redirect no longer needed):")
for slug, name, home, declared, nearest in verdicts["DROP"]:
    print(f"  {slug:18s} home={home} declared={declared} -> was redirecting to {nearest}")

print()
print("DEFER (manual review — mid-signal):")
for slug, name, home, declared, nearest in verdicts["DEFER"]:
    print(f"  {slug:18s} home={home} declared={declared} -> currently redirects to {nearest}")
