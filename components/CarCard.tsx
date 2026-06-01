import Link from 'next/link'

export interface Vehicle {
  id: number
  img: string
  brand: string
  name: string
  year: number
  km: number
  fuel: string
  price: number
  type: string
  badge: string
  isNew: boolean
}

const badgeMap: Record<string, [string, string]> = {
  neuf:       ['badge-neuf',       'Neuf'],
  nouveau:    ['badge-nouveau',    'Nouveauté'],
  occasion:   ['badge-occasion',   'Occasion'],
  bestseller: ['badge-bestseller', 'Best Seller'],
}

function formatKm(km: number) {
  return km === 0 ? '0 km' : km.toLocaleString('fr-FR') + ' km'
}

export default function CarCard({ vehicle }: { vehicle: Vehicle }) {
  const [badgeClass, badgeLabel] = badgeMap[vehicle.badge] ?? ['badge-neuf', 'Neuf']

  return (
    <Link href={`/vehicules/${vehicle.id}`} className="vehicle-card" style={{ textDecoration: 'none', display: 'block' }}>
      <div className="vehicle-card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/assets/${vehicle.img}`} alt={`${vehicle.brand} ${vehicle.name}`} loading="lazy" />
        <span className={`badge ${badgeClass}`}>{badgeLabel}</span>
      </div>
      <div className="vehicle-card-body">
        <p className="vehicle-brand">{vehicle.brand}</p>
        <h3 className="vehicle-name">{vehicle.name}</h3>
        <div className="vehicle-specs">
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {vehicle.year}
          </span>
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {formatKm(vehicle.km)}
          </span>
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            {vehicle.fuel}
          </span>
        </div>
        <div className="vehicle-price-row">
          <div>
            <p className="vehicle-price-label">Prix export</p>
            <p className="vehicle-price">{vehicle.price.toLocaleString('fr-FR')} €</p>
          </div>
          <div className="vehicle-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
