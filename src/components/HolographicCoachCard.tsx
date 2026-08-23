"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';

interface Stat {
  label: string;
  value: string;
}

interface CoachCardProps {
  name: string;
  academyType: string;
  description: string;
  imageSrc: string;
  link: string;
  stats: Stat[];
}

export default function HolographicCoachCard({ name, academyType, description, imageSrc, link, stats }: CoachCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotation
  const smoothX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  // Map mouse coordinates to 3D rotation (-15deg to 15deg)
  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  // Glare effect movement
  const glareX = useTransform(smoothX, [0, 1], [-50, 150]);
  const glareY = useTransform(smoothY, [0, 1], [-50, 150]);
  const glareOpacity = useTransform(smoothY, [0, 0.5, 1], [0.1, 0.4, 0.1]);

  // Parallax depth for foreground elements
  const textTranslateZ = useTransform(smoothX, [0, 1], [30, 30]); // Fixed Z-depth
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <Link href={link} style={{ textDecoration: 'none', display: 'block', perspective: '1500px' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          height: '650px',
          position: 'relative',
          borderRadius: '24px',
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
          boxShadow: isHovered 
            ? '0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(217,248,127,0.15)' 
            : '0 20px 40px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.4s ease'
        }}
      >
        {/* Background Image Layer (Deepest) */}
        <div 
          style={{
            position: 'absolute', inset: 0, borderRadius: '24px', overflow: 'hidden',
            transform: 'translateZ(-20px)',
          }}
        >
          <div 
            style={{
              position: 'absolute', inset: -20, // Negative inset to allow movement without seeing edges
              backgroundImage: `url(${imageSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: isHovered ? 'brightness(1.1) contrast(1.1) grayscale(20%)' : 'brightness(0.7) grayscale(80%)',
              transition: 'all 0.5s ease'
            }} 
          />
          {/* Gradients to ensure text readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,20,10,1) 0%, rgba(10,20,10,0.8) 30%, transparent 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,20,10,0.6) 0%, transparent 100%)' }} />
        </div>

        {/* Glare Layer */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, borderRadius: '24px', overflow: 'hidden',
            pointerEvents: 'none', zIndex: 10, mixBlendMode: 'overlay',
            opacity: isHovered ? glareOpacity : 0,
            transition: 'opacity 0.4s ease',
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 10%, transparent 50%)`
          }}
        />

        {/* Floating Content Layer (Pushed out in Z-space) */}
        <div 
          style={{
            position: 'absolute', inset: 0, padding: '40px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            transform: 'translateZ(60px)',
            pointerEvents: 'none'
          }}
        >
          {/* Top Right Tech Decal */}
          <div style={{ position: 'absolute', top: '30px', right: '30px', border: '1px solid rgba(217,248,127,0.3)', padding: '6px 12px', borderRadius: '4px', backdropFilter: 'blur(10px)' }}>
             <span style={{ fontSize: '10px', color: 'var(--lime)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Access Secured</span>
          </div>

          <motion.div animate={{ y: isHovered ? -10 : 0 }} transition={{ duration: 0.4, ease: "easeOut" }}>
            <h2 style={{ fontSize: 'clamp(40px, 4vw, 56px)', color: '#fff', marginBottom: '8px', lineHeight: 1, textShadow: '0 10px 20px rgba(0,0,0,0.8)' }}>
              {name}
            </h2>
            <h3 style={{ fontSize: '20px', color: 'var(--lime)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {academyType}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.6, marginBottom: '32px', maxWidth: '90%' }}>
              {description}
            </p>

            {/* Glowing Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{stat.label}</div>
                  <div style={{ fontSize: '18px', color: '#fff', fontWeight: 600, fontFamily: 'ui-monospace, monospace' }}>{stat.value}</div>
                </div>
              ))}
            </div>

            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              border: isHovered ? '1px solid var(--lime)' : '1px solid rgba(255,255,255,0.3)', 
              color: isHovered ? '#111' : '#fff',
              background: isHovered ? 'var(--lime)' : 'transparent',
              padding: '14px 28px', borderRadius: '4px',
              fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em',
              transition: 'all 0.3s ease'
            }}>
              Enter Protocol
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
