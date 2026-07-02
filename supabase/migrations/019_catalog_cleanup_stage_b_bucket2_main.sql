-- Stage B Bucket 2 — Main batch (9 enrichments + 31 deactivations + 1 name/slug fix)
-- 2026-05-05. Closes Bucket 2 unknown_empty review (54 firms total: pilot 14 + main 40).
-- Sources: firm websites fetched via robots-respecting WebFetch. Descriptions written from extracted facts.
-- No 1:1 copy from source pages (Sie-Form / 3rd-person catalog style).

-- ============================================================
-- PART A: KEEP + description (9 firms) + Anker name/slug fix
-- ============================================================

-- 1. A.K.S. GmbH (St. Georgen im Attergau AT)
UPDATE companies SET description = 'A.K.S. ist ein oberösterreichisches Unternehmen aus St. Georgen im Attergau, das Kranarbeiten, Güterkraftverkehr und Sondertransporte mit eigenem Fuhrpark anbietet. Im Einsatz steht unter anderem ein 150-Metertonnen-Kran für anspruchsvolle Hubarbeiten. Tätig ist das Unternehmen österreichweit sowie in Deutschland, Belgien und den Niederlanden.'
WHERE id = '38a22033-7124-44be-96ee-a31ce5695bd2';

-- 2. THP Baukräne GmbH (Bad Wimsbach NH AT)
UPDATE companies SET description = 'THP Baukräne ist ein Anbieter von Turmdrehkran-Mietleistungen aus Bad Wimsbach-Neuhofen in Oberösterreich. Der Mietpark umfasst Unten- und Obendreher; ergänzend werden Verkauf, Wartung und Montageservice angeboten. Standort liegt im Salzkammergut-Raum mit kurzen Wegen in den oberösterreichischen Zentralraum.'
WHERE id = 'e30a5d8d-f351-4ad2-b23c-0d51b604eeb4';

-- 3. Anker Kran- und Arbeitsbühnenvermietung GmbH (Lüneburg DE) — name + slug + description fix.
-- Outscraper had picked up an English translation as the firm name; real German name from website.
UPDATE companies SET
  name = 'Anker Kran- und Arbeitsbühnenvermietung GmbH',
  slug = 'anker-kran-und-arbeitsbuehnenvermietung-gmbh',
  description = 'Anker Kran- und Arbeitsbühnenvermietung ist ein Vermietungsunternehmen für Krane und Hubarbeitsbühnen mit Sitz in Lüneburg. Der Mietpark reicht von Anhänger- und Mini-Raupenkränen über Citykrane bis zu Autokränen mit bis zu 220 Tonnen Hubkraft und 108 Meter Auslegerlänge. Ergänzend stehen Lkw-, Anhänger-, Scheren- und Teleskoparbeitsbühnen mit Arbeitshöhen bis 54 Meter zur Verfügung; Personal kann auf Wunsch mitgestellt werden.'
WHERE id = '3a7cf64d-ea9d-4215-8109-1591a5ef616d';

-- 4. Bekel Kran GmbH (Hildesheim DE)
UPDATE companies SET description = 'Bekel Kran wurde 2007 in Hildesheim gegründet und bietet Kraneinsätze mit Kompaktautokränen, Hilfsmittelgestellung für Industriekran-Montagen sowie Sachverständigen-Abnahmen für Krane. Tätig ist das Unternehmen in Hildesheim und der umliegenden Region. Auf Wunsch werden auch Prüflasten gestellt.'
WHERE id = 'cc79a86b-c736-4544-b916-dac89b115993';

-- 5. HTO Krane GmbH (Cuxhaven DE)
UPDATE companies SET description = 'HTO Krane ist ein Anbieter von Krandienstleistungen mit Sitz in Cuxhaven (Niedersachsen). Das Unternehmen bietet Kraneinsätze, Schwerlasttransporte sowie Mietausrüstung mit eigenem Personal — darunter Kranführer, Anschläger und Einweiser. Ergänzend werden Baustellenbegleitung und individuelle Hubprojekte umgesetzt.'
WHERE id = '52db2386-c0f0-4f0b-85f8-97bda082cc16';

-- 6. KFR Mietlifte GmbH (Münster DE)
UPDATE companies SET description = 'KFR Mietlifte ist ein Vermieter von Arbeitsbühnen und Mietkränen mit Sitz in Münster. Im Mietpark stehen Anhänger-, LKW-, Schere- und Teleskoparbeitsbühnen sowie Autokrane bis 9 Tonnen und Mini-Krane wie der Klaas K2350. Über ein Partnernetzwerk mit über 160 Mietstationen sind Geräte deutschlandweit verfügbar.'
WHERE id = 'ea16cd11-34a9-4090-846a-0638e987366f';

-- 7. Kran-Maier GmbH & Co. KG (Essenbach DE Bayern)
UPDATE companies SET description = 'Kran-Maier ist ein bayerisches Familienunternehmen aus Essenbach mit Sitz im Raum Landshut. Im Mietpark stehen Autokrane bis zur 250-Tonnen-Klasse sowie Hallenkrane, Brückenkrane und Portalkrane für Hebearbeiten und Maschinenverlagerungen. Zusätzlich werden Prüfgewichte für UVV-Inspektionen, Auslegerverlängerungen, Traversen und Hebeplattformen bereitgestellt.'
WHERE id = '7ee5352a-0b7c-4d21-8729-935bbc7abc63';

-- 8. Peku-Montagebau GmbH / Peku Cranes (Aschaffenburg DE Bayern)
UPDATE companies SET description = 'Peku-Montagebau ist ein bayerisches Hybrid-Unternehmen aus Aschaffenburg, das Krandienstleistungen, Schwerlastlogistik und Montagetechnologie anbietet. Die Kranflotte umfasst Liebherr LTM 1055-1, LTM 1040-1, Krupp KMK 2020, einen Volvo mit Effer-Kran 460 sowie einen Maeda-Minikran MC 285. Zum Leistungsspektrum gehören Maschinentransporte, Werksverlagerungen sowie Spezial- und Schwertransporte.'
WHERE id = '17e4c9ff-bd9f-4b2f-91fc-b14071d9e2cb';

-- 9. Spengler GmbH (Kaiserslautern DE)
UPDATE companies SET description = 'Spengler aus Kaiserslautern ist ein vielseitiger Dienstleister für Kran- und Schwerlastarbeiten in der Region Rheinland-Pfalz. Zum Leistungsangebot gehören Kraneinsätze, Hubarbeitsbühnen, Gabelstapler-Vermietung, Maschinenumzüge, Werksverlagerungen sowie Schwertransporte. Konkrete Krantypen und Tonnagen werden auf Anfrage zusammengestellt.'
WHERE id = 'cd812c99-6e8f-4525-b54a-118614b0246e';

-- ============================================================
-- PART B: DEACTIVATE — 31 firms
-- ============================================================
-- Pre-filter conservative (14): off-niche by name (Abschlepp/Spedition/Dachdeckerei/etc.) or
-- no website + no description. Fetch-based (16): Wartung-only, broken SSL, 403/down servers,
-- positioning mismatch (HKL general bau chain), or duplicate thin entries. Plus Taxikran (no website).

UPDATE companies SET is_relevant = false WHERE id IN (
  -- Pre-filter conservative (14)
  '0c2df8df-7a87-49e3-ae31-f52e52f37884',  -- GZ Metallbau (Wien AT) — Metallbau
  '8a9f347e-2539-4093-aa2c-0cc17da927b7',  -- MW Elektrotechnik (Rohrendorf AT) — Elektrotechnik
  'd46ef177-3735-4cbb-86d1-c62d805886e0',  -- Milan Cergic (Wien AT) — person, no website
  '6ec94ac6-2278-4c65-bfa5-bda1d0016b66',  -- bei ECOS - Kranführer (Hargelsberg AT) — Kranführer (person), not firm
  '52ed32db-436b-488a-8d74-4e261fd20a84',  -- mimi ZAUNER (Walpersdorf AT) — person, no website
  'ae99efec-f746-4c27-8ba3-a63bd54555de',  -- Abschlepp-Bergungs-Charter-Dienste (Köln) — Abschlepp
  '265e0efb-6546-4012-9185-873e219731ff',  -- Bott Abschleppdienst (Bad Kreuznach) — Abschlepp
  '71f9be20-c27e-4e93-8279-5be9a97cecc0',  -- Dachdeckerei Mähner (Berlin) — Dach
  'b1bad791-23af-4776-8f65-c9123f9d4a55',  -- Lutter Spedition (Bönen) — Spedition
  '517192eb-3de5-48aa-95c2-d34a25b7be82',  -- Schmidbauer (Kiefersfelden) — no website (likely duplicate of main Schmidbauer entry)
  '1ce7950d-7922-4a03-8fd9-f387ca005e63',  -- Seiz & Zimmermann (Vaihingen) — Zimmermann, no website
  '363bcdd5-767f-4a6d-8b48-653a81cf4a6f',  -- Tillmann Bau (Bleckede) — Bau, no website
  '8a157907-9b26-4f54-8852-cf3939a60a29',  -- Kran-Einsatz-Service Leipzig — no website
  'e4d38b6a-0044-41ab-be8b-fc9f29da1a5b',  -- Digando (Dornbirn AT) — portal-marketplace (like klickrent), should have been portal_competitor

  -- Fetch-based AT (4)
  'a30c3ec0-f8d4-4109-8228-7c3bdffd5790',  -- Hutec-Cranes (Enzesfeld AT) — explicit Wartung-only "Wartung & Service von Kränen"
  'c8045a3c-eced-473c-b314-62ac3e62153f',  -- Kran-Tec (Höcken AT) — 403 forbidden, no description
  'b4d7bdad-845e-43a2-b5b9-10af2c8d0d3b',  -- Wallner Cranetec (Klagenfurt AT) — Vertrieb/Reparatur Ladekrane, not rental
  '6a0b4944-962f-4b0f-a2a6-88a02772bc59',  -- Abnorm GmbH (Innsbruck AT) — TLS cert altname invalid

  -- Fetch-based DE single (6)
  'ff8eaff0-c2ca-4e89-85fe-e0da34d19ff7',  -- Alpha Kran (Forchheim) — 403 forbidden
  '6429fcfd-4000-4c6c-9277-0a1c67619759',  -- Hirl Kran (Massing) — ECONNREFUSED
  '069f521e-96e1-4722-9412-e65edba79093',  -- KnicksKran (Illingen) — TLS cert expired
  '8602032a-24ce-4b34-8d2d-101ec9193a6b',  -- Mayer (Bad Rappenau) — TLS cert altname invalid
  '93354384-ba61-47ae-84a8-5e7f5dabaea4',  -- Mobil Kran (Pfreimd) — TLS cert altname invalid
  '83a24477-ce7a-4fe7-8986-6ddb599ee1cc',  -- Sonner Kran (Königsdorf) — TLS cert altname invalid

  -- Fetch-based chains (6)
  '2e181c07-c071-4737-a78d-fad8ac10f627',  -- HKL Center Graz (AT) — general Bau-rental chain, positioning mismatch
  '4e3f5cbb-4392-4231-b1df-9095223ee8ef',  -- HKL Center Wiener Neudorf (AT) — same chain
  'aafb9ffd-80ad-49d0-82ed-92b71ae058de',  -- Kran und Schwerlastlogistik Rößler (Berlin) — ECONNREFUSED
  '0839f40d-f786-45ee-9bd0-111f0b182c68',  -- Kranlogistik Rößler (Leipzig) — same firm, ECONNREFUSED
  'd17901c4-6cc8-4a1d-98fb-bb1df6756bb3',  -- Abrams Krane (Herne) — 301-redirects to Beckum, duplicate
  'ece9e686-d78c-48ea-ac1c-6ce5e54f1115',  -- Abrams Krane (Beckum) — thin content fetch, no facts to enrich

  -- Other (1)
  'd9892fc1-4e83-4edb-b578-f451a6edc8cc'   -- Taxikran (Bergisch Gladbach) — no website, no description, no enrich path
);

-- Expected: 9 description rows updated + 1 row with name+slug+description + 31 is_relevant rows = 41 total touches.
-- Live catalog after Stage B Bucket 2: 754 - 31 = 723 firms.
-- wartung_only / unknown_empty buckets after re-audit: ~0 unknown_empty.

-- ROLLBACK (if needed):
-- See migration file in repo for full reverse — descriptions to NULL, name/slug back to "Anchor crane and aerial platform hire GmbH"/"anchor-crane-and-aerial-platform-hire-gmbh", and is_relevant back to true.
