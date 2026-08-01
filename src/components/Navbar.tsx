"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CTA } from '../config/cta';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const isDark = pathname !== '/';

  return (
    <nav className={`${styles.navbar} ${isDark ? styles.darkNavbar : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/logo-heartbeat.png" alt="Clutch Command" width={110} height={60} style={{ objectFit: 'contain' }} priority />
        </Link>
        <div className={styles.links}>
          <Link href="/product" className={styles.link}>Product</Link>
          <Link href="/promises" className={styles.link}>Promises</Link>
          <Link href="/co-founders" className={styles.link}>Co-Founders</Link>
        </div>
        <a href={CTA.url} className={styles.ctaPill}>{CTA.label}</a>
      </div>
    </nav>
  );
}
