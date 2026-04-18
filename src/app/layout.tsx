import type { Metadata } from 'next'
import { Fraunces, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
  style: ['normal', 'italic'],
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jb-mono',
  display: 'swap',
})

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
      className={`h-full antialiased ${fraunces.variable} ${jbMono.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
