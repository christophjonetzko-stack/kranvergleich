#!/usr/bin/env python3
"""Strip AI-tell chars from text content stored in Supabase.

Targets:
  cities.city_faq_override (jsonb array of {question, answer})
  companies.description, companies.description_enriched, companies.price_note

Replacement rules mirror scripts/clean_ai_chars.py exactly:
  ' — X' (uppercase next) → '. X' (sentence break)
  ' — x' (lowercase next) → ', x' (continuation)
  ' — '                   → ', ' (fallback)
  bare '—'                → drop
  '→'                     → drop
  '&rarr;'                → drop
  '✓ ' / '✓' / '✗' / '✅' / '❌' / '⚠️' / '⚠' / '✉️' → drop

Usage:
  python clean_ai_chars_supabase.py --dry-run        (preview, no DB writes)
  python clean_ai_chars_supabase.py --apply          (writes)
"""
import os
import re
import sys
import json
from dotenv import load_dotenv
from supabase import create_client

load_dotenv('.env.local')


def clean(text: str) -> str:
    if not isinstance(text, str):
        return text
    out = text
    out = re.sub(r' — ([A-ZÄÖÜ])', r'. \1', out)
    out = re.sub(r' — ([a-zäöüß])', r', \1', out)
    out = out.replace(' — ', ', ')
    out = out.replace('—', '')
    out = out.replace('→', '')
    out = out.replace('&rarr;', '')
    for ch in ('✓ ', '✓', '✗', '✅', '❌', '⚠️', '⚠', '✉️', '✉'):
        out = out.replace(ch, '')
    return out


def clean_faq_array(arr):
    if not isinstance(arr, list):
        return arr, False
    changed = False
    cleaned = []
    for item in arr:
        if isinstance(item, dict):
            new_item = {}
            for k, v in item.items():
                nv = clean(v) if isinstance(v, str) else v
                if nv != v:
                    changed = True
                new_item[k] = nv
            cleaned.append(new_item)
        else:
            cleaned.append(item)
    return cleaned, changed


def main():
    if '--dry-run' not in sys.argv and '--apply' not in sys.argv:
        print('usage: clean_ai_chars_supabase.py [--dry-run|--apply]', file=sys.stderr)
        sys.exit(2)
    apply = '--apply' in sys.argv

    sb = create_client(
        os.environ['NEXT_PUBLIC_SUPABASE_URL'],
        os.environ['SUPABASE_SERVICE_ROLE_KEY'],
    )

    # 1. Cities city_faq_override
    print('=== cities.city_faq_override ===')
    res = sb.table('cities').select('id,slug,city_faq_override').execute()
    city_updates = []
    for c in res.data or []:
        original = c.get('city_faq_override')
        if not original:
            continue
        cleaned, changed = clean_faq_array(original)
        if changed:
            city_updates.append((c['id'], c['slug'], cleaned))
            print(f'  {c["slug"]}: needs update')
    print(f'cities to update: {len(city_updates)}')

    if apply and city_updates:
        for cid, slug, cleaned in city_updates:
            sb.table('cities').update({'city_faq_override': cleaned}).eq('id', cid).execute()
            print(f'  updated {slug}')

    # 2. Companies description / description_enriched / price_note
    print()
    print('=== companies.description/_enriched/price_note ===')
    res2 = sb.table('companies').select('id,slug,description,description_enriched,price_note').execute()
    company_updates = []
    for c in res2.data or []:
        patch = {}
        for field in ('description', 'description_enriched', 'price_note'):
            v = c.get(field)
            if v is None:
                continue
            nv = clean(v)
            if nv != v:
                patch[field] = nv
        if patch:
            company_updates.append((c['id'], c['slug'], patch))
            print(f'  {c["slug"]}: {list(patch.keys())}')
    print(f'companies to update: {len(company_updates)}')

    if apply and company_updates:
        for cid, slug, patch in company_updates:
            sb.table('companies').update(patch).eq('id', cid).execute()
            print(f'  updated {slug}')

    if not apply:
        print()
        print('--- dry-run only. add --apply to write to Supabase.')


if __name__ == '__main__':
    main()
