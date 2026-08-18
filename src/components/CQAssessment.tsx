"use client";

import React, { useState } from 'react';

const questions = [
  {
    question: "It's 30-30 in the final set. You miss your first serve. What is your immediate physical response?",
    options: [
      { text: "My breathing shallows and shoulders tighten.", score: 0 },
      { text: "I rush the second serve to get the point over with.", score: 0 },
      { text: "I execute a deliberate 3-second exhalation reset.", score: 1 },
    ]
  },
  {
    question: "When receiving serve on a crucial break point, where do you instinctively position yourself?",
    options: [
      { text: "I take half a step back to buy more time.", score: 0 },
      { text: "I stay exactly in my baseline position.", score: 1 },
      { text: "I don't consciously know, I just react.", score: 0 },
    ]
  },
  {
    question: "After losing a brutal rally you should have won, how long does the frustration linger?",
    options: [
      { text: "It bleeds into the next 2-3 points.", score: 0 },
      { text: "I'm angry, but I try to suppress it immediately.", score: 0 },
      { text: "Gone in 5 seconds. Target locked on the next point.", score: 1 },
    ]
  }
];

export default function CQAssessment() {
  const [step, setStep] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleOptionClick = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setIsComplete(true);
      }, 2000);
    }
  };

  if (isComplete) {
    return (
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '48px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(152, 203, 176, 0.1)', border: '1px solid var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', color: 'var(--lime)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '16px' }}>Diagnostic Complete</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>
          We've identified your primary cognitive breakdown trigger. Your responses indicate a severe drop in spatial awareness under score pressure.
        </p>
        <a href="/playbook" className="btn-dark" style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '16px 32px', textDecoration: 'none', fontWeight: 600, borderRadius: '100px' }}>
          Get The Protocol To Fix This &rarr;
        </a>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '64px 48px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--lime)', borderRadius: '50%', margin: '0 auto 24px auto', animation: 'spin 1s linear infinite' }}></div>
        <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>Analyzing Cognitive Load...</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Correlating responses with baseline physiological data.</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}} />
      </div>
    );
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '48px', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ color: 'var(--lime)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Diagnostic Module</div>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Question {step + 1} of {questions.length}</div>
      </div>

      <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', marginBottom: '40px' }}>
        <div style={{ width: `${((step + 1) / questions.length) * 100}%`, height: '100%', background: 'var(--lime)', transition: 'width 0.3s ease' }}></div>
      </div>

      <h3 style={{ fontSize: '28px', color: '#fff', lineHeight: 1.4, marginBottom: '32px' }}>{questions[step].question}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {questions[step].options.map((opt, idx) => (
          <button 
            key={idx}
            onClick={handleOptionClick}
            style={{ 
              width: '100%', textAlign: 'left', padding: '20px 24px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: 'rgba(255,255,255,0.8)', fontSize: '16px', cursor: 'pointer', transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.2)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
