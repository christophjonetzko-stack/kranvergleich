import type { Metadata } from 'next'
import Link from 'next/link'
import { PriceTable } from '@/components/price-table'
import { getCraneIcon } from '@/components/crane-icons'
import { cranePrices } from '@/data/crane-prices'
import { craneTypes } from '@/data/crane-types'
import { FAQSection } from '@/components/faq-section'
import { getSiteStats } from '@/lib/queries'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Kran mieten Preisliste 2026 — Preise & Kosten aller Krantypen',
  description:
    'Kran mieten Preisliste 2026: Baukran ab 300€/Tag, Autokran ab 500€/Tag, Minikran ab 250€/Tag, Mobilkran ab 600€/Tag, Dachdeckerkran ab 200€/Tag. Mietkran Preise, Kranmiete Kosten pro Tag/Woche/Monat — alle Preise im Vergleich.',
  alternates: { canonical: '/kran-mieten-preise' },
  openGraph: {
    title: 'Kran mieten Preisliste 2026 — Preise & Kosten aller Krantypen',
    description:
      'Kran mieten Preisliste 2026: alle Krantypen mit Tages-, Wochen- und Monatspreisen im Überblick.',
    type: 'website',
    url: '/kran-mieten-preise',
  },
}

const costFAQs = [
  {
    question: 'Was kostet ein Kran pro Tag?',
    answer:
      'Die Tagesmiete variiert je nach Krantyp: Anhängerkran ab 150€, Minikran ab 250€, Dachdeckerkran ab 200€, Baukran ab 300€, Autokran ab 500€, Mobilkran ab 600€, Raupenkran ab 800€. Alle Preise netto zzgl. MwSt. Transport und Auf-/Abbau kommen je nach Anbieter hinzu.',
  },
  {
    question: 'Was kostet ein Autokran pro Stunde?',
    answer:
      'Ein Autokran kostet ca. 150–350€ pro Stunde (inkl. Kranführer). Kleine Autokrane (30–50t) liegen bei 150–200€/h, mittlere (50–100t) bei 200–300€/h, große (100t+) bei 300–500€/h. Die Mindestmietdauer beträgt meist 4 Stunden.',
  },
  {
    question: 'Was kostet ein Kran pro Woche?',
    answer:
      'Wochenpreise bieten deutliche Rabatte gegenüber Tagespreisen: Minikran 1.200–2.800€/Woche, Autokran 2.500–10.000€/Woche, Baukran 1.500–8.000€/Woche. Bei längeren Mietzeiten lohnt es sich, nach Monatspreisen zu fragen.',
  },
  {
    question: 'Was kostet ein Kran pro Monat?',
    answer:
      'Monatsmieten sind die günstigste Option pro Tag: Minikran ab 3.500€/Monat, Autokran ab 8.000€/Monat, Baukran ab 4.000€/Monat. Baukrane werden oft für mehrere Monate gemietet — hier sind zusätzliche Rabatte üblich.',
  },
  {
    question: 'Ist der Kranführer im Preis enthalten?',
    answer:
      'Bei Autokranen, Mobilkranen und Raupenkranen ist der Kranführer in der Regel inklusive (gesetzlich vorgeschrieben). Bei Minikranen, Dachdeckerkranen, Anhängerkranen und Ladekranen bedienen Sie den Kran nach Einweisung selbst — oder buchen einen Bediener separat.',
  },
  {
    question: 'Was kostet ein Kran mit Fahrer pro Tag?',
    answer:
      'Ein Kran mit Fahrer kostet je nach Typ 500–3.000€ pro Tag — der Kranführer ist bei Autokran (ab 500€/Tag), Mobilkran (ab 600€/Tag) und Raupenkran (ab 800€/Tag) gesetzlich vorgeschrieben und im Tagespreis enthalten. Bei Baukranen wird der Turmdrehkranführer separat gebucht (50–70€/h oder 400–560€/Tag). Bei Ladekranen ist der LKW-Fahrer oft als Komplettpaket verfügbar (500–800€/Tag inkl. LKW). Minikran, Dachdeckerkran und Anhängerkran können Sie nach einer Einweisung selbst bedienen — ein separater Bediener kostet 50–80€/h oder 400–650€/Tag.',
  },
  {
    question: 'Brauche ich einen Kranführerschein zum Kran mieten?',
    answer:
      'Für die meisten Kranvermietungen brauchen Sie KEINEN Kranführerschein. Bei Autokran, Mobilkran und Raupenkran ist der zertifizierte Kranführer gesetzlich vorgeschrieben und im Mietpreis enthalten — Sie müssen nichts selbst bedienen. Bei Minikran, Dachdeckerkran und Anhängerkran reicht eine 30–60-minütige Einweisung durch den Vermieter (gemäß DGUV Vorschrift 52), Sie brauchen lediglich das Mindestalter 18 Jahre. Einen Kranführerschein (Befähigungsnachweis nach DGUV V52) benötigen Sie nur, wenn Sie einen Baukran (Turmdrehkran) selbst bedienen oder als angestellter Kranführer arbeiten möchten.',
  },
  {
    question: 'Welche Zusatzkosten gibt es beim Kran mieten?',
    answer:
      'Typische Zusatzkosten: Transport (An-/Abfahrt) 150–500€, Montage/Demontage bei Baukranen 3.000–8.000€, Genehmigungen für Straßensperrung je nach Kommune, Versicherung und Sicherheitseinrichtung. Fragen Sie immer nach einem Komplettangebot.',
  },
  {
    question: 'Wie kann ich die Kosten für die Kranmiete senken?',
    answer:
      'Tipps zur Kostenoptimierung: Mehrere Angebote vergleichen (nutzen Sie unsere kostenlose Sammelanfrage), längere Mietdauer wählen (Monatspreise sind pro Tag günstiger), den passenden Krantyp wählen (nicht zu groß), Einsatz gut planen (Wartezeiten vermeiden) und frühzeitig buchen.',
  },
  {
    question: 'Kran mieten oder kaufen — was lohnt sich?',
    answer:
      'Für die meisten Bauunternehmen lohnt sich die Miete. Ein neuer Minikran kostet 50.000–150.000€, ein Autokran 200.000–1.000.000€+. Bei weniger als 100 Einsatztagen pro Jahr ist Mieten fast immer günstiger — keine Wartungskosten, keine Lagerhaltung, keine Kapitalbindung.',
  },
  {
    question: 'Was kostet ein 30-Tonnen-Kran?',
    answer: 'Ein 30-Tonnen-Autokran kostet ca. 500–800€ pro Tag (inkl. Kranführer). Stundenpreise liegen bei 150–200€/h mit 4 Stunden Mindestmietdauer. Ideal für Baumontagen, Maschinentransport und mittelschwere Hebearbeiten. Transport zur Baustelle: ca. 150–400€ extra.',
  },
  {
    question: 'Was kostet ein 30 Tonnen Kran pro Tag?',
    answer: 'Ein 30 Tonnen Kran kostet pro Tag zwischen 500€ und 800€ netto, inklusive Kranführer (gesetzlich vorgeschrieben). Bei Wochenmiete zahlen Sie 2.500–4.000€, bei Monatsmiete 8.000–15.000€. Der 30-Tonner ist ein klassischer Autokran und der häufigste Krantyp im Hausbau, bei Dachstuhlmontagen und Maschinentransporten. Anfahrt zur Baustelle wird separat berechnet (ca. 2–4€/km, oft 150–400€ insgesamt).',
  },
  {
    question: 'Was kostet ein 80-Tonnen-Kran?',
    answer: 'Ein 80-Tonnen-Mobilkran kostet ca. 1.200–2.000€ pro Tag (inkl. Kranführer). Stundenpreise liegen bei 300–500€/h. Für Wocheneinsätze rechnen Sie mit 5.000–10.000€. Der Transport zur Baustelle kostet zusätzlich ca. 300–800€ je nach Entfernung.',
  },
  {
    question: 'Was kostet ein 80 Tonnen Kran?',
    answer: 'Ein 80 Tonnen Kran (Mobilkran oder schwerer Autokran) kostet zwischen 1.000€ und 1.500€ pro Tag inklusive Kranführer. Wochenmiete: 5.000–7.500€. Monatsmiete: 15.000–25.000€. Der 80-Tonner kommt bei Industriemontagen, Brückenteilen und schweren Stahlbauarbeiten zum Einsatz. Ab dieser Tragklasse fällt oft Schwertransport zur Baustelle an (1.000–3.000€ extra). Stundenweise Abrechnung möglich (ca. 250–400€/h, Mindestmietdauer 4h).',
  },
  {
    question: 'Was kostet ein PKW-Anhänger mit Kran (Anhängerkran)?',
    answer: 'Ein Anhängerkran (PKW-Anhänger mit Kran) kostet ab 150€ pro Tag. Wochenmiete ab 700€. Tragkraft bis 1.500 kg. Kann mit normaler PKW-Anhängerkupplung transportiert werden — kein Führerschein für den Kran nötig, nur Einweisung.',
  },
  {
    question: 'Was kostet es, einen Kran zu mieten?',
    answer: 'Die Kranmiete kostet je nach Typ zwischen 150€ und 5.000€ pro Tag (netto). Der günstigste Kran zum Leihen ist der Anhängerkran ab 150€/Tag, der teuerste der Raupenkran ab 800€/Tag. Vergleichen Sie Mietkran-Preise von mehreren Anbietern, um das beste Angebot zu finden.',
  },
  {
    question: 'Was kostet ein Kran am Tag?',
    answer: 'Ein Kran kostet am Tag zwischen 150€ (Anhängerkran) und 5.000€ (Schwerlast-Raupenkran). Die gängigsten Krane zum Ausleihen: Minikran ab 250€/Tag, Autokran ab 500€/Tag, Baukran ab 300€/Tag. Alle Tagespreise sind Richtwerte ohne MwSt.',
  },
  {
    question: 'Wie viel kostet ein Kran?',
    answer: 'Die Kosten für einen Mietkran hängen von Typ, Tragkraft und Mietdauer ab. Tagesmiete: 150–5.000€, Wochenmiete: 700–25.000€, Monatsmiete: 2.000–50.000€. Auf KranVergleich.de können Sie die Kranmiete Preise kostenlos vergleichen.',
  },
  {
    question: 'Wie teuer ist ein Kran im Monat?',
    answer: 'Wie teuer ein Kran im Monat ist, hängt vom Krantyp ab: Anhängerkran ab 2.000€/Monat, Minikran ab 3.500€/Monat, Dachdeckerkran ab 3.000€/Monat, Autokran ab 8.000€/Monat, Baukran ab 4.000€/Monat (zzgl. Montage), Mobilkran ab 10.000€/Monat, Raupenkran ab 15.000€/Monat. Monatsmieten sind pro Tag rund 30–40% günstiger als Einzeltage — lohnt sich ab 10 Einsatztagen.',
  },
  {
    question: 'Was kostet es, einen Kran zu mieten oder zu leihen?',
    answer: 'Einen Kran zu mieten oder zu leihen kostet je nach Typ zwischen 150€ und 5.000€ pro Tag (netto). Der Mietkran-Preis enthält bei Autokranen, Mobilkranen und Raupenkranen den Kranführer. Bei Minikranen, Dachdeckerkranen und Anhängerkranen können Sie den Kran nach Einweisung selbst bedienen — einen Bediener buchen Sie separat (ca. 40–60€/h). Synonyme: Kran ausleihen, Kranverleih, Kranvermietung, Kranmiete — alle meinen dasselbe.',
  },
  {
    question: 'Ich brauche einen Kran — welcher Krantyp ist der richtige für mein Projekt?',
    answer: 'Welchen Kran Sie brauchen, hängt von Tragkraft, Hubhöhe und Zufahrt ab. Kurze Entscheidungshilfe: (1) Arbeiten in Innenräumen oder enge Zufahrt? → Minikran (ab 250€/Tag). (2) Dacharbeiten, Ziegel, Dachstuhl? → Dachdeckerkran (ab 200€/Tag). (3) Mittelschwere Montagen im Freien? → Autokran 30–80t (ab 500€/Tag). (4) Schwerlasten 100t+? → Mobilkran oder Raupenkran. (5) Langzeit-Baustelle (3+ Monate)? → Baukran (Turmdrehkran). Nutzen Sie unseren Kostenrechner — in 2 Minuten erhalten Sie eine Empfehlung und Preisschätzung.',
  },
]

export default async function KranMietenPreisePage() {
  const { anbieterCount } = await getSiteStats()
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">Kran mieten Preise</span>
      </nav>

      {/* H1 */}
      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Was kostet ein Kran? Preise &amp; Kosten 2026
      </h1>
      <p className="text-[15px] text-gray-500 mb-4 max-w-3xl">
        Komplette Mietkran-Preisliste für alle 8 Krantypen in Deutschland: Tagespreise, Wochenpreise und
        Monatspreise im Überblick — von Minikran über Autokran (Kranwagen) bis Schwerlastkran.
        Ob Sie einen Kran mieten oder leihen möchten: hier finden Sie alle Kranmiete Kosten auf einen Blick.
        Alle Preise sind unverbindliche Richtwerte (netto, zzgl. MwSt.) basierend auf Marktrecherche Q1 2026.
      </p>
      <p className="text-[11px] text-gray-300 mb-8">Stand: April 2026</p>

      {/* TOC */}
      <nav className="mb-8 border border-gray-200 rounded-lg p-4">
        <p className="text-[13px] font-medium text-gray-900 mb-2">Inhalt</p>
        <ul className="flex flex-col gap-1">
          <li><a href="#preistabelle" className="text-[13px] text-blue-600 hover:underline">Preistabelle alle Krantypen</a></li>
          <li><a href="#autokran-kosten" className="text-[13px] text-blue-600 hover:underline">Autokran Kosten pro Tag &amp; Stunde</a></li>
          <li><a href="#dachdeckerkran-kosten" className="text-[13px] text-blue-600 hover:underline">Dachdeckerkran mieten Kosten</a></li>
          <li><a href="#baukran-kosten" className="text-[13px] text-blue-600 hover:underline">Baukran mieten Preisliste</a></li>
          <li><a href="#mobilkran-kosten" className="text-[13px] text-blue-600 hover:underline">Mobilkran mieten Preisliste</a></li>
          <li><a href="#preise-detail" className="text-[13px] text-blue-600 hover:underline">Preise nach Krantyp</a></li>
          <li><a href="#tragkraft" className="text-[13px] text-blue-600 hover:underline">Kosten nach Tragkraft (30t, 50t, 80t, 100t+)</a></li>
          <li><a href="#kranfuehrer" className="text-[13px] text-blue-600 hover:underline">Kran mit Fahrer — was kostet ein Kranführer?</a></li>
          <li><a href="#zusatzkosten" className="text-[13px] text-blue-600 hover:underline">Zusatzkosten</a></li>
          <li><a href="#faq" className="text-[13px] text-blue-600 hover:underline">Häufige Fragen zu Kosten</a></li>
        </ul>
      </nav>

      {/* Quick summary cards */}
      <section className="mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 150€</p>
            <p className="text-[12px] text-gray-500">Günstigster Kran/Tag</p>
            <p className="text-[11px] text-gray-400">Anhängerkran</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 500€</p>
            <p className="text-[12px] text-gray-500">Autokran/Tag</p>
            <p className="text-[11px] text-gray-400">inkl. Kranführer</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 250€</p>
            <p className="text-[12px] text-gray-500">Minikran/Tag</p>
            <p className="text-[11px] text-gray-400">ohne Bediener</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-900">ab 300€</p>
            <p className="text-[12px] text-gray-500">Baukran/Tag</p>
            <p className="text-[11px] text-gray-400">+ Montagekosten</p>
          </div>
        </div>
      </section>

      {/* Full price table */}
      <section id="preistabelle" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Kran mieten Preisliste — alle Krantypen 2026
        </h2>
        <PriceTable showAll />
      </section>

      {/* Autokran prices — day + hourly */}
      <section id="autokran-kosten" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Was kostet ein Autokran pro Tag &amp; pro Stunde?
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Autokrane (Kranwagen) kosten zwischen <strong className="text-gray-900">500€ und 2.000€ pro Tag</strong>,
          je nach Tragkraft. Bei Kurzeinsätzen wird stundenweise abgerechnet. Der Kranführer ist immer
          inklusive (gesetzlich vorgeschrieben).
        </p>
        <div className="grid gap-3 sm:grid-cols-3 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">150–200€/h</p>
            <p className="text-[13px] text-gray-500 mt-1">Autokran 30–50t</p>
            <p className="text-[11px] text-gray-400">Einfamilienhaus, Dachstuhl</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">200–300€/h</p>
            <p className="text-[13px] text-gray-500 mt-1">Autokran 50–100t</p>
            <p className="text-[11px] text-gray-400">Hallenbau, Industriemontage</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">300–500€/h</p>
            <p className="text-[13px] text-gray-500 mt-1">Autokran 100t+</p>
            <p className="text-[11px] text-gray-400">Schwerlast, Windkraft</p>
          </div>
        </div>
        <p className="text-[12px] text-gray-400 mt-3">
          Mindestmietdauer meist 4 Stunden. An-/Abfahrt wird oft separat berechnet (ca. 2–4€/km).
        </p>
      </section>

      {/* Dachdeckerkran costs — targets dachdeckerkran mieten kosten (pos 5.9!), dachdecker kran mieten */}
      <section id="dachdeckerkran-kosten" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Dachdeckerkran mieten Kosten — Preisliste &amp; Preise 2026
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Ein Dachdeckerkran ist die günstigste und schnellste Lösung für Dacharbeiten — Materialien
          werden direkt aufs Dach gehoben, ohne aufwendiges Gerüst. Die Miete erfolgt in der Regel
          ohne Bediener (Selbstbedienung nach Einweisung).
        </p>
        <div className="grid gap-3 sm:grid-cols-3 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">200–450€</p>
            <p className="text-[13px] text-gray-500 mt-1">Tagespreis</p>
            <p className="text-[11px] text-gray-400">ohne Bediener</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">1.000–2.500€</p>
            <p className="text-[13px] text-gray-500 mt-1">Wochenpreis</p>
            <p className="text-[11px] text-gray-400">bei Dachsanierung</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">3.000–7.000€</p>
            <p className="text-[13px] text-gray-500 mt-1">Monatspreis</p>
            <p className="text-[11px] text-gray-400">Großprojekte</p>
          </div>
        </div>
        <div className="mt-4 text-[13px] text-gray-500 space-y-1">
          <p><strong className="text-gray-700">Typische Einsätze:</strong> Dachsanierung, Dachstuhlarbeiten, Solaranlagen-Montage, Schornsteinarbeiten</p>
          <p><strong className="text-gray-700">Zusatzkosten:</strong> Transport/Anlieferung 150–300€, Einweisung meist inklusive</p>
          <p><strong className="text-gray-700">Aufbauart:</strong> LKW-Aufbau oder Anhänger — passt in enge Zufahrten</p>
        </div>
        <div className="mt-4">
          <Link href="/dachdeckerkran-mieten" className="text-[13px] text-blue-600 hover:underline">
            Alle Dachdeckerkran-Anbieter vergleichen &rarr;
          </Link>
        </div>
      </section>

      {/* Baukran costs — targets baukran mieten preisliste, baukran mieten kosten, mietpreis baukran, baukran kosten pro tag */}
      <section id="baukran-kosten" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Baukran mieten Preisliste 2026 — Kosten pro Tag, Woche &amp; Monat
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Ein Baukran (Turmdrehkran) wird bei Großbaustellen für Wochen oder Monate aufgestellt.
          Die Mietkosten setzen sich aus Miete, Montage/Demontage und Transport zusammen.
          Der Bediener wird separat gebucht oder vom Mieter selbst gestellt.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">300–1.500€</p>
            <p className="text-[13px] text-gray-500 mt-1">Tagespreis</p>
            <p className="text-[11px] text-gray-400">ohne Bediener</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">1.500–8.000€</p>
            <p className="text-[13px] text-gray-500 mt-1">Wochenpreis</p>
            <p className="text-[11px] text-gray-400">je nach Höhe/Ausladung</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">4.000–25.000€</p>
            <p className="text-[13px] text-gray-500 mt-1">Monatspreis</p>
            <p className="text-[11px] text-gray-400">Standardmiete</p>
          </div>
        </div>
        <div className="mt-4 text-[13px] text-gray-500 space-y-1">
          <p><strong className="text-gray-700">Zusatzkosten:</strong> Montage/Demontage 3.000–8.000€, Fundament 1.000–3.000€, Transport 500–2.000€</p>
          <p><strong className="text-gray-700">Typische Einsätze:</strong> Hochbau, Wohnungsbau, Gewerbebauten, Brückenbau</p>
          <p><strong className="text-gray-700">Mietdauer:</strong> Meist mehrere Monate — längere Laufzeit = niedrigerer Monatspreis</p>
        </div>
        <div className="mt-4">
          <Link href="/baukran-mieten" className="text-[13px] text-blue-600 hover:underline">
            Alle Baukran-Anbieter vergleichen &rarr;
          </Link>
        </div>
      </section>

      {/* Mobilkran costs — targets mobilkran mieten preisliste, mobilkran preisliste, mobilkran mieten preise */}
      <section id="mobilkran-kosten" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Mobilkran mieten Preisliste 2026 — Kosten, Preise &amp; Stundensätze
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Ein Mobilkran (auch Schwerlastkran oder Kranwagen) ist schnell einsatzbereit und bietet
          hohe Traglasten von 20t bis über 1.200t. Der Kranführer ist immer inklusive (gesetzlich vorgeschrieben).
        </p>
        <div className="grid gap-3 sm:grid-cols-3 text-center">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">600–3.000€</p>
            <p className="text-[13px] text-gray-500 mt-1">Tagespreis</p>
            <p className="text-[11px] text-gray-400">inkl. Kranführer</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">3.000–15.000€</p>
            <p className="text-[13px] text-gray-500 mt-1">Wochenpreis</p>
            <p className="text-[11px] text-gray-400">je nach Tragkraft</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">10.000–50.000€</p>
            <p className="text-[13px] text-gray-500 mt-1">Monatspreis</p>
            <p className="text-[11px] text-gray-400">Großprojekte</p>
          </div>
        </div>
        <div className="mt-4 text-[13px] text-gray-500 space-y-1">
          <p><strong className="text-gray-700">Typische Einsätze:</strong> Industriemontage, Stahlbau, Windkraftanlagen, Brückenarbeiten</p>
          <p><strong className="text-gray-700">Vorteil:</strong> Keine Montage nötig — fährt auf die Baustelle und ist sofort einsatzbereit</p>
          <p><strong className="text-gray-700">Synonyme:</strong> Schwerlastkran, Kranwagen, Teleskopkran</p>
        </div>
        <div className="mt-4">
          <Link href="/mobilkran-mieten" className="text-[13px] text-blue-600 hover:underline">
            Alle Mobilkran-Anbieter vergleichen &rarr;
          </Link>
        </div>
      </section>

      {/* Krankosten nach Tragkraft — targets "30 tonnen kran kosten" (pos 9), "80 tonnen kran kosten" (pos 38), "120 t kran kosten" */}
      <section id="tragkraft" className="mb-10 scroll-mt-20">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Was kostet ein 30-Tonnen-Kran? Preise nach Tragkraft 2026
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Die Kranmiete hängt vor allem von der benötigten Tragkraft ab. Hier finden Sie Tages-, Wochen-
          und Monatspreise für die gängigsten Tragklassen — von 30 Tonnen für den Hausbau bis 500+ Tonnen
          für Windkraft und Industrie. Alle Preise inklusive Kranführer (bei Auto- und Mobilkran gesetzlich vorgeschrieben).
        </p>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Tragkraft</th>
                <th className="py-3 px-4 font-medium text-gray-900">Typischer Krantyp</th>
                <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Kosten / Tag</th>
                <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Kosten / Woche</th>
                <th className="py-3 px-4 font-medium text-gray-900 whitespace-nowrap">Kosten / Monat</th>
                <th className="py-3 px-4 font-medium text-gray-900">Typische Einsätze</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b">
                <td className="py-2.5 px-4 font-medium text-gray-900 whitespace-nowrap">30 t</td>
                <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran</Link></td>
                <td className="py-2.5 px-4 whitespace-nowrap">500–800€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">2.500–4.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">8.000–15.000€</td>
                <td className="py-2.5 px-4 text-gray-500">Klimaanlage, Dachstuhl, Fertiggarage, Maschinentransport</td>
              </tr>
              <tr className="border-b bg-blue-50/40">
                <td className="py-2.5 px-4 font-medium text-gray-900 whitespace-nowrap">50 t</td>
                <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran</Link></td>
                <td className="py-2.5 px-4 whitespace-nowrap">700–1.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">3.500–5.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">11.000–18.000€</td>
                <td className="py-2.5 px-4 text-gray-500">Stahlträger, Betonfertigteile, Hallenbau</td>
              </tr>
              <tr className="border-b">
                <td className="py-2.5 px-4 font-medium text-gray-900 whitespace-nowrap">80 t</td>
                <td className="py-2.5 px-4"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran</Link> / <Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link></td>
                <td className="py-2.5 px-4 whitespace-nowrap">1.000–1.500€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">5.000–7.500€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">15.000–25.000€</td>
                <td className="py-2.5 px-4 text-gray-500">Industriemontage, Brückenteile, schwere Stahlbauten</td>
              </tr>
              <tr className="border-b bg-blue-50/40">
                <td className="py-2.5 px-4 font-medium text-gray-900 whitespace-nowrap">100 t</td>
                <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link></td>
                <td className="py-2.5 px-4 whitespace-nowrap">1.200–1.800€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">6.000–9.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">18.000–30.000€</td>
                <td className="py-2.5 px-4 text-gray-500">Industriemontage, Hallenbau, Maschinen</td>
              </tr>
              <tr className="border-b">
                <td className="py-2.5 px-4 font-medium text-gray-900 whitespace-nowrap">120 t</td>
                <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link></td>
                <td className="py-2.5 px-4 whitespace-nowrap">1.500–2.200€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">7.500–11.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">22.000–35.000€</td>
                <td className="py-2.5 px-4 text-gray-500">Brückenbau, Stahlbau, Schwerlastmontage</td>
              </tr>
              <tr className="border-b bg-blue-50/40">
                <td className="py-2.5 px-4 font-medium text-gray-900 whitespace-nowrap">160 t</td>
                <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link></td>
                <td className="py-2.5 px-4 whitespace-nowrap">1.800–2.800€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">9.000–14.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">28.000–45.000€</td>
                <td className="py-2.5 px-4 text-gray-500">Schwere Maschinen, Brückenteile, Kraftwerksbau</td>
              </tr>
              <tr className="border-b">
                <td className="py-2.5 px-4 font-medium text-gray-900 whitespace-nowrap">250 t</td>
                <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link></td>
                <td className="py-2.5 px-4 whitespace-nowrap">2.500–4.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">12.500–20.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">40.000–60.000€</td>
                <td className="py-2.5 px-4 text-gray-500">Windkraftanlagen, Schwerlastmontage, Raffinerien</td>
              </tr>
              <tr className="bg-amber-50/40">
                <td className="py-2.5 px-4 font-medium text-gray-900 whitespace-nowrap">500 t+</td>
                <td className="py-2.5 px-4"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link> / <Link href="/raupenkran-mieten" className="text-blue-600 hover:underline">Raupenkran</Link></td>
                <td className="py-2.5 px-4 whitespace-nowrap">4.000–10.000€+</td>
                <td className="py-2.5 px-4 whitespace-nowrap">20.000–50.000€</td>
                <td className="py-2.5 px-4 whitespace-nowrap">60.000–150.000€</td>
                <td className="py-2.5 px-4 text-gray-500">Offshore, Kraftwerke, Großbrücken, Großwindräder</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          Alle Preise netto, zzgl. MwSt. Kranführer bei Auto-, Mobil- und Raupenkran inklusive.
          Anfahrt (150–500€) und Schwertransport ab ca. 100t Tragkraft (1.000–10.000€) kommen separat hinzu.
          Wochenmiete spart 15–25%, Monatsmiete bis zu 40% gegenüber Einzeltagen.
        </p>
      </section>

      {/* Kranführer costs — targets "kran mieten mit fahrer" (pos 29), "was kostet ein kranführer" */}
      <section id="kranfuehrer" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Kran mit Fahrer mieten — was kostet ein Kranführer?
        </h2>
        <p className="text-[14px] text-gray-500 mb-4">
          Ein <strong className="text-gray-900">Kranführer kostet 50–80€ pro Stunde</strong> oder
          {' '}<strong className="text-gray-900">400–650€ pro Tag</strong> (8 Stunden). Bei manchen
          Krantypen ist der Bediener gesetzlich vorgeschrieben und im Mietpreis enthalten — bei anderen
          können Sie den Kran nach einer kurzen Einweisung selbst bedienen oder den Kranführer separat
          dazubuchen.
        </p>

        {/* Kranführer Preise */}
        <div className="grid gap-3 sm:grid-cols-3 text-center mb-5">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">50–80€/h</p>
            <p className="text-[13px] text-gray-500 mt-1">Stundenpreis Kranführer</p>
            <p className="text-[11px] text-gray-400">bei separater Buchung</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">400–650€/Tag</p>
            <p className="text-[13px] text-gray-500 mt-1">Tagessatz (8 Std.)</p>
            <p className="text-[11px] text-gray-400">inkl. Fahrtzeit</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xl font-semibold text-gray-900">60.000–80.000€</p>
            <p className="text-[13px] text-gray-500 mt-1">Jahresgehalt brutto</p>
            <p className="text-[11px] text-gray-400">angestellter Kranführer</p>
          </div>
        </div>

        {/* Inklusive vs. separat Tabelle */}
        <h3 className="text-[14px] font-semibold text-gray-900 mb-2">
          Bei welchen Krantypen ist der Kranführer inklusive?
        </h3>
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-gray-50 border-b text-left">
                <th className="py-3 px-4 font-medium text-gray-900">Krantyp</th>
                <th className="py-3 px-4 font-medium text-gray-900">Kranführer</th>
                <th className="py-3 px-4 font-medium text-gray-900">Rechtliche Grundlage</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              <tr className="border-b bg-green-50/40">
                <td className="py-2.5 px-4 font-medium"><Link href="/autokran-mieten" className="text-blue-600 hover:underline">Autokran</Link></td>
                <td className="py-2.5 px-4 text-green-700 font-medium">✓ Immer inklusive</td>
                <td className="py-2.5 px-4 text-gray-500">DGUV Vorschrift 52 — nur zertifizierte Kranführer</td>
              </tr>
              <tr className="border-b bg-green-50/40">
                <td className="py-2.5 px-4 font-medium"><Link href="/mobilkran-mieten" className="text-blue-600 hover:underline">Mobilkran</Link></td>
                <td className="py-2.5 px-4 text-green-700 font-medium">✓ Immer inklusive</td>
                <td className="py-2.5 px-4 text-gray-500">DGUV Vorschrift 52 — gesetzlich vorgeschrieben</td>
              </tr>
              <tr className="border-b bg-green-50/40">
                <td className="py-2.5 px-4 font-medium"><Link href="/raupenkran-mieten" className="text-blue-600 hover:underline">Raupenkran</Link></td>
                <td className="py-2.5 px-4 text-green-700 font-medium">✓ Immer inklusive</td>
                <td className="py-2.5 px-4 text-gray-500">DGUV Vorschrift 52 — nur zertifizierte Kranführer</td>
              </tr>
              <tr className="border-b bg-amber-50/40">
                <td className="py-2.5 px-4 font-medium"><Link href="/baukran-mieten" className="text-blue-600 hover:underline">Baukran (Turmdrehkran)</Link></td>
                <td className="py-2.5 px-4 text-amber-700 font-medium">↻ Separat buchbar</td>
                <td className="py-2.5 px-4 text-gray-500">Turmdrehkranführer-Schein nötig — 50–70€/h</td>
              </tr>
              <tr className="border-b">
                <td className="py-2.5 px-4 font-medium"><Link href="/minikran-mieten" className="text-blue-600 hover:underline">Minikran</Link></td>
                <td className="py-2.5 px-4 text-gray-700">– Nicht nötig (Einweisung)</td>
                <td className="py-2.5 px-4 text-gray-500">DGUV V52 — Einweisung durch Vermieter reicht</td>
              </tr>
              <tr className="border-b">
                <td className="py-2.5 px-4 font-medium"><Link href="/dachdeckerkran-mieten" className="text-blue-600 hover:underline">Dachdeckerkran</Link></td>
                <td className="py-2.5 px-4 text-gray-700">– Nicht nötig (Einweisung)</td>
                <td className="py-2.5 px-4 text-gray-500">DGUV V52 — Funkfernsteuerung vom Boden</td>
              </tr>
              <tr className="border-b">
                <td className="py-2.5 px-4 font-medium"><Link href="/anhaengerkran-mieten" className="text-blue-600 hover:underline">Anhängerkran</Link></td>
                <td className="py-2.5 px-4 text-gray-700">– Nicht nötig (Einweisung)</td>
                <td className="py-2.5 px-4 text-gray-500">DGUV V52 — Einweisung reicht, ab 18 Jahren</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium"><Link href="/ladekran-mieten" className="text-blue-600 hover:underline">Ladekran</Link></td>
                <td className="py-2.5 px-4 text-amber-700 font-medium">↻ Oft mit LKW-Fahrer</td>
                <td className="py-2.5 px-4 text-gray-500">Komplettpaket mit LKW möglich</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Kontext boxes: Inkludiert vs separat vs ohne */}
        <div className="grid gap-3 sm:grid-cols-3 mt-5">
          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1 text-[13px]">✓ Kranführer immer inklusive</p>
            <p className="text-[12px] text-gray-600">
              Autokran, Mobilkran und Raupenkran dürfen nur mit zertifiziertem Kranführer betrieben
              werden (DGUV Vorschrift 52). Der Bediener ist im Tagespreis enthalten — Sie zahlen nichts extra.
            </p>
          </div>
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1 text-[13px]">↻ Separat dazubuchen</p>
            <p className="text-[12px] text-gray-600">
              Bei Baukranen brauchen Sie einen Turmdrehkranführer — entweder eigenes Personal oder
              separat gebucht (50–70€/h). Bei Ladekranen oft als Komplettpaket mit LKW-Fahrer (500–800€/Tag).
            </p>
          </div>
          <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
            <p className="font-medium text-gray-900 mb-1 text-[13px]">– Selbst bedienen nach Einweisung</p>
            <p className="text-[12px] text-gray-600">
              Minikran, Dachdeckerkran und Anhängerkran können Sie nach einer 30–60-minütigen Einweisung
              (DGUV V52) selbst bedienen. Kein Kranführerschein nötig. Mindestalter: 18 Jahre.
            </p>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mt-3">
          Bei allen Krantypen ohne inklusiven Bediener können Sie einen Kranführer separat dazubuchen,
          wenn Sie den Kran nicht selbst bedienen möchten. Mehr Info:{' '}
          <Link href="/ratgeber/kran-mieten-ohne-fuehrerschein" className="text-blue-600 hover:underline">
            Kran mieten ohne Führerschein &rarr;
          </Link>
        </p>
      </section>

      {/* Price details per type with images */}
      <section id="preise-detail" className="mb-10 scroll-mt-20 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Kosten nach Krantyp im Detail
        </h2>
        {cranePrices.map((p) => {
          const ct = craneTypes.find((c) => c.slug === p.craneTypeSlug)
          if (!ct) return null
          return (
            <div key={p.craneTypeSlug} className="border border-gray-200 rounded-lg p-4">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 rounded-md shrink-0 hidden sm:flex items-center justify-center text-gray-600">
                  {(() => { const Icon = getCraneIcon(ct.slug); return <Icon className="w-14 h-14" /> })()}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/${ct.slug}`} className="hover:underline">
                    <h3 className="font-medium text-[15px] text-gray-900 mb-1">
                      {ct.name} mieten — ab {p.dayFrom.toLocaleString('de-DE')}€/Tag
                    </h3>
                  </Link>
                  <p className="text-[13px] text-gray-500 mb-2">{ct.desc}</p>
                  <div className="grid grid-cols-3 gap-2 text-[12px]">
                    <div className="bg-gray-50 rounded p-2">
                      <span className="text-gray-400">Tag</span>
                      <p className="font-medium text-gray-900">{p.dayFrom.toLocaleString('de-DE')}–{p.dayTo.toLocaleString('de-DE')}€</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="text-gray-400">Woche</span>
                      <p className="font-medium text-gray-900">{p.weekFrom.toLocaleString('de-DE')}–{p.weekTo.toLocaleString('de-DE')}€</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <span className="text-gray-400">Monat</span>
                      <p className="font-medium text-gray-900">{p.monthFrom.toLocaleString('de-DE')}–{p.monthTo.toLocaleString('de-DE')}€</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2">
                    {p.includesOperator ? 'Kranführer inklusive.' : 'Ohne Kranführer.'} {p.notes}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* Zusatzkosten */}
      <section id="zusatzkosten" className="mb-10 scroll-mt-20 border border-gray-200 rounded-lg p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          Zusatzkosten beim Kran mieten
        </h2>
        <div className="space-y-3 text-[14px] text-gray-500">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Transport (An-/Abfahrt)</span>
            <span className="font-medium text-gray-900">150–500€</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Baukran Montage/Demontage</span>
            <span className="font-medium text-gray-900">3.000–8.000€</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Kranführer (separat, pro Stunde)</span>
            <span className="font-medium text-gray-900">40–60€/h</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span>Straßensperrung / Genehmigung</span>
            <span className="font-medium text-gray-900">100–500€</span>
          </div>
          <div className="flex justify-between">
            <span>Haftpflichtversicherung</span>
            <span className="font-medium text-gray-900">oft inklusive</span>
          </div>
        </div>
      </section>

      {/* Intro text for SEO */}
      <div className="text-[14px] text-gray-500 leading-relaxed mb-10">
        <p>
          Die Kosten für die Kranmiete hängen von mehreren Faktoren ab: Krantyp, Tragkraft,
          Mietdauer, Region und Verfügbarkeit. <strong className="text-gray-900">Auf KranVergleich.de</strong> vergleichen
          Sie die Preise von über {anbieterCount} Anbietern in ganz Deutschland — kostenlos und unverbindlich.
          Fordern Sie über unsere <Link href="/" className="text-blue-600 hover:underline">Sammelanfrage</Link> Angebote
          von mehreren Firmen gleichzeitig an und sparen Sie Zeit und Geld.
        </p>
      </div>

      {/* FAQ */}
      <div id="faq" className="mb-10 scroll-mt-20">
        <FAQSection faqs={costFAQs} craneTypeName="Kran" />
      </div>

      {/* Cross-links to pillar pages — keyword-rich anchors for internal link equity */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Kran mieten nach Typ — Anbieter &amp; Preise vergleichen</h2>
        <div className="flex flex-wrap gap-2">
          {craneTypes.map((ct) => (
            <Link
              key={ct.slug}
              href={`/${ct.slug}`}
              className="text-[12px] bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full px-3 py-1.5 transition-colors"
            >
              {ct.name} mieten Preise
            </Link>
          ))}
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
              { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://kranvergleich.de/' },
              { '@type': 'ListItem', position: 2, name: 'Kran mieten Preise' },
            ],
          }),
        }}
      />
      {/* FAQPage structured data is rendered by FAQSection component */}
    </div>
  )
}
