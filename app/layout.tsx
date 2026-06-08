import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
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
    <html lang="fr" className={inter.variable}>
      <body>
        <QueryProvider>
          <LoadingScreen />
          <LenisProvider />
          <Navbar />
          <PageTransition>
            <main style={{ paddingTop: 'var(--nav-h)' }}>{children}</main>
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
