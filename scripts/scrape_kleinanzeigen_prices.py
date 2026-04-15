#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Scrape Kleinanzeigen.de for crane rental offers to collect pricing data.

Phase 1: crawl a keyword-filtered listing page, extract title/price/zip/
seller name + link, save to CSV for manual review.

LEGAL NOTE: Kleinanzeigen ToS prohibits scraping. Use this only for
internal research at a low rate. Do not republish data verbatim. If you
plan to use this often, consider the official eBay Kleinanzeigen Partner
API or a paid scraping service.

Usage:
    python scrape_kleinanzeigen_prices.py                 # dry sample (3 pages)
    python scrape_kleinanzeigen_prices.py --pages 20      # 20 pages
    python scrape_kleinanzeigen_prices.py --query "kran mieten"

Output: scripts/kleinanzeigen_prices.csv
"""
import argparse
import csv
import re
import sys
import time
import random
from urllib.parse import quote_plus
from pathlib import Path

import requests
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding="utf-8")

BASE = "https://www.kleinanzeigen.de"
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
)
HEADERS = {
    "User-Agent": UA,
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "de-DE,de;q=0.9,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
}

# Keyword → listing URL. Kleinanzeigen supports /s-<query>/k0 for full-text.
def listing_url(query: str, page: int = 1) -> str:
    slug = quote_plus(query.lower().replace(" ", "-"))
    if page == 1:
        return f"{BASE}/s-{slug}/k0"
    return f"{BASE}/s-seite:{page}/{slug}/k0"


PRICE_RE = re.compile(r"(\d[\d\.]*)\s*€")
ZIP_RE = re.compile(r"\b(\d{5})\b")


def parse_listing_page(html: str) -> list[dict]:
    """Extract one record per ad from a Kleinanzeigen search page."""
    soup = BeautifulSoup(html, "html.parser")
    out = []
    for art in soup.select("article.aditem"):
        ad_id = art.get("data-adid", "")
        a = art.select_one("a.ellipsis")
        if not a:
            continue
        title = a.get_text(strip=True)
        href = a.get("href", "")
        if href.startswith("/"):
            href = BASE + href

        price_el = art.select_one("p.aditem-main--middle--price-shipping--price, .aditem-main--middle--price")
        price_text = price_el.get_text(" ", strip=True) if price_el else ""
        price_match = PRICE_RE.search(price_text)
        price_eur = int(price_match.group(1).replace(".", "")) if price_match else None

        loc_el = art.select_one(".aditem-main--top--left")
        loc_text = loc_el.get_text(" ", strip=True) if loc_el else ""
        zip_match = ZIP_RE.search(loc_text)
        plz = zip_match.group(1) if zip_match else ""
        city = re.sub(r"\d{5}", "", loc_text).strip(" ,–-")

        desc_el = art.select_one("p.aditem-main--middle--description")
        desc = desc_el.get_text(" ", strip=True)[:400] if desc_el else ""

        # Pro/business indicator (firm vs private seller)
        is_pro = bool(art.select_one(".icon-feature-commercial, .badge-hint-pro-small"))

        out.append({
            "ad_id": ad_id,
            "title": title,
            "url": href,
            "price_eur": price_eur,
            "price_raw": price_text,
            "plz": plz,
            "city": city,
            "description": desc,
            "is_pro": is_pro,
        })
    return out


# Ads whose title/description contains any of these words are NOT crane rental
# offers (they're office/warehouse real-estate listings that happen to mention
# "Kran"). Titles are lower-cased before matching.
BLACKLIST = [
    "kranhaus", "büro", "buero", "coworking", "arbeitsplatz", "arbeitsplätze",
    "mitgliedschaft", "regus", "signature",
    "halle", "lager", "produktion", "kranbahn", "kranhalle",
    "gewerbefläche", "gewerbeflaeche", "gewerberaum", "bürofläche", "buerofläche",
    "virtuelles", "meetingraum", "tagungsraum", "konferenzraum",
    "wohnung", "apartment",
]


def is_crane_rental(ad: dict) -> bool:
    haystack = (ad["title"] + " " + ad["description"]).lower()
    return not any(w in haystack for w in BLACKLIST)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--queries", default="kran mieten,kranvermietung,baukran mieten,autokran mieten,minikran mieten,mobilkran mieten",
                       help="comma-separated search keywords")
    parser.add_argument("--pages", type=int, default=3, help="pages per query")
    parser.add_argument("--out", default="scripts/kleinanzeigen_prices.csv")
    parser.add_argument("--pro-only", action="store_true", help="keep only commercial/pro sellers")
    parser.add_argument("--no-filter", action="store_true", help="skip real-estate blacklist")
    args = parser.parse_args()
    queries = [q.strip() for q in args.queries.split(",") if q.strip()]

    all_rows: list[dict] = []
    session = requests.Session()
    session.headers.update(HEADERS)

    for q in queries:
        print(f"\n=== query: {q!r} ===")
        for page in range(1, args.pages + 1):
            url = listing_url(q, page)
            print(f"[{page}/{args.pages}] GET {url}")
            try:
                r = session.get(url, timeout=20)
            except Exception as e:
                print(f"    ERROR: {e}")
                continue
            if r.status_code != 200:
                print(f"    HTTP {r.status_code} — stopping this query (possible rate-limit)")
                break
            rows = parse_listing_page(r.text)
            if not rows:
                print(f"    no ads parsed — layout may have changed")
                break
            if args.pro_only:
                rows = [x for x in rows if x["is_pro"]]
            if not args.no_filter:
                before = len(rows)
                rows = [x for x in rows if is_crane_rental(x)]
                if before != len(rows):
                    print(f"    filtered out {before - len(rows)} real-estate ads")
            all_rows.extend(rows)
            print(f"    +{len(rows)} ads (running total {len(all_rows)})")
            time.sleep(random.uniform(3.0, 5.5))

    # Dedup by ad_id
    seen: set[str] = set()
    dedup: list[dict] = []
    for r in all_rows:
        if r["ad_id"] in seen:
            continue
        seen.add(r["ad_id"])
        dedup.append(r)

    out_path = Path(__file__).parent.parent / args.out
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "ad_id", "is_pro", "price_eur", "price_raw",
            "plz", "city", "title", "description", "url",
        ])
        writer.writeheader()
        writer.writerows(dedup)

    with_price = sum(1 for x in dedup if x["price_eur"])
    pro_count = sum(1 for x in dedup if x["is_pro"])
    print(f"\n✅ Saved {len(dedup)} unique ads to {out_path}")
    print(f"   with numeric price : {with_price}")
    print(f"   commercial/pro     : {pro_count}")

    if dedup:
        print("\nSample (first 5):")
        for x in dedup[:5]:
            tag = "PRO" if x["is_pro"] else "priv"
            price = f"{x['price_eur']}€" if x["price_eur"] else x["price_raw"] or "—"
            print(f"  [{tag}] {price:10s} | {x['plz']} {x['city'][:20]:20s} | {x['title'][:60]}")


if __name__ == "__main__":
    main()
