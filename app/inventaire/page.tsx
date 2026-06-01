import { Suspense } from 'react'
import InventaireClient from './InventaireClient'
import vehiclesData from '@/lib/vehicles.json'

export const metadata = {
  title: 'Inventaire Véhicules — Export Car 213',
  description: "Inventaire Export Car 213 — 500+ véhicules neufs et d'occasion disponibles pour export Algérie et Tunisie.",
}

export default function InventairePage() {
  return (
    <Suspense fallback={<div style={{ paddingTop: '72px' }}></div>}>
      <InventaireClient vehicles={vehiclesData} />
    </Suspense>
  )
}
