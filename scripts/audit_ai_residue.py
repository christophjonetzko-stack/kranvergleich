"""
AI-residue audit for kranvergleich.de German content.

Scans curated TSX/TS files, extracts German prose, counts AI-tells per
1000 words, and ranks pages by residue_score. No rewriting — diagnosis only.

Markers (weighted):
  - Hard phrase tells (3pt): "Es ist wichtig zu beachten", "Zusammenfassend
    lässt sich", "Insgesamt lässt sich"
  - Medium phrase tells (2pt): "Darüber hinaus", "Im Folgenden werden",
    "Wie bereits erwähnt", "In der heutigen Zeit"
  - Soft phrase tells (1pt): "Im Wesentlichen", "Grundsätzlich"
  - Em-dash overuse (1pt per excess >5/1000 words)
  - Staccato fragments [Stmt]. [Verb-pronoun-2-6 words]. (1pt each)
  - One-word topic-headers (1pt each)
  - Connector-start of paragraph (Außerdem/Darüber hinaus/Zudem/Ebenfalls)
    >2× in same file (1pt per excess)

Excludes:
  - anbieter/[slug] (noindex)
  - impressum, datenschutz (legal, not SEO)
  - bootskran/pool/whirlpool ratgeber (Faza B measure window — DON'T touch)
  - welchen-kran-brauche-ich worked-examples (already curated 2026-05-08)

Output: sorted table page × words × residue_score × top-3 evidence.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent

# Files to scan — curated. Skip programmatic city pages, anbieter, legal.
TARGETS: list[tuple[str, str]] = [
    # (label, path-relative-to-root)
    ("/", "src/app/page.tsx"),
    ("/kostenrechner", "src/app/kostenrechner/page.tsx"),
    ("/kran-mieten-preise", "src/app/kran-mieten-preise/page.tsx"),
    ("/kranverleih", "src/app/kranverleih/page.tsx"),
    ("/preisliste", "src/app/preisliste/page.tsx"),
    ("/ueber-uns", "src/app/ueber-uns/page.tsx"),
    ("/ratgeber", "src/app/ratgeber/page.tsx"),
    ("/ratgeber/krantypen", "src/app/ratgeber/krantypen/page.tsx"),
    ("/ratgeber/was-kostet-ein-kran", "src/app/ratgeber/was-kostet-ein-kran/page.tsx"),
    ("/ratgeber/welchen-kran-brauche-ich", "src/app/ratgeber/welchen-kran-brauche-ich/page.tsx"),
    ("/ratgeber/kran-mieten-hausbau", "src/app/ratgeber/kran-mieten-hausbau/page.tsx"),
    ("/ratgeber/kran-mieten-privatperson", "src/app/ratgeber/kran-mieten-privatperson/page.tsx"),
    ("/ratgeber/kran-mieten-ohne-fuehrerschein", "src/app/ratgeber/kran-mieten-ohne-fuehrerschein/page.tsx"),
    ("/ratgeber/kran-mieten-tipps", "src/app/ratgeber/kran-mieten-tipps/page.tsx"),
    ("/ratgeber/kran-aufstellen-genehmigung", "src/app/ratgeber/kran-aufstellen-genehmigung/page.tsx"),
    ("/ratgeber/solaranlage-kran-mieten", "src/app/ratgeber/solaranlage-kran-mieten/page.tsx"),
    ("[crane-type] template", "src/app/[crane-type]/page.tsx"),
    ("[crane-type]/[city] template", "src/app/[crane-type]/[city]/page.tsx"),
    ("data/crane-ratgeber.ts (Tragkraft sections)", "src/data/crane-ratgeber.ts"),
    ("data/faq.ts", "src/data/faq.ts"),
]

# Hard AI phrase tells (case-insensitive, weighted).
PHRASE_TELLS: list[tuple[str, int]] = [
    # weight 3 — extremely strong
    (r"\bEs ist wichtig zu beachten\b", 3),
    (r"\bZusammenfassend lässt sich sagen\b", 3),
    (r"\bInsgesamt lässt sich (festhalten|sagen)\b", 3),
    (r"\bIm Folgenden werden wir\b", 3),
    # weight 2 — strong
    (r"\bDarüber hinaus\b", 2),
    (r"\bWie bereits erwähnt\b", 2),
    (r"\bWie eingangs (angedeutet|erwähnt)\b", 2),
    (r"\bIn der heutigen Zeit\b", 2),
    (r"\bAuf der einen Seite .{1,80} auf der anderen Seite\b", 2),
    # weight 1 — soft
    (r"\bIm Wesentlichen\b", 1),
    (r"\bGrundsätzlich\b", 1),
    (r"\bEs ist wichtig,\b", 1),
    (r"\bnicht zuletzt\b", 1),
]

# Pattern: short post-period sentence beginning with conjugated-verb + pronoun
# (staccato negation). Catches "Klingt überdimensioniert. Ist es aber nicht."
STACCATO_VERBS = (
    r"(?:Ist|Sind|Hat|Hatte|War|Wurde|Bleibt|Klingt|Sieht|Wirkt|Erscheint|"
    r"Bedeutet|Heißt|Geht|Macht|Gilt|Kann|Muss|Darf|Soll|Will)"
)
STACCATO_RE = re.compile(
    rf"\.\s+{STACCATO_VERBS}\s+(?:es|er|sie|das|dies|aber|auch|nur|nicht)[^.!?]{{0,40}}[.!?]"
)

# One-word "topic header" sentence: period, then 1-2 word capitalised sentence,
# then another period and continuation. e.g. "Wind. Wandelemente eines..."
ONEWORD_HEADER_RE = re.compile(
    r"(?<=[.!?])\s+([A-ZÄÖÜ][a-zäöüß]{2,15})\.\s+[A-ZÄÖÜ]"
)
# Whitelist common standalone Words that ARE legitimate (not AI-tells):
#  - explicit content-markers (Achtung, Tipp, Faustregel, Fazit)
#  - German abbreviations ending in period that AI-residue regex misclassifies
#    (Inkl., Ggf., Bzw., Z.B., Ca., Min., Max., Ggü., Bzgl., Etc.)
#  - very common nouns that often sit at the end of an enumeration line
#    (Kranführer, Bediener, Anbieter, Mwst, Anfahrt) — these aren't topic-
#    headers, they're list-tail items followed by a new sentence.
ONEWORD_WHITELIST = {
    # content-markers (legit topic-headers, intentional rhetorical device)
    "Achtung", "Beispiel", "Beispiele", "Hinweis", "Tipp", "Vorsicht",
    "Faustregel", "Fazit", "Zusammenfassung", "Kurz",
    # German abbreviations
    "Inkl", "Ggf", "Bzw", "Ca", "Min", "Max", "Ggü", "Bzgl", "Etc",
    "Bzw", "Z.B", "Ggü", "Mwst", "Brutto", "Netto",
    # frequent enumeration-tail nouns
    "Kranführer", "Bediener", "Anbieter", "Anfahrt", "Pauschale",
    "Tag", "Tage", "Woche", "Stunde", "Stunden", "Auslage", "Hubhöhe",
    "Tragkraft", "Reichweite",
}

CONNECTOR_RE = re.compile(
    r"(?:^|[\n>])\s*(?:Außerdem|Darüber hinaus|Zudem|Ebenfalls)\b"
)

# Em-dash detection — actual U+2014, not hyphen.
EM_DASH = "—"

# Spec-table / list-item em-dash: em-dash flanked by numbers + units (e.g.
# "30 t — 12 m Auslage" or "ab 800 €/Tag — Bediener inkl."). These are
# legitimate Fachtext separators per SKILL.md rule B exception. Match either
# side as: (digits or unit-token) + space + em-dash + space + (capitalised
# noun-token or digits). Catches the common "X t — Y m" / "ab N € — desc" /
# "Modell — N kg" cases without flagging mid-prose AI em-dashes.
SPEC_DASH_RE = re.compile(
    r"(?:\d+\s?[a-zäöüß€%]{0,5}|[A-ZÄÖÜ][a-zäöüß]+\s\d+[\w]*)"
    r"\s—\s"
    r"(?:\d+\s?[a-zäöüß€%]{0,5}|[A-ZÄÖÜ][a-zäöüß]+\s?\d*|ab\s\d+|inkl\.|netto|brutto)",
    re.IGNORECASE,
)


def extract_german_text(content: str) -> str:
    """Pragmatic German-prose extraction from TSX/TS source.

    Approach: drop imports + comments + JSX-attribute values + JSON-LD blocks,
    then keep everything else. Works for our codebase where prose lives mostly
    between JSX tags and inside string-literal `description:`/`answer:` props.
    Doesn't try to be a full parser — heuristic is enough for residue counts.
    """
    # Strip imports
    content = re.sub(r"^import .+?$", "", content, flags=re.MULTILINE)
    # Strip block comments
    content = re.sub(r"/\*.*?\*/", "", content, flags=re.DOTALL)
    # Strip line comments (but keep // inside strings — won't be perfect)
    content = re.sub(r"^\s*//.*$", "", content, flags=re.MULTILINE)
    # Drop JSON-LD dangerouslySetInnerHTML blocks (schema, not user-facing prose)
    content = re.sub(
        r"dangerouslySetInnerHTML=\{\{[^}]+__html:[^}]+\}\}",
        " ",
        content,
        flags=re.DOTALL,
    )
    # Drop className strings (utility-classes, not prose)
    content = re.sub(r'className=(?:"[^"]*"|\'[^\']*\'|\{[^}]*\})', " ", content)
    # Drop href/src/id/key/aria-* attributes
    content = re.sub(
        r'(?:href|src|id|key|aria-\w+|role|tabIndex|type|name|placeholder|alt|title|onClick|onChange|onSubmit)=(?:"[^"]*"|\'[^\']*\'|\{[^}]*\})',
        " ",
        content,
    )
    return content


def count_em_dashes(text: str) -> tuple[int, int]:
    """Returns (total, prose_only) — total minus spec-table/list-item dashes."""
    total = text.count(EM_DASH)
    spec_dashes = len(SPEC_DASH_RE.findall(text))
    return total, max(0, total - spec_dashes)


def count_words(text: str) -> int:
    # Strip JSX braces, count word-like tokens
    stripped = re.sub(r"[{}<>\[\]/]", " ", text)
    words = re.findall(r"\b[a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß\-]{2,}\b", stripped)
    return len(words)


def find_phrase_hits(text: str, evidence: list[str]) -> int:
    score = 0
    for pattern, weight in PHRASE_TELLS:
        matches = re.finditer(pattern, text, flags=re.IGNORECASE)
        for m in matches:
            score += weight
            ctx_start = max(0, m.start() - 30)
            ctx_end = min(len(text), m.end() + 30)
            ctx = text[ctx_start:ctx_end].replace("\n", " ").strip()
            evidence.append(f"  phrase[+{weight}]: …{ctx}…")
    return score


def find_staccato(text: str, evidence: list[str]) -> int:
    score = 0
    for m in STACCATO_RE.finditer(text):
        score += 1
        ctx_start = max(0, m.start() - 40)
        ctx_end = min(len(text), m.end() + 10)
        ctx = text[ctx_start:ctx_end].replace("\n", " ").strip()
        evidence.append(f"  staccato[+1]: …{ctx}…")
    return score


def find_oneword_headers(text: str, evidence: list[str]) -> int:
    score = 0
    for m in ONEWORD_HEADER_RE.finditer(text):
        word = m.group(1)
        if word in ONEWORD_WHITELIST:
            continue
        score += 1
        ctx_start = max(0, m.start() - 20)
        ctx_end = min(len(text), m.end() + 30)
        ctx = text[ctx_start:ctx_end].replace("\n", " ").strip()
        evidence.append(f"  oneword[+1]: …{ctx}…  (word: {word!r})")
    return score


def find_connector_overdose(text: str, evidence: list[str]) -> int:
    starts = CONNECTOR_RE.findall(text)
    if len(starts) <= 2:
        return 0
    excess = len(starts) - 2
    evidence.append(f"  connector-overdose[+{excess}]: {len(starts)}× paragraph-start connectors")
    return excess


def find_em_dash_overuse(text: str, words: int, evidence: list[str]) -> int:
    if words < 100:
        return 0
    total, prose = count_em_dashes(text)
    threshold = max(5, words // 200)  # ~5 per 1000 words
    if prose <= threshold:
        return 0
    excess = prose - threshold
    spec_excluded = total - prose
    note = f"{prose} prose em-dashes (limit {threshold} for {words} words)"
    if spec_excluded > 0:
        note += f"; {spec_excluded} spec-table em-dashes excluded"
    evidence.append(f"  em-dash-overuse[+{excess}]: {note}")
    return excess


def audit_file(path: Path) -> dict:
    raw = path.read_text(encoding="utf-8")
    text = extract_german_text(raw)
    words = count_words(text)
    evidence: list[str] = []

    score = 0
    score += find_phrase_hits(text, evidence)
    score += find_staccato(text, evidence)
    score += find_oneword_headers(text, evidence)
    score += find_connector_overdose(text, evidence)
    score += find_em_dash_overuse(text, words, evidence)

    # Normalize per 1000 words for fair cross-page comparison
    score_per_1k = (score / words * 1000) if words > 0 else 0

    return {
        "words": words,
        "score": score,
        "score_per_1k": score_per_1k,
        "evidence": evidence,
    }


def main() -> None:
    print("AI-residue audit — kranvergleich.de German content")
    print(f"Pages scanned: {len(TARGETS)}")
    print()

    results: list[tuple[str, str, dict]] = []
    for label, rel in TARGETS:
        p = ROOT / rel
        if not p.exists():
            print(f"  [skip] {label} — file not found: {rel}")
            continue
        result = audit_file(p)
        results.append((label, rel, result))

    # Rank by score-per-1000-words (fair across page lengths)
    results.sort(key=lambda r: r[2]["score_per_1k"], reverse=True)

    print(f"{'Rank':<5} {'Score/1k':>9} {'Score':>6} {'Words':>6}  Page")
    print("-" * 80)
    for i, (label, _rel, r) in enumerate(results, 1):
        marker = ""
        if r["score_per_1k"] >= 5:
            marker = " ⚠ HIGH"
        elif r["score_per_1k"] >= 2:
            marker = " ◯ MED"
        print(
            f"{i:<5} {r['score_per_1k']:>9.2f} {r['score']:>6} {r['words']:>6}  "
            f"{label}{marker}"
        )

    # Detailed evidence for top-5
    print()
    print("=" * 80)
    print("Top-5 evidence (sorted by score/1k):")
    print("=" * 80)
    for label, rel, r in results[:5]:
        print(f"\n■ {label}  —  {r['words']} words, score {r['score']} ({r['score_per_1k']:.2f}/1k)")
        print(f"  file: {rel}")
        if not r["evidence"]:
            print("  (no markers found)")
            continue
        for line in r["evidence"][:8]:
            print(line)
        if len(r["evidence"]) > 8:
            print(f"  … +{len(r['evidence']) - 8} more")


if __name__ == "__main__":
    main()
