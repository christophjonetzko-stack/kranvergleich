'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { craneTypes } from '@/data/crane-types'
import { seoCities, allCities } from '@/data/cities-static'

export function SearchBox() {
  const router = useRouter()
  const [craneType, setCraneType] = useState('')
  const [cityQuery, setCityQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [hint, setHint] = useState('')

  const filteredCities = cityQuery.length >= 1
    ? allCities.filter((c) =>
        c.name.toLowerCase().includes(cityQuery.toLowerCase())
      ).slice(0, 8)
    : []

  function handleSearch() {
    if (!craneType) return
    setHint('')

    // First check exact match in allCities (includes cities without companies)
    const matched = allCities.find(
      (c) => c.name.toLowerCase() === cityQuery.toLowerCase()
    )

    if (matched) {
      const targetSlug = matched.nearestSlug ?? matched.slug
      if (matched.nearestSlug) {
        const targetCity = seoCities.find((c) => c.slug === matched.nearestSlug)
        setHint(`Für ${matched.name} zeigen wir Anbieter in ${targetCity?.name ?? 'der Nähe'}.`)
      }
      router.push(`/${craneType}/${targetSlug}`)
    } else if (cityQuery.trim()) {
      setHint(`Für "${cityQuery}" haben wir noch keine Anbieter. Zeige alle Anbieter deutschlandweit.`)
      router.push(`/${craneType}`)
    } else {
      router.push(`/${craneType}`)
    }
  }

  function selectCity(city: typeof allCities[number]) {
    setCityQuery(city.name)
    setShowSuggestions(false)
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 max-w-3xl mx-auto bg-white">
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <div>
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

        <div className="relative">
          <label className="text-sm font-medium text-muted-foreground mb-1 block">
            Stadt
          </label>
          <Input
            placeholder="z.B. Berlin, München…"
            value={cityQuery}
            onChange={(e) => {
              setCityQuery(e.target.value)
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSearch()
              }
            }}
          />
          {showSuggestions && filteredCities.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
              {filteredCities.map((city) => (
                <li key={city.slug}>
                  <button
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted transition-colors"
                    onMouseDown={() => selectCity(city)}
                  >
                    {city.name}
                    {city.nearestSlug && (
                      <span className="text-gray-400 ml-1">
                        (Nähe: {seoCities.find(c => c.slug === city.nearestSlug)?.name})
                      </span>
                    )}
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
