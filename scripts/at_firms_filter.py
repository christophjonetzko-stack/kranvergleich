#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 2 of the AT firm-sourcing pipeline (BAZA_WIEDZY §144-163).

Reads scripts/at_firms_outscraper_raw.json (Step 1 output), flattens cross-city
duplicates, drops obvious non-targets, and writes scripts/at_firms_filtered.json
with a clean candidate list + a per-firm trace of which city queries surfaced it.

NO Supabase writes. NO web fetches. Pure file-in / file-out so we can iterate the
filter rules cheaply before paying for Step 3 (WWW verification).

Filter rules:
  1. Dedupe on `place_id` (Google's stable identifier — handles same firm
     surfacing in multiple city queries; Felbermayr alone hit 6 cities)
  2. Drop CLOSED_PERMANENTLY / CLOSED_TEMPORARILY / non-OPERATIONAL
  3. Drop non-AT country_code (border cities like Salzburg / Dornbirn pull in
     DE results occasionally)
  4. Require phone OR website (no contactable signal = useless for catalog)
  5. Relevance heuristic: name OR category OR subtypes mentions a crane-domain
     term. Tunable list below — start strict, loosen if too many false negatives.
"""
import json
import sys
from pathlib import Path
from collections import Counter

sys.stdout.reconfigure(encoding="utf-8")

INPUT = Path(__file__).parent / "at_firms_outscraper_raw.json"
OUTPUT = Path(__file__).parent / "at_firms_filtered.json"

# Relevance is high-recall: we'd rather keep a borderline candidate and have
# Step 3 (WWW verification) drop it after reading their actual services page,
# than lose a real crane firm here. Step 1's $1 cost is sunk; Step 3 is automated
# Firecrawl, ~$0.01 per site. So letting more through has cheap downside.
RELEVANCE_TERMS = [
    "kran",                          # Kranverleih, Autokran, Mobilkran, Schwerlastkran, Baukran
    "hebe",                          # Hebetechnik, Hebebühne (often offered together)
    "autokran",                      # explicit
    "schwerlast",                    # Schwerlasttransport often paired with crane
    "ausrüstungsverleih",            # category Prangl Linz uses
    "ausruestungsverleih",           # ASCII fallback
    "baumaschinenvermietung",        # category Boels uses
    "verhuurbedrijf van bouwmachines",  # Dutch label some Boels branches carry
]

# Known top-tier AT crane firms — match by name even if Google's category is
# generic ("Transportunternehmen"). Memory plan project_kranvergleich_at_priority
# lists these as priority targets; categorical false-negatives must not drop them.
KNOWN_FIRM_NAMES = [
    "prangl",
    "felbermayr",
    "boels",
    "bkl",
    "maxikraft",
]

# Hard exclusions on the firm NAME — these are confounders that may match the
# generic relevance terms but aren't crane-rental businesses. Order matters:
# checked before the relevance pass.
NAME_EXCLUSIONS = [
    "grosshandel",       # wholesalers (sell, not rent) — ASCII variant
    "großhandel",        # umlaut variant
    "bauwerkzeug",       # tools wholesale
    "containerverleih",  # containers, not cranes
    "containerdienst",   # waste containers
    "klaviertransport",  # piano movers (Outscraper sometimes returns these)
    "abschlepp",         # towing services
    # Crane MANUFACTURERS — they sell systems, don't rent. Also revealed in
    # higher Outscraper queries on broader keywords (Autokran, Mobilkran).
    "wolffkran",
    "hiab austria",
    "konecranes",
    "abus krans",        # ABUS Kransysteme
    "pfeifer seil",      # PFEIFER Seil- und Hebetechnik
    "ketten hebezeuge",  # spare parts / hardware retailer (Heinz Krane Ketten)
    # Heavy-haul logistics with no crane offering specifically
    "schwerlast spedition",
    # Generic trading houses
    "handels gmbh",      # W.K.S Handels GmbH and similar pure trading
    # Hebebühne queries surfaced lots of car-lift / Mietwerkstatt entries —
    # they have a Hebebühne for cars, not crane rental for construction.
    "kfz hobbywerkstatt",
    "mietwerkstatt",
    "kfz farago",
    "kfz erich",
    "westend graz",
    "tafrent station",
]


def is_relevant(item: dict) -> bool:
    name = (item.get("name") or "").lower()

    # Hard name exclusions before any other check.
    if any(excl in name for excl in NAME_EXCLUSIONS):
        return False

    # Felbermayr is a sprawling group with separate arms — only the
    # Transport/Hebetechnik (crane) and explicit Kran arms qualify.
    # "Felbermayr Bau GmbH" (construction) and similar do NOT.
    if "felbermayr" in name:
        if any(crane_term in name for crane_term in ("transport", "hebetechnik", "hebe", "kran")):
            return True
        return False  # other Felbermayr arms (Bau, Container) drop

    # Other known firms: name match suffices.
    if any(known in name for known in KNOWN_FIRM_NAMES):
        return True

    # General relevance via name + category + subtypes + type.
    blob_parts = [
        name,
        (item.get("category") or "").lower(),
        (item.get("subtypes") or "").lower(),
        (item.get("type") or "").lower(),
    ]
    blob = " ".join(blob_parts)
    return any(term in blob for term in RELEVANCE_TERMS)


def main() -> int:
    if not INPUT.exists():
        print(f"ERROR: {INPUT} not found — run at_firms_outscraper_search.py first", file=sys.stderr)
        return 2

    payload = json.loads(INPUT.read_text(encoding="utf-8"))
    queries = payload.get("queries", [])

    # Map place_id -> canonical record + list of (city_query) it appeared in
    by_place: dict[str, dict] = {}
    drop_reasons: Counter = Counter()

    for q in queries:
        city = q.get("city")
        for item in q.get("results", []):
            place_id = item.get("place_id") or item.get("google_id")
            if not place_id:
                drop_reasons["no_place_id"] += 1
                continue

            if place_id in by_place:
                # Cross-city duplicate — record which query also surfaced it.
                by_place[place_id]["seen_in_queries"].append(city)
                continue

            # New place — apply filters.
            status = (item.get("business_status") or "").upper()
            if status and status != "OPERATIONAL":
                drop_reasons[f"status_{status}"] += 1
                continue

            country_code = (item.get("country_code") or "").upper()
            if country_code and country_code != "AT":
                drop_reasons[f"country_{country_code}"] += 1
                continue

            phone = item.get("phone")
            website = item.get("website")
            if not phone and not website:
                drop_reasons["no_contact"] += 1
                continue

            if not is_relevant(item):
                drop_reasons["not_relevant"] += 1
                continue

            by_place[place_id] = {
                "place_id": place_id,
                "name": item.get("name"),
                "category": item.get("category"),
                "subtypes": item.get("subtypes"),
                "address": item.get("address"),
                "street": item.get("street"),
                "postal_code": item.get("postal_code"),
                "city": item.get("city"),
                "country_code": country_code,
                "latitude": item.get("latitude"),
                "longitude": item.get("longitude"),
                "phone": phone,
                "website": website,
                "rating": item.get("rating"),
                "reviews": item.get("reviews"),
                "verified": item.get("verified"),
                "google_maps_url": item.get("location_link"),
                "seen_in_queries": [city],
            }

    candidates = sorted(
        by_place.values(),
        key=lambda r: (
            -(r.get("rating") or 0),
            -(r.get("reviews") or 0),
        ),
    )

    out = {
        "source_total": payload.get("total_results", 0),
        "after_dedupe": len(by_place) + sum(drop_reasons.values()),
        "after_filter": len(candidates),
        "drop_reasons": dict(drop_reasons),
        "candidates": candidates,
    }
    OUTPUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")

    # Console report
    print("=" * 60)
    print("AT firms — filter + dedupe report")
    print("=" * 60)
    print(f"  Raw results in:        {payload.get('total_results', 0)}")
    print(f"  After dedupe by place_id: {len(by_place) + sum(drop_reasons.values())}")
    print(f"  After filter:          {len(candidates)} candidates")
    print()
    if drop_reasons:
        print("  Drop reasons:")
        for reason, count in drop_reasons.most_common():
            print(f"    {reason:<24} {count}")
        print()
    print(f"  Saved: {OUTPUT}")
    print()
    print("  Top candidates by rating × reviews:")
    for i, c in enumerate(candidates[:15], 1):
        rating = c.get("rating") or 0
        reviews = c.get("reviews") or 0
        cities = "+".join(set(c.get("seen_in_queries") or []))
        print(f"    {i:>2}. {c.get('name'):<55} rating={rating} reviews={reviews:.0f} ({cities})")

    return 0


if __name__ == "__main__":
    sys.exit(main())
