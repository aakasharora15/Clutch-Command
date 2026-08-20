import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollReveal from '../../components/ScrollReveal';

export const metadata = {
  title: 'Academies for Singles and Doubles | Clutch Command',
  description: 'Choose your discipline. Master the baseline with Vlado Platenik, or command the net with Dan Kiernan.'
};

export default function AcademiesHubPage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <section className="airy-section dark">
        <div className="wrap" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
          
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '32px' }}>
              Choose Your Path
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 style={{ fontSize: 'clamp(50px, 7vw, 90px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 32px 0', textTransform: 'uppercase', color: '#fff' }}>
              Academies for Singles & Doubles
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
              Pressure manifests entirely differently depending on your discipline. In singles, you fight isolation and baseline fatigue. In doubles, you fight synchronous movement breakdowns and net positioning errors. We have built two distinct curriculums with two world-class experts to solve both.
            </p>
          </ScrollReveal>
        </div>

        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
            
            {/* Singles Academy Card */}
            <ScrollReveal delay={0.4} style={{ display: 'flex' }}>
              <Link href="/singles-academy" style={{ display: 'flex', flexDirection: 'column', width: '100%', textDecoration: 'none' }}>
                <div className="bento-item glass hover-scale" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                    <Image src="/tennis_portrait.jpg" alt="Singles Court" fill style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,1) 0%, transparent 100%)' }} />
                  </div>
                  <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h2 style={{ fontSize: '32px', color: '#fff', marginBottom: '16px' }}>Vlado Platenik<br/><span style={{ color: 'var(--lime)' }}>Singles Academy</span></h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px', flex: 1 }}>
                      Engineered by former WTA Top 10 coach Vlado Platenik. This academy focuses on dominating the baseline, reconstructing the inside-out forehand paradigm, and managing the severe isolation of singles pressure.
                    </p>
                    <div style={{ display: 'inline-block', border: '1px solid rgba(217,248,127,0.3)', color: 'var(--lime)', padding: '12px 24px', borderRadius: '4px', textAlign: 'center', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Enter Singles Academy
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Doubles Academy Card */}
            <ScrollReveal delay={0.5} style={{ display: 'flex' }}>
              <Link href="/doubles-academy" style={{ display: 'flex', flexDirection: 'column', width: '100%', textDecoration: 'none' }}>
                <div className="bento-item glass hover-scale" style={{ flex: 1, padding: 0, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                    <Image src="/tennis_court_night.jpg" alt="Doubles Court" fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,1) 0%, transparent 100%)' }} />
                  </div>
                  <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h2 style={{ fontSize: '32px', color: '#fff', marginBottom: '16px' }}>Dan Kiernan<br/><span style={{ color: 'var(--lime)' }}>Doubles Academy</span></h2>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px', flex: 1 }}>
                      Led by ATP/WTA Doubles specialist Dan Kiernan. Master the "Doubles Symphony," aggressive net positioning, and cognitive communication strategies to prevent synchronized breakdowns on break points.
                    </p>
                    <div style={{ display: 'inline-block', border: '1px solid rgba(217,248,127,0.3)', color: 'var(--lime)', padding: '12px 24px', borderRadius: '4px', textAlign: 'center', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Enter Doubles Academy
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
