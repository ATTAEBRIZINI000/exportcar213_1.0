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
  neuf:       { label: 'Neuf',        cls: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
  nouveau:    { label: 'Nouveauté',   cls: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
  occasion:   { label: 'Occasion',    cls: 'bg-white/10 text-white/70 border border-white/20' },
  bestseller: { label: 'Best Seller', cls: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' },
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
    <section id="filtered-carousel" className="py-28 bg-bg-2">
      <div className="max-w-[1280px] mx-auto px-8">

        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 fade-up">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-accent mb-3">
              Sélection
            </p>
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold tracking-tight text-white leading-none">
              Découvrez notre stock
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 p-1 rounded-xl bg-bg border border-white/[0.07]">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={[
                  'px-5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer',
                  activeTab === t.id
                    ? 'bg-accent text-white'
                    : 'text-white/40 hover:text-white/75',
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
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-2 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-2 to-transparent z-10" />

          {/* Prev arrow */}
          <button
            onClick={scrollPrev}
            aria-label="Précédent"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-full bg-bg border border-white/[0.1] flex items-center justify-center text-white hover:border-white/[0.22] hover:bg-bg-3 transition-all duration-200 cursor-pointer"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </button>

          {/* Next arrow */}
          <button
            onClick={scrollNext}
            aria-label="Suivant"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-full bg-bg border border-white/[0.1] flex items-center justify-center text-white hover:border-white/[0.22] hover:bg-bg-3 transition-all duration-200 cursor-pointer"
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
                    className="flex-[0_0_300px] md:flex-[0_0_320px] min-w-0 mr-4"
                  >
                    <Link href={`/vehicules/${v.id}`} className="group block h-[420px]">
                      <div className="h-full rounded-2xl overflow-hidden bg-bg border border-white/[0.07] flex flex-col transition-all duration-300 group-hover:-translate-y-[6px] group-hover:shadow-[0_24px_64px_rgba(0,0,0,0.55)] group-hover:border-white/[0.12]">

                        {/* Photo */}
                        <div className="relative h-[260px] flex-shrink-0 overflow-hidden bg-bg-3">
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
                        <div className="flex-1 p-5 flex flex-col">
                          <p className="text-[10px] font-bold tracking-[0.13em] uppercase text-white/30 mb-1">
                            {v.brand}
                          </p>
                          <h3 className="text-[16px] font-bold text-white tracking-tight leading-snug mb-2">
                            {v.name}
                          </h3>
                          <p className="text-[12px] text-white/40 mb-auto pb-3">
                            {v.year} · {fmt(v.km)} · {v.fuel}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-white/[0.07]">
                            <p className="text-xl font-bold text-price tracking-tight">
                              {v.price.toLocaleString('fr-FR')}&nbsp;<span className="text-sm font-medium">€</span>
                            </p>
                            <svg
                              className="w-4 h-4 text-white/25 transition-all duration-200 group-hover:text-white/70 group-hover:translate-x-0.5"
                              fill="none" stroke="currentColor" strokeWidth="2.2"
                              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
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
