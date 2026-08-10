import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <h2 className={styles.logo}>Clutch Command</h2>
            <p className={styles.tagline}>Win Two More Points.</p>
          </div>
          
          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>About</h4>
            <Link href="/" className={styles.link}>Company</Link>
            <Link href="/terms" className={styles.link}>Terms</Link>
            <Link href="/privacy" className={styles.link}>Policy</Link>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Services</h4>
            <Link href="/product" className={styles.link}>Academy</Link>
            <Link href="/playbook" className={styles.link}>Playbook</Link>
            <Link href="/promises" className={styles.link}>Promises</Link>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Social</h4>
            <a href="#" className={styles.link}>X (Twitter)</a>
            <a href="#" className={styles.link}>Facebook</a>
            <a href="#" className={styles.link}>LinkedIn</a>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Contact</h4>
            <a href="#" className={styles.link}>Get a free quotation</a>
            <a href="#" className={styles.link}>Book a call</a>
            <a href="mailto:dsports@gmail.com" className={styles.link}>clutch@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
