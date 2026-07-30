import React from 'react';

export default function CoFoundersPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="trusted" id="coaches" style={{ paddingTop: '80px' }}>
        <div className="wrap">
          <h2>Trusted By<br />Players &amp; Coaches</h2>
          <div className="testi-grid">
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot — an academy student on what changed once their pressure game was scored objectively, not self-assessed.]&quot;</div>
              <div className="testi-person"><div className="avatar"></div><div><div className="testi-name">Player Name</div><div className="testi-role">Academy Student</div></div></div>
            </div>
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot — a parent or coach on the difference TRUST training made in tight matches.]&quot;</div>
              <div className="testi-person"><div className="avatar"></div><div><div className="testi-name">Player Name</div><div className="testi-role">Parent / Coach</div></div></div>
            </div>
            <div className="testi">
              <div className="testi-quote">&quot;[Testimonial slot — a military academy testimonial crediting Mark&apos;s methodology under real pressure.]&quot;</div>
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
