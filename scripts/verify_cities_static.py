#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Post-cleanup sanity check for cities-static.ts."""
import re
from pathlib import Path

src = Path(__file__).parent.parent / "src" / "data" / "cities-static.ts"
text = src.read_text(encoding="utf-8")

def parse_block(var_name: str):
    m = re.search(rf"export const {var_name}[^=]*=\s*\[(.*?)\]", text, re.S)
    assert m, f"{var_name} block not found"
    body = m.group(1)
    # slug: 'foo'  or  slug: "foo"
    return re.findall(r"slug:\s*['\"]([^'\"]+)['\"]", body)

seo = parse_block("seoCities")
extra = parse_block("_extraCities")

print(f"seoCities: {len(seo)} entries")
print(f"_extraCities: {len(extra)} entries")
print(f"total: {len(seo) + len(extra)}")
print()

# duplicate checks
seo_dups = [s for s in seo if seo.count(s) > 1]
extra_dups = [s for s in extra if extra.count(s) > 1]
cross = set(seo) & set(extra)

if seo_dups:
    print(f"DUPLICATES in seoCities: {set(seo_dups)}")
else:
    print("OK: no duplicates in seoCities")

if extra_dups:
    print(f"DUPLICATES in _extraCities: {set(extra_dups)}")
else:
    print("OK: no duplicates in _extraCities")

if cross:
    print(f"CROSS-LIST duplicates (slug in both): {cross}")
else:
    print("OK: no slug appears in both lists")

# verify the 11 preserved cities are now in seoCities
preserved = {
    "aachen", "bielefeld", "bochum", "bonn", "erfurt",
    "freiburg", "kiel", "magdeburg", "mainz", "rostock",
    "saarbruecken",
}
missing = preserved - set(seo)
stuck = preserved & set(extra)
if missing:
    print(f"FAIL: preserved cities NOT in seoCities: {missing}")
else:
    print("OK: all 11 preserved cities are in seoCities")
if stuck:
    print(f"FAIL: preserved cities still in _extraCities: {stuck}")
else:
    print("OK: no preserved city left in _extraCities")

# verify luebeck only in seoCities
if "luebeck" in extra:
    print("FAIL: luebeck still in _extraCities")
else:
    print("OK: luebeck removed from _extraCities")
