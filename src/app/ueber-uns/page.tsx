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

// Currency stamps — mirror the constants in /[crane-type]/page.tsx. TODO:
// centralize in @/lib/site-meta when a third page needs them. Two-place
// duplication is acceptable, three would justify the lift.
const DATA_LAST_VERIFIED_ISO = '2026-05-06'
const DATA_LAST_VERIFIED_LABEL = 'Mai 2026'

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

      {/* Pitch headline (P1, Priestley) — leads with strongest credentials
          (Liebherr Werk Ehingen + 28 years operator practice) before any
          generic "About us" framing. Borrowed-credibility front-and-center
          for DACH crane B2B audience. Reviewer suggested "transparenteste"
          superlative — rejected (UWG §5/§6 Spitzenstellungswerbung risk per
          feedback_uwg_abmahnung_priority + skill linkedin-kranvergleich
          Pre-flight #3b). Concrete number ("713 Kranvermieter") replaces
          superlative — Priestley "authority through specificity" without
          legal exposure. */}
      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight mb-4">
        Vier Jahre bei Liebherr in Ehingen. 28 Jahre Baumaschinen-Handel.
        Heute baue ich die Vergleichs-Datenbank für 713 Kranvermieter
        in Deutschland und Österreich.
      </h1>

      {/* Credential pull-quote — visual highlight of three strongest signals,
          extracted from the bio prose so they don't get buried below the fold.
          Clean typography (no emoji bullets) for DACH Mittelstand B2B feel. */}
      <div className="border-l-2 border-gray-300 pl-4 py-1 space-y-1.5 text-[14px] text-gray-600 mb-8">
        <p><span className="font-semibold text-gray-900">4 Jahre Liebherr-Werk Ehingen</span> · LTM 1230 bis LTM 1650 (230 bis 700 Tonnen)</p>
        <p><span className="font-semibold text-gray-900">28 Jahre eigenes Handelsunternehmen</span> · LKW- und Baumaschinen-Ersatzteile, 10 Mitarbeiter</p>
        <p><span className="font-semibold text-gray-900">Programmatic SEO + KI-Datenanalyse</span> · technische Basis der Plattform</p>
      </div>

      <div className="space-y-6 text-[14px] text-gray-500 leading-relaxed">
        {/* Author / E-E-A-T section — named human behind the catalog. Bio now
            narrative-focused (motivation + perspective from both sides) since
            hard facts moved up to the credential pull-quote. Person JSON-LD at
            end of the page links via @id back to this section. */}
        <section id="christoph">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Wer steht hinter {BRAND_NAME}?</h2>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
            <div className="relative shrink-0 w-32 sm:w-44 aspect-[2/3] overflow-hidden rounded-md bg-gray-100">
              <Image
                src="/team/christoph-jonetzko.jpg"
                alt="Christoph Jonetzko, ex-Liebherr Ehingen, Gründer von KranVergleich.de"
                fill
                sizes="(min-width: 640px) 176px, 128px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-base font-semibold text-gray-900">Christoph Jonetzko</p>
                <p className="text-[13px] text-gray-500">ex-Liebherr Ehingen · Branchenkenner aus 28 Jahren Praxis</p>
              </div>
              <p>
                Was Bauunternehmer in der Praxis sehen, sehe ich von beiden Seiten. Aus dem Werk:
                bei Liebherr lernt man, was hinter einem LTM 1230 steckt, wie ein 230-Tonner
                geplant, gebaut und übergeben wird. Aus dem Handel: 28 Jahre eigenes Geschäft
                mit Ersatzteilen für LKW und Baumaschinen lehren, was zwischen Anbieter und
                Bauunternehmer typischerweise schiefläuft — fragmentierte Auswahl, undurchsichtige
                Preise, langsame Antworten.
              </p>
            </div>
          </div>
        </section>

        {/* Aim + Game — Priestley P1 closing. Aim = current concrete work
            (AT expansion, verifiable via per-country firm counts in /). Game =
            long-term mission. Kept as prose, not bullet block, per DACH B2B
            reviewer guidance (no grant-application style). */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Wofür ich baue</h2>
          <p>
            Aktuell erweitere ich die Datenbank von Deutschland auf Österreich. Bereits über
            75 Kranvermieter aus 9 österreichischen Bundesländern sind gelistet, der nächste
            Schritt ist die Vertiefung in Wien, Niederösterreich und der Steiermark.
          </p>
          <p className="mt-3">
            Mein Ziel: eine der digital am wenigsten erschlossenen B2B-Branchen so transparent
            machen, dass Bauunternehmer in wenigen Minuten den passenden Kran finden und
            Vermieter Anfragen erhalten, die wirklich zu ihrer Flotte passen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Unsere Daten</h2>
          <p>
            Die Datenbank umfasst über {anbieterCount} Kranvermieter in ganz {COUNTRY_LABEL}. Daten
            stammen aus öffentlich zugänglichen Quellen, werden manuell geprüft und regelmäßig
            aktualisiert. Sichtbar sind echte Google-Bewertungen, Kontaktdaten und — wo verfügbar
            — Preisinformationen. Stand: {DATA_LAST_VERIFIED_LABEL}.
          </p>
        </section>

        {/* Industry-perspective section — Priestley "vital, not functional"
            language: shows POV on the market, not just operator copy. Three
            facts are verifiable from the catalog (33 firms without email,
            day rates 230 to 1500 EUR, regional vs nationwide split). Seeds
            material for future content (Krankosten-Studie 2026 in plan). */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was ich in 28 Jahren Praxis sehe</h2>
          <ul className="space-y-2.5 list-disc pl-5 marker:text-gray-300">
            <li>
              33 von 713 Kranverleihern in unserem Katalog haben keine E-Mail-Adresse
              veröffentlicht. Anfragen laufen dort über Telefon — oder gar nicht.
            </li>
            <li>
              Die meisten Vermieter nennen Preise erst auf Anfrage. Tagessätze reichen von
              230 € für einen Minikran bis 1.500 € für einen 100-Tonner-Mobilkran.
            </li>
            <li>
              Bauunternehmer kennen die großen Namen wie Boels, BKL oder Felbermayr. Aber
              700+ kleinere Vermieter sind regional verankert — oft die schnellere und
              günstigere Wahl für lokale Projekte.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Für Bauunternehmer</h2>
          <p>
            Nutzung kostenfrei. Anbieter vergleichen, Profile ansehen und Angebote bei einem oder
            mehreren Vermietern gleichzeitig anfragen. Keine Vermittlungsprovision, keine
            versteckten Gebühren.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Für Kranvermieter</h2>
          <p>
            Listing kostenlos. Wenn Sie Kranvermieter sind und Ihr Profil aktualisieren oder neue
            Modelle eintragen möchten — schreiben Sie mir direkt an{' '}
            <a href="mailto:christoph@kranvergleich.de" className="text-blue-600 hover:underline">
              christoph@kranvergleich.de
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
              'Gründer von KranVergleich.de. Vier Jahre Werk Ehingen bei Liebherr (LTM 1230 bis LTM 1650, 230 bis 700 Tonnen). 28 Jahre eigenes Handelsunternehmen für LKW- und Baumaschinen-Ersatzteile. Heute Aufbau einer transparenten Kranvermieter-Datenbank für Deutschland und Österreich mit programmatischem SEO und KI-gestützter Datenanalyse.',
            dateModified: DATA_LAST_VERIFIED_ISO,
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
