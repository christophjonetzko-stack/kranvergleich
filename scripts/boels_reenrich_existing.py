#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Re-enrich 5 existing Boels rows that had email='???' before the bulk import.
These cities were NOT in seoCities filter, so they weren't re-imported.

For each row: scrape the known Boels branch URL, extract depot email + phone +
hours + lat/lng, and UPDATE the existing row in-place (preserving its slug).

Usage:
  python boels_reenrich_existing.py             # dry-run
  python boels_reenrich_existing.py --commit
"""
import argparse
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

HERE = os.path.dirname(__file__)
ENV_FILE = os.path.join(HERE, "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())

sys.path.insert(0, HERE)
from boels_scrape import http_get, parse_branch  # noqa: E402
from supabase import create_client  # noqa: E402

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

STANDARD_HOURS = "Mo-Fr 7:00-16:30 | Sa 8:00-12:30 | So geschlossen"

# Map existing DB slug → Boels branch URL to scrape
TARGETS = [
    {
        "slug": "boels-verleih-gmbh",        # Magdeburg
        "url": "https://www.boels.com/de-de/branches/sachsen-anhalt/magdeburg",
    },
    {
        "slug": "boels-verleih-2",           # Göttingen
        "url": "https://www.boels.com/de-de/branches/niedersachsen/goettingen",
    },
    {
        "slug": "boels-rental-germany-gmbh-wolfsburg",
        "url": "https://www.boels.com/de-de/branches/niedersachsen/wolfsburg",
    },
    {
        "slug": "boels-rental-neubrandenburg",
        "url": "https://www.boels.com/de-de/branches/mecklenburg-vorpommern/neubrandenburg",
    },
    {
        "slug": "boels-rental-germany-gmbh",  # Oranienburg
        "url": "https://www.boels.com/de-de/branches/brandenburg/oranienburg",
    },
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    args = ap.parse_args()
    dry = not args.commit
    print(f"=== boels_reenrich_existing — {'DRY-RUN' if dry else 'COMMIT'} ===\n")

    for t in TARGETS:
        slug = t["slug"]
        url = t["url"]

        # Verify row exists
        row = sb.table("companies").select("id,slug,name,city,email,phone,zip").eq("slug", slug).execute().data
        if not row:
            print(f"  MISS  slug={slug} not found")
            continue
        r = row[0]

        # Scrape Boels branch
        try:
            html = http_get(url)
            data = parse_branch(html)
        except Exception as e:
            print(f"  ERR   {slug}: scrape failed — {e}")
            continue

        email = (data.get("email") or "").lower()
        if not email.startswith("depot."):
            print(f"  WARN  {slug}: no depot email parsed from {url} → {email!r}")
            continue

        raw_hours = data.get("opening_hours")
        opening_hours = raw_hours if raw_hours and "Mo-So geschlossen" not in raw_hours else STANDARD_HOURS

        # Build full address
        street = data.get("street")
        zip_code = data.get("zip") or r.get("zip")
        city = data.get("city") or r.get("city")
        # Strip suffix after ' - ' in scraped city (e.g. "Magdeburg - Sued")
        if city and " - " in city:
            city = city.split(" - ")[0].strip()
        address = f"{street}, {zip_code} {city}" if street and zip_code else street

        update = {
            "email": email,
            "phone": data.get("phone") or r.get("phone"),
            "address": address or None,
            "zip": zip_code,
            "lat": data.get("lat"),
            "lng": data.get("lng"),
            "opening_hours": opening_hours,
            "website": url,
        }
        # Drop None values from the patch (don't overwrite with NULL)
        update = {k: v for k, v in update.items() if v is not None}

        print(f"  {'WOULD UPDATE' if dry else 'UPDATE      '} [{r['city']:15}] {r['name'][:38]:38}")
        for k, v in update.items():
            before = r.get(k) if k in r else "…"
            if before != v:
                print(f"       {k:14} {str(before)[:40]:40} → {v}")

        if not dry:
            sb.table("companies").update(update).eq("id", r["id"]).execute()
            print(f"       OK")
        print()


if __name__ == "__main__":
    main()
