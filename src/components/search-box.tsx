'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

    const typed = cityQuery.trim()
    const isPlz = /^\d{5}$/.test(typed)

    // PLZ flow — user typed 5 digits, show nationwide listing sorted by distance
    if (isPlz) {
      router.push(`/${craneType}?plz=${typed}`)
      return
    }

    if (selectedCity) {
      // Check if city has a dedicated page (is in seoCities)
      const seoCity = seoCities.find(
        (c) => c.name.toLowerCase() === selectedCity.name.toLowerCase()
      )

      if (seoCity) {
        // Direct match — go to city page
        router.push(`/${craneType}/${seoCity.slug}`)
      } else {
        // No SEO page for this city — fall back to distance-sorted listing by PLZ
        router.push(`/${craneType}?plz=${selectedCity.plz}`)
      }
    } else if (typed) {
      // Text typed but no autocomplete selection — try exact city match
      const seoCity = seoCities.find(
        (c) => c.name.toLowerCase() === typed.toLowerCase()
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
    <div className="max-w-2xl mx-auto sm:border sm:border-gray-200 sm:rounded-full sm:bg-white sm:shadow-lg">
      <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center">
        {/* Krantyp field */}
        <div className="w-full sm:flex-1 text-left">
          <label className="sm:hidden block text-[12px] font-medium text-gray-700 mb-1 ml-1">
            Krantyp
          </label>
          <select
            value={craneType}
            onChange={(e) => setCraneType(e.target.value)}
            className="w-full h-12 sm:h-11 bg-white sm:bg-transparent pl-4 sm:pl-5 pr-3 text-[15px] sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:focus:ring-0 focus:border-blue-500 sm:focus:border-transparent cursor-pointer appearance-none rounded-lg sm:rounded-full border border-gray-300 sm:border-0"
          >
            <option value="" disabled>Krantyp wählen…</option>
            {craneTypes.map((ct) => (
              <option key={ct.slug} value={ct.slug}>{ct.name}</option>
            ))}
          </select>
        </div>

        <div className="hidden sm:block w-px h-6 bg-gray-200 shrink-0" />

        {/* Stadt / PLZ field */}
        <div ref={wrapperRef} className="relative w-full sm:flex-1 text-left">
          <label className="sm:hidden block text-[12px] font-medium text-gray-700 mb-1 ml-1">
            Stadt oder PLZ
          </label>
          <div className="relative">
            <input
              type="text"
              value={cityQuery}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => { if (results.length > 0) setIsOpen(true) }}
              placeholder="Stadt oder PLZ…"
              autoComplete="off"
              className="w-full h-12 sm:h-11 bg-white sm:bg-transparent px-4 text-[15px] sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:focus:ring-0 rounded-lg sm:rounded-none border border-gray-300 sm:border-0"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="h-3.5 w-3.5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              </div>
            )}
          </div>
          {isOpen && results.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto">
              {results.map((city, i) => (
                <li key={`${city.plz}-${city.name}`}>
                  <button
                    type="button"
                    onMouseDown={() => selectCity(city)}
                    className={`w-full text-left px-4 py-2.5 text-[13px] transition-colors ${
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

        {/* Search button */}
        <button
          onClick={handleSearch}
          disabled={!craneType}
          className="sm:m-1 mt-1 sm:mt-0 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white rounded-lg sm:rounded-full px-6 h-12 sm:h-9 text-[15px] sm:text-sm font-semibold sm:font-medium transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm sm:shadow-none"
        >
          <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Suchen
        </button>
      </div>
      {hint && (
        <p className="text-[12px] text-gray-400 mt-1 px-1 sm:px-5 sm:pb-2">{hint}</p>
      )}
    </div>
  )
}
