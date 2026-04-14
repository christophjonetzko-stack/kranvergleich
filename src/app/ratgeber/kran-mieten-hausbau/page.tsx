import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kran mieten für den Hausbau: Welcher Kran wann? | Einfamilienhaus 2026',
  description:
    'Hausbau-Guide für Bauherren: Welcher Kran für welche Bauphase (Rohbau, Dachstuhl, Dacheindeckung)? Kostenbeispiel für ein typisches Einfamilienhaus, Timing und Genehmigungen.',
  alternates: { canonical: '/ratgeber/kran-mieten-hausbau' },
  openGraph: {
    title: 'Kran mieten für den Hausbau: Welcher Kran wann? | Einfamilienhaus 2026',
    description:
      'Hausbau-Guide für Bauherren: Welcher Kran für welche Bauphase? Kostenbeispiel für ein typisches Einfamilienhaus, Timing und Genehmigungen.',
    type: 'article',
    url: '/ratgeber/kran-mieten-hausbau',
  },
}

const faqs = [
  {
    question: 'Welcher Kran für den Hausbau?',
    answer:
      'Für die meisten Einfamilienhäuser reicht ein Autokran (30–50 t) für punktuelle Einsätze bei Rohbau und Dachstuhl — kombiniert mit einem Dachdeckerkran für die Dacheindeckung. Ein Baukran (Turmdrehkran) lohnt sich erst ab einer Bauzeit von 6 Monaten oder bei mehrstöckigen Projekten mit täglichen Hebearbeiten. Für den Innenausbau (Kamin, Treppen, Glasmontage) kann zusätzlich ein Minikran sinnvoll sein.',
  },
  {
    question: 'Was kostet ein Kran für ein Einfamilienhaus?',
    answer:
      'Für ein typisches Einfamilienhaus (150 m², 2 Vollgeschosse, 8 Monate Bauzeit) liegen die Gesamt-Krankosten bei 6.000–12.000€ — verteilt auf 6–10 Autokran-Einsätze (Rohbau, Dachstuhl) und eine Wochenmiete Dachdeckerkran (Dacheindeckung). Die Alternative mit einem Schnellmontage-Baukran über 6 Monate kostet rund 30.000–35.000€ und lohnt sich nur bei sehr aktiven Baustellen mit mehreren Hebearbeiten pro Woche.',
  },
  {
    question: 'Brauche ich einen Baukran für mein Einfamilienhaus?',
    answer:
      'In der Regel nein. Für ein Standard-Einfamilienhaus mit 8–10 Monaten Bauzeit ist ein Baukran (Turmdrehkran) meist 3–5× teurer als die Kombination aus Autokran-Einsätzen und Dachdeckerkran. Ein Baukran rechnet sich erst, wenn Sie mehrere Hebearbeiten pro Woche brauchen (z. B. Mehrfamilienhaus, Gewerbebau), wenn die Bauzeit über 6 Monate geht und Materiallogistik über die gesamte Baustelle nötig ist, oder wenn der Autokran aus Platzgründen nicht mehr reicht.',
  },
  {
    question: 'Wann muss ich einen Kran für den Hausbau bestellen?',
    answer:
      'Die Vorlaufzeiten variieren stark je nach Krantyp: Autokran (30–50 t) 1–2 Wochen, in der Hochsaison (März–Oktober) 3–4 Wochen. Der Dachstuhl-Einsatz sollte bereits 4 Wochen im Voraus gebucht werden — dies ist der kritischste Einzeltermin des Rohbaus. Baukrane (Schnellmontage) brauchen 4–6 Wochen Vorlauf, in der Hochsaison bis zu 10 Wochen. Dachdeckerkrane sind kurzfristig verfügbar (3–7 Tage). Genehmigungen (Sondernutzung, Überschwenk) beantragen Sie 2–4 Wochen vor dem ersten Einsatz.',
  },
  {
    question: 'Welche Genehmigungen brauche ich für einen Kran beim Hausbau?',
    answer:
      'Der Kranstandort sollte idealerweise schon im Bauantrag eingezeichnet sein — dann ist er Teil der Baugenehmigung. Zusätzlich brauchen Sie eine Sondernutzungserlaubnis (50–300€), wenn der Kran auf öffentlichem Straßenraum oder Gehweg steht, eine Überschwenkgenehmigung (mit schriftlicher Nachbarzustimmung), wenn der Ausleger über ein Nachbargrundstück schwenkt, und bei Baukranen zusätzlich einen Statiknachweis für das Fundament (500–2.000€). Bei reinen Autokran-Einsätzen auf eigenem Grundstück sind meist keine Extra-Genehmigungen nötig.',
  },
  {
    question: 'Kann ein Autokran einen kompletten Hausbau übernehmen?',
    answer:
      'Ja, für die meisten Einfamilienhäuser reichen Autokran-Einsätze aus. Planen Sie 6–10 Termine über die Bauzeit verteilt: Rohbau Keller (1–2 Einsätze), Erdgeschoss (3 Einsätze für Decken und Fertigteile), Obergeschoss (2 Einsätze), Dachstuhl (1–2 Tage). Für die anschließende Dacheindeckung (Ziegel, Dämmung, Solar) ist allerdings ein Dachdeckerkran deutlich günstiger — er lässt sich ohne Kranführer bedienen und spart 60–70% gegenüber einem Autokran-Einsatz.',
  },
]

export default async function KranMietenHausbauPage() {
  const { anbieterCount } = await getSiteStats()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran für den Hausbau</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran mieten für den Hausbau: Welcher Kran für welche Bauphase?
        <span className="block text-gray-500 text-[18px] lg:text-xl font-normal mt-1">
          Einfamilienhaus-Guide 2026
        </span>
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Für ein typisches Einfamilienhaus reichen meist 6–10 Autokran-Einsätze plus ein
        Dachdeckerkran für die Dacheindeckung — Gesamtkosten rund{' '}
        <strong className="text-gray-900">6.000–12.000€</strong>. Ein Baukran (Turmdrehkran)
        ist für Standard-EFH meist 3–5× teurer und lohnt sich erst bei längerer Bauzeit oder
        mehrstöckigen Projekten. Dieser Guide zeigt Ihnen als Bauherr, welcher Kran in welcher
        Bauphase sinnvoll ist, was das kostet und wann Sie ihn bestellen müssen.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026 · Alle Preise netto, Richtwerte</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          <li><a href="#ueberblick" className="text-[13px] text-blue-600 hover:underline">1. Überblick: Kran-Bedarf nach Bauphase</a></li>
          <li><a href="#rohbau" className="text-[13px] text-blue-600 hover:underline">2. Rohbau: Autokran für Decken & Fertigteile</a></li>
          <li><a href="#dachstuhl" className="text-[13px] text-blue-600 hover:underline">3. Dachstuhl: Der Klassiker für den Autokran</a></li>
          <li><a href="#entscheidung" className="text-[13px] text-blue-600 hover:underline">4. Autokran oder Baukran? Die Entscheidung</a></li>
          <li><a href="#kostenbeispiel" className="text-[13px] text-blue-600 hover:underline">5. Kostenbeispiel: Typisches Einfamilienhaus</a></li>
          <li><a href="#timing" className="text-[13px] text-blue-600 hover:underline">6. Timing: Wann welchen Kran bestellen</a></li>
          <li><a href="#genehmigungen" className="text-[13px] text-blue-600 hover:underline">7. Genehmigungen für Bauherren</a></li>
          <li><a href="#tipps" className="text-[13px] text-blue-600 hover:underline">8. 5 Tipps für Bauherren</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">9. Häufige Fragen</a></li>
        </ul>
      </nav>

      <div className="space-y-10 text-[14px] text-gray-600 leading-relaxed">

        {/* Section 1: Überblick */}
        <section id="ueberblick" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            1. Überblick: Kran-Bedarf nach Bauphase
          </h2>
          <p className="mb-4">
            Ein Einfamilienhaus-Bau besteht aus mehreren Phasen — und nicht in jeder brauchen
            Sie einen Kran. Die folgende Tabelle zeigt, welcher Krantyp in welcher Phase typisch
            eingesetzt wird und mit welchen Kosten Sie rechnen müssen:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Bauphase</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Typischer Krantyp</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Häufigkeit</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Kostenbereich</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Aushub / Fundament</td>
                  <td className="py-2.5 px-4 text-gray-400">kein Kran (Bagger)</td>
                  <td className="py-2.5 px-4">—</td>
                  <td className="py-2.5 px-4 whitespace-nowrap text-gray-400">0€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Rohbau Keller</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 30t</Link></td>
                  <td className="py-2.5 px-4">1–2 Einsätze</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1.000–1.800€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Rohbau Erdgeschoss</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 30–50t</Link></td>
                  <td className="py-2.5 px-4">3 Einsätze</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1.800–3.000€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Rohbau Obergeschoss</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 30–50t</Link></td>
                  <td className="py-2.5 px-4">2 Einsätze</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">1.200–2.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Dachstuhl-Montage</td>
                  <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran 50t</Link></td>
                  <td className="py-2.5 px-4">1–2 Tage</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">800–1.500€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Dachziegel / Solaranlagen</td>
                  <td className="py-2.5 px-4"><Link href="/dachdeckerkran-mieten" className="text-blue-600 hover:underline">Dachdeckerkran</Link></td>
                  <td className="py-2.5 px-4">3–5 Tage</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">600–1.800€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Schornstein-Aufbau</td>
                  <td className="py-2.5 px-4"><Link href="/dachdeckerkran-mieten" className="text-blue-600 hover:underline">Dachdeckerkran</Link></td>
                  <td className="py-2.5 px-4">1 Tag</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">200–350€</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Innenausbau (Spezial)</td>
                  <td className="py-2.5 px-4"><Link href="/minikran-mieten" className="text-blue-600 hover:underline">Minikran</Link> (optional)</td>
                  <td className="py-2.5 px-4">1 Tag</td>
                  <td className="py-2.5 px-4 whitespace-nowrap">250–400€</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Richtwerte für ein Einfamilienhaus mit 150 m² Wohnfläche, 2 Vollgeschossen und Standard-Dachstuhl.
            Preise netto, zzgl. MwSt.
          </p>
        </section>

        {/* Section 2: Rohbau */}
        <section id="rohbau" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            2. Rohbau: Autokran für Decken &amp; Fertigteile
          </h2>
          <p className="mb-3">
            Im Rohbau geht es vor allem um das <strong className="text-gray-900">Setzen
            von Deckenelementen, Stahlträgern und Fertigteilen</strong>. Ein Autokran mit
            30–50 Tonnen Tragkraft genügt für nahezu alle Einfamilienhaus-Projekte —
            auch bei zwei Vollgeschossen.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 mb-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Typische Lasten</p>
              <p className="text-[13px] text-gray-500">
                Decken-Fertigteile 500–2.000 kg, Stahlträger 500–1.500 kg, Fertiggaragen
                bis 8 Tonnen. Ein 30-Tonnen-Autokran deckt 90% der Rohbau-Einsätze ab.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Reichweite</p>
              <p className="text-[13px] text-gray-500">
                Ein 30t Autokran schafft ca. 20–25m Ausladung bei 500 kg Last.
                Bei schwereren Lasten sinkt die Reichweite — Tragkraftdiagramm vorher prüfen.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Einsatzdauer</p>
              <p className="text-[13px] text-gray-500">
                Meist halber Tag (4 Stunden) bis voller Tag. Mindestmietdauer 4 Stunden.
                Pro Rohbau-Etage rechnen Sie 1–3 Einsätze ein.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Planung</p>
              <p className="text-[13px] text-gray-500">
                Kran-Einsatz <strong className="text-gray-900">synchron mit Materiallieferung</strong> buchen —
                sonst zahlen Sie 80–150€/h Wartezeit. 1 Woche Vorlauf einkalkulieren.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Detaillierte Autokran-Kosten, Tragkraftklassen und Tipps:{' '}
            <Link href="/autokran-mieten#ratgeber" className="text-blue-600 hover:underline">
              Autokran mieten — Kosten im Detail &rarr;
            </Link>
          </p>
        </section>

        {/* Section 3: Dachstuhl */}
        <section id="dachstuhl" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            3. Dachstuhl: Der Klassiker für den Autokran-Einsatz
          </h2>
          <p className="mb-3">
            Die Dachstuhl-Montage ist der <strong className="text-gray-900">kritischste
            Einzeltermin</strong> im Rohbau — und gleichzeitig der klassische Autokran-Einsatz.
            Ein vorgefertigter Holz-Dachstuhl wird komplett angeliefert und in einem oder zwei
            Arbeitstagen vom Kran aufgerichtet.
          </p>
          <div className="grid gap-3 sm:grid-cols-3 text-[13px] mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-400 text-[11px] mb-1">Dachstuhl-Gewicht</p>
              <p className="font-medium text-gray-900">2–5 Tonnen (komplett)</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-400 text-[11px] mb-1">Benötigter Krantyp</p>
              <p className="font-medium text-gray-900">Autokran 30–50t</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-400 text-[11px] mb-1">Einsatzdauer</p>
              <p className="font-medium text-gray-900">1–2 Tage</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-400 text-[11px] mb-1">Tageskosten</p>
              <p className="font-medium text-gray-900">500–1.500€</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-400 text-[11px] mb-1">Vorlauf buchen</p>
              <p className="font-medium text-gray-900">2–4 Wochen</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-400 text-[11px] mb-1">Startzeit</p>
              <p className="font-medium text-gray-900">meist 6–7 Uhr morgens</p>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Wichtig:</strong> Koordinieren Sie den Dachstuhl-Termin eng mit dem
              Zimmerer. Die meisten Zimmerer-Betriebe beginnen um 6–7 Uhr morgens, damit der
              komplette Dachstuhl an einem Tag stehen kann. Buchen Sie den Autokran rechtzeitig
              und planen Sie einen Reservetag für schlechtes Wetter ein.
            </p>
          </div>
        </section>

        {/* Section 4: Decision tree */}
        <section id="entscheidung" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            4. Autokran oder Baukran? Die Entscheidung
          </h2>
          <p className="mb-4">
            Die wichtigste Frage für Bauherren: Lohnt sich ein fest installierter Baukran
            (Turmdrehkran) oder reichen mehrere Autokran-Einsätze? Die Entscheidung hängt
            fast ausschließlich von <strong className="text-gray-900">Bauzeit und
            Einsatzfrequenz</strong> ab:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Bauzeit / Szenario</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Empfehlung</th>
                  <th className="py-3 px-4 font-medium text-gray-900">Begründung</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">&lt; 3 Monate</td>
                  <td className="py-2.5 px-4 text-green-700 font-medium">Autokran-Einsätze</td>
                  <td className="py-2.5 px-4 text-gray-500">Typisch für kleine EFH. 4–8 Einsätze × 500–1.500€ = 2.000–12.000€</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">3–6 Monate</td>
                  <td className="py-2.5 px-4 text-amber-700 font-medium">Kommt darauf an</td>
                  <td className="py-2.5 px-4 text-gray-500">Autokran wenn &lt;15 Hebearbeiten, Schnellmontage-Baukran bei &gt;15</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">6–12 Monate, mehrstöckig</td>
                  <td className="py-2.5 px-4 text-blue-700 font-medium">Schnellmontage-Baukran</td>
                  <td className="py-2.5 px-4 text-gray-500">Monatsmiete 4.000–8.000€ + 3.000–5.000€ Montage</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">&gt; 12 Monate, Großprojekt</td>
                  <td className="py-2.5 px-4 text-blue-700 font-medium">Großer Obendreher</td>
                  <td className="py-2.5 px-4 text-gray-500">Monatsmiete 8.000–15.000€ + 5.000–8.000€ Montage</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Faustregel:</strong> Für ein Standard-Einfamilienhaus
              mit 6–10 Monaten Bauzeit und einem Zimmerer-Team, das punktuell arbeitet, sind
              Autokran-Einsätze rund <strong className="text-gray-900">3–5× günstiger</strong> als
              ein Baukran. Ein Baukran lohnt sich erst, wenn mehrere Hebearbeiten pro Woche anfallen
              und die Baustelle eine große Grundfläche hat.
            </p>
          </div>
          <p className="text-[13px] text-gray-500 mt-3">
            Baukran-Kosten, Montagezeiten und Genehmigungen im Detail:{' '}
            <Link href="/baukran-mieten#ratgeber" className="text-blue-600 hover:underline">
              Baukran mieten — Ratgeber &rarr;
            </Link>
          </p>
        </section>

        {/* Section 5: Kostenbeispiel */}
        <section id="kostenbeispiel" className="scroll-mt-20 border border-gray-200 rounded-lg p-5 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            5. Kostenbeispiel: Typisches Einfamilienhaus
          </h2>
          <p className="mb-4">
            Hier ein realistisches Rechenbeispiel für ein typisches Einfamilienhaus:
            150 m² Wohnfläche, 2 Vollgeschosse + ausgebautes Dachgeschoss, Massivbauweise,
            Standard-Holzdachstuhl, Bauzeit 8 Monate.
          </p>

          <h3 className="text-[14px] font-semibold text-gray-900 mb-2">
            Variante A: Autokran-Einsätze + Dachdeckerkran (empfohlen)
          </h3>
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-3 font-medium text-gray-900">Bauphase</th>
                  <th className="py-3 px-3 font-medium text-gray-900">Kran</th>
                  <th className="py-3 px-3 font-medium text-gray-900">Einsätze</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Kosten</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-3">Aushub</td>
                  <td className="py-2.5 px-3 text-gray-400">(Bagger)</td>
                  <td className="py-2.5 px-3 text-gray-400">—</td>
                  <td className="py-2.5 px-3 text-gray-400 whitespace-nowrap">0€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Rohbau Keller</td>
                  <td className="py-2.5 px-3">Autokran 30t</td>
                  <td className="py-2.5 px-3">2 Tage</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.000–1.600€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Rohbau Erdgeschoss</td>
                  <td className="py-2.5 px-3">Autokran 30–50t</td>
                  <td className="py-2.5 px-3">3 Tage</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.800–3.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Rohbau Obergeschoss</td>
                  <td className="py-2.5 px-3">Autokran 30–50t</td>
                  <td className="py-2.5 px-3">2 Tage</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.200–2.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Dachstuhl-Montage</td>
                  <td className="py-2.5 px-3">Autokran 50t</td>
                  <td className="py-2.5 px-3">1–2 Tage</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">800–3.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Dacheindeckung</td>
                  <td className="py-2.5 px-3">Dachdeckerkran</td>
                  <td className="py-2.5 px-3">5 Tage (Wochenmiete)</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.000–2.500€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Schornstein</td>
                  <td className="py-2.5 px-3">Dachdeckerkran</td>
                  <td className="py-2.5 px-3">1 Tag</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">200–350€</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Innenausbau (Kamin)</td>
                  <td className="py-2.5 px-3">Minikran</td>
                  <td className="py-2.5 px-3">1 Tag (optional)</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">250–400€</td>
                </tr>
                <tr className="border-t-2 border-gray-300 bg-green-50/60">
                  <td className="py-3 px-3 font-semibold text-gray-900" colSpan={3}>Gesamt Variante A</td>
                  <td className="py-3 px-3 font-semibold text-green-700 whitespace-nowrap">ca. 6.250–12.850€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-[14px] font-semibold text-gray-900 mb-2">
            Variante B: Schnellmontage-Baukran über 6 Monate (Alternative)
          </h3>
          <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-3 font-medium text-gray-900">Position</th>
                  <th className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">Kosten</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-3">Schnellmontage-Baukran, 6 Monate × 4.500€/Monat</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">27.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Montage / Demontage</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">4.000€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Kranfundament</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.500€</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-3">Transport zur Baustelle</td>
                  <td className="py-2.5 px-3 whitespace-nowrap">1.000€</td>
                </tr>
                <tr className="border-t-2 border-gray-300 bg-red-50/60">
                  <td className="py-3 px-3 font-semibold text-gray-900">Gesamt Variante B</td>
                  <td className="py-3 px-3 font-semibold text-red-700 whitespace-nowrap">ca. 33.500€</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-[13px] text-gray-700">
              <strong className="text-gray-900">Fazit:</strong> Variante A (Autokran + Dachdeckerkran)
              ist für ein Standard-Einfamilienhaus rund <strong className="text-gray-900">3–5× günstiger</strong>
              {' '}als Variante B (Baukran). Variante B lohnt sich erst bei Mehrfamilienhäusern,
              längeren Bauzeiten oder wenn die Baustelle mehrere Hebearbeiten pro Woche erfordert.
            </p>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Preise sind Richtwerte basierend auf Marktrecherche Q1 2026.{' '}
            <Link href="/kran-mieten-preise" className="text-blue-600 hover:underline">
              Aktuelle Mietpreise aller Krantypen &rarr;
            </Link>
          </p>
        </section>

        {/* Section 6: Timing */}
        <section id="timing" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            6. Timing: Wann welchen Kran bestellen?
          </h2>
          <p className="mb-4">
            Die Vorlaufzeiten variieren stark — zwischen wenigen Tagen (Dachdeckerkran)
            und mehreren Monaten (große Baukrane). In der Hochsaison (März–Oktober) verdoppelt
            sich der Vorlauf oft. Planen Sie rückwärts vom Einsatzdatum:
          </p>
          <div className="overflow-x-auto border border-gray-200 rounded-lg mb-4">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-gray-50 border-b text-left">
                  <th className="py-3 px-4 font-medium text-gray-900">Krantyp</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Vorlauf Standard</th>
                  <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Hochsaison (Mär–Okt)</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Autokran 30–50t</td>
                  <td className="py-2.5 px-4">1–2 Wochen</td>
                  <td className="py-2.5 px-4">3–4 Wochen</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Autokran 80t+</td>
                  <td className="py-2.5 px-4">2–4 Wochen</td>
                  <td className="py-2.5 px-4">4–6 Wochen</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Schnellmontage-Baukran</td>
                  <td className="py-2.5 px-4">4–6 Wochen</td>
                  <td className="py-2.5 px-4">6–10 Wochen</td>
                </tr>
                <tr className="border-b bg-gray-50/50">
                  <td className="py-2.5 px-4 font-medium text-gray-900">Dachdeckerkran</td>
                  <td className="py-2.5 px-4">3–7 Tage</td>
                  <td className="py-2.5 px-4">1–2 Wochen</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-medium text-gray-900">Minikran</td>
                  <td className="py-2.5 px-4">3–7 Tage</td>
                  <td className="py-2.5 px-4">1–2 Wochen</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
            <p className="text-[13px] text-amber-800">
              <strong>Bauherr-Tipp:</strong> Der <strong>Dachstuhl-Termin</strong> ist der
              kritischste Einzeltermin — er hängt vom Zimmerer ab und ist oft monatelang
              ausgebucht. Buchen Sie den Autokran dafür 4 Wochen im Voraus, in der Hochsaison
              sogar 6 Wochen. Verzögert sich der Dachstuhl, rufen Sie beim Kranvermieter sofort an,
              um den Termin zu verschieben — kurzfristige Stornierungen kosten oft 30–50% der Miete.
            </p>
          </div>
        </section>

        {/* Section 7: Genehmigungen */}
        <section id="genehmigungen" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            7. Genehmigungen: Was Sie als Bauherr brauchen
          </h2>
          <p className="mb-4">
            Die meisten Kran-Einsätze auf dem eigenen Grundstück benötigen keine separaten
            Genehmigungen — der Kranstandort ist Teil der Baugenehmigung. Sobald der Kran
            aber öffentliche Flächen oder Nachbargrundstücke berührt, wird es komplizierter:
          </p>
          <div className="space-y-3 mb-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Baugenehmigung (meist inklusive)</p>
              <p className="text-[13px] text-gray-500">
                Der Kranstandort sollte bereits im Bauantrag eingezeichnet sein — dann ist er
                Teil der Baugenehmigung und Sie brauchen keinen separaten Antrag. Prüfen Sie
                Ihre Baugenehmigung auf Kranposition und Ausleger-Schwenkbereich.
              </p>
              <p className="text-[11px] text-gray-400 mt-1">Kosten: im Bauantrag enthalten · Bearbeitungszeit: im Bauantrag</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Sondernutzungserlaubnis (bei öffentlichem Grund)</p>
              <p className="text-[13px] text-gray-500">
                Erforderlich, wenn der Kran oder seine Abstützungen auf öffentlichem Straßenraum,
                Gehweg oder Parkfläche stehen. Antrag beim Ordnungsamt der Gemeinde. Bei einmaligen
                Einsätzen oft kurzfristig möglich, bei Baukranen über mehrere Wochen früher beantragen.
              </p>
              <p className="text-[11px] text-gray-400 mt-1">Kosten: 50–300€ · Bearbeitungszeit: 1–3 Wochen</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Überschwenkgenehmigung (bei Nachbargrundstück)</p>
              <p className="text-[13px] text-gray-500">
                Wenn der Kranausleger über Nachbargrundstücke schwenkt, brauchen Sie deren
                schriftliche Zustimmung — auch wenn nur Luft überschwenkt wird. Sprechen Sie
                Nachbarn früh an, am besten bevor Sie mit dem Bau beginnen.
              </p>
              <p className="text-[11px] text-gray-400 mt-1">Kosten: 50–200€ bei Behörde · Bearbeitungszeit: 2–4 Wochen</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-900 mb-1 text-[14px]">Statiknachweis (nur bei Baukran)</p>
              <p className="text-[13px] text-gray-500">
                Für das Kranfundament eines Baukrans brauchen Sie einen statischen Nachweis
                vom Statiker. Bei reinen Autokran-Einsätzen nicht nötig, da Autokrane nur
                temporär mit ihren Abstützungen stehen.
              </p>
              <p className="text-[11px] text-gray-400 mt-1">Kosten: 500–2.000€ · Bearbeitungszeit: 1–3 Wochen</p>
            </div>
          </div>
          <p className="text-[13px] text-gray-500">
            Ausführliche Anleitung zu allen Genehmigungen:{' '}
            <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-blue-600 hover:underline">
              Kran aufstellen: Genehmigungen im Detail &rarr;
            </Link>
          </p>
        </section>

        {/* Section 8: 5 Tipps */}
        <section id="tipps" className="scroll-mt-20 border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            8. 5 Tipps für Bauherren
          </h2>
          <ol className="space-y-3 text-[14px]">
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">1</span>
              <div>
                <p className="font-medium text-gray-900">Kran-Einsätze parallel zu Materiallieferungen planen</p>
                <p className="text-[13px] text-gray-500">
                  Je besser Kran und Material koordiniert sind, desto weniger Wartezeit fällt an.
                  Jede Wartestunde beim Autokran kostet 80–150€ — das summiert sich schnell.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">2</span>
              <div>
                <p className="font-medium text-gray-900">Einsätze kombinieren</p>
                <p className="text-[13px] text-gray-500">
                  Planen Sie Betondecken-Fertigteile, Stahlträger und Fertiggaragen nach
                  Möglichkeit auf einen Autokran-Tag zusammen. Ein Tagessatz ist günstiger
                  als zwei halbe Tage.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">3</span>
              <div>
                <p className="font-medium text-gray-900">Dachstuhl-Termin 4+ Wochen im Voraus reservieren</p>
                <p className="text-[13px] text-gray-500">
                  Der Dachstuhl ist der kritischste Einzeltermin — in der Hochsaison sind
                  Zimmerer und Autokran oft monatelang ausgebucht. 4–6 Wochen Vorlauf einplanen.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">4</span>
              <div>
                <p className="font-medium text-gray-900">3+ Angebote pro Einsatz einholen</p>
                <p className="text-[13px] text-gray-500">
                  Preisunterschiede zwischen Kranvermietern liegen regional bei 20–40%.
                  Nutzen Sie unsere kostenlose Sammelanfrage, um mehrere Anbieter gleichzeitig
                  zu vergleichen.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-[12px] font-semibold">5</span>
              <div>
                <p className="font-medium text-gray-900">Jeden Einsatz dokumentieren</p>
                <p className="text-[13px] text-gray-500">
                  Tagesberichte, Fotos und Lieferscheine sammeln — für Ihre Bauherrenabrechnung
                  und im Falle späterer Gewährleistungsfragen. Ein einfaches Bautagebuch reicht.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Section 9: FAQ */}
        <section id="faq" className="scroll-mt-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            9. Häufige Fragen von Bauherren
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-[14px] font-medium text-gray-900 select-none">
                  {faq.question}
                  <svg className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                </summary>
                <p className="px-5 pb-4 text-[14px] text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

      </div>

      {/* Section 10: CTA */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-xl p-6 sm:p-8 text-center mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Angebote für Ihren Hausbau einholen
        </h2>
        <p className="text-[14px] text-gray-500 mb-5 max-w-lg mx-auto">
          Vergleichen Sie {anbieterCount}+ Kranvermieter in ganz Deutschland für jeden Bauabschnitt —
          Autokran für Rohbau &amp; Dachstuhl, Dachdeckerkran für die Dacheindeckung.
          Kostenlos Angebote bei mehreren Anbietern gleichzeitig anfragen.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          <Link href="/autokran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Autokran mieten</Link>
          <Link href="/baukran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Baukran mieten</Link>
          <Link href="/dachdeckerkran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Dachdeckerkran mieten</Link>
          <Link href="/minikran-mieten" className="text-[12px] bg-white border border-gray-200 hover:border-blue-300 text-gray-700 rounded-full px-3 py-1 transition-colors">Minikran mieten</Link>
        </div>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-semibold rounded-md transition-colors"
        >
          Jetzt {anbieterCount}+ Anbieter vergleichen
        </Link>
        <p className="text-[12px] text-gray-400 mt-3">Kostenlos &amp; unverbindlich.</p>
      </section>

      {/* Weiterführende Ratgeber */}
      <section className="mt-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Weiterführende Ratgeber</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/kran-mieten-preise" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Mietpreise aller Krantypen</Link>
          <Link href="/kran-mieten-preise#tragkraft" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Preise nach Tragkraft (30t–500t)</Link>
          <Link href="/kran-mieten-preise#kranfuehrer" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran mit Fahrer — Kosten</Link>
          <Link href="/ratgeber/kran-aufstellen-genehmigung" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran-Genehmigungen</Link>
          <Link href="/ratgeber/krantypen" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Alle Krantypen im Vergleich</Link>
          <Link href="/ratgeber/welchen-kran-brauche-ich" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Welchen Kran brauche ich?</Link>
          <Link href="/ratgeber/was-kostet-ein-kran" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kran kaufen oder mieten?</Link>
          <Link href="/kostenrechner" className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1 transition-colors">Kostenrechner</Link>
        </div>
      </section>

      {/* Structured data — FAQPage + Article + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: { '@type': 'Answer', text: faq.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Kran mieten für den Hausbau: Welcher Kran für welche Bauphase? (Einfamilienhaus-Guide 2026)',
            description:
              'Hausbau-Guide für Bauherren: Welcher Kran für welche Bauphase (Rohbau, Dachstuhl, Dacheindeckung)? Kostenbeispiel für ein typisches Einfamilienhaus, Timing und Genehmigungen.',
            author: { '@type': 'Organization', name: 'KranVergleich.de', url: 'https://kranvergleich.de' },
            datePublished: '2026-04-11',
            dateModified: '2026-04-11',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: 'https://kranvergleich.de/ratgeber' },
              { '@type': 'ListItem', position: 3, name: 'Kran für den Hausbau' },
            ],
          }),
        }}
      />
    </div>
  )
}
