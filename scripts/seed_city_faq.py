#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Seed city_faq_override for top 15 cities.

FAQ uses {craneName} placeholder which gets replaced at render time
so one FAQ set works across all crane-type city pages.

Usage:
  python seed_city_faq.py              # dry-run
  python seed_city_faq.py --commit     # write to DB
"""
import argparse
import json
import os
import sys

sys.stdout.reconfigure(encoding="utf-8")

ENV_FILE = os.path.join(os.path.dirname(__file__), "..", ".env.local")
if os.path.exists(ENV_FILE):
    with open(ENV_FILE) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip())

from supabase import create_client

sb = create_client(
    os.environ["NEXT_PUBLIC_SUPABASE_URL"],
    os.environ["SUPABASE_SERVICE_ROLE_KEY"],
)

# ─── FAQ Content per city ─────────────────────────────────
# {craneName} is replaced at render time with the actual crane type name.
# Content is in formal German (Sie-Form), factual, locally specific.

CITY_FAQS = {
    "hamburg": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Hamburg?",
            "answer": "Auf privatem Grundstück ist keine Genehmigung erforderlich. Soll der {craneName} auf öffentlichem Grund (Straße, Gehweg) aufgestellt werden, benötigen Sie eine Sondernutzungserlaubnis vom Landesbetrieb Straßen, Brücken und Gewässer (LSBG). In Hamburg dauert die Bearbeitung ca. 2–4 Wochen. Für Schwerlastkrane über 40 Tonnen Gesamtgewicht ist zusätzlich eine Ausnahmegenehmigung für Straßenbenutzung erforderlich."
        },
        {
            "question": "Was kostet ein {craneName} in Hamburg?",
            "answer": "Die Mietpreise in Hamburg liegen im bundesdeutschen Durchschnitt — durch die hohe Anbieterdichte in der Metropolregion herrscht guter Wettbewerb. Für Einsätze im Hafengebiet oder auf den Elbinseln können Zuschläge für Sondertransport anfallen. Vergleichen Sie mindestens 3 Angebote über unsere kostenlose Sammelanfrage, um den besten Preis zu finden."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Hamburg geliefert werden?",
            "answer": "Die meisten Hamburger Kranvermieter liefern innerhalb von 24 Stunden in das gesamte Stadtgebiet. Bei Einsätzen in der HafenCity oder im Hafen gelten besondere Zufahrtsregelungen (HHLA-Gelände, Freihafen) — klären Sie die Zufahrtsgenehmigung vorab mit dem Vermieter. Für dringende Einsätze bieten mehrere Anbieter Same-Day-Service."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Hamburg?",
            "answer": "Hamburg hat strenge Auflagen für Kranarbeiten in der Nähe des Flughafens (Höhenbeschränkungen), in Wasserschutzgebieten und in denkmalgeschützten Bereichen (Speicherstadt, Kontorhaus­viertel). Bei Straßensperrungen ist die Verkehrsbehörde (Polizeikommissariat) einzubeziehen. Tipp: Viele Hamburger Vermieter übernehmen die Genehmigungsbeantragung als Service — fragen Sie bei der Angebotsanfrage danach."
        },
    ],
    "berlin": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Berlin?",
            "answer": "Auf Privatgelände ist keine Genehmigung nötig. Für die Aufstellung eines {craneName} auf öffentlichem Straßenland benötigen Sie eine Sondernutzungserlaubnis vom zuständigen Straßen- und Grünflächenamt des Bezirks. In Berlin sind die 12 Bezirksämter zuständig — nicht eine zentrale Stelle. Bearbeitungszeit: 2–6 Wochen je nach Bezirk. Für Baukrane (Turmdrehkrane) ist zusätzlich eine Baugenehmigung der Bauaufsicht erforderlich."
        },
        {
            "question": "Was kostet ein {craneName} in Berlin?",
            "answer": "Berlin hat mit über 60 Kranvermietern die höchste Anbieterdichte Deutschlands — entsprechend kompetitiv sind die Preise. Die Anfahrtskosten variieren je nach Stadtgebiet erheblich (Spandau ↔ Marzahn = 40+ km). Tipp: Wählen Sie einen Anbieter in Ihrem Bezirk, um Transportkosten zu minimieren. Über unsere Sammelanfrage erreichen Sie gezielt Vermieter in Ihrer Nähe."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Berlin geliefert werden?",
            "answer": "Aufgrund der Größe Berlins und häufiger Verkehrseinschränkungen (Baustellen, Sperrungen) sollten Sie mindestens 48 Stunden Vorlauf einplanen. Viele Berliner Vermieter bieten 24h-Express für Aufschlag (ca. 20–30%). Für Einsätze innerhalb des S-Bahn-Rings gelten teilweise Nachtanlieferungspflichten für Schwertransporte."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Berlin?",
            "answer": "Berlin hat besondere Auflagen in folgenden Bereichen: Regierungsviertel (Sicherheitszone, Voranmeldung BKA), Flughafenumfeld BER (Höhenbeschränkung), Denkmalschutzbereiche (Unter den Linden, Museumsinsel), und Umweltzone (alle Lieferfahrzeuge brauchen grüne Plakette). Für Schwertransporte über 3,5t in der Innenstadt ist eine Routengenehmigung der Verkehrslenkung Berlin (VLB) erforderlich."
        },
    ],
    "koeln": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Köln?",
            "answer": "Auf privatem Gelände ist keine Genehmigung erforderlich. Für Kranaufstellungen auf öffentlichen Straßen und Plätzen in Köln benötigen Sie eine Sondernutzungserlaubnis vom Amt für Straßen und Verkehrstechnik der Stadt Köln. Antragsfrist: mindestens 2 Wochen vor dem geplanten Einsatz. Für Einsätze in der Altstadt oder im Domumfeld gelten verschärfte Auflagen (Denkmalschutz)."
        },
        {
            "question": "Was kostet ein {craneName} in Köln?",
            "answer": "Die Kranmiete in Köln entspricht dem NRW-Durchschnitt. Durch die zentrale Lage im Rheinland gibt es viele Anbieter auch aus Düsseldorf, Bonn und dem Bergischen Land, die Köln bedienen — das drückt die Preise. Für linksrheinische Einsätze (Ehrenfeld, Lindenthal) sind Anbieter aus dem Kölner Westen günstiger; für rechtsrheinisch (Deutz, Porz) lohnt sich ein Vergleich mit Anbietern aus Leverkusen."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Köln geliefert werden?",
            "answer": "Die meisten Kölner Vermieter liefern innerhalb von 24 Stunden. Durch die gute Autobahnanbindung (A1, A3, A4, A57) erreichen auch überregionale Anbieter Köln schnell. Beachten Sie: In der Karnevalssaison (insb. Weiberfastnacht bis Aschermittwoch) kann es zu Einschränkungen bei Straßensperrungen kommen."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Köln?",
            "answer": "Köln hat besondere Regelungen für: Hohenzollernbrücke und Rheinufer (keine schweren Krane), Altstadt (enge Gassen, max. Achslast beachten), Dom-Umgebung (Höhenbeschränkungen, Denkmalschutz), und Messe-Gelände (eigene Zufahrtsregelungen). Für Arbeiten an historischen Gebäuden ist vorab eine Abstimmung mit der Unteren Denkmalbehörde empfehlenswert."
        },
    ],
    "muenchen": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in München?",
            "answer": "Auf Privatgrund ist keine Genehmigung erforderlich. Für die Aufstellung auf öffentlichem Grund benötigen Sie eine verkehrsrechtliche Anordnung und eine Sondernutzungserlaubnis vom Kreisverwaltungsreferat (KVR) München. München ist bekannt für strenge Auflagen — planen Sie 3–4 Wochen Vorlauf ein. Für Baukrane ist zusätzlich eine Baugenehmigung der Lokalbaukommission (LBK) nötig."
        },
        {
            "question": "Was kostet ein {craneName} in München?",
            "answer": "München gehört zu den teuersten Standorten für Kranmiete in Deutschland — ca. 10–20% über dem Bundesdurchschnitt. Gründe: hohe Nachfrage durch Bauboom, strenge städtische Auflagen, und lange Anfahrtswege innerhalb des Stadtgebiets. Tipp: Anbieter aus dem Umland (Erding, Freising, Dachau) sind oft günstiger als innerstädtische Vermieter. Vergleichen Sie über unsere Sammelanfrage."
        },
        {
            "question": "Wie schnell kann ein {craneName} in München geliefert werden?",
            "answer": "Lieferzeiten in München betragen in der Regel 24–72 Stunden. Der Münchner Mittlere Ring und die chronisch überlasteten Einfallstraßen können Schwertransporte verzögern. Viele Vermieter empfehlen Nachtanlieferung für den Innenstadtbereich. Bei Einsätzen nahe dem Flughafen MUC gelten Höhenbeschränkungen."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in München?",
            "answer": "München hat strenge Vorschriften für: Altstadt-Lehel und Maxvorstadt (enge Straßen, Denkmalschutz, Lastbeschränkungen auf historischen Brücken), Olympiagelände (Sondergenehmigung), und Englischer Garten Umgebung (Naturschutz). Die Lokalbaukommission prüft bei Baukranen das Orts- und Landschaftsbild. Für Nacht- und Wochenendarbeit gelten in Wohngebieten strenge Lärmschutzauflagen (TA Lärm)."
        },
    ],
    "duesseldorf": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Düsseldorf?",
            "answer": "Auf Privatgelände nicht. Für Aufstellungen im öffentlichen Verkehrsraum benötigen Sie eine Sondernutzungserlaubnis vom Amt für Verkehrsmanagement der Stadt Düsseldorf. Bearbeitungszeit: ca. 2 Wochen. In der Altstadt und am Medienhafen gelten besondere Regelungen wegen der hohen Fußgängerfrequenz. Für Kranarbeiten an der Königsallee ist eine frühzeitige Abstimmung empfohlen."
        },
        {
            "question": "Was kostet ein {craneName} in Düsseldorf?",
            "answer": "Düsseldorf liegt preislich im oberen NRW-Durchschnitt. Durch die Nähe zu den Ruhrgebiets-Vermietern (Duisburg, Essen, Dortmund — je 20–40 km) haben Sie eine große Auswahl und gute Verhandlungsposition. Für Einsätze im Medienhafen oder in der Innenstadt können Zuschläge für eingeschränkte Zufahrt anfallen."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Düsseldorf geliefert werden?",
            "answer": "Die meisten Düsseldorfer Kranvermieter liefern innerhalb von 24 Stunden. Durch die zentrale Lage im Rhein-Ruhr-Raum ist auch kurzfristige Verfügbarkeit von Spezialgeräten (Schwerlastkrane, Raupenkrane) gut. Tipp: Bei Messe-Veranstaltungen (drupa, MEDICA, boot) kann die Verfügbarkeit eingeschränkt sein — frühzeitig buchen."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Düsseldorf?",
            "answer": "Düsseldorf hat besondere Auflagen für: Flughafen-Umgebung (Höhenbeschränkung, Anmeldung bei DFS), Rheinufer-Promenade (keine schweren Fahrzeuge), Altstadt (Fußgängerzone, Nachtanlieferung), und Oberkassel (Brücken-Lastbeschränkungen). Der Medienhafen hat eigene Zufahrtsregelungen für Schwertransporte. Bei Arbeiten am Rhein ist die Wasser- und Schifffahrtsverwaltung einzubeziehen."
        },
    ],
    "dortmund": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Dortmund?",
            "answer": "Auf Privatgelände nicht. Für die Aufstellung eines {craneName} auf öffentlichen Straßen oder Gehwegen benötigen Sie eine Sondernutzungserlaubnis vom Tiefbauamt der Stadt Dortmund. Bearbeitungszeit: ca. 2 Wochen. Im Bereich der Innenstadt (Wall-Ring) gelten verschärfte Auflagen wegen hoher Fußgängerfrequenz. Für Schwerlastkrane ist zusätzlich eine Genehmigung der Straßenverkehrsbehörde für den Schwertransport erforderlich."
        },
        {
            "question": "Was kostet ein {craneName} in Dortmund?",
            "answer": "Dortmund bietet mit 13 Kranvermietern die höchste Anbieterdichte im Ruhrgebiet — entsprechend wettbewerbsfähig sind die Preise. Die Mietkosten liegen leicht unter dem NRW-Durchschnitt. Zusätzlich bedienen zahlreiche Anbieter aus Essen, Duisburg und dem Sauerland den Dortmunder Markt. Nutzen Sie unsere kostenlose Sammelanfrage, um bis zu 5 Vergleichsangebote zu erhalten."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Dortmund geliefert werden?",
            "answer": "Durch die zentrale Lage im Ruhrgebiet und die hervorragende Autobahnanbindung (A1, A2, A40, A44, A45) liefern die meisten Vermieter innerhalb von 24 Stunden. Auch überregionale Anbieter erreichen Dortmund schnell. Für Einsätze am Westfalenstadion oder auf dem Messegelände gelten bei Veranstaltungen besondere Zufahrtsregelungen."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Dortmund?",
            "answer": "Dortmund hat spezielle Regelungen für: Phoenixsee-Gebiet (Neubaugebiet, eingeschränkte Zufahrt für Schwerlast), Innenstadt-Wall (Fußgängerzone, Nachtanlieferung bevorzugt), und Industriegebiete Hafen/Hörde (Altlasten, Bodengutachten für schwere Krane empfohlen). Im Bereich des Westfalenparks und des Florianturms gelten Höhenbeschränkungen. Viele Dortmunder Vermieter bieten Komplett-Service inklusive Genehmigungsbeantragung."
        },
    ],
    "frankfurt-am-main": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Frankfurt am Main?",
            "answer": "Auf privatem Grund ist keine Genehmigung nötig. Für Aufstellungen im öffentlichen Straßenraum benötigen Sie eine Sondernutzungserlaubnis vom Straßenverkehrsamt Frankfurt. Im Bankenviertel und der Innenstadt sind die Auflagen besonders streng — planen Sie 3–4 Wochen Vorlauf ein. Für Hochhausprojekte (Frankfurt hat über 30 Gebäude >100 m) gelten zusätzliche Auflagen der Bauaufsicht bezüglich Windlasten und Höhensicherung."
        },
        {
            "question": "Was kostet ein {craneName} in Frankfurt am Main?",
            "answer": "Frankfurt gehört zu den teureren Standorten in Deutschland — ca. 10–15% über dem Bundesdurchschnitt. Gründe: hohe Nachfrage durch ständige Hochhaus-Bauprojekte und strenge städtische Auflagen. Anbieter aus dem Rhein-Main-Gebiet (Offenbach, Darmstadt, Wiesbaden, Mainz) bieten oft günstigere Konditionen als innerstädtische Vermieter. Vergleichen Sie über unsere Sammelanfrage."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Frankfurt am Main geliefert werden?",
            "answer": "Die meisten Anbieter liefern innerhalb von 24–48 Stunden. Der Frankfurter Verkehr (Dauerstau auf A5, A3 und Stadtautobahn) kann Schwertransporte verzögern — Nachtanlieferung wird häufig empfohlen. Im Rhein-Main-Gebiet gibt es eine hohe Dichte an Kranvermietern, sodass auch kurzfristig Spezialgeräte verfügbar sind."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Frankfurt am Main?",
            "answer": "Frankfurt hat besondere Auflagen für: Flughafen-Umgebung (strenge Höhenbeschränkung durch DFS, Anmeldepflicht für Krane über 30 m), Bankenviertel (Sicherheitszonen, eingeschränkte Straßensperrungen), Römerberg/Altstadt (Denkmalschutz, Gewichtsbeschränkung auf historischem Pflaster), und Mainufer (Abstimmung mit Wasser- und Schifffahrtsverwaltung). Bei Hochhausbau sind Windgutachten für Turmdrehkrane Pflicht."
        },
    ],
    "stuttgart": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Stuttgart?",
            "answer": "Auf Privatgrundstück nicht. Für die Aufstellung auf öffentlichem Grund ist eine Sondernutzungserlaubnis beim Amt für öffentliche Ordnung Stuttgart erforderlich. Bearbeitungszeit: ca. 2–3 Wochen. Stuttgarts Hanglage (Kessel) stellt besondere Anforderungen an Kranaufstellungen — Standsicherheitsnachweise werden häufiger gefordert als in Flachland-Städten."
        },
        {
            "question": "Was kostet ein {craneName} in Stuttgart?",
            "answer": "Stuttgart liegt preislich ca. 5–10% über dem Bundesdurchschnitt. Die Kessellage und enge Straßen in vielen Stadtteilen (Süd, West, Ost) erschweren die Zufahrt und erhöhen die Logistikkosten. Anbieter aus Ludwigsburg, Esslingen oder dem Filderbereich sind oft günstiger. Nutzen Sie unsere Sammelanfrage für kostenlose Vergleichsangebote aus der Region."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Stuttgart geliefert werden?",
            "answer": "Die meisten regionalen Vermieter liefern innerhalb von 24 Stunden. Beachten Sie: Die Stuttgarter Topographie (Steigungen bis 20%) begrenzt die Zufahrtsmöglichkeiten für Schwerlasttransporte in vielen Stadtteilen. In den Höhenlagen (Degerloch, Sillenbuch, Rotenberg) ist Vorab-Routenprüfung empfehlenswert."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Stuttgart?",
            "answer": "Stuttgart hat besondere Regelungen für: Stuttgart 21 Baustellenbereich (großräumige Sperrungen, eigene Logistikplanung), Kessellage-Innenstadt (eingeschränkte Aufstellflächen, Hangabsicherung), Schlossgarten und Killesberg (Naturschutz/Denkmalschutz), und Weinberge (Hanglagen mit eingeschränkter Zufahrt). Die Feinstaubzone erfordert grüne Plakette für alle Transportfahrzeuge."
        },
    ],
    "hannover": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Hannover?",
            "answer": "Auf privatem Gelände nicht. Für öffentlichen Grund benötigen Sie eine Sondernutzungserlaubnis vom Fachbereich Tiefbau der Landeshauptstadt Hannover. Bearbeitungszeit: ca. 2 Wochen. Während der Messezeiten (Hannover Messe, IAA Transportation) gelten im Messeumfeld besondere Verkehrsregelungen, die Kranaufstellungen betreffen können."
        },
        {
            "question": "Was kostet ein {craneName} in Hannover?",
            "answer": "Hannover liegt preislich im niedersächsischen Durchschnitt — etwas unter dem Niveau von Hamburg oder München. Mit 8 Anbietern in der Stadt und weiteren im Umland (Langenhagen, Laatzen, Garbsen) herrscht guter Wettbewerb. Für Einsätze während der Messe kann die Nachfrage steigen und Preise höher ausfallen — frühzeitig buchen."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Hannover geliefert werden?",
            "answer": "Durch die zentrale Lage in Norddeutschland und die gute Autobahnanbindung (A2, A7, A37) liefern die meisten Vermieter innerhalb von 24 Stunden. Auch Anbieter aus Braunschweig, Hildesheim und Celle bedienen Hannover regelmäßig. Für Express-Einsätze bieten mehrere Unternehmen Same-Day-Service."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Hannover?",
            "answer": "Hannover hat besondere Auflagen für: Messegelände (eigene Zufahrtsregelungen, Anmeldung bei Deutsche Messe AG), Herrenhäuser Gärten (Denkmal- und Naturschutz), Maschsee-Ufer (Gewichtsbeschränkung), und Altstadt/Marktkirche (enge Gassen, Denkmalschutz). Der Flughafen Hannover-Langenhagen hat Höhenbeschränkungen im nördlichen Stadtgebiet. Viele Vermieter kennen die lokalen Auflagen und unterstützen bei der Genehmigung."
        },
    ],
    "nuernberg": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Nürnberg?",
            "answer": "Auf privatem Grund nicht. Für die Aufstellung im öffentlichen Verkehrsraum ist eine Sondernutzungserlaubnis beim Servicebetrieb Öffentlicher Raum (SÖR) der Stadt Nürnberg erforderlich. Bearbeitungszeit: ca. 2 Wochen. In der Altstadt (innerhalb der Stadtmauer) gelten verschärfte Auflagen wegen Denkmalschutz und eingeschränkter Zufahrtsmöglichkeiten."
        },
        {
            "question": "Was kostet ein {craneName} in Nürnberg?",
            "answer": "Nürnberg liegt preislich im bayerischen Mittelfeld — günstiger als München, vergleichbar mit Augsburg. Mit 7 Anbietern vor Ort und weiteren aus Fürth, Erlangen und dem Nürnberger Land ist die Wettbewerbslage gut. Für Einsätze in der denkmalgeschützten Altstadt können Sonderaufschläge anfallen (eingeschränkte Zufahrt, Spezialgeräte)."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Nürnberg geliefert werden?",
            "answer": "Die meisten Nürnberger Vermieter liefern innerhalb von 24 Stunden. Die Metropolregion Nürnberg-Fürth-Erlangen ist kompakt und gut angebunden (A3, A6, A9, A73). Für Einsätze auf dem Messegelände (NürnbergMesse) oder am Flughafen gelten eigene Zufahrtsregelungen."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Nürnberg?",
            "answer": "Nürnberg hat besondere Regelungen für: Altstadt innerhalb der Stadtmauer (enge Gassen, Denkmalschutz, Gewichtsbeschränkung auf historischen Brücken über die Pegnitz), Kaiserburg-Umgebung (strenge Höhenbeschränkungen, Denkmalschutz), Hafen Nürnberg (eigene Zufahrtsregelungen, Schwerlastverkehr möglich), und Flughafen-Umfeld (Höhenlimit). Für Arbeiten an historischer Bausubstanz ist die Untere Denkmalschutzbehörde einzubeziehen."
        },
    ],
    "leipzig": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Leipzig?",
            "answer": "Auf privatem Gelände nicht. Für öffentliche Flächen benötigen Sie eine Sondernutzungserlaubnis beim Verkehrs- und Tiefbauamt der Stadt Leipzig. Bearbeitungszeit: ca. 2 Wochen. Leipzig erlebt derzeit einen starken Bauboom — rechnen Sie mit erhöhter Nachfrage und planen Sie frühzeitig."
        },
        {
            "question": "Was kostet ein {craneName} in Leipzig?",
            "answer": "Leipzig gehört zu den günstigeren Großstädten für Kranmiete — die Preise liegen ca. 10–15% unter dem westdeutschen Durchschnitt. Mit 11 Anbietern vor Ort ist die Auswahl gut. Durch den aktuellen Bauboom steigt die Nachfrage jedoch, besonders für Turmdrehkrane und Baukrane. Vergleichen Sie Angebote über unsere Sammelanfrage."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Leipzig geliefert werden?",
            "answer": "Die meisten Leipziger Vermieter liefern innerhalb von 24 Stunden. Durch die gute Anbindung (A9, A14, A38) erreichen auch Anbieter aus Halle, Dresden und Chemnitz Leipzig schnell. Das DHL-Drehkreuz am Flughafen Leipzig/Halle hat keine wesentlichen Einschränkungen für Kraneinsätze im Stadtgebiet."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Leipzig?",
            "answer": "Leipzig hat besondere Auflagen für: Innenstadt/Augustusplatz (Fußgängerzone, eingeschränkte Zufahrt), Plagwitz/Lindenau (ehemalige Industriegebiete, teilweise Altlasten im Boden — Standsicherheit prüfen), Völkerschlachtdenkmal-Umgebung (Denkmalschutz), und Neuseenland (ehemaliger Tagebau, Bodengutachten für schwere Krane empfohlen). Die Leipziger Messe hat eigene Zufahrtsregelungen bei Veranstaltungen."
        },
    ],
    "bremen": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Bremen?",
            "answer": "Auf Privatgelände nicht. Für die Aufstellung auf öffentlichem Verkehrsraum benötigen Sie eine Sondernutzungserlaubnis vom Amt für Straßen und Verkehr (ASV) Bremen. Bearbeitungszeit: ca. 2 Wochen. Im Bereich der Überseestadt (Hafenrevitalisierung) gelten teilweise vereinfachte Verfahren für Bauprojekte."
        },
        {
            "question": "Was kostet ein {craneName} in Bremen?",
            "answer": "Bremen liegt preislich im norddeutschen Durchschnitt — günstiger als Hamburg, vergleichbar mit Hannover. Mit 11 Anbietern vor Ort ist die Wettbewerbslage ausgezeichnet. Für Einsätze im Hafengebiet oder in der Überseestadt können Zuschläge für besondere Zufahrtswege anfallen. Anbieter aus Oldenburg und Bremerhaven bedienen Bremen ebenfalls regelmäßig."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Bremen geliefert werden?",
            "answer": "Die meisten Bremer Vermieter liefern innerhalb von 24 Stunden. Die A1 und A27 ermöglichen auch überregionalen Anbietern schnelle Zufahrt. Für Einsätze im Hafen (Neustädter Hafen, Industriehafen) ist eine Zufahrtsgenehmigung der bremenports GmbH erforderlich — klären Sie dies vorab mit dem Vermieter."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Bremen?",
            "answer": "Bremen hat besondere Regelungen für: Altstadt/Schnoorviertel (enge Gassen, Denkmalschutz, UNESCO-Welterbe Rathaus und Roland), Überseestadt (Hafenrevitalisierung, wechselnde Baustellenzufahrten), Weser-Ufer (Abstimmung mit Wasser- und Schifffahrtsamt), und Flughafen Bremen (Höhenbeschränkung im Stadtgebiet, da City Airport). Die Nähe des Flughafens zur Innenstadt macht Höhenbeschränkungen in Bremen relevanter als in vielen anderen Städten."
        },
    ],
    "mannheim": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Mannheim?",
            "answer": "Auf privatem Grund nicht. Für öffentliche Flächen ist eine Sondernutzungserlaubnis beim Fachbereich Straßen und Verkehr der Stadt Mannheim erforderlich. Bearbeitungszeit: ca. 2 Wochen. Mannheims Quadrate-Innenstadt (A1–U6) hat besonders enge Zufahrtsverhältnisse — abstimmen Sie die Aufstellfläche vorab mit dem Vermieter."
        },
        {
            "question": "Was kostet ein {craneName} in Mannheim?",
            "answer": "Mannheim liegt preislich im Mittelfeld der Rhein-Neckar-Region. Mit 9 Anbietern und weiteren aus Ludwigshafen, Heidelberg und dem Rhein-Neckar-Kreis ist die Auswahl groß. Der Wettbewerb über die Landesgrenze (Ludwigshafen/Rheinland-Pfalz) hinweg drückt die Preise. Vergleichen Sie Angebote über unsere Sammelanfrage."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Mannheim geliefert werden?",
            "answer": "Die meisten Anbieter liefern innerhalb von 24 Stunden. Die Rhein-Neckar-Region ist kompakt — Ludwigshafen, Heidelberg und Schwetzingen liegen jeweils unter 20 km Entfernung. Für Einsätze im Hafen (einer der größten Binnenhäfen Europas) gelten eigene Zufahrtsregelungen der Staatlichen Rhein-Neckar-Hafengesellschaft."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Mannheim?",
            "answer": "Mannheim hat besondere Auflagen für: Quadrate-Innenstadt (extrem enge Blockstruktur, Einbahnstraßen, eingeschränkte Aufstellflächen), Hafen/Jungbusch (Hafengelände, Schwerlastverkehr möglich), Rheinufer und Neckarufer (Abstimmung mit Wasserstraßenverwaltung), und BASF-Umfeld in Ludwigshafen-Nähe (Sicherheitszonen). Für Brückenarbeiten an der Kurt-Schumacher-Brücke oder Konrad-Adenauer-Brücke sind beide Bundesländer (BW und RLP) einzubeziehen."
        },
    ],
    "essen": [
        {
            "question": "Brauche ich eine Genehmigung für einen {craneName} in Essen?",
            "answer": "Auf Privatgelände nicht. Für die Aufstellung im öffentlichen Raum benötigen Sie eine Sondernutzungserlaubnis beim Amt für Straßen und Verkehr der Stadt Essen. Bearbeitungszeit: ca. 2 Wochen. Im Bereich der Innenstadt und des Limbecker Platzes gelten verschärfte Auflagen wegen der Fußgängerzonen."
        },
        {
            "question": "Was kostet ein {craneName} in Essen?",
            "answer": "Essen liegt preislich im Ruhrgebiets-Durchschnitt und damit leicht unter dem NRW-Mittel. Durch die extreme Dichte an Kranvermietern im Ruhrgebiet (Dortmund, Duisburg, Mülheim, Oberhausen — alle unter 30 km) herrscht starker Wettbewerb. Nutzen Sie unsere Sammelanfrage, um Angebote aus der gesamten Region zu vergleichen."
        },
        {
            "question": "Wie schnell kann ein {craneName} in Essen geliefert werden?",
            "answer": "Die meisten Vermieter liefern innerhalb von 24 Stunden — oft sogar schneller dank der kurzen Wege im Ruhrgebiet. Die A40, A42 und A52 ermöglichen schnelle Zufahrt aus allen Richtungen. Beachten Sie: Die A40 (Ruhrschnellweg) hat regelmäßig Stau — für Schwertransporte empfiehlt sich die Routenplanung über die A42."
        },
        {
            "question": "Welche Besonderheiten gelten für Kraneinsätze in Essen?",
            "answer": "Essen hat besondere Regelungen für: UNESCO-Welterbe Zeche Zollverein (strenger Denkmalschutz, Sondergenehmigung erforderlich), Grüne Hauptstadt Europas-Projekte (Emscherumbau, Renaturierung — wechselnde Baustellen), Krupp-Gürtel/ThyssenKrupp-Quartier (eigene Zufahrtsregelungen), und Baldeneysee/Ruhrtal (Naturschutz). Im ehemaligen Bergbaugebiet ist die Tragfähigkeit des Untergrunds (Bergschäden, Stollen) bei schweren Kranen zu prüfen."
        },
    ],
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true")
    args = ap.parse_args()
    dry = not args.commit

    print(f"=== seed_city_faq — {'DRY-RUN' if dry else 'COMMIT'} ===\n")

    for city_slug, faqs in CITY_FAQS.items():
        # Fetch city row
        rows = sb.table("cities").select("id,name,slug,city_faq_override").eq("slug", city_slug).execute().data
        if not rows:
            print(f"  MISS  city slug={city_slug} not found in DB")
            continue

        city = rows[0]
        existing = city.get("city_faq_override")

        if existing:
            print(f"  SKIP  {city['name']} — already has {len(existing)} override FAQs")
            continue

        print(f"  {'WOULD SET' if dry else 'UPDATE   '} {city['name']} — {len(faqs)} FAQs")
        for f in faqs:
            print(f"    Q: {f['question'][:70]}...")

        if not dry:
            sb.table("cities").update({"city_faq_override": faqs}).eq("id", city["id"]).execute()

    print("\nDone.")


if __name__ == "__main__":
    main()
