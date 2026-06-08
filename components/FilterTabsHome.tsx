'use client'

import { useState } from 'react'
import CarCard, { type Vehicle } from '@/components/CarCard'

interface Props {
  vehicles: Vehicle[]
}

const tabs = [
  { id: 'all',      label: 'Tous' },
  { id: 'new',      label: 'Nouveautés' },
  { id: 'neuf',     label: 'Neufs' },
  { id: 'occasion', label: 'Occasions' },
]

export default function FilterTabsHome({ vehicles }: Props) {
  const [active, setActive] = useState('all')

  const filtered = vehicles.filter(v => {
    if (active === 'all') return true
    if (active === 'new') return v.isNew
    return v.type === active
  })

  const [featured, ...rest] = filtered
  const small = rest.slice(0, 2)
  const remaining = rest.slice(2)

  return (
    <>
      <div className="filter-tabs" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn${active === tab.id ? ' active' : ''}`}
            role="tab"
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">Aucun véhicule trouvé.</p>
      ) : (
        <div className="editorial-grid">
          <div className="editorial-featured-row">
            <div className="editorial-large">
              <CarCard vehicle={featured} featured />
            </div>
            {small.length > 0 && (
              <div className="editorial-small-stack">
                {small.map(v => (
                  <CarCard key={v.id} vehicle={v} />
                ))}
              </div>
            )}
          </div>

          {remaining.length > 0 && (
            <div className="editorial-rest">
              {remaining.map(v => (
                <CarCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
