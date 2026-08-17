'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('stenvis-theme', next);
  }

  const close = () => setOpen(false);

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <Link href="/" className="logo">
        <div className="logo-icon">📊</div>
        Stenvis <span>BI</span>
      </Link>
      <ul className={open ? 'nav-links open' : 'nav-links'} id="navLinks">
        <li><Link href="/#about" onClick={close}>About</Link></li>
        <li><Link href="/#services" onClick={close}>Services</Link></li>
        <li><Link href="/#cases" onClick={close}>Results</Link></li>
        <li className="nav-dropdown">
          <Link href="/blog" onClick={close}>Content</Link>
          <ul className="nav-dropdown-menu">
            <li><Link href="/blog" onClick={close}>Blog</Link></li>
            <li><Link href="/videos" onClick={close}>Videos</Link></li>
            <li><Link href="/podcast" onClick={close}>Podcast</Link></li>
          </ul>
        </li>
        <li><Link href="/#team" onClick={close}>Team</Link></li>
        <li><Link href="/#faq" onClick={close}>FAQ</Link></li>
        <li><Link href="/#contact" className="nav-cta" onClick={close}>Get Started</Link></li>
      </ul>
      <div className="nav-right">
        <div className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          <span className="icon-sun">☀️</span>
          <span className="icon-moon">🌙</span>
        </div>
        <div className="hamburger" onClick={() => setOpen((o) => !o)}>
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
  );
}
