import React from 'react';
import { CTA } from '../../config/cta';

export default function PromisesPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '100px' }}>
      <section className="airy-section" id="product">
        <div className="wrap">
          <div className="section-eyebrow">The Problem</div>
          <h2 className="section-header">You don't lose matches because of technique. You lose them in two points.</h2>
          <div className="grid-asym-3">
            <div className="text-col">
              <p>We focus on the exact moments where matches are won or lost: 30-30 in the final set, 5-5 in the breaker, or 8-8 in the deciding tiebreak. Traditional academies spend years drilling perfect technique and physical endurance, but they completely ignore the cognitive load of a high-pressure situation.</p>
              <br/>
              <p>When you have chances to close out a match, something else takes over. Your heart rate spikes, your vision narrows, and you revert to defensive habits. That is not a skill you are missing. It is a biological response that has never actually been measured or trained for - until now.</p>
              <br/>
              <p>The TRUST training methodology was originally forged in elite military environments and has now been adapted specifically for Grand Slam tennis. Combined with our proprietary AI scoring system, we isolate and train the 30 specific cognitive skills that define the Clutch Quotient. This system is built for juniors, club players, and competitive athletes who want real, measurable progress under immense pressure.</p>
              <a href={CTA.url} className="btn-dark" style={{ marginTop: '32px' }}>{CTA.labelArrow}</a>
            </div>
            <div className="img-col" style={{ backgroundImage: "url('/media__1783528039061.png')" }}></div>
            <div className="img-col" style={{ backgroundImage: "url('/bento_player_serve_1783528130916.jpg')" }}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
