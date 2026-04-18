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

// Tower crane SVG icon for hero
function TowerCraneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M12 58h40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 58V18M34 58V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 22l4-4M30 30l4-4M30 38l4-4M30 46l4-4M30 54l4-4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 18h48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 22h44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 18V22M54 18V22" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 22v6M22 22v4M26 22v3M38 22v3M44 22v4M50 22v6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 28h6M46 28h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 28v6M22 28v6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 34h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

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
      {/* Hero — Editorial / Broadsheet */}
      <section className="bg-[#fafaf7] text-neutral-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Top folio strip — newspaper masthead metadata */}
          <div className="flex items-center justify-between py-2.5 text-[10px] sm:text-[11px] font-[var(--font-editorial-mono)] uppercase tracking-[0.18em] text-neutral-500">
            <span className="flex items-center gap-2 sm:gap-3">
              <span className="text-[#c8200d] font-medium">№ 04 / 2026</span>
              <span aria-hidden className="text-neutral-300">·</span>
              <span className="hidden sm:inline">Frühjahrsausgabe</span>
              <span className="sm:hidden">Frühjahr</span>
            </span>
            <span className="flex items-center gap-2 sm:gap-3">
              <span className="hidden sm:inline">Kalenderwoche 16</span>
              <span aria-hidden className="text-neutral-300 hidden sm:inline">·</span>
              <span>17. April 2026</span>
            </span>
          </div>

          {/* Double rule — broadsheet signature */}
          <div className="border-t-[3px] border-double border-neutral-900 pt-1">
            <div className="border-t border-neutral-900" />
          </div>

          {/* Main editorial grid — 12 cols, 8/4 split on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-12 pt-8 sm:pt-12 lg:pt-16 pb-10 sm:pb-14">
            {/* LEFT — kicker, H1, lead, search */}
            <div className="lg:col-span-8 lg:pr-10 lg:border-r lg:border-neutral-300">
              {/* Kicker / Rubrik */}
              <div className="flex items-center gap-3 font-[var(--font-editorial-mono)] text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-neutral-700 mb-5 sm:mb-7">
                <span className="inline-block w-6 sm:w-10 h-px bg-neutral-900" aria-hidden />
                <span>Kranvermietung · Deutschland</span>
              </div>

              {/* H1 — display serif, italic accent on the verb */}
              <h1
                className="font-[var(--font-display)] font-light text-neutral-900 leading-[0.92] tracking-[-0.025em] text-[48px] sm:text-[72px] md:text-[88px] lg:text-[104px]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                Kran{' '}
                <em
                  className="italic font-normal text-[#c8200d]"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
                >
                  mieten
                </em>
                <br />
                in Deutschland.
              </h1>

              {/* Editorial byline strip */}
              <div className="mt-7 sm:mt-9 flex items-center gap-3 text-[11px] sm:text-[12px] font-[var(--font-editorial-mono)] uppercase tracking-[0.18em] text-neutral-500">
                <span>Von der Redaktion</span>
                <span aria-hidden className="text-neutral-300">·</span>
                <span>Lesezeit 2 Min.</span>
                <span aria-hidden className="text-neutral-300 hidden sm:inline">·</span>
                <span className="hidden sm:inline">Aktualisiert 17.04.2026</span>
              </div>

              {/* Lead paragraph with drop cap */}
              <p className="mt-5 sm:mt-6 text-[15px] sm:text-[17px] leading-[1.55] text-neutral-700 max-w-[58ch]">
                <span
                  className="float-left mr-3 mt-1 font-[var(--font-display)] font-normal text-[#c8200d] leading-[0.78] text-[64px] sm:text-[78px]"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
                  aria-hidden
                >
                  V
                </span>
                om 250-€-Minikran für die Innenhof-Montage bis zum 800-€-Raupenkran für den
                Industrie­einsatz: <strong className="font-semibold text-neutral-900">{anbieterCount}+ geprüfte
                Kranvermieter</strong> in Deutschland, transparente Tagespreise und unverbindliche
                Angebote — kostenfrei in zwei Minuten verglichen.
              </p>

              {/* Hairline before action area */}
              <div className="mt-9 sm:mt-11 mb-5 flex items-center gap-3">
                <span className="font-[var(--font-editorial-mono)] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                  Angebot anfragen
                </span>
                <span className="flex-1 h-px bg-neutral-300" aria-hidden />
                <span className="font-[var(--font-editorial-mono)] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-400">
                  Kostenfrei · 2 Min.
                </span>
              </div>

              {/* SearchBox — kept intact */}
              <SearchBox />

              {/* Secondary CTA */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <Link
                  href="/kostenrechner"
                  className="group inline-flex items-center gap-2 font-[var(--font-editorial-mono)] text-[12px] uppercase tracking-[0.18em] text-neutral-900 border-b border-neutral-900 pb-1 self-start hover:text-[#c8200d] hover:border-[#c8200d] transition-colors"
                >
                  Kostenrechner öffnen
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                <span className="text-[12px] text-neutral-400 italic font-[var(--font-display)]">
                  Vier Schritte. Sofortiger Richtpreis.
                </span>
              </div>
            </div>

            {/* RIGHT — In Zahlen sidebar (the "by the numbers" block) */}
            <aside className="lg:col-span-4 mt-12 lg:mt-0 lg:pl-2 relative">
              {/* Tower crane mark — decorative, top right corner */}
              <TowerCraneIcon className="hidden lg:block absolute -top-3 right-0 w-10 h-10 text-neutral-300" />

              <div className="font-[var(--font-editorial-mono)] text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-neutral-700 mb-5 sm:mb-7 flex items-center gap-3">
                <span className="inline-block w-6 sm:w-10 h-px bg-neutral-900" aria-hidden />
                <span>In Zahlen</span>
              </div>

              <dl className="grid grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-6 lg:gap-y-7">
                {[
                  {
                    figure: `${anbieterCount.toLocaleString('de-DE')}`,
                    label: 'Geprüfte Kranvermieter',
                    sub: 'deutschlandweit gelistet',
                  },
                  {
                    figure: `${staedteCount}`,
                    label: 'Städte abgedeckt',
                    sub: 'mit eigenem Stadtprofil',
                  },
                  {
                    figure: avgRating.toString().replace('.', ','),
                    label: 'Ø Google-Bewertung',
                    sub: 'auf 5,0 Sternen',
                    star: true,
                  },
                  {
                    figure: totalReviews.toLocaleString('de-DE'),
                    label: 'Google-Rezensionen',
                    sub: 'redaktionell geprüft',
                  },
                ].map((stat, i) => (
                  <div key={i} className="border-t border-neutral-900 pt-3 lg:pt-4">
                    <dt className="font-[var(--font-editorial-mono)] text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-1.5 sm:mb-2 order-2">
                      {stat.label}
                    </dt>
                    <dd
                      className="font-[var(--font-display)] font-light text-neutral-900 leading-none tabular-nums text-[40px] sm:text-[48px] lg:text-[54px]"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                    >
                      {stat.figure}
                      {stat.star && (
                        <span className="ml-1.5 text-[#c8200d] text-[26px] sm:text-[30px] align-top">★</span>
                      )}
                    </dd>
                    <p className="mt-1.5 text-[11px] sm:text-[12px] text-neutral-500 italic font-[var(--font-display)]">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </dl>

              {/* Source note — newspaper credibility marker */}
              <p className="mt-6 lg:mt-8 pt-3 border-t border-neutral-300 font-[var(--font-editorial-mono)] text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                Quelle: Eigene Datenbank · Google
              </p>
            </aside>
          </div>

          {/* Bottom rule + section nav (newspaper "in dieser Ausgabe") */}
          <div className="border-t border-neutral-900">
            <div className="flex items-center gap-4 py-4 sm:py-5 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto scrollbar-hide">
              <span className="shrink-0 font-[var(--font-editorial-mono)] text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-neutral-500">
                In dieser Ausgabe ›
              </span>
              <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                {craneTypes.map((ct, i) => (
                  <span key={ct.slug} className="flex items-center gap-1 sm:gap-2 shrink-0">
                    {i > 0 && <span aria-hidden className="text-neutral-300">·</span>}
                    <Link
                      href={`/${ct.slug}`}
                      className="font-[var(--font-display)] italic text-[13px] sm:text-[14px] text-neutral-800 hover:text-[#c8200d] transition-colors"
                    >
                      {ct.name}
                    </Link>
                  </span>
                ))}
              </div>
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
