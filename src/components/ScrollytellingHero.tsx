"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollytellingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '150vh', background: '#0a0a0a' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Background Video/Image Layer */}
        <motion.div 
          style={{ 
            position: 'absolute', inset: 0, scale, opacity,
            backgroundImage: 'url(/media__1783528047317.jpg)', 
            backgroundSize: 'cover', backgroundPosition: 'center'
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.4) 100%)' }} />
        </motion.div>

        {/* Foreground Typography */}
        <motion.div 
          style={{ position: 'relative', zIndex: 10, textAlign: 'center', y: yText }}
        >
          <div style={{ display: 'inline-block', padding: '8px 24px', border: '1px solid var(--lime)', borderRadius: '100px', color: 'var(--lime)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '32px' }}>
            The AI-Powered Pressure Engine
          </div>
          <h1 style={{ fontSize: 'clamp(60px, 10vw, 140px)', lineHeight: 0.9, letterSpacing: '-0.03em', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
            Own The<br/><span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>Geometry.</span><br/>Dictate The<br/><span style={{ color: 'var(--lime)' }}>Panic.</span>
          </h1>
        </motion.div>

      </div>
    </div>
  );
}
