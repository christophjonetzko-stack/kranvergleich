#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 2 — filter + dedupe Dachdeckerkran DE Outscraper raw results.

Reads dachdeckerkran_de_outscraper_raw.json, deduplicates by place_id
(both within new results AND against existing companies.google_place_id
in Supabase), drops obvious confounders, writes filtered candidates.

Pure file-in/Supabase-read/file-out. No paid API. No DB writes.

Filter rules (in order):
  1. Dedupe on place_id (within the new sweep)
  2. Skip place_ids already in companies.google_place_id (existing catalog)
  3. Drop non-OPERATIONAL
  4. Drop non-DE country_code
  5. Require phone OR website
  6. NAME_EXCLUSIONS (manufacturers, confounders, Hebebühne/Möbellift
     false positives, brewery named "Alter Kranen" 😅)
  7. Relevance heuristic: name OR category OR subtypes mentions a
     crane/lift-rental-domain term
"""
import json
import os
import sys
from collections import Counter
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

INPUT = Path(__file__).parent / "dachdeckerkran_de_outscraper_raw.json"
OUTPUT = Path(__file__).parent / "dachdeckerkran_de_filtered.json"

# Relevance: high-recall. Step 4 (Claude API website scan) drops the
# remaining roofer-not-rental false positives at ~$0.13/firm, cheaper than
# losing a real Kranverleih here.
RELEVANCE_TERMS = [
    "kran",                          # Kranverleih, Autokran, Mobilkran, Baukran
    "verleih",                       # generic rental tag
    "vermietung",                    # generic rental tag
    "hebe",                          # Hebetechnik, Hebebühne
    "aufzug",                        # Dachdeckeraufzug (small crane), Aufzüge (elevators)
    "fördertechnik",                 # often paired with Aufzug
    "foerdertechnik",                # ASCII fallback
    "schwerlast",                    # Schwerlasttransport often paired with crane
    "baumaschinenvermietung",        # broad rental category
    "arbeitsbühnen",                 # Hubarbeitsbühne often co-offered
    "arbeitsbuehnen",                # ASCII fallback
]

# Top-tier DE firms that may match generic categories.
KNOWN_FIRM_NAMES = [
    "boels",
    "bkl",
    "felbermayr",
    "prangl",
    "maxikraft",
    "böcker",   # Böcker is a major Dachdeckeraufzug brand + rental network
    "boecker",  # ASCII fallback
]

# Hard exclusions on the firm NAME. Checked BEFORE relevance.
NAME_EXCLUSIONS = [
    # Wholesalers / retailers
    "grosshandel", "großhandel",
    "bauwerkzeug",
    "containerverleih", "containerdienst",
    "klaviertransport",
    "abschlepp",
    # Crane MANUFACTURERS
    "wolffkran",
    "hiab",
    "konecranes",
    "kone gmbh",   # KONE elevators — surfaced in Kiel Aufzug query
    "kone academy",  # KONE training facility, not rental
    "kone ",  # bare KONE entries (Kiel) — trailing space avoids "konecranes" overlap
    "abus krans",
    "pfeifer seil",
    "ketten hebezeuge",
    # Möbellift / relocation (surfaced via "Aufzug" / "Lift" keywords)
    "möbellift", "moebellift",
    "möbeltransport", "moebeltransport",
    "möbel transport", "moebel transport",
    "umzug", "umzugsservice",
    # Restaurants / unrelated (the Würzburg query returned a brewery!)
    "brauerei",
    "gasthof",
    "restaurant",
    "hotel",
    # Hebebühne car lifts (Mietwerkstatt-style)
    "kfz hobbywerkstatt",
    "mietwerkstatt",
    # Construction firms that use cranes but don't rent (pure handwerk)
    "dachdeckerei und zimmerei",  # explicit roofer / carpenter combo
    "dach und holzbau",            # MAY Dach & Holzbau pattern
    "dach & holzbau",
    "dach & wand",                 # Baumann Dach und Wand
    "dachdeckermeister",           # craftsman, not rental (Michelau Lübeck)
    "photovoltaik",                # solar firm
    "metall- und elementbau",
    "blechnerei",
    "spenglerei",
    "klempnerei",
    "fassadenbau",
    "trockenbau",
    "stahlbau",
    "bauunternehmen",              # general contractor
    "bauunternehmung",
    "bauwerk",
    "bauwirtschaft",
    # Additional Dachdecker-related pure handwerk (not rental)
    "bedachung",                   # *-Bedachungen GmbH = roof material / roofer
    "bedachungen",
    "dachbau",                     # *-Dachbau = roof construction handwerk
    "dachbaustoffe",               # supplier, not rental
    "dachtechnik",                 # often pure roof technician (PB Dachtechnik)
    "dachdeckerei",                # bare Dachdeckerei = roofer, not rental
    "zimmerei",                    # carpentry handwerk
    "alles für das dach",          # DEG roof-supplies pattern
    "alles fuer das dach",
    # Pure Aufzug (elevator) firms — not Dachdeckeraufzug
    "aufzugbau ",                  # Aufzugbau Dresden, etc. — elevator constructor
    "aufzugsdienst",               # elevator service firm
    "aufzüge gmbh",                # Lechner Aufzüge GmbH
    "aufzuege gmbh",
    # Boats / unrelated (Berlin Marina-Lanke, Fangrot Bootsvermietung)
    "bootsvermietung",
    "boots vermietung",
    "marina-lanke",
    "marina lanke",
    # Pure crane accessories / spare parts
    "kranzubehör",
    "kranzubehoer",
]


def is_relevant(item: dict) -> bool:
    name = (item.get("name") or "").lower()

    if any(excl in name for excl in NAME_EXCLUSIONS):
        return False

    # Felbermayr disambiguation (some DE branches exist).
    if "felbermayr" in name:
        if any(t in name for t in ("transport", "hebetechnik", "hebe", "kran")):
            return True
        return False

    if any(known in name for known in KNOWN_FIRM_NAMES):
        return True

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
        print(f"ERROR: {INPUT} not found", file=sys.stderr)
        return 2

    payload = json.loads(INPUT.read_text(encoding="utf-8"))
    queries = payload.get("queries", [])

    # Pull existing place_ids from catalog to skip dupes.
    print("Loading existing catalog place_ids from Supabase...")
    from supabase import create_client
    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )
    existing_place_ids: set[str] = set()
    PAGE = 1000
    for offset in range(0, 5000, PAGE):
        r = sb.table("companies").select("google_place_id").not_.is_("google_place_id", "null").range(offset, offset + PAGE - 1).execute()
        if not r.data:
            break
        for row in r.data:
            pid = row.get("google_place_id")
            if pid:
                existing_place_ids.add(pid)
        if len(r.data) < PAGE:
            break
    print(f"  Existing catalog has {len(existing_place_ids)} place_ids")

    by_place: dict[str, dict] = {}
    drop_reasons: Counter = Counter()

    for q in queries:
        city = q.get("city")
        for item in q.get("results", []):
            place_id = item.get("place_id") or item.get("google_id")
            if not place_id:
                drop_reasons["no_place_id"] += 1
                continue

            if place_id in existing_place_ids:
                drop_reasons["already_in_catalog"] += 1
                continue

            if place_id in by_place:
                by_place[place_id]["seen_in_queries"].append(city)
                continue

            status = (item.get("business_status") or "").upper()
            if status and status != "OPERATIONAL":
                drop_reasons[f"status_{status}"] += 1
                continue

            country_code = (item.get("country_code") or "").upper()
            if country_code and country_code != "DE":
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
                "type": item.get("type"),
                "address": item.get("address") or item.get("full_address"),
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
        "existing_catalog_place_ids": len(existing_place_ids),
        "after_filter": len(candidates),
        "drop_reasons": dict(drop_reasons),
        "candidates": candidates,
    }
    OUTPUT.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")

    print("=" * 70)
    print("Dachdeckerkran DE — filter + dedupe report")
    print("=" * 70)
    print(f"  Raw results in:           {payload.get('total_results', 0)}")
    print(f"  Existing catalog dedupes: {drop_reasons.get('already_in_catalog', 0)}")
    print(f"  Final candidates:         {len(candidates)}")
    print()
    if drop_reasons:
        print("  Drop reasons:")
        for reason, count in drop_reasons.most_common():
            print(f"    {reason:<28} {count}")
        print()
    print(f"  Saved: {OUTPUT}")
    print()
    print("Top 15 candidates by Google rating (preview):")
    for i, c in enumerate(candidates[:15], 1):
        loc = f"{c.get('postal_code') or ''} {c.get('city') or ''}".strip()
        rating_str = f"★{c['rating']:.1f}/{c['reviews']}" if c.get('rating') else "no-rating"
        print(f"  {i:>2}. {c['name'][:42]:<42}  {loc[:24]:<24}  {rating_str}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
