"use client";

import React from 'react';
import Image from 'next/image';

export default function PlatformSneakPeek() {
  return (
    <section className="airy-section" style={{ background: 'var(--bg-dark)' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>The Academy</div>
          <h2 className="section-header" style={{ color: '#fff' }}>Inside the War Room.</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', marginTop: '24px' }}>
            A sneak peek at the diagnostic dashboard. Track your cognitive load, isolate technical breakdown points, and monitor your baseline cortisol simulation scores.
          </p>
        </div>

        <div style={{ 
          position: 'relative', 
          width: '100%', 
          aspectRatio: '16/9', 
          background: '#0a0a0a', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)',
          overflow: 'hidden'
        }}>
          {/* Glassmorphic Top Bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '64px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 24px', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            </div>
            <div style={{ margin: '0 auto', color: 'rgba(255,255,255,0.4)', fontSize: '13px', letterSpacing: '0.05em' }}>CLUTCH COMMAND OS // DIAGNOSTIC MODE</div>
          </div>

          {/* Placeholder for the actual UI mockup image */}
          <Image src="/bento_player_backhand_1783528140582.jpg" alt="Platform Dashboard" fill style={{ objectFit: 'cover', opacity: 0.5 }} />
          
          {/* Overlay UI elements to look like a dashboard */}
          <div style={{ position: 'absolute', top: '100px', left: '40px', bottom: '40px', width: '280px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px' }}>
            <h4 style={{ color: '#fff', margin: '0 0 24px 0', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Performance Metrics</h4>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Cognitive Load</span>
                <span style={{ color: 'var(--lime)', fontSize: '12px', fontWeight: 'bold' }}>84%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '84%', height: '100%', background: 'var(--lime)', borderRadius: '2px' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Cortisol Spike (Simulated)</span>
                <span style={{ color: '#ff5f56', fontSize: '12px', fontWeight: 'bold' }}>Critical</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '92%', height: '100%', background: '#ff5f56', borderRadius: '2px' }}></div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Spatial Tracking Accuracy</span>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>62%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{ width: '62%', height: '100%', background: '#fff', borderRadius: '2px' }}></div>
              </div>
            </div>
          </div>
          
          <div style={{ position: 'absolute', top: '100px', right: '40px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(20px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lime)" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
             </div>
             <div>
               <div style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>Module 3 Complete</div>
               <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>Stress Inoculation Protocol</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
