import type { Metadata } from 'next'
import { COUNTRY, BRAND_NAME } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'

// Country-aware statute references. Identity stays the same (Anita Jonetzko, Ehingen, DE)
// per memory project_kranvergleich_at_priority_2026_04_23.md: cross-border ECG-AT
// Impressum may point at the DE Sitz; no AT entity required. Only the cited statute
// names change between deployments.
const STATUTE = COUNTRY === 'AT'
  ? {
      base: '§ 5 ECG',
      content_responsibility: '§ 24 MedienG',
      service_provider_liability: '§§ 13–16 ECG',
      service_provider_liability_short: '§ 13 ECG',
      ranking_disclosure: '§ 2 UWG (AT)',
      dispute: '§ 19 AStG',
    }
  : {
      base: '§ 5 DDG',
      content_responsibility: '§ 18 Abs. 2 MStV',
      service_provider_liability: '§§ 8 bis 10 TMG',
      service_provider_liability_short: '§ 7 Abs. 1 TMG',
      ranking_disclosure: '§ 5a UWG',
      dispute: '§ 36 VSBG',
    }

export const metadata: Metadata = {
  title: 'Impressum',
  description: `Impressum von ${BRAND_NAME} — Angaben gemäß ${STATUTE.base}.`,
  alternates: alternatesFor('/impressum'),
  openGraph: {
    title: 'Impressum',
    description: `Impressum von ${BRAND_NAME} — Angaben gemäß ${STATUTE.base}.`,
    type: 'website',
    url: '/impressum',
  },
}

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>

      <div className="prose prose-sm max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold">Angaben gemäß {STATUTE.base}</h2>
          <p>
            <strong>Anita Jonetzko</strong><br />
            Kapellenstraße 6/1<br />
            89584 Ehingen<br />
            Deutschland
          </p>
          {COUNTRY === 'AT' && (
            <p className="text-sm text-muted-foreground mt-2">
              Anbieter mit Sitz in Deutschland; das Angebot richtet sich auch an Nutzerinnen und Nutzer in Österreich.
              Es gilt das Herkunftslandprinzip gemäß § 20 ECG.
            </p>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold">Kontakt</h2>
          <p>
            E-Mail: impressum@kranvergleich.de<br />
            Telefon: +49 1522 3338503
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt nach {STATUTE.content_responsibility}</h2>
          <p>
            Anita Jonetzko<br />
            Kapellenstraße 6/1<br />
            89584 Ehingen
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Haftungsausschluss</h2>

          <h3 className="text-lg font-medium mt-4">Haftung für Inhalte</h3>
          <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            Als Diensteanbieter sind wir gemäß {STATUTE.service_provider_liability_short} für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach {STATUTE.service_provider_liability} sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>

          <h3 className="text-lg font-medium mt-4">Haftung für Vermittlung</h3>
          <p>
            KranVergleich.de vermittelt lediglich Kontakte zwischen Nutzern und Kranvermietungsunternehmen
            und übernimmt keine Haftung für die Qualität, Verfügbarkeit, Zuverlässigkeit oder Preise der
            gelisteten Anbieter. Alle Angaben zu Preisen und Leistungen sind unverbindliche Richtwerte.
            Verbindliche Angebote erhalten Sie direkt vom jeweiligen Anbieter.
          </p>

          <h3 className="text-lg font-medium mt-4">Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
            Seiten verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Wie unser Ranking entsteht ({STATUTE.ranking_disclosure})</h2>
          <p>
            Die Reihenfolge der Anbieter auf {BRAND_NAME} basiert standardmäßig auf der
            Google-Bewertung (höchste zuerst). Nutzer können die Sortierung jederzeit ändern
            (z.&nbsp;B. nach Anzahl der Bewertungen oder Name A–Z). Die Reihenfolge wird
            durch keine bezahlte Platzierung beeinflusst. Sollten wir künftig bezahlte
            Premium-Einträge anbieten, werden diese deutlich als „Anzeige" gekennzeichnet.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Streitschlichtung ({STATUTE.dispute})</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <div className="border-t pt-4 mt-8">
          <p className="text-xs text-muted-foreground">
            Stand: April 2026
          </p>
        </div>
      </div>
    </div>
  )
}
