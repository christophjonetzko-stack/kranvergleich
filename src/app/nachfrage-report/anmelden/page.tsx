import type { Metadata } from 'next'
import { BRAND_NAME } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'
import { OG_IMAGE } from '@/lib/og-image'
import { ReportSignupForm } from '@/components/report-signup-form'

const TITLE = 'Nachfrage-Report erhalten'
const DESC = `Erhalten Sie die nächste Ausgabe des ${BRAND_NAME} Nachfrage-Reports, inklusive der regionalen Auswertung für Ihre Stadt. Kostenlos, einmal pro Quartal. Kein Verkauf, keine Werbung.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: alternatesFor('/nachfrage-report/anmelden'),
  openGraph: {
    title: TITLE,
    description: DESC,
    type: 'website',
    url: '/nachfrage-report/anmelden',
    images: [OG_IMAGE],
  },
}

export default function NachfrageReportAnmeldenPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-gray-900">Den Nachfrage-Report erhalten</h1>

      <p className="mt-4 text-[15px] leading-relaxed text-gray-600">
        Der {BRAND_NAME} Nachfrage-Report wertet aus, wonach Bauunternehmen, Handwerk und Kommunen beim
        Thema Kranmiete tatsächlich suchen: welche Krantypen gefragt sind, wie sich die Nachfrage über
        das Jahr entwickelt und wie sie sich regional verteilt. Tragen Sie sich ein, und Sie erhalten
        die nächste Ausgabe automatisch, inklusive der regionalen Auswertung für Ihre Stadt.
      </p>

      <ul className="mt-5 space-y-1.5 text-[14px] text-gray-700 list-disc pl-5">
        <li>Einmal pro Quartal, mit aktuellen Zahlen.</li>
        <li>Regionale Auswertung für Ihre Stadt.</li>
        <li>Kostenlos. Kein Verkauf, keine Werbung.</li>
      </ul>

      <div className="mt-8">
        <ReportSignupForm />
      </div>

      <p className="mt-6 text-[12px] leading-relaxed text-gray-400">
        Double-Opt-in: Nach dem Absenden erhalten Sie eine E-Mail mit einem Bestätigungslink. Erst nach
        Ihrer Bestätigung speichern wir Ihre Anmeldung und senden Ihnen den Report. Sie können sich
        jederzeit über den Abmeldelink in jeder E-Mail wieder austragen.
      </p>
    </div>
  )
}
