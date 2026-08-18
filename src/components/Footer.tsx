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
            <h4 className={styles.colTitle}>Platform</h4>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/academies" className={styles.link}>Academies</Link>
            <Link href="/singles-academy" className={styles.link}>Singles Academy</Link>
            <Link href="/doubles-academy" className={styles.link}>Doubles Academy</Link>
            <Link href="/ai-engine" className={styles.link}>AI Engine</Link>
            <Link href="/labs" className={styles.link}>Labs (Beta)</Link>
            <Link href="/playbook" className={styles.link}>The £9 Playbook</Link>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>About</h4>
            <Link href="/co-founders" className={styles.link}>Co-Founders</Link>
            <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
            <Link href="/terms" className={styles.link}>Terms of Service</Link>
          </div>

          <div className={styles.navCol}>
            <h4 className={styles.colTitle}>Social</h4>
            <a href="#" className={styles.link}>X (Twitter)</a>
            <a href="#" className={styles.link}>Facebook</a>
            <a href="#" className={styles.link}>LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
