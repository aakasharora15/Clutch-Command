"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AIVisualizer() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    // Simulate streaming data processing
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const next = [...prev, Math.random() * 100];
        if (next.length > 20) next.shift();
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bento-item glass" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(rgba(217, 248, 127, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 248, 127, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div style={{ position: 'relative', zIndex: 2, padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontFamily: 'ui-monospace, monospace', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.15em', color: 'var(--lime)' }}>
          <div>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--lime)', marginRight: '8px', animation: 'blink 1s infinite' }}></span>
            Ingesting Video Feeds
          </div>
          <div style={{ textAlign: 'right' }}>
            CQ_MODEL: v4.2.1<br/>
            STATUS: ACTIVE
          </div>
        </div>

        {/* Data Visualization */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
          {dataPoints.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${Math.max(10, val)}%`, opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ width: '12px', background: 'var(--lime)', borderRadius: '2px', opacity: 0.7 }}
            />
          ))}
        </div>

        {/* Readout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(217,248,127,0.1)', border: '1px solid rgba(217,248,127,0.2)', marginTop: '40px' }}>
          <div style={{ background: '#0F130B', padding: '16px' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Kinetic Chain</div>
            <div style={{ fontSize: '24px', color: '#fff', marginTop: '8px', fontFamily: 'ui-monospace, monospace' }}>94.2%</div>
          </div>
          <div style={{ background: '#0F130B', padding: '16px' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Court Positioning</div>
            <div style={{ fontSize: '24px', color: '#fff', marginTop: '8px', fontFamily: 'ui-monospace, monospace' }}>Opt-In</div>
          </div>
          <div style={{ background: '#0F130B', padding: '16px' }}>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pressure Index</div>
            <div style={{ fontSize: '24px', color: 'var(--lime)', marginTop: '8px', fontFamily: 'ui-monospace, monospace' }}>High</div>
          </div>
        </div>
      </div>
    </div>
  );
}
