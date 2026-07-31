import React from 'react';

export default function CoFoundersPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      
      <section className="about-founder">
        <div className="wrap about-founder-grid">
          <div className="founder-photo" style={{ backgroundImage: "url('/mark_jeffery.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          <div>
            <div className="founder-eyebrow">WHO BUILT THIS</div>
            <h2>Built to answer a question no one could answer him.</h2>
            <h3>Mark Jeffery, Founder</h3>
            <p>
              Clutch Quotient started life in the military: training people to make life-or-death decisions with no action replay. Mark Jeffery took that same thinking and turned it into a way to diagnose tennis. Not life or death, but with the same instant, no-take-backs pressure.
            </p>
            <p>
              He didn't build it from a theory. He built it from a memory. Two match points up against the RAF's number one, on the grass at Wimbledon, and still finding a way to give it away. Pressure hijacked his brain and body, and the next thing he knew, it was game, set, and match to his opponent. He had no way, then, to know why. That's the gap Clutch Quotient closes.
            </p>
          </div>
        </div>
      </section>

      <section className="trusted" id="coaches" style={{ paddingTop: '80px' }}>
        <div className="wrap">
          <h2>Trusted By<br />Players &amp; Coaches</h2>
          <div className="testi-grid">
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot - an academy student on what changed once their pressure game was scored objectively, not self-assessed.]&quot;</div>
              <div className="testi-person"><div className="avatar"></div><div><div className="testi-name">Player Name</div><div className="testi-role">Academy Student</div></div></div>
            </div>
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot - a parent or coach on the difference TRUST training made in tight matches.]&quot;</div>
              <div className="testi-person"><div className="avatar"></div><div><div className="testi-name">Player Name</div><div className="testi-role">Parent / Coach</div></div></div>
            </div>
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot - a military academy testimonial crediting Mark&apos;s methodology under real pressure.]&quot;</div>
              <div className="testi-person"><div className="avatar"></div><div><div className="testi-name">Player Name</div><div className="testi-role">Military Academy</div></div></div>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><div className="stat-num">30</div><div className="stat-lab">Clutch Quotient Skills Scored</div></div>
            <div className="stat"><div className="stat-num">3</div><div className="stat-lab">Grand Slam-Credentialed Coaches</div></div>
            <div className="stat"><div className="stat-num">2+2=5</div><div className="stat-lab">AI + Coaches, The Complete Package</div></div>
          </div>
        </div>
      </section>
    </div>
  );
}
