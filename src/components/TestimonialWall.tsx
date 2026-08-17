"use client";

import React from 'react';
import Image from 'next/image';
import SpotlightCard from './SpotlightCard';

const testimonials = [
  {
    quote: "I was up 5-2 in the third set and choked. Three weeks after running the Clutch Command diagnostic, I found myself in the exact same scenario. I didn't even blink. I closed it out 6-2. The biometric awareness changed everything.",
    name: "James T.",
    title: "UTR 7.5",
    image: "/transparent_player.png" // Placeholder
  },
  {
    quote: "You think you know why you're missing forehands under pressure until Mark's system proves you wrong. It wasn't my technique; it was my cortisol levels destroying my spatial tracking. Absolutely mind-blowing.",
    name: "Sarah L.",
    title: "NCAA D1 Athlete",
    image: "/tennis_portrait.jpg" // Placeholder
  },
  {
    quote: "The military-grade stress inoculation sounds intense, but it's exactly what competitive tennis is missing. I used to dread tie-breaks. Now I hunt them.",
    name: "Michael R.",
    title: "ITF Pro Circuit",
    image: "/tennis_coach_talk.jpg" // Placeholder
  }
];

export default function TestimonialWall() {
  return (
    <section className="airy-section" style={{ background: 'var(--bg-light)' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="section-eyebrow">The Wall of Love</div>
          <h2 className="section-header">Don't Take Our Word For It.</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {testimonials.map((t, idx) => (
            <SpotlightCard key={idx} spotlightColor="rgba(0,0,0,0.05)" style={{ padding: '40px', background: '#fff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '4px', color: 'var(--lime)' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#333', fontStyle: 'italic', flex: 1 }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', position: 'relative', background: '#eee' }}>
                  <Image src={t.image} alt={t.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: '#111' }}>{t.name}</h4>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>{t.title}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
