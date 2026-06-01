'use client'

import { useEffect, useState } from 'react'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('ec213_cookies')) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('ec213_cookies', '1')
    setVisible(false)
  }

  const dismiss = () => setVisible(false)

  return (
    <div id="cookie-banner" className={visible ? '' : 'hidden'} role="dialog" aria-label="Cookies">
      <p className="cookie-text">
        Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.
        En continuant, vous acceptez notre <a href="#">politique de confidentialité</a>.
      </p>
      <div className="cookie-actions">
        <button className="btn-cookie-params" onClick={dismiss}>Paramétrer</button>
        <button className="btn-cookie-accept" onClick={accept}>Accepter</button>
      </div>
    </div>
  )
}
