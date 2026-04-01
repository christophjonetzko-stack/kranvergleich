-- 5. COMPANY_REGIONS (firma → miasto z CSV cities)
-- =============================================
-- Each company is assigned to its home city if that city exists in the cities table.
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'dmd-transport-moebelliftvermieting' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mac-handel-und-vermietung' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'moebellift-vermietung-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'jl-transporte-jan-loeschmann' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'richter-kran-und-schwerlast-gmbh' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kayhan-baumaschinen-vermietung-gmbh' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mearent-baumaschinen-vermietung' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kranservice-solle-simon-solle' AND ci.slug = 'essen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-hamburg' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'h-m-kranservice-gmbh' AND ci.slug = 'moenchengladbach'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bovah-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'tf-vermietungsservice-und-erdarbeiten' AND ci.slug = 'brandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'moebellift-mieten' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ulferts-gmbh' AND ci.slug = 'neubrandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'l-pfenninger-und-sohn-gmbh-und-co-kg' AND ci.slug = 'nuernberg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'nks-niessen-kranservice-niessen-alexander' AND ci.slug = 'moenchengladbach'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-2' AND ci.slug = 'augsburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'herbert-koehler' AND ci.slug = 'karlsruhe'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'salgert-arbeitsbuehnen-und-gabelstapler-gmbh' AND ci.slug = 'moenchengladbach'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kran-und-schwerlastlogistik-roessler-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'deutsche-kranservice-gmbh' AND ci.slug = 'essen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'id-logistik-gmbh-kranvermietung-koeln' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'connors-baumaschinen-vermietung' AND ci.slug = 'lueneburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh' AND ci.slug = 'brandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bode-bautechnik-baumaschinen-gmbh' AND ci.slug = 'ludwigsfelde'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kranservice-kammann' AND ci.slug = 'essen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'scholpp-kran-und-transport-gmbh-3' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'moebellift-mieten-hamburg' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'karl-altendorff-e-k' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kran-micha' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kai-stuermlinger-kranverleih' AND ci.slug = 'karlsruhe'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ksg-kranservice-guenther-gmbh' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'h-n-krane' AND ci.slug = 'luebeck'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kran-lift-gmbh' AND ci.slug = 'stuttgart'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hubsteiger-arbeitsbuehne-motorsaegen-kaercher' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kuehl-gmbh-kranverleih' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'krandienst-schuch-gmbh-kranarbeiten-und-schwertransporte-4' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'j-d-mann-hebebuehnenverleih' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'philipp-und-sohn-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'harald-hoffmann' AND ci.slug = 'potsdam'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bauzaun-vermietung-berlin' AND ci.slug = 'blankenfelde-mahlow'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kocks-kranbau-gmbh' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'titschkus-und-wittrock-gmbh-und-co-kg-vertriebsbuero-bremen' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wiesecker-group-arbeitsbuehnen-stapler-krane-baumaschinen' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kranlogistik-lausitz-gmbh-5' AND ci.slug = 'cottbus'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'dachkran-de' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mkw-krane-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'all-kran-autokrane-gmbh-und-co-kg' AND ci.slug = 'nuernberg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mammoet-deutschland-gmbh-3' AND ci.slug = 'krefeld'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'minibagger-mieten-mahlow' AND ci.slug = 'blankenfelde-mahlow'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'autokranservice-dettmar' AND ci.slug = 'herne'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'josef-dielen' AND ci.slug = 'moenchengladbach'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'graeser-eschbach' AND ci.slug = 'karlsruhe'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ralf-teichmann-gmbh' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'konecranes-leipzig' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kranservice-knorn-gmbh' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bielemeyer-kran-und-foerder-anlagen-gmbh' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'konecranes-hamburg' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hack-schwerlastservice-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'gerken-kranvermietung-und-handel-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'apparillos-baumaschinen' AND ci.slug = 'oranienburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'feller-gmbh' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'in-media-corpore-gmbh' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mkv-montagekran-vermietung' AND ci.slug = 'wuppertal'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'autokrane-merkel-gmbh-nuernberg' AND ci.slug = 'nuernberg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'konecranes-hannover' AND ci.slug = 'hannover'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bolte-autokrane-bremen-gmbh' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'boecker-maschinenwerke-gmbh-niederlassung-schkeuditz-leipzig' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'eisenhuth-gmbh' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'arbeitsbuehne-und-hebebuehne-rentem-gmbh-stapler-telestapler-gabelstapler-vermie' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bolte-autokrane-hamburg' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bolte-autokrane-gmbh-4' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'holzbau-lensch-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'abrams-krane-gmbh' AND ci.slug = 'herne'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schwerlast-projekt-gesellschaft-mbh' AND ci.slug = 'schwedt'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'berteit-mietservice-gmbh' AND ci.slug = 'herne'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kfr-mietlifte-gmbh' AND ci.slug = 'muenster'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'rieckermann-und-sohn-gmbh' AND ci.slug = 'luebeck'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'klaus-otto-baumaschinenhandel-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bsi-gmbh-arbeitsbuehnen-vermietung-und-verkauf' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'groeger-bauaufzuege-hebetechnik-gmbh' AND ci.slug = 'fredersdorf-vogelsdorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hiab-germany-gmbh-standort-karlsruhe' AND ci.slug = 'karlsruhe'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh' AND ci.slug = 'braunschweig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bienhold-arbeitsbuehnen-gmbh-lbg' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'crailsheimer-baumaschinen-mietpark-gmbh' AND ci.slug = 'crailsheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ulferts-und-wittrock-gmbh-und-co-kg-ndl-luebeck' AND ci.slug = 'luebeck'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'fahrenholz-gmbh-und-co-kg' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ing-kurt-klopsch-foerdertechnik-gmbh' AND ci.slug = 'brandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'boels-rental-neubrandenburg' AND ci.slug = 'neubrandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'selbstbau-verleih' AND ci.slug = 'brandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'zeppelin-rental-gmbh-koeln-baustellen-und-verkehrssicherung' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'baumo-kranservice-gmbh-und-co-kg' AND ci.slug = 'duisburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = '24-h-pkw-und-lkw-abschlepp-und-bergungs-und-pannendienst-kaufmann-und-sohn-spezi' AND ci.slug = 'fredersdorf-vogelsdorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'zeppelin-rental-gmbh-augsburg' AND ci.slug = 'augsburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'enderling-vermietung-gmbh-arbeitsbuehnen-und-kranvermietung' AND ci.slug = 'essen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'arbeitsbuehnen-drumann-gmbh' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'dachdeckerei-maehner-und-co-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-berlin-marzahn' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-berlin-marienfelde' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'atlas-hamburg-gmbh' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'arbeitsbuehnen-koch-gmbh' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkv-schmitz-partner-gmbh' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'anchor-crane-and-aerial-platform-hire-gmbh' AND ci.slug = 'lueneburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wilhelm-banzhaf-krananlagen-gmbh-und-co-logistik-und-service-kg' AND ci.slug = 'blankenfelde-mahlow'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mateco-gmbh-arbeitsbuehnenvermietung-uebergabestation-berlin-west' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'baumaschinenvermietung-oranienburg' AND ci.slug = 'oranienburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh' AND ci.slug = 'duisburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'boels-rental-germany-gmbh' AND ci.slug = 'oranienburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'brandt-kran-und-logistik-gmbh' AND ci.slug = 'schwedt'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wilhelm-bruns-kranvermietung-gmbh' AND ci.slug = 'lueneburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'arbeitsbuehnen-buchtmann-gmbh' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'highlifter-koeln' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'a-plus-bautechnik-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-4' AND ci.slug = 'krefeld'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'lanz-hebebuehnen-and-commercial-vehicles-rental-gmbh-stuttgart' AND ci.slug = 'stuttgart'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wiesbauer-gmbh-rhein-neckar' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wolffkran-gmbh-niederlassung-dortmund' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kw-kranwerke-gmbh' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bkl-crane-logistik-gmbh-4' AND ci.slug = 'ingolstadt'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'steinwedel-vab-gmbh-braunschweig-arbeitsbuehnen-und-baumaschinen' AND ci.slug = 'braunschweig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hercules-service-und-vermietung-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hess-krane-autokran-und-spezialkranverleih' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'boecker-maschinenwerke-gmbh-niederlassung-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'blumenbecker-technik-gmbh' AND ci.slug = 'ruedersdorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'autokrane-in-karlsruhe-heintzelmann-autokrane-gmbh' AND ci.slug = 'karlsruhe'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-3' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'akkus-bew-und-kranservice-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'moebellift-vermietung-berlin-2' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'peter-hebetechnik-vertriebs-gmbh' AND ci.slug = 'nuernberg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'autodienst-eineder-gmbh' AND ci.slug = 'ingolstadt'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-potsdam' AND ci.slug = 'potsdam'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-oranienburg' AND ci.slug = 'oranienburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'zeppelin-rental-gmbh-koeln' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hanselmann-gmbh' AND ci.slug = 'crailsheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'paul-becker-gmbh-arbeitsbuehnen-stapler-und-geruestbau' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-raumsystemcenter-berlin' AND ci.slug = 'fredersdorf-vogelsdorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'thoemen-spedition-gmbh-und-co-kg' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'shb-sonder-hebezeuge-berlin-gmbh-und-co-kg' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wolfgang-wehr-ladekran-transporte-gmbh-und-co-kg' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'spickermann-gmbh' AND ci.slug = 'hannover'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'induma-rent-gmbh-gabelstapler' AND ci.slug = 'stuttgart'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wilden-kran-vermietung-gmbh' AND ci.slug = 'wuppertal'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ulferts-gmbh-2' AND ci.slug = 'schwedt'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'gigalift-vermietungs-gmbh-niederlassung-neubrandenburg' AND ci.slug = 'neubrandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'griebel-und-mahncke' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'tribac-baumaschinen-berlin-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'zeppelin-rental-gmbh-cottbus' AND ci.slug = 'cottbus'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kranservice-west-gmbh' AND ci.slug = 'duisburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'k-und-w-autokrane-gmbh-und-co-kg' AND ci.slug = 'hildesheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'zeppelin-rental-gmbh-wiesbaden' AND ci.slug = 'wiesbaden'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'a1-arbeitsbuehnen' AND ci.slug = 'cottbus'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-arbeitsbuehnen-und-teleskopcenter-berlin' AND ci.slug = 'fredersdorf-vogelsdorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'fricke-schmidbauer-schwerlast-gmbh-2' AND ci.slug = 'hannover'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'uka-hauke-gmbh-arbeitsbuehnen-und-teleskopstapler-clever-mieten-in-dresden' AND ci.slug = 'dresden'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'detlef-braun-bedachungen-gmbh-und-co-kg' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'tyroller-baumaschinen' AND ci.slug = 'augsburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ktg-baumaschinen-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-ruedersdorf' AND ci.slug = 'ruedersdorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'cegema-maschinenhandel-gmbh-potsdam' AND ci.slug = 'potsdam'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-berlin' AND ci.slug = 'blankenfelde-mahlow'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-berlin-spandau' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hochmuth-gmbh-und-co-kg-arbeitsbuehnenvermietung-system-lift-partner' AND ci.slug = 'augsburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mingalift-gmbh-stapler-hebebuehne-arbeitsbuehne-mieten-muenchen' AND ci.slug = 'muenchen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-krefeld' AND ci.slug = 'krefeld'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'herrmann-und-wittrock-gmbh-und-co-kg-niederlassung-leipzig' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'roll-kran-arbeitsbuehnen-gmbh' AND ci.slug = 'crailsheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'autokrane-schares-gmbh' AND ci.slug = 'essen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'nolte-autokrane' AND ci.slug = 'hannover'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-berlin-adlershof' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'haessler-lift-gmbh' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'd-krantechnik-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schweri-autokranbetriebe-gmbh-und-co-kg' AND ci.slug = 'krefeld'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schmid-hebebuehnen-minikranverleih-2' AND ci.slug = 'augsburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'certex-hebetechnik-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kvs-kranvermietung-und-schwertransporte-michael-mross-e-k' AND ci.slug = 'dresden'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hart-autokran-und-arbeitsbuehnenvermietung' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-karlsruhe-mobilkrane-spezialtransporte-leistungsplus' AND ci.slug = 'karlsruhe'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'boels-verleih-gmbh-berlin-pankow' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'menke-spezial-transporte-gmbh-und-co-kg' AND ci.slug = 'brandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-koeln' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'scholpp-kran-und-transport-gmbh' AND ci.slug = 'stuttgart'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'gebr-markewitsch-gmbh' AND ci.slug = 'nuernberg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'nagel-baumaschinen-ulm-gmbh' AND ci.slug = 'ulm'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hubert-wiemann-gmbh-und-co-kg-cranes' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'gerken-gmbh-arbeitsbuehnenvermietung-niederlassung-leipzig' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = '4k-vierke-bau' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg-nuernberg' AND ci.slug = 'nuernberg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'zeppelin-rental-gmbh-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schmidbauer-gmbh-und-co-kg' AND ci.slug = 'ingolstadt'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'boehm-lift-gmbh-2' AND ci.slug = 'brandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hess-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'reichert-gmbh-kranverleih-2' AND ci.slug = 'frankfurt-am-main'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wego-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'gruetzner-arbeitsbuehnen' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mobile-hubtechnik-kranarbeiten-und-transporte-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'klickrent' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hkl-center-frankfurt-main-nord' AND ci.slug = 'frankfurt-am-main'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'btb-logistik-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'beyer-mietservice-kg-baumaschinen-arbeitsbuehnen-stapler-minikran-5' AND ci.slug = 'frankfurt-am-main'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ladekran-schulz' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hytec-arbeitsbuehnen-vermietungs-gmbh' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'boehm-lift-gmbh' AND ci.slug = 'potsdam'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'treffler-autokran-schwertransporte-gmbh' AND ci.slug = 'muenchen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mundh-trans-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'franz-bracht-kran-vermietung-gmbh-3' AND ci.slug = 'muenster'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'thoemen-schwertransport-und-krantechnik-gmbh' AND ci.slug = 'potsdam'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'graeser-gmbh' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mueller-und-sohn-kranservice-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'knaack-krane' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'felbermayr-deutschland-kranvermietung-arbeitsbuehnen-und-staplervermietung-trans-3' AND ci.slug = 'dresden'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'nagel-baumaschinen-ludwigsfelde-berlin' AND ci.slug = 'ludwigsfelde'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mundg-baumaschinen' AND ci.slug = 'potsdam'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'gerken-arbeitsbuehnen-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'beyer-mietservice-kg-baumaschinen-arbeitsbuehnen-stapler-kran-minikran' AND ci.slug = 'wiesbaden'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'zeppelin-rental-gmbh-oranienburg' AND ci.slug = 'oranienburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'maximum-gmbh-kran-und-schwerlastlogistik-2' AND ci.slug = 'braunschweig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bkl-crane-logistik-gmbh' AND ci.slug = 'frankfurt-am-main'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'rieger-und-moser-gmbh-und-co-kg' AND ci.slug = 'ulm'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bausetra-rent-gmbh' AND ci.slug = 'potsdam'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'sommer-kranverleih-gmbh' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bkl-crane-logistik-gmbh-2' AND ci.slug = 'hannover'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kranservice-s-tennigkeit' AND ci.slug = 'ludwigsfelde'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'boels-verleih' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'brunnhuber-krane-gmbh' AND ci.slug = 'augsburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'lex-autovermietung-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'klarx-gmbh' AND ci.slug = 'muenchen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'alex-grund-gmbh' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'thoemen-kranarbeiten-und-schwertransporte-gmbh-kran-und-schwerlastlogistik-leipz' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hasslberger-gmbh-duesseldorf' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'tas-alborn-gmbh' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'a24team' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hjk-cranes-e-k' AND ci.slug = 'hildesheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'franz-bracht-kg' AND ci.slug = 'wuppertal'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schaak-kran-und-transporte-gmbh' AND ci.slug = 'stuttgart'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'arbeitsbuehnen-und-gabelstaplervermietung-koellner-braunschweig' AND ci.slug = 'braunschweig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'salgert-unternehmensgruppe-autokrane-schwertransporte-arbeitsbuehnen-gabelstaple' AND ci.slug = 'duisburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'weidler-arbeitsbuehnenvermietung-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'maxikraft-kran-und-schwerlastlogistik-inh-maik-kanitzky-e-k' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'pcm-cranes-pcm-krane-und-logistik-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-berlin-kurfuerstendamm' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ga-tec-gabelstaplertechnik-gmbh' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schirmer' AND ci.slug = 'ulm'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'citykran-kran-und-transport-berlin' AND ci.slug = 'ruedersdorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'azs-stoffels' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'colonia-spezialfahrzeuge' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'rosemann-arbeitsbuehnenvermietung' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'gessler-kran-montage-gmbh-und-co-kg' AND ci.slug = 'braunschweig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'niemeier-mietstation-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bmvs-baumaschinen-vermiet-service-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mikschl-autokrane-gmbh-2' AND ci.slug = 'muenchen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hueffermann-krandienst' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'stabet-montage-gmbh-dortmund' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'sis-nord-kran-e-k' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wasel-gmbh-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'loxam-mietstation-bei-bauhaus-spandau' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'demag-cranes-und-componenets-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'terex-mhps-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bolte-autokrane-bremen' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bolte-autokrane-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mightservice-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wolffkran-gmbh-niederlassung-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'konecranes-deutschland-service-gmbh' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'konecranes-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'vak-verband-der-arbeitsgeraete-kommunalfahrzeugindustrie-e-v' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kran-und-transport-schuch' AND ci.slug = 'karlsruhe'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mammoet-deutschland-gmbh-2' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bekel-kran-gmbh' AND ci.slug = 'hildesheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schroeder-autokrane' AND ci.slug = 'braunschweig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kran-einsatz-service-leipzig-gmbh' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kranlogistik-roessler-gmbh' AND ci.slug = 'leipzig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'mammoet-deutschland-gmbh-4' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-berlin' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih' AND ci.slug = 'berlin'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-2' AND ci.slug = 'potsdam'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'tower-kran-gmbh' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kran-und-sicherheitstechnik' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'maco-tec-arbeitsbuehnen-und-gabelstaplervermietung-koeln' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'klickrent-koeln-arbeitsbuehnen-stapler-und-container-mieten' AND ci.slug = 'koeln'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'miete-deinen-kran' AND ci.slug = 'essen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'klickrent-duesseldorf-arbeitsbuehnen-stapler-und-container-mieten' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hjk-autokrane-hannover-e-k' AND ci.slug = 'hannover'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schwarze-asc-gmbh-2' AND ci.slug = 'hannover'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'minikran-id-mietservice' AND ci.slug = 'hannover'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'wiesecker-group-gabelstapler-baumaschinen-telestapler-arbeitsbuehnen-und-krane' AND ci.slug = 'nuernberg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'autokrane-mikschl-gmbh' AND ci.slug = 'augsburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'konecranes-karlsruhe' AND ci.slug = 'karlsruhe'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'rentem-gmbh' AND ci.slug = 'wiesbaden'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'autokrane-in-mannheim-heintzelmann-autokrane-gmbh' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hellmich-kranservice-gmbh-2' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'weiland-kran-und-transport-gmbh-2' AND ci.slug = 'mannheim'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bolte-autokrane-gmbh-2' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bolte-autokrane-gmbh-3' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schlamann-autokrane-gmbh' AND ci.slug = 'bremen'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hubsteiger-kranservice' AND ci.slug = 'dortmund'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'klickrent-hamburg-arbeitsbuehnen-stapler-und-container-mieten' AND ci.slug = 'hamburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'hellmich-kranservice-gmbh-kranarbeiten-niederlasung-frankfurt-am-main' AND ci.slug = 'frankfurt-am-main'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'krandienst-schuch-gmbh-2' AND ci.slug = 'frankfurt-am-main'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'kranfuehrer' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ms-krantechnik-duesseldorf-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ak-verleih-gmbh' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'sankoo-hebetechnik' AND ci.slug = 'duesseldorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'rentem-gmbh-arbeitsbuehnen-und-stapler-vermietung-und-verleih-3' AND ci.slug = 'stuttgart'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'eschbach-gmbh' AND ci.slug = 'stuttgart'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'koenningkrane-gmbh-und-co-kg-2' AND ci.slug = 'muenster'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'schwarze-asc-gmbh-nl-braunschweig' AND ci.slug = 'braunschweig'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'ladekran-kaufmann-berlin-und-brandenburg-kaufmann-spezialfahrzeuge' AND ci.slug = 'fredersdorf-vogelsdorf'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bmk-logistik-und-dienstleistungs-gmbh' AND ci.slug = 'brandenburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'bmk-brandenburger-montage-und-kranservice-gmbh-2' AND ci.slug = 'oranienburg'
ON CONFLICT (company_id, city_id) DO NOTHING;
INSERT INTO company_regions (company_id, city_id)
SELECT c.id, ci.id FROM companies c, cities ci
WHERE c.slug = 'klickrent-muenchen-arbeitsbuehnen-stapler-und-container-mieten' AND ci.slug = 'muenchen'
ON CONFLICT (company_id, city_id) DO NOTHING;
