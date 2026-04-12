#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cluster all companies (email='???' + real-email) via union-find on:
  - normalized name (stripped of legal suffixes / Kran terms)
  - phone (digits only)
  - website domain

Reports clusters that contain at least one '???' firm. This surfaces branch
chains even when NO member of the chain has a real email.
"""
import os
import re
import sys
from collections import defaultdict

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


def normalize_name(name: str) -> str:
    """Strip legal suffixes and common Kran terms to find core brand."""
    if not name:
        return ""
    s = name.lower()
    suffixes = [
        r"\bgmbh\s*&\s*co\.?\s*kg\b",
        r"\bgmbh\s*&\s*co\.?\b",
        r"\bgmbh\b",
        r"\bkg\b",
        r"\bag\b",
        r"\be\.?\s*k\.?\b",
        r"\bohg\b",
        r"\be\.?\s*v\.?\b",
        r"\bug\b",
        r"\bgbr\b",
        r"\binh\.?\b",
        r"\bkranverleih\b",
        r"\bkranvermietung\b",
        r"\bkran[-\s]*vermietung\b",
        r"\bkran[-\s]*und[-\s]*schwerlastlogistik\b",
        r"\bschwerlastlogistik\b",
        r"\bkranservice\b",
        r"\bkran[-\s]*service\b",
        r"\bkranlogistik\b",
        r"\bbaumaschinen\b",
        r"\bmietservice\b",
        r"\barbeitsbühnen\b",
        r"\bfahrzeugvermietung\b",
        r"\bvermietung\b",
        r"\bverleih\b",
        r"\btransport\b",
        r"\btransporte\b",
    ]
    for pat in suffixes:
        s = re.sub(pat, " ", s)
    s = re.sub(r"[^\w\s]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s


def normalize_phone(phone: str) -> str:
    if not phone:
        return ""
    digits = re.sub(r"\D", "", phone)
    # Drop leading country code 49 for DE and leading 0
    if digits.startswith("49"):
        digits = digits[2:]
    return digits.lstrip("0")


def domain_of(url: str) -> str:
    if not url:
        return ""
    m = re.search(r"https?://([^/]+)", url)
    host = m.group(1) if m else url
    host = host.replace("www.", "").lower()
    return host.split("/")[0]


# ─── Union-Find ───────────────────────────────────────────
class UnionFind:
    def __init__(self):
        self.parent: dict = {}

    def find(self, x):
        if x not in self.parent:
            self.parent[x] = x
            return x
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        # Path compression
        while self.parent[x] != root:
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra != rb:
            self.parent[ra] = rb


# ─── Load all firms ───────────────────────────────────────
rows = []
page = 0
while True:
    batch = sb.table("companies").select(
        "id,name,city,state,email,website,phone"
    ).range(page * 1000, page * 1000 + 999).execute().data
    if not batch:
        break
    rows.extend(batch)
    if len(batch) < 1000:
        break
    page += 1

for r in rows:
    r["_name_key"] = normalize_name(r["name"])
    r["_phone_key"] = normalize_phone(r.get("phone") or "")
    r["_domain"] = domain_of(r.get("website") or "")

print(f"Total companies: {len(rows)}")
skipped_ids = {r["id"] for r in rows if (r.get("email") or "").strip() == "???"}
print(f"'???' email:     {len(skipped_ids)}")
print()

# ─── Build clusters via union-find ────────────────────────
uf = UnionFind()
for r in rows:
    uf.find(r["id"])

name_buckets: dict[str, list] = defaultdict(list)
phone_buckets: dict[str, list] = defaultdict(list)
domain_buckets: dict[str, list] = defaultdict(list)

for r in rows:
    if r["_name_key"] and len(r["_name_key"]) >= 4:
        name_buckets[r["_name_key"]].append(r["id"])
    if r["_phone_key"] and len(r["_phone_key"]) >= 6:
        phone_buckets[r["_phone_key"]].append(r["id"])
    if r["_domain"]:
        domain_buckets[r["_domain"]].append(r["id"])

def union_bucket(bucket: dict):
    for _, ids in bucket.items():
        if len(ids) > 1:
            first = ids[0]
            for other in ids[1:]:
                uf.union(first, other)

union_bucket(name_buckets)
union_bucket(phone_buckets)
union_bucket(domain_buckets)

# Group by root
by_root: dict[str, list] = defaultdict(list)
for r in rows:
    by_root[uf.find(r["id"])].append(r)

# Interesting clusters: size >=2 AND contains at least one '???' firm
clusters = []
for _, members in by_root.items():
    if len(members) < 2:
        continue
    has_skipped = any(m["id"] in skipped_ids for m in members)
    if has_skipped:
        clusters.append(members)

clusters.sort(key=lambda c: -len(c))

print("=" * 80)
print(f"{len(clusters)} CLUSTERS containing at least one '???' firm")
print("=" * 80)

total_skipped_in_clusters = 0
total_skipped_standalone = 0

for i, members in enumerate(clusters, 1):
    # Pick a "canonical" member: one with a real email, else first
    canonical = next(
        (m for m in members if m.get("email") and m["email"].strip() not in ("???", "?", "-")),
        members[0],
    )
    brand = canonical["_name_key"] or canonical["name"][:30]

    skipped_in = [m for m in members if m["id"] in skipped_ids]
    total_skipped_in_clusters += len(skipped_in)

    print(f"\n#{i} — {brand!r} ({len(members)} entries, {len(skipped_in)} '???')")
    for m in sorted(members, key=lambda x: (x.get("state") or "", x.get("city") or "")):
        mark = "???" if m["id"] in skipped_ids else "OK "
        email = m.get("email") or ""
        short_email = email[:30] if email else "(null)"
        print(f"   [{mark}] {m['name'][:45]:45} | {(m.get('city') or '')[:18]:18} ({(m.get('state') or '')[:22]:22}) | {short_email}")

# Standalone '???' firms (not in any multi-member cluster)
standalone = []
for r in rows:
    if r["id"] in skipped_ids:
        root = uf.find(r["id"])
        if len(by_root[root]) == 1:
            standalone.append(r)
            total_skipped_standalone += 1

print()
print("=" * 80)
print(f"STANDALONE '???' firms (no cluster match) — {len(standalone)}")
print("=" * 80)
for r in sorted(standalone, key=lambda x: (x.get("state") or "", x.get("name") or "")):
    print(f"  - {r['name'][:55]:55} | {(r.get('city') or '')[:18]:18} ({(r.get('state') or '')[:22]:22}) | phone={r.get('phone') or '—'}")

print()
print("=" * 80)
print(f"SUMMARY")
print("=" * 80)
print(f"Total '???' firms:             {len(skipped_ids)}")
print(f"  - In branch clusters:        {total_skipped_in_clusters}")
print(f"  - Standalone (no match):     {total_skipped_standalone}")
print(f"Clusters with ≥1 '???':        {len(clusters)}")
