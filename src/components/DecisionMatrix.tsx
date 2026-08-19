"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function DecisionMatrix() {
  const [oppPos, setOppPos] = useState({ x: 0.5, y: 0.15 }); // 0-1 scale relative to court
  const containerRef = useRef<HTMLDivElement>(null);

  // Derived Target Zone Logic
  const getTargetZone = () => {
    // Basic logic: hit where they aren't
    let tx = 0.5;
    let ty = 0.8;
    let shotType = "Deep Center Rally";
    let prob = 52;

    if (oppPos.y > 0.4) {
      // Opponent at net
      ty = 0.1; // Deep lob
      tx = oppPos.x > 0.5 ? 0.1 : 0.9;
      shotType = "Topspin Lob / Passing Shot";
      prob = 68;
    } else {
      // Opponent back
      ty = 0.8;
      if (oppPos.x < 0.3) {
        tx = 0.8; // Go right
        shotType = "Aggressive Cross-Court";
        prob = 74;
      } else if (oppPos.x > 0.7) {
        tx = 0.2; // Go left
        shotType = "Inside-Out Forehand";
        prob = 71;
      } else {
        tx = 0.5;
        ty = 0.5;
        shotType = "Heavy Depth to Center";
        prob = 55;
      }
    }
    return { x: tx, y: ty, shotType, prob };
  };

  const target = getTargetZone();

  const handleDrag = (e: any, info: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate new relative position (0 to 1)
    let newX = (info.point.x - rect.left) / rect.width;
    let newY = (info.point.y - rect.top) / rect.height;

    // Clamp values
    newX = Math.max(0.05, Math.min(newX, 0.95));
    newY = Math.max(0.05, Math.min(newY, 0.45)); // Only let them drag on their side of the net

    setOppPos({ x: newX, y: newY });
  };

  return (
    <div className="bento-item glass" style={{ padding: '40px', minHeight: '700px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Header */}
      <div>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--lime)', marginBottom: '16px' }}>Tactical Sandbox</div>
        <h3 style={{ fontSize: '40px', color: '#fff', marginBottom: '8px' }}>The Decision Matrix</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', maxWidth: '500px' }}>
          Drag the opponent (white dot) around their side of the court. The Spatial Engine will dynamically recalculate your highest-probability target zone.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', flex: 1 }}>
        
        {/* Left Column: 2D Drag Pad */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h4 style={{ color: '#fff', marginBottom: '24px', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Control Pad (Top-Down)</h4>
          
          <div 
            ref={containerRef}
            style={{ 
              width: '240px', height: '480px', background: '#111', 
              border: '2px solid rgba(255,255,255,0.1)', position: 'relative',
              borderRadius: '8px', overflow: 'hidden'
            }}
          >
            {/* 2D Court Lines */}
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.3)' }} />
            <div style={{ position: 'absolute', top: '25%', bottom: '25%', left: '10%', right: '10%', border: '2px solid rgba(255,255,255,0.2)' }} />
            <div style={{ position: 'absolute', top: '25%', bottom: '25%', left: '50%', width: '2px', background: 'rgba(255,255,255,0.2)' }} />
            
            {/* Draggable Opponent */}
            <motion.div
              drag
              dragElastic={0}
              dragMomentum={false}
              onDrag={handleDrag}
              style={{
                position: 'absolute',
                top: 0, left: 0, // Pos driven by transform via state
                x: `calc(${oppPos.x * 240}px - 12px)`,
                y: `calc(${oppPos.y * 480}px - 12px)`,
                width: '24px', height: '24px',
                borderRadius: '50%', background: '#fff',
                cursor: 'grab', zIndex: 10,
                boxShadow: '0 0 15px rgba(255,255,255,0.5)'
              }}
              whileDrag={{ scale: 1.2, cursor: 'grabbing' }}
            />

            {/* Target Indicator on 2D */}
            <motion.div 
              animate={{ x: `calc(${target.x * 240}px - 12px)`, y: `calc(${target.y * 480}px - 12px)` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              style={{
                position: 'absolute', top: 0, left: 0,
                width: '24px', height: '24px',
                borderRadius: '50%', border: '2px dashed var(--lime)',
                pointerEvents: 'none'
              }}
            />
          </div>
        </div>

        {/* Right Column: 3D Engine Output & Data */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--faint)', textTransform: 'uppercase', marginBottom: '4px' }}>Suggested Shot</div>
              <div style={{ fontSize: '16px', color: '#fff', fontWeight: 500 }}>{target.shotType}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--faint)', textTransform: 'uppercase', marginBottom: '4px' }}>Win Probability</div>
              <div style={{ fontSize: '24px', color: 'var(--lime)', fontWeight: 700, fontFamily: 'monospace' }}>{target.prob}%</div>
            </div>
          </div>

          <div style={{ flex: 1, position: 'relative', perspective: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* 3D Court Projection */}
            <motion.div 
              style={{ 
                width: '240px', height: '480px', background: '#1A2C1A',
                border: '2px solid rgba(255,255,255,0.3)',
                transformStyle: 'preserve-3d',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
              }}
              animate={{ rotateX: 60, rotateZ: -25 }}
              transition={{ duration: 1 }}
            >
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(217,248,127,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(217,248,127,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.6)' }} />
              <div style={{ position: 'absolute', top: '25%', bottom: '25%', left: '10%', right: '10%', border: '2px solid rgba(255,255,255,0.2)' }} />
              <div style={{ position: 'absolute', top: '25%', bottom: '25%', left: '50%', width: '2px', background: 'rgba(255,255,255,0.2)' }} />

              {/* Opponent in 3D */}
              <motion.div
                animate={{ top: `${oppPos.y * 100}%`, left: `${oppPos.x * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                style={{
                  position: 'absolute', width: '40px', height: '40px',
                  background: 'rgba(255,255,255,0.8)', filter: 'blur(8px)',
                  transform: 'translate(-50%, -50%)', borderRadius: '50%'
                }}
              />

              {/* Target Zone in 3D */}
              <motion.div
                animate={{ top: `${target.y * 100}%`, left: `${target.x * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{
                  position: 'absolute', width: '80px', height: '80px',
                  background: 'rgba(217,248,127,0.3)', filter: 'blur(12px)',
                  transform: 'translate(-50%, -50%)', borderRadius: '50%'
                }}
              />
              <motion.div
                animate={{ top: `${target.y * 100}%`, left: `${target.x * 100}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                style={{
                  position: 'absolute', width: '12px', height: '12px',
                  background: 'var(--lime)', boxShadow: '0 0 20px var(--lime)',
                  transform: 'translate(-50%, -50%)', borderRadius: '50%'
                }}
              />

              {/* Trajectory Line (CSS Hack) */}
              <svg style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
                <motion.line 
                  x1="50%" y1="95%" 
                  animate={{ x2: `${target.x * 100}%`, y2: `${target.y * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  stroke="var(--lime)" strokeWidth="2" strokeDasharray="6 6" opacity="0.5"
                />
              </svg>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
