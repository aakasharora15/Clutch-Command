"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type Scenario = 'aggressive' | 'choking' | 'second_serve';

export default function TacticalBoard3D() {
  const [scenario, setScenario] = useState<Scenario>('aggressive');

  // Define heatmap positions based on scenario
  // Coordinates are relative to the court container (0 to 100%)
  const getPositions = () => {
    switch(scenario) {
      case 'aggressive':
        return { player: { top: '85%', left: '50%' }, opponent: { top: '15%', left: '50%' }, color: 'var(--lime)' };
      case 'choking':
        return { player: { top: '65%', left: '70%' }, opponent: { top: '25%', left: '30%' }, color: '#FF6464' };
      case 'second_serve':
        return { player: { top: '75%', left: '30%' }, opponent: { top: '5%', left: '50%' }, color: '#78DCFF' };
    }
  };

  const pos = getPositions();

  return (
    <div className="bento-item glass" style={{ position: 'relative', minHeight: '600px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      
      {/* Header & Controls (Layered on top) */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '40px' }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--lime)', marginBottom: '16px' }}>Spatial Geometry Engine</div>
          <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Interactive 3D Heatmap</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '300px' }}>
            Watch how cognitive load alters your physical positioning on the court.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            onClick={() => setScenario('aggressive')}
            style={{ padding: '12px 24px', background: scenario === 'aggressive' ? 'var(--lime)' : 'rgba(255,255,255,0.05)', color: scenario === 'aggressive' ? '#111' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'ui-monospace, monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.3s' }}
          >
            15-0: Dominant Position
          </button>
          <button 
            onClick={() => setScenario('second_serve')}
            style={{ padding: '12px 24px', background: scenario === 'second_serve' ? '#78DCFF' : 'rgba(255,255,255,0.05)', color: scenario === 'second_serve' ? '#111' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'ui-monospace, monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.3s' }}
          >
            0-15: Aggressive Return
          </button>
          <button 
            onClick={() => setScenario('choking')}
            style={{ padding: '12px 24px', background: scenario === 'choking' ? '#FF6464' : 'rgba(255,255,255,0.05)', color: scenario === 'choking' ? '#111' : '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'ui-monospace, monospace', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', transition: 'all 0.3s' }}
          >
            30-30: Tension / No-Man's Land
          </button>
        </div>
      </div>

      {/* 3D Scene Container */}
      <div style={{ position: 'absolute', inset: 0, perspective: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        
        {/* The Court Surface */}
        <motion.div 
          style={{ 
            position: 'relative',
            width: '300px', 
            height: '600px', 
            background: '#1A2C1A', // Dark green court
            border: '2px solid rgba(255,255,255,0.4)',
            marginTop: '100px'
          }}
          initial={{ rotateX: 60, rotateZ: -30, scale: 0.8 }}
          animate={{ rotateX: 55, rotateZ: scenario === 'aggressive' ? -25 : scenario === 'choking' ? -35 : -15 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Court Lines */}
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.8)' }} /> {/* Net */}
          <div style={{ position: 'absolute', top: '25%', bottom: '25%', left: '10%', right: '10%', border: '2px solid rgba(255,255,255,0.4)' }} /> {/* Service Boxes */}
          <div style={{ position: 'absolute', top: '25%', bottom: '25%', left: '50%', width: '2px', background: 'rgba(255,255,255,0.4)', transform: 'translateX(-50%)' }} /> {/* Center Service Line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', background: 'rgba(255,255,255,0.2)', transform: 'translateX(-50%)' }} /> {/* Center Mark */}
          
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '10%', width: '2px', background: 'rgba(255,255,255,0.2)' }} /> {/* Singles Sideline */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, right: '10%', width: '2px', background: 'rgba(255,255,255,0.2)' }} /> {/* Singles Sideline */}

          {/* Grid Overlay for Tech Vibe */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(217,248,127,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(217,248,127,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          {/* Player Heatmap & Dot */}
          <motion.div
            animate={{ top: pos.player.top, left: pos.player.left }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{
              position: 'absolute',
              width: '80px',
              height: '80px',
              x: '-50%',
              y: '-50%',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* The Blur Halo */}
            <motion.div 
               animate={{ backgroundColor: pos.color }}
               style={{ position: 'absolute', inset: 0, borderRadius: '50%', filter: 'blur(15px)' }}
            />
            {/* The Solid Dot */}
            <motion.div 
               animate={{ backgroundColor: pos.color }}
               style={{ position: 'relative', zIndex: 2, width: '8px', height: '8px', borderRadius: '50%', boxShadow: '0 0 10px rgba(255,255,255,0.8)' }}
            />
          </motion.div>

          {/* Opponent Heatmap (Fainter) */}
          <motion.div
            animate={{ top: pos.opponent.top, left: pos.opponent.left }}
            transition={{ duration: 0.8, type: "spring", delay: 0.1 }}
            style={{
              position: 'absolute',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.3)',
              filter: 'blur(15px)',
              x: '-50%',
              y: '-50%',
              zIndex: 10
            }}
          />

        </motion.div>
      </div>

    </div>
  );
}
