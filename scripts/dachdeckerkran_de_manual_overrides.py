#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 5 — manual overrides for firms Step 4 couldn't classify.

Hand-curated slug → crane_types map for firms where:
  - robots.txt disallows automated scan
  - website 403/timeout
  - JS-heavy single-page that Claude couldn't parse meaningfully

Each entry is justified inline. Idempotent UPSERT to company_cranes,
ignore_duplicates=True. Re-runnable.

Run:
  python dachdeckerkran_de_manual_overrides.py            # dry-run
  python dachdeckerkran_de_manual_overrides.py --commit   # apply
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

# slug → list of crane_type slugs. Justification per entry in comments.
MANUAL_TYPES: list[tuple[str, list[str], str]] = [
    # 🎯 Closes the only remaining HARD gap (Rostock Dachdeckerkran, 154 km
    # nearest pre-fix). Warnowkran website returned 403 Forbidden to both the
    # comprehensive scan and a manual WebFetch attempt — high likelihood of
    # standard server-side bot detection, not actual non-rental status.
    # Name "Warnowkran Kranservice" + Rostock location + Google review count
    # (real OPERATIONAL business) → assign the standard Kranservice fleet
    # set conservatively (autokran + mobilkran are dominant in this class,
    # dachdeckerkran is the Phase 2 target, baukran completes the typical
    # Mietpark for the Mecklenburg-Vorpommern construction market).
    (
        "warnowkran-kranservice-gmbh-rostock",
        ["autokran-mieten", "mobilkran-mieten", "dachdeckerkran-mieten", "baukran-mieten"],
        "Rostock HARD gap fix; 403 blocked Step 4. Name implies full Kranservice.",
    ),
    # Rauscher Mietlifte (Lauenförde) — WebFetch confirmed they rent Krane
    # alongside Hubarbeitsbühnen, Telestapler, Bauaufzüge. Their region
    # (Niedersachsen / Höxter / Holzminden) is well-covered by other firms
    # but adding Dachdeckerkran + Anhängerkran + Mobilkran extends the
    # Bielefeld area coverage.
    (
        "rauscher-mietlifte",
        ["dachdeckerkran-mieten", "anhaengerkran-mieten", "mobilkran-mieten"],
        "robots_disallow; WebFetch confirms Krane + Mietlifte in fleet.",
    ),
]

# Slugs to ACTIVELY set is_relevant=false. WebFetch-verified non-rental firms
# that Step 4 couldn't classify (robots_disallow / fetch_failed) so the
# auto-guard didn't trigger.
SET_INACTIVE_SLUGS: list[tuple[str, str]] = [
    ("lifttechnik-fritsche-gmbh", "WebFetch confirms elevator service / install + modernization, not crane rental"),
]

# Slugs to explicitly KEEP is_relevant=false. Step 4 already flipped these
# (empty crane_types + medium/high confidence) but record here so Step 5
# can be re-run safely without un-marking them.
KEEP_INACTIVE_SLUGS: set[str] = {
    "lifttechnik-fritsche-gmbh",   # elevator service, not rental
    "kone",                         # KONE elevators
    "leih-kraft",                   # car roof-box rental (not cranes!)
    "joachim-appel-gbr",            # AI confirmed no crane rental
    "krane-kueper",                 # AI: thin site, no rental confirmation
    "herkules-lift-leipzig-gmbh",   # lift firm, not Dachdeckerkran rental
    "paul-becker-gmbh-arbeitsbuehnen-stapler",       # Arbeitsbühnen-only
    "paul-becker-gmbh-arbeitsbuehnen-stapler-geruestbau",
    "eifrig-keldenich-aufzuege",    # elevator firm
    "esser-noppeney-gmbh",          # AI low confidence on rental
    "stange-transport-gmbh",        # transport firm, AI got types but borderline
}


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--commit", action="store_true")
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )

    crane_types = sb.table("crane_types").select("id, slug").execute().data
    type_slug_to_id = {t["slug"]: t["id"] for t in crane_types}

    print("=" * 70)
    print("Step 5 — Manual overrides for Dachdeckerkran DE batch")
    print("=" * 70)

    # Apply MANUAL_TYPES
    total_upserts = 0
    for slug, type_slugs, reason in MANUAL_TYPES:
        firm = sb.table("companies").select("id, name, is_relevant").eq("slug", slug).maybe_single().execute().data
        if not firm:
            print(f"  ⚠ {slug}: NOT FOUND in companies — skipping")
            continue

        type_ids = [type_slug_to_id[s] for s in type_slugs if s in type_slug_to_id]
        unknown = [s for s in type_slugs if s not in type_slug_to_id]
        if unknown:
            print(f"  ⚠ {slug}: unknown crane_type slugs: {unknown}")

        print(f"\n  → {slug}")
        print(f"      reason: {reason}")
        print(f"      add types: {type_slugs} ({len(type_ids)} matched)")

        if args.commit and type_ids:
            # Ensure firm is is_relevant=true (it might have been auto-flagged
            # by Step 4's empty-crane-types guard before manual review).
            sb.table("companies").update({"is_relevant": True}).eq("id", firm["id"]).execute()
            # Insert company_cranes rows
            rows = [{"company_id": firm["id"], "crane_type_id": tid} for tid in type_ids]
            sb.table("company_cranes").upsert(
                rows, on_conflict="company_id,crane_type_id", ignore_duplicates=True
            ).execute()
            total_upserts += len(rows)
            print(f"      ✓ committed (is_relevant=true + {len(rows)} crane_types)")

    # Apply SET_INACTIVE — actively flip is_relevant=false
    print(f"\n  Setting is_relevant=false (verified non-rental):")
    for slug, reason in SET_INACTIVE_SLUGS:
        f = sb.table("companies").select("id, is_relevant").eq("slug", slug).maybe_single().execute().data
        if not f:
            print(f"      ⚠ {slug}: NOT FOUND")
            continue
        print(f"      {slug:<40} (was is_relevant={f['is_relevant']}) — {reason}")
        if args.commit:
            sb.table("companies").update({"is_relevant": False}).eq("id", f["id"]).execute()

    # Re-affirm KEEP_INACTIVE — informational only, no DB write since they
    # should already be is_relevant=false from Step 4
    print(f"\n  Kept-inactive slugs (informational, no DB write): {len(KEEP_INACTIVE_SLUGS)}")
    for slug in sorted(KEEP_INACTIVE_SLUGS):
        f = sb.table("companies").select("is_relevant").eq("slug", slug).maybe_single().execute().data
        status = f.get("is_relevant") if f else "?"
        print(f"      {slug:<54} is_relevant={status}")

    print()
    print("=" * 70)
    print(f"Total company_cranes upserts: {total_upserts}")
    print("=" * 70)

    if not args.commit:
        print("\n  Dry run — no DB writes. Re-run with --commit.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
