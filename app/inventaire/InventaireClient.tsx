'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { Vehicle } from '@/components/CarCard'
import DarkFilterPanel, {
  DEFAULT_FILTERS,
  type FiltersState,
  type VehicleForFilter,
  matchesVehicle,
} from '@/components/DarkFilterPanel'

/* ── Badge map (unchanged) ── */
const badgeMap: Record<string, [string, string]> = {
  neuf:       ['badge-neuf',       'Neuf'       ],
  nouveau:    ['badge-nouveau',    'Nouveauté'  ],
  occasion:   ['badge-occasion',   'Occasion'   ],
  bestseller: ['badge-bestseller', 'Best Seller'],
}

/* ── Extended vehicle type (color + doors + gearbox from JSON) ── */
type VehicleExt = Vehicle & { color?: string; doors?: string; gearbox?: string }

export default function InventaireClient({ vehicles }: { vehicles: VehicleExt[] }) {
  const params  = useSearchParams()
  const urlType = params.get('type') || 'all'

  /* All filter state — local useState as specified */
  const [filters, setFilters] = useState<FiltersState>(() => ({ ...DEFAULT_FILTERS }))

  function handleChange(key: keyof FiltersState, value: string) {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS)
  }

  /* ── URL-based condition pre-filter (neuf/occasion from ?type=) ── */
  const conditionFiltered = urlType === 'all'
    ? vehicles
    : vehicles.filter(v => v.type === urlType)

  /* ── AND-logic filtering via matchesVehicle ── */
  const filtered = conditionFiltered
    .filter(v => matchesVehicle(v as VehicleForFilter, filters))
    .sort((a, b) => {
      if (filters.sort === 'price-asc')  return a.price - b.price
      if (filters.sort === 'price-desc') return b.price - a.price
      if (filters.sort === 'year-desc')  return b.year  - a.year
      return 0
    })

  const headerLabel = urlType === 'neuf' ? 'neufs' : urlType === 'occasion' ? "d'occasion" : 'disponibles'
  const breadcrumb  = urlType === 'neuf' ? 'Véhicules Neufs' : urlType === 'occasion' ? 'Véhicules Occasion' : 'Véhicules'

  /* Key changes whenever any filter changes → AnimatePresence rerenders */
  const resultsKey = Object.values(filters).join('-')

  return (
    <>
      {/* ── PAGE HEADER (unchanged) ── */}
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link>
            <span style={{ opacity: 0.4 }}>›</span>
            <span>{breadcrumb}</span>
          </div>
          <h1 className="page-title bc">Véhicules <em>{headerLabel}</em></h1>
          <p className="page-subtitle">500+ véhicules prêts à l&apos;export vers l&apos;Algérie et la Tunisie</p>
        </div>
      </div>

      {/* ── FILTER PANEL ── */}
      <div className="bg-exportcar-surface-secondary pt-4 pb-6">
        <div className="container">
          <DarkFilterPanel
            vehicles={vehicles as VehicleForFilter[]}
            filters={filters}
            onChange={handleChange}
            onReset={handleReset}
            resultCount={filtered.length}
          />
        </div>
      </div>

      {/* ── VEHICLE GRID (cards untouched, AnimatePresence on container) ── */}
      <div style={{ padding: '32px 0 80px' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={resultsKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="vehicle-grid">
                {filtered.length === 0 ? (
                  <div className="empty-state">
                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <p>Aucun véhicule trouvé</p>
                    <span>Élargissez vos filtres ou réinitialisez</span>
                  </div>
                ) : filtered.map(v => {
                  const [badgeClass, badgeLabel] = badgeMap[v.badge] ?? ['badge-neuf', 'Neuf']
                  return (
                    <Link
                      key={v.id}
                      href={`/vehicules/${v.id}`}
                      className="vehicle-card"
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <div className="vehicle-card-img">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/assets/${v.img}`} alt={`${v.brand} ${v.name}`} loading="lazy" />
                        <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
                      </div>
                      <div className="vehicle-card-body">
                        <p className="vehicle-brand">{v.brand}</p>
                        <h3 className="vehicle-name bc">{v.name}</h3>
                        <div className="vehicle-specs">
                          <span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            {v.year}
                          </span>
                          <span>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                            {v.km === 0 ? '0 km' : v.km.toLocaleString('fr-FR') + ' km'}
                          </span>
                          <span>{v.fuel}</span>
                        </div>
                        <div className="vehicle-price-row">
                          <div>
                            <p className="vehicle-price-label">Prix export</p>
                            <p className="vehicle-price">{v.price.toLocaleString('fr-FR')} €</p>
                          </div>
                          <div className="vehicle-arrow">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
