WHERE c.slug = 'ing-kurt-klopsch-foerdertechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ing-kurt-klopsch-foerdertechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ing-kurt-klopsch-foerdertechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ing-kurt-klopsch-foerdertechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-helge-dodt' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-helge-dodt' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-helge-dodt' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-helge-dodt' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-helge-dodt' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'allelifte-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'allelifte-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'allelifte-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'allelifte-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'allelifte-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-neubrandenburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-neubrandenburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-neubrandenburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-neubrandenburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-neubrandenburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'armbruster-autokranvermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-niederlassung-hannover' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-niederlassung-hannover' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-niederlassung-hannover' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-niederlassung-hannover' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-niederlassung-hannover' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'joas-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'joas-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'joas-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'joas-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'joas-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'selbstbau-verleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'selbstbau-verleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'selbstbau-verleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'selbstbau-verleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'selbstbau-verleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-weber' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-weber' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-weber' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-weber' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-weber' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln-baustellen-und-verkehrssicherung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln-baustellen-und-verkehrssicherung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln-baustellen-und-verkehrssicherung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln-baustellen-und-verkehrssicherung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln-baustellen-und-verkehrssicherung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-hamburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-hamburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-hamburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-hamburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-hamburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'h-und-s-autokran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mayer-autokran-vermietungs-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumo-kranservice-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumo-kranservice-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumo-kranservice-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumo-kranservice-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumo-kranservice-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'car-service-and-crane-rental-koch-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'car-service-and-crane-rental-koch-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'car-service-and-crane-rental-koch-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'car-service-and-crane-rental-koch-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'car-service-and-crane-rental-koch-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klippel-autokrane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '24-h-pkw-und-lkw-abschlepp-und-bergungs-und-pannendienst-kaufmann-und-sohn-spezi' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '24-h-pkw-und-lkw-abschlepp-und-bergungs-und-pannendienst-kaufmann-und-sohn-spezi' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '24-h-pkw-und-lkw-abschlepp-und-bergungs-und-pannendienst-kaufmann-und-sohn-spezi' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '24-h-pkw-und-lkw-abschlepp-und-bergungs-und-pannendienst-kaufmann-und-sohn-spezi' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '24-h-pkw-und-lkw-abschlepp-und-bergungs-und-pannendienst-kaufmann-und-sohn-spezi' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-augsburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-augsburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-augsburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-augsburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-augsburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gl-verleih-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gl-verleih-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gl-verleih-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gl-verleih-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gl-verleih-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmid-hebebuehnen-minikranverleih-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'enderling-vermietung-gmbh-arbeitsbuehnen-und-kranvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'enderling-vermietung-gmbh-arbeitsbuehnen-und-kranvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'enderling-vermietung-gmbh-arbeitsbuehnen-und-kranvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'enderling-vermietung-gmbh-arbeitsbuehnen-und-kranvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'enderling-vermietung-gmbh-arbeitsbuehnen-und-kranvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-drumann-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-drumann-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-drumann-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-drumann-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-drumann-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachdeckerei-maehner-und-co-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachdeckerei-maehner-und-co-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachdeckerei-maehner-und-co-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachdeckerei-maehner-und-co-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dachdeckerei-maehner-und-co-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dummer-gmbh-arbeitsbuehnenvermietung-und-schulungen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dummer-gmbh-arbeitsbuehnenvermietung-und-schulungen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dummer-gmbh-arbeitsbuehnenvermietung-und-schulungen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dummer-gmbh-arbeitsbuehnenvermietung-und-schulungen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dummer-gmbh-arbeitsbuehnenvermietung-und-schulungen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marzahn' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marzahn' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marzahn' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marzahn' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marzahn' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vermietung-ascheberg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vermietung-ascheberg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vermietung-ascheberg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vermietung-ascheberg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vermietung-ascheberg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marienfelde' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marienfelde' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marienfelde' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marienfelde' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-marienfelde' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atlas-hamburg-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atlas-hamburg-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atlas-hamburg-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atlas-hamburg-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'atlas-hamburg-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeller-kranservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeller-kranservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeller-kranservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeller-kranservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeller-kranservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-oldenburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-oldenburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-oldenburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-oldenburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-oldenburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-koch-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-koch-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-koch-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-koch-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-koch-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkv-schmitz-partner-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkv-schmitz-partner-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkv-schmitz-partner-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkv-schmitz-partner-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkv-schmitz-partner-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwenk-arbeitsbuehnen-gmbh-system-lift-partner-zentrale-schwarzwald' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwenk-arbeitsbuehnen-gmbh-system-lift-partner-zentrale-schwarzwald' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwenk-arbeitsbuehnen-gmbh-system-lift-partner-zentrale-schwarzwald' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwenk-arbeitsbuehnen-gmbh-system-lift-partner-zentrale-schwarzwald' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwenk-arbeitsbuehnen-gmbh-system-lift-partner-zentrale-schwarzwald' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-und-reifenservice-unitec-soest' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-und-reifenservice-unitec-soest' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-und-reifenservice-unitec-soest' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-und-reifenservice-unitec-soest' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abschleppdienst-und-reifenservice-unitec-soest' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dingler-baumaschinen-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dingler-baumaschinen-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dingler-baumaschinen-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dingler-baumaschinen-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dingler-baumaschinen-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'anchor-crane-and-aerial-platform-hire-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'anchor-crane-and-aerial-platform-hire-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'anchor-crane-and-aerial-platform-hire-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'anchor-crane-and-aerial-platform-hire-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'anchor-crane-and-aerial-platform-hire-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schulz-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schulz-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schulz-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schulz-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schulz-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gms-geraete-und-mietservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gms-geraete-und-mietservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gms-geraete-und-mietservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gms-geraete-und-mietservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gms-geraete-und-mietservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-hoffmann-gmbh-system-lift-partner' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-hoffmann-gmbh-system-lift-partner' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-hoffmann-gmbh-system-lift-partner' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-hoffmann-gmbh-system-lift-partner' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-hoffmann-gmbh-system-lift-partner' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantrans-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantrans-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantrans-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantrans-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krantrans-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-banzhaf-krananlagen-gmbh-und-co-logistik-und-service-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-banzhaf-krananlagen-gmbh-und-co-logistik-und-service-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-banzhaf-krananlagen-gmbh-und-co-logistik-und-service-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-banzhaf-krananlagen-gmbh-und-co-logistik-und-service-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-banzhaf-krananlagen-gmbh-und-co-logistik-und-service-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baesmann-kran-und-transport-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baesmann-kran-und-transport-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baesmann-kran-und-transport-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baesmann-kran-und-transport-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baesmann-kran-und-transport-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mateco-gmbh-arbeitsbuehnenvermietung-uebergabestation-berlin-west' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mateco-gmbh-arbeitsbuehnenvermietung-uebergabestation-berlin-west' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mateco-gmbh-arbeitsbuehnenvermietung-uebergabestation-berlin-west' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mateco-gmbh-arbeitsbuehnenvermietung-uebergabestation-berlin-west' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mateco-gmbh-arbeitsbuehnenvermietung-uebergabestation-berlin-west' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-oranienburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-oranienburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-oranienburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-oranienburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-oranienburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hebebuehne-minikran-mietpark-jenz-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klema-kranverleih-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klema-kranverleih-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klema-kranverleih-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klema-kranverleih-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klema-kranverleih-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-kran-und-logistik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-kran-und-logistik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-kran-und-logistik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-kran-und-logistik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-kran-und-logistik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-bruns-kranvermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-bruns-kranvermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-bruns-kranvermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-bruns-kranvermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilhelm-bruns-kranvermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-buchtmann-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-buchtmann-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-buchtmann-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-buchtmann-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-buchtmann-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'highlifter-koeln' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'highlifter-koeln' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'highlifter-koeln' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'highlifter-koeln' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'highlifter-koeln' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'imbooom-arbeitsbuehnenvermietung-magdeburg-burg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'imbooom-arbeitsbuehnenvermietung-magdeburg-burg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'imbooom-arbeitsbuehnenvermietung-magdeburg-burg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'imbooom-arbeitsbuehnenvermietung-magdeburg-burg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'imbooom-arbeitsbuehnenvermietung-magdeburg-burg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martmann-krane-und-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martmann-krane-und-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martmann-krane-und-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martmann-krane-und-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'martmann-krane-und-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kunze-gmbh-arbeitsbuehnen-minikrane-stapler-und-zweiwege-buehnen-kaufen-bruckmue' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a-plus-bautechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a-plus-bautechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a-plus-bautechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a-plus-bautechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a-plus-bautechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'albrecht-autokran-gbr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-and-commercial-vehicles-rental-gmbh-stuttgart' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-and-commercial-vehicles-rental-gmbh-stuttgart' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-and-commercial-vehicles-rental-gmbh-stuttgart' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-and-commercial-vehicles-rental-gmbh-stuttgart' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-and-commercial-vehicles-rental-gmbh-stuttgart' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-deggendorf-mobilkrane-spezialtransporte-leistungsplus' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brueser-kranverleih-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brueser-kranverleih-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brueser-kranverleih-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brueser-kranverleih-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brueser-kranverleih-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akm-mobile-crane-rental-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akm-mobile-crane-rental-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akm-mobile-crane-rental-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akm-mobile-crane-rental-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akm-mobile-crane-rental-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-rhein-neckar' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-rhein-neckar' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-rhein-neckar' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-rhein-neckar' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-rhein-neckar' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kranvermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kranvermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kranvermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kranvermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kranvermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bernd-brielmann-autokran-u-arbeitsbuehnenverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-dortmund' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-dortmund' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-dortmund' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-dortmund' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-dortmund' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zobel-und-zobel-gbr-baumaschinenvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zobel-und-zobel-gbr-baumaschinenvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zobel-und-zobel-gbr-baumaschinenvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zobel-und-zobel-gbr-baumaschinenvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zobel-und-zobel-gbr-baumaschinenvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bagger-und-baumaschinen-vermietung-schneider' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bagger-und-baumaschinen-vermietung-schneider' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bagger-und-baumaschinen-vermietung-schneider' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bagger-und-baumaschinen-vermietung-schneider' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bagger-und-baumaschinen-vermietung-schneider' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaas-service-und-vertriebs-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kw-kranwerke-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kw-kranwerke-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kw-kranwerke-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kw-kranwerke-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kw-kranwerke-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suedkran-saller-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suedkran-saller-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suedkran-saller-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suedkran-saller-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'suedkran-saller-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stuemer-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stuemer-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stuemer-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stuemer-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stuemer-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'steinwedel-vab-gmbh-braunschweig-arbeitsbuehnen-und-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'steinwedel-vab-gmbh-braunschweig-arbeitsbuehnen-und-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'steinwedel-vab-gmbh-braunschweig-arbeitsbuehnen-und-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'steinwedel-vab-gmbh-braunschweig-arbeitsbuehnen-und-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'steinwedel-vab-gmbh-braunschweig-arbeitsbuehnen-und-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-6' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-6' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-6' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-6' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-6' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hercules-service-und-vermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hercules-service-und-vermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hercules-service-und-vermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hercules-service-und-vermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hercules-service-und-vermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kvn-autokrane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-krane-autokran-und-spezialkranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klaus-meyer-autokran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-schuchmann' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-schuchmann' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-schuchmann' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-schuchmann' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietservice-schuchmann' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boecker-maschinenwerke-gmbh-niederlassung-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klostermeier-autokrane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'blumenbecker-technik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'blumenbecker-technik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'blumenbecker-technik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'blumenbecker-technik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'blumenbecker-technik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-in-karlsruhe-heintzelmann-autokrane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mv-kran-und-arbeitsbuehnendienst' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mv-kran-und-arbeitsbuehnendienst' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mv-kran-und-arbeitsbuehnendienst' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mv-kran-und-arbeitsbuehnendienst' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mv-kran-und-arbeitsbuehnendienst' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aks-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aks-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aks-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aks-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aks-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akkus-bew-und-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akkus-bew-und-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akkus-bew-und-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akkus-bew-und-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akkus-bew-und-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'moebellift-vermietung-berlin-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'peter-hebetechnik-vertriebs-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'peter-hebetechnik-vertriebs-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'peter-hebetechnik-vertriebs-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'peter-hebetechnik-vertriebs-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'peter-hebetechnik-vertriebs-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'marina-havelauen-in-werder-havel-pro-marin-maintenance-und-service' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'marina-havelauen-in-werder-havel-pro-marin-maintenance-und-service' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'marina-havelauen-in-werder-havel-pro-marin-maintenance-und-service' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'marina-havelauen-in-werder-havel-pro-marin-maintenance-und-service' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'marina-havelauen-in-werder-havel-pro-marin-maintenance-und-service' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autodienst-eineder-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autodienst-eineder-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autodienst-eineder-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autodienst-eineder-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autodienst-eineder-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-potsdam' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-potsdam' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-potsdam' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-potsdam' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-potsdam' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-oranienburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-oranienburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-oranienburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-oranienburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-oranienburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mann-baumaschinen-mietservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mann-baumaschinen-mietservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mann-baumaschinen-mietservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mann-baumaschinen-mietservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mann-baumaschinen-mietservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-koeln' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dunkel-autokran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koehler-kran-service-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koehler-kran-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koehler-kran-service-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koehler-kran-service-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koehler-kran-service-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hanselmann-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hanselmann-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hanselmann-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hanselmann-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hanselmann-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'paul-becker-gmbh-arbeitsbuehnen-stapler-und-geruestbau' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'paul-becker-gmbh-arbeitsbuehnen-stapler-und-geruestbau' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'paul-becker-gmbh-arbeitsbuehnen-stapler-und-geruestbau' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'paul-becker-gmbh-arbeitsbuehnen-stapler-und-geruestbau' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'paul-becker-gmbh-arbeitsbuehnen-stapler-und-geruestbau' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kluettgens-autokrane-schwertransporte-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruehle-gmbh-maschinenpark' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruehle-gmbh-maschinenpark' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruehle-gmbh-maschinenpark' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruehle-gmbh-maschinenpark' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruehle-gmbh-maschinenpark' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-raumsystemcenter-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-raumsystemcenter-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-raumsystemcenter-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-raumsystemcenter-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-raumsystemcenter-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'system-lift-kunze-rental-gmbh-arbeitsbuehnen-minikrane-stapler-und-zweiwege-bueh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-spedition-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-spedition-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-spedition-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-spedition-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-spedition-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'shb-sonder-hebezeuge-berlin-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'shb-sonder-hebezeuge-berlin-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'shb-sonder-hebezeuge-berlin-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'shb-sonder-hebezeuge-berlin-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'shb-sonder-hebezeuge-berlin-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolfgang-wehr-ladekran-transporte-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'spickermann-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'spickermann-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'spickermann-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'spickermann-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'spickermann-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-stralsund' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-stralsund' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-stralsund' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-stralsund' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-stralsund' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-luebben' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-luebben' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-luebben' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-luebben' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-luebben' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'induma-rent-gmbh-gabelstapler' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'induma-rent-gmbh-gabelstapler' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'induma-rent-gmbh-gabelstapler' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'induma-rent-gmbh-gabelstapler' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'induma-rent-gmbh-gabelstapler' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilden-kran-vermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilden-kran-vermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilden-kran-vermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilden-kran-vermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wilden-kran-vermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schussmann-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schussmann-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schussmann-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schussmann-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schussmann-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ulferts-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-neubrandenburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-neubrandenburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-neubrandenburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-neubrandenburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-neubrandenburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'b-i-g-baumaschinen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'b-i-g-baumaschinen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'b-i-g-baumaschinen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'b-i-g-baumaschinen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'b-i-g-baumaschinen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeber-ag-niederlassung-geislingen-a-d-steige-arbeitsbuehnen-stapler-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeber-ag-niederlassung-geislingen-a-d-steige-arbeitsbuehnen-stapler-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeber-ag-niederlassung-geislingen-a-d-steige-arbeitsbuehnen-stapler-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeber-ag-niederlassung-geislingen-a-d-steige-arbeitsbuehnen-stapler-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeber-ag-niederlassung-geislingen-a-d-steige-arbeitsbuehnen-stapler-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'griebel-und-mahncke' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'griebel-und-mahncke' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'griebel-und-mahncke' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'griebel-und-mahncke' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'griebel-und-mahncke' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tribac-baumaschinen-berlin-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tribac-baumaschinen-berlin-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tribac-baumaschinen-berlin-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tribac-baumaschinen-berlin-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tribac-baumaschinen-berlin-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'helling-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'helling-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'helling-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'helling-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'helling-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-cottbus' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-cottbus' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-cottbus' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-cottbus' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-cottbus' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-west-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-west-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-west-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-west-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-west-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-und-w-autokrane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-sachsen-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'all-kran-autokrane-gmbh-und-co-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wehner-kran-und-pannendienst-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wehner-kran-und-pannendienst-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wehner-kran-und-pannendienst-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wehner-kran-und-pannendienst-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wehner-kran-und-pannendienst-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frm-bautechnik-baumaschinenvermietung-birkenwerder' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frm-bautechnik-baumaschinenvermietung-birkenwerder' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frm-bautechnik-baumaschinenvermietung-birkenwerder' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frm-bautechnik-baumaschinenvermietung-birkenwerder' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frm-bautechnik-baumaschinenvermietung-birkenwerder' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmid-hebebuehnen-minikranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mks-maschinen-und-kran-service-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mks-maschinen-und-kran-service-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mks-maschinen-und-kran-service-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mks-maschinen-und-kran-service-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mks-maschinen-und-kran-service-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schuster-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schuster-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schuster-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schuster-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schuster-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scherer-kran-und-bergungsdienst-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scherer-kran-und-bergungsdienst-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scherer-kran-und-bergungsdienst-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scherer-kran-und-bergungsdienst-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scherer-kran-und-bergungsdienst-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brauer-arbeitsbuehnen-gmbh-eisenberg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brauer-arbeitsbuehnen-gmbh-eisenberg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brauer-arbeitsbuehnen-gmbh-eisenberg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brauer-arbeitsbuehnen-gmbh-eisenberg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brauer-arbeitsbuehnen-gmbh-eisenberg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geruestverleih-komplex' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geruestverleih-komplex' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geruestverleih-komplex' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geruestverleih-komplex' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-und-geruestverleih-komplex' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-wiesbaden' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-wiesbaden' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-wiesbaden' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-wiesbaden' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-wiesbaden' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a1-arbeitsbuehnen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a1-arbeitsbuehnen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a1-arbeitsbuehnen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a1-arbeitsbuehnen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a1-arbeitsbuehnen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-baumann' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-baumann' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-baumann' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-baumann' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-baumann' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-arbeitsbuehnen-und-teleskopcenter-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-arbeitsbuehnen-und-teleskopcenter-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-arbeitsbuehnen-und-teleskopcenter-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-arbeitsbuehnen-und-teleskopcenter-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-arbeitsbuehnen-und-teleskopcenter-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaiser-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaiser-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaiser-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaiser-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kaiser-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cobug-kg-baumaschinen-und-gleisbautechnik-nl-luebben' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cobug-kg-baumaschinen-und-gleisbautechnik-nl-luebben' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cobug-kg-baumaschinen-und-gleisbautechnik-nl-luebben' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cobug-kg-baumaschinen-und-gleisbautechnik-nl-luebben' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cobug-kg-baumaschinen-und-gleisbautechnik-nl-luebben' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uka-hauke-gmbh-arbeitsbuehnen-und-teleskopstapler-clever-mieten-in-dresden' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uka-hauke-gmbh-arbeitsbuehnen-und-teleskopstapler-clever-mieten-in-dresden' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uka-hauke-gmbh-arbeitsbuehnen-und-teleskopstapler-clever-mieten-in-dresden' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uka-hauke-gmbh-arbeitsbuehnen-und-teleskopstapler-clever-mieten-in-dresden' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uka-hauke-gmbh-arbeitsbuehnen-und-teleskopstapler-clever-mieten-in-dresden' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'detlef-braun-bedachungen-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'detlef-braun-bedachungen-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'detlef-braun-bedachungen-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'detlef-braun-bedachungen-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'detlef-braun-bedachungen-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'werner-wundel-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'werner-wundel-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'werner-wundel-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'werner-wundel-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'werner-wundel-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-saller-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gunder-schelhorn-autokranverleih-gbr' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-6' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-6' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-6' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-6' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-6' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bernhard-bruhns-kran-und-fahrzeugtechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bernhard-bruhns-kran-und-fahrzeugtechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bernhard-bruhns-kran-und-fahrzeugtechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bernhard-bruhns-kran-und-fahrzeugtechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bernhard-bruhns-kran-und-fahrzeugtechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roehm-krane-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roehm-krane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roehm-krane-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roehm-krane-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roehm-krane-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rachinger-autokrane-u-industriemontagen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-mayrock-spezialtransporte' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-mayrock-spezialtransporte' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-mayrock-spezialtransporte' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-mayrock-spezialtransporte' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-mayrock-spezialtransporte' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ktg-baumaschinen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ktg-baumaschinen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ktg-baumaschinen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ktg-baumaschinen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ktg-baumaschinen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-ruedersdorf' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-ruedersdorf' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-ruedersdorf' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-ruedersdorf' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-ruedersdorf' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-5' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-5' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-5' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-5' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-5' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beyer-mietservice-kg-baumaschinen-arbeitsbuehnen-stapler-minikran-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cegema-maschinenhandel-gmbh-potsdam' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cegema-maschinenhandel-gmbh-potsdam' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cegema-maschinenhandel-gmbh-potsdam' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cegema-maschinenhandel-gmbh-potsdam' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'cegema-maschinenhandel-gmbh-potsdam' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ley-krane-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ley-krane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ley-krane-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ley-krane-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ley-krane-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'soenke-jordt-maschinen-und-schwertransport-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'soenke-jordt-maschinen-und-schwertransport-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'soenke-jordt-maschinen-und-schwertransport-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'soenke-jordt-maschinen-und-schwertransport-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'soenke-jordt-maschinen-und-schwertransport-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-und-nutzfahrzeugevermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-und-nutzfahrzeugevermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-und-nutzfahrzeugevermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-und-nutzfahrzeugevermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lanz-hebebuehnen-und-nutzfahrzeugevermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-spandau' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-spandau' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-spandau' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-spandau' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-spandau' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'albert-regel-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'albert-regel-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'albert-regel-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'albert-regel-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'albert-regel-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-lange-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochmuth-gmbh-und-co-kg-arbeitsbuehnenvermietung-system-lift-partner' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochmuth-gmbh-und-co-kg-arbeitsbuehnenvermietung-system-lift-partner' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochmuth-gmbh-und-co-kg-arbeitsbuehnenvermietung-system-lift-partner' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochmuth-gmbh-und-co-kg-arbeitsbuehnenvermietung-system-lift-partner' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochmuth-gmbh-und-co-kg-arbeitsbuehnenvermietung-system-lift-partner' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mingalift-gmbh-stapler-hebebuehne-arbeitsbuehne-mieten-muenchen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mingalift-gmbh-stapler-hebebuehne-arbeitsbuehne-mieten-muenchen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mingalift-gmbh-stapler-hebebuehne-arbeitsbuehne-mieten-muenchen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mingalift-gmbh-stapler-hebebuehne-arbeitsbuehne-mieten-muenchen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mingalift-gmbh-stapler-hebebuehne-arbeitsbuehne-mieten-muenchen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-krefeld' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-krefeld' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-krefeld' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-krefeld' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-krefeld' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bms-mietpartner-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bms-mietpartner-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bms-mietpartner-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bms-mietpartner-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bms-mietpartner-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-leipzig' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-leipzig' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-leipzig' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-leipzig' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-leipzig' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisele-ag-crane-und-engineering-group' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisele-ag-crane-und-engineering-group' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisele-ag-crane-und-engineering-group' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisele-ag-crane-und-engineering-group' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eisele-ag-crane-und-engineering-group' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-schares-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nolte-autokrane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'josef-pohl-autokran-und-spezialtransporte' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brandt-und-wangler-kran-und-transport-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-adlershof' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-adlershof' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-adlershof' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-adlershof' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-berlin-adlershof' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haessler-lift-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haessler-lift-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haessler-lift-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haessler-lift-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haessler-lift-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dornseiff-autokrane-und-schwertransporte-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'd-krantechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'd-krantechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'd-krantechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'd-krantechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'd-krantechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schweri-autokranbetriebe-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoefels-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoefels-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoefels-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoefels-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hoefels-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'matthias-richter-transporte-und-kranarbeiten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'matthias-richter-transporte-und-kranarbeiten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'matthias-richter-transporte-und-kranarbeiten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'matthias-richter-transporte-und-kranarbeiten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'matthias-richter-transporte-und-kranarbeiten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmid-hebebuehnen-minikranverleih-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'voss-krane-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'voss-krane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'voss-krane-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'voss-krane-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'voss-krane-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jade-weser-lift-voth-e-k' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jade-weser-lift-voth-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jade-weser-lift-voth-e-k' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jade-weser-lift-voth-e-k' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jade-weser-lift-voth-e-k' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'msg-krandienst-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'msg-krandienst-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'msg-krandienst-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'msg-krandienst-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'msg-krandienst-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'certex-hebetechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'certex-hebetechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'certex-hebetechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'certex-hebetechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'certex-hebetechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-niederlassung-hamburg-sued' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-niederlassung-hamburg-sued' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-niederlassung-hamburg-sued' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-niederlassung-hamburg-sued' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meyer-lift-gmbh-niederlassung-hamburg-sued' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kvs-kranvermietung-und-schwertransporte-michael-mross-e-k' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kvs-kranvermietung-und-schwertransporte-michael-mross-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kvs-kranvermietung-und-schwertransporte-michael-mross-e-k' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kvs-kranvermietung-und-schwertransporte-michael-mross-e-k' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kvs-kranvermietung-und-schwertransporte-michael-mross-e-k' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rgb-mietkrane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rgb-mietkrane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rgb-mietkrane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rgb-mietkrane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rgb-mietkrane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-5' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-5' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-5' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-5' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-5' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hart-autokran-und-arbeitsbuehnenvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'esb-kranverleih-transport-u-hebetechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'esb-kranverleih-transport-u-hebetechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'esb-kranverleih-transport-u-hebetechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'esb-kranverleih-transport-u-hebetechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'esb-kranverleih-transport-u-hebetechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'michael-moehle-kran-service-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'michael-moehle-kran-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'michael-moehle-kran-service-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'michael-moehle-kran-service-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'michael-moehle-kran-service-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-roemmen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baier-autokrane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'e-k-a-baugeraete' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'e-k-a-baugeraete' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'e-k-a-baugeraete' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'e-k-a-baugeraete' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'e-k-a-baugeraete' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'w-o-l-f-autokranvermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-stuttgart-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-stuttgart-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-stuttgart-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-stuttgart-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-stuttgart-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-jenkran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-karlsruhe-mobilkrane-spezialtransporte-leistungsplus' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-lausitz-gmbh-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'r-und-z-baukrane-niederrhein-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-dilger-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-dilger-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-dilger-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-dilger-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-dilger-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-deutschland-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-deutschland-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-deutschland-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-deutschland-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kiloutou-deutschland-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh-berlin-pankow' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh-berlin-pankow' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh-berlin-pankow' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh-berlin-pankow' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh-berlin-pankow' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beyer-mietservice-kg-baumaschinen-arbeitsbuehnen-stapler-minikran-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'menke-spezial-transporte-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'menke-spezial-transporte-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'menke-spezial-transporte-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'menke-spezial-transporte-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'menke-spezial-transporte-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kuehl-gmbh-kranverleih-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-koeln' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-koeln' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-koeln' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-koeln' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-koeln' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kran-vermietung-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kran-vermietung-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kran-vermietung-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kran-vermietung-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kran-vermietung-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebr-markewitsch-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebr-markewitsch-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebr-markewitsch-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebr-markewitsch-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gebr-markewitsch-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ams-platforms-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ams-platforms-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ams-platforms-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ams-platforms-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ams-platforms-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ulm-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ulm-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ulm-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ulm-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ulm-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-brandenburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-brandenburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-brandenburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-brandenburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-brandenburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ct-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ct-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ct-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ct-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ct-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aqua-marin-boote-und-yachten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aqua-marin-boote-und-yachten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aqua-marin-boote-und-yachten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aqua-marin-boote-und-yachten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'aqua-marin-boote-und-yachten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubert-wiemann-gmbh-und-co-kg-cranes' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubert-wiemann-gmbh-und-co-kg-cranes' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubert-wiemann-gmbh-und-co-kg-cranes' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubert-wiemann-gmbh-und-co-kg-cranes' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubert-wiemann-gmbh-und-co-kg-cranes' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-leipzig' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-leipzig' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-leipzig' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-leipzig' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-leipzig' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '4k-vierke-bau' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '4k-vierke-bau' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '4k-vierke-bau' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '4k-vierke-bau' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = '4k-vierke-bau' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'megalift-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'megalift-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'megalift-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'megalift-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'megalift-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maurer-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maurer-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maurer-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maurer-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-maurer-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerlach-kran-und-schwerlast-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerlach-kran-und-schwerlast-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerlach-kran-und-schwerlast-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerlach-kran-und-schwerlast-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerlach-kran-und-schwerlast-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-nuernberg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-nuernberg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-nuernberg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-nuernberg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-nuernberg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-hartmann-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-hartmann-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-hartmann-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-hartmann-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-service-hartmann-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh-abrams-group' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh-abrams-group' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh-abrams-group' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh-abrams-group' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'abrams-krane-gmbh-abrams-group' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'englhard-gmbh-autokran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetter-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetter-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetter-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetter-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetter-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gs-crane-service-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gs-crane-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gs-crane-service-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gs-crane-service-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gs-crane-service-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kroesche-kran-service-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kroesche-kran-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kroesche-kran-service-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kroesche-kran-service-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kroesche-kran-service-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokranvermietung-bolay-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kwitek-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kwitek-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kwitek-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kwitek-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kwitek-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gefra-kranverleih-autokran-turmkran-transport-mit-ladekran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gefra-kranverleih-autokran-turmkran-transport-mit-ladekran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaefer-kran-und-transportlogistik-gmbh-und-co-kg-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eb-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eb-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eb-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eb-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eb-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frey-gmbh-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frey-gmbh-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frey-gmbh-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frey-gmbh-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'frey-gmbh-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rks-rathmakers-kranservice-autokranvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reichert-gmbh-kranverleih-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rech-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rech-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rech-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rech-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rech-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'k-m-v-krane-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wittstocker-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wittstocker-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wittstocker-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wittstocker-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wittstocker-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'howelift-arbeitsbuehnenvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'howelift-arbeitsbuehnenvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'howelift-arbeitsbuehnenvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'howelift-arbeitsbuehnenvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'howelift-arbeitsbuehnenvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-baukran-logistik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wego-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wego-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wego-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wego-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wego-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-burgard-gmbh-kranvermietung-bergung-und-abschleppdienst' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-burgard-gmbh-kranvermietung-bergung-und-abschleppdienst' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-burgard-gmbh-kranvermietung-bergung-und-abschleppdienst' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-burgard-gmbh-kranvermietung-bergung-und-abschleppdienst' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-burgard-gmbh-kranvermietung-bergung-und-abschleppdienst' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gruetzner-arbeitsbuehnen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gruetzner-arbeitsbuehnen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gruetzner-arbeitsbuehnen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gruetzner-arbeitsbuehnen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gruetzner-arbeitsbuehnen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobile-hubtechnik-kranarbeiten-und-transporte-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobile-hubtechnik-kranarbeiten-und-transporte-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobile-hubtechnik-kranarbeiten-und-transporte-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobile-hubtechnik-kranarbeiten-und-transporte-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobile-hubtechnik-kranarbeiten-und-transporte-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hermann-kranverleih-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hermann-kranverleih-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hermann-kranverleih-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hermann-kranverleih-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hermann-kranverleih-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-autokranvermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-frankfurt-main-nord' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-frankfurt-main-nord' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-frankfurt-main-nord' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-frankfurt-main-nord' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-frankfurt-main-nord' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'btb-logistik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'btb-logistik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'btb-logistik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'btb-logistik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'btb-logistik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beyer-mietservice-kg-baumaschinen-arbeitsbuehnen-stapler-minikran-5' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
