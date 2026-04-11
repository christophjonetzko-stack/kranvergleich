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
