import type { Metadata } from 'next'
import Link from 'next/link'
import { SearchBox } from '@/components/search-box'
import { getCraneIcon } from '@/components/crane-icons'
import { PriceTable } from '@/components/price-table'
import { craneTypes } from '@/data/crane-types'
import { cranePrices } from '@/data/crane-prices'
import { seoCities } from '@/data/cities-static'
import { getSiteStats } from '@/lib/queries'
import { NewsletterSignup } from '@/components/newsletter-signup'

export const revalidate = 86400

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: {
    title: 'KranVergleich.de — Kranvermietung in Deutschland vergleichen',
    description:
      'Finden und vergleichen Sie Kranvermietungen in ganz Deutschland. Minikrane, Autokrane, Dachdeckerkrane — Preise, Bewertungen und kostenlose Angebote.',
    type: 'website',
    url: '/',
  },
}

function getPriceFrom(slug: string): number | null {
  return cranePrices.find((p) => p.craneTypeSlug === slug)?.dayFrom ?? null
}

export default async function HomePage() {
  const { anbieterCount, staedteCount, avgRating, totalReviews } = await getSiteStats()
  const topCities = seoCities.slice(0, 12)

  return (
    <div>
      {/* Hero */}
      <section className="bg-white py-12 lg:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl lg:text-4xl font-semibold text-gray-900 mb-3">
            Kran mieten in Deutschland
          </h1>
          <p className="text-base text-gray-500 mb-6">
            {anbieterCount}+ Anbieter vergleichen. Preise sehen. Kostenlos Angebote anfragen.
          </p>
          <SearchBox />
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/kostenrechner"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-medium rounded-lg transition-colors"
            >
              Kostenloses Angebot anfragen →
            </Link>
            <span className="text-[13px] text-gray-400">Unverbindlich & in 2 Minuten</span>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xl font-semibold text-gray-900">{anbieterCount}+</p>
              <p className="text-xs text-gray-500">Anbieter deutschlandweit</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{staedteCount}+</p>
              <p className="text-xs text-gray-500">Städte abgedeckt</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-amber-600">
                {avgRating} <span className="text-amber-500">&#9733;</span>
              </p>
              <p className="text-xs text-gray-500">Ø Google-Bewertung</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">{totalReviews.toLocaleString('de-DE')}+</p>
              <p className="text-xs text-gray-500">Google-Rezensionen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Crane types grid — 2 columns */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-3 sm:grid-cols-2">
          {craneTypes.map((ct) => {
            const priceFrom = getPriceFrom(ct.slug)
            const Icon = getCraneIcon(ct.slug)
            return (
              <Link
                key={ct.slug}
                href={`/${ct.slug}`}
                className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors overflow-hidden"
              >
                <div className="w-16 h-16 rounded-md shrink-0 flex items-center justify-center text-gray-600">
                  <Icon className="w-14 h-14" />
                </div>
                <div className="min-w-0 flex flex-col justify-center">
                  <p className="font-medium text-[15px] text-gray-900">{ct.name}</p>
                  <p className="text-[13px] text-gray-500 truncate">{ct.desc}</p>
                  {priceFrom && (
                    <span className="text-[12px] font-medium text-blue-700 mt-1">
                      ab {priceFrom.toLocaleString('de-DE')}€/Tag
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Top Städte — pills. Rotate crane-type slug across cities so internal links distribute across type pages */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Kran mieten in Ihrer Stadt</h2>
        <div className="flex flex-wrap gap-2">
          {topCities.map((city, i) => {
            // Rotate across the 4 highest-impression crane types per GSC data
            const typeSlugs = ['autokran-mieten', 'baukran-mieten', 'minikran-mieten', 'mobilkran-mieten']
            const typeSlug = typeSlugs[i % typeSlugs.length]
            return (
              <Link
                key={city.slug}
                href={`/${typeSlug}/${city.slug}`}
                className="inline-flex items-center gap-1.5 text-[13px] bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full px-3.5 py-1.5 transition-colors"
              >
                {city.name}
                <span className="text-[11px] text-gray-400">{city.companyCount}</span>
              </Link>
            )
          })}
          <Link
            href="/kranverleih"
            className="inline-flex items-center text-[13px] text-blue-600 hover:text-blue-700 px-2 py-1.5 transition-colors"
          >
            Alle Städte &rarr;
          </Link>
        </div>
      </section>

      {/* Price table */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Was kostet ein Kran? Preisübersicht 2026
          </h2>
          <PriceTable showAll />
        </div>
      </section>

      {/* Kostenfaktoren + Zusatzkosten */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Was beeinflusst die Kranmiete?</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-[13px]">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Krantyp &amp; Tragkraft</p>
            <p className="text-gray-500">Minikran ab 250€/Tag, Autokran ab 500€/Tag, Raupenkran ab 800€/Tag</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Mietdauer</p>
            <p className="text-gray-500">Längere Mietdauer = niedrigerer Tagespreis. Monatsmiete spart bis 40%</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Kranführer</p>
            <p className="text-gray-500">Bei Autokran &amp; Mobilkran inkl. (Pflicht). Bei Minikran separat buchbar (40-60€/h)</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1">Transport &amp; Montage</p>
            <p className="text-gray-500">Anlieferung 150-500€. Baukran-Montage 3.000-8.000€ extra</p>
          </div>
        </div>
        <p className="text-[12px] text-gray-400 mt-3">
          Alle Preise netto zzgl. MwSt. Richtwerte — verbindliche Angebote erhalten Sie direkt von den Anbietern.{' '}
          <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">Ausführliche Preisliste &rarr;</Link>
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Häufige Fragen zur Kranvermietung</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Was kostet es, einen Kran zu mieten?',
                a: 'Die Kosten hängen vom Krantyp, der Mietdauer und dem Einsatzort ab. Ein Minikran kostet ab ca.\u00A0250\u00A0€/Tag, ein Autokran ab ca.\u00A0500\u00A0€/Tag und ein Raupenkran ab ca.\u00A0800\u00A0€/Tag (netto). Bei längerer Mietdauer sinkt der Tagespreis — Wochenmiete spart rund 20\u00A0%, Monatsmiete bis zu 40\u00A0%. Dazu kommen ggf. Transport, Kranführer und Montagekosten.',
              },
              {
                q: 'Welchen Kran brauche ich für mein Projekt?',
                a: 'Das richtet sich nach Tragkraft, Hubhöhe und Einsatzort. Für Arbeiten in Innenräumen oder engen Zufahrten eignet sich ein Minikran (bis ca.\u00A05\u00A0t). Für Baustellen und Montagen im Freien ist ein Autokran (bis 500\u00A0t) die häufigste Wahl. Dachdeckerarbeiten erfordern einen speziellen Dachdeckerkran, und für Schwerlastprojekte kommen Raupenkrane zum Einsatz. Nutzen Sie unseren Kostenrechner oder fragen Sie direkt bei Anbietern an.',
              },
              {
                q: 'Brauche ich einen Kranführer?',
                a: 'Bei Autokranen und Mobilkranen ist ein ausgebildeter Kranführer gesetzlich vorgeschrieben — er ist bei diesen Typen in der Regel im Mietpreis enthalten. Minikrane und Dachdeckerkrane dürfen nach einer Einweisung oft selbst bedient werden. Fragen Sie beim Anbieter nach, ob ein Bediener inklusive ist oder separat gebucht werden muss.',
              },
              {
                q: 'Wie weit im Voraus muss ich einen Kran reservieren?',
                a: 'Für Standardprojekte empfehlen wir eine Vorlaufzeit von 1–2\u00A0Wochen. In der Hochsaison (Frühjahr bis Herbst) und bei speziellen Krantypen wie Raupenkranen kann es deutlich länger dauern. Kurzfristige Buchungen sind bei vielen Anbietern möglich, jedoch mit Aufpreis. Je früher Sie anfragen, desto besser die Verfügbarkeit und der Preis.',
              },
              {
                q: 'Wie finde ich den besten Kranvermieter in meiner Nähe?',
                a: 'Auf KranVergleich.de können Sie über {anbieterCount} Kranvermieter in ganz Deutschland nach Stadt, Krantyp und Bewertung filtern. Vergleichen Sie Preise, lesen Sie Google-Bewertungen und fordern Sie kostenlos und unverbindlich Angebote bei mehreren Anbietern an — so finden Sie den besten Preis für Ihr Projekt.',
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-[14px] font-medium text-gray-900 select-none">
                  {faq.q}
                  <svg className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <p className="px-5 pb-4 text-[14px] text-gray-600 leading-relaxed">
                  {faq.a.replace('{anbieterCount}', String(anbieterCount))}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter holding pattern */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Aktuelle Kran-Preise & Tipps per E-Mail
          </h2>
          <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
            Erhalten Sie monatlich aktuelle Marktpreise, Spar-Tipps und neue Anbieter in Ihrer Region — kostenlos und jederzeit abbestellbar.
          </p>
          <NewsletterSignup />
          <p className="text-[11px] text-gray-400 mt-3">
            Kein Spam. Max. 2 E-Mails/Monat. Abmeldung jederzeit möglich.
          </p>
        </div>
      </section>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Was kostet es, einen Kran zu mieten?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Die Kosten hängen vom Krantyp, der Mietdauer und dem Einsatzort ab. Ein Minikran kostet ab ca. 250 €/Tag, ein Autokran ab ca. 500 €/Tag und ein Raupenkran ab ca. 800 €/Tag (netto). Bei längerer Mietdauer sinkt der Tagespreis — Wochenmiete spart rund 20 %, Monatsmiete bis zu 40 %. Dazu kommen ggf. Transport, Kranführer und Montagekosten.',
                },
              },
              {
                '@type': 'Question',
                name: 'Welchen Kran brauche ich für mein Projekt?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Das richtet sich nach Tragkraft, Hubhöhe und Einsatzort. Für Arbeiten in Innenräumen oder engen Zufahrten eignet sich ein Minikran (bis ca. 5 t). Für Baustellen und Montagen im Freien ist ein Autokran (bis 500 t) die häufigste Wahl. Dachdeckerarbeiten erfordern einen speziellen Dachdeckerkran, und für Schwerlastprojekte kommen Raupenkrane zum Einsatz.',
                },
              },
              {
                '@type': 'Question',
                name: 'Brauche ich einen Kranführer?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Bei Autokranen und Mobilkranen ist ein ausgebildeter Kranführer gesetzlich vorgeschrieben — er ist bei diesen Typen in der Regel im Mietpreis enthalten. Minikrane und Dachdeckerkrane dürfen nach einer Einweisung oft selbst bedient werden.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wie weit im Voraus muss ich einen Kran reservieren?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Für Standardprojekte empfehlen wir eine Vorlaufzeit von 1–2 Wochen. In der Hochsaison (Frühjahr bis Herbst) und bei speziellen Krantypen kann es deutlich länger dauern. Je früher Sie anfragen, desto besser die Verfügbarkeit und der Preis.',
                },
              },
              {
                '@type': 'Question',
                name: 'Wie finde ich den besten Kranvermieter in meiner Nähe?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Auf KranVergleich.de können Sie über 800 Kranvermieter in ganz Deutschland nach Stadt, Krantyp und Bewertung filtern. Vergleichen Sie Preise, lesen Sie Google-Bewertungen und fordern Sie kostenlos und unverbindlich Angebote bei mehreren Anbietern an.',
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'KranVergleich.de',
            url: 'https://kranvergleich.de',
            description: 'Vergleichsportal für Kranvermietung in Deutschland',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'KranVergleich.de',
            url: 'https://kranvergleich.de',
            description: 'Vergleichsportal für Kranvermietung in Deutschland. Über 740 Anbieter für Minikrane, Autokrane und mehr.',
            contactPoint: {
              '@type': 'ContactPoint',
              email: 'kontakt@kranvergleich.de',
              contactType: 'customer service',
              availableLanguage: 'German',
            },
          }),
        }}
      />
    </div>
  )
}
