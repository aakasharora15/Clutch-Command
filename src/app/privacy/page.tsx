import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="page-wrapper" style={{ paddingTop: '160px', paddingBottom: '160px', minHeight: '100vh', background: 'var(--bg)', color: '#fff' }}>
      <div className="wrap" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '24px', color: 'var(--lime)' }}>Privacy Policy</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '48px' }}>Last updated: August 2026</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>1. Information We Collect</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, and other information you choose to provide.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>2. How We Use Information</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>We may use the information we collect about you to provide, maintain, and improve our services, including, for example, to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support to Users, develop safety features, authenticate users, and send product updates and administrative messages.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>3. Sharing of Information</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing. We may share your information with our affiliates, subsidiaries, and business partners.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>4. Analytics and Advertising</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>We may allow others to provide audience measurement and analytics services for us, to serve advertisements on our behalf across the Internet, and to track and report on the performance of those advertisements. These entities may use cookies, web beacons, SDKs, and other technologies to identify your device when you visit our site and use our services.</p>
          </div>
          <div>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>5. Contact Us</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>If you have any questions about this Privacy Statement, please contact us at support@clutchcommand.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
