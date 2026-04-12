#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Boels Verleih — idempotent bulk import to Supabase.

Reads boels_selected.json and inserts each branch into companies +
company_cranes (minikran-mieten).

Defaults to --dry-run: shows what would happen without writing.
Pass --commit to actually execute.

Safety features:
  - Skip inserts where slug already exists (idempotent)
  - Verify minikran-mieten crane type exists before starting
  - Each branch inserted individually so partial success is possible
  - Full audit log → scripts/boels_import_log.txt

Usage:
  python boels_import.py              # dry-run (default)
  python boels_import.py --commit     # actually write
"""
import argparse
import datetime
import json
import logging
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

HERE = os.path.dirname(__file__)
IN_FILE = os.path.join(HERE, "boels_selected.json")
LOG_FILE = os.path.join(HERE, "boels_import_log.txt")

# ─── Load .env.local ──────────────────────────────────────
ENV_FILE = os.path.join(HERE, "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

from supabase import create_client

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", os.environ.get("SUPABASE_URL", ""))
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")

# Fallback standard hours
STANDARD_HOURS = "Mo-Fr 7:00-16:30 | Sa 8:00-12:30 | So geschlossen"
CRANE_TYPE_SLUG = "minikran-mieten"
COMPANY_NAME = "Boels Verleih GmbH"
DEPOT_EMAIL_RE = re.compile(r"^depot\.\d+@boels\.de$", re.IGNORECASE)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger("boels-import")


def build_row(b: dict) -> dict:
    city_name = b["seo_city_name"]
    city_slug = b["seo_city_slug"]
    state = b["seo_city_state"]
    street = b.get("street")
    zip_code = b.get("zip")
    email = (b.get("email") or "").lower() or None
    if email and not DEPOT_EMAIL_RE.match(email):
        email = None

    raw_hours = b.get("opening_hours")
    if raw_hours and "Mo-So geschlossen" not in raw_hours:
        opening_hours = raw_hours
    else:
        opening_hours = STANDARD_HOURS

    address = f"{street}, {zip_code} {city_name}" if street and zip_code else street

    description = (
        f"Boels Verleih GmbH in {city_name}. Minikranvermietung und "
        f"Baumaschinenverleih. Minikrane zur Miete für enge Baustellen, "
        f"Innenräume und Glasmontage."
    )

    return {
        "name": COMPANY_NAME,
        "slug": f"boels-verleih-{city_slug}",
        "description": description,
        "website": b["url"],
        "phone": b.get("phone"),
        "email": email,
        "address": address,
        "city": city_name,
        "state": state,
        "zip": zip_code,
        "lat": b.get("lat"),
        "lng": b.get("lng"),
        "opening_hours": opening_hours,
        "is_premium": False,
        "is_verified": False,
        "is_active": True,
        "is_relevant": True,
        "google_reviews_count": 0,
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true", help="actually write to DB (default: dry-run)")
    args = ap.parse_args()

    dry_run = not args.commit
    mode = "DRY-RUN" if dry_run else "COMMIT"
    log.info(f"=== Boels bulk import — {mode} @ {datetime.datetime.now().isoformat()} ===")

    with open(IN_FILE, encoding="utf-8") as f:
        selected = json.load(f)
    log.info(f"Loaded {len(selected)} selected branches")

    sb = create_client(SUPABASE_URL, SUPABASE_KEY)

    # 1. Verify crane type exists
    ct = sb.table("crane_types").select("id,slug").eq("slug", CRANE_TYPE_SLUG).execute().data
    if not ct:
        log.error(f"crane_types.slug={CRANE_TYPE_SLUG!r} not found — aborting")
        sys.exit(1)
    minikran_id = ct[0]["id"]
    log.info(f"Minikran crane_type.id = {minikran_id}")

    # 2. Pre-fetch existing slugs to detect conflicts
    planned_slugs = [f"boels-verleih-{b['seo_city_slug']}" for b in selected]
    existing = sb.table("companies").select("slug").in_("slug", planned_slugs).execute().data
    existing_slugs = {e["slug"] for e in existing}
    if existing_slugs:
        log.warning(f"Found {len(existing_slugs)} existing slugs — will skip: {sorted(existing_slugs)}")

    inserted = 0
    skipped = 0
    failed = 0

    for b in selected:
        row = build_row(b)
        slug = row["slug"]

        if slug in existing_slugs:
            log.info(f"SKIP {slug} (already exists)")
            skipped += 1
            continue

        if dry_run:
            log.info(
                f"WOULD INSERT  {slug:32} | {row['city']:20} | "
                f"{row['zip']} | email={row['email']} | hours={row['opening_hours']}"
            )
            inserted += 1
            continue

        # Real insert
        try:
            ins = sb.table("companies").insert(row).execute()
            company_id = ins.data[0]["id"]
            sb.table("company_cranes").insert(
                {
                    "company_id": company_id,
                    "crane_type_id": minikran_id,
                    "has_operator": False,
                    "has_glass_sucker": False,
                    "electric": False,
                }
            ).execute()
            log.info(f"INSERT OK    {slug} (id={company_id})")
            inserted += 1
        except Exception as e:
            log.error(f"INSERT FAIL  {slug}: {e}")
            failed += 1

    verb = "would insert" if dry_run else "inserted"
    log.info(
        f"=== Summary: {verb}={inserted}, skipped={skipped}, failed={failed} ({mode}) ==="
    )
    if dry_run:
        log.info("Dry-run complete. Re-run with --commit to execute.")


if __name__ == "__main__":
    main()
