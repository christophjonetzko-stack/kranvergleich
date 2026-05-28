import { NextResponse } from 'next/server'
import { COUNTRY } from '@/lib/country'

interface CityEntry {
  p: string  // PLZ (DE: 5 digits, AT: 4 digits)
  n: string  // name
  s: string  // state (Bundesland)
  la: number // latitude
  ln: number // longitude
}

interface IndexedCity extends CityEntry {
  _lower: string
  _plz: string
}

// Lazy-init so the country-specific PLZ dataset is loaded once per worker.
// Build-time COUNTRY decides which dataset; the other branch is tree-shaken.
let _index: IndexedCity[] | null = null
async function getIndexedCities(): Promise<IndexedCity[]> {
  if (_index) return _index
  const raw = COUNTRY === 'AT'
    ? ((await import('@/data/austrian-cities.json')).default as CityEntry[])
    : ((await import('@/data/german-cities.json')).default as CityEntry[])
  _index = raw.map((c) => ({
    ...c,
    _lower: c.n.toLowerCase(),
    _plz: c.p,
  }))
  return _index
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').trim()

  if (query.length < 3) {
    return NextResponse.json([])
  }

  const q = query.toLowerCase()
  const isPlzSearch = /^\d+$/.test(query)
  const cities = await getIndexedCities()

  const results = cities
    .filter((c) => {
      if (isPlzSearch) return c._plz.startsWith(query)
      return c._lower.includes(q)
    })
    .slice(0, 15)
    .map((c) => ({
      plz: c.p,
      name: c.n,
      state: c.s,
      lat: c.la,
      lng: c.ln,
      label: `${c.p} ${c.n}`,
    }))

  return NextResponse.json(results)
}
