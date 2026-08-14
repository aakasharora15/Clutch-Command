import React from 'react';
import Image from 'next/image';
import ScrollReveal from '../../components/ScrollReveal';

export default function CoFoundersPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      
      {/* ===== HERO NARRATIVE ===== */}
      <section className="airy-section" id="story">
        <div className="wrap">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1, marginBottom: '24px' }}>Built From A Memory.</h1>
            <p style={{ fontSize: '24px', color: 'var(--text-muted)', lineHeight: 1.5 }}>Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away.</p>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '60vh', minHeight: '400px', borderRadius: '24px', overflow: 'hidden', marginTop: '64px' }}>
             <Image src="/bento_player_serve_1783528130916.jpg" alt="Mark Jeffery Serving" fill style={{ objectFit: 'cover' }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
          </div>
        </div>
      </section>

      {/* ===== THE ORIGIN ===== */}
      <section className="airy-section" style={{ background: 'var(--bg-light)' }}>
        <div className="wrap">
          <div className="grid-asym-3">
            <div className="text-col">
              <div className="section-eyebrow">The Origin</div>
              <h2 className="section-header" style={{ marginBottom: '24px' }}>Military Precision Meets The Court</h2>
              <p style={{ fontSize: '18px', lineHeight: 1.7, marginBottom: '24px' }}>
                Mark Jeffery didn't build Clutch Command from a sports science theory. He built it from a painful memory of pressure hijacking his brain and body when it mattered most.
              </p>
              <p style={{ fontSize: '18px', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                Clutch Quotient started life in the military: training people to make life-or-death decisions with no action replay. By measuring how cortisol and adrenaline degrade cognitive function, Mark developed protocols to artificially inoculate soldiers against stress. Now, it's the ultimate weapon for competitive tennis players.
              </p>
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden', gridColumn: 'span 2' }}>
               <Image src="/mark_jeffery.png" alt="Mark Jeffery Portrait" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE TEAM ===== */}
      <section className="airy-section dark">
        <div className="wrap">
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>The Coaching Staff</div>
          <h2 className="section-header">Grand Slam Expertise</h2>
          
          <div className="grid-cards-3" style={{ marginTop: '64px' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#333', marginBottom: '24px' }}></div>
              <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>Vlado Platenik</h3>
              <p style={{ color: 'var(--lime)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>Head of Singles Tactics</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>Former ATP professional and coach to multiple Grand Slam semi-finalists. Vlado engineers our baseline pressure drills.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#333', marginBottom: '24px' }}></div>
              <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>Dan Kiernan</h3>
              <p style={{ color: 'var(--lime)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>Head of Doubles Strategy</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>Elite doubles specialist. Dan breaks down court positioning and communication breakdown under match stress.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#333', marginBottom: '24px' }}></div>
              <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>Mark Jeffery</h3>
              <p style={{ color: 'var(--lime)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '16px' }}>Founder & Human Performance</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>Military performance expert turned tennis innovator. Creator of the Clutch Quotient framework.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
