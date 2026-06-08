import Link from 'next/link'
import LeafletMap from '@/components/LeafletMap'

export const metadata = {
  title: 'Services & À propos — Export Car 213',
  description: 'Export Car 213 — Notre histoire, nos concessions à Nanterre (92) et Caen (14), nos services d\'export automobile vers l\'Algérie et la Tunisie.',
}

export default function AProposPage() {
  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-bg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/36.png" alt="" />
        </div>
        <div className="container about-hero-content">
          <p className="label">Notre histoire</p>
          <h1 className="hero-title bc">Simple.<br/><em>Transparent.</em><br/>Efficace.</h1>
          <p className="hero-sub">Depuis 2015, Export Car 213 accompagne la diaspora algérienne et tunisienne de France dans leur projet d&apos;export automobile.</p>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-strip">
        <div className="container">
          <div className="stats-strip-inner">
            <div className="stat-item"><div className="stat-val bc">500+</div><div className="stat-key">Véhicules exportés</div></div>
            <div className="stat-item"><div className="stat-val bc">10</div><div className="stat-key">Ans d&apos;expérience</div></div>
            <div className="stat-item"><div className="stat-val bc">2</div><div className="stat-key">Showrooms en France</div></div>
            <div className="stat-item"><div className="stat-val bc">4.9★</div><div className="stat-key">Note Google clients</div></div>
          </div>
        </div>
      </div>

      {/* STORY */}
      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/40.png" alt="Showroom Export Car 213" />
              <div className="story-img-accent"></div>
            </div>
            <div>
              <p className="section-label">Notre histoire</p>
              <h2 className="section-title bc">Nés d&apos;un besoin<br/><em>réel</em></h2>
              <p className="story-text">Export Car 213 est née d&apos;une frustration partagée par des milliers de familles franco-algériennes et franco-tunisiennes : la difficulté à trouver un interlocuteur de confiance pour exporter une voiture vers leur pays d&apos;origine.</p>
              <p className="story-text">En 2015, notre fondateur, lui-même issu de la diaspora algérienne, décide de créer une structure spécialisée, transparente et professionnelle, avec un seul objectif : simplifier le parcours d&apos;achat-export de A à Z.</p>
              <p className="story-text">Aujourd&apos;hui, avec deux showrooms (Nanterre et Caen), plus de 500 véhicules disponibles en permanence, et une équipe qui maîtrise parfaitement les procédures CCR, Passeport et FCR, Export Car 213 est devenu une référence dans son secteur.</p>
              <Link href="/inventaire" className="btn-primary">Voir notre stock</Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section">
        <div className="container">
          <p className="section-label">Nos engagements</p>
          <h2 className="section-title bc">Ce qui nous<br/><em>distingue</em></h2>
          <div className="values-grid">
            {[
              { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, title: 'Transparence totale', text: 'Aucun frais caché. Prix export affiché, conditions claires, accompagnement documentaire complet de la commande à la livraison au port.' },
              { icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>, title: 'Rapidité d\'exécution', text: 'Dossier traité en 48h, véhicule disponible immédiatement depuis nos stocks, embarquement organisé dans les meilleurs délais.' },
              { icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>, title: 'Équipe diaspora', text: 'Notre équipe bilingue connaît les codes culturels et les contraintes administratives des deux côtés de la Méditerranée.' },
              { icon: <><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>, title: 'Stock varié & disponible', text: '500+ véhicules en permanence, neufs et occasions, toutes marques, éligibles CCR/Passeport/FCR et vérifiés par nos techniciens.' },
              { icon: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>, title: 'Support réactif', text: 'Réponse WhatsApp garantie en moins de 2h pendant les heures d\'ouverture. Suivi personnalisé de votre dossier jusqu\'à la réception du véhicule.' },
              { icon: <polyline points="20 6 9 17 4 12"/>, title: 'Satisfaction garantie', text: 'Plus de 10 ans d\'expérience, une note Google de 4.9/5, et des centaines de clients qui nous font confiance chaque année.' },
            ].map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{v.icon}</svg>
                </div>
                <h3 className="value-title bc">{v.title}</h3>
                <p className="value-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="comment">
        <div className="container">
          <p className="section-label">Notre process</p>
          <h2 className="section-title bc">Comment ça<br/><em>marche ?</em></h2>
          <div className="steps-grid">
            {[
              { n: '1', title: 'Choisissez votre véhicule', text: 'Parcourez notre inventaire en ligne ou visitez nos showrooms. Nos conseillers vous guident selon votre budget et votre document d\'export.' },
              { n: '2', title: 'Vérification documents', text: 'Nous vérifions la validité de votre CCR, Passeport biométrique ou FCR et la conformité du véhicule avec les réglementations douanières.' },
              { n: '3', title: 'Commande & paiement', text: 'Signature du bon de commande, versement de l\'acompte. Nous préparons toutes les formalités administratives françaises pour l\'export.' },
              { n: '4', title: 'Préparation export', text: 'Certificat d\'exportation, DAE douanier, acheminement au port de Marseille ou Le Havre. Vous recevez votre numéro de suivi conteneur.' },
              { n: '5', title: 'Livraison au port', text: 'Le véhicule est livré au port d\'arrivée (Oran, Alger, Tunis…). Nos partenaires transitaires vous assistent pour le dédouanement local.' },
            ].map(s => (
              <div key={s.n} className="step">
                <div className="step-num bc">{s.n}</div>
                <h4 className="step-title bc">{s.title}</h4>
                <p className="step-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWROOMS */}
      <section className="showrooms-section">
        <div className="container">
          <p className="section-label">Nos showrooms</p>
          <h2 className="section-title bc">Deux concessions<br/><em>à votre service</em></h2>
          <div className="showrooms-grid">
            {[
              { num: '92', city: 'Paris', dept: 'Nanterre · Hauts-de-Seine (92)', addr: '45 av. Georges Clemenceau, 92000 Nanterre', tel: '06 70 51 20 30', mapsUrl: 'https://maps.google.com/?q=45+Georges+Clemenceau+92000+Nanterre' },
              { num: '14', city: 'Caen', dept: 'Calvados (14) · Normandie', addr: 'Caen — Calvados (14), Normandie', tel: '06 70 51 20 30', mapsUrl: 'https://maps.google.com/?q=Caen+14000' },
            ].map(s => (
              <div key={s.num} className="showroom-card">
                <div className="showroom-num">{s.num}</div>
                <div className="showroom-city bc">{s.city}</div>
                <div className="showroom-dept">{s.dept}</div>
                <div className="showroom-detail">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  {s.addr}
                </div>
                <div className="showroom-detail">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                  {s.tel}
                </div>
                <div className="showroom-hours">
                  <div className="hours-row"><span className="day">Lundi – Vendredi</span><span className="time">9h00 – 19h00</span></div>
                  <div className="hours-row"><span className="day">Samedi</span><span className="time">9h00 – 18h00</span></div>
                  <div className="hours-row"><span className="day">Dimanche</span><span className="time">Sur rendez-vous</span></div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link href="/contact" className="btn-primary">Prendre RDV</Link>
                  <a href={s.mapsUrl} target="_blank" rel="noopener" className="btn-ghost-white">Itinéraire</a>
                </div>
              </div>
            ))}
          </div>
          <LeafletMap className="map-container-lg" />
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>Prêt à commencer ?</p>
          <h2 className="section-title bc" style={{ maxWidth: '580px', margin: '0 auto 32px', textAlign: 'center' }}>
            Votre voiture vous<br/><em>attend à Nanterre</em>
          </h2>
          <div className="cta-btns">
            <Link href="/inventaire" className="btn-primary">Voir le stock</Link>
            <Link href="/contact" className="btn-green">Nous contacter</Link>
          </div>
        </div>
      </section>
    </>
  )
}
