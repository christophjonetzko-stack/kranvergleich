#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Step 4 — comprehensive enrichment of the newly-imported Dachdeckerkran DE
candidates via Claude Opus 4.7 + adaptive thinking + tool_use.

Adapted from at_firms_comprehensive_scan.py. Key DE differences:
  - country='DE', filter to newly-imported slugs (loaded from import proposal)
  - +49 phone format, no leading 0 after country code
  - DE registry fields (HRB / Amtsgericht), USt-ID (DE + 9 digits)
  - DE associations (Innung, HwK, BVMB, ZDH, etc.)
  - Same 8 crane_types catalog (slugs unchanged)

Cost: ~$0.20-0.40/firm × ~40-50 firms ≈ $8-20 total. Prompt cache amortises
across batch.

Usage:
  python dachdeckerkran_de_comprehensive_scan.py --slugs leih-kraft,wolfgang-wasel-gmbh   # test
  python dachdeckerkran_de_comprehensive_scan.py                                            # dry-run all
  python dachdeckerkran_de_comprehensive_scan.py --commit                                    # apply
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

OUTPUT_FILE = Path(__file__).parent / "dachdeckerkran_de_comprehensive_proposal.json"
IMPORT_PROPOSAL_FILE = Path(__file__).parent / "dachdeckerkran_de_import_proposal.json"

USER_AGENT = "kranvergleich.de bot (catalog enrichment; impressum@kranvergleich.de)"
HEADERS = {"User-Agent": USER_AGENT, "Accept": "text/html,application/xhtml+xml"}
TIMEOUT_SEC = 12

SUB_PATHS_TO_TRY = [
    "/", "/impressum", "/kontakt", "/contact", "/kontakte",
    "/produkte", "/produkt", "/flotte", "/fahrzeuge", "/maschinen",
    "/leistungen", "/leistung", "/services", "/service",
    "/angebot", "/angebote", "/krane", "/kran-vermietung",
    "/sortiment", "/ueber-uns", "/uber-uns", "/about",
    "/dachdeckerkran", "/dachdeckeraufzug",
]

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
    "description": "Extract structured data about a German crane rental firm from concatenated website content. Return only data clearly stated on the site; never fabricate.",
    "input_schema": {
        "type": "object",
        "properties": {
            "email": {"type": ["string", "null"], "description": "Primary contact email (info@/office@/kontakt@ preferred over personal). Null if not on site."},
            "phone": {"type": ["string", "null"], "description": "Primary phone normalized to +49 international format (drop leading 0 after country code)."},
            "opening_hours": {
                "type": ["object", "null"],
                "description": "Per-day opening hours. Null if no hours stated.",
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
            "service_radius_km": {"type": ["integer", "null"], "description": "Operating radius in km if stated."},
            "service_areas": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Cities/Bundesländer the firm explicitly serves.",
            },
            "crane_types": {
                "type": "array",
                "items": {"type": "string", "enum": CRANE_TYPE_SLUGS},
                "description": "Catalog crane-type slugs the firm clearly offers. Only the 8 enum values; conservative.",
            },
            "specialties": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Specialties beyond crane rental: Vakuumtechnik, Glasmontage, PV-Montage, Schwertransport, Dachsanierung-Logistik etc.",
            },
            "brands_models": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Specific brand+model strings: 'Liebherr LTM 1100-4.2', 'Böcker AHK 36/3000', 'Potain IGO T70'.",
            },
            "capacity_range": {"type": ["string", "null"], "description": "Range of crane capacities ('1t – 350t', 'bis 90t')."},
            "additional_services": {
                "type": "array",
                "items": {"type": "string"},
                "description": "Arbeitsbühnen, Stapler, Transport, Sondertransport, Einbringung, Lagerung.",
            },
            "operator_included": {"type": ["boolean", "null"]},
            "price_day_from": {"type": ["integer", "null"], "description": "Lowest €/Tag if explicitly published."},
            "legal_entity_type": {"type": ["string", "null"], "description": "GmbH, GmbH & Co. KG, e.K., AG, etc."},
            "handelsregister_nummer": {"type": ["string", "null"], "description": "DE commercial register, format 'HRB xxxxx Amtsgericht <City>'."},
            "ust_id_nummer": {"type": ["string", "null"], "description": "DE VAT ID, format 'DE' + 9 digits."},
            "founded_year": {"type": ["integer", "null"]},
            "description_short": {"type": "string", "description": "One-sentence German Sie-form USP, 80–120 chars."},
            "description_long": {"type": "string", "description": "200–400 words German Sie-form for /anbieter/[slug] page. Conservative; only facts from website."},
            "certifications": {
                "type": "array",
                "items": {"type": "string"},
                "description": "TÜV, Meisterbetrieb, ISO 9001, EN 1090, DGUV V52, etc.",
            },
            "associations": {
                "type": "array",
                "items": {"type": "string"},
                "description": "DE associations: Innung, HwK, BVMB, ZDH, BV Spezialtiefbau, etc.",
            },
            "extraction_confidence": {
                "type": "string",
                "enum": ["high", "medium", "low"],
            },
        },
        "required": [
            "crane_types", "specialties", "brands_models", "service_areas",
            "additional_services", "certifications", "associations",
            "description_short", "description_long", "extraction_confidence",
        ],
    },
}

SYSTEM_PROMPT = """Du bist ein präziser Datenanalyst, der Daten über deutsche Kranvermietungsfirmen aus Webseiten-Inhalten für das Vergleichsportal kranvergleich.de extrahiert.

Du erhältst zusammengefassten Klartext von der Website einer einzelnen Firma — typischerweise Homepage plus 5–10 Unterseiten (/produkte, /flotte, /leistungen, /impressum, /kontakt, /ueber-uns).

KERN-REGELN
- Erfinde nichts. Gib NUR Daten zurück, die explizit aus dem Text hervorgehen.
- Bei Unsicherheit: null (für Einzelwerte) oder leeres Array (für Listen).
- Telefonnummern auf +49-Format normalisieren; führende 0 nach Ländercode weglassen (089... → +4989...).
- Sprache der Beschreibungstexte: Deutsch, Sie-Form, sachlich. KEIN Marketing-Sprech.
- KEINE Übertreibungen oder unbelegte Behauptungen — UWG (irreführende Werbung verboten).

CRANE_TYPES (FESTES VOKABULAR — nur diese 8 Slugs)
- minikran-mieten: Mini-/Kompakt-/Spinnenkrane, batterie-elektrisch, schmale Zufahrten
- autokran-mieten: Auto-/Fahrzeugkrane (LKW-Fahrgestell), klassische Hebearbeiten
- mobilkran-mieten: Mobil-/Teleskopkrane, schwerere Klasse als Auto, All-Terrain
- baukran-mieten: Baukran/Turmdrehkran/Schnellbaukran, Langzeit-Einsatz Baustelle
- dachdeckerkran-mieten: Dachdecker-/Dachaufzug-Krane für Dachsanierung, PV-Montage, Ziegel
- raupenkran-mieten: Raupenkrane (Crawler), Schwerlast, weiche Untergründe
- anhaengerkran-mieten: trailer-mounted Krane (PKW/LKW-Anhänger)
- ladekran-mieten: LKW-Ladekrane (Heckkran am Lastwagen montiert)

WICHTIG für diese Charge: Sie wurden speziell für Dachdeckerkran-Lücke importiert. Wenn die Firma KEINEN Kranverleih anbietet (z.B. reine Dachdeckerei / Aufzugsbau / Lift-Manufacturer) → leeres crane_types-Array. Frontend filtert solche Firmen aus den Listings. Sei streng.

BRANDS_MODELS sind individuell benannte Maschinen: "Liebherr LTM 1100-4.2", "Böcker AHK 36/3000", "Potain IGO T70", "Maeda MC305", "Tadano ATF 90G". Diese werden zu eigenständigen SEO-Keywords.

DESCRIPTION_LONG (200–400 Wörter)
- Sie-Form, sachlich, kein Marketing-Sprech
- Struktur: was die Firma anbietet → typische Kunden/Branchen → geographischer Fokus → Stärken/Spezialisierung
- Keine erfundenen Zahlen, keine Slogans, keine Bewertungen
- Bei dünnem Website-Inhalt (extraction_confidence=low) lieber kürzer und faktentreu

DESCRIPTION_SHORT (80–120 Zeichen)
- Ein Satz, USP der Firma.

EXTRACTION_CONFIDENCE
- high: substantielle Inhalte, klar strukturiert, Flotte/Leistungen explizit
- medium: Homepage vorhanden aber dünn, Teile unklar
- low: kaum Inhalte, vieles geraten oder null"""


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
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"[ \t]+", " ", text)
    return text


def crawl_firm(homepage: str) -> tuple[str, dict]:
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
        time.sleep(0.25)

    return "".join(corpus_parts), {"sub_path_statuses": statuses, "chars_collected": MAX_CONTENT_CHARS - char_budget}


def call_claude(client: anthropic.Anthropic, firm: dict, corpus: str) -> tuple[dict | None, dict]:
    user_content = (
        f"FIRMA: {firm['name']}\n"
        f"WEBSITE: {firm.get('website') or '(unknown)'}\n"
        f"ADRESSE: {firm.get('address') or '(unknown)'}\n"
        f"STADT: {firm.get('city') or ''}\n\n"
        f"--- WEBSITE-KORPUS ---\n"
        f"{corpus}\n"
        f"--- ENDE ---\n\n"
        f"Rufe das Werkzeug `extract_firm_data` auf. "
        f"Erfinde nichts; bei Unsicherheit null oder leeres Array."
    )

    try:
        response = client.messages.create(
            model="claude-opus-4-7",
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
    parts = [extracted.get("description_long", "").strip()]

    def section(label: str, items: list[str]) -> str | None:
        items = [s.strip() for s in (items or []) if s and s.strip()]
        if not items:
            return None
        bullets = "\n".join(f"• {item}" for item in items)
        return f"\n\n**{label}**\n{bullets}"

    for label, items in [
        ("Spezialisierungen", extracted.get("specialties") or []),
        ("Eingesetzte Marken & Modelle", extracted.get("brands_models") or []),
        ("Zusätzliche Leistungen", extracted.get("additional_services") or []),
        ("Zertifizierungen", extracted.get("certifications") or []),
        ("Mitgliedschaften", extracted.get("associations") or []),
    ]:
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
    if extracted.get("handelsregister_nummer"):
        legal_bits.append(extracted["handelsregister_nummer"])
    if extracted.get("ust_id_nummer"):
        legal_bits.append(extracted["ust_id_nummer"])
    if extracted.get("founded_year"):
        legal_bits.append(f"gegründet {extracted['founded_year']}")
    if legal_bits:
        parts.append(f"\n\n**Firmenangaben:** {' · '.join(legal_bits)}")

    return "".join(parts).strip()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--slugs", default="", help="comma-separated slugs to test (overrides default import-proposal limit)")
    parser.add_argument("--commit", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--limit", type=int, default=0)
    args = parser.parse_args()

    sb = create_client(
        os.environ["NEXT_PUBLIC_SUPABASE_URL"],
        os.environ["SUPABASE_SERVICE_ROLE_KEY"],
    )
    claude = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    crane_type_rows = sb.table("crane_types").select("id, slug").execute().data or []
    type_slug_to_id = {r["slug"]: r["id"] for r in crane_type_rows}

    # Default scope: slugs that were just imported in Step 3 (read from
    # the import proposal JSON). Avoids re-enriching the 638 existing DE firms.
    if args.slugs:
        target_slugs = [s.strip() for s in args.slugs.split(",") if s.strip()]
    elif IMPORT_PROPOSAL_FILE.exists():
        prop = json.loads(IMPORT_PROPOSAL_FILE.read_text(encoding="utf-8"))
        target_slugs = [p["company_row"]["slug"] for p in prop.get("proposals", [])]
    else:
        print("ERROR: neither --slugs nor import proposal available", file=sys.stderr)
        return 2

    select_cols = "id, slug, name, website, email, phone, address, city, state, country, description, description_enriched, opening_hours, service_radius_km, service_regions, price_day_from"
    firms = sb.table("companies").select(select_cols).in_("slug", target_slugs).execute().data or []
    if args.limit:
        firms = firms[: args.limit]

    print(f"Firms in scope: {len(firms)} (force={args.force}, commit={args.commit})")
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
        "empty_crane_types": 0,
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
        if not (extracted.get("crane_types") or []):
            summary["empty_crane_types"] += 1

        company_update: dict = {}
        has_crane_types = bool(extracted.get("crane_types") or [])

        # False-positive guard: when AI confirms the firm is not a crane-rental
        # business (empty crane_types after a high/medium-confidence read of
        # the website), set is_relevant=false so the frontend hides it. Saves
        # manual cleanup; we keep the row + AI-generated description for later
        # audit ("why was this in the import?"), but it stops showing up in
        # listings + auto_select_nearest (queries already filter is_relevant=true).
        if not has_crane_types and confidence in ("high", "medium"):
            company_update["is_relevant"] = False

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
        print(f"→ ok ({confidence}) types={len(extracted.get('crane_types') or [])} brands={len(extracted.get('brands_models') or [])} cache={cache_hit}")

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
    print("=" * 70)
    print("Comprehensive scan summary:")
    for k, v in summary.items():
        print(f"  {k:<32} {v}")
    print(f"  Saved proposal: {OUTPUT_FILE}")
    print("=" * 70)

    if not args.commit:
        print("\n  Dry run — no Supabase writes. Re-run with --commit to apply.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
