'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SortOption } from '@/lib/store'

/* ── Types ─────────────────────────────────────────────────────────── */

export type VehicleForFilter = {
  brand: string; name: string; fuel: string
  km: number; price: number; gearbox?: string; doors?: string
}

export interface FiltersState {
  brand:        string
  model:        string
  type:         string
  priceMin:     string
  priceMax:     string
  km:           string
  carburant:    string
  transmission: string
  carteGrise:   string
  places:       string
  sort:         SortOption
}

export const DEFAULT_FILTERS: FiltersState = {
  brand: 'all', model: 'all', type: 'all',
  priceMin: '', priceMax: '',
  km: 'all', carburant: 'all', transmission: 'all',
  carteGrise: 'all', places: 'all', sort: 'default',
}

interface Props {
  vehicles:    VehicleForFilter[]
  filters:     FiltersState
  onChange:    (key: keyof FiltersState, value: string) => void
  onReset:     () => void
  resultCount: number
}

/* ── Constants ─────────────────────────────────────────────────────── */

const BRAND_LOGOS: Record<string, string> = {
  'Renault':    '/assets/CarLogo/1.svg',
  'Peugeot':    '/assets/CarLogo/2.svg',
  'Volkswagen': '/assets/CarLogo/3.svg',
  'Dacia':      '/assets/CarLogo/4.svg',
  'Toyota':     '/assets/CarLogo/5.svg',
  'Mercedes':   '/assets/CarLogo/6.svg',
  'BMW':        '/assets/CarLogo/7.svg',
  'Audi':       '/assets/CarLogo/8.svg',
  'Cupra':      '/assets/CarLogo/9.svg',
  'GAC Motor':  '/assets/CarLogo/10.svg',
}

const ALL_BRANDS = Object.keys(BRAND_LOGOS)

const TYPE_OPTIONS = [
  { value: 'all',        label: 'Tous les types'  },
  { value: 'berline',    label: 'Berline'          },
  { value: 'suv',        label: 'SUV'              },
  { value: '4x4',        label: '4x4'              },
  { value: 'electrique', label: 'Électrique'       },
  { value: 'utilitaire', label: 'Utilitaire'       },
  { value: 'coupe',      label: 'Coupé'            },
  { value: 'monospace',  label: 'Monospace'        },
]

const KM_OPTIONS = [
  { value: 'all',   label: 'Tous'               },
  { value: 'lt10',  label: '< 10 000 km'        },
  { value: '10-30', label: '10 000 – 30 000 km' },
  { value: '30-60', label: '30 000 – 60 000 km' },
  { value: 'gt60',  label: '+ 60 000 km'        },
]

const CARBURANT_OPTIONS = [
  { value: 'all',        label: 'Tous'       },
  { value: 'essence',    label: 'Essence'    },
  { value: 'diesel',     label: 'Diesel'     },
  { value: 'hybride',    label: 'Hybride'    },
  { value: 'electrique', label: 'Électrique' },
]

const TRANSMISSION_OPTIONS = [
  { value: 'all',         label: 'Toutes'      },
  { value: 'automatique', label: 'Automatique' },
  { value: 'manuelle',    label: 'Manuelle'    },
]

const CARTE_GRISE_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'ccr', label: 'CCR'  },
  { value: 'ccf', label: 'CCF'  },
]

const PLACES_OPTIONS = [
  { value: 'all', label: 'Tous'      },
  { value: '2',   label: '2 places'  },
  { value: '4',   label: '4 places'  },
  { value: '5',   label: '5 places'  },
  { value: '7',   label: '7 places'  },
  { value: '9+',  label: '9+ places' },
]

/* ── Filter matching logic ──────────────────────────────────────────── */

function getBodyTypes(name: string, fuel: string): string[] {
  const n = name.toLowerCase()
  const f = fuel.toLowerCase()
  const types: string[] = []
  if (f.includes('électrique') || f.includes('electrique')) types.push('electrique')
  if (/suv|crossover|qashqai|kuga|tiguan|tucson|sportage|cx-5|rav4|captur|kona|mokka|grandland|3008|5008|2008|yaris cross/i.test(n)) types.push('suv')
  if (/4x4|4wd|awd|duster|land|pajero|defender|hilux|ranger|amarok|navara|discovery|terreno/i.test(n)) types.push('4x4')
  if (/fourgon|transit|jumpy|berlingo|kangoo|master|vivaro|expert|sprinter|ducato|trafic/i.test(n)) types.push('utilitaire')
  if (/coupe|coupé|gt\b|rs\b|amg|m3|m5|\ba5\b|tt\b|mustang|cayman/i.test(n)) types.push('coupe')
  if (/monospace|espace|scenic|picasso|zafira|touran|sharan|galaxy|verso/i.test(n)) types.push('monospace')
  if (types.filter(t => t !== 'electrique').length === 0) types.push('berline')
  return types
}

export function matchesVehicle(v: VehicleForFilter, f: FiltersState): boolean {
  if (f.brand !== 'all' && v.brand !== f.brand) return false
  if (f.model !== 'all' && v.name !== f.model) return false
  if (f.type !== 'all' && !getBodyTypes(v.name, v.fuel).includes(f.type)) return false
  if (f.priceMin !== '') {
    const min = parseFloat(f.priceMin.replace(/[\s ]/g, '').replace(',', '.'))
    if (!isNaN(min) && v.price < min) return false
  }
  if (f.priceMax !== '') {
    const max = parseFloat(f.priceMax.replace(/[\s ]/g, '').replace(',', '.'))
    if (!isNaN(max) && v.price > max) return false
  }
  if (f.km !== 'all') {
    if (f.km === 'lt10'  && v.km >= 10000) return false
    if (f.km === '10-30' && (v.km < 10000 || v.km > 30000)) return false
    if (f.km === '30-60' && (v.km < 30000 || v.km > 60000)) return false
    if (f.km === 'gt60'  && v.km <= 60000) return false
  }
  if (f.carburant !== 'all' && !v.fuel.toLowerCase().includes(f.carburant.toLowerCase())) return false
  if (f.transmission !== 'all' && v.gearbox) {
    const g = v.gearbox.toLowerCase()
    if (f.transmission === 'automatique' && !g.includes('auto')) return false
    if (f.transmission === 'manuelle' && g.includes('auto')) return false
  }
  if (f.places !== 'all') {
    const nineOrMore  = /9\s*places?|9\+/i.test(v.name)
    const sevenPlaces = /7\s*places?/i.test(v.name)
    const doorsMatch  = v.doors?.match(/(\d+)/)
    const seats = nineOrMore ? 9 : sevenPlaces ? 7 : doorsMatch ? parseInt(doorsMatch[1]) : 5
    if (f.places === '9+' && seats < 9) return false
    if (f.places !== '9+' && seats !== parseInt(f.places)) return false
  }
  return true
}

/* ── Backward compat stubs ─────────────────────────────────────────── */
export function matchesBudget(_p: number, _b: string): boolean { return true }
export function matchesColor(_c: string, _s: string): boolean { return true }
export function matchesCarburant(fuel: string, s: string): boolean {
  if (s === 'all') return true
  return fuel.toLowerCase().includes(s.toLowerCase())
}
export function matchesPlaces(doorsOrName: string, selected: string): boolean {
  if (selected === 'all') return true
  const sevenPlaces = /7\s*[Pp]laces?/.test(doorsOrName)
  const nineOrMore  = /9\s*[Pp]laces?|9\+/.test(doorsOrName)
  const doorsMatch  = doorsOrName.match(/(\d+)\s*portes?/i)
  const seats = nineOrMore ? 9 : sevenPlaces ? 7 : doorsMatch ? parseInt(doorsMatch[1]) : 5
  if (selected === '9+') return seats >= 9
  return seats === parseInt(selected)
}

/* ── Sub-components ────────────────────────────────────────────────── */

const panelVariants = {
  hidden:  { opacity: 0, y: -6, scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1    },
}

interface DDWrapperProps {
  id:           string
  label:        string
  displayValue: string
  isActive:     boolean
  isOpen:       boolean
  onToggle:     () => void
  panelClass?:  string
  children:     React.ReactNode
}

function DropdownWrapper({ id, label, displayValue, isActive, isOpen, onToggle, panelClass = '', children }: DDWrapperProps) {
  const isPlaceholder = !isActive
  return (
    <div className="relative">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-exportcar-text-secondary mb-[7px]">
        {label}
      </p>
      <button
        type="button"
        id={`dd-${id}`}
        onClick={onToggle}
        className={[
          'w-full flex items-center justify-between gap-2 px-[13px] py-[10px] rounded-xl border text-[13px] font-medium transition-all duration-200 cursor-pointer text-left min-h-[44px]',
          isOpen
            ? 'border-exportcar-red bg-white text-exportcar-text shadow-[0_0_0_3px_rgba(204,0,0,0.09)]'
            : isActive
              ? 'border-exportcar-red/40 bg-exportcar-red/[0.03] text-exportcar-text'
              : 'border-exportcar-border bg-white text-exportcar-text hover:border-exportcar-text/20 hover:shadow-sm',
        ].join(' ')}
      >
        <span className={`truncate ${isPlaceholder && !isOpen ? 'text-exportcar-text-secondary' : ''}`}>
          {displayValue}
        </span>
        <svg
          className={`w-[15px] h-[15px] flex-shrink-0 text-exportcar-text-secondary/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.14, ease: [0.4, 0, 0.2, 1] }}
            className={`absolute top-full left-0 z-50 mt-1.5 bg-white border border-exportcar-border rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.10),0_2px_6px_rgba(0,0,0,0.04)] overflow-hidden ${panelClass}`}
            style={{ minWidth: '100%' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function OptionRow({ label, count, isActive, isAll, onClick }: {
  label: string; count?: number; isActive: boolean; isAll?: boolean; onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'w-full flex items-center justify-between px-4 py-[9px] text-[13px] transition-colors duration-100 cursor-pointer text-left gap-4 whitespace-nowrap',
        isActive
          ? 'bg-exportcar-red/[0.06] text-exportcar-red font-semibold'
          : 'text-exportcar-text hover:bg-exportcar-surface-secondary',
      ].join(' ')}
    >
      <span>{label}</span>
      {!isAll && count !== undefined && (
        <span className={`text-[11px] tabular-nums ${isActive ? 'text-exportcar-red/60' : 'text-exportcar-text-secondary'}`}>
          {count}
        </span>
      )}
    </button>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-exportcar-text-secondary mb-[7px]">
      {children}
    </p>
  )
}

/* ── Main component ────────────────────────────────────────────────── */

export default function DarkFilterPanel({ vehicles, filters, onChange, onReset, resultCount }: Props) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [])

  function toggle(id: string) {
    setOpenDropdown(prev => prev === id ? null : id)
  }

  function select(key: keyof FiltersState, value: string) {
    onChange(key, value)
    if (key === 'brand') onChange('model', 'all')
    setOpenDropdown(null)
  }

  function countFor(key: keyof FiltersState, value: string) {
    return vehicles.filter(v => matchesVehicle(v, { ...filters, [key]: value })).length
  }

  const modelOptions = useMemo(() => {
    const pool = filters.brand === 'all' ? vehicles : vehicles.filter(v => v.brand === filters.brand)
    const unique = Array.from(new Set(pool.map(v => v.name))).sort()
    return [
      { value: 'all', label: 'Tous les modèles' },
      ...unique.map(n => ({ value: n, label: n })),
    ]
  }, [vehicles, filters.brand])

  const brandDisplay        = filters.brand        === 'all' ? 'Toutes les marques' : filters.brand
  const modelDisplay        = filters.model        === 'all' ? 'Tous les modèles'   : filters.model
  const typeDisplay         = TYPE_OPTIONS.find(o => o.value === filters.type)?.label         ?? 'Tous les types'
  const kmDisplay           = KM_OPTIONS.find(o => o.value === filters.km)?.label             ?? 'Tous'
  const carburantDisplay    = CARBURANT_OPTIONS.find(o => o.value === filters.carburant)?.label    ?? 'Tous'
  const transmissionDisplay = TRANSMISSION_OPTIONS.find(o => o.value === filters.transmission)?.label ?? 'Toutes'
  const carteGriseDisplay   = CARTE_GRISE_OPTIONS.find(o => o.value === filters.carteGrise)?.label   ?? 'Tous'
  const placesDisplay       = PLACES_OPTIONS.find(o => o.value === filters.places)?.label       ?? 'Tous'

  const hasActive = filters.brand !== 'all' || filters.model !== 'all' || filters.type !== 'all' ||
    filters.priceMin !== '' || filters.priceMax !== '' || filters.km !== 'all' ||
    filters.carburant !== 'all' || filters.transmission !== 'all' ||
    filters.carteGrise !== 'all' || filters.places !== 'all'

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="bg-exportcar-bg rounded-2xl border border-exportcar-border p-5"
    >

      {/* ── Row 1: Marque | Modèle | Type | Prix Min | Prix Max ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-3">

        {/* Marque */}
        <DropdownWrapper
          id="brand"
          label="Marque"
          displayValue={brandDisplay}
          isActive={filters.brand !== 'all'}
          isOpen={openDropdown === 'brand'}
          onToggle={() => toggle('brand')}
          panelClass="min-w-[300px]"
        >
          <OptionRow
            label="Toutes les marques"
            isActive={filters.brand === 'all'}
            onClick={() => select('brand', 'all')}
            isAll
          />
          <div className="border-t border-exportcar-border p-2.5 grid grid-cols-2 gap-1.5">
            {ALL_BRANDS.map(brand => {
              const count  = countFor('brand', brand)
              const active = filters.brand === brand
              return (
                <button
                  key={brand}
                  type="button"
                  onClick={() => select('brand', brand)}
                  className={[
                    'flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[12px] font-medium transition-all duration-150 cursor-pointer',
                    active
                      ? 'border-exportcar-red bg-exportcar-red/5 text-exportcar-red'
                      : 'border-exportcar-border bg-exportcar-surface-secondary hover:bg-exportcar-surface hover:border-exportcar-text/15 text-exportcar-text',
                  ].join(' ')}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={BRAND_LOGOS[brand]}
                    alt={brand}
                    className="object-contain flex-shrink-0"
                    style={{ width: 20, height: 20 }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <span className="truncate flex-1">{brand}</span>
                  <span className={`text-[11px] tabular-nums flex-shrink-0 ${active ? 'text-exportcar-red/60' : 'text-exportcar-text-secondary'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </DropdownWrapper>

        {/* Modèle */}
        <DropdownWrapper
          id="model"
          label="Modèle"
          displayValue={modelDisplay}
          isActive={filters.model !== 'all'}
          isOpen={openDropdown === 'model'}
          onToggle={() => toggle('model')}
        >
          <div className="max-h-[240px] overflow-y-auto overscroll-contain">
            {modelOptions.map(opt => (
              <OptionRow
                key={opt.value}
                label={opt.label}
                count={opt.value !== 'all' ? countFor('model', opt.value) : undefined}
                isActive={filters.model === opt.value}
                onClick={() => select('model', opt.value)}
                isAll={opt.value === 'all'}
              />
            ))}
          </div>
        </DropdownWrapper>

        {/* Type */}
        <DropdownWrapper
          id="type"
          label="Type"
          displayValue={typeDisplay}
          isActive={filters.type !== 'all'}
          isOpen={openDropdown === 'type'}
          onToggle={() => toggle('type')}
        >
          {TYPE_OPTIONS.map(opt => (
            <OptionRow
              key={opt.value}
              label={opt.label}
              count={opt.value !== 'all' ? countFor('type', opt.value) : undefined}
              isActive={filters.type === opt.value}
              onClick={() => select('type', opt.value)}
              isAll={opt.value === 'all'}
            />
          ))}
        </DropdownWrapper>

        {/* Prix Min */}
        <div>
          <FieldLabel>Prix Min</FieldLabel>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="0"
              value={filters.priceMin}
              onChange={e => onChange('priceMin', e.target.value)}
              className="w-full px-[13px] py-[10px] pr-9 rounded-xl border border-exportcar-border bg-white text-exportcar-text text-[13px] font-medium placeholder:text-exportcar-text-secondary/40 outline-none focus:border-exportcar-red focus:shadow-[0_0_0_3px_rgba(204,0,0,0.09)] transition-all duration-200 min-h-[44px]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-exportcar-text-secondary/40 pointer-events-none select-none">€</span>
          </div>
        </div>

        {/* Prix Max */}
        <div>
          <FieldLabel>Prix Max</FieldLabel>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              placeholder="100 000"
              value={filters.priceMax}
              onChange={e => onChange('priceMax', e.target.value)}
              className="w-full px-[13px] py-[10px] pr-9 rounded-xl border border-exportcar-border bg-white text-exportcar-text text-[13px] font-medium placeholder:text-exportcar-text-secondary/40 outline-none focus:border-exportcar-red focus:shadow-[0_0_0_3px_rgba(204,0,0,0.09)] transition-all duration-200 min-h-[44px]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] text-exportcar-text-secondary/40 pointer-events-none select-none">€</span>
          </div>
        </div>

      </div>

      {/* ── Row 2: Kilométrage | Carburant | Transmission | Carte Grise | Places ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

        {/* Kilométrage */}
        <DropdownWrapper
          id="km"
          label="Kilométrage"
          displayValue={kmDisplay}
          isActive={filters.km !== 'all'}
          isOpen={openDropdown === 'km'}
          onToggle={() => toggle('km')}
        >
          {KM_OPTIONS.map(opt => (
            <OptionRow
              key={opt.value}
              label={opt.label}
              count={opt.value !== 'all' ? countFor('km', opt.value) : undefined}
              isActive={filters.km === opt.value}
              onClick={() => select('km', opt.value)}
              isAll={opt.value === 'all'}
            />
          ))}
        </DropdownWrapper>

        {/* Carburant */}
        <DropdownWrapper
          id="carburant"
          label="Carburant"
          displayValue={carburantDisplay}
          isActive={filters.carburant !== 'all'}
          isOpen={openDropdown === 'carburant'}
          onToggle={() => toggle('carburant')}
        >
          {CARBURANT_OPTIONS.map(opt => (
            <OptionRow
              key={opt.value}
              label={opt.label}
              count={opt.value !== 'all' ? countFor('carburant', opt.value) : undefined}
              isActive={filters.carburant === opt.value}
              onClick={() => select('carburant', opt.value)}
              isAll={opt.value === 'all'}
            />
          ))}
        </DropdownWrapper>

        {/* Transmission */}
        <DropdownWrapper
          id="transmission"
          label="Transmission"
          displayValue={transmissionDisplay}
          isActive={filters.transmission !== 'all'}
          isOpen={openDropdown === 'transmission'}
          onToggle={() => toggle('transmission')}
        >
          {TRANSMISSION_OPTIONS.map(opt => (
            <OptionRow
              key={opt.value}
              label={opt.label}
              count={opt.value !== 'all' ? countFor('transmission', opt.value) : undefined}
              isActive={filters.transmission === opt.value}
              onClick={() => select('transmission', opt.value)}
              isAll={opt.value === 'all'}
            />
          ))}
        </DropdownWrapper>

        {/* Carte Grise */}
        <DropdownWrapper
          id="carteGrise"
          label="Carte Grise"
          displayValue={carteGriseDisplay}
          isActive={filters.carteGrise !== 'all'}
          isOpen={openDropdown === 'carteGrise'}
          onToggle={() => toggle('carteGrise')}
        >
          {CARTE_GRISE_OPTIONS.map(opt => (
            <OptionRow
              key={opt.value}
              label={opt.label}
              count={opt.value !== 'all' ? countFor('carteGrise', opt.value) : undefined}
              isActive={filters.carteGrise === opt.value}
              onClick={() => select('carteGrise', opt.value)}
              isAll={opt.value === 'all'}
            />
          ))}
        </DropdownWrapper>

        {/* Places */}
        <DropdownWrapper
          id="places"
          label="Places"
          displayValue={placesDisplay}
          isActive={filters.places !== 'all'}
          isOpen={openDropdown === 'places'}
          onToggle={() => toggle('places')}
        >
          {PLACES_OPTIONS.map(opt => (
            <OptionRow
              key={opt.value}
              label={opt.label}
              count={opt.value !== 'all' ? countFor('places', opt.value) : undefined}
              isActive={filters.places === opt.value}
              onClick={() => select('places', opt.value)}
              isAll={opt.value === 'all'}
            />
          ))}
        </DropdownWrapper>

      </div>

      {/* ── Divider ── */}
      <div className="border-t border-exportcar-border mt-4" />

      {/* ── Footer ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-4">

        <motion.p
          key={resultCount}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="text-[13px] text-exportcar-text-secondary"
        >
          <span className="text-exportcar-text font-semibold">{resultCount}</span>{' '}
          véhicule{resultCount !== 1 ? 's' : ''} trouvé{resultCount !== 1 ? 's' : ''}
        </motion.p>

        <div className="flex items-center gap-3">
          <select
            value={filters.sort}
            onChange={e => onChange('sort', e.target.value)}
            aria-label="Trier les résultats"
            className="bg-white border border-exportcar-border text-exportcar-text-secondary text-[13px] rounded-xl px-3 py-2 outline-none focus:border-exportcar-text/30 cursor-pointer transition-colors min-h-[36px]"
          >
            <option value="default">Trier par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="year-desc">Plus récent</option>
          </select>

          <AnimatePresence>
            {hasActive && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                onClick={onReset}
                className="text-[13px] text-exportcar-text-secondary hover:text-exportcar-red transition-colors duration-150 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                </svg>
                Réinitialiser
              </motion.button>
            )}
          </AnimatePresence>
        </div>

      </div>

    </motion.div>
  )
}
