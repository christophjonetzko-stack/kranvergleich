#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Comprehensive AT firm enrichment via Claude API (Opus 4.8 + adaptive thinking + tool_use).

Replaces keyword-based Phase B. Per firm: deep-crawl homepage + sub-pages
(produkte/flotte/leistungen/kontakt/impressum/...), concat to ~25k tokens,
send to Claude Opus 4.8 with a forced tool_use that returns ~22 strict
fields, then UPDATE companies + INSERT company_cranes idempotently.

Model: Opus 4.8 chosen over Sonnet 4.6 because (a) extraction quality is the
whole point — user said "wybierz model który zrobi to dobrze a nie tanio",
(b) adaptive thinking is well suited for messy JS-heavy crawls where Claude
needs to reason about contradictions across sub-pages, and (c) the absolute
cost delta on 106 firms (~$15→$30) is small relative to the data-quality
upside that drives lead conversion.

Best practices applied (per claude-api skill):
  - Adaptive thinking: thinking={type:"adaptive"} — Opus 4.8 only supports
    adaptive (enabled/budget_tokens returns 400). Claude self-decides
    thinking depth. display defaults to "omitted" — fine, we don't stream.
  - Prompt caching: cache_control on the last system block caches the system
    prompt + the (large) tool definition. Render order is tools → system →
    messages, so the cacheable prefix is everything except per-firm content.
    First firm pays cache-write (~1.25× input), every subsequent firm pays
    cache-read (~0.1× input) on the cached portion.
  - tool_choice="auto" + single tool: with Opus 4.8 + adaptive thinking,
    forced tool_choice is rejected ("Thinking may not be enabled when
    tool_choice forces tool use"). With only one tool defined and a clear
    user instruction "call the extract_firm_data tool", Claude reliably
    emits the tool_use. We treat any response without a tool_use block as
    a failure (logged in the proposal JSON for review).
  - Idempotent writes: skip firms whose description_enriched is already set
    unless --force; never overwrite a non-null email/phone in companies.
  - Sequential by default — anthropic SDK has built-in retry with
    exponential backoff. For 106 firms, sequential takes ~45-90 min total
    (mostly fetch latency + Opus thinking, not bandwidth). Parallel adds
    rate-limit risk for marginal speedup.

Cost: ~$0.20–0.40 per firm Opus 4.8 with adaptive thinking
(~10–25k input + ~2–4k output incl. thinking) = ~$25–40 total for 106
firms. First firm pays cache-write premium; rest pay cache-read on the
system+tool prefix.

Usage:
  python at_firms_comprehensive_scan.py --slugs felbermayr-wien,maderboeck-glasakrobat-gmbh   # test 1-2
  python at_firms_comprehensive_scan.py                                                        # dry-run all
  python at_firms_comprehensive_scan.py --commit                                                # apply
  python at_firms_comprehensive_scan.py --commit --force                                        # re-enrich already-done
"""
import argparse
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urljoin, urlparse
from urllib.robotparser import RobotFileParser

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

ENV_FILE = Path(__file__).parent.parent / ".env.local"
if ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip())

import anthropic
import requests
from bs4 import BeautifulSoup
from supabase import create_client

OUTPUT_FILE = Path(__file__).parent / "at_firms_comprehensive_proposal.json"

USER_AGENT = "kranvergleich.at bot (catalog enrichment; impressum@kranvergleich.de)"
HEADERS = {"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"}
TIMEOUT_SEC = 12

SUB_PATHS_TO_TRY = [
    "/", "/impressum", "/kontakt", "/contact", "/kontakte",
    "/produkte", "/produkt", "/flotte", "/fahrzeuge", "/maschinen",
    "/leistungen", "/leistung", "/services", "/service",
    "/angebot", "/angebote", "/krane", "/kran-vermietung",
    "/sortiment", "/ueber-uns", "/uber-uns", "/about",
]

# Approx 25k input tokens ≈ 100k chars (German ≈ 4 chars/token)
MAX_CONTENT_CHARS = 100_000

CRANE_TYPE_SLUGS = [
    "minikran-mieten",
    "autokran-mieten",
    "mobilkran-mieten",
    "baukran-mieten",
    "dachdeckerkran-mieten",
    "raupenkran-mieten",
    "anhaengerkran-mieten",
    "ladekran-mieten",
]

EXTRACTION_TOOL: dict = {
    "name": "extract_firm_data",
    "description": "Extract structured data about an Austrian crane rental firm from concatenated website content. Return only data clearly stated on the site; never fabricate.",
    "input_schema": {
        "type": "object",
        "properties": {
            "email": {"type": ["string", "null"], "description": "Primary contact email (info@/office@/kontakt@ preferred over personal). Null if not on site."},
            "phone": {"type": ["string", "null"], "description": "Primary phone normalized to +43 international format (drop leading 0 after country code)."},
            "opening_hours": {
                "type": ["object", "null"],
                "description": "Per-day opening hours, e.g. 'Mo-Fr 7:00-17:00, Sa geschlossen'. Each day key is null if unspecified. Null if no hours stated.",
                "properties": {
                    "monday": {"type": ["string", "null"]},
                    "tuesday": {"type": ["string", "null"]},
                    "wednesday": {"type": ["string", "null"]},
                    "thursday": {"type": ["string", "null"]},
                    "friday": {"type": ["string", "null"]},
                    "saturday": {"type": ["string", "null"]},
                    "sunday": {"type": ["string", "null"]},
                },
            },
            "service_radius_km": {"type": ["integer", "null"], "description": "Operating radius in km if stated ('Umkreis 50 km' → 50). Null otherwise."},
            "service_areas": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Cities/regions/Bundesländer the firm explicitly serves (e.g. 'Wien', 'Niederösterreich', 'gesamtes Bundesgebiet'). Empty if not stated.",
            },
            "crane_types": {
                "type": "array",
                "items": {"type": "string", "enum": CRANE_TYPE_SLUGS},
                "description": "Catalog crane-type slugs the firm clearly offers. Only the 8 enum values; conservative — omit if uncertain.",
            },
            "specialties": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Specialties beyond crane rental: Vakuumtechnik, Glasmontage, Photovoltaik-Montage, Schwertransport, Sondertransporte, Fenstereinbringung, Hochhaus-Hebearbeiten, etc.",
            },
            "brands_models": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Specific brand+model strings mentioned: 'Liebherr LTM 1100-4.2', 'Böcker AHK 36/3000', 'Potain IGO T70'. These become individual branded SEO keywords.",
            },
            "capacity_range": {"type": ["string", "null"], "description": "Range of crane capacities if stated (e.g. '1t – 350t', 'bis 90t'). Null otherwise."},
            "additional_services": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Adjacent services: Arbeitsbühnen, Stapler, Transport, Sondertransport, Einbringung, Lagerung, etc.",
            },
            "operator_included": {"type": ["boolean", "null"], "description": "Is Kranführer included by default? null if unclear."},
            "price_day_from": {"type": ["integer", "null"], "description": "Lowest €/Tag rate if explicitly published ('ab 250 €/Tag' → 250). Null if no prices on site."},
            "legal_entity_type": {"type": ["string", "null"], "description": "GmbH, e.U., KG, OG, AG, GmbH & Co KG, etc."},
            "firmenbuchnummer": {"type": ["string", "null"], "description": "AT commercial register number from Impressum, format 'FN xxxxxxa'. Null if not in Impressum."},
            "uid_nummer": {"type": ["string", "null"], "description": "AT VAT ID, format 'ATU' + 8 digits."},
            "founded_year": {"type": ["integer", "null"], "description": "Year founded if stated on site."},
            "description_short": {"type": "string", "description": "One-sentence German Sie-form USP, 80–120 chars. Substantive, no marketing fluff."},
            "description_long": {"type": "string", "description": "200–400 words, German Sie-form, suitable for /anbieter/[slug] page. Structure: what they offer → customer base → geographic focus → distinguishing strengths. Conservative; only state facts grounded in the website content."},
            "certifications": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Certifications: TÜV, Meisterbetrieb, ISO 9001, EN 1090, etc.",
            },
            "associations": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Industry associations / Mitgliedschaften: WKO Wien, BVMB, Innung, ÖBV, etc.",
            },
            "extraction_confidence": {
                "type": "string",
                "enum": ["high", "medium", "low"],
                "description": "high = website was substantive and clear; medium = partial info; low = thin site, much guessed-or-null. Affects whether to write description_long.",
            },
        },
        "required": [
            "crane_types", "specialties", "brands_models", "service_areas",
            "additional_services", "certifications", "associations",
            "description_short", "description_long", "extraction_confidence",
        ],
    },
}

SYSTEM_PROMPT = """Du bist ein präziser Datenanalyst, der Daten über österreichische Kranvermietungsfirmen aus Webseiten-Inhalten für das Vergleichsportal kranvergleich.at extrahiert.

Du erhältst zusammengefassten Klartext von der Website einer einzelnen Firma — typischerweise Homepage plus 5–10 Unterseiten (/produkte, /flotte, /leistungen, /impressum, /kontakt, /ueber-uns).

KERN-REGELN
- Erfinde nichts. Gib NUR Daten zurück, die explizit aus dem Text hervorgehen.
- Bei Unsicherheit: null (für Einzelwerte) oder leeres Array (für Listen).
- Telefonnummern auf +43-Format normalisieren; führende 0 nach Ländercode weglassen.
- Sprache der Beschreibungstexte: Deutsch, Sie-Form, sachlich. KEIN Marketing-Sprech.
- KEINE Übertreibungen oder unbelegte Behauptungen — UWG-AT (irreführende Werbung verboten).

CRANE_TYPES (FESTES VOKABULAR — nur diese 8 Slugs)
- minikran-mieten: Mini-/Kompakt-/Spinnenkrane, oft batterie-elektrisch, schmale Zufahrten, Innenhof
- autokran-mieten: Auto-/Fahrzeugkrane (LKW-Fahrgestell), klassische Hebearbeiten
- mobilkran-mieten: Mobil-/Teleskopkrane, schwerere Klasse als Auto, All-Terrain
- baukran-mieten: Baukran/Turmdrehkran/Schnellbaukran, Langzeit-Einsatz auf Baustelle
- dachdeckerkran-mieten: Dachdecker-/Anhängerkrane für Dachsanierung, PV-Montage
- raupenkran-mieten: Raupenkrane (Crawler), Schwerlast, weiche Untergründe
- anhaengerkran-mieten: trailer-mounted Krane (LKW-Anhänger)
- ladekran-mieten: LKW-Ladekrane (Heckkran am Lastwagen montiert)

Wenn die Firma nur "Kran" generisch nennt ohne Typenangabe, sei konservativ und gib nur das zurück, was wirklich genannt ist. Wenn klar ist, dass es um Schwertransport mit Mobilkran geht: mobilkran-mieten und/oder autokran-mieten.

BRANDS_MODELS sind individuell benannte Maschinen: "Liebherr LTM 1100-4.2", "Böcker AHK 36/3000", "Potain IGO T70", "Maeda MC305", "Tadano ATF 90G". Diese werden zu eigenständigen SEO-Keywords. Sei großzügig beim Sammeln, aber nur wenn explizit auf der Seite genannt.

DESCRIPTION_LONG (200–400 Wörter)
- Sie-Form, sachlich, kein Marketing-Sprech
- Struktur: was die Firma anbietet → typische Kunden/Branchen → geographischer Fokus → Stärken/Spezialisierung
- Keine erfundenen Zahlen, keine Slogans, keine Bewertungen
- Bei dünnem Website-Inhalt (extraction_confidence=low) lieber kürzer und faktentreu

DESCRIPTION_SHORT (80–120 Zeichen)
- Ein Satz, USP der Firma. Beispiel: "Felbermayr Wien — Schwerlast- und Hebetechnik mit Mobil- und Autokranen bis 750 t."

EXTRACTION_CONFIDENCE
- high: substantielle Inhalte, klar strukturiert, Flotte/Leistungen explizit
- medium: Homepage vorhanden aber dünn, Teile unklar
- low: kaum Inhalte, vieles geraten oder null — UNBEDINGT vermerken"""


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def check_robots(homepage_url: str) -> tuple[bool, str]:
    try:
        parsed = urlparse(homepage_url)
        rp = RobotFileParser()
        rp.set_url(f"{parsed.scheme}://{parsed.netloc}/robots.txt")
        rp.read()
        if rp.can_fetch(USER_AGENT, homepage_url):
            return True, "ok"
        return False, "robots_disallow"
    except Exception as e:
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
    for tag in soup(["script", "style", "noscript", "svg"]):
        tag.decompose()
    text = soup.get_text("\n", strip=True)
    # Collapse runs of whitespace and blank lines
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text


def crawl_firm(homepage: str) -> tuple[str, dict]:
    """Returns (corpus, fetch_report). Corpus capped at MAX_CONTENT_CHARS."""
    corpus_parts: list[str] = []
    statuses: dict[str, str] = {}
    seen_urls: set[str] = set()
    char_budget = MAX_CONTENT_CHARS

    for sub_path in SUB_PATHS_TO_TRY:
        if char_budget <= 0:
            break
        url = urljoin(homepage, sub_path)
        if url in seen_urls:
            continue
        seen_urls.add(url)
        html, status = fetch_text(url)
        statuses[sub_path] = status
        if html:
            text = html_to_text(html)
            section = f"\n\n--- {sub_path or '/'} ---\n{text}"
            if len(section) > char_budget:
                section = section[:char_budget]
            corpus_parts.append(section)
            char_budget -= len(section)
        time.sleep(0.25)  # politeness between requests

    return "".join(corpus_parts), {"sub_path_statuses": statuses, "chars_collected": MAX_CONTENT_CHARS - char_budget}


def call_claude(client: anthropic.Anthropic, firm: dict, corpus: str) -> tuple[dict | None, dict]:
    """Returns (extracted_data, usage_meta). extracted_data is None on failure."""
    user_content = (
        f"FIRMA: {firm['name']}\n"
        f"WEBSITE: {firm.get('website') or '(unknown)'}\n"
        f"ADRESSE: {firm.get('address') or '(unknown)'}\n"
        f"STADT/STAAT: {firm.get('city') or ''}, {firm.get('state') or ''}\n\n"
        f"--- WEBSITE-KORPUS (homepage + Unterseiten) ---\n"
        f"{corpus}\n"
        f"--- ENDE KORPUS ---\n\n"
        f"Rufe das Werkzeug `extract_firm_data` mit den extrahierten Feldern auf. "
        f"Erfinde nichts; bei Unsicherheit gib null oder leeres Array zurück."
    )

    try:
        response = client.messages.create(
            model="claude-opus-4-8",
            max_tokens=8000,
            thinking={"type": "adaptive"},
            system=[
                {
                    "type": "text",
                    "text": SYSTEM_PROMPT,
                    "cache_control": {"type": "ephemeral"},
                }
            ],
            tools=[EXTRACTION_TOOL],
            tool_choice={"type": "auto", "disable_parallel_tool_use": True},
            messages=[{"role": "user", "content": user_content}],
        )
    except anthropic.RateLimitError as e:
        return None, {"error": "rate_limit", "detail": str(e)}
    except anthropic.BadRequestError as e:
        return None, {"error": "bad_request", "detail": str(e)}
    except anthropic.APIError as e:
        return None, {"error": "api_error", "detail": str(e), "status": getattr(e, "status_code", None)}
    except Exception as e:
        return None, {"error": "unknown", "detail": f"{type(e).__name__}: {e}"}

    # Find the tool_use block; tool_choice forced it
    extracted = None
    for block in response.content:
        if block.type == "tool_use" and block.name == "extract_firm_data":
            extracted = block.input
            break

    usage = response.usage
    usage_meta = {
        "input_tokens": usage.input_tokens,
        "output_tokens": usage.output_tokens,
        "cache_creation_input_tokens": getattr(usage, "cache_creation_input_tokens", 0),
        "cache_read_input_tokens": getattr(usage, "cache_read_input_tokens", 0),
        "stop_reason": response.stop_reason,
    }

    if extracted is None:
        usage_meta["error"] = "no_tool_use_block"
        return None, usage_meta

    return extracted, usage_meta


def build_description_enriched(extracted: dict) -> str:
    """Compose description_long with structured appendix sections that have no
    dedicated Supabase column yet. Order: long description → strengths /
    specialties / brands / certs."""
    parts = [extracted.get("description_long", "").strip()]

    def section(label: str, items: list[str]) -> str | None:
        items = [s.strip() for s in (items or []) if s and s.strip()]
        if not items:
            return None
        bullets = "\n".join(f"• {item}" for item in items)
        return f"\n\n**{label}**\n{bullets}"

    sections = [
        ("Spezialisierungen", extracted.get("specialties") or []),
        ("Eingesetzte Marken & Modelle", extracted.get("brands_models") or []),
        ("Zusätzliche Leistungen", extracted.get("additional_services") or []),
        ("Zertifizierungen", extracted.get("certifications") or []),
        ("Mitgliedschaften", extracted.get("associations") or []),
    ]
    for label, items in sections:
        s = section(label, items)
        if s:
            parts.append(s)

    cap = extracted.get("capacity_range")
    if cap:
        parts.append(f"\n\n**Tragkraft-Bereich:** {cap}")

    if extracted.get("operator_included") is True:
        parts.append("\n\n**Kranführer:** im Mietpreis enthalten.")

    legal_bits = []
    if extracted.get("legal_entity_type"):
        legal_bits.append(extracted["legal_entity_type"])
    if extracted.get("firmenbuchnummer"):
        legal_bits.append(extracted["firmenbuchnummer"])
    if extracted.get("uid_nummer"):
        legal_bits.append(extracted["uid_nummer"])
    if extracted.get("founded_year"):
        legal_bits.append(f"gegründet {extracted['founded_year']}")
    if legal_bits:
        parts.append(f"\n\n**Firmenangaben:** {' · '.join(legal_bits)}")

    return "".join(parts).strip()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slugs", default="", help="comma-separated firm slugs to limit run (test mode)")
    parser.add_argument("--commit", action="store_true", help="actually write to Supabase")
    parser.add_argument("--force", action="store_true", help="re-enrich firms whose description_enriched is already set")
    parser.add_argument("--limit", type=int, default=0, help="cap number of firms processed (0 = no cap)")
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )
    claude = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    crane_type_rows = sb.table("crane_types").select("id, slug").execute().data or []
    type_slug_to_id = {r["slug"]: r["id"] for r in crane_type_rows}

    select_cols = "id, slug, name, website, email, phone, address, city, state, country, description, description_enriched, opening_hours, service_radius_km, service_regions, price_day_from"
    query = sb.table("companies").select(select_cols).eq("country", "AT")
    if args.slugs:
        slugs = [s.strip() for s in args.slugs.split(",") if s.strip()]
        query = query.in_("slug", slugs)
    firms = query.execute().data or []
    if args.limit:
        firms = firms[: args.limit]

    print(f"AT firms in scope: {len(firms)} (force={args.force}, commit={args.commit})")
    print()

    proposals: list[dict] = []
    summary: dict = {
        "total": len(firms),
        "skipped_already_enriched": 0,
        "skipped_no_website": 0,
        "skipped_robots": 0,
        "fetched_ok": 0,
        "claude_ok": 0,
        "claude_failed": 0,
        "low_confidence": 0,
        "claude_total_input_tokens": 0,
        "claude_total_output_tokens": 0,
        "claude_total_cache_read": 0,
        "claude_total_cache_write": 0,
    }

    for i, firm in enumerate(firms, 1):
        slug = firm["slug"]
        print(f"[{i}/{len(firms)}] {slug:<45}", end=" ", flush=True)

        if not args.force and firm.get("description_enriched"):
            summary["skipped_already_enriched"] += 1
            print("→ skip (already enriched)")
            continue

        homepage = firm.get("website")
        if not homepage:
            summary["skipped_no_website"] += 1
            print("→ skip (no website)")
            continue

        allowed, robots_status = check_robots(homepage)
        if not allowed:
            summary["skipped_robots"] += 1
            print(f"→ skip ({robots_status})")
            proposals.append({"slug": slug, "id": firm["id"], "fetch_status": robots_status})
            continue

        corpus, crawl_meta = crawl_firm(homepage)
        if not corpus.strip():
            summary["claude_failed"] += 1
            print("→ fetch_failed")
            proposals.append({"slug": slug, "id": firm["id"], "fetch_status": "fetch_failed", "crawl": crawl_meta})
            continue
        summary["fetched_ok"] += 1

        extracted, usage_meta = call_claude(claude, firm, corpus)

        summary["claude_total_input_tokens"] += usage_meta.get("input_tokens", 0) or 0
        summary["claude_total_output_tokens"] += usage_meta.get("output_tokens", 0) or 0
        summary["claude_total_cache_read"] += usage_meta.get("cache_read_input_tokens", 0) or 0
        summary["claude_total_cache_write"] += usage_meta.get("cache_creation_input_tokens", 0) or 0

        if extracted is None:
            summary["claude_failed"] += 1
            err = usage_meta.get("error", "unknown")
            print(f"→ claude_fail: {err}")
            proposals.append({"slug": slug, "id": firm["id"], "fetch_status": "claude_fail", "usage": usage_meta})
            continue
        summary["claude_ok"] += 1

        confidence = extracted.get("extraction_confidence", "medium")
        if confidence == "low":
            summary["low_confidence"] += 1

        # Build proposal (Supabase updates), preserving non-null existing values
        company_update: dict = {}
        if extracted.get("email") and not firm.get("email"):
            company_update["email"] = extracted["email"]
        if extracted.get("phone") and not firm.get("phone"):
            company_update["phone"] = extracted["phone"]
        if extracted.get("opening_hours") is not None and not firm.get("opening_hours"):
            company_update["opening_hours"] = json.dumps(extracted["opening_hours"], ensure_ascii=False)
        if extracted.get("service_radius_km") and not firm.get("service_radius_km"):
            company_update["service_radius_km"] = extracted["service_radius_km"]
        if extracted.get("service_areas") and not firm.get("service_regions"):
            company_update["service_regions"] = extracted["service_areas"]
        if extracted.get("price_day_from") and not firm.get("price_day_from"):
            company_update["price_day_from"] = extracted["price_day_from"]
        if extracted.get("description_short") and (args.force or not firm.get("description")):
            company_update["description"] = extracted["description_short"]
        if confidence in ("high", "medium") and (args.force or not firm.get("description_enriched")):
            company_update["description_enriched"] = build_description_enriched(extracted)

        company_cranes_rows: list[dict] = []
        for ct_slug in extracted.get("crane_types") or []:
            tid = type_slug_to_id.get(ct_slug)
            if tid:
                company_cranes_rows.append({"company_id": firm["id"], "crane_type_id": tid})

        proposals.append({
            "slug": slug,
            "id": firm["id"],
            "fetch_status": "ok",
            "confidence": confidence,
            "extracted": extracted,
            "company_update_keys": list(company_update.keys()),
            "company_cranes_count": len(company_cranes_rows),
            "usage": usage_meta,
        })

        cache_hit = usage_meta.get("cache_read_input_tokens", 0)
        print(f"→ ok ({confidence}) types={len(extracted.get('crane_types') or [])} brands={len(extracted.get('brands_models') or [])} cache_read={cache_hit}")

        if args.commit:
            if company_update:
                sb.table("companies").update(company_update).eq("id", firm["id"]).execute()
            if company_cranes_rows:
                sb.table("company_cranes").upsert(
                    company_cranes_rows,
                    on_conflict="company_id,crane_type_id",
                    ignore_duplicates=True,
                ).execute()

    OUTPUT_FILE.write_text(
        json.dumps({"summary": summary, "proposals": proposals}, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print()
    print("=" * 60)
    print("Comprehensive scan summary:")
    for k, v in summary.items():
        print(f"  {k:<32} {v}")
    print(f"  Saved proposal:                 {OUTPUT_FILE}")
    print("=" * 60)

    if not args.commit:
        print()
        print("  Dry run — no Supabase writes. Re-run with --commit to apply.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
