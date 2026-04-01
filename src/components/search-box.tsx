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
import { seoCities } from '@/data/cities-static'

export function SearchBox() {
  const router = useRouter()
  const [craneType, setCraneType] = useState('')
  const [cityQuery, setCityQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filteredCities = cityQuery.length >= 1
    ? seoCities.filter((c) =>
        c.name.toLowerCase().includes(cityQuery.toLowerCase())
      )
    : []

  function handleSearch() {
    if (!craneType) return

    const matchedCity = seoCities.find(
      (c) => c.name.toLowerCase() === cityQuery.toLowerCase()
    )

    if (matchedCity) {
      router.push(`/${craneType}/${matchedCity.slug}`)
    } else {
      router.push(`/${craneType}`)
    }
  }

  function selectCity(city: typeof seoCities[number]) {
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
            <SelectContent>
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
    </div>
  )
}
