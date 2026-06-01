import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Vorgang abgebrochen',
  robots: { index: false, follow: false },
}

// Stripe cancel redirect target (cancel_url in /api/path4-checkout). No charge
// was made; the firm can return to the offer at any time.
export default function Path4AbgebrochenPage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-3">Vorgang abgebrochen</h1>
      <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
        Es wurde nichts berechnet. Sie können das Premium-Listing jederzeit erneut buchen.
      </p>
      <Link href="/path4" className="text-blue-700 hover:underline text-[15px]">
        Zurück zum Premium-Listing
      </Link>
    </div>
  )
}
