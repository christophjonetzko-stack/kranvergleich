import { NextResponse } from 'next/server'
import citiesData from '@/data/german-cities.json'

interface CityEntry {
  p: string  // PLZ
  n: string  // name
  s: string  // state (Bundesland)
  la: number // latitude
  ln: number // longitude
}

const cities = citiesData as CityEntry[]

// Pre-build lowercase index for fast search
const citiesWithLower = cities.map((c) => ({
  ...c,
  _lower: c.n.toLowerCase(),
  _plz: c.p,
}))

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = (searchParams.get('q') || '').trim()

  if (query.length < 3) {
    return NextResponse.json([])
  }

  const q = query.toLowerCase()
  const isPlzSearch = /^\d+$/.test(query)

  const results = citiesWithLower
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
