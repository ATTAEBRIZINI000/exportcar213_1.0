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

const BADGE_MAP: Record<string, { cls: string; label: string }> = {
  neuf:       { cls: 'vc-badge--neuf',       label: 'Neuf' },
  nouveau:    { cls: 'vc-badge--nouveau',    label: 'Nouveauté' },
  occasion:   { cls: 'vc-badge--occasion',   label: 'Occasion' },
  bestseller: { cls: 'vc-badge--bestseller', label: 'Best Seller' },
}

function formatKm(km: number) {
  return km === 0 ? '0 km' : km.toLocaleString('fr-FR') + ' km'
}

export default function CarCard({ vehicle, featured = false }: { vehicle: Vehicle; featured?: boolean }) {
  const badge = BADGE_MAP[vehicle.badge] ?? BADGE_MAP.neuf

  return (
    <Link href={`/vehicules/${vehicle.id}`} className={`vc-card${featured ? ' vc-card--featured' : ''}`}>
      <div className="vc-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/assets/${vehicle.img}`} alt={`${vehicle.brand} ${vehicle.name}`} loading="lazy" />
        <div className="vc-overlay" />
        <span className={`vc-badge ${badge.cls}`}>{badge.label}</span>
        <div className="vc-info">
          <p className="vc-brand">{vehicle.brand}</p>
          <h3 className="vc-name">{vehicle.name}</h3>
          <div className="vc-tags">
            <span>{vehicle.year}</span>
            <span className="vc-dot">·</span>
            <span>{formatKm(vehicle.km)}</span>
            <span className="vc-dot">·</span>
            <span>{vehicle.fuel}</span>
          </div>
          <p className="vc-price">{vehicle.price.toLocaleString('fr-FR')} <span>€</span></p>
        </div>
      </div>
    </Link>
  )
}
