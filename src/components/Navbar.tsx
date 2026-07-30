import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo-heartbeat.png" alt="Clutch Command" width={60} height={40} style={{ objectFit: 'contain' }} priority />
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
