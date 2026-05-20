#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 3 — Supabase import for Dachdeckerkran DE candidates.

Reads dachdeckerkran_de_filtered.json (Step 2 output), generates INSERT
rows for companies + company_regions, and (with --commit) writes them to
Supabase. Without --commit, dry-runs and saves the proposal JSON.

Slug rules:
  - Multi-branch firms (Felbermayr, Prangl, Boels, BKL) → "{stem}-{city_slug}"
  - Single-branch → clean ASCII slug
  - Idempotent: skip when slug already exists

City normalization:
  - Loads all DE cities from Supabase (cities WHERE country='DE')
  - Builds slug→id map
  - For each candidate, tries: exact lowercase match, umlaut-tolerant match,
    diacritic-stripped match. Else skip company_regions (firm still inserts).

Usage:
  python dachdeckerkran_de_import.py              # dry-run all 73
  python dachdeckerkran_de_import.py --top 20     # subset by reviews
  python dachdeckerkran_de_import.py --commit     # INSERT to Supabase
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

INPUT = Path(__file__).parent / "dachdeckerkran_de_filtered.json"
OUTPUT = Path(__file__).parent / "dachdeckerkran_de_import_proposal.json"

# Multi-branch firms — keyword prefix → slug stem. When a firm matches one,
# its slug becomes "{stem}-{city_slug}".
MULTI_BRANCH_PARENTS = {
    "felbermayr": "felbermayr",
    "prangl": "prangl",
    "boels": "boels",
    "bkl": "bkl",
    "maxikraft": "maxikraft",
    "würzburger kranverleih": "wuerzburger-kranverleih",  # Würzburg + Dettelbach branches
    "wuerzburger kranverleih": "wuerzburger-kranverleih",
    "ulferts": "ulferts-wittrock",                         # Kiel + Schwerin + Lübeck branches
}


def slugify(s: str) -> str:
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
    return raw.split("|")[0].strip()


def detect_multi_branch_parent(name_lower: str) -> str | None:
    for keyword, stem in MULTI_BRANCH_PARENTS.items():
        if keyword in name_lower:
            return stem
    return None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--top", type=int, default=0, help="how many firms to import; 0 = all")
    parser.add_argument("--commit", action="store_true", help="actually INSERT to Supabase")
    args = parser.parse_args()

    if not INPUT.exists():
        print(f"ERROR: {INPUT} not found — run dachdeckerkran_de_filter.py first", file=sys.stderr)
        return 2

    payload = json.loads(INPUT.read_text(encoding="utf-8"))
    candidates = payload.get("candidates", [])
    if args.top > 0:
        candidates = sorted(candidates, key=lambda c: -(c.get("reviews") or 0))[: args.top]
    print(f"Importing {len(candidates)} candidates")

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )

    # Load all DE cities — build {normalized_name: city_id} lookup with multiple
    # fallback forms so umlauts / diacritics aren't lossy.
    de_cities_data: list = []
    PAGE = 1000
    for offset in range(0, 5000, PAGE):
        r = sb.table("cities").select("id, slug, name").eq("country", "DE").range(offset, offset + PAGE - 1).execute()
        if not r.data:
            break
        de_cities_data.extend(r.data)
        if len(r.data) < PAGE:
            break
    print(f"Loaded {len(de_cities_data)} DE cities from Supabase")

    def canonical(name: str) -> str:
        """name → lowercase ASCII-folded — stable across Umlaut variants."""
        return slugify(name).replace("-", "")

    city_by_canonical: dict[str, dict] = {}
    for c in de_cities_data:
        city_by_canonical[canonical(c["name"])] = c
        city_by_canonical[canonical(c["slug"])] = c

    def resolve_city(raw_city: str | None) -> dict | None:
        if not raw_city:
            return None
        key = canonical(raw_city)
        if key in city_by_canonical:
            return city_by_canonical[key]
        # Strip "am Rhein", "(Saale)", etc.
        first = raw_city.split("(")[0].split(",")[0].strip()
        if first and first != raw_city:
            k2 = canonical(first)
            if k2 in city_by_canonical:
                return city_by_canonical[k2]
        return None

    proposals = []
    for firm in candidates:
        raw_name = firm.get("name") or ""
        name = clean_firm_name(raw_name)
        name_lower = name.lower()

        firm_city = firm.get("city")
        firm_city_match = resolve_city(firm_city)
        firm_city_slug = firm_city_match["slug"] if firm_city_match else None

        parent = detect_multi_branch_parent(name_lower)
        if parent:
            slug = f"{parent}-{firm_city_slug}" if firm_city_slug else slugify(name)
        else:
            slug = slugify(name)

        # Region cities: union of seen_in_queries + the firm's own city.
        region_city_ids: list[str] = []
        seen_slugs: set[str] = set()
        if firm_city_match:
            region_city_ids.append(firm_city_match["id"])
            seen_slugs.add(firm_city_match["slug"])
        for q_city in firm.get("seen_in_queries") or []:
            m = resolve_city(q_city)
            if m and m["slug"] not in seen_slugs:
                region_city_ids.append(m["id"])
                seen_slugs.add(m["slug"])

        proposals.append({
            "company_row": {
                "name": name,
                "slug": slug,
                "country": "DE",
                "phone": firm.get("phone"),
                "email": None,
                "website": firm.get("website"),
                "address": firm.get("address"),
                "city": firm_city,
                "state": firm.get("state") or "",
                "zip": firm.get("postal_code"),
                "lat": firm.get("latitude"),
                "lng": firm.get("longitude"),
                "google_rating": firm.get("rating"),
                "google_reviews_count": int(firm.get("reviews") or 0),
                "google_place_id": firm.get("place_id"),
                "is_active": True,
                "is_verified": False,
            },
            "company_regions": [{"city_id": cid, "city_slug": s} for cid, s in zip(region_city_ids, sorted(seen_slugs))],
            "_outscraper_meta": {
                "raw_name": raw_name,
                "reviews": firm.get("reviews"),
                "google_maps_url": firm.get("google_maps_url"),
                "seen_in_queries": firm.get("seen_in_queries"),
            },
        })

    slug_counts: dict[str, int] = {}
    for p in proposals:
        s = p["company_row"]["slug"]
        slug_counts[s] = slug_counts.get(s, 0) + 1
    collisions = {s: n for s, n in slug_counts.items() if n > 1}

    OUTPUT.write_text(json.dumps({"proposals": proposals, "slug_collisions": collisions}, ensure_ascii=False, indent=2), encoding="utf-8")

    print("=" * 70)
    print(f"Import proposal — {len(proposals)} candidates")
    print("=" * 70)
    no_region_count = 0
    for i, p in enumerate(proposals, 1):
        row = p["company_row"]
        regions = ", ".join(r["city_slug"] for r in p["company_regions"]) or "(no city match)"
        if not p["company_regions"]:
            no_region_count += 1
        print(f"  {i:>2}. {row['slug'][:34]:<34}  {(row['city'] or '?')[:18]:<18}  regions=[{regions[:40]}]")
    print()
    print(f"  No-region matches: {no_region_count} (firm still inserts, just without company_regions)")
    if collisions:
        print(f"  ⚠ Slug collisions: {collisions}")
    else:
        print(f"  ✓ No slug collisions")
    print()
    print(f"  Saved proposal: {OUTPUT}")

    if not args.commit:
        print()
        print("  Dry run — no Supabase writes. Re-run with --commit to execute.")
        return 0

    print()
    print("  COMMITTING to Supabase...")
    inserted = 0
    skipped = 0
    region_inserted = 0

    for p in proposals:
        row = p["company_row"]
        slug = row["slug"]

        existing = sb.table("companies").select("id").eq("slug", slug).execute().data or []
        if existing:
            company_id = existing[0]["id"]
            skipped += 1
            print(f"  ↻ skipped existing: {slug}")
        else:
            res = sb.table("companies").insert(row).execute()
            company_id = res.data[0]["id"]
            inserted += 1
            print(f"  ✓ inserted: {slug}")

        region_rows = [
            {"company_id": company_id, "city_id": r["city_id"]}
            for r in p["company_regions"]
        ]
        if region_rows:
            sb.table("company_regions").upsert(region_rows, on_conflict="company_id,city_id", ignore_duplicates=True).execute()
            region_inserted += len(region_rows)

    print()
    print("=" * 70)
    print(f"  Inserted: {inserted}  |  Skipped: {skipped}  |  Regions upserts: {region_inserted}")
    print("=" * 70)
    return 0


if __name__ == "__main__":
    sys.exit(main())
