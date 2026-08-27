import React from 'react';

export const metadata = {
  title: 'Live Watchalong | Clutch Command',
  description: 'Join Grand Slam coaches Vlado Platenik and Dan Kiernan for live tactical breakdowns of the biggest matches on tour.'
};

export default function LivePage() {
  return (
    <div className="page-wrapper dark" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="wrap" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: '#ff0033', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}>
             <div style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%' }}></div>
             Live Now
          </div>
          <h1 style={{ fontSize: '32px', color: '#fff', margin: 0 }}>Australian Open Final Watchalong</h1>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', alignItems: 'stretch' }}>
          
          {/* Video Player Placeholder */}
          <div style={{ background: '#000', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* In production, replace this with the YouTube embed iframe */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--lime)" style={{ marginBottom: '16px', opacity: 0.8 }}><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>YouTube Live Stream Embedded Here</p>
          </div>

          {/* Live Chat / Coach Notes Panel */}
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
              <h3 style={{ color: '#fff', fontSize: '16px', margin: 0 }}>Coach's Whiteboard</h3>
            </div>
            
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'url(/tennis_court_night.jpg) center/cover' }}></div>
                  <span style={{ color: 'var(--lime)', fontSize: '13px', fontWeight: 600 }}>Dan Kiernan</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>Just now</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                  Notice the court positioning shift here. He's dropped 2 feet behind the baseline because of the tension. That's a cognitive breakdown, not a physical one.
                </p>
              </div>
            </div>
            
            <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)' }}>
               <a href="/#pricing" className="btn-dark" style={{ background: 'var(--lime)', color: '#111', width: '100%', textAlign: 'center', padding: '12px', fontSize: '14px' }}>Join the Academy</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
