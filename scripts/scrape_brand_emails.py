#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Scrape brand websites for a central email, then propagate it to all '???'
branches of that brand.

Targets 4 brand clusters from analyze_skipped.py:
  - Kranlogistik Lausitz  (kranlogistik-lausitz.de)
  - Kranlogistik Sachsen  (kranlogistik.de)
  - MaxiMum               (maximum-krane.de)
  - Felbermayr            (felbermayr.cc)

For each: fetch /, /kontakt, /impressum → regex-extract generic emails →
pick the best one (info@, kontakt@, vermietung@ preferred over personal names)
→ report + propagate to all matching rows when --commit.
"""
import argparse
import html as html_mod
import os
import re
import sys
import urllib.request
from collections import OrderedDict

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

UA = "Mozilla/5.0 (compatible; kranvergleich-scraper/1.0)"

# ─── Brand config ────────────────────────────────────────
# Each entry: name_pattern (ILIKE), base_url, expected_domain
BRANDS = [
    {
        "label": "Kranlogistik Lausitz",
        "name_pat": "%lausitz%",
        "base": "https://www.kranlogistik-lausitz.de",
        "expected_domain": "kranlogistik-lausitz.de",
    },
    {
        "label": "Kranlogistik Sachsen",
        "name_pat": "Kranlogistik Sachsen%",
        "base": "http://www.kranlogistik.de",
        "expected_domain": "kranlogistik.de",
    },
    {
        "label": "MaxiMum",
        "name_pat": "MaxiMum%Schwerlast%",
        "base": "http://www.maximum-krane.de",
        "expected_domain": "maximum-krane.de",
    },
    {
        "label": "Felbermayr Deutschland",
        "name_pat": "%Felbermayr%",
        "base": "https://www.felbermayr.cc",
        "expected_domain": "felbermayr.cc",
    },
]

PATHS = ["/", "/kontakt", "/kontakt/", "/impressum", "/impressum/"]

# Generic prefixes ranked best→worst (best = highest priority for selection)
PREFIX_RANK = [
    "info",
    "kontakt",
    "vermietung",
    "kran",
    "dispo",
    "service",
    "anfrage",
    "office",
    "mail",
    "post",
    "buero",
    "zentrale",
    "contact",
]


def http_get(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            raw = resp.read()
            # Try UTF-8 first, fall back to latin-1 for old sites
            try:
                return raw.decode("utf-8")
            except UnicodeDecodeError:
                return raw.decode("latin-1", errors="replace")
    except Exception as e:
        return f""


EMAIL_RE = re.compile(r"[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}")


def extract_emails(html: str) -> list[str]:
    # Decode HTML entities (e.g. &#64; for @) and mailto links
    decoded = html_mod.unescape(html)
    # Also unwrap common obfuscations like "at" and "(at)"
    # Keep it conservative: only plain regex matches
    raw = EMAIL_RE.findall(decoded)
    # Deduplicate preserving order
    seen = OrderedDict()
    for e in raw:
        e = e.lower().rstrip(".,;:")
        if e not in seen:
            seen[e] = None
    return list(seen.keys())


def pick_best_email(emails: list[str], expected_domain: str) -> str | None:
    """Prefer emails on the expected domain, then generic prefixes, then any."""
    # Filter by domain
    domain_matches = [e for e in emails if e.endswith("@" + expected_domain) or e.endswith("." + expected_domain)]
    pool = domain_matches if domain_matches else emails

    # Rank by prefix
    def rank(e: str) -> tuple:
        prefix = e.split("@", 1)[0]
        if prefix in PREFIX_RANK:
            return (PREFIX_RANK.index(prefix), e)
        return (999, e)

    if not pool:
        return None

    pool_sorted = sorted(pool, key=rank)
    return pool_sorted[0]


def scrape_brand(brand: dict) -> tuple[str | None, list[str]]:
    """Return (best_email, all_found_emails) by crawling paths under brand base URL."""
    all_emails: list[str] = []
    for path in PATHS:
        url = brand["base"].rstrip("/") + path
        html = http_get(url)
        if html:
            for e in extract_emails(html):
                if e not in all_emails:
                    all_emails.append(e)
    best = pick_best_email(all_emails, brand["expected_domain"])
    return best, all_emails


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    args = ap.parse_args()
    dry = not args.commit

    print(f"=== scrape_brand_emails — {'DRY-RUN' if dry else 'COMMIT'} ===\n")

    total_updates = 0
    total_updated = 0

    for brand in BRANDS:
        print(f"\n── {brand['label']} ({brand['base']}) ──")
        best, all_emails = scrape_brand(brand)
        if all_emails:
            print(f"  Found emails ({len(all_emails)}): {all_emails[:8]}")
        else:
            print(f"  No emails found on brand site")
        if not best:
            print(f"  SKIP — no suitable email")
            continue
        print(f"  Best email: {best}")

        # Fetch all rows for this brand
        rows = sb.table("companies").select(
            "id,name,city,email"
        ).ilike("name", brand["name_pat"]).execute().data
        if not rows:
            print(f"  No DB rows match '{brand['name_pat']}'")
            continue

        for r in rows:
            cur = r.get("email") or ""
            # Only overwrite '???' or empty/NULL — never replace a real email we already have
            if cur and cur not in ("???", "?", "-"):
                # Normalize and skip if already the same
                if cur.lower() == best:
                    print(f"    SKIP [{r['city']:15}] {r['name'][:35]:35} already has {best}")
                    continue
                print(f"    SKIP [{r['city']:15}] {r['name'][:35]:35} already has real email {cur!r}, not touching")
                continue

            total_updates += 1
            print(f"    {'WOULD SET' if dry else 'UPDATE   '} [{r['city']:15}] {r['name'][:35]:35} | {cur!r:10} → {best}")
            if not dry:
                sb.table("companies").update({"email": best}).eq("id", r["id"]).execute()
                total_updated += 1

    print(f"\n=== Summary ===")
    print(f"Planned/actual updates: {total_updates}")
    if not dry:
        print(f"Actually updated:       {total_updated}")


if __name__ == "__main__":
    main()
