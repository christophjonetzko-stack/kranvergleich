-- Stage B rollback — 2 wrongful deactivations from migration 019.
-- 2026-05-05. Christoph caught the error: I deactivated 2 firms with is_verified=True + empty website
-- without running a WebSearch first. Both are real, active rental firms confirmed via WebSearch + WebFetch.
--
-- Root cause: violated memory rule `feedback_verify_external_claims` (hard rule post-BSK 2026-05-01)
-- which mandates WebSearch for any external claim. is_verified=True flag should have been respected as
-- prior validation by Christoph. Conservative-deakt heuristic ("no website + no description = drop")
-- must be SECONDARY to the verification signal.
--
-- Sources:
--   Taxikran:    https://www.taxikran-koeln.de/  (TK 8500, Bergisch Gladbach)
--   Schmidbauer: https://www.schmidbauer-gruppe.de/standorte/kiefersfelden/  (Standort Kiefersfelden)

-- 1. Taxikran (Bergisch Gladbach DE) — rollback + description
UPDATE companies SET
  is_relevant = true,
  description = 'Taxikran ist ein Anbieter von Autokran-Mietleistungen mit Sitz in Bergisch Gladbach, der primär die Region Köln, Bonn und Düsseldorf bedient. Im Einsatz steht der TK 8500 — ein Spezial-Montagekran mit 85 Metertonnen Hubkraft, 33 Tonnen Gesamtgewicht, bis zu 50 Metern Hubhöhe und rund 38 Metern seitlicher Auslage. Der Kran wird mit Kranführer und Funkfernbedienung betrieben; auf Anfrage erfolgen Einsätze in ganz NRW. Ergänzend stehen Vakuum-Glasheber, Arbeitskörbe und Schuttmulden im Mietpark.',
  website = 'https://www.taxikran-koeln.de/'
WHERE id = 'd9892fc1-4e83-4edb-b578-f451a6edc8cc';

-- 2. Schmidbauer GmbH Standort Kiefersfelden (DE Bayern) — rollback + description + website
UPDATE companies SET
  is_relevant = true,
  description = 'Schmidbauer Standort Kiefersfelden ist Teil der bundesweit aktiven Schmidbauer Gruppe (Hauptsitz München-Gräfelfing) mit über 25 Standorten in Deutschland. Der Mietpark in Kiefersfelden umfasst Mobil- und Minikrane bis 12 Tonnen, LKW-Ladekrane, All-Terrain-Krane bis 800 Tonnen, Mobilbaukrane sowie Raupenkrane bis 1.350 Tonnen. Zum Leistungsspektrum gehören neben der Kranvermietung auch SPMT-Spezialtransporte, Trafo- und Maschinentransporte sowie Industriemontagen. Die Gruppe ist nach ISO 9001, ISO 50001 und SCC-VAZ zertifiziert.',
  website = 'https://www.schmidbauer-gruppe.de/standorte/kiefersfelden/'
WHERE id = '517192eb-3de5-48aa-95c2-d34a25b7be82';

-- Expected: 2 rows updated. Live catalog: 723 + 2 = 725 firms.
