"use client";

import React, { useState } from 'react';

export default function ROICalculator() {
  const [utr, setUtr] = useState(6.0);
  const [matches, setMatches] = useState(40);

  // Fake logic to show ROI
  // Assume 30% of matches played are lost by 2 points.
  // Assume fixing those adds 0.5 to 1.5 UTR depending on current level.
  const matchesLostByTwoPoints = Math.round(matches * 0.3);
  const projectedUtrBoost = Math.max(0.2, (10 - utr) * 0.15);
  const newUtr = parseFloat((utr + projectedUtrBoost).toFixed(1));

  return (
    <div className="bento-item glass" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', padding: '40px' }}>
      
      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--lime)', marginBottom: '16px' }}>
        The Cost of Choking
      </div>
      <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Two Points ROI Calculator</h3>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '40px', maxWidth: '400px' }}>
        Enter your stats to see how much your ranking is suffering due to cognitive leaks on break points.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
        
        {/* Sliders Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>Current UTR</label>
              <span style={{ fontSize: '13px', color: 'var(--lime)', fontFamily: 'ui-monospace, monospace' }}>{utr.toFixed(1)}</span>
            </div>
            <input 
              type="range" 
              min="1.0" 
              max="16.0" 
              step="0.1"
              value={utr} 
              onChange={(e) => setUtr(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--lime)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <label style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>Matches per Year</label>
              <span style={{ fontSize: '13px', color: 'var(--lime)', fontFamily: 'ui-monospace, monospace' }}>{matches}</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="100" 
              step="1"
              value={matches} 
              onChange={(e) => setMatches(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--lime)' }}
            />
          </div>
        </div>

        {/* Results Area */}
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Matches Lost by &le; 2 Points</div>
            <div style={{ fontSize: '36px', color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
              {matchesLostByTwoPoints}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Projected UTR (Clutch Adjusted)</div>
            <div style={{ fontSize: '56px', color: 'var(--lime)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>
              {newUtr.toFixed(1)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
