import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getSiteStats } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { COUNTRY_LABEL, BRAND_NAME, BASE_URL, DATA_LAST_VERIFIED_ISO } from '@/lib/country'
import { OG_IMAGE } from '@/lib/og-image'

// LinkedIn URL, fed into Person.sameAs for entity linkage between LinkedIn
// profile and website E-E-A-T author identity. Must stay in sync with the
// public LinkedIn profile content; any divergence between LinkedIn and site
// bio is a credibility risk per user's "compromise rule".
const LINKEDIN_URL = 'https://www.linkedin.com/in/christoph-jonetzko-9464223a9'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const { anbieterCount, staedteCount } = await getSiteStats()
  return {
    // title.absolute: the layout template appends " | KranVergleich.de", which
    // doubled the brand here ("Über uns, KranVergleich.de | KranVergleich.de").
    title: { absolute: `Über uns | ${BRAND_NAME}` },
    description: `${BRAND_NAME} ist ${COUNTRY_LABEL}s Vergleichsportal für Kranvermietung. Über ${anbieterCount} Anbieter, 8 Krantypen, ${staedteCount}+ Städte. Kostenlos und unverbindlich.`,
    alternates: alternatesFor('/ueber-uns'),
    openGraph: {
      title: `Über uns, ${BRAND_NAME}`,
      description: `${BRAND_NAME} ist ${COUNTRY_LABEL}s Vergleichsportal für Kranvermietung. Über ${anbieterCount} Anbieter, 8 Krantypen, ${staedteCount}+ Städte.`,
      type: 'website',
      url: '/ueber-uns',
          images: [OG_IMAGE],
    },
  }
}

export default async function UeberUnsPage() {
  // Catalog count is hardcoded inline (713 total DE+AT, matches LinkedIn
  // Post #1 and is consistent across all prose). getSiteStats() still runs
  // in generateMetadata() for the title/description per-domain count, but
  // we don't need it in the component body anymore.
  const lastUpdatedLabel = new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Über uns</span>
      </nav>

      {/* Hook headline. Priestley P1 problem-statement opener. 4 sentences,
          decreasing length (claim  evidence  evidence  commitment). NOT
          superlative-claim (UWG safe), "die digital am wenigsten erschlossene
          B2B-Branche" is industry observation from 28 years operator
          experience, not market-leadership claim about us. */}
      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight mb-4">
        Die deutsche Kranvermietung ist die digital am wenigsten erschlossene
        B2B-Branche. 48 von über 700 Vermietern haben keine E-Mail-Adresse.
        Preise gibt es nur auf Anfrage. Das ändere ich.
      </h1>

      {/* Mid-page CTA banner, second waitlist exposure between hook and
          one-liner (Priestley 7-11-4: multiple exposures within one page).
          Secondary visual weight (blue-50 vs primary blue-600 CTA below).
          Same mailto target as the primary CTA in the final section. */}
      <a
        href="mailto:christoph@kranvergleich.de?subject=Vorab-Zugang%20Kran-Preisindex%202026&body=Hallo%20Christoph%2C%0A%0Aich%20m%C3%B6chte%20mich%20f%C3%BCr%20den%20Vorab-Zugang%20zum%20Kran-Preisindex%202026%20eintragen.%0A%0AName%2FFirma%3A%20%0A%0AGr%C3%BC%C3%9Fe"
        className="block mb-6 px-4 py-2.5 text-[13px] text-blue-700 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
      >
        <span className="font-semibold">Aktuell im Aufbau:</span> Kran-Preisindex 2026. Vorab-Zugang sichern 
      </a>

      {/* Single-line pitch (Name / Same / Fame / Aim in one sentence).
          Colon-separator instead of em-dash (Phase 2 humanization rule I 
          even functional em-dashes replaced when colon/period works). */}
      <p className="text-[15px] sm:text-base text-gray-700 leading-relaxed mb-10">
        Ich bin Christoph Jonetzko. Nach 4 Jahren bei Liebherr Ehingen und
        28 Jahren im Baumaschinen-Handel mache ich die deutsche Kranvermietung
        transparent: über 700 geprüfte Vermieter, ein Vergleich in unter 3 Minuten.
      </p>

      <div className="space-y-6 text-[14px] text-gray-500 leading-relaxed">
        {/* Wer steht hinter, bio establishes credibility before "Drei
            Beobachtungen" insights validate POV. Photo block: photo +
            tagline + credentials caption (ex-Liebherr + 28 Jahre, visible
            credibility marker). Name not duplicated as visible text; it
            lives in alt-text + JSON-LD Person schema. */}
        <section id="christoph">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Wer steht hinter {BRAND_NAME}?</h2>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
            <div className="flex flex-col gap-2 shrink-0 w-32 sm:w-44">
              <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-gray-100">
                <Image
                  src="/team/christoph-jonetzko.jpg"
                  alt="Christoph Jonetzko, Gründer von KranVergleich.de"
                  fill
                  sizes="(min-width: 640px) 176px, 128px"
                  className="object-cover"
                />
              </div>
              <p className="text-[12px] text-gray-600 italic leading-snug">
                „Ich mache die deutsche Kranvermietung transparent."
              </p>
              <p className="text-[11px] text-gray-500 leading-snug">
                ex-Liebherr Ehingen · 28 Jahre Baumaschinen-Praxis
              </p>
            </div>
            <div className="flex-1">
              <p>
                Was Bauunternehmer in der Praxis sehen, sehe ich von beiden Seiten.
                Aus dem Werk: bei Liebherr lernt man, was hinter einem LTM 1230
                steckt, wie ein 230-Tonner geplant, gebaut und übergeben wird.
                Aus dem Handel: 28 Jahre eigenes Geschäft mit Ersatzteilen für
                LKW und Baumaschinen, zuletzt mit 10 Mitarbeitern, zeigen, was
                zwischen Anbieter und Bauunternehmer typischerweise schiefläuft:
                Anfragen bleiben unbeantwortet, Preisangaben dauern Wochen,
                Vermieter sind für ein konkretes Projekt nicht erreichbar.
              </p>
            </div>
          </div>
        </section>

        {/* Drei Beobachtungen, insights AFTER bio establishes credibility
            (reviewer #4 final flow: bio first as identity, then insights as
            evidence of POV). Verb-led bullets, no judgment adjectives.
            33/713 mirrors LinkedIn Post #1 stat-tile. */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Drei Beobachtungen aus 28 Jahren in der Branche
          </h2>
          <ul className="space-y-2.5 list-disc pl-5 marker:text-gray-300">
            <li>
              48 von über 700 Vermietern in meinem Katalog haben keine
              E-Mail-Adresse veröffentlicht. Anfragen laufen dort über Telefon
              oder gar nicht.
            </li>
            <li>
              Tagessätze reichen von 230 € für einen Minikran bis 1.500 € für
              einen 100-Tonner-Mobilkran. Die meisten Vermieter nennen Preise
              erst auf Anfrage.
            </li>
            <li>
              Bauunternehmer kennen die großen Namen wie Boels, BKL oder
              Felbermayr. Über 700 kleinere Vermieter sind regional verankert
              und oft die schnellere und günstigere Wahl für lokale Projekte.
            </li>
          </ul>
        </section>

        {/* Meine Datenbank, moved before "Was als Nächstes kommt: Kran-Preisindex 2026" per reviewer #4
            flow (data context  mission). Stand inline in first sentence
            (was separate sentence). 713 hardcoded (matches LinkedIn Post #1
            and prose elsewhere on page). "Manuell geprüft" inline anchors
            "geprüft" claim from the pitch one-liner. */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Meine Datenbank</h2>
          <p>
            Meine Datenbank umfasst über 700 manuell geprüfte Kranvermieter in
            Deutschland und Österreich (Stand: {lastUpdatedLabel}).
            Die Daten stammen aus öffentlich zugänglichen Quellen; ich pflege
            sie manuell und aktualisiere sie regelmäßig. Sichtbar sind echte
            Google-Bewertungen, Kontaktdaten und, wo der Vermieter sie
            veröffentlicht, Preisinformationen.
          </p>
        </section>

        {/* Analysen & Presse — kuratorische Map zu den wichtigsten Assets
            (Priestley 7-11-4, eigene Plattform als zentrale Anlaufstelle).
            Live-Preisreport + Ratgeber + externer Presse-Pickup. Externe Links
            target=_blank rel=noopener; interne via next/link. */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Analysen und Ratgeber</h2>
          <ul className="space-y-2.5 list-disc pl-5 marker:text-gray-300">
            <li>
              <Link href="/kran-preisreport-2026" className="text-blue-700 hover:underline font-medium">Kran-Preisreport 2026</Link>: Mietpreise über alle acht Krantypen, von 150 € bis 5.000 € am Tag, ausgewertet über mehr als 700 Anbieter.
            </li>
            <li>
              <a href="https://www.linkedin.com/pulse/33-von-713-kranverleihern-deutschland-und-%C3%B6sterreich-haben-jonetzko-jjgwe/" target="_blank" rel="noopener" className="text-blue-700 hover:underline">33 von 713 Kranverleihern in Deutschland und Österreich</a> (LinkedIn-Artikel): wie viele Betriebe online überhaupt erreichbar sind.
            </li>
            <li>
              <Link href="/ratgeber/was-kostet-ein-kran" className="text-blue-700 hover:underline">Was kostet ein Kran?</Link> Mietpreise aller acht Krantypen pro Tag, Woche und Monat.
            </li>
            <li>
              <Link href="/ratgeber/kranpreise-praxis" className="text-blue-700 hover:underline">Welcher Kran für welche Baustelle?</Link> Die fünf echten Preistreiber, von der Anfahrt bis zur Straßensperrung.
            </li>
            <li>
              <Link href="/ratgeber/kran-mieten-oder-kaufen" className="text-blue-700 hover:underline">Kran mieten oder kaufen?</Link> Ab wann sich ein eigener Kran rechnet, mit Break-even pro Typ.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">In der Presse</h2>
          <p>
            Das Dachdecker-Handwerk (DDH) griff im Juni 2026 die Mietpreis-Auswertung
            aus meinem Kran-Preisreport 2026 auf, unter anderem die regionale
            Anbieterdichte mit 146 Kranvermietern in Nordrhein-Westfalen gegenüber
            nur vier im Saarland.{' '}
            <a href="https://www.ddh.de/kran-preisreport-2026-16062026" target="_blank" rel="noopener" className="text-blue-700 hover:underline">Zum Beitrag</a>
          </p>
        </section>

        {/* Was als Nächstes kommt: Kran-Preisindex 2026, final content section. Page ends on CTA per
            reviewer #4 (end on call-to-action, not on metadata/contact).
            Game first ("Mein Ziel"), Aim second ("Aktuell entwickle ich").
            "Die erste systematische", claim approved 4x across reviewer
            iterations and explicitly authorized by user text-paste. Pre-
            launch claim requires WebSearch verification of competitive
            landscape before Q3 2026 product launch (Phase 3 note); if
            existing systematic Kranpreis-Index found, soften to "eine
            systematische". */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Was als Nächstes kommt: Kran-Preisindex 2026</h2>
          <p>
            Mein Ziel: eine der digital am wenigsten erschlossenen B2B-Branchen
            so transparent machen, dass Bauunternehmer in unter 3 Minuten den
            passenden Kran finden und Vermieter Anfragen erhalten, die zu ihrer
            Flotte passen.
          </p>
          <p className="mt-3">
            Aktuell entwickle ich den Kran-Preisindex 2026, die erste
            systematische Übersicht von Tagessätzen über alle Tonnage-Klassen
            und Bundesländer in Deutschland und Österreich. Erscheint Q3 2026.
          </p>

          {/* Primary CTA. Oversubscribed waitlist mechanic (Priestley: launch
              waitlist BEFORE product, +40% sales). Interim mailto link until
              real waitlist endpoint built (next-session task: minimal inline
              form with email + DSGVO checkbox + Resend confirmation).
              Reviewer #4 wants a real form here; mailto is acknowledged
              friction until then. */}
          <div className="mt-5">
            <a
              href="mailto:christoph@kranvergleich.de?subject=Vorab-Zugang%20Kran-Preisindex%202026&body=Hallo%20Christoph%2C%0A%0Aich%20m%C3%B6chte%20mich%20f%C3%BCr%20den%20Vorab-Zugang%20zum%20Kran-Preisindex%202026%20eintragen.%0A%0AName%2FFirma%3A%20%0A%0AGr%C3%BC%C3%9Fe"
              className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white text-[15px] font-semibold rounded hover:bg-blue-700 transition-colors"
            >
              Vorab-Zugang zum Preisindex 2026 sichern 
            </a>
          </div>

          {/* Secondary supply-side block. Kranvermieter contact, smaller
              font, below primary CTA so it doesn't compete for demand-side
              attention. */}
          <p className="mt-6 text-[12px] text-gray-500">
            Sie sind Kranvermieter?{' '}
            <a
              href="mailto:christoph@kranvergleich.de?subject=Listing%20auf%20KranVergleich.de"
              className="text-gray-700 hover:text-gray-900 underline"
            >
              christoph@kranvergleich.de
            </a>
          </p>
        </section>
      </div>

      {/* Person JSON-LD, author/founder E-E-A-T entity, addressable by @id so
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
              'Gründer von KranVergleich.de. Vier Jahre Werk Ehingen bei Liebherr (LTM 1230 bis LTM 1650, 230 bis 700 Tonnen). 28 Jahre eigenes Handelsunternehmen für LKW- und Baumaschinen-Ersatzteile. Heute Aufbau einer transparenten Kranvermieter-Datenbank für Deutschland und Österreich. Aktuell in Entwicklung: Kran-Preisindex 2026 (Q3 2026).',
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
