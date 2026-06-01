'use client'

interface Props {
  active: string
  onChange: (filter: string) => void
}

const tabs = [
  { id: 'all',      label: 'Tous' },
  { id: 'new',      label: 'Nouveautés' },
  { id: 'neuf',     label: 'Neufs' },
  { id: 'occasion', label: 'Occasions' },
]

export default function FilterTabs({ active, onChange }: Props) {
  return (
    <div className="filter-tabs" role="tablist">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn${active === tab.id ? ' active' : ''}`}
          role="tab"
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
