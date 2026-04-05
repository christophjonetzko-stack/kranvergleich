import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Kran mieten ohne Führerschein — was ist erlaubt?',
  description:
    'Welche Krane darf man ohne Führerschein bedienen? Minikran, Dachdeckerkran, Autokran — Regelungen, Ausbildungspflicht und Kosten. Alles zur Kranführerpflicht in Deutschland.',
  alternates: { canonical: '/ratgeber/kran-mieten-ohne-fuehrerschein' },
}

const faqs = [
  {
    question: 'Brauche ich einen Kranführerschein für einen Minikran?',
    answer: 'Nein, für Minikrane ist kein Kranführerschein nötig. Eine Einweisung durch den Vermieter reicht aus. Voraussetzung: Sie müssen mindestens 18 Jahre alt sein und körperlich geeignet.',
  },
  {
    question: 'Was kostet ein Kranführerschein?',
    answer: 'Eine Kranführerausbildung kostet ca. 500–1.500€ und dauert 1–5 Tage je nach Krantyp. Für Turmdrehkrane (Baukrane) ist die Ausbildung am umfangreichsten (5 Tage + Prüfung).',
  },
  {
    question: 'Darf ich einen Autokran selbst fahren?',
    answer: 'Nein. Autokrane dürfen nur von ausgebildeten Kranführern bedient werden. Bei der Miete ist der Kranführer in der Regel inklusive — das ist auch gesetzlich vorgeschrieben.',
  },
  {
    question: 'Was passiert, wenn ich einen Kran ohne Befähigung bediene?',
    answer: 'Bei einem Unfall haften Sie persönlich. Die Berufsgenossenschaft (BG Bau) kann Regressansprüche stellen. Zudem drohen Bußgelder nach dem Arbeitsschutzgesetz.',
  },
]

export default function KranOhneFuehrerscheinPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber/welchen-kran-brauche-ich" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran mieten ohne Führerschein</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran mieten ohne Führerschein — was ist erlaubt?
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Nicht jeder Kran erfordert einen Kranführerschein. Welche Krane Sie selbst bedienen dürfen,
        wo ein Kranführer Pflicht ist und was die Ausbildung kostet — alle Infos im Überblick.
      </p>

      {/* Main content */}
      <div className="space-y-8 text-[14px] text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Krane ohne Führerschein (Selbstbedienung)</h2>
          <p className="mb-4">
            Bei folgenden Krantypen reicht eine <strong className="text-gray-900">Einweisung durch den Vermieter</strong> —
            kein Führerschein und keine spezielle Ausbildung nötig:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/minikran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Minikran (Spinnenkran)</Link>
              <p className="text-[13px] text-gray-500 mt-1">Einweisung ca. 30 Min. Tragkraft bis 3t. Ideal für enge Baustellen. Ab 250€/Tag.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/dachdeckerkran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Dachdeckerkran</Link>
              <p className="text-[13px] text-gray-500 mt-1">Einfache Bedienung per Funkfernsteuerung. Einweisung inklusive. Ab 200€/Tag.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/anhaengerkran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Anhängerkran</Link>
              <p className="text-[13px] text-gray-500 mt-1">Kleinstes Gerät, mit PKW-Anhängerkupplung transportierbar. Ab 150€/Tag.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/ladekran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Ladekran (Knickarmkran)</Link>
              <p className="text-[13px] text-gray-500 mt-1">Einweisung erforderlich. Oft als LKW-Komplettpaket mit Fahrer buchbar.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Krane mit Führerscheinpflicht (Kranführer inklusive)</h2>
          <p className="mb-4">
            Bei diesen Krantypen ist ein <strong className="text-gray-900">ausgebildeter Kranführer gesetzlich vorgeschrieben</strong>.
            Die gute Nachricht: Bei der Miete ist der Kranführer in der Regel im Preis enthalten.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/autokran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Autokran (Kranwagen)</Link>
              <p className="text-[13px] text-gray-500 mt-1">Kranführer immer inklusive. Ab 500€/Tag (inkl. Bediener).</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/mobilkran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Mobilkran (Schwerlastkran)</Link>
              <p className="text-[13px] text-gray-500 mt-1">Kranführer Pflicht. Ab 600€/Tag (inkl. Bediener).</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/raupenkran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Raupenkran (Kettenkran)</Link>
              <p className="text-[13px] text-gray-500 mt-1">Speziell geschulter Kranführer nötig. Ab 800€/Tag.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <Link href="/baukran-mieten" className="font-medium text-gray-900 hover:text-blue-600">Baukran (Turmdrehkran)</Link>
              <p className="text-[13px] text-gray-500 mt-1">Turmdrehkranführer-Ausbildung (5 Tage). Bediener separat buchbar (40-60€/h).</p>
            </div>
          </div>
        </section>

        <section className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Übersicht: Welcher Kran — mit oder ohne Führerschein?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Krantyp</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Führerschein nötig?</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Kranführer inklusive?</th>
                  <th className="py-2 px-3 text-left font-medium text-gray-900">Preis ab</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                <tr className="border-b"><td className="py-2 px-3">Anhängerkran</td><td className="py-2 px-3 text-green-600 font-medium">Nein</td><td className="py-2 px-3">—</td><td className="py-2 px-3">150€/Tag</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Dachdeckerkran</td><td className="py-2 px-3 text-green-600 font-medium">Nein</td><td className="py-2 px-3">—</td><td className="py-2 px-3">200€/Tag</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Minikran</td><td className="py-2 px-3 text-green-600 font-medium">Nein</td><td className="py-2 px-3">—</td><td className="py-2 px-3">250€/Tag</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Ladekran</td><td className="py-2 px-3 text-green-600 font-medium">Nein*</td><td className="py-2 px-3">Optional</td><td className="py-2 px-3">300€/Tag</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Autokran</td><td className="py-2 px-3 text-red-600 font-medium">Ja</td><td className="py-2 px-3 text-green-600">Ja, inklusive</td><td className="py-2 px-3">500€/Tag</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Mobilkran</td><td className="py-2 px-3 text-red-600 font-medium">Ja</td><td className="py-2 px-3 text-green-600">Ja, inklusive</td><td className="py-2 px-3">600€/Tag</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Raupenkran</td><td className="py-2 px-3 text-red-600 font-medium">Ja</td><td className="py-2 px-3 text-green-600">Ja, inklusive</td><td className="py-2 px-3">800€/Tag</td></tr>
                <tr><td className="py-2 px-3">Baukran</td><td className="py-2 px-3 text-red-600 font-medium">Ja</td><td className="py-2 px-3">Separat (40-60€/h)</td><td className="py-2 px-3">300€/Tag</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">* Ladekran: Einweisung erforderlich, aber kein offizieller Führerschein.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Rechtliche Grundlage</h2>
          <p>
            Die Anforderungen an Kranführer sind in der <strong className="text-gray-900">DGUV Vorschrift 52</strong> (ehemals BGV D6)
            und der <strong className="text-gray-900">Betriebssicherheitsverordnung (BetrSichV)</strong> geregelt.
            Der Arbeitgeber ist verantwortlich, dass nur befähigte Personen Krane bedienen.
            Bei Mietkranen übernimmt der Vermieter die Einweisung oder stellt einen qualifizierten Kranführer.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      <div className="mt-8 text-[14px] text-gray-500">
        <p>
          Sie sind unsicher, ob Sie den Kran selbst bedienen dürfen?
          Die meisten Vermieter beraten Sie kostenlos. Nutzen Sie die{' '}
          <Link href="/" className="text-blue-600 hover:underline">Sammelanfrage auf KranVergleich.de</Link> und
          fragen Sie direkt beim Anbieter nach.
        </p>
      </div>
    </div>
  )
}
