'use client'

import { useState } from 'react'

interface Vehicle {
  brand: string
  name: string
  year: number
  km: number
  fuel: string
  gearbox: string
  engine: string
  power: string
  color: string
  doors: string
  equipments: string[]
}

export default function VehicleSpecTabs({ vehicle: v }: { vehicle: Vehicle }) {
  const [tab, setTab] = useState('specs')

  return (
    <>
      <div className="spec-tabs">
        {[['specs','Caractéristiques'],['equipments','Équipements'],['export','Infos export']].map(([id, lbl]) => (
          <button
            key={id}
            className={`spec-tab${tab === id ? ' active' : ''}`}
            onClick={() => setTab(id)}
          >{lbl}</button>
        ))}
      </div>

      <div className={`spec-panel${tab === 'specs' ? ' active' : ''}`}>
        <div className="spec-grid">
          <span className="spec-key">Marque</span><span className="spec-val">{v.brand}</span>
          <span className="spec-key">Modèle</span><span className="spec-val">{v.name}</span>
          <span className="spec-key">Année</span><span className="spec-val">{v.year}</span>
          <span className="spec-key">Kilométrage</span><span className="spec-val">{v.km === 0 ? '0 km' : v.km.toLocaleString('fr-FR') + ' km'}</span>
          <span className="spec-key">Carburant</span><span className="spec-val">{v.fuel}</span>
          <span className="spec-key">Transmission</span><span className="spec-val">{v.gearbox}</span>
          <span className="spec-key">Motorisation</span><span className="spec-val">{v.engine}</span>
          <span className="spec-key">Puissance</span><span className="spec-val">{v.power}</span>
          <span className="spec-key">Couleur</span><span className="spec-val">{v.color}</span>
          <span className="spec-key">Portes</span><span className="spec-val">{v.doors}</span>
        </div>
      </div>

      <div className={`spec-panel${tab === 'equipments' ? ' active' : ''}`}>
        <div className="equip-list">
          {v.equipments.map((e, i) => (
            <div key={i} className="equip-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {e}
            </div>
          ))}
        </div>
      </div>

      <div className={`spec-panel${tab === 'export' ? ' active' : ''}`}>
        <div className="export-info">
          <h4>Informations export</h4>
          {[
            'Disponible pour export Algérie & Tunisie',
            'Documents acceptés : CCR / Passeport / FCR',
            'Accompagnement douane inclus',
            'Délai d\'exportation : 4 à 8 semaines',
            'Transport maritime depuis port de Marseille ou Le Havre',
            'Garantie constructeur transférable selon conditions',
          ].map((item, i) => (
            <div key={i} className="export-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
