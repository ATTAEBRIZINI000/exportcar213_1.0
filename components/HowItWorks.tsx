import Link from 'next/link'

export default function HowItWorks() {
  return (
    <section id="how-it-works">
      <div className="container">
        <div className="hiw-header fade-up">
          <p className="label">Notre processus</p>
          <h2 className="hiw-title">Comment ça marche</h2>
          <p className="hiw-subtitle">CCR, CCF, douane — on s&apos;occupe de tout</p>
        </div>

        <div className="hiw-steps">
          <div className="hiw-step fade-up">
            <div className="hiw-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
            </div>
            <p className="hiw-num">01</p>
            <h3 className="hiw-step-title">Choisissez votre véhicule</h3>
            <p className="hiw-step-desc">Parcourez notre stock de véhicules neufs et d&apos;occasion. Filtrez par marque, budget ou type selon votre projet.</p>
          </div>

          <div className="hiw-step fade-up" style={{ transitionDelay: '0.12s' }}>
            <div className="hiw-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
            </div>
            <p className="hiw-num">02</p>
            <h3 className="hiw-step-title">On gère tout l&apos;export</h3>
            <p className="hiw-step-desc">CCR, CCF, documents douaniers — notre équipe expérimentée s&apos;occupe de toutes les formalités administratives.</p>
          </div>

          <div className="hiw-step fade-up" style={{ transitionDelay: '0.24s' }}>
            <div className="hiw-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="1"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <p className="hiw-num">03</p>
            <h3 className="hiw-step-title">Livraison au pays</h3>
            <p className="hiw-step-desc">Votre véhicule vous est livré en Algérie, Tunisie ou Maroc. Sécurisé, assuré et suivi jusqu&apos;à la remise des clés.</p>
          </div>
        </div>

        <div className="hiw-cta fade-up">
          <Link href="/contact" className="btn-primary">
            Démarrer mon export
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
