"""
One-shot bulk edit: add `images: [OG_IMAGE]` to every page-level openGraph block
that doesn't already include it, plus the matching `OG_IMAGE` import.

Run once after creating src/lib/og-image.ts and src/app/opengraph-image.tsx.
Idempotent — re-running only touches files still missing the change.

Why a script instead of 18 individual Edits: easier to reason about a single
brace-matching algorithm than to write 18 unique anchor strings, and
re-running after a file split or rename Just Works.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
APP = REPO / "src" / "app"

# Files with `openGraph: {` blocks at metadata level. layout.tsx is excluded —
# its openGraph stays parent (file convention adds images at root), and adding
# images here would emit them twice for routes that DON'T override openGraph.
EXCLUDE = {"layout.tsx"}


def find_openGraph_block(text: str) -> tuple[int, int] | None:
    """Returns (start_offset_of_opening_brace, end_offset_AFTER_matching_close).
    Brace-matches from the FIRST `openGraph: {` occurrence."""
    m = re.search(r"openGraph\s*:\s*\{", text)
    if not m:
        return None
    i = m.end() - 1  # position of `{`
    depth = 0
    in_str = False
    str_char = ""
    j = i
    while j < len(text):
        c = text[j]
        if in_str:
            if c == "\\":
                j += 2; continue
            if c == str_char:
                in_str = False
        else:
            if c in "\"'`":
                in_str = True; str_char = c
            elif c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    return i, j + 1
        j += 1
    return None


def patch(path: Path) -> str:
    """Returns 'patched', 'already', 'no_og', or 'noimport_skip' for telemetry."""
    text = path.read_text(encoding="utf-8")

    block = find_openGraph_block(text)
    if block is None:
        return "no_og"
    start, end = block
    og_block = text[start:end]

    if "OG_IMAGE" in og_block:
        return "already"

    # Insert `      images: [OG_IMAGE],\n` right before the closing `}`. Match
    # the file's existing indentation by snapping to the indent of the opening
    # `{`'s line.
    line_start = text.rfind("\n", 0, start) + 1
    indent_match = re.match(r"\s*", text[line_start:start])
    indent = (indent_match.group(0) if indent_match else "  ") + "  "
    insertion = f"{indent}images: [OG_IMAGE],\n{(indent_match.group(0) if indent_match else '  ')}"

    # The closing `}` is at end-1; slice text[:end-1] + insertion + text[end-1:]
    new_text = text[: end - 1] + insertion + text[end - 1 :]

    # Add OG_IMAGE import if missing
    if "from '@/lib/og-image'" not in new_text:
        # Insert after the last existing `import ... from '@/lib/...';` line
        last_import = None
        for m in re.finditer(r"^import .*?\n", new_text, re.M):
            last_import = m
        if last_import is None:
            # No imports — paste at top
            new_text = "import { OG_IMAGE } from '@/lib/og-image'\n" + new_text
        else:
            insert_at = last_import.end()
            new_text = (
                new_text[:insert_at]
                + "import { OG_IMAGE } from '@/lib/og-image'\n"
                + new_text[insert_at:]
            )

    path.write_text(new_text, encoding="utf-8")
    return "patched"


def main() -> int:
    counts = {"patched": [], "already": [], "no_og": []}
    for tsx in APP.rglob("page.tsx"):
        if tsx.name in EXCLUDE:
            continue
        result = patch(tsx)
        counts.setdefault(result, []).append(tsx.relative_to(REPO).as_posix())

    for k, v in counts.items():
        print(f"{k}: {len(v)}")
        for p in v:
            print(f"  - {p}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
