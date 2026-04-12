#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Propagate parent-firm emails to their branch entries that were marked '???',
and fix a typo'd Mammoet email.

Safe operations only — each target is identified by explicit slug OR
(name + city), and the new email is explicit in this script.

Usage:
  python fix_branch_emails.py            # dry-run (default)
  python fix_branch_emails.py --commit   # execute
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


# ─── Updates list: (name_pattern, city, new_email, reason) ────
# name_pattern is case-insensitive; city is exact match.
UPDATES = [
    # SCHOLPP Kran — propagate info@scholppkran.de from Stuttgart parent
    ("%scholpp%", "Ettlingen", "info@scholppkran.de", "Scholpp branch of Stuttgart parent"),
    ("%scholpp%", "Mannheim", "info@scholppkran.de", "Scholpp branch of Stuttgart parent"),

    # Autokrane Schares — propagate dispo@schares.de from Bocholt parent
    ("%schares%", "Essen", "dispo@schares.de", "Schares branch of Bocholt parent"),

    # Mammoet Deutschland — user confirmed correct email is `leuna@mammoet.com`
    # (matches what Krefeld row already had). Propagate to all 5 Mammoet rows:
    # fixes Leuna typo and supplies the 3 '???' branches with central DE sales email.
    ("%mammoet%", "Leuna", "leuna@mammoet.com", "Fix Mammoet Leuna typo"),
    ("%mammoet%", "Hamburg", "leuna@mammoet.com", "Mammoet DE central sales email"),
    ("%mammoet%", "Leipzig", "leuna@mammoet.com", "Mammoet DE central sales email"),
    ("%mammoet%", "Nünchritz", "leuna@mammoet.com", "Mammoet DE central sales email"),
    ("%mammoet%", "Krefeld", "leuna@mammoet.com", "Mammoet Krefeld — already correct, no-op"),

    # Felbermayr Deutschland — propagate rent@felbermayr.de from Giesen row
    # (discovered in scrape_brand_emails.py). This is specifically for rentals
    # and uses the German domain (not the Austrian parent's office@felbermayr.cc).
    # Applied to rows matching %felbermayr% EXCEPT Giesen itself (already correct).
]

# Cluster cleanup: rows whose '???' email should be set to NULL.
# MAXIKraft Gruppe — 4 brand names but ONE company (all redirect to maxikraft.de;
# Impressum confirms shared HQ at Am Pechdamm 1, 04916 Herzberg). They don't
# publish an email publicly. Convert '???' to NULL so the UI shows a phone CTA.
NULL_OUT_PATTERNS = [
    ("%MAXIKraft%", "MAXIKraft brand (MAXIKraft Gruppe — no public email)"),
    ("%Kranlogistik Lausitz%", "Kranlogistik Lausitz (MAXIKraft Gruppe — no public email)"),
    ("Kranlogistik Sachsen%", "Kranlogistik Sachsen (MAXIKraft Gruppe — no public email)"),
    ("MaxiMum%Schwerlast%", "Maximum GmbH (MAXIKraft Gruppe — no public email)"),
]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true", help="execute updates (default: dry-run)")
    args = ap.parse_args()
    dry = not args.commit

    print(f"=== fix_branch_emails.py — {'DRY-RUN' if dry else 'COMMIT'} ===\n")

    total_found = 0
    total_updated = 0
    total_missing = 0
    total_already_correct = 0

    for name_pat, city, new_email, reason in UPDATES:
        rows = sb.table("companies").select(
            "id,name,city,email"
        ).ilike("name", name_pat).eq("city", city).execute().data

        if not rows:
            print(f"  MISS   [{city:15}] {name_pat} — no match")
            total_missing += 1
            continue

        if len(rows) > 1:
            print(f"  WARN   [{city:15}] {name_pat} — {len(rows)} matches, updating ALL")

        for r in rows:
            total_found += 1
            current = r.get("email") or ""
            if current == new_email:
                print(f"  SKIP   [{city:15}] {r['name'][:40]:40} already has {new_email}")
                total_already_correct += 1
                continue

            arrow = "WOULD SET" if dry else "UPDATE   "
            print(f"  {arrow} [{city:15}] {r['name'][:40]:40} | {current!r:35} → {new_email}  ({reason})")
            if not dry:
                sb.table("companies").update({"email": new_email}).eq("id", r["id"]).execute()
            total_updated += 1

    # ─── Felbermayr: propagate rent@felbermayr.de from existing parent row ───
    print("\n─── Felbermayr Deutschland (propagate rent@felbermayr.de) ───")
    felbermayr_rows = sb.table("companies").select("id,name,city,email").ilike(
        "name", "%felbermayr%"
    ).execute().data
    felbermayr_email = "rent@felbermayr.de"
    for r in felbermayr_rows:
        cur = r.get("email") or ""
        if cur == felbermayr_email:
            print(f"  SKIP   [{r['city']:15}] {r['name'][:35]:35} already has {felbermayr_email}")
            continue
        if cur and cur not in ("???", "?", "-"):
            print(f"  KEEP   [{r['city']:15}] {r['name'][:35]:35} has different real email {cur!r}")
            continue
        arrow = "WOULD SET" if dry else "UPDATE   "
        print(f"  {arrow} [{r['city']:15}] {r['name'][:35]:35} | {cur!r:10} → {felbermayr_email}")
        if not dry:
            sb.table("companies").update({"email": felbermayr_email}).eq("id", r["id"]).execute()
        total_updated += 1

    # ─── MAXIKraft Gruppe: set '???' → NULL for 4 brand patterns ───
    print("\n─── MAXIKraft Gruppe cluster — '???' → NULL ───")
    null_count = 0
    for pat, reason in NULL_OUT_PATTERNS:
        rows = sb.table("companies").select("id,name,city,email").ilike(
            "name", pat
        ).execute().data
        for r in rows:
            cur = r.get("email") or ""
            if cur not in ("???", "?", "-"):
                continue
            arrow = "WOULD NULL" if dry else "NULL-OUT  "
            print(f"  {arrow} [{r['city']:15}] {r['name'][:40]:40} | {cur!r} → NULL  ({reason})")
            if not dry:
                sb.table("companies").update({"email": None}).eq("id", r["id"]).execute()
            null_count += 1

    print(f"\n=== Summary ===")
    print(f"Propagation updates: {len(UPDATES)}")
    print(f"  Matches found:     {total_found}")
    print(f"  Already correct:   {total_already_correct}")
    print(f"  {'Would update' if dry else 'Updated'}:          {total_updated}")
    print(f"Cluster NULL-outs:   {null_count}")


if __name__ == "__main__":
    main()
