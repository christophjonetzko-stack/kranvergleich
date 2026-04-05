import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Minikran vs. Autokran — Wann brauchen Sie was?',
  description:
    'Minikran oder Autokran mieten? Vergleich: Tragkraft, Kosten, Einsatzbereiche, Vor- und Nachteile. Finden Sie den richtigen Kran für Ihr Projekt.',
  alternates: { canonical: '/ratgeber/minikran-vs-autokran' },
}

const faqs = [
  {
    question: 'Wann ist ein Minikran besser als ein Autokran?',
    answer: 'Ein Minikran ist besser wenn: der Einsatzort eng ist (Hinterhof, Innenraum), die Last unter 3 Tonnen wiegt, Sie den Kran selbst bedienen möchten (kein Führerschein nötig), oder Sie in Innenräumen arbeiten (Minikrane sind elektrisch und abgasfrei).',
  },
  {
    question: 'Wann ist ein Autokran besser als ein Minikran?',
    answer: 'Ein Autokran ist besser wenn: die Last über 3 Tonnen wiegt, Sie schnell fertig sein müssen (Autokran ist in 15 Min. aufgebaut), große Hakenhöhen (30m+) nötig sind, oder es sich um einen einzelnen Tageseinsatz handelt.',
  },
  {
    question: 'Kann ich einen Minikran selbst bedienen?',
    answer: 'Ja — Minikrane erfordern keinen Kranführerschein. Der Vermieter weist Sie in ca. 30 Minuten ein. Sie bedienen den Kran per Funkfernsteuerung.',
  },
  {
    question: 'Was kostet ein Minikran vs. Autokran?',
    answer: 'Minikran: ab 250€/Tag (ohne Bediener). Autokran: ab 500€/Tag (inkl. Kranführer). Auf Wochenbasis: Minikran ab 1.200€, Autokran ab 2.500€. Der Autokran ist teurer, aber der Kranführer ist inklusive.',
  },
]

export default function MinikranVsAutokranPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber/welchen-kran-brauche-ich" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Minikran vs. Autokran</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Minikran vs. Autokran — Wann brauchen Sie was?
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        Die beiden beliebtesten Krantypen im Vergleich. Minikran (Spinnenkran) und Autokran (Kranwagen)
        decken zusammen 80% aller Baustellen-Anforderungen ab — aber welcher passt zu Ihrem Projekt?
      </p>

      {/* Comparison table */}
      <section className="mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px] border border-gray-200 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-900">Kriterium</th>
                <th className="py-3 px-4 text-left font-medium text-blue-600">Minikran</th>
                <th className="py-3 px-4 text-left font-medium text-blue-600">Autokran</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Tagespreis</td><td className="py-3 px-4">ab 250€</td><td className="py-3 px-4">ab 500€</td></tr>
              <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Tragkraft</td><td className="py-3 px-4">500 kg – 3 t</td><td className="py-3 px-4">10 t – 500 t</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Hakenhöhe</td><td className="py-3 px-4">5 – 18 m</td><td className="py-3 px-4">10 – 80 m</td></tr>
              <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Aufbauzeit</td><td className="py-3 px-4">15–30 Min.</td><td className="py-3 px-4">15–45 Min.</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Kranführer</td><td className="py-3 px-4 text-green-600">Nicht nötig</td><td className="py-3 px-4">Pflicht (inklusive)</td></tr>
              <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Mindestbreite</td><td className="py-3 px-4 text-green-600">ab 80 cm</td><td className="py-3 px-4">min. 3 m Zufahrt</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Innenraum</td><td className="py-3 px-4 text-green-600">Ja (elektrisch)</td><td className="py-3 px-4 text-red-500">Nein</td></tr>
              <tr className="border-t bg-gray-50"><td className="py-3 px-4 font-medium text-gray-900">Glasmontage</td><td className="py-3 px-4 text-green-600">Ja (Glassauger)</td><td className="py-3 px-4">Begrenzt</td></tr>
              <tr className="border-t"><td className="py-3 px-4 font-medium text-gray-900">Schwerlast (50t+)</td><td className="py-3 px-4 text-red-500">Nein</td><td className="py-3 px-4 text-green-600">Ja</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="space-y-8 text-[14px] text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wählen Sie den Minikran wenn...</h2>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Die Zufahrt eng ist (Hinterhof, enge Straße, Einfahrt unter 2m)</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Sie in Innenräumen arbeiten (abgasfrei, leise)</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Sie Glasscheiben oder Fenster montieren (Glassauger-Aufsatz)</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Die Last unter 3 Tonnen wiegt</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Sie keinen Kranführer buchen möchten (Selbstbedienung)</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Budget unter 300€/Tag</li>
          </ul>
          <div className="mt-3">
            <Link href="/minikran-mieten" className="text-[13px] text-blue-600 hover:underline">Minikran-Anbieter vergleichen &rarr;</Link>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wählen Sie den Autokran wenn...</h2>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Die Last schwerer als 3 Tonnen ist</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Große Hakenhöhen (30m+) nötig sind</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Es ein Einzeleinsatz ist (1–2 Tage)</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Sie einen erfahrenen Kranführer brauchen (inklusive)</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Schneller Auf- und Abbau wichtig ist</li>
          </ul>
          <div className="mt-3">
            <Link href="/autokran-mieten" className="text-[13px] text-blue-600 hover:underline">Autokran-Anbieter vergleichen &rarr;</Link>
          </div>
        </section>

        <section className="bg-gray-50 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Tipp: Beide kombinieren</h2>
          <p className="text-[13px]">
            Auf vielen Baustellen arbeiten Minikran und Autokran zusammen: Der Autokran hebt schwere
            Bauteile (Stahlträger, Fertigteile), der Minikran übernimmt die Feinarbeit in engen Bereichen
            (Glasmontage, Innenausbau). Fragen Sie Ihren Vermieter nach einem Kombipaket.
          </p>
        </section>
      </div>

      <div className="mt-10">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>
    </div>
  )
}
