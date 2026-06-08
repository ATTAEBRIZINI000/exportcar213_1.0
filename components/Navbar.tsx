'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => {
    setOpen(false)
    document.body.style.overflow = ''
  }

  const toggle = () => {
    const next = !open
    setOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="container nav-inner">
          <Link href="/" className="nav-logo" onClick={close}>
            <Image
              src="/assets/LOGO.svg"
              alt="Export Car 213"
              width={200}
              height={86}
              priority
              style={{ width: 'auto', height: 'var(--logo-h)' }}
            />
          </Link>

          <ul className="nav-links">
            <li><Link href="/inventaire?type=neuf">Véhicules Neufs</Link></li>
            <li><Link href="/inventaire?type=occasion">Véhicules Occasion</Link></li>
            <li><Link href="/a-propos">Services</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>

          <div className="nav-right">
            <Link href="/rendez-vous" className="btn-primary">Prendre RDV</Link>
            <button
              className={`nav-burger${open ? ' open' : ''}`}
              id="burger"
              aria-label="Menu"
              onClick={toggle}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile${open ? ' open' : ''}`} id="mobileMenu">
        <Link href="/inventaire?type=neuf" onClick={close}>Véhicules Neufs</Link>
        <Link href="/inventaire?type=occasion" onClick={close}>Véhicules Occasion</Link>
        <Link href="/a-propos" onClick={close}>Services</Link>
        <Link href="/blog" onClick={close}>Blog</Link>
        <Link href="/contact" onClick={close}>Contact</Link>
        <Link href="/rendez-vous" className="btn-primary" style={{ marginTop: 16 }} onClick={close}>
          Prendre RDV
        </Link>
      </div>
    </>
  )
}
