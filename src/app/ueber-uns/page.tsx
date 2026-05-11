import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteStats } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { COUNTRY_LABEL, BRAND_NAME, BASE_URL } from '@/lib/country'
import { OG_IMAGE } from '@/lib/og-image'

// LinkedIn URL — fed into Person.sameAs for entity linkage between LinkedIn
// profile and website E-E-A-T author identity. Must stay in sync with the
// public LinkedIn profile content; any divergence between LinkedIn and site
// bio is a credibility risk per user's "compromise rule".
const LINKEDIN_URL = 'https://www.linkedin.com/in/christoph-jonetzko-9464223a9'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { anbieterCount, staedteCount } = await getSiteStats()
  return {
    title: `Über uns — ${BRAND_NAME}`,
    description: `${BRAND_NAME} ist ${COUNTRY_LABEL}s Vergleichsportal für Kranvermietung. Über ${anbieterCount} Anbieter, 8 Krantypen, ${staedteCount}+ Städte. Kostenlos und unverbindlich.`,
    alternates: alternatesFor('/ueber-uns'),
    openGraph: {
      title: `Über uns — ${BRAND_NAME}`,
      description: `${BRAND_NAME} ist ${COUNTRY_LABEL}s Vergleichsportal für Kranvermietung. Über ${anbieterCount} Anbieter, 8 Krantypen, ${staedteCount}+ Städte.`,
      type: 'website',
      url: '/ueber-uns',
          images: [OG_IMAGE],
    },
  }
}

export default async function UeberUnsPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Über uns</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6">
        Über {BRAND_NAME}
      </h1>

      <div className="space-y-6 text-[14px] text-gray-500 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Was ist {BRAND_NAME}?</h2>
          <p>
            {BRAND_NAME} ist ein unabhängiges Vergleichsportal für Kranvermietung in
            {' '}{COUNTRY_LABEL}. Wir helfen Bauunternehmern, Handwerkern und Projektleitern, den
            passenden Kran zum besten Preis zu finden — schnell, transparent und kostenlos.
          </p>
        </section>

        {/* Author / E-E-A-T section — named human behind the catalog, with full
            domain-specific bio. Facts mirror the public LinkedIn profile (Liebherr
            Werk Ehingen LTM 1230–1650, 28 years parts trading, programmatic SEO)
            so cross-channel checks pass. Person JSON-LD at the end of the page
            links via @id back to this section. */}
        <section id="christoph">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Wer steht hinter {BRAND_NAME}?</h2>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
            <div className="relative shrink-0 w-32 sm:w-44 aspect-[2/3] overflow-hidden rounded-md bg-gray-100">
              <Image
                src="/team/christoph-jonetzko.jpg"
                alt="Christoph Jonetzko, Gründer von KranVergleich.de"
                fill
                sizes="(min-width: 640px) 176px, 128px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-base font-semibold text-gray-900">Christoph Jonetzko</p>
                <p className="text-[13px] text-gray-500">Gründer</p>
              </div>
              <p>
                Ich bin Gründer von {BRAND_NAME}. Vor dem Start der Plattform war ich vier Jahre
                im Werk Ehingen bei Liebherr — bei den Modellreihen LTM 1230 bis LTM 1650, also
                230 bis 700 Tonnen. Davor habe ich 28 Jahre lang ein eigenes Handelsunternehmen
                für LKW- und Baumaschinen-Ersatzteile geführt: 10 Mitarbeiter, Ladengeschäft,
                Online-Shop, Marktplatzvertrieb.
              </p>
              <p>
                Diese operative Praxis verbinde ich heute mit programmatischem SEO und
                KI-gestützter Datenanalyse. Ziel ist es, eine der digital am wenigsten
                erschlossenen B2B-Branchen sichtbarer zu machen — für Bauunternehmer und
                Kranvermieter gleichermaßen.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Unsere Daten</h2>
          <p>
            Unsere Datenbank umfasst über {anbieterCount} Kranvermieter in ganz {COUNTRY_LABEL}. Die Daten
            stammen aus öffentlich zugänglichen Quellen (Google Maps) und werden regelmäßig
            aktualisiert. Wir zeigen echte Google-Bewertungen, Kontaktdaten und — wo verfügbar
            — Preisinformationen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Für Suchende: 100% kostenlos</h2>
          <p>
            Die Nutzung von {BRAND_NAME} ist für Suchende komplett kostenlos. Sie können
            Anbieter vergleichen, Profile ansehen und kostenlos Angebote anfragen — bei einem
            oder mehreren Anbietern gleichzeitig. Es gibt keine versteckten Kosten.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Für Kranvermieter</h2>
          <p>
            Sind Sie Kranvermieter und möchten Ihr Profil aktualisieren oder Premium-Funktionen
            nutzen? Kontaktieren Sie uns unter{' '}
            <a href="mailto:impressum@kranvergleich.de" className="text-blue-600 hover:underline">
              impressum@kranvergleich.de
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Kontakt</h2>
          <p>
            Anita Jonetzko<br />
            Kapellenstraße 6/1<br />
            89584 Ehingen<br />
            E-Mail:{' '}
            <a href="mailto:impressum@kranvergleich.de" className="text-blue-600 hover:underline">
              impressum@kranvergleich.de
            </a><br />
            Telefon: +49 1522 3338503
          </p>
        </section>
      </div>

      {/* Person JSON-LD — author/founder E-E-A-T entity, addressable by @id so
          other pages (hub pages, ratgeber) can reference the same Person via
          editor/author fields without duplicating the full Person definition.
          Facts mirror the LinkedIn profile (cross-channel consistency rule). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${BASE_URL}/ueber-uns#christoph`,
            name: 'Christoph Jonetzko',
            jobTitle: 'Gründer',
            description:
              'Gründer von KranVergleich.de. Vor dem Start der Plattform vier Jahre im Werk Ehingen bei Liebherr (Modellreihen LTM 1230 bis LTM 1650, 230 bis 700 Tonnen). Davor 28 Jahre eigenes Handelsunternehmen für LKW- und Baumaschinen-Ersatzteile.',
            image: `${BASE_URL}/team/christoph-jonetzko.jpg`,
            url: `${BASE_URL}/ueber-uns#christoph`,
            worksFor: {
              '@type': 'Organization',
              name: BRAND_NAME,
              url: BASE_URL,
            },
            alumniOf: {
              '@type': 'Organization',
              name: 'Liebherr-Werk Ehingen GmbH',
            },
            knowsAbout: ['Mobilkranbau', 'Kranvermietung', 'Programmatic SEO', 'B2B-Vertrieb'],
            ...(LINKEDIN_URL ? { sameAs: [LINKEDIN_URL] } : {}),
          }),
        }}
      />
    </div>
  )
}
