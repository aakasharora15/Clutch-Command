import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import HeartRateSimulator from '../../components/HeartRateSimulator';
import ROICalculator from '../../components/ROICalculator';
import CognitiveTest from '../../components/CognitiveTest';
import TacticalBoard3D from '../../components/TacticalBoard3D';
import DecisionMatrix from '../../components/DecisionMatrix';

export const metadata = {
  title: 'Labs | Clutch Command',
  description: 'Interactive prototypes and experiments from the Clutch Command AI Engine.'
};

export default function LabsPage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px', paddingBottom: '120px', minHeight: '100vh' }}>
      <section className="airy-section dark">
        <div className="wrap" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
          
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '32px', backdropFilter: 'blur(10px)' }}>
              Experimental
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 style={{ fontSize: 'clamp(50px, 7vw, 100px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 32px 0', textTransform: 'uppercase', color: '#fff' }}>
              The Vault.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '700px', margin: '0 auto' }}>
              High-fidelity interactive prototypes demonstrating the future of tennis cognitive training and AI diagnostics.
            </p>
          </ScrollReveal>
        </div>

        <div className="wrap">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            
            <ScrollReveal>
              <HeartRateSimulator />
            </ScrollReveal>

            <ScrollReveal>
              <ROICalculator />
            </ScrollReveal>

            <ScrollReveal>
              <CognitiveTest />
            </ScrollReveal>

            <ScrollReveal>
              <DecisionMatrix />
            </ScrollReveal>

            <ScrollReveal>
              <TacticalBoard3D />
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
