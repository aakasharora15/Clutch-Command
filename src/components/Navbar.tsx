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
        {/* Left Links */}
        <div className={styles.linksLeft}>
          <div className={styles.linksPill}>
            <Link href="/product" className={styles.link}>Product</Link>
            <Link href="/promises" className={styles.link}>Promises</Link>
            <Link href="/co-founders" className={styles.link}>Co-Founders</Link>
          </div>
        </div>
        
        {/* Center Logo */}
        <div className={styles.logoCenter}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src={isDark ? "/logo-clutch.png" : "/logo-clutch-white.png"} alt="Clutch Command" width={140} height={40} style={{ objectFit: 'contain' }} priority />
          </Link>
        </div>
        
        {/* Right CTA / Search */}
        <div className={styles.actionsRight}>
          <a href={CTA.url} className={styles.ctaButton}>{CTA.labelArrow}</a>
        </div>
      </div>
    </nav>
  );
}
