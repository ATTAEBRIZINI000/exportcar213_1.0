'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import gsap from 'gsap'

const slides = [
  { src: '/assets/40.png', alt: 'Cupra Formentor — Export Car 213' },
  { src: '/assets/36.png', alt: 'Volkswagen T-Roc — Export Car 213' },
  { src: '/assets/6.png',  alt: 'Cupra — Export Car 213' },
  { src: '/assets/45.png', alt: 'SUV sportif — Export Car 213' },
  { src: '/assets/14.png', alt: 'Renault Captur — Export Car 213' },
  { src: '/assets/9.png',  alt: 'Intérieur premium — Export Car 213' },
  { src: '/assets/5.png',  alt: 'SUV — Export Car 213' },
  { src: '/assets/10.png', alt: 'Tableau de bord — Export Car 213' },
  { src: '/assets/42.png', alt: 'Intérieur luxe — Export Car 213' },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  /* ── Carousel timer ── */
  const start = () => {
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 3500)
  }
  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }
  const goTo = (n: number) => setCurrent((n + slides.length) % slides.length)

  useEffect(() => {
    start()
    const onVisibility = () => document.hidden ? stop() : start()
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── GSAP entrance animation ── */
  useEffect(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo('.hero-eyebrow',
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.6 },
        0.3
      )
      .fromTo('.hero-title',
        { opacity: 0, y: 40, skewY: 2 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.75 },
        0.55
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.85
      )
      .fromTo('.hero-ctas',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.05
      )
      .fromTo('.hero-scroll',
        { opacity: 0 },
        { opacity: 0.55, duration: 0.5 },
        1.3
      )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" onMouseEnter={stop} onMouseLeave={start}>
      <div className="hero-slides">
        {slides.map((s, i) => (
          <div key={i} className={`hero-slide${i === current ? ' active' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt} loading={i === 0 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>

      <div className="hero-overlay" />

      <div className="hero-content" ref={contentRef}>
        <div className="container">
          <div className="hero-eyebrow" style={{ opacity: 0 }}>
            <div className="hero-eyebrow-line" />
            <span>Export Algérie &amp; Tunisie · Depuis 2015</span>
          </div>

          <h1 className="hero-title bc" style={{ opacity: 0 }}>
            Votre voiture.<br />
            <em>Votre pays.</em><br />
            Sans compromis.
          </h1>

          <p className="hero-subtitle" style={{ opacity: 0 }}>
            Spécialiste de l&apos;export automobile vers l&apos;Algérie et la Tunisie.
            500+ véhicules neufs et d&apos;occasion. Deux concessions en France — Nanterre et Caen.
          </p>

          <div className="hero-ctas" style={{ opacity: 0 }}>
            <Link href="/inventaire?type=neuf" className="btn-primary">
              Export Véhicule Neuf
            </Link>
            <Link href="/inventaire?type=occasion" className="btn-green">
              Export Véhicule Occasion
            </Link>
          </div>
        </div>
      </div>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot${i === current ? ' active' : ''}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      <div className="hero-scroll" style={{ opacity: 0 }}>
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  )
}
