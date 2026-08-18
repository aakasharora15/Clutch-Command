"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CTA } from '../config/cta';
import styles from './Navbar.module.css';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use dark mode if it's NOT the homepage, OR if the user has scrolled down
  const isDark = pathname !== '/' || isScrolled;

  return (
    <nav className={`${styles.navbar} ${isDark ? styles.darkNavbar : ''}`}>
      <div className={styles.container}>
        {/* Left Links */}
        <div className={styles.linksLeft}>
          <div className={styles.linksPill}>
            <Link href="/academies" className={styles.link}>Academies</Link>
            <Link href="/product" className={styles.link}>Product</Link>
            <Link href="/co-founders" className={styles.link}>Co-Founders</Link>
            <Link href="/labs" className={styles.link}>Labs</Link>
          </div>
        </div>
        
        {/* Center Logo */}
        <div className={styles.logoCenter}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Image src="/logo-clutch-white.png" alt="Clutch Command" width={140} height={40} style={{ objectFit: 'contain' }} priority />
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
