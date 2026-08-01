import React from 'react';
import { CTA } from '../../config/cta';

export default function ProductPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      <section className="carousel-3d-section" id="moments">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>&bull; On The Court</div>
          <div className="carousel-3d-header">
            <h2>Moments From The Court: The Training, Matches, And Pressure</h2>
          </div>
          
          <div className="carousel-3d-container">
            <div className="carousel-3d-card left-outer" style={{ backgroundImage: "url('/bento_player_backhand_1783528140582.jpg')" }}></div>
            <div className="carousel-3d-card left" style={{ backgroundImage: "url('/media__1783528047317.jpg')" }}></div>
            <div className="carousel-3d-card center" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')" }}></div>
            <div className="carousel-3d-card right" style={{ backgroundImage: "url('/media__1783528039061.png')" }}></div>
            <div className="carousel-3d-card right-outer" style={{ backgroundImage: "url('/hero_tennis_court_1783528122643.jpg')" }}></div>
          </div>

          <div className="carousel-nav">
            <button className="carousel-nav-btn">&larr;</button>
            <button className="carousel-nav-btn active">&rarr;</button>
          </div>
        </div>
      </section>

      <section className="tips light-section" id="tips">
        <div className="wrap bento-split">
          <div className="bento-text-left">
            <div className="section-eyebrow dark-text btn-outline-pill">Insights</div>
            <h2 className="dark-text mt-4">Pressure Tips &amp; Training Insights</h2>
            <p className="dark-text mt-4">
              Gain access to expert advice, tactical drills, and mental strategies from Grand Slam coaches. We break down the exact mechanics required to help you win the points that matter - both on and off the court. Learn how to shift your identity when facing championship point.
            </p>
            <a href={CTA.url} className="btn-dark mt-6">{CTA.labelArrow}</a>
          </div>
          <div className="bento-images-right" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="article">
              <div className="article-meta" style={{ display: 'flex', gap: '8px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                 <span>Tactics</span> &bull; <span>4 Min</span>
              </div>
              <h3 className="dark-text mt-4" style={{ fontSize: '20px' }}>Two More Points At 5-5: How To Win The Tiebreak</h3>
            </div>
            <hr style={{ border: 'none', borderBottom: '1px solid #ddd' }} />
            <div className="article">
              <div className="article-meta" style={{ display: 'flex', gap: '8px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                 <span>Identity</span> &bull; <span>3 Min</span>
              </div>
              <h3 className="dark-text mt-4" style={{ fontSize: '20px' }}>The Identity Shift That Survives Championship Point</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
