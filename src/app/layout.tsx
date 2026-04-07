import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'KranVergleich.de — Kranvermietung in Deutschland vergleichen',
    template: '%s | KranVergleich.de',
  },
  description:
    'Kran mieten oder leihen in ganz Deutschland. Kranmiete Preise vergleichen: Minikrane, Autokrane, Dachdeckerkrane, Mobilkrane — Bewertungen und kostenlose Angebote. Mietkran Preisvergleich.',
  metadataBase: new URL('https://kranvergleich.de'),
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'KranVergleich.de',
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
