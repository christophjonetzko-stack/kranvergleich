#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
KranVergleich — Crawl4AI Enrichment Pipeline
Crawls company websites and extracts "Kubełek 2" data using Claude API.

Prerequisites:
  pip install supabase crawl4ai anthropic
  Run 01_enrichment_migration.sql in Supabase SQL Editor first.

Usage:
  python crawl4ai_enrichment.py              # crawl all uncrawled
  python crawl4ai_enrichment.py --limit 50   # crawl max 50
  python crawl4ai_enrichment.py --recrawl    # recrawl already crawled
"""

import asyncio
import json
import time
import random
import sys
import os
import argparse
import logging
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

from supabase import create_client
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig
import anthropic

# ─── CONFIG ───────────────────────────────────────────────
# Kranvergleich Supabase project
SUPABASE_URL = "https://agzxugnhvgjxubmegiip.supabase.co"
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY", "")
ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

MAX_PAGES_PER_SESSION = 500
CRAWL_TIMEOUT = 15000  # ms
BATCH_LOG_INTERVAL = 25

LOG_FILE = os.path.join(os.path.dirname(__file__), "crawl4ai_enrichment_log.txt")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "crawl4ai_enrichment_output.txt")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger("kran-enrichment")

# ─── EXTRACTION PROMPT ────────────────────────────────────
EXTRACT_PROMPT = """Analysiere den Inhalt dieser Kranvermietungs-Firmenwebsite und extrahiere folgende Daten als JSON:

{
  "crane_types": [],
  "prices": [],
  "service_radius_km": null,
  "service_regions": [],
  "has_operator": null,
  "email": "",
  "opening_hours": "",
  "description": ""
}

Erlaubte Werte für crane_types:
- "Minikran", "Autokran", "Dachdeckerkran", "Raupenkran", "Anhängerkran", "Mobilkran", "Baukran", "Ladekran"
- Verwende NUR diese exakten Namen

Preise (prices):
- Array von {"crane_type": "...", "price_day_from": null, "price_day_to": null, "price_week_from": null, "price_week_to": null, "price_month_from": null, "price_month_to": null, "includes_operator": false, "note": ""}
- Preise in EUR, NETTO wenn möglich
- Wenn nur ein Preis genannt wird, setze ihn als _from UND _to
- "note" für Zusatzinfos wie "inkl. Transport", "ab 4h Mindestmietzeit" etc.

service_regions:
- Array von Städten/Regionen die beliefert werden, z.B. ["Berlin", "Brandenburg", "Potsdam"]
- Nur extrahieren wenn explizit auf der Website genannt

service_radius_km:
- Radius in km wenn explizit genannt, z.B. "Lieferung im Umkreis von 100km" → 100
- null wenn nicht genannt

has_operator:
- true wenn die Firma Kranführer/Bediener anbietet
- false wenn explizit "ohne Bediener" steht
- null wenn unklar

description:
- 2-3 Sätze über das Unternehmen, aus dem Website-Text zusammengefasst
- Auf Deutsch, sachlich, ohne Werbung

Gib NUR valides JSON zurück, keinen anderen Text.
Wenn eine Information nicht auf der Website steht, verwende null oder [].
Nicht raten — nur extrahieren was explizit steht."""

# ─── CRANE TYPE ID MAPPING ───────────────────────────────
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

# ─── CLIENTS ──────────────────────────────────────────────
sb = create_client(SUPABASE_URL, SUPABASE_KEY)
claude = anthropic.Anthropic(api_key=ANTHROPIC_KEY)


def get_companies_to_crawl(recrawl=False):
    """Fetch companies with website that need crawling."""
    all_companies = []
    offset = 0
    while True:
        q = (
            sb.table("companies")
            .select("id,name,website,city,state")
            .eq("is_active", True)
            .eq("is_relevant", True)
            .not_.is_("website", "null")
        )
        if not recrawl:
            q = q.eq("website_crawled", False)
        r = q.range(offset, offset + 999).execute()
        if not r.data:
            break
        all_companies.extend(r.data)
        offset += 1000
        if len(r.data) < 1000:
            break
    return all_companies


def extract_with_claude(markdown_text, company_name):
    """Send crawled text to Claude for structured extraction."""
    text = markdown_text[:8000] if markdown_text else ""
    if not text.strip():
        return None

    try:
        response = claude.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=1500,
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


def save_enrichment(company_id, company_name, data):
    """Save extracted data to Supabase."""
    now = datetime.utcnow().isoformat()

    if not data:
        sb.table("companies").update(
            {"website_crawled": True, "crawl_date": now}
        ).eq("id", company_id).execute()
        return

    # --- Update company fields ---
    update = {
        "website_crawled": True,
        "crawl_date": now,
    }

    if data.get("email"):
        update["email"] = data["email"]
    if data.get("service_radius_km"):
        update["service_radius_km"] = data["service_radius_km"]
    if data.get("service_regions"):
        update["service_regions"] = data["service_regions"]
    if data.get("opening_hours"):
        update["opening_hours"] = data["opening_hours"]
    if data.get("description"):
        update["description_enriched"] = data["description"]

    # Per-company prices (aggregate from all crane types)
    prices = data.get("prices", [])
    if prices:
        all_day_from = [p["price_day_from"] for p in prices if p.get("price_day_from")]
        all_day_to = [p["price_day_to"] for p in prices if p.get("price_day_to")]
        all_week_from = [p["price_week_from"] for p in prices if p.get("price_week_from")]
        all_week_to = [p["price_week_to"] for p in prices if p.get("price_week_to")]
        all_month_from = [p["price_month_from"] for p in prices if p.get("price_month_from")]
        all_month_to = [p["price_month_to"] for p in prices if p.get("price_month_to")]

        if all_day_from:
            update["price_day_from"] = min(all_day_from)
        if all_day_to:
            update["price_day_to"] = max(all_day_to)
        if all_week_from:
            update["price_week_from"] = min(all_week_from)
        if all_week_to:
            update["price_week_to"] = max(all_week_to)
        if all_month_from:
            update["price_month_from"] = min(all_month_from)
        if all_month_to:
            update["price_month_to"] = max(all_month_to)

        # Collect price notes
        notes = [p["note"] for p in prices if p.get("note")]
        if notes:
            update["price_note"] = "; ".join(notes)

    sb.table("companies").update(update).eq("id", company_id).execute()

    # --- Update company_cranes (crane types) ---
    valid_types = set(CRANE_TYPE_IDS.keys())
    for ct_name in data.get("crane_types", []):
        if ct_name not in valid_types:
            continue
        ct_id = CRANE_TYPE_IDS[ct_name]

        # Check has_operator per crane type from prices
        has_op = data.get("has_operator")
        for p in prices:
            if p.get("crane_type") == ct_name and p.get("includes_operator") is not None:
                has_op = p["includes_operator"]

        try:
            sb.table("company_cranes").upsert(
                {
                    "company_id": company_id,
                    "crane_type_id": ct_id,
                    "has_operator": has_op if has_op is not None else False,
                },
                on_conflict="company_id,crane_type_id",
            ).execute()
        except Exception as e:
            log.debug(f"  company_cranes upsert error for {company_name}/{ct_name}: {e}")

    # Write to output file
    with open(OUTPUT_FILE, "a", encoding="utf-8") as f:
        f.write(f"\n--- {company_name} ---\n")
        f.write(json.dumps(data, ensure_ascii=False, indent=2))
        f.write("\n")


async def crawl_company(crawler, company, config):
    """Crawl a single company website."""
    url = company["website"]
    if not url.startswith("http"):
        url = "https://" + url

    try:
        result = await crawler.arun(url=url, config=config)
        if result.success and result.markdown:
            return result.markdown.raw_markdown[:8000]
        return None
    except Exception as e:
        log.debug(f"  Crawl error {company['name']}: {e}")
        return None


async def main():
    parser = argparse.ArgumentParser(description="KranVergleich Crawl4AI Enrichment")
    parser.add_argument("--limit", type=int, default=MAX_PAGES_PER_SESSION, help="Max companies to crawl")
    parser.add_argument("--recrawl", action="store_true", help="Recrawl already crawled companies")
    args = parser.parse_args()

    companies = get_companies_to_crawl(recrawl=args.recrawl)
    total = len(companies)
    limit = min(args.limit, total)

    log.info(f"=== KRANVERGLEICH ENRICHMENT START ===")
    log.info(f"Companies to crawl: {total} (limit: {limit})")

    if total == 0:
        log.info("Nothing to crawl. Done.")
        return

    stats = {
        "crawled": 0,
        "failed": 0,
        "crane_types_found": 0,
        "prices_found": 0,
        "radius_found": 0,
        "regions_found": 0,
        "emails_found": 0,
        "descriptions_found": 0,
    }

    browser_config = BrowserConfig(headless=True, verbose=False)
    crawler_config = CrawlerRunConfig(
        page_timeout=CRAWL_TIMEOUT,
        wait_until="domcontentloaded",
    )

    async with AsyncWebCrawler(config=browser_config) as crawler:
        for i, company in enumerate(companies[:limit]):
            markdown = await crawl_company(crawler, company, crawler_config)

            if markdown:
                data = extract_with_claude(markdown, company["name"])
                save_enrichment(company["id"], company["name"], data)
                stats["crawled"] += 1

                if data:
                    if data.get("crane_types"):
                        stats["crane_types_found"] += 1
                    if data.get("prices"):
                        stats["prices_found"] += 1
                    if data.get("service_radius_km"):
                        stats["radius_found"] += 1
                    if data.get("service_regions"):
                        stats["regions_found"] += 1
                    if data.get("email"):
                        stats["emails_found"] += 1
                    if data.get("description"):
                        stats["descriptions_found"] += 1
            else:
                stats["failed"] += 1
                save_enrichment(company["id"], company["name"], None)

            if (i + 1) % BATCH_LOG_INTERVAL == 0:
                log.info(
                    f"  Progress: {i+1}/{limit} "
                    f"| OK: {stats['crawled']} | FAIL: {stats['failed']} "
                    f"| Prices: {stats['prices_found']} | Types: {stats['crane_types_found']}"
                )

            await asyncio.sleep(random.uniform(1.0, 2.5))

    log.info(f"""
=== KRANVERGLEICH ENRICHMENT REPORT ===
Total with website:     {total}
Crawled this session:   {stats['crawled']}
Failed (timeout/404):   {stats['failed']}
Crane types found:      {stats['crane_types_found']} firms
Prices found:           {stats['prices_found']} firms
Service radius found:   {stats['radius_found']} firms
Service regions found:  {stats['regions_found']} firms
Emails found:           {stats['emails_found']} firms
Descriptions found:     {stats['descriptions_found']} firms
========================================""")


if __name__ == "__main__":
    asyncio.run(main())
