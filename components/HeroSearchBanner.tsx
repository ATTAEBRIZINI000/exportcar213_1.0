'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const BRANDS = ['Cupra', 'GAC Motor', 'Renault', 'Volkswagen']

const MODELS: Record<string, string[]> = {
  Cupra:       ['Formentor', 'Formentor VZ', 'Ateca'],
  'GAC Motor': ['Trumpchi GS3 Enjoy', 'Trumpchi GS5'],
  Renault:     ['Arkana', 'Captur'],
  Volkswagen:  ['T-Roc', 'T-Roc Cabriolet', 'Tiguan 7 Places'],
}

const PRICES = [
  { label: '15 000 €', value: '15000' },
  { label: '20 000 €', value: '20000' },
  { label: '25 000 €', value: '25000' },
  { label: '30 000 €', value: '30000' },
  { label: '35 000 €+', value: '35000' },
]

const TABS = [
  { label: 'Toutes',    value: '' },
  { label: 'Export',    value: 'neuf' },
  { label: 'Occasions', value: 'occasion' },
]

const BODY_TYPES = [
  {
    label: 'Berline',
    value: 'berline',
    icon: (
      <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 17h40M6 17l4-8h18l6 8" />
        <circle cx="13" cy="19" r="3" fill="currentColor" stroke="none" />
        <circle cx="35" cy="19" r="3" fill="currentColor" stroke="none" />
        <path d="M10 9l3-5h14l5 5" />
      </svg>
    ),
  },
  {
    label: 'SUV',
    value: 'suv',
    icon: (
      <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="9" width="40" height="9" rx="2" />
        <path d="M8 9V6h26l6 3" />
        <circle cx="13" cy="20" r="3" fill="currentColor" stroke="none" />
        <circle cx="35" cy="20" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Électrique',
    value: 'electrique',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none" opacity="0.85" />
      </svg>
    ),
  },
  {
    label: '4×4',
    value: '4x4',
    icon: (
      <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="42" height="10" rx="2" />
        <path d="M7 8V5h26l8 3" />
        <rect x="1" y="12" width="4" height="4" rx="1" />
        <rect x="43" y="12" width="4" height="4" rx="1" />
        <circle cx="12" cy="20" r="3.5" fill="currentColor" stroke="none" />
        <circle cx="36" cy="20" r="3.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Utilitaire',
    value: 'utilitaire',
    icon: (
      <svg viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="34" height="13" rx="2" />
        <path d="M36 10h6l4 5v3h-10V10z" />
        <circle cx="11" cy="21" r="3" fill="currentColor" stroke="none" />
        <circle cx="27" cy="21" r="3" fill="currentColor" stroke="none" />
        <circle cx="41" cy="21" r="3" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function HeroSearchBanner() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [price, setPrice] = useState('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [hoveredBody, setHoveredBody] = useState<string | null>(null)

  const availableModels = brand ? MODELS[brand] ?? [] : []

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (activeTab) params.set('type', activeTab)
    if (brand) params.set('brand', brand)
    if (price) params.set('maxprice', price)
    router.push(`/inventaire${params.toString() ? `?${params}` : ''}`)
  }

  const handleBodyType = (value: string) => {
    router.push(`/inventaire`)
  }

  return (
    <div className="hsb-wrap">
      <div className="hsb-card">
        {/* Tabs */}
        <div className="hsb-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={`hsb-tab${activeTab === tab.value ? ' active' : ''}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search row */}
        <div className="hsb-form">
          <div className={`hsb-field-wrap${focusedField === 'brand' ? ' focused' : ''}`}>
            <label className="hsb-field-label">Marque</label>
            <select
              className="hsb-select"
              value={brand}
              onChange={(e) => { setBrand(e.target.value); setModel('') }}
              onFocus={() => setFocusedField('brand')}
              onBlur={() => setFocusedField(null)}
            >
              <option value="">Toutes marques</option>
              {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="hsb-divider" />

          <div className={`hsb-field-wrap${focusedField === 'model' ? ' focused' : ''}`}>
            <label className="hsb-field-label">Modèle</label>
            <select
              className="hsb-select"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              onFocus={() => setFocusedField('model')}
              onBlur={() => setFocusedField(null)}
              disabled={!brand}
            >
              <option value="">Tous modèles</option>
              {availableModels.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <div className="hsb-divider" />

          <div className={`hsb-field-wrap${focusedField === 'price' ? ' focused' : ''}`}>
            <label className="hsb-field-label">Budget max</label>
            <select
              className="hsb-select"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onFocus={() => setFocusedField('price')}
              onBlur={() => setFocusedField(null)}
            >
              <option value="">Tous budgets</option>
              {PRICES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>

          <button className="hsb-btn" onClick={handleSearch} aria-label="Rechercher">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span>Rechercher</span>
          </button>
        </div>

        {/* Body type icons */}
        <div className="hsb-icons">
          {BODY_TYPES.map((bt) => (
            <button
              key={bt.value}
              className={`hsb-icon-btn${hoveredBody === bt.value ? ' hovered' : ''}`}
              onMouseEnter={() => setHoveredBody(bt.value)}
              onMouseLeave={() => setHoveredBody(null)}
              onClick={() => handleBodyType(bt.value)}
              aria-label={bt.label}
            >
              <div className="hsb-icon-circle">
                {bt.icon}
              </div>
              <span className="hsb-icon-label">{bt.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
