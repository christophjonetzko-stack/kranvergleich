-- 4. COMPANY_CRANES (crane_types_detected → crane_types)
-- =============================================
-- For 'allgemein' companies: assign them to ALL crane types (they are general crane rental)
-- For specific types: assign to those specific types

DO $$
DECLARE
  comp RECORD;
  ct RECORD;
  crane_types_str TEXT;
  type_slug TEXT;
  type_arr TEXT[];
BEGIN
  FOR comp IN SELECT id, slug FROM companies LOOP
    -- Get crane_types_detected for this company from a temp lookup
    -- We'll handle this via direct INSERT below
    NULL;
  END LOOP;
END $$;

-- Direct company_cranes assignments
-- Step 1: Create temp mapping
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dmd-transport-moebelliftvermieting' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dmd-transport-moebelliftvermieting' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dmd-transport-moebelliftvermieting' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dmd-transport-moebelliftvermieting' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dmd-transport-moebelliftvermieting' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mac-handel-und-vermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mac-handel-und-vermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mac-handel-und-vermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mac-handel-und-vermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mac-handel-und-vermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'umzugsfachspedition-muecke-umzuege-in-berlin-und-umgebung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'umzugsfachspedition-muecke-umzuege-in-berlin-und-umgebung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'umzugsfachspedition-muecke-umzuege-in-berlin-und-umgebung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'umzugsfachspedition-muecke-umzuege-in-berlin-und-umgebung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'umzugsfachspedition-muecke-umzuege-in-berlin-und-umgebung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jl-transporte-jan-loeschmann' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jl-transporte-jan-loeschmann' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jl-transporte-jan-loeschmann' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jl-transporte-jan-loeschmann' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jl-transporte-jan-loeschmann' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pmg-geraetevermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pmg-geraetevermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pmg-geraetevermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pmg-geraetevermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pmg-geraetevermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'richter-kran-und-schwerlast-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'richter-kran-und-schwerlast-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'richter-kran-und-schwerlast-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'richter-kran-und-schwerlast-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'richter-kran-und-schwerlast-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kayhan-baumaschinen-vermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kayhan-baumaschinen-vermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kayhan-baumaschinen-vermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kayhan-baumaschinen-vermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kayhan-baumaschinen-vermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mearent-baumaschinen-vermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mearent-baumaschinen-vermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mearent-baumaschinen-vermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mearent-baumaschinen-vermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mearent-baumaschinen-vermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bs-verleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bs-verleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bs-verleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bs-verleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bs-verleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-solle-simon-solle' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-solle-simon-solle' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-solle-simon-solle' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-solle-simon-solle' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-solle-simon-solle' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-hamburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-hamburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-hamburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-hamburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-hamburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-m-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-m-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-m-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-m-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-m-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suelzen-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suelzen-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suelzen-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suelzen-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suelzen-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bovah-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bovah-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bovah-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bovah-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bovah-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-seeshaupt' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-seeshaupt' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-seeshaupt' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-seeshaupt' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-seeshaupt' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrandienst-habermann-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hgkw' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hgkw' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hgkw' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hgkw' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hgkw' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-und-arbeitsbuehnenvermietung-gayko' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-und-arbeitsbuehnenvermietung-gayko' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-und-arbeitsbuehnenvermietung-gayko' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-und-arbeitsbuehnenvermietung-gayko' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-und-arbeitsbuehnenvermietung-gayko' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tf-vermietungsservice-und-erdarbeiten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tf-vermietungsservice-und-erdarbeiten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tf-vermietungsservice-und-erdarbeiten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tf-vermietungsservice-und-erdarbeiten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tf-vermietungsservice-und-erdarbeiten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mikschl-autokrane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'l-pfenninger-und-sohn-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'l-pfenninger-und-sohn-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'l-pfenninger-und-sohn-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'l-pfenninger-und-sohn-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'l-pfenninger-und-sohn-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baukrane-weidenhiller-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietkran-koeln-bonn' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietkran-koeln-bonn' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietkran-koeln-bonn' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietkran-koeln-bonn' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietkran-koeln-bonn' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haerzschel-kranverleih-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haerzschel-kranverleih-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haerzschel-kranverleih-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haerzschel-kranverleih-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haerzschel-kranverleih-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-neu-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thomas-mende-kranservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thomas-mende-kranservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thomas-mende-kranservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thomas-mende-kranservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thomas-mende-kranservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-arbeitsbuehnen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-arbeitsbuehnen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-arbeitsbuehnen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-arbeitsbuehnen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-arbeitsbuehnen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'huber-kran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'huber-kran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'huber-kran' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'huber-kran' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'huber-kran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-fundh-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-fundh-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-fundh-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-fundh-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-fundh-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-ulm-kranservice-schaedle' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-ulm-kranservice-schaedle' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-ulm-kranservice-schaedle' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-ulm-kranservice-schaedle' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-ulm-kranservice-schaedle' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranundstapler-schulung-kilic-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranundstapler-schulung-kilic-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranundstapler-schulung-kilic-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranundstapler-schulung-kilic-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranundstapler-schulung-kilic-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alb-mietpark' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alb-mietpark' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alb-mietpark' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alb-mietpark' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alb-mietpark' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-radlader-mieten-baugeraetevermietung-biesenthal' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-radlader-mieten-baugeraetevermietung-biesenthal' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-radlader-mieten-baugeraetevermietung-biesenthal' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-radlader-mieten-baugeraetevermietung-biesenthal' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-radlader-mieten-baugeraetevermietung-biesenthal' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lina24-kranvermietung-autokran-und-minikran-glasroboter' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lina24-kranvermietung-autokran-und-minikran-glasroboter' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnenvermietung-gebr-maerz-gbr' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnenvermietung-gebr-maerz-gbr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnenvermietung-gebr-maerz-gbr' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnenvermietung-gebr-maerz-gbr' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnenvermietung-gebr-maerz-gbr' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiss-kranservice-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiss-kranservice-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiss-kranservice-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiss-kranservice-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiss-kranservice-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-stabel-gmbh-stapler-und-arbeitsbuehne-mieten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-stabel-gmbh-stapler-und-arbeitsbuehne-mieten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-stabel-gmbh-stapler-und-arbeitsbuehne-mieten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-stabel-gmbh-stapler-und-arbeitsbuehne-mieten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-stabel-gmbh-stapler-und-arbeitsbuehne-mieten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-juerging' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-juerging' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-juerging' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-juerging' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-juerging' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-brake' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-brake' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-brake' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-brake' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-brake' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baier-autokrane-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokran-mueller' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'avm-autokran-vermietung-gmbh-und-co-kg-in-mittelhessen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nks-niessen-kranservice-niessen-alexander' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nks-niessen-kranservice-niessen-alexander' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nks-niessen-kranservice-niessen-alexander' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nks-niessen-kranservice-niessen-alexander' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nks-niessen-kranservice-niessen-alexander' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'muecke-umzuege-brandenburg-und-umgebung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'muecke-umzuege-brandenburg-und-umgebung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'muecke-umzuege-brandenburg-und-umgebung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'muecke-umzuege-brandenburg-und-umgebung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'muecke-umzuege-brandenburg-und-umgebung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-niebler' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-niebler' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-niebler' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-niebler' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-niebler' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bva-b-aumaschinen-v-erleih-a-mine-eschwege' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bva-b-aumaschinen-v-erleih-a-mine-eschwege' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bva-b-aumaschinen-v-erleih-a-mine-eschwege' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bva-b-aumaschinen-v-erleih-a-mine-eschwege' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bva-b-aumaschinen-v-erleih-a-mine-eschwege' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-klett' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-klett' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-klett' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-klett' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-klett' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sundw-arbeitsbuehnen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sundw-arbeitsbuehnen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sundw-arbeitsbuehnen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sundw-arbeitsbuehnen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sundw-arbeitsbuehnen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herbert-koehler' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herbert-koehler' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herbert-koehler' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herbert-koehler' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herbert-koehler' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krankompetenz-bodensee' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krankompetenz-bodensee' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krankompetenz-bodensee' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krankompetenz-bodensee' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krankompetenz-bodensee' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-trans-kranservice-und-transporte-24-7-bergungsservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-trans-kranservice-und-transporte-24-7-bergungsservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-trans-kranservice-und-transporte-24-7-bergungsservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-trans-kranservice-und-transporte-24-7-bergungsservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-trans-kranservice-und-transporte-24-7-bergungsservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mas-kranverleih-gbr' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mas-kranverleih-gbr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mas-kranverleih-gbr' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mas-kranverleih-gbr' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mas-kranverleih-gbr' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-essers-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-essers-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-essers-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-essers-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-essers-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokran-wissel-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'geraete-und-baumaschinen-mietpark-niedernhall' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'geraete-und-baumaschinen-mietpark-niedernhall' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'geraete-und-baumaschinen-mietpark-niedernhall' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'geraete-und-baumaschinen-mietpark-niedernhall' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'geraete-und-baumaschinen-mietpark-niedernhall' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rath-kranservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rath-kranservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rath-kranservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rath-kranservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rath-kranservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martin-wagner-kranservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martin-wagner-kranservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martin-wagner-kranservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martin-wagner-kranservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martin-wagner-kranservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-schwerlastlogistik-roessler-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-schwerlastlogistik-roessler-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-schwerlastlogistik-roessler-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-schwerlastlogistik-roessler-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-schwerlastlogistik-roessler-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sg-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sg-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sg-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sg-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sg-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundl-kranservice-mietkrane-terex' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundl-kranservice-mietkrane-terex' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundl-kranservice-mietkrane-terex' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundl-kranservice-mietkrane-terex' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundl-kranservice-mietkrane-terex' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'deutsche-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'deutsche-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'deutsche-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'deutsche-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'deutsche-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-kranservice-fuer-kranmontage-kranwartung-und-transporte-mit-80km-h-achse' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-kranservice-fuer-kranmontage-kranwartung-und-transporte-mit-80km-h-achse' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-kranservice-fuer-kranmontage-kranwartung-und-transporte-mit-80km-h-achse' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-kranservice-fuer-kranmontage-kranwartung-und-transporte-mit-80km-h-achse' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-kranservice-fuer-kranmontage-kranwartung-und-transporte-mit-80km-h-achse' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-mieten-bielefeld-zeller-kranservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-mieten-bielefeld-zeller-kranservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-mieten-bielefeld-zeller-kranservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-mieten-bielefeld-zeller-kranservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-mieten-bielefeld-zeller-kranservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mini-krane-teichmann' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stahl-baumaschinen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stahl-baumaschinen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stahl-baumaschinen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stahl-baumaschinen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stahl-baumaschinen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dh-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dh-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dh-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dh-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dh-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolf-construction-machinery-and-equipment-handels-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolf-construction-machinery-and-equipment-handels-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolf-construction-machinery-and-equipment-handels-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolf-construction-machinery-and-equipment-handels-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolf-construction-machinery-and-equipment-handels-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'id-logistik-gmbh-kranvermietung-koeln' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'id-logistik-gmbh-kranvermietung-koeln' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'id-logistik-gmbh-kranvermietung-koeln' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'id-logistik-gmbh-kranvermietung-koeln' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'id-logistik-gmbh-kranvermietung-koeln' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rey-krantechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rey-krantechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rey-krantechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rey-krantechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rey-krantechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-meyer-gmbh-kranarbeiten-arbeitsbuehnen-transporte' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-meyer-gmbh-kranarbeiten-arbeitsbuehnen-transporte' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-meyer-gmbh-kranarbeiten-arbeitsbuehnen-transporte' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-meyer-gmbh-kranarbeiten-arbeitsbuehnen-transporte' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-meyer-gmbh-kranarbeiten-arbeitsbuehnen-transporte' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nordkran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nordkran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nordkran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nordkran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nordkran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-klar-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokranvermietung-kranvermietung-kran-christoph-turinsky' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenverleih-maass' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenverleih-maass' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenverleih-maass' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenverleih-maass' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenverleih-maass' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mr-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mr-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mr-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mr-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mr-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'connors-baumaschinen-vermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'connors-baumaschinen-vermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'connors-baumaschinen-vermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'connors-baumaschinen-vermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'connors-baumaschinen-vermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-maschinentransporte' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-maschinentransporte' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-maschinentransporte' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-maschinentransporte' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-maschinentransporte' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baukranvermietung-juergen-pennekamp' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dornseiff-autokrane-und-schwertransporte-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kastner-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kastner-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kastner-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kastner-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kastner-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oliver-krusche' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oliver-krusche' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oliver-krusche' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oliver-krusche' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oliver-krusche' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rh-kranservice-ruediger-haupt' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rh-kranservice-ruediger-haupt' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rh-kranservice-ruediger-haupt' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rh-kranservice-ruediger-haupt' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rh-kranservice-ruediger-haupt' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baeck-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baeck-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baeck-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baeck-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baeck-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-franz-henkel' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-franz-henkel' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-franz-henkel' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-franz-henkel' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-franz-henkel' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'filser-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'filser-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'filser-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'filser-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'filser-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'burkhart-baukranmontage-und-mietservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bode-bautechnik-baumaschinen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bode-bautechnik-baumaschinen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bode-bautechnik-baumaschinen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bode-bautechnik-baumaschinen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bode-bautechnik-baumaschinen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uk-baumaschinen-vermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uk-baumaschinen-vermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uk-baumaschinen-vermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uk-baumaschinen-vermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uk-baumaschinen-vermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geraete-vermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geraete-vermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geraete-vermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geraete-vermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geraete-vermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-schmidt-minibagger-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-schmidt-minibagger-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-schmidt-minibagger-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-schmidt-minibagger-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-schmidt-minibagger-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'taxikran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'taxikran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'taxikran' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'taxikran' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'taxikran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kammann' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kammann' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kammann' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kammann' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kammann' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-kranvermietung-unitec' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-kranvermietung-unitec' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-kranvermietung-unitec' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-kranvermietung-unitec' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-kranvermietung-unitec' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'august-fuchs-autokranbetrieb-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten-hamburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten-hamburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten-hamburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten-hamburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-mieten-hamburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jurda-hebetechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jurda-hebetechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jurda-hebetechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jurda-hebetechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jurda-hebetechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'karl-altendorff-e-k' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'karl-altendorff-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'karl-altendorff-e-k' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'karl-altendorff-e-k' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'karl-altendorff-e-k' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-micha' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-micha' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-micha' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-micha' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-micha' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gierse-kran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gierse-kran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gierse-kran' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gierse-kran' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gierse-kran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kai-stuermlinger-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kai-stuermlinger-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kai-stuermlinger-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kai-stuermlinger-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kai-stuermlinger-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-arntz-gmbh-kran-und-autokran-vermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ksg-kranservice-guenther-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ksg-kranservice-guenther-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ksg-kranservice-guenther-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ksg-kranservice-guenther-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ksg-kranservice-guenther-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fabian-kranverleih-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonneberger-krandienst' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonneberger-krandienst' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonneberger-krandienst' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonneberger-krandienst' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonneberger-krandienst' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-n-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-tec-turmdrehkran-service' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-lift-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-lift-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-lift-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-lift-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-lift-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-arbeitsbuehne-motorsaegen-kaercher' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-arbeitsbuehne-motorsaegen-kaercher' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-arbeitsbuehne-motorsaegen-kaercher' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-arbeitsbuehne-motorsaegen-kaercher' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-arbeitsbuehne-motorsaegen-kaercher' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roberts-minibaggerverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roberts-minibaggerverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roberts-minibaggerverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roberts-minibaggerverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roberts-minibaggerverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wr-baumaschinen-gbr' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wr-baumaschinen-gbr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wr-baumaschinen-gbr' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wr-baumaschinen-gbr' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wr-baumaschinen-gbr' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maier-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maier-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maier-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maier-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maier-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mahl-kranservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mahl-kranservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mahl-kranservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mahl-kranservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mahl-kranservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buehler-kran-service-vermietung-kranservice-und-mehr' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buehler-kran-service-vermietung-kranservice-und-mehr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buehler-kran-service-vermietung-kranservice-und-mehr' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buehler-kran-service-vermietung-kranservice-und-mehr' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buehler-kran-service-vermietung-kranservice-und-mehr' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-heilig-krandienst-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-heilig-krandienst-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-heilig-krandienst-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-heilig-krandienst-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-heilig-krandienst-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hekra-kran-und-transportservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hekra-kran-und-transportservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hekra-kran-und-transportservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hekra-kran-und-transportservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hekra-kran-und-transportservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-leitner-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-leitner-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-leitner-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-leitner-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-leitner-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundr-kran-service' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundr-kran-service' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundr-kran-service' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundr-kran-service' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rundr-kran-service' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberland-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tecra-autokran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'henneberger-schwerlast-e-k' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'henneberger-schwerlast-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'henneberger-schwerlast-e-k' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'henneberger-schwerlast-e-k' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'henneberger-schwerlast-e-k' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ib-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ib-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ib-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ib-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ib-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-wiemann-gmbh-schondra' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-aufzugsservice-gmbh-karsdorf' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-aufzugsservice-gmbh-karsdorf' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-aufzugsservice-gmbh-karsdorf' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-aufzugsservice-gmbh-karsdorf' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-aufzugsservice-gmbh-karsdorf' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sven-voelkel-autokrandienst' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-lausitz-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-lausitz-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-lausitz-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-lausitz-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-lausitz-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantec-foerdergeraeteservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantec-foerdergeraeteservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantec-foerdergeraeteservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantec-foerdergeraeteservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantec-foerdergeraeteservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokranverleih-weber' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'craneexit-hebetechnik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'craneexit-hebetechnik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'craneexit-hebetechnik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'craneexit-hebetechnik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'craneexit-hebetechnik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wendel-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wendel-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wendel-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wendel-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wendel-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'j-d-mann-hebebuehnenverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'j-d-mann-hebebuehnenverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'j-d-mann-hebebuehnenverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'j-d-mann-hebebuehnenverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'j-d-mann-hebebuehnenverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'runkehl-arbeitsbuehnen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'runkehl-arbeitsbuehnen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'runkehl-arbeitsbuehnen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'runkehl-arbeitsbuehnen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'runkehl-arbeitsbuehnen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-und-sohn-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-und-sohn-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-und-sohn-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-und-sohn-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'philipp-und-sohn-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'harald-hoffmann' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'harald-hoffmann' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'harald-hoffmann' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'harald-hoffmann' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'harald-hoffmann' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bauzaun-vermietung-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bauzaun-vermietung-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bauzaun-vermietung-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bauzaun-vermietung-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bauzaun-vermietung-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tj-kranvermietung-und-containerdienst' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tj-kranvermietung-und-containerdienst' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tj-kranvermietung-und-containerdienst' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tj-kranvermietung-und-containerdienst' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tj-kranvermietung-und-containerdienst' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'inntalkran-zaisserer-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'inntalkran-zaisserer-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'inntalkran-zaisserer-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'inntalkran-zaisserer-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'inntalkran-zaisserer-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kocks-kranbau-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kocks-kranbau-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kocks-kranbau-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kocks-kranbau-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kocks-kranbau-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'titschkus-und-wittrock-gmbh-und-co-kg-vertriebsbuero-bremen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'titschkus-und-wittrock-gmbh-und-co-kg-vertriebsbuero-bremen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'titschkus-und-wittrock-gmbh-und-co-kg-vertriebsbuero-bremen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'titschkus-und-wittrock-gmbh-und-co-kg-vertriebsbuero-bremen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'titschkus-und-wittrock-gmbh-und-co-kg-vertriebsbuero-bremen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-stapler-krane-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-stapler-krane-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-stapler-krane-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-stapler-krane-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-stapler-krane-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-stehle' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-stehle' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-stehle' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-stehle' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-stehle' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-michael-schledde' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-michael-schledde' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-michael-schledde' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-michael-schledde' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-michael-schledde' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaus-pahnke-autokranvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alpha-kran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alpha-kran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alpha-kran' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alpha-kran' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alpha-kran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-schroeder' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-schroeder' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-schroeder' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-schroeder' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-schroeder' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-5' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-5' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-5' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-5' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-5' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachbau-und-kranservice-wernitz' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachbau-und-kranservice-wernitz' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachbau-und-kranservice-wernitz' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachbau-und-kranservice-wernitz' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachbau-und-kranservice-wernitz' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ks-kranservice-gbr' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ks-kranservice-gbr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ks-kranservice-gbr' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ks-kranservice-gbr' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ks-kranservice-gbr' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachkran-de' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachkran-de' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachkran-de' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachkran-de' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachkran-de' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokran-mueller-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minikran-verleih-cham' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-r-schroeter-e-k' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-r-schroeter-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-r-schroeter-e-k' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-r-schroeter-e-k' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-r-schroeter-e-k' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkw-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkw-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkw-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkw-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkw-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranteam-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranteam-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranteam-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranteam-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranteam-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'all-kran-autokrane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kransverleih-pflotsch' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kransverleih-pflotsch' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kransverleih-pflotsch' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kransverleih-pflotsch' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kransverleih-pflotsch' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ass-autokran-schwerlast-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lkw-kran-rosenheim' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-mahlow' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-mahlow' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-mahlow' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-mahlow' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-mieten-mahlow' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietstation-gartengeraete-und-baumaschienen-dienstleistungen-gartenpflege' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietstation-gartengeraete-und-baumaschienen-dienstleistungen-gartenpflege' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietstation-gartengeraete-und-baumaschienen-dienstleistungen-gartenpflege' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietstation-gartengeraete-und-baumaschienen-dienstleistungen-gartenpflege' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietstation-gartengeraete-und-baumaschienen-dienstleistungen-gartenpflege' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-philipp' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-philipp' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-philipp' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-philipp' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-philipp' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tk-mietservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tk-mietservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tk-mietservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tk-mietservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tk-mietservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokranservice-dettmar' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'josef-dielen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'josef-dielen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'josef-dielen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'josef-dielen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'josef-dielen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'manfred-maier' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'manfred-maier' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'manfred-maier' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'manfred-maier' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'manfred-maier' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uperio-krane-hannover' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uperio-krane-hannover' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uperio-krane-hannover' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uperio-krane-hannover' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uperio-krane-hannover' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-eschbach' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-eschbach' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-eschbach' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-eschbach' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-eschbach' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atk-taunuskran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atk-taunuskran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atk-taunuskran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atk-taunuskran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atk-taunuskran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ralf-teichmann-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ralf-teichmann-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ralf-teichmann-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ralf-teichmann-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ralf-teichmann-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-leipzig' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-leipzig' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-leipzig' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-leipzig' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-leipzig' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-knorn-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-knorn-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-knorn-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-knorn-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-knorn-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bielemeyer-kran-und-foerder-anlagen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bielemeyer-kran-und-foerder-anlagen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bielemeyer-kran-und-foerder-anlagen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bielemeyer-kran-und-foerder-anlagen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bielemeyer-kran-und-foerder-anlagen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-mietservice-ihr-partner-im-raum-stuttgart-ludwigsburg-heilbronn' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-mietservice-ihr-partner-im-raum-stuttgart-ludwigsburg-heilbronn' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-mietservice-ihr-partner-im-raum-stuttgart-ludwigsburg-heilbronn' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-mietservice-ihr-partner-im-raum-stuttgart-ludwigsburg-heilbronn' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krueger-mietservice-ihr-partner-im-raum-stuttgart-ludwigsburg-heilbronn' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-autokran-joachim-beha' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'binder-kranservice-autokran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-steinberger' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-steinberger' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-steinberger' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-steinberger' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-steinberger' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moosmann-krane-und-service-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moosmann-krane-und-service-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moosmann-krane-und-service-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moosmann-krane-und-service-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moosmann-krane-und-service-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-werkstatt-fuessen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-werkstatt-fuessen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-werkstatt-fuessen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-werkstatt-fuessen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-werkstatt-fuessen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholz-holztechnik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholz-holztechnik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholz-holztechnik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholz-holztechnik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholz-holztechnik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hamburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hamburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hamburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hamburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hamburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-meinke' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-meinke' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-meinke' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-meinke' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-meinke' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-de' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kirchmann' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kirchmann' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kirchmann' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kirchmann' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-kirchmann' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scheffler-baukranvermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokranverleih-michael-held-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hack-schwerlastservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hack-schwerlastservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hack-schwerlastservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hack-schwerlastservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hack-schwerlastservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokran-schnurr-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knorr-kranverleih-e-k-inh-jutta-karaxha' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knorr-kranverleih-e-k-inh-jutta-karaxha' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knorr-kranverleih-e-k-inh-jutta-karaxha' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knorr-kranverleih-e-k-inh-jutta-karaxha' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knorr-kranverleih-e-k-inh-jutta-karaxha' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlyft-gmbh-deutschland-germany' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlyft-gmbh-deutschland-germany' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlyft-gmbh-deutschland-germany' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlyft-gmbh-deutschland-germany' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlyft-gmbh-deutschland-germany' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-kranvermietung-und-handel-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-kranvermietung-und-handel-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-kranvermietung-und-handel-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-kranvermietung-und-handel-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-kranvermietung-und-handel-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-und-radladerarbeiten-ruettelplatte-grabenverdichter-traktor-und-kippa' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-und-radladerarbeiten-ruettelplatte-grabenverdichter-traktor-und-kippa' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-und-radladerarbeiten-ruettelplatte-grabenverdichter-traktor-und-kippa' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-und-radladerarbeiten-ruettelplatte-grabenverdichter-traktor-und-kippa' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-und-radladerarbeiten-ruettelplatte-grabenverdichter-traktor-und-kippa' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'apparillos-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'apparillos-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'apparillos-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'apparillos-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'apparillos-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klink-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klink-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klink-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klink-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klink-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'starke-rent-baumaschinenvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'starke-rent-baumaschinenvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'starke-rent-baumaschinenvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'starke-rent-baumaschinenvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'starke-rent-baumaschinenvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'feller-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'feller-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'feller-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'feller-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'feller-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'in-media-corpore-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'in-media-corpore-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'in-media-corpore-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'in-media-corpore-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'in-media-corpore-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-pro-gbr' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-pro-gbr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-pro-gbr' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-pro-gbr' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-pro-gbr' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkv-montagekran-vermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkv-montagekran-vermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkv-montagekran-vermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkv-montagekran-vermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkv-montagekran-vermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-merkel-gmbh-nuernberg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonner-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonner-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonner-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonner-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sonner-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hannover' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hannover' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hannover' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hannover' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-hannover' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bolte-autokrane-bremen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boecker-maschinenwerke-gmbh-niederlassung-schkeuditz-leipzig' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'iks-foerdertechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'iks-foerdertechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'iks-foerdertechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'iks-foerdertechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'iks-foerdertechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisenhuth-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisenhuth-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisenhuth-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisenhuth-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisenhuth-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehne-und-hebebuehne-rentem-gmbh-stapler-telestapler-gabelstapler-vermie' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehne-und-hebebuehne-rentem-gmbh-stapler-telestapler-gabelstapler-vermie' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehne-und-hebebuehne-rentem-gmbh-stapler-telestapler-gabelstapler-vermie' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehne-und-hebebuehne-rentem-gmbh-stapler-telestapler-gabelstapler-vermie' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehne-und-hebebuehne-rentem-gmbh-stapler-telestapler-gabelstapler-vermie' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bolte-autokrane-hamburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bolte-autokrane-gmbh-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'holzbau-lensch-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'holzbau-lensch-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'holzbau-lensch-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'holzbau-lensch-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'holzbau-lensch-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-blaufelden' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-blaufelden' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-blaufelden' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-blaufelden' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-blaufelden' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'khv-zollernalb-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'khv-zollernalb-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'khv-zollernalb-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'khv-zollernalb-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'khv-zollernalb-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberlander' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberlander' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberlander' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberlander' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-oberlander' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'castell-autokran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'all-kran-autokrane-gmbh-und-co-kg-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-ansbach' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-ansbach' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-ansbach' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-ansbach' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-ansbach' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-u-co-kg-dingolfing' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-u-co-kg-dingolfing' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-u-co-kg-dingolfing' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-u-co-kg-dingolfing' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-u-co-kg-dingolfing' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxi-kraft-kran-mietservice-und-spezialtransporte' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxi-kraft-kran-mietservice-und-spezialtransporte' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxi-kraft-kran-mietservice-und-spezialtransporte' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxi-kraft-kran-mietservice-und-spezialtransporte' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxi-kraft-kran-mietservice-und-spezialtransporte' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-mugla-service-gmbh-kranvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-mugla-service-gmbh-kranvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-mugla-service-gmbh-kranvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-mugla-service-gmbh-kranvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-mugla-service-gmbh-kranvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwerlast-projekt-gesellschaft-mbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwerlast-projekt-gesellschaft-mbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwerlast-projekt-gesellschaft-mbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwerlast-projekt-gesellschaft-mbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwerlast-projekt-gesellschaft-mbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-technik-traurig-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-technik-traurig-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-technik-traurig-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-technik-traurig-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-technik-traurig-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaindl-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaindl-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaindl-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaindl-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaindl-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-berger' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-berger' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-berger' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-berger' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-berger' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'berteit-mietservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'berteit-mietservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'berteit-mietservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'berteit-mietservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'berteit-mietservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'biberger-arbeitsbuehnen-und-stapler' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'biberger-arbeitsbuehnen-und-stapler' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'biberger-arbeitsbuehnen-und-stapler' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'biberger-arbeitsbuehnen-und-stapler' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'biberger-arbeitsbuehnen-und-stapler' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crane-saller-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crane-saller-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crane-saller-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crane-saller-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crane-saller-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-und-v-veit-construction-gbr' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-und-v-veit-construction-gbr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-und-v-veit-construction-gbr' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-und-v-veit-construction-gbr' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-und-v-veit-construction-gbr' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tc-equipment-mietservice-service-verkauf-arbeitsbuehnen-baumaschinen-stapler-kra' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tc-equipment-mietservice-service-verkauf-arbeitsbuehnen-baumaschinen-stapler-kra' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tc-equipment-mietservice-service-verkauf-arbeitsbuehnen-baumaschinen-stapler-kra' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tc-equipment-mietservice-service-verkauf-arbeitsbuehnen-baumaschinen-stapler-kra' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tc-equipment-mietservice-service-verkauf-arbeitsbuehnen-baumaschinen-stapler-kra' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-fuer-pkw-lkw-und-bus-kranservice-ludwig-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-fuer-pkw-lkw-und-bus-kranservice-ludwig-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-fuer-pkw-lkw-und-bus-kranservice-ludwig-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-fuer-pkw-lkw-und-bus-kranservice-ludwig-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-fuer-pkw-lkw-und-bus-kranservice-ludwig-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kfr-mietlifte-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kfr-mietlifte-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kfr-mietlifte-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kfr-mietlifte-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kfr-mietlifte-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieckermann-und-sohn-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieckermann-und-sohn-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieckermann-und-sohn-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieckermann-und-sohn-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieckermann-und-sohn-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaus-otto-baumaschinenhandel-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaus-otto-baumaschinenhandel-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaus-otto-baumaschinenhandel-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaus-otto-baumaschinenhandel-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaus-otto-baumaschinenhandel-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bsi-gmbh-arbeitsbuehnen-vermietung-und-verkauf' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bsi-gmbh-arbeitsbuehnen-vermietung-und-verkauf' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bsi-gmbh-arbeitsbuehnen-vermietung-und-verkauf' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bsi-gmbh-arbeitsbuehnen-vermietung-und-verkauf' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bsi-gmbh-arbeitsbuehnen-vermietung-und-verkauf' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'groeger-bauaufzuege-hebetechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'groeger-bauaufzuege-hebetechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'groeger-bauaufzuege-hebetechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'groeger-bauaufzuege-hebetechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'groeger-bauaufzuege-hebetechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'riga-mainz' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'riga-mainz' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'riga-mainz' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'riga-mainz' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'riga-mainz' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-arbeitsbuehnenvermietung-hamburg-nord-west' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-arbeitsbuehnenvermietung-hamburg-nord-west' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-arbeitsbuehnenvermietung-hamburg-nord-west' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-arbeitsbuehnenvermietung-hamburg-nord-west' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-arbeitsbuehnenvermietung-hamburg-nord-west' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rothmund-gmbh-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rothmund-gmbh-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rothmund-gmbh-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rothmund-gmbh-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rothmund-gmbh-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-mietstation-hildesheim' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-mietstation-hildesheim' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-mietstation-hildesheim' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-mietstation-hildesheim' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-mietstation-hildesheim' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hiab-germany-gmbh-standort-karlsruhe' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hiab-germany-gmbh-standort-karlsruhe' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hiab-germany-gmbh-standort-karlsruhe' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hiab-germany-gmbh-standort-karlsruhe' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hiab-germany-gmbh-standort-karlsruhe' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bienhold-arbeitsbuehnen-gmbh-lbg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bienhold-arbeitsbuehnen-gmbh-lbg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bienhold-arbeitsbuehnen-gmbh-lbg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bienhold-arbeitsbuehnen-gmbh-lbg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bienhold-arbeitsbuehnen-gmbh-lbg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crailsheimer-baumaschinen-mietpark-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crailsheimer-baumaschinen-mietpark-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crailsheimer-baumaschinen-mietpark-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crailsheimer-baumaschinen-mietpark-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'crailsheimer-baumaschinen-mietpark-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-weimer-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-weimer-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-weimer-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-weimer-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-weimer-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-luebeck' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-luebeck' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-luebeck' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-luebeck' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-luebeck' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sb-lift-arbeitsbuehnen-und-hebetechnik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sb-lift-arbeitsbuehnen-und-hebetechnik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sb-lift-arbeitsbuehnen-und-hebetechnik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sb-lift-arbeitsbuehnen-und-hebetechnik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sb-lift-arbeitsbuehnen-und-hebetechnik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jumbo-krandienst-herbert-duch-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jumbo-krandienst-herbert-duch-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jumbo-krandienst-herbert-duch-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jumbo-krandienst-herbert-duch-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jumbo-krandienst-herbert-duch-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-krane-teleskopstapler-gabelstapler' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-krane-teleskopstapler-gabelstapler' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-krane-teleskopstapler-gabelstapler' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-krane-teleskopstapler-gabelstapler' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-krane-teleskopstapler-gabelstapler' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'easy-lift-hubarbeitsbuehnenvermietung-michael-just' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'easy-lift-hubarbeitsbuehnenvermietung-michael-just' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'easy-lift-hubarbeitsbuehnenvermietung-michael-just' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'easy-lift-hubarbeitsbuehnenvermietung-michael-just' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'easy-lift-hubarbeitsbuehnenvermietung-michael-just' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebrueder-loerper-dachbau-und-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebrueder-loerper-dachbau-und-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebrueder-loerper-dachbau-und-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebrueder-loerper-dachbau-und-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebrueder-loerper-dachbau-und-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoelzl-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoelzl-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoelzl-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoelzl-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoelzl-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ingo-matthies-kranservice-burgdorf' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ingo-matthies-kranservice-burgdorf' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ingo-matthies-kranservice-burgdorf' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ingo-matthies-kranservice-burgdorf' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ingo-matthies-kranservice-burgdorf' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-saller-gmbh-winhoering' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-saller-gmbh-winhoering' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-saller-gmbh-winhoering' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-saller-gmbh-winhoering' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-saller-gmbh-winhoering' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fahrenholz-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fahrenholz-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fahrenholz-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fahrenholz-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fahrenholz-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ing-kurt-klopsch-foerdertechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
