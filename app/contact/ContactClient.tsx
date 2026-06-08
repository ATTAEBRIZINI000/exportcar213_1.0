'use client'

import { useState } from 'react'
import Link from 'next/link'
import LeafletMap from '@/components/LeafletMap'

export default function ContactClient() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSent(true)
      setSending(false)
    }, 1200)
  }

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header-dark">
        <div className="container">
          <p className="label" style={{ marginBottom: '12px' }}>Export Car 213</p>
          <h1 className="page-title bc">Parlons de<br/><em>votre projet</em></h1>
          <p style={{ fontSize: '17px', color: '#1A5C2A', marginTop: '16px', maxWidth: '480px' }}>
            Notre équipe est disponible 6j/7 pour répondre à toutes vos questions sur l&apos;export automobile.
          </p>
        </div>
      </div>

      <div className="contact-section">
        <div className="container">
          <div className="contact-layout">

            {/* FORM */}
            <div className="form-card">
              <h2 className="form-title bc">Envoyer un message</h2>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">Prénom *</label>
                    <input type="text" id="firstName" className="form-input" placeholder="Votre prénom" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Nom *</label>
                    <input type="text" id="lastName" className="form-input" placeholder="Votre nom" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input type="email" id="email" className="form-input" placeholder="votre@email.com" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Téléphone</label>
                    <input type="tel" id="phone" className="form-input" placeholder="+33 6 XX XX XX XX" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">Objet de la demande</label>
                  <select id="subject" className="form-select">
                    <option value="">Sélectionner…</option>
                    <option>Demande sur un véhicule neuf</option>
                    <option>Demande sur un véhicule d&apos;occasion</option>
                    <option>Procédure d&apos;exportation</option>
                    <option>Documents CCR / Passeport / FCR</option>
                    <option>Prise de rendez-vous showroom</option>
                    <option>Autre demande</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="destination">Destination</label>
                  <select id="destination" className="form-select">
                    <option value="">Sélectionner…</option>
                    <option>Algérie</option>
                    <option>Tunisie</option>
                    <option>Maroc</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message *</label>
                  <textarea id="message" className="form-textarea" placeholder="Décrivez votre projet : type de véhicule souhaité, budget, destination, documents disponibles…" required></textarea>
                </div>
                <button
                  type="submit"
                  className="form-submit"
                  disabled={sending}
                  style={{ background: sent ? 'var(--green)' : undefined }}
                >
                  {sent ? 'Message envoyé ✓' : sending ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>
                <p className="form-note">* Champs obligatoires. Réponse sous 24h ouvrées.</p>
                {sent && (
                  <div className="success-msg visible">
                    ✓ Votre message a bien été envoyé ! Nous vous répondons dans les 24h.
                  </div>
                )}
              </form>
            </div>

            {/* CONTACT INFO */}
            <div>
              <a
                href="https://wa.me/33670512030?text=Bonjour%2C%20je%20souhaite%20des%20informations%20sur%20l'export%20automobile."
                target="_blank"
                rel="noopener"
                className="wa-block"
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div className="wa-block-text">
                  <strong>WhatsApp direct</strong>
                  <span>06 70 51 20 30 — Réponse rapide</span>
                </div>
                <span className="wa-block-btn">Écrire</span>
              </a>

              {[
                { city: 'Paris', dept: 'Nanterre · Hauts-de-Seine (92)', addr: '45 av. Georges Clemenceau, 92000 Nanterre', tel: '06 70 51 20 30', mapsUrl: 'https://maps.google.com/?q=45+Georges+Clemenceau+92000+Nanterre' },
                { city: 'Caen', dept: 'Calvados (14) · Normandie', addr: 'Caen — Calvados (14), Normandie', tel: '06 70 51 20 30', mapsUrl: 'https://maps.google.com/?q=Caen+14000' },
              ].map(s => (
                <div key={s.city} className="contact-showroom-card">
                  <div className="contact-showroom-city bc">{s.city}</div>
                  <div className="contact-showroom-dept">{s.dept}</div>
                  <div className="contact-showroom-detail">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {s.addr}
                  </div>
                  <div className="contact-showroom-detail">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                    {s.tel}
                  </div>
                  <div className="hours-grid">
                    <div className="contact-hours-row"><span className="day">Lundi – Vendredi</span><span className="time">9h00 – 19h00</span></div>
                    <div className="contact-hours-row"><span className="day">Samedi</span><span className="time">9h00 – 18h00</span></div>
                    <div className="contact-hours-row"><span className="day">Dimanche</span><span className="time">Sur rendez-vous</span></div>
                  </div>
                  <div className="showroom-actions">
                    <a href={s.mapsUrl} target="_blank" rel="noopener" className="btn-sm">Itinéraire</a>
                    <a href="tel:+33670512030" className="btn-sm">Appeler</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <LeafletMap className="map-container-contact" />
        </div>
      </div>
    </>
  )
}
