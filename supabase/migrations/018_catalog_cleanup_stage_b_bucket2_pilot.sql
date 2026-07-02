-- Stage B Bucket 2 — Pilot batch (5 fetches → 14 firm decisions)
-- 2026-05-05. 11 description enrichments (KEEP) + 3 Boels deactivations.
-- Sources: firm websites fetched via robots-respecting WebFetch. Descriptions written from scratch
-- using extracted facts. No 1:1 copy from source pages (Sie-Form / 3rd-person catalog style).

-- ============================================================
-- PART A: KEEP + description (11 firms)
-- ============================================================

-- MAXIKraft Gruppe (8 locations) — body identical, opening personalized per Standort to avoid duplicate-content signal.
UPDATE companies SET description = 'MAXIKraft Standort Dornheim gehört zu einer Kran- und Schwerlastgruppe mit 23 Standorten in sieben Bundesländern. Das Unternehmen verfügt über einen Maschinenpark mit Krantechnik bis über 1.000 Tonnen Hubkapazität sowie 70 Spezial-Schwerlastzügen für komplette Maschinenumzüge, Industriemontagen und Schwertransporte. Neben Hub- und Hebearbeiten gehören Montage- und Demontageleistungen sowie Stahl- und Betonarbeiten zum Leistungsspektrum.'
WHERE id = '766a1ede-7d12-4190-8e2c-382addbf90ea';

UPDATE companies SET description = 'MAXIKraft Standort Leuna gehört zu einer Kran- und Schwerlastgruppe mit 23 Standorten in sieben Bundesländern. Das Unternehmen verfügt über einen Maschinenpark mit Krantechnik bis über 1.000 Tonnen Hubkapazität sowie 70 Spezial-Schwerlastzügen für komplette Maschinenumzüge, Industriemontagen und Schwertransporte. Neben Hub- und Hebearbeiten gehören Montage- und Demontageleistungen sowie Stahl- und Betonarbeiten zum Leistungsspektrum.'
WHERE id = 'cea1f009-cf44-4059-86da-05d02f256e91';

UPDATE companies SET description = 'MAXIKraft Standort Schkopau gehört zu einer Kran- und Schwerlastgruppe mit 23 Standorten in sieben Bundesländern. Das Unternehmen verfügt über einen Maschinenpark mit Krantechnik bis über 1.000 Tonnen Hubkapazität sowie 70 Spezial-Schwerlastzügen für komplette Maschinenumzüge, Industriemontagen und Schwertransporte. Neben Hub- und Hebearbeiten gehören Montage- und Demontageleistungen sowie Stahl- und Betonarbeiten zum Leistungsspektrum.'
WHERE id = '2639ab9e-3f8d-46b8-8a20-44fd6135cd69';

UPDATE companies SET description = 'MAXIKraft Standort Ingolstadt gehört zu einer Kran- und Schwerlastgruppe mit 23 Standorten in sieben Bundesländern. Das Unternehmen verfügt über einen Maschinenpark mit Krantechnik bis über 1.000 Tonnen Hubkapazität sowie 70 Spezial-Schwerlastzügen für komplette Maschinenumzüge, Industriemontagen und Schwertransporte. Neben Hub- und Hebearbeiten gehören Montage- und Demontageleistungen sowie Stahl- und Betonarbeiten zum Leistungsspektrum.'
WHERE id = '815925f8-4e21-453b-8afe-b74c61817e69';

UPDATE companies SET description = 'MAXIKraft Standort München gehört zu einer Kran- und Schwerlastgruppe mit 23 Standorten in sieben Bundesländern. Das Unternehmen verfügt über einen Maschinenpark mit Krantechnik bis über 1.000 Tonnen Hubkapazität sowie 70 Spezial-Schwerlastzügen für komplette Maschinenumzüge, Industriemontagen und Schwertransporte. Neben Hub- und Hebearbeiten gehören Montage- und Demontageleistungen sowie Stahl- und Betonarbeiten zum Leistungsspektrum.'
WHERE id = 'fe3f403c-fc8b-4ca2-a97d-c26471bed819';

UPDATE companies SET description = 'MAXIKraft Standort Pforzen gehört zu einer Kran- und Schwerlastgruppe mit 23 Standorten in sieben Bundesländern. Das Unternehmen verfügt über einen Maschinenpark mit Krantechnik bis über 1.000 Tonnen Hubkapazität sowie 70 Spezial-Schwerlastzügen für komplette Maschinenumzüge, Industriemontagen und Schwertransporte. Neben Hub- und Hebearbeiten gehören Montage- und Demontageleistungen sowie Stahl- und Betonarbeiten zum Leistungsspektrum.'
WHERE id = '58b8fd64-5075-47a3-a6fc-40c9397eba35';

UPDATE companies SET description = 'MAXIKraft Standort Riesa gehört zu einer Kran- und Schwerlastgruppe mit 23 Standorten in sieben Bundesländern. Das Unternehmen verfügt über einen Maschinenpark mit Krantechnik bis über 1.000 Tonnen Hubkapazität sowie 70 Spezial-Schwerlastzügen für komplette Maschinenumzüge, Industriemontagen und Schwertransporte. Neben Hub- und Hebearbeiten gehören Montage- und Demontageleistungen sowie Stahl- und Betonarbeiten zum Leistungsspektrum.'
WHERE id = 'bf2db762-197e-4529-a441-923332de8ea4';

UPDATE companies SET description = 'MAXIKraft Standort Wittenberg gehört zu einer Kran- und Schwerlastgruppe mit 23 Standorten in sieben Bundesländern. Das Unternehmen verfügt über einen Maschinenpark mit Krantechnik bis über 1.000 Tonnen Hubkapazität sowie 70 Spezial-Schwerlastzügen für komplette Maschinenumzüge, Industriemontagen und Schwertransporte. Neben Hub- und Hebearbeiten gehören Montage- und Demontageleistungen sowie Stahl- und Betonarbeiten zum Leistungsspektrum.'
WHERE id = '0ff4ea01-9108-48b6-9694-66b1dd4b60d9';

-- Markowitsch Franz GmbH (Perchtoldsdorf AT)
UPDATE companies SET description = 'Markowitsch ist ein Wiener Familienunternehmen mit Sitz in Perchtoldsdorf, das seit 1937 Kranleistungen in Ostösterreich anbietet — primär in Wien, Niederösterreich, dem Burgenland und der Nordsteiermark. Der Mietpark umfasst Autokrane, Teleskopkrane, Ladekrane sowie Spezialkrane, jeweils mit Kranführer. Ergänzend werden Sonder- und Gefahrenguttransporte mit Sattelzügen und Tiefladern durchgeführt.'
WHERE id = 'd11e2a88-68c5-4140-9486-f05994c3820b';

-- Bertenbreiter GmbH (Michelbach an der Lücke, BW)
UPDATE companies SET description = 'Bertenbreiter ist ein Anbieter von Baukran-Mietleistungen mit Sitz in Michelbach an der Lücke (Baden-Württemberg). Der Mietpark umfasst Schnelleinsatzkrane und mobile Baukrane verschiedener Hersteller — darunter Liebherr 63 K sowie Potain-Modelle. Anfahrt und Abtransport des Krans zur und von der Baustelle übernimmt das Unternehmen in Eigenregie.'
WHERE id = '7c21d449-db59-427a-b164-216eec5eb12a';

-- KranWien GmbH (Wien AT)
UPDATE companies SET description = 'KranWien ist ein Wiener Anbieter, der Kranvermietung mit Personalgestellung sowie Kranverkauf österreichweit anbietet. Bei Mietkränen wird ein qualifizierter Kranfahrer standardmäßig mitgestellt. Im Angebot finden sich Krane namhafter Hersteller wie Liebherr, Wolff, Terex, Potain und Kroll.'
WHERE id = 'b09fb15e-8273-454c-a02e-db98275810be';

-- ============================================================
-- PART B: DEACTIVATE — Boels Rental Germany (3 locations)
-- ============================================================
-- Reason: general construction/tools rental chain (860k Mietartikel, 830 Filialen in 27 Ländern),
-- not a specialized crane operator. Homepage doesn't list crane as a category. Catalog positioning
-- mismatch — leads for "Autokran mieten" land at firms where crane is <1% of inventory = poor UX.
UPDATE companies SET is_relevant = false WHERE id IN (
  '654b1796-2432-4679-a5a5-50c94b6e4aad',  -- Boels Rental Oranienburg
  'b79da45f-888d-44a6-bd95-0855902d7468',  -- Boels Rental Wolfsburg
  '1a216078-ab24-462c-be3e-b4c707015c35'   -- Boels Rental Neubrandenburg
);

-- Expected: 11 description rows updated + 3 is_relevant rows updated = 14 total touches.
-- Live catalog after pilot: 757 - 3 = 754 firms.

-- ROLLBACK (if needed):
-- UPDATE companies SET description = NULL WHERE id IN (
--   '766a1ede-7d12-4190-8e2c-382addbf90ea','cea1f009-cf44-4059-86da-05d02f256e91',
--   '2639ab9e-3f8d-46b8-8a20-44fd6135cd69','815925f8-4e21-453b-8afe-b74c61817e69',
--   'fe3f403c-fc8b-4ca2-a97d-c26471bed819','58b8fd64-5075-47a3-a6fc-40c9397eba35',
--   'bf2db762-197e-4529-a441-923332de8ea4','0ff4ea01-9108-48b6-9694-66b1dd4b60d9',
--   'd11e2a88-68c5-4140-9486-f05994c3820b','7c21d449-db59-427a-b164-216eec5eb12a',
--   'b09fb15e-8273-454c-a02e-db98275810be'
-- );
-- UPDATE companies SET is_relevant = true WHERE id IN (
--   '654b1796-2432-4679-a5a5-50c94b6e4aad',
--   'b79da45f-888d-44a6-bd95-0855902d7468',
--   '1a216078-ab24-462c-be3e-b4c707015c35'
-- );
