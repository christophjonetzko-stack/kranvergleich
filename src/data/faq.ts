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
    {
      question: 'Was ist ein Raupen-Minikran und wo kann ich ihn leihen?',
      answer: 'Ein Raupen-Minikran (auch Spinnenkran oder Spider Crane) ist ein kompakter Kran auf Raupenfahrwerk. Dank seiner geringen Breite ab 60 cm passt er durch Türen und Hallentore. Auf KranVergleich.de finden Sie Anbieter, bei denen Sie einen Raupen-Minikran leihen oder ausleihen können — mit oder ohne Bediener.',
    },
    {
      question: 'Wo finde ich eine Minikran-Preisliste?',
      answer: 'Eine aktuelle Minikran-Preisliste finden Sie auf KranVergleich.de: Tagesmiete 250–500€, Wochenmiete 1.000–2.500€, Monatsmiete 3.000–7.000€ (netto). Vergleichen Sie Minikran-Mietpreise und fordern Sie kostenlos Angebote an.',
    },
    {
      question: 'Kann ich einen kleinen Kran mieten?',
      answer: 'Ja, einen kleinen Kran (Minikran) können Sie ab 250€/Tag mieten. Minikrane eignen sich ideal für enge Baustellen, Innenräume und Arbeiten mit eingeschränkter Zufahrt. Kein Kranführerschein erforderlich — eine Einweisung reicht.',
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
    {
      question: 'Was kostet ein Autokran (Kranwagen) pro Tag?',
      answer: 'Ein Autokran (auch Kranwagen oder Fahrzeugkran) kostet zwischen 500€ und 2.000€ pro Tag, inklusive Kranführer. Kleine Autokrane (30t) ab ca. 500€, mittlere (50–80t) ab 800€, schwere (100t+) ab 1.200€ pro Tag. Die Autokran-Mietpreise variieren je nach Region und Auslastung.',
    },
    {
      question: 'Wo finde ich eine Autokran-Preisliste?',
      answer: 'Eine aktuelle Autokran-Preisliste 2026 finden Sie auf KranVergleich.de: Tagespreise 500–2.000€, Wochenpreise 2.500–10.000€, Monatspreise 8.000–35.000€ — jeweils inklusive Kranführer. Die Autokran-Mietpreise hängen von Tragkraft (30t–500t), Einsatzdauer und Region ab. Vergleichen Sie kostenlos Angebote von mehreren Autokranvermietungen.',
    },
    {
      question: 'Autokran mieten — welche Tragkraft brauche ich?',
      answer: 'Die richtige Tragkraft hängt vom Projekt ab: 30t-Autokran für Dachstuhl setzen, Fertiggarage, Klimaanlage (ab 500€/Tag). 50t für Stahlträger und Betonfertigteile (ab 700€/Tag). 80–100t für Industriemontage und schwere Maschinen (ab 1.000€/Tag). Wichtig: Die Tragkraft sinkt mit der Ausladung — bei 20m Reichweite hat ein 50t-Autokran oft nur noch 10–15t Nutzlast. Geben Sie in der Anfrage Gewicht UND Abstand an.',
    },
    {
      question: 'Was kostet ein Autokran für einen Tag Hausbau?',
      answer: 'Für typische Hausbau-Arbeiten (Dachstuhl aufsetzen, Fertigteile heben) kostet ein 30-Tonnen-Autokran ca. 500–800€ pro Tag inklusive Kranführer. Hinzu kommen An-/Abfahrtskosten von ca. 150–400€. Der Einsatz dauert meist 4–8 Stunden. Bei Stundenabrechnung zahlen Sie 150–200€/h (Mindestmietdauer 4 Stunden). Tipp: Mehrere Hebearbeiten auf einen Tag bündeln spart deutlich.',
    },
    {
      question: 'Kann ich einen Autokran für eine Stunde mieten?',
      answer: 'Eine reine 1-Stunde-Miete ist bei Autokranen nicht üblich — die Mindestmietdauer beträgt bei den meisten Vermietern 4 Stunden (ca. 600–800€ inkl. Kranführer für einen 30t-Autokran). Der Grund: An-/Abfahrt und Auf-/Abbau dauern bereits 1–2 Stunden. Bei sehr kurzen Einsätzen unter 2 Stunden Hebezeit lohnt sich die Stundenabrechnung (150–350€/h je nach Tragkraft).',
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
    {
      question: 'Was kostet ein Dachdeckerkran pro Tag?',
      answer: 'Die Kosten für einen Dachdeckerkran (auch Dachkran oder Ziegelkran) liegen bei 200–450€ pro Tag ohne Bediener. Bei Wochenmiete zahlen Sie 1.000–2.500€. Transport und Einweisung sind bei den meisten Vermietern inklusive. Vergleichen Sie Dachdeckerkran-Preise auf KranVergleich.de.',
    },
    {
      question: 'Was kostet ein Dachdecker-Kran für Dacharbeiten?',
      answer: 'Einen Dachdecker-Kran (Dachdeckerkran) mieten kostet 200–450€/Tag. Für Dachsanierungen, Ziegeltransport und Dachstuhlarbeiten ist der Dachkran die effizienteste Lösung. Die Dachdeckerkran-Preisliste: Wochenmiete 1.000–2.500€, Monatsmiete 3.000–7.000€.',
    },
    {
      question: 'Dachdeckerkran oder Autokran — was ist günstiger für Dacharbeiten?',
      answer: 'Für Dacharbeiten bis 30 Meter Höhe ist der Dachdeckerkran deutlich günstiger: 200–450€/Tag ohne Bediener vs. 500–1.000€/Tag für einen Autokran (inkl. Kranführer). Der Dachdeckerkran (auch Dachkran oder Ziegelkran) wird in 15–30 Minuten aufgebaut, braucht nur 2,5×6 Meter Stellfläche und kann per Funkfernsteuerung selbst bedient werden. Ein Autokran lohnt sich erst bei Lasten über 1,5 Tonnen oder Gebäuden über 9 Stockwerke.',
    },
    {
      question: 'Wie funktioniert ein Dachdeckerkran?',
      answer: 'Ein Dachdeckerkran ist ein Schrägaufzug auf einem LKW- oder Anhängerfahrgestell. Der Teleskopausleger wird auf die gewünschte Höhe ausgefahren (15–30 m) und Material wird über eine Seilwinde hochgezogen. Die Bedienung erfolgt per Funkfernsteuerung vom Boden aus — Sie steuern Heben, Senken und Schwenken. Aufbauzeit: ca. 15–30 Minuten. Kein Kranführerschein erforderlich, eine Einweisung durch den Vermieter (ca. 30 Minuten, DGUV Vorschrift 52) reicht aus.',
    },
    {
      question: 'Kann man einen Dachdeckerkran für Solaranlagen-Montage mieten?',
      answer: 'Ja, der Dachdeckerkran ist ideal für die PV-Montage: Solarmodule, Montagegestelle, Wechselrichter und Verkabelung werden direkt aufs Dach gehoben. Typische Kosten: 200–400€/Tag für 2–5 Tage Einsatz. Vorteil gegenüber manuellem Tragen: deutlich schneller, ergonomischer und sicherer. Bei Flachdächern von Gewerbegebäuden kann alternativ ein Minikran eingesetzt werden.',
    },
    {
      question: 'Welche Dachdeckerkran-Marken gibt es zum Mieten?',
      answer: 'Die gängigsten Dachdeckerkran-Marken in Deutschland sind Böcker (Marktführer, z.B. Böcker AK 46, AK 52), Klaas (z.B. Klaas K30-35), Paus und Denka Lift. Die meisten Vermieter auf KranVergleich.de bieten Böcker-Dachdeckerkrane an — sie gelten als besonders zuverlässig und einfach zu bedienen.',
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
      question: 'Was kostet es, einen Anhängerkran zu mieten?',
      answer: 'Einen Anhängerkran leihen kostet zwischen 150€ und 350€ pro Tag (netto). Wochenmiete ab 700€, Monatsmiete ab 2.000€. Der Anhängerkran (PKW-Anhänger mit Kran) ist die günstigste Option für Hebearbeiten bis 1,5 Tonnen.',
    },
    {
      question: 'Kann ich einen Anhängerkran mit meinem PKW transportieren?',
      answer: 'Ja, Anhängerkrane sind für den Transport mit normaler PKW-Anhängerkupplung ausgelegt. Das Zugfahrzeug sollte für das Gesamtgewicht (ca. 1.500–3.500 kg) zugelassen sein. Kein Kranführerschein nötig — eine Einweisung durch den Vermieter reicht.',
    },
    {
      question: 'Wo finde ich einen Anhängerkran in meiner Nähe?',
      answer: 'Auf KranVergleich.de finden Sie Anhängerkran-Vermieter in ganz Deutschland. Geben Sie Ihre Stadt in die Suche ein und vergleichen Sie Anbieter nach Preis und Bewertung. Kostenlos Angebote anfragen — bei einem oder mehreren Vermietern gleichzeitig.',
    },
    {
      question: 'Brauche ich einen Führerschein für einen Anhängerkran?',
      answer: 'Nein, für die Bedienung eines Anhängerkrans ist kein Kranführerschein erforderlich. Eine Einweisung durch den Vermieter reicht aus. Für den Transport benötigen Sie einen PKW-Führerschein mit Anhänger-Berechtigung (Klasse B oder BE je nach Gewicht).',
    },
    {
      question: 'Welche Anhängerkran-Marken kann man mieten?',
      answer: 'Die gängigsten Marken im Anhängerkranverleih sind Böcker (Marktführer in Deutschland), Klaas, Paus und Denka Lift. Böcker-Anhängerkrane sind besonders verbreitet — viele Vermieter auf KranVergleich.de bieten Böcker-Modelle wie den AK 46 oder AK 52 an.',
    },
    {
      question: 'Was ist ein PKW-Anhänger mit Kran?',
      answer: 'Ein PKW-Anhänger mit Kran (auch Anhängerkran oder Trailerkran) ist ein Hebekran, der auf einem PKW-Anhänger montiert ist. Er lässt sich mit jedem Fahrzeug mit Anhängerkupplung transportieren — ideal zum Ausleihen für Dachdeckerarbeiten, Baumaterialtransport oder Montagen bis 1.500 kg Traglast.',
    },
    {
      question: 'Was kostet ein PKW-Anhänger mit Kran pro Tag?',
      answer: 'Ein PKW-Anhänger mit Kran (Anhängerkran) kostet ab 150€ pro Tag netto. Die Preise variieren je nach Hakenhöhe und Tragkraft: Modelle bis 15m Höhe ab 150€/Tag, bis 25m Höhe ab 250€/Tag, bis 30m+ ab 300€/Tag. Wochenmiete ab 700€, Monatsmiete ab 2.000€. Transport inklusive — Sie fahren den Anhängerkran mit Ihrem eigenen PKW zur Baustelle.',
    },
    {
      question: 'Anhängerkran oder Dachdeckerkran — was ist der Unterschied?',
      answer: 'Beide sind ideal für Dacharbeiten, aber: Der Anhängerkran wird mit Ihrem PKW transportiert (günstigster Einstieg ab 150€/Tag), der Dachdeckerkran ist LKW-basiert und wird vom Vermieter geliefert (ab 200€/Tag). Der Anhängerkran hat bis zu 1.500 kg Tragkraft und 25m Hakenhöhe, der Dachdeckerkran bis 2.000 kg und 30m. Für kleinere Dacharbeiten (Ziegel, Solarmodule) reicht oft der günstigere Anhängerkran.',
    },
    {
      question: 'Welche Hakenhöhe hat ein Anhängerkran?',
      answer: 'Anhängerkrane erreichen je nach Modell 10–32 Meter Hakenhöhe. Die gängigsten Mietmodelle (Böcker AK 27, AK 32, AK 46) bieten 27–46 Meter Arbeitshöhe. Für ein Einfamilienhaus (2 Stockwerke, ca. 8m) reicht ein Einstiegsmodell mit 15m — für Mehrfamilienhäuser bis 5 Etagen sollten Sie 25–30m wählen.',
    },
  ],
  'mobilkran-mieten': [
    {
      question: 'Was kostet ein Mobilkran pro Tag?',
      answer: 'Einen Mobilkran (auch Schwerlastkran oder Teleskopkran) mieten kostet zwischen 600€ und 3.000€ pro Tag (netto), inklusive Kranführer. Die Mobilkran-Preisliste richtet sich nach Tragkraft: 50t ab ca. 600€, 100t ab 1.200€, 200t+ ab 2.000€/Tag.',
    },
    {
      question: 'Was ist der Unterschied zwischen Mobilkran und Autokran?',
      answer: 'Ein Mobilkran (mobiler Kran) hat ein spezielles Kranfahrgestell und ist für höhere Traglasten ausgelegt (bis 1.200t). Ein Autokran basiert auf einem LKW-Fahrgestell. Die Mobilkranvermietung bedient vor allem Großprojekte und Schwerlastmontagen.',
    },
    {
      question: 'Was kostet es, einen Mobilkran zu leihen?',
      answer: 'Einen Mobilkran leihen kostet 600–3.000€/Tag. Die Wochenmiete liegt bei 3.000–15.000€. Beim Mobilkranverleih sind Kranführer und An-/Abfahrt meist inklusive. Vergleichen Sie Mobilkran-Mietpreise auf KranVergleich.de.',
    },
    {
      question: 'Was kostet ein Schwerlastkran?',
      answer: 'Ein Schwerlastkran (Mobilkran ab 100t Tragkraft) kostet ab 1.200€ pro Tag inklusive Kranführer. Für 80-Tonnen-Einsätze rechnen Sie mit ca. 800–1.500€/Tag. Schwerlastkran mieten lohnt sich für Industrie-, Brücken- und Windkraftmontagen.',
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
      question: 'Was kostet ein Baukran pro Tag?',
      answer: 'Einen Baukran mieten kostet zwischen 300€ und 1.500€ pro Tag (netto), je nach Tragkraft und Auslegerlänge. Für größere Turmdrehkrane oder Baustellenkrane ist die Monatsmiete (4.000–25.000€) üblich. Die Baukran-Preisliste hängt stark von Krantyp und Mietdauer ab.',
    },
    {
      question: 'Was kostet ein Baukran pro Monat?',
      answer: 'Die Monatsmiete für einen Baukran liegt zwischen 4.000€ und 25.000€ (netto). Hinzu kommen Kosten für Montage/Demontage (3.000–8.000€), Fundament (1.000–3.000€) und Transport (500–2.000€). Einen Baukran leihen lohnt sich ab einer Bauzeit von 3+ Monaten.',
    },
    {
      question: 'Wie lange dauert der Aufbau eines Baukrans?',
      answer: 'Der Aufbau eines Turmdrehkrans dauert in der Regel 1–3 Tage, abhängig von Größe und Standort. Beim Baukranverleih liegen die Kosten für Montage/Demontage bei 3.000–8.000€.',
    },
    {
      question: 'Brauche ich eine Baugenehmigung für einen Baukran?',
      answer: 'Ja, für die Aufstellung eines Turmdrehkrans (Baustellenkran) benötigen Sie eine Genehmigung der Baubehörde. Die Baukranvermietung unterstützt Sie beim Genehmigungsverfahren.',
    },
    {
      question: 'Was ist der Unterschied zwischen Baukran, Schnellbaukran und Turmdrehkran?',
      answer: 'Ein Baukran (auch Baustellenkran, Hochbaukran oder Mobilbaukran) ist der Oberbegriff für Turmdrehkrane auf Baustellen. Ein Schnellbaukran ist eine kompaktere Variante, die schneller aufgebaut werden kann (wenige Stunden statt Tage) und für kleinere Baustellen geeignet ist. Turmdrehkran ist die technische Bezeichnung für den klassischen Baukran mit drehbarem Ausleger.',
    },
    {
      question: 'Wo finde ich eine Baukran-Preisliste?',
      answer: 'Auf KranVergleich.de finden Sie eine aktuelle Baukran-Preisliste mit Tages-, Wochen- und Monatspreisen. Vergleichen Sie Baukran-Mietpreise von über 100 Anbietern in ganz Deutschland — kostenlos und unverbindlich.',
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
