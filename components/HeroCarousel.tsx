'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroSearchBanner from './HeroSearchBanner'

export default function HeroCarousel() {
  const heroRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-tagline',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.2
      )
      .fromTo('.hsb-wrap',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.45
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={heroRef}>
      <video
        ref={videoRef}
        className="hero-bg-img"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/assets/showRoomvid.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      <div className="hero-centered">
        <p className="hero-tagline">
          500+ véhicules exportés vers l&apos;Algérie &amp; la Tunisie
        </p>
        <HeroSearchBanner />
      </div>
    </section>
  )
}
