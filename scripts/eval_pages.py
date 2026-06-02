"""
Pre-Google SEO evaluator — judge our pages with Claude Opus 4.7 before
hoping Google figures it out.

For each URL in URLS_TO_EVAL:
  1. Fetch the production HTML.
  2. Extract main content + meta + h1 + first JSON-LD blob.
  3. Send to Claude Opus 4.7 with the target keyword. Claude scores ranking
     potential 0-100, flags top weaknesses, suggests concrete fixes.
  4. Output sorted Markdown table (worst → best) + per-URL details, written
     to scripts/seo_eval_<date>.md so we can compare runs.

Why Opus and not Haiku: this is rare (one batch run per audit cycle), the
output drives prioritisation decisions, and Opus is markedly better at
"would Google rank this for X" judgement than Haiku. ~$0.05 per page,
~$1 per full batch.
"""

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

import httpx
from bs4 import BeautifulSoup
from dotenv import load_dotenv

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PROJECT_ROOT = Path(__file__).resolve().parent.parent
load_dotenv(PROJECT_ROOT / ".env.local")
ANTHROPIC_KEY = os.environ["ANTHROPIC_API_KEY"]
ANTHROPIC_URL = "https://api.anthropic.com/v1/messages"
MODEL = "claude-opus-4-8"

# (url, target_query) tuples. The query is what we'd want this URL to rank
# for — Claude scores against THAT specific intent, not "any keyword".
URLS_TO_EVAL: list[tuple[str, str]] = [
    # Hub + commercial pages
    ("https://kranvergleich.de/", "kran mieten"),
    ("https://kranvergleich.de/kostenrechner", "kran kostenrechner"),
    ("https://kranvergleich.de/kran-mieten-preise", "kran mieten preise"),
    # Type pages (the SEO money-makers)
    ("https://kranvergleich.de/mobilkran-mieten", "mobilkran mieten"),
    ("https://kranvergleich.de/autokran-mieten", "autokran mieten"),
    ("https://kranvergleich.de/baukran-mieten", "baukran mieten"),
    ("https://kranvergleich.de/minikran-mieten", "minikran mieten"),
    # Top city × type combos (high commercial intent)
    ("https://kranvergleich.de/mobilkran-mieten/berlin", "mobilkran mieten berlin"),
    ("https://kranvergleich.de/mobilkran-mieten/muenchen", "mobilkran mieten münchen"),
    # Ratgeber index + the orphans we just relinked
    ("https://kranvergleich.de/ratgeber", "kran ratgeber"),
    ("https://kranvergleich.de/ratgeber/welchen-kran-brauche-ich", "welchen kran brauche ich"),
    ("https://kranvergleich.de/ratgeber/krantypen", "krantypen"),
    ("https://kranvergleich.de/ratgeber/was-kostet-ein-kran", "was kostet ein kran"),
    ("https://kranvergleich.de/ratgeber/kran-mieten-hausbau", "kran mieten hausbau"),
    ("https://kranvergleich.de/ratgeber/solaranlage-kran-mieten", "kran für solaranlage mieten"),
    ("https://kranvergleich.de/ratgeber/kran-mieten-privatperson", "kran mieten privatperson"),
    ("https://kranvergleich.de/ratgeber/kran-aufstellen-genehmigung", "kran genehmigung"),
    ("https://kranvergleich.de/ratgeber/kran-mieten-ohne-fuehrerschein", "kran mieten ohne führerschein"),
]

# === Page extraction ===

def fetch_page(url: str) -> dict:
    """Returns {title, description, h1, body_text, structured_data, word_count}."""
    r = httpx.get(url, timeout=30, follow_redirects=True, headers={
        "User-Agent": "Mozilla/5.0 (compatible; KranVergleichSEOAudit/1.0)",
    })
    r.raise_for_status()
    soup = BeautifulSoup(r.text, "html.parser")

    title = (soup.title.string.strip() if soup.title and soup.title.string else "")
    desc_tag = soup.find("meta", attrs={"name": "description"})
    description = desc_tag["content"].strip() if desc_tag and desc_tag.get("content") else ""

    h1_tag = soup.find("h1")
    h1 = h1_tag.get_text(strip=True) if h1_tag else ""

    # Strip nav/footer/script/style/aside before extracting body text. They
    # are repeated across every page and would waste tokens + skew word count.
    for tag in soup(["script", "style", "nav", "footer", "header", "aside", "noscript"]):
        tag.decompose()

    body_text = re.sub(r"\s+", " ", soup.get_text(separator=" ", strip=True)).strip()
    # Cap to 8000 chars — main visible content for an SEO judge call.
    body_text = body_text[:8000]
    word_count = len(re.findall(r"\b\w+\b", body_text))

    # First JSON-LD blob — usually the most informative (Product /
    # AggregateRating / BreadcrumbList).
    structured = []
    # bs4 already stripped scripts above, re-fetch from raw text.
    for m in re.finditer(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.+?)</script>', r.text, re.DOTALL):
        blob = m.group(1).strip()
        try:
            structured.append(json.loads(blob))
        except json.JSONDecodeError:
            pass

    return {
        "title": title,
        "description": description,
        "h1": h1,
        "body_text": body_text,
        "word_count": word_count,
        "structured_types": sorted({
            (entry.get("@type") if isinstance(entry, dict) else "?")
            for entry in (structured or [])
            if entry
        }),
    }


# === Claude eval ===

EVAL_SYSTEM = """You are a senior SEO auditor for a German crane-rental directory (KranVergleich.de). For each URL the user gives you, judge whether it would land on Google's first page (positions 1-10) for the target query in the next 30-60 days.

Your judgement is calibrated against typical top-10 results for crane-rental queries in DE, which usually have:
- 800+ words of unique, specific German content (not generic filler)
- Concrete numbers (prices in €, weights in t, heights in m, capacities)
- Clear H1 matching the target query
- Title 50-60 chars, meta description 140-160 chars
- Proper Schema.org (Product/Service/Article/AggregateRating/Breadcrumb)
- Internal links to 3+ related pages
- Decision aids (tables, comparison lists, FAQ)
- Seasoned crane-industry vocabulary (Tragkraft, Hubhöhe, Auslegerlänge, Kranführer, etc.) — NOT layperson translations

Score 0-100:
- 90-100 = will rank top-10 for the target query when Google indexes it
- 70-89 = will rank top-30, decent foundation, needs 1-2 specific fixes for top-10
- 50-69 = will rank 30-100, content exists but missing depth/structure/specifics
- 30-49 = thin / generic / off-topic, will struggle to break top-100
- 0-29 = will probably never rank, redirect or rewrite from scratch

Be specific in your weaknesses and fixes. "Add more content" is useless. "Add a 6-row pricing table for typical projects (Tonnage × duration × Tagespreis)" is useful.

Always respond via the record_seo_score tool. No free text."""

EVAL_TOOL = {
    "name": "record_seo_score",
    "description": "Records the SEO ranking potential score and actionable feedback for a single URL.",
    "input_schema": {
        "type": "object",
        "properties": {
            "score": {
                "type": "integer",
                "description": "Overall ranking potential, 0-100.",
            },
            "verdict": {
                "type": "string",
                "enum": ["top10", "top30", "top100", "weak", "kill_or_redirect"],
                "description": "Expected ranking band.",
            },
            "strengths": {
                "type": "array",
                "items": {"type": "string"},
                "description": "1-3 specific things this page does well (German or English, but cite specifics).",
            },
            "weaknesses": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Up to 5 specific gaps blocking top-10. NOT generic advice — concrete missing pieces.",
            },
            "actions": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Up to 5 ranked, concrete actions. Each must be implementable in <2h. Order: highest-impact first.",
            },
            "estimated_words_to_add": {
                "type": "integer",
                "description": "Approximate word count needed on top of current content to reach top-10. 0 if already enough.",
            },
            "biggest_competitor_advantage": {
                "type": "string",
                "description": "One specific thing the typical Google top-3 result for this query has that we don't (data point, format, schema, etc.).",
            },
        },
        "required": ["score", "verdict", "strengths", "weaknesses", "actions", "estimated_words_to_add", "biggest_competitor_advantage"],
    },
}


def call_anthropic(payload: dict) -> dict:
    r = httpx.post(
        ANTHROPIC_URL,
        headers={
            "x-api-key": ANTHROPIC_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        json=payload,
        timeout=120,
    )
    if r.status_code >= 400:
        raise RuntimeError(f"Anthropic {r.status_code}: {r.text[:300]}")
    return r.json()


def evaluate_page(url: str, query: str, page: dict) -> dict:
    user_msg = (
        f"URL: {url}\n"
        f"Target search query: \"{query}\"\n\n"
        f"=== Page metadata ===\n"
        f"<title>: {page['title']}\n"
        f"<meta description>: {page['description']}\n"
        f"<h1>: {page['h1']}\n"
        f"Word count (body): {page['word_count']}\n"
        f"Schema types found: {', '.join(page['structured_types']) or '(none)'}\n\n"
        f"=== Page body text (cleaned, capped 8k chars) ===\n"
        f"{page['body_text']}\n"
    )

    payload = {
        "model": MODEL,
        "max_tokens": 1500,
        "system": [
            {"type": "text", "text": EVAL_SYSTEM, "cache_control": {"type": "ephemeral"}},
        ],
        "tools": [EVAL_TOOL],
        "tool_choice": {"type": "tool", "name": "record_seo_score"},
        "messages": [{"role": "user", "content": user_msg}],
    }
    res = call_anthropic(payload)
    block = next((b for b in res.get("content", []) if b.get("type") == "tool_use"), None)
    if not block:
        raise RuntimeError(f"No tool_use in response for {url}")
    return block["input"]


# === Output ===

VERDICT_BADGE = {
    "top10": "✅",
    "top30": "🟢",
    "top100": "🟡",
    "weak": "🟠",
    "kill_or_redirect": "🔴",
}


def format_report(results: list[dict]) -> str:
    results_sorted = sorted(results, key=lambda r: r["score"])
    today = datetime.now().strftime("%Y-%m-%d")

    out = [
        f"# SEO Pre-Google Audit — {today}",
        "",
        f"Evaluated {len(results)} URLs with Claude Opus 4.7 against typical top-10 SERP for each target query.",
        "",
        "## Summary table (worst-ranking-potential first)",
        "",
        "| Score | Verdict | URL | Target query | +Words needed |",
        "|------:|---------|-----|--------------|--------------:|",
    ]
    for r in results_sorted:
        out.append(
            f"| **{r['score']}** {VERDICT_BADGE.get(r['verdict'], '')} "
            f"| {r['verdict']} "
            f"| {r['url'].replace('https://kranvergleich.de', '')} "
            f"| {r['query']} "
            f"| {r.get('estimated_words_to_add', '?')} |"
        )
    out.append("")
    out.append("## Per-URL details")
    out.append("")
    for r in results_sorted:
        out.append(f"### {VERDICT_BADGE.get(r['verdict'], '')} {r['url']} — score {r['score']}/100")
        out.append("")
        out.append(f"**Target:** `{r['query']}` · **Verdict:** {r['verdict']} · **Wörter fehlen:** {r.get('estimated_words_to_add', '?')}")
        out.append("")
        edge = r.get("biggest_competitor_advantage", "")
        if edge:
            out.append(f"**Top-3 competitor edge:** {edge}")
            out.append("")
        if r.get("strengths"):
            out.append("**Strengths:**")
            for s in r["strengths"]:
                out.append(f"- {s}")
            out.append("")
        if r.get("weaknesses"):
            out.append("**Weaknesses:**")
            for w in r["weaknesses"]:
                out.append(f"- {w}")
            out.append("")
        if r.get("actions"):
            out.append("**Actions (priority order):**")
            for i, a in enumerate(r["actions"], 1):
                out.append(f"{i}. {a}")
            out.append("")
        out.append("---")
        out.append("")
    return "\n".join(out)


def main() -> int:
    results: list[dict] = []
    print(f"Evaluating {len(URLS_TO_EVAL)} URLs with Opus 4.7…")
    print()
    for url, query in URLS_TO_EVAL:
        print(f"  → {url}")
        try:
            page = fetch_page(url)
            print(f"     fetched: {page['word_count']} words, schema {page['structured_types'] or '(none)'}")
            judgement = evaluate_page(url, query, page)
            verdict = judgement["verdict"]
            print(f"     {VERDICT_BADGE.get(verdict, '?')} score {judgement['score']}/100 · {verdict}")
            results.append({"url": url, "query": query, **judgement})
        except Exception as exc:
            print(f"     ERROR: {exc}")
            continue
    print()
    print(f"Done — {len(results)}/{len(URLS_TO_EVAL)} evaluated")

    today = datetime.now().strftime("%Y-%m-%d")
    out_path = PROJECT_ROOT / "scripts" / f"seo_eval_{today}.md"
    out_path.write_text(format_report(results), encoding="utf-8")
    print(f"Report: {out_path.relative_to(PROJECT_ROOT)}")
    print()

    # Quick console summary
    print("Top 5 worst-ranking-potential pages (fix these first):")
    for r in sorted(results, key=lambda x: x["score"])[:5]:
        path = r["url"].replace("https://kranvergleich.de", "") or "/"
        print(f"  {r['score']:>3}  {VERDICT_BADGE.get(r['verdict'], '?')}  {path}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
