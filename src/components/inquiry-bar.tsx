'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { CompanyWithCranes } from '@/lib/types'

interface InquiryBarProps {
  selectedCompanies: CompanyWithCranes[]
  onRemoveCompany: (id: string) => void
  onClearSelection: () => void
  craneTypeId?: string
  craneTypeName?: string
  cityName?: string
}

export function InquiryBar({
  selectedCompanies,
  onRemoveCompany,
  onClearSelection,
  craneTypeId,
  craneTypeName,
  cityName,
}: InquiryBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dsgvoConsent, setDsgvoConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (selectedCompanies.length === 0) return null

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
          company_ids: selectedCompanies.map((c) => c.id),
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

  const count = selectedCompanies.length

  return (
    <>
      {/* Sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-blue-200 bg-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {count} {count === 1 ? 'Anbieter' : 'Anbieter'} ausgewählt
            </p>
            <p className="text-xs text-gray-500 truncate">
              {selectedCompanies.map((c) => c.name).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClearSelection}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              Zurücksetzen
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Sammelanfrage senden
            </button>
          </div>
        </div>
      </div>

      {/* Modal with form */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Kostenlos Angebot anfragen
              {craneTypeName && ` — ${craneTypeName}`}
              {cityName && ` in ${cityName}`}
            </DialogTitle>
          </DialogHeader>

          {isSubmitted ? (
            <div className="py-6 text-center">
              <p className="text-lg font-semibold text-green-800 mb-2">
                Anfrage erfolgreich gesendet!
              </p>
              <p className="text-sm text-green-700">
                Ihre Anfrage wurde an {count} {count === 1 ? 'Anbieter' : 'Anbieter'} weitergeleitet.
              </p>
              <Button
                className="mt-4"
                variant="outline"
                onClick={() => {
                  setIsOpen(false)
                  setIsSubmitted(false)
                  onClearSelection()
                }}
              >
                Schließen
              </Button>
            </div>
          ) : (
            <>
              {/* Selected companies */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Anfrage an:</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCompanies.map((c) => (
                    <span
                      key={c.id}
                      className="inline-flex items-center gap-1 text-[12px] bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {c.name}
                      <button
                        onClick={() => onRemoveCompany(c.id)}
                        className="text-gray-400 hover:text-gray-600 ml-0.5"
                        aria-label={`${c.name} entfernen`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="ib-name">Name *</Label>
                    <Input id="ib-name" name="name" required placeholder="Max Mustermann" />
                  </div>
                  <div>
                    <Label htmlFor="ib-email">E-Mail *</Label>
                    <Input id="ib-email" name="email" type="email" required placeholder="max@beispiel.de" />
                  </div>
                  <div>
                    <Label htmlFor="ib-phone">Telefon</Label>
                    <Input id="ib-phone" name="phone" type="tel" placeholder="+49 170 1234567" />
                  </div>
                  {!cityName && (
                    <div>
                      <Label htmlFor="ib-city">Stadt / PLZ *</Label>
                      <Input id="ib-city" name="city" required placeholder="z.B. Berlin, 10115" />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="ib-date">Wunschtermin</Label>
                    <Input id="ib-date" name="date" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="ib-duration">Mietdauer (Tage)</Label>
                    <Input id="ib-duration" name="duration" type="number" min="1" placeholder="z.B. 3" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ib-description">Projektbeschreibung</Label>
                  <Textarea
                    id="ib-description"
                    name="description"
                    rows={3}
                    placeholder="Was soll gehoben werden? Gewicht, Höhe, Zufahrt..."
                  />
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox
                    id="ib-dsgvo"
                    checked={dsgvoConsent}
                    onCheckedChange={(checked) => setDsgvoConsent(checked === true)}
                  />
                  <Label htmlFor="ib-dsgvo" className="text-xs text-gray-500 leading-relaxed">
                    Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                    <a href="/datenschutz" className="underline hover:text-gray-700" target="_blank">
                      Datenschutzerklärung
                    </a>{' '}
                    zu. Meine Daten werden an die ausgewählten Anbieter weitergeleitet. *
                  </Label>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" className="w-full" disabled={isSubmitting || !dsgvoConsent}>
                  {isSubmitting ? 'Wird gesendet...' : `Anfrage an ${count} Anbieter senden`}
                </Button>

                <p className="text-xs text-center text-gray-400">
                  Kostenlos & unverbindlich. Keine versteckten Kosten.
                </p>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
