'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const AVATAR_SRC = '/images/kran-berater-avatar.png'

/**
 * Floating "Kran-Berater" chat bubble — global widget rendered in layout.tsx.
 *
 * Purpose: holding-pattern UX for project-intent visitors who don't yet know
 * which crane type they need (the Mario-Wagner persona). Click the bubble →
 * describe the project in 1-2 sentences → AI maps to a crane type + (optional)
 * city → CTA "Anbieter zeigen" routes to the listing page with the project
 * description pre-filled into the inquiry form via ?project=…
 *
 * Backed by /api/ai-helper mode=berater (Claude Haiku 4.5, ~$0.005-0.02 per
 * session, max 10 messages per session). Conversation history persists in
 * localStorage so a refresh doesn't wipe context.
 */

const STORAGE_KEY = 'kran-berater-v1'
const MAX_MESSAGES_UI = 12

type Msg = { role: 'user' | 'assistant'; content: string }

interface Suggestion {
  type_slug: string
  plz_or_city: string
  project_summary: string
}

interface PersistedState {
  messages: Msg[]
  suggestion: Suggestion | null
}

function loadState(): PersistedState {
  if (typeof window === 'undefined') return { messages: [], suggestion: null }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { messages: [], suggestion: null }
    const parsed = JSON.parse(raw) as PersistedState
    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages.slice(-MAX_MESSAGES_UI) : [],
      suggestion: parsed.suggestion ?? null,
    }
  } catch {
    return { messages: [], suggestion: null }
  }
}

function saveState(s: PersistedState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // localStorage full / disabled — non-fatal, just drops persistence.
  }
}

function citySlug(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-|-$/g, '')
}

function buildTargetUrl(s: Suggestion): string {
  const typePath = s.type_slug ? `/${s.type_slug}-mieten` : '/kranverleih'
  let url = typePath
  const loc = s.plz_or_city.trim()
  if (loc) {
    if (/^\d{5}$/.test(loc)) {
      url += `?plz=${loc}`
    } else if (s.type_slug) {
      // City path only valid when we actually have a type slug — /kranverleih
      // doesn't have a /<city> segment.
      url += `/${citySlug(loc)}`
    }
  }
  if (s.project_summary) {
    url += (url.includes('?') ? '&' : '?') + 'project=' + encodeURIComponent(s.project_summary)
  }
  return url
}

export function KranBerater() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hydrated, setHydrated] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Hydrate from localStorage post-mount (avoid SSR mismatch).
  useEffect(() => {
    const s = loadState()
    setMessages(s.messages)
    setSuggestion(s.suggestion)
    setHydrated(true)
  }, [])

  // Persist on change.
  useEffect(() => {
    if (!hydrated) return
    saveState({ messages, suggestion })
  }, [messages, suggestion, hydrated])

  // Autoscroll chat to bottom on new message.
  useEffect(() => {
    if (!open) return
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, open, loading, suggestion])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    if (messages.length >= MAX_MESSAGES_UI) {
      // Hard stop — direct user to the calculator if conversation goes long.
      setMessages((m) => [
        ...m,
        { role: 'user', content: text },
        {
          role: 'assistant',
          content:
            'Wir haben jetzt schon einiges besprochen — am schnellsten finden Sie passende Anbieter über unseren Kostenrechner.',
        },
      ])
      setInput('')
      return
    }

    const next: Msg[] = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'berater', messages: next }),
      })
      const data = (await res.json()) as
        | { error: string }
        | {
            ready: boolean
            reply_text: string
            follow_up_question: string
            type_slug: string
            plz_or_city: string
            project_summary: string
          }
      if ('error' in data) {
        setMessages((m) => [
          ...m,
          { role: 'assistant', content: 'Es gab einen Fehler. Bitte versuchen Sie es gleich nochmal.' },
        ])
      } else {
        const reply = data.reply_text || data.follow_up_question || '…'
        setMessages((m) => [...m, { role: 'assistant', content: reply }])
        if (data.ready && data.type_slug) {
          setSuggestion({
            type_slug: data.type_slug,
            plz_or_city: data.plz_or_city ?? '',
            project_summary: data.project_summary ?? '',
          })
        }
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: 'Verbindungsfehler. Bitte versuchen Sie es gleich nochmal.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleViewProviders() {
    if (!suggestion) return
    const url = buildTargetUrl(suggestion)
    setOpen(false)
    router.push(url)
  }

  function reset() {
    setMessages([])
    setSuggestion(null)
    if (typeof window !== 'undefined') window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <>
      {/* Floating launcher — bottom-right, hidden until React hydrates so the
          SSR HTML stays clean for SEO. Avatar shown in a circle stamp on the
          dark pill so the bot reads as a person, not a generic AI emoji. */}
      {hydrated && (
        <button
          type="button"
          aria-label="Kran-Berater öffnen"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white pl-1.5 pr-4 py-1.5 shadow-lg transition-colors"
        >
          <span className="relative inline-block h-9 w-9 rounded-full overflow-hidden bg-white ring-2 ring-white shrink-0">
            <Image
              src={AVATAR_SRC}
              alt=""
              width={36}
              height={36}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="text-[13px] font-medium hidden sm:inline">Kran-Berater fragen</span>
          {messages.length > 0 && (
            <span aria-hidden className="ml-1 h-2 w-2 rounded-full bg-emerald-400" />
          )}
        </button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-5 py-3 border-b bg-gradient-to-r from-neutral-50 to-white">
            <DialogTitle className="text-[15px] font-semibold flex items-center gap-3">
              <span className="relative inline-block h-9 w-9 rounded-full overflow-hidden bg-white ring-1 ring-neutral-200 shrink-0">
                <Image src={AVATAR_SRC} alt="" width={36} height={36} className="h-full w-full object-cover" />
                <span aria-hidden className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </span>
              <span className="flex flex-col">
                <span className="text-neutral-900 leading-tight">Kran-Berater</span>
                <span className="text-[11px] text-emerald-700 font-normal leading-tight">Online · antwortet sofort</span>
              </span>
            </DialogTitle>
          </DialogHeader>

          {/* Chat thread */}
          <div ref={scrollRef} className="px-5 py-4 max-h-[50vh] overflow-y-auto space-y-3">
            {messages.length === 0 && (
              <div className="rounded-xl bg-blue-50/60 border border-blue-100 px-4 py-3 text-[13px] text-gray-700 leading-relaxed">
                <p className="font-medium text-gray-900 mb-1">Guten Tag!</p>
                Beschreiben Sie kurz Ihr Projekt — ich finde für Sie den passenden
                Krantyp und passende Anbieter in Ihrer Region.
                <p className="mt-2 text-gray-500 text-[12px]">
                  Beispiel: „Stahlhalle 45×25m bauen, bei Hannover" oder „Glasscheiben
                  aufs Dach, 22m Höhe".
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-6 rounded-lg bg-blue-50 px-3 py-2 text-[13px] text-gray-900 leading-snug whitespace-pre-wrap'
                    : 'mr-6 rounded-lg bg-gray-100 px-3 py-2 text-[13px] text-gray-900 leading-snug whitespace-pre-wrap'
                }
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-6 rounded-lg bg-gray-100 px-3 py-2 inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce" />
              </div>
            )}
            {suggestion && !loading && (
              <div className="mt-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p className="text-[12px] font-medium text-blue-900 mb-2">
                  Empfehlung:{' '}
                  <span className="capitalize">{suggestion.type_slug}</span>
                  {suggestion.plz_or_city && ` · ${suggestion.plz_or_city}`}
                </p>
                <Button
                  type="button"
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[13px]"
                  onClick={handleViewProviders}
                >
                  Passende Anbieter zeigen →
                </Button>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t px-5 py-3 bg-gray-50">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={2}
              maxLength={500}
              placeholder="Beschreiben Sie kurz Ihr Projekt…"
              className="resize-none text-[13px] bg-white"
              disabled={loading}
            />
            <div className="flex items-center justify-between mt-2 gap-2">
              <button
                type="button"
                onClick={reset}
                className="text-[11px] text-gray-400 hover:text-gray-700 underline-offset-2 hover:underline"
              >
                Neu starten
              </button>
              <Button
                type="button"
                size="sm"
                onClick={send}
                disabled={!input.trim() || loading}
                className="text-[13px]"
              >
                {loading ? '…' : 'Senden'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
