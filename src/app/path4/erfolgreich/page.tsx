import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Zahlung erhalten',
  robots: { index: false, follow: false },
}

// Stripe success redirect target (success_url in /api/path4-checkout). The
// payment is confirmed server-side by the webhook, not here, so this page only
// reassures the firm and sets the manual-verification expectation.
export default function Path4ErfolgreichPage() {
  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h1 className="text-2xl font-semibold text-gray-900 mb-3">Vielen Dank, Ihre Zahlung ist eingegangen</h1>
      <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
        Wir prüfen jetzt Impressum, Website und Telefonnummer Ihres Betriebs. Das dauert in der
        Regel ein bis zwei Werktage. Sobald die Prüfung abgeschlossen ist, schalten wir das
        Verifiziert-Siegel und die Hervorhebung frei und benachrichtigen Sie per E-Mail.
      </p>
      <Link href="/" className="text-blue-700 hover:underline text-[15px]">
        Zurück zur Startseite
      </Link>
    </div>
  )
}
