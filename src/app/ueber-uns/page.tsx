import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { COUNTRY_LABEL, BRAND_NAME } from '@/lib/country'

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
            Die Nutzung von KranVergleich.de ist für Suchende komplett kostenlos. Sie können
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
    </div>
  )
}
