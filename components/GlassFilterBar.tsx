'use client'

import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInventoryStore, type SortOption } from '@/lib/store'

// ─── Data ──────────────────────────────────────────────────────────────────

const TYPE_PILLS = [
  { value: 'all',        label: 'Tous' },
  { value: 'nouveau',    label: 'Nouveautés' },
  { value: 'bestseller', label: 'Best Sellers' },
  { value: 'neuf',       label: 'Neufs' },
  { value: 'occasion',   label: 'Occasion' },
] as const

const BRANDS = [
  'Toutes les marques',
  'Renault', 'Peugeot', 'Volkswagen', 'Dacia',
  'Toyota', 'Mercedes', 'BMW', 'Audi', 'Cupra', 'GAC Motor',
]

// ─── Sub-components ────────────────────────────────────────────────────────

interface PillProps {
  label: string
  active: boolean
  onClick: () => void
  size?: 'lg' | 'sm'
}

function GlassPill({ label, active, onClick, size = 'lg' }: PillProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-pressed={active}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        border: 'none',
        fontFamily: 'inherit',
        minHeight: size === 'lg' ? 48 : 44,
        padding: size === 'lg' ? '0 24px' : '0 18px',
        fontSize: size === 'lg' ? 15 : 14,
        fontWeight: 500,
        borderRadius: 100,
        transition: 'color 0.2s ease',
        color: active ? '#fff' : 'rgba(26,26,26,0.75)',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none',
      }}
    >
      {/* Glass background */}
      <motion.span
        layoutId={undefined}
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 100,
          backdropFilter: active ? 'blur(0px)' : 'blur(12px)',
          WebkitBackdropFilter: active ? 'blur(0px)' : 'blur(12px)',
          background: active
            ? 'rgba(26, 26, 26, 0.82)'
            : 'rgba(255, 255, 255, 0.45)',
          border: active
            ? '1px solid rgba(26,26,26,0.15)'
            : '1px solid rgba(255,255,255,0.7)',
          boxShadow: active
            ? '0 2px 12px rgba(0,0,0,0.18)'
            : '0 1px 4px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
          transition: 'background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
    </motion.button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

interface GlassFilterBarProps {
  resultCount: number
  sort: SortOption
  onSortChange: (s: SortOption) => void
}

export default function GlassFilterBar({ resultCount, sort, onSortChange }: GlassFilterBarProps) {
  const activeType  = useInventoryStore(s => s.activeType)
  const activeBrand = useInventoryStore(s => s.activeBrand)
  const maxPrice    = useInventoryStore(s => s.maxPrice)
  const setType     = useInventoryStore(s => s.setType)
  const setBrand    = useInventoryStore(s => s.setBrand)
  const setMaxPrice = useInventoryStore(s => s.setMaxPrice)
  const reset       = useInventoryStore(s => s.reset)

  const sliderRef = useRef<HTMLInputElement>(null)

  // Sync slider track gradient with store value
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    const pct = (maxPrice - 5000) / (50000 - 5000) * 100
    slider.style.background = `linear-gradient(to right, var(--green) ${pct}%, rgba(0,0,0,0.12) ${pct}%)`
    slider.value = String(maxPrice)
  }, [maxPrice])

  const hasActiveFilters = activeType !== 'all' || activeBrand !== 'all' || maxPrice < 50000

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      style={{
        /* Outer glass card */
        margin: '24px 0',
        borderRadius: 20,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        background: 'rgba(255, 255, 255, 0.62)',
        border: '1px solid rgba(255, 255, 255, 0.75)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
        padding: '20px 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* ── Row 1: Type ── */}
      <div>
        <p style={rowLabelStyle}>Type</p>
        <div style={pillRowStyle}>
          {TYPE_PILLS.map(({ value, label }) => (
            <GlassPill
              key={value}
              label={label}
              active={activeType === value}
              onClick={() => setType(value)}
              size="lg"
            />
          ))}
        </div>
      </div>

      {/* ── Row 2: Brand ── */}
      <div>
        <p style={rowLabelStyle}>Marque</p>
        <div style={{ ...pillRowStyle, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {BRANDS.map((b) => {
            const val = b === 'Toutes les marques' ? 'all' : b
            return (
              <GlassPill
                key={b}
                label={b}
                active={activeBrand === val}
                onClick={() => setBrand(val)}
                size="sm"
              />
            )
          })}
        </div>
      </div>

      {/* ── Row 3: Price slider ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          {/* Price display */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 13, color: 'rgba(26,26,26,0.45)', fontWeight: 500 }}>
              Budget max
            </span>
            <motion.span
              key={maxPrice}
              initial={{ opacity: 0.6, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)',
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: '-0.02em',
                color: 'var(--green)',
              }}
            >
              {maxPrice.toLocaleString('fr-FR')} €
            </motion.span>
          </div>

          {/* Reset button */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.button
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.18 }}
                onClick={reset}
                aria-label="Réinitialiser les filtres"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  minHeight: 44,
                  padding: '0 18px',
                  borderRadius: 100,
                  border: '1px solid rgba(26,26,26,0.18)',
                  background: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'rgba(26,26,26,0.65)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.2s, color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.color = '#1A1A1A'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(26,26,26,0.45)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(26,26,26,0.65)'
                  ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(26,26,26,0.18)'
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
                </svg>
                Réinitialiser
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Slider */}
        <div style={{ maxWidth: 560 }}>
          <input
            ref={sliderRef}
            type="range"
            min="5000"
            max="50000"
            step="500"
            defaultValue={maxPrice}
            aria-label="Budget maximum"
            onChange={e => setMaxPrice(parseInt(e.target.value))}
            style={sliderStyle}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(26,26,26,0.35)', marginTop: 4 }}>
            <span>5 000 €</span>
            <span>50 000 €</span>
          </div>
        </div>
      </div>

      {/* ── Divider + results/sort bar ── */}
      <div style={{
        borderTop: '1px solid rgba(0,0,0,0.06)',
        paddingTop: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
      }}>
        <motion.p
          key={resultCount}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{ fontSize: 14, color: 'rgba(26,26,26,0.5)', fontWeight: 500 }}
        >
          <strong style={{ color: '#1A1A1A', fontWeight: 700 }}>{resultCount}</strong> véhicule{resultCount !== 1 ? 's' : ''} trouvé{resultCount !== 1 ? 's' : ''}
        </motion.p>

        <select
          value={sort}
          onChange={e => onSortChange(e.target.value as SortOption)}
          aria-label="Trier les résultats"
          style={{
            minHeight: 40,
            padding: '0 14px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.7)',
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            fontSize: 14,
            fontWeight: 500,
            color: '#1A1A1A',
            fontFamily: 'inherit',
            outline: 'none',
            cursor: 'pointer',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}
        >
          <option value="default">Trier par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="year-desc">Plus récent</option>
        </select>
      </div>
    </motion.div>
  )
}

// ─── Style constants ───────────────────────────────────────────────────────

const rowLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-barlow, "Barlow Condensed", sans-serif)',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'rgba(26,26,26,0.4)',
  marginBottom: 10,
}

const pillRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 8,
  flexWrap: 'wrap',
}

const sliderStyle: React.CSSProperties = {
  WebkitAppearance: 'none',
  appearance: 'none',
  width: '100%',
  height: 4,
  borderRadius: 4,
  outline: 'none',
  cursor: 'pointer',
  background: 'rgba(0,0,0,0.1)',
}
