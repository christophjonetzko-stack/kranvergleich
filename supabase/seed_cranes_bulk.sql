-- Bulk insert company_cranes: assign crane types based on company slugs
-- 'allgemein' companies get all 5 main crane types
-- Specific types get only their matching type

-- Step 1: allgemein companies → all main crane types
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id
FROM companies c
CROSS JOIN crane_types ct
WHERE ct.slug IN ('minikran-mieten', 'autokran-mieten', 'dachdeckerkran-mieten', 'baukran-mieten', 'ladekran-mieten')
AND c.slug NOT IN (
  -- Exclude companies with specific crane types (they get handled below)
  SELECT slug FROM companies WHERE slug IN (
    -- autokran companies
    'autokran-mueller','autokran-verleih-georg-hoffmann','autokran-schenk','schwarzer-autokrane','steil-kranarbeiten-gmbh-co-kg-autokranvermietung','jl-kranverleih','autokran-schares-gmbh','wasel-gmbh-autokrane-co-kg','bruns-schwerlast-gmbh-autokranvermietung','autokranvermietung-teubert','kran-biedermann-gmbh','autokranverleih-hartinger','scholpp-kran-transport-gmbh','autokran-verleih-karakas','prangl-autokrane','kran-kober','autokrane-wimmer','gabelstapler-und-autokranvermietung-albers','autokran-koehrmann','walter-autokran-gmbh','pj-autokranvermietung','autokranverleih-schilling','autokranvermietung-juergen-sorg','autokran-theil','brauer-autokranvermietung','autokranverleih-daut','koehlerkran','autokranvermietung-brockmann-gmbh','kramer-kranverleih-2','ulferts-autokranvermietung','wasel-krane-gmbh','walter-autokrane-gmbh-bottrop','autokrane-herkules','autokran-legler','wasel-autokrane-koeln','bernhard-autokran-gmbh','autokranverleih-hoellein','wasel-gmbh-autokrane-2','prangl-niederlassung-muenchen','autokran-schaller','autokran-buettel','autokran-borch','autokranverleih-hegerland','autokrane-lang','autokranvermietung-reuschling-gmbh','autokranverleih-mohr-gmbh','autokran-paul-kruesel-gmbh','autokranservice-guenter-berndt','autokranverleih-kleeblatt','prangl-niederlassung-karlsruhe','prangl-niederlassung-leipzig','wasel-autokrane-frankfurt','autokranverleih-grumbach','autokranvermietung-rolf-faulhaber','autokran-neudert','autokran-braunschweig','wiesbauer-autokrane-gmbh-co-kg','krandienst-gmbh-autokranvermietung','autokranverleih-thomas-knoefel','autokranverleih-ralf-harmel','autokranvermietung-ingo-moehring','autokran-hk-gmbh','autokranverleih-seitz','autokran-eckle','autokran-koch','frank-autokranverleih-gmbh-co-kg','autokranvermietung-frank-opfermann','autokranverleih-ernst-laukart','autokran-verleih-karsten-schulze','autokranvermietung-dittmar','autokranverleih-winkler','autokranvermietung-krausse','michael-weigel-autokranvermietung','autokranvermietung-hans-bauer','autokranverleih-schwab','autokran-hoeger-gmbh-co-kg','autokranvermietung-und-transport-gmbh-michael-feustel','autokran-mueller-2',
    -- minikran companies
    'minikranverleih-berlin','minikranverleih-nord','biberger-minikranverleih','miet-mini','minikranverleih-de','minikranverleih-becker','minikranverleih-rostock','minikranverleih-schloesser','minikran-sachsen','minikranverleih-hamburg','minikranverleih-riedel','minikranverleih-rheinland','minikranverleih-gmbh','minikran-verleih-cham','kranservice-r-schroeter-e-k','minikranverleih-berlin-und-brandenburg','biberger-minikranverleih-muenchen','minikranverleih-wicker','minikranverleih24-de','minikranverleih-buehl',
    -- baukran companies
    'baukran-logistik-gmbh','bkl-baukran-logistik-gmbh-niederlassung-rhein-main','bkl-baukran-logistik-gmbh-niederlassung-muenchen','bkl-baukran-logistik-gmbh-zentrale-und-niederlassung-heilbronn','baukran-logistik-gmbh-niederlassung-rostock','baukran-logistik-gmbh-niederlassung-leipzig','bkl-baukran-logistik-gmbh-niederlassung-berlin','bkl-baukran-logistik-gmbh-niederlassung-hamburg',
    -- dachdeckerkran companies
    'dachkran-de','dachdeckerkran-vermietung-boenig',
    -- ladekran companies
    'ladekran-kaufmann-berlin-und-brandenburg-kaufmann-spezialfahrzeuge','ladekranvermietung-hannover','ladekranservice-de','ladekranvermietung-jandke',
    -- multi-type companies
    'hoelzel-autokran-minikranverleih','palfinger-gmbh'
  )
)
ON CONFLICT (company_id, crane_type_id) DO NOTHING;

-- Step 2: autokran-specific companies
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id
FROM companies c, crane_types ct
WHERE ct.slug = 'autokran-mieten'
AND c.slug IN ('autokran-mueller','autokran-verleih-georg-hoffmann','autokran-schenk','schwarzer-autokrane','steil-kranarbeiten-gmbh-co-kg-autokranvermietung','jl-kranverleih','autokran-schares-gmbh','wasel-gmbh-autokrane-co-kg','bruns-schwerlast-gmbh-autokranvermietung','autokranvermietung-teubert','kran-biedermann-gmbh','autokranverleih-hartinger','scholpp-kran-transport-gmbh','autokran-verleih-karakas','prangl-autokrane','kran-kober','autokrane-wimmer','gabelstapler-und-autokranvermietung-albers','autokran-koehrmann','walter-autokran-gmbh','pj-autokranvermietung','autokranverleih-schilling','autokranvermietung-juergen-sorg','autokran-theil','brauer-autokranvermietung','autokranverleih-daut','koehlerkran','autokranvermietung-brockmann-gmbh','kramer-kranverleih-2','ulferts-autokranvermietung','wasel-krane-gmbh','walter-autokrane-gmbh-bottrop','autokrane-herkules','autokran-legler','wasel-autokrane-koeln','bernhard-autokran-gmbh','autokranverleih-hoellein','wasel-gmbh-autokrane-2','prangl-niederlassung-muenchen','autokran-schaller','autokran-buettel','autokran-borch','autokranverleih-hegerland','autokrane-lang','autokranvermietung-reuschling-gmbh','autokranverleih-mohr-gmbh','autokran-paul-kruesel-gmbh','autokranservice-guenter-berndt','autokranverleih-kleeblatt','prangl-niederlassung-karlsruhe','prangl-niederlassung-leipzig','wasel-autokrane-frankfurt','autokranverleih-grumbach','autokranvermietung-rolf-faulhaber','autokran-neudert','autokran-braunschweig','wiesbauer-autokrane-gmbh-co-kg','krandienst-gmbh-autokranvermietung','autokranverleih-thomas-knoefel','autokranverleih-ralf-harmel','autokranvermietung-ingo-moehring','autokran-hk-gmbh','autokranverleih-seitz','autokran-eckle','autokran-koch','frank-autokranverleih-gmbh-co-kg','autokranvermietung-frank-opfermann','autokranverleih-ernst-laukart','autokran-verleih-karsten-schulze','autokranvermietung-dittmar','autokranverleih-winkler','autokranvermietung-krausse','michael-weigel-autokranvermietung','autokranvermietung-hans-bauer','autokranverleih-schwab','autokran-hoeger-gmbh-co-kg','autokranvermietung-und-transport-gmbh-michael-feustel','autokran-mueller-2','hoelzel-autokran-minikranverleih','palfinger-gmbh')
ON CONFLICT (company_id, crane_type_id) DO NOTHING;

-- Step 3: minikran-specific companies
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id
FROM companies c, crane_types ct
WHERE ct.slug = 'minikran-mieten'
AND c.slug IN ('minikranverleih-berlin','minikranverleih-nord','biberger-minikranverleih','miet-mini','minikranverleih-de','minikranverleih-becker','minikranverleih-rostock','minikranverleih-schloesser','minikran-sachsen','minikranverleih-hamburg','minikranverleih-riedel','minikranverleih-rheinland','minikranverleih-gmbh','minikran-verleih-cham','kranservice-r-schroeter-e-k','minikranverleih-berlin-und-brandenburg','biberger-minikranverleih-muenchen','minikranverleih-wicker','minikranverleih24-de','minikranverleih-buehl','hoelzel-autokran-minikranverleih')
ON CONFLICT (company_id, crane_type_id) DO NOTHING;

-- Step 4: baukran-specific companies
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id
FROM companies c, crane_types ct
WHERE ct.slug = 'baukran-mieten'
AND c.slug IN ('baukran-logistik-gmbh','bkl-baukran-logistik-gmbh-niederlassung-rhein-main','bkl-baukran-logistik-gmbh-niederlassung-muenchen','bkl-baukran-logistik-gmbh-zentrale-und-niederlassung-heilbronn','baukran-logistik-gmbh-niederlassung-rostock','baukran-logistik-gmbh-niederlassung-leipzig','bkl-baukran-logistik-gmbh-niederlassung-berlin','bkl-baukran-logistik-gmbh-niederlassung-hamburg')
ON CONFLICT (company_id, crane_type_id) DO NOTHING;

-- Step 5: dachdeckerkran-specific companies
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id
FROM companies c, crane_types ct
WHERE ct.slug = 'dachdeckerkran-mieten'
AND c.slug IN ('dachkran-de','dachdeckerkran-vermietung-boenig')
ON CONFLICT (company_id, crane_type_id) DO NOTHING;

-- Step 6: ladekran-specific companies
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id
FROM companies c, crane_types ct
WHERE ct.slug = 'ladekran-mieten'
AND c.slug IN ('ladekran-kaufmann-berlin-und-brandenburg-kaufmann-spezialfahrzeuge','ladekranvermietung-hannover','ladekranservice-de','ladekranvermietung-jandke','palfinger-gmbh')
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
