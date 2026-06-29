import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'
import { BRAND_NAME } from '@/lib/country'

export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Kran für Renovierung & Sanierung mieten: Typen & Kosten 2026' },
  description:
    'Kran für die Sanierung mieten: Dachstuhl, Wärmepumpe aufs Dach, Lasten über das Haus. Welcher Kran, was er kostet und worauf Sie im Bestand achten.',
  alternates: { canonical: '/ratgeber/kran-renovierung-sanierung' },
}

const faqs = [
  {
    question: 'Welcher Kran für die Dachsanierung?',
    answer: 'Für Ziegel und Material reicht ein Dachdeckerkran (bis 2 t, ab 200 Euro pro Tag, ohne Kranführer). Für einen kompletten Dachstuhl ist ein Autokran die bessere Wahl.',
  },
  {
    question: 'Wie hebe ich eine Wärmepumpe aufs Dach?',
    answer: 'Mit einem Autokran in einem einzigen Einsatz, ab 500 Euro pro Tag inklusive Kranführer. Geben Sie Gewicht, Hubhöhe und die Zufahrt an, dann kann der Anbieter die passende Kranklasse wählen.',
  },
  {
    question: 'Was kostet ein Kran für die Renovierung?',
    answer: 'Ein Dachdeckerkran beginnt bei 200 Euro, ein Autokran bei 500 Euro pro Tag. Da viele Einsätze nur wenige Stunden dauern, zählt die Mindestmiete von vier Stunden.',
  },
  {
    question: 'Kann ein Kran eine Last über das Haus in den Garten heben?',
    answer: 'Ein Autokran oder Mobilkran hebt die Last über den First in den Hinterhof. Voraussetzung ist, dass der Kran sicher steht und das Überschwenken des Nachbargrundstücks geklärt ist.',
  },
]

export default async function KranRenovierungPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran für Renovierung &amp; Sanierung</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran für Renovierung und Sanierung mieten: welcher Kran, welche Kosten?
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Ob neuer Dachstuhl, Wärmepumpe aufs Dach oder eine schwere Last in den Hinterhof: Bei der
        Sanierung im Bestand kommt der Kran punktuell zum Einsatz. Welcher Krantyp passt, was er
        kostet und worauf Sie bei bestehenden Gebäuden achten.
      </p>
      <p className="text-[11px] text-gray-300 mb-6">Stand: Juni 2026</p>

      {/* Kurzantwort (AEO) */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-8">
        <p className="text-[13px] font-medium text-gray-900 mb-1">Kurzantwort</p>
        <p className="text-[14px] text-gray-600 leading-relaxed">
          Bei einer Renovierung oder Sanierung kommt der Kran meist punktuell zum Einsatz, etwa um
          einen neuen Dachstuhl zu setzen, eine Wärmepumpe aufs Dach zu heben oder eine schwere Last
          in den Hinterhof zu bringen. Für die meisten Aufgaben reicht ein Autokran ab 500 Euro pro
          Tag, bei Dacharbeiten ein Dachdeckerkran ab 200 Euro pro Tag. Anders als beim Neubau steht
          selten ein Baukran, weil die Einsätze kurz und einzeln sind.
        </p>
      </div>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#anlaesse" className="text-[13px] text-blue-600 hover:underline">Wann brauchen Sie einen Kran?</a></li>
          <li><a href="#welcher" className="text-[13px] text-blue-600 hover:underline">Welcher Kran für welche Aufgabe?</a></li>
          <li><a href="#kosten" className="text-[13px] text-blue-600 hover:underline">Was kostet es?</a></li>
          <li><a href="#bestand" className="text-[13px] text-blue-600 hover:underline">Worauf im Bestand achten?</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        <section id="anlaesse" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Wann brauchen Sie bei einer Sanierung einen Kran?</h2>
          <p className="mb-3">
            Im Bestand wird der Kran fast immer für einen einzelnen, schweren Hebevorgang gebraucht,
            nicht für die gesamte Bauzeit. Typische Anlässe:
          </p>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <span><strong className="text-gray-900">Dachsanierung:</strong> neuer Dachstuhl, Ziegel und Material aufs Dach, Gauben, Dachfenster</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <span><strong className="text-gray-900">Haustechnik:</strong> Wärmepumpe, Klima- oder Lüftungsgerät, Heizkessel oder Tank, oft aufs Dach oder über das Haus</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <span><strong className="text-gray-900">Fassade und Fenster:</strong> große Glaselemente und schwere Fassadenplatten</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <span><strong className="text-gray-900">Garten und Außenanlage:</strong> Bäume, Gartenhaus, <Link href="/ratgeber/pool-kran-mieten" className="text-blue-600 hover:underline">Pool</Link> oder schwere Pflanzkübel</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <span><strong className="text-gray-900">Last über das Haus:</strong> Wenn keine Zufahrt zum Hinterhof führt, hebt der Kran die Last über den First</span></li>
          </ul>
        </section>

        <section id="welcher" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Welcher Kran für welche Sanierungsaufgabe?</h2>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-3 font-medium text-gray-900">Aufgabe</th>
                  <th className="py-3 px-3 font-medium text-gray-900">Passender Kran</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">ab</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 align-top">
                <tr className="border-b">
                  <td className="py-3 px-3">Dachstuhl, Material aufs Dach</td>
                  <td className="py-3 px-3">Dachdeckerkran, bei schweren Teilen Autokran</td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium text-gray-900">200 € / 500 €</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-3 px-3">Wärmepumpe, Klima, Lüftung aufs Dach</td>
                  <td className="py-3 px-3">Autokran</td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium text-gray-900">500 €</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-3">Schwere Last über das Haus in den Garten</td>
                  <td className="py-3 px-3">Autokran oder Mobilkran</td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium text-gray-900">500 € / 600 €</td>
                </tr>
                <tr className="last:border-0 bg-gray-50/50">
                  <td className="py-3 px-3">Glas- und Fassadenmontage, enge Innenräume</td>
                  <td className="py-3 px-3">Minikran</td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium text-gray-900">250 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/dachdeckerkran-mieten" className="text-[13px] text-blue-600 hover:underline">Dachdeckerkran vergleichen</Link>
            <Link href="/autokran-mieten" className="text-[13px] text-blue-600 hover:underline">Autokran vergleichen</Link>
            <Link href="/minikran-mieten" className="text-[13px] text-blue-600 hover:underline">Minikran vergleichen</Link>
          </div>
        </section>

        <section id="kosten" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Was kostet ein Kran bei der Sanierung?</h2>
          <p>
            Weil die meisten Sanierungseinsätze punktuell sind, zahlen Sie oft nur für wenige
            Stunden. Die Mindestmiete liegt allerdings fast immer bei vier Stunden. Ein
            Dachdeckerkran beginnt bei 200 Euro am Tag und kommt ohne Kranführer aus, den bedienen
            Sie nach kurzer Einweisung selbst. Ein Autokran liegt ab 500 Euro inklusive Kranführer.
            Die An- und Abfahrt rechnet der Anbieter meist getrennt ab.
          </p>
        </section>

        <section id="bestand" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Worauf Sie im Bestand achten sollten</h2>
          <p className="mb-3">
            Bei bestehenden Gebäuden ist die Umgebung enger als auf einem freien Baugrundstück.
            Drei Punkte entscheiden über Machbarkeit und Preis:
          </p>
          <ul className="space-y-2 text-[13px]">
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <span><strong className="text-gray-900">Zufahrt:</strong> Im Altbauviertel oder Hinterhof ist der Platz oft knapp. Je weiter der Kran von der Last weg stehen muss, desto größer und teurer wird er.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <span><strong className="text-gray-900">Überschwenken:</strong> Schwenkt der Ausleger über das Nachbargrundstück, brauchen Sie dessen Zustimmung. Klären Sie das vorab. <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-blue-600 hover:underline">Mehr zur Genehmigung</Link></span></li>
            <li className="flex gap-2"><span className="text-gray-400 shrink-0">&bull;</span> <span><strong className="text-gray-900">Aufstellfläche:</strong> Der Untergrund muss die Last tragen. Steht der Kran auf Gehweg oder Straße, brauchen Sie eine Sondernutzungserlaubnis.</span></li>
          </ul>
          {/* TODO Aus-der-Praxis-Zitat (Klarname + Firma + Link) hier einsetzen, sobald
              schriftliche Veroeffentlichungs-Zustimmung vorliegt. Siehe memory feedback-expert-quote-consent. */}
        </section>
      </div>

      {/* FAQ */}
      <div id="faq" className="mt-10 scroll-mt-20">
        <FAQSection faqs={faqs} craneTypeName="Kran" />
      </div>

      {/* CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-lg p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kran für Ihre Sanierung finden
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-xl mx-auto">
          Beschreiben Sie Ihren Hebevorgang einmal und fragen Sie mehrere der {anbieterCount}+
          Kranvermieter auf {BRAND_NAME} gleichzeitig an. Kostenlos und unverbindlich.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt {anbieterCount}+ Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Antwort meist innerhalb von 24 Stunden.</p>
      </section>
    </div>
  )
}
