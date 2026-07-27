import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Clutch Command
        </Link>
        <div className={styles.links}>
          <Link href="/product" className={styles.link}>Product</Link>
          <Link href="/promises" className={styles.link}>Promises</Link>
          <Link href="/co-founders" className={styles.link}>Co-Founders</Link>
          <Link href="/offer" className="btn-primary">The Offer →</Link>
        </div>
      </div>
    </nav>
  );
}
