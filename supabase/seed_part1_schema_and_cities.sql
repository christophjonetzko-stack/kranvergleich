-- =============================================
-- AUTO-GENERATED SEED DATA FROM CSV
-- Generated: 2026-03-31T03:05:32.008Z
-- =============================================

-- IMPORTANT: Run 001_initial_schema.sql FIRST!

-- =============================================
-- 1. CRANE TYPES (Referenztabelle)
-- =============================================
INSERT INTO crane_types (slug, name, name_plural, description, price_day_from, price_day_to, price_week_from, price_week_to, typical_capacity_kg, typical_height_m, typical_reach_m, sort_order,
  meta_title_template, meta_description_template) VALUES

('minikran-mieten', 'Minikran', 'Minikrane',
 'Kompakte Krane für enge Baustellen, Innenräume und schwer zugängliche Bereiche. Ideal für Glasmontage, Dacharbeiten und Wärmepumpen-Installation.',
 250, 500, 1200, 2800, '500 - 3.000 kg', '5 - 18 m', '3 - 16 m', 1,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Tagespreise ab {price}€. Bewertungen, Verfügbarkeit & sofort Angebot anfragen.'),

('autokran-mieten', 'Autokran', 'Autokrane',
 'Mobilkrane auf LKW-Fahrgestell. Schnell einsatzbereit, flexibel und für mittlere bis schwere Lasten geeignet.',
 500, 2000, 2500, 10000, '10 - 500 t', '20 - 100 m', '10 - 60 m', 2,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Tagespreise ab {price}€. Mit oder ohne Kranführer.'),

('dachdeckerkran-mieten', 'Dachdeckerkran', 'Dachdeckerkrane',
 'Spezialkrane für Dachdeckerarbeiten. Kompakt, schnell aufgebaut und ideal für Materiallogistik auf dem Dach.',
 200, 450, 1000, 2500, '500 - 2.000 kg', '15 - 30 m', '10 - 25 m', 3,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Perfekt für Dacharbeiten. Preise & Bewertungen.'),

('raupenkran-mieten', 'Raupenkran', 'Raupenkrane',
 'Krane auf Raupenfahrwerk für schweres Gelände und große Traglasten. Ideal für Infrastrukturprojekte.',
 800, 5000, 4000, 25000, '50 - 3.000 t', '30 - 200 m', '20 - 100 m', 4,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Für schwere Lasten und schwieriges Gelände.'),

('anhaengerkran-mieten', 'Anhängerkran', 'Anhängerkrane',
 'Auf Anhänger montierte Krane. Leicht transportierbar, ideal für wechselnde Einsatzorte.',
 150, 350, 700, 1800, '300 - 1.500 kg', '10 - 20 m', '5 - 15 m', 5,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Leicht transportierbar, flexibel einsetzbar.'),

('mobilkran-mieten', 'Mobilkran', 'Mobilkrane',
 'Fahrbare Krane auf Spezialfahrgestell. Hohe Traglasten, schnelle Aufbauzeit.',
 600, 3000, 3000, 15000, '20 - 1.200 t', '20 - 150 m', '15 - 80 m', 6,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Hohe Traglasten, schnell einsatzbereit.'),

('baukran-mieten', 'Baukran', 'Baukrane',
 'Turmdrehkrane für Großbaustellen. Hohe Reichweite, dauerhafter Einsatz über Wochen und Monate.',
 300, 1500, 1500, 8000, '2 - 80 t', '30 - 80 m', '20 - 70 m', 7,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Turmdrehkrane für Großbaustellen.'),

('ladekran-mieten', 'Ladekran', 'Ladekrane',
 'LKW-montierte Ladekrane für Be- und Entladearbeiten. Flexibel und vielseitig einsetzbar.',
 300, 800, 1500, 4000, '1 - 30 t', '5 - 30 m', '3 - 20 m', 8,
 '{name} mieten in {city} | Preise ab {price}€/Tag | KranVergleich',
 '{name} mieten in {city}: {count} Anbieter im Vergleich. LKW-Ladekrane für Be- und Entladearbeiten.')

ON CONFLICT (slug) DO NOTHING;


-- =============================================
-- 2. CITIES (aus cities_for_seo_FINAL.csv)
-- =============================================
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Berlin', 'berlin', 'Berlin', 620000, 52.508836198387094, 13.402942322580646, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Hamburg', 'hamburg', 'Hamburg', 190000, 53.55042298421052, 10.016521410526314, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Düsseldorf', 'duesseldorf', 'Nordrhein-Westfalen', 190000, 51.21028242105263, 6.8067861947368415, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Köln', 'koeln', 'Nordrhein-Westfalen', 150000, 50.93873621333333, 6.970984626666667, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Dortmund', 'dortmund', 'Nordrhein-Westfalen', 130000, 51.52502967692308, 7.4652106, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Leipzig', 'leipzig', 'Sachsen', 110000, 51.3529483, 12.384936090909092, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Bremen', 'bremen', 'Bremen', 110000, 53.088455218181814, 8.808839318181818, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Mannheim', 'mannheim', 'Baden-Württemberg', 90000, 49.48378014444444, 8.493181555555555, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Hannover', 'hannover', 'Niedersachsen', 80000, 52.384838325, 9.7304537375, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Potsdam', 'potsdam', 'Berlin', 80000, 52.373490974999996, 13.112785275, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Karlsruhe', 'karlsruhe', 'Baden-Württemberg', 80000, 49.010126875, 8.3707305, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Nürnberg', 'nuernberg', 'Bayern', 70000, 49.44070421428571, 11.063175814285714, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Stuttgart', 'stuttgart', 'Baden-Württemberg', 70000, 48.778272328571425, 9.193495442857142, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Brandenburg', 'brandenburg', 'Brandenburg', 70000, 52.4145937, 12.532438985714284, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Augsburg', 'augsburg', 'Bayern', 70000, 48.377558328571425, 10.890153042857142, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Braunschweig', 'braunschweig', 'Niedersachsen', 70000, 52.297169614285714, 10.519153000000001, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Frankfurt am Main', 'frankfurt-am-main', 'Hessen', 60000, 50.11392898333333, 8.584990883333333, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Essen', 'essen', 'Nordrhein-Westfalen', 60000, 51.44681946666666, 6.97818075, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Oranienburg', 'oranienburg', 'Brandenburg', 60000, 52.75788181666667, 13.237707499999999, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('München', 'muenchen', 'Sachsen', 50000, 48.17379158, 11.543489339999999, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Fredersdorf-Vogelsdorf', 'fredersdorf-vogelsdorf', 'Berlin', 50000, 52.49568715999999, 13.75954054, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Mönchengladbach', 'moenchengladbach', 'Nordrhein-Westfalen', 40000, 51.155998499999995, 6.4407276499999995, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Krefeld', 'krefeld', 'Nordrhein-Westfalen', 40000, 51.346856825, 6.6357197249999995, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Blankenfelde-Mahlow', 'blankenfelde-mahlow', 'Berlin', 40000, 52.33208784999999, 13.4583116, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Duisburg', 'duisburg', 'Nordrhein-Westfalen', 40000, 51.4352265, 6.7602736, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Crailsheim', 'crailsheim', 'Bayern', 30000, 49.13990393333333, 10.040638866666667, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Cottbus', 'cottbus', 'Brandenburg', 30000, 51.742145300000004, 14.3700132, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Ludwigsfelde', 'ludwigsfelde', 'Berlin', 30000, 52.30581123333334, 13.268723466666666, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Ingolstadt', 'ingolstadt', 'Bayern', 30000, 48.75658883333333, 11.4760631, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Dresden', 'dresden', 'Sachsen', 30000, 51.0193428, 13.7765976, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Herne', 'herne', 'Nordrhein-Westfalen', 30000, 51.547222466666675, 7.196659799999999, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Hildesheim', 'hildesheim', 'Niedersachsen', 30000, 52.15925066666666, 9.950826, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Lübeck', 'luebeck', 'Niedersachsen', 30000, 53.87170923333334, 10.642720933333333, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Neubrandenburg', 'neubrandenburg', 'Mecklenburg-Vorpommern', 30000, 53.569718333333334, 13.2716099, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Münster', 'muenster', 'Nordrhein-Westfalen', 30000, 51.94158083333334, 7.6418216, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Lüneburg', 'lueneburg', 'Niedersachsen', 30000, 53.26558336666667, 10.413105933333334, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Rüdersdorf', 'ruedersdorf', 'Brandenburg', 30000, 52.48803649999999, 13.8238282, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Schwedt', 'schwedt', 'Mecklenburg-Vorpommern', 30000, 53.073474866666665, 14.244967733333333, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Ulm', 'ulm', 'Bayern', 30000, 48.391545, 9.954995633333333, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Wiesbaden', 'wiesbaden', 'Rheinland-Pfalz', 30000, 50.051538666666666, 8.283193466666667, true)
ON CONFLICT (slug) DO NOTHING;
INSERT INTO cities (name, slug, state, population, lat, lng, is_active)
VALUES ('Wuppertal', 'wuppertal', 'Nordrhein-Westfalen', 30000, 51.280348800000006, 7.234324766666666, true)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
