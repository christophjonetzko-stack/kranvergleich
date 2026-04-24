'use client'

import { LeadForm } from './lead-form'
import { trackPageEvent } from '@/lib/track'

/**
 * Thin client wrapper around <LeadForm /> used on /kran-mieten-preise for the
 * "ohne Kalkulator" fallback path. Exists solely to fire the
 * `inline_sammelanfrage_submit` Phase-B event — the page itself is a server
 * component, so the onSubmitted callback can't be passed directly from there.
 */
export function InlineSammelanfrageForm() {
  return <LeadForm onSubmitted={() => trackPageEvent('inline_sammelanfrage_submit')} />
}
