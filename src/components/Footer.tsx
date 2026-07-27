import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>Clutch Command</h2>
            <p className={styles.tagline}>Win Two More Points.</p>
          </div>
          <div className={styles.links}>
            <Link href="/" className={styles.link}>Company</Link>
            <Link href="/product" className={styles.link}>Product</Link>
            <Link href="/promises" className={styles.link}>Promises</Link>
            <Link href="/co-founders" className={styles.link}>Co-Founders</Link>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Clutch Command. All rights reserved.</p>
          <div className={styles.legal}>
            <Link href="/privacy" className={styles.link}>Privacy</Link>
            <Link href="/terms" className={styles.link}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
