import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQSection } from '@/components/faq-section'

export const metadata: Metadata = {
  title: 'Kran mieten: 7 Tipps für Bauunternehmer — Geld & Zeit sparen',
  description:
    'Kran mieten leicht gemacht: 7 Praxis-Tipps für Bauunternehmer. So sparen Sie bei der Kranmiete, vermeiden Fehler und finden den richtigen Anbieter.',
  alternates: { canonical: '/ratgeber/kran-mieten-tipps' },
}

const tips = [
  {
    title: '1. Mehrere Angebote vergleichen',
    content: 'Preisunterschiede von 30-50% zwischen Anbietern sind keine Seltenheit. Holen Sie mindestens 3 Angebote ein — am einfachsten über unsere kostenlose Sammelanfrage. Achten Sie auf: Ist der Kranführer inklusive? Ist der Transport enthalten? Gibt es eine Mindestmietdauer?',
    cta: { text: 'Jetzt kostenlos Angebote vergleichen', href: '/' },
  },
  {
    title: '2. Den richtigen Krantyp wählen — nicht zu groß',
    content: 'Der häufigste Fehler: einen zu großen Kran mieten. Ein 100-Tonnen-Autokran für eine 5-Tonnen-Last kostet dreimal so viel wie nötig. Definieren Sie vor der Anfrage: maximales Lastgewicht, benötigte Hakenhöhe und Ausladung (Reichweite). Der Vermieter berechnet dann den passenden Kran.',
    cta: { text: 'Welchen Kran brauche ich?', href: '/ratgeber/welchen-kran-brauche-ich' },
  },
  {
    title: '3. Frühzeitig buchen — besonders in der Saison',
    content: 'Von März bis Oktober sind Krane stark nachgefragt. Wer kurzfristig bucht, zahlt Aufschläge oder findet keinen Anbieter. Planen Sie die Kranmiete mindestens 2-4 Wochen im Voraus. Für Baukrane (Turmdrehkrane) mit Montage: 4-8 Wochen Vorlauf einplanen.',
  },
  {
    title: '4. Zugänglichkeit der Baustelle prüfen',
    content: 'Bevor Sie den Kran bestellen: Prüfen Sie die Zufahrt (Breite, Tragfähigkeit der Straße, Leitungen). Informieren Sie den Vermieter über: Zufahrtsbreite, Bodenbeschaffenheit (befestigt/unbefestigt), Höhe von Oberleitungen, Nähe zu Gebäuden. Ein Autokran braucht min. 3m Zufahrt, ein Minikran passt durch 80cm.',
  },
  {
    title: '5. Genehmigungen rechtzeitig beantragen',
    content: 'Steht der Kran auf öffentlichem Grund (Straße, Gehweg)? Dann brauchen Sie eine Sondernutzungserlaubnis vom Ordnungsamt. Kosten: 50-300€, Bearbeitungszeit: 1-3 Wochen. Viele Kranvermieter helfen bei der Antragstellung — fragen Sie nach.',
  },
  {
    title: '6. Wochenmieteprice nutzen statt Tagesprice',
    content: 'Brauchen Sie den Kran 3+ Tage? Fragen Sie nach dem Wochenpreis — er ist pro Tag deutlich günstiger als der Tagespreis. Beispiel Minikran: 250€/Tag vs. 1.200€/Woche (= 171€/Tag). Bei Baukranen lohnt sich sogar der Monatspreis ab 2 Wochen Einsatz.',
    cta: { text: 'Preisübersicht alle Krantypen', href: '/kran-mieten-preise' },
  },
  {
    title: '7. Einsatz gut planen — Wartezeiten vermeiden',
    content: 'Autokrane werden oft stundenweise abgerechnet (150-350€/h). Jede Stunde Wartezeit kostet bares Geld. Planen Sie: Material vorher bereitlegen, Anschlagmittel vorbereiten, Einbauort freiräumen. Ein gut vorbereiteter 4-Stunden-Einsatz ist günstiger als ein chaotischer 8-Stunden-Einsatz.',
  },
]

const faqs = [
  {
    question: 'Wie weit im Voraus sollte man einen Kran mieten?',
    answer: 'Für Autokrane 2-4 Wochen, für Baukrane 4-8 Wochen. In der Hochsaison (März-Oktober) eher länger. Minikrane und Dachdeckerkrane sind oft kurzfristiger verfügbar (1-2 Wochen).',
  },
  {
    question: 'Was muss ich als Mieter bei der Kranmiete beachten?',
    answer: 'Prüfen Sie: Zufahrt und Aufstellfläche, Bodentragfähigkeit, Genehmigungen (Straßensperrung), Versicherung (Maschinenbruchversicherung), Einweisung bei Selbstbedienung. Der Vermieter hilft bei der Planung.',
  },
  {
    question: 'Wer haftet bei Schäden am Mietkran?',
    answer: 'Grundsätzlich haftet der Mieter für Schäden am Kran während der Mietzeit (außer bei normalem Verschleiß). Eine Maschinenbruchversicherung (oft im Mietpreis enthalten oder optional buchbar) schützt vor hohen Kosten. Klären Sie dies VOR der Miete.',
  },
  {
    question: 'Kann ich einen Kran auch am Wochenende mieten?',
    answer: 'Ja, die meisten Vermieter liefern auch samstags. Sonntags und feiertags sind Hebearbeiten in Wohngebieten oft verboten (Lärmschutz). Preisaufschlag fürs Wochenende: meist 20-30%.',
  },
]

export default function KranMietenTippsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-[13px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-gray-600">Startseite</Link>
        <span className="mx-1.5">/</span>
        <Link href="/ratgeber/welchen-kran-brauche-ich" className="hover:text-gray-600">Ratgeber</Link>
        <span className="mx-1.5">/</span>
        <span className="text-gray-900">7 Tipps zur Kranmiete</span>
      </nav>

      <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-3">
        Kran mieten: 7 Tipps für Bauunternehmer
      </h1>
      <p className="text-[15px] text-gray-500 mb-8 max-w-3xl">
        So sparen Sie bei der Kranmiete Geld und Zeit. Praktische Tipps aus der Baupraxis —
        vom richtigen Krantyp über Genehmigungen bis zur optimalen Einsatzplanung.
      </p>

      <div className="space-y-6 mb-10">
        {tips.map((tip) => (
          <section key={tip.title} className="border border-gray-200 rounded-lg p-5">
            <h2 className="font-semibold text-[15px] text-gray-900 mb-2">{tip.title}</h2>
            <p className="text-[14px] text-gray-600 leading-relaxed">{tip.content}</p>
            {tip.cta && (
              <Link href={tip.cta.href} className="inline-block mt-3 text-[13px] text-blue-600 hover:underline">
                {tip.cta.text} &rarr;
              </Link>
            )}
          </section>
        ))}
      </div>

      <FAQSection faqs={faqs} craneTypeName="Kran" />
    </div>
  )
}
