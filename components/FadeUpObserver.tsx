'use client'

import { useEffect } from 'react'

export default function FadeUpObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    const els = document.querySelectorAll('.fade-up')
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
