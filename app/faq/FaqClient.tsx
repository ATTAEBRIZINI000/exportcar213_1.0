'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface FaqItem {
  q: string
  a: React.ReactNode
  tag?: string
}

interface FaqSection {
  id: string
  title: string
  items: FaqItem[]
}

const sections: FaqSection[] = [
  {
    id: 'documents',
    title: 'Documents requis',
    items: [
      {
        q: "Quels documents faut-il pour exporter une voiture vers l'Algérie ?",
        tag: 'Algérie',
        a: (<><p>Pour exporter un véhicule vers l&apos;Algérie, il vous faut l&apos;un des trois titres suivants :</p><ul><li><strong>CCR (Certificat de Changement de Résidence)</strong> — délivré par le consulat algérien en France pour les ressortissants qui reviennent définitivement en Algérie.</li><li><strong>Passeport biométrique algérien</strong> — pour les binationaux franco-algériens résidant en France. Le véhicule doit avoir moins de 3 ans et moins de 60 000 km.</li><li><strong>FCR (Franchise de Cotisation de Retraite)</strong> — pour les retraités algériens en France.</li></ul><p>En plus du titre d&apos;exportation, vous aurez besoin de : carte grise française, carte d&apos;identité ou passeport, justificatif de résidence en France.</p></>),
      },
      {
        q: "Quelle est la différence entre CCR, Passeport et FCR ?",
        a: (<><p><strong>CCR :</strong> Pour les Algériens qui transfèrent définitivement leur résidence en Algérie. Permet d&apos;importer un véhicule de moins de 3 ans avec exonération totale des droits de douane. Valable une seule fois tous les 5 ans.</p><p><strong>Passeport biométrique :</strong> Pour les binationaux résidant légalement en France. Le véhicule doit avoir moins de 3 ans et 60 000 km maximum. Franchise réduite possible selon les cas.</p><p><strong>FCR :</strong> Pour les retraités algériens résidant en France. Conditions similaires au CCR mais réservé aux personnes à la retraite.</p></>),
      },
      {
        q: "Quels documents pour exporter vers la Tunisie ?",
        tag: 'Tunisie',
        a: (<><p>Pour la Tunisie, le dispositif d&apos;importation pour les résidents à l&apos;étranger (RNT) permet d&apos;importer un véhicule avec une exonération douanière sous conditions :</p><ul><li>Résider légalement en France depuis au moins 6 mois</li><li>Véhicule de moins de 3 ans à la date d&apos;importation</li><li>Ne pas avoir bénéficié du même avantage depuis 5 ans</li><li>Documents : carte de séjour française, passeport tunisien, titre de résidence</li></ul><p>Notre équipe vous accompagne dans toutes les démarches administratives tunisiennes.</p></>),
      },
      {
        q: "Comment obtenir le CCR ?",
        a: (<><p>Le CCR s&apos;obtient auprès du <strong>Consulat général d&apos;Algérie</strong> dont vous dépendez en France (Paris, Lyon, Marseille, etc.).</p><p>Pièces à fournir généralement demandées :</p><ul><li>Formulaire de demande CCR rempli</li><li>Passeport algérien valide</li><li>Justificatif de résidence en France</li><li>Titre de séjour ou carte de résident</li><li>Justificatif de la mutation professionnelle (si applicable)</li></ul><p>Le délai de traitement varie entre 1 et 3 semaines selon le consulat. Nous vous conseillons d&apos;engager la démarche avant de sélectionner votre véhicule.</p></>),
      },
    ],
  },
  {
    id: 'procedure',
    title: "Procédure d'import",
    items: [
      {
        q: "Comment se déroule l'achat et l'export en pratique ?",
        a: (<><p>Le processus complet se déroule en 5 étapes :</p><ul><li><strong>1. Sélection du véhicule</strong> — Choisissez votre véhicule dans notre inventaire ou contactez-nous pour une recherche personnalisée.</li><li><strong>2. Vérification des documents</strong> — Nous vérifions la validité de vos documents d&apos;exportation (CCR, Passeport, FCR).</li><li><strong>3. Signature du bon de commande</strong> — Signature du contrat et versement de l&apos;acompte (généralement 20-30%).</li><li><strong>4. Préparation export</strong> — Nous gérons les formalités douanières françaises, le certificat d&apos;exportation et la mise en conformité.</li><li><strong>5. Embarquement et livraison</strong> — Le véhicule est chargé sur le navire depuis Marseille ou Le Havre. Livraison au port de destination.</li></ul></>),
      },
      {
        q: "Puis-je visiter le showroom avant d'acheter ?",
        a: (<><p>Absolument. Nous vous encourageons à venir visiter nos showrooms de <strong>Nanterre (92)</strong> ou de <strong>Caen (14)</strong>. Vous pourrez voir et inspecter les véhicules physiquement.</p><p>Pour les clients éloignés, nous proposons également des visites virtuelles par vidéo WhatsApp avec notre équipe. Contactez-nous pour planifier une session.</p></>),
      },
      {
        q: "Le véhicule peut-il être conduit avant l'exportation ?",
        a: (<><p>Oui, le véhicule reste immatriculé en France et peut être conduit librement jusqu&apos;à son export. Une fois le dossier d&apos;exportation déclenché, il vous sera remis avec des plaques d&apos;exportation provisoires (WW ou TT) valables pour le transit.</p><p><strong>Attention :</strong> pour les véhicules exportés avec un CCR ou Passeport, le kilométrage au moment de l&apos;export ne doit pas dépasser les limites réglementaires.</p></>),
      },
    ],
  },
  {
    id: 'douane',
    title: 'Douane & taxes',
    items: [
      {
        q: "Y a-t-il des droits de douane à payer en Algérie ?",
        tag: 'Algérie',
        a: (<><p>Avec un <strong>CCR ou FCR valide</strong>, vous bénéficiez d&apos;une <strong>exonération totale</strong> des droits de douane et de TVA algérienne pour un véhicule neuf ou récent.</p><p>Avec un <strong>passeport biométrique</strong>, une franchise partielle s&apos;applique. Les taxes résiduelles varient selon la valeur du véhicule et la cylindrée. Notre équipe peut vous fournir une estimation précise avant l&apos;achat.</p><p>Des frais de dédouanement locaux (frais de port, manutention, scanner) restent à prévoir, généralement entre 500 et 1 500 € selon la destination.</p></>),
      },
      {
        q: "Quelles taxes s'appliquent pour la Tunisie ?",
        tag: 'Tunisie',
        a: (<><p>Pour les résidents tunisiens à l&apos;étranger (RNT), le régime d&apos;importation temporaire ou définitive s&apos;applique selon la durée de séjour prévue en Tunisie.</p><p>En cas d&apos;importation définitive avec le statut RNT : exonération des droits de douane sous conditions. Des taxes locales (TVA tunisienne, droits de circulation) restent applicables.</p><p>Nous travaillons avec des transitaires agréés en Tunisie qui vous assistent dans les démarches de dédouanement local.</p></>),
      },
      {
        q: "Quelles taxes y a-t-il côté France à l'export ?",
        a: (<><p>En France, l&apos;exportation d&apos;un véhicule hors UE permet de récupérer la TVA sur les véhicules neufs (sous conditions et formalités). Nos prix sont indiqués HT (hors taxes).</p><p>Les formalités douanières françaises (DAE — Document d&apos;Accompagnement Export) sont gérées par nos soins. Le véhicule doit quitter le territoire européen dans un délai réglementaire à partir de la date d&apos;achat.</p></>),
      },
    ],
  },
  {
    id: 'financement',
    title: 'Financement',
    items: [
      {
        q: "Proposez-vous des solutions de financement ?",
        a: (<><p>Oui, nous travaillons avec des organismes de crédit partenaires qui proposent des solutions de financement adaptées à l&apos;achat export :</p><ul><li>Crédit classique sur 12 à 60 mois</li><li>LOA (Location avec Option d&apos;Achat) — sous conditions</li><li>Paiement en plusieurs fois sans frais pour certains montants</li></ul><p>La demande de financement est soumise à l&apos;accord de l&apos;organisme de crédit. Nous vous conseillons de préparer vos 3 derniers bulletins de salaire, avis d&apos;imposition et justificatif de domicile.</p></>),
      },
      {
        q: "Puis-je payer en plusieurs fois depuis l'Algérie ou la Tunisie ?",
        a: (<><p>Le paiement doit être effectué depuis un compte bancaire français ou européen. Les virements depuis l&apos;Algérie ou la Tunisie sont soumis aux réglementations de change locales et peuvent être complexes.</p><p>Nous acceptons le paiement par <strong>virement bancaire SEPA</strong> ou <strong>chèque de banque</strong>. Un acompte de 20 à 30% est requis à la commande, le solde étant réglé avant l&apos;embarquement.</p></>),
      },
    ],
  },
  {
    id: 'livraison',
    title: 'Délais & livraison',
    items: [
      {
        q: "Quel est le délai entre l'achat et la réception du véhicule ?",
        a: (<><p>Le délai moyen de bout en bout est de <strong>4 à 8 semaines</strong> selon la destination :</p><ul><li><strong>Algérie (Oran / Alger) :</strong> 3 à 5 semaines après embarquement</li><li><strong>Tunisie (Tunis / Sfax) :</strong> 2 à 4 semaines après embarquement</li></ul><p>Le délai inclut : préparation du dossier (1-2 sem.), transport maritime (1-2 sem.), et formalités douanières au port d&apos;arrivée (1-2 sem.).</p></>),
      },
      {
        q: "Depuis quel port part le véhicule ?",
        a: (<><p>Selon la destination et la compagnie maritime, l&apos;embarquement s&apos;effectue depuis :</p><ul><li><strong>Port de Marseille</strong> — pour l&apos;Algérie et la Tunisie (liaisons fréquentes)</li><li><strong>Port du Havre</strong> — selon disponibilité et tarification</li></ul><p>Nous gérons le transport jusqu&apos;au port d&apos;embarquement. Vous recevrez le numéro de conteneur et pouvez suivre votre véhicule en temps réel via le site de la compagnie maritime.</p></>),
      },
    ],
  },
  {
    id: 'vehicules',
    title: 'Choix du véhicule',
    items: [
      {
        q: "Y a-t-il une limite d'âge ou de kilométrage pour l'export ?",
        a: (<><p>Cela dépend du document d&apos;exportation et de la destination :</p><ul><li><strong>CCR Algérie :</strong> véhicule de moins de 3 ans à la date de la demande CCR</li><li><strong>Passeport biométrique :</strong> véhicule de moins de 3 ans et moins de 60 000 km</li><li><strong>FCR :</strong> conditions similaires au CCR</li><li><strong>Tunisie RNT :</strong> moins de 3 ans en général</li></ul><p>Nous ne vendons que des véhicules conformes aux critères d&apos;export pour votre document. Chaque fiche véhicule précise les documents acceptés.</p></>),
      },
      {
        q: "Puis-je faire une demande de véhicule spécifique non visible dans l'inventaire ?",
        a: (<><p>Oui, absolument. Si vous ne trouvez pas le véhicule de vos rêves dans notre inventaire, nous proposons un service de <strong>recherche sur commande</strong>.</p><p>Précisez-nous : marque, modèle, motorisation, couleur, options souhaitées et budget. Notre équipe sourcing recherche pour vous dans notre réseau de plus de 200 concessionnaires partenaires en France.</p><p>Contactez-nous via WhatsApp ou le formulaire de contact pour lancer une recherche personnalisée.</p></>),
      },
    ],
  },
]

const CAT_IDS = ['documents', 'procedure', 'douane', 'financement', 'livraison', 'vehicules']
const CAT_LABELS: Record<string, string> = {
  documents: 'Documents requis',
  procedure: "Procédure d'import",
  douane: 'Douane & taxes',
  financement: 'Financement',
  livraison: 'Délais & livraison',
  vehicules: 'Choix du véhicule',
}

export default function FaqClient() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [activeSection, setActiveSection] = useState('documents')
  const [query, setQuery] = useState('')
  const answerRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveSection(id)
  }

  useEffect(() => {
    const onScroll = () => {
      let current = 'documents'
      sections.forEach(s => {
        const el = document.getElementById(s.id)
        if (el && window.scrollY >= el.offsetTop - 120) current = s.id
      })
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const lowerQuery = query.toLowerCase().trim()

  return (
    <>
      {/* PAGE HEADER */}
      <div className="page-header">
        <div className="container">
          <p className="label">Centre d&apos;aide</p>
          <h1 className="page-title bc">Questions <em>fréquentes</em></h1>
          <p style={{ fontSize: '17px', color: '#555', maxWidth: '520px' }}>
            Tout ce que vous devez savoir sur l&apos;export automobile vers l&apos;Algérie et la Tunisie.
          </p>
          <div className="faq-search">
            <input
              type="text"
              placeholder="Rechercher une question…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && setQuery(query)}
            />
            <button onClick={() => {}}>Rechercher</button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="faq-layout">
          {/* CATEGORY NAV */}
          <nav className="faq-cats" aria-label="Catégories FAQ">
            <p className="faq-cat-title">Catégories</p>
            {CAT_IDS.map(id => (
              <div
                key={id}
                className={`faq-cat-link${activeSection === id ? ' active' : ''}`}
                onClick={() => scrollToSection(id)}
              >
                <span className="cat-dot"></span>
                {CAT_LABELS[id]}
              </div>
            ))}
          </nav>

          {/* FAQ CONTENT */}
          <div>
            {sections.map(section => (
              <section key={section.id} className="faq-section" id={section.id}>
                <h2 className="faq-section-title bc">{section.title}</h2>
                {section.items
                  .filter(item => !lowerQuery || item.q.toLowerCase().includes(lowerQuery) || String(item.a).toLowerCase().includes(lowerQuery))
                  .map((item, i) => {
                    const key = `${section.id}-${i}`
                    const isOpen = openItems.has(key)
                    const innerEl = answerRefs.current[key]
                    return (
                      <div key={key} className={`faq-item${isOpen ? ' open' : ''}`}>
                        <div className="faq-question" onClick={() => toggleItem(key)}>
                          {item.q}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                        </div>
                        <div
                          className="faq-answer"
                          style={{ maxHeight: isOpen ? (innerEl ? innerEl.scrollHeight + 'px' : '9999px') : '0' }}
                        >
                          <div
                            className="faq-answer-inner"
                            ref={el => { answerRefs.current[key] = el }}
                          >
                            {item.tag && <span className="faq-tag">{item.tag}</span>}
                            {item.a}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </section>
            ))}

            {/* CTA */}
            <div className="faq-cta">
              <div className="faq-cta-text">
                <strong>Vous n&apos;avez pas trouvé votre réponse ?</strong>
                <span>Notre équipe répond en moins de 24h, 6j/7.</span>
              </div>
              <div className="faq-cta-btns">
                <a href="https://wa.me/33670512030" target="_blank" rel="noopener" className="btn-wa">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <Link href="/contact" className="btn-white">Formulaire de contact</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
