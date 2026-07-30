import React from 'react';

export default function OfferPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '60px' }}>
      <section className="programs wrap" id="programs">
        <h2>Training For<br />Every Competitive Level</h2>
        <div className="prog-grid">
          <div className="prog-card">
            <h3>CLUTCH<br />Singles Academy</h3>
            <p>Grand Slam singles coaching with Vlado Platenik — tactics, repetition, and pressure training from the coach behind tour-level players.</p>
            <a href="https://diagnostic.clutchcommand.com">Take The Diagnostic →</a>
          </div>
          <div className="ph"><em>Singles Academy</em></div>

          <div className="ph"><em>Doubles Academy</em></div>
          <div className="prog-card">
            <h3>CLUTCH<br />Doubles Academy</h3>
            <p>Doubles mastery with Dan Kiernan — the coach who took Dabrowski &amp; Routliffe to World No.1 and two US Open titles.</p>
            <a href="https://diagnostic.clutchcommand.com">Take The Diagnostic →</a>
          </div>

          <div className="prog-card">
            <h3>AI Pressure<br />Scoring</h3>
            <p>Upload match footage and get scored against the Clutch Quotient — pressure performance made objective for the first time.</p>
            <a href="https://diagnostic.clutchcommand.com">Take The Diagnostic →</a>
          </div>
          <div className="ph"><em>AI Scoring</em></div>
        </div>
      </section>
    </div>
  );
}
