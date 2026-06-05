import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'
import { alternatesFor } from '@/lib/alternates'
import { BRAND_NAME, COUNTRY_LABEL, DOMAIN } from '@/lib/country'
import { OG_IMAGE } from '@/lib/og-image'
import { Path4Cta } from '@/components/path4-cta'

export const revalidate = 86400

// Path 4 listing-fee pricing. The amount actually charged is governed by the
// Stripe Checkout endpoint (built Day 2, once STRIPE_PRICE_* envs land after
// KYC); these constants only drive the marketing copy on this page. Launch
// window per PATH4_TIER_SPEC: 99 EUR until 25.06.2026, 149 EUR from 26.06.
const LAUNCH_PRICE = 99
const STANDARD_PRICE = 149
const LAUNCH_END = '25.06.2026'

// CTA fallback. The Path4Cta button opens a Stripe Checkout session when the
// firm arrives with ?firma=<slug> (from its claim CTA or the pilot mail). A
// generic visitor without a slug has no company to charge, so the button falls
// back to this contact mailbox and asks which firm to verify.
const CTA_HREF = `mailto:kontakt@kranvergleich.de?subject=Premium-Listing%20auf%20${DOMAIN}`

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Premium-Listing für Anbieter, ${BRAND_NAME}`,
    description: `Verifiziert-Siegel und Top-Position in den Anbieterlisten von ${BRAND_NAME}. Einmalige Gebühr, zwölf Monate Laufzeit, kein Abo.`,
    alternates: alternatesFor('/path4'),
    openGraph: {
      title: `Premium-Listing für Anbieter, ${BRAND_NAME}`,
      description: `Verifiziert-Siegel und Top-Position in den Anbieterlisten von ${BRAND_NAME}.`,
      type: 'website',
      url: '/path4',
      images: [OG_IMAGE],
    },
  }
}

export default async function Path4Page() {
  const { anbieterCount, staedteCount } = await getSiteStats()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Premium-Listing</span>
      </nav>

      {/* Hero. Value proposition for the firm, no lead guarantee (UWG-safe). */}
      <header className="mb-10">
        <p className="text-[13px] font-medium text-blue-700 mb-2">Für Kranvermieter</p>
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight mb-3">
          Ihre Kranvermietung verifiziert und sichtbar an erster Stelle
        </h1>
        <p className="text-[15px] text-gray-600 leading-relaxed mb-5">
          Mit dem Premium-Listing erscheint Ihr Betrieb mit Verifiziert-Siegel oben in den
          Anbieterlisten Ihrer Region auf {BRAND_NAME}. Eine einmalige Gebühr, zwölf Monate
          Laufzeit, kein Abo. Über {anbieterCount} Anbieter in {staedteCount}+ Städten in {COUNTRY_LABEL}
          {' '}sind bereits gelistet.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Path4Cta mailtoHref={CTA_HREF}>Jetzt verifizieren, {LAUNCH_PRICE}&nbsp;€</Path4Cta>
          <span className="text-[13px] text-gray-500">
            Early-Adopter-Preis bis {LAUNCH_END}, danach {STANDARD_PRICE}&nbsp;€
          </span>
        </div>
      </header>

      {/* Was Sie erhalten */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Was Sie erhalten</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] bg-green-50 text-green-700 px-1.5 py-0.5 rounded">Verifiziert</span>
              <h3 className="font-medium text-gray-900">Verifiziert-Siegel</h3>
            </div>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Wir prüfen Impressum, Website und Telefon Ihres Betriebs von Hand. Nach bestandener
              Prüfung trägt Ihr Eintrag das grüne Siegel in jeder Liste und auf Ihrem Profil. Das
              schafft Vertrauen bei Bauunternehmen, die einen verlässlichen Partner suchen.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Anzeige</span>
              <h3 className="font-medium text-gray-900">Oben in der Anbieterliste</h3>
            </div>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Ihr Eintrag steht über den kostenlosen Anbietern, klar als Anzeige gekennzeichnet.
              Suchende sehen Ihren Betrieb zuerst, sowohl auf den Stadtseiten als auch in den
              Krantyp-Listen Ihrer Region.
            </p>
          </div>

          <div className="border rounded-lg p-5">
            <h3 className="font-medium text-gray-900 mb-1.5">Zwölf Monate, eine einmalige Zahlung</h3>
            <p className="text-[14px] text-gray-600 leading-relaxed">
              Sie zahlen einmal und sind zwölf Monate sichtbar. Kein automatisches Abo, keine
              versteckte Verlängerung. Vor Ablauf erinnern wir Sie einmal per E-Mail, die
              Entscheidung über eine Verlängerung liegt allein bei Ihnen.
            </p>
          </div>
        </div>
      </section>

      {/* Preis */}
      <section className="mb-10">
        <div className="border rounded-lg p-6 bg-gray-50">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-semibold text-gray-900">{LAUNCH_PRICE}&nbsp;€</span>
            <span className="text-[15px] text-gray-400 line-through">{STANDARD_PRICE}&nbsp;€</span>
          </div>
          <p className="text-[14px] text-gray-600 mb-1">
            Early-Adopter-Preis bis {LAUNCH_END}, danach {STANDARD_PRICE}&nbsp;€. Einmalig für zwölf
            Monate Laufzeit.
          </p>
          <p className="text-[13px] text-gray-500 mb-4">
            14 Tage Geld-zurück-Garantie. Keine MwSt. (Kleinunternehmer gemäß §19 UStG).
          </p>
          <Path4Cta mailtoHref={CTA_HREF}>Premium-Listing buchen</Path4Cta>
        </div>
      </section>

      {/* Aktivierung */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">So läuft die Freischaltung</h2>
        <ol className="space-y-3">
          {[
            ['Listing buchen', 'Sie wählen das Premium-Listing und bezahlen sicher über Stripe (Karte, SEPA-Lastschrift oder Klarna).'],
            ['Prüfung von Hand', 'Wir prüfen Impressum, Website und Telefon Ihres Betriebs. Das dauert in der Regel ein bis zwei Werktage.'],
            ['Freischaltung', 'Nach bestandener Prüfung gehen Verifiziert-Siegel und Hervorhebung live. Sie erhalten eine Bestätigung per E-Mail.'],
            ['Zwölf Monate sichtbar', 'Ihr Eintrag bleibt zwölf Monate hervorgehoben und verifiziert.'],
          ].map(([title, body], i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[13px] font-semibold">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-gray-900 text-[15px]">{title}</p>
                <p className="text-[14px] text-gray-600 leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Transparenz (BGH-Pflichtangabe) */}
      <section className="mb-10">
        <div className="border-l-2 border-gray-300 pl-4">
          <h2 className="text-[15px] font-semibold text-gray-900 mb-1.5">Transparenz</h2>
          <p className="text-[14px] text-gray-600 leading-relaxed">
            Das Premium-Listing ist eine bezahlte Hervorhebung und in jeder Liste deutlich als
            Anzeige gekennzeichnet. Kostenlose Einträge bleiben unverändert bestehen, niemand wird
            aus dem Verzeichnis entfernt. {BRAND_NAME} finanziert sich über diese Gebühren.
          </p>
        </div>
      </section>

      {/* Was nicht enthalten ist (Erwartungsmanagement, UWG-sauber) */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Was nicht enthalten ist</h2>
        <ul className="space-y-2.5 text-[14px] text-gray-600">
          <li><span className="font-medium text-gray-900">Keine Lead-Garantie.</span> Wir erhöhen Ihre Sichtbarkeit, versprechen aber keine feste Anzahl an Anfragen.</li>
          <li><span className="font-medium text-gray-900">Keine Gebiets-Exklusivität.</span> Auch andere Betriebe in Ihrer Stadt können ein Premium-Listing buchen.</li>
          <li><span className="font-medium text-gray-900">Kein Einfluss auf Google.</span> Das organische Ranking bei Google bleibt unberührt.</li>
          <li><span className="font-medium text-gray-900">Kein eigenes Branding.</span> Logo und Farben der Profilseite bleiben einheitlich.</li>
        </ul>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Häufige Fragen</h2>
        <div className="space-y-3">
          {[
            ['Bekomme ich garantiert mehr Anfragen?', 'Nein. Das Premium-Listing erhöht Ihre Sichtbarkeit und Ihr Vertrauen bei Suchenden, eine feste Anzahl an Anfragen können wir seriös nicht zusichern.'],
            ['Ist das ein Abo?', 'Nein. Sie zahlen einmal für zwölf Monate. Es gibt keine automatische Verlängerung und keine wiederkehrende Abbuchung.'],
            ['Was passiert nach zwölf Monaten?', 'Wir erinnern Sie einmal per E-Mail. Ob Sie verlängern, entscheiden Sie selbst. Ohne Ihre ausdrückliche Zustimmung wird nichts abgebucht.'],
            ['Wie läuft die Verifizierung ab?', 'Wir prüfen Impressum, Website und Telefonnummer Ihres Betriebs von Hand. Erst nach bestandener Prüfung wird das Verifiziert-Siegel freigeschaltet.'],
            ['Kann ich stornieren?', 'Während der Early-Adopter-Phase gilt eine 14-Tage-Geld-zurück-Garantie. Eine kurze E-Mail genügt.'],
            ['Warum steht „Anzeige" an meinem Eintrag?', 'Das ist eine gesetzlich vorgeschriebene Kennzeichnung für bezahlte Hervorhebungen. Sie sorgt für Transparenz gegenüber den Suchenden.'],
          ].map(([q, a], i) => (
            <details key={i} className="group border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer p-4 font-medium text-[15px] text-gray-900 hover:bg-gray-50 transition-colors">
                {q}
                <span className="ml-2 shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="px-4 pb-4 text-[14px] text-gray-600 leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t pt-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Bereit, sichtbarer zu werden?</h2>
        <p className="text-[14px] text-gray-600 mb-5">
          Sichern Sie sich den Early-Adopter-Preis von {LAUNCH_PRICE}&nbsp;€ bis {LAUNCH_END}.
        </p>
        <Path4Cta mailtoHref={CTA_HREF}>Jetzt verifizieren, {LAUNCH_PRICE}&nbsp;€</Path4Cta>
      </section>
    </div>
  )
}
