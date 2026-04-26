#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Read-only verification for migration 012_country_column.sql.

Confirms:
  1. `country` column exists on all 5 target tables
  2. Every row's country is in the allowed set ('DE', 'AT')
  3. CHECK constraint rejects unsupported values ('PL' should error)

The script accepts ANY mix of DE/AT values per table — it does not enforce a
specific distribution, only that every value is one of the allowed jurisdictions.
"""
import os
import sys
from pathlib import Path
from collections import Counter

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

TABLES = ["cities", "companies", "leads", "page_events", "outreach_campaigns"]

print("=" * 60)
print("Migration 012 verification — country column")
print("=" * 60)

all_ok = True

for table in TABLES:
    try:
        rows = []
        offset = 0
        while True:
            res = sb.table(table).select("country").range(offset, offset + 999).execute()
            d = res.data or []
            rows.extend(d)
            if len(d) < 1000:
                break
            offset += 1000

        counts = Counter(r["country"] for r in rows)
        total = sum(counts.values())
        invalid = {k: v for k, v in counts.items() if k not in ("DE", "AT")}

        if total == 0:
            print(f"  {table:<22} 0 rows (column exists, table empty) ✓")
        elif invalid:
            print(f"  {table:<22} {total} rows — INVALID country values: {invalid} ✗")
            all_ok = False
        else:
            distribution = ", ".join(f"{k}={v}" for k, v in sorted(counts.items()))
            print(f"  {table:<22} {total} rows ({distribution}) ✓")
    except KeyError as e:
        print(f"  {table:<22} FAIL — column 'country' missing or query error: {e} ✗")
        all_ok = False
    except Exception as e:
        print(f"  {table:<22} FAIL — {type(e).__name__}: {e} ✗")
        all_ok = False

print()
print("CHECK constraint test (insert country='PL' on cities → must error):")
try:
    sb.table("cities").insert({
        "name": "MIGRATION_TEST_DELETE_ME",
        "slug": "migration-test-delete-me-zz",
        "state": "Test",
        "country": "PL",
    }).execute()
    print("  ✗ INSERT SUCCEEDED — CHECK constraint NOT working!")
    print("  Cleaning up bogus row...")
    sb.table("cities").delete().eq("slug", "migration-test-delete-me-zz").execute()
    all_ok = False
except Exception as e:
    msg = str(e).lower()
    if "check" in msg or "constraint" in msg or "23514" in msg:
        print(f"  ✓ INSERT rejected by CHECK constraint as expected")
    else:
        print(f"  ? INSERT failed but not with CHECK error: {type(e).__name__}: {e}")
        all_ok = False

print()
print("=" * 60)
print("RESULT:", "PASS — migration verified ✓" if all_ok else "FAIL — see issues above ✗")
print("=" * 60)
sys.exit(0 if all_ok else 1)
