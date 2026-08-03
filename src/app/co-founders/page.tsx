import React from 'react';

export default function CoFoundersPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      
      <section className="about-founder light-section" id="co-founders">
        <div className="wrap bento-split-reverse">
          <div className="bento-black-card-split">
            <div className="img-side" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}></div>
            <div className="text-side">
              <h3>Built to answer a question no one could answer him.</h3>
              <p>Clutch Quotient started life in the military: training people to make life-or-death decisions with no action replay.</p>
            </div>
          </div>
          <div className="bento-white-text">
            <h2 className="dark-text">Experience the best in pressure training</h2>
            <div className="bento-white-text-split">
               <div className="bento-img-card-small" style={{ backgroundImage: "url('/mark_jeffery.png')" }}></div>
               <div style={{ flex: 1 }}>
                 <p className="dark-text">
                   He didn't build it from a theory. He built it from a memory. Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away. Pressure hijacked his brain and body, and the next thing he knew, it was game, set, and match to his opponent.
                 </p>
                 <div className="founder-name mt-4" style={{ fontSize: '14px', color: '#111' }}>Mark Jeffery, <span style={{ fontWeight: '400', color: '#666' }}>Founder</span></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials light-section" id="promises">
        <div className="wrap">
          <div className="section-eyebrow dark-text btn-outline-pill">Testimonials</div>
          <h2 className="dark-text mt-4">What Our Members Say</h2>
          
          <div className="testi-bento mt-8">
            <div className="testi-image" style={{ backgroundImage: "url('/bento_player_celebrate_1783528150116.jpg')" }}></div>
            <div className="testi-content">
              <div className="testi-quote-mark">“</div>
              <p className="testi-quote-text">
                [Testimonial slot - an academy student on what changed once their pressure game was scored objectively, not self-assessed.]
              </p>
              <p className="testi-author mt-6">
                Player Name, <em>Academy Student</em>
              </p>
              
              <div className="testi-controls">
                <button className="testi-arrow-btn">&larr;</button>
                <button className="testi-arrow-btn">&rarr;</button>
              </div>
            </div>
          </div>

          <div className="bento-3-col mt-8">
            <div className="bento-black-card" style={{ padding: '32px' }}>
               <h3 style={{ fontSize: '36px', marginBottom: '8px' }}>30</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Clutch Quotient Skills Scored</p>
            </div>
            <div className="bento-black-card" style={{ padding: '32px' }}>
               <h3 style={{ fontSize: '36px', marginBottom: '8px' }}>3</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grand Slam-Credentialed Coaches</p>
            </div>
            <div className="bento-black-card" style={{ padding: '32px' }}>
               <h3 style={{ fontSize: '36px', marginBottom: '8px' }}>2+2=5</h3>
               <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI + Coaches, The Complete Package</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
