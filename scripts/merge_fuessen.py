#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Merge duplicate: 'Kran-Werkstatt Füssen GmbH' and 'IB-Kranverleih' share phone
+49 171 6101750 in Füssen. Inspect both and mark the duplicate inactive.

Usage:
  python merge_fuessen.py              # dry-run
  python merge_fuessen.py --commit     # execute
"""
import argparse
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
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


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    args = ap.parse_args()
    dry = not args.commit

    print(f"=== merge_fuessen.py — {'DRY-RUN' if dry else 'COMMIT'} ===\n")

    # Fetch both rows
    rows = sb.table("companies").select("*").or_(
        "slug.eq.ib-kranverleih,name.ilike.%kran-werkstatt%"
    ).execute().data

    for r in rows:
        print(f"  [{r['slug']}] {r['name']} | {r.get('city')} | phone={r.get('phone')} | email={r.get('email')} | active={r.get('is_active')}")
    print()

    # Identify by name pattern — keeper has 'ib' in name (IB-Kranverleih), loser has 'werkstatt'
    keeper = None
    loser = None
    for r in rows:
        name = (r.get("name") or "").lower()
        if "werkstatt" in name:
            loser = r
        elif "ib-kranverleih" in name or "kranverleih" in name or "ib" in name:
            if keeper is None:
                keeper = r

    if not keeper or not loser:
        print("ERROR: could not unambiguously identify keeper vs. loser")
        for r in rows:
            print(f"  {r}")
        sys.exit(1)

    print(f"KEEPER: {keeper['name']} (slug={keeper['slug']}) — real email {keeper.get('email')}")
    print(f"LOSER:  {loser['name']} (slug={loser['slug']}) — email {loser.get('email')}")
    print()

    # Strategy: set loser.is_active = false + loser.is_relevant = false
    # This hides it from listings without deleting. Preserves referential integrity
    # (in case any leads_form/analytics point at its id). Keeper stays as-is.
    patch = {"is_active": False, "is_relevant": False}

    arrow = "WOULD UPDATE" if dry else "UPDATE      "
    print(f"  {arrow} {loser['slug']} → {patch}")
    if not dry:
        sb.table("companies").update(patch).eq("id", loser["id"]).execute()
        print(f"  OK — loser hidden from listings, keeper unchanged")


if __name__ == "__main__":
    main()
