/**
 * Per-crane-type ratgeber content rendered on /[crane-type] pages.
 * Lets us merge standalone /ratgeber/* articles into the main type pages
 * to consolidate SEO equity.
 */

export interface CraneRatgeberUseCase {
  title: string
  description: string
}

export interface CraneRatgeber {
  /** Things typically included in the daily rental price */
  included: string[]
  /** Additional/optional costs not in the base price */
  extras: string[]
  /** Money-saving tips and planning advice */
  tips: string[]
  /** Optional: typical use cases with project size and price examples */
  useCases?: CraneRatgeberUseCase[]
}

export const craneRatgeber: Record<string, CraneRatgeber> = {
  'baukran-mieten': {
    included: [
      'Standardausrüstung (Ausleger, Lasthaken, Steuerung)',
      'Wartung & Verschleißteile während der Mietzeit',
      'Versicherung des Krans (Maschinenbruch, Diebstahl)',
      'Telefonsupport & Servicebereitschaft des Vermieters',
      'Standardgarantieleistung',
    ],
    extras: [
      'Montage / Demontage: 3.000–8.000€ (einmalig)',
      'Kranfundament: 1.000–3.000€ (entfällt bei Schnellmontagekranen)',
      'Transport zur Baustelle: 500–2.000€',
      'Statiknachweis Fundament: 500–2.000€',
      'Sondernutzungserlaubnis / Überschwenkgenehmigung: 50–500€',
      'Bediener (sofern nicht selbst gestellt): 50–80€/h',
      'Stromanschluss & Beleuchtung: nach Aufwand',
    ],
    tips: [
      'Faustregel: Baukran lohnt sich ab 3 Monaten Bauzeit oder 15–20 Einzeleinsätzen — bei kürzeren Projekten ist der Autokran günstiger.',
      'Schnellmontagekrane (bis 30m Hakenhöhe) brauchen oft kein Fundament — spart 1.000–3.000€ und 2–3 Tage Vorlauf.',
      'Genehmigungen früh beantragen: Sondernutzung & Überschwenk dauern 1–3 Wochen Bearbeitungszeit.',
      'Kranstandort schon im Bauantrag einzeichnen — spart einen separaten Antrag.',
      'Demontage-Termin rechtzeitig planen, vor allem wenn nach dem Kran noch Außenanlagen oder Pflasterung kommen.',
      'Bei Bauzeit über 6 Monate verhandeln — Vermieter geben oft 5–15% Rabatt auf den Monatspreis.',
    ],
    useCases: [
      {
        title: 'Einfamilien- oder Doppelhaus',
        description: 'Mauerarbeiten, Decken und Dachstuhl. Typisch: Schnellmontagekran bis 30m Hakenhöhe, 3–6 Monate, ca. 4.000–8.000€/Monat + 3.000€ Montage.',
      },
      {
        title: 'Mehrfamilienhaus / Wohnungsbau',
        description: '3–6 Geschosse mit Materialhebung über das gesamte Baufeld. Typisch: mittlerer Obendreher 30–50m, 6–12 Monate, ca. 8.000–15.000€/Monat + 5.000€ Montage.',
      },
      {
        title: 'Großbaustelle / Hochhaus',
        description: 'Hochhausbau, Hotelkomplex, Klinik. Typisch: großer Obendreher über 50m, 12–24 Monate, ca. 15.000–25.000€/Monat + 6.000–8.000€ Montage.',
      },
      {
        title: 'Industriebau & Hallen',
        description: 'Lager-, Produktionshallen, Logistikzentren. Typisch: mittlerer Obendreher, 4–8 Monate, oft kombiniert mit Autokran-Einsätzen für Stahlbau.',
      },
    ],
  },

  'autokran-mieten': {
    included: [
      'Ausgebildeter Kranführer (gesetzlich vorgeschrieben)',
      'Auf- und Abbau des Krans',
      '8 Stunden Arbeitszeit',
      'Haftpflichtversicherung',
      'Standardanschlagmittel',
    ],
    extras: [
      'An-/Abfahrt: ca. 2–4€/km',
      'Überstunden: 80–150€/h',
      'Wochenend-Zuschlag: 20–30%',
      'Sondertraversen: nach Aufwand',
      'Straßensperrung / Sondernutzungsgenehmigung: 100–500€',
    ],
    tips: [
      'Mindestmietdauer beträgt bei den meisten Anbietern 4 Stunden — kürzere Einsätze sind selten möglich.',
      'Planen Sie Material und Einbauort vorab — jede Wartestunde kostet 80–150€ extra.',
      'Bei mehrtägigen Einsätzen lohnt sich eine Wochenmiete (15–25% Ersparnis gegenüber Tagesmiete).',
      'Vergleichen Sie 3+ Anbieter — Preise schwanken regional um bis zu 30%.',
      'Frühzeitig buchen (1–2 Wochen Vorlauf) — kurzfristige Buchungen haben Aufpreis.',
    ],
    useCases: [
      {
        title: 'Hausbau & Dachstuhl',
        description: 'Dachstuhl setzen, Fertigteile heben, Betonelemente positionieren. Typisch: 30–50t Autokran, 1 Tag, 500–800€.',
      },
      {
        title: 'Industriemontage',
        description: 'Maschinen, Lüftungsanlagen, Transformatoren einsetzen. Typisch: 50–160t Autokran, 1–2 Tage, 1.000–2.000€/Tag.',
      },
      {
        title: 'Baumfällung & Garten',
        description: 'Schwere Baumstämme heben, Pool einsetzen, Gartenhaus aufstellen. Typisch: 30t Autokran, halber Tag, 400–600€.',
      },
      {
        title: 'Windkraft & Infrastruktur',
        description: 'Windkraftanlagen errichten, Brückenteile setzen, Stahlkonstruktionen montieren. Typisch: 250–500t, mehrere Tage.',
      },
    ],
  },
}

export function getRatgeberForCraneType(slug: string): CraneRatgeber | null {
  return craneRatgeber[slug] ?? null
}
