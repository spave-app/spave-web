"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import styles from "./styles/Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={styles.inner}>
          <a href="/" className={styles.logo}>
            <Image src="/spave-logo.svg" alt="Spave" width={60} height={36} />
          </a>

          <span className={styles.wordmark}>SPAVE</span>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
            <a href="/contact" className={styles.navLink}>Contact Us</a>
            <a href="/browse" className={styles.navCta}>Try Prototype</a>
          </nav>

          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className={styles.menuIcon}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </span>
          </button>
        </div>
      </header>
    </>
  );
}
