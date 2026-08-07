"use client";

import React from 'react';

export default function FAQAccordion() {
  return (
    <div style={{ marginTop: '48px', maxWidth: '800px', width: '100%' }}>
      <details className="faq-item">
        <summary className="faq-summary">Who is this program for?</summary>
        <div className="faq-content">
          Clutch Command is designed for competitive athletes, club players, and juniors who have strong technical foundations but struggle to close out matches under pressure. It is not for beginners still learning stroke mechanics.
        </div>
      </details>

      <details className="faq-item">
        <summary className="faq-summary">What is the time commitment?</summary>
        <div className="faq-content">
          The cognitive drills and video reviews require roughly 2-3 hours per week. Most of the application happens seamlessly during your existing match play.
        </div>
      </details>

      <details className="faq-item">
        <summary className="faq-summary">How does the 100% guarantee work?</summary>
        <div className="faq-content">
          We guarantee measurable improvement in your Clutch Quotient within 30 days. If your stats don't improve after following the protocol, we refund 100% of your investment. No questions asked.
        </div>
      </details>

      <details className="faq-item">
        <summary className="faq-summary">Is this a substitute for my technical coach?</summary>
        <div className="faq-content">
          No. The TRUST protocol works alongside your current technical coaching. While your coach fixes your forehand biomechanics, we fix your cognitive response when you are forced to hit that forehand at Break Point down.
        </div>
      </details>

      <details className="faq-item">
        <summary className="faq-summary">Do I need special equipment to measure my CQ?</summary>
        <div className="faq-content">
          You only need a smartphone or camera to record your matches, and a standard fitness tracker (like an Apple Watch or Whoop) to sync your biometric data to our dashboard.
        </div>
      </details>

      <details className="faq-item">
        <summary className="faq-summary">When do the 1-on-1 coach reviews happen?</summary>
        <div className="faq-content">
          Calls are scheduled bi-weekly at a time that suits your training schedule. You will be matched with one of our elite coaches based on your timezone and specific pressure-point weaknesses.
        </div>
      </details>

      <details className="faq-item">
        <summary className="faq-summary">What happens if I get injured or miss a week?</summary>
        <div className="faq-content">
          You have lifetime access to the digital dashboard and blueprints. If you need to pause your 1-on-1 coaching sessions due to injury, you can easily freeze your account for up to 60 days.
        </div>
      </details>

      <details className="faq-item">
        <summary className="faq-summary">How quickly will I see results?</summary>
        <div className="faq-content">
          Players usually notice a shift in their cognitive load within the first 14 days. Measurable improvements in win-rate during high-pressure points typically materialize by week 4 of the protocol.
        </div>
      </details>
    </div>
  );
}
