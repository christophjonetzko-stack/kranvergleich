#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KranVergleich — Crane Types Enrichment Pipeline
Targets companies WITHOUT crane types. Two phases:
  Phase A: Crawl homepage + subpages (/flotte, /fuhrpark, /mietpark, /leistungen)
  Phase B: Name-based fallback (e.g. "Autokran Müller" → Autokran)

Usage:
  python crane_types_enrichment.py                  # both phases
  python crane_types_enrichment.py --phase a        # crawl only
  python crane_types_enrichment.py --phase b        # name-based only
  python crane_types_enrichment.py --limit 50       # limit crawl count
"""

import asyncio
import json
import time
import random
import re
import sys
import os
import argparse
import logging
from datetime import datetime

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

# ─── ENV ─────────────────────────────────────────────────
ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, val = line.partition("=")
                os.environ.setdefault(key.strip(), val.strip())

from supabase import create_client
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
import anthropic

# ─── CONFIG ──────────────────────────────────────────────
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", os.environ.get("SUPABASE_URL", ""))
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

CRAWL_TIMEOUT = 15000
SUBPAGES = ["/flotte", "/fuhrpark", "/mietpark", "/leistungen", "/kranvermietung", "/krane", "/maschinen"]

LOG_FILE = os.path.join(os.path.dirname(__file__), "crane_types_enrichment_log.txt")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "crane_types_enrichment_output.txt")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger("crane-types")

# ─── CRANE TYPE IDS ──────────────────────────────────────
CRANE_TYPE_IDS = {
    "Minikran": "1a7019bd-7fd3-401a-8713-7f6be6fbd827",
    "Autokran": "ab511eea-d464-47b9-8ada-16931dab5078",
    "Dachdeckerkran": "99e6ce74-f707-494e-afc8-31627b3bf41d",
    "Raupenkran": "0b61b867-53a6-4cf9-afbb-50c610dc4a2a",
    "Anhängerkran": "ef7ed422-402e-4553-9c01-661df28c66fc",
    "Mobilkran": "02dc05de-6699-4849-93fb-2b655177bfd9",
    "Baukran": "f1f86ce7-14b8-48ce-9004-5db8dde53949",
    "Ladekran": "a556dcad-e379-4ac3-8d72-6eed094900d1",
}

# ─── NAME-BASED PATTERNS (Phase B) ──────────────────────
NAME_PATTERNS = {
    r"(?i)\bautokran": "Autokran",
    r"(?i)\bminikran": "Minikran",
    r"(?i)\bmobilkran": "Mobilkran",
    r"(?i)\braupenkran": "Raupenkran",
    r"(?i)\bdachdeckerkran": "Dachdeckerkran",
    r"(?i)\banh[äa]ngerkran": "Anhängerkran",
    r"(?i)\bbaukran": "Baukran",
    r"(?i)\bladekran": "Ladekran",
    r"(?i)\bschwerlast": "Mobilkran",
    r"(?i)\bkranarbeiten": "Autokran",
}

# ─── EXTRACTION PROMPT (focused on crane types) ─────────
EXTRACT_PROMPT = """Du bist ein Experte für Kranvermietung. Analysiere den Website-Inhalt und extrahiere NUR die Krantypen, die diese Firma anbietet.

Erlaubte Krantypen (verwende NUR diese exakten Namen):
- "Minikran" (auch: Glaskran, Spinnenkran, Spider Crane)
- "Autokran" (auch: Mobilkran auf LKW, AT-Kran, All-Terrain-Kran)
- "Dachdeckerkran" (auch: Böcker, Dachkran)
- "Raupenkran" (auch: Raupenfahrwerk, Kettenkran)
- "Anhängerkran" (auch: Kran auf Anhänger)
- "Mobilkran" (auch: Teleskopkran, Schwerlastkran, Fahrzeugkran)
- "Baukran" (auch: Turmdrehkran, Obendreher, Untendreher)
- "Ladekran" (auch: LKW-Ladekran, Knickarmkran)

WICHTIG:
- Wenn "Autokran" und "Mobilkran" gleichzeitig erwähnt werden, sind das ZWEI verschiedene Typen.
- Wenn nur "Kran" oder "Kranvermietung" ohne Spezifikation steht, extrahiere NICHTS.
- Nur extrahieren was EXPLIZIT auf der Website steht oder klar abgebildet ist.

Antwort als JSON:
{"crane_types": ["Typ1", "Typ2"], "has_operator": true/false/null}

Gib NUR valides JSON zurück."""

# ─── CLIENTS ─────────────────────────────────────────────
sb = create_client(SUPABASE_URL, SUPABASE_KEY)
claude = anthropic.Anthropic(api_key=ANTHROPIC_KEY)


def get_companies_without_crane_types():
    """Fetch active companies that have NO entries in company_cranes."""
    # Get all company IDs that already have crane types
    has_cranes = set()
    offset = 0
    while True:
        r = sb.table("company_cranes").select("company_id").range(offset, offset + 999).execute()
        if not r.data:
            break
        for row in r.data:
            has_cranes.add(row["company_id"])
        offset += 1000
        if len(r.data) < 1000:
            break

    log.info(f"Companies WITH crane types: {len(has_cranes)}")

    # Get all active companies
    all_companies = []
    offset = 0
    while True:
        r = (
            sb.table("companies")
            .select("id,name,website,city,state")
            .eq("is_active", True)
            .eq("is_relevant", True)
            .range(offset, offset + 999)
            .execute()
        )
        if not r.data:
            break
        all_companies.extend(r.data)
        offset += 1000
        if len(r.data) < 1000:
            break

    # Filter out those that already have crane types
    missing = [c for c in all_companies if c["id"] not in has_cranes]
    log.info(f"Companies WITHOUT crane types: {len(missing)} (total active: {len(all_companies)})")
    return missing


def extract_crane_types_claude(text, company_name):
    """Use Claude to extract crane types from crawled text."""
    text = text[:10000] if text else ""
    if not text.strip():
        return None

    try:
        response = claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=300,
            messages=[
                {
                    "role": "user",
                    "content": f"Firma: {company_name}\n\nWebsite-Inhalt:\n{text}\n\n{EXTRACT_PROMPT}",
                }
            ],
        )
        raw = response.content[0].text.strip()
        if raw.startswith("```"):
            raw = raw.split("```")[1]
            if raw.startswith("json"):
                raw = raw[4:]
        return json.loads(raw)
    except json.JSONDecodeError:
        log.warning(f"  JSON parse error for {company_name}")
        return None
    except Exception as e:
        log.warning(f"  Claude API error for {company_name}: {e}")
        return None


def save_crane_types(company_id, company_name, crane_types, has_operator=None, source="crawl"):
    """Save crane types to company_cranes table."""
    valid_types = set(CRANE_TYPE_IDS.keys())
    saved = 0
    for ct_name in crane_types:
        if ct_name not in valid_types:
            continue
        ct_id = CRANE_TYPE_IDS[ct_name]
        try:
            sb.table("company_cranes").upsert(
                {
                    "company_id": company_id,
                    "crane_type_id": ct_id,
                    "has_operator": has_operator if has_operator is not None else False,
                },
                on_conflict="company_id,crane_type_id",
            ).execute()
            saved += 1
        except Exception as e:
            log.debug(f"  upsert error {company_name}/{ct_name}: {e}")
    return saved


async def crawl_company_multi(crawler, company, config):
    """Crawl homepage + subpages, return combined markdown."""
    url = company["website"] or ""
    if not url.startswith("http"):
        url = "https://" + url
    url = url.rstrip("/")

    texts = []

    # Crawl homepage
    try:
        result = await crawler.arun(url=url, config=config)
        if result.success and result.markdown:
            texts.append(result.markdown.raw_markdown[:5000])
    except Exception as e:
        log.debug(f"  Crawl error {company['name']} homepage: {e}")

    # Crawl subpages
    for subpage in SUBPAGES:
        sub_url = url + subpage
        try:
            result = await crawler.arun(url=sub_url, config=config)
            if result.success and result.markdown and len(result.markdown.raw_markdown.strip()) > 200:
                texts.append(f"\n--- {subpage} ---\n" + result.markdown.raw_markdown[:3000])
        except Exception:
            pass  # 404s are expected

    return "\n".join(texts) if texts else None


async def phase_a(companies, limit):
    """Phase A: Crawl-based enrichment."""
    log.info(f"\n{'='*50}")
    log.info(f"PHASE A: Crawl-based enrichment")
    log.info(f"{'='*50}")

    # Filter to companies with websites
    with_website = [c for c in companies if c.get("website")]
    total = len(with_website)
    limit = min(limit, total)
    log.info(f"Companies with website: {total} (limit: {limit})")

    if total == 0:
        return 0

    stats = {"crawled": 0, "failed": 0, "found": 0, "types_total": 0}

    browser_config = BrowserConfig(headless=True, verbose=False)
    crawler_config = CrawlerRunConfig(
        page_timeout=CRAWL_TIMEOUT,
        wait_until="domcontentloaded",
    )

    async with AsyncWebCrawler(config=browser_config) as crawler:
        for i, company in enumerate(with_website[:limit]):
            markdown = await crawl_company_multi(crawler, company, crawler_config)

            if markdown:
                data = extract_crane_types_claude(markdown, company["name"])
                if data and data.get("crane_types"):
                    saved = save_crane_types(
                        company["id"],
                        company["name"],
                        data["crane_types"],
                        data.get("has_operator"),
                        source="crawl",
                    )
                    if saved > 0:
                        stats["found"] += 1
                        stats["types_total"] += saved
                        log.info(f"  ✓ {company['name']}: {data['crane_types']}")

                        # Log to output file
                        with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
                            f.write(f"\n[CRAWL] {company['name']} — {data['crane_types']}\n")
                    else:
                        log.info(f"  - {company['name']}: no valid types")
                else:
                    log.info(f"  - {company['name']}: no types found on website")
                stats["crawled"] += 1
            else:
                stats["failed"] += 1
                log.info(f"  ✗ {company['name']}: crawl failed")

            if (i + 1) % 25 == 0:
                log.info(f"  Progress: {i+1}/{limit} | Found: {stats['found']} | Types: {stats['types_total']}")

            await asyncio.sleep(random.uniform(1.0, 2.0))

    log.info(f"\nPhase A results: crawled={stats['crawled']}, failed={stats['failed']}, "
             f"found={stats['found']} firms, {stats['types_total']} type entries")
    return stats["found"]


def phase_b(companies):
    """Phase B: Name-based fallback for remaining companies without crane types."""
    log.info(f"\n{'='*50}")
    log.info(f"PHASE B: Name-based fallback")
    log.info(f"{'='*50}")

    # Re-check which companies STILL have no crane types
    has_cranes = set()
    offset = 0
    while True:
        r = sb.table("company_cranes").select("company_id").range(offset, offset + 999).execute()
        if not r.data:
            break
        for row in r.data:
            has_cranes.add(row["company_id"])
        offset += 1000
        if len(r.data) < 1000:
            break

    still_missing = [c for c in companies if c["id"] not in has_cranes]
    log.info(f"Companies still without crane types after Phase A: {len(still_missing)}")

    stats = {"matched": 0, "types_total": 0}

    for company in still_missing:
        name = company["name"]
        found_types = set()

        for pattern, crane_type in NAME_PATTERNS.items():
            if re.search(pattern, name):
                found_types.add(crane_type)

        if found_types:
            saved = save_crane_types(
                company["id"],
                name,
                list(found_types),
                has_operator=None,
                source="name",
            )
            if saved > 0:
                stats["matched"] += 1
                stats["types_total"] += saved
                log.info(f"  ✓ {name} → {list(found_types)}")

                with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
                    f.write(f"[NAME] {name} — {list(found_types)}\n")

    log.info(f"\nPhase B results: matched={stats['matched']} firms, {stats['types_total']} type entries")
    return stats["matched"]


async def main():
    parser = argparse.ArgumentParser(description="Crane Types Enrichment")
    parser.add_argument("--limit", type=int, default=500, help="Max companies to crawl in Phase A")
    parser.add_argument("--phase", choices=["a", "b", "both"], default="both", help="Which phase to run")
    args = parser.parse_args()

    log.info(f"=== CRANE TYPES ENRICHMENT START === {datetime.now().isoformat()}")

    companies = get_companies_without_crane_types()

    if not companies:
        log.info("All companies already have crane types. Nothing to do.")
        return

    phase_a_found = 0
    phase_b_found = 0

    if args.phase in ("a", "both"):
        phase_a_found = await phase_a(companies, args.limit)

    if args.phase in ("b", "both"):
        phase_b_found = phase_b(companies)

    # Final count
    has_cranes_final = set()
    offset = 0
    while True:
        r = sb.table("company_cranes").select("company_id").range(offset, offset + 999).execute()
        if not r.data:
            break
        for row in r.data:
            has_cranes_final.add(row["company_id"])
        offset += 1000
        if len(r.data) < 1000:
            break

    total_active = 0
    offset = 0
    while True:
        r = sb.table("companies").select("id", count="exact").eq("is_active", True).eq("is_relevant", True).range(offset, offset + 999).execute()
        total_active = r.count if r.count else len(r.data)
        break

    coverage = len(has_cranes_final) / total_active * 100 if total_active else 0

    log.info(f"""
{'='*50}
CRANE TYPES ENRICHMENT REPORT
{'='*50}
Phase A (crawl):    {phase_a_found} new firms
Phase B (name):     {phase_b_found} new firms
Total with types:   {len(has_cranes_final)}/{total_active} ({coverage:.1f}%)
{'='*50}""")


if __name__ == "__main__":
    asyncio.run(main())
