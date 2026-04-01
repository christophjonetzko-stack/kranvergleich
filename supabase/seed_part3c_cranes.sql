WHERE c.slug = 'scholpp-kran-und-transport-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'padorent-arbeitsbuehnenvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'padorent-arbeitsbuehnenvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'padorent-arbeitsbuehnenvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'padorent-arbeitsbuehnenvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'padorent-arbeitsbuehnenvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ladekran-schulz' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hytec-arbeitsbuehnen-vermietungs-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hytec-arbeitsbuehnen-vermietungs-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hytec-arbeitsbuehnen-vermietungs-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hytec-arbeitsbuehnen-vermietungs-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hytec-arbeitsbuehnen-vermietungs-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boehm-lift-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'treffler-autokran-schwertransporte-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schiwek-kran-transport-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schiwek-kran-transport-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schiwek-kran-transport-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schiwek-kran-transport-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schiwek-kran-transport-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundh-trans-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundh-trans-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundh-trans-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundh-trans-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundh-trans-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beyer-mietservice-kg-baumaschinen-arbeitsbuehnen-stapler-minikran-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesbauer-gmbh-und-co-kg-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-schwertransport-und-krantechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-schwertransport-und-krantechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-schwertransport-und-krantechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-schwertransport-und-krantechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-schwertransport-und-krantechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'graeser-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mueller-und-sohn-kranservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mueller-und-sohn-kranservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mueller-und-sohn-kranservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mueller-und-sohn-kranservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mueller-und-sohn-kranservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buller-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buller-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buller-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buller-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'buller-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-baumaschinen-und-baugeraete-gartengeraete-verleih-volker-neubauer' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-baumaschinen-und-baugeraete-gartengeraete-verleih-volker-neubauer' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-baumaschinen-und-baugeraete-gartengeraete-verleih-volker-neubauer' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-baumaschinen-und-baugeraete-gartengeraete-verleih-volker-neubauer' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minibagger-baumaschinen-und-baugeraete-gartengeraete-verleih-volker-neubauer' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-5' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-5' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-5' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-5' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-5' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meier-kran-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh-logistikzentrum-berlin-brandenburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh-logistikzentrum-berlin-brandenburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh-logistikzentrum-berlin-brandenburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh-logistikzentrum-berlin-brandenburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh-logistikzentrum-berlin-brandenburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-haslach-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-haslach-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-haslach-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-haslach-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-haslach-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haegele-kran-service-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haegele-kran-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haegele-kran-service-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haegele-kran-service-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'haegele-kran-service-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kral-baumaschinenvermietung-hubarbeitsbuehnenvermietung-und-anhaengerverlei' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kral-baumaschinenvermietung-hubarbeitsbuehnenvermietung-und-anhaengerverlei' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kral-baumaschinenvermietung-hubarbeitsbuehnenvermietung-und-anhaengerverlei' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kral-baumaschinenvermietung-hubarbeitsbuehnenvermietung-und-anhaengerverlei' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-kral-baumaschinenvermietung-hubarbeitsbuehnenvermietung-und-anhaengerverlei' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-vermietung-sebastian-mai' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-vermietung-sebastian-mai' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-vermietung-sebastian-mai' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-vermietung-sebastian-mai' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-vermietung-sebastian-mai' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-duesseldorf' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-duesseldorf' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-duesseldorf' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-duesseldorf' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'uplifter-duesseldorf' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knaack-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knaack-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knaack-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knaack-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knaack-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niklaus-baugeraete-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beyer-mietservice-kg-baumaschinen-arbeitsbuehnen-stapler-minikran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-strauss-gmbh-arbeitsbuehnen-gabelstapler-und-weitere-mietgeraete' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-strauss-gmbh-arbeitsbuehnen-gabelstapler-und-weitere-mietgeraete' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-strauss-gmbh-arbeitsbuehnen-gabelstapler-und-weitere-mietgeraete' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-strauss-gmbh-arbeitsbuehnen-gabelstapler-und-weitere-mietgeraete' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mietpark-strauss-gmbh-arbeitsbuehnen-gabelstapler-und-weitere-mietgeraete' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-schares-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dieter-vogel-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dieter-vogel-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dieter-vogel-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dieter-vogel-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'dieter-vogel-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mayer' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mayer' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mayer' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mayer' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mayer' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetten-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetten-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetten-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetten-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vetten-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokranverleih-prangl-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ludwigsfelde-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ludwigsfelde-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ludwigsfelde-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ludwigsfelde-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'nagel-baumaschinen-ludwigsfelde-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'montage-und-kranservice-werner-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'montage-und-kranservice-werner-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'montage-und-kranservice-werner-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'montage-und-kranservice-werner-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'montage-und-kranservice-werner-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akms-fehrbellin-inh-gunter-fickinger' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akms-fehrbellin-inh-gunter-fickinger' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akms-fehrbellin-inh-gunter-fickinger' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akms-fehrbellin-inh-gunter-fickinger' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'akms-fehrbellin-inh-gunter-fickinger' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-baukran-logistik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hirl-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hirl-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hirl-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hirl-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hirl-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-autokranvermietung-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokran-schnurr-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-s-schuch-gmbh-kranarbeiten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-s-schuch-gmbh-kranarbeiten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-s-schuch-gmbh-kranarbeiten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-s-schuch-gmbh-kranarbeiten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'm-s-schuch-gmbh-kranarbeiten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-rhein-ruhr-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-rhein-ruhr-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-rhein-ruhr-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-rhein-ruhr-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-rhein-ruhr-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranagentur-werner-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranagentur-werner-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranagentur-werner-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranagentur-werner-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranagentur-werner-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundg-baumaschinen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundg-baumaschinen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundg-baumaschinen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundg-baumaschinen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mundg-baumaschinen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maschinenverleih-baumaschinen-mietpark-hydraulikhammer-specht-verleih-minibagger' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maschinenverleih-baumaschinen-mietpark-hydraulikhammer-specht-verleih-minibagger' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maschinenverleih-baumaschinen-mietpark-hydraulikhammer-specht-verleih-minibagger' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maschinenverleih-baumaschinen-mietpark-hydraulikhammer-specht-verleih-minibagger' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maschinenverleih-baumaschinen-mietpark-hydraulikhammer-specht-verleih-minibagger' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meissner-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meissner-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meissner-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meissner-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'meissner-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-arbeitsbuehnen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-arbeitsbuehnen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-arbeitsbuehnen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-arbeitsbuehnen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gerken-arbeitsbuehnen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beyer-mietservice-kg-baumaschinen-arbeitsbuehnen-stapler-kran-minikran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gaac-commerz-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gaac-commerz-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gaac-commerz-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gaac-commerz-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gaac-commerz-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-oranienburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-oranienburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-oranienburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-oranienburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zeppelin-rental-gmbh-oranienburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieger-und-moser-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieger-und-moser-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieger-und-moser-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieger-und-moser-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rieger-und-moser-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-mkw-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-mkw-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-mkw-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-mkw-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-mkw-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bausetra-rent-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bausetra-rent-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bausetra-rent-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bausetra-rent-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bausetra-rent-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sommer-kranverleih-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sommer-kranverleih-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sommer-kranverleih-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sommer-kranverleih-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sommer-kranverleih-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'andreas-sauler' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'andreas-sauler' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'andreas-sauler' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'andreas-sauler' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'andreas-sauler' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bkl-crane-logistik-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-s-tennigkeit' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-s-tennigkeit' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-s-tennigkeit' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-s-tennigkeit' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-s-tennigkeit' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oberland-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oberland-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oberland-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oberland-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-oberland-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-verleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rolf-herbold-gmbh-autokran-und-arbeitsbuehnenvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-kaiserslautern' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-kaiserslautern' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-kaiserslautern' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-kaiserslautern' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hkl-center-kaiserslautern' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brunnhuber-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brunnhuber-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brunnhuber-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brunnhuber-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'brunnhuber-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxilift-autokrane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-kran-bau-und-baustellenlogistik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-kran-bau-und-baustellenlogistik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-kran-bau-und-baustellenlogistik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-kran-bau-und-baustellenlogistik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-kran-bau-und-baustellenlogistik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koelch-richard-und-sohn-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koelch-richard-und-sohn-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koelch-richard-und-sohn-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koelch-richard-und-sohn-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koelch-richard-und-sohn-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lex-autovermietung-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lex-autovermietung-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lex-autovermietung-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lex-autovermietung-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'lex-autovermietung-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klarx-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ernst-rutenbeck-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ernst-rutenbeck-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ernst-rutenbeck-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ernst-rutenbeck-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ernst-rutenbeck-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-bau-kran-und-baustellenlogistik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-bau-kran-und-baustellenlogistik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-bau-kran-und-baustellenlogistik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-bau-kran-und-baustellenlogistik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'froehlich-bau-kran-und-baustellenlogistik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-5' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-5' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-5' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-5' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-5' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-grund-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-grund-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-grund-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-grund-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'alex-grund-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-kranarbeiten-und-schwertransporte-gmbh-kran-und-schwerlastlogistik-leipz' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-kranarbeiten-und-schwertransporte-gmbh-kran-und-schwerlastlogistik-leipz' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-kranarbeiten-und-schwertransporte-gmbh-kran-und-schwerlastlogistik-leipz' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-kranarbeiten-und-schwertransporte-gmbh-kran-und-schwerlastlogistik-leipz' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'thoemen-kranarbeiten-und-schwertransporte-gmbh-kran-und-schwerlastlogistik-leipz' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-schwerlast-montage-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mottinger-kran-und-transport-gmbh-buero' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mottinger-kran-und-transport-gmbh-buero' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mottinger-kran-und-transport-gmbh-buero' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mottinger-kran-und-transport-gmbh-buero' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mottinger-kran-und-transport-gmbh-buero' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hasslberger-gmbh-duesseldorf' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hasslberger-gmbh-duesseldorf' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hasslberger-gmbh-duesseldorf' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hasslberger-gmbh-duesseldorf' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hasslberger-gmbh-duesseldorf' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-bahn-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-bahn-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-bahn-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-bahn-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-bahn-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tas-alborn-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tas-alborn-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tas-alborn-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tas-alborn-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tas-alborn-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a24team' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a24team' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a24team' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a24team' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'a24team' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hjk-cranes-e-k' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hjk-cranes-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hjk-cranes-e-k' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hjk-cranes-e-k' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hjk-cranes-e-k' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokranverleih-gmbh-greiz-michael-held' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'franz-bracht-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaak-kran-und-transporte-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaak-kran-und-transporte-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaak-kran-und-transporte-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaak-kran-und-transporte-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schaak-kran-und-transporte-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-gabelstaplervermietung-koellner-braunschweig' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-gabelstaplervermietung-koellner-braunschweig' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-gabelstaplervermietung-koellner-braunschweig' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-gabelstaplervermietung-koellner-braunschweig' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'arbeitsbuehnen-und-gabelstaplervermietung-koellner-braunschweig' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobilkranservice-schuch' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'unic-minikran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bavaria-kran-und-baumaschinen-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bavaria-kran-und-baumaschinen-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bavaria-kran-und-baumaschinen-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bavaria-kran-und-baumaschinen-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bavaria-kran-und-baumaschinen-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-verleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-verleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-verleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-verleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-verleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-5' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-5' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-5' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-5' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-5' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ho-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ho-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ho-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ho-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ho-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'salgert-unternehmensgruppe-autokrane-schwertransporte-arbeitsbuehnen-gabelstaple' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weidler-arbeitsbuehnenvermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weidler-arbeitsbuehnenvermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weidler-arbeitsbuehnenvermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weidler-arbeitsbuehnenvermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weidler-arbeitsbuehnenvermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-6' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-6' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-6' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-6' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-6' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'engel-krane-ernst-engel-ohg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'engel-krane-ernst-engel-ohg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'engel-krane-ernst-engel-ohg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'engel-krane-ernst-engel-ohg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'engel-krane-ernst-engel-ohg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pcm-cranes-pcm-krane-und-logistik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pcm-cranes-pcm-krane-und-logistik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pcm-cranes-pcm-krane-und-logistik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pcm-cranes-pcm-krane-und-logistik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'pcm-cranes-pcm-krane-und-logistik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-lorenz-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-lorenz-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-lorenz-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-lorenz-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-lorenz-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-berlin-kurfuerstendamm' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-berlin-kurfuerstendamm' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-berlin-kurfuerstendamm' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-berlin-kurfuerstendamm' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-berlin-kurfuerstendamm' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ga-tec-gabelstaplertechnik-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ga-tec-gabelstaplertechnik-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ga-tec-gabelstaplertechnik-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ga-tec-gabelstaplertechnik-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ga-tec-gabelstaplertechnik-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schirmer' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schirmer' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schirmer' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schirmer' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schirmer' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'citykran-kran-und-transport-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'citykran-kran-und-transport-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'citykran-kran-und-transport-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'citykran-kran-und-transport-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'citykran-kran-und-transport-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'leichtle-kranvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'leichtle-kranvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'leichtle-kranvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'leichtle-kranvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'leichtle-kranvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-kran-und-baumaschinen-ohg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-kran-und-baumaschinen-ohg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-kran-und-baumaschinen-ohg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-kran-und-baumaschinen-ohg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tyroller-kran-und-baumaschinen-ohg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'azs-stoffels' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'azs-stoffels' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'azs-stoffels' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'azs-stoffels' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'azs-stoffels' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'colonia-spezialfahrzeuge' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'colonia-spezialfahrzeuge' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'colonia-spezialfahrzeuge' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'colonia-spezialfahrzeuge' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'colonia-spezialfahrzeuge' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roeder-krane-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roeder-krane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roeder-krane-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roeder-krane-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roeder-krane-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rosemann-arbeitsbuehnenvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rosemann-arbeitsbuehnenvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rosemann-arbeitsbuehnenvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rosemann-arbeitsbuehnenvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rosemann-arbeitsbuehnenvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zink-kranvermietung' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zink-kranvermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zink-kranvermietung' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zink-kranvermietung' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zink-kranvermietung' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gessler-kran-montage-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gessler-kran-montage-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gessler-kran-montage-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gessler-kran-montage-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gessler-kran-montage-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokran-heike-hoppe' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh-wolfsburg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh-wolfsburg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh-wolfsburg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh-wolfsburg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'boels-rental-germany-gmbh-wolfsburg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niemeier-mietstation-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niemeier-mietstation-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niemeier-mietstation-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niemeier-mietstation-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'niemeier-mietstation-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-van-der-will' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-van-der-will' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-van-der-will' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-van-der-will' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranvermietung-van-der-will' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochkran24' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochkran24' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochkran24' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochkran24' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hochkran24' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'horn-autokrane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmvs-baumaschinen-vermiet-service-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmvs-baumaschinen-vermiet-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmvs-baumaschinen-vermiet-service-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmvs-baumaschinen-vermiet-service-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmvs-baumaschinen-vermiet-service-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mikschl-autokrane-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stabet-montage-gmbh-dortmund' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stabet-montage-gmbh-dortmund' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stabet-montage-gmbh-dortmund' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stabet-montage-gmbh-dortmund' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'stabet-montage-gmbh-dortmund' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmauder-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmauder-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmauder-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmauder-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmauder-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sis-nord-kran-e-k' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sis-nord-kran-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sis-nord-kran-e-k' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sis-nord-kran-e-k' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sis-nord-kran-e-k' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wasel-gmbh-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-spandau' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-spandau' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-spandau' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-spandau' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-spandau' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'demag-cranes-und-componenets-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'demag-cranes-und-componenets-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'demag-cranes-und-componenets-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'demag-cranes-und-componenets-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'demag-cranes-und-componenets-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'terex-mhps-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'terex-mhps-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'terex-mhps-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'terex-mhps-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'terex-mhps-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bolte-autokrane-bremen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bolte-autokrane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mightservice-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mightservice-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mightservice-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mightservice-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mightservice-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zak-krane-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zak-krane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zak-krane-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zak-krane-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'zak-krane-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wolffkran-gmbh-niederlassung-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-deutschland-service-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-deutschland-service-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-deutschland-service-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-deutschland-service-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-deutschland-service-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vak-verband-der-arbeitsgeraete-kommunalfahrzeugindustrie-e-v' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vak-verband-der-arbeitsgeraete-kommunalfahrzeugindustrie-e-v' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vak-verband-der-arbeitsgeraete-kommunalfahrzeugindustrie-e-v' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vak-verband-der-arbeitsgeraete-kommunalfahrzeugindustrie-e-v' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'vak-verband-der-arbeitsgeraete-kommunalfahrzeugindustrie-e-v' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kls-kran-und-arbeitsbuehnenlogistik-sindelfingen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kls-kran-und-arbeitsbuehnenlogistik-sindelfingen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kls-kran-und-arbeitsbuehnenlogistik-sindelfingen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kls-kran-und-arbeitsbuehnenlogistik-sindelfingen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kls-kran-und-arbeitsbuehnenlogistik-sindelfingen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ub-kran-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ub-kran-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ub-kran-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ub-kran-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ub-kran-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-transport-schuch-gmbh-kranarbeiten-und-schwertransporte' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bekel-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bekel-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bekel-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bekel-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bekel-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-transport-kran-arbeitsbuehnenvermietung-staplervermi' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-transport-kran-arbeitsbuehnenvermietung-staplervermi' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-transport-kran-arbeitsbuehnenvermietung-staplervermi' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-transport-kran-arbeitsbuehnenvermietung-staplervermi' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'felbermayr-deutschland-gmbh-transport-kran-arbeitsbuehnenvermietung-staplervermi' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kleyer-krandienst-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schroeder-autokrane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobil-kran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobil-kran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobil-kran' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobil-kran' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mobil-kran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-einsatz-service-leipzig-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-einsatz-service-leipzig-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-einsatz-service-leipzig-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-einsatz-service-leipzig-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-einsatz-service-leipzig-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mini-kran-tyskland' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-roessler-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-roessler-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-roessler-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-roessler-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranlogistik-roessler-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mammoet-deutschland-gmbh-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-elskop' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-elskop' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-elskop' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-elskop' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranverleih-elskop' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bracht-kran-vermietung-gmbh-heinz-kessel' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bracht-kran-vermietung-gmbh-heinz-kessel' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bracht-kran-vermietung-gmbh-heinz-kessel' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bracht-kran-vermietung-gmbh-heinz-kessel' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bracht-kran-vermietung-gmbh-heinz-kessel' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jandt-kranvermietung-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-berlin' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-berlin' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-berlin' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-berlin' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-berlin' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bts-baumaschinen-transporte-service' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bts-baumaschinen-transporte-service' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bts-baumaschinen-transporte-service' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bts-baumaschinen-transporte-service' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bts-baumaschinen-transporte-service' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-mietservice-harsefeld' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-mietservice-harsefeld' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-mietservice-harsefeld' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-mietservice-harsefeld' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-mietservice-harsefeld' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-heidesee' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-heidesee' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-heidesee' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-heidesee' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinen-heidesee' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-thomas-franke' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-thomas-franke' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-thomas-franke' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-thomas-franke' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'baumaschinenvermietung-thomas-franke' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'radlader-kettenbagger-kompaktkettenlader-mobilbagger-baugeraete-lader-volvo' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'radlader-kettenbagger-kompaktkettenlader-mobilbagger-baugeraete-lader-volvo' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'radlader-kettenbagger-kompaktkettenlader-mobilbagger-baugeraete-lader-volvo' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'radlader-kettenbagger-kompaktkettenlader-mobilbagger-baugeraete-lader-volvo' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'radlader-kettenbagger-kompaktkettenlader-mobilbagger-baugeraete-lader-volvo' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tower-kran-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tower-kran-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tower-kran-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tower-kran-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'tower-kran-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ikb-kran-mietkran-koeln-bonn' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ikb-kran-mietkran-koeln-bonn' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ikb-kran-mietkran-koeln-bonn' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ikb-kran-mietkran-koeln-bonn' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ikb-kran-mietkran-koeln-bonn' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-sicherheitstechnik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-sicherheitstechnik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-sicherheitstechnik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-sicherheitstechnik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kran-und-sicherheitstechnik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-koeln' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-koeln' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-koeln' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-koeln' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-koeln' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-koeln-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-koeln-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-koeln-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-koeln-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-koeln-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rhein-ruhr-krane-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rhein-ruhr-krane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rhein-ruhr-krane-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rhein-ruhr-krane-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rhein-ruhr-krane-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'miete-deinen-kran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'miete-deinen-kran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'miete-deinen-kran' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'miete-deinen-kran' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'miete-deinen-kran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruhrpottkran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruhrpottkran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruhrpottkran' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruhrpottkran' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ruhrpottkran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-duesseldorf-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-duesseldorf-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-duesseldorf-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-duesseldorf-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-duesseldorf-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kranvermietung-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kranvermietung-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kranvermietung-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kranvermietung-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hofmann-kranvermietung-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'naessl-minikranservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hjk-autokrane-hannover-e-k' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minikran-id-mietservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-gabelstapler-baumaschinen-telestapler-arbeitsbuehnen-und-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-gabelstapler-baumaschinen-telestapler-arbeitsbuehnen-und-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-gabelstapler-baumaschinen-telestapler-arbeitsbuehnen-und-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-gabelstapler-baumaschinen-telestapler-arbeitsbuehnen-und-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'wiesecker-group-gabelstapler-baumaschinen-telestapler-arbeitsbuehnen-und-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-mikschl-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-karlsruhe' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-karlsruhe' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-karlsruhe' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-karlsruhe' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'konecranes-karlsruhe' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokrane-in-mannheim-heintzelmann-autokrane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'weiland-kran-und-transport-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gundg-kranvermietung-bremen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gundg-kranvermietung-bremen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gundg-kranvermietung-bremen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gundg-kranvermietung-bremen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'gundg-kranvermietung-bremen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bolte-autokrane-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bolte-autokrane-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schlamann-autokrane-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-kranservice' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-kranservice' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-kranservice' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-kranservice' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hubsteiger-kranservice' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-hamburg-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-hamburg-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-hamburg-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-hamburg-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-hamburg-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-kranarbeiten-niederlasung-frankfurt-am-main' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-kranarbeiten-niederlasung-frankfurt-am-main' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-kranarbeiten-niederlasung-frankfurt-am-main' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-kranarbeiten-niederlasung-frankfurt-am-main' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hellmich-kranservice-gmbh-kranarbeiten-niederlasung-frankfurt-am-main' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'krandienst-schuch-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranfuehrer' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranfuehrer' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranfuehrer' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranfuehrer' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranfuehrer' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ms-krantechnik-duesseldorf-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ms-krantechnik-duesseldorf-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ms-krantechnik-duesseldorf-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ms-krantechnik-duesseldorf-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ms-krantechnik-duesseldorf-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ak-verleih-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ak-verleih-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ak-verleih-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ak-verleih-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ak-verleih-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sankoo-hebetechnik' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sankoo-hebetechnik' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sankoo-hebetechnik' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sankoo-hebetechnik' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sankoo-hebetechnik' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-krane' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-krane' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-krane' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-krane' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hess-krane' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'minikran-elsaesser' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knickskran' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knickskran' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knickskran' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knickskran' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'knickskran' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-uebergabestation' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-uebergabestation' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-uebergabestation' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-uebergabestation' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh-uebergabestation' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'autokran-schnurr-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'jaromin-gmbh-autokrandienst-und-kranvermietung-bottrop' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-4' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-4' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-4' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-4' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'greving-mobile-crane-rental-gmbh-und-co-kg-4' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'castell-autokran-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'sp-autokran-vermietung' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'treffler-autokrane-und-schwertransporte-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eschbach-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eschbach-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eschbach-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eschbach-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'eschbach-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-nl-braunschweig' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-nl-braunschweig' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-nl-braunschweig' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-nl-braunschweig' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schwarze-asc-gmbh-nl-braunschweig' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'ladekran-kaufmann-berlin-und-brandenburg-kaufmann-spezialfahrzeuge' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beth-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beth-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beth-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beth-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'beth-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranmieten24-juechert-henke' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranmieten24-juechert-henke' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranmieten24-juechert-henke' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranmieten24-juechert-henke' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranmieten24-juechert-henke' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-logistik-und-dienstleistungs-gmbh' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-logistik-und-dienstleistungs-gmbh' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-logistik-und-dienstleistungs-gmbh' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-logistik-und-dienstleistungs-gmbh' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-logistik-und-dienstleistungs-gmbh' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'hueffermann-krandienst-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'axel-haase' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'axel-haase' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'axel-haase' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'axel-haase' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'axel-haase' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-3' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-3' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-3' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-3' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-3' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke-2' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke-2' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke-2' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke-2' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'kranservice-jennifer-jaeke-2' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'mkvfranken-gmbh-minikranverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reinhold-geiger-baumaschinenvermietung-kranverleih-geruestverleih' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reinhold-geiger-baumaschinenvermietung-kranverleih-geruestverleih' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reinhold-geiger-baumaschinenvermietung-kranverleih-geruestverleih' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reinhold-geiger-baumaschinenvermietung-kranverleih-geruestverleih' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'reinhold-geiger-baumaschinenvermietung-kranverleih-geruestverleih' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-muenchen-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-muenchen-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-muenchen-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-muenchen-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'klickrent-muenchen-arbeitsbuehnen-stapler-und-container-mieten' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-7' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-7' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-7' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-7' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-7' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'laggner-mietservice-arbeitsbuehnenvermietung-noerdlingen' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'laggner-mietservice-arbeitsbuehnenvermietung-noerdlingen' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'laggner-mietservice-arbeitsbuehnenvermietung-noerdlingen' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'laggner-mietservice-arbeitsbuehnenvermietung-noerdlingen' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'laggner-mietservice-arbeitsbuehnenvermietung-noerdlingen' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-8' AND ct.slug = 'minikran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-8' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-8' AND ct.slug = 'dachdeckerkran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-8' AND ct.slug = 'baukran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-8' AND ct.slug = 'ladekran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;
INSERT INTO company_cranes (company_id, crane_type_id)
SELECT c.id, ct.id FROM companies c, crane_types ct
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-neustadt-a-d-donau-mobilkrane-spezialtransporte-leist' AND ct.slug = 'autokran-mieten'
ON CONFLICT (company_id, crane_type_id) DO NOTHING;

-- =============================================
