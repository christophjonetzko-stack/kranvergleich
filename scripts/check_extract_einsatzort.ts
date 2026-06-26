// Standalone guard check for extractEinsatzortCity (no test runner in this repo;
// run via `npx tsx scripts/check_extract_einsatzort.ts`). Loads the real DE
// gazetteer so the matching is exercised against production data.
import cities from '../src/data/german-cities.json'
import { extractEinsatzortCity, type EinsatzortMatch } from '../src/lib/extract-einsatzort'

const G = cities as Array<{ n: string }>

type Expect =
  | { city: string }
  | { ambiguous: true }
  | { null: true }

const cases: Array<{ text: string; expect: Expect; why: string }> = [
  { text: 'Treppenturm aufbau in Aachen auf der Jülicherstraße 202', expect: { city: 'Aachen' },
    why: 'Codur: city after "in"; "Jülicherstraße" must NOT match Jülich (no startsWith)' },
  { text: 'Aachener Straße 5, 50674 Köln', expect: { city: 'Köln' },
    why: 'street adjective "Aachener" != Aachen; Köln anchored by PLZ token' },
  { text: 'Einsatzort Bergisch Gladbach, Tor 2', expect: { city: 'Bergisch Gladbach' },
    why: 'longest n-gram beats "Bergisch"/"Gladbach" alone' },
  { text: 'Baustelle in München und Lieferung nach Augsburg', expect: { ambiguous: true },
    why: 'two distinct cities -> refuse to guess' },
  { text: 'Kran benötigt in Muenster', expect: { city: 'Münster' },
    why: 'umlaut transliteration muenster -> Münster' },
  { text: 'Wir brauchen einen Kran für drei Tage', expect: { null: true },
    why: 'no place named' },
  { text: 'Das Essen war gut, Hochzeit geplant', expect: { null: true },
    why: 'incidental word "Essen" not next to a location cue -> ignored' },
  { text: 'Lieferung nach Essen, Zufahrt eng', expect: { city: 'Essen' },
    why: 'same word, but anchored by "nach" -> accepted' },
]

function fmt(r: EinsatzortMatch | null): string {
  if (r === null) return 'null'
  if ('city' in r) return `city=${r.city}`
  return `ambiguous=[${r.ambiguous.join(', ')}]`
}

let pass = 0, fail = 0
for (const c of cases) {
  const r = extractEinsatzortCity(c.text, G)
  let ok = false
  if ('null' in c.expect) ok = r === null
  else if ('ambiguous' in c.expect) ok = !!r && 'ambiguous' in r
  else ok = !!r && 'city' in r && r.city === c.expect.city
  console.log(`${ok ? 'PASS' : 'FAIL'} | ${fmt(r).padEnd(28)} | ${c.text}`)
  if (!ok) console.log(`       expected ${JSON.stringify(c.expect)} — ${c.why}`)
  ok ? pass++ : fail++
}
console.log(`\n${pass}/${pass + fail} passed`)
process.exit(fail ? 1 : 0)
