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
]
