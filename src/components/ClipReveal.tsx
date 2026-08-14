"use client";
import React, { useEffect, useRef, useState } from 'react';

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function ClipReveal({ children, className = '', style = {} }: ClipRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`clip-reveal ${isRevealed ? 'is-revealed' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
