/**
 * Per-crane-type ratgeber content rendered on /[crane-type] pages.
 * Lets us merge standalone /ratgeber/* articles into the main type pages
 * to consolidate SEO equity.
 */

export interface CraneRatgeberUseCase {
  title: string
  description: string
}

/**
 * Tragkraft class — one row in the size-class matrix.
 * Captures the long-tail "autokran 30 tonnen" / "mobilkran 100t" queries
 * without spinning up new thin pages.
 */
export interface CraneSizeClass {
  /** Headline like "Kompakt-Autokran 25–35t" */
  label: string
  /** Short display tonnage, e.g. "25–35t" */
  tonnage: string
  /** Typical reach / hook height, e.g. "30–35m" */
  reach?: string
  /** One-liner describing who typically rents this class */
  useCase: string
  /** Typical day-rate range for this class */
  priceRange: string
}

/**
 * Manufacturer reference — reporting, not endorsement.
 * Covers the "liebherr autokran mieten" / "böcker dachdeckerkran" branded queries.
 */
export interface CraneBrand {
  name: string
  /** Most commonly rented model lines for this brand */
  models: string[]
  /** Short factual note — market position, country, product family */
  note?: string
}

/**
 * Alternative crane type for the "when not this, then what" question.
 * Drives internal linking to sibling type pages.
 */
export interface CraneAlternative {
  name: string
  slug: string
  whenBetter: string
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
  /** Tragkraft matrix — one row per typical size class */
  sizeClasses?: CraneSizeClass[]
  /** Manufacturer/model reference for branded long-tail */
  brands?: CraneBrand[]
  /** Sibling crane types and when to prefer them */
  alternatives?: CraneAlternative[]
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

  'dachdeckerkran-mieten': {
    included: [
      'Funkfernsteuerung (Bedienung vom Boden aus)',
      'Einweisung durch den Vermieter (30–60 Minuten gemäß DGUV Vorschrift 52)',
      'Transport zur Baustelle (bei vielen Vermietern bis 50km inkl.)',
      'Standardlasthaken & Anschlagmittel',
      'Versicherung des Krans',
    ],
    extras: [
      'Anfahrt über 50km: ca. 1,50–3€/km',
      'Wochenend-Zuschlag: 15–25%',
      'Bediener (optional, wenn Sie nicht selbst bedienen wollen): 40–60€/h',
      'Sondernutzungserlaubnis bei Aufstellung auf öffentlichem Grund: 50–200€',
      'Spezialhebezeuge (Glasträger, Plattenheber): 20–50€/Tag extra',
      'Verlängerung Mietdauer: nach Tagessatz',
    ],
    tips: [
      'Kein Kranführerschein nötig — eine 30-60-minütige Einweisung gemäß DGUV Vorschrift 52 reicht aus. Mindestalter: 18 Jahre.',
      'Für Dacharbeiten ist der Dachdeckerkran 60–70% günstiger als ein Autokran — wählen Sie ihn immer, wenn Hakenhöhe bis 30m reicht.',
      'Wochenmiete spart 15–30% gegenüber 7 Tagessätzen — bei Sanierungen über 5 Tage sofort fragen.',
      'Stellplatz prüfen: ein Dachdeckerkran braucht nur ca. 2,5×6m an der Straße — passt auch in enge Wohngebiete.',
      'Aufbauzeit nur 15–30 Minuten — der Kran kann am Morgen aufgestellt und abends abgebaut werden, falls Stellplatz knapp ist.',
      'Bei höheren Gebäuden (über 9 Stockwerke / 30m) brauchen Sie stattdessen einen Autokran — Dachdeckerkran reicht nicht.',
    ],
    useCases: [
      {
        title: 'Dachsanierung',
        description: 'Dachziegel, Dämmstoffe, Dachfenster, Lattung aufs Dach heben. Typisch: 1–2 Wochen, 1.000–2.500€ Wochenmiete.',
      },
      {
        title: 'Solaranlagen-Montage',
        description: 'PV-Module, Montagegestelle, Wechselrichter und Verkabelung transportieren. Typisch: 2–5 Tage, 400–1.500€.',
      },
      {
        title: 'Schornsteinsanierung',
        description: 'Schornsteinteile, Edelstahlrohre, Kaminköpfe auf Dachhöhe bringen. Typisch: 1–3 Tage, 200–800€.',
      },
      {
        title: 'Dachbegrünung & Klimaanlagen',
        description: 'Substrat, Pflanzkassetten, Drainageschichten oder Außengeräte aufs Flachdach heben. Typisch: 1–2 Tage, 200–600€.',
      },
    ],
  },

  'mobilkran-mieten': {
    sizeClasses: [
      {
        label: 'Stadtkran 25–40t',
        tonnage: '25–40t',
        reach: '30–40m',
        useCase: 'Kompakte 3-Achser für Innenstadtbaustellen, enge Zufahrten, kurze Standzeiten — die kleinste Mobilkran-Klasse, oft als Autokran bezeichnet',
        priceRange: '500–800€/Tag',
      },
      {
        label: 'Standard-Mobilkran 55–80t',
        tonnage: '55–80t',
        reach: '40–55m',
        useCase: 'Standardmontagen in Gewerbe und Industrie — 4-Achser, All-Terrain-Fahrwerk, der häufigste Mobilkran im mittleren Segment',
        priceRange: '900–1.400€/Tag',
      },
      {
        label: 'Mittelschwer 100–130t',
        tonnage: '100–130t',
        reach: '55–70m',
        useCase: 'Industriemontage, Betonfertigteile, Brückenteile, Mittelspannungs-Trafos — 5-Achser, ab hier typische Grenze zwischen Autokran- und Mobilkran-Miete',
        priceRange: '1.400–2.200€/Tag',
      },
      {
        label: 'Schwer 200–250t',
        tonnage: '200–250t',
        reach: '70–85m',
        useCase: 'Stahlbauhallen, Hochregallager, kleine Windkraftanlagen, Klärwerkskomponenten — 5-6-Achser, bei Anfahrt oft Schwertransportgenehmigung nötig',
        priceRange: '2.200–3.500€/Tag',
      },
      {
        label: 'Großkran 300–400t',
        tonnage: '300–400t',
        reach: '80–100m',
        useCase: 'Windkraftanlagen bis 120m Nabenhöhe, Brückenträger, Petrochemie-Komponenten — 6-7-Achser, mehrtägige Projekte mit eigenem Aufbau-Team',
        priceRange: '3.500–6.000€/Tag',
      },
      {
        label: 'Schwerstkran ab 500t',
        tonnage: 'ab 500t',
        reach: '100m und mehr',
        useCase: 'Megastruktur-Montage: Offshore-Vorbereitung, Raffinerie-Kolonnen, 160m+ Windkraft-Onshore — 7-9-Achser, oberhalb von ~500t oft Raupenkran wirtschaftlicher',
        priceRange: 'ab 6.000€/Tag',
      },
    ],
    brands: [
      {
        name: 'Liebherr',
        models: ['LTM 1050-3.1', 'LTM 1100-5.2', 'LTM 1230-5.1', 'LTM 1400-7.1', 'LTM 1750-9.1'],
        note: 'Marktführer im deutschen Mobilkran-Segment mit Werk in Ehingen. Die LTM-Serie (L = Luftgefederter Teleskopkran, T = Teleskopausleger, M = Mobilkran) deckt 20 bis 1.200 Tonnen ab.',
      },
      {
        name: 'Grove',
        models: ['GMK 3060L', 'GMK 4100L-1', 'GMK 5150L', 'GMK 6400-1', 'GMK 7450'],
        note: 'Teil der Manitowoc-Gruppe. Die GMK-Serie (Grove Mobile Kran) ist besonders im 4-5-Achser-Segment präsent; die Siebenachser der 7000er-Reihe konkurrieren direkt mit Liebherr.',
      },
      {
        name: 'Tadano',
        models: ['AC 3.055L-1', 'AC 4.100L-1', 'AC 5.250-1', 'AC 7.450-1'],
        note: 'Japanischer Hersteller mit Werk in Zweibrücken (übernommen von Demag 2019). Die AC-Serie (All-Terrain Crane) ist der direkte Gegenspieler zu Liebherr LTM, besonders stark von 100 bis 450 Tonnen.',
      },
      {
        name: 'Manitowoc',
        models: ['MLC 100', 'MLC 150-1', 'MLC 300'],
        note: 'US-amerikanische Muttergesellschaft von Grove. Eigene Manitowoc-Modelle sind in Deutschland seltener; meist trifft man die Marke über Grove-Maschinen in deutschen Vermietflotten.',
      },
    ],
    alternatives: [
      {
        name: 'Autokran',
        slug: 'autokran-mieten',
        whenBetter: 'Unter 100t Tragkraft oder bei kürzeren Projekten mit einfacher Anfahrt auf befestigten Straßen. Autokran und Mobilkran werden oft synonym verwendet — entscheidend sind Tragkraft und Fahrwerk, nicht die Bezeichnung.',
      },
      {
        name: 'Raupenkran',
        slug: 'raupenkran-mieten',
        whenBetter: 'Ab 500t Tragkraft, auf weichem Untergrund (Moor, aufgeschütteter Bauboden) oder wenn der Kran die Last fahrend versetzen muss. Raupenkrane sind bei Langzeit-Projekten wirtschaftlicher — kein täglicher An- und Abbau.',
      },
      {
        name: 'Minikran',
        slug: 'minikran-mieten',
        whenBetter: 'Bei Innenhöfen, Durchfahrten unter 2m oder Einsätzen im Gebäudeinneren. Ein Mobilkran ab 25t benötigt mindestens 3×8m Stellfläche und 3m Durchfahrtshöhe — in der Stadt oft nicht vorhanden.',
      },
      {
        name: 'Dachdeckerkran',
        slug: 'dachdeckerkran-mieten',
        whenBetter: 'Bei reinen Dacharbeiten bis 30m Hakenhöhe. 60–70% günstiger als ein kleiner Mobilkran und benötigt keine Schwertransport-Genehmigung für die Anfahrt.',
      },
    ],
    included: [
      'Ausgebildeter Kranführer (gesetzlich vorgeschrieben)',
      'Bei Großkranen ab 250t: meist mehrere Kranführer + Einweiser',
      'Standardausrüstung (Ausleger, Hauptkette, Lasthaken)',
      'Haftpflichtversicherung des Krans',
      'Standard-Auf- und Abbau bei kleineren Mobilkranen',
    ],
    extras: [
      'Anfahrt: 2–5€/km (bei Mobilkranen oft der größte Zusatzposten)',
      'Auf-/Abbau bei Großkranen ab 250t: 500–5.000€ separat',
      'Schwertransport ab ca. 100t Tragkraft: 1.000–10.000€',
      'Sondergenehmigungen Schwertransport: 200–1.500€',
      'Wochenend-Zuschlag: 20–30%',
      'Begleitfahrzeuge bei Schwertransport: 500–2.000€',
      'Sondertraversen / Spezialanschlagmittel: nach Aufwand',
    ],
    tips: [
      'Holen Sie immer mindestens 3 Angebote ein — bei Mobilkranen schwanken die Preise zwischen Anbietern um 30–50%, vor allem durch unterschiedliche Anfahrtswege.',
      'Anfahrt ist der größte versteckte Kostenfaktor — wählen Sie einen Vermieter in Ihrer Region (max. 100km Entfernung).',
      'Faustregel Tragkraft: bis 100t reicht ein Autokran, 100–500t je nach Verfügbarkeit, ab 500t ist der Mobilkran die einzige Option.',
      'Großkrane (ab 250t) 4–8 Wochen im Voraus buchen — kurzfristig sind sie kaum verfügbar.',
      'Hochsaison März–Oktober: zusätzliche 2–4 Wochen Vorlauf einplanen.',
      'Bei mehrtägigem Einsatz Wochenmiete vereinbaren — spart 20–30% gegenüber Tagesmiete.',
    ],
    useCases: [
      {
        title: 'Stahlbau & Industriemontage',
        description: 'Schwere Stahlträger, Maschinenteile, Transformatoren einsetzen. Typisch: 40–250t Mobilkran, 1–3 Tage, 600–2.500€/Tag.',
      },
      {
        title: 'Brückenbau',
        description: 'Brückenträger und Fertigteile auf Pfeiler heben. Typisch: 250–1.000t Mobilkran, mehrere Tage, 1.500–5.000€/Tag + Schwertransport.',
      },
      {
        title: 'Windkraftanlagen',
        description: 'Türme, Gondeln und Rotorblätter auf bis zu 160m Höhe montieren. Typisch: 500–1.200t Mobilkran, mehrere Wochen Einsatz, 2.500–10.000€/Tag.',
      },
      {
        title: 'Kraftwerke & Raffinerien',
        description: 'Kessel, Kolonnen, Reaktorbehälter heben — höchste Tragkraftanforderungen. Typisch: 500–1.000t+, langzeit, oft mit mehreren Kränen im Tandem.',
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
    sizeClasses: [
      {
        label: 'Kompakt-Autokran bis 15t',
        tonnage: 'bis 15t',
        reach: '20–27m',
        useCase: 'Einfamilienhäuser, Pool- und Gartenhausmontage, Kleinbaustellen in engen Wohngebieten',
        priceRange: '350–550€/Tag',
      },
      {
        label: 'Standard-Autokran 25–35t',
        tonnage: '25–35t',
        reach: '30–35m',
        useCase: 'Dachstuhl bei Ein- und Mehrfamilienhäusern, Hallenbau, Klimaanlagen auf Flachdächern — die in Deutschland am häufigsten vermietete Klasse',
        priceRange: '500–800€/Tag',
      },
      {
        label: 'Mittelklasse 50–60t',
        tonnage: '50–60t',
        reach: '40–50m',
        useCase: 'Industriemontage, mittlerer Stahlbau, Fertigteilhäuser, Brunnenbohrgeräte und Kompressorstationen setzen',
        priceRange: '800–1.200€/Tag',
      },
      {
        label: 'Schwere Klasse 80–100t',
        tonnage: '80–100t',
        reach: '50–60m',
        useCase: 'Große Dachstühle, Hallendachbinder, Beton-Fertigteile, Photovoltaik-Großanlagen, Mittelspannungs-Transformatoren',
        priceRange: '1.200–1.800€/Tag',
      },
      {
        label: 'Heavy 130–160t',
        tonnage: '130–160t',
        reach: '60–70m',
        useCase: 'Kraftwerkskomponenten, Brückenbauteile, industrielle Stahlkonstruktionen, Silos und Kessel',
        priceRange: '1.800–2.800€/Tag',
      },
      {
        label: 'Großkran ab 250t',
        tonnage: 'ab 250t',
        reach: '80m und mehr',
        useCase: 'Windkraftanlagen, Schwerlastmontage, Brückenträger, Stadionüberdachungen — meist mehrtägige Projekte',
        priceRange: 'ab 3.000€/Tag',
      },
    ],
    brands: [
      {
        name: 'Liebherr',
        models: ['LTM 1030', 'LTM 1060', 'LTM 1090', 'LTM 1130', 'LTM 1250', 'LTM 1500'],
        note: 'Marktführer in Deutschland mit Werk in Ehingen. Die LTM-Serie deckt 20 bis 1.200 Tonnen ab und stellt einen Großteil der deutschen Vermietflotten.',
      },
      {
        name: 'Tadano',
        models: ['ATF 50G-3', 'ATF 110G-5', 'ATF 220G-5', 'ATF 400G-6'],
        note: 'Japanischer Hersteller mit deutschem Werk in Zweibrücken (ehemals Demag / Faun). Die ATF-Serie ist in allen Tragkraftklassen bis 400t im Einsatz.',
      },
      {
        name: 'Grove',
        models: ['GMK 3060', 'GMK 5150L', 'GMK 6400', 'GMK 7550'],
        note: 'Teil der Manitowoc-Gruppe, US-amerikanischer Marktauftritt. Die GMK-Serie ist vor allem im mittleren und schweren Segment verbreitet.',
      },
      {
        name: 'Terex',
        models: ['AC 35', 'AC 100/4L', 'AC 250-1'],
        note: 'Deutscher Hersteller, hat den Mobilkranmarkt 2021 verlassen. Viele AC-Modelle sind noch in Vermietflotten im Einsatz und über den Gebrauchtmarkt verfügbar.',
      },
    ],
    alternatives: [
      {
        name: 'Mobilkran',
        slug: 'mobilkran-mieten',
        whenBetter: 'Ab 100t Tragkraft oder bei echten All-Terrain-Einsätzen mit langen Anfahrten über unbefestigte Wege. In der Vermietpraxis werden die Begriffe oft synonym verwendet — entscheidend sind Tragkraft und Fahrwerkstyp, nicht die Bezeichnung.',
      },
      {
        name: 'Raupenkran',
        slug: 'raupenkran-mieten',
        whenBetter: 'Bei weichem Untergrund (Moor, aufgeweichte Baustelle), Lasten über 500t oder wenn der Kran mit Last fahren können muss. Ein Raupenkran kann die Last beim Verfahren halten, ein Autokran nicht.',
      },
      {
        name: 'Dachdeckerkran',
        slug: 'dachdeckerkran-mieten',
        whenBetter: 'Bei reinen Dacharbeiten bis 30m Hakenhöhe. Deutlich günstiger (60–70% Ersparnis) und benötigt keinen Kranführerschein — eine 30-minütige Einweisung reicht.',
      },
      {
        name: 'Minikran',
        slug: 'minikran-mieten',
        whenBetter: 'Bei Innenhöfen, Toren unter 2m Durchfahrtsbreite, Kellerabgängen oder Einsätzen im Gebäude. Ein Autokran kommt dort nicht hin; Mini-/Spinnenkrane fahren auch durch Standard-Türen.',
      },
      {
        name: 'Ladekran',
        slug: 'ladekran-mieten',
        whenBetter: 'Bei reinem Transport mit Kurzeinsatz am Ziel — Paletten vom LKW abladen, Container be- und entladen. Der Ladekran ist fest am LKW montiert und im Transportpreis inkludiert.',
      },
    ],
  },

  'minikran-mieten': {
    included: [
      'Transport zur Baustelle (bei vielen Vermietern bis 50km inkl.)',
      'Einweisung durch den Vermieter (30–60 Minuten gemäß DGUV Vorschrift 52)',
      'Funkfernsteuerung für Bedienung vom Boden aus',
      'Standardlasthaken & Anschlagmittel',
      'Versicherung des Krans',
    ],
    extras: [
      'Anfahrt über 50km: ca. 1,50–3€/km',
      'Glassauger / Vakuumheber für Glasmontage: 50–120€/Tag',
      'Spezialtraversen, Plattenheber: 30–80€/Tag',
      'Bediener (optional, wenn Sie nicht selbst bedienen wollen): 50–80€/h',
      'Wochenend-Zuschlag: 15–25%',
      'Stromanschluss-Adapter bei reinen Elektromodellen (Innenraum-Einsätze)',
    ],
    tips: [
      'Türbreite vor der Buchung messen — die meisten Minikrane brauchen mindestens 80cm Durchfahrbreite, einige Spider-Crane-Modelle passen ab 60cm.',
      'Für Innenräume ein Elektro-Akku-Modell wählen — keine Abgase, deutlich leiser (unter 65 dB), kein Stromkabel nötig.',
      'Raupen-Minikran (Spinnenkran) vs LKW-Minikran: Raupen für weichen Untergrund und engste Zufahrten, LKW-Basis für direkten Straßeneinsatz.',
      'Tragkraft IMMER im Zusammenhang mit der Ausladung prüfen — bei maximaler Reichweite sinkt die Nennlast oft auf 20–30%.',
      'Für Glasmontage gezielt nach Modellen mit Vakuumsauger-Vorbereitung fragen — nicht jeder Minikran hat die Halterung.',
      'Wochenmiete ab 3 Einsatztagen rechnet sich fast immer — 15–25% Ersparnis gegenüber 3 Tagesmieten.',
    ],
    useCases: [
      {
        title: 'Glasmontage & Fassaden',
        description: 'Fensterelemente, Schaufenster, Glastüren, PV-Module, Glasfassaden heben. Typisch: Elektro-Minikran mit Vakuumheber, 1–2 Tage, 350–600€/Tag.',
      },
      {
        title: 'Innenräume & Altbau-Sanierung',
        description: 'Kaminöfen, schwere Möbel, Treppenelemente, Heizkessel in Altbauten oder Dachböden positionieren. Typisch: Elektro-Minikran, 250–400€/Tag.',
      },
      {
        title: 'Friedhof & Grabsteinmontage',
        description: 'Grabsteine, Grabdenkmäler, Grabeinfassungen aufstellen. Typisch: kompakter Raupen-Minikran, 300–500€/Tag, halber bis ganzer Tag.',
      },
      {
        title: 'Hinterhöfe & enge Zufahrten',
        description: 'Projekte, wo ein Autokran nicht rankommt — Baumaterial in Innenhöfe, Pools, Gartenhäuser, Skulpturen. Typisch: 1–3 Tage, 250–400€/Tag.',
      },
    ],
  },

  'raupenkran-mieten': {
    included: [
      'Ausgebildeter Kranführer (bei Großkranen oft mehrere + Einweiser)',
      'Standardausleger inkl. Hauptausrüstung',
      'Versicherung des Krans (Maschinenbruch, Haftpflicht)',
      'Kranmonteur-Team für Auf- und Abbau',
      'Standardanschlagmittel',
    ],
    extras: [
      'Auf-/Abbau: 5.000–30.000€ einmalig (mehrere Tage Arbeit, oft mit Assist-Kran)',
      'Schwertransport zur Baustelle: 5.000–50.000€ (Tiefladerkombination, mehrere LKW)',
      'Sondergenehmigungen für Schwertransport: 500–5.000€',
      'Bodenplatten / Lastverteilungsmatten bei weichem Untergrund: nach Aufwand',
      'Luffjib / Wippausleger: 10–20% Aufpreis',
      'Superlift / Derrick-System für extreme Lasten: 20–30% Aufpreis',
      'Assist-Kran für den Aufbau des Raupenkrans: 2.000–8.000€',
    ],
    tips: [
      'Raupenkrane 6–12 Wochen im Voraus buchen — Verfügbarkeit ist extrem knapp, besonders bei Modellen über 500t.',
      'Tragkraftdiagramm (Lastmoment) genau prüfen — die Nennlast gilt nur bei kurzer Ausladung, bei voller Reichweite oft nur 15–25%.',
      'Baugrund-Anforderung vom Vermieter schriftlich bestätigen lassen — Raupenkrane brauchen je nach Tragkraft 1–3 kg/cm² Traglast.',
      'Unter 500t Nutzlast oft Mobilkran günstiger — keine wochenlange Transport- und Aufbaulogistik.',
      'Aufbauzeit einkalkulieren — 2–5 Tage allein für Montage, die nicht zur Produktivzeit zählen.',
      'Tandemhub mit zwei kleineren Kranen erwägen statt einem Riesen-Raupenkran — oft günstiger und flexibler.',
    ],
    useCases: [
      {
        title: 'Windkraftanlagen-Errichtung',
        description: 'Türme, Gondeln und Rotorblätter bis 160m Höhe montieren. Typisch: 500–1.200t Raupenkran, mehrere Wochen Einsatz, 4.000–8.000€/Tag + Transport.',
      },
      {
        title: 'Brückenbau',
        description: 'Brückenträger und Fertigteile auf Pfeiler setzen. Typisch: 250–1.000t Raupenkran, mehrere Wochen, oft im Tandembetrieb.',
      },
      {
        title: 'Weicher Untergrund & Moor',
        description: 'Baustellen auf Moor, Sand oder aufgeweichter Fläche, wo ein Mobilkran einsinken würde. Raupenfahrwerk verteilt die Last auf große Fläche.',
      },
      {
        title: 'Kraftwerke, Raffinerien & Chemieanlagen',
        description: 'Kessel, Kolonnen, Reaktorbehälter und Rohrbrücken mit Tragkraft bis 3.000t heben. Typisch: Monatelange Projekte, Großraupenkrane ab 1.000t.',
      },
    ],
  },

  'anhaengerkran-mieten': {
    included: [
      'Transport auf der PKW-Anhängerkupplung — Sie fahren den Kran selbst',
      'Einweisung durch den Vermieter (ca. 30 Minuten)',
      'Funkfernsteuerung für Bedienung vom Boden',
      'Kurbelstützen (manuell oder hydraulisch)',
      'Standardlasthaken & Anschlagmittel',
      'Versicherung des Krans',
    ],
    extras: [
      'Anlieferung durch Vermieter (wenn kein passender PKW verfügbar): 80–250€',
      'Zugfahrzeug-Vermietung: 60–120€/Tag',
      'Vollkasko-Versicherung (Diebstahl, Unfall): 15–30€/Tag',
      'Glassauger für Glasmontage: 30–60€/Tag',
      'Spezialtraversen: 20–50€/Tag',
      'Wochenend-Zuschlag: 10–20%',
    ],
    tips: [
      'Anhängerkupplung Ihres PKW prüfen — Zugkraft muss zum Anhängerkran-Gewicht passen (meist 1.300–3.500 kg Gesamtgewicht).',
      'Führerschein Klasse BE nötig bei Anhängerkranen über 750 kg — der normale Klasse-B-Schein reicht dafür NICHT aus.',
      'Aufbauzeit nur 15–20 Minuten — ideal für kurze Einsätze, kann mehrmals am Tag versetzt werden.',
      'Hakenhöhe und Ausladung vor der Buchung prüfen — typisch 10–25m Höhe, max. 1,5t Tragkraft.',
      'Bei Dacharbeiten über 15m Höhe lieber einen Dachdeckerkran wählen — deutlich größere Reichweite.',
      'Rückgabezeiten klären — manche Vermieter haben 24/7-Rückgabeboxen, andere nur Werktagsöffnungszeiten.',
    ],
    useCases: [
      {
        title: 'Dachdecker-Kleinbetrieb',
        description: 'Ziegel, Lattung, Dachfenster aufs Dach heben bei Einfamilienhäusern. Typisch: 1–3 Tage, 200–350€/Tag. Günstigste Option für Dacharbeiten.',
      },
      {
        title: 'Garten- & Landschaftsbau',
        description: 'Findlinge, Bäume, Wasserbecken, Pflanztröge und Skulpturen setzen. Ideal für Ein-Mann-Betriebe und Einzelprojekte.',
      },
      {
        title: 'Grabsteine & Friedhofsarbeiten',
        description: 'Grabsteine bis 1.500 kg, Grabeinfassungen, kleinere Grabdenkmäler aufstellen. Typisch: halber Tag, 150–250€.',
      },
      {
        title: 'Baumaterialtransport zur Baustelle',
        description: 'Paletten, Säcke, Werkzeug und Kleinmaterial zu schwer zugänglichen Baustellen heben. Flexibel durch PKW-Transport.',
      },
    ],
  },

  'ladekran-mieten': {
    included: [
      'LKW mit Ladekran als Komplettpaket',
      'LKW-Fahrer mit Ladekranführer-Qualifikation',
      'Versicherung des Krans und Fahrzeugs',
      'Standard-Anschlagmittel (Schlingen, Haken)',
      'Funk- oder manuelle Steuerung',
    ],
    extras: [
      'Anfahrt: 1,50–3€/km über Standardradius hinaus',
      'Überstunden: 60–90€/h',
      'Wochenend- & Feiertags-Zuschlag: 20–30%',
      'Sonderausrüstung (Palettengabel, Container-Spreader, Greifer): 30–100€/Tag',
      'Stundensatz bei Kurzeinsätzen: 80–120€/h inkl. LKW + Fahrer',
      'Entsorgung / Abtransport von Material: nach Aufwand',
    ],
    tips: [
      'Tragkraft sinkt dramatisch mit der Ausladung — bei max. Reichweite oft nur 1/3 der Nennlast. Vorher Lastdiagramm prüfen.',
      'Die gängigen Marken (Hiab, Palfinger, Atlas, Fassi) haben ähnliche Preisniveaus — bei der Auswahl eher auf Reichweite achten.',
      'Ladekran + LKW als Komplettpaket ist fast immer günstiger als LKW und separater Kran einzeln zu buchen.',
      'Knickarm-Reichweite prüfen: 5m reichen oft nicht, um mittig auf der Ladefläche abzusetzen. 8–10m sind typisch empfehlenswert.',
      'Bei regelmäßigem Bedarf (Speditionen, Baustoffhandel) lohnt Langzeitmiete — 15–30% Rabatt ab einem Monat.',
      'Funkfernsteuerung gegen Aufpreis wert — der Fahrer kann neben der Last stehen und hat bessere Sicht als aus der Kabine.',
    ],
    useCases: [
      {
        title: 'Baustoffhandel — Paletten auf die Baustelle',
        description: 'Ziegel, Zementpaletten, Dachziegel, Pflastersteine direkt von der Ladefläche auf die Baustelle heben. Typisch: halber Tag, 300–500€.',
      },
      {
        title: 'Spedition & Container-Logistik',
        description: 'Container, Maschinen, Gitterboxen be- und entladen. Oft 2–4h Kurzeinsätze, 250–500€ pauschal.',
      },
      {
        title: 'Umzug schwerer Gegenstände',
        description: 'Tresore, Werkstattmaschinen, Pianos, Großskulpturen oder Glasobjekte umsetzen. Typisch: halber Tag, 350–500€.',
      },
      {
        title: 'Abbruch- & Entsorgungslogistik',
        description: 'Bauschutt, Sperrgut oder Altmaterial vom Dach direkt in die Mulde heben. Oft mit Greifer-Aufsatz, 400–700€/Tag.',
      },
    ],
  },
}

export function getRatgeberForCraneType(slug: string): CraneRatgeber | null {
  return craneRatgeber[slug] ?? null
}
