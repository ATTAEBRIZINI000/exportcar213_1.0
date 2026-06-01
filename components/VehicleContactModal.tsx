'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  brand: string
  name: string
}

export default function VehicleContactModal({ brand, name }: Props) {
  const [open, setOpen]       = useState(false)
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 1200)
  }

  function handleOpenChange(v: boolean) {
    setOpen(v)
    if (!v) setTimeout(() => setSent(false), 300)
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Trigger asChild>
        <button className="btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
          Envoyer une demande
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'fixed', inset: 0, zIndex: 2000,
                  background: 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                }}
              />
            </Dialog.Overlay>

            {/* Panel */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'fixed', zIndex: 2001,
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'min(520px, calc(100vw - 32px))',
                  background: '#fff',
                  padding: '40px',
                  outline: 'none',
                  maxHeight: '90dvh',
                  overflowY: 'auto',
                }}
              >
                {/* Close */}
                <Dialog.Close
                  aria-label="Fermer"
                  style={{
                    position: 'absolute', top: 16, right: 16,
                    width: 32, height: 32, borderRadius: '50%',
                    border: '1px solid #E8E8E8', background: '#fff',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#8A8A8A', transition: 'color .2s',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </Dialog.Close>

                <Dialog.Title
                  style={{
                    fontFamily: 'var(--font-barlow, sans-serif)',
                    fontSize: 26, fontWeight: 900,
                    textTransform: 'uppercase', letterSpacing: '0.01em',
                    color: '#1A1A1A', marginBottom: 4,
                  }}
                >
                  Demande de renseignements
                </Dialog.Title>

                <Dialog.Description style={{ fontSize: 14, color: '#8A8A8A', marginBottom: 28 }}>
                  {brand} {name} — réponse garantie sous 24h.
                </Dialog.Description>

                {sent ? (
                  <div style={{
                    textAlign: 'center', padding: '40px 0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: '#27AE60', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p style={{ fontFamily: 'var(--font-barlow, sans-serif)', fontSize: 20, fontWeight: 800, textTransform: 'uppercase', color: '#1A1A1A' }}>
                      Message envoyé !
                    </p>
                    <p style={{ fontSize: 14, color: '#8A8A8A' }}>
                      Notre équipe vous répondra dans les 24h ouvrées.
                    </p>
                    <button
                      onClick={() => setOpen(false)}
                      style={{
                        marginTop: 8, background: '#1A1A1A', color: '#fff',
                        fontFamily: 'var(--font-barlow, sans-serif)', fontSize: 14, fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '12px 28px', border: 'none', cursor: 'pointer',
                      }}
                    >
                      Fermer
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={labelStyle}>Prénom *</label>
                        <input required type="text" placeholder="Votre prénom" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Nom *</label>
                        <input required type="text" placeholder="Votre nom" style={inputStyle} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={labelStyle}>Email *</label>
                        <input required type="email" placeholder="votre@email.com" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Téléphone</label>
                        <input type="tel" placeholder="+33 6 XX XX XX XX" style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Message</label>
                      <textarea
                        placeholder={`Je suis intéressé par la ${brand} ${name}…`}
                        rows={4}
                        style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        marginTop: 4,
                        background: loading ? '#8A8A8A' : '#1A1A1A',
                        color: '#fff',
                        fontFamily: 'var(--font-barlow, sans-serif)',
                        fontSize: 15, fontWeight: 700,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '14px 28px', border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background .2s',
                      }}
                    >
                      {loading ? 'Envoi en cours…' : 'Envoyer la demande'}
                    </button>
                    <p style={{ fontSize: 12, color: '#8A8A8A', textAlign: 'center' }}>
                      * Champs obligatoires. Réponse sous 24h ouvrées.
                    </p>
                  </form>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 600,
  color: '#1A1A1A', marginBottom: 5, letterSpacing: '0.03em',
}

const inputStyle: React.CSSProperties = {
  width: '100%', border: '1px solid #E8E8E8',
  padding: '10px 14px', fontFamily: 'var(--font-inter, sans-serif)',
  fontSize: 14, color: '#1A1A1A', outline: 'none',
  background: '#fff', borderRadius: 0,
  boxSizing: 'border-box',
}
