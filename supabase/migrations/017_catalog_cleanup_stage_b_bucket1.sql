-- Stage B Bucket 1: deactivate 18 wartung-only / off-niche firms
-- Reviewed manually 2026-05-05 from scripts/firm_audit_2026_05_05/wartung_only.csv (37 rows).
-- 19 false-positives kept (Kranarbeit/Mietpark/legitimate hybrid). RECH Kaiserslautern saved via website fetch.
-- KSG Hamburg + OFNER Lauterach AT deactivated due to broken SSL (cert altname invalid / expired) = broken lead UX.

UPDATE companies SET is_relevant = false WHERE id IN (
  -- AT (5)
  'dc7de986-4b5a-48cf-ad87-7af63934ce40',  -- Bautransport und Kranservice (Gerasdorf bei Wien) — no desc, no website
  'c6211692-16eb-4aee-ad3b-650ced6dccf5',  -- ELEVARE e.U (Wien) — Service/Wartung von Krananlagen
  'bae2ec5e-7de7-4b3e-8cd8-b9163ce8d6e8',  -- Kran Maletschek Nautics (Weiden am See) — yacht service, Takelmast
  '87b6f6db-8bfe-457f-9d36-5b4991112cca',  -- Kranservice Etzinger KEG (Linz) — no desc, no website
  'd9eb72e5-39c0-44ad-8038-ac37c45b71ac',  -- NEQ CRANES GmbH (Buchkirchen) — Hersteller + Servicepartner, not rental
  '4db2535a-c67b-400f-9d59-09fe410aa403',  -- OFNER Kranservice GmbH (Lauterach) — SSL cert expired, no desc
  '227ea20e-bd37-4c76-89f9-720d3b881bbd',  -- Veitinger Michael (Rabenstein) — desc explicit "kein Kranvermietbetrieb"

  -- DE (13)
  'd800d49c-17ac-4b60-bd07-9ddf90806b1a',  -- Akkus Bew. & Kranservice (Berlin) — Personalvermittlung Kranfahrer
  'fdbdafff-c8ee-4676-bcf8-a4b0a3dc0ff2',  -- Alex Kranservice (Stetten) — Kranmontage + Kranwartung
  '77daabed-15cf-4bf2-80dc-0556353450cb',  -- KSG Kranservice Günther (Hamburg) — TLS cert altname invalid
  '07f47ee1-2407-4c60-bdc7-d0711ee7f009',  -- Kastens & Straube Kranservice (Lichtenfels) — 403 + no desc
  '41c83f6c-5735-4dfa-89b6-58166b642081',  -- Kran Service Hartmann (Görlitz) — Reparaturbetrieb + Hydraulikzylinder-Reparaturen
  '8affef7d-ff5b-4120-ae66-6c36d8abd304',  -- Kran- & Aufzugsservice Karsdorf — Aufzugsmonteure (elevator service)
  '0ca14cec-e2ab-4a85-b21a-7565721ac316',  -- Kranservice Kirchmann (Bad Saarow) — Zimmerei/Dachdeckerei/Holzbau
  '8dbeae1e-13a1-4d37-a742-cfbe1af74968',  -- Kranservice Meinke (Oberkrämer) — no desc, no website
  'f2016d95-57ad-4880-8bb1-1e5b8664fb38',  -- Kranservice Stehle (Uttenweiler) — Wartung/Reparatur/Prüfungen/Schulungen
  'b55f2ba6-8c1e-4b6f-b0bc-eea3a91a6f90',  -- Wehner Kran- und Pannendienst (Fulda) — Abschleppdienst + Werkstatt
  '9c980e50-0308-45e3-b459-e355dee5cc98'   -- scholz Holztechnik (Thaining) — primarily Holztechnik
);

-- Expected: 18 rows updated.
-- Live catalog after Stage B Bucket 1: 775 - 18 = 757 firms.

-- ROLLBACK (if needed):
-- UPDATE companies SET is_relevant = true WHERE id IN (
--   'dc7de986-4b5a-48cf-ad87-7af63934ce40',
--   'c6211692-16eb-4aee-ad3b-650ced6dccf5',
--   'bae2ec5e-7de7-4b3e-8cd8-b9163ce8d6e8',
--   '87b6f6db-8bfe-457f-9d36-5b4991112cca',
--   'd9eb72e5-39c0-44ad-8038-ac37c45b71ac',
--   '4db2535a-c67b-400f-9d59-09fe410aa403',
--   '227ea20e-bd37-4c76-89f9-720d3b881bbd',
--   'd800d49c-17ac-4b60-bd07-9ddf90806b1a',
--   'fdbdafff-c8ee-4676-bcf8-a4b0a3dc0ff2',
--   '77daabed-15cf-4bf2-80dc-0556353450cb',
--   '07f47ee1-2407-4c60-bdc7-d0711ee7f009',
--   '41c83f6c-5735-4dfa-89b6-58166b642081',
--   '8affef7d-ff5b-4120-ae66-6c36d8abd304',
--   '0ca14cec-e2ab-4a85-b21a-7565721ac316',
--   '8dbeae1e-13a1-4d37-a742-cfbe1af74968',
--   'f2016d95-57ad-4880-8bb1-1e5b8664fb38',
--   'b55f2ba6-8c1e-4b6f-b0bc-eea3a91a6f90',
--   '9c980e50-0308-45e3-b459-e355dee5cc98'
-- );
