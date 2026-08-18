"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ProMatchOverlay() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controls = useAnimation();

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        controls.stop();
      } else {
        videoRef.current.play();
        setIsPlaying(true);
        // Start fake tracking animations
        controls.start({
          x: [100, 150, 120, 200, 100],
          y: [100, 80, 150, 120, 100],
          transition: { duration: 4, repeat: Infinity, ease: "linear" }
        });
      }
    }
  };

  return (
    <div className="bento-item glass" style={{ position: 'relative', overflow: 'hidden', padding: 0, minHeight: '400px', cursor: 'pointer' }} onClick={handlePlayPause}>
      
      {/* Fallback Image / Video */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video 
          ref={videoRef}
          src="/hero-video.mp4" 
          poster="/hero_tennis_court_1783528122643.jpg"
          loop 
          muted 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(10,20,10,0.9) 0%, transparent 60%)' }}></div>
      </div>

      {/* Play Overlay */}
      {!isPlaying && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(217, 248, 127, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#111" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      )}

      {/* AI Tracking Overlay */}
      {isPlaying && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
          
          {/* Tracking Box */}
          <motion.div 
            animate={controls}
            style={{ position: 'absolute', width: '80px', height: '120px', border: '2px solid var(--lime)', borderRadius: '4px', boxShadow: '0 0 10px rgba(217,248,127,0.5)' }}
          >
            <div style={{ position: 'absolute', top: '-24px', left: '-2px', background: 'var(--lime)', color: '#111', fontSize: '10px', padding: '2px 6px', fontWeight: 700, fontFamily: 'ui-monospace, monospace', textTransform: 'uppercase' }}>
              Player_01: 94% CONF
            </div>
            
            {/* Skeletal line */}
            <motion.div 
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'absolute', top: '20%', left: '50%', width: '2px', height: '40px', background: 'var(--lime)', transformOrigin: 'top center' }}
            />
          </motion.div>

          {/* Readout */}
          <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '12px', border: '1px solid rgba(217,248,127,0.3)', fontFamily: 'ui-monospace, monospace', color: 'var(--lime)', fontSize: '11px', textTransform: 'uppercase' }}>
            <div>&gt; Syncing Kinetics</div>
            <div>&gt; Shoulder: <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>112&deg;</motion.span></div>
            <div>&gt; Pressure Index: HIGH</div>
          </div>
        </div>
      )}

      {/* UI Content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: 'none' }}>
        <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>Pro Match AI Analysis</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', maxWidth: '400px' }}>
          Our engine analyzing professional footage in real-time to identify kinetic deviations under Grand Slam pressure.
        </p>
      </div>
      
    </div>
  );
}
