/**
 * Server-side helper for /api/ai-helper. Two modes:
 *
 *   coach   , analyses a Projektbeschreibung textarea on the inquiry form
 *              and returns missing-field hints (e.g. "Höhe", "Gewicht").
 *              Inputs: { description, craneTypeName? }. Output: structured
 *              JSON via tool_use so the UI can render checklist hints.
 *
 *   berater , multi-turn chat from the floating bubble. Takes an array of
 *              user/assistant messages and returns a recommendation +
 *              optional redirect target (`/<type>-mieten[/<city>]?project=…`)
 *              once enough context is captured.
 *
 * All modes call the Anthropic API via plain fetch (no SDK, keeps deps minimal)
 * and put the long stable system prompt + tool definition into a single
 * `cache_control: ephemeral` block so subsequent calls within the 5-minute
 * window read from cache (~10× cheaper input). Model tier per mode: coach +
 * subtype-check use Haiku 4.5 (MODEL_FAST); berater, categorize + requirements
 * use Sonnet 4.6 (MODEL_SMART) for better reasoning + lead-quality.
 */

import { craneTypes as craneTypesList } from '@/data/crane-types'
import { COUNTRY, PLZ_REGEX } from '@/lib/country'
import { getServiceSupabase } from '@/lib/supabase'

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
// Two tiers. FAST (Haiku 4.5) for the simple UX nudges (coach, subtype-check).
// SMART (Sonnet 4.6) for reasoning + lead-quality tasks (berater chat,
// requirements matcher, crane-type categorize), where model quality directly
// affects crane-selection comfort and lead routing. Opus would be overkill for
// these per-user, real-time calls.
const MODEL_FAST = 'claude-haiku-4-5-20251001'
const MODEL_SMART = 'claude-sonnet-4-6'

// crane_type_id (Supabase UUID) -> slug, used by the PLZ availability check.
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
  // Country-aware: DE deploy uses german-cities.json, AT deploy uses
  // austrian-cities.json. Tree-shaking drops the unused branch at build.
  const mod = COUNTRY === 'AT'
    ? await import('@/data/austrian-cities.json')
    : await import('@/data/german-cities.json')
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
 *  { slug -> { in_50km, in_100km, nearest_km } }. Queries Supabase
 *  (company_cranes + companies) directly, Haversine distance, falls back to the
 *  firm's zip when companies.lat/lng is missing. */
export async function getAvailabilityByPlz(plz: string): Promise<{
  city: string
  perType: Record<string, { in_50km: number; in_100km: number; nearest_km: number | null }>
} | null> {
  if (!PLZ_REGEX.test(plz)) return null
  const plzMap = await getPlzMap()
  const ref = plzMap.get(plz)
  if (!ref) return null

  const sb = getServiceSupabase()
  const { data: rows } = await sb
    .from('company_cranes')
    .select('crane_type_id, company:companies(id,is_active,is_relevant,lat,lng,zip)')
  // Supabase typegen narrows the embedded join to an array even though it's
  // a one-to-one relationship (FK from company_cranes  companies). Treat
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
    `[VERFÜGBARKEITSDATEN für PLZ ${plz} (${av.city}), vom System bereitgestellt]:`,
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

const COACH_SYSTEM = `Du bist ein erfahrener Kranvermietungs-Berater. Ein Kunde füllt gerade eine Anfrage aus und hat eine Projektbeschreibung in ein Formular getippt. Deine Aufgabe: prüfe, ob die Beschreibung genug Information enthält, damit ein Kranvermieter ein präzises Angebot machen kann, und nenne fehlende Punkte als kurze Checkliste.

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
- Wenn ein Punkt eindeutig erwähnt ist (z.B. "1.5 t pro Element" = weight erkannt; "auf 22 m Höhe" = height erkannt), nicht in missing aufnehmen.
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
        description: 'Short German prompts the user should add, one per missing field, max 10 words each.',
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
    model: MODEL_FAST,
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

const BERATER_SYSTEM = `Du bist „Kran-Berater", ein freundlicher Assistent auf KranVergleich.de, der Bauunternehmer und Privatkunden hilft, den richtigen Krantyp zu finden und passende Anbieter zu sehen. Maximal 2-3 Sätze pro Antwort. Sprache: Deutsch, Sie-Form.

Verfügbare Krantypen auf KranVergleich.de:
${CRANE_TYPE_DICTIONARY}

Workflow:
1. Wenn der Kunde sein Projekt beschreibt, identifiziere: passender Krantyp (slug), grobe Tragkraft, Standort (PLZ oder Stadt), Mietdauer.
2. Wenn alle 3 Kerninformationen klar sind (Typ, Standort, ungefährer Anwendungsfall), antworte über das Tool record_recommendation. Setze ready=true und fülle type_slug + project_summary + (optional) plz_or_city.
3. Wenn etwas fehlt, antworte über das Tool record_recommendation mit ready=false und stelle EINE konkrete Rückfrage in follow_up_question (z.B. "Wie hoch ist das Gebäude ungefähr?"). Nicht mehrere Fragen auf einmal.
4. Bei sehr unklaren Beschreibungen (z.B. nur "Kran"), frage zuerst nach dem Projekt, nicht nach Details.
5. Erfinde KEINE Preise oder Verfügbarkeiten, verweise auf die Anbieter-Liste.

VERFÜGBARKEITSREGEL (sehr wichtig):
Wenn das System dir Verfügbarkeitsdaten für eine PLZ liefert (Block "[VERFÜGBARKEITSDATEN für PLZ …]" am Ende dieses Prompts), beachte sie zwingend bei der Empfehlung:

a) Wenn der funktional ideale Krantyp ≥3 Anbieter ≤50 km hat: empfehle ihn. Standardfall.

b) Wenn der ideale Typ KEINEN Anbieter ≤50 km hat (oder nächster >100 km), prüfe ob ein anderer Krantyp den konkreten Anwendungsfall (Tragkraft + Höhe + Zufahrt) ebenfalls abdeckt UND lokal verfügbar ist:
   - JA  empfehle den lokal verfügbaren Typ statt des idealen, mit kurzer Begründung. Beispiel: "Ein Dachdeckerkran wäre für Ihre Fensterpaletten spezialisiert, der nächste Anbieter ist aber 200 km entfernt. Bei 1,5 t auf 22 m übernimmt das ein Mobilkran genauso gut, und wir haben 4 Anbieter ab 21 km."
   - NEIN, weil Spezialausrüstung wirklich nötig ist (Spinnenkran für enge Glasmontage; Raupenkran für weiches Gelände; Dachdeckerkran-Klemmen für spezielle Ziegelmontage; …)  empfehle den idealen Typ im größeren Radius mit Hinweis auf Transportkosten. Beispiel: "Spinnenkran ist für enge Glasmontage wirklich die richtige Wahl. Der nächste Anbieter ist 80 km entfernt, planen Sie ca. 600-1000 € Transport ein."

c) Funktional substituierbar (für b/JA-Fall):
   - Autokran ↔ Mobilkran (beide telescopic mobile crane, ~80% Überlapp)
   - Mobilkran kann Dachdeckerkran ersetzen, wenn Last < 2 t und Höhe < 25 m und keine speziellen Dachklemmen nötig
   - Mobilkran/Autokran KÖNNEN keinen Spinnenkran/Minikran ersetzen, wenn enge Zufahrt das Problem ist (Footprint zählt)

ZAHLENREGEL (kritisch, keine Halluzinationen):
Wenn du in deiner Antwort eine Anbieterzahl, eine Distanz oder einen Radius nennst, MUSST du die exakten Werte aus dem VERFÜGBARKEITSDATEN-Block für genau jenen Krantyp übernehmen, den du erwähnst. Nicht runden, nicht schätzen, nicht zwischen Typen mischen.

Konkret:
- "X Anbieter ≤50 km" für Typ Y  schreibe genau diese Zahl X.
- "nächster N km" für Typ Y  schreibe "nächster Anbieter N km entfernt" oder "ab N km", aber NIE eine andere Zahl.
- Wenn du sagst "der nächste Dachdeckerkran ist weit weg", füge die exakte Distanz aus den Daten hinzu (z.B. "200 km entfernt").
- Wenn die Daten "0 Anbieter ≤50 km, nächster 200 km" zeigen, schreibe das so. Nicht "in der Nähe", nicht "verfügbar".

Wenn keine VERFÜGBARKEITSDATEN vorliegen (PLZ noch nicht genannt), nenne KEINE Zahlen über Anbieter oder Distanzen, frage einfach nach der PLZ.

Antworte IMMER über das Tool record_recommendation. Kein freier Text.`

const BERATER_TOOL = {
  name: 'record_recommendation',
  description: 'Records the chat assistant reply, either a recommendation when ready, or a follow-up question to ask the user.',
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
  // Scan user messages for a 5-digit PLZ. Take the LAST one (in case the
  // user changed their mind mid-conversation, earlier "10115 Berlin" then
  // "actually we moved to 89584", we want availability data for 89584, not
  // Berlin). Falls back gracefully when no PLZ has been mentioned yet.
  let foundPlz: string | null = null
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role !== 'user') continue
    const m = messages[i].content.match(/\b(\d{5})\b/)
    if (m) {
      foundPlz = m[1]
      break
    }
  }
  let availabilityBlock: string | null = null
  if (foundPlz) {
    try {
      const av = await getAvailabilityByPlz(foundPlz)
      if (av) availabilityBlock = formatAvailabilityForPrompt(foundPlz, av)
    } catch (err) {
      // Non-fatal, bot still works without availability context, just less
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
    model: MODEL_SMART,
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

// === SUBTYPE-CHECK MODE ===

const SUBTYPE_CHECK_SYSTEM = `Du prüfst eine Krantyp-Empfehlung des KranVergleich.de-Kostenrechners. Der Nutzer hat einen Krantyp ausgewählt UND eine freie Projektbeschreibung verfasst. Deine Aufgabe: erkennen, ob die Beschreibung auf einen besser passenden (Sub-)Typ hindeutet, den der Nutzer übersehen hat.

Verfügbare Krantypen auf KranVergleich.de:
${CRANE_TYPE_DICTIONARY}

Spezialfälle die du erkennen solltest:
- Glasmontage / Glasscheiben / Fenster aufs Dach + enge Zufahrt  Spinnenkran (im Minikran-Filter findbar) statt Mobilkran/Autokran
- Indoor-Arbeit / Bodenbelag schonen / Rasen + niedriges Gewicht  Spinnenkran/Minikran
- Dacharbeiten / Ziegelmontage / kurzfristig 1 Tag  Dachdeckerkran (kompakter, kein Bedienerschein)
- Hochhaus / mehrwöchige Baustelle  Baukran (Turmdrehkran) statt Mobilkran
- Schwerlast > 80 t / weiches Gelände  Raupenkran statt Mobilkran
- LKW be-/entladen / Hof-Logistik  Ladekran statt Autokran
- DIY / kleines Privatprojekt / unter 0,5 t  Anhängerkran statt Mobilkran

Regel, nur dann Hinweis geben, wenn:
1. Die Beschreibung einen klaren Indikator für einen anderen Typ enthält (z.B. "Glasmontage", "enge Zufahrt 3m", "indoor", "Dach", "Hochhaus", "schwerlast 100 t").
2. UND der gewählte Typ wirklich suboptimal ist für diesen Anwendungsfall (nicht nur "auch ok").

Wenn der Nutzer bereits den passenden Typ gewählt hat oder die Beschreibung zu vage ist um sicher zu sein  kein Hinweis (should_suggest=false).

Wenn der gewählte Typ richtig ist aber eine spezialisierte Variante existiert (z.B. Minikran  Spinnenkran für Glasmontage), gib einen subtype_note: gewählter Typ bleibt richtig, aber bei den Anbietern nach der Spezial-Variante filtern.

Antworte IMMER über das Tool record_subtype_check. Kein freier Text.`

const SUBTYPE_CHECK_TOOL = {
  name: 'record_subtype_check',
  description: 'Records whether the chosen crane type is suboptimal for the described project, and what to suggest instead.',
  input_schema: {
    type: 'object' as const,
    properties: {
      should_suggest: {
        type: 'boolean' as const,
        description: 'true only when the description clearly points to a different/specialized type that the user missed.',
      },
      hint_kind: {
        type: 'string' as const,
        enum: ['none', 'switch_type', 'subtype_note'],
        description: 'none = no hint. switch_type = recommend a different crane type entirely. subtype_note = chosen type is fine but flag a subtype/specialization to look for at suppliers.',
      },
      suggested_type_slug: {
        type: 'string' as const,
        enum: ['', 'minikran', 'autokran', 'dachdeckerkran', 'raupenkran', 'anhaengerkran', 'mobilkran', 'baukran', 'ladekran'],
        description: 'When hint_kind=switch_type: the slug to recommend. Empty for none/subtype_note.',
      },
      message: {
        type: 'string' as const,
        description: 'Short German message (max 35 words, Sie-Form). For switch_type explain why the suggested type fits better. For subtype_note name the specialty (e.g. "Spinnenkran für Glasmontage"). Empty when should_suggest=false.',
      },
    },
    required: ['should_suggest', 'hint_kind', 'suggested_type_slug', 'message'],
  },
}

export type SubtypeCheckResult = {
  should_suggest: boolean
  hint_kind: 'none' | 'switch_type' | 'subtype_note'
  suggested_type_slug: string
  message: string
}

export async function runSubtypeCheck(input: {
  chosenTypeName: string
  chosenTypeSlug: string
  weightTons?: number | null
  heightMeters?: number | null
  projectDetails: string
}): Promise<SubtypeCheckResult> {
  const facts: string[] = [
    `Gewählter Krantyp: ${input.chosenTypeName} (slug: ${input.chosenTypeSlug})`,
  ]
  if (input.weightTons != null) facts.push(`Tragkraft: ${input.weightTons} t`)
  if (input.heightMeters != null) facts.push(`Höhe: ${input.heightMeters} m`)
  const userMsg = `${facts.join('\n')}\n\nProjektbeschreibung des Kunden:\n"""\n${input.projectDetails}\n"""`

  const payload = {
    model: MODEL_FAST,
    max_tokens: 400,
    system: [
      { type: 'text', text: SUBTYPE_CHECK_SYSTEM, cache_control: { type: 'ephemeral' } },
    ],
    tools: [SUBTYPE_CHECK_TOOL],
    tool_choice: { type: 'tool', name: 'record_subtype_check' },
    messages: [{ role: 'user', content: userMsg }],
  }

  const res = await callAnthropic(payload)
  const block = res.content?.find((b: { type: string }) => b.type === 'tool_use')
  if (!block) throw new Error('subtype-check: no tool_use in response')
  return block.input as SubtypeCheckResult
}

// === CATEGORIZE MODE ===
//
// Server-side classifier called from /api/leads when crane_type_id is missing
// but the customer provided a substantive project_description. Defense-in-
// depth after the form-layer C fix (LeadForm requires crane type when prop
// is missing): catches future forms that forget to pass craneTypeId, direct
// API calls, and edge cases where the customer typed enough specs in the
// description for an obvious classification ("1.5 t auf 10 m für 60 Tage" 
// baukran).
//
// Model: Sonnet 4.6 (MODEL_SMART) — a misclassification here misroutes the lead,
// so the stronger model earns its keep. Cached system prompt keeps cost low.
// Called inline in /api/leads before auto_select (adds ~1s to the submit).

const CATEGORIZE_SYSTEM = `Sie sind ein Klassifikator für Kran-Anfragen auf KranVergleich.de. Gegeben ist eine Projektbeschreibung. Wählen Sie genau EINEN Krantyp aus der Liste und geben Sie Ihre Konfidenz an.

Verfügbare Krantypen:
- anhaengerkran: Bis 1,5 t, mit PKW transportierbar (Anhängerkupplung), günstigste Option. Bis ca. 10 m Höhe.
- minikran: Bis 3 t, sehr kompakt, für enge Zufahrten / Innenräume / Glasmontage / Spinnenkran. Bis ca. 18 m Höhe.
- dachdeckerkran: Bis 2 t, schneller Aufbau speziell für Dacharbeiten / Ziegelmontage. Bis ca. 25 m Höhe.
- ladekran: LKW-montiert mit Knickarm, für Be- und Entladearbeiten, 1-30 t.
- autokran: 30-80 t mobile crane, flexibel, inkl. Kranführer. Bis ca. 40 m Höhe.
- mobilkran: 80-500 t mobile crane, schwere Lasten, hohe Auslagen. Über 40 m Höhe möglich.
- baukran: Turmdrehkran für langfristige Bauprojekte (Wochen/Monate). Wirtschaftlich ab ~4 Wochen Mietdauer.
- raupenkran: Über 100 t, Schwerlast, schweres oder weiches Gelände.

Konfidenz-Skala:
- 0.95+: eindeutige Spezifika passen perfekt (z.B. "Stahlträger 25 t auf 30 m"  autokran 0.97)
- 0.80-0.94: starke Indikatoren ohne Widersprüche (z.B. "60 Tage Bauprojekt, 1,5 t auf 10 m"  baukran 0.88)
- 0.50-0.79: vage Beschreibung, beste Spekulation
- <0.50: zu unbestimmt für eine Empfehlung, type_slug="" und confidence=0

Heuristiken:
- Mietdauer >= 30 Tage UND moderate Höhe (≥ 10 m)  baukran (Monatsmiete viel günstiger als Autokran).
- Sehr leichte Lasten (≤ 1 t) + niedrige Höhe (≤ 10 m)  anhaengerkran.
- Dacharbeiten ausdrücklich genannt + Last ≤ 2 t  dachdeckerkran.
- Glasmontage / Spinnenkran / enge Zufahrt  minikran.
- Schwere Lasten > 50 t  mobilkran oder raupenkran.

Antworten Sie IMMER über das Tool record_categorization. Kein freier Text.`

const CATEGORIZE_TOOL = {
  name: 'record_categorization',
  description: 'Records the inferred crane type and confidence for a project description.',
  input_schema: {
    type: 'object' as const,
    properties: {
      type_slug: {
        type: 'string' as const,
        description: 'Slug WITHOUT -mieten suffix. Empty string when the description is too vague for a confident pick.',
        enum: ['', 'anhaengerkran', 'minikran', 'dachdeckerkran', 'ladekran', 'autokran', 'mobilkran', 'baukran', 'raupenkran'],
      },
      confidence: {
        type: 'number' as const,
        description: '0.0-1.0 confidence in the inferred type. <0.5 means "do not trust this categorization".',
        minimum: 0,
        maximum: 1,
      },
      reasoning: {
        type: 'string' as const,
        description: 'One short German sentence (max 20 words) explaining the pick, for ops logs only, not shown to user.',
      },
    },
    required: ['type_slug', 'confidence', 'reasoning'],
  },
}

export type CategorizeResult = {
  type_slug: string
  confidence: number
  reasoning: string
}

export async function runCategorize(description: string): Promise<CategorizeResult> {
  const payload = {
    model: MODEL_SMART,
    max_tokens: 300,
    system: [
      { type: 'text', text: CATEGORIZE_SYSTEM, cache_control: { type: 'ephemeral' } },
    ],
    tools: [CATEGORIZE_TOOL],
    tool_choice: { type: 'tool', name: 'record_categorization' },
    messages: [{ role: 'user', content: `Projektbeschreibung:\n"""\n${description}\n"""` }],
  }

  const res = await callAnthropic(payload)
  const block = res.content?.find((b: { type: string }) => b.type === 'tool_use')
  if (!block) throw new Error('categorize: no tool_use in response')
  return block.input as CategorizeResult
}

// === REQUIREMENTS MODE ===
//
// Listing-page matcher (lead-flow rebuild "A"). The customer types what they
// want to lift in a free field on a city×type listing; this extracts the
// structured lifting requirements so the client can re-rank the firm list by
// fit (capacity + glass-sucker), using company_cranes data it already holds.
// Sonnet 4.6 (MODEL_SMART) with cached system prompt; runs only when the
// customer actually uses the field. The extraction drives firm fit-ranking, so
// nuance (e.g. "2 Scheiben je 400 kg" = 400 not 800) is worth the smarter tier.

const REQUIREMENTS_SYSTEM = `Sie extrahieren aus einer kurzen Projektbeschreibung die technischen Anforderungen an einen Kraneinsatz. Ziel: die Liste der Anbieter nach Eignung sortieren.

Geben Sie zurück:
- capacity_kg: das Gewicht der schwersten Last in KILOGRAMM (1 t = 1000 kg). 0 wenn nicht erkennbar. Nehmen Sie das schwerste genannte Einzelgewicht, nicht die Summe.
- reach_m: die benötigte Auslage/Reichweite ODER Hubhöhe in METERN (die größere der beiden Distanzen, die der Kran überbrücken muss). 0 wenn nicht erkennbar. NICHT Länge/Maße der Last, NICHT Quadratmeter.
- needs_glass: true, wenn Glas/Scheiben/Fenster gehoben werden ODER ein Glassauger/Vakuumheber/Saugnapf erwähnt ist.
- needs_operator: true, wenn ein Bediener/Kranführer gewünscht ist ("mit Bediener", "mit Fahrer"). Sonst false.
- reasoning: ein kurzer deutscher Satz (max 20 Wörter), nur für Logs.

Regeln:
- Rechnen Sie Tonnen in kg um (z.B. "1,5 t" -> 1500).
- Bei Spannen das obere Ende nehmen (z.B. "500-700 kg" -> 700).
- Erfinden Sie keine Zahl; wenn kein Gewicht genannt ist, capacity_kg=0.
- Antworten Sie IMMER über das Tool record_requirements. Kein freier Text.`

const REQUIREMENTS_TOOL = {
  name: 'record_requirements',
  description: 'Records the structured lifting requirements extracted from a project description.',
  input_schema: {
    type: 'object' as const,
    properties: {
      capacity_kg: {
        type: 'number' as const,
        description: 'Heaviest single load in kilograms. 0 if no weight is stated.',
      },
      reach_m: {
        type: 'number' as const,
        description: 'Required horizontal reach OR lift height in metres (the larger distance the crane must span). 0 if not stated. NOT the load dimensions, NOT square metres.',
      },
      needs_glass: {
        type: 'boolean' as const,
        description: 'true if glass/pane/window lifting or a vacuum lifter (Glassauger) is implied.',
      },
      needs_operator: {
        type: 'boolean' as const,
        description: 'true if an operator/driver is wanted, false otherwise.',
      },
      reasoning: {
        type: 'string' as const,
        description: 'One short German sentence (max 20 words) for ops logs only.',
      },
    },
    required: ['capacity_kg', 'reach_m', 'needs_glass', 'needs_operator', 'reasoning'],
  },
}

export type RequirementsResult = {
  capacity_kg: number // 0 = not stated
  reach_m: number // 0 = not stated
  needs_glass: boolean
  needs_operator: boolean
  reasoning: string
}

export async function runRequirements(description: string): Promise<RequirementsResult> {
  const payload = {
    model: MODEL_SMART,
    max_tokens: 300,
    system: [
      { type: 'text', text: REQUIREMENTS_SYSTEM, cache_control: { type: 'ephemeral' } },
    ],
    tools: [REQUIREMENTS_TOOL],
    tool_choice: { type: 'tool', name: 'record_requirements' },
    messages: [{ role: 'user', content: `Projektbeschreibung:\n"""\n${description}\n"""` }],
  }

  const res = await callAnthropic(payload)
  const block = res.content?.find((b: { type: string }) => b.type === 'tool_use')
  if (!block) throw new Error('requirements: no tool_use in response')
  return block.input as RequirementsResult
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
