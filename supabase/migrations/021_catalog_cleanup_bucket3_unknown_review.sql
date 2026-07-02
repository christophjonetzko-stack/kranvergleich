-- Stage B Bucket 3 — manual review of 132 firms classified as "unknown" by audit_catalog_classification.py
-- 2026-05-06. After Bucket 2 finished, the live catalog stood at 725 firms; the heuristic regex left
-- 132 firms unmatched because their descriptions used niche-adjacent terms (Schwerlast, Hebetechnik,
-- Kranleistung, Kranarbeiten) instead of the explicit "Vermietung"/"Mietpark" stems.
--
-- Decision matrix (per firm, manual review of the unknown.csv export):
--   RENTAL_LEGIT (68)        -> KEEP (heuristic miss)
--   BORDERLINE_MIXED (15)    -> 14 KEEP + 1 DEAKT (KILIC = Schulung)
--   OFF_NICHE auto-flag (12) -> 6 DEAKT + 6 KEEP (false-positives on Baustoff/Bauunternehm)
--   NEEDS_REVIEW (37)        -> majority KEEP after WebSearch on every is_verified=True case
--
-- HARD RULE 2026-05-05 applied: every is_verified=True firm received a WebSearch query
-- "<name> <city>" before any deactivation. WebSearch saved 6 major firms from wrongful deakt
-- (SCHOLPP x2, Spickermann, MIGHTSERVICE, Hess x2, WOLFFKRAN) — descriptions were empty in CSV
-- but the firms run real, sizable rental fleets.
--
-- 12 DEAKT (off-niche / Schulung / Personalvermittlung / wrong-niche camera-cranes / Abbundzentrum):
--   AT: 7 (Erdbau, Distributoren, Spedition Luftfracht, Bauunternehmen-WIP, Erdbau-Greifarbeiten, FILMKRAN)
--   DE: 5 (Personalvermittlung x2, Schulungsbetrieb, Abbundzentrum-wood)
--
-- 4 ENRICH (descriptions written from WebSearch findings, Sie-Form / 3rd-person, anti-copy verified):
--   SCHOLPP Stuttgart, SCHOLPP Ettlingen, Spickermann Hannover, MIGHTSERVICE Berlin
--
-- Expected after migration: catalog 725 -> 713 (12 deakt). 4 enriched stay in catalog with descriptions.

-- =====================================================================
-- DEACTIVATIONS (12)
-- =====================================================================

-- AT (7) — verified=False, off-niche
UPDATE companies SET is_relevant = false WHERE id = 'f90ac1d3-78ad-4278-8b85-635c847e974f';  -- ERDBAU NORBERT SCHERTLER (Dornbirn) — Erdbau/Tiefbau, no crane rental
UPDATE companies SET is_relevant = false WHERE id = 'c7a28bd7-f1d7-4931-9212-c8cbe38967ca';  -- Kuhn Ladetechnik (Vöcklabruck) — Palfinger-Distributor (Verkauf)
UPDATE companies SET is_relevant = false WHERE id = '6ccb08a8-18e6-4483-8e1d-ba95ddf9307c';  -- Peter Bau GmbH (Schwarzenberg) — Bauunternehmen, Webseite im Aufbau
UPDATE companies SET is_relevant = false WHERE id = '82d719c9-e08b-4887-8368-13e4ac43d720';  -- XL Spedition (Fischamend) — Luftfracht-Spedition Flughafen Wien
UPDATE companies SET is_relevant = false WHERE id = '5b012fdd-d77f-4ab3-9c29-e1f70217622b';  -- EFEM Transport (Gerasdorf) — pure Bautransport, no crane
UPDATE companies SET is_relevant = false WHERE id = '85600226-ac35-45d4-a72b-3a7e349f4463';  -- Kuhn Ladetechnik Bisamberg — Servicewerk Palfinger
UPDATE companies SET is_relevant = false WHERE id = 'c91d27b1-29ff-4eff-ba8d-8a1b049d5528';  -- Rüf Josef (Hohenems) — Erdbaubetrieb mit Greifarbeiten als Nebenleistung
UPDATE companies SET is_relevant = false WHERE id = '4160eaf2-7e4e-4176-84df-6193b3064eda';  -- FILMKRAN (Wien) — Filmgeräteverleih (Kamerakräne/Jibs/Dollies), wrong niche

-- DE (4) — 3 verified=True saved by explicit description signal even after WebSearch
UPDATE companies SET is_relevant = false WHERE id = '9bbec9a9-6adb-404c-8859-0b3bb88f83a3';  -- Kran-Micha (Berlin) — Personalvermittlung Kranführer (verified=True; WebSearch 0 rental presence)
UPDATE companies SET is_relevant = false WHERE id = '91921c81-e412-4230-be76-26672c1baeca';  -- Kran&Stapler Schulung KILIC (Dachau) — Schulungsbetrieb (verified=True; explicit Schulung)
UPDATE companies SET is_relevant = false WHERE id = 'c8d752d7-f3be-419c-885d-1c164e915eaa';  -- Kranführer.de (Düsseldorf) — Personalvermittlung Kranführer seit 1975 (verified=True; explicit)
UPDATE companies SET is_relevant = false WHERE id = '59ea43cc-6c59-4c9b-83e1-cc2de2ee00bc';  -- AZS Stoffels (Düsseldorf) — Abbundzentrum Stoffels (Holzbau), not crane

-- =====================================================================
-- ENRICHMENTS (4) — empty desc, descriptions from WebSearch
-- =====================================================================

-- SCHOLPP Kran & Transport GmbH (Stuttgart) — verified=True, major brand
UPDATE companies SET
  description = 'Die SCHOLPP Kran & Transport GmbH zählt zu den etablierten Kranunternehmen Süddeutschlands mit bundesweitem Standortnetz. Der Stuttgarter Sitz betreut den Großraum Baden-Württemberg und greift auf einen Fuhrpark von rund 40 Autokranen mit Tragkräften zwischen 20 und 700 Tonnen zurück. Das Leistungsspektrum umfasst All-Terrain-, Hydraulik-, Teleskop- und Mobilkrane sowie Sonder- und Schwertransporte für Industriemontagen, Bauprojekte und Handwerksbetriebe.',
  website = COALESCE(NULLIF(website, ''), 'https://www.scholppkran.de/')
WHERE id = '4bfd9528-3fb6-4f0f-8077-29937733d990';

-- SCHOLPP Kran & Transport GmbH (Ettlingen) — Niederlassung
UPDATE companies SET
  description = 'Der SCHOLPP-Standort Ettlingen versorgt den Raum Karlsruhe, Mannheim und das nördliche Baden-Württemberg mit Autokran- und Schwerlastleistungen aus der Unternehmensgruppe SCHOLPP Kran & Transport GmbH. Die Niederlassung am Kleiner Plom 5 bietet All-Terrain-, Hydraulik- und Teleskopkrane mit Tragkräften von 20 bis 700 Tonnen sowie Sondertransporte für Industriemontagen und Großbaustellen.',
  website = COALESCE(NULLIF(website, ''), 'https://www.scholppkran.de/unternehmen/standorte/')
WHERE id = 'a22cf1fb-12ac-4aee-9e8d-12dee6503c3b';

-- Spickermann GmbH (Hannover) — verified=True, motto "Schweres leicht gemacht!"
UPDATE companies SET
  description = 'Die Spickermann GmbH ist ein familiengeführtes Kranunternehmen aus dem Hannoveraner Stadtteil Linden mit dem Motto „Schweres leicht gemacht!". Der Betrieb in der Davenstedter Straße 132 bietet Autokranarbeiten bis 100 Tonnen Hublast für Industriemontagen, Tieflader-Transporte und LKW-Ladekran-Einsätze. Ergänzend gehören ein Abschleppdienst sowie die Vermietung von Büro- und Lagercontainern zum Leistungsangebot.',
  website = COALESCE(NULLIF(website, ''), 'https://www.spickermanngmbh.de/')
WHERE id = '4a5ac793-d8e3-4b76-a93d-a488bf98d04b';

-- MIGHTSERVICE GmbH (Berlin) — verified=True, niche specialist
UPDATE companies SET
  description = 'Die MIGHTSERVICE GmbH mit Sitz in der Schloßstraße 65 in Berlin-Charlottenburg hat sich auf den Im- und Export gebrauchter Potain-Turmdrehkrane spezialisiert. Neben dem internationalen Handel bietet das Unternehmen Vermietung, TÜV-Berichte, Transportlogistik, Ersatzteilversorgung sowie Auf- und Abbau-Service vor Ort.',
  website = COALESCE(NULLIF(website, ''), 'https://www.mightservice.com/')
WHERE id = 'a6557718-1152-43af-9a34-82c6cd313635';

-- =====================================================================
-- VERIFICATION
-- =====================================================================
-- Expected after applying:
--   live catalog (is_active=True AND is_relevant=True): 725 - 12 = 713 firms
--   country split: DE 642 - 4 = 638; AT 83 - 8 = 75
--   enriched-with-description firms +4 (SCHOLPP x2, Spickermann, MIGHTSERVICE)

-- =====================================================================
-- ROLLBACK (if needed)
-- =====================================================================
-- Re-activate the 12 deactivated firms (descriptions stay where set; clear them manually if needed):
--   UPDATE companies SET is_relevant = true WHERE id IN (
--     'f90ac1d3-78ad-4278-8b85-635c847e974f','c7a28bd7-f1d7-4931-9212-c8cbe38967ca',
--     '6ccb08a8-18e6-4483-8e1d-ba95ddf9307c','82d719c9-e08b-4887-8368-13e4ac43d720',
--     '5b012fdd-d77f-4ab3-9c29-e1f70217622b','85600226-ac35-45d4-a72b-3a7e349f4463',
--     'c91d27b1-29ff-4eff-ba8d-8a1b049d5528','4160eaf2-7e4e-4176-84df-6193b3064eda',
--     '9bbec9a9-6adb-404c-8859-0b3bb88f83a3','91921c81-e412-4230-be76-26672c1baeca',
--     'c8d752d7-f3be-419c-885d-1c164e915eaa','59ea43cc-6c59-4c9b-83e1-cc2de2ee00bc'
--   );
