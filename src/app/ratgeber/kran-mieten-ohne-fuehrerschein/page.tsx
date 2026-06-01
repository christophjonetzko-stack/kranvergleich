import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { COUNTRY_LABEL, BRAND_NAME } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'

export const metadata: Metadata = {
  title: { absolute: 'Kran mieten ohne Führerschein – Kranschein?' },
  description:
    `Brauche ich einen Kranschein? Welche Krane darf man ohne Führerschein selbst bedienen? Minikran, Dachdeckerkran, Anhängerkran, alle Regelungen, Kosten und Ausbildungspflicht zum Kranschein und Kranführerschein in ${COUNTRY_LABEL}.`,
  alternates: alternatesFor('/ratgeber/kran-mieten-ohne-fuehrerschein'),
}

const faqs = [
  {
    question: 'Brauche ich einen Kranschein für meinen Mietkran?',
    answer: 'Das hängt vom Krantyp ab. Für Minikrane, Dachdeckerkrane, Anhängerkrane und Ladekrane brauchen Sie KEINEN Kranschein, eine Einweisung durch den Vermieter reicht. Für Autokrane, Mobilkrane, Raupenkrane und Baukrane (Turmdrehkrane) ist ein Kranschein (auch Kranführerschein genannt) gesetzlich vorgeschrieben. Bei diesen Typen ist der ausgebildete Kranführer bei der Miete in der Regel im Tagespreis enthalten.',
  },
  {
    question: 'Welche Krane darf ich ohne Kranschein bedienen?',
    answer: 'Vier Krantypen dürfen Sie nach einer 30-minütigen Einweisung selbst bedienen, ohne Kranschein und ohne Führerschein: Minikran (Spinnenkran, bis 3 t Tragkraft), Dachdeckerkran (für Dacharbeiten), Anhängerkran (PKW-Anhänger mit Kran, bis 1,5 t) und Ladekran (LKW-Heckkran). Voraussetzung: Sie sind mindestens 18 Jahre alt und körperlich geeignet. Der Vermieter dokumentiert die Einweisung schriftlich (Pflicht nach DGUV V52).',
  },
  {
    question: 'Kranschein vs Kranführerschein, ist das das Gleiche?',
    answer: 'Ja, "Kranschein" und "Kranführerschein" werden in Deutschland synonym verwendet. Formaler Name: "Befähigungsnachweis zum Führen von Kranen" nach DGUV Vorschrift 52. Umgangssprachlich nennt man ihn meistens "Kranschein". Es ist KEIN klassischer Führerschein (wie der KFZ-Führerschein), sondern eine Bescheinigung über eine theoretische und praktische Ausbildung.',
  },
  {
    question: 'Brauche ich einen Kranführerschein für einen Minikran?',
    answer: 'Nein, für Minikrane ist kein Kranführerschein nötig. Eine Einweisung durch den Vermieter reicht aus. Voraussetzung: Sie müssen mindestens 18 Jahre alt sein und körperlich geeignet.',
  },
  {
    question: 'Was kostet ein Kranschein?',
    answer: 'Eine Kranführerausbildung (Kranschein) kostet ca. 500–1.500€ und dauert 1–5 Tage je nach Krantyp. Für Turmdrehkrane (Baukrane) ist die Ausbildung am umfangreichsten (5 Tage + Prüfung). Für Mobilkrane und Autokrane meist 2–3 Tage. Wenn Sie nur gelegentlich einen Kran brauchen, lohnt sich die Ausbildung kaum, günstiger ist die Miete inklusive Kranführer.',
  },
  {
    question: 'Darf ich einen Autokran selbst fahren?',
    answer: 'Nein. Autokrane dürfen nur von ausgebildeten Kranführern mit gültigem Kranschein bedient werden. Bei der Miete ist der Kranführer in der Regel inklusive, das ist auch gesetzlich vorgeschrieben (DGUV V52).',
  },
  {
    question: 'Kran bedienen ohne Kranschein, wann erlaubt, wann strafbar?',
    answer: 'Erlaubt: Bedienung eines Minikran, Dachdeckerkran, Anhängerkran oder Ladekran nach dokumentierter Einweisung durch den Vermieter. Strafbar / haftungsrelevant: Bedienung von Autokran, Mobilkran, Raupenkran oder Baukran (Turmdrehkran) ohne gültigen Kranschein, bei einem Unfall haften Sie persönlich, Bußgelder bis 25.000€ möglich nach Arbeitsschutzgesetz, Versicherungsverlust und Regress durch die Berufsgenossenschaft.',
  },
  {
    question: 'Was passiert, wenn ich einen Kran ohne Befähigung bediene?',
    answer: 'Bei einem Unfall haften Sie persönlich. Die Berufsgenossenschaft (BG Bau) kann Regressansprüche stellen. Zudem drohen Bußgelder nach dem Arbeitsschutzgesetz und der Versicherungsschutz entfällt rückwirkend.',
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
        Kran mieten ohne Führerschein bzw. Kranschein, welchen Kran darf man selbst bedienen?
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Nicht jeder Kran erfordert einen Kranschein. Welche Krane Sie ohne Kranführerschein selbst bedienen dürfen,
        wo ein Kranführer mit gültigem Kranschein Pflicht ist und was die Ausbildung kostet, alle Infos im Überblick.
      </p>
      <p className="text-[14px] text-gray-500 mb-8 max-w-3xl">
        <strong className="text-gray-900">Kurz vorab. Begriffsklärung:</strong> „Kranschein", „Kranführerschein" und
        „Befähigungsnachweis zum Führen von Kranen" (DGUV V52) meinen alle dasselbe, eine spezielle Ausbildung
        zum Bedienen größerer Krane. Das ist <strong className="text-gray-900">kein klassischer Führerschein</strong>
        (wie der KFZ-Führerschein). Vier Krantypen darf man ohne diesen Kranschein selbst bedienen, vier dürfen
        nur ausgebildete Kranführer bedienen.
      </p>

      {/* Main content */}
      <div className="space-y-8 text-[14px] text-gray-600 leading-relaxed">

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Krane ohne Kranschein (Selbstbedienung erlaubt)</h2>
          <p className="mb-4">
            Bei folgenden Krantypen reicht eine <strong className="text-gray-900">Einweisung durch den Vermieter</strong> 
            kein Kranschein, kein Kranführerschein und keine spezielle Ausbildung nötig. Sie dürfen den Kran nach
            der Einweisung selbst bedienen, sofern Sie mindestens 18 Jahre alt und körperlich geeignet sind:
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
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Krane mit Kranschein-Pflicht (Kranführer inklusive)</h2>
          <p className="mb-4">
            Bei diesen Krantypen ist ein <strong className="text-gray-900">ausgebildeter Kranführer mit gültigem Kranschein
            gesetzlich vorgeschrieben</strong>. Die gute Nachricht: Bei der Miete ist der Kranführer in der Regel
            im Tagespreis enthalten. Sie müssen den Kranschein also nicht selbst machen.
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
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Übersicht: Welcher Kran, mit oder ohne Führerschein?</h2>
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
                <tr className="border-b"><td className="py-2 px-3">Anhängerkran</td><td className="py-2 px-3 text-green-600 font-medium">Nein</td><td className="py-2 px-3"></td><td className="py-2 px-3">150€/Tag</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Dachdeckerkran</td><td className="py-2 px-3 text-green-600 font-medium">Nein</td><td className="py-2 px-3"></td><td className="py-2 px-3">200€/Tag</td></tr>
                <tr className="border-b"><td className="py-2 px-3">Minikran</td><td className="py-2 px-3 text-green-600 font-medium">Nein</td><td className="py-2 px-3"></td><td className="py-2 px-3">250€/Tag</td></tr>
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
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Kranschein vs Kranführerschein vs Führerschein, die Begriffe erklärt</h2>
          <p className="mb-3">
            In der Praxis kursieren mehrere Begriffe, die alle dasselbe meinen. Für Sammelanfragen bei Kranvermietern
            ist es wichtig zu wissen:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li>
              <strong className="text-gray-900">Kranschein</strong>, der umgangssprachliche, am häufigsten gesuchte Begriff.
              Bezeichnet die Befähigung zum Führen eines Krans nach DGUV V52.
            </li>
            <li>
              <strong className="text-gray-900">Kranführerschein</strong>. Synonym für Kranschein. Formaler klingender
              Begriff, technisch identisch.
            </li>
            <li>
              <strong className="text-gray-900">Befähigungsnachweis zum Führen von Kranen</strong>, der offizielle Name
              nach DGUV Vorschrift 52. Wird auf dem Ausweis selbst so genannt.
            </li>
            <li>
              <strong className="text-gray-900">Führerschein (klassisch)</strong>, der KFZ-Führerschein hat
              <strong className="text-gray-900"> NICHTS mit dem Kranschein zu tun</strong>. Sie können einen Kranschein
              haben ohne PKW-Führerschein und umgekehrt. Die häufige Suchanfrage „Kran mieten ohne Führerschein"
              meint in 99% der Fälle den Kranschein, nicht den KFZ-Führerschein.
            </li>
          </ul>
          <p>
            Im weiteren Verlauf dieses Ratgebers nutzen wir „Kranschein" und „Kranführerschein" synonym. Wenn ein
            Krantyp „kein Kranschein nötig" hat, bedeutet das: Sie dürfen ihn nach Einweisung selbst bedienen.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Kran bedienen ohne Kranschein. Praxis-Beispiele</h2>
          <p className="mb-3">
            Wann ist die Selbstbedienung eines Krans ohne Kranschein realistisch und sinnvoll? Drei typische
            Anwendungsfälle, in denen Bauunternehmer und Privatkunden problemlos ohne Kranschein arbeiten:
          </p>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Beispiel 1: Dachsanierung Einfamilienhaus</p>
              <p className="text-[13px]">
                Sie sanieren das Dach Ihres Einfamilienhauses und müssen Ziegel, Dämmplatten und Werkzeug aufs Dach
                heben. <strong className="text-gray-900">Dachdeckerkran für ~200€/Tag</strong> mieten, Einweisung
                vom Vermieter (ca. 30 Min) und losarbeiten, kein Kranschein nötig.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Beispiel 2: Whirlpool in Garten heben</p>
              <p className="text-[13px]">
                Whirlpool-Lieferung am Bordstein, Aufstellort hinterm Haus. <strong className="text-gray-900">Minikran
                (Spinnenkran) für ~250€/Tag</strong>, kompakt genug für den Hinterhof, Tragkraft bis 1,5 t reicht für
                jeden Standardspa. Kranschein nicht erforderlich, nur Einweisung.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Beispiel 3: Stahlträger 800 kg verlegen</p>
              <p className="text-[13px]">
                Stahlträger 4 m Länge, 800 kg Gewicht, Hubhöhe 6 m über Garage. <strong className="text-gray-900">
                Anhängerkran ab 150€/Tag</strong>, passt an PKW-Anhängerkupplung, Tragkraft 1,5 t. Bedienung
                ohne Kranschein nach Einweisung. Bei höheren Lasten oder größerer Hubhöhe wechseln Sie auf Autokran
                mit Kranführer.
              </p>
            </div>
          </div>
          <p className="mt-4 text-[13px] text-gray-500">
            <strong className="text-gray-900">Wichtig:</strong> Auch ohne formellen Kranschein dokumentiert der Vermieter
            die Einweisung schriftlich (Pflicht nach DGUV V52). Diese Bescheinigung sollten Sie aufbewahren, bei einem
            Unfall ist sie der Nachweis Ihrer Befähigung.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Rechtliche Grundlage</h2>
          <p>
            Die Anforderungen an Kranführer und den Kranschein sind in der <strong className="text-gray-900">DGUV
            Vorschrift 52</strong> (ehemals BGV D6) und der <strong className="text-gray-900">Betriebssicherheitsverordnung
            (BetrSichV)</strong> geregelt. Der Arbeitgeber ist verantwortlich, dass nur befähigte Personen Krane bedienen.
            Bei Mietkranen übernimmt der Vermieter die Einweisung oder stellt einen qualifizierten Kranführer mit
            gültigem Kranschein.
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
          <Link href="/" className="text-blue-600 hover:underline">Sammelanfrage auf {BRAND_NAME}</Link> und
          fragen Sie direkt beim Anbieter nach.
        </p>
      </div>
    </div>
  )
}
