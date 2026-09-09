with open('src/components/PricingTiers.tsx', 'r') as f:
    content = f.read()

new_pricing = """
    <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '64px' }}>
        
        {/* Tier 1 */}
        <div className="pricing-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>The Foundation</h3>
            <p style={{ color: 'var(--lime)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>T.R.U.S.T. Playbook</p>
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 300, marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>£9</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.8, flex: 1 }}>
                <li>✓ The exact biological mechanics of a choke</li>
                <li>✓ How cortisol destroys spatial tracking</li>
                <li>✓ 3 immediate physical triggers to reset</li>
            </ul>
            <a href="/#pricing" className="btn-outline" style={{ textAlign: 'center', width: '100%' }}>Get the Playbook</a>
        </div>

        {/* Tier 2 */}
        <div className="pricing-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>The Curriculum</h3>
            <p style={{ color: 'var(--lime)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Clutch Academies</p>
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 300, marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>£29<span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)' }}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.8, flex: 1 }}>
                <li>✓ Singles drills by Vlado Platenik</li>
                <li>✓ Doubles tactics by Dan Kiernan</li>
                <li>✓ High-intensity pressure repetition</li>
                <li>✓ Access to the community</li>
            </ul>
            <a href="/#pricing" className="btn-outline" style={{ textAlign: 'center', width: '100%' }}>Take the CQ Diagnostic</a>
        </div>

        {/* Tier 3 */}
        <div className="pricing-card" style={{ background: 'linear-gradient(180deg, rgba(217, 248, 127, 0.1) 0%, rgba(255,255,255,0.03) 100%)', border: '1px solid var(--lime)', borderRadius: '24px', padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--lime)', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Premium</div>
            <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>The Analysis</h3>
            <p style={{ color: 'var(--lime)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Clutch Command</p>
            <div style={{ fontSize: '48px', color: '#fff', fontWeight: 300, marginBottom: '24px', fontFamily: 'var(--font-heading)' }}>£99<span style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)' }}>/mo</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.8, flex: 1 }}>
                <li>✓ Everything in The Curriculum</li>
                <li>✓ Upload custom training film</li>
                <li>✓ 4-week execution & review cycle</li>
                <li>✓ Custom coaching feedback on cognitive leaks</li>
            </ul>
            <a href="/#pricing" className="btn-dark" style={{ background: 'var(--lime)', color: '#111', textAlign: 'center', width: '100%' }}>Take the CQ Diagnostic</a>
        </div>

    </div>
"""

import re
# Find the div containing the old pricing grid and replace it
# The old file has a div with className="grid-2" or something similar.
content = re.sub(r'<div className="grid-2" style={{ marginTop: \'64px\' }}>.*?</div>\s*</div>\s*</section>', new_pricing + '\n        </div>\n      </section>', content, flags=re.DOTALL)

with open('src/components/PricingTiers.tsx', 'w') as f:
    f.write(content)
