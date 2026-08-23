import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import HolographicCoachCard from '../../components/HolographicCoachCard';

export const metadata = {
  title: 'Academies for Singles and Doubles | Clutch Command',
  description: 'Choose your discipline. Master the baseline with Vlado Platenik, or command the net with Dan Kiernan.'
};

export default function AcademiesHubPage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px', paddingBottom: '160px', background: '#050505' }}>
      <section className="airy-section dark">
        <div className="wrap" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '100px' }}>
          
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '32px' }}>
              Select Operative Mode
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 style={{ fontSize: 'clamp(50px, 7vw, 90px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 32px 0', textTransform: 'uppercase', color: '#fff' }}>
              Academies for<br/>Singles & Doubles
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto' }}>
              Pressure manifests entirely differently depending on your discipline. In singles, you fight isolation and baseline fatigue. In doubles, you fight synchronous movement breakdowns and net positioning errors. Choose your simulation.
            </p>
          </ScrollReveal>
        </div>

        <div className="wrap" style={{ maxWidth: '1440px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px' }}>
            
            <ScrollReveal delay={0.4}>
              <HolographicCoachCard 
                name="Vlado Platenik"
                academyType="Singles Academy"
                description="Engineered by former WTA Top 10 coach Vlado Platenik. This academy focuses on dominating the baseline, reconstructing the inside-out forehand paradigm, and managing the severe isolation of singles pressure."
                imageSrc="/tennis_portrait.jpg"
                link="/singles-academy"
                stats={[
                  { label: "Tour Experience", value: "WTA Top 10" },
                  { label: "Focus Area", value: "Baseline Isolation" },
                  { label: "Key Tactical", value: "Inside-Out FH" },
                  { label: "Training Modules", value: "14 Nodes" }
                ]}
              />
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <HolographicCoachCard 
                name="Dan Kiernan"
                academyType="Doubles Academy"
                description="Led by ATP/WTA Doubles specialist Dan Kiernan. Master the 'Doubles Symphony,' aggressive net positioning, and cognitive communication strategies to prevent synchronized breakdowns."
                imageSrc="/tennis_court_night.jpg"
                link="/doubles-academy"
                stats={[
                  { label: "Tour Experience", value: "ATP / WTA" },
                  { label: "Focus Area", value: "Synchronous Mvt" },
                  { label: "Key Tactical", value: "Net Geometry" },
                  { label: "Training Modules", value: "12 Nodes" }
                ]}
              />
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
