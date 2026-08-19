"use client";

import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface VideoHoverCardProps {
  videoSrc: string;
  posterSrc?: string;
  title: string;
  description: string;
  className?: string;
}

export default function VideoHoverCard({ videoSrc, posterSrc, title, description, className = '' }: VideoHoverCardProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(1.1)';
    }
  };

  const handleMouseLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.transform = 'scale(1.05)';
    }
  };

  return (
    <motion.div 
      className={`bento-item glass ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ padding: 0, cursor: 'pointer', overflow: 'hidden', minHeight: '380px' }}
    >
      {/* Background Layer */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img 
          ref={imgRef}
          src={posterSrc}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)', transform: 'scale(1.05)' }}
        />
        {/* Dark overlay so text is legible */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(10,20,10,0.9) 0%, rgba(10,20,10,0.2) 60%)' }}></div>
      </div>

      {/* Content Layer */}
      <div style={{ position: 'relative', zIndex: 1, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
        <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '12px' }}>{title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.5, margin: 0 }}>{description}</p>
      </div>
    </motion.div>
  );
}
