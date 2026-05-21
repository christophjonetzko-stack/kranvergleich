import type { Metadata } from 'next'
import { Archivo, Archivo_Narrow, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { KranBerater } from '@/components/kran-berater'
import { SessionEntryRecorder } from '@/components/session-entry-recorder'
import { UtmCapture } from '@/components/utm-capture'
import { BASE_URL, BRAND_NAME, COUNTRY_LABEL, OG_LOCALE } from '@/lib/country'
import { alternatesFor } from '@/lib/alternates'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

const archivoNarrow = Archivo_Narrow({
  subsets: ['latin'],
  variable: '--font-archivo-narrow',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jb-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME}. Kranvermietung in ${COUNTRY_LABEL} vergleichen`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    `Kran mieten oder leihen in ganz ${COUNTRY_LABEL}. Kranmiete Preise vergleichen: Minikrane, Autokrane, Dachdeckerkrane, Mobilkrane. Bewertungen und kostenlose Angebote. Mietkran Preisvergleich.`,
  metadataBase: new URL(BASE_URL),
  // Default hreflang for the home page; static pages override with their own path
  // via `alternatesFor('/path')`. Dynamic city pages do not set languages, they
  // have no cross-country equivalent.
  alternates: alternatesFor('/'),
  openGraph: {
    type: 'website',
    locale: OG_LOCALE,
    siteName: BRAND_NAME,
    // og:image is injected automatically by app/opengraph-image.tsx (Next 16 file
    // convention); listing it here would double-emit. Same for twitter:image via
    // app/twitter-image.tsx. We still set twitter.card so the preview renders as
    // a large card (summary_large_image) instead of the default tiny summary.
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      className={`h-full antialiased ${archivo.variable} ${archivoNarrow.variable} ${jbMono.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <SessionEntryRecorder />
        <UtmCapture />
        <Header />
        <div className="h-1 bg-[#FFD100]" aria-hidden />
        <main className="flex-1">{children}</main>
        <Footer />
        <KranBerater />
      </body>
    </html>
  )
}
