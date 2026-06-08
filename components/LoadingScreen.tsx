'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const CarSilhouette = () => (
  <svg
    width="96"
    height="44"
    viewBox="0 0 96 44"
    fill="currentColor"
    aria-hidden="true"
  >
    {/* Chassis */}
    <rect x="3" y="24" width="90" height="12" rx="3.5" />
    {/* Cabin */}
    <path d="M13 24 L24 9 Q27 6 31 6 L65 6 Q69 6 72 9 L83 24Z" />
    {/* Window tint */}
    <path d="M32 22 L40 8 L56 8 L64 22Z" fill="rgba(248,246,243,0.38)" />
    {/* Wheel wells */}
    <circle cx="24" cy="36" r="7.5" />
    <circle cx="72" cy="36" r="7.5" />
    {/* Wheel hubs */}
    <circle cx="24" cy="36" r="3" fill="#F8F6F3" />
    <circle cx="72" cy="36" r="3" fill="#F8F6F3" />
    {/* Headlight */}
    <rect x="86" y="25" width="7" height="5.5" rx="1.5" fill="rgba(248,246,243,0.9)" />
    {/* Grill */}
    <rect x="86" y="32" width="7" height="2" rx="1" fill="rgba(248,246,243,0.35)" />
  </svg>
)

export default function LoadingScreen() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('exportcar-visited')) {
      sessionStorage.setItem('exportcar-visited', '1')
      setShow(true)
      // exit at 4.0s; framer exit takes 0.5s → overlay fully gone at 4.5s
      const t = setTimeout(() => setShow(false), 4000)
      return () => clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#F8F6F3',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >

          {/* ── 1. Logo — scale + fade (t 0.2 → 1.1) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/assets/LOGO.svg"
              alt="Export Car 213"
              width={220}
              height={90}
              priority
              style={{ width: 'auto', height: 90 }}
            />
          </motion.div>

          {/* ── 2. Red accent line — draws left → right (t 1.1 → 1.7) ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
            style={{
              width: 72,
              height: 2,
              background: '#CC0000',
              marginTop: 18,
              transformOrigin: 'left center',
              borderRadius: 1,
            }}
          />

          {/* ── 3. Tagline — fade up (t 1.7 → 2.2) ── */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.7, ease: 'easeOut' }}
            style={{
              marginTop: 16,
              fontSize: 15,
              fontWeight: 500,
              color: '#1A5C2A',
              letterSpacing: '0.1em',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              textAlign: 'center',
            }}
          >
            L&apos;export automobile, simplifié
          </motion.p>

          {/* ── 4. Route indicator — France → Algérie · Tunisie (t 2.2 → 2.7) ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2, ease: 'easeOut' }}
            style={{
              marginTop: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(26,26,26,0.35)',
              letterSpacing: '0.12em',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
              textTransform: 'uppercase',
            }}
          >
            <span>France</span>
            <svg width="22" height="8" viewBox="0 0 22 8" fill="none" aria-hidden="true">
              <line x1="0" y1="4" x2="17" y2="4" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round" />
              <polyline points="14,1 17,4 14,7" fill="none" stroke="#CC0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Algérie</span>
            <span style={{ color: '#CC0000', fontSize: 9, lineHeight: 1 }}>·</span>
            <span>Tunisie</span>
          </motion.div>

          {/* ── 5. Road line — draws across (t 2.8 → 3.2) ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 2.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: '26%',
              left: 0,
              right: 0,
              height: 1,
              background: 'rgba(26,26,26,0.07)',
              transformOrigin: 'left center',
            }}
          />

          {/* ── 6. Car — drives left → right (t 3.0 → 4.0) ── */}
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: '110vw' }}
            transition={{ duration: 1.2, delay: 3.0, ease: [0.25, 0.1, 0.55, 1] }}
            style={{
              position: 'absolute',
              bottom: 'calc(26% + 3px)',
              left: 0,
              color: '#CC0000',
            }}
          >
            <CarSilhouette />
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
