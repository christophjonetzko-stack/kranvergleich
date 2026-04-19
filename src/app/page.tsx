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

// Dynamic metadata — pulls live anbieterCount into the title/description so
// the SERP snippet carries a concrete trust number. Home was sitting at pos 32
// with CTR 0.09% (vs. ~0.5% expected at that position) because the default
// title "KranVergleich.de — …" led with the unknown brand instead of the
// keyword phrase "Kran mieten".
export async function generateMetadata(): Promise<Metadata> {
  const { anbieterCount } = await getSiteStats()
  const count = anbieterCount.toLocaleString('de-DE')
  // Use absolute title to bypass the layout's "%s | KranVergleich.de" template
  // — Google only shows ~60 chars of the title, so we bake the brand into the
  // string ourselves and keep the keyword phrase up front.
  const title = `Kran mieten 2026 — ${count} Anbieter ab 150€/Tag | KranVergleich.de`
  const description = `Kranvermietung in Deutschland vergleichen: ${count} geprüfte Anbieter, 8 Krantypen ab 150€/Tag. Kostenlos 3 Angebote in 2 Minuten.`
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: '/' },
    openGraph: {
      title,
      description,
      type: 'website',
      url: '/',
    },
  }
}

function getPriceFrom(slug: string): number | null {
  return cranePrices.find((p) => p.craneTypeSlug === slug)?.dayFrom ?? null
}

export default async function HomePage() {
  const { anbieterCount, staedteCount, avgRating, totalReviews } = await getSiteStats()
  const topCities = seoCities.slice(0, 12)

  return (
    <div>
      {/* Hero — Industrial · Search-first */}
      <section className="relative bg-white">
        {/* Top safety stripe */}
        <div className="h-1 bg-[#FFD100]" aria-hidden />

        {/* Engineering-grid background — desktop only, very subtle */}
        <div
          aria-hidden
          className="absolute inset-0 top-1 pointer-events-none hidden lg:block opacity-[0.04] [background-image:linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:56px_56px]"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14">
          {/* Eyebrow — spec-sheet label */}
          <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-600 mb-5 sm:mb-6 font-[var(--font-mono)]">
            <span className="w-6 h-px bg-neutral-900" aria-hidden />
            <span>Kranvermietung · Deutschland · {anbieterCount.toLocaleString('de-DE')} Anbieter</span>
          </div>

          {/* H1 — Archivo Narrow 800, compressed, left-aligned */}
          <h1 className="font-[var(--font-display)] font-extrabold text-neutral-950 leading-[0.95] tracking-[-0.02em] text-[40px] sm:text-[56px] lg:text-[64px] max-w-4xl">
            Kran mieten — in 2 Minuten deutschlandweit vergleichen.
          </h1>

          {/* Subline — entity-rich for SEO, benefit-focused for humans */}
          <p className="mt-5 sm:mt-6 text-[16px] sm:text-[18px] leading-[1.55] text-neutral-600 max-w-3xl">
            <strong className="font-semibold text-neutral-900">
              {anbieterCount.toLocaleString('de-DE')}+ geprüfte Kranvermieter
            </strong>{' '}
            in Deutschland. Minikran, Autokran, Mobilkran, Raupenkran und weitere Typen — mit
            transparenten Tagespreisen und kostenlosen, unverbindlichen Angeboten.
          </p>

          {/* SearchBox — LCP, above the fold on all viewports */}
          <div className="mt-7 sm:mt-9">
            <SearchBox />
          </div>

          {/* Trust bar — inline list with hairline separators */}
          <ul className="mt-5 sm:mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-neutral-600">
            <li className="inline-flex items-center gap-1.5">
              <span className="text-[#FFD100] text-[15px] leading-none" aria-hidden>★</span>
              <span className="font-[var(--font-mono)] tabular-nums text-neutral-900 font-semibold">
                {avgRating.toString().replace('.', ',')}
              </span>
              <span>Google</span>
              <span className="font-[var(--font-mono)] text-neutral-400">
                ({totalReviews.toLocaleString('de-DE')})
              </span>
            </li>
            <li aria-hidden className="w-px h-3 bg-neutral-300" />
            <li>{anbieterCount.toLocaleString('de-DE')}+ Anbieter</li>
            <li aria-hidden className="w-px h-3 bg-neutral-300" />
            <li>{staedteCount} Städte</li>
            <li aria-hidden className="w-px h-3 bg-neutral-300" />
            <li>DSGVO-konform</li>
            <li aria-hidden className="w-px h-3 bg-neutral-300" />
            <li>Kostenlos &amp; unverbindlich</li>
          </ul>

          {/* Ruler-tick divider — surveyor detail */}
          <div className="relative mt-11 sm:mt-14 mb-6 sm:mb-8" aria-hidden>
            <div className="h-px bg-neutral-900" />
            <div className="absolute top-0 inset-x-0 flex justify-between">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-px ${i === 0 || i === 8 ? 'h-2' : 'h-1.5'} bg-neutral-900`}
                />
              ))}
            </div>
          </div>

          {/* Section label + Kostenrechner CTA */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h2 className="text-[11px] uppercase tracking-[0.18em] font-semibold text-neutral-500 font-[var(--font-mono)]">
              Direkt nach Krantyp
            </h2>
            <Link
              href="/kostenrechner"
              className="group text-[12px] font-semibold text-neutral-900 inline-flex items-center gap-1.5 border-b-2 border-[#FFD100] pb-0.5 hover:border-neutral-900 transition-colors"
            >
              Kostenrechner öffnen
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
            </Link>
          </div>

          {/* Crane-type grid — all 8 types, internal SEO links, tabular price */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {craneTypes.map((ct) => {
              const priceFrom = getPriceFrom(ct.slug)
              const Icon = getCraneIcon(ct.slug)
              return (
                <Link
                  key={ct.slug}
                  href={`/${ct.slug}`}
                  className="group relative flex items-center justify-between gap-3 p-4 bg-white border border-neutral-200 hover:border-neutral-900 transition-colors min-h-[124px]"
                >
                  {/* Left yellow edge — slides in on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-0 group-hover:w-1 bg-[#FFD100] transition-all"
                  />

                  {/* Text column — name + price + hover arrow */}
                  <div className="flex flex-col min-w-0">
                    <p className="font-semibold text-[14px] sm:text-[15px] text-neutral-900 leading-tight">
                      {ct.name}
                    </p>
                    {priceFrom && (
                      <p className="mt-1 text-[12px] text-neutral-500 font-[var(--font-mono)] tabular-nums">
                        ab{' '}
                        <span className="text-neutral-900 font-semibold">
                          {priceFrom.toLocaleString('de-DE')} €
                        </span>
                        /Tag
                      </p>
                    )}
                    <span
                      aria-hidden
                      className="mt-2 text-neutral-300 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all text-base"
                    >
                      →
                    </span>
                  </div>

                  {/* Icon — right side, filling vertical space */}
                  <Icon className="w-16 h-16 md:w-20 md:h-20 text-neutral-800 shrink-0" />
                </Link>
              )
            })}
          </div>
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
