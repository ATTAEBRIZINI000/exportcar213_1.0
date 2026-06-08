'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import type { Vehicle } from './CarCard'

const TABS = [
  { id: 'neuf',     label: 'Neuf' },
  { id: 'nouveau',  label: 'Nouveauté' },
  { id: 'occasion', label: 'Occasion' },
]

const BADGE: Record<string, { label: string; cls: string }> = {
  neuf:       { label: 'Neuf',        cls: 'bg-[#1A5C2A]/10 text-[#1A5C2A] border border-[#1A5C2A]/25' },
  nouveau:    { label: 'Nouveauté',   cls: 'bg-[#CC0000]/10 text-[#CC0000] border border-[#CC0000]/25' },
  occasion:   { label: 'Occasion',    cls: 'bg-black/5 text-gray-500 border border-black/10' },
  bestseller: { label: 'Best Seller', cls: 'bg-[#CC0000]/10 text-[#CC0000] border border-[#CC0000]/25' },
}

function fmt(km: number) {
  return km === 0 ? '0 km' : km.toLocaleString('fr-FR') + ' km'
}

export default function FilteredCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  const [activeTab, setActiveTab] = useState('neuf')

  const filtered = vehicles.filter(v => {
    if (activeTab === 'neuf')     return v.type === 'neuf'
    if (activeTab === 'nouveau')  return v.isNew || v.badge === 'nouveau'
    if (activeTab === 'occasion') return v.type === 'occasion'
    return true
  })

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: true })

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.reInit()
    emblaApi.scrollTo(0, true)
  }, [activeTab, emblaApi])

  const pausedRef = useRef(false)

  return (
    <section id="filtered-carousel" className="py-28 bg-exportcar-surface-secondary">
      <div className="max-w-[1280px] mx-auto px-8">

        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 fade-up">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-exportcar-red mb-4">
              <span className="w-5 h-[2px] bg-exportcar-red rounded-sm flex-shrink-0" />
              Sélection
            </p>
            <h2 className="text-[clamp(32px,3.8vw,48px)] font-bold tracking-tight text-exportcar-text leading-none">
              Découvrez notre stock
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-exportcar-surface border border-exportcar-border">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={[
                  'px-5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer',
                  activeTab === t.id
                    ? 'bg-exportcar-red text-white'
                    : 'text-exportcar-text-secondary hover:text-exportcar-text',
                ].join(' ')}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel wrapper — relative so arrows can be vertically centered */}
        <div
          className="relative"
          onMouseEnter={() => { pausedRef.current = true }}
          onMouseLeave={() => { pausedRef.current = false }}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-exportcar-surface-secondary to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-exportcar-surface-secondary to-transparent z-10" />

          {/* Prev arrow */}
          <button
            onClick={scrollPrev}
            aria-label="Précédent"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-full bg-exportcar-surface border border-exportcar-border flex items-center justify-center text-exportcar-text hover:border-exportcar-text/30 hover:bg-exportcar-bg transition-all duration-200 cursor-pointer shadow-sm"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={scrollNext}
            aria-label="Suivant"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-full bg-exportcar-surface border border-exportcar-border flex items-center justify-center text-exportcar-text hover:border-exportcar-text/30 hover:bg-exportcar-bg transition-all duration-200 cursor-pointer shadow-sm"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>

          {/* Embla viewport */}
          <div
            ref={emblaRef}
            className="overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div className="flex touch-pan-y select-none py-3">
              {filtered.map(v => {
                const badge = BADGE[v.badge] ?? BADGE.neuf
                return (
                  <div
                    key={v.id}
                    className="flex-[0_0_320px] md:flex-[0_0_340px] min-w-0 mr-5"
                  >
                    <Link href={`/vehicules/${v.id}`} className="group block h-[460px]">
                      <div className="h-full rounded-[20px] overflow-hidden bg-exportcar-surface border border-exportcar-border flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-300 group-hover:-translate-y-[7px] group-hover:shadow-[0_24px_64px_rgba(0,0,0,0.13),0_0_0_1px_rgba(204,0,0,0.20)] group-hover:border-exportcar-red/20">

                        {/* Photo */}
                        <div className="relative h-[280px] flex-shrink-0 overflow-hidden bg-exportcar-surface-secondary">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`/assets/${v.img}`}
                            alt={`${v.brand} ${v.name}`}
                            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                          <span className={`absolute top-3 left-3 text-[10px] font-bold tracking-[0.07em] uppercase px-3 py-1 rounded-full ${badge.cls}`}>
                            {badge.label}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="flex-1 p-6 flex flex-col">
                          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-exportcar-text-secondary mb-1.5">
                            {v.brand}
                          </p>
                          <h3 className="text-[18px] font-bold text-exportcar-text tracking-tight leading-snug mb-2">
                            {v.name}
                          </h3>
                          <p className="text-[13px] text-exportcar-text-secondary mb-auto pb-3">
                            {v.year} · {fmt(v.km)} · {v.fuel}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-exportcar-border">
                            <p className="text-[24px] font-bold text-exportcar-red tracking-tight">
                              {v.price.toLocaleString('fr-FR')}&nbsp;<span className="text-[14px] font-normal text-exportcar-text-secondary">€</span>
                            </p>
                            <span className="w-9 h-9 rounded-[9px] border border-exportcar-border flex items-center justify-center text-exportcar-text-secondary/40 transition-all duration-200 group-hover:bg-exportcar-red group-hover:border-exportcar-red group-hover:text-white group-hover:translate-x-0.5">
                              <svg
                                className="w-4 h-4"
                                fill="none" stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                              >
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                              </svg>
                            </span>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
