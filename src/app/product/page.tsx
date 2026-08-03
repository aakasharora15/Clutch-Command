import React from 'react';
import { CTA } from '../../config/cta';
import Carousel3D from '../../components/Carousel3D';

export default function ProductPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      <section className="carousel-3d-section" id="moments">
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>&bull; On The Court</div>
          <div className="carousel-3d-header">
            <h2>Moments From The Court: The Training, Matches, And Pressure</h2>
          </div>
          <Carousel3D />
        </div>
      </section>

      <section className="airy-section" id="tips">
        <div className="wrap">
          <div className="section-eyebrow">Insights</div>
          <h2 className="section-header">Pressure Tips &amp; Training Insights</h2>
          <div className="grid-asym-3">
            <div className="text-col">
              <p>Gain access to expert advice, tactical drills, and mental strategies from Grand Slam coaches. We break down the exact mechanics required to help you win the points that matter - both on and off the court. Learn how to shift your identity when facing championship point.</p>
              <a href={CTA.url} className="btn-dark" style={{ marginTop: '32px' }}>{CTA.labelArrow}</a>
            </div>
            <div className="text-col" style={{ display: 'flex', flexDirection: 'column', gap: '32px', paddingRight: '20px' }}>
              <div className="article">
                <div className="article-meta" style={{ display: 'flex', gap: '8px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                   <span>Tactics</span> &bull; <span>4 Min</span>
                </div>
                <h3 style={{ fontSize: '24px', marginTop: '16px' }}>Two More Points At 5-5: How To Win The Tiebreak</h3>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #ddd' }} />
              <div className="article">
                <div className="article-meta" style={{ display: 'flex', gap: '8px', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                   <span>Identity</span> &bull; <span>3 Min</span>
                </div>
                <h3 style={{ fontSize: '24px', marginTop: '16px' }}>The Identity Shift That Survives Championship Point</h3>
              </div>
            </div>
            <div className="img-col" style={{ backgroundImage: "url('/bento_player_backhand_1783528140582.jpg')" }}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
