'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import type { Vehicle } from '@/components/CarCard'

const badgeMap: Record<string, [string, string]> = {
  neuf:       ['badge-neuf',       'Neuf'],
  nouveau:    ['badge-nouveau',    'Nouveauté'],
  occasion:   ['badge-occasion',   'Occasion'],
  bestseller: ['badge-bestseller', 'Best Seller'],
}

const BRANDS = ['Renault', 'Peugeot', 'Volkswagen', 'Dacia', 'Toyota', 'Mercedes', 'BMW', 'Audi', 'Cupra', 'GAC Motor']

export default function InventaireClient({ vehicles }: { vehicles: Vehicle[] }) {
  const params = useSearchParams()
  const urlType = params.get('type') || 'all'

  const [activeType,  setActiveType]  = useState(urlType)
  const [activeBrand, setActiveBrand] = useState('all')
  const [maxPrice,    setMaxPrice]    = useState(50000)
  const [sort,        setSort]        = useState('default')

  const sliderRef = useRef<HTMLInputElement>(null)
  const [priceLabel, setPriceLabel] = useState('50 000 €')

  useEffect(() => {
    updateSliderTrack()
  })

  function updateSliderTrack() {
    const slider = sliderRef.current
    if (!slider) return
    const pct = (parseInt(slider.value) - 5000) / (50000 - 5000) * 100
    slider.style.background = `linear-gradient(to right, var(--green) ${pct}%, var(--gray-lt) ${pct}%)`
  }

  const filtered = vehicles
    .filter(v => activeType === 'all' || v.type === activeType)
    .filter(v => activeBrand === 'all' || v.brand === activeBrand)
    .filter(v => v.price <= maxPrice)
    .sort((a, b) => {
      if (sort === 'price-asc')  return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'year-desc')  return b.year - a.year
      return 0
    })

  const reset = () => {
    setActiveType('all')
    setActiveBrand('all')
    setMaxPrice(50000)
    setSort('default')
    setPriceLabel('50 000 €')
    if (sliderRef.current) sliderRef.current.value = '50000'
  }

  const headerLabel = urlType === 'neuf' ? 'neufs' : urlType === 'occasion' ? "d'occasion" : 'disponibles'
  const breadcrumb  = urlType === 'neuf' ? 'Véhicules Neufs' : urlType === 'occasion' ? 'Véhicules Occasion' : 'Véhicules'

  return (
    <>
      {/* PAGE HEADER */}
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

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="container">
          <div className="filter-bar-inner">

            {/* Type */}
            <div className="filter-row">
              <span className="filter-row-label">Type</span>
              <div className="filter-row-pills" role="group" aria-label="Type de véhicule">
                {[['all','Tous'],['neuf','Véhicules Neufs'],['occasion','Véhicules Occasion']].map(([val, lbl]) => (
                  <button
                    key={val}
                    className={`pill pill-type${activeType === val ? ' active' : ''}`}
                    aria-pressed={activeType === val}
                    onClick={() => setActiveType(val)}
                  >{lbl}</button>
                ))}
              </div>
            </div>

            {/* Brand */}
            <div className="filter-row">
              <span className="filter-row-label">Marque</span>
              <div className="filter-row-pills" role="group" aria-label="Marque">
                <button
                  className={`pill pill-brand${activeBrand === 'all' ? ' active' : ''}`}
                  onClick={() => setActiveBrand('all')}
                >Toutes les marques</button>
                {BRANDS.map(b => (
                  <button
                    key={b}
                    className={`pill pill-brand${activeBrand === b ? ' active' : ''}`}
                    onClick={() => setActiveBrand(b)}
                  >{b}</button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="filter-row price-row">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '560px', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div className="price-header">
                    <span className="price-desc">Budget max :</span>
                    <span className="price-display">Jusqu&apos;à <em>{priceLabel}</em></span>
                  </div>
                </div>
                <button className="filter-reset-btn" onClick={reset} aria-label="Réinitialiser les filtres">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                  </svg>
                  Réinitialiser
                </button>
              </div>
              <div className="range-wrap">
                <input
                  ref={sliderRef}
                  type="range"
                  min="5000" max="50000" step="500"
                  defaultValue="50000"
                  aria-label="Budget maximum"
                  onChange={e => {
                    const v = parseInt(e.target.value)
                    setMaxPrice(v)
                    setPriceLabel(v.toLocaleString('fr-FR') + ' €')
                  }}
                />
                <div className="range-limits"><span>5 000 €</span><span>50 000 €</span></div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="results-section">
        <div className="container">
          <div className="results-bar">
            <p className="results-count"><strong>{filtered.length}</strong> véhicules trouvés</p>
            <select
              className="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
              aria-label="Trier les résultats"
            >
              <option value="default">Trier par défaut</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="year-desc">Plus récent</option>
            </select>
          </div>

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
                <Link key={v.id} href={`/vehicules/${v.id}`} className="vehicle-card" style={{ textDecoration: 'none', display: 'block' }}>
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
          <div style={{ height: '80px' }}></div>
        </div>
      </div>
    </>
  )
}
