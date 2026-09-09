import re

with open('src/app/HomeClient.tsx', 'r') as f:
    content = f.read()

# 1. Dual Path Split Section Replacement
dual_path_html = """
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px', marginTop: '48px' }}>
            
            {/* Left Path: The Curriculum */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '48px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ color: 'var(--lime)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Path 01: The Curriculum</div>
              <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '24px' }}>Clutch Academies</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>High-intensity pressure repetition drills designed by elite tour coaches.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <Image src="/bento_player_serve.jpg" alt="Singles" width={80} height={80} style={{ borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '4px' }}>Singles Masterclass</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Led by Vlado Platenik. Weekly tactical blueprints for singles play.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <Image src="/bento_player_celebrate_1783528150116.jpg" alt="Doubles" width={80} height={80} style={{ borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '4px' }}>Doubles Mastery</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>Led by Dan Kiernan. Court positioning and exploiting opponent weaknesses.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Path: The Analysis */}
            <div style={{ background: 'linear-gradient(145deg, rgba(202, 255, 51, 0.05) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid var(--lime)', borderRadius: '24px', padding: '48px', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ color: 'var(--lime)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Path 02: The Analysis</div>
              <h3 style={{ fontSize: '32px', color: '#fff', marginBottom: '24px' }}>Clutch Command</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px' }}>Upload your training footage to the members area for elite coaching intervention.</p>
              
              <div style={{ position: 'relative', width: '100%', height: '184px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Image src="/tennis_shoe_clay.jpg" alt="Analysis" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
"""

# Replace the grid-cards-3 section
content = re.sub(r'<div className="grid-cards-3">.*?</div>\s*</div>\s*</section>', dual_path_html + '\n        </div>\n      </section>', content, flags=re.DOTALL)

# 2. Coach's Whiteboard UI (Replacing Deliverables Bento Grid)
whiteboard_html = """
          <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '48px auto 0', height: '600px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Image src="/tennis_court_night.jpg" alt="Training Film Analysis" fill style={{ objectFit: 'cover' }} />
            
            {/* Dark overlay for contrast */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%)' }} />

            {/* Telestrator SVG Graphics */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 1000 600">
              {/* Circle around player position */}
              <circle cx="300" cy="400" r="40" fill="none" stroke="var(--lime)" strokeWidth="4" strokeDasharray="8 4" />
              {/* Bio-mechanic angle lines */}
              <path d="M 300 440 L 320 360 L 380 340" fill="none" stroke="#ff3333" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {/* Court positioning arrow */}
              <path d="M 340 400 Q 450 350 550 420" fill="none" stroke="var(--lime)" strokeWidth="4" strokeDasharray="12 6" />
              <polygon points="540 410 560 425 535 430" fill="var(--lime)" />
            </svg>

            {/* PIP Coach Video Box */}
            <div style={{ position: 'absolute', top: '32px', right: '32px', width: '200px', height: '120px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--lime)', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
              <Image src="/tennis_coach_talk.jpg" alt="Coach Analysis" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live Feedback</div>
            </div>

            {/* Playback Controls & Info */}
            <div style={{ position: 'absolute', bottom: '32px', left: '32px', right: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ display: 'inline-block', background: 'var(--lime)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Training Diagnostic Report</div>
                <h3 style={{ color: '#fff', fontSize: '28px', margin: 0, maxWidth: '500px', lineHeight: 1.3 }}>A comprehensive breakdown of your submitted training footage.</h3>
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3" fill="#fff"></polygon></svg>
                </div>
              </div>
            </div>
          </div>
"""

content = re.sub(r'<div className="bento-grid">.*?</div>\s*</div>\s*</section>', whiteboard_html + '\n        </div>\n      </section>', content, flags=re.DOTALL)

with open('src/app/HomeClient.tsx', 'w') as f:
    f.write(content)

