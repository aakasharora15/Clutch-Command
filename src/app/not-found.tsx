import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="section-eyebrow" style={{ color: 'var(--lime)' }}>404 Error</div>
      <h1 className="section-header" style={{ fontSize: 'clamp(48px, 8vw, 96px)', marginBottom: '24px' }}>Out of Bounds.</h1>
      <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '500px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
        The page you are looking for has been removed or doesn't exist. Let's get you back to the baseline.
      </p>
      <Link href="/" className="btn-dark" style={{ background: 'var(--lime)', color: '#111', padding: '16px 32px' }}>
        Back to Baseline
      </Link>
    </div>
  );
}
