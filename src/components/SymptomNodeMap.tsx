"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYMPTOMS = [
  { id: 's1', label: 'Double faults on break points', causeId: 'c1' },
  { id: 's2', label: 'Arm tightens in the 3rd set', causeId: 'c2' },
  { id: 's3', label: 'Pushing the ball when leading', causeId: 'c3' },
];

const CAUSES = [
  { id: 'c1', label: 'Tension-Induced Toss Drop', cureId: 'r1' },
  { id: 'c2', label: 'Kinetic Chain Breakdown', cureId: 'r2' },
  { id: 'c3', label: 'Fear of Unforced Errors', cureId: 'r3' },
];

const CURES = [
  { id: 'r1', label: 'Module 3: The Pressure Serve Protocol' },
  { id: 'r2', label: 'Module 4: Fluidity Under Fire' },
  { id: 'r3', label: 'Module 2: Aggressive Margins' },
];

export default function SymptomNodeMap() {
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null);

  const getActiveCause = () => {
    const symptom = SYMPTOMS.find(s => s.id === activeSymptom);
    return symptom ? symptom.causeId : null;
  };

  const getActiveCure = () => {
    const causeId = getActiveCause();
    const cause = CAUSES.find(c => c.id === causeId);
    return cause ? cause.cureId : null;
  };

  const activeCause = getActiveCause();
  const activeCure = getActiveCure();

  return (
    <div className="bento-item glass" style={{ position: 'relative', minHeight: '500px', padding: '60px 40px', overflow: 'hidden' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--lime)', marginBottom: '16px' }}>Interactive Diagnostic</div>
        <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '16px' }}>Symptom to Cure Blueprint</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '500px', margin: '0 auto' }}>
          Select your most common breakdown under pressure. Our AI engine traces the biological root cause and prescribes the exact Academy module to fix it.
        </p>
      </div>

      {/* Node Map Container */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', position: 'relative', zIndex: 10 }}>
        
        {/* SVG connecting lines (mocked via CSS borders for simplicity in React without exact refs, but we will use styled divs as connecting paths) */}
        <div style={{ position: 'absolute', top: '50%', left: '16%', right: '16%', height: '2px', background: 'rgba(255,255,255,0.05)', zIndex: -1, transform: 'translateY(-50%)' }} />

        {/* Symptoms Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '16px' }}>1. The Symptom</h4>
          {SYMPTOMS.map((s) => (
            <motion.div
              key={s.id}
              onClick={() => setActiveSymptom(s.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '20px',
                background: activeSymptom === s.id ? 'var(--lime)' : 'rgba(255,255,255,0.03)',
                color: activeSymptom === s.id ? '#111' : '#fff',
                borderRadius: '8px',
                border: `1px solid ${activeSymptom === s.id ? 'var(--lime)' : 'rgba(255,255,255,0.1)'}`,
                cursor: 'pointer',
                textAlign: 'center',
                fontWeight: activeSymptom === s.id ? 700 : 400,
                fontSize: '14px',
                transition: 'all 0.3s ease'
              }}
            >
              {s.label}
            </motion.div>
          ))}
        </div>

        {/* Causes Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '16px' }}>2. The Root Cause</h4>
          {CAUSES.map((c) => {
            const isActive = activeCause === c.id;
            return (
              <motion.div
                key={c.id}
                animate={{ 
                  opacity: activeSymptom ? (isActive ? 1 : 0.2) : 1,
                  scale: isActive ? 1.05 : 1
                }}
                style={{
                  padding: '20px',
                  background: isActive ? 'rgba(255,100,100,0.1)' : 'transparent',
                  color: isActive ? '#FF6464' : 'rgba(255,255,255,0.6)',
                  borderRadius: '8px',
                  border: `1px solid ${isActive ? '#FF6464' : 'transparent'}`,
                  textAlign: 'center',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: '14px',
                  transition: 'all 0.5s ease'
                }}
              >
                {c.label}
              </motion.div>
            )
          })}
        </div>

        {/* Cures Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '16px' }}>3. The Cure</h4>
          {CURES.map((r) => {
            const isActive = activeCure === r.id;
            return (
              <motion.div
                key={r.id}
                animate={{ 
                  opacity: activeSymptom ? (isActive ? 1 : 0.2) : 1,
                  scale: isActive ? 1.05 : 1,
                  boxShadow: isActive ? '0 0 20px rgba(217,248,127,0.2)' : 'none'
                }}
                style={{
                  padding: '20px',
                  background: isActive ? 'rgba(217,248,127,0.1)' : 'transparent',
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                  borderRadius: '8px',
                  border: `1px solid ${isActive ? 'var(--lime)' : 'transparent'}`,
                  textAlign: 'center',
                  fontWeight: isActive ? 700 : 400,
                  fontSize: '14px',
                  transition: 'all 0.5s ease',
                  position: 'relative'
                }}
              >
                {isActive && (
                  <motion.div 
                    layoutId="outline"
                    style={{ position: 'absolute', inset: -4, border: '1px solid var(--lime)', borderRadius: '12px' }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                  />
                )}
                {r.label}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* CTA Reveal */}
      <AnimatePresence>
        {activeSymptom && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ textAlign: 'center', marginTop: '60px' }}
          >
            <a href="#checkout" className="btn-dark" style={{ background: 'var(--lime)', color: '#111', padding: '16px 32px', fontSize: '15px' }}>
              Unlock {CURES.find(c => c.id === activeCure)?.label}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
