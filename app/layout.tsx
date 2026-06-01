import type { Metadata } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import CookieBanner from '@/components/CookieBanner'
import FadeUpObserver from '@/components/FadeUpObserver'
import LenisProvider from '@/components/LenisProvider'
import PageTransition from '@/components/PageTransition'
import QueryProvider from '@/components/QueryProvider'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-barlow',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Export Car 213 — Spécialiste Export Auto Algérie & Tunisie',
  description: 'Export Car 213 — Spécialiste export auto vers l\'Algérie et la Tunisie. 500+ véhicules neufs et d\'occasion. Concessions à Nanterre (92) et Caen (14).',
  openGraph: {
    title: 'Export Car 213 — Votre voiture, votre pays',
    description: 'Spécialiste export automobile vers l\'Algérie et la Tunisie depuis la France.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body>
        <QueryProvider>
          <LenisProvider />
          <Navbar />
          <PageTransition>
            <main>{children}</main>
          </PageTransition>
          <Footer />
          <WhatsAppFloat />
          <CookieBanner />
          <FadeUpObserver />
        </QueryProvider>
      </body>
    </html>
  )
}
