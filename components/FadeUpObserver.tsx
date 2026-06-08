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

    const observe = () => {
      document.querySelectorAll('.fade-up:not(.visible)').forEach(el => io.observe(el))
    }

    // First pass: elements already in DOM
    observe()

    // Second pass after a tick: picks up client components that hydrate slightly later
    const t = setTimeout(observe, 120)

    return () => {
      clearTimeout(t)
      io.disconnect()
    }
  }, [])

  return null
}
