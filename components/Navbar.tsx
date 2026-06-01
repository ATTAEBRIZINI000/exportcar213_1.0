'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [open, setOpen] = useState(false)

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
      <nav id="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo" onClick={close} style={{ marginLeft: 28 }}>
            <Image
              src="/assets/LOGO.svg"
              alt="Export Car 213"
              width={196}
              height={80}
              priority
              style={{ width: 'auto', height: 80 }}
            />
          </Link>

          <ul className="nav-links">
            <li><Link href="/inventaire?type=neuf">Véhicules Neufs</Link></li>
            <li><Link href="/inventaire?type=occasion">Véhicules Occasion</Link></li>
            <li><Link href="/a-propos">Services</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Nous Contacter</Link></li>
          </ul>

          <div className="nav-right">
            <Link href="/contact" className="btn-primary">Prendre RDV</Link>
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
        <Link href="/contact" onClick={close}>Nous Contacter</Link>
        <Link href="/contact" className="btn-primary" style={{ marginTop: 12 }} onClick={close}>
          Prendre RDV
        </Link>
      </div>
    </>
  )
}
