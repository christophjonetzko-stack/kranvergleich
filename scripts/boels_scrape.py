#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Boels Verleih — Branch scraper & seoCities matcher.

Reads branch URLs from sitemap, filters by seoCities, scrapes JSON-LD + data-qa
fields, and outputs JSON with candidate inserts for manual review.

Usage:
  python boels_scrape.py              # scrape + output candidates.json
  python boels_scrape.py --all        # scrape all branches, not just seoCities
"""
import argparse
import html as html_mod
import json
import os
import re
import sys
import time
import urllib.request

sys.stdout.reconfigure(encoding="utf-8")

# ─── seoCities (from src/data/cities-static.ts) ───────────
# slug → (display name, state)
SEO_CITIES = {
    "berlin": ("Berlin", "Berlin"),
    "hamburg": ("Hamburg", "Hamburg"),
    "duesseldorf": ("Düsseldorf", "Nordrhein-Westfalen"),
    "koeln": ("Köln", "Nordrhein-Westfalen"),
    "dortmund": ("Dortmund", "Nordrhein-Westfalen"),
    "leipzig": ("Leipzig", "Sachsen"),
    "bremen": ("Bremen", "Bremen"),
    "mannheim": ("Mannheim", "Baden-Württemberg"),
    "hannover": ("Hannover", "Niedersachsen"),
    "potsdam": ("Potsdam", "Brandenburg"),
    "karlsruhe": ("Karlsruhe", "Baden-Württemberg"),
    "nuernberg": ("Nürnberg", "Bayern"),
    "stuttgart": ("Stuttgart", "Baden-Württemberg"),
    "brandenburg": ("Brandenburg", "Brandenburg"),
    "augsburg": ("Augsburg", "Bayern"),
    "braunschweig": ("Braunschweig", "Niedersachsen"),
    "frankfurt-am-main": ("Frankfurt am Main", "Hessen"),
    "essen": ("Essen", "Nordrhein-Westfalen"),
    "oranienburg": ("Oranienburg", "Brandenburg"),
    "muenchen": ("München", "Bayern"),
    "fredersdorf-vogelsdorf": ("Fredersdorf-Vogelsdorf", "Brandenburg"),
    "moenchengladbach": ("Mönchengladbach", "Nordrhein-Westfalen"),
    "krefeld": ("Krefeld", "Nordrhein-Westfalen"),
    "blankenfelde-mahlow": ("Blankenfelde-Mahlow", "Brandenburg"),
    "duisburg": ("Duisburg", "Nordrhein-Westfalen"),
    "crailsheim": ("Crailsheim", "Baden-Württemberg"),
    "cottbus": ("Cottbus", "Brandenburg"),
    "ludwigsfelde": ("Ludwigsfelde", "Brandenburg"),
    "ingolstadt": ("Ingolstadt", "Bayern"),
    "dresden": ("Dresden", "Sachsen"),
    "herne": ("Herne", "Nordrhein-Westfalen"),
    "hildesheim": ("Hildesheim", "Niedersachsen"),
    "luebeck": ("Lübeck", "Schleswig-Holstein"),
    "neubrandenburg": ("Neubrandenburg", "Mecklenburg-Vorpommern"),
    "muenster": ("Münster", "Nordrhein-Westfalen"),
    "lueneburg": ("Lüneburg", "Niedersachsen"),
    "ruedersdorf": ("Rüdersdorf", "Brandenburg"),
    "schwedt": ("Schwedt", "Brandenburg"),
    "ulm": ("Ulm", "Baden-Württemberg"),
    "wiesbaden": ("Wiesbaden", "Hessen"),
    "wuppertal": ("Wuppertal", "Nordrhein-Westfalen"),
}

# Cities where Boels is already in DB — skip insertion (but allow adding
# additional depots if explicitly requested later)
ALREADY_PRESENT = {
    "berlin",
    "leipzig",
    "dresden",
    "neubrandenburg",
    "oranienburg",
}

SITEMAP_URL = "https://www.boels.com/DE_DE_contentsitemap.xml"
UA = "Mozilla/5.0 (compatible; kranvergleich-scraper/1.0)"

# Aliases: Boels URL prefix → canonical seoCity slug.
# Used when Boels city names don't match our seoCity slugs verbatim.
URL_ALIASES = {
    "frankfurt": "frankfurt-am-main",
}

# Skip depots whose URL contains any of these markers — they are either
# central project logistics, non-crane equipment, or duplicated city entries.
EXCLUDE_URL_MARKERS = (
    "baulog-projekten",   # large-project logistics, not retail rental
    "portable-kitchens",  # portable toilets / catering
    "bauaufzuege",        # construction lifts / scaffolding
)


def http_get(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as resp:
        return resp.read().decode("utf-8", errors="replace")


def extract_branch_urls() -> list[str]:
    xml = http_get(SITEMAP_URL)
    urls = re.findall(
        r"https://www\.boels\.com/de-de/branches/[a-z-]+/[a-z0-9-]+", xml
    )
    return sorted(set(urls))


def city_slug_from_branch(url: str) -> str:
    """Extract last path segment → strip Boels-specific suffixes → base city slug.
    E.g. 'muenchen-feldkirchen' → 'muenchen', 'koeln-frechen' → 'koeln'.
    Falls back to URL alias map for mismatched names (frankfurt → frankfurt-am-main).
    """
    tail = url.rsplit("/", 1)[-1]
    # Try matching each seoCity slug as prefix (longest first)
    for slug in sorted(SEO_CITIES.keys(), key=len, reverse=True):
        if tail == slug or tail.startswith(slug + "-"):
            return slug
    # Try alias prefixes (e.g. frankfurt-* → frankfurt-am-main)
    for alias, canonical in URL_ALIASES.items():
        if tail == alias or tail.startswith(alias + "-"):
            return canonical
    return tail  # not matched


def parse_branch(html: str) -> dict:
    data = {}
    hours_by_day: dict[str, tuple[str, str]] = {}

    # JSON-LD objects
    for m in re.finditer(r'\{[^{}]*"@type":"([^"]+)"[^{}]*\}', html):
        block = m.group(0)
        typ = m.group(1)
        if typ == "PostalAddress":
            data["street"] = _decode(_json_field(block, "streetAddress"))
            data["city"] = _decode(_json_field(block, "addressLocality"))
            data["zip"] = _json_field(block, "postalCode")
        elif typ == "GeoCoordinates":
            lat = _json_field(block, "latitude")
            lng = _json_field(block, "longitude")
            try:
                data["lat"] = float(lat) if lat else None
                data["lng"] = float(lng) if lng else None
            except ValueError:
                pass
        elif typ == "OpeningHoursSpecification":
            opens = _json_field(block, "opens")
            closes = _json_field(block, "closes")
            day_url = _json_field(block, "dayOfWeek")
            if day_url:
                day = day_url.rsplit("/", 1)[-1]  # e.g. 'Monday'
                hours_by_day[day] = (opens or "", closes or "")

    if hours_by_day:
        data["opening_hours"] = _format_hours(hours_by_day)

    # Depot-specific phone and email from data-qa attributes
    m = re.search(
        r'data-qa="store-details-value-phone"[^>]*>\s*([+0-9()\s\-/]+)', html
    )
    if m:
        data["phone"] = re.sub(r"\s+", " ", m.group(1)).strip()

    m = re.search(
        r'data-qa="store-details-value-email"[^>]*>\s*([A-Za-z0-9._%+-]+@boels\.de)',
        html,
    )
    if m:
        data["email"] = m.group(1).lower()

    # Branch name heading
    m = re.search(r"<h1[^>]*>([^<]+)</h1>", html)
    if m:
        data["heading"] = _decode(m.group(1).strip())

    return data


def _json_field(block: str, field: str):
    m = re.search(rf'"{field}":"?([^",}}]+)"?', block)
    return m.group(1) if m else None


def _decode(s):
    return html_mod.unescape(s) if isinstance(s, str) else s


# Day order and German short names
_DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
_DAY_DE = {
    "Monday": "Mo",
    "Tuesday": "Di",
    "Wednesday": "Mi",
    "Thursday": "Do",
    "Friday": "Fr",
    "Saturday": "Sa",
    "Sunday": "So",
}


def _format_hours(hours: dict[str, tuple[str, str]]) -> str:
    """Format opening hours as 'Mo-Fr 7:00-16:30 | Sa 8:00-12:30 | So geschlossen'.
    Groups consecutive days with identical open/close into ranges.
    A day with opens='00:00' and closes='00:00' is treated as 'geschlossen'.
    """
    def is_closed(t: tuple[str, str]) -> bool:
        o, c = t
        return (not o) or (not c) or (o == "00:00" and c == "00:00")

    # Build per-day normalized values in Mon→Sun order
    days = []
    for d in _DAY_ORDER:
        days.append((d, hours.get(d, ("", ""))))

    # Group consecutive days with identical hours
    groups = []
    i = 0
    while i < len(days):
        j = i
        while j + 1 < len(days) and days[j + 1][1] == days[i][1]:
            j += 1
        groups.append((days[i : j + 1], days[i][1]))
        i = j + 1

    parts = []
    for group, val in groups:
        first = _DAY_DE[group[0][0]]
        last = _DAY_DE[group[-1][0]]
        label = first if first == last else f"{first}-{last}"
        if is_closed(val):
            parts.append(f"{label} geschlossen")
        else:
            o, c = val
            # Strip leading zero from hours (08:00 → 8:00) for consistency with existing rows
            o = o.lstrip("0") or "0:00"
            c = c.lstrip("0") or "0:00"
            if o.startswith(":"):
                o = "0" + o
            if c.startswith(":"):
                c = "0" + c
            parts.append(f"{label} {o}-{c}")

    return " | ".join(parts)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true", help="scrape all branches, not only seoCities")
    ap.add_argument("--out", default="boels_candidates.json")
    args = ap.parse_args()

    print("Fetching sitemap...")
    urls = extract_branch_urls()
    print(f"Found {len(urls)} branch URLs")

    if not args.all:
        # Drop URLs marked as excluded (project logistics, portable kitchens, lifts)
        urls = [u for u in urls if not any(m in u for m in EXCLUDE_URL_MARKERS)]
        # Filter to URLs whose derived city slug matches a seoCity (skip already-present)
        urls = [
            u
            for u in urls
            if city_slug_from_branch(u) in SEO_CITIES
            and city_slug_from_branch(u) not in ALREADY_PRESENT
        ]
        print(f"After seoCities filter (excluding already-present): {len(urls)} URLs")

    candidates: list[dict] = []
    for i, url in enumerate(urls, 1):
        city_slug = city_slug_from_branch(url)
        print(f"[{i}/{len(urls)}] {url} → city={city_slug}")
        try:
            html = http_get(url)
            parsed = parse_branch(html)
            parsed["url"] = url
            parsed["seo_city_slug"] = city_slug
            if city_slug in SEO_CITIES:
                name, state = SEO_CITIES[city_slug]
                parsed["seo_city_name"] = name
                parsed["seo_city_state"] = state
            candidates.append(parsed)
            time.sleep(0.6)  # polite crawl delay
        except Exception as e:
            print(f"  ERROR: {e}")

    out_path = os.path.join(os.path.dirname(__file__), args.out)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(candidates, f, ensure_ascii=False, indent=2)
    print(f"\nWrote {len(candidates)} candidates → {out_path}")

    # Summary by city
    by_city: dict[str, int] = {}
    for c in candidates:
        by_city[c.get("seo_city_slug", "?")] = by_city.get(c.get("seo_city_slug", "?"), 0) + 1
    print("\nMatched branches per seoCity:")
    for slug, n in sorted(by_city.items(), key=lambda x: -x[1]):
        print(f"  {slug}: {n}")


if __name__ == "__main__":
    main()
