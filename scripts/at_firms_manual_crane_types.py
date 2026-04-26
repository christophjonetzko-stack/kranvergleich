#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Manual crane_types fix for the 11 AT firms Phase B couldn't classify.

Phase B's website-keyword detection misses firms with JS-heavy sites, robots
disallow, or thin homepages. This script applies industry-knowledge overrides
based on the firm's name pattern + Outscraper category, idempotently.

Mapping rules (slug prefix → crane_types):
  - "*-ladetechnik" / "*-ladekran"           → ladekran-mieten
  - "*-autokran"                              → autokran-mieten
  - "*-spedition*" / "transporte-*" / "trost" → ladekran-mieten (truck-mounted
                                                 crane is what transport firms
                                                 typically offer)
  - "kran*-gmbh" (generic Kran-named)        → autokran + mobilkran (mainstream)
  - "*-baumaschinen-*"                        → minikran + baukran
  - "*-kranservice*"                          → autokran + mobilkran (full-service)
  - "*-transport-*"                           → ladekran (single-truck operator)

Usage:
  python scripts/at_firms_manual_crane_types.py             # dry-run
  python scripts/at_firms_manual_crane_types.py --commit    # actually upsert
"""
import argparse
import os
import sys
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

# Slug prefix → crane_types_slugs. Order matters (most specific first).
MANUAL_TYPES: list[tuple[str, list[str]]] = [
    # Ladekran-focused (truck-mounted crane, typical "Ladetechnik" / Transport firms)
    ("kuhn-ladetechnik",        ["ladekran-mieten"]),
    ("xl-spedition",            ["ladekran-mieten", "autokran-mieten"]),
    ("spiegl-transport",        ["ladekran-mieten", "autokran-mieten"]),
    ("transporte-schneider",    ["ladekran-mieten"]),
    ("efem-transport",          ["ladekran-mieten"]),
    ("wieshofer-transporte",    ["ladekran-mieten"]),
    ("trost-gmbh",              ["ladekran-mieten"]),
    # Autokran in name = explicit
    ("scheffknecht-autokran",   ["autokran-mieten"]),
    # Generic "Kran" + Kranservice — mainstream auto/mobil
    ("timi-kran",               ["autokran-mieten", "mobilkran-mieten"]),
    ("kranwien-gmbh",           ["autokran-mieten", "mobilkran-mieten"]),
    ("b-t-kranservice",         ["autokran-mieten", "mobilkran-mieten"]),
    # Baumaschinen — small/medium catalog
    ("bmk-baumaschinen",        ["minikran-mieten", "baukran-mieten"]),
    # Heavy-haul + Kran in name (Sondertransporte)
    ("thaller-kran",            ["autokran-mieten", "mobilkran-mieten", "ladekran-mieten"]),
    # Single-Transport firm
    ("riegler-transporte",      ["ladekran-mieten"]),
]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--commit", action="store_true", help="actually upsert to Supabase")
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )

    type_rows = sb.table("crane_types").select("id, slug").execute().data or []
    type_slug_to_id = {r["slug"]: r["id"] for r in type_rows}

    proposed_rows: list[dict] = []
    for slug_prefix, type_slugs in MANUAL_TYPES:
        firms = (sb.table("companies")
                    .select("id, slug, name")
                    .eq("country", "AT")
                    .like("slug", f"{slug_prefix}%")
                    .execute()).data or []
        for firm in firms:
            for ts in type_slugs:
                tid = type_slug_to_id.get(ts)
                if not tid:
                    print(f"  ✗ unknown crane_type slug: {ts}")
                    continue
                proposed_rows.append({
                    "_firm_slug": firm["slug"],
                    "_firm_name": firm["name"],
                    "_type_slug": ts,
                    "company_id": firm["id"],
                    "crane_type_id": tid,
                })

    print("=" * 60)
    print(f"Manual crane_types proposals — {len(proposed_rows)} (firm × type) rows")
    print("=" * 60)
    last_firm = None
    for row in proposed_rows:
        if row["_firm_slug"] != last_firm:
            last_firm = row["_firm_slug"]
            print(f"\n  {row['_firm_slug']:<35} ({row['_firm_name'][:40]})")
        print(f"    + {row['_type_slug']}")

    if not args.commit:
        print()
        print("  Dry run — no Supabase writes. Re-run with --commit to apply.")
        return 0

    print()
    print("  COMMITTING...")
    insert_rows = [{"company_id": r["company_id"], "crane_type_id": r["crane_type_id"]} for r in proposed_rows]
    if insert_rows:
        sb.table("company_cranes").upsert(insert_rows, on_conflict="company_id,crane_type_id", ignore_duplicates=True).execute()
    print(f"  ✓ {len(insert_rows)} (firm × type) rows upserted (idempotent)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
