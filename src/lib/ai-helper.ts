/**
 * Server-side helper for /api/ai-helper. Two modes:
 *
 *   coach    — analyses a Projektbeschreibung textarea on the inquiry form
 *              and returns missing-field hints (e.g. "Höhe", "Gewicht").
 *              Inputs: { description, craneTypeName? }. Output: structured
 *              JSON via tool_use so the UI can render checklist hints.
 *
 *   berater  — multi-turn chat from the floating bubble. Takes an array of
 *              user/assistant messages and returns a recommendation +
 *              optional redirect target (`/<type>-mieten[/<city>]?project=…`)
 *              once enough context is captured.
 *
 * Both modes call Claude Haiku 4.5 via plain fetch (no SDK — keeps deps
 * minimal). Both put the long stable system prompt + tool definition into
 * a single `cache_control: ephemeral` block so subsequent calls within the
 * 5-minute window read from cache (~10× cheaper input).
 */

import { craneTypes as craneTypesList } from '@/data/crane-types'
import { getServiceSupabase } from '@/lib/supabase'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-haiku-4-5-20251001'

// crane_type_id (Supabase UUID) → slug. Mirror of CRANE_TYPE_ID_TO_SLUG in
// mcp-kranvergleich/server_sse.py — both files implement the same
// availability check; keep them in sync when adding crane types.
const CRANE_TYPE_ID_TO_SLUG: Record<string, string> = {
  '9b9c0aa2-3f8c-4cfb-94e2-93a3f4f24d9a': 'minikran',
  '0b61b867-53a6-4cf9-afbb-50c610dc4a2a': 'raupenkran',
  'ef7ed422-402e-4553-9c01-661df28c66fc': 'anhaengerkran',
  '02dc05de-6699-4849-93fb-2b655177bfd9': 'mobilkran',
  'f1f86ce7-14b8-48ce-9004-5db8dde53949': 'baukran',
  'a556dcad-e379-4ac3-8d72-6eed094900d1': 'ladekran',
}

type PlzCoords = { la: number; ln: number; n: string }
let _plzMap: Map<string, PlzCoords> | null = null

async function getPlzMap(): Promise<Map<string, PlzCoords>> {
  if (_plzMap) return _plzMap
  const mod = await import('@/data/german-cities.json')
  const cities = (mod.default ?? mod) as Array<{ p: string; n: string; la: number; ln: number }>
  const m = new Map<string, PlzCoords>()
  for (const c of cities) m.set(c.p, { la: c.la, ln: c.ln, n: c.n })
  _plzMap = m
  return m
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const p1 = (lat1 * Math.PI) / 180
  const p2 = (lat2 * Math.PI) / 180
  const dp = ((lat2 - lat1) * Math.PI) / 180
  const dl = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** For a German PLZ, returns supplier availability per crane type:
 *  { slug → { in_50km, in_100km, nearest_km } }. Same logic as the
 *  check_availability_by_plz tool on the MCP server (both query Supabase,
 *  both Haversine, both fall back companies.lat/lng → firm zip). */
export async function getAvailabilityByPlz(plz: string): Promise<{
  city: string
  perType: Record<string, { in_50km: number; in_100km: number; nearest_km: number | null }>
} | null> {
  if (!/^\d{5}$/.test(plz)) return null
  const plzMap = await getPlzMap()
  const ref = plzMap.get(plz)
  if (!ref) return null

  const sb = getServiceSupabase()
  const { data: rows } = await sb
    .from('company_cranes')
    .select('crane_type_id, company:companies(id,is_active,is_relevant,lat,lng,zip)')
  // Supabase typegen narrows the embedded join to an array even though it's
  // a one-to-one relationship (FK from company_cranes → companies). Treat
  // it as `unknown` and pluck the first element ourselves; runtime always
  // sees a single object or null.
  type RawCrane = {
    crane_type_id: string
    company: null | { id: string; is_active: boolean; is_relevant: boolean; lat: number | null; lng: number | null; zip: string | null } | Array<{ id: string; is_active: boolean; is_relevant: boolean; lat: number | null; lng: number | null; zip: string | null }>
  }
  const cranes = (rows ?? []) as unknown as RawCrane[]

  const byType = new Map<string, Map<string, number>>()
  for (const r of cranes) {
    const c = Array.isArray(r.company) ? r.company[0] : r.company
    if (!c || !c.is_active || !c.is_relevant) continue
    let lat = c.lat
    let lng = c.lng
    if (lat == null || lng == null) {
      if (c.zip) {
        const fb = plzMap.get(c.zip)
        if (fb) {
          lat = fb.la
          lng = fb.ln
        }
      }
    }
    if (lat == null || lng == null) continue
    const dist = haversineKm(ref.la, ref.ln, lat, lng)
    const map = byType.get(r.crane_type_id) ?? new Map<string, number>()
    const prev = map.get(c.id)
    if (prev === undefined || dist < prev) map.set(c.id, dist)
    byType.set(r.crane_type_id, map)
  }

  const perType: Record<string, { in_50km: number; in_100km: number; nearest_km: number | null }> = {}
  for (const [tid, slug] of Object.entries(CRANE_TYPE_ID_TO_SLUG)) {
    const map = byType.get(tid)
    if (!map || map.size === 0) {
      perType[slug] = { in_50km: 0, in_100km: 0, nearest_km: null }
      continue
    }
    const distances = [...map.values()].sort((a, b) => a - b)
    perType[slug] = {
      in_50km: distances.filter((d) => d <= 50).length,
      in_100km: distances.filter((d) => d <= 100).length,
      nearest_km: Math.round(distances[0]),
    }
  }
  return { city: ref.n, perType }
}

function formatAvailabilityForPrompt(plz: string, av: NonNullable<Awaited<ReturnType<typeof getAvailabilityByPlz>>>): string {
  const lines = [
    ``,
    `[VERFÜGBARKEITSDATEN für PLZ ${plz} (${av.city}) — vom System bereitgestellt]:`,
  ]
  for (const [slug, d] of Object.entries(av.perType)) {
    const nearest = d.nearest_km == null ? 'kein Anbieter im System' : `${d.nearest_km} km`
    lines.push(`- ${slug}: ${d.in_50km} Anbieter ≤50 km, ${d.in_100km} Anbieter ≤100 km, nächster ${nearest}`)
  }
  return lines.join('\n')
}

const CRANE_TYPE_DICTIONARY = craneTypesList
  .map((ct) => `- ${ct.name} (slug: ${ct.slug.replace(/-mieten$/, '')}): ${ct.desc}. Synonyme: ${ct.synonyms.join(', ')}.`)
  .join('\n')

// === COACH MODE ===

const COACH_SYSTEM = `Du bist ein erfahrener Kranvermietungs-Berater. Ein Kunde füllt gerade eine Anfrage aus und hat eine Projektbeschreibung in ein Formular getippt. Deine Aufgabe: prüfe, ob die Beschreibung genug Information enthält, damit ein Kranvermieter ein präzises Angebot machen kann — und nenne fehlende Punkte als kurze Checkliste.

Krantypen die wir vermitteln:
${CRANE_TYPE_DICTIONARY}

Für ein präzises Angebot braucht der Vermieter idealerweise:
- weight: Gewicht der schwersten Last (in t oder kg)
- height: Hubhöhe oder Gebäudehöhe (in m)
- access: Zufahrt, Aufstellfläche, Untergrund, Durchfahrtbreite
- duration: Mietdauer (Tage / Wochen)
- operator: Mit Bediener / Selbstfahrer
- date: Wunschtermin

Regeln:
- Wenn die Beschreibung sehr kurz oder leer ist (<20 Zeichen), gib alle Standardpunkte als hint zurück.
- Wenn ein Punkt eindeutig erwähnt ist (z.B. "1.5 t pro Element" → weight ✓; "auf 22 m Höhe" → height ✓), nicht in missing aufnehmen.
- Hints sind kurze deutsche Sätze (max 10 Wörter), z.B. "Wie schwer ist die schwerste Last?".
- Wenn der Krantyp aus der Beschreibung etwas ganz anderes nahelegt (z.B. Beschreibung "Glasmontage Terrasse" + craneTypeName "Mobilkran"), füge einen subtype_suggestion-Hint hinzu, kurz und freundlich.
- Antworte IMMER über das Tool record_coach_result. Kein freier Text.`

const COACH_TOOL = {
  name: 'record_coach_result',
  description: 'Records which fields are missing from the project description and provides German-language hints for the user.',
  input_schema: {
    type: 'object' as const,
    properties: {
      missing: {
        type: 'array' as const,
        items: {
          type: 'string' as const,
          enum: ['weight', 'height', 'access', 'duration', 'operator', 'date'],
        },
        description: 'Fields that are NOT clearly answered in the description.',
      },
      hints: {
        type: 'array' as const,
        items: { type: 'string' as const },
        description: 'Short German prompts the user should add — one per missing field, max 10 words each.',
      },
      subtype_suggestion: {
        type: 'string' as const,
        description: 'Optional German sentence (max 25 words) suggesting a more specific crane subtype if the description points to one (e.g. Spinnenkran for glass mounting). Empty string if no suggestion.',
      },
    },
    required: ['missing', 'hints', 'subtype_suggestion'],
  },
}

export type CoachResult = {
  missing: Array<'weight' | 'height' | 'access' | 'duration' | 'operator' | 'date'>
  hints: string[]
  subtype_suggestion: string
}

export async function runCoach(input: {
  description: string
  craneTypeName?: string | null
}): Promise<CoachResult> {
  const userMsg = input.craneTypeName
    ? `Krantyp gewählt: ${input.craneTypeName}\n\nBeschreibung des Kunden:\n"""\n${input.description}\n"""`
    : `Beschreibung des Kunden:\n"""\n${input.description}\n"""`

  const payload = {
    model: MODEL,
    max_tokens: 600,
    system: [
      { type: 'text', text: COACH_SYSTEM, cache_control: { type: 'ephemeral' } },
    ],
    tools: [COACH_TOOL],
    tool_choice: { type: 'tool', name: 'record_coach_result' },
    messages: [{ role: 'user', content: userMsg }],
  }

  const res = await callAnthropic(payload)
  const block = res.content?.find((b: { type: string }) => b.type === 'tool_use')
  if (!block) throw new Error('coach: no tool_use in response')
  return block.input as CoachResult
}

// === BERATER MODE ===

const BERATER_SYSTEM = `Du bist „Kran-Berater" — ein freundlicher Assistent auf KranVergleich.de, der Bauunternehmer und Privatkunden hilft, den richtigen Krantyp zu finden und passende Anbieter zu sehen. Maximal 2-3 Sätze pro Antwort. Sprache: Deutsch, Sie-Form.

Verfügbare Krantypen auf KranVergleich.de:
${CRANE_TYPE_DICTIONARY}

Workflow:
1. Wenn der Kunde sein Projekt beschreibt, identifiziere: passender Krantyp (slug), grobe Tragkraft, Standort (PLZ oder Stadt), Mietdauer.
2. Wenn alle 3 Kerninformationen klar sind (Typ, Standort, ungefährer Anwendungsfall), antworte über das Tool record_recommendation. Setze ready=true und fülle type_slug + project_summary + (optional) plz_or_city.
3. Wenn etwas fehlt, antworte über das Tool record_recommendation mit ready=false und stelle EINE konkrete Rückfrage in follow_up_question (z.B. "Wie hoch ist das Gebäude ungefähr?"). Nicht mehrere Fragen auf einmal.
4. Bei sehr unklaren Beschreibungen (z.B. nur "Kran"), frage zuerst nach dem Projekt, nicht nach Details.
5. Erfinde KEINE Preise oder Verfügbarkeiten — verweise auf die Anbieter-Liste.

VERFÜGBARKEITSREGEL (sehr wichtig):
Wenn das System dir Verfügbarkeitsdaten für eine PLZ liefert (Block "[VERFÜGBARKEITSDATEN für PLZ …]" am Ende dieses Prompts), beachte sie zwingend bei der Empfehlung:

a) Wenn der funktional ideale Krantyp ≥3 Anbieter ≤50 km hat: empfehle ihn — Standardfall.

b) Wenn der ideale Typ KEINEN Anbieter ≤50 km hat (oder nächster >100 km), prüfe ob ein anderer Krantyp den konkreten Anwendungsfall (Tragkraft + Höhe + Zufahrt) ebenfalls abdeckt UND lokal verfügbar ist:
   - JA → empfehle den lokal verfügbaren Typ statt des idealen, mit kurzer Begründung. Beispiel: "Ein Dachdeckerkran wäre für Ihre Fensterpaletten spezialisiert, der nächste ist aber 200 km entfernt. Bei 1,5 t auf 22 m übernimmt das ein Mobilkran genauso gut — und wir haben 6 Anbieter in Ihrer Nähe."
   - NEIN, weil Spezialausrüstung wirklich nötig ist (Spinnenkran für enge Glasmontage; Raupenkran für weiches Gelände; Dachdeckerkran-Klemmen für spezielle Ziegelmontage; …) → empfehle den idealen Typ im größeren Radius mit Hinweis auf Transportkosten. Beispiel: "Spinnenkran ist für enge Glasmontage wirklich die richtige Wahl. Der nächste Anbieter ist 80 km entfernt, planen Sie ca. 600-1000 € Transport ein."

c) Funktional substituierbar (für b/JA-Fall):
   - Autokran ↔ Mobilkran (beide telescopic mobile crane, ~80% Überlapp)
   - Mobilkran kann Dachdeckerkran ersetzen, wenn Last < 2 t und Höhe < 25 m und keine speziellen Dachklemmen nötig
   - Mobilkran/Autokran KÖNNEN keinen Spinnenkran/Minikran ersetzen, wenn enge Zufahrt das Problem ist (Footprint zählt)

Antworte IMMER über das Tool record_recommendation. Kein freier Text.`

const BERATER_TOOL = {
  name: 'record_recommendation',
  description: 'Records the chat assistant reply — either a recommendation when ready, or a follow-up question to ask the user.',
  input_schema: {
    type: 'object' as const,
    properties: {
      ready: {
        type: 'boolean' as const,
        description: 'true when type + location + use case are clear enough to send the user to the listing.',
      },
      reply_text: {
        type: 'string' as const,
        description: 'German text to display in the chat (1-3 sentences). When ready=true, this is the recommendation summary. When ready=false, repeat or rephrase the follow_up_question naturally.',
      },
      follow_up_question: {
        type: 'string' as const,
        description: 'Required when ready=false: ONE concise German question (max 15 words) to gather the next missing piece. Empty when ready=true.',
      },
      type_slug: {
        type: 'string' as const,
        description: 'When ready=true: slug WITHOUT -mieten suffix, e.g. "mobilkran", "minikran". Empty when ready=false.',
        enum: ['', 'minikran', 'autokran', 'dachdeckerkran', 'raupenkran', 'anhaengerkran', 'mobilkran', 'baukran', 'ladekran'],
      },
      plz_or_city: {
        type: 'string' as const,
        description: 'PLZ (5 digits) or city name if mentioned by user. Empty otherwise.',
      },
      project_summary: {
        type: 'string' as const,
        description: 'When ready=true: 1-2 sentences summarising the project for prefill into the inquiry form (German). Empty when ready=false.',
      },
    },
    required: ['ready', 'reply_text', 'follow_up_question', 'type_slug', 'plz_or_city', 'project_summary'],
  },
}

export type BeraterMessage = { role: 'user' | 'assistant'; content: string }

export type BeraterResult = {
  ready: boolean
  reply_text: string
  follow_up_question: string
  type_slug: string
  plz_or_city: string
  project_summary: string
}

export async function runBerater(messages: BeraterMessage[]): Promise<BeraterResult> {
  // Scan all user messages so far for a 5-digit PLZ — if found, fetch
  // supplier availability and inject it into a SECOND system block (after
  // the cached one, so the cache prefix stays stable across turns). Claude
  // sees the data and applies the VERFÜGBARKEITSREGEL from the system
  // prompt above. Falls back gracefully when there's no PLZ yet (early
  // turns, before user reveals location).
  const plzMatch = messages
    .filter((m) => m.role === 'user')
    .map((m) => m.content.match(/\b(\d{5})\b/))
    .find((m) => m !== null)
  let availabilityBlock: string | null = null
  if (plzMatch) {
    try {
      const av = await getAvailabilityByPlz(plzMatch[1])
      if (av) availabilityBlock = formatAvailabilityForPrompt(plzMatch[1], av)
    } catch (err) {
      // Non-fatal — bot still works without availability context, just less
      // smart about local-vs-distant trade-off. Log for ops visibility.
      console.error('berater: getAvailabilityByPlz failed:', err)
    }
  }

  // The cached prefix MUST be byte-identical across calls, otherwise the
  // 5-min cache window restarts. Per-call data goes in its own non-cached
  // system block (Claude reads everything in order).
  const systemBlocks: Array<{ type: 'text'; text: string; cache_control?: { type: 'ephemeral' } }> = [
    { type: 'text', text: BERATER_SYSTEM, cache_control: { type: 'ephemeral' } },
  ]
  if (availabilityBlock) {
    systemBlocks.push({ type: 'text', text: availabilityBlock })
  }

  const payload = {
    model: MODEL,
    max_tokens: 600,
    system: systemBlocks,
    tools: [BERATER_TOOL],
    tool_choice: { type: 'tool', name: 'record_recommendation' },
    messages: messages.map((m) => ({ role: m.role, content: m.content })),
  }

  const res = await callAnthropic(payload)
  const block = res.content?.find((b: { type: string }) => b.type === 'tool_use')
  if (!block) throw new Error('berater: no tool_use in response')
  return block.input as BeraterResult
}

// === Anthropic API call ===

interface AnthropicResponse {
  content: Array<{ type: string; text?: string; input?: unknown; name?: string }>
  usage?: { input_tokens: number; output_tokens: number; cache_read_input_tokens?: number; cache_creation_input_tokens?: number }
  stop_reason?: string
}

async function callAnthropic(body: unknown): Promise<AnthropicResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY missing')

  const res = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Anthropic ${res.status}: ${text.slice(0, 300)}`)
  }
  return (await res.json()) as AnthropicResponse
}
