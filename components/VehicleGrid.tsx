'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { Vehicle } from './CarCard'

const FILTERS = [
  { id: 'bestseller', label: 'Best Sellers' },
  { id: 'nouveautes', label: 'Nouveautés' },
]

/* ── Badge definitions ─────────────────────────────────────── */

// Featured card badge: always top-right, white pill + dark text
const FEATURED_BADGE: Record<string, string> = {
  neuf:       'Neuf',
  nouveau:    'Nouveauté',
  occasion:   'Occasion',
  bestseller: 'Best Seller',
}

// Grid card badge classes (top-left on photo)
const GRID_BADGE: Record<string, { label: string; cls: string }> = {
  neuf:       { label: 'Neuf',        cls: 'bg-white text-[#0A0F1C] font-bold' },
  nouveau:    { label: 'Nouveauté',   cls: 'bg-accent text-white' },
  occasion:   { label: 'Occasion',    cls: 'bg-transparent border border-white/60 text-white' },
  bestseller: { label: 'Best Seller', cls: 'bg-accent text-white' },
}

function fmt(km: number) {
  return km === 0 ? '0 km' : km.toLocaleString('fr-FR') + ' km'
}

/* ── Shared animation variant ──────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: '-30px' },
  transition: { delay, duration: 0.42, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

export default function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  const [active, setActive] = useState('bestseller')

  const filtered = vehicles.filter(v => {
    if (active === 'bestseller') return v.badge === 'bestseller'
    if (active === 'nouveautes') return v.isNew || v.badge === 'nouveau'
    return true
  })

  return (
    <section id="vehicles" className="py-28 bg-[#0A0F1C] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8">

        {/* ── Header (untouched) ── */}
        <div className="mb-14 fade-up">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-accent mb-3">
            Notre stock
          </p>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-bold tracking-tight text-white leading-none">
            Nos véhicules
          </h2>
        </div>

        {/* ── Filter pills (untouched) ── */}
        <div className="flex justify-center gap-3 mb-14 fade-up">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={[
                'px-8 py-3 rounded-full text-[15px] font-medium transition-all duration-200 cursor-pointer',
                active === f.id
                  ? 'bg-accent text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                  : 'bg-transparent text-white/60 border border-white/15 hover:text-white hover:border-white/35',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Cards grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {filtered.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 text-white/25 text-sm"
              >
                Aucun véhicule dans cette catégorie.
              </motion.p>
            ) : (() => {
              const [featured, ...rest] = filtered
              return (
                <div className="flex flex-col gap-5">

                  {/* ══ FEATURED CARD — full width ══════════════════════════ */}
                  <motion.div {...fadeUp(0)}>
                    <Link href={`/vehicules/${featured.id}`} className="group block h-[480px] rounded-[20px] overflow-hidden relative">

                      {/* Photo */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/assets/${featured.img}`}
                        alt={`${featured.brand} ${featured.name}`}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                        loading="eager"
                      />

                      {/* Base overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-500" />

                      {/* Bottom gradient for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Badge — top right */}
                      <span className="absolute top-5 right-5 bg-white text-[#0A0F1C] text-[10px] font-bold tracking-[0.09em] uppercase px-3 py-1.5 rounded-full">
                        {FEATURED_BADGE[featured.badge] ?? 'Neuf'}
                      </span>

                      {/* Content — bottom left */}
                      <div className="absolute bottom-0 left-0 p-8 md:p-10">
                        <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/55 mb-2">
                          Sélection du moment
                        </p>
                        <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/50 mb-1">
                          {featured.brand}
                        </p>
                        <h2 className="text-[36px] font-bold tracking-tight text-white leading-tight mb-2">
                          {featured.name}
                        </h2>
                        <p className="text-[13px] text-white/55 mb-6">
                          {featured.year} · {fmt(featured.km)} · {featured.fuel}
                        </p>
                        <div className="flex items-center gap-5">
                          <p className="text-[24px] font-medium text-white">
                            {featured.price.toLocaleString('fr-FR')} <span className="text-[16px] font-normal text-white/70">€</span>
                          </p>
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/50 text-white text-[14px] font-medium group-hover:bg-white group-hover:text-[#0A0F1C] transition-all duration-300">
                            Découvrir
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </span>
                        </div>
                      </div>

                    </Link>
                  </motion.div>

                  {/* ══ GRID CARDS — remaining vehicles ════════════════════ */}
                  {rest.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {rest.map((v, i) => {
                        const badge = GRID_BADGE[v.badge] ?? GRID_BADGE.neuf
                        return (
                          <motion.div key={v.id} {...fadeUp((i + 1) * 0.08)}>
                            <Link href={`/vehicules/${v.id}`} className="group block min-h-[420px]">
                              <div className="min-h-[420px] rounded-2xl overflow-hidden bg-gray-900 border border-white/[0.06] flex flex-col transition-transform duration-300 group-hover:-translate-y-[5px]">

                                {/* Photo — 62% of 420px ≈ 260px */}
                                <div className="relative h-[260px] flex-shrink-0 overflow-hidden">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={`/assets/${v.img}`}
                                    alt={`${v.brand} ${v.name}`}
                                    className="w-full h-full object-cover object-center transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.06]"
                                    loading="lazy"
                                  />
                                  <span className={`absolute top-3 left-3 text-[10px] tracking-[0.07em] uppercase px-3 py-1 rounded-full ${badge.cls}`}>
                                    {badge.label}
                                  </span>
                                </div>

                                {/* Body */}
                                <div className="flex-1 p-5 flex flex-col bg-gray-900">
                                  <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-white/35 mb-1">
                                    {v.brand}
                                  </p>
                                  <h3 className="text-[18px] font-semibold text-white tracking-tight leading-snug mb-2">
                                    {v.name}
                                  </h3>
                                  <p className="text-[12px] text-white/40 mb-auto pb-4">
                                    {v.year} · {fmt(v.km)} · {v.fuel}
                                  </p>
                                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                                    <p className="text-[20px] font-medium text-white">
                                      {v.price.toLocaleString('fr-FR')} <span className="text-[13px] font-normal text-white/50">€</span>
                                    </p>
                                    <span className="text-[18px] text-white/25 transition-all duration-200 group-hover:text-white/70 group-hover:translate-x-0.5 inline-block">
                                      →
                                    </span>
                                  </div>
                                </div>

                              </div>
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  )}

                </div>
              )
            })()}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA (untouched) ── */}
        <div className="text-center mt-16 fade-up">
          <Link
            href="/inventaire"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 group"
          >
            Voir tout l&apos;inventaire
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
