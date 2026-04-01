"""
Enrichment script: Crawl company websites and extract structured data via Claude API.

Usage:
  python scripts/enrich_companies.py --dry-run          # Show what would be crawled (no API calls)
  python scripts/enrich_companies.py --limit 5          # Process first 5 companies only (for testing)
  python scripts/enrich_companies.py --start-from 100   # Resume from company #100
  python scripts/enrich_companies.py                    # Process all 733 companies

Output: scripts/enrichment_results.csv
"""

import asyncio
import csv
import json
import os
import sys
import time
from pathlib import Path

# ── Dependencies ──────────────────────────────────────────────
try:
    from crawl4ai import AsyncWebCrawler, CrawlerRunConfig
    from anthropic import Anthropic
    from supabase import create_client
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("Install with: pip install crawl4ai anthropic supabase --break-system-packages")
    sys.exit(1)

# ── Config ────────────────────────────────────────────────────
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / ".env.local")

SUPABASE_URL = os.environ["NEXT_PUBLIC_SUPABASE_URL"]
SUPABASE_KEY = os.environ["NEXT_PUBLIC_SUPABASE_ANON_KEY"]
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

CSV_PATH = Path(__file__).parent / "enrichment_results.csv"
RATE_LIMIT_DELAY = 0.5  # seconds between requests
MAX_RETRIES = 2
CRAWL_TIMEOUT = 15  # seconds per page

CRANE_TYPE_MAP = {
    "minikran": "1a7019bd-7fd3-401a-8713-7f6be6fbd827",
    "autokran": "ab511eea-d464-47b9-8ada-16931dab5078",
    "dachdeckerkran": "99e6ce74-f707-494e-afc8-31627b3bf41d",
    "raupenkran": "0b61b867-53a6-4cf9-afbb-50c610dc4a2a",
    "anhaengerkran": "ef7ed422-402e-4553-9c01-661df28c66fc",
    "mobilkran": "02dc05de-6699-4849-93fb-2b655177bfd9",
    "baukran": "f1f86ce7-14b8-48ce-9004-5db8dde53949",
    "ladekran": "a556dcad-e379-4ac3-8d72-6eed094900d1",
}

EXTRACTION_PROMPT = """Analysiere diese Webseite eines Kranvermieters. Extrahiere folgende Informationen als JSON:
{
  "crane_types": ["minikran", "autokran", ...],
  "price_day_min": null,
  "price_day_max": null,
  "service_area": "",
  "opening_hours": "",
  "description": ""
}

Regeln:
- Nur Informationen extrahieren die EXPLIZIT auf der Seite stehen
- Keine Annahmen oder Vermutungen
- Wenn Information nicht vorhanden: null oder leeren String
- crane_types: nur aus dieser Liste wählen: minikran, autokran, dachdeckerkran, raupenkran, anhaengerkran, mobilkran, baukran, ladekran
- Preise nur in EUR, nur Zahlen
- description: 2-3 Sätze auf Deutsch über die Firma

Antworte NUR mit dem JSON-Objekt, kein anderer Text."""


# ── Supabase ──────────────────────────────────────────────────
def get_companies():
    """Fetch all relevant companies with a website."""
    sb = create_client(SUPABASE_URL, SUPABASE_KEY)
    data = (
        sb.table("companies")
        .select("id, name, website, city, state")
        .eq("is_relevant", True)
        .eq("is_active", True)
        .not_.is_("website", "null")
        .neq("website", "")
        .order("name")
        .execute()
    )
    return data.data


# ── Crawl ─────────────────────────────────────────────────────
async def crawl_website(crawler, url: str) -> str | None:
    """Crawl a single URL, return markdown text or None on failure."""
    try:
        config = CrawlerRunConfig(
            word_count_threshold=50,
            excluded_tags=["nav", "footer", "header", "script", "style"],
            page_timeout=CRAWL_TIMEOUT * 1000,
        )
        result = await crawler.arun(url=url, config=config)
        if result.success and result.markdown:
            # Truncate to ~4000 chars to keep Claude API costs low
            raw = result.markdown.raw_markdown if hasattr(result.markdown, 'raw_markdown') else str(result.markdown)
            return raw[:4000]
        return None
    except Exception as e:
        print(f"  Crawl error: {e}")
        return None


# ── Claude API ────────────────────────────────────────────────
def extract_with_claude(client: Anthropic, company_name: str, website_text: str) -> dict | None:
    """Send website text to Claude API and extract structured data."""
    try:
        response = client.messages.create(
            model="claude-haiku-4-5-20251001",
            max_tokens=500,
            messages=[
                {
                    "role": "user",
                    "content": f"Firma: {company_name}\nWebsite-Inhalt:\n\n{website_text}\n\n{EXTRACTION_PROMPT}",
                }
            ],
        )
        text = response.content[0].text.strip()
        # Parse JSON from response (handle markdown code blocks)
        if text.startswith("```"):
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        return json.loads(text)
    except json.JSONDecodeError:
        print(f"  JSON parse error for {company_name}")
        return None
    except Exception as e:
        print(f"  Claude API error: {e}")
        return None


# ── CSV logging ───────────────────────────────────────────────
def init_csv():
    """Create CSV with headers if it doesn't exist."""
    if not CSV_PATH.exists():
        with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "company_id", "name", "website", "city", "state",
                "crane_types", "price_day_min", "price_day_max",
                "service_area", "opening_hours", "description",
                "crawl_status", "error",
            ])


def append_csv(row: dict):
    """Append a single result row to CSV."""
    with open(CSV_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([
            row.get("company_id", ""),
            row.get("name", ""),
            row.get("website", ""),
            row.get("city", ""),
            row.get("state", ""),
            row.get("crane_types", ""),
            row.get("price_day_min", ""),
            row.get("price_day_max", ""),
            row.get("service_area", ""),
            row.get("opening_hours", ""),
            row.get("description", ""),
            row.get("crawl_status", ""),
            row.get("error", ""),
        ])


# ── Main ──────────────────────────────────────────────────────
async def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="Show companies, don't crawl")
    parser.add_argument("--limit", type=int, default=0, help="Process only N companies")
    parser.add_argument("--start-from", type=int, default=0, help="Skip first N companies")
    args = parser.parse_args()

    companies = get_companies()
    print(f"Total companies with website: {len(companies)}")

    if args.start_from:
        companies = companies[args.start_from:]
        print(f"Starting from #{args.start_from}, remaining: {len(companies)}")

    if args.limit:
        companies = companies[:args.limit]
        print(f"Limited to: {len(companies)}")

    if args.dry_run:
        print("\n--- DRY RUN ---")
        for i, c in enumerate(companies):
            print(f"  {i+1}. {c['name']} → {c['website']}")
        print(f"\nTotal: {len(companies)} companies to crawl")
        print(f"Estimated Claude API calls: {len(companies)} (Haiku)")
        print(f"Estimated cost: ~${len(companies) * 0.001:.2f}")
        return

    if not ANTHROPIC_API_KEY:
        print("ERROR: ANTHROPIC_API_KEY not set in .env.local")
        print("Add: ANTHROPIC_API_KEY=sk-ant-...")
        sys.exit(1)

    init_csv()
    client = Anthropic(api_key=ANTHROPIC_API_KEY)

    success = 0
    failed = 0
    no_data = 0

    async with AsyncWebCrawler() as crawler:
        for i, company in enumerate(companies):
            idx = args.start_from + i + 1
            print(f"[{idx}/{args.start_from + len(companies)}] {company['name']} → {company['website']}")

            row = {
                "company_id": company["id"],
                "name": company["name"],
                "website": company["website"],
                "city": company["city"],
                "state": company["state"],
            }

            # Crawl
            text = None
            for attempt in range(MAX_RETRIES + 1):
                text = await crawl_website(crawler, company["website"])
                if text:
                    break
                if attempt < MAX_RETRIES:
                    print(f"  Retry {attempt + 1}...")
                    await asyncio.sleep(1)

            if not text:
                row["crawl_status"] = "crawl_failed"
                row["error"] = "Could not fetch website"
                append_csv(row)
                failed += 1
                print(f"  ✗ Crawl failed")
                continue

            # Extract with Claude
            result = extract_with_claude(client, company["name"], text)

            if not result:
                row["crawl_status"] = "extract_failed"
                row["error"] = "Claude extraction failed"
                append_csv(row)
                failed += 1
                print(f"  ✗ Extraction failed")
                continue

            row["crane_types"] = ",".join(result.get("crane_types", []))
            row["price_day_min"] = result.get("price_day_min") or ""
            row["price_day_max"] = result.get("price_day_max") or ""
            row["service_area"] = result.get("service_area", "")
            row["opening_hours"] = result.get("opening_hours", "")
            row["description"] = result.get("description", "")
            row["crawl_status"] = "ok"

            if row["crane_types"]:
                success += 1
                print(f"  ✓ {row['crane_types']}")
            else:
                no_data += 1
                print(f"  ~ No crane types found")

            append_csv(row)

            # Rate limiting
            await asyncio.sleep(RATE_LIMIT_DELAY)

    print(f"\n{'='*50}")
    print(f"Done! Results saved to {CSV_PATH}")
    print(f"  Success (with crane types): {success}")
    print(f"  No crane types found: {no_data}")
    print(f"  Failed: {failed}")
    print(f"  Total: {success + no_data + failed}")


if __name__ == "__main__":
    asyncio.run(main())
