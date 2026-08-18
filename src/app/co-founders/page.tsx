import React from 'react';
import Image from 'next/image';
import ScrollReveal from '../../components/ScrollReveal';
import SectionHeader from '../../components/SectionHeader';

export default function CoFoundersPage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px' }}>
      
      {/* ===== HERO NARRATIVE ===== */}
      <section className="airy-section dark" id="story">
        <div className="wrap">
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(64px, 8vw, 120px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 32px 0', textTransform: 'uppercase', color: '#fff' }}>
              Built From<br/>A Memory.
            </h1>
            <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '800px', margin: '0 auto' }}>
              Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away.
            </p>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '70vh', minHeight: '500px', borderRadius: '32px', overflow: 'hidden', marginTop: '80px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <Image src="/bento_player_serve_1783528130916.jpg" alt="Mark Jeffery Serving" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} priority sizes="100vw" />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-dark), transparent)' }}></div>
          </div>
        </div>
      </section>

      {/* ===== THE ORIGIN (Sticky Scroll) ===== */}
      <section className="airy-section" style={{ background: 'var(--bg-dark)' }}>
        <div className="wrap">
          <div className="grid-asym-3" style={{ alignItems: 'flex-start' }}>
            <div className="text-col" style={{ position: 'sticky', top: '140px' }}>
              <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>The Origin</div>
              <h2 className="section-header" style={{ color: '#fff' }}>Military Precision Meets The Court.</h2>
              <p style={{ fontSize: '20px', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
                Mark Jeffery didn't build Clutch Command from a sports science theory. He built it from a painful memory of pressure hijacking his brain and body when it mattered most.
              </p>
              <p style={{ fontSize: '20px', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)' }}>
                Clutch Quotient started life in the military: training people to make life-or-death decisions with no action replay. By measuring how cortisol and adrenaline degrade cognitive function, Mark developed protocols to artificially inoculate soldiers against stress. Now, it's the ultimate weapon for competitive tennis players.
              </p>
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden', borderRadius: '32px', minHeight: '800px', border: '1px solid rgba(255,255,255,0.05)' }}>
               <Image src="/mark_jeffery.png" alt="Mark Jeffery Portrait" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
               <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', background: 'rgba(10,20,10,0.5)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', padding: '32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                 <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>Mark Jeffery</h3>
                 <p style={{ color: 'var(--lime)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '13px', fontWeight: 600 }}>Founder & Human Performance</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE TEAM (Bento Grid) ===== */}
      <section className="airy-section dark">
        <div className="wrap">
          <SectionHeader eyebrow="The Coaching Staff" title="Grand Slam Expertise" />
          
          <div className="bento-grid" style={{ marginTop: '64px' }}>
            
            <div className="bento-item glass" style={{ gridColumn: 'span 6', padding: '48px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Vlado Platenik</h3>
              <p style={{ color: 'var(--lime)', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: 600 }}>Head of Singles Tactics</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, margin: 0 }}>Former ATP professional and coach to multiple Grand Slam semi-finalists. Vlado engineers our baseline pressure drills.</p>
            </div>
            
            <div className="bento-item glass" style={{ gridColumn: 'span 6', padding: '48px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Dan Kiernan</h3>
              <p style={{ color: 'var(--lime)', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: 600 }}>Head of Doubles Strategy</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', lineHeight: 1.6, margin: 0 }}>Elite doubles specialist. Dan breaks down court positioning and communication breakdown under match stress.</p>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
