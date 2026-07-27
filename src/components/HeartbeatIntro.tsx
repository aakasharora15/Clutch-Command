'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './HeartbeatIntro.module.css';

export default function HeartbeatIntro() {
  const [stage, setStage] = useState<'initial' | 'pulse' | 'scoreboard' | 'release' | 'done'>('initial');
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (stage !== 'done') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [stage]);

  const playHeartbeat = () => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const time = ctx.currentTime;
    
    // Helper to create a single thump
    const createThump = (startTime: number, freqStart: number, freqEnd: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, startTime);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, startTime + duration);
      
      gain.gain.setValueAtTime(1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // "Lub"
    createThump(time, 150, 40, 0.15);
    // "Dub"
    createThump(time + 0.25, 180, 40, 0.2);
    
    // Trigger device vibration (lub-dub pattern)
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([150, 100, 200]);
    }
  };

  const startSequence = () => {
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }

    setStage('pulse');

    // 1. Start heartbeat pulse
    let beats = 0;
    const beatInterval = setInterval(() => {
      playHeartbeat();
      beats++;
      if (beats >= 4) {
        clearInterval(beatInterval);
      }
    }, 1000);

    // 2. Build tension (Scoreboard)
    setTimeout(() => {
      setStage('scoreboard');
    }, 2000);

    // 3. Release text
    setTimeout(() => {
      setStage('release');
    }, 5000);

    // 4. Conclude intro and reveal site
    setTimeout(() => {
      setStage('done');
    }, 8500);
  };

  if (stage === 'done') return null;

  return (
    <div className={`${styles.overlay} ${stage === 'done' ? styles.fadeOut : ''}`}>
      {stage === 'initial' && (
        <button className={styles.startBtn} onClick={startSequence}>
          Enter the arena
        </button>
      )}

      {stage !== 'initial' && (
        <div className={styles.sequenceContainer}>
          <div className={`${styles.vignette} ${stage !== 'initial' ? styles.vignetteActive : ''}`}></div>
          
          <div className={`${styles.scoreboard} ${(stage === 'scoreboard' || stage === 'release') ? styles.scoreboardActive : ''} ${stage === 'release' ? styles.scoreboardFade : ''}`}>
            30 - 30
          </div>
          
          <div className={`${styles.releaseText} ${stage === 'release' ? styles.releaseTextActive : ''}`}>
            Trust the training.<br />Win two more points.
          </div>
        </div>
      )}
    </div>
  );
}
