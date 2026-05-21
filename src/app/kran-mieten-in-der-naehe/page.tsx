import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { InlineSammelanfrageForm } from '@/components/inline-sammelanfrage-form'
import { PageEventTracker } from '@/components/page-event-tracker'
import { craneTypes } from '@/data/crane-types'
import { seoCities } from '@/data/cities-static'
import { getSiteStats } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { BASE_URL, BRAND_NAME, COUNTRY_LABEL, DATA_LAST_VERIFIED_ISO } from '@/lib/country'
import { OG_IMAGE } from '@/lib/og-image'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kran mieten in der Nähe: Anbieter im Umkreis vergleichen',
  description:
    'Kran mieten in der Nähe: Anbieter im Umkreis vergleichen, kostenlos 3 Angebote anfordern. 8 Krantypen, regionale Anfahrt, Tagesmiete ab 150€.',
  alternates: alternatesFor('/kran-mieten-in-der-naehe'),
  openGraph: {
    title: 'Kran mieten in der Nähe: Anbieter im Umkreis vergleichen',
    description:
      'Kran mieten in der Nähe: Anbieter im Umkreis vergleichen, kostenlos 3 Angebote anfordern. 8 Krantypen, regionale Anfahrt, Tagesmiete ab 150€.',
    type: 'website',
    url: '/kran-mieten-in-der-naehe',
    images: [OG_IMAGE],
  },
}

const naeheFAQs = [
  {
    question: 'Wie weit fährt ein Kranvermieter zur Baustelle?',
    answer:
      'Die meisten Kranvermieter haben einen Einsatzradius von 50–150 km um ihren Standort. Innerhalb dieses Radius ist die Anfahrt oft im Tagespreis enthalten oder wird mit 2–4€/km berechnet. Bei längeren Strecken über 150 km lohnt sich meist die Suche nach einem näheren Anbieter. Die Anfahrtskosten können sonst den Mietpreis übersteigen.',
  },
  {
    question: 'Was kostet die Anfahrt zur Baustelle?',
    answer:
      'Anfahrtskosten variieren je nach Krantyp und Entfernung: Minikran und Dachdeckerkran 150–300€ pauschal, Autokran und Mobilkran 2–4€/km (Hin- und Rückweg gerechnet), Schwertransport für Krane ab 100 Tonnen 500–3.000€ je nach Strecke. Bei Baukranen kommt Montage und Demontage hinzu (3.000–8.000€). Fragen Sie immer nach einem Komplettangebot inklusive An- und Abfahrt.',
  },
  {
    question: 'Was tun, wenn kein Anbieter direkt in meiner Stadt sitzt?',
    answer:
      `Das ist häufig der Fall. Viele Kranvermieter bedienen Regionen, nicht nur Städte. Auf ${BRAND_NAME} sehen Sie für jede Stadt auch Anbieter aus dem Umland, die routinemäßig dorthin fahren. Eine Anfrage in einer Nachbarstadt (zum Beispiel Köln statt Bonn, Hannover statt Hildesheim) liefert oft den günstigsten Preis, weil die regionalen Anbieter ihre Stammgebiete kennen.`,
  },
  {
    question: 'Wie schnell kann ein Kran vor Ort sein?',
    answer:
      'Bei kurzer Vorlaufzeit (1–3 Tage) ist meist nur ein Minikran, Dachdeckerkran oder kleinerer Autokran kurzfristig verfügbar. Schwerlastkrane (Mobilkran über 100 Tonnen, Raupenkran) brauchen 1–2 Wochen Planung. Baukrane für Großbaustellen werden 4–8 Wochen im Voraus reserviert. Tipp: Mehrere Anbieter parallel anfragen. Wer kurzfristig Kapazität frei hat, bietet oft einen Rabatt für sofortige Buchung.',
  },
  {
    question: 'Soll ich einen Kran lokal mieten oder von einem überregionalen Anbieter?',
    answer:
      'Lokale Anbieter punkten bei kurzfristigen Einsätzen und kleineren Krantypen. Sie kennen die Zufahrten in der Region und sparen Anfahrtskosten. Überregionale Anbieter wie BKL, Felbermayr oder Schmidbauer sind bei Schwerlast- und Spezialkranen ab 300 Tonnen oft die einzige Option, weil kleine Vermieter solche Größen nicht im Fuhrpark haben. Für die meisten Standardeinsätze (Dachstuhl, Hausbau, Pool) ist der lokale Anbieter aber schneller und günstiger.',
  },
  {
    question: 'Wie finde ich den günstigsten Kran in meiner Nähe?',
    answer:
      `Vergleichen Sie immer 3 Angebote von verschiedenen Anbietern. Die Preise schwanken regional um ±15–20%. Auf ${BRAND_NAME} stellen Sie eine kostenlose Sammelanfrage an mehrere Vermieter in Ihrem Umkreis gleichzeitig. Die Anbieter melden sich innerhalb von 24–48 Stunden mit konkreten Angeboten zurück. Keine Anmeldung, keine Provision. Der Service ist für Sie kostenlos.`,
  },
  {
    question: 'Welcher Krantyp passt zu meinem lokalen Einsatz?',
    answer:
      'Das hängt von Last und Zufahrt ab, nicht von der Region. Für enge Innenstädte und Innenhöfe: Minikran. Für Dacharbeiten am Einfamilienhaus: Dachdeckerkran. Für Dachstuhlmontage oder Pool und Whirlpool: Autokran 30–50t. Für Industrie- und Hochbau: Mobilkran. Für Großbaustellen über mehrere Monate: Baukran (Turmdrehkran). Unser Kostenrechner führt Sie in 60 Sekunden zum passenden Typ, inklusive Preisspanne.',
  },
]

export default async function KranMietenInDerNaehePage() {
  const { anbieterCount, staedteCount } = await getSiteStats()
  // Top 30 cities by companyCount (cities-static.ts is country-aware via NEXT_PUBLIC_COUNTRY).
  // Counts are stale vs Supabase (cosmetic only, we sort, don't display the number).
  const topCities = [...seoCities].sort((a, b) => b.companyCount - a.companyCount).slice(0, 30)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageEventTracker />

      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran mieten in der Nähe</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran mieten in der Nähe: Anbieter im Umkreis vergleichen
      </h1>

      {/* Hero CTA */}
      <a
        href="#angebot-anfragen"
        className="mb-6 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800 sm:w-auto"
      >
        Kostenlos 3 lokale Anbieter anfragen
      </a>

      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Sie suchen einen Kran in Ihrer Region? Auf {BRAND_NAME} vergleichen Sie {anbieterCount}+ Kranvermieter
        in {COUNTRY_LABEL}, sortiert nach Ihrer Stadt oder Postleitzahl. Die meisten Anbieter haben einen
        Einsatzradius von 50–150 km, sodass Sie auch dann lokale Optionen finden, wenn keine Firma direkt
        in Ihrem Ort sitzt. Anfrage stellen, Angebote vergleichen, günstigsten regionalen Anbieter wählen.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">
        Stand: {DATA_LAST_VERIFIED_ISO} · {anbieterCount} aktive Anbieter in {staedteCount} Städten
      </p>

      {/* Trust stats */}
      <section className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">{anbieterCount}+</p>
            <p className="text-[12px] text-gray-500">Anbieter im Vergleich</p>
            <p className="text-[11px] text-gray-400">in {COUNTRY_LABEL}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">{staedteCount}+</p>
            <p className="text-[12px] text-gray-500">Städte abgedeckt</p>
            <p className="text-[11px] text-gray-400">inkl. Umkreis</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">24–48 h</p>
            <p className="text-[12px] text-gray-500">bis zum Angebot</p>
            <p className="text-[11px] text-gray-400">je Anfrage</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">0 €</p>
            <p className="text-[12px] text-gray-500">Provision</p>
            <p className="text-[11px] text-gray-400">kostenlos und unverbindlich</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          So finden Sie den passenden Kran in Ihrer Nähe
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="text-[11px] text-blue-600 font-semibold mb-2">SCHRITT 1</div>
            <h3 className="font-medium text-[15px] text-gray-900 mb-2">Stadt oder Postleitzahl eingeben</h3>
            <p className="text-[13px] text-gray-500">
              Wählen Sie Ihre Stadt aus der Liste oder geben Sie Ihre Postleitzahl ein.
              Wir zeigen Ihnen alle Anbieter im Umkreis von 50–150 km.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="text-[11px] text-blue-600 font-semibold mb-2">SCHRITT 2</div>
            <h3 className="font-medium text-[15px] text-gray-900 mb-2">Krantyp und Einsatz beschreiben</h3>
            <p className="text-[13px] text-gray-500">
              Welche Last, welche Hubhöhe, welche Mietdauer? Wenn Sie unsicher sind,
              hilft Ihnen unser Kostenrechner in 60 Sekunden zur richtigen Wahl.
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="text-[11px] text-blue-600 font-semibold mb-2">SCHRITT 3</div>
            <h3 className="font-medium text-[15px] text-gray-900 mb-2">3 Angebote kostenlos vergleichen</h3>
            <p className="text-[13px] text-gray-500">
              Ihre Anfrage geht an passende Vermieter in Ihrer Region. Innerhalb von 24–48 Stunden
              erhalten Sie konkrete Angebote inklusive Anfahrt und Kranführer.
            </p>
          </div>
        </div>
      </section>

      {/* City grid */}
      <section id="staedte" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kran mieten: beliebte Städte in {COUNTRY_LABEL}
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Wählen Sie Ihre Stadt. Sie sehen alle Kranvermieter im Umkreis mit Preisen,
          Krantypen und Bewertungen. Auch wenn Ihre Stadt nicht direkt aufgelistet ist:
          die Anbieter bedienen meist einen Radius von 50–150 km.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {topCities.map((city) => (
            <Link
              key={city.slug}
              href={`/autokran-mieten/${city.slug}`}
              className="text-[13px] bg-gray-50 hover:bg-blue-50 hover:text-blue-700 text-gray-700 rounded-lg px-3 py-2.5 transition-colors text-center border border-gray-200"
            >
              Kran mieten {city.name}
            </Link>
          ))}
        </div>
        <p className="text-[12px] text-gray-400 mt-3">
          Ihre Stadt fehlt? Stellen Sie trotzdem eine Sammelanfrage. Wir routen sie an Anbieter
          im Umkreis. Über {staedteCount} Städte werden über Regionalradien abgedeckt.
        </p>
      </section>

      {/* By crane type */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kran mieten in der Nähe nach Krantyp
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Wissen Sie schon, welchen Krantyp Sie brauchen? Hier finden Sie alle Anbieter
          eines Typs in {COUNTRY_LABEL}, gefiltert nach Verfügbarkeit in Ihrer Region.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {craneTypes.map((ct) => (
            <Link
              key={ct.slug}
              href={`/${ct.slug}`}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50/30 transition-colors"
            >
              <h3 className="font-medium text-[14px] text-gray-900 mb-1">{ct.name}</h3>
              <p className="text-[12px] text-gray-500">{ct.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Backup CTA */}
      <section id="angebot-anfragen" className="mb-10 scroll-mt-20">
        <div className="border-l-4 border-gray-300 bg-gray-50 rounded-r-lg p-5 mb-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Kostenlose Sammelanfrage: Anbieter im Umkreis melden sich bei Ihnen
          </h2>
          <p className="text-[14px] text-gray-700 leading-relaxed">
            Beschreiben Sie Ihren Einsatz. Ihre Anfrage geht an passende
            Vermieter in Ihrer Region. Innerhalb von 24–48 Stunden erhalten Sie
            konkrete Angebote mit Anfahrt, Kranführer und Komplettpreis.
            Kostenlos, unverbindlich, keine Provision.
          </p>
        </div>
        <InlineSammelanfrageForm />
      </section>

      {/* Trust block */}
      <section className="mb-10 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Warum {BRAND_NAME} für die regionale Krananfrage?
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <p className="font-medium text-[14px] text-gray-900 mb-1">Echte regionale Anbieter</p>
            <p className="text-[13px] text-gray-500">
              {anbieterCount}+ aktive Kranvermieter in {COUNTRY_LABEL}, jeder mit
              eigenem Standort und Einsatzgebiet. Keine Telefonbuch-Kopien.
            </p>
          </div>
          <div>
            <p className="font-medium text-[14px] text-gray-900 mb-1">Kostenlos und ohne Provision</p>
            <p className="text-[13px] text-gray-500">
              Anbieter zahlen nichts für Listing oder Anfrage. Sie sehen den
              echten Preis, keine versteckten Aufschläge.
            </p>
          </div>
          <div>
            <p className="font-medium text-[14px] text-gray-900 mb-1">Sammelanfrage spart Stunden</p>
            <p className="text-[13px] text-gray-500">
              Eine Anfrage, drei Angebote. Statt jeden Anbieter einzeln anzurufen,
              vergleichen Sie regionale Preise auf einen Blick.
            </p>
          </div>
        </div>
      </section>

      {/* SEO intro paragraph */}
      <div className="text-[14px] text-gray-500 leading-relaxed mb-10">
        <p>
          Ob Sie einen <strong className="text-gray-900">Kran mieten</strong>, leihen oder
          ausleihen möchten: auf {BRAND_NAME} finden Sie den passenden Anbieter in Ihrer
          Nähe. Der Kranverleih wird auch als Kranvermietung, Kranmiete oder
          Kran-Vermietung bezeichnet. Mit über {anbieterCount} Anbietern in {staedteCount} Städten
          und einem regionalen Einsatzradius von 50–150 km pro Vermieter erreichen
          Sie praktisch jeden Ort in {COUNTRY_LABEL}. Vergleichen Sie Preise von
          Minikran, Dachdeckerkran, Autokran, Mobilkran, Baukran und Raupenkran.
          Immer kostenlos und unverbindlich.
        </p>
      </div>

      {/* FAQ */}
      <div id="faq" className="mb-10 scroll-mt-20">
        <FAQSection faqs={naeheFAQs} craneTypeName="Kran in der Nähe" />
      </div>

      {/* Cross-links */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Weitere Themen rund um den Kranverleih in der Nähe
        </h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/kran-mieten-preise" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Kran mieten Preisliste
          </Link>
          <Link href="/kostenrechner" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Kostenrechner
          </Link>
          <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Welchen Kran brauche ich?
          </Link>
          <Link href="/ratgeber/kran-mieten-ohne-fuehrerschein" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Kran mieten ohne Führerschein
          </Link>
          <Link href="/ratgeber/kran-mieten-hausbau" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Kran für Hausbau
          </Link>
          <Link href="/ratgeber/krantypen" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors">
            Krantypen im Überblick
          </Link>
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${BASE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Kran mieten in der Nähe' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Kranvermietung Vergleich regional',
            name: `Kran mieten in der Nähe: Anbietervergleich ${COUNTRY_LABEL}`,
            description:
              anbieterCount > 0
                ? `Regionaler Kranverleih-Vergleich in ${COUNTRY_LABEL}: ${anbieterCount} Anbieter in ${staedteCount} Städten. Anfrage an Vermieter im Umkreis von 50–150 km, kostenlos und ohne Provision.`
                : `Regionaler Kranverleih-Vergleich in ${COUNTRY_LABEL}. Anfrage an Vermieter im Umkreis von 50–150 km, kostenlos und ohne Provision.`,
            provider: {
              '@type': 'Organization',
              name: BRAND_NAME,
              url: BASE_URL,
            },
            areaServed: {
              '@type': 'Country',
              name: COUNTRY_LABEL,
            },
            category: 'Kranvermietung',
            dateModified: DATA_LAST_VERIFIED_ISO,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Kran mieten in der Nähe: Anbieter im Umkreis vergleichen',
            url: `${BASE_URL}/kran-mieten-in-der-naehe`,
            description: `Kran mieten in der Nähe: ${anbieterCount}+ Anbieter im Umkreis vergleichen, kostenlos 3 Angebote anfordern. 8 Krantypen, regionale Anfahrt, Tagesmiete ab 150€.`,
            inLanguage: 'de',
            isPartOf: {
              '@type': 'WebSite',
              name: BRAND_NAME,
              url: BASE_URL,
            },
            primaryImageOfPage: { '@type': 'ImageObject', url: `${BASE_URL}${OG_IMAGE.url}` },
          }),
        }}
      />
      {/* FAQPage structured data rendered by FAQSection */}
    </div>
  )
}
