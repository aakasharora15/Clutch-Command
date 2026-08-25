import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import AIVisualizer from '../../components/AIVisualizer';
import TiltCard from '../../components/TiltCard';
import PressureScrubber from '../../components/PressureScrubber';
import TacticalBoard3D from '../../components/TacticalBoard3D';

export const metadata = {
  title: 'AI Engine | Clutch Command',
  description: 'How Clutch Command uses AI to diagnose and repair cognitive breakdowns under pressure.'
};

export default function AIEnginePage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <section className="airy-section dark">
        <div className="wrap" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '32px', backdropFilter: 'blur(10px)' }}>
              The Coaching Engine
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 style={{ fontSize: 'clamp(50px, 7vw, 100px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 32px 0', textTransform: 'uppercase', color: '#fff' }}>
              The Engine.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '700px', margin: '0 auto 64px auto' }}>
              Our Grand Slam coaching team reviews your match footage frame-by-frame to detect micro-breakdowns in your technique, positioning, and decision-making when the score tightens.
            </p>
          </ScrollReveal>
        </div>

        {/* Visualizer & Explanation Grid */}
        <div className="wrap">
          <div className="grid-asym-3" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'stretch' }}>
            
            <ScrollReveal delay={0.4} className="h-full">
              <AIVisualizer />
            </ScrollReveal>

            <ScrollReveal delay={0.5} className="h-full">
              <div className="bento-item glass" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '16px' }}>Data-Driven Diagnosis</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                  Our coaching team doesn't just look at whether the ball went in or out. They analyze:
                </p>
                <ul style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '20px', fontSize: '16px', lineHeight: 1.8, marginBottom: '0' }}>
                  <li><strong>Shoulder rotation and follow-through</strong> at the point of contact.</li>
                  <li><strong>Recovery time</strong> between defensive strikes.</li>
                  <li><strong>Body language shifts and tension patterns</strong> under pressure.</li>
                  <li><strong>Decision patterns</strong> in rallies extending past 8 shots.</li>
                </ul>
              </div>
            </ScrollReveal>

          </div>
        </div>

        {/* 3D Tactical Board Section */}
        <div className="wrap" style={{ marginTop: '80px' }}>
          <ScrollReveal delay={0.6}>
            <TacticalBoard3D />
          </ScrollReveal>
        </div>
        
        {/* Pressure Scrubber Section */}
        <div className="wrap" style={{ marginTop: '120px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
            <ScrollReveal>
              <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: '24px' }}>
                The Invisible Breakdown
              </h2>
              <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Drag the slider to see how technique visibly degrades when the score tightens — the kind of micro-breakdown our coaches identify in your match footage.
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.2}>
            <PressureScrubber 
              beforeImage="/bento_player_serve_1783528130916.jpg" 
              afterImage="/hero_tennis_court_1783528122643.jpg" 
            />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
