'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CompanyWithCranes } from '@/lib/types'

interface LeadFormProps {
  craneTypeId?: string
  craneTypeName?: string
  cityName?: string
  companies?: CompanyWithCranes[]
  selectedCompanyIds?: string[]
}

export function LeadForm({
  craneTypeId,
  craneTypeName,
  cityName,
  companies = [],
  selectedCompanyIds: initialSelected = [],
}: LeadFormProps) {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(initialSelected)
  const [dsgvoConsent, setDsgvoConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

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

    if (!dsgvoConsent) {
      setError('Bitte stimmen Sie der Datenschutzerklärung zu.')
      return
    }

    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crane_type_id: craneTypeId,
          city: cityName || formData.get('city'),
          customer_name: formData.get('name'),
          customer_phone: formData.get('phone'),
          customer_email: formData.get('email'),
          project_description: formData.get('description'),
          preferred_date: formData.get('date') || null,
          duration_days: formData.get('duration') ? Number(formData.get('duration')) : null,
          dsgvo_consent: dsgvoConsent,
          company_ids: selectedCompanies,
          website_url: formData.get('website_url') || '',
        }),
      })

      if (!response.ok) throw new Error('Fehler beim Senden')
      setIsSubmitted(true)
    } catch {
      setError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
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
            {selectedCompanies.length > 0
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
          {craneTypeName && ` — ${craneTypeName}`}
          {cityName && ` in ${cityName}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {companies.length > 0 && (
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">
              Anbieter auswählen (optional — Anfrage an mehrere Firmen):
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
          {/* Honeypot — hidden from real users, filled by bots */}
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" />
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
                <Input id="city" name="city" required placeholder="z.B. Berlin, 10115" />
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

          <div className="flex items-start gap-2">
            <Checkbox
              id="dsgvo"
              checked={dsgvoConsent}
              onCheckedChange={(checked) => setDsgvoConsent(checked === true)}
            />
            <Label htmlFor="dsgvo" className="text-xs text-muted-foreground leading-relaxed">
              Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
              <a href="/datenschutz" className="underline hover:text-foreground" target="_blank">
                Datenschutzerklärung
              </a>{' '}
              zu. Meine Daten werden zur Bearbeitung meiner Anfrage an die ausgewählten Anbieter
              weitergeleitet. *
            </Label>
          </div>

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
