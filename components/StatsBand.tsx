'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
  { target: 500, label: 'Véhicules en stock', suffix: '+' },
  { target: 2,   label: 'Concessions en France', suffix: '' },
  { target: 10,  label: "Ans d'expérience", suffix: '' },
]

function useCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1800
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setVal(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target])
  return val
}

function StatBlock({ target, label, suffix, delay, active }: {
  target: number; label: string; suffix: string; delay: string; active: boolean
}) {
  const val = useCounter(target, active)
  return (
    <div className="stat-block fade-up" style={{ transitionDelay: delay }}>
      <div className="stat-num bc">
        <span>{val}</span><span>{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function StatsBand() {
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); io.disconnect() } },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="stats" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <StatBlock
              key={i}
              target={s.target}
              label={s.label}
              suffix={s.suffix}
              delay={`${i * 0.1}s`}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
