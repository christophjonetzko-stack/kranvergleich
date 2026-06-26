'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CompanyWithCranes } from '@/lib/types'
import { getSessionEntryPath } from './session-entry-recorder'
import { getStoredUtm } from '@/lib/utm'
import { trackPageEvent } from '@/lib/track'
import { craneTypes, getCraneTypeIdBySlug } from '@/data/crane-types'
import { CITY_OR_PLZ_PLACEHOLDER } from '@/lib/country'

// Crane-type options for the in-form picker, largest-reach first so the tiny
// Minikran (smallest) isn't the top option a hurried user picks by reflex —
// that mis-tagged the 650 t Stejskal lead as Minikran (2026-06-04). Display
// order only; the canonical `craneTypes` order (nav, footer, sitemap) is left
// untouched, so this has no effect on navigation or SEO.
const CRANE_TYPE_OPTIONS = [...craneTypes].sort(
  (a, b) => (b.maxReachM ?? 0) - (a.maxReachM ?? 0),
)

interface LeadFormProps {
  craneTypeId?: string
  craneTypeName?: string
  cityName?: string
  companies?: CompanyWithCranes[]
  selectedCompanyIds?: string[]
  // Optional callback fired after a successful /api/leads submission. Used on
  // /kran-mieten-preise to track `inline_sammelanfrage_submit` for Phase B
  // analytics; other callers (anbieter profile pages) simply don't pass it.
  onSubmitted?: () => void
}

export function LeadForm({
  craneTypeId,
  craneTypeName,
  cityName,
  companies = [],
  selectedCompanyIds: initialSelected = [],
  onSubmitted,
}: LeadFormProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(initialSelected)
  const [dsgvoConsent, setDsgvoConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Opt-in (default OFF) to broaden a deliberate single-firm pick on a profile
  // page to nearby suitable firms — multi-firm inquiries convert ~2x better
  // (fanout audit 2026-06-25). The broadening is resolved server-side, anchored
  // at the chosen firm's city (DSGVO: explicit opt-in, §4 + scoped consent,
  // memory feedback_lead_reroute_dsgvo_optin).
  const [includeNearby, setIncludeNearby] = useState(false)
  // When the page that mounts LeadForm already knows the crane type (listing
  // pages with type in the URL, /anbieter/[slug] profile pages, etc.), the
  // craneTypeId prop is set and the user doesn't see a type field. When the
  // form is mounted in a generic context (the /kran-mieten-preise backup
  // "ohne Kalkulator" path that produced the 2026-05-20 Kohlhaas LEAD OHNE
  // ANBIETER alert), the user has to pick a type before the submission can
  // route to firms. craneTypeSlugFromForm holds that pick; submit validates
  // that one side has a value.
  const [craneTypeSlugFromForm, setCraneTypeSlugFromForm] = useState('')

  // Type is REQUIRED only when no firm is pre-selected: the inline "an alle"
  // path (/kran-mieten-preise) needs it to auto_select_nearest by type +
  // location. When a firm is already chosen (e.g. /anbieter/[slug] profile),
  // routing is fixed and the type is optional metadata — left blank, /api/leads
  // AI-categorizes it from the description (a forced manual pick mis-tagged the
  // 650 t Stejskal lead as Minikran, 2026-06-04).
  const craneTypeRequired = selectedCompanies.length === 0

  // Show the "also contact nearby firms" opt-in only for a deliberate single-
  // firm pick: the /anbieter profile mounts LeadForm with exactly one firm
  // pre-selected. Hidden on the inline auto-select path (no pre-selection) and
  // once the user has chosen more than one firm (broadening is then moot).
  const showBroaden = initialSelected.length === 1 && selectedCompanies.length === 1

  // View denominator for the LeadForm conversion rate (2026-06-20 audit). Fires
  // once per mount. `preselected` splits the profile/listing path (a firm was
  // pre-chosen) from the inline auto-select path. Bot UA is filtered server-side
  // in /api/beacon.
  useEffect(() => {
    trackPageEvent('leadform_view', {
      crane_type: craneTypeName ?? craneTypeId ?? 'unknown',
      preselected: initialSelected.length > 0,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleCompany = (companyId: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    // Resolve the effective crane type, from prop (page context) or from
    // the in-form select. One side MUST have a value, otherwise the lead
    // lands as crane_type_id=NULL and triggers 🚨 LEAD OHNE ANBIETER on
    // the owner side. Validates here even though the <select> below carries
    // the `required` attribute, because some browsers / autofill flows can
    // bypass the native validation.
    const resolvedCraneTypeId = craneTypeId
      ?? (craneTypeSlugFromForm ? getCraneTypeIdBySlug(craneTypeSlugFromForm) : null)
    if (!resolvedCraneTypeId && craneTypeRequired) {
      setError('Bitte wählen Sie einen Krantyp aus.')
      return
    }

    if (!dsgvoConsent) {
      setError('Bitte stimmen Sie der Datenschutzerklärung zu.')
      return
    }

    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    const utm = getStoredUtm()
    // When the form lands with no user-selected firms (inline path on
    // /kran-mieten-preise + /kran-mieten-in-der-naehe), opt into the
    // /api/leads auto_select_nearest branch so the backend resolves PLZ/city
    // to coords and picks the nearest matching firms. Without this every
    // inline submission landed as 🚨 LEAD OHNE ANBIETER (Vivienne / Irina
    // silent-fails 2026-05-24..26). The cost-calculator path already opts in.
    const cityInput = cityName || (formData.get('city') as string | null) || ''
    const noFirmsPreSelected = selectedCompanies.length === 0
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crane_type_id: resolvedCraneTypeId,
          city: cityInput,
          customer_name: formData.get('name'),
          customer_phone: formData.get('phone'),
          customer_email: formData.get('email'),
          project_description: formData.get('description'),
          preferred_date: formData.get('date') || null,
          duration_days: formData.get('duration') ? Number(formData.get('duration')) : null,
          dsgvo_consent: dsgvoConsent,
          company_ids: selectedCompanies,
          auto_select_nearest: noFirmsPreSelected,
          // Profile single-pick broaden opt-in. Resolved server-side, anchored
          // at the chosen firm's city; the backend additionally gates it on the
          // /anbieter entry path so it never fires outside a deliberate pick.
          include_nearby: showBroaden && includeNearby,
          location: noFirmsPreSelected ? cityInput : undefined,
          website_url: formData.get('website_url') || '',
          entry_path: getSessionEntryPath(),
          utm_source: utm.utm_source,
          utm_medium: utm.utm_medium,
          utm_campaign: utm.utm_campaign,
          utm_content: utm.utm_content,
        }),
      })

      if (!response.ok) {
        // Surface the server-side message (e.g. unresolved/foreign PLZ guard,
        // 422 code 'location_unresolved') so the user can correct a typo or
        // learn we only cover DE+AT, instead of a generic failure notice.
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
      }
      // Universal submit signal for EVERY LeadForm success (profile + inline),
      // independent of whether the parent passes onSubmitted. Numerator for the
      // leadform_view -> leadform_submit conversion rate.
      trackPageEvent('leadform_submit', {
        crane_type: craneTypeName ?? resolvedCraneTypeId ?? 'unknown',
        selected_count: selectedCompanies.length,
      })
      setIsSubmitted(true)
      onSubmitted?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Anfrage erfolgreich gesendet!
          </h3>
          <p className="text-green-700">
            {showBroaden && includeNearby
              ? 'Ihre Anfrage wurde an den gewählten Anbieter und weitere passende Betriebe in Ihrer Nähe weitergeleitet.'
              : selectedCompanies.length > 0
              ? `Ihre Anfrage wurde an ${selectedCompanies.length} Anbieter weitergeleitet.`
              : 'Wir melden uns in Kürze bei Ihnen.'}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Kostenlos Angebot anfragen
          {craneTypeName && `, ${craneTypeName}`}
          {cityName && ` in ${cityName}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {companies.length > 0 && (
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">
              Anbieter auswählen (optional. Anfrage an mehrere Firmen):
            </Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {companies.map((company) => (
                <label
                  key={company.id}
                  className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors ${
                    selectedCompanies.includes(company.id)
                      ? 'border-amber-500 bg-amber-50'
                      : 'hover:bg-muted/50'
                  }`}
                >
                  <Checkbox
                    checked={selectedCompanies.includes(company.id)}
                    onCheckedChange={() => toggleCompany(company.id)}
                  />
                  <div className="min-w-0">
                    <span className="text-sm font-medium block truncate">{company.name}</span>
                    {company.google_rating && (
                      <span className="text-xs text-muted-foreground">
                        &#9733; {company.google_rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot, hidden from real users, filled by bots */}
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" />
          {/* Crane-type selector, only rendered when the page didn't pre-fill
              the craneTypeId prop. Two callers leave it unset:
              - /kran-mieten-preise inline "ohne Kalkulator": NO firm pre-
                selected, so the type is REQUIRED — it drives auto_select_nearest
                (a NULL type there = the Kohlhaas LEAD-OHNE-ANBIETER, 2026-05-20).
              - /anbieter/[slug] profile: the firm IS pre-selected, so routing
                doesn't need the type. There it's OPTIONAL; left blank, /api/leads
                AI-categorizes the type from the description (a forced manual pick
                mis-tagged the 650 t Stejskal lead as Minikran, 2026-06-04).
              craneTypeRequired keys off that distinction. Native <select> is
              enough for 8 options. */}
          {!craneTypeId && (
            <div>
              <Label htmlFor="lf-crane-type">
                Welcher Krantyp?{craneTypeRequired ? ' *' : ' (optional)'}
              </Label>
              <select
                id="lf-crane-type"
                value={craneTypeSlugFromForm}
                onChange={(e) => setCraneTypeSlugFromForm(e.target.value)}
                required={craneTypeRequired}
                className="w-full text-[14px] border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-blue-400"
              >
                <option value="">Bitte wählen…</option>
                {CRANE_TYPE_OPTIONS.map((ct) => (
                  <option key={ct.slug} value={ct.slug}>{ct.name}</option>
                ))}
              </select>
              <p className="mt-1 text-[11px] text-gray-500">
                {craneTypeRequired
                  ? 'Nicht sicher? Fragen Sie unseren Kran-Berater (Chat unten rechts), wir finden in 60 Sek. den passenden Krantyp.'
                  : 'Unsicher? Lassen Sie das Feld leer – wir ordnen den passenden Typ anhand Ihrer Projektbeschreibung zu.'}
              </p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" required placeholder="Max Mustermann" />
            </div>
            <div>
              <Label htmlFor="email">E-Mail *</Label>
              <Input id="email" name="email" type="email" required placeholder="max@beispiel.de" />
            </div>
            <div>
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+49 170 1234567" />
            </div>
            {!cityName && (
              <div>
                <Label htmlFor="city">Stadt / PLZ *</Label>
                <Input id="city" name="city" required placeholder={CITY_OR_PLZ_PLACEHOLDER} />
              </div>
            )}
            <div>
              <Label htmlFor="date">Wunschtermin</Label>
              <Input id="date" name="date" type="date" />
            </div>
            <div>
              <Label htmlFor="duration">Mietdauer (Tage)</Label>
              <Input id="duration" name="duration" type="number" min="1" placeholder="z.B. 3" />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Projektbeschreibung</Label>
            <Textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Was soll gehoben werden? Gewicht, Höhe, Zufahrt…"
            />
          </div>

          {showBroaden && (
            <label className="flex gap-2 cursor-pointer">
              <Checkbox
                id="include-nearby"
                checked={includeNearby}
                onCheckedChange={(checked) => setIncludeNearby(checked === true)}
                className="mt-0.5 shrink-0"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                Meine Anfrage zusätzlich an weitere passende Anbieter in der Nähe senden. So erhalte ich schneller mehrere Angebote zum Vergleich.
              </span>
            </label>
          )}

          <label className="flex gap-2 cursor-pointer">
            <Checkbox
              id="dsgvo"
              checked={dsgvoConsent}
              onCheckedChange={(checked) => setDsgvoConsent(checked === true)}
              className="mt-0.5 shrink-0"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" className="underline hover:text-foreground" target="_blank" onClick={(e) => e.stopPropagation()}>Datenschutzerklärung</a> zu. Meine Daten werden zur Bearbeitung meiner Anfrage an die ausgewählten Anbieter weitergeleitet, oder, falls ich keine Auswahl treffe, an passende Kranbetriebe in meiner Nähe. *
            </span>
          </label>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting || !dsgvoConsent}>
            {isSubmitting ? 'Wird gesendet…' : 'Kostenlos Angebot anfragen'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Kostenlos & unverbindlich. Keine versteckten Kosten.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
