import React from 'react';
import { CTA } from '../../config/cta';
import Carousel3D from '../../components/Carousel3D';
import Image from 'next/image';

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

      <section className="airy-section" id="insights">
        <div className="wrap">
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>Insights</div>
          <h2 className="section-header" style={{ marginBottom: '64px' }}>Pressure Tips &amp; Training Insights</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px' }}>
            <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', minHeight: '500px' }}>
               <Image src="/bento_player_backhand_1783528140582.jpg" alt="Player Training" fill style={{ objectFit: 'cover' }} />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,0.95), rgba(10,20,10,0.2))' }}></div>
               <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
                 <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>Tactics</div>
                 <h3 style={{ color: '#fff', fontSize: '32px', marginBottom: '16px', lineHeight: 1.2 }}>Two More Points At 5-5: How To Win The Tiebreak</h3>
                 <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>Learn how to shift your identity when facing championship point. We break down the exact mechanics required to help you win the points that matter.</p>
                 <a href="#" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid var(--lime)', paddingBottom: '4px' }}>Read Article &rarr;</a>
               </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ padding: '32px', background: 'var(--bg-light)', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '8px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 600 }}>
                   <span>Identity</span> &bull; <span>3 Min Read</span>
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px', lineHeight: 1.3 }}>The Identity Shift That Survives Championship Point</h3>
                <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>Cortisol floods your system. Blood is diverted from your prefrontal cortex. How to stop the bleed.</p>
              </div>

              <div style={{ padding: '32px', background: 'var(--bg-light)', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', gap: '8px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 600 }}>
                   <span>Mechanics</span> &bull; <span>5 Min Read</span>
                </div>
                <h3 style={{ fontSize: '22px', marginBottom: '12px', lineHeight: 1.3 }}>Why Your Forehand Breaks Down Under Pressure</h3>
                <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.6 }}>It's not your swing path. It's your eye tracking and footwork micro-adjustments.</p>
              </div>

              <div style={{ padding: '40px', background: 'var(--bg-dark)', color: '#fff', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '16px' }}>Unlock The Vault</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>Gain access to expert advice, tactical drills, and mental strategies from Grand Slam coaches.</p>
                <a href={CTA.url} className="btn-dark" style={{ alignSelf: 'flex-start', background: 'var(--lime)', color: '#111' }}>{CTA.labelArrow}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
