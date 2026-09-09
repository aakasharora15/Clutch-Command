"use client";
import React, { useState, useEffect } from 'react';
import { CTA } from '../config/cta';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a href={CTA.url} style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      background: 'var(--lime)',
      color: '#000',
      padding: '16px 28px',
      borderRadius: '50px',
      fontWeight: 700,
      fontSize: '15px',
      zIndex: 9999,
      boxShadow: '0 8px 24px rgba(217, 248, 127, 0.25)',
      textDecoration: 'none',
      transition: 'transform 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#000', animation: 'blink 1.5s infinite' }} />
      {CTA.label}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}} />
    </a>
  );
}
