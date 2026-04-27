'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Inline AI assistant that watches a Projektbeschreibung textarea and prompts
 * the user about missing detail (Gewicht / Höhe / Zufahrt / Mietdauer / etc.)
 * before they hit the lead-submit button.
 *
 * Why: GSC + lead-quality work showed that vague descriptions ("13
 * Terrassenscheiben aufs Dach") get fanned out to 10 offerers, of whom 7
 * write back "bitte mehr Details" — slow round-trip, frustrated user, lost
 * lead. A single short hint ("Gewicht pro Element?") pre-submit closes that
 * gap. Backed by /api/ai-helper mode=coach (Haiku, ~$0.002/call).
 *
 * Wiring: pass the same value the form's textarea already shows, plus the
 * crane-type name when known. No state lift required — this is purely a
 * read-only suggester rendered next to the textarea.
 */
export function DescriptionCoach({
  description,
  craneTypeName,
}: {
  description: string
  craneTypeName?: string | null
}) {
  const [hints, setHints] = useState<string[]>([])
  const [subtypeSuggestion, setSubtypeSuggestion] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastQueryRef = useRef<string>('')

  useEffect(() => {
    if (dismissed) return
    const trimmed = description.trim()

    // Don't fire on tiny inputs — too noisy. The form's regular placeholder
    // already prompts. Wait until the user has written ~4+ words.
    if (trimmed.length < 25) {
      setHints([])
      setSubtypeSuggestion('')
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      // Skip duplicate calls — common when the user pauses and then doesn't
      // change anything (focus events, etc.).
      if (lastQueryRef.current === trimmed) return
      lastQueryRef.current = trimmed
      setIsLoading(true)
      try {
        const res = await fetch('/api/ai-helper', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'coach', description: trimmed, craneTypeName }),
        })
        if (!res.ok) return
        const data = (await res.json()) as {
          missing: string[]
          hints: string[]
          subtype_suggestion: string
        }
        setHints(Array.isArray(data.hints) ? data.hints.slice(0, 5) : [])
        setSubtypeSuggestion(typeof data.subtype_suggestion === 'string' ? data.subtype_suggestion : '')
      } catch {
        // Silent failure — coach is non-blocking, don't bother the user.
      } finally {
        setIsLoading(false)
      }
    }, 1500)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [description, craneTypeName, dismissed])

  if (dismissed) return null
  if (hints.length === 0 && !subtypeSuggestion) return null

  return (
    <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5">
      <div className="flex items-start gap-2">
        <span aria-hidden className="text-blue-600 text-[14px] leading-5">💡</span>
        <div className="flex-1 min-w-0">
          <p className="text-[12px] font-medium text-blue-900">
            {isLoading ? 'Prüfe Beschreibung…' : 'Hilft bei schnellerer Antwort:'}
          </p>
          {hints.length > 0 && (
            <ul className="mt-1 space-y-0.5 text-[12px] text-blue-900/80">
              {hints.map((h, i) => (
                <li key={i} className="leading-snug">
                  • {h}
                </li>
              ))}
            </ul>
          )}
          {subtypeSuggestion && (
            <p className="mt-1 text-[12px] text-blue-900/80 leading-snug">
              <span className="font-medium">Hinweis:</span> {subtypeSuggestion}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Hinweis ausblenden"
          className="text-blue-400 hover:text-blue-700 text-[14px] leading-none px-1"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
