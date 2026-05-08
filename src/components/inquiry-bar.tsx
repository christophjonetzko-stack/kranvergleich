'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { DescriptionCoach } from './description-coach'
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
  /** Pre-filled Projektbeschreibung — set when the user typed a description in
   *  the home SearchBox and was forwarded here via ?project=… query param.
   *  Used as `defaultValue` so the user can still edit it before submitting. */
  initialProjectDescription?: string
}

export function InquiryBar({
  selectedCompanies,
  onRemoveCompany,
  onClearSelection,
  craneTypeId,
  craneTypeName,
  cityName,
  initialProjectDescription,
}: InquiryBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dsgvoConsent, setDsgvoConsent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  // Controlled value for the Projektbeschreibung textarea — needed so the AI
  // coach can watch the value via prop without lifting the form's whole state.
  const [description, setDescription] = useState(initialProjectDescription ?? '')
  const prevCount = useRef(selectedCompanies.length)

  // Show toast when a company is added
  useEffect(() => {
    if (selectedCompanies.length > prevCount.current) {
      const newest = selectedCompanies[selectedCompanies.length - 1]
      setToast(newest.name)
      const timer = setTimeout(() => setToast(null), 2500)
      return () => clearTimeout(timer)
    }
    prevCount.current = selectedCompanies.length
  }, [selectedCompanies])

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

  const count = selectedCompanies.length

  return (
    <>
      {/* Toast notification — top of screen */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top fade-in duration-300">
          <div className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 text-sm font-medium">
            <span>&#10003;</span>
            <span>{toast} hinzugefugt</span>
            <span className="text-green-200 ml-1">({count} ausgewahlt)</span>
          </div>
        </div>
      )}

      {/* Sticky bar — floating card (bottom-right desktop, full-width drawer
          on mobile). Replaces the prior full-width banner-cookie look — see
          memory feedback_cta_color_convention (blue=transaction). Outer
          wrapper is pointer-events-none so the floating shell doesn't block
          clicks on content beneath; the card itself opts back in. */}
      {count > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 sm:left-auto sm:max-w-md sm:px-6 sm:pb-6 pointer-events-none animate-in slide-in-from-bottom fade-in duration-300">
          <div className="pointer-events-auto bg-blue-600 rounded-2xl shadow-2xl ring-1 ring-blue-700/30 px-4 py-3.5 sm:px-5 sm:py-4">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Count + label */}
              <div className="shrink-0 flex items-center gap-2.5 text-white">
                <span className="text-2xl sm:text-3xl font-bold leading-none tabular-nums">{count}</span>
                <span className="text-[13px] sm:text-sm font-medium leading-tight">
                  {count === 1 ? 'Anbieter' : 'Anbieter'}<br className="sm:hidden" /> ausgewählt
                </span>
              </div>
              {/* Primary CTA */}
              <button
                onClick={() => setIsOpen(true)}
                className="ml-auto shrink-0 px-4 py-2.5 sm:px-5 sm:py-3 bg-white hover:bg-gray-50 text-blue-700 text-sm font-semibold rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5"
              >
                Sammelanfrage senden
                <span aria-hidden>&rarr;</span>
              </button>
              {/* Clear (secondary) */}
              <button
                onClick={onClearSelection}
                className="shrink-0 -mr-1 p-1.5 text-blue-200 hover:text-white hover:bg-blue-700/40 rounded-md transition-colors"
                aria-label="Auswahl zurücksetzen"
                title="Auswahl zurücksetzen"
              >
                <span aria-hidden className="block leading-none text-lg font-medium">&times;</span>
              </button>
            </div>
          </div>
        </div>
      )}

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
                Schliessen
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
                {/* Honeypot — hidden from real users, filled by bots */}
                <input type="text" name="website_url" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none" />
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Was soll gehoben werden? Gewicht, Hohe, Zufahrt..."
                  />
                  <DescriptionCoach description={description} craneTypeName={craneTypeName} />
                </div>

                <label className="flex gap-2 cursor-pointer">
                  <Checkbox
                    id="ib-dsgvo"
                    checked={dsgvoConsent}
                    onCheckedChange={(checked) => setDsgvoConsent(checked === true)}
                    className="mt-0.5 shrink-0"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    Ich stimme der Verarbeitung meiner Daten gemäß der <a href="/datenschutz" className="underline hover:text-gray-700" target="_blank" onClick={(e) => e.stopPropagation()}>Datenschutzerklärung</a> zu. Meine Daten werden an die ausgewählten Anbieter weitergeleitet. *
                  </span>
                </label>

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
