import React from 'react';

export default function CoFoundersPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      
      <section className="airy-section" id="co-founders">
        <div className="wrap">
          <div style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="founder-dark-card">
              <div className="founder-dark-img" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}></div>
              <div className="founder-dark-text">
                <h3>Built to answer a question no one could answer him.</h3>
                <p>Clutch Quotient started life in the military: training people to make life-or-death decisions with no action replay.</p>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundImage: "url('/mark_jeffery.png')", backgroundSize: 'cover', marginBottom: '24px' }}></div>
              <h3 style={{ fontSize: '32px', marginBottom: '16px' }}>Experience the best in pressure training</h3>
              <p>He didn't build it from a theory. He built it from a memory. Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away. Pressure hijacked his brain and body, and the next thing he knew, it was game, set, and match to his opponent.</p>
              <div style={{ marginTop: '24px', fontWeight: 600, color: 'var(--text-dark)' }}>Mark Jeffery, <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>Founder</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="airy-section" id="promises">
        <div className="wrap">
          <div className="section-eyebrow">Testimonials</div>
          <h2 className="section-header">What Our Members Say</h2>
          
          <div className="testi-airy">
            <div className="testi-airy-img" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')" }}></div>
            <div className="testi-airy-content">
              <span className="testi-quote-mark">“</span>
              <div className="testi-quote-text">
                [Testimonial slot - an academy student on what changed once their pressure game was scored objectively, not self-assessed.]
              </div>
              <div className="testi-author">
                Player Name, <em>Academy Student</em>
              </div>
            </div>
          </div>

          <div className="grid-cards-3" style={{ marginTop: '120px' }}>
            <div style={{ background: '#111', padding: '48px', borderRadius: '24px', color: '#fff' }}>
               <h3 style={{ fontSize: '48px', marginBottom: '16px' }}>30</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clutch Quotient Skills Scored</p>
            </div>
            <div style={{ background: '#111', padding: '48px', borderRadius: '24px', color: '#fff' }}>
               <h3 style={{ fontSize: '48px', marginBottom: '16px' }}>3</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grand Slam-Credentialed Coaches</p>
            </div>
            <div style={{ background: '#111', padding: '48px', borderRadius: '24px', color: '#fff' }}>
               <h3 style={{ fontSize: '48px', marginBottom: '16px' }}>2+2=5</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI + Coaches, The Complete Package</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
