import React, { useState } from 'react';

export default function WaitlistCapture() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In production, wire this up to your email marketing API (e.g., Mailchimp, Resend)
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(202, 255, 51, 0.1) 0%, rgba(10, 15, 10, 1) 100%)',
      border: '1px solid rgba(202, 255, 51, 0.3)',
      borderRadius: '24px',
      padding: '48px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at 50% 0%, rgba(202, 255, 51, 0.15), transparent 50%)', pointerEvents: 'none' }}></div>
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#111', padding: '4px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
          Closed Beta
        </div>
        <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: '#fff', marginBottom: '16px', lineHeight: 1.1 }}>Get Early Access to Clutch Command AI</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px auto' }}>
          We are currently limiting access to ensure elite coaching quality. Join the waitlist to be notified the moment we open our next cohort.
        </p>
        
        {submitted ? (
          <div style={{ background: 'rgba(202, 255, 51, 0.1)', border: '1px solid var(--lime)', color: 'var(--lime)', padding: '16px 24px', borderRadius: '8px', display: 'inline-block', fontWeight: 500 }}>
            You're on the list. Keep an eye on your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flex: 1, padding: '16px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '16px', outline: 'none' }}
            />
            <button type="submit" style={{ background: 'var(--lime)', color: '#111', border: 'none', padding: '0 32px', borderRadius: '8px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
