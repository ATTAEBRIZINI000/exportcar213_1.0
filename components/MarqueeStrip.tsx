const items = [
  'Export Algérie & Tunisie',
  'Concession Paris – Nanterre (92)',
  'Concession Caen (14)',
  '+500 Véhicules en stock',
  'Accompagnement complet',
  'Véhicules neufs & occasions',
  'CCR / Passeport / FCR',
  'Livraison port incluse',
]

export default function MarqueeStrip() {
  const doubled = [...items, ...items]

  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot"></span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
