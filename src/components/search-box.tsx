'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { craneTypes } from '@/data/crane-types'
import { seoCities } from '@/data/cities-static'

interface CityResult {
  plz: string
  name: string
  state: string
  lat: number
  lng: number
  label: string
}

// Haversine distance in km
function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Coordinates of seoCities (cities with company pages)
const SEO_CITY_COORDS: Record<string, { lat: number; lng: number; name: string }> = {
  berlin: { lat: 52.52, lng: 13.405, name: 'Berlin' },
  hamburg: { lat: 53.5511, lng: 9.9937, name: 'Hamburg' },
  duesseldorf: { lat: 51.2277, lng: 6.7735, name: 'Düsseldorf' },
  koeln: { lat: 50.9375, lng: 6.9603, name: 'Köln' },
  dortmund: { lat: 51.5136, lng: 7.4653, name: 'Dortmund' },
  leipzig: { lat: 51.3397, lng: 12.3731, name: 'Leipzig' },
  bremen: { lat: 53.0793, lng: 8.8017, name: 'Bremen' },
  mannheim: { lat: 49.4875, lng: 8.4660, name: 'Mannheim' },
  hannover: { lat: 52.3759, lng: 9.7320, name: 'Hannover' },
  potsdam: { lat: 52.3906, lng: 13.0645, name: 'Potsdam' },
  karlsruhe: { lat: 49.0069, lng: 8.4037, name: 'Karlsruhe' },
  nuernberg: { lat: 49.4521, lng: 11.0767, name: 'Nürnberg' },
  stuttgart: { lat: 48.7758, lng: 9.1829, name: 'Stuttgart' },
  brandenburg: { lat: 52.4125, lng: 12.5316, name: 'Brandenburg' },
  augsburg: { lat: 48.3705, lng: 10.8978, name: 'Augsburg' },
  braunschweig: { lat: 52.2689, lng: 10.5268, name: 'Braunschweig' },
  'frankfurt-am-main': { lat: 50.1109, lng: 8.6821, name: 'Frankfurt am Main' },
  essen: { lat: 51.4556, lng: 7.0116, name: 'Essen' },
  muenchen: { lat: 48.1351, lng: 11.5820, name: 'München' },
  dresden: { lat: 51.0504, lng: 13.7373, name: 'Dresden' },
  ulm: { lat: 48.4011, lng: 9.9876, name: 'Ulm' },
  wiesbaden: { lat: 50.0782, lng: 8.2398, name: 'Wiesbaden' },
  wuppertal: { lat: 51.2562, lng: 7.1508, name: 'Wuppertal' },
  duisburg: { lat: 51.4344, lng: 6.7624, name: 'Duisburg' },
  muenster: { lat: 51.9607, lng: 7.6261, name: 'Münster' },
  cottbus: { lat: 51.7563, lng: 14.3329, name: 'Cottbus' },
  ingolstadt: { lat: 48.7665, lng: 11.4258, name: 'Ingolstadt' },
  hildesheim: { lat: 52.1508, lng: 9.9509, name: 'Hildesheim' },
  krefeld: { lat: 51.3388, lng: 6.5853, name: 'Krefeld' },
  moenchengladbach: { lat: 51.1805, lng: 6.4428, name: 'Mönchengladbach' },
  herne: { lat: 51.5369, lng: 7.2000, name: 'Herne' },
  neubrandenburg: { lat: 53.5574, lng: 13.2614, name: 'Neubrandenburg' },
}

function findNearestSeoCity(lat: number, lng: number): { slug: string; name: string; distance: number } {
  let best = { slug: 'berlin', name: 'Berlin', distance: Infinity }
  for (const [slug, coords] of Object.entries(SEO_CITY_COORDS)) {
    const d = distanceKm(lat, lng, coords.lat, coords.lng)
    if (d < best.distance) {
      best = { slug, name: coords.name, distance: d }
    }
  }
  return best
}

export function SearchBox() {
  const router = useRouter()
  const [craneType, setCraneType] = useState('')
  const [cityQuery, setCityQuery] = useState('')
  const [results, setResults] = useState<CityResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null)
  const [hint, setHint] = useState('')
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleInputChange(value: string) {
    setCityQuery(value)
    setSelectedCity(null)
    setActiveIndex(-1)
    setHint('')

    if (value.trim().length < 3) {
      setResults([])
      setIsOpen(false)
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(value.trim())}`)
        const data: CityResult[] = await res.json()
        setResults(data)
        setIsOpen(data.length > 0)
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 200)
  }

  function selectCity(city: CityResult) {
    setCityQuery(city.name)
    setSelectedCity(city)
    setIsOpen(false)
    setResults([])
  }

  function handleSearch() {
    if (!craneType) return
    setHint('')

    if (selectedCity) {
      // Check if city has a dedicated page (is in seoCities)
      const seoCity = seoCities.find(
        (c) => c.name.toLowerCase() === selectedCity.name.toLowerCase()
      )

      if (seoCity) {
        // Direct match — go to city page
        router.push(`/${craneType}/${seoCity.slug}`)
      } else {
        // No page for this city — find nearest city with companies
        const nearest = findNearestSeoCity(selectedCity.lat, selectedCity.lng)
        if (nearest.distance <= 50) {
          setHint(`Für ${selectedCity.name} zeigen wir Anbieter in ${nearest.name} (${Math.round(nearest.distance)} km entfernt).`)
          router.push(`/${craneType}/${nearest.slug}`)
        } else {
          setHint(`Für ${selectedCity.name} haben wir noch keine Anbieter in der Nähe. Zeige alle Anbieter deutschlandweit.`)
          router.push(`/${craneType}`)
        }
      }
    } else if (cityQuery.trim()) {
      // Text typed but no autocomplete selection — try exact match
      const seoCity = seoCities.find(
        (c) => c.name.toLowerCase() === cityQuery.trim().toLowerCase()
      )
      if (seoCity) {
        router.push(`/${craneType}/${seoCity.slug}`)
      } else {
        setHint(`Für "${cityQuery}" haben wir noch keine Anbieter. Zeige alle Anbieter deutschlandweit.`)
        router.push(`/${craneType}`)
      }
    } else {
      router.push(`/${craneType}`)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (isOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
      } else if (e.key === 'Enter' && activeIndex >= 0) {
        e.preventDefault()
        selectCity(results[activeIndex])
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    if (e.key === 'Enter' && !isOpen) {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 max-w-2xl mx-auto bg-white">
      <div className="flex flex-col sm:flex-row gap-4 items-end justify-center">
        <div className="w-full sm:w-[200px]">
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Krantyp
          </label>
          <Select onValueChange={(val) => setCraneType(val ?? '')} value={craneType}>
            <SelectTrigger>
              <SelectValue placeholder="Krantyp wählen…" />
            </SelectTrigger>
            <SelectContent align="center" sideOffset={4}>
              {craneTypes.map((ct) => (
                <SelectItem key={ct.slug} value={ct.slug}>
                  {ct.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div ref={wrapperRef} className="relative w-full sm:w-[200px]">
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Stadt oder PLZ
          </label>
          <div className="relative">
            <input
              type="text"
              value={cityQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (results.length > 0) setIsOpen(true) }}
              placeholder="z.B. Berlin, 88400…"
              autoComplete="off"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            {isLoading && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="h-3.5 w-3.5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}
          </div>
          {isOpen && results.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
              {results.map((city, i) => (
                <li key={`${city.plz}-${city.name}`}>
                  <button
                    type="button"
                    onMouseDown={() => selectCity(city)}
                    className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${
                      i === activeIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-gray-400 mr-1">{city.plz}</span>
                    <span className="font-medium">{city.name}</span>
                    <span className="text-gray-400 text-[11px] ml-1">{city.state}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            disabled={!craneType}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            Suchen
          </Button>
        </div>
      </div>
      {hint && (
        <p className="text-[12px] text-gray-400 mt-2">{hint}</p>
      )}
    </div>
  )
}
