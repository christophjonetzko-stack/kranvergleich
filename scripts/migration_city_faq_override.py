#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Migration: add city_faq_override JSONB column to cities table."""
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

# Run migration via RPC (raw SQL)
sql = "ALTER TABLE cities ADD COLUMN IF NOT EXISTS city_faq_override JSONB;"

try:
    sb.rpc("exec_sql", {"query": sql}).execute()
    print("Migration OK: city_faq_override column added")
except Exception as e:
    # If exec_sql RPC doesn't exist, fall back to checking if column already exists
    print(f"RPC failed (expected if exec_sql not available): {e}")
    print("Attempting to verify column via select...")
    try:
        res = sb.table("cities").select("city_faq_override").limit(1).execute()
        print("Column already exists — migration not needed")
    except Exception as e2:
        print(f"Column does NOT exist and cannot be added via REST API.")
        print(f"Please run this SQL in Supabase SQL Editor:")
        print(f"\n  ALTER TABLE cities ADD COLUMN IF NOT EXISTS city_faq_override JSONB;\n")
