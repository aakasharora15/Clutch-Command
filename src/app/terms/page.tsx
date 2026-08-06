import React from 'react';

export default function TermsPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '160px', paddingBottom: '160px', minHeight: '100vh', background: 'var(--bg)', color: '#fff' }}>
      <div className="wrap" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '24px', color: 'var(--lime)' }}>Terms of Service</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '48px' }}>Last updated: August 2026</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>1. Acceptance of Terms</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>By accessing and using the Clutch Command website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>2. Description of Service</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>Clutch Command provides elite cognitive tennis training protocols, including digital dashboards, tactical blueprints, and 1-on-1 coaching sessions. The specific deliverables are subject to the tier of service purchased.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>3. 100% Money-Back Guarantee</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>We offer a 100% money-back guarantee based on measurable improvement. If your Clutch Quotient (CQ) does not improve within 30 days of completing the mandatory training modules and submitting required match footage, you are entitled to a full refund. The guarantee requires proof of completion of all prescribed drills and attendance at all scheduled coaching sessions.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>4. Intellectual Property</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>All content, including the TRUST protocol methodologies, proprietary scoring systems, videos, and texts provided through our services, are the exclusive property of Clutch Command and are protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>5. Limitation of Liability</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>In no event shall Clutch Command or its founders be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>6. Contact</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>For any questions regarding these Terms, please contact support@clutchcommand.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
