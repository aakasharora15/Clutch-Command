"use client";
import React, { useEffect, useRef, useState } from 'react';

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function StaggerReveal({ children, className = '', style = {} }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`stagger-children ${isVisible ? 'is-visible' : ''} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
