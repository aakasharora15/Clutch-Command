"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  const [isHovering, setIsHovering] = useState(false);
  
  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only enable custom cursor on devices with a mouse
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('magnetic') ||
        target.closest('.magnetic') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: isHovering ? '64px' : '16px',
        height: isHovering ? '64px' : '16px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'width 0.2s cubic-bezier(0.2, 1, 0.3, 1), height 0.2s cubic-bezier(0.2, 1, 0.3, 1)',
        willChange: 'transform, width, height'
      }}
    />
  );
}
