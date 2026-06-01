'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface Props {
  imgs: string[]
  brand: string
  name: string
  badge: string
  badgeLabel: string
}

export default function VehicleGallery({ imgs, brand, name, badge, badgeLabel }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, dragFree: false })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback((index: number) => {
    emblaApi?.scrollTo(index)
  }, [emblaApi])

  return (
    <>
      {/* Main viewer — Embla viewport */}
      <div className="gallery-main" style={{ cursor: 'grab' }}>
        <div ref={emblaRef} style={{ overflow: 'hidden', width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            {imgs.map((src, i) => (
              <div key={i} style={{ flex: '0 0 100%', minWidth: 0, height: '100%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/${src}`}
                  alt={`${brand} ${name}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
        <span className={`gallery-badge badge-${badge}`}>{badgeLabel}</span>

        {/* Prev / next arrows */}
        {imgs.length > 1 && (
          <>
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Image précédente"
              style={{
                position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                zIndex: 2, width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Image suivante"
              style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                zIndex: 2, width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.45)', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails — clicking syncs Embla */}
      <div className="gallery-thumbs">
        {imgs.map((src, i) => (
          <div
            key={i}
            className={`gallery-thumb${i === selectedIndex ? ' active' : ''}`}
            onClick={() => scrollTo(i)}
            style={{ cursor: 'pointer' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/assets/${src}`} alt={`${brand} ${name}`} loading="lazy" />
          </div>
        ))}
      </div>
    </>
  )
}
