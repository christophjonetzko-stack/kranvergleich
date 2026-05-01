'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { craneTypes } from '@/data/crane-types'
import { resolveSearchTarget } from '@/lib/search'
import { trackPageEvent } from '@/lib/track'

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
    // Fire BEFORE navigation. Even when resolveSearchTarget returns null
    // (no field filled), the click is meaningful — it shows the user reached
    // for the search and bounced off our matching rules. Without this fire,
    // empty-search abandons would be invisible.
    const projectText = projectDescription.trim()
    trackPageEvent('hero_search_submit', {
      has_crane_type: craneType.length > 0,
      has_city: cityQuery.trim().length > 0,
      has_project: showProjectField && projectText.length > 0,
      project_length: projectText.length,
    })
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
    <div className="max-w-3xl mx-auto">
      {/* Outer container — single rounded card. Pill aesthetic on desktop
          when collapsed, but switches to rounded-3xl when project field
          expands so the textarea attaches cleanly inside the same surface
          (no floating overlay, layout stays stable). */}
      <div
        className={`bg-white shadow-lg sm:border sm:border-gray-200 transition-all overflow-hidden ${
          showProjectField ? 'sm:rounded-3xl' : 'sm:rounded-full'
        }`}
      >
        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-stretch p-3 sm:p-1.5">
          {/* Krantyp field — icon + uppercase label + select. Daibau-style
              "Welche Leistung?" pattern: micro-label tells the user what
              this segment is, placeholder is the actual default. */}
          <div className="w-full sm:flex-1 text-left">
            <label htmlFor="sb-cranetype" className="sm:hidden block text-[12px] font-medium text-gray-700 mb-1 ml-1">
              Krantyp
            </label>
            <div className="relative flex items-center">
              <span className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V8h14" />
                  <path d="M5 8L19 8" />
                  <path d="M19 8v3" />
                  <path d="M19 11l-2 2" />
                  <path d="M17 13v2" />
                </svg>
              </span>
              <div className="hidden sm:flex flex-col flex-1 sm:pl-12 sm:pr-3 sm:py-1.5 cursor-pointer">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-500 leading-none">Krantyp</span>
                <select
                  id="sb-cranetype"
                  value={craneType}
                  onChange={(e) => setCraneType(e.target.value)}
                  className="appearance-none bg-transparent text-[14px] font-medium text-neutral-900 cursor-pointer focus:outline-none mt-0.5 pr-4"
                >
                  <option value="">Egal — alle Typen</option>
                  {craneTypes.map((ct) => (
                    <option key={ct.slug} value={ct.slug}>{ct.name}</option>
                  ))}
                </select>
              </div>
              {/* Mobile select — full styled select (label sits above per the mobile <label> tag). */}
              <select
                value={craneType}
                onChange={(e) => setCraneType(e.target.value)}
                className="sm:hidden w-full h-12 bg-white pl-4 pr-3 text-[15px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none rounded-lg border border-gray-300"
              >
                <option value="">Egal — alle Typen</option>
                {craneTypes.map((ct) => (
                  <option key={ct.slug} value={ct.slug}>{ct.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden sm:block w-px self-stretch bg-gray-200 shrink-0 my-2" />

          {/* Stadt / PLZ field */}
          <div ref={wrapperRef} className="relative w-full sm:flex-1 text-left">
            <label htmlFor="sb-city" className="sm:hidden block text-[12px] font-medium text-gray-700 mb-1 ml-1">
              Stadt oder PLZ
              {plzLabel && <span className="ml-2 text-blue-600 font-normal">→ {plzLabel}</span>}
            </label>
            <div className="relative flex items-center sm:h-full">
              <span className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" aria-hidden>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              {plzLabel && (
                <span className="hidden sm:block absolute left-12 -top-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-blue-600 whitespace-nowrap pointer-events-none bg-white px-1">
                  {plzLabel}
                </span>
              )}
              <div className="hidden sm:flex flex-col flex-1 sm:pl-12 sm:pr-3 sm:py-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-500 leading-none">Standort</span>
                <input
                  id="sb-city"
                  type="text"
                  value={cityQuery}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => { if (results.length > 0) setIsOpen(true) }}
                  placeholder="Stadt oder PLZ…"
                  autoComplete="off"
                  className="bg-transparent text-[14px] font-medium text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal focus:outline-none mt-0.5"
                />
              </div>
              {/* Mobile input */}
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => { if (results.length > 0) setIsOpen(true) }}
                placeholder="Stadt oder PLZ…"
                autoComplete="off"
                className="sm:hidden w-full h-12 bg-white px-4 text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg border border-gray-300"
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
            className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg sm:rounded-full px-6 sm:px-7 h-12 sm:h-12 text-[15px] sm:text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm sm:shadow-none"
          >
            <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Anbieter finden
          </button>
        </div>

        {/* Optional project-description field — accordion INSIDE the same
            surface, separated by border-top so the visual gravity stays
            stable when expanded. No more floating overlay drift. */}
        {showProjectField && (
          <div className="border-t border-gray-200 px-4 sm:px-5 py-3 bg-gray-50/40">
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="search-project" className="text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-700">
                Projektbeschreibung <span className="font-normal text-neutral-400 normal-case tracking-normal">(optional)</span>
              </label>
              <button
                type="button"
                onClick={() => setShowProjectField(false)}
                aria-label="Projektbeschreibung schließen"
                className="text-[11px] text-neutral-400 hover:text-neutral-700"
              >
                ✕ schließen
              </button>
            </div>
            <textarea
              id="search-project"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              rows={2}
              maxLength={500}
              placeholder="z.B. 13 Terrassenscheiben 450×80 cm aufs Dach, Durchfahrtbreite 3 m, fester Rasen"
              className="w-full text-[13px] bg-white border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-400 resize-none"
            />
            <p className="text-[11px] text-neutral-500 mt-1.5">
              Anbieter sehen diese Beschreibung in der Anfrage und können das passende Gerät vorschlagen.
            </p>
          </div>
        )}
      </div>

      {/* Toggle row outside the box — keeps the search bar surface clean
          when collapsed. Inline with hint text on the same line. */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 px-1">
        {!showProjectField ? (
          <button
            type="button"
            onClick={() => {
              trackPageEvent('hero_project_describe_expanded')
              setShowProjectField(true)
            }}
            className="text-[12px] text-neutral-500 hover:text-neutral-900 transition-colors inline-flex items-center gap-1"
          >
            <span aria-hidden className="text-neutral-400">＋</span>
            Projekt beschreiben
            <span className="text-neutral-400">— hilft beim Matching</span>
          </button>
        ) : (
          <span aria-hidden />
        )}
        {hint && (
          <p className="text-[12px] text-gray-500 sm:text-right">{hint}</p>
        )}
      </div>
    </div>
  )
}
