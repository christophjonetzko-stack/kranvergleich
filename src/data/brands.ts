// Crane brand metadata for /marke/<slug> pages. Each entry maps a URL slug to
// the canonical brand name as stored in companies.brands_offered[] (must match
// exactly — LLM extraction uses these spellings). Only brands with ≥5 firms
// in the catalog as of 2026-05-20 are listed here. Adding a 4th brand below
// the 5-firm threshold creates thin-content / Helpful Content Update risk.

export interface BrandData {
  slug: string                  // URL slug, e.g. "liebherr"
  name: string                  // Canonical name in companies.brands_offered[]
  displayName: string           // What renders in H1
  origin: string                // "Deutschland", "Frankreich", etc — for intro paragraph
  founded: number               // Year founded, for intro
  introShort: string            // ≤155 chars meta description
  introLong: string             // ~250-400 word intro paragraph for the page body
  relatedCraneTypes: string[]   // Crane type slugs this brand is known for; cross-link target
  faqs: Array<{ question: string; answer: string }>
}

export const BRANDS: BrandData[] = [
  {
    slug: 'liebherr',
    name: 'Liebherr',
    displayName: 'Liebherr',
    origin: 'Deutschland',
    founded: 1949,
    introShort: 'Liebherr-Krane mieten in Deutschland: Mobilkrane (LTM), Raupenkrane (LR) und Turmdrehkrane (MK). Anbieter vergleichen, Preise & Angebote.',
    introLong: 'Liebherr ist mit Sitz in Ehingen (Donau) der weltweit größte Hersteller von Mobil- und Raupenkranen — die Marke prägt seit 1949 den Kran-Markt in Deutschland, Österreich und der Schweiz. Das Programm reicht vom kompakten Mobilkran LTM 1030-2.1 (30 t Tragkraft) über die mittlere Klasse LTM 1100-4.2 und LTM 1200-5.1 bis zum Schwerlast-Mobilkran LTM 1750-9.1 (750 t) und der Raupenkran-Reihe LR 1300 SX bis LR 11000 (1.000 t Tragkraft). Für den klassischen Hochbau bietet Liebherr unter der Bezeichnung MK (Mobilbaukran) eine Reihe selbstaufrichtender Krane an — die MK 88-4.1 und MK 140 sind in vielen deutschen Innenstädten bei Wohnungsbau- und Sanierungsprojekten im Einsatz. Die Marke gilt als Premium-Hersteller mit entsprechendem Wiederverkaufswert; ein gebrauchter Liebherr-Kran kostet typischerweise 30-50% weniger als ein Neugerät und behält gegenüber konkurrierenden Marken einen höheren Restwert.',
    relatedCraneTypes: ['mobilkran-mieten', 'autokran-mieten', 'raupenkran-mieten', 'baukran-mieten'],
    faqs: [
      {
        question: 'Welche Liebherr-Kran-Modelle gibt es zur Miete?',
        answer: 'Die in Deutschland am häufigsten vermieteten Liebherr-Modelle sind: LTM 1030-2.1 (30 t Mobilkran), LTM 1050-3.1 (50 t), LTM 1070-4.2 (70 t), LTM 1100-4.2 (100 t), LTM 1200-5.1 (200 t), LTM 1300-6.2 (300 t), LTM 1500-8.1 (500 t) und LTM 1750-9.1 (750 t). Bei den Mobilbaukranen sind die MK 88-4.1 (max. 24 t/m Lastmoment, bis 65 m Auslegerlänge) und MK 140-5.1 verbreitet. Raupenkrane vor allem im Hafen- und Großanlagenbau: LR 1300 SX (300 t), LR 1500, LR 1750, LR 11000.',
      },
      {
        question: 'Was kostet ein Liebherr-Kran zur Miete in Deutschland?',
        answer: 'Liebherr-Krane sind aufgrund der hohen Anschaffungskosten meist im oberen Mietpreis-Segment. Richtwerte: LTM 1030-2.1 (30 t) ca. 600-900 €/Tag, LTM 1100-4.2 (100 t) ca. 1.500-2.200 €/Tag, LTM 1200-5.1 (200 t) ca. 2.500-3.800 €/Tag, LTM 1750-9.1 (750 t) ab 8.000 €/Tag. Mobilbaukrane MK 88-4.1 / MK 140-5.1 liegen bei 350-600 €/Tag. Alle Preise inkl. Kranführer (bei Mobilkranen gesetzlich vorgeschrieben). Bei Wochen- oder Monatsmiete sind 30-50% Rabatt üblich.',
      },
      {
        question: 'Wo wird Liebherr gebaut?',
        answer: 'Mobilkrane (LTM-Serie) und Raupenkrane (LR-Serie) werden im Werk Ehingen an der Donau (Baden-Württemberg) produziert. Mobilbaukrane (MK-Serie) und Turmdrehkrane stammen aus dem Werk Biberach. Die Liebherr-Group als Ganzes hat Werke weltweit (über 50 Standorte), aber für den deutschen Kran-Markt sind Ehingen und Biberach die maßgeblichen Produktionsstätten. Service- und Ersatzteilversorgung läuft über das deutsche Händler- und Servicenetz.',
      },
      {
        question: 'Wie unterscheidet sich Liebherr von Tadano, Grove oder Demag?',
        answer: 'Liebherr ist Premium-Hersteller mit dem dichtesten deutschen Service-Netz und führend in der Schwerlast-Mobilkran-Klasse (>200 t). Tadano (japanisch, seit 2019 Eigentümer von Demag) ist im mittleren Segment 50-300 t stark vertreten. Grove (US-amerikanisch, Manitowoc-Konzern) hat seine Stärken bei Rough-Terrain-Kranen für Industrie. Bei den Mobilbaukranen ist Liebherr in Deutschland praktisch konkurrenzlos — die nächste vergleichbare Marke wäre Spierings (Niederlande). Für die Vermietung in Deutschland ist Liebherr durch die regionale Werksanbindung und Ersatzteil-Verfügbarkeit oft erste Wahl.',
      },
      {
        question: 'Welche Vermieter führen Liebherr-Krane in ihrer Flotte?',
        answer: 'Liebherr-Krane werden in Deutschland von einer großen Bandbreite an Vermietern angeboten — von regionalen Mittelständlern (zwischen 5 und 30 Krane in der Flotte) bis zu überregionalen Anbietern wie Felbermayr, Maxikraft, Wasel, BKL oder Salgert mit dreistelligen Flottengrößen. Diese Seite listet alle Anbieter, die mindestens einen Liebherr-Kran in ihrer Flotte führen.',
      },
      {
        question: 'Kann ich gebrauchte Liebherr-Krane kaufen?',
        answer: 'Ja — Liebherr selbst betreibt unter der Marke "Liebherr Used Equipment" einen offiziellen Gebrauchtmarkt. Gebrauchte LTM-Mobilkrane mit 5-10 Jahren und 8.000-15.000 Betriebsstunden kosten typischerweise 40-60% des Neupreises. Wichtig: Liebherr-Krane haben einen vergleichsweise hohen Restwert — ein 15 Jahre alter LTM 1100 mit gepflegter Wartungshistorie liegt oft noch bei 100.000-200.000 €. Mehr dazu in unserem Ratgeber Kran mieten oder kaufen.',
      },
    ],
  },
  {
    slug: 'potain',
    name: 'Potain',
    displayName: 'Potain',
    origin: 'Frankreich',
    founded: 1928,
    introShort: 'Potain-Turmdrehkrane mieten in Deutschland: MD-Serie, MDT-Serie und Untendreher. Anbieter im Vergleich, Preise & kostenlose Angebote.',
    introLong: 'Potain ist seit 1928 die führende europäische Marke für Turmdrehkrane (Baukrane) und gehört seit 2001 zum US-amerikanischen Manitowoc-Konzern. In Deutschland ist Potain der mit Abstand verbreitetste Turmdrehkran-Hersteller — die Modellreihen MD (Topless), MDT (Topless) und MR (Mit Spitze, Rauten-Ausleger) prägen praktisch jede Großbaustelle. Typische Mietmodelle sind die kompakten Untendreher Igo M 50/60/85 (Self-Erecting für Einfamilienhaus- und kleine Mehrfamilienhaus-Baustellen), die mittleren Topless-Krane MDT 178/189/219 (für Wohnungsbau bis 6-7 Geschosse) sowie die Großkrane MDT 268/389 mit bis zu 80 m Ausladung. Potain-Krane werden in Deutschland oft auf Monatsbasis vermietet — typische Mietdauer für ein Mehrfamilienhaus-Projekt liegt bei 6-12 Monaten. Die Wartungs- und Ersatzteil-Versorgung läuft über das Manitowoc-Servicenetz (in DE: Werk Wilhelmshaven plus Vertragspartner).',
    relatedCraneTypes: ['baukran-mieten'],
    faqs: [
      {
        question: 'Welche Potain-Modelle werden in Deutschland am häufigsten vermietet?',
        answer: 'Drei Modell-Familien dominieren: (1) Self-Erecting Untendreher Igo M 50, Igo M 60, Igo M 85 — für kleinere Einfamilienhaus- und Reihenhausprojekte, Aufbau in unter 24 Stunden. (2) Topless-Krane MDT 178, MDT 189, MDT 219, MDT 268 — Standard für Mehrfamilienhaus- und Bürobauten, 6-12 Monate Mietdauer typisch. (3) Großkrane MDT 389, MD 365 B, MR 295 — für Hochbau bis 25 Geschosse, Großprojekte mit 1-3 Jahren Standzeit.',
      },
      {
        question: 'Was kostet ein Potain-Turmdrehkran zur Miete?',
        answer: 'Untendreher Igo M 60 / M 85: ca. 2.500-4.000 €/Monat (inkl. Transport + Auf/Abbau ein einmaliger Pauschalbetrag von 3.000-6.000 €). Topless MDT 178 / 189: ca. 3.500-5.500 €/Monat. Großkrane MDT 268 / 389: ca. 6.000-10.000 €/Monat. Großprojekt-Sonderkonditionen bei Mietdauer >12 Monate. Wichtig: Potain-Krane werden in Deutschland fast immer auf Monatsbasis vermietet, nicht tageweise — Auf- und Abbau machen bei kurzen Mietzeiten den Gesamtpreis unwirtschaftlich.',
      },
      {
        question: 'Wie lange dauert der Aufbau eines Potain-Krans?',
        answer: 'Self-Erecting Untendreher (Igo M-Serie): 4-8 Stunden, oft am gleichen Tag wie die Anlieferung einsatzbereit. Topless MDT 178/189/219: 1-2 Tage Aufbau mit Hilfskran. Großkrane MDT 268/389: 2-4 Tage, oft auch mit Mehreren Tagesgängen wegen Sektion-Anzahl. Abbau dauert in der Regel halb so lange wie der Aufbau. Für die meisten Wohnungsbau-Projekte ist die Aufbau-Zeit im Gesamtprojektplan eingerechnet und nicht kritisch.',
      },
      {
        question: 'Welche Vermieter führen Potain-Krane in ihrer Flotte?',
        answer: 'Potain-Krane sind bei den großen deutschen Baukran-Spezialisten Standard — Baukrane Weidenhiller, Riedel Baukrane, Stach Baukran, Fa Uebel, Baukranvermietung Pennekamp und viele weitere mittelständische Vermieter führen Potain in ihrer Flotte. Diese Seite listet alle Anbieter, die mindestens einen Potain-Kran zur Vermietung anbieten.',
      },
      {
        question: 'Wie unterscheidet sich Potain von Liebherr-Turmdrehkranen?',
        answer: 'Liebherr (mit Werk in Biberach) dominiert in Deutschland den Mobilbaukran-Markt (MK-Serie) — selbstaufrichtende mobile Turmdrehkrane für innerstädtische Sanierung. Potain dominiert den stationären Turmdrehkran-Markt (klassische Untendreher und Topless-Krane). Beide Hersteller bauen exzellente Krane; die Wahl hängt vom Einsatzzweck ab: kurzer Einsatz mit Mobilanlieferung → Liebherr MK; mehrmonatige Großbaustelle → Potain MDT/MD. Bei den Self-Erecting Kranen (Igo-Serie bei Potain vs. Kid-Serie bei Liebherr) sind beide vergleichbar leistungsfähig.',
      },
      {
        question: 'Brauche ich für einen Potain-Kran einen Kranführerschein?',
        answer: 'Für die meisten Potain-Modelle ist ein Kranführerschein nicht erforderlich, wenn der Kranführer eine Einweisung durch einen Sachkundigen erhält (DGUV Vorschrift 52). In der Praxis übernimmt der Vermieter die Einweisung kostenfrei bei der Übergabe. Für Großkrane >100 t Tragkraft kann ein Sachkundenachweis empfohlen oder durch den Versicherer gefordert sein. Klären Sie das mit dem Vermieter im Angebot.',
      },
    ],
  },
  {
    slug: 'terex',
    name: 'Terex',
    displayName: 'Terex',
    origin: 'USA',
    founded: 1933,
    introShort: 'Terex-Krane mieten in Deutschland: Mobilkrane Challenger und AC-Serie, Raupenkrane CC. Anbieter im Vergleich.',
    introLong: 'Terex Corporation ist ein US-amerikanischer Maschinenbau-Konzern mit Hauptsitz in Norwalk (Connecticut) und Wurzeln bis 1933. Im deutschen Kranmarkt war Terex jahrzehntelang über die Tochter Terex-Demag (Werk Zweibrücken) präsent — eine Reihe von Mobilkran-Modellen wie der AC 40/2L, AC 100/4L oder AC 350/6 prägte die mittlere und schwere Klasse. 2019 verkaufte Terex die Mobil- und Raupenkran-Sparte (samt Werk Zweibrücken) an Tadano; seitdem werden die ehemaligen Terex-Demag-Modelle unter dem Namen "Tadano Demag" weitergeführt, während Terex selbst nur noch Pick-and-Carry-Krane (Franna), Tower Cranes (Terex Tower Cranes, ehemals Comedil/Peiner) und Cranes for Niche Markets im Programm hat. Viele in deutschen Vermieter-Flotten verbliebene Terex-Krane stammen aus der Vor-Tadano-Zeit (2019 und früher) — sie sind technisch identisch mit aktuellen Tadano-Demag-Modellen, da die gleichen Werke das gleiche Produkt bauen. Gebrauchte Terex-Mobilkrane sind oft eine wirtschaftliche Alternative zum Neukauf, da Marken-Restwert leicht unter Liebherr / Tadano-Niveau liegt.',
    relatedCraneTypes: ['mobilkran-mieten', 'autokran-mieten', 'baukran-mieten'],
    faqs: [
      {
        question: 'Welche Terex-Krane werden in Deutschland vermietet?',
        answer: 'In Vermieter-Flotten verbreitet: AC 40/2L (40 t Mobilkran), AC 55-3L (55 t), AC 80-2L (80 t), AC 100/4L (100 t), AC 200-1L (200 t), AC 350/6L (350 t) sowie Challenger 3160 (60 t) für Off-Road-Einsätze. Bei den Turmdrehkranen sind Terex-Modelle der Comedil-/Peiner-Serie vereinzelt anzutreffen. Hinweis: Modelle ab 2019/2020 werden formal als "Tadano Demag AC..." vermarktet, sind aber technisch identisch und in der Vermietung oft noch als "Terex AC..." gelistet.',
      },
      {
        question: 'Was kostet ein Terex-Kran zur Miete?',
        answer: 'Terex-Mobilkrane liegen preislich meist 10-20% unter vergleichbaren Liebherr-Modellen. Richtwerte: AC 40/2L (40 t) ca. 550-800 €/Tag, AC 100/4L (100 t) ca. 1.300-1.900 €/Tag, AC 200-1L (200 t) ca. 2.200-3.400 €/Tag. Bei Wochen-/Monatsmiete üblich 30-50% Rabatt. Wegen geringerer Stückzahl in deutschen Flotten kann die Verfügbarkeit regional schwanken; in Süddeutschland und Sachsen-Anhalt ist Terex traditionell stärker vertreten als in Norddeutschland.',
      },
      {
        question: 'Was ist mit Terex-Demag passiert?',
        answer: 'Terex hat 2019 die Mobil- und Raupenkran-Sparte mit dem Werk Zweibrücken (Pfalz) an den japanischen Hersteller Tadano verkauft. Seitdem werden die Modelle als "Tadano Demag" weitergeführt — gleiche Werke, gleiche Konstrukteure, gleiche Modellnummern (AC-Serie für All Terrain, CC-Serie für Crawler/Raupenkrane). Bestehende Terex-Demag-Krane in Vermieter-Flotten bleiben technisch unverändert; nur Ersatzteile und Service laufen seit 2019 über Tadano. Terex selbst konzentriert sich weltweit auf Pick-and-Carry-Krane, Tower Cranes und Specialty Equipment.',
      },
      {
        question: 'Welche Vermieter führen Terex-Krane in ihrer Flotte?',
        answer: 'Terex ist in Deutschland weiter verbreitet als die geringe Anzahl an gelisteten Anbietern suggeriert — viele Vermieter haben ältere Terex-Modelle parallel zu Liebherr und Tadano in der Flotte. Diese Seite listet die Vermieter, die Terex explizit in ihrer Flottenbeschreibung nennen. Bei der Sammelanfrage erhalten Sie oft auch Terex-Angebote von Anbietern, die mit anderen Marken im Hauptfokus arbeiten.',
      },
      {
        question: 'Wie unterscheidet sich Terex von Liebherr und Tadano?',
        answer: 'Liebherr (Ehingen) ist Premium-Hersteller mit höchstem Restwert und dichtestem deutschen Service-Netz. Tadano hat seit der Demag-Übernahme 2019 das Werk Zweibrücken übernommen und ist im mittleren Segment 50-300 t direkt mit Liebherr vergleichbar. Terex-Modelle aus Vor-2019-Produktion sind technisch eng verwandt mit aktuellen Tadano-Demag-Modellen — sie waren immer als preisbewusste Alternative zu Liebherr positioniert. Für Bauunternehmer ist die Wahl heute meist eine Frage der Verfügbarkeit beim Vermieter und nicht der Markenpräferenz.',
      },
    ],
  },
]

export function getBrandBySlug(slug: string): BrandData | undefined {
  return BRANDS.find((b) => b.slug === slug)
}

export function getAllBrandSlugs(): string[] {
  return BRANDS.map((b) => b.slug)
}
