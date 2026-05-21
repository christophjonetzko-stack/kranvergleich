#!/usr/bin/env python3
"""Remove AI-tell characters from a file (em-dash, arrow, =-conjunction).

Replacement rules:
  ' — X' where X starts uppercase → '. X' (sentence break)
  ' — x' where x starts lowercase → ', x' (continuation)
  ' — '                           → ', ' (fallback)
  '—X'  (no surrounding spaces)   → 'X' (drop, unusual)
  '→'                             → '' (drop arrow)
  '&rarr;'                        → '' (drop HTML arrow entity)
  ' = X' where context is text    → ' bedeutet X' (NOT applied globally — too risky;
                                     manual review per case)

Usage: python clean_ai_chars.py <path>  (writes in place after diff preview)
       python clean_ai_chars.py <path> --apply  (skip preview)
"""
import re
import sys
import difflib
from pathlib import Path


def clean(text: str) -> str:
    # Em-dash with surrounding spaces: " — X" / " — x"
    text = re.sub(r' — ([A-ZÄÖÜ])', r'. \1', text)
    text = re.sub(r' — ([a-zäöüß])', r', \1', text)
    # Em-dash followed by close-quote or sentence-end punctuation
    text = re.sub(r' — ', ', ', text)
    # Stray em-dash with no flanking spaces (rare, treat as drop)
    text = text.replace('—', '')
    # Arrows
    text = text.replace('→', '')
    text = text.replace('&rarr;', '')
    return text


def main():
    if len(sys.argv) < 2:
        print('usage: clean_ai_chars.py <path> [--apply]', file=sys.stderr)
        sys.exit(2)
    path = Path(sys.argv[1])
    apply = '--apply' in sys.argv

    src = path.read_text(encoding='utf-8')
    dst = clean(src)

    if src == dst:
        print(f'{path}: no changes')
        return

    if not apply:
        diff = list(difflib.unified_diff(
            src.splitlines(keepends=True),
            dst.splitlines(keepends=True),
            fromfile=str(path),
            tofile=str(path) + ' (cleaned)',
            n=1,
        ))
        sys.stdout.writelines(diff)
        print(f'\n--- preview only. add --apply to write {path}', file=sys.stderr)
        return

    path.write_text(dst, encoding='utf-8')
    print(f'wrote {path}')


if __name__ == '__main__':
    main()
