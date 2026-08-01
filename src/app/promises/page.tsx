import React from 'react';
import { CTA } from '../../config/cta';

export default function PromisesPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      <section className="statement light-section" id="product">
        <div className="wrap bento-split">
          <div className="bento-text-left">
            <div className="section-eyebrow dark-text">The Problem</div>
            <h2 className="dark-text">You don't lose matches because of technique. You lose them in two points.</h2>
            <p className="dark-text">
              We focus on the exact moments where matches are won or lost: 30-30 in the final set, 5-5 in the breaker, or 8-8 in the deciding tiebreak. Traditional academies spend years drilling perfect technique and physical endurance, but they completely ignore the cognitive load of a high-pressure situation.
            </p>
            <p className="dark-text">
              When you have chances to close out a match, something else takes over. Your heart rate spikes, your vision narrows, and you revert to defensive habits. That is not a skill you are missing. It is a biological response that has never actually been measured or trained for - until now.
            </p>
            <p className="dark-text mt-4">
              The TRUST training methodology was originally forged in elite military environments and has now been adapted specifically for Grand Slam tennis. Combined with our proprietary AI scoring system, we isolate and train the 30 specific cognitive skills that define the Clutch Quotient. This system is built for juniors, club players, and competitive athletes who want real, measurable progress under immense pressure.
            </p>
            <a href={CTA.url} className="btn-dark mt-6">{CTA.labelArrow}</a>
          </div>
          <div className="bento-images-right">
             <div className="bento-img-card" style={{ backgroundImage: "url('/media__1783528039061.png')" }}>
                <div className="bento-card-label">Match Point</div>
             </div>
             <div className="bento-img-card" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}>
                <div className="bento-card-label">Coaching Session</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
