'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const IMAGES = [
  '/assets/1.png',
  '/assets/6.png',
  '/assets/11.png',
  '/assets/16.png',
  '/assets/21.png',
  '/assets/26.png',
  '/assets/31.png',
  '/assets/36.png',
  '/assets/41.png',
  '/assets/46.png',
  '/assets/51.png',
]

export default function RdvBackground() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => (i + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${IMAGES[idx]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.72) 100%)',
      }} />
    </div>
  )
}
