'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="site-footer">
      <div className={`footer-content ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="footer-brand">
          <div className="footer-logo">
            <div className="footer-logo-mark">
              <span>V</span>
            </div>
            <span className="footer-logo-text">Visquanta</span>
          </div>
          <p className="footer-tagline">
            The unfair advantage elite dealerships use.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h4 className="footer-column-title">Platform</h4>
            <ul className="footer-link-list">
              <li><Link href="#">Speed to Lead</Link></li>
              <li><Link href="#">Lead Reactivation</Link></li>
              <li><Link href="#">Intelligent Chat</Link></li>
              <li><Link href="#">Reputation Command</Link></li>
              <li><Link href="#">Service Intelligence</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-link-list">
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Contact</Link></li>
              <li><Link href="#">Blog</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-title">Resources</h4>
            <ul className="footer-link-list">
              <li><Link href="#">Case Studies</Link></li>
              <li><Link href="#">Documentation</Link></li>
              <li><Link href="#">ROI Calculator</Link></li>
              <li><Link href="#">Support</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`footer-bottom ${isVisible ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
        <p className="footer-copyright">&copy; 2025 Visquanta LLC. All rights reserved.</p>
        <div className="footer-legal-links">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
