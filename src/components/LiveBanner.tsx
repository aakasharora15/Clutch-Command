import React, { useState } from 'react';
import Link from 'next/link';

// Toggle this boolean to turn the banner on/off across the whole site
const IS_LIVE = true; 

export default function LiveBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (!IS_LIVE || dismissed) return null;

  return (
    <div style={{ background: '#ff0033', color: '#fff', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', position: 'relative', zIndex: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '13px' }}>
        <div style={{ width: '8px', height: '8px', background: '#fff', borderRadius: '50%', animation: 'pulse 1.5s infinite' }}></div>
        Live Watchalong
      </div>
      <p style={{ margin: 0, fontSize: '14px', fontWeight: 500 }}>
        Dan & Vlado are live breaking down the Australian Open Final.
      </p>
      <Link href="/live" style={{ background: '#fff', color: '#ff0033', padding: '6px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Watch Now
      </Link>
      <button 
        onClick={() => setDismissed(true)}
        style={{ background: 'none', border: 'none', color: '#fff', opacity: 0.7, cursor: 'pointer', position: 'absolute', right: '16px', padding: '4px' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(255, 255, 255, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
      `}} />
    </div>
  );
}
