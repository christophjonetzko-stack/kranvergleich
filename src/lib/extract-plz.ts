// Address-context postal-code extraction from free-text project descriptions.
//
// Why: the lead form's single "Stadt / PLZ" field lets customers type a city
// (often a nearby big city) while the real job address — including the PLZ —
// sits only in the project description (lead Waldemar 2026-06-09: field
// "Hamburg", Einsatzort "23554 Lübeck", dispatched to the wrong region). This
// helper pulls a PLZ out of the description so the dispatch can prefer it.
//
// Conservative by design to avoid false positives (weights like "20000 kg",
// years/dates, prices): a number only counts when it is either followed by a
// capitalised place name ("23554 Lübeck") or preceded by an address label
// ("Adresse: 23554"). Whether the extracted PLZ resolves to a real city is the
// caller's job (isUnresolvedPlz) — this is purely syntactic extraction.
//
// Country-aware: DE postal codes are 5 digits, AT 4 digits.

export function extractAddressPlz(text: string, country: 'DE' | 'AT'): string[] {
  if (!text) return []
  const n = country === 'AT' ? 4 : 5
  const code = `\\d{${n}}`
  const found: string[] = []
  const push = (plz: string) => {
    if (plz && !found.includes(plz)) found.push(plz)
  }

  // Pattern A: PLZ directly followed by a capitalised place name ("23554 Lübeck",
  // "in 20095 Hamburg"). The strongest signal — covers "Adresse: 23554 Lübeck".
  // Negative lookahead rejects capitalised units/currency ("12500 Euro",
  // "12000 KG") that share the "<digits> <Capitalised word>" shape.
  const reCity = new RegExp(
    `\\b(${code})\\s+(?!(?:Euro|EUR|Cent|KG|Kg|KW|KN|PS|Watt|Volt|Tonnen?|Stück|Stk)\\b)[A-ZÄÖÜ][\\wäöüß.\\-]+`,
    'g',
  )
  // Pattern B: an address label immediately followed by the PLZ ("PLZ 23554",
  // "Einsatzort: 23554") — catches the city-less form.
  const reLabel = new RegExp(
    `(?:adresse|anschrift|einsatzort|einsatzadresse|standort|baustelle|objekt|plz|ort)\\s*:?\\s*(${code})\\b`,
    'gi',
  )

  for (const re of [reCity, reLabel]) {
    let m: RegExpExecArray | null
    while ((m = re.exec(text)) !== null) push(m[1])
  }
  return found
}
