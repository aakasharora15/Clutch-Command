"use client";

import React, { useState, useEffect, useRef } from 'react';

type GameState = 'idle' | 'watching' | 'waiting' | 'react' | 'result';

export default function CognitiveTest() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [msg, setMsg] = useState("");
  
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = () => {
    setGameState('watching');
    setMsg("Watch the serve...");
    
    // Simulate watching the video for 2 seconds
    timeoutRef.current = setTimeout(() => {
      setGameState('waiting');
      setMsg("Wait for the split step...");
      
      // Random delay before the trigger (1 to 3 seconds)
      const delay = Math.random() * 2000 + 1000;
      timeoutRef.current = setTimeout(() => {
        setGameState('react');
        setMsg("CLICK NOW!");
        startTimeRef.current = Date.now();
      }, delay);
      
    }, 2000);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      // Clicked too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setGameState('result');
      setReactionTime(null);
      setMsg("Too early! You anticipated, which leads to getting wrong-footed.");
    } else if (gameState === 'react') {
      // Good reaction
      const rt = Date.now() - startTimeRef.current;
      setReactionTime(rt);
      setGameState('result');
      
      if (rt < 200) {
        setMsg("Elite. Tour-level cognitive processing.");
      } else if (rt < 300) {
        setMsg("Solid. But under pressure at 30-30, this slows down by 15%.");
      } else {
        setMsg("Slow. A 120mph serve would have aced you.");
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="bento-item glass" style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', padding: 0 }}>
      
      {/* Game Area */}
      <div 
        onClick={handleClick}
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          cursor: (gameState === 'waiting' || gameState === 'react') ? 'pointer' : 'default',
          background: gameState === 'react' ? 'var(--lime)' : 
                      gameState === 'result' && !reactionTime ? '#FF6464' : 'transparent',
          transition: gameState === 'react' ? 'none' : 'background 0.3s ease',
          padding: '40px',
          textAlign: 'center'
        }}
      >
        
        {gameState === 'idle' && (
          <>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--lime)', marginBottom: '16px' }}>
              Mini-Game
            </div>
            <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '8px' }}>Split-Second Cognitive Test</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '32px', maxWidth: '300px' }}>
              Test your baseline reaction time. When the screen flashes green, click as fast as possible.
            </p>
            <button onClick={startGame} className="btn-dark" style={{ background: 'var(--lime)', color: '#111' }}>
              Start Test
            </button>
          </>
        )}

        {(gameState === 'watching' || gameState === 'waiting') && (
          <h2 style={{ fontSize: '24px', color: '#fff', fontFamily: 'ui-monospace, monospace' }}>
            {msg}
          </h2>
        )}

        {gameState === 'react' && (
          <h2 style={{ fontSize: '48px', color: '#111', fontWeight: 900, textTransform: 'uppercase' }}>
            {msg}
          </h2>
        )}

        {gameState === 'result' && (
          <>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: reactionTime ? 'var(--lime)' : '#111', marginBottom: '16px' }}>
              Diagnostic Result
            </div>
            
            {reactionTime ? (
              <h1 style={{ fontSize: '64px', color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1, marginBottom: '16px' }}>
                {reactionTime} <span style={{ fontSize: '24px', color: 'rgba(255,255,255,0.4)' }}>ms</span>
              </h1>
            ) : (
              <h1 style={{ fontSize: '48px', color: '#fff', fontFamily: 'var(--font-heading)', lineHeight: 1, marginBottom: '16px' }}>
                False Start
              </h1>
            )}

            <p style={{ color: reactionTime ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.9)', fontSize: '16px', marginBottom: '32px', maxWidth: '300px' }}>
              {msg}
            </p>
            <button onClick={startGame} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer' }}>
              Try Again
            </button>
          </>
        )}

      </div>
    </div>
  );
}
