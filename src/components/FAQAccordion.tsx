"use client";

import React, { useState } from 'react';

const faqs = [
  {
    question: "Do I need to be a professional player to benefit from this?",
    answer: "No. While our system was forged with ATP/WTA pros and NCAA D1 athletes, cognitive breakdown under pressure happens at every level. If you play competitive matches and find yourself losing tight sets, this is for you."
  },
  {
    question: "How is this different from a sports psychologist?",
    answer: "Traditional sports psychology relies on subjective conversations and visualization. Clutch Command is biometric and data-driven. We use stress-inoculation protocols derived from military training to physically rewire your brain's response to cortisol spikes on the court."
  },
  {
    question: "What exactly is in the £9 Playbook?",
    answer: "The Playbook is the foundational theory. It breaks down the exact biological mechanisms of a 'choke', how cortisol destroys your spatial tracking, and the 3 immediate on-court physical triggers you can use to reset your nervous system mid-match."
  },
  {
    question: "Is there a money-back guarantee?",
    answer: "Yes. If you apply the protocols in the Playbook and do not see a measurable difference in your ability to close out tight matches within 30 days, we will refund you entirely."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="airy-section" style={{ background: 'var(--bg-dark)' }}>
      <div className="wrap" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 className="section-header" style={{ color: '#fff' }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                style={{ 
                  background: isOpen ? 'rgba(255,255,255,0.05)' : 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'background 0.3s ease'
                }}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '24px',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {faq.question}
                  <span style={{ 
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s ease',
                    color: isOpen ? 'var(--lime)' : 'rgba(255,255,255,0.5)',
                    fontSize: '24px',
                    lineHeight: 1
                  }}>+</span>
                </button>
                <div 
                  style={{
                    maxHeight: isOpen ? '500px' : '0',
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease, opacity 0.5s ease'
                  }}
                >
                  <p style={{ padding: '0 24px 24px 24px', margin: 0, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: '16px' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
