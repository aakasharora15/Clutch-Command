"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

export default function ScrollReveal({ children, className = '', delay = 0, style }: ScrollRevealProps) {
  return (
    <motion.div 
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], // Custom cubic bezier matching Apple-like motion
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
}
