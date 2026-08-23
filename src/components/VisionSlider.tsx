"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function VisionSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newX = ((e.clientX - rect.left) / rect.width) * 100;
    newX = Math.max(0, Math.min(newX, 100));
    setSliderPos(newX);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        position: 'relative',
        width: '100%',
        height: '600px',
        background: '#0a0a0a',
        borderRadius: '24px',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'col-resize',
        touchAction: 'none'
      }}
    >
      {/* Background (Amateur - Chaotic/Blurry) */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* We use a heavy filter on a tennis image to simulate the chaotic state */}
        <div 
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/tennis_court_night.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px) contrast(1.2) sepia(0.4) hue-rotate(-20deg)',
            transform: 'scale(1.05)' // Hide blurred edges
          }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 50, 50, 0.2)' }} />
        <div style={{ position: 'absolute', bottom: '40px', right: '40px', textAlign: 'right' }}>
          <div style={{ color: '#ff4444', fontSize: '48px', fontWeight: 800, fontFamily: 'ui-monospace, monospace' }}>168 BPM</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Survival Mode / Tunnel Vision</div>
        </div>
      </div>

      {/* Foreground (Elite - Clear/Geometric) */}
      <div 
        style={{
          position: 'absolute', 
          inset: 0,
          clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
          transition: isDragging ? 'none' : 'clip-path 0.1s'
        }}
      >
        <div 
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/tennis_court_night.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.1) saturate(1.2)'
          }} 
        />
        {/* Tactical UI Overlays */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(217,248,127,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,248,127,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: '120px', height: '120px', border: '2px dashed var(--lime)', borderRadius: '50%', backgroundColor: 'rgba(217,248,127,0.1)' }} />
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <line x1="50%" y1="90%" x2="35%" y2="45%" stroke="var(--lime)" strokeWidth="3" strokeDasharray="8 8" />
        </svg>

        <div style={{ position: 'absolute', bottom: '40px', left: '40px' }}>
          <div style={{ color: 'var(--lime)', fontSize: '48px', fontWeight: 800, fontFamily: 'ui-monospace, monospace' }}>112 BPM</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Flow State / Geometric Clarity</div>
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        style={{
          position: 'absolute',
          top: 0, bottom: 0,
          left: `${sliderPos}%`,
          width: '2px',
          backgroundColor: '#fff',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 20px rgba(255,255,255,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div 
          style={{
            width: '48px', height: '48px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            <polyline points="21 18 15 12 21 6" style={{transform: 'translateX(-8px)'}}></polyline>
            <polyline points="9 18 15 12 9 6" style={{transform: 'translateX(8px)'}}></polyline>
            <polyline points="3 18 9 12 3 6" style={{transform: 'translateX(8px)'}}></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
