'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { craneTypes } from '@/data/crane-types'
import { resolveSearchTarget } from '@/lib/search'
import { BRAND_NAME } from '@/lib/country'

interface CityResult {
  plz: string
  name: string
  state: string
  lat: number
  lng: number
}

function CompactSearch() {
  const router = useRouter()
  const [craneType, setCraneType] = useState('')
  const [cityQuery, setCityQuery] = useState('')
  const [results, setResults] = useState<CityResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<CityResult | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined)

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
    if (value.trim().length < 3) {
      setResults([])
      setIsOpen(false)
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(value.trim())}`)
        const data: CityResult[] = await res.json()
        setResults(data)
        setIsOpen(data.length > 0)
      } catch {
        setResults([])
      }
    }, 200)
  }

  function selectCity(city: CityResult) {
    setCityQuery(city.name)
    setSelectedCity(city)
    setIsOpen(false)
  }

  function handleSearch() {
    const target = resolveSearchTarget({ craneType, cityQuery, selectedCity })
    if (!target) return
    router.push(target.url)
    setCityQuery('')
    setSelectedCity(null)
  }

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={craneType}
        onChange={(e) => setCraneType(e.target.value)}
        className="text-[12px] text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 w-[120px]"
      >
        <option value="">Krantyp…</option>
        {craneTypes.map((ct) => (
          <option key={ct.slug} value={ct.slug}>{ct.name}</option>
        ))}
      </select>
      <div ref={wrapperRef} className="relative">
        <input
          type="text"
          placeholder="Stadt oder PLZ…"
          value={cityQuery}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => { if (results.length > 0) setIsOpen(true) }}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleSearch() } }}
          autoComplete="off"
          className="text-[12px] text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2 py-1.5 w-[130px]"
        />
        {isOpen && results.length > 0 && (
          <ul className="absolute z-50 w-[220px] bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-48 overflow-y-auto">
            {results.map((city) => (
              <li key={`${city.plz}-${city.name}`}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-1.5 text-[12px] hover:bg-gray-50 transition-colors"
                  onMouseDown={() => selectCity(city)}
                >
                  <span className="text-gray-400 mr-1">{city.plz}</span>
                  <span className="font-medium">{city.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleSearch}
        disabled={!craneType}
        className="text-[12px] px-3 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-md transition-colors"
      >
        Suchen
      </button>
    </div>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-sm font-semibold text-gray-900">{BRAND_NAME}</span>
          </Link>

          {/* Desktop: search + nav */}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
            {!isHome && <CompactSearch />}
            <nav className="flex items-center gap-1">
              {craneTypes.slice(0, 3).map((ct) => (
                <Link
                  key={ct.slug}
                  href={`/${ct.slug}`}
                  data-track-type={ct.slug.replace(/-mieten$/, '')}
                  className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {ct.name}
                </Link>
              ))}
              <Link
                href="/kran-mieten-preise"
                className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Preisliste
              </Link>
              <Link
                href="/kostenrechner"
                className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Kostenrechner
              </Link>
              <div className="relative group">
                <button className="px-2.5 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                  Mehr &#9662;
                </button>
                <div className="absolute right-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-[180px]">
                  {craneTypes.slice(3).map((ct) => (
                    <Link
                      key={ct.slug}
                      href={`/${ct.slug}`}
                      data-track-type={ct.slug.replace(/-mieten$/, '')}
                      className="block px-4 py-2 text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      {ct.name} mieten
                    </Link>
                  ))}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <Link
                      href="/ratgeber"
                      className="block px-4 py-2 text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      Ratgeber
                    </Link>
                    <Link
                      href="/ueber-uns"
                      className="block px-4 py-2 text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      Über uns
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile: search icon + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            {!isHome && (
              <button
                onClick={() => { setMobileSearchOpen(!mobileSearchOpen); setMobileOpen(false) }}
                className="p-2 text-gray-500 hover:text-gray-900"
                aria-label="Suche"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="9" r="6" />
                  <path d="M13.5 13.5L17 17" />
                </svg>
              </button>
            )}
            <button
              onClick={() => { setMobileOpen(!mobileOpen); setMobileSearchOpen(false) }}
              className="p-2 text-gray-500 hover:text-gray-900"
              aria-label="Menü öffnen"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                {mobileOpen ? (
                  <path d="M5 5l10 10M15 5L5 15" />
                ) : (
                  <path d="M3 5h14M3 10h14M3 15h14" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3">
          <CompactSearch />
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto px-4 py-3 space-y-1">
            {craneTypes.map((ct) => (
              <Link
                key={ct.slug}
                href={`/${ct.slug}`}
                onClick={() => setMobileOpen(false)}
                data-track-type={ct.slug.replace(/-mieten$/, '')}
                className="block py-2 text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                {ct.name} mieten
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <Link
                href="/kran-mieten-preise"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Preisliste
              </Link>
              <Link
                href="/kostenrechner"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Kostenrechner
              </Link>
              <Link
                href="/ratgeber"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Ratgeber
              </Link>
              <Link
                href="/ueber-uns"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-[14px] text-gray-500 hover:text-gray-900 transition-colors"
              >
                Über uns
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
