"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function DoublesSymphony() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Opponent Ball Position (User drags this)
  const oppX = useMotionValue(0.5);
  const oppY = useMotionValue(0.1);

  // Smooth springs for AI Partners
  const smoothOppX = useSpring(oppX, { damping: 25, stiffness: 120 });
  const smoothOppY = useSpring(oppY, { damping: 25, stiffness: 120 });

  const [partner1, setPartner1] = useState({ x: 0.3, y: 0.75 });
  const [partner2, setPartner2] = useState({ x: 0.7, y: 0.65 });
  const [tetherState, setTetherState] = useState<'safe' | 'warning'>('safe');

  useEffect(() => {
    return smoothOppX.onChange((v) => {
      // Calculate new positions for partners based on opponent's X position
      // Partner 1 (Net player) shifts to cover the line
      // Partner 2 (Baseline player) shifts to cover the middle/cross
      
      let p1x = 0.25;
      let p1y = 0.65;
      let p2x = 0.75;
      let p2y = 0.85;

      if (v < 0.3) {
        // Ball on left side
        p1x = 0.15; // Net player guards alley
        p2x = 0.6;  // Baseline player shifts left to cover middle
      } else if (v > 0.7) {
        // Ball on right side
        p1x = 0.4;  // Net player shifts right to cover middle
        p2x = 0.85; // Baseline player guards alley
      } else {
        // Center
        p1x = 0.3;
        p2x = 0.7;
      }

      setPartner1({ x: p1x, y: p1y });
      setPartner2({ x: p2x, y: p2y });
      
      // If distance between p1 and p2 gets too wide, warning
      const distance = Math.abs(p1x - p2x);
      setTetherState(distance > 0.6 ? 'warning' : 'safe');
    });
  }, [smoothOppX]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    if (e.buttons !== 1) return; // Only track if mouse is down
    const rect = containerRef.current.getBoundingClientRect();
    let newX = (e.clientX - rect.left) / rect.width;
    let newY = (e.clientY - rect.top) / rect.height;
    
    // Clamp to opponent side
    newX = Math.max(0.05, Math.min(newX, 0.95));
    newY = Math.max(0.05, Math.min(newY, 0.45));
    
    oppX.set(newX);
    oppY.set(newY);
  };

  return (
    <div className="bento-item glass" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px', touchAction: 'none', background: '#0a0a0a' }}>
      
      <div>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#78DCFF', marginBottom: '16px' }}>Interactive Physics Engine</div>
        <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>The Doubles Symphony</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '500px' }}>
          Drag the opponent's ball around their side of the court. Watch how the elite doubles pair dynamically shifts as a single unit—connected by an invisible tether—to cut off the angles.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          style={{ 
            width: '320px', height: '600px', background: '#111', 
            border: '2px solid rgba(255,255,255,0.1)', position: 'relative',
            borderRadius: '12px', overflow: 'hidden', cursor: 'pointer'
          }}
        >
          {/* Court Lines */}
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.3)' }} />
          <div style={{ position: 'absolute', top: '25%', bottom: '25%', left: '15%', right: '15%', border: '2px solid rgba(255,255,255,0.2)' }} />
          <div style={{ position: 'absolute', top: '25%', bottom: '25%', left: '50%', width: '2px', background: 'rgba(255,255,255,0.2)', transform: 'translateX(-50%)' }} />
          
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '15%', width: '2px', background: 'rgba(255,255,255,0.2)' }} /> 
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: '15%', width: '2px', background: 'rgba(255,255,255,0.2)' }} /> 

          {/* SVG Tether connecting partners */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
            <motion.line 
              animate={{ x1: `${partner1.x * 100}%`, y1: `${partner1.y * 100}%`, x2: `${partner2.x * 100}%`, y2: `${partner2.y * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 25 }}
              stroke={tetherState === 'safe' ? '#78DCFF' : '#FF6464'} 
              strokeWidth="2" 
              strokeDasharray="4 4" 
              opacity={0.6}
            />
            {/* Cone of vision from ball to partners */}
            <motion.polygon 
              animate={{
                points: `${oppX.get() * 320},${oppY.get() * 600} ${partner1.x * 320},${partner1.y * 600} ${partner2.x * 320},${partner2.y * 600}`
              }}
              fill="rgba(120, 220, 255, 0.05)"
              transition={{ type: 'spring', stiffness: 120, damping: 25 }}
            />
          </svg>

          {/* Draggable Opponent Ball */}
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, 
              width: '24px', height: '24px',
              x: useTransform(smoothOppX, v => `calc(${v * 320}px - 12px)`),
              y: useTransform(smoothOppY, v => `calc(${v * 600}px - 12px)`),
              borderRadius: '50%', background: '#fff',
              zIndex: 10, pointerEvents: 'none',
              boxShadow: '0 0 15px rgba(255,255,255,0.8)'
            }}
          />

          {/* Partner 1 (Net Player) */}
          <motion.div
            animate={{ x: `calc(${partner1.x * 320}px - 16px)`, y: `calc(${partner1.y * 600}px - 16px)` }}
            transition={{ type: 'spring', stiffness: 120, damping: 25 }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '32px', height: '32px',
              borderRadius: '50%', background: '#78DCFF',
              zIndex: 5, boxShadow: '0 0 20px rgba(120,220,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 'bold', color: '#111'
            }}
          >
            N
          </motion.div>

          {/* Partner 2 (Baseline Player) */}
          <motion.div
            animate={{ x: `calc(${partner2.x * 320}px - 16px)`, y: `calc(${partner2.y * 600}px - 16px)` }}
            transition={{ type: 'spring', stiffness: 120, damping: 25 }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '32px', height: '32px',
              borderRadius: '50%', background: '#78DCFF',
              zIndex: 5, boxShadow: '0 0 20px rgba(120,220,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 'bold', color: '#111'
            }}
          >
            B
          </motion.div>

        </div>
      </div>
    </div>
  );
}
