import Stripe from 'stripe'

// Lazy singleton. A missing key throws at request time (clear, catchable) rather
// than at module load / build time — Path 4 Stripe envs land in Vercel only
// after Christoph's KYC clears. apiVersion is left unset so the SDK uses the
// version pinned to the installed release (stripe@22.x).
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (_stripe) return _stripe
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY not set')
  _stripe = new Stripe(key)
  return _stripe
}
