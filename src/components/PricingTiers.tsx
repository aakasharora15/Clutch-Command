import React from 'react';
import { CTA } from '../config/cta';
import SpotlightCard from './SpotlightCard';

export default function PricingTiers() {
  return (
    <section className="airy-section" style={{ background: 'var(--bg-dark)' }} id="pricing">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>Membership Options</div>
          <h2 className="section-header" style={{ color: '#fff' }}>Choose Your Path to Clutch.</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Tier 1 */}
          <SpotlightCard spotlightColor="rgba(255,255,255,0.05)" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '48px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>The Playbook</h3>
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>£9</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '32px' }}>The foundational theory of cognitive breakdown and the 3 physical reset triggers.</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {['The Biology of a Choke', 'Cortisol & Spatial Tracking', '3 On-Court Reset Protocols', 'Lifetime Access'].map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href={CTA.url} className="btn-dark" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>Get The Playbook</a>
          </SpotlightCard>

          {/* Tier 2 */}
          <SpotlightCard spotlightColor="rgba(202, 255, 51, 0.15)" style={{ background: 'rgba(202, 255, 51, 0.05)', border: '1px solid var(--lime)', borderRadius: '24px', padding: '48px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--lime)', color: '#111', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Most Popular</div>
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>The Academy</h3>
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 'bold', marginBottom: '8px' }}>£29<span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 'normal' }}>/mo</span></div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '32px' }}>Full access to the interactive diagnostic dashboard and stress inoculation training.</p>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {['Everything in the Playbook', 'Biometric Diagnostic Testing', 'Match Film Analysis Breakdown', 'Stress-Inoculation Simulator', 'Weekly Group Coaching Calls'].map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', fontSize: '15px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="/academies" className="btn-dark" style={{ background: 'var(--lime)', color: '#111', textAlign: 'center' }}>Join the Academy</a>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
