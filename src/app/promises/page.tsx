import React from 'react';

export default function PromisesPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <section className="statement" style={{ paddingTop: '80px' }}>
        <div className="wrap">
          <h2>At Clutch Command, We Train Players To Win Two More Points — The Ones That Decide Every Match.</h2>
          <div className="statement-row">
            <p>
              We focus on the moments matches turn on — 30-30, 5-5 in the breaker, 8-8 in the decider.
              TRUST training and AI scoring are built for juniors, club players, and competitive athletes
              who want real progress under pressure.
            </p>
            <div className="statement-photos">
              <div className="ph"><em>Match Point</em></div>
              <div className="ph"><em>Coaching Session</em></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
