import React from 'react';
import { CTA } from '../../config/cta';

export default function ProductPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      <section className="moments light-section" id="moments">
        <div className="wrap">
          <div className="section-eyebrow dark-text btn-outline-pill">On The Court</div>
          <h2 className="dark-text mt-4" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>Moments From The Court</h2>
          <p className="dark-text mt-4 mb-8" style={{ maxWidth: '500px' }}>
            A Glimpse Into The Training, The Matches, And The Pressure Moments That Drive Clutch Command Forward.
          </p>
          
          <div className="bento-3-col mt-8">
             <div className="bento-img-card" style={{ backgroundImage: "url('/media__1783528039061.png')", minHeight: '300px' }}>
                <div className="bento-card-label">Academy</div>
             </div>
             <div className="bento-img-card" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')", minHeight: '300px' }}>
                <div className="bento-card-label">Training</div>
             </div>
             <div className="bento-img-card" style={{ backgroundImage: "url('/bento_player_backhand_1783528140582.jpg')", minHeight: '300px' }}>
                <div className="bento-card-label">Match Play</div>
             </div>
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
