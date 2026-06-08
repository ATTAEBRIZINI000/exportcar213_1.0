'use client'

import { useState } from 'react'

interface Post {
  img: string
  cat: string
  catLabel: string
  title: string
  excerpt: string
  date: string
  read: string
}

const CATEGORIES = [
  { id: 'all',        label: 'Tous les articles' },
  { id: 'ccr',        label: 'CCR & Documents' },
  { id: 'douane',     label: 'Douane & Taxes' },
  { id: 'financement',label: 'Financement' },
  { id: 'algerie',    label: 'Export Algérie' },
  { id: 'tunisie',    label: 'Export Tunisie' },
  { id: 'conseils',   label: 'Conseils achat' },
]

export default function BlogClient({ posts }: { posts: Post[] }) {
  const [activeCat, setActiveCat] = useState('all')

  const filtered = activeCat === 'all' ? posts : posts.filter(p => p.cat === activeCat)

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header-dark">
        <div className="container">
          <p className="label" style={{ marginBottom: '12px' }}>Export Car 213</p>
          <h1 className="page-title bc" style={{ marginBottom: '16px' }}>Le guide<br/><em>de l&apos;export auto</em></h1>
          <p style={{ fontSize: '17px', color: '#1A5C2A', maxWidth: '520px' }}>
            Conseils pratiques, procédures, actualités — tout ce que la diaspora algérienne et tunisienne en France doit savoir.
          </p>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="cat-bar">
        <div className="container">
          <div className="cat-bar-inner">
            {CATEGORIES.map(c => (
              <span
                key={c.id}
                className={`cat-chip${activeCat === c.id ? ' active' : ''}`}
                onClick={() => setActiveCat(c.id)}
              >{c.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* BLOG CONTENT */}
      <div className="blog-section">
        <div className="container">
          <div className="blog-layout">
            <div>
              {/* FEATURED POST (always the CCR guide) */}
              {activeCat === 'all' && (
                <div className="featured-post" data-cat="ccr">
                  <div className="featured-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/3.png" alt="Guide CCR 2026" loading="lazy" />
                  </div>
                  <div className="featured-body">
                    <p className="post-cat">CCR & Documents</p>
                    <h2 className="post-title bc">Guide complet du CCR 2026 — Comment exporter votre voiture en Algérie</h2>
                    <p className="post-excerpt">Tout ce que vous devez savoir sur le Certificat de Changement de Résidence : qui peut en bénéficier, comment l&apos;obtenir, quels véhicules sont éligibles et comment éviter les erreurs fréquentes.</p>
                    <div className="post-meta">
                      <span>15 mai 2026</span><span className="dot"></span>
                      <span>8 min de lecture</span>
                    </div>
                    <a href="#" className="post-read-more" style={{ marginTop: '16px' }}>
                      Lire l&apos;article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </a>
                  </div>
                </div>
              )}

              {/* POST GRID */}
              <div className="post-grid">
                {filtered.map((p, i) => (
                  <article key={i} className="post-card">
                    <div className="post-card-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/assets/${p.img}`} alt={p.title} loading="lazy" />
                    </div>
                    <div className="post-card-body">
                      <p className="post-cat">{p.catLabel}</p>
                      <h3 className="post-title bc">{p.title}</h3>
                      <p className="post-excerpt">{p.excerpt}</p>
                      <div className="post-meta">
                        <span>{p.date}</span>
                        <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--gray-lt)', display: 'inline-block', margin: '0 8px' }}></span>
                        <span>{p.read} de lecture</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="blog-sidebar">
              <div className="sidebar-block">
                <h3 className="sidebar-title bc">Articles populaires</h3>
                {[
                  { img: '20.png', title: 'Passeport biométrique — ce qui change en 2026', date: '12 mai 2026' },
                  { img: '35.png', title: 'Tunisie RNT : mode d\'emploi complet', date: '8 mai 2026' },
                  { img: '30.png', title: 'Quelles voitures choisir pour l\'export Algérie ?', date: '1 mai 2026' },
                  { img: '12.png', title: 'Les 5 erreurs à éviter lors d\'un export', date: '24 avril 2026' },
                ].map((p, i) => (
                  <div key={i} className="sidebar-post">
                    <div className="sidebar-post-img">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/assets/${p.img}`} alt="" loading="lazy" />
                    </div>
                    <div>
                      <p className="sidebar-post-title bc">{p.title}</p>
                      <p className="sidebar-post-date">{p.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sidebar-block">
                <h3 className="sidebar-title bc">Thèmes</h3>
                <div className="tag-cloud">
                  {['CCR','Passeport','FCR','Douane','Algérie','Tunisie','Financement','Neuf','Occasion','Renault','VW','Cupra'].map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              <div className="sidebar-block">
                <h3 className="sidebar-title bc">Newsletter</h3>
                <p style={{ fontSize: '14px', color: 'var(--gray)', marginBottom: '12px' }}>Recevez nos guides et les nouveautés du stock en avant-première.</p>
                <div className="newsletter-form">
                  <input type="email" className="newsletter-input" placeholder="votre@email.com" />
                  <button className="newsletter-btn">S&apos;abonner</button>
                </div>
              </div>

              <div className="sidebar-block" style={{ background: 'var(--black)', padding: '24px', borderBottom: 'none' }}>
                <h3 className="sidebar-title bc" style={{ color: '#fff' }}>Une question ?</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px' }}>Notre équipe répond en direct sur WhatsApp, 6j/7.</p>
                <a
                  href="https://wa.me/33670512030"
                  target="_blank"
                  rel="noopener"
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#25D366', color: '#fff', fontFamily: 'Barlow Condensed, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '12px 20px', transition: 'background .2s' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Écrire sur WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
