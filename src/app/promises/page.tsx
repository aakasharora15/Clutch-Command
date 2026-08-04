import React from 'react';
import { CTA } from '../../config/cta';

export default function PromisesPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      <section className="airy-section" id="promises">
        <div className="wrap">
          <div className="section-eyebrow">Our Promises</div>
          <h2 className="section-header">Measurable Results. Quantifiable Improvements.</h2>
          
          <div className="grid-cards-4" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            
            <div className="step-card" style={{ padding: '48px 32px', background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 12px 32px rgba(0,0,0,0.03)', textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1.5px #111', fontWeight: 800, fontSize: '80px', marginBottom: '16px', lineHeight: 1 }}>14</div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: 600, color: '#111' }}>Days To Shift</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>The timeframe required to biologically adapt to high-pressure scenarios using our cognitive stress protocols.</p>
            </div>
            
            <div className="step-card" style={{ padding: '48px 32px', background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 12px 32px rgba(0,0,0,0.03)', textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1.5px #111', fontWeight: 800, fontSize: '80px', marginBottom: '16px', lineHeight: 1 }}>30<span style={{ fontSize: '48px' }}>%</span></div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: 600, color: '#111' }}>Win Rate Increase</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>The average expected increase in break points saved and decisive tiebreak points won during match play.</p>
            </div>

            <div className="step-card" style={{ padding: '48px 32px', background: '#111', color: '#fff', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ color: 'var(--lime)', fontWeight: 800, fontSize: '80px', marginBottom: '16px', lineHeight: 1 }}>100<span style={{ fontSize: '48px' }}>%</span></div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: 600 }}>Money Back</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>If your Clutch Quotient doesn't improve after completing the program, we refund your investment entirely.</p>
            </div>

          </div>
          
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
             <a href={CTA.url} className="btn-dark" style={{ padding: '16px 36px', fontSize: '15px' }}>{CTA.labelArrow}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
