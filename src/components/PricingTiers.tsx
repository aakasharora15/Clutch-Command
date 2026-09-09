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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Tier 1 */}
          <SpotlightCard spotlightColor="rgba(255,255,255,0.05)" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>The Foundation</h3>
            <p style={{ color: 'var(--lime)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>T.R.U.S.T. Playbook</p>
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 'bold', marginBottom: '32px' }}>£9</div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {['The Biology of a Choke', 'Cortisol & Spatial Tracking', '3 On-Court Reset Protocols', 'Lifetime Access'].map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.8)', fontSize: '14px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#checkout" className="btn-outline" style={{ textAlign: 'center', width: '100%' }}>Get The Playbook</a>
          </SpotlightCard>

          {/* Tier 2 */}
          <SpotlightCard spotlightColor="rgba(255, 255, 255, 0.1)" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>The Curriculum</h3>
            <p style={{ color: 'var(--lime)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Clutch Academies</p>
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 'bold', marginBottom: '32px' }}>£29<span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 'normal' }}>/mo</span></div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {['Singles drills by Vlado Platenik', 'Doubles tactics by Dan Kiernan', 'High-intensity pressure repetition', 'Access to the private community'].map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', fontSize: '14px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href={CTA.url} className="btn-outline" style={{ textAlign: 'center', width: '100%' }}>Take the CQ Diagnostic</a>
          </SpotlightCard>

          {/* Tier 3 */}
          <SpotlightCard spotlightColor="rgba(202, 255, 51, 0.15)" style={{ background: 'rgba(202, 255, 51, 0.05)', border: '1px solid var(--lime)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--lime)', color: '#111', padding: '4px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Premium</div>
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>The Analysis</h3>
            <p style={{ color: 'var(--lime)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Clutch Command</p>
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 'bold', marginBottom: '32px' }}>£99<span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', fontWeight: 'normal' }}>/mo</span></div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 48px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
              {['Everything in The Curriculum', 'Upload custom training film', '4-week execution & review cycle', 'Custom feedback on cognitive leaks'].map((feature, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff', fontSize: '14px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {feature}
                </li>
              ))}
            </ul>
            <a href={CTA.url} className="btn-dark" style={{ background: 'var(--lime)', color: '#111', textAlign: 'center', width: '100%' }}>Take the CQ Diagnostic</a>
          </SpotlightCard>

        </div>
      </div>
    </section>
  );
}
