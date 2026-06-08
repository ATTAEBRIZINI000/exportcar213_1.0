import Link from 'next/link'
import HeroCarousel from '@/components/HeroCarousel'
import MarqueeStrip from '@/components/MarqueeStrip'
import VehicleGrid from '@/components/VehicleGrid'
import FilteredCarousel from '@/components/FilteredCarousel'
import StatsBand from '@/components/StatsBand'
import ReviewsTrack from '@/components/ReviewsTrack'
import vehiclesData from '@/lib/vehicles.json'

export const metadata = {
  title: 'Export Car 213 — Spécialiste Export Auto Algérie & Tunisie',
}

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MarqueeStrip />

      {/* ═══ VEHICLES GRID ═══════════════════════════════════════ */}
      <VehicleGrid vehicles={vehiclesData} />

      {/* ═══ STATS ═══════════════════════════════════════════════ */}
      <StatsBand />

      {/* ═══ FILTERED CAROUSEL ════════════════════════════════════ */}
      <FilteredCarousel vehicles={vehiclesData} />

      {/* ═══ CONCESSIONS ══════════════════════════════════════════ */}
      <section id="concessions">
        <div className="container">
          <div className="section-head fade-up">
            <p className="label">Nos concessions</p>
            <h2 className="section-title bc">Deux showrooms<br/><em>à votre service</em></h2>
          </div>

          <div className="concessions-grid">
            <div className="concession-card fade-up">
              <div className="concession-number">92</div>
              <div className="concession-city bc">Paris</div>
              <div className="concession-dept">Nanterre · Hauts-de-Seine (92)</div>
              <p className="concession-desc">Notre concession principale, au cœur de la région parisienne. Accès facile depuis toute l&apos;Île-de-France.</p>
              <div className="concession-hours">
                <div className="concession-hour-row"><span className="day">Lundi – Vendredi</span><span className="hours">9h00 – 19h00</span></div>
                <div className="concession-hour-row"><span className="day">Samedi</span><span className="hours">9h00 – 18h00</span></div>
                <div className="concession-hour-row"><span className="day">Dimanche</span><span className="hours">Sur rendez-vous</span></div>
              </div>
              <div className="concession-actions">
                <Link href="/contact" className="btn-primary">Prendre rendez-vous</Link>
                <a href="https://maps.google.com/?q=45+avenue+Georges+Clemenceau+92000+Nanterre" target="_blank" rel="noopener" className="btn-ghost">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Itinéraire
                </a>
              </div>
            </div>

            <div className="concession-card fade-up" style={{ transitionDelay: '0.15s' }}>
              <div className="concession-number">14</div>
              <div className="concession-city bc">Caen</div>
              <div className="concession-dept">Calvados (14) · Normandie</div>
              <p className="concession-desc">Notre concession normande, idéalement située pour la clientèle du nord-ouest de la France.</p>
              <div className="concession-hours">
                <div className="concession-hour-row"><span className="day">Lundi – Vendredi</span><span className="hours">9h00 – 19h00</span></div>
                <div className="concession-hour-row"><span className="day">Samedi</span><span className="hours">9h00 – 18h00</span></div>
                <div className="concession-hour-row"><span className="day">Dimanche</span><span className="hours">Sur rendez-vous</span></div>
              </div>
              <div className="concession-actions">
                <Link href="/contact" className="btn-primary">Prendre rendez-vous</Link>
                <a href="https://maps.google.com/?q=Caen+14000" target="_blank" rel="noopener" className="btn-ghost">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                  Itinéraire
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ REVIEWS ══════════════════════════════════════════════ */}
      <ReviewsTrack />
    </>
  )
}
