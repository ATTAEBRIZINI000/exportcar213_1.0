'use client'

import { useState } from 'react'

interface Props {
  imgs: string[]
  brand: string
  name: string
  badge: string
  badgeLabel: string
}

export default function VehicleGallery({ imgs, brand, name, badge, badgeLabel }: Props) {
  const [active, setActive] = useState(0)

  return (
    <>
      <div className="gallery-main">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/assets/${imgs[active]}`} alt={`${brand} ${name}`} />
        <span className={`gallery-badge badge-${badge}`}>{badgeLabel}</span>
      </div>
      <div className="gallery-thumbs">
        {imgs.map((src, i) => (
          <div
            key={i}
            className={`gallery-thumb${i === active ? ' active' : ''}`}
            onClick={() => setActive(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/${src}`} alt={`${brand} ${name}`} loading="lazy" />
          </div>
        ))}
      </div>
    </>
  )
}
