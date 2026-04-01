/**
 * FAQ-Daten per Krantyp und per Stadt.
 * Typ-FAQs: ogólne, techniczne pytania o typ dźwigu.
 * Stadt-FAQs: specyficzne dla miasta (ceny, dostawcy, lokalne przepisy).
 * NIE kopiujemy typ-FAQ na strony miast — Google traktuje to jako duplicate content.
 */
export interface FAQItem {
  question: string
  answer: string
}

// ============================================
// Typ-FAQs — wyświetlane TYLKO na /[krantyp]-mieten
// Zawierają synonimy: mieten, leihen, ausleihen, Verleih, Vermietung
// ============================================
const typeFAQs: Record<string, FAQItem[]> = {
  'minikran-mieten': [
    {
      question: 'Was kostet es, einen Minikran zu mieten?',
      answer: 'Die Tagesmiete für einen Minikran liegt zwischen 250€ und 500€ (netto), je nach Tragkraft und Ausstattung. Wer einen Minikran leihen möchte, sollte zusätzlich Transportkosten von ca. 150–300€ einplanen.',
    },
    {
      question: 'Brauche ich einen Kranführerschein, wenn ich einen Minikran ausleihen will?',
      answer: 'Nein, für Minikrane unter 1 Tonne Tragkraft ist in der Regel kein Kranführerschein erforderlich. Eine Einweisung durch den Minikranverleih reicht aus. Ab 1t Tragkraft wird ein Befähigungsnachweis benötigt.',
    },
    {
      question: 'Wie groß muss die Zufahrt für einen Minikran sein?',
      answer: 'Minikrane sind sehr kompakt: Die meisten Modelle passen durch Türöffnungen ab 80cm Breite. Die Zufahrt sollte mindestens 1m breit und tragfähig sein — ideal für die Minikranvermietung bei Inneneinsätzen.',
    },
    {
      question: 'Kann ich einen Minikran mit Glassauger mieten?',
      answer: 'Ja, viele Anbieter im Minikranverleih bieten Minikrane mit Glassauger (Vakuumheber) als Zusatzausrüstung an. Ideal für Glasmontage, Fenstermontage und Fassadenarbeiten. Fragen Sie gezielt nach "Minikran mit Glassauger leihen".',
    },
    {
      question: 'Welche Tragkraft hat ein Minikran?',
      answer: 'Minikrane haben typischerweise eine Tragkraft von 500 kg bis 3.000 kg. Die Hakenhöhe reicht von 5m bis 18m, die Ausladung von 3m bis 16m. Für die Vermietung stehen verschiedene Größen zur Auswahl.',
    },
  ],
  'autokran-mieten': [
    {
      question: 'Was kostet ein Autokran pro Tag?',
      answer: 'Einen Autokran mieten kostet zwischen 500€ und 2.000€ pro Tag, inklusive Kranführer. Der Preis hängt von der Tragkraft (10t–500t) und Einsatzdauer ab. Wer einen Autokran leihen möchte, erhält meist ein Komplettangebot.',
    },
    {
      question: 'Was kostet ein Autokran pro Stunde?',
      answer: 'Ein Autokran kostet ca. 150–350€ pro Stunde inkl. Kranführer. Kleine Autokrane (30–50t) liegen bei ca. 150–200€/h, große (100t+) bei 250–350€/h. Die Mindestmietdauer beträgt bei den meisten Autokranvermietungen 4 Stunden.',
    },
    {
      question: 'Ist ein Kranführer bei der Autokranvermietung inklusive?',
      answer: 'Ja, beim Autokranverleih wird der Kran ausschließlich mit qualifiziertem Kranführer vermietet. Die Kosten sind im Tagespreis enthalten — das ist gesetzlich vorgeschrieben.',
    },
    {
      question: 'Brauche ich eine Genehmigung, wenn ich einen Autokran ausleihen will?',
      answer: 'Auf privatem Gelände ist meist keine Genehmigung nötig. Für den Einsatz auf öffentlichen Straßen oder Gehwegen benötigen Sie eine Sondernutzungsgenehmigung der Stadt.',
    },
  ],
  'dachdeckerkran-mieten': [
    {
      question: 'Was kostet es, einen Dachdeckerkran zu leihen?',
      answer: 'Einen Dachdeckerkran mieten kostet zwischen 200€ und 450€ pro Tag ohne Bediener. Die Dachdeckerkranvermietung bietet in der Regel eine Einweisung inklusive.',
    },
    {
      question: 'Kann ich einen Dachdeckerkran selbst bedienen?',
      answer: 'Ja, nach einer Einweisung durch den Dachdeckerkranverleih können Sie den Kran selbst bedienen. Ein Kranführerschein ist in der Regel nicht erforderlich.',
    },
    {
      question: 'Welche Reichweite hat ein Dachdeckerkran?',
      answer: 'Dachdeckerkrane erreichen typischerweise Hakenhöhen von 15–30m und Ausladungen von 10–25m. Damit sind die meisten Wohnhäuser problemlos erreichbar. Ideal zum Ausleihen für Dachsanierungen.',
    },
  ],
  'raupenkran-mieten': [
    {
      question: 'Wann brauche ich einen Raupenkran?',
      answer: 'Einen Raupenkran mieten lohnt sich bei schwierigem Gelände, weichem Untergrund und sehr schweren Lasten (50t–3.000t). Die Raupenkranvermietung bedient vor allem Infrastrukturprojekte, Windkraftanlagen und Industriemontagen.',
    },
    {
      question: 'Was kostet es, einen Raupenkran zu leihen?',
      answer: 'Raupenkrane kosten ab 800€/Tag für kleinere Modelle bis zu 5.000€/Tag und mehr für Schwerlastkrane. Beim Raupenkranverleih sind Kranführer und Transport inklusive.',
    },
  ],
  'anhaengerkran-mieten': [
    {
      question: 'Kann ich einen Anhängerkran mit meinem PKW transportieren?',
      answer: 'Ja, die meisten Anhängerkrane können mit einem PKW mit Anhängerkupplung transportiert werden. Das macht den Anhängerkranverleih besonders flexibel. Das Zugfahrzeug sollte für das Gesamtgewicht zugelassen sein.',
    },
    {
      question: 'Was kostet es, einen Anhängerkran zu mieten?',
      answer: 'Einen Anhängerkran leihen kostet zwischen 150€ und 350€ pro Tag. Die Anhängerkranvermietung bietet die günstigste Option für mobile Hebearbeiten.',
    },
  ],
  'mobilkran-mieten': [
    {
      question: 'Was ist der Unterschied zwischen Mobilkran und Autokran?',
      answer: 'Ein Mobilkran hat ein spezielles Kranfahrgestell und ist für höhere Traglasten ausgelegt (bis 1.200t). Ein Autokran basiert auf einem LKW-Fahrgestell. Die Mobilkranvermietung bedient vor allem Großprojekte.',
    },
    {
      question: 'Was kostet es, einen Mobilkran zu leihen?',
      answer: 'Einen Mobilkran mieten kostet zwischen 600€ und 3.000€ pro Tag, inklusive Kranführer. Beim Mobilkranverleih hängt der Preis stark von der Tragkraft ab.',
    },
  ],
  'ladekran-mieten': [
    {
      question: 'Was ist ein Ladekran?',
      answer: 'Ein Ladekran (auch LKW-Ladekran) ist ein hydraulischer Kran, der auf einem LKW montiert ist. Im Ladekranverleih wird er für Be- und Entladearbeiten eingesetzt und kann Lasten von 1 bis 30 Tonnen heben.',
    },
    {
      question: 'Was kostet es, einen Ladekran zu mieten?',
      answer: 'Einen Ladekran leihen kostet zwischen 300€ und 800€ pro Tag. Bei der Ladekranvermietung ist oft ein LKW-Komplettpaket mit Fahrer buchbar.',
    },
  ],
  'baukran-mieten': [
    {
      question: 'Wie lange dauert der Aufbau eines Baukrans?',
      answer: 'Der Aufbau eines Turmdrehkrans dauert in der Regel 1–3 Tage, abhängig von Größe und Standort. Beim Baukranverleih liegen die Kosten für Montage/Demontage bei 3.000–8.000€.',
    },
    {
      question: 'Was kostet es, einen Baukran zu leihen?',
      answer: 'Die Monatsmiete beim Baukranverleih liegt zwischen 4.000€ und 25.000€. Hinzu kommen Kosten für Montage, Demontage, Fundament und Statik. Einen Baukran mieten lohnt sich ab einer Bauzeit von 3+ Monaten.',
    },
    {
      question: 'Brauche ich eine Baugenehmigung für einen Baukran?',
      answer: 'Ja, für die Aufstellung eines Turmdrehkrans benötigen Sie in der Regel eine Genehmigung der Baubehörde. Die Baukranvermietung unterstützt Sie dabei.',
    },
  ],
}

// ============================================
// Stadt-FAQs — wyświetlane TYLKO na /[krantyp]-mieten/[stadt]
// UNIKALNE per miasto, nie kopiowane z typ-FAQ
// ============================================
function getCityFAQs(craneName: string, cityName: string, priceFrom?: number, priceTo?: number): FAQItem[] {
  const priceStr = priceFrom && priceTo ? `zwischen ca. ${priceFrom}€ und ${priceTo}€ pro Tag (netto)` : 'je nach Anbieter und Tragkraft'

  return [
    {
      question: `Was kostet ein ${craneName} in ${cityName}?`,
      answer: `Die Tagesmiete für einen ${craneName} in ${cityName} liegt ${priceStr}. Vergleichen Sie Angebote von mehreren Anbietern in ${cityName}, um den besten Preis zu finden.`,
    },
    {
      question: `Wie schnell kann ein ${craneName} in ${cityName} geliefert werden?`,
      answer: `Die meisten ${craneName}-Vermieter in ${cityName} können innerhalb von 24–48 Stunden liefern. Bei dringendem Bedarf bieten einige Anbieter auch Same-Day-Lieferung an. Fragen Sie direkt beim Anbieter nach.`,
    },
    {
      question: `Brauche ich eine Genehmigung für einen ${craneName} in ${cityName}?`,
      answer: `Auf privatem Gelände ist meist keine Genehmigung nötig. Für den Einsatz auf öffentlichen Straßen in ${cityName} benötigen Sie eine Sondernutzungsgenehmigung. Diese beantragen Sie beim Ordnungsamt ${cityName}.`,
    },
    {
      question: `Wo finde ich ${craneName}-Vermietung in ${cityName}?`,
      answer: `Auf KranVergleich.de finden Sie alle ${craneName}-Vermieter in ${cityName} und Umgebung. Vergleichen Sie Preise und Bewertungen und fragen Sie kostenlos Angebote an — bei einem oder mehreren Anbietern gleichzeitig.`,
    },
  ]
}

export function getFAQsForCraneType(slug: string): FAQItem[] {
  return typeFAQs[slug] ?? []
}

export function getFAQsForCraneAndCity(craneSlug: string, cityName: string, craneName?: string): FAQItem[] {
  const name = craneName ?? craneSlug.replace('-mieten', '').replace(/^./, c => c.toUpperCase())

  // Price data for the city FAQ
  const priceMap: Record<string, [number, number]> = {
    'minikran-mieten': [250, 500],
    'autokran-mieten': [500, 2000],
    'dachdeckerkran-mieten': [200, 450],
    'raupenkran-mieten': [800, 5000],
    'anhaengerkran-mieten': [150, 350],
    'mobilkran-mieten': [600, 3000],
    'baukran-mieten': [300, 1500],
    'ladekran-mieten': [300, 800],
  }

  const [priceFrom, priceTo] = priceMap[craneSlug] ?? [undefined, undefined]

  // Return ONLY city-specific FAQs — no typ-FAQs copied
  return getCityFAQs(name, cityName, priceFrom, priceTo)
}
