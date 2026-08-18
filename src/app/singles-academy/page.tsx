import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import VideoHoverCard from '../../components/VideoHoverCard';
import SymptomNodeMap from '../../components/SymptomNodeMap';

export const metadata = {
  title: 'Vlado Platenik Singles Academy | Clutch Command',
  description: 'Master singles tactics and baseline pressure with the Vlado Platenik Singles Academy.'
};

export default function SinglesAcademyPage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <section className="airy-section dark">
        <div className="wrap" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '32px' }}>
              The Vlado Platenik Program
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 style={{ fontSize: 'clamp(60px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 32px 0', textTransform: 'uppercase', color: '#fff' }}>
              Dominate The<br/>Baseline.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '700px', margin: '0 auto 64px auto' }}>
              Engineered by former WTA Top 10 coach Vlado Platenik. Learn how to dictate play, construct points under severe pressure, and turn defense into a lethal offense.
            </p>
          </ScrollReveal>
        </div>
        
        {/* Interactive Symptom Map */}
        <div className="wrap" style={{ marginBottom: '80px' }}>
          <ScrollReveal delay={0.4}>
            <SymptomNodeMap />
          </ScrollReveal>
        </div>

        {/* Video Grid */}
        <div className="wrap">
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            
            <ScrollReveal className="col-span-8" delay={0.4} style={{ gridColumn: 'span 8' }}>
              <VideoHoverCard 
                videoSrc="/hero-video.mp4" 
                posterSrc="/media__1783528047317.jpg"
                title="The Inside-Out Forehand Paradigm"
                description="Why your inside-out forehand breaks down at 30-30, and how to reconstruct the kinetic chain for maximum penetration."
                className="h-full"
              />
            </ScrollReveal>

            <ScrollReveal className="col-span-4" delay={0.5} style={{ gridColumn: 'span 4' }}>
              <VideoHoverCard 
                videoSrc="/hero-video.mp4" 
                posterSrc="/media_1786071530296.png"
                title="Return of Serve Positioning"
                description="Aggressive vs passive return positions to instantly neutralize first serves."
                className="h-full"
              />
            </ScrollReveal>

            <ScrollReveal className="col-span-6" delay={0.6} style={{ gridColumn: 'span 6' }}>
              <VideoHoverCard 
                videoSrc="/hero-video.mp4" 
                posterSrc="/media__1785580667248.png"
                title="Pattern Recognition"
                description="Identifying opponent patterns within the first 3 games."
                className="h-full"
              />
            </ScrollReveal>

            <ScrollReveal className="col-span-6" delay={0.7} style={{ gridColumn: 'span 6' }}>
              <div className="bento-item glass" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '16px' }}>Ready To Enter?</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '300px' }}>Full academy access drops soon. Join the elite cohort.</p>
                <button className="btn-dark" style={{ background: 'var(--lime)', color: '#111', padding: '16px 32px' }}>Enroll Now - £99/mo</button>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}
