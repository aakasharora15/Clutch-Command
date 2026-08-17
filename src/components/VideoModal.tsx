"use client";

import React, { useEffect } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
}

export default function VideoModal({ isOpen, onClose, videoSrc = "/hero-video.mp4" }: VideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 20, 10, 0.9)',
        backdropFilter: 'blur(20px)',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          background: 'none',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        Close
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          aspectRatio: '16/9',
          background: '#000',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* We use a placeholder video or poster for now */}
        <video 
          controls 
          autoPlay 
          playsInline 
          poster="/media__1783528047317.jpg"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          {/* <source src={videoSrc} type="video/mp4" /> */}
          <p style={{ color: '#fff', textAlign: 'center', marginTop: '20%' }}>Trailer coming soon.</p>
        </video>
      </div>
    </div>
  );
}
