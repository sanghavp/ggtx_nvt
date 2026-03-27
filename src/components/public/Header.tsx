'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/tin-tuc', label: 'Tin tức' },
  { href: '/gioi-thieu', label: 'Giới thiệu' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className={styles.header} id="site-header">
      <div className={styles.container}>
        {/* Mobile menu button */}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="menu-toggle"
        >
          <span className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`} />
        </button>

        {/* Left nav (desktop) */}
        <nav className={styles.navLeft}>
          {navLinks.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo center */}
        <Link href="/" className={styles.logo} id="site-logo">
          <Image
            src="/images/logo.png"
            alt="Trung tâm GDNN-GDTX Nguyễn Văn Tố"
            width={56}
            height={56}
            priority
          />
          <div className={styles.logoText}>
            <span className={styles.logoName}>NGUYỄN VĂN TỐ</span>
            <span className={styles.logoSubtitle}>GDNN - GDTX</span>
          </div>
        </Link>

        {/* Right nav (desktop) */}
        <nav className={styles.navRight}>
          {navLinks.slice(2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive(link.href) ? styles.navLinkActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile nav overlay */}
        <nav className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.mobileNavLinkActive : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

