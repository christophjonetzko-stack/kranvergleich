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
// Exported for next.config.ts redirect generation, direct URLs to these
// cities 404 (no Supabase row), so we route them to nearestSlug via 307.
// DE-specific orphan list. AT counterpart is _extraCitiesAT (currently empty).
const _extraCitiesDE: ExtendedCity[] = [
  { name: 'Darmstadt', slug: 'darmstadt', state: 'Hessen', nearestSlug: 'frankfurt-am-main' },
  { name: 'Ehingen', slug: 'ehingen', state: 'Baden-Württemberg', nearestSlug: 'ulm' },
  { name: 'Erlangen', slug: 'erlangen', state: 'Bayern', nearestSlug: 'nuernberg' },
  { name: 'Flensburg', slug: 'flensburg', state: 'Schleswig-Holstein', nearestSlug: 'hamburg' },
  { name: 'Göttingen', slug: 'goettingen', state: 'Niedersachsen', nearestSlug: 'hannover' },
  { name: 'Halle', slug: 'halle', state: 'Sachsen-Anhalt', nearestSlug: 'leipzig' },
  { name: 'Hamm', slug: 'hamm', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Koblenz', slug: 'koblenz', state: 'Rheinland-Pfalz', nearestSlug: 'koeln' },
  { name: 'Ludwigshafen', slug: 'ludwigshafen', state: 'Rheinland-Pfalz', nearestSlug: 'mannheim' },
  { name: 'Moers', slug: 'moers', state: 'Nordrhein-Westfalen', nearestSlug: 'duisburg' },
  { name: 'Mülheim', slug: 'muelheim', state: 'Nordrhein-Westfalen', nearestSlug: 'essen' },
  { name: 'Offenbach', slug: 'offenbach', state: 'Hessen', nearestSlug: 'frankfurt-am-main' },
  { name: 'Pforzheim', slug: 'pforzheim', state: 'Baden-Württemberg', nearestSlug: 'karlsruhe' },
  { name: 'Remscheid', slug: 'remscheid', state: 'Nordrhein-Westfalen', nearestSlug: 'wuppertal' },
  { name: 'Salzgitter', slug: 'salzgitter', state: 'Niedersachsen', nearestSlug: 'braunschweig' },
  { name: 'Siegen', slug: 'siegen', state: 'Nordrhein-Westfalen', nearestSlug: 'dortmund' },
  { name: 'Solingen', slug: 'solingen', state: 'Nordrhein-Westfalen', nearestSlug: 'wuppertal' },
  { name: 'Trier', slug: 'trier', state: 'Rheinland-Pfalz', nearestSlug: 'mannheim' },
  { name: 'Wolfsburg', slug: 'wolfsburg', state: 'Niedersachsen', nearestSlug: 'braunschweig' },
]

const seoCitiesDE: CityInfo[] = [
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
  { slug: 'muenchen', name: 'München', state: 'Bayern', companyCount: 5 },
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
  { slug: 'luebeck', name: 'Lübeck', state: 'Schleswig-Holstein', companyCount: 3 },
  { slug: 'neubrandenburg', name: 'Neubrandenburg', state: 'Mecklenburg-Vorpommern', companyCount: 3 },
  { slug: 'muenster', name: 'Münster', state: 'Nordrhein-Westfalen', companyCount: 3 },
  { slug: 'lueneburg', name: 'Lüneburg', state: 'Niedersachsen', companyCount: 3 },
  { slug: 'ruedersdorf', name: 'Rüdersdorf', state: 'Brandenburg', companyCount: 3 },
  { slug: 'schwedt', name: 'Schwedt', state: 'Mecklenburg-Vorpommern', companyCount: 3 },
  { slug: 'ulm', name: 'Ulm', state: 'Bayern', companyCount: 3 },
  { slug: 'wiesbaden', name: 'Wiesbaden', state: 'Rheinland-Pfalz', companyCount: 3 },
  { slug: 'wuppertal', name: 'Wuppertal', state: 'Nordrhein-Westfalen', companyCount: 3 },
  // 2026-04-18 expansion, 3 moved from _extraCities + 13 new (bottom-up demand ≥8 declared + ≥1 local)
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
  // 2026-04-20 cleanup, promote 11 _extraCities entries that already had live Supabase pages (home counts from companies.city)
  { slug: 'aachen', name: 'Aachen', state: 'Nordrhein-Westfalen', companyCount: 0 },
  { slug: 'bielefeld', name: 'Bielefeld', state: 'Nordrhein-Westfalen', companyCount: 3 },
  { slug: 'bochum', name: 'Bochum', state: 'Nordrhein-Westfalen', companyCount: 1 },
  { slug: 'bonn', name: 'Bonn', state: 'Nordrhein-Westfalen', companyCount: 2 },
  { slug: 'erfurt', name: 'Erfurt', state: 'Thüringen', companyCount: 0 },
  { slug: 'freiburg', name: 'Freiburg', state: 'Baden-Württemberg', companyCount: 0 },
  { slug: 'kiel', name: 'Kiel', state: 'Schleswig-Holstein', companyCount: 0 },
  { slug: 'magdeburg', name: 'Magdeburg', state: 'Sachsen-Anhalt', companyCount: 3 },
  { slug: 'mainz', name: 'Mainz', state: 'Rheinland-Pfalz', companyCount: 1 },
  { slug: 'rostock', name: 'Rostock', state: 'Mecklenburg-Vorpommern', companyCount: 1 },
  { slug: 'saarbruecken', name: 'Saarbrücken', state: 'Saarland', companyCount: 1 },
  // 2026-04-20 expansion, 9 _extraCities promoted after diagnostic showed ≥1 home + ≥8 declared firms (Göttingen/Osnabrück deferred, too thin after normalize)
  { slug: 'chemnitz', name: 'Chemnitz', state: 'Sachsen', companyCount: 2 },
  { slug: 'wuerzburg', name: 'Würzburg', state: 'Bayern', companyCount: 1 },
  { slug: 'gelsenkirchen', name: 'Gelsenkirchen', state: 'Nordrhein-Westfalen', companyCount: 1 },
  { slug: 'hagen', name: 'Hagen', state: 'Nordrhein-Westfalen', companyCount: 1 },
  { slug: 'oberhausen', name: 'Oberhausen', state: 'Nordrhein-Westfalen', companyCount: 1 },
  { slug: 'leverkusen', name: 'Leverkusen', state: 'Nordrhein-Westfalen', companyCount: 1 },
  { slug: 'paderborn', name: 'Paderborn', state: 'Nordrhein-Westfalen', companyCount: 2 },
  { slug: 'recklinghausen', name: 'Recklinghausen', state: 'Nordrhein-Westfalen', companyCount: 1 },
  { slug: 'jena', name: 'Jena', state: 'Thüringen', companyCount: 1 },
  // 2026-05-31 Thüringen sourcing (catalog-firm-sourcing): 13 firms sourced via Outscraper,
  // 6 real crane firms kept (B.i.V/Schwerlast Weise/Peter Lorenz/Schöttker/Nitzsche/MSB),
  // 7 Baumaschinen/Stapler dealers deactivated. companyCount = active company_regions matches.
  { slug: 'weimar', name: 'Weimar', state: 'Thüringen', companyCount: 1 },
  { slug: 'gotha', name: 'Gotha', state: 'Thüringen', companyCount: 2 },
  { slug: 'gera', name: 'Gera', state: 'Thüringen', companyCount: 2 },
  // 2026-06-01 Sachsen/Sachsen-Anhalt sourcing (catalog-firm-sourcing): 21 firms imported,
  // 16 crane firms kept + tonnage, 5 dealers deactivated; existing firms mapped to new
  // cities. Halle (240k) had NO page before. companyCount = active company_regions matches.
  { slug: 'zwickau', name: 'Zwickau', state: 'Sachsen', companyCount: 2 },
  { slug: 'plauen', name: 'Plauen', state: 'Sachsen', companyCount: 4 },
  { slug: 'goerlitz', name: 'Görlitz', state: 'Sachsen', companyCount: 3 },
  { slug: 'halle', name: 'Halle (Saale)', state: 'Sachsen-Anhalt', companyCount: 1 },
  { slug: 'dessau', name: 'Dessau-Roßlau', state: 'Sachsen-Anhalt', companyCount: 3 },
  { slug: 'halberstadt', name: 'Halberstadt', state: 'Sachsen-Anhalt', companyCount: 1 },
  // 2026-04-29 expansion. Kassel/Marburg/Osnabrück after company_regions audit;
  // Kassel + Osnabrück promoted from _extraCitiesDE (deferred 2026-04-20 was outdated
  // after today's bulk-fix), Marburg fully new. Coverage: Kassel 4 covered types + 1 warning
  // (Baukran/Ladekran/Raupenkran excluded by thin-content gate); Marburg 8 types
  // covered; Osnabrück 7 covered + 0 Dachdeckerkran (excluded).
  { slug: 'kassel',     name: 'Kassel',     state: 'Hessen',         companyCount: 7 },
  { slug: 'marburg',    name: 'Marburg',    state: 'Hessen',         companyCount: 8 },
  { slug: 'osnabrueck', name: 'Osnabrück',  state: 'Niedersachsen',  companyCount: 14 },
  // 2026-05-18 fix. Heidelberg was stuck in _extraCitiesDE redirect list despite having a Supabase row + 23 firms (created 2026-04-18). GSC flagged the 307s as "Seite mit Weiterleitung". Promote to seoCitiesDE so all /{type}/heidelberg URLs render natively.
  { slug: 'heidelberg', name: 'Heidelberg', state: 'Baden-Württemberg', companyCount: 23 },
  // 2026-06-06 MV gap-fill. Schwerin promoted from _extraCitiesDE (redirect→hamburg) to a native page: Supabase row created + 3 firms mapped (U&W Ndl. Schwerin, H.N. Krane, Beth) covering all 8 crane types. Closes the biggest DE coverage hole (MV).
  { slug: 'schwerin', name: 'Schwerin', state: 'Mecklenburg-Vorpommern', companyCount: 3 },
]

// AT cities, populated 2026-04-26 after Phase B firm enrichment landed 20
// AT firms with crane_types. companyCount reflects unique active firms reachable
// via company_regions JOIN (cross-region overlap is intentional. Felbermayr
// Graz also serves Wien, hence wien=12 vs 8 raw inserts).
//
// Villach + St. Pölten left at 0 because the Outscraper Step 1 returned no
// crane firms specifically for those queries; they stay in the array so the
// SearchBox autocomplete still suggests them, but home tile grid + sitemap
// city × type pages skip them via the existing thin-content gates
// (getCitiesWithMinCompanies threshold).
const seoCitiesAT: CityInfo[] = [
  { slug: 'wien',          name: 'Wien',       state: 'Wien',             companyCount: 56 },
  { slug: 'sankt-poelten', name: 'St. Pölten', state: 'Niederösterreich', companyCount: 17 },
  { slug: 'linz',          name: 'Linz',       state: 'Oberösterreich',   companyCount: 16 },
  { slug: 'dornbirn',      name: 'Dornbirn',   state: 'Vorarlberg',       companyCount: 14 },
  { slug: 'innsbruck',     name: 'Innsbruck',  state: 'Tirol',            companyCount: 10 },
  { slug: 'klagenfurt',    name: 'Klagenfurt', state: 'Kärnten',          companyCount: 10 },
  { slug: 'wels',          name: 'Wels',       state: 'Oberösterreich',   companyCount: 5 },
  { slug: 'graz',          name: 'Graz',       state: 'Steiermark',       companyCount: 4 },
  { slug: 'salzburg',      name: 'Salzburg',   state: 'Salzburg',         companyCount: 4 },
  { slug: 'villach',       name: 'Villach',    state: 'Kärnten',          companyCount: 2 },
]
const _extraCitiesAT: ExtendedCity[] = []

// Country-aware exports. kranvergleich.de build (NEXT_PUBLIC_COUNTRY unset or 'DE')
// resolves to DE arrays; kranvergleich.at build ('AT') resolves to AT arrays.
// The check uses process.env directly to avoid pulling country.ts (which transitively
// imports the Supabase client) into next.config.ts's import graph.
const _IS_AT = process.env.NEXT_PUBLIC_COUNTRY === 'AT'
export const seoCities: CityInfo[] = _IS_AT ? seoCitiesAT : seoCitiesDE
export const _extraCities: ExtendedCity[] = _IS_AT ? _extraCitiesAT : _extraCitiesDE

export const allCities: ExtendedCity[] = [
  ...seoCities.map(c => ({ name: c.name, slug: c.slug, state: c.state, nearestSlug: null as string | null })),
  ..._extraCities,
]
