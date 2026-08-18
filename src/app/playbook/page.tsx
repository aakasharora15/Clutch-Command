import React from 'react';
import Image from 'next/image';
import { CTA } from '../../config/cta';

export const metadata = {
  title: 'The £9 Playbook | Clutch Command',
  description: 'Win the deciding points of every match. The exact blueprint used by Grand Slam coaches.',
};

export default function PlaybookPage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <section className="airy-section dark">
        <div className="wrap" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '32px' }}>
            Exclusive Offer
          </div>
          
          <h1 style={{ fontSize: 'clamp(56px, 7vw, 96px)', lineHeight: 0.95, marginBottom: '32px', letterSpacing: '-0.02em', color: '#fff' }}>
            Stop giving away the points that decide matches.
          </h1>
          
          <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: '64px', maxWidth: '800px', margin: '0 auto 64px auto' }}>
            The exact cognitive stress protocols and tactical blueprints used by Grand Slam coaches to rewire a player's threat response at 5-5 in the third set.
          </p>

          <div className="bento-item glass" style={{ padding: '8px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'left', display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 350px', position: 'relative', minHeight: '500px', borderRadius: '24px', overflow: 'hidden' }}>
               <Image src="/tennis_blueprint.jpg" alt="Tactical Blueprint" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,0.8), transparent)' }}></div>
            </div>
            <div style={{ flex: '1 1 350px', padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '40px', marginBottom: '24px', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>The Clutch Playbook</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--lime)', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '12px' }}>✓</div>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.4 }}><strong>14-Day Rewiring:</strong> Force your nervous system to adapt to high-pressure scenarios.</span>
                </li>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--lime)', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '12px' }}>✓</div>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.4 }}><strong>Tactical Leaks:</strong> Identify why your baseline strategy breaks down under score-pressure.</span>
                </li>
                <li style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--lime)', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '12px' }}>✓</div>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', lineHeight: 1.4 }}><strong>CQ Algorithm:</strong> Measure the 30 specific variables that dictate tiebreak success.</span>
                </li>
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <span style={{ fontSize: '48px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>£9</span>
                <span style={{ textDecoration: 'line-through', color: 'rgba(255,255,255,0.4)', fontSize: '24px' }}>£49</span>
              </div>
              <a href={CTA.url} className="btn-dark" style={{ background: 'var(--lime)', color: '#111', display: 'block', textAlign: 'center', padding: '20px 24px', fontSize: '18px', fontWeight: 600 }}>
                Get The Playbook Now &rarr;
              </a>
            </div>
          </div>

          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#fff' }}>100% Ironclad Guarantee</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto', fontSize: '18px' }}>
              If this playbook doesn't give you at least two new strategies to close out your next match, email us and we'll refund your £9 immediately. Keep the playbook.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
