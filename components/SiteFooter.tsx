import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">📊</div>
              Stenvis <span>BI</span>
            </div>
            <p>
              Stenvis Business Intelligence provides insightful consulting to empower your business decisions.
              Tailored data-driven solutions, built for African realities.
            </p>
            <div className="social-links">
              <a className="social-link" href="https://www.facebook.com/share/1bXXM85Xcm/" aria-label="Facebook">f</a>
              <a className="social-link" href="#" aria-label="X">𝕏</a>
              <a className="social-link" href="#" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div className="footer-col">
            <h5>Navigation</h5>
            <ul>
              <li><Link href="/#hero">Home</Link></li>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/#cases">Case Studies</Link></li>
              <li><Link href="/#team">Team</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Content</h5>
            <ul>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/videos">Videos</Link></li>
              <li><Link href="/podcast">Podcast</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link href="/#services">BI Consulting</Link></li>
              <li><Link href="/#services">Predictive Analytics</Link></li>
              <li><Link href="/#services">Market Research</Link></li>
              <li><Link href="/#services">Custom Data Solutions</Link></li>
              <li><Link href="/#services">Training Workshops</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Stenvis Business Intelligence. All rights reserved.</div>
          <div>Built with purpose · Lagos, Nigeria 🇳🇬</div>
        </div>
      </div>
    </footer>
  );
}
