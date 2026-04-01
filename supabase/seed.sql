-- KranVergleich.de - Seed Data
-- Crane Types + Top 50 Städte + Demo-Firmen

-- ============================================
-- CRANE TYPES
-- ============================================
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
 '{name} mieten in {city}: {count} Anbieter im Vergleich. Turmdrehkrane für Großbaustellen.');

-- ============================================
-- TOP 50+ STÄDTE
-- ============================================
INSERT INTO cities (name, slug, state, population, lat, lng) VALUES
('Berlin', 'berlin', 'Berlin', 3748148, 52.5200, 13.4050),
('Hamburg', 'hamburg', 'Hamburg', 1899160, 53.5511, 9.9937),
('München', 'muenchen', 'Bayern', 1484226, 48.1351, 11.5820),
('Köln', 'koeln', 'Nordrhein-Westfalen', 1073096, 50.9375, 6.9603),
('Frankfurt am Main', 'frankfurt', 'Hessen', 759224, 50.1109, 8.6821),
('Stuttgart', 'stuttgart', 'Baden-Württemberg', 626275, 48.7758, 9.1829),
('Düsseldorf', 'duesseldorf', 'Nordrhein-Westfalen', 619477, 51.2277, 6.7735),
('Leipzig', 'leipzig', 'Sachsen', 601866, 51.3397, 12.3731),
('Dortmund', 'dortmund', 'Nordrhein-Westfalen', 593317, 51.5136, 7.4653),
('Essen', 'essen', 'Nordrhein-Westfalen', 582415, 51.4556, 7.0116),
('Bremen', 'bremen', 'Bremen', 569352, 53.0793, 8.8017),
('Dresden', 'dresden', 'Sachsen', 556780, 51.0504, 13.7373),
('Hannover', 'hannover', 'Niedersachsen', 535061, 52.3759, 9.7320),
('Nürnberg', 'nuernberg', 'Bayern', 518370, 49.4521, 11.0767),
('Duisburg', 'duisburg', 'Nordrhein-Westfalen', 498590, 51.4344, 6.7624),
('Bochum', 'bochum', 'Nordrhein-Westfalen', 365587, 51.4818, 7.2162),
('Wuppertal', 'wuppertal', 'Nordrhein-Westfalen', 354382, 51.2562, 7.1508),
('Bielefeld', 'bielefeld', 'Nordrhein-Westfalen', 333786, 52.0302, 8.5325),
('Bonn', 'bonn', 'Nordrhein-Westfalen', 330224, 50.7374, 7.0982),
('Münster', 'muenster', 'Nordrhein-Westfalen', 315293, 51.9607, 7.6261),
('Mannheim', 'mannheim', 'Baden-Württemberg', 310658, 49.4875, 8.4660),
('Karlsruhe', 'karlsruhe', 'Baden-Württemberg', 308988, 49.0069, 8.4037),
('Augsburg', 'augsburg', 'Bayern', 296478, 48.3705, 10.8978),
('Wiesbaden', 'wiesbaden', 'Hessen', 278474, 50.0782, 8.2398),
('Mönchengladbach', 'moenchengladbach', 'Nordrhein-Westfalen', 261034, 51.1805, 6.4428),
('Gelsenkirchen', 'gelsenkirchen', 'Nordrhein-Westfalen', 260305, 51.5177, 7.0857),
('Aachen', 'aachen', 'Nordrhein-Westfalen', 249070, 50.7753, 6.0839),
('Braunschweig', 'braunschweig', 'Niedersachsen', 248823, 52.2689, 10.5268),
('Kiel', 'kiel', 'Schleswig-Holstein', 246269, 54.3233, 10.1228),
('Chemnitz', 'chemnitz', 'Sachsen', 244401, 50.8278, 12.9214),
('Halle', 'halle', 'Sachsen-Anhalt', 239257, 51.4969, 11.9688),
('Magdeburg', 'magdeburg', 'Sachsen-Anhalt', 237170, 52.1205, 11.6276),
('Freiburg', 'freiburg', 'Baden-Württemberg', 230241, 47.9990, 7.8421),
('Krefeld', 'krefeld', 'Nordrhein-Westfalen', 227417, 51.3388, 6.5853),
('Mainz', 'mainz', 'Rheinland-Pfalz', 220552, 49.9929, 8.2473),
('Lübeck', 'luebeck', 'Schleswig-Holstein', 217198, 53.8655, 10.6866),
('Erfurt', 'erfurt', 'Thüringen', 213692, 50.9848, 11.0299),
('Oberhausen', 'oberhausen', 'Nordrhein-Westfalen', 210764, 51.4963, 6.8642),
('Rostock', 'rostock', 'Mecklenburg-Vorpommern', 209191, 54.0924, 12.0991),
('Kassel', 'kassel', 'Hessen', 201585, 51.3127, 9.4797),
('Hagen', 'hagen', 'Nordrhein-Westfalen', 189044, 51.3671, 7.4633),
('Potsdam', 'potsdam', 'Brandenburg', 183154, 52.3906, 13.0645),
('Saarbrücken', 'saarbruecken', 'Saarland', 180374, 49.2402, 6.9969),
('Hamm', 'hamm', 'Nordrhein-Westfalen', 179111, 51.6739, 7.8150),
('Ludwigshafen', 'ludwigshafen', 'Rheinland-Pfalz', 172557, 49.4774, 8.4452),
('Oldenburg', 'oldenburg', 'Niedersachsen', 170389, 53.1435, 8.2146),
('Osnabrück', 'osnabrueck', 'Niedersachsen', 164748, 52.2799, 8.0472),
('Leverkusen', 'leverkusen', 'Nordrhein-Westfalen', 163905, 51.0459, 6.9844),
('Heidelberg', 'heidelberg', 'Baden-Württemberg', 160355, 49.3988, 8.6724),
('Darmstadt', 'darmstadt', 'Hessen', 159207, 49.8728, 8.6512),
('Regensburg', 'regensburg', 'Bayern', 153542, 49.0134, 12.1016),
('Ulm', 'ulm', 'Baden-Württemberg', 126949, 48.4011, 9.9876),
('Heilbronn', 'heilbronn', 'Baden-Württemberg', 126458, 49.1427, 9.2109),
('Reutlingen', 'reutlingen', 'Baden-Württemberg', 115865, 48.4914, 9.2043),
('Wolfsburg', 'wolfsburg', 'Niedersachsen', 124146, 52.4227, 10.7865);

-- ============================================
-- DEMO COMPANIES (zum Testen)
-- ============================================

-- Berlin
INSERT INTO companies (name, slug, description, website, phone, city, state, zip, lat, lng, google_rating, google_reviews_count) VALUES
('Berliner Minikranservice GmbH', 'berliner-minikranservice', 'Ihr Spezialist für Minikrane in Berlin und Brandenburg. Über 20 Jahre Erfahrung.', 'https://example.com', '+49 30 1234567', 'Berlin', 'Berlin', '10115', 52.5200, 13.4050, 4.7, 89),
('KranTeam Berlin', 'kranteam-berlin', 'Autokrane und Mobilkrane für Großprojekte in der Hauptstadtregion.', 'https://example.com', '+49 30 2345678', 'Berlin', 'Berlin', '10243', 52.5100, 13.4300, 4.5, 45),
('Hauptstadt Krane GmbH', 'hauptstadt-krane', 'Full-Service Kranvermietung: Minikrane, Autokrane, Dachdeckerkrane.', 'https://example.com', '+49 30 3456789', 'Berlin', 'Berlin', '12045', 52.4800, 13.4200, 4.8, 120),
('LiftUp Berlin', 'liftup-berlin', 'Spezialisiert auf Glasmontage und Minikrane mit Glassauger.', 'https://example.com', '+49 30 4567890', 'Berlin', 'Berlin', '10969', 52.4950, 13.3900, 4.6, 67);

-- München
INSERT INTO companies (name, slug, description, website, phone, city, state, zip, lat, lng, google_rating, google_reviews_count) VALUES
('Münchner Kranverleih AG', 'muenchner-kranverleih', 'Bayerns größter Kranvermieter. Alle Krantypen verfügbar.', 'https://example.com', '+49 89 1234567', 'München', 'Bayern', '80331', 48.1351, 11.5820, 4.9, 156),
('Alpen Krane München', 'alpen-krane-muenchen', 'Minikrane und Raupenkrane für schwieriges Gelände.', 'https://example.com', '+49 89 2345678', 'München', 'Bayern', '80469', 48.1250, 11.5750, 4.4, 38),
('Süddeutsche Kranlogistik', 'sueddeutsche-kranlogistik', 'Schwerlastkrane und Autokrane im Großraum München.', 'https://example.com', '+49 89 3456789', 'München', 'Bayern', '81667', 48.1300, 11.6000, 4.6, 72);

-- Stuttgart
INSERT INTO companies (name, slug, description, website, phone, city, state, zip, lat, lng, google_rating, google_reviews_count) VALUES
('Schwaben Kran GmbH', 'schwaben-kran', 'Ihr Partner für Kranvermietung in Baden-Württemberg.', 'https://example.com', '+49 711 1234567', 'Stuttgart', 'Baden-Württemberg', '70173', 48.7758, 9.1829, 4.7, 93),
('BW Minikranservice', 'bw-minikranservice', 'Minikrane für Handwerker: Dachdecker, Glaser, Zimmerer.', 'https://example.com', '+49 711 2345678', 'Stuttgart', 'Baden-Württemberg', '70178', 48.7700, 9.1750, 4.5, 51),
('Württemberger Autokrane', 'wuertemberger-autokrane', 'Autokrane von 30t bis 500t Tragkraft.', 'https://example.com', '+49 711 3456789', 'Stuttgart', 'Baden-Württemberg', '70376', 48.8050, 9.1900, 4.3, 28);

-- Hamburg
INSERT INTO companies (name, slug, description, website, phone, city, state, zip, lat, lng, google_rating, google_reviews_count) VALUES
('Hamburger Hafenkrane', 'hamburger-hafenkrane', 'Kranvermietung im Norden: Autokrane, Mobilkrane, Schwerlastkrane.', 'https://example.com', '+49 40 1234567', 'Hamburg', 'Hamburg', '20095', 53.5511, 9.9937, 4.6, 84),
('Elbe Minikran Service', 'elbe-minikran-service', 'Minikrane und Dachdeckerkrane in Hamburg und Umgebung.', 'https://example.com', '+49 40 2345678', 'Hamburg', 'Hamburg', '20359', 53.5500, 9.9600, 4.8, 62),
('Nordkran Hamburg GmbH', 'nordkran-hamburg', 'Komplettservice: Minikrane, Anhängerkrane, Baukrane.', 'https://example.com', '+49 40 3456789', 'Hamburg', 'Hamburg', '22087', 53.5650, 10.0200, 4.5, 41);

-- Köln
INSERT INTO companies (name, slug, description, website, phone, city, state, zip, lat, lng, google_rating, google_reviews_count) VALUES
('Domstadt Krane Köln', 'domstadt-krane-koeln', 'Minikrane und Autokrane in Köln und dem Rheinland.', 'https://example.com', '+49 221 1234567', 'Köln', 'Nordrhein-Westfalen', '50667', 50.9375, 6.9603, 4.4, 55),
('Rhein Kran Service', 'rhein-kran-service', 'Kranvermietung am Rhein: alle Typen, faire Preise.', 'https://example.com', '+49 221 2345678', 'Köln', 'Nordrhein-Westfalen', '50823', 50.9450, 6.9200, 4.7, 78),
('KölnLift Krane', 'koelnlift-krane', 'Ihr Spezialist für Dachdeckerkrane und Minikrane in NRW.', 'https://example.com', '+49 221 3456789', 'Köln', 'Nordrhein-Westfalen', '51063', 50.9600, 7.0000, 4.6, 43);

-- Frankfurt
INSERT INTO companies (name, slug, description, website, phone, city, state, zip, lat, lng, google_rating, google_reviews_count) VALUES
('Main Kran Frankfurt', 'main-kran-frankfurt', 'Autokrane und Schwerlastkrane für das Rhein-Main-Gebiet.', 'https://example.com', '+49 69 1234567', 'Frankfurt am Main', 'Hessen', '60311', 50.1109, 8.6821, 4.5, 66),
('Frankfurter Minikranverleih', 'frankfurter-minikranverleih', 'Minikrane und Raupenkrane für Baustellen in Frankfurt.', 'https://example.com', '+49 69 2345678', 'Frankfurt am Main', 'Hessen', '60318', 50.1200, 8.6900, 4.3, 29),
('Skyline Kranservice', 'skyline-kranservice', 'Höchste Krane für Frankfurts Skyline. Baukrane und Mobilkrane.', 'https://example.com', '+49 69 3456789', 'Frankfurt am Main', 'Hessen', '60329', 50.1050, 8.6650, 4.8, 97);
