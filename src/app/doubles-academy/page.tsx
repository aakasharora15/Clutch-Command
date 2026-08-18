import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import VideoHoverCard from '../../components/VideoHoverCard';

export const metadata = {
  title: 'Dan Kiernan Doubles Academy | Clutch Command',
  description: 'Master doubles tactics, positioning, and court geometry with the Dan Kiernan Doubles Academy.'
};

export default function DoublesAcademyPage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '100px', paddingBottom: '120px' }}>
      <section className="airy-section dark">
        <div className="wrap" style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          
          <ScrollReveal delay={0.1}>
            <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '32px' }}>
              The Dan Kiernan Program
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <h1 style={{ fontSize: 'clamp(60px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', margin: '0 0 32px 0', textTransform: 'uppercase', color: '#fff' }}>
              Own The<br/>Geometry.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p style={{ fontSize: '22px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, maxWidth: '700px', margin: '0 auto 64px auto' }}>
              Engineered by doubles specialist Dan Kiernan. Learn how to control the net, master non-verbal communication, and execute high-percentage poaching under pressure.
            </p>
          </ScrollReveal>
        </div>

        {/* Video Grid */}
        <div className="wrap">
          <div className="bento-grid" style={{ gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            
            <ScrollReveal className="col-span-8" delay={0.4} style={{ gridColumn: 'span 8' }}>
              <VideoHoverCard 
                videoSrc="/hero-video.mp4" 
                posterSrc="/media__1785580600508.png"
                title="The Poaching Protocol"
                description="When to move, where to move, and how to read the returner's shoulders before they even hit the ball."
                className="h-full"
              />
            </ScrollReveal>

            <ScrollReveal className="col-span-4" delay={0.5} style={{ gridColumn: 'span 4' }}>
              <VideoHoverCard 
                videoSrc="/hero-video.mp4" 
                posterSrc="/bento_player_serve_1783528130916.jpg"
                title="First Volley Fundamentals"
                description="The exact footwork required to stick the first volley in no-man's land."
                className="h-full"
              />
            </ScrollReveal>

            <ScrollReveal className="col-span-6" delay={0.6} style={{ gridColumn: 'span 6' }}>
              <VideoHoverCard 
                videoSrc="/hero-video.mp4" 
                posterSrc="/media__1785542072660.png"
                title="I-Formation Tactics"
                description="Disrupting the returner's rhythm with unpredictable serving formations."
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
