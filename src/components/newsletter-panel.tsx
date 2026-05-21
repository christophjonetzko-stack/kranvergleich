import { NewsletterSignup } from './newsletter-signup'

export function NewsletterPanel() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Aktuelle Kran-Preise &amp; Tipps per E-Mail
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
          Erhalten Sie monatlich aktuelle Marktpreise, Spar-Tipps und neue Anbieter in Ihrer Region, kostenlos und jederzeit abbestellbar.
        </p>
        <NewsletterSignup />
        <p className="text-[11px] text-gray-400 mt-3">
          Kein Spam. Max. 2 E-Mails/Monat. Abmeldung jederzeit möglich.
        </p>
      </div>
    </section>
  )
}
