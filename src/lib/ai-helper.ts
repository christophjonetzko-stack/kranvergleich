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

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-haiku-4-5-20251001'

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
  const payload = {
    model: MODEL,
    max_tokens: 600,
    system: [
      { type: 'text', text: BERATER_SYSTEM, cache_control: { type: 'ephemeral' } },
    ],
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
