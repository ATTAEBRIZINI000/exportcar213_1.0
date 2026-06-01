import reviews from '@/lib/reviews.json'

function StarIcon() {
  return (
    <svg className="star" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
}

export default function ReviewsTrack() {
  const doubled = [...reviews, ...reviews]

  return (
    <section id="reviews">
      <div className="container">
        <div className="section-head fade-up">
          <p className="label">Avis clients</p>
          <h2 className="section-title bc">Ils nous font<br/><em>confiance</em></h2>
        </div>
      </div>

      <div className="reviews-track-wrap">
        <div className="reviews-track">
          {doubled.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">
                {Array(r.rating).fill(0).map((_, j) => <StarIcon key={j} />)}
              </div>
              <p className="review-text">{r.text}</p>
              <div className="review-author">
                <div className="review-avatar">{r.initials}</div>
                <div>
                  <p className="review-name">{r.name}</p>
                  <p className="review-date">{r.date} · Google</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
