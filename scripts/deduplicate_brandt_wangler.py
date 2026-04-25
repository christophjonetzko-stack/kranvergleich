#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Soft-delete the Brandt & Wangler duplicate row.

Background (verified 2026-04-25 via WebFetch on https://www.brandt-wangler.de/
impressum + /kontakt): the company has ONE physical office —
Saalestraße 41, 39126 Magdeburg, HRB 22966 Stendal, GF Danilo Ebel.
No Niederlassungen, Filialen or Standorte are listed in the Impressum.

The catalog had two `companies` rows with identical company_cranes
(autokran-mieten + baukran-mieten) and identical company_regions
(Magdeburg only). The "Bernburg" duplicate row carried only one
unique attribute — phone +49 3471 326718 — which is NOT in the firm's
Impressum and therefore likely stale or wrong.

This is a MAXIKraft-pattern duplicate (one HQ, multiple ghost rows),
not a Boels-pattern multi-branch case. Soft-delete chosen over
hard-delete to preserve reversibility in case any external system
(Resend logs, n8n flow, outreach pipeline) holds a reference to
the company_id, and to match the project's existing is_active pattern.
"""
import os
import sys

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

CANONICAL_ID = "ce565ca7-0dad-4f5c-a9ef-1cd374454805"  # Magdeburg row
DUPLICATE_ID = "e210df8f-db94-4a8e-91c8-87c1ca8e8dd8"  # Bernburg ghost


def fetch(fid: str):
    return (
        sb.table("companies")
        .select("id,name,city,phone,is_active,slug")
        .eq("id", fid)
        .single()
        .execute()
        .data
    )


def main() -> int:
    canonical = fetch(CANONICAL_ID)
    duplicate = fetch(DUPLICATE_ID)

    print("=== Pre-update state ===")
    print(f"  KEEP   {canonical['name']} ({canonical['city']}) "
          f"is_active={canonical['is_active']} slug={canonical['slug']}")
    print(f"  KILL   {duplicate['name']} ({duplicate['city']}) "
          f"is_active={duplicate['is_active']} slug={duplicate['slug']}")

    if canonical["name"] != duplicate["name"]:
        print("\nABORT: names diverged since the audit. Re-verify before running.")
        return 1
    if canonical["is_active"] is not True:
        print("\nABORT: canonical row is not active. Manual check required.")
        return 1
    if duplicate["is_active"] is not True:
        print("\nNoop: duplicate already soft-deleted.")
        return 0

    print("\nApplying: UPDATE companies SET is_active=false WHERE id=DUPLICATE_ID")
    sb.table("companies").update({"is_active": False}).eq("id", DUPLICATE_ID).execute()

    after = fetch(DUPLICATE_ID)
    print("\n=== Post-update state ===")
    print(f"  Duplicate is_active: {after['is_active']}")
    if after["is_active"] is not False:
        print("ABORT: update did not stick. Check RLS / service-role key.")
        return 1

    print("\nDone. Catalog should now show Brandt & Wangler exactly once.")
    print(f"To revert: UPDATE companies SET is_active=true WHERE id='{DUPLICATE_ID}'")
    return 0


if __name__ == "__main__":
    sys.exit(main())
