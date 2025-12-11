'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'AutoMaster Suite',
    children: [
      { label: 'Lead Loss Mitigation', href: '/lead-loss-mitigation', description: 'Recover lost opportunities' },
      { label: 'Speed to Lead', href: '/speed-to-lead', description: 'Instant lead response' },
      { label: 'Reputation Management', href: '/reputation-management', description: 'Build trust at scale' },
      { label: 'Dealer Success Solutions', href: '/dealer-success-solutions', description: 'Full-service support' },
      { label: 'Service Drive Pro', href: '/service-drive', description: 'Maximize RO revenue' },
      { label: 'IWAV Events', href: '/iwav', description: 'In-store engagement' },
    ]
  },
  {
    label: 'Dealer Services',
    children: [
      { label: 'Independent Dealerships', href: '/independent-dealers', description: 'Solutions for independents' },
      { label: 'Franchise Dealerships', href: '/franchise-dealers', description: 'Enterprise-grade tools' },
      { label: 'Pre-Owned Dealers', href: '/pre-owned-dealers', description: 'Used car specialists' },
      { label: 'Auto Groups', href: '/auto-group', description: 'Multi-rooftop management' },
    ]
  },
  {
    label: 'Company',
    children: [
      { label: 'About VisQuanta', href: '/about-visquanta', description: 'Our mission & story' },
      { label: 'Our Team', href: '/visquanta-team', description: 'Meet the experts' },
      { label: 'Careers', href: '/careers', description: 'Join our team' },
      { label: 'Contact Us', href: '/contact', description: 'Get in touch' },
    ]
  },
  {
    label: 'Resources',
    children: [
      { label: "FAQ's", href: '/faq', description: 'Common questions' },
      { label: 'Blog', href: '/blog', description: 'Industry insights' },
      { label: 'Case Studies', href: '/case-studies', description: 'Success stories' },
      { label: 'Partnerships', href: '/partnerships', description: 'Partner with us' },
      { label: 'AMS Info Sheets', href: '/ams-guides', description: 'Product guides' },
    ]
  },
];

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
        setMobileActiveMenu(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`vq-nav ${isScrolled ? 'vq-nav-scrolled' : ''}`}>
      <div className="vq-nav-container">
        {/* Logo */}
        <Link href="/" className="vq-nav-logo">
          <img
            src="https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/68067c86a4cc3f920b6fa90b_visquanta_logo_trimmed%20(1).avif"
            alt="VisQuanta"
            className="vq-logo-img"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="vq-nav-menu">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="vq-nav-item"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="vq-nav-link">
                <span>{item.label}</span>
                <svg className="vq-nav-chevron" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <AnimatePresence>
                {activeDropdown === item.label && item.children && (
                  <motion.div
                    className="vq-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <div className="vq-dropdown-inner">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="vq-dropdown-item"
                        >
                          <span className="vq-dropdown-label">{child.label}</span>
                          {child.description && (
                            <span className="vq-dropdown-desc">{child.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="vq-nav-actions">
          <Link
            href="https://dashboard.visquanta.com/"
            target="_blank"
            className="vq-nav-login"
          >
            Login
          </Link>
          <Link href="/book-demo" className="vq-nav-cta">
            <span>Book a Demo</span>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`vq-mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="vq-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <nav className="vq-mobile-nav">
              {navItems.map((item) => (
                <div key={item.label} className="vq-mobile-item">
                  <button
                    className={`vq-mobile-link ${mobileActiveMenu === item.label ? 'active' : ''}`}
                    onClick={() => setMobileActiveMenu(mobileActiveMenu === item.label ? null : item.label)}
                  >
                    <span>{item.label}</span>
                    <svg className="vq-mobile-chevron" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {mobileActiveMenu === item.label && item.children && (
                      <motion.div
                        className="vq-mobile-dropdown"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="vq-mobile-dropdown-item"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="vq-mobile-actions">
              <Link
                href="https://dashboard.visquanta.com/"
                target="_blank"
                className="vq-mobile-login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login to Dashboard
              </Link>
              <Link
                href="/book-demo"
                className="vq-mobile-cta"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
