import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Datenschutzerklärung von KranVergleich.de — Informationen zur Verarbeitung personenbezogener Daten.',
  alternates: { canonical: '/datenschutz' },
  openGraph: {
    title: 'Datenschutzerklärung',
    description: 'Datenschutzerklärung von KranVergleich.de — Informationen zur Verarbeitung personenbezogener Daten.',
    type: 'website',
    url: '/datenschutz',
  },
}

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

      <div className="prose prose-sm max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-semibold">1. Datenschutz auf einen Blick</h2>

          <h3 className="text-lg font-medium mt-4">Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
            sind alle Daten, mit denen Sie persönlich identifiziert werden können.
          </p>

          <h3 className="text-lg font-medium mt-4">Datenerfassung auf dieser Website</h3>
          <p>
            <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
            Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
          </p>

          <p>
            <strong>Wie erfassen wir Ihre Daten?</strong><br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann
            es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten
            werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
            allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des
            Seitenaufrufs).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">2. Hosting</h2>
          <p>
            Unsere Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
            USA (&quot;Vercel&quot;) gehostet. Vercel ist eine Cloud-Plattform, über die wir unsere Website
            bereitstellen. Wenn Sie unsere Website besuchen, werden die für den technischen Aufruf
            notwendigen Zugriffsdaten (IP-Adresse, Datum und Uhrzeit des Zugriffs, Browser-Typ
            und -Version, Betriebssystem, Referrer URL) von Vercel verarbeitet.
          </p>
          <p>
            Die Datenverarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer
            sicheren und effizienten Bereitstellung unserer Website gemäß Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Da Vercel ein US-amerikanisches Unternehmen ist, kann es zu einer Übermittlung
            personenbezogener Daten in die USA kommen. Wir weisen darauf hin, dass in den USA kein
            mit der EU vergleichbares Datenschutzniveau garantiert werden kann. Wir haben mit Vercel
            einen Auftragsverarbeitungsvertrag (DPA) abgeschlossen, der die Standardvertragsklauseln
            (SCCs) der EU-Kommission gemäß Art. 46 Abs. 2 lit. c DSGVO enthält.
          </p>
          <p>
            Die Datenschutzerklärung von Vercel finden Sie unter:{' '}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              https://vercel.com/legal/privacy-policy
            </a>
            <br />
            Das DPA von Vercel ist abrufbar unter:{' '}
            <a href="https://vercel.com/legal/dpa" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              https://vercel.com/legal/dpa
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">3. Allgemeine Hinweise und Pflichtinformationen</h2>

          <h3 className="text-lg font-medium mt-4">Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
            behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung.
          </p>

          <h3 className="text-lg font-medium mt-4">Hinweis zur verantwortlichen Stelle</h3>
          <p>
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
            Christoph Jonetzko<br />
            [ADRESSE]<br />
            E-Mail: [EMAIL]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">4. Datenerfassung auf dieser Website</h2>

          <h3 className="text-lg font-medium mt-4">Kontaktformular / Angebotsanfrage</h3>
          <p>
            Wenn Sie uns per Kontaktformular eine Anfrage zukommen lassen, werden Ihre Angaben aus
            dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
            Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert und an
            die von Ihnen ausgewählten Kranvermietungsunternehmen weitergeleitet. Diese Daten geben
            wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
            sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
            vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
            Verarbeitung auf unserem berechtigten Interesse (Art. 6 Abs. 1 lit. f DSGVO) oder auf
            Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
          </p>
          <p>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
            Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
            Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen — insbesondere
            Aufbewahrungsfristen — bleiben unberührt.
          </p>

          <p><strong>Folgende Daten werden im Kontaktformular erfasst:</strong></p>
          <ul className="list-disc list-inside">
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer (optional)</li>
            <li>Stadt / Einsatzort</li>
            <li>Projektbeschreibung (optional)</li>
            <li>Wunschtermin (optional)</li>
            <li>Mietdauer (optional)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">5. Datenbank</h2>
          <p>
            Wir verwenden Supabase Inc., 970 Toa Payoh North #07-04, Singapore 318992 als
            Datenbank-Dienst. Die Daten werden auf Servern in der EU (Frankfurt, Deutschland)
            gespeichert. Supabase verarbeitet Daten im Einklang mit der DSGVO. Wir haben mit
            Supabase einen Auftragsverarbeitungsvertrag abgeschlossen.
          </p>
          <p>
            Weitere Informationen:{' '}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              https://supabase.com/privacy
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">6. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht:</p>
          <ul className="list-disc list-inside">
            <li>Auskunft über Ihre gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
            <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
            <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
            <li>Der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
            <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
          </ul>
          <p>
            Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns
            wenden (Kontaktdaten siehe Impressum).
          </p>
          <p>
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
            Ihrer personenbezogenen Daten zu beschweren.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">7. Herkunft der Firmendaten</h2>
          <p>
            Die auf dieser Website dargestellten Firmendaten (Name, Adresse, Telefonnummer,
            Bewertungen) stammen aus öffentlich zugänglichen Quellen, insbesondere aus Google Maps
            (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Die Daten werden
            über den Dienst Outscraper erhoben und regelmäßig aktualisiert.
          </p>
          <p>
            Wenn Sie als Firmeninhaber die Löschung oder Korrektur Ihrer Daten wünschen, wenden Sie
            sich bitte an impressum@kranvergleich.de.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">8. Cookies</h2>
          <p>
            Diese Website verwendet derzeit keine Cookies für Tracking oder Analyse.
            Es werden lediglich technisch notwendige Cookies eingesetzt, die für den Betrieb
            der Website erforderlich sind.
          </p>
        </section>

        <div className="border-t pt-4 mt-8">
          <p className="text-xs text-muted-foreground">
            Stand: März 2026
          </p>
        </div>
      </div>
    </div>
  )
}
