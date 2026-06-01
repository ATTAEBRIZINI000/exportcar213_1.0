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

      <div className="vehicle-grid">
        {filtered.map(v => (
          <CarCard key={v.id} vehicle={v} />
        ))}
      </div>
    </>
  )
}
