import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kran aufstellen: Genehmigung, Vorschriften & Tipps (2026)',
  description:
    'Kran aufstellen Genehmigung: Wann brauchen Sie eine? Autokran Genehmigung auf öffentlicher Straße, Kran aufstellen ohne Genehmigung auf Privatgelände. Alle Vorschriften, Kosten & Ansprechpartner.',
  alternates: { canonical: '/ratgeber/kran-aufstellen-genehmigung' },
}

const faqs = [
  {
    question: 'Brauche ich eine Genehmigung, um einen Kran aufzustellen?',
    answer: 'Auf Privatgelände: in der Regel nein — solange der Kran nur Ihr eigenes Grundstück betrifft und keine öffentlichen Wege blockiert. Auf öffentlichem Grund (Straße, Gehweg, Parkplatz): ja, Sie brauchen eine Sondernutzungserlaubnis vom Ordnungsamt oder Straßenverkehrsamt.',
  },
  {
    question: 'Was kostet eine Genehmigung für einen Kran?',
    answer: 'Die Gebühren variieren je nach Stadt: Sondernutzungserlaubnis 50–300€, verkehrsrechtliche Anordnung 50–200€, Halteverbot-Schilder 50–150€. In Großstädten (Berlin, München, Hamburg) sind die Gebühren tendenziell höher. Gesamtkosten typischerweise 150–500€.',
  },
  {
    question: 'Brauche ich eine Genehmigung für einen Autokran?',
    answer: 'Wenn der Autokran auf Ihrem Privatgelände steht und die Stützen nicht auf öffentlichen Grund ragen: nein. Wenn der Autokran auf der Straße steht oder Stützen auf den Gehweg ausfahren: ja — Sondernutzungserlaubnis und ggf. Halteverbotszone erforderlich.',
  },
  {
    question: 'Kann ich einen Kran ohne Genehmigung aufstellen?',
    answer: 'Ja, auf privatem Grundstück ist in den meisten Fällen keine Genehmigung nötig. Ausnahmen: Baukrane (Turmdrehkrane) können je nach Gemeinde eine Baugenehmigung erfordern, wenn sie eine bestimmte Höhe überschreiten oder den Luftraum benachbarter Grundstücke überragen.',
  },
  {
    question: 'Wie lange dauert es, eine Krangenehmigung zu bekommen?',
    answer: 'Bearbeitungszeit: 1–3 Wochen je nach Stadt und Auslastung der Behörde. In dringenden Fällen bieten manche Städte Eilverfahren an (Aufpreis). Planen Sie die Genehmigung mindestens 2–4 Wochen vor dem geplanten Kraneinsatz.',
  },
  {
    question: 'Wer beantragt die Genehmigung — ich oder der Kranvermieter?',
    answer: 'Grundsätzlich ist der Auftraggeber (Bauherr) verantwortlich. In der Praxis helfen viele Kranvermieter bei der Antragstellung oder übernehmen sie komplett. Fragen Sie bei der Buchung danach — auf KranVergleich.de können Sie dies direkt in Ihrer Anfrage angeben.',
  },
]

export default async function KranGenehmigungPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran aufstellen Genehmigung</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran aufstellen: Genehmigung, Vorschriften &amp; Tipps
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Wann brauchen Sie eine Genehmigung zum Aufstellen eines Krans? Was gilt für Autokrane auf
        der Straße? Und wann können Sie einen Kran ohne Genehmigung aufstellen? Alle Regelungen,
        Kosten und Ansprechpartner im Überblick.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#wann-genehmigung" className="text-[13px] text-blue-600 hover:underline">Wann brauchen Sie eine Genehmigung?</a></li>
          <li><a href="#ohne-genehmigung" className="text-[13px] text-blue-600 hover:underline">Kran aufstellen ohne Genehmigung</a></li>
          <li><a href="#autokran" className="text-[13px] text-blue-600 hover:underline">Autokran Genehmigung</a></li>
          <li><a href="#baukran" className="text-[13px] text-blue-600 hover:underline">Baukran (Turmdrehkran) Genehmigung</a></li>
          <li><a href="#dokumente" className="text-[13px] text-blue-600 hover:underline">Welche Dokumente brauchen Sie?</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">Was kostet die Genehmigung?</a></li>
          <li><a href="#ansprechpartner" className="text-[13px] text-blue-600 hover:underline">Ansprechpartner & Behörden</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Wann Genehmigung */}
        <section id="wann-genehmigung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wann brauchen Sie eine Genehmigung?</h2>
          <p className="mb-4">
            Die Grundregel ist einfach: <strong className="text-gray-900">Steht der Kran auf öffentlichem Grund,
            brauchen Sie eine Genehmigung. Steht er auf Privatgelände, in der Regel nicht.</strong>
          </p>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Situation</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Genehmigung?</th>
                  <th className="py-3 px-4 text-left font-medium text-gray-900">Welche?</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t">
                  <td className="py-3 px-4">Kran auf eigenem Grundstück</td>
                  <td className="py-3 px-4 text-green-600 font-medium">Nein</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4">Autokran auf Privatparkplatz</td>
                  <td className="py-3 px-4 text-green-600 font-medium">Nein</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Kran-Stützen auf Gehweg</td>
                  <td className="py-3 px-4 text-red-600 font-medium">Ja</td>
                  <td className="py-3 px-4">Sondernutzungserlaubnis</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4">Autokran auf Straße</td>
                  <td className="py-3 px-4 text-red-600 font-medium">Ja</td>
                  <td className="py-3 px-4">Sondernutzung + Halteverbot</td>
                </tr>
                <tr className="border-t">
                  <td className="py-3 px-4">Baukran überragt Nachbargrundstück</td>
                  <td className="py-3 px-4 text-red-600 font-medium">Ja</td>
                  <td className="py-3 px-4">Überschwenkgenehmigung</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="py-3 px-4">Kran in Nähe von Stromleitungen</td>
                  <td className="py-3 px-4 text-red-600 font-medium">Ja</td>
                  <td className="py-3 px-4">Abstimmung mit Netzbetreiber</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ohne Genehmigung */}
        <section id="ohne-genehmigung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Kran aufstellen ohne Genehmigung — wann geht das?</h2>
          <p className="mb-3">
            In folgenden Fällen können Sie einen Kran <strong className="text-gray-900">ohne Genehmigung</strong> aufstellen:
          </p>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Der Kran steht komplett auf Ihrem eigenen Grundstück</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Keine Teile (Stützen, Ausleger, Gegengewichte) ragen auf öffentlichen Grund</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Der Kranausleger überschwenkt nicht das Nachbargrundstück (oder Sie haben dessen schriftliche Zustimmung)</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Keine Stromleitungen, Gasleitungen oder andere Infrastruktur im Schwenkbereich</li>
            <li className="flex gap-2"><span className="text-green-600 shrink-0">&#10003;</span> Minikrane, Anhängerkrane und Dachdeckerkrane auf Privatgelände — fast immer genehmigungsfrei</li>
          </ul>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mt-4">
            <p className="text-[13px] text-amber-800">
              <strong>Wichtig:</strong> Auch auf Privatgelände gelten Lärmschutzvorschriften.
              Kranarbeiten sind in Wohngebieten in der Regel nur Mo–Sa 7:00–20:00 erlaubt.
              Sonntags und feiertags sind Kranarbeiten verboten.
            </p>
          </div>
        </section>

        {/* Autokran */}
        <section id="autokran" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Autokran Genehmigung — Sonderfall Straße</h2>
          <p className="mb-3">
            Autokrane (Kranwagen) werden häufig auf der Straße aufgestellt — weil das Zielgebäude
            nicht von eigenem Grund erreichbar ist. In diesem Fall brauchen Sie:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">1. Sondernutzungserlaubnis</p>
              <p className="text-[13px] text-gray-500">Beim Ordnungsamt oder Straßenbauamt der Stadt. Erlaubt die Nutzung der Straße für den Kraneinsatz.</p>
              <p className="text-[12px] text-gray-400 mt-1">Kosten: 50–300€ | Dauer: 1–3 Wochen</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">2. Verkehrsrechtliche Anordnung</p>
              <p className="text-[13px] text-gray-500">Bei der Straßenverkehrsbehörde. Regelt Sperrungen, Umleitungen und Halteverbotszonen.</p>
              <p className="text-[12px] text-gray-400 mt-1">Kosten: 50–200€ | Dauer: 1–2 Wochen</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">3. Halteverbot einrichten</p>
              <p className="text-[13px] text-gray-500">Halteverbot-Schilder müssen mindestens 3 Werktage vorher aufgestellt werden. Falschparker werden kostenpflichtig abgeschleppt.</p>
              <p className="text-[12px] text-gray-400 mt-1">Kosten: 50–150€ (Schilder + Aufstellung)</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">4. Abstimmung Kranvermieter</p>
              <p className="text-[13px] text-gray-500">Viele Kranvermieter übernehmen die Antragstellung oder helfen dabei. Fragen Sie bei der Buchung.</p>
              <p className="text-[12px] text-gray-400 mt-1">Oft im Service inklusive</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/autokran-mieten" className="text-[13px] text-blue-600 hover:underline">
              Autokran-Anbieter vergleichen — viele helfen bei Genehmigungen &rarr;
            </Link>
          </div>
        </section>

        {/* Baukran */}
        <section id="baukran" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Baukran (Turmdrehkran) — besondere Vorschriften</h2>
          <p className="mb-3">
            Baukrane stehen monatelang auf der Baustelle und haben besondere Anforderungen:
          </p>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <strong className="text-gray-900">Baugenehmigung:</strong> In vielen Gemeinden ist der Baukran Teil der Baugenehmigung. Prüfen Sie Ihren Bauantrag — oft ist der Kran dort bereits genehmigt.</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <strong className="text-gray-900">Überschwenkrecht:</strong> Wenn der Ausleger über Nachbargrundstücke schwenkt, brauchen Sie deren schriftliche Zustimmung oder eine behördliche Überschwenkgenehmigung.</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <strong className="text-gray-900">Luftfahrtbehörde:</strong> Bei Kranhöhen über 100m (oder in Flughafennähe ab geringerer Höhe) muss die Luftfahrtbehörde informiert werden. Der Kran braucht dann eine Tageslichtkennzeichnung (rot-weiß).</li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <strong className="text-gray-900">Prüfung:</strong> Baukrane müssen vor Inbetriebnahme von einem Sachverständigen geprüft werden (DGUV Vorschrift 52).</li>
          </ul>
          <div className="mt-4">
            <Link href="/baukran-mieten" className="text-[13px] text-blue-600 hover:underline">
              Baukran-Anbieter vergleichen — inkl. Montage und Prüfung &rarr;
            </Link>
          </div>
        </section>

        {/* Dokumente */}
        <section id="dokumente" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Welche Dokumente brauchen Sie?</h2>
          <p className="mb-3">Für den Antrag auf Sondernutzungserlaubnis benötigen Sie in der Regel:</p>
          <div className="border border-gray-200 rounded-lg p-4 space-y-2 text-[13px]">
            <p className="flex gap-2"><span className="text-gray-400">1.</span> <strong className="text-gray-900">Lageplan / Aufstellplan</strong> — Zeichnung mit Standort des Krans, Stützen, Schwenkbereich</p>
            <p className="flex gap-2"><span className="text-gray-400">2.</span> <strong className="text-gray-900">Verkehrszeichenplan</strong> — Skizze der geplanten Absperrung und Beschilderung</p>
            <p className="flex gap-2"><span className="text-gray-400">3.</span> <strong className="text-gray-900">Krantyp und Datenblatt</strong> — Typ, Tragkraft, Ausladung, Gesamtgewicht</p>
            <p className="flex gap-2"><span className="text-gray-400">4.</span> <strong className="text-gray-900">Zeitraum</strong> — Datum und Uhrzeit des geplanten Kraneinsatzes</p>
            <p className="flex gap-2"><span className="text-gray-400">5.</span> <strong className="text-gray-900">Haftpflichtversicherung</strong> — Nachweis einer gültigen Betriebshaftpflicht</p>
          </div>
          <p className="text-[12px] text-gray-400 mt-2">
            Tipp: Ihr Kranvermieter hat diese Unterlagen in der Regel vorliegen und kann sie Ihnen zur Verfügung stellen.
          </p>
        </section>

        {/* Kosten */}
        <section id="kosten" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet die Genehmigung?</h2>
          <div className="space-y-3 text-[13px]">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Sondernutzungserlaubnis</span>
              <span className="font-medium text-gray-900">50–300€</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Verkehrsrechtliche Anordnung</span>
              <span className="font-medium text-gray-900">50–200€</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Halteverbot-Schilder (Aufstellung + Abbau)</span>
              <span className="font-medium text-gray-900">50–150€</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span>Überschwenkgenehmigung (Baukran)</span>
              <span className="font-medium text-gray-900">50–200€</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-900">Gesamt (typisch)</span>
              <span className="font-semibold text-gray-900">150–500€</span>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Gebühren variieren je nach Stadt. Großstädte sind tendenziell teurer.
            Nicht enthalten: Kosten für eventuelle Polizeibegleitung bei Schwertransporten.
          </p>
        </section>

        {/* Ansprechpartner */}
        <section id="ansprechpartner" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Ansprechpartner &amp; Behörden</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Ordnungsamt / Straßenbauamt</p>
              <p className="text-[13px] text-gray-500">Sondernutzungserlaubnis für Aufstellung auf öffentlichem Grund</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Straßenverkehrsbehörde</p>
              <p className="text-[13px] text-gray-500">Verkehrsrechtliche Anordnung, Halteverbotszonen, Umleitungen</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Bauordnungsamt</p>
              <p className="text-[13px] text-gray-500">Bei Baukranen: Baugenehmigung, Standsicherheitsnachweis</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1">Netzbetreiber (Strom/Gas)</p>
              <p className="text-[13px] text-gray-500">Bei Kraneinsatz in Nähe von Leitungen: Abstimmung Sicherheitsabstände</p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500 mt-4">
            <strong className="text-gray-900">Tipp:</strong> Rufen Sie zuerst beim Ordnungsamt Ihrer Stadt an —
            die Mitarbeiter können Ihnen sagen, welche Genehmigungen Sie konkret brauchen und wo Sie diese beantragen.
            In den meisten Fällen reicht ein Telefonat und ein Formular.
          </p>
        </section>
      </div>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      {/* CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kranvermieter finden, die bei Genehmigungen helfen
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Viele der {anbieterCount}+ Kranvermieter auf KranVergleich.de unterstützen Sie bei der
          Antragstellung oder übernehmen die Genehmigung komplett. Fragen Sie einfach bei der Anfrage danach.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt {anbieterCount}+ Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos & unverbindlich.</p>
      </section>
    </div>
  )
}
