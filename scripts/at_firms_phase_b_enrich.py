#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Phase B enrichment for the 20 AT firms inserted in Step 4.

For each AT firm with a website:
  1. Fetch /robots.txt; skip if disallowed
  2. Fetch homepage + try /impressum + /kontakt for richer text corpus
  3. Extract email (regex + generic-domain filter)
  4. Detect crane_types by keyword match against the catalog's 8 types
  5. Build UPDATE companies + INSERT company_cranes proposals

Default dry-run; --commit applies. Uses requests + BeautifulSoup (no external
service cost). Sets a transparent User-Agent so site owners can identify the
crawler.

Phase B scope (intentionally narrow):
  - email   (regex extraction)
  - crane_types  (keyword detection — Autokran/Mobilkran/Minikran/...)

Deferred to Phase C:
  - opening_hours  (parse heterogeneity high)
  - service_radius_km  (regex would need many variants)
  - Impressum FN/ATU  (only matters at consumer trust layer, not page render)

Legal: catalog enrichment from a firm's OWN website. Lawful basis Art. 6(1)(f)
DSGVO. robots.txt is honored. No outreach phase here, so §107 TKG-AT does not
apply yet. Hard-block list (kleinanzeigen/willhaben/Herold/Firmenbuch) — none
of these 20 firms are on it.
"""
import argparse
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.robotparser import RobotFileParser

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

import requests
from bs4 import BeautifulSoup
from supabase import create_client

OUTPUT = Path(__file__).parent / "at_firms_phase_b_proposal.json"

USER_AGENT = "kranvergleich.de bot (catalog enrichment; impressum@kranvergleich.de)"
HEADERS = {"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"}
TIMEOUT_SEC = 10
SUB_PATHS_TO_TRY = ["/impressum", "/kontakt", "/contact", "/kontakte"]

# Email validation borrowed from outscraper_email_enrichment.py pattern.
EMAIL_RE = re.compile(r"[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,10}")
GENERIC_PROVIDERS = {"example.com", "sentry.io", "wixpress.com", "googleapis.com",
                     "w3.org", "schema.org", "google.com", "facebook.com",
                     "twitter.com", "linkedin.com", "instagram.com", "youtube.com"}

# Manual override: known firms whose websites are JS-heavy / behind cookie walls
# such that simple crawl + keyword detection misses their actual fleet. These
# are industry-known offerings; the override is UNIONED with whatever the
# automated detection returns. Slug prefix match — applies to all branches.
KNOWN_FIRM_TYPES_BY_SLUG_PREFIX: dict[str, list[str]] = {
    # Felbermayr Transport- und Hebetechnik — flagship of AT heavy-crane industry.
    # Each branch operates the full heavy fleet plus baukran (Turmdrehkran).
    "felbermayr": ["autokran-mieten", "mobilkran-mieten", "baukran-mieten"],
    # Boels Maschinenverleih — same pattern as kranvergleich.de DE Boels: Minikran-only
    # rental from a self-service depot. Confirmed by their kranvergleich.de catalog row.
    "boels": ["minikran-mieten"],
    # Prangl — second AT heavy-crane group, full fleet. Auto + Mobil + Baukran +
    # Raupen for special lifts + Ladekran for everyday loading work.
    "prangl": ["autokran-mieten", "mobilkran-mieten", "baukran-mieten",
               "raupenkran-mieten", "ladekran-mieten"],
}


def apply_manual_override(slug: str, detected: list[str]) -> list[str]:
    out = list(detected)
    seen = set(detected)
    for prefix, override_slugs in KNOWN_FIRM_TYPES_BY_SLUG_PREFIX.items():
        if slug.startswith(prefix):
            for s in override_slugs:
                if s not in seen:
                    out.append(s)
                    seen.add(s)
            break
    return out


# Crane-type keyword → catalog slug. Match against page text (case-insensitive).
# Order matters: more specific patterns first, since "kran" alone is too broad.
CRANE_KEYWORDS = [
    ("dachdeckerkran",        "dachdeckerkran-mieten"),
    ("anhängerkran",          "anhaengerkran-mieten"),
    ("anhaengerkran",         "anhaengerkran-mieten"),
    ("turmdrehkran",          "baukran-mieten"),
    ("schnellbaukran",        "baukran-mieten"),
    ("baukran",               "baukran-mieten"),
    ("raupenkran",            "raupenkran-mieten"),
    ("ladekran",              "ladekran-mieten"),
    ("lkw-kran",              "ladekran-mieten"),
    ("minikran",              "minikran-mieten"),
    ("kompaktkran",           "minikran-mieten"),
    ("autokran",              "autokran-mieten"),
    ("mobilkran",             "mobilkran-mieten"),
    ("teleskopkran",          "mobilkran-mieten"),
]


def check_robots(homepage_url: str) -> tuple[bool, str]:
    try:
        parsed = urlparse(homepage_url)
        robots_url = f"{parsed.scheme}://{parsed.netloc}/robots.txt"
        rp = RobotFileParser()
        rp.set_url(robots_url)
        rp.read()
        if rp.can_fetch(USER_AGENT, homepage_url):
            return True, "ok"
        return False, "robots_disallow"
    except Exception as e:
        # Many sites have no robots.txt or return 5xx — treat as allow,
        # standard crawler behavior.
        return True, f"robots_err_treated_as_ok ({type(e).__name__})"


def fetch_text(url: str) -> tuple[str | None, str]:
    try:
        r = requests.get(url, headers=HEADERS, timeout=TIMEOUT_SEC, allow_redirects=True)
        if r.status_code != 200:
            return None, f"http_{r.status_code}"
        if "text/html" not in r.headers.get("content-type", "").lower():
            return None, "non_html"
        return r.text, "ok"
    except requests.Timeout:
        return None, "timeout"
    except Exception as e:
        return None, f"fetch_err_{type(e).__name__}"


def html_to_text(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()
    return soup.get_text(" ", strip=True)


def extract_emails(text: str, firm_domain: str) -> list[str]:
    found = set()
    for m in EMAIL_RE.findall(text):
        m = m.lower()
        domain = m.split("@", 1)[1]
        if domain in GENERIC_PROVIDERS:
            continue
        # Prefer emails on the firm's own domain (or a subdomain)
        if firm_domain and (domain == firm_domain or domain.endswith("." + firm_domain)):
            found.add(m)
            continue
        # Otherwise still record — some firms host email elsewhere
        found.add(m)
    # Sort: firm-domain first, role-prefix preferred
    def score(e: str) -> tuple[int, int, str]:
        local, dom = e.split("@", 1)
        same_dom = 0 if firm_domain and (dom == firm_domain or dom.endswith("." + firm_domain)) else 1
        role_pref = 0 if local.split(".")[0] in ("info", "office", "kontakt", "buero", "anfrage", "service") else 1
        return (same_dom, role_pref, e)
    return sorted(found, key=score)


def detect_crane_types(text: str) -> list[str]:
    text_lower = text.lower()
    found_slugs: list[str] = []
    seen: set[str] = set()
    for keyword, slug in CRANE_KEYWORDS:
        if keyword in text_lower and slug not in seen:
            found_slugs.append(slug)
            seen.add(slug)
    return found_slugs


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--commit", action="store_true", help="actually write to Supabase")
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )

    # Crane type catalog: slug → id
    crane_type_rows = sb.table("crane_types").select("id, slug").execute().data or []
    type_slug_to_id = {r["slug"]: r["id"] for r in crane_type_rows}

    # AT firms with website
    firms = (sb.table("companies")
                 .select("id, slug, name, website, email, country")
                 .eq("country", "AT")
                 .execute()).data or []
    print(f"Loaded {len(firms)} AT firms; processing those with website...")
    print()

    proposals = []
    summary = {"total": len(firms), "fetched_ok": 0, "robots_blocked": 0,
               "fetch_failed": 0, "no_crane_types_detected": 0,
               "no_website": 0, "email_extracted": 0}

    for firm in firms:
        name = firm["name"]
        slug = firm["slug"]
        homepage = firm.get("website") or ""
        if not homepage:
            summary["no_website"] += 1
            print(f"  - {slug}: no website, skipped")
            proposals.append({"company_id": firm["id"], "slug": slug, "name": name,
                              "fetch_status": "no_website"})
            continue

        # robots.txt
        allowed, robots_status = check_robots(homepage)
        if not allowed:
            summary["robots_blocked"] += 1
            print(f"  - {slug}: {robots_status}, skipped")
            proposals.append({"company_id": firm["id"], "slug": slug, "name": name,
                              "fetch_status": robots_status})
            continue

        # Fetch homepage + sub-paths; concatenate text
        corpus = ""
        statuses = {}
        urls_to_try = [homepage] + [urljoin(homepage, p) for p in SUB_PATHS_TO_TRY]
        seen_urls = set()
        for url in urls_to_try:
            if url in seen_urls:
                continue
            seen_urls.add(url)
            html, status = fetch_text(url)
            statuses[url] = status
            if html:
                corpus += "\n" + html_to_text(html)
            time.sleep(0.3)  # be polite

        if not corpus.strip():
            summary["fetch_failed"] += 1
            print(f"  - {slug}: fetch_failed ({statuses})")
            proposals.append({"company_id": firm["id"], "slug": slug, "name": name,
                              "fetch_status": "fetch_failed", "url_statuses": statuses})
            continue

        summary["fetched_ok"] += 1

        # Extract
        firm_domain = urlparse(homepage).netloc.replace("www.", "")
        emails = extract_emails(corpus, firm_domain)
        crane_slugs = detect_crane_types(corpus)
        crane_slugs = apply_manual_override(slug, crane_slugs)
        if not crane_slugs:
            summary["no_crane_types_detected"] += 1
        if emails:
            summary["email_extracted"] += 1

        # Build update proposal — never overwrite a non-null existing email
        existing_email = firm.get("email")
        company_update = {}
        if emails and not existing_email:
            company_update["email"] = emails[0]

        company_cranes_proposed = [
            {"crane_type_slug": s, "crane_type_id": type_slug_to_id[s]}
            for s in crane_slugs
            if s in type_slug_to_id
        ]

        proposals.append({
            "company_id": firm["id"],
            "slug": slug,
            "name": name,
            "website": homepage,
            "fetch_status": "ok",
            "extracted": {
                "email_candidates": emails[:5],
                "crane_types_slugs": crane_slugs,
            },
            "supabase_updates": {
                "companies_update": company_update,
                "company_cranes_insert": company_cranes_proposed,
            },
        })
        print(f"  ✓ {slug}: emails={len(emails)} crane_types={crane_slugs}")

    OUTPUT.write_text(json.dumps({"summary": summary, "proposals": proposals}, ensure_ascii=False, indent=2), encoding="utf-8")

    print()
    print("=" * 60)
    print("Phase B summary:")
    for k, v in summary.items():
        print(f"  {k:<26} {v}")
    print(f"  Saved: {OUTPUT}")
    print("=" * 60)

    if not args.commit:
        print()
        print("  Dry run — no Supabase writes. Re-run with --commit to apply.")
        return 0

    # COMMIT
    print()
    print("  COMMITTING to Supabase...")
    updated_companies = 0
    inserted_company_cranes = 0
    for p in proposals:
        if p.get("fetch_status") != "ok":
            continue
        cu = p["supabase_updates"].get("companies_update") or {}
        if cu:
            sb.table("companies").update(cu).eq("id", p["company_id"]).execute()
            updated_companies += 1

        cc = p["supabase_updates"].get("company_cranes_insert") or []
        if cc:
            rows = [
                {"company_id": p["company_id"], "crane_type_id": x["crane_type_id"]}
                for x in cc
            ]
            sb.table("company_cranes").upsert(rows, on_conflict="company_id,crane_type_id", ignore_duplicates=True).execute()
            inserted_company_cranes += len(rows)

    print(f"  ✓ {updated_companies} companies updated, {inserted_company_cranes} company_cranes upserted")
    return 0


if __name__ == "__main__":
    sys.exit(main())
