const LOGOS = [
  { name: 'Renault',     src: 'https://www.carlogos.org/car-logos/renault-logo.png' },
  { name: 'Peugeot',    src: 'https://www.carlogos.org/car-logos/peugeot-logo.png' },
  { name: 'Volkswagen', src: 'https://www.carlogos.org/car-logos/volkswagen-logo.png' },
  { name: 'Toyota',     src: 'https://www.carlogos.org/car-logos/toyota-logo.png' },
  { name: 'BMW',        src: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
  { name: 'Mercedes',   src: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
  { name: 'Audi',       src: 'https://www.carlogos.org/car-logos/audi-logo.png' },
  { name: 'Dacia',      src: 'https://www.carlogos.org/car-logos/dacia-logo.png' },
  { name: 'Nissan',     src: 'https://www.carlogos.org/car-logos/nissan-logo.png' },
  { name: 'Citroën',    src: 'https://www.carlogos.org/car-logos/citroen-logo.png' },
  { name: 'Opel',       src: 'https://www.carlogos.org/car-logos/opel-logo.png' },
  { name: 'Kia',        src: 'https://www.carlogos.org/car-logos/kia-logo.png' },
  { name: 'Hyundai',    src: 'https://www.carlogos.org/car-logos/hyundai-logo.png' },
  { name: 'Ford',       src: 'https://www.carlogos.org/car-logos/ford-logo.png' },
]

const RED_FILTER =
  'brightness(0) saturate(100%) invert(13%) sepia(99%) saturate(7462%) hue-rotate(359deg) brightness(94%) contrast(115%)'

// Duplicated to create a seamless loop: animate translateX(0 → -50%)
const ALL = [...LOGOS, ...LOGOS]

export default function BrandLogosStrip() {
  return (
    <div style={{ background: '#F8F6F3', overflow: 'hidden', padding: '40px 0' }}>
      <style>{`
        @keyframes brand-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '60px',
          width: 'max-content',
          animation: 'brand-marquee 25s linear infinite',
        }}
      >
        {ALL.map((logo, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={logo.src}
            alt={logo.name}
            loading="lazy"
            style={{
              height: '50px',
              width: 'auto',
              objectFit: 'contain',
              filter: RED_FILTER,
              flexShrink: 0,
              display: 'block',
            }}
          />
        ))}
      </div>
    </div>
  )
}
