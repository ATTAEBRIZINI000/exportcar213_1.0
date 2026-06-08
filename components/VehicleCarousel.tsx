'use client'

import { useCallback, useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import type { Vehicle } from './CarCard'

const BADGE: Record<string, { label: string; cls: string }> = {
  neuf:       { label: 'Neuf',        cls: 'ccb-neuf' },
  nouveau:    { label: 'Nouveauté',   cls: 'ccb-nouveau' },
  occasion:   { label: 'Occasion',    cls: 'ccb-occasion' },
  bestseller: { label: 'Best Seller', cls: 'ccb-bestseller' },
}

function fmt(km: number) {
  return km === 0 ? '0 km' : km.toLocaleString('fr-FR') + ' km'
}

export default function VehicleCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
  })

  const pausedRef = useRef(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => {
      if (!pausedRef.current) emblaApi.scrollNext()
    }, 3500)
    return () => clearInterval(id)
  }, [emblaApi])

  return (
    <section id="vehicles">
      <div className="container vc-head fade-up">
        <div>
          <p className="label">Notre stock</p>
          <h2 className="vc-carousel-title">Nos véhicules</h2>
        </div>
        <Link href="/inventaire" className="vc-see-all">
          Voir tout l&apos;inventaire
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      <div
        className="vc-viewport"
        ref={emblaRef}
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false }}
      >
        <div className="vc-track">
          {vehicles.map((v, i) => {
            const badge = BADGE[v.badge] ?? BADGE.neuf
            return (
              <div key={v.id} className="vc-slide" style={{ animationDelay: `${i * 0.055}s` }}>
                <Link href={`/vehicules/${v.id}`} className="vc-car-card">
                  <div className="vc-car-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/assets/${v.img}`} alt={`${v.brand} ${v.name}`} loading="lazy" />
                    <span className={`vc-car-badge ${badge.cls}`}>{badge.label}</span>
                  </div>
                  <div className="vc-car-body">
                    <p className="vc-car-brand">{v.brand}</p>
                    <h3 className="vc-car-name">{v.name}</h3>
                    <p className="vc-car-specs">{v.year} · {fmt(v.km)} · {v.fuel}</p>
                    <p className="vc-car-price">{v.price.toLocaleString('fr-FR')} <span>€</span></p>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      <div className="container vc-controls fade-up">
        <button onClick={scrollPrev} className="vc-arrow-btn" aria-label="Précédent">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <button onClick={scrollNext} className="vc-arrow-btn" aria-label="Suivant">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
