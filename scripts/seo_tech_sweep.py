"""
On-page SEO technical sweep — pure structural checks, no LLM.

Catches issues GSC won't surface for weeks: oversized title/meta, missing
canonical, broken og:image, multiple H1, missing JSON-LD, zero in-page images.
Run before the seo-audit skill's GSC analysis (Phase 0) or ad-hoc on a list
of URLs.

Usage:
  python scripts/seo_tech_sweep.py <url> [<url>...]
  python scripts/seo_tech_sweep.py --from-sitemap [--filter REGEX] [--top N]
  python scripts/seo_tech_sweep.py <url> --json
  python scripts/seo_tech_sweep.py <url> --md

Exit codes:
  0 — all pages clean
  1 — at least one page has a P1/P2 issue (useful for CI/cron regression check)

Issue severities:
  P1  hard fail — fix this sprint   (TITLE_OVER_60, DESC_OVER_160, CANONICAL_MISSING,
                                     H1_NOT_EXACTLY_ONE, ROBOTS_NOINDEX_UNEXPECTED)
  P2  moderate  — fix this month    (OG_IMAGE_MISSING, TW_IMAGE_MISSING,
                                     JSONLD_PARSE_ERROR, CANONICAL_NOT_SELF)
  P3  cosmetic  — nice to fix       (ZERO_IMAGES_ON_PAGE, NO_TWITTER_CARD)
INFO informational                 (REDIRECTED — not an issue, original URL 307/308's somewhere else)
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import xml.etree.ElementTree as ET
from dataclasses import dataclass, field
from typing import Any

import httpx
from bs4 import BeautifulSoup

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

UA = "Mozilla/5.0 (compatible; KranVergleichSEOSweep/1.0)"

# Project-specific: KranVergleich/BaumVergleich titles end with " | KranVergleich.de"
# or similar. Strip the brand suffix to compute effective ranking-relevant length.
BRAND_SUFFIX_RE = re.compile(r"\s*\|\s*(Kran|Baum)Vergleich(\.de|\.at)?\s*$", re.I)

TITLE_HARD_LIMIT = 60         # Google SERP truncation ~580px ≈ 60 chars
DESC_HARD_LIMIT = 160         # Desktop SERP ~155-160 chars
DESC_SOFT_MIN = 70            # Below this, Google often rewrites

P1_ISSUES = {
    "TITLE_OVER_60", "DESC_OVER_160", "CANONICAL_MISSING",
    "H1_NOT_EXACTLY_ONE", "ROBOTS_NOINDEX_UNEXPECTED",
    "FETCH_ERROR",
}
P2_ISSUES = {
    "OG_IMAGE_MISSING", "TW_IMAGE_MISSING", "JSONLD_PARSE_ERROR",
    "CANONICAL_NOT_SELF", "TITLE_MISSING", "DESC_MISSING",
}


@dataclass
class PageReport:
    url: str
    fetch_status: int = 0
    title: str = ""
    title_len: int = 0
    title_effective_len: int = 0  # after stripping brand suffix
    desc: str = ""
    desc_len: int = 0
    canonical: str = ""
    og: dict = field(default_factory=dict)
    twitter: dict = field(default_factory=dict)
    jsonld_types: list[str] = field(default_factory=list)
    jsonld_blocks: int = 0
    jsonld_parse_errors: int = 0
    h1_count: int = 0
    images_total: int = 0
    images_no_alt: int = 0
    robots: str = "default"
    issues: list[str] = field(default_factory=list)
    error: str = ""

    def to_dict(self) -> dict[str, Any]:
        d = self.__dict__.copy()
        d["worst_severity"] = self.worst_severity()
        return d

    def worst_severity(self) -> str:
        if any(i in P1_ISSUES for i in self.issues):
            return "P1"
        if any(i in P2_ISSUES for i in self.issues):
            return "P2"
        if self.issues == ["REDIRECTED"]:
            return "INFO"
        if self.issues:
            return "P3"
        return "OK"


def fetch_html(url: str, client: httpx.Client) -> tuple[int, str, str, str]:
    """Returns (status_code, html, final_url, error_message). final_url differs from url
    when the original 3xx-redirected somewhere; we follow because we want to validate
    the page that actually serves, but callers must reason about the redirect themselves."""
    try:
        r = client.get(url, timeout=20, follow_redirects=True, headers={"User-Agent": UA})
        return r.status_code, r.text, str(r.url), ""
    except httpx.HTTPError as e:
        return 0, "", url, f"{e.__class__.__name__}: {e}"


def analyze(url: str, html: str, status: int, final_url: str = "") -> PageReport:
    rep = PageReport(url=url, fetch_status=status)
    if status != 200 or not html:
        rep.issues.append("FETCH_ERROR")
        rep.error = f"HTTP {status}"
        return rep

    # Redirect awareness: if the URL we requested != the URL we got, this is a
    # redirect (308/307 set up in next.config.ts for compound slugs, _extraCities,
    # etc.). Don't run canonical/title/desc rules against the redirect TARGET — flag
    # REDIRECTED as informational and skip checks that would false-positive.
    if final_url and final_url.rstrip("/") != url.rstrip("/"):
        rep.issues.append("REDIRECTED")
        rep.error = f"redirected → {final_url}"
        return rep

    soup = BeautifulSoup(html, "html.parser")

    # Title
    if soup.title and soup.title.string:
        rep.title = soup.title.string.strip()
        rep.title_len = len(rep.title)
        rep.title_effective_len = len(BRAND_SUFFIX_RE.sub("", rep.title))
        if rep.title_len > TITLE_HARD_LIMIT:
            rep.issues.append("TITLE_OVER_60")
    else:
        rep.issues.append("TITLE_MISSING")

    # Meta description
    desc_tag = soup.find("meta", attrs={"name": "description"})
    if desc_tag and desc_tag.get("content"):
        rep.desc = desc_tag["content"].strip()
        rep.desc_len = len(rep.desc)
        if rep.desc_len > DESC_HARD_LIMIT:
            rep.issues.append("DESC_OVER_160")
    else:
        rep.issues.append("DESC_MISSING")

    # Canonical
    canon_tag = soup.find("link", rel="canonical")
    if canon_tag and canon_tag.get("href"):
        rep.canonical = canon_tag["href"].strip()
        if rep.canonical.rstrip("/") != url.rstrip("/"):
            rep.issues.append("CANONICAL_NOT_SELF")
    else:
        rep.issues.append("CANONICAL_MISSING")

    # Open Graph
    for og in soup.find_all("meta", attrs={"property": re.compile(r"^og:")}):
        rep.og[og["property"]] = og.get("content", "")
    if "og:image" not in rep.og:
        rep.issues.append("OG_IMAGE_MISSING")

    # Twitter card
    for tw in soup.find_all("meta", attrs={"name": re.compile(r"^twitter:")}):
        rep.twitter[tw["name"]] = tw.get("content", "")
    if not rep.twitter:
        rep.issues.append("NO_TWITTER_CARD")
    elif "twitter:image" not in rep.twitter:
        rep.issues.append("TW_IMAGE_MISSING")

    # JSON-LD — re-scan raw HTML to catch blocks BS4 doesn't parse cleanly
    for m in re.finditer(
        r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.+?)</script>',
        html, re.S
    ):
        rep.jsonld_blocks += 1
        try:
            data = json.loads(m.group(1).strip())
            if isinstance(data, list):
                for x in data:
                    if isinstance(x, dict) and "@type" in x:
                        rep.jsonld_types.append(str(x["@type"]))
            elif isinstance(data, dict) and "@type" in data:
                rep.jsonld_types.append(str(data["@type"]))
        except json.JSONDecodeError:
            rep.jsonld_parse_errors += 1
            rep.issues.append("JSONLD_PARSE_ERROR")

    # H1
    h1s = soup.find_all("h1")
    rep.h1_count = len(h1s)
    if rep.h1_count != 1:
        rep.issues.append("H1_NOT_EXACTLY_ONE")

    # Images (in <body>, ignore icons in <head>)
    body = soup.body or soup
    imgs = body.find_all("img")
    rep.images_total = len(imgs)
    rep.images_no_alt = sum(1 for i in imgs if not i.get("alt"))
    if rep.images_total == 0:
        rep.issues.append("ZERO_IMAGES_ON_PAGE")

    # Robots
    robots_tag = soup.find("meta", attrs={"name": "robots"})
    if robots_tag and robots_tag.get("content"):
        rep.robots = robots_tag["content"].strip()
        if "noindex" in rep.robots.lower():
            rep.issues.append("ROBOTS_NOINDEX_UNEXPECTED")

    return rep


def fetch_sitemap_urls(sitemap_url: str, client: httpx.Client) -> list[str]:
    """Recursively expand sitemap-index → individual sitemaps → URLs."""
    status, body, _final, err = fetch_html(sitemap_url, client)
    if status != 200 or not body:
        print(f"sitemap fetch failed: {sitemap_url} ({err or status})", file=sys.stderr)
        return []
    try:
        root = ET.fromstring(body)
    except ET.ParseError as e:
        print(f"sitemap parse failed: {e}", file=sys.stderr)
        return []
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls: list[str] = []
    # Sitemap index?
    for sm in root.findall("sm:sitemap/sm:loc", ns):
        if sm.text:
            urls.extend(fetch_sitemap_urls(sm.text.strip(), client))
    # Direct URL set
    for u in root.findall("sm:url/sm:loc", ns):
        if u.text:
            urls.append(u.text.strip())
    return urls


def render_md(reports: list[PageReport]) -> str:
    lines = ["| URL | Sev | Title | Desc | Canon | OG-img | TW-img | JSON-LD | H1 | Imgs | Issues |",
             "|---|---|---|---|---|---|---|---|---|---|---|"]
    for r in reports:
        ok = lambda b: "✓" if b else "✗"
        title_cell = f"{r.title_len}" + ("⚠️" if r.title_len > TITLE_HARD_LIMIT else "")
        desc_cell = f"{r.desc_len}" + ("⚠️" if r.desc_len > DESC_HARD_LIMIT else "")
        canon_cell = ok(bool(r.canonical) and "CANONICAL_NOT_SELF" not in r.issues)
        og_img_cell = ok("og:image" in r.og)
        tw_img_cell = ok("twitter:image" in r.twitter)
        jsonld_cell = ",".join(r.jsonld_types) or "—"
        url_short = r.url.replace("https://", "").replace("kranvergleich.de", "kv").replace("baumvergleich.de", "bv")
        lines.append(
            f"| {url_short} | {r.worst_severity()} | {title_cell} | {desc_cell} | {canon_cell} "
            f"| {og_img_cell} | {tw_img_cell} | {jsonld_cell} | {r.h1_count} | {r.images_total} "
            f"| {', '.join(r.issues) or 'OK'} |"
        )
    return "\n".join(lines)


def main() -> int:
    ap = argparse.ArgumentParser(description="On-page SEO technical sweep")
    ap.add_argument("urls", nargs="*", help="URLs to check (or use --from-sitemap)")
    ap.add_argument("--from-sitemap", metavar="URL",
                    help="Pull URL list from sitemap index (e.g. https://kranvergleich.de/sitemap.xml)")
    ap.add_argument("--filter", metavar="REGEX",
                    help="Filter sitemap URLs by regex (e.g. '/ratgeber/')")
    ap.add_argument("--top", type=int, default=0,
                    help="Limit to first N URLs after filtering (0 = all)")
    ap.add_argument("--json", action="store_true", help="Output JSON instead of markdown")
    ap.add_argument("--md", action="store_true", help="Force markdown table (default)")
    args = ap.parse_args()

    with httpx.Client() as client:
        urls = list(args.urls)
        if args.from_sitemap:
            sitemap_urls = fetch_sitemap_urls(args.from_sitemap, client)
            if args.filter:
                pattern = re.compile(args.filter)
                sitemap_urls = [u for u in sitemap_urls if pattern.search(u)]
            if args.top:
                sitemap_urls = sitemap_urls[:args.top]
            urls.extend(sitemap_urls)

        if not urls:
            ap.error("no URLs given (positional args or --from-sitemap)")

        reports: list[PageReport] = []
        for url in urls:
            status, html, final_url, err = fetch_html(url, client)
            rep = analyze(url, html, status, final_url)
            if err:
                rep.error = err
            reports.append(rep)
            if not args.json:
                sev = rep.worst_severity()
                print(f"  [{sev}] {url} — {len(rep.issues)} issue(s)", file=sys.stderr)

    if args.json:
        print(json.dumps([r.to_dict() for r in reports], indent=2, ensure_ascii=False))
    else:
        print(render_md(reports))

    has_p1_or_p2 = any(r.worst_severity() in {"P1", "P2"} for r in reports)
    return 1 if has_p1_or_p2 else 0


if __name__ == "__main__":
    sys.exit(main())
