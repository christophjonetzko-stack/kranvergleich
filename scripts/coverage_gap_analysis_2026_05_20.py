"""
Coverage gap analysis — find DE regions where the catalog has weak firm
coverage, especially per crane type. Used to prioritize firm-sourcing in
the next bulk-import (Westerwald/Kohlhaas-class prevention).

Method:
  1. Load all active+relevant DE firms with lat/lng + their declared crane
     types from company_cranes.
  2. Group representative cities by PLZ-2 prefix (regional buckets).
  3. For each (region × crane_type) combo, compute nearest firm distance
     + count within 50/100/150 km.
  4. Flag combos with NO firm ≤150 km (= would be 🚨 LEAD OHNE ANBIETER
     even with B's 150km cap) and (region, type) with >100 km to nearest
     (= autoSelectedRadiusKm would be 150, suboptimal UX).
  5. Cross-reference: which crane types are most-frequently gap-prone?
"""
import os
import sys
import json
import math
from collections import defaultdict
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

for line in Path(".env.local").read_text(encoding="utf-8").splitlines():
    if "=" in line and not line.startswith("#"):
        k, _, v = line.partition("=")
        os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)


def hav(lat1, lng1, lat2, lng2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlng = math.radians(lng2 - lng1)
    a = math.sin(dlat / 2) ** 2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlng / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


# ---- 1) Load DE firms with declared crane types ----
firms = (
    sb.table("companies")
    .select("id, name, city, zip, lat, lng")
    .eq("is_active", True)
    .eq("is_relevant", True)
    .eq("country", "DE")
    .not_.is_("lat", "null")
    .limit(2000)
    .execute()
    .data
)
print(f"Active DE firms with lat/lng: {len(firms)}")

# Paginate — Supabase Python client silently truncates to 1000 even with
# higher .limit(). company_cranes has ~2023 rows (memory project_wartung
# misclassification_audit_pending), so we need to .range() through all of them.
cranes: list = []
PAGE = 1000
for offset in range(0, 20000, PAGE):
    r = sb.table("company_cranes").select("company_id, crane_type_id").range(offset, offset + PAGE - 1).execute()
    if not r.data:
        break
    cranes.extend(r.data)
    if len(r.data) < PAGE:
        break
print(f"company_cranes (paginated): {len(cranes)} rows")
firm_by_id = {f["id"]: f for f in firms}
firm_types = defaultdict(set)
for c in cranes:
    if c["company_id"] in firm_by_id:
        firm_types[c["company_id"]].add(c["crane_type_id"])

types = sb.table("crane_types").select("id, name, slug").execute().data
type_name_by_id = {t["id"]: t["name"] for t in types}
type_slug_by_id = {t["id"]: t["slug"] for t in types}

# Index firms by crane type
firms_by_type = defaultdict(list)  # type_id → [(lat, lng, name, city)]
for f in firms:
    for tid in firm_types.get(f["id"], set()):
        firms_by_type[tid].append((f["lat"], f["lng"], f["name"], f.get("city") or "", f.get("zip") or ""))
print(f"Crane types with at least 1 firm: {len(firms_by_type)}")

# ---- 2) Representative cities per PLZ-2 bucket ----
# Pick a meaningful city for each PLZ-2 prefix (00..99). Hardcoded — covers
# every Bundesland's major population centers. Skip prefixes that are pure
# rural or industrial (e.g. 19xx Mecklenburg Bauernhof land).
REPR_CITIES = [
    # (PLZ-2, name, lat, lng, state, population_k)
    ("01", "Dresden", 51.0504, 13.7373, "Sachsen", 555),
    ("02", "Bautzen", 51.1839, 14.4244, "Sachsen", 39),
    ("03", "Cottbus", 51.7563, 14.3328, "Brandenburg", 99),
    ("04", "Leipzig", 51.3397, 12.3731, "Sachsen", 605),
    ("06", "Halle (Saale)", 51.4825, 11.9697, "Sachsen-Anhalt", 240),
    ("07", "Gera", 50.8807, 12.0820, "Thüringen", 93),
    ("08", "Plauen", 50.4946, 12.1378, "Sachsen", 64),
    ("09", "Chemnitz", 50.8278, 12.9214, "Sachsen", 246),
    ("10", "Berlin (Mitte)", 52.5200, 13.4050, "Berlin", 3700),
    ("14", "Potsdam", 52.3906, 13.0645, "Brandenburg", 184),
    ("15", "Frankfurt (Oder)", 52.3471, 14.5506, "Brandenburg", 57),
    ("17", "Neubrandenburg", 53.5566, 13.2611, "Mecklenburg-Vorpommern", 64),
    ("18", "Rostock", 54.0887, 12.1404, "Mecklenburg-Vorpommern", 209),
    ("19", "Schwerin", 53.6355, 11.4012, "Mecklenburg-Vorpommern", 95),
    ("20", "Hamburg", 53.5511, 9.9937, "Hamburg", 1900),
    ("23", "Lübeck", 53.8654, 10.6866, "Schleswig-Holstein", 215),
    ("24", "Kiel", 54.3233, 10.1228, "Schleswig-Holstein", 246),
    ("26", "Oldenburg", 53.1435, 8.2146, "Niedersachsen", 169),
    ("28", "Bremen", 53.0793, 8.8017, "Bremen", 569),
    ("30", "Hannover", 52.3759, 9.7320, "Niedersachsen", 538),
    ("32", "Bielefeld", 52.0302, 8.5325, "Nordrhein-Westfalen", 333),
    ("33", "Paderborn", 51.7189, 8.7575, "Nordrhein-Westfalen", 151),
    ("34", "Kassel", 51.3127, 9.4797, "Hessen", 202),
    ("35", "Marburg", 50.8021, 8.7665, "Hessen", 76),
    ("36", "Fulda", 50.5550, 9.6808, "Hessen", 69),
    ("37", "Göttingen", 51.5413, 9.9158, "Niedersachsen", 119),
    ("38", "Braunschweig", 52.2689, 10.5268, "Niedersachsen", 250),
    ("39", "Magdeburg", 52.1205, 11.6276, "Sachsen-Anhalt", 235),
    ("40", "Düsseldorf", 51.2277, 6.7735, "Nordrhein-Westfalen", 619),
    ("41", "Mönchengladbach", 51.1805, 6.4428, "Nordrhein-Westfalen", 261),
    ("42", "Wuppertal", 51.2562, 7.1508, "Nordrhein-Westfalen", 354),
    ("44", "Dortmund", 51.5136, 7.4653, "Nordrhein-Westfalen", 587),
    ("45", "Essen", 51.4556, 7.0116, "Nordrhein-Westfalen", 583),
    ("48", "Münster", 51.9607, 7.6261, "Nordrhein-Westfalen", 315),
    ("49", "Osnabrück", 52.2799, 8.0472, "Niedersachsen", 167),
    ("50", "Köln", 50.9375, 6.9603, "Nordrhein-Westfalen", 1080),
    ("52", "Aachen", 50.7753, 6.0839, "Nordrhein-Westfalen", 249),
    ("53", "Bonn", 50.7374, 7.0982, "Nordrhein-Westfalen", 331),
    ("54", "Trier", 49.7596, 6.6441, "Rheinland-Pfalz", 110),
    ("55", "Mainz", 50.0010, 8.2716, "Rheinland-Pfalz", 218),
    ("56", "Koblenz", 50.3569, 7.5890, "Rheinland-Pfalz", 113),
    ("57", "Siegen", 50.8746, 8.0243, "Nordrhein-Westfalen", 102),
    ("58", "Hagen", 51.3592, 7.4630, "Nordrhein-Westfalen", 188),
    ("59", "Hamm", 51.6739, 7.8155, "Nordrhein-Westfalen", 180),
    ("60", "Frankfurt am Main", 50.1109, 8.6821, "Hessen", 760),
    ("63", "Aschaffenburg", 49.9786, 9.1494, "Bayern", 71),
    ("64", "Darmstadt", 49.8728, 8.6512, "Hessen", 159),
    ("65", "Wiesbaden", 50.0826, 8.2400, "Hessen", 278),
    ("66", "Saarbrücken", 49.2353, 6.9969, "Saarland", 178),
    ("67", "Ludwigshafen", 49.4775, 8.4435, "Rheinland-Pfalz", 173),
    ("68", "Mannheim", 49.4875, 8.4660, "Baden-Württemberg", 311),
    ("69", "Heidelberg", 49.3988, 8.6724, "Baden-Württemberg", 159),
    ("70", "Stuttgart", 48.7758, 9.1829, "Baden-Württemberg", 626),
    ("72", "Tübingen", 48.5216, 9.0576, "Baden-Württemberg", 91),
    ("74", "Heilbronn", 49.1427, 9.2109, "Baden-Württemberg", 126),
    ("75", "Pforzheim", 48.8920, 8.6946, "Baden-Württemberg", 126),
    ("76", "Karlsruhe", 49.0069, 8.4037, "Baden-Württemberg", 308),
    ("77", "Offenburg", 48.4737, 7.9498, "Baden-Württemberg", 60),
    ("78", "Villingen-Schwenningen", 48.0613, 8.4639, "Baden-Württemberg", 86),
    ("79", "Freiburg im Breisgau", 47.9990, 7.8421, "Baden-Württemberg", 234),
    ("80", "München", 48.1351, 11.5820, "Bayern", 1487),
    ("85", "Ingolstadt", 48.7665, 11.4258, "Bayern", 138),
    ("86", "Augsburg", 48.3705, 10.8978, "Bayern", 296),
    ("87", "Kempten", 47.7270, 10.3162, "Bayern", 69),
    ("88", "Ravensburg", 47.7820, 9.6107, "Baden-Württemberg", 51),
    ("89", "Ulm", 48.4011, 9.9876, "Baden-Württemberg", 126),
    ("90", "Nürnberg", 49.4521, 11.0767, "Bayern", 518),
    ("93", "Regensburg", 49.0134, 12.1016, "Bayern", 154),
    ("94", "Passau", 48.5667, 13.4319, "Bayern", 53),
    ("95", "Bayreuth", 49.9456, 11.5713, "Bayern", 74),
    ("96", "Bamberg", 49.8988, 10.9028, "Bayern", 77),
    ("97", "Würzburg", 49.7913, 9.9534, "Bayern", 127),
    ("98", "Suhl", 50.6086, 10.6914, "Thüringen", 34),
    ("99", "Erfurt", 50.9848, 11.0299, "Thüringen", 213),
]
print(f"\nRepresentative cities sampled: {len(REPR_CITIES)} buckets")
print(f"Population total covered: {sum(p for _, _, _, _, _, p in REPR_CITIES):,}k people")

# ---- 3) Coverage matrix: per (region × crane_type) ----
gaps_by_type = defaultdict(list)  # type_id → [(plz2, city, nearest_km, n_50km, n_100km, n_150km)]
gap_50km_count_per_type = defaultdict(int)
gap_150km_count_per_type = defaultdict(int)

for plz2, city, lat, lng, state, pop_k in REPR_CITIES:
    for tid, firm_list in firms_by_type.items():
        dists = [hav(lat, lng, f[0], f[1]) for f in firm_list]
        dists.sort()
        nearest = dists[0] if dists else 9999
        n50 = sum(1 for d in dists if d <= 50)
        n100 = sum(1 for d in dists if d <= 100)
        n150 = sum(1 for d in dists if d <= 150)
        gaps_by_type[tid].append({
            "plz2": plz2, "city": city, "state": state, "pop_k": pop_k,
            "nearest_km": round(nearest, 1),
            "n50": n50, "n100": n100, "n150": n150,
        })
        if n50 < 3:
            gap_50km_count_per_type[tid] += 1
        if n150 == 0:
            gap_150km_count_per_type[tid] += 1


# ---- 4) Top gaps overall (any type with 0 firms ≤150km) ----
print("\n" + "=" * 90)
print("HARD GAPS — region/type combos where 150km cap returns 0 firms")
print("(= would trigger 🚨 LEAD OHNE ANBIETER even with B's expansion)")
print("=" * 90)
hard_gaps = []
for tid, rows in gaps_by_type.items():
    tname = type_name_by_id.get(tid, "?")
    for r in rows:
        if r["n150"] == 0:
            hard_gaps.append({"type": tname, **r})
hard_gaps.sort(key=lambda r: -r["pop_k"])
print(f"\n{'TYPE':<18} {'CITY':<24} {'STATE':<26} {'POP':>6}  {'NEAREST':>10}")
print("-" * 90)
for g in hard_gaps[:20]:
    print(f"{g['type'][:18]:<18} {g['city'][:24]:<24} {g['state'][:26]:<26} {g['pop_k']:>5}k  {g['nearest_km']:>8.1f} km")
if not hard_gaps:
    print("(none — every region/type has ≥1 firm ≤150 km)")

# ---- 5) Weak coverage: <3 firms within 50km per crane type ----
print("\n" + "=" * 90)
print("WEAK COVERAGE — region/type combos with <3 firms ≤50km")
print("(= B's 50km tier fails, auto-select expands to 100 or 150)")
print("=" * 90)
weak_by_type = []
for tid, rows in gaps_by_type.items():
    tname = type_name_by_id.get(tid, "?")
    for r in rows:
        if r["n50"] < 3:
            weak_by_type.append({"type": tname, **r})
weak_by_type.sort(key=lambda r: (-r["pop_k"], r["nearest_km"]))
print(f"\nTotal weak combos: {len(weak_by_type)}")
print(f"\nTop 25 weak by population:")
print(f"{'TYPE':<18} {'CITY':<22} {'STATE':<24} {'POP':>5}  {'n≤50':>5} {'n≤100':>6} {'n≤150':>6}  {'NEAREST':>8}")
print("-" * 100)
for g in weak_by_type[:25]:
    print(f"{g['type'][:18]:<18} {g['city'][:22]:<22} {g['state'][:24]:<24} {g['pop_k']:>4}k  {g['n50']:>5} {g['n100']:>6} {g['n150']:>6}  {g['nearest_km']:>6.1f} km")

# ---- 6) Per-type gap counts ----
print("\n" + "=" * 90)
print("PER-TYPE GAP COUNTS (across all 72 regional buckets)")
print("=" * 90)
print(f"{'TYPE':<18} {'<3 in 50km':>12} {'0 in 150km':>12} {'Total firms':>14}")
print("-" * 60)
for tid, firm_list in sorted(firms_by_type.items(), key=lambda x: -len(x[1])):
    tname = type_name_by_id.get(tid, "?")
    g50 = gap_50km_count_per_type.get(tid, 0)
    g150 = gap_150km_count_per_type.get(tid, 0)
    print(f"{tname[:18]:<18} {g50:>12} {g150:>12} {len(firm_list):>14}")

# ---- 7) Per-region overall gap (any crane type) ----
print("\n" + "=" * 90)
print("REGIONS WHERE MAJOR CRANE TYPES ARE MOSTLY SPARSE")
print("=" * 90)
# For each region, count how many crane types have <3 firms within 50km
region_sparsity = []
for plz2, city, lat, lng, state, pop_k in REPR_CITIES:
    sparse_types = []
    for tid, rows in gaps_by_type.items():
        for r in rows:
            if r["plz2"] == plz2 and r["n50"] < 3:
                sparse_types.append(type_name_by_id.get(tid, "?"))
    region_sparsity.append({
        "plz2": plz2, "city": city, "state": state, "pop_k": pop_k,
        "sparse_count": len(sparse_types),
        "sparse_types": sparse_types,
    })
region_sparsity.sort(key=lambda r: (-r["sparse_count"], -r["pop_k"]))
print(f"\n{'CITY':<22} {'STATE':<24} {'POP':>5}  {'SparseT/8'}  {'sparse types'}")
print("-" * 100)
for r in region_sparsity[:15]:
    types_short = ", ".join(t[:8] for t in r["sparse_types"][:6])
    print(f"{r['city'][:22]:<22} {r['state'][:24]:<24} {r['pop_k']:>4}k  {r['sparse_count']:>3}/{len(firms_by_type)}      {types_short}")

# ---- 8) Save full JSON for follow-up ----
out = {
    "generated_at": "2026-05-20",
    "total_firms": len(firms),
    "firms_by_type_count": {type_name_by_id.get(tid, "?"): len(fl) for tid, fl in firms_by_type.items()},
    "hard_gaps": hard_gaps,
    "weak_combos_top_25": weak_by_type[:25],
    "region_sparsity_top_15": region_sparsity[:15],
}
Path("scripts/coverage_gap_2026_05_20.json").write_text(
    json.dumps(out, indent=2, ensure_ascii=False, default=str), encoding="utf-8"
)
print("\n✓ Saved full report to scripts/coverage_gap_2026_05_20.json")
