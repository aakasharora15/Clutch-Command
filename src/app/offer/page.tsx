import React from 'react';

export default function OfferPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
      <section className="programs wrap" id="programs">
        <h2>Training For<br />Every Competitive Level</h2>
        <div className="prog-grid">
          <div className="prog-card">
            <h3>CLUTCH<br />Singles Academy</h3>
            <p>Step onto the court with Grand Slam singles coaching led by Vlado Platenik. We provide exact weekly tactical blueprints, high-intensity repetition drills, and pressure conditioning. Learn directly from the coach who has guided multiple tour-level players to deep runs at the majors, transforming your baseline game into a weapon.</p>
            <a href="https://theclutchquotient.scoreapp.com">Start the Diagnostic &rarr;</a>
          </div>
          <div className="ph"><em>Singles Academy</em></div>

          <div className="ph"><em>Doubles Academy</em></div>
          <div className="prog-card">
            <h3>CLUTCH<br />Doubles Academy</h3>
            <p>Achieve doubles mastery with Dan Kiernan, the elite coach who took Dabrowski and Routliffe to World No.1 and two US Open titles. This academy focuses heavily on court positioning, rapid communication under fire, and systematically exploiting opponent weaknesses when the margins are razor thin.</p>
            <a href="https://theclutchquotient.scoreapp.com">Start the Diagnostic &rarr;</a>
          </div>

          <div className="prog-card">
            <h3>AI Pressure<br />Scoring</h3>
            <p>Upload your match footage and let our proprietary AI engine score you against the 30 variables of the Clutch Quotient. For the first time ever, pressure performance is completely objective. You will receive a 3D Memory Surface report detailing exactly where your cognitive execution breaks down.</p>
            <a href="https://theclutchquotient.scoreapp.com">Take The Diagnostic →</a>
          </div>
          <div className="ph"><em>AI Scoring</em></div>
        </div>
      </section>
    </div>
  );
}
