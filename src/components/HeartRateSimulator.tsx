"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeartRateSimulator() {
  const [bpm, setBpm] = useState(80);

  // Calculate effect intensities based on BPM (80 is baseline, 180 is max)
  const intensity = Math.max(0, (bpm - 80) / 100); 
  const blurAmount = intensity * 4; // Max 4px blur
  const vignetteOpacity = intensity * 0.8; // Max 0.8 opacity
  const pulseSpeed = Math.max(0.2, 1 - (intensity * 0.8)); // Faster pulse as BPM goes up

  return (
    <div className="bento-item glass" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Dynamic Background Effects */}
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          background: `radial-gradient(circle, transparent 30%, rgba(0,0,0,${vignetteOpacity}) 100%)`,
          backdropFilter: `blur(${blurAmount}px)`,
          transition: 'all 0.3s ease',
          opacity: intensity > 0 ? 1 : 0
        }}
      />
      
      {/* Heartbeat Pulse Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255, 50, 50, 0.1)',
          opacity: 0,
          pointerEvents: 'none',
          animation: intensity > 0 ? `pulse ${pulseSpeed}s infinite alternate` : 'none'
        }}
      />
      
      <style>{`
        @keyframes pulse {
          0% { opacity: 0; }
          100% { opacity: ${intensity * 0.4}; }
        }
      `}</style>

      {/* UI Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: '400px', padding: '24px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--lime)', marginBottom: '16px' }}>
          Biological Pressure Simulation
        </div>
        
        <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Tunnel Vision</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '40px' }}>
          Drag the slider to simulate the cognitive impairment caused by a spike in heart rate at 30-30.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
          </svg>
          <div style={{ fontSize: '64px', fontWeight: 300, color: intensity > 0.5 ? '#FF6464' : '#fff', fontVariantNumeric: 'tabular-nums', transition: 'color 0.3s ease', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
            {bpm} <span style={{ fontSize: '20px', color: 'rgba(255,255,255,0.4)' }}>BPM</span>
          </div>
        </div>

        <input 
          type="range" 
          min="80" 
          max="180" 
          value={bpm} 
          onChange={(e) => setBpm(parseInt(e.target.value))}
          style={{
            width: '100%',
            cursor: 'pointer',
            accentColor: 'var(--lime)'
          }}
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <span>Relaxed (15-0)</span>
          <span>Choking (30-30)</span>
        </div>
      </div>
    </div>
  );
}
