/**
 * Script: Reads CSV files and generates SQL for Supabase import.
 * Run with: npx tsx scripts/generate-seed-sql.ts
 * Output: supabase/seed_from_csv.sql
 */

import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Simple CSV parser that handles quoted fields
function parseCSV(content: string): Record<string, string>[] {
  const lines: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < content.length; i++) {
    const char = content[i]
    if (char === '"') {
      inQuotes = !inQuotes
      current += char
    } else if (char === '\n' && !inQuotes) {
      lines.push(current)
      current = ''
    } else {
      current += char
    }
  }
  if (current.trim()) lines.push(current)

  if (lines.length === 0) return []

  const headerLine = lines[0]
  const headers = parseCSVLine(headerLine)
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === 0) continue
    const row: Record<string, string> = {}
    headers.forEach((h, j) => {
      row[h.trim()] = (values[j] || '').trim()
    })
    rows.push(row)
  }
  return rows
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)
  return result
}

function escapeSQL(str: string): string {
  return str.replace(/'/g, "''").replace(/\\/g, '\\\\')
}

// ---------- MAIN ----------

const rootDir = join(__dirname, '..')
const parentDir = join(rootDir, '..')

const companiesCSV = readFileSync(
  join(parentDir, 'kranvergleich_FINAL_all_scrapes.csv'),
  'utf-8'
)
const citiesCSV = readFileSync(
  join(parentDir, 'cities_for_seo_FINAL.csv'),
  'utf-8'
)

const companyRows = parseCSV(companiesCSV)
const cityRows = parseCSV(citiesCSV)

console.log(`Parsed ${companyRows.length} companies, ${cityRows.length} cities`)

let sql = `-- =============================================
-- AUTO-GENERATED SEED DATA FROM CSV
-- Generated: ${new Date().toISOString()}
-- =============================================

-- IMPORTANT: Run 001_initial_schema.sql FIRST!

-- =============================================
-- 1. CRANE TYPES (Referenztabelle)
-- =============================================
INSERT INTO crane_types (slug, name, name_plural, description, price_day_from, price_day_to, price_week_from, price_week_to, typical_capacity_kg, typical_height_m, typical_reach_m, sort_order,
  meta_title_template, meta_description_template) VALUES

('minikran-mieten', 'Minikran', 'Minikrane',
 'Kompakte Krane für enge Baustellen, Innenräume und schwer zugängliche Bereiche. Ideal für Glasmontage, Dacharbeiten und Wärmepumpen-Installation.',
 250, 500, 1200, 2800, '500 - 3.000 kg', '5 - 18 m', '3 - 16 m', 1,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Tagespreise ab {price}€. Bewertungen, Verfügbarkeit & sofort Angebot anfragen.'),

('autokran-mieten', 'Autokran', 'Autokrane',
 'Mobilkrane auf LKW-Fahrgestell. Schnell einsatzbereit, flexibel und für mittlere bis schwere Lasten geeignet.',
 500, 2000, 2500, 10000, '10 - 500 t', '20 - 100 m', '10 - 60 m', 2,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Tagespreise ab {price}€. Mit oder ohne Kranführer.'),

('dachdeckerkran-mieten', 'Dachdeckerkran', 'Dachdeckerkrane',
 'Spezialkrane für Dachdeckerarbeiten. Kompakt, schnell aufgebaut und ideal für Materiallogistik auf dem Dach.',
 200, 450, 1000, 2500, '500 - 2.000 kg', '15 - 30 m', '10 - 25 m', 3,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Perfekt für Dacharbeiten. Preise & Bewertungen.'),

('raupenkran-mieten', 'Raupenkran', 'Raupenkrane',
 'Krane auf Raupenfahrwerk für schweres Gelände und große Traglasten. Ideal für Infrastrukturprojekte.',
 800, 5000, 4000, 25000, '50 - 3.000 t', '30 - 200 m', '20 - 100 m', 4,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Für schwere Lasten und schwieriges Gelände.'),

('anhaengerkran-mieten', 'Anhängerkran', 'Anhängerkrane',
 'Auf Anhänger montierte Krane. Leicht transportierbar, ideal für wechselnde Einsatzorte.',
 150, 350, 700, 1800, '300 - 1.500 kg', '10 - 20 m', '5 - 15 m', 5,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Leicht transportierbar, flexibel einsetzbar.'),

('mobilkran-mieten', 'Mobilkran', 'Mobilkrane',
 'Fahrbare Krane auf Spezialfahrgestell. Hohe Traglasten, schnelle Aufbauzeit.',
 600, 3000, 3000, 15000, '20 - 1.200 t', '20 - 150 m', '15 - 80 m', 6,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Hohe Traglasten, schnell einsatzbereit.'),

('baukran-mieten', 'Baukran', 'Baukrane',
 'Turmdrehkrane für Großbaustellen. Hohe Reichweite, dauerhafter Einsatz über Wochen und Monate.',
 300, 1500, 1500, 8000, '2 - 80 t', '30 - 80 m', '20 - 70 m', 7,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Turmdrehkrane für Großbaustellen.'),

('ladekran-mieten', 'Ladekran', 'Ladekrane',
 'LKW-montierte Ladekrane für Be- und Entladearbeiten. Flexibel und vielseitig einsetzbar.',
 300, 800, 1500, 4000, '1 - 30 t', '5 - 30 m', '3 - 20 m', 8,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. LKW-Ladekrane für Be- und Entladearbeiten.')

ON CONFLICT (slug) DO NOTHING;

`

// ---------- CITIES ----------
sql += `
-- =============================================
-- 2. CITIES (aus cities_for_seo_FINAL.csv)
-- =============================================
`

for (const city of cityRows) {
  if (!city.city || !city.slug) continue
  const name = escapeSQL(city.city)
  const slug = escapeSQL(city.slug)
  const state = escapeSQL(city.state || '')
  const lat = parseFloat(city.lat) || 0
  const lng = parseFloat(city.lng) || 0
  const companyCount = parseInt(city.company_count) || 0

  sql += `INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('${name}', '${slug}', '${state}', ${companyCount * 10000}, ${lat}, ${lng}, true)
ON CONFLICT (slug) DO NOTHING;\n`
}

// ---------- COMPANIES ----------
sql += `
-- =============================================
-- 3. COMPANIES (aus kranvergleich_FINAL_all_scrapes.csv)
-- =============================================
`

// Build city slug map from cities CSV
const citySlugMap = new Map<string, string>()
for (const city of cityRows) {
  if (city.city && city.slug) {
    citySlugMap.set(city.city.toLowerCase(), city.slug)
  }
}

// Deduplicate companies by slug
const seenSlugs = new Set<string>()

for (const row of companyRows) {
  if (!row.name || !row.slug) continue
  if (seenSlugs.has(row.slug)) continue
  seenSlugs.add(row.slug)

  const name = escapeSQL(row.name)
  const slug = escapeSQL(row.slug)
  const description = '' // description column contains JSON amenities, not actual description
  const website = escapeSQL((row.website || '').split('?')[0]) // strip UTM params
  const phone = escapeSQL(row.phone || '')
  const address = escapeSQL(row.address || '')
  const city = escapeSQL(row.city || '')
  const state = escapeSQL(row.state || '')
  const zip = escapeSQL(row.postal_code || '')
  const lat = parseFloat(row.latitude) || 'NULL'
  const lng = parseFloat(row.longitude) || 'NULL'
  const rating = parseFloat(row.google_rating) || 'NULL'
  const reviews = parseInt(row.google_reviews_count) || 0
  const photoUrl = escapeSQL(row.photo_url || '')
  const placeId = escapeSQL(row.place_id || '')
  const isVerified = row.is_verified === 'True'

  sql += `INSERT INTO companies (name, slug, description, website, phone, address, city, state, zip, lat, lng, google_rating, google_reviews_count, google_maps_photo_url, google_place_id, is_verified, is_active)
VALUES ('${name}', '${slug}', '${description}', '${website}', '${phone}', '${address}', '${city}', '${state}', '${zip}', ${lat}, ${lng}, ${rating}, ${reviews}, '${photoUrl}', '${placeId}', ${isVerified}, true)
ON CONFLICT (slug) DO NOTHING;\n`
}

// ---------- COMPANY_CRANES (based on crane_types_detected) ----------
sql += `
-- =============================================
-- 4. COMPANY_CRANES (crane_types_detected → crane_types)
-- =============================================
-- For 'allgemein' companies: assign them to ALL crane types (they are general crane rental)
-- For specific types: assign to those specific types

DO $$
DECLARE
  comp RECORD;
  ct RECORD;
  crane_types_str TEXT;
  type_slug TEXT;
  type_arr TEXT[];
BEGIN
  FOR comp IN SELECT id, slug FROM companies LOOP
    -- Get crane_types_detected for this company from a temp lookup
    -- We'll handle this via direct INSERT below
    NULL;
  END LOOP;
END $$;
`

// Actually, let's do it with direct INSERTs that are more reliable
sql += `
-- Direct company_cranes assignments
-- Step 1: Create temp mapping
`

const craneTypeSlugMap: Record<string, string> = {
  allgemein: 'ALL', // special: assign to all types
  autokran: 'autokran-mieten',
  minikran: 'minikran-mieten',
  baukran: 'baukran-mieten',
  ladekran: 'ladekran-mieten',
  dachdeckerkran: 'dachdeckerkran-mieten',
}

const allCraneTypeSlugs = [
  'minikran-mieten',
  'autokran-mieten',
  'dachdeckerkran-mieten',
  'baukran-mieten',
  'ladekran-mieten',
]

// Reset seen slugs for company_cranes
const seenSlugs2 = new Set<string>()

for (const row of companyRows) {
  if (!row.name || !row.slug) continue
  if (seenSlugs2.has(row.slug)) continue
  seenSlugs2.add(row.slug)

  const compSlug = escapeSQL(row.slug)
  const detected = (row.crane_types_detected || 'allgemein').trim()
  const types = detected.split(',').map(t => t.trim())

  let targetSlugs: string[] = []

  for (const t of types) {
    if (t === 'allgemein') {
      targetSlugs = allCraneTypeSlugs
      break
    }
    const mapped = craneTypeSlugMap[t]
    if (mapped && mapped !== 'ALL') {
      targetSlugs.push(mapped)
    }
  }

  for (const ctSlug of targetSlugs) {
    sql += `INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '${compSlug}' AND ct.slug = '${ctSlug}'
ON CONFLICT DO NOTHING;\n`
  }
}

// ---------- COMPANY_REGIONS (assign company to its city) ----------
sql += `
-- =============================================
-- 5. COMPANY_REGIONS (firma → miasto z CSV cities)
-- =============================================
-- Each company is assigned to its home city if that city exists in the cities table.
`

const seenSlugs3 = new Set<string>()

for (const row of companyRows) {
  if (!row.name || !row.slug) continue
  if (seenSlugs3.has(row.slug)) continue
  seenSlugs3.add(row.slug)

  const compSlug = escapeSQL(row.slug)
  const compCity = (row.city || '').toLowerCase()

  // Find matching city slug
  const matchedCitySlug = citySlugMap.get(compCity)
  if (!matchedCitySlug) continue

  sql += `INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = '${compSlug}' AND ci.slug = '${escapeSQL(matchedCitySlug)}'
ON CONFLICT (company_id, city_id) DO NOTHING;\n`
}

// Write output
const outPath = join(rootDir, 'supabase', 'seed_from_csv.sql')
writeFileSync(outPath, sql, 'utf-8')
console.log(`\nDone! Written to: ${outPath}`)
console.log(`Companies: ${seenSlugs.size}`)
console.log(`Cities: ${cityRows.length}`)
