'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import RdvBackground from '@/components/RdvBackground'

/* ── Data ──────────────────────────────────────────────────── */

const SHOWROOMS = [
  {
    id: 'paris' as const,
    city: 'Paris — Nanterre',
    region: 'Île-de-France (92)',
    address: '45 avenue Georges Clemenceau, 92000 Nanterre',
    hours: 'Lun–Sam · 9h–19h',
  },
  {
    id: 'caen' as const,
    city: 'Caen',
    region: 'Normandie (14)',
    address: 'Caen, Calvados 14000',
    hours: 'Lun–Sam · 9h–18h',
  },
]

const TIME_SLOTS = ['09h00', '10h00', '11h00', '14h00', '15h00', '16h00', '17h00']
const RDV_TYPES = ['Visite véhicule', 'Conseil export', 'Autre']

const MONTHS_FR = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre',
]
const DAYS_FR = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']

type ShowroomId = 'paris' | 'caen'

/* ── Calendar helpers ──────────────────────────────────────── */

function daysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate()
}

// Monday-first: Mon=0 … Sun=6
function firstWeekday(y: number, m: number) {
  return (new Date(y, m, 1).getDay() + 6) % 7
}

function formatDateFR(d: Date) {
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

/* ── Framer variants ───────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: EASE } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22 } },
}

/* ── SVG icons ─────────────────────────────────────────────── */

function IconPin() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

function IconChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

/* ── Main page ─────────────────────────────────────────────── */

export default function RendezVousPage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  /* state */
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [showroom, setShowroom] = useState<ShowroomId | null>(null)
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [rdvType, setRdvType] = useState(RDV_TYPES[0])
  const [nom, setNom] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const canSubmit = !!(showroom && selectedDate && selectedSlot && nom.trim() && tel.trim())

  /* calendar derived values */
  const calYear  = calMonth.getFullYear()
  const calMon   = calMonth.getMonth()
  const totalDays = daysInMonth(calYear, calMon)
  const startOff  = firstWeekday(calYear, calMon)
  const isCurrentMonthView =
    calYear === today.getFullYear() && calMon === today.getMonth()

  function handleShowroomSelect(id: ShowroomId) {
    setShowroom(id)
    setStep(2)
  }

  function prevMonth() {
    if (isCurrentMonthView) return
    setCalMonth(new Date(calYear, calMon - 1, 1))
  }

  function nextMonth() {
    setCalMonth(new Date(calYear, calMon + 1, 1))
  }

  function handleDayClick(d: number) {
    const date = new Date(calYear, calMon, d)
    const isSun = date.getDay() === 0
    const isPast = date < today
    if (isSun || isPast) return
    setSelectedDate(date)
    setSelectedSlot(null)
  }

  function handleSubmit() {
    console.log('Booking:', { showroom, date: selectedDate, slot: selectedSlot, rdvType, nom, tel, email, message })
    setStep(3)
  }

  const selectedShowroom = SHOWROOMS.find(s => s.id === showroom)

  /* ── render ── */
  return (
    <>
    <RdvBackground />
    <main
      className="min-h-screen"
      style={{ paddingTop: 'var(--nav-h, 72px)', position: 'relative', zIndex: 1, background: 'transparent' }}
    >
      <AnimatePresence mode="wait">

        {/* ══════════════════════════════════════════════════════
            STEP 1 — Choose showroom
        ══════════════════════════════════════════════════════ */}
        {step === 1 && (
          <motion.div key="step1" {...fade}
            className="min-h-[calc(100vh-var(--nav-h,72px))] flex flex-col items-center justify-center px-6 py-20"
          >
            <div className="w-full max-w-[860px]">

              {/* Header */}
              <div className="text-center mb-12">
                <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-exportcar-red mb-4">
                  Réservation
                </p>
                <h1 className="text-[clamp(32px,5vw,52px)] font-bold tracking-tight text-white mb-3">
                  Prenez rendez-vous
                </h1>
                <p className="text-white/70 text-[15px]">
                  Choisissez votre concession
                </p>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SHOWROOMS.map((s, i) => (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleShowroomSelect(s.id)}
                    className={[
                      'group w-full text-left rounded-[20px] p-10 border transition-all duration-300 cursor-pointer',
                      showroom === s.id
                        ? 'border-exportcar-red shadow-[0_0_30px_rgba(204,0,0,0.12)] -translate-y-1'
                        : 'border-exportcar-border hover:border-exportcar-red hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]',
                    ].join(' ')}
                    style={{ background: '#FFFFFF' }}
                  >
                    <div className={[
                      'inline-flex p-3 rounded-xl mb-5 transition-colors duration-300',
                      showroom === s.id
                        ? 'text-exportcar-red bg-exportcar-red/10'
                        : 'text-exportcar-text-secondary bg-exportcar-surface-secondary group-hover:text-exportcar-red group-hover:bg-exportcar-red/8',
                    ].join(' ')}>
                      <IconPin />
                    </div>

                    <h2 className="text-[22px] font-bold text-exportcar-text tracking-tight mb-1">
                      {s.city}
                    </h2>
                    <p className="text-[13px] text-exportcar-red font-medium mb-4">
                      {s.region}
                    </p>
                    <p className="text-[13px] text-exportcar-text-secondary mb-3">
                      {s.address}
                    </p>
                    <div className="flex items-center gap-1.5 text-exportcar-text-secondary text-[12px]">
                      <IconClock />
                      {s.hours}
                    </div>
                  </motion.button>
                ))}
              </div>

            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════
            STEP 2 — Date + Form
        ══════════════════════════════════════════════════════ */}
        {step === 2 && (
          <motion.div key="step2" {...fade}
            className="max-w-[1100px] mx-auto px-6 py-12"
          >
            {/* Sub-header */}
            <div className="flex items-center gap-3 mb-10">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-exportcar-red/20 text-white text-[13px] font-medium border border-exportcar-red/40">
                <IconPin />
                {selectedShowroom?.city}
              </span>
              <button
                onClick={() => setStep(1)}
                className="text-[13px] text-white/60 hover:text-white transition-colors duration-150 cursor-pointer"
              >
                Modifier
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* ── Left: Calendar + Slots ── */}
              <div className="flex flex-col gap-6">

                {/* Calendar */}
                <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E5E1DC' }}>

                  {/* Month nav */}
                  <div className="flex items-center justify-between mb-5">
                    <button
                      onClick={prevMonth}
                      disabled={isCurrentMonthView}
                      className={[
                        'w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150',
                        isCurrentMonthView
                          ? 'text-exportcar-text-secondary/30 cursor-not-allowed'
                          : 'text-exportcar-text-secondary hover:text-exportcar-text hover:bg-exportcar-surface-secondary cursor-pointer',
                      ].join(' ')}
                    >
                      <IconChevronLeft />
                    </button>
                    <p className="text-exportcar-text font-semibold text-[15px]">
                      {MONTHS_FR[calMon]} {calYear}
                    </p>
                    <button
                      onClick={nextMonth}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-exportcar-text-secondary hover:text-exportcar-text hover:bg-exportcar-surface-secondary transition-colors duration-150 cursor-pointer"
                    >
                      <IconChevronRight />
                    </button>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 mb-2">
                    {DAYS_FR.map(d => (
                      <div key={d} className={[
                        'text-center text-[11px] font-semibold uppercase tracking-wider py-1',
                        d === 'Dim' ? 'text-exportcar-text-secondary/30' : 'text-exportcar-text-secondary',
                      ].join(' ')}>
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Day grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Empty offset cells */}
                    {Array.from({ length: startOff }).map((_, i) => (
                      <div key={`e${i}`} />
                    ))}

                    {/* Day cells */}
                    {Array.from({ length: totalDays }, (_, i) => i + 1).map(d => {
                      const date = new Date(calYear, calMon, d)
                      const isSun  = date.getDay() === 0
                      const isPast = date < today
                      const isTod  = date.getTime() === today.getTime()
                      const isSel  = selectedDate?.getTime() === date.getTime()
                      const disabled = isSun || isPast

                      return (
                        <button
                          key={d}
                          onClick={() => handleDayClick(d)}
                          disabled={disabled}
                          className={[
                            'h-9 w-full rounded-lg text-[13px] font-medium transition-all duration-150 flex items-center justify-center',
                            isSel
                              ? 'bg-exportcar-red text-white'
                              : disabled
                              ? 'text-exportcar-text-secondary/25 cursor-not-allowed'
                              : isTod
                              ? 'text-exportcar-text font-semibold border border-exportcar-red/40 hover:bg-exportcar-red/8 cursor-pointer'
                              : 'text-exportcar-text hover:bg-exportcar-surface-secondary cursor-pointer',
                          ].join(' ')}
                        >
                          {d}
                        </button>
                      )
                    })}
                  </div>

                </div>

                {/* Time slots */}
                <div className="rounded-2xl p-6" style={{ background: '#FFFFFF', border: '1px solid #E5E1DC' }}>
                  <p className="text-[13px] font-semibold text-exportcar-text-secondary uppercase tracking-wider mb-4">
                    Choisissez un créneau
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={[
                          'py-2.5 rounded-lg text-[13px] font-medium border transition-all duration-150 cursor-pointer',
                          selectedSlot === slot
                            ? 'bg-exportcar-red text-white border-exportcar-red'
                            : 'bg-transparent text-exportcar-text-secondary border-exportcar-border hover:text-exportcar-text hover:border-exportcar-text/30',
                        ].join(' ')}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── Right: Form ── */}
              <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: '#FFFFFF', border: '1px solid #E5E1DC' }}>

                {/* Type de RDV */}
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-exportcar-text-secondary mb-3">
                    Type de rendez-vous
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {RDV_TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => setRdvType(t)}
                        className={[
                          'px-4 py-2 rounded-full text-[13px] font-medium border transition-all duration-150 cursor-pointer',
                          rdvType === t
                            ? 'bg-exportcar-red text-white border-exportcar-red'
                            : 'bg-transparent text-exportcar-text-secondary border-exportcar-border hover:text-exportcar-text hover:border-exportcar-text/30',
                        ].join(' ')}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-exportcar-border" />

                {/* Nom & Prénom */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-exportcar-text-secondary mb-2">
                    Nom &amp; Prénom <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    value={nom}
                    onChange={e => setNom(e.target.value)}
                    placeholder="Ahmed Benali"
                    className="w-full bg-exportcar-surface-secondary border border-exportcar-border rounded-xl px-4 py-3 text-exportcar-text text-[14px] placeholder-exportcar-text-secondary/40 outline-none focus:border-exportcar-red/50 focus:bg-exportcar-surface transition-all duration-150"
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-exportcar-text-secondary mb-2">
                    Téléphone / WhatsApp <span className="text-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    value={tel}
                    onChange={e => setTel(e.target.value)}
                    placeholder="+33 6 00 00 00 00"
                    className="w-full bg-exportcar-surface-secondary border border-exportcar-border rounded-xl px-4 py-3 text-exportcar-text text-[14px] placeholder-exportcar-text-secondary/40 outline-none focus:border-exportcar-red/50 focus:bg-exportcar-surface transition-all duration-150"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-exportcar-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full bg-exportcar-surface-secondary border border-exportcar-border rounded-xl px-4 py-3 text-exportcar-text text-[14px] placeholder-exportcar-text-secondary/40 outline-none focus:border-exportcar-red/50 focus:bg-exportcar-surface transition-all duration-150"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-exportcar-text-secondary mb-2">
                    Message <span className="text-exportcar-text-secondary/60 normal-case tracking-normal font-normal">(optionnel)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Précisez votre demande ou le véhicule qui vous intéresse…"
                    rows={3}
                    className="w-full bg-exportcar-surface-secondary border border-exportcar-border rounded-xl px-4 py-3 text-exportcar-text text-[14px] placeholder-exportcar-text-secondary/40 outline-none focus:border-exportcar-red/50 focus:bg-exportcar-surface transition-all duration-150 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={[
                    'w-full py-4 rounded-xl text-[15px] font-semibold transition-all duration-200',
                    canSubmit
                      ? 'bg-exportcar-red text-white hover:bg-exportcar-red-hover cursor-pointer shadow-[0_0_20px_rgba(204,0,0,0.20)]'
                      : 'bg-exportcar-surface-secondary text-exportcar-text-secondary/40 cursor-not-allowed',
                  ].join(' ')}
                >
                  Confirmer le rendez-vous
                </button>

                <p className="text-center text-[11px] text-exportcar-text-secondary/50">
                  Champs obligatoires : concession, date, créneau, nom, téléphone
                </p>

              </div>
            </div>

          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════
            STEP 3 — Confirmation
        ══════════════════════════════════════════════════════ */}
        {step === 3 && (
          <motion.div key="step3" {...fade}
            className="min-h-[calc(100vh-var(--nav-h,72px))] flex items-center justify-center px-6 py-20"
          >
            <div className="w-full max-w-[480px] text-center">

              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.1 }}
                className="inline-flex items-center justify-center w-[88px] h-[88px] rounded-full bg-exportcar-red/20 text-exportcar-red border border-exportcar-red/40 mb-8 mx-auto"
              >
                <IconCheck />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <h2 className="text-[32px] font-bold text-white tracking-tight mb-2">
                  Rendez-vous confirmé
                </h2>
                <p className="text-exportcar-red font-medium mb-8">✓ Demande enregistrée</p>

                {/* Summary card */}
                <div className="rounded-2xl p-6 mb-8 text-left" style={{ background: '#FFFFFF', border: '1px solid #E5E1DC' }}>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-exportcar-text-secondary font-semibold">Concession</span>
                      <span className="text-[14px] text-exportcar-text font-medium">{selectedShowroom?.city}</span>
                    </div>
                    <div className="h-px bg-exportcar-border" />
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-exportcar-text-secondary font-semibold">Date</span>
                      <span className="text-[14px] text-exportcar-text font-medium capitalize">
                        {selectedDate ? formatDateFR(selectedDate) : '—'}
                      </span>
                    </div>
                    <div className="h-px bg-exportcar-border" />
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-exportcar-text-secondary font-semibold">Créneau</span>
                      <span className="text-[14px] text-exportcar-text font-medium">{selectedSlot}</span>
                    </div>
                    <div className="h-px bg-exportcar-border" />
                    <div className="flex items-start justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-exportcar-text-secondary font-semibold">Nom</span>
                      <span className="text-[14px] text-exportcar-text font-medium">{nom}</span>
                    </div>
                  </div>
                </div>

                <p className="text-[14px] text-white/70 mb-8">
                  Nous vous contacterons sous 24h pour confirmer votre rendez-vous.
                </p>

                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white/80 hover:text-white hover:border-white/60 text-[14px] font-medium transition-all duration-200"
                >
                  Retour à l&apos;accueil
                </Link>
              </motion.div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </main>
    </>
  )
}
