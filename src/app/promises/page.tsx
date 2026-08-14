import React from 'react';
import { CTA } from '../../config/cta';
import SectionHeader from '../../components/SectionHeader';
import AnimatedCounter from '../../components/AnimatedCounter';
import StaggerReveal from '../../components/StaggerReveal';
import Image from 'next/image';

export default function PromisesPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      
      {/* ===== HERO & CARDS ===== */}
      <section className="airy-section" id="promises">
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <div className="section-eyebrow" style={{ color: 'var(--lime)', marginBottom: '16px' }}>Our Guarantee</div>
            <h2 style={{ fontSize: 'clamp(48px, 6vw, 80px)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.03em', color: '#111', marginBottom: '24px' }}>
              The specific science of <span style={{ background: 'linear-gradient(90deg, #111, #555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>never choking again.</span>
            </h2>
            <p style={{ fontSize: '20px', color: '#666', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
              We don't do vague psychological coaching. We deal in hard data, proven biometrics, and guaranteed performance shifts. Here is our promise to you.
            </p>
          </div>
          
          <StaggerReveal className="grid-cards-4" style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            
            <div className="step-card" style={{ padding: '48px 32px', background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 12px 32px rgba(0,0,0,0.03)', textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1.5px #111', fontWeight: 800, fontSize: '80px', marginBottom: '16px', lineHeight: 1 }}>
                <AnimatedCounter end={14} />
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: 600, color: '#111' }}>Days To Shift</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>The timeframe required to biologically adapt to high-pressure scenarios using our cognitive stress protocols.</p>
            </div>
            
            <div className="step-card" style={{ padding: '48px 32px', background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 12px 32px rgba(0,0,0,0.03)', textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ color: 'var(--lime)', WebkitTextStroke: '1.5px #111', fontWeight: 800, fontSize: '80px', marginBottom: '16px', lineHeight: 1 }}>
                <AnimatedCounter end={30} />
                <span style={{ fontSize: '48px' }}>%</span>
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: 600, color: '#111' }}>Win Rate Increase</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.6 }}>The average expected increase in break points saved and decisive tiebreak points won during match play.</p>
            </div>

            <div className="step-card" style={{ padding: '48px 32px', background: 'var(--bg-dark)', color: '#fff', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.3s ease' }}>
              <div style={{ color: 'var(--lime)', fontWeight: 800, fontSize: '80px', marginBottom: '16px', lineHeight: 1 }}>
                <AnimatedCounter end={100} />
                <span style={{ fontSize: '48px' }}>%</span>
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '12px', fontWeight: 600 }}>Money Back</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6 }}>If your Clutch Quotient doesn't improve after completing the program, we refund your investment entirely.</p>
            </div>

          </StaggerReveal>
        </div>
      </section>

      {/* ===== DEEP DIVE 1: 14 DAYS ===== */}
      <section className="airy-section" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="grid-asym-3">
            <div className="text-col">
              <div className="section-eyebrow" style={{ color: 'var(--lime)', WebkitTextStroke: '1px #111' }}>Promise 01</div>
              <h2 className="section-header" style={{ color: '#111', marginBottom: '24px' }}>The 14-Day Cognitive Shift</h2>
              <p style={{ color: '#444', fontSize: '18px', lineHeight: 1.6, marginBottom: '24px' }}>
                Traditional tennis academies focus purely on stroke mechanics, assuming that better technique will survive under pressure. Science proves otherwise.
              </p>
              <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '16px' }}>
                When the score hits 30-30 in the third set, your heart rate spikes. Cortisol floods your system. Blood is diverted from your prefrontal cortex (responsible for tactical decision making) to your major muscle groups. Your brain literally shifts into a primitive survival state.
              </p>
              <p style={{ color: '#555', lineHeight: 1.6 }}>
                The <strong>TRUST Protocol</strong> artificially replicates this biological state during practice. By repeatedly exposing you to high cognitive load during specific drills, we force your nervous system to adapt. Clinical trials show that neuroplasticity—the rewiring of your brain's threat response—begins to solidify in just 14 days of targeted repetition.
              </p>
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_player_exhausted.jpg" alt="Player under stress" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_shoe_clay.jpg" alt="Tactical movement" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEEP DIVE 2: 30% INCREASE ===== */}
      <section className="airy-section dark">
        <div className="wrap">
          <div className="grid-asym-3">
            <div className="text-col">
              <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>Promise 02</div>
              <h2 className="section-header" style={{ marginBottom: '24px' }}>A 30% Jump in Win-Rate</h2>
              <p style={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '24px', color: 'rgba(255,255,255,0.9)' }}>
                We don't measure success by how pretty your forehand looks in practice. We measure it by how many decisive points you win when it matters.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                The <strong>Clutch Quotient (CQ)</strong> is our proprietary algorithm that scores your performance across 30 distinct variables during match play. We analyze your footage to pinpoint exactly where your baseline strategy breaks down—whether you drop your court position by 2 meters, abandon your crosscourt patterns, or rush your serve routine.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>
                By identifying and patching these specific tactical leaks, our athletes experience an average 30% increase in break points saved and deciding tiebreaks won. You aren't hitting the ball better; you are simply refusing to beat yourself.
              </p>
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_blueprint.jpg" alt="Data Analysis" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="img-col" style={{ position: 'relative', overflow: 'hidden' }}>
               <Image src="/tennis_coach_talk.jpg" alt="Coach Analysis" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== DEEP DIVE 3: GUARANTEE ===== */}
      <section className="airy-section" style={{ background: 'var(--bg-light)' }}>
        <div className="wrap">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-eyebrow">Promise 03</div>
            <h2 className="section-header" style={{ color: '#111', marginBottom: '32px' }}>The 100% Ironclad Guarantee</h2>
            <p style={{ color: '#444', fontSize: '18px', lineHeight: 1.6, marginBottom: '24px' }}>
              We are in the business of elite performance, not empty promises. If you commit to the program, execute the drills, and submit your match footage for review, you will see a measurable improvement in your Clutch Quotient.
            </p>
            <p style={{ color: '#555', lineHeight: 1.6, marginBottom: '48px' }}>
              If, after 30 days of following the TRUST protocol, your AI scoring does not show a definitive improvement in your high-pressure point win rate, we will refund 100% of your investment. No endless customer service loops, no hidden clauses. We either make you a more dangerous competitor, or you don't pay.
            </p>
            <a href={CTA.url} className="btn-dark" style={{ padding: '18px 40px', fontSize: '16px', background: 'var(--lime)', color: '#111' }}>
              {CTA.labelArrow}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
