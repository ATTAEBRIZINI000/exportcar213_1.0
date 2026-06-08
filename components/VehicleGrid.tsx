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
  neuf:       { label: 'Neuf',        cls: 'bg-exportcar-green/10 text-exportcar-green border border-exportcar-green/25' },
  nouveau:    { label: 'Nouveauté',   cls: 'bg-exportcar-red/10 text-exportcar-red border border-exportcar-red/25' },
  occasion:   { label: 'Occasion',    cls: 'bg-black/5 text-exportcar-text-secondary border border-exportcar-border' },
  bestseller: { label: 'Best Seller', cls: 'bg-exportcar-red/10 text-exportcar-red border border-exportcar-red/25' },
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
    <section id="vehicles" className="py-28 bg-exportcar-bg overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8">

        {/* ── Header ── */}
        <div className="mb-14 fade-up">
          <p className="flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-exportcar-red mb-4">
            <span className="w-5 h-[2px] bg-exportcar-red rounded-sm flex-shrink-0" />
            Notre stock
          </p>
          <h2 className="text-[clamp(32px,3.8vw,48px)] font-bold tracking-tight text-exportcar-text leading-none">
            Nos véhicules
          </h2>
        </div>

        {/* ── Filter pills ── */}
        <div className="flex justify-center gap-3 mb-14 fade-up">
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={[
                'px-8 py-3 rounded-full text-[15px] font-medium transition-all duration-200 cursor-pointer',
                active === f.id
                  ? 'bg-exportcar-red text-white shadow-[0_0_20px_rgba(204,0,0,0.25)]'
                  : 'bg-transparent text-exportcar-text-secondary border border-exportcar-border hover:text-exportcar-text hover:border-exportcar-text/30',
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
                className="text-center py-20 text-exportcar-text-secondary text-sm"
              >
                Aucun véhicule dans cette catégorie.
              </motion.p>
            ) : (() => {
              const [featured, ...rest] = filtered
              return (
                <div className="flex flex-col gap-5">

                  {/* ══ FEATURED CARD — full width ══════════════════════════ */}
                  <motion.div {...fadeUp(0)}>
                    <Link href={`/vehicules/${featured.id}`} className="group block h-[540px] rounded-[22px] overflow-hidden relative">

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
                      <span className="absolute top-5 right-5 bg-white text-exportcar-text text-[10px] font-bold tracking-[0.09em] uppercase px-3 py-1.5 rounded-full">
                        {FEATURED_BADGE[featured.badge] ?? 'Neuf'}
                      </span>

                      {/* Content — bottom left */}
                      <div className="absolute bottom-0 left-0 p-8 md:p-10">
                        <p className="text-[11px] font-bold tracking-[0.20em] uppercase text-white/50 mb-2">
                          Sélection du moment
                        </p>
                        <p className="text-[12px] font-bold tracking-[0.14em] uppercase text-white/55 mb-1">
                          {featured.brand}
                        </p>
                        <h2 className="text-[42px] font-bold tracking-tight text-white leading-tight mb-2">
                          {featured.name}
                        </h2>
                        <p className="text-[14px] text-white/55 mb-7">
                          {featured.year} · {fmt(featured.km)} · {featured.fuel}
                        </p>
                        <div className="flex items-center gap-5">
                          <p className="text-[28px] font-semibold text-white tracking-tight">
                            {featured.price.toLocaleString('fr-FR')} <span className="text-[17px] font-normal text-white/65">€</span>
                          </p>
                          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 text-white text-[14px] font-semibold tracking-wide group-hover:bg-white group-hover:text-exportcar-text transition-all duration-300">
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
                            <Link href={`/vehicules/${v.id}`} className="group block min-h-[470px]">
                              <div className="min-h-[470px] rounded-[20px] overflow-hidden bg-exportcar-surface border border-exportcar-border flex flex-col transition-all duration-350 group-hover:-translate-y-[7px] shadow-[0_1px_4px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.04)] group-hover:shadow-[0_24px_64px_rgba(0,0,0,0.13),0_0_0_1px_rgba(204,0,0,0.20)] group-hover:border-exportcar-red/20">

                                {/* Photo */}
                                <div className="relative h-[290px] flex-shrink-0 overflow-hidden">
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
                                <div className="flex-1 p-6 flex flex-col bg-exportcar-surface">
                                  <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-exportcar-text-secondary mb-1.5">
                                    {v.brand}
                                  </p>
                                  <h3 className="text-[20px] font-bold text-exportcar-text tracking-tight leading-snug mb-2">
                                    {v.name}
                                  </h3>
                                  <p className="text-[13px] text-exportcar-text-secondary mb-auto pb-4">
                                    {v.year} · {fmt(v.km)} · {v.fuel}
                                  </p>
                                  <div className="flex items-center justify-between pt-4 border-t border-exportcar-border">
                                    <p className="text-[26px] font-bold text-exportcar-red tracking-tight">
                                      {v.price.toLocaleString('fr-FR')} <span className="text-[14px] font-normal text-exportcar-text-secondary">€</span>
                                    </p>
                                    <span className="w-9 h-9 rounded-[9px] border border-exportcar-border flex items-center justify-center text-exportcar-text-secondary/50 transition-all duration-200 group-hover:bg-exportcar-red group-hover:border-exportcar-red group-hover:text-white group-hover:translate-x-0.5">
                                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                      </svg>
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

        {/* ── CTA ── */}
        <div className="text-center mt-16 fade-up">
          <Link
            href="/inventaire"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-exportcar-border text-[15px] font-semibold text-exportcar-text hover:border-exportcar-red hover:text-exportcar-red transition-all duration-250 group shadow-sm hover:shadow-[0_4px_20px_rgba(204,0,0,0.12)]"
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
