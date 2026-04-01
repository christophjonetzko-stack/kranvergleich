/**
 * Migration script: Fix incorrect Bundesland assignments in companies table.
 *
 * Strategy: Map PLZ (Postleitzahl) ranges to the correct Bundesland.
 * PLZ ranges in Germany are well-defined and allow reliable mapping.
 *
 * Usage: npx tsx scripts/fix-bundesland.ts [--dry-run]
 *   --dry-run  Show what would be changed without writing to DB (default)
 *   --apply    Actually apply changes to Supabase
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// PLZ → Bundesland mapping
// Based on official Deutsche Post PLZ system
// Each entry: [from, to, bundesland]
// ============================================
const PLZ_RANGES: [number, number, string][] = [
  // Sachsen, Sachsen-Anhalt, Thüringen (01-09)
  [1001, 4999, 'Sachsen'],           // Dresden, Leipzig, Chemnitz area
  [5001, 6999, 'Sachsen-Anhalt'],    // Halle, Magdeburg area
  [7001, 7999, 'Thüringen'],         // Gera, Jena area
  [8001, 9999, 'Sachsen'],           // Zwickau, Plauen area (but some Thüringen)

  // Berlin, Brandenburg (10-16)
  [10001, 12527, 'Berlin'],
  [12529, 12529, 'Brandenburg'],
  [12555, 13359, 'Berlin'],
  [13403, 13503, 'Berlin'],
  [13505, 13629, 'Berlin'],
  [14001, 14199, 'Berlin'],
  [14401, 16949, 'Brandenburg'],
  [12528, 12528, 'Brandenburg'],
  [13504, 13504, 'Brandenburg'],
  [14200, 14400, 'Brandenburg'],

  // Brandenburg continued (17 partial, 19 partial)
  [17001, 17259, 'Mecklenburg-Vorpommern'],
  [17260, 17291, 'Brandenburg'],     // Uckermark
  [17300, 17399, 'Mecklenburg-Vorpommern'],
  [17400, 17499, 'Mecklenburg-Vorpommern'],

  // Mecklenburg-Vorpommern (17-19 partial)
  [18001, 18999, 'Mecklenburg-Vorpommern'],
  [19001, 19399, 'Mecklenburg-Vorpommern'],

  // Brandenburg / Niedersachsen (19)
  [19400, 19417, 'Mecklenburg-Vorpommern'],

  // Hamburg (20-22 partial)
  [20001, 21149, 'Hamburg'],
  [22001, 22769, 'Hamburg'],

  // Schleswig-Holstein (21-25)
  [21150, 21999, 'Schleswig-Holstein'],  // Lüneburg area is Niedersachsen — see below
  [22800, 23999, 'Schleswig-Holstein'],
  [24001, 25999, 'Schleswig-Holstein'],

  // Niedersachsen / Bremen (26-31, 34 partial, 37-38 partial)
  [26001, 27999, 'Niedersachsen'],
  [28001, 28199, 'Bremen'],
  [28200, 28299, 'Bremen'],          // Bremerhaven
  [28300, 28399, 'Niedersachsen'],
  [28400, 28779, 'Niedersachsen'],
  [28800, 28899, 'Bremen'],          // Bremen-Blumenthal etc.
  [29001, 31999, 'Niedersachsen'],

  // Nordrhein-Westfalen (32-33, 40-53 partial)
  [32001, 33999, 'Nordrhein-Westfalen'],
  [40001, 53999, 'Nordrhein-Westfalen'],

  // Hessen (34-36, 60-65 partial)
  [34001, 36399, 'Hessen'],
  [60001, 63699, 'Hessen'],
  [64201, 65999, 'Hessen'],

  // Niedersachsen (37-38 partial)
  [37001, 37299, 'Niedersachsen'],   // Göttingen area
  [37300, 37399, 'Niedersachsen'],
  [37400, 37499, 'Niedersachsen'],
  [37500, 37599, 'Niedersachsen'],
  [37600, 37699, 'Niedersachsen'],
  [38001, 38729, 'Niedersachsen'],   // Braunschweig, Wolfsburg, Salzgitter
  [38800, 39999, 'Sachsen-Anhalt'],  // Halberstadt, Magdeburg area

  // Thüringen (04-07 partial, 96-99)
  [4500, 4579, 'Sachsen'],           // Leipzig area
  [4580, 4639, 'Thüringen'],         // Altenburg area
  [4640, 4899, 'Sachsen'],
  [6001, 6199, 'Sachsen-Anhalt'],    // Halle
  [6200, 6299, 'Sachsen-Anhalt'],
  [6300, 6399, 'Sachsen-Anhalt'],
  [6400, 6499, 'Sachsen-Anhalt'],
  [6500, 6548, 'Thüringen'],         // Sangerhausen area
  [6549, 6599, 'Sachsen-Anhalt'],
  [6600, 6799, 'Sachsen-Anhalt'],
  [6800, 6862, 'Sachsen-Anhalt'],
  [6863, 6869, 'Sachsen-Anhalt'],
  [6900, 6928, 'Sachsen-Anhalt'],
  [7300, 7389, 'Thüringen'],
  [7400, 7429, 'Thüringen'],
  [7500, 7589, 'Thüringen'],
  [7600, 7629, 'Thüringen'],
  [7700, 7799, 'Thüringen'],
  [7900, 7999, 'Thüringen'],
  [96001, 96199, 'Bayern'],          // Bamberg area
  [96200, 96299, 'Bayern'],
  [96300, 96399, 'Bayern'],
  [96400, 96499, 'Bayern'],
  [96500, 96549, 'Bayern'],          // Coburg
  [96550, 96999, 'Thüringen'],
  [97001, 97999, 'Bayern'],          // Würzburg area
  [98001, 99999, 'Thüringen'],       // Erfurt, Weimar, Jena

  // Rheinland-Pfalz, Saarland (54-56, 66-67 partial)
  [54001, 56999, 'Rheinland-Pfalz'],
  [66001, 66459, 'Saarland'],
  [66460, 66509, 'Saarland'],
  [66510, 66999, 'Rheinland-Pfalz'],
  [67001, 67999, 'Rheinland-Pfalz'],
  [76700, 76899, 'Rheinland-Pfalz'],

  // Baden-Württemberg (68-79 partial, 88-89 partial)
  [68001, 68999, 'Baden-Württemberg'],
  [69001, 69234, 'Baden-Württemberg'],
  [69235, 69259, 'Hessen'],          // some Hessen areas
  [69300, 69399, 'Baden-Württemberg'],
  [69400, 69434, 'Baden-Württemberg'],
  [69435, 69469, 'Hessen'],
  [69470, 69999, 'Baden-Württemberg'],
  [70001, 76699, 'Baden-Württemberg'],
  [77001, 79999, 'Baden-Württemberg'],
  [88001, 88999, 'Baden-Württemberg'],
  [89001, 89599, 'Baden-Württemberg'],

  // Bayern (80-87, 89-97 partial)
  [80001, 87999, 'Bayern'],
  [89600, 89999, 'Bayern'],
  [90001, 96549, 'Bayern'],

  // Nordrhein-Westfalen (54-59 partial)
  [57001, 59999, 'Nordrhein-Westfalen'], // Siegen, Arnsberg, Soest area

  // Niedersachsen corrections
  [21200, 21789, 'Niedersachsen'],   // Lüneburg, Buchholz
  [27568, 27580, 'Bremen'],          // Bremerhaven
  [38730, 38799, 'Niedersachsen'],

  // Hessen corrections
  [35001, 35999, 'Hessen'],          // Gießen, Marburg
  [36400, 36469, 'Hessen'],          // Bad Hersfeld, Fulda
  [63700, 63939, 'Bayern'],          // Aschaffenburg is Bayern!
  [64001, 64200, 'Hessen'],          // Darmstadt
]

/**
 * Determine Bundesland from PLZ.
 * Returns the most specific match (narrower range wins).
 */
function getBundeslandFromPLZ(plz: string): string | null {
  const num = parseInt(plz, 10)
  if (isNaN(num) || num < 1001 || num > 99999) return null

  let bestMatch: string | null = null
  let bestRangeSize = Infinity

  for (const [from, to, bundesland] of PLZ_RANGES) {
    if (num >= from && num <= to) {
      const rangeSize = to - from
      if (rangeSize < bestRangeSize) {
        bestRangeSize = rangeSize
        bestMatch = bundesland
      }
    }
  }

  return bestMatch
}

// ============================================
// Main migration
// ============================================
async function main() {
  const dryRun = !process.argv.includes('--apply')

  console.log(`\n${'='.repeat(60)}`)
  console.log(`  Fix Bundesland — ${dryRun ? 'DRY RUN (keine Änderungen)' : '⚠️  APPLYING CHANGES'}`)
  console.log(`${'='.repeat(60)}\n`)

  // Fetch all companies
  const { data: companies, error } = await supabase
    .from('companies')
    .select('id, name, city, state, zip')
    .order('name')

  if (error) {
    console.error('Error fetching companies:', error.message)
    process.exit(1)
  }

  console.log(`Fetched ${companies.length} companies.\n`)

  const fixes: { id: string; name: string; city: string; zip: string; oldState: string; newState: string }[] = []
  const noZip: { name: string; city: string; state: string }[] = []
  const noMatch: { name: string; city: string; zip: string; state: string }[] = []

  for (const company of companies) {
    if (!company.zip) {
      noZip.push({ name: company.name, city: company.city, state: company.state })
      continue
    }

    const correctState = getBundeslandFromPLZ(company.zip)

    if (!correctState) {
      noMatch.push({ name: company.name, city: company.city, zip: company.zip, state: company.state })
      continue
    }

    if (company.state !== correctState) {
      fixes.push({
        id: company.id,
        name: company.name,
        city: company.city,
        zip: company.zip,
        oldState: company.state,
        newState: correctState,
      })
    }
  }

  // Report fixes needed
  if (fixes.length === 0) {
    console.log('✅ Alle Bundesländer sind korrekt! Keine Änderungen nötig.\n')
  } else {
    console.log(`🔧 ${fixes.length} Firmen mit falschem Bundesland:\n`)
    console.log('  Firma | Stadt | PLZ | Alt → Neu')
    console.log('  ' + '-'.repeat(80))
    for (const f of fixes) {
      console.log(`  ${f.name} | ${f.city} | ${f.zip} | ${f.oldState} → ${f.newState}`)
    }
    console.log()
  }

  // Report companies without PLZ
  if (noZip.length > 0) {
    console.log(`⚠️  ${noZip.length} Firmen ohne PLZ (können nicht geprüft werden):`)
    for (const c of noZip) {
      console.log(`  - ${c.name} (${c.city}, ${c.state})`)
    }
    console.log()
  }

  // Report no-match PLZs
  if (noMatch.length > 0) {
    console.log(`❓ ${noMatch.length} Firmen mit PLZ außerhalb der Zuordnungstabelle:`)
    for (const c of noMatch) {
      console.log(`  - ${c.name} (${c.city}, PLZ: ${c.zip}, aktuell: ${c.state})`)
    }
    console.log()
  }

  // Apply changes if not dry-run
  if (!dryRun && fixes.length > 0) {
    console.log('Applying changes...\n')
    let success = 0
    let failed = 0

    for (const fix of fixes) {
      const { error: updateError } = await supabase
        .from('companies')
        .update({ state: fix.newState })
        .eq('id', fix.id)

      if (updateError) {
        console.error(`  ❌ ${fix.name}: ${updateError.message}`)
        failed++
      } else {
        console.log(`  ✅ ${fix.name}: ${fix.oldState} → ${fix.newState}`)
        success++
      }
    }

    console.log(`\nDone: ${success} updated, ${failed} failed.\n`)
  } else if (fixes.length > 0) {
    console.log('ℹ️  Dry run — keine Änderungen. Nutze --apply um Änderungen zu speichern.\n')
  }

  // Final summary: show distinct state values
  if (!dryRun && fixes.length > 0) {
    console.log('Verification — distinct city/state after update:')
    const { data: check } = await supabase
      .from('companies')
      .select('city, state')
      .order('state')
      .order('city')

    if (check) {
      const unique = new Map<string, Set<string>>()
      for (const row of check) {
        if (!unique.has(row.state)) unique.set(row.state, new Set())
        unique.get(row.state)!.add(row.city)
      }
      for (const [state, cities] of unique) {
        console.log(`  ${state}: ${[...cities].slice(0, 5).join(', ')}${cities.size > 5 ? ` ... (+${cities.size - 5})` : ''}`)
      }
    }
  }
}

main().catch(console.error)
