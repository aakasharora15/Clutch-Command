import React from 'react';
import Image from 'next/image';
import { CTA } from '../../config/cta';

export const metadata = {
  title: 'The £9 Playbook | Clutch Command',
  description: 'Win the deciding points of every match. The exact blueprint used by Grand Slam coaches.',
};

export default function PlaybookPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '80px', paddingBottom: '120px' }}>
      <section className="airy-section">
        <div className="wrap" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <div style={{ color: 'var(--lime)', WebkitTextStroke: '0.5px #111', fontWeight: 700, fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            Exclusive Offer
          </div>
          
          <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 1.1, marginBottom: '24px' }}>
            Stop giving away the points that decide matches.
          </h1>
          
          <p style={{ fontSize: '20px', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '40px' }}>
            The exact cognitive stress protocols and tactical blueprints used by Grand Slam coaches to rewire a player's threat response at 5-5 in the third set.
          </p>

          <div style={{ background: 'var(--bg-light)', borderRadius: '16px', padding: '48px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 24px 48px rgba(0,0,0,0.05)', marginBottom: '64px', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1 1 300px', position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
                 <Image src="/tennis_blueprint.jpg" alt="Tactical Blueprint" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <h3 style={{ fontSize: '28px', marginBottom: '16px' }}>The Clutch Playbook</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--lime)' }}>✓</span>
                    <span><strong>14-Day Rewiring:</strong> Force your nervous system to adapt to high-pressure scenarios.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--lime)' }}>✓</span>
                    <span><strong>Tactical Leaks:</strong> Identify why your baseline strategy breaks down under score-pressure.</span>
                  </li>
                  <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--lime)' }}>✓</span>
                    <span><strong>CQ Algorithm:</strong> Measure the 30 specific variables that dictate tiebreak success.</span>
                  </li>
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 800 }}>£9</span>
                  <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '18px' }}>£49</span>
                </div>
                <a href={CTA.url} className="btn-dark" style={{ marginTop: '24px', display: 'block', textAlign: 'center', padding: '18px 24px', fontSize: '16px' }}>
                  Get The Playbook Now &rarr;
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>100% Ironclad Guarantee</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
              If this playbook doesn't give you at least two new strategies to close out your next match, email us and we'll refund your £9 immediately. Keep the playbook.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
