"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MockDiagnosisDropzone() {
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
    startProcessing();
  };

  const startProcessing = () => {
    if (isProcessing || showResult) return;
    setIsProcessing(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 4500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = () => {
    setIsHovering(false);
  };

  return (
    <div 
      className="bento-item glass" 
      style={{ 
        position: 'relative', 
        minHeight: '320px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        border: isHovering ? '2px dashed var(--lime)' : '1px dashed rgba(255,255,255,0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={startProcessing}
    >
      <AnimatePresence mode="wait">
        
        {/* Initial State */}
        {!isProcessing && !showResult && (
          <motion.div 
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{ textAlign: 'center', pointerEvents: 'none' }}
          >
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(217, 248, 127, 0.1)', color: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>Diagnose Your Swing</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>Drag & drop match footage here, or click to run a mock simulation.</p>
          </motion.div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', width: '100%' }}
          >
            <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '11px', fontFamily: 'ui-monospace, monospace', color: 'var(--lime)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', background: 'var(--lime)', borderRadius: '50%', animation: 'blink 1s infinite' }} />
                  Analyzing Kinetic Chain
                </span>
              </div>
              <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4.5, ease: "linear" }}
                  style={{ height: '100%', background: 'var(--lime)' }}
                />
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              style={{ marginTop: '32px', fontFamily: 'ui-monospace, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.5)', textAlign: 'left', width: '100%', maxWidth: '300px', margin: '32px auto 0 auto' }}
            >
              <div>&gt; Detecting shoulder rotation... [OK]</div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>&gt; Calculating racket lag... [OK]</motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.1 }}>&gt; Simulating pressure conditions...</motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Result State */}
        {showResult && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', width: '100%' }}
          >
            <div style={{ display: 'inline-block', background: 'rgba(255, 100, 100, 0.1)', color: '#FF6464', padding: '6px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Breakdown Detected
            </div>
            <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '12px' }}>Tension-Induced Early Rotation</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', maxWidth: '340px', margin: '0 auto 32px auto', lineHeight: 1.5 }}>
              Under simulated 30-30 pressure, your non-dominant arm drops 0.4s early, causing a 14% loss in angular momentum.
            </p>
            <a href="/playbook" className="btn-dark" style={{ background: 'var(--lime)', color: '#111', padding: '12px 24px', fontSize: '14px', textDecoration: 'none', display: 'inline-block' }}>
              View the Fix in The Playbook
            </a>
            
            <button 
              onClick={() => setShowResult(false)} 
              style={{ display: 'block', margin: '24px auto 0 auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Run another diagnostic
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
