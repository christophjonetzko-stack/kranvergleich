/**
 * FAQ-Daten per Krantyp und optional per Stadt.
 * Werden auf den programmatic SEO pages eingebunden.
 */
export interface FAQItem {
  question: string
  answer: string
}

const genericFAQs: Record<string, FAQItem[]> = {
  'minikran-mieten': [
    {
      question: 'Was kostet ein Minikran pro Tag?',
      answer: 'Die Tagesmiete für einen Minikran liegt zwischen 250€ und 500€, je nach Tragkraft und Ausstattung. Hinzu kommen Transportkosten von ca. 150–300€.',
    },
    {
      question: 'Brauche ich einen Kranführerschein für einen Minikran?',
      answer: 'Nein, für Minikrane unter 1 Tonne Tragkraft ist in der Regel kein Kranführerschein erforderlich. Eine Einweisung durch den Vermieter reicht aus. Ab 1t Tragkraft wird ein Befähigungsnachweis benötigt.',
    },
    {
      question: 'Wie groß muss die Zufahrt für einen Minikran sein?',
      answer: 'Minikrane sind sehr kompakt: Die meisten Modelle passen durch Türöffnungen ab 80cm Breite. Die Zufahrt sollte mindestens 1m breit und tragfähig sein.',
    },
    {
      question: 'Welche Tragkraft hat ein Minikran?',
      answer: 'Minikrane haben typischerweise eine Tragkraft von 500 kg bis 3.000 kg. Die Hakenhöhe reicht von 5m bis 18m, die Ausladung von 3m bis 16m.',
    },
    {
      question: 'Kann ich einen Minikran mit Glassauger mieten?',
      answer: 'Ja, viele Vermieter bieten Minikrane mit Glassauger (Vakuumheber) als Zusatzausrüstung an. Ideal für Glasmontage, Fenstermontage und Fassadenarbeiten.',
    },
  ],
  'autokran-mieten': [
    {
      question: 'Was kostet ein Autokran pro Tag?',
      answer: 'Autokrane kosten zwischen 500€ und 2.000€ pro Tag, inklusive Kranführer. Der Preis hängt von der Tragkraft (10t–500t) und Einsatzdauer ab.',
    },
    {
      question: 'Ist ein Kranführer bei Autokranen inklusive?',
      answer: 'Ja, Autokrane werden ausschließlich mit qualifiziertem Kranführer vermietet. Die Kosten sind im Tagespreis enthalten.',
    },
    {
      question: 'Wie schnell ist ein Autokran einsatzbereit?',
      answer: 'Ein Autokran ist in der Regel innerhalb von 15–30 Minuten nach Ankunft aufgebaut und einsatzbereit. Bei großen Kranen kann die Aufbauzeit bis zu 2 Stunden betragen.',
    },
    {
      question: 'Brauche ich eine Genehmigung für einen Autokran?',
      answer: 'Auf privatem Gelände ist meist keine Genehmigung nötig. Für den Einsatz auf öffentlichen Straßen oder Gehwegen benötigen Sie eine Sondernutzungsgenehmigung der Stadt.',
    },
  ],
  'dachdeckerkran-mieten': [
    {
      question: 'Was kostet ein Dachdeckerkran pro Tag?',
      answer: 'Dachdeckerkrane kosten zwischen 200€ und 450€ pro Tag ohne Bediener. Eine Einweisung ist in der Regel inklusive.',
    },
    {
      question: 'Kann ich einen Dachdeckerkran selbst bedienen?',
      answer: 'Ja, nach einer Einweisung durch den Vermieter können Sie den Dachdeckerkran selbst bedienen. Ein Kranführerschein ist in der Regel nicht erforderlich.',
    },
    {
      question: 'Welche Reichweite hat ein Dachdeckerkran?',
      answer: 'Dachdeckerkrane erreichen typischerweise Hakenhöhen von 15–30m und Ausladungen von 10–25m. Damit sind die meisten Wohnhäuser problemlos erreichbar.',
    },
  ],
  'raupenkran-mieten': [
    {
      question: 'Wann brauche ich einen Raupenkran?',
      answer: 'Raupenkrane sind ideal für schwieriges Gelände, weichen Untergrund und sehr schwere Lasten (50t–3.000t). Sie werden bei Infrastrukturprojekten, Windkraftanlagen und Industriemontagen eingesetzt.',
    },
    {
      question: 'Was kostet ein Raupenkran?',
      answer: 'Raupenkrane kosten ab 800€/Tag für kleinere Modelle bis zu 5.000€/Tag und mehr für Schwerlastkrane. Kranführer und Transport sind inklusive.',
    },
  ],
  'anhaengerkran-mieten': [
    {
      question: 'Kann ich einen Anhängerkran mit meinem PKW transportieren?',
      answer: 'Ja, die meisten Anhängerkrane können mit einem PKW mit Anhängerkupplung transportiert werden. Das Zugfahrzeug sollte für das Gesamtgewicht zugelassen sein.',
    },
    {
      question: 'Was kostet ein Anhängerkran pro Tag?',
      answer: 'Anhängerkrane kosten zwischen 150€ und 350€ pro Tag. Sie sind die günstigste Option für mobile Hebearbeiten.',
    },
  ],
  'mobilkran-mieten': [
    {
      question: 'Was ist der Unterschied zwischen Mobilkran und Autokran?',
      answer: 'Ein Mobilkran hat ein spezielles Kranfahrgestell und ist für höhere Traglasten ausgelegt (bis 1.200t). Ein Autokran basiert auf einem LKW-Fahrgestell und ist flexibler im Straßenverkehr.',
    },
    {
      question: 'Was kostet ein Mobilkran?',
      answer: 'Mobilkrane kosten zwischen 600€ und 3.000€ pro Tag, inklusive Kranführer. Der Preis hängt stark von der Tragkraft ab.',
    },
  ],
  'ladekran-mieten': [
    {
      question: 'Was ist ein Ladekran?',
      answer: 'Ein Ladekran (auch LKW-Ladekran) ist ein hydraulischer Kran, der auf einem LKW montiert ist. Er wird für Be- und Entladearbeiten eingesetzt und kann Lasten von 1 bis 30 Tonnen heben.',
    },
    {
      question: 'Was kostet ein Ladekran pro Tag?',
      answer: 'Ladekrane kosten zwischen 300€ und 800€ pro Tag, abhängig von Tragkraft und ob ein LKW-Fahrer inklusive ist.',
    },
  ],
  'baukran-mieten': [
    {
      question: 'Wie lange dauert der Aufbau eines Baukrans?',
      answer: 'Der Aufbau eines Turmdrehkrans dauert in der Regel 1–3 Tage, abhängig von Größe und Standort. Die Kosten für Montage/Demontage liegen bei 3.000–8.000€.',
    },
    {
      question: 'Was kostet ein Baukran pro Monat?',
      answer: 'Die Monatsmiete für einen Baukran liegt zwischen 4.000€ und 25.000€. Hinzu kommen Kosten für Montage, Demontage, Fundament und Statik.',
    },
    {
      question: 'Brauche ich eine Baugenehmigung für einen Baukran?',
      answer: 'Ja, für die Aufstellung eines Turmdrehkrans benötigen Sie in der Regel eine Genehmigung der Baubehörde. Ihr Vermieter unterstützt Sie dabei.',
    },
  ],
}

export function getFAQsForCraneType(slug: string): FAQItem[] {
  return genericFAQs[slug] ?? []
}

export function getFAQsForCraneAndCity(craneSlug: string, cityName: string, craneName?: string): FAQItem[] {
  const baseFAQs = getFAQsForCraneType(craneSlug)

  const name = craneName ?? craneSlug.replace('-mieten', '').replace(/^./, c => c.toUpperCase())

  const cityFAQ: FAQItem = {
    question: `Wo finde ich ${name}-Vermietung in ${cityName}?`,
    answer: `Auf KranVergleich.de finden Sie alle ${name}-Vermieter in ${cityName} und Umgebung. Vergleichen Sie Preise, Bewertungen und fragen Sie kostenlos Angebote an.`,
  }

  return [...baseFAQs, cityFAQ]
}
