'use client'

import { useEffect, useRef } from 'react'

interface Props {
  className?: string
}

export default function LeafletMap({ className = 'map-container' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const initialised = useRef(false)

  useEffect(() => {
    if (initialised.current || !mapRef.current) return
    initialised.current = true

    import('leaflet').then(L => {
      const map = L.map(mapRef.current!, {
        center: [48.5, 0.5],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map)

      const redIcon = L.divIcon({
        className: '',
        html: `<div style="width:14px;height:14px;background:#C0392B;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })

      L.marker([48.8924, 2.2010], { icon: redIcon })
        .bindPopup('<strong>Export Car 213 — Paris Nanterre</strong><br>45 av. Georges Clemenceau, 92000 Nanterre')
        .addTo(map)

      L.marker([49.1829, -0.3707], { icon: redIcon })
        .bindPopup('<strong>Export Car 213 — Caen</strong><br>Calvados (14), Normandie')
        .addTo(map)
    })
  }, [])

  return <div ref={mapRef} className={className}></div>
}
