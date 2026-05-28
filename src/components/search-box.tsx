'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { craneTypes } from '@/data/crane-types'
import { resolveSearchTarget } from '@/lib/search'
import { trackPageEvent } from '@/lib/track'
import { PLZ_REGEX } from '@/lib/country'

interface CityResult {
  plz: string
  name: string
  state: string
  lat: number
  lng: number
  label: string
}

interface SearchBoxProps {
  /** crane-type-slug  Anbieter count map. Passed from server page so the
   *  dropdown can sort by popularity and show "Autokran, 403 Anbieter"
   *  instead of a bare label. Empty map = fall back to the static catalog
   *  order with no counts. */
  craneTypeCounts?: Record<string, number>
}

export function SearchBox({ craneTypeCounts }: SearchBoxProps = {}) {
  const router = useRouter()
  const [craneType, setCraneType] = useState('')
  const [craneTypeOpen, setCraneTypeOpen] = useState(false)
  const [craneTypeActiveIndex, setCraneTypeActiveIndex] = useState(-1)
  const craneTypeWrapperRef = useRef<HTMLDivElement>(null)

  // Sort the catalog by Anbieter count desc when a counts map is available.
  // Most popular first lifts the user's first scan to the type they're most
  // likely after (Autokran 403 vs. Dachdeckerkran 47). Falls back to the
  // static sort_order from data/crane-types.ts when counts aren't provided
  // (e.g. on pages that haven't been migrated to pass the prop yet).
  const sortedTypes = useMemo(() => {
    if (!craneTypeCounts) return craneTypes
    return [...craneTypes].sort((a, b) => {
      const aN = craneTypeCounts[a.slug] ?? 0
      const bN = craneTypeCounts[b.slug] ?? 0
      return bN - aN
    })
  }, [craneTypeCounts])

  const selectedType = sortedTypes.find((t) => t.slug === craneType)
  const craneTypeLabel = selectedType ? selectedType.name : 'Egal, alle Typen'
  const [cityQuery, setCityQuery] = useState('')
  const [results, setResults] = useState<CityResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null)
  const [hint, setHint] = useState('')
  const [plzLabel, setPlzLabel] = useState('')
  // Optional free-text project description, forwarded to the listing page
  // as ?project=… so the lead form prefills it. Lets project-intent users
  // (Mario, Mathias) capture context at the search step instead of typing
  // it again two clicks later in the inquiry form.
  const [projectDescription, setProjectDescription] = useState('')
  const [showProjectField, setShowProjectField] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Close dropdowns on outside click, both the city autocomplete and the
  // custom crane-type dropdown share this handler. Each ref-guards its own
  // surface so a click inside one closes only the other.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false)
      }
      if (craneTypeWrapperRef.current && !craneTypeWrapperRef.current.contains(target)) {
        setCraneTypeOpen(false)
        setCraneTypeActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleCraneTypeKeyDown(e: React.KeyboardEvent) {
    // sortedTypes + 1 (the "Egal, alle Typen" leading row) is the navigable list.
    const total = sortedTypes.length + 1
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCraneTypeOpen(true)
      setCraneTypeActiveIndex((prev) => (prev < total - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCraneTypeOpen(true)
      setCraneTypeActiveIndex((prev) => (prev > 0 ? prev - 1 : total - 1))
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (!craneTypeOpen) {
        setCraneTypeOpen(true)
        return
      }
      if (craneTypeActiveIndex === 0) {
        setCraneType('')
      } else if (craneTypeActiveIndex > 0) {
        setCraneType(sortedTypes[craneTypeActiveIndex - 1].slug)
      }
      setCraneTypeOpen(false)
      setCraneTypeActiveIndex(-1)
    } else if (e.key === 'Escape') {
      setCraneTypeOpen(false)
      setCraneTypeActiveIndex(-1)
    }
  }

  function handleInputChange(value: string) {
    setCityQuery(value)
    setSelectedCity(null)
    setActiveIndex(-1)
    setHint('')

    // Clear PLZ label when input changes
    if (!PLZ_REGEX.test(value.trim())) {
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
        // Auto-show city label when user typed a valid PLZ (DE 5-digit / AT 4-digit)
        if (PLZ_REGEX.test(value.trim()) && data.length > 0) {
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
    // (no field filled), the click is meaningful, it shows the user reached
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
      {/* Outer container, single rounded card. Pill aesthetic on desktop
          when collapsed, but switches to rounded-3xl when project field
          expands so the textarea attaches cleanly inside the same surface
          (no floating overlay, layout stays stable).
          overflow-x-clip + overflow-y-visible is the modern CSS combo that
          actually allows axis-asymmetric overflow (the older overflow-x-hidden
          + overflow-y-visible silently coerces the visible axis to auto and
          shows scrollbars on long content). Keeps the rounded-full pill
          clipping any child edges on x while letting the custom Krantyp
          dropdown panel extend below the card without being clipped. Without
          this fix the listbox renders into the DOM but is invisible. */}
      <div
        className={`bg-white shadow-lg sm:border sm:border-gray-200 transition-all overflow-x-clip overflow-y-visible ${
          showProjectField ? 'sm:rounded-3xl' : 'sm:rounded-full'
        }`}
      >
        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-stretch p-3 sm:p-1.5">
          {/* Krantyp field, custom dropdown. Replaces the native <select>
              (system blue highlight, system font in option list, no per-type
              counts) with a brand-styled disclosure: button + popover ul,
              same uppercase micro-label pattern as before. Sorted by Anbieter
              count desc when counts are provided so the most popular type
              (Autokran ~400) lands first. Counts shown inline in the option
              row turn the dropdown into a trust signal at the moment of
              choice. Single component handles desktop + mobile (the previous
              implementation duplicated a separate <select> for mobile). */}
          <div ref={craneTypeWrapperRef} className="w-full sm:flex-1 text-left relative">
            <label htmlFor="sb-cranetype-button" className="sm:hidden block text-[12px] font-medium text-gray-700 mb-1 ml-1">
              Krantyp
            </label>
            <button
              id="sb-cranetype-button"
              type="button"
              onClick={() => {
                setCraneTypeOpen((v) => !v)
                setCraneTypeActiveIndex(-1)
              }}
              onKeyDown={handleCraneTypeKeyDown}
              aria-haspopup="listbox"
              aria-expanded={craneTypeOpen}
              className="relative flex items-center w-full text-left h-12 sm:h-auto bg-white sm:bg-transparent rounded-lg sm:rounded-none border border-gray-300 sm:border-0 px-4 sm:px-0 sm:pl-12 sm:pr-3 sm:py-1.5"
            >
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
              <span className="hidden sm:flex flex-col flex-1 min-w-0">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-neutral-500 leading-none">Krantyp</span>
                <span className="text-[14px] font-medium text-neutral-900 mt-0.5 truncate">{craneTypeLabel}</span>
              </span>
              <span className="sm:hidden flex-1 text-[15px] font-medium text-gray-900 truncate">{craneTypeLabel}</span>
              <span aria-hidden className="ml-2 text-neutral-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {craneTypeOpen && (
              <ul
                role="listbox"
                aria-labelledby="sb-cranetype-button"
                className="absolute z-50 left-0 right-0 sm:right-auto sm:min-w-[280px] mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto py-1"
              >
                <li role="option" aria-selected={craneType === ''}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      setCraneType('')
                      setCraneTypeOpen(false)
                    }}
                    onMouseEnter={() => setCraneTypeActiveIndex(0)}
                    className={`w-full text-left px-4 py-2.5 text-[13px] flex items-center justify-between gap-3 transition-colors ${
                      craneTypeActiveIndex === 0
                        ? 'bg-neutral-100 text-neutral-950'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="font-medium">Egal, alle Typen</span>
                    <span className="text-[11px] text-neutral-400">alle anzeigen</span>
                  </button>
                </li>
                {sortedTypes.map((ct, i) => {
                  const idx = i + 1
                  const count = craneTypeCounts?.[ct.slug]
                  const active = craneTypeActiveIndex === idx
                  const selected = craneType === ct.slug
                  return (
                    <li key={ct.slug} role="option" aria-selected={selected}>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          setCraneType(ct.slug)
                          setCraneTypeOpen(false)
                        }}
                        onMouseEnter={() => setCraneTypeActiveIndex(idx)}
                        className={`w-full text-left px-4 py-2.5 text-[13px] flex items-center justify-between gap-3 transition-colors ${
                          active
                            ? 'bg-neutral-100 text-neutral-950'
                            : selected
                              ? 'bg-neutral-50 text-neutral-950'
                              : 'text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        <span className="font-medium">{ct.name}</span>
                        {typeof count === 'number' && count > 0 && (
                          <span className="text-[11px] font-[var(--font-mono)] tabular-nums text-neutral-400">
                            {count} Anbieter
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <div className="hidden sm:block w-px self-stretch bg-gray-200 shrink-0 my-2" />

          {/* Stadt / PLZ field */}
          <div ref={wrapperRef} className="relative w-full sm:flex-1 text-left">
            <label htmlFor="sb-city" className="sm:hidden block text-[12px] font-medium text-gray-700 mb-1 ml-1">
              Stadt oder PLZ
              {plzLabel && <span className="ml-2 text-blue-600 font-normal"> {plzLabel}</span>}
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

          {/* Search button, editorial/navigation CTA (black). Transaction CTAs
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

        {/* Optional project-description field, accordion INSIDE the same
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

      {/* Toggle row outside the box, keeps the search bar surface clean
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
            <span className="text-neutral-400"> hilft beim Matching</span>
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
