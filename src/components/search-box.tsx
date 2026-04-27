'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { craneTypes } from '@/data/crane-types'
import { resolveSearchTarget } from '@/lib/search'

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
  const [plzLabel, setPlzLabel] = useState('')
  // Optional free-text project description — forwarded to the listing page
  // as ?project=… so the lead form prefills it. Lets project-intent users
  // (Mario, Mathias) capture context at the search step instead of typing
  // it again two clicks later in the inquiry form.
  const [projectDescription, setProjectDescription] = useState('')
  const [showProjectField, setShowProjectField] = useState(false)
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

    // Clear PLZ label when input changes
    if (!/^\d{5}$/.test(value.trim())) {
      setPlzLabel('')
    }

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
        // Auto-show city label when user typed a 5-digit PLZ
        if (/^\d{5}$/.test(value.trim()) && data.length > 0) {
          setPlzLabel(`${data[0].plz} ${data[0].name}`)
        }
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
    const target = resolveSearchTarget({ craneType, cityQuery, selectedCity, projectDescription })
    if (!target) return
    setHint(target.hint ?? '')
    router.push(target.url)
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
            <option value="">Egal — alle Typen</option>
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
            {plzLabel && <span className="ml-2 text-blue-600 font-normal">→ {plzLabel}</span>}
          </label>
          <div className="relative">
            {plzLabel && (
              <span className="hidden sm:block absolute -top-4 left-5 text-[11px] text-blue-600 whitespace-nowrap pointer-events-none">
                {plzLabel}
              </span>
            )}
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

        {/* Search button — editorial/navigation CTA (black). Transaction CTAs
            across the site ("Angebot anfragen", form submit) stay blue as a
            deliberate two-tier signal: black = discovery, blue = commitment. */}
        <button
          onClick={handleSearch}
          className="sm:m-1 mt-1 sm:mt-0 w-full sm:w-auto bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg sm:rounded-full px-6 h-12 sm:h-9 text-[15px] sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm sm:shadow-none"
        >
          <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Suchen
        </button>
      </div>
      {/* Optional project-description field. Collapsed by default to keep the
          hero scannable; expanded once you click "Projekt beschreiben". When
          filled, the value rides along to the listing page as ?project=… and
          prefills the inquiry form's Projektbeschreibung textarea. */}
      <div className="mt-2 px-1 sm:px-5 sm:pb-3">
        {!showProjectField ? (
          <button
            type="button"
            onClick={() => setShowProjectField(true)}
            className="text-[12px] text-neutral-500 hover:text-neutral-800 underline-offset-2 hover:underline transition-colors"
          >
            + Projekt beschreiben (optional, hilft beim Matching)
          </button>
        ) : (
          <div>
            <label htmlFor="search-project" className="block text-[12px] font-medium text-gray-700 mb-1">
              Projektbeschreibung (optional)
            </label>
            <textarea
              id="search-project"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={2}
              maxLength={500}
              placeholder="z.B. 13 Terrassenscheiben 450×80 cm aufs Dach, Durchfahrtbreite 3 m, fester Rasen"
              className="w-full text-[13px] border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-none"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Anbieter sehen diese Beschreibung in der Anfrage und können das passende Gerät vorschlagen.
            </p>
          </div>
        )}
      </div>
      {hint && (
        <p className="text-[12px] text-gray-400 mt-1 px-1 sm:px-5 sm:pb-2">{hint}</p>
      )}
    </div>
  )
}
