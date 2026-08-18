"use client";

import React, { useState, useRef, useEffect } from 'react';

interface PressureScrubberProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function PressureScrubber({ 
  beforeImage, 
  afterImage,
  beforeLabel = "15-0: Perfect Form",
  afterLabel = "30-30: Kinetic Breakdown"
}: PressureScrubberProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      className="bento-item glass" 
      style={{ padding: 0, position: 'relative', overflow: 'hidden', height: '500px', userSelect: 'none' }}
      ref={containerRef}
    >
      {/* Base Image (Before) */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={beforeImage} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', color: '#fff', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, zIndex: 2 }}>
          {beforeLabel}
        </div>
      </div>

      {/* Overlay Image (After) */}
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${sliderPosition}%)` }}>
        <img src={afterImage} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
        <div style={{ position: 'absolute', bottom: '24px', right: '24px', background: 'rgba(217, 248, 127, 0.8)', backdropFilter: 'blur(10px)', color: '#111', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, zIndex: 2 }}>
          {afterLabel}
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          bottom: 0, 
          left: `${sliderPosition}%`, 
          width: '2px', 
          background: '#fff', 
          cursor: 'ew-resize',
          zIndex: 10,
          transform: 'translateX(-50%)'
        }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          background: '#fff',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            <polyline points="9 18 15 12 9 6" style={{ transform: 'scaleX(-1)', transformOrigin: 'center' }}></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
