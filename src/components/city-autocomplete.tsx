'use client'

import { useState, useRef, useEffect } from 'react'

interface CityResult {
  plz: string
  name: string
  state: string
  lat: number
  lng: number
  label: string
}

interface CityAutocompleteProps {
  onSelect: (city: CityResult) => void
  placeholder?: string
  className?: string
}

export function CityAutocomplete({ onSelect, placeholder = 'Stadt oder PLZ eingeben…', className = '' }: CityAutocompleteProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CityResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
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

  function handleChange(value: string) {
    setQuery(value)
    setActiveIndex(-1)

    if (value.trim().length < 3) {
      setResults([])
      setIsOpen(false)
      return
    }

    // Debounce API call
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

  function handleSelect(city: CityResult) {
    setQuery(city.name)
    setIsOpen(false)
    setResults([])
    onSelect(city)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      handleSelect(results[activeIndex])
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (results.length > 0) setIsOpen(true) }}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}

      {isOpen && results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {results.map((city, i) => (
            <li key={`${city.plz}-${city.name}`}>
              <button
                type="button"
                onClick={() => handleSelect(city)}
                className={`w-full text-left px-3 py-2 text-[13px] transition-colors ${
                  i === activeIndex ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-gray-400 mr-1.5">{city.plz}</span>
                <span className="font-medium">{city.name}</span>
                <span className="text-gray-400 text-[11px] ml-1.5">{city.state}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
