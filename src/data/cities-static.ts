/**
 * Static cities list for SearchBox autocomplete.
 * Derived from cities_for_seo_FINAL.csv (cities with >= 3 companies).
 */
export interface CityInfo {
  slug: string
  name: string
  state: string
  companyCount: number
}

/**
 * Extended list of German cities for autocomplete (>20k population).
 * Cities without companies point to nearest city with companies via nearestSlug.
 */
export interface ExtendedCity {
  name: string
  slug: string
  state: string
  nearestSlug: string | null  // null = has own companies, otherwise slug of nearest city with firms
}

// allCities defined after seoCities (below).
// Exported for next.config.ts redirect generation — direct URLs to these
// cities 404 (no Supabase row), so we route them to nearestSlug via 307.
export const _extraCities: ExtendedCity[] = [
  { name: 'Aachen', slug: 'aachen', state: 'Nordrhein-Westfalen', nearestSlug: 'koeln' },
  { name: 'Bielefeld', slug: 'bielefeld', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Bochum', slug: 'bochum', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Bonn', slug: 'bonn', state: 'Nordrhein-Westfalen', nearestSlug: 'koeln' },
  { name: 'Chemnitz', slug: 'chemnitz', state: 'Sachsen', nearestSlug: 'dresden' },
  { name: 'Darmstadt', slug: 'darmstadt', state: 'Hessen', nearestSlug: 'frankfurt-am-main' },
  { name: 'Ehingen', slug: 'ehingen', state: 'Baden-Württemberg', nearestSlug: 'ulm' },
  { name: 'Erfurt', slug: 'erfurt', state: 'Thüringen', nearestSlug: 'leipzig' },
  { name: 'Erlangen', slug: 'erlangen', state: 'Bayern', nearestSlug: 'nuernberg' },
  { name: 'Flensburg', slug: 'flensburg', state: 'Schleswig-Holstein', nearestSlug: 'hamburg' },
  { name: 'Freiburg', slug: 'freiburg', state: 'Baden-Württemberg', nearestSlug: 'karlsruhe' },
  { name: 'Gelsenkirchen', slug: 'gelsenkirchen', state: 'Nordrhein-Westfalen', nearestSlug: 'essen' },
  { name: 'Göttingen', slug: 'goettingen', state: 'Niedersachsen', nearestSlug: 'hannover' },
  { name: 'Hagen', slug: 'hagen', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Halle', slug: 'halle', state: 'Sachsen-Anhalt', nearestSlug: 'leipzig' },
  { name: 'Hamm', slug: 'hamm', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Heidelberg', slug: 'heidelberg', state: 'Baden-Württemberg', nearestSlug: 'mannheim' },
  { name: 'Jena', slug: 'jena', state: 'Thüringen', nearestSlug: 'leipzig' },
  { name: 'Kassel', slug: 'kassel', state: 'Hessen', nearestSlug: 'hannover' },
  { name: 'Kiel', slug: 'kiel', state: 'Schleswig-Holstein', nearestSlug: 'hamburg' },
  { name: 'Koblenz', slug: 'koblenz', state: 'Rheinland-Pfalz', nearestSlug: 'koeln' },
  { name: 'Leverkusen', slug: 'leverkusen', state: 'Nordrhein-Westfalen', nearestSlug: 'koeln' },
  { name: 'Ludwigshafen', slug: 'ludwigshafen', state: 'Rheinland-Pfalz', nearestSlug: 'mannheim' },
  { name: 'Lübeck', slug: 'luebeck', state: 'Schleswig-Holstein', nearestSlug: 'hamburg' },
  { name: 'Magdeburg', slug: 'magdeburg', state: 'Sachsen-Anhalt', nearestSlug: 'braunschweig' },
  { name: 'Mainz', slug: 'mainz', state: 'Rheinland-Pfalz', nearestSlug: 'wiesbaden' },
  { name: 'Moers', slug: 'moers', state: 'Nordrhein-Westfalen', nearestSlug: 'duisburg' },
  { name: 'Mülheim', slug: 'muelheim', state: 'Nordrhein-Westfalen', nearestSlug: 'essen' },
  { name: 'Oberhausen', slug: 'oberhausen', state: 'Nordrhein-Westfalen', nearestSlug: 'essen' },
  { name: 'Offenbach', slug: 'offenbach', state: 'Hessen', nearestSlug: 'frankfurt-am-main' },
  { name: 'Osnabrück', slug: 'osnabrueck', state: 'Niedersachsen', nearestSlug: 'hannover' },
  { name: 'Paderborn', slug: 'paderborn', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Pforzheim', slug: 'pforzheim', state: 'Baden-Württemberg', nearestSlug: 'karlsruhe' },
  { name: 'Recklinghausen', slug: 'recklinghausen', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Remscheid', slug: 'remscheid', state: 'Nordrhein-Westfalen', nearestSlug: 'wuppertal' },
  { name: 'Rostock', slug: 'rostock', state: 'Mecklenburg-Vorpommern', nearestSlug: 'neubrandenburg' },
  { name: 'Saarbrücken', slug: 'saarbruecken', state: 'Saarland', nearestSlug: 'mannheim' },
  { name: 'Salzgitter', slug: 'salzgitter', state: 'Niedersachsen', nearestSlug: 'braunschweig' },
  { name: 'Schwerin', slug: 'schwerin', state: 'Mecklenburg-Vorpommern', nearestSlug: 'hamburg' },
  { name: 'Siegen', slug: 'siegen', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Solingen', slug: 'solingen', state: 'Nordrhein-Westfalen', nearestSlug: 'wuppertal' },
  { name: 'Trier', slug: 'trier', state: 'Rheinland-Pfalz', nearestSlug: 'mannheim' },
  { name: 'Wolfsburg', slug: 'wolfsburg', state: 'Niedersachsen', nearestSlug: 'braunschweig' },
  { name: 'Würzburg', slug: 'wuerzburg', state: 'Bayern', nearestSlug: 'nuernberg' },
]

export const seoCities: CityInfo[] = [
  { slug: 'berlin', name: 'Berlin', state: 'Berlin', companyCount: 62 },
  { slug: 'hamburg', name: 'Hamburg', state: 'Hamburg', companyCount: 19 },
  { slug: 'duesseldorf', name: 'Düsseldorf', state: 'Nordrhein-Westfalen', companyCount: 19 },
  { slug: 'koeln', name: 'Köln', state: 'Nordrhein-Westfalen', companyCount: 15 },
  { slug: 'dortmund', name: 'Dortmund', state: 'Nordrhein-Westfalen', companyCount: 13 },
  { slug: 'leipzig', name: 'Leipzig', state: 'Sachsen', companyCount: 11 },
  { slug: 'bremen', name: 'Bremen', state: 'Bremen', companyCount: 11 },
  { slug: 'mannheim', name: 'Mannheim', state: 'Baden-Württemberg', companyCount: 9 },
  { slug: 'hannover', name: 'Hannover', state: 'Niedersachsen', companyCount: 8 },
  { slug: 'potsdam', name: 'Potsdam', state: 'Berlin', companyCount: 8 },
  { slug: 'karlsruhe', name: 'Karlsruhe', state: 'Baden-Württemberg', companyCount: 8 },
  { slug: 'nuernberg', name: 'Nürnberg', state: 'Bayern', companyCount: 7 },
  { slug: 'stuttgart', name: 'Stuttgart', state: 'Baden-Württemberg', companyCount: 7 },
  { slug: 'brandenburg', name: 'Brandenburg', state: 'Brandenburg', companyCount: 7 },
  { slug: 'augsburg', name: 'Augsburg', state: 'Bayern', companyCount: 7 },
  { slug: 'braunschweig', name: 'Braunschweig', state: 'Niedersachsen', companyCount: 7 },
  { slug: 'frankfurt-am-main', name: 'Frankfurt am Main', state: 'Hessen', companyCount: 6 },
  { slug: 'essen', name: 'Essen', state: 'Nordrhein-Westfalen', companyCount: 6 },
  { slug: 'oranienburg', name: 'Oranienburg', state: 'Brandenburg', companyCount: 6 },
  { slug: 'muenchen', name: 'München', state: 'Sachsen', companyCount: 5 },
  { slug: 'fredersdorf-vogelsdorf', name: 'Fredersdorf-Vogelsdorf', state: 'Berlin', companyCount: 5 },
  { slug: 'moenchengladbach', name: 'Mönchengladbach', state: 'Nordrhein-Westfalen', companyCount: 4 },
  { slug: 'krefeld', name: 'Krefeld', state: 'Nordrhein-Westfalen', companyCount: 4 },
  { slug: 'blankenfelde-mahlow', name: 'Blankenfelde-Mahlow', state: 'Berlin', companyCount: 4 },
  { slug: 'duisburg', name: 'Duisburg', state: 'Nordrhein-Westfalen', companyCount: 4 },
  { slug: 'crailsheim', name: 'Crailsheim', state: 'Bayern', companyCount: 3 },
  { slug: 'cottbus', name: 'Cottbus', state: 'Brandenburg', companyCount: 3 },
  { slug: 'ludwigsfelde', name: 'Ludwigsfelde', state: 'Berlin', companyCount: 3 },
  { slug: 'ingolstadt', name: 'Ingolstadt', state: 'Bayern', companyCount: 3 },
  { slug: 'dresden', name: 'Dresden', state: 'Sachsen', companyCount: 3 },
  { slug: 'herne', name: 'Herne', state: 'Nordrhein-Westfalen', companyCount: 3 },
  { slug: 'hildesheim', name: 'Hildesheim', state: 'Niedersachsen', companyCount: 3 },
  { slug: 'luebeck', name: 'Lübeck', state: 'Niedersachsen', companyCount: 3 },
  { slug: 'neubrandenburg', name: 'Neubrandenburg', state: 'Mecklenburg-Vorpommern', companyCount: 3 },
  { slug: 'muenster', name: 'Münster', state: 'Nordrhein-Westfalen', companyCount: 3 },
  { slug: 'lueneburg', name: 'Lüneburg', state: 'Niedersachsen', companyCount: 3 },
  { slug: 'ruedersdorf', name: 'Rüdersdorf', state: 'Brandenburg', companyCount: 3 },
  { slug: 'schwedt', name: 'Schwedt', state: 'Mecklenburg-Vorpommern', companyCount: 3 },
  { slug: 'ulm', name: 'Ulm', state: 'Bayern', companyCount: 3 },
  { slug: 'wiesbaden', name: 'Wiesbaden', state: 'Rheinland-Pfalz', companyCount: 3 },
  { slug: 'wuppertal', name: 'Wuppertal', state: 'Nordrhein-Westfalen', companyCount: 3 },
  // 2026-04-18 expansion — 3 moved from _extraCities + 13 new (bottom-up demand ≥8 declared + ≥1 local)
  { slug: 'regensburg', name: 'Regensburg', state: 'Bayern', companyCount: 2 },
  { slug: 'heilbronn', name: 'Heilbronn', state: 'Baden-Württemberg', companyCount: 1 },
  { slug: 'oldenburg', name: 'Oldenburg', state: 'Niedersachsen', companyCount: 1 },
  { slug: 'kaiserslautern', name: 'Kaiserslautern', state: 'Rheinland-Pfalz', companyCount: 2 },
  { slug: 'memmingen', name: 'Memmingen', state: 'Bayern', companyCount: 1 },
  { slug: 'landsberg-am-lech', name: 'Landsberg am Lech', state: 'Bayern', companyCount: 1 },
  { slug: 'deggendorf', name: 'Deggendorf', state: 'Bayern', companyCount: 2 },
  { slug: 'speyer', name: 'Speyer', state: 'Rheinland-Pfalz', companyCount: 1 },
  { slug: 'oberndorf', name: 'Oberndorf', state: 'Baden-Württemberg', companyCount: 1 },
  { slug: 'kiefersfelden', name: 'Kiefersfelden', state: 'Bayern', companyCount: 1 },
  { slug: 'dingolfing', name: 'Dingolfing', state: 'Bayern', companyCount: 1 },
  { slug: 'bindlach', name: 'Bindlach', state: 'Bayern', companyCount: 1 },
  { slug: 'woerth-am-rhein', name: 'Wörth am Rhein', state: 'Rheinland-Pfalz', companyCount: 1 },
  { slug: 'worms', name: 'Worms', state: 'Rheinland-Pfalz', companyCount: 1 },
  { slug: 'gernsheim', name: 'Gernsheim', state: 'Hessen', companyCount: 1 },
  { slug: 'bruchsal', name: 'Bruchsal', state: 'Baden-Württemberg', companyCount: 1 },
]

export const allCities: ExtendedCity[] = [
  ...seoCities.map(c => ({ name: c.name, slug: c.slug, state: c.state, nearestSlug: null as string | null })),
  ..._extraCities,
]
