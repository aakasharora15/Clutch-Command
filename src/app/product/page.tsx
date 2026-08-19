import React from 'react';
import { CTA } from '../../config/cta';
import Carousel3D from '../../components/Carousel3D';
import Image from 'next/image';

export default function ProductPage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px' }}>
      
      {/* ===== HERO NARRATIVE ===== */}
      <section className="airy-section dark" id="story">
        <div className="wrap">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 32px 0', textTransform: 'uppercase', color: '#fff' }}>
              The Arsenal.
            </h1>
            <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '800px', margin: '0 auto' }}>
              We don't build forehands. We build the cognitive resilience to hit them when the match is on the line.
            </p>
          </div>
        </div>
      </section>

      <section className="carousel-3d-section" id="moments" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '160px' }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>On The Court</div>
          <div className="carousel-3d-header">
            <h2 className="section-header" style={{ color: '#fff' }}>Moments From The Court:<br/>Training, Matches, And Pressure</h2>
          </div>
          <Carousel3D />
        </div>
      </section>

      <section className="airy-section dark" id="insights">
        <div className="wrap">
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>Insights</div>
          <h2 className="section-header" style={{ marginBottom: '64px', color: '#fff' }}>Pressure Tips &amp; Training Insights</h2>
          
          <div className="bento-grid">
            
            <div className="bento-item glass" style={{ gridColumn: 'span 7', position: 'relative', overflow: 'hidden', minHeight: '600px', padding: 0 }}>
               <Image src="/bento_player_backhand_1783528140582.jpg" alt="Player Training" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 60vw" />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,0.95), rgba(10,20,10,0.2))' }}></div>
               <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px' }}>
                 <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '24px' }}>Tactics</div>
                 <h3 style={{ color: '#fff', fontSize: '40px', marginBottom: '16px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>Two More Points At 5-5:<br/>How To Win The Tiebreak</h3>
                 <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '500px' }}>Learn how to shift your identity when facing championship point. We break down the exact mechanics required to help you win the points that matter.</p>
                 <a href="/blog/tactics-evolution" style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid var(--lime)', paddingBottom: '4px', fontSize: '15px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Read Article &rarr;</a>
               </div>
            </div>
            
            <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="bento-item glass" style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: '16px', fontWeight: 700, letterSpacing: '0.05em' }}>
                   <span>Identity</span> &bull; <span>3 Min Read</span>
                </div>
                <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>The Identity Shift That Survives Championship Point</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>Cortisol floods your system. Blood is diverted from your prefrontal cortex. How to stop the bleed.</p>
              </div>

              <div className="bento-item glass" style={{ padding: '40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', fontSize: '12px', textTransform: 'uppercase', color: 'var(--lime)', marginBottom: '16px', fontWeight: 700, letterSpacing: '0.05em' }}>
                   <span>Mechanics</span> &bull; <span>5 Min Read</span>
                </div>
                <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>Why Your Forehand Breaks Down Under Pressure</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>It's not your swing path. It's your eye tracking and footwork micro-adjustments.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
