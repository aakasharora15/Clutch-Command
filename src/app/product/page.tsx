import React from 'react';

export default function ProductPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="moments" id="moments" style={{ paddingTop: '80px' }}>
        <div className="wrap">
          <h2>Moments From The Court</h2>
          <p className="moments-sub">A Glimpse Into The Training, The Matches, And The Pressure Moments That Drive Clutch Command Forward.</p>
        </div>
        <div className="wrap" style={{ overflow: 'visible' }}>
          <div className="carousel">
            <div className="ph"><em>Academy</em></div>
            <div className="ph"><em>Training</em></div>
            <div className="ph"><em>Match Play</em></div>
            <div className="ph"><em>The Breaker</em></div>
            <div className="ph"><em>Coaching</em></div>
            <div className="ph"><em>Progress</em></div>
          </div>
          <div className="moments-cta"><a href="https://diagnostic.clutchcommand.com" className="pill">Take The Diagnostic</a></div>
        </div>
      </section>

      <section className="tips" id="tips">
        <div className="wrap tips-grid">
          <div className="tips-left">
            <h2>Pressure Tips &amp;<br />Training Insights</h2>
            <p>Expert Advice, Drills, And Strategies From Grand Slam Coaches To Help You Win The Points That Matter — On And Off The Court.</p>
            <a href="https://diagnostic.clutchcommand.com" className="pill">Take The Diagnostic</a>
          </div>
          <div>
            <div className="article">
              <div className="ph"></div>
              <div className="article-meta">Tactics <i></i> 4 Min</div>
              <h3>Two More Points At 5-5: How To Win The Tiebreak</h3>
            </div>
            <div className="article">
              <div className="ph"></div>
              <div className="article-meta">Identity <i></i> 3 Min</div>
              <h3>The Identity Shift That Survives Championship Point</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
