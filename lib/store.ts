import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// ─── Types ───────────────────────────────────────────────────

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'year-desc'

interface InventoryFilters {
  activeType:  string
  activeBrand: string
  maxPrice:    number
  sort:        SortOption
}

interface InventoryActions {
  setType:     (type: string)  => void
  setBrand:    (brand: string) => void
  setMaxPrice: (price: number) => void
  setSort:     (sort: SortOption) => void
  reset:       () => void
}

// ─── Defaults ────────────────────────────────────────────────

const DEFAULT_FILTERS: InventoryFilters = {
  activeType:  'all',
  activeBrand: 'all',
  maxPrice:    50000,
  sort:        'default',
}

// ─── Store ───────────────────────────────────────────────────

export const useInventoryStore = create<InventoryFilters & InventoryActions>()(
  devtools(
    (set) => ({
      ...DEFAULT_FILTERS,

      setType:     (activeType)  => set({ activeType },  false, 'setType'),
      setBrand:    (activeBrand) => set({ activeBrand }, false, 'setBrand'),
      setMaxPrice: (maxPrice)    => set({ maxPrice },    false, 'setMaxPrice'),
      setSort:     (sort)        => set({ sort },        false, 'setSort'),
      reset:       ()            => set(DEFAULT_FILTERS, false, 'reset'),
    }),
    { name: 'InventoryStore' }
  )
)
