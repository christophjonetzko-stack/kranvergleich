#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 4 of the AT firm-sourcing pipeline (BAZA_WIEDZY §144-163).

Reads scripts/at_firms_filtered.json (Step 2 output), picks the top firms by
review volume, generates company INSERTs + company_regions mappings, and (with
--commit) writes them to Supabase. Without --commit, dry-runs and saves the
proposal to scripts/at_firms_import_proposal.json for review.

Pragmatic Phase-A enrichment: uses the data we already have from Outscraper
(name, address, phone, website, lat/lng, rating, reviews). Email + crane_types
+ Impressum verification stay NULL — refined in a Phase-B run that crawls each
firm's site, after Phase-A has the rows in place to update.

Slug strategy:
  - Multi-branch firms (Felbermayr × 7, Prangl × 3, Boels × 2): "{co}-{city}"
    with ASCII transliteration (felbermayr-wien, prangl-sankt-poelten, ...)
  - Single-branch firms: clean ASCII slug from name

Usage:
  python at_firms_import.py                # dry-run, write proposal JSON
  python at_firms_import.py --top 20       # top N by reviews (default 20)
  python at_firms_import.py --commit       # actually INSERT to Supabase
"""
import argparse
import json
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

INPUT = Path(__file__).parent / "at_firms_filtered.json"
OUTPUT = Path(__file__).parent / "at_firms_import_proposal.json"

# Multi-branch parents — name prefix → slug stem. When a firm matches one of
# these, its slug becomes "{stem}-{city_slug}" instead of a clean name slug,
# disambiguating siblings across cities.
MULTI_BRANCH_PARENTS = {
    "felbermayr": "felbermayr",
    "prangl": "prangl",
    "boels": "boels",
}

# Map Outscraper-reported city (or seen-in-query city) to the AT city slug
# in Supabase. Includes Wien-Umland (Lanzendorf, Achau, Fischamend, Brunn,
# Bruck an der Leitha, Großenzersdorf) → wien, Salzburg-Umland → salzburg,
# Linz-Umland (St. Florian) → linz. For cities outside the seoCitiesAT 10 we
# use the nearest one as primary region.
CITY_NORMALIZE = {
    # Wien metropolitan
    "wien": "wien",
    "lanzendorf": "wien",
    "achau": "wien",
    "fischamend": "wien",
    "brunn am gebirge": "wien",
    "bruck an der leitha": "wien",
    "gemeinde bruck an der leitha": "wien",
    "groß-enzersdorf": "wien",
    "grossenzersdorf": "wien",
    "baden": "wien",
    "wiener neudorf": "wien",
    "schwechat": "wien",
    "klosterneuburg": "wien",
    "moedling": "wien",
    "mödling": "wien",
    # Linz / OÖ
    "linz": "linz",
    "st. florian": "linz",
    "wels": "wels",
    # Salzburg
    "salzburg": "salzburg",
    "bergheim bei salzburg": "salzburg",
    # Tirol
    "innsbruck": "innsbruck",
    "thaur": "innsbruck",
    # Steiermark
    "graz": "graz",
    # Kärnten
    "klagenfurt": "klagenfurt",
    "klagenfurt am wörthersee": "klagenfurt",
    "villach": "villach",
    # Niederösterreich
    "st. pölten": "sankt-poelten",
    "sankt pölten": "sankt-poelten",
    # Vorarlberg
    "dornbirn": "dornbirn",
    "lustenau": "dornbirn",
}


def slugify(s: str) -> str:
    """ASCII transliteration → kebab-case. ß → ss, ä → ae, etc."""
    s = s.lower()
    s = (
        s.replace("ä", "ae")
         .replace("ö", "oe")
         .replace("ü", "ue")
         .replace("ß", "ss")
    )
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode("ascii")
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def clean_firm_name(raw: str) -> str:
    """Outscraper name often has '| services | services...' tail. Strip it."""
    return raw.split("|")[0].strip()


def detect_multi_branch_parent(name_lower: str) -> str | None:
    for keyword, stem in MULTI_BRANCH_PARENTS.items():
        if keyword in name_lower:
            return stem
    return None


def normalize_city(raw_city: str | None) -> str | None:
    if not raw_city:
        return None
    return CITY_NORMALIZE.get(raw_city.strip().lower())


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--top", type=int, default=20, help="how many firms to import")
    parser.add_argument("--commit", action="store_true", help="actually INSERT to Supabase (default: dry-run)")
    args = parser.parse_args()

    if not INPUT.exists():
        print(f"ERROR: {INPUT} not found — run at_firms_filter.py first", file=sys.stderr)
        return 2

    payload = json.loads(INPUT.read_text(encoding="utf-8"))
    candidates = payload.get("candidates", [])

    # Sort by reviews descending (proxy for "established firm")
    sorted_candidates = sorted(candidates, key=lambda c: -(c.get("reviews") or 0))[: args.top]

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )

    # Build slug -> id map for AT cities so we can produce company_regions rows.
    at_cities = sb.table("cities").select("id, slug, name").eq("country", "AT").execute().data or []
    city_slug_to_id = {c["slug"]: c["id"] for c in at_cities}
    print(f"Loaded {len(at_cities)} AT cities from Supabase: {sorted(city_slug_to_id.keys())}")
    print()

    proposals = []
    for firm in sorted_candidates:
        raw_name = firm.get("name") or ""
        name = clean_firm_name(raw_name)
        name_lower = name.lower()

        # Slug: multi-branch parents append the address-city slug
        parent = detect_multi_branch_parent(name_lower)
        firm_city_slug = normalize_city(firm.get("city"))
        if parent:
            slug = f"{parent}-{firm_city_slug}" if firm_city_slug else slugify(name)
        else:
            slug = slugify(name)

        # company_regions: union of normalized seen_in_queries + the firm's own
        # address city (some firms get found in only one query but actually serve
        # their home city, which may be different).
        region_slugs = set()
        for q_city in firm.get("seen_in_queries") or []:
            normalized = normalize_city(q_city)
            if normalized:
                region_slugs.add(normalized)
        if firm_city_slug:
            region_slugs.add(firm_city_slug)

        region_city_ids = [city_slug_to_id[s] for s in region_slugs if s in city_slug_to_id]

        proposals.append({
            "company_row": {
                "name": name,
                "slug": slug,
                "country": "AT",
                "phone": firm.get("phone"),
                "email": None,  # Phase B will backfill
                "website": firm.get("website"),
                "address": firm.get("address"),
                "city": firm.get("city"),
                "state": firm.get("state") or "",  # Outscraper sometimes omits; can backfill
                "zip": firm.get("postal_code"),
                "lat": firm.get("latitude"),
                "lng": firm.get("longitude"),
                "google_rating": firm.get("rating"),
                "google_reviews_count": int(firm.get("reviews") or 0),
                "google_place_id": firm.get("place_id"),
                "is_active": True,
                "is_verified": False,
            },
            "company_regions": [
                {"city_slug": s, "city_id": city_slug_to_id[s]}
                for s in sorted(region_slugs)
                if s in city_slug_to_id
            ],
            "_outscraper_meta": {
                "raw_name": raw_name,
                "reviews": firm.get("reviews"),
                "google_maps_url": firm.get("google_maps_url"),
                "seen_in_queries": firm.get("seen_in_queries"),
            },
        })

    # Sanity: collision check on slugs
    slug_counts: dict[str, int] = {}
    for p in proposals:
        s = p["company_row"]["slug"]
        slug_counts[s] = slug_counts.get(s, 0) + 1
    collisions = {s: n for s, n in slug_counts.items() if n > 1}

    OUTPUT.write_text(json.dumps({"proposals": proposals, "slug_collisions": collisions}, ensure_ascii=False, indent=2), encoding="utf-8")

    print("=" * 60)
    print(f"Top {args.top} firms — import proposal")
    print("=" * 60)
    for i, p in enumerate(proposals, 1):
        row = p["company_row"]
        regions = ", ".join(r["city_slug"] for r in p["company_regions"]) or "(none)"
        print(f"  {i:>2}. {row['slug']:<32} ({row['name'][:35]:<35}) regions=[{regions}]")
    print()
    if collisions:
        print(f"  ⚠ Slug collisions: {collisions}")
    else:
        print(f"  ✓ No slug collisions")
    print()
    print(f"  Saved proposal: {OUTPUT}")
    print()

    if not args.commit:
        print("  Dry run — no Supabase writes. Re-run with --commit to execute.")
        return 0

    # --commit: idempotent INSERT (skip slugs that already exist)
    print("  COMMITTING to Supabase...")
    print()
    inserted = 0
    skipped = 0
    region_inserted = 0

    for p in proposals:
        row = p["company_row"]
        slug = row["slug"]

        # Idempotent: check existing
        existing = sb.table("companies").select("id").eq("slug", slug).execute().data or []
        if existing:
            company_id = existing[0]["id"]
            skipped += 1
            print(f"  ↻ skipped existing: {slug}")
        else:
            res = sb.table("companies").insert(row).execute()
            company_id = res.data[0]["id"]
            inserted += 1
            print(f"  ✓ inserted: {slug} (id={company_id[:8]}...)")

        # company_regions: idempotent via on_conflict
        region_rows = [
            {"company_id": company_id, "city_id": r["city_id"]}
            for r in p["company_regions"]
        ]
        if region_rows:
            sb.table("company_regions").upsert(region_rows, on_conflict="company_id,city_id", ignore_duplicates=True).execute()
            region_inserted += len(region_rows)

    print()
    print("=" * 60)
    print(f"  Result: {inserted} new firms, {skipped} skipped (already existed)")
    print(f"  company_regions upserts: {region_inserted}")
    print("=" * 60)
    return 0


if __name__ == "__main__":
    sys.exit(main())
