'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Animation variants, fully typed and Vercel safe
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
      // no ease string here, uses Framer Motion default
    }
  }
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function AutoMasterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section ref={sectionRef} className="automaster-section">
      {/* Background Effects */}
      <div className="am-bg-gradient"></div>
      <div className="am-bg-grid"></div>

      <div className="am-container">
        {/* INTEGRATIONS */}
        <motion.div
          className="am-integrations"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
        >
          <div className="am-integrations-label">Integrates With Your Stack</div>
          <div className="am-logos">
            <span className="am-logo">Ford</span>
            <span className="am-logo">Toyota</span>
            <span className="am-logo">Kia</span>
            <span className="am-logo">Nissan</span>
            <span className="am-logo">VinSolutions</span>
            <span className="am-logo">CDK</span>
          </div>
        </motion.div>

        {/* PROBLEM SECTION */}
        <motion.div
          className="am-problem-section-v2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
        >
          <div className="am-problem-header">
            <motion.div
              className="am-problem-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="am-badge-pulse"></span>
              <span className="am-badge-text">The Problem</span>
            </motion.div>

            <h3 className="am-problem-headline">
              What&apos;s <span className="am-text-gradient">Costing</span> Your
              <br />
              Dealership Sales?
            </h3>

            <p className="am-problem-subtext">
              Every day, dealerships lose thousands in potential revenue to these silent killers.
            </p>
          </div>

          <motion.div
            className="am-problem-grid-v2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            <motion.div className="am-problem-card-v2" variants={cardVariant} whileHover={{ y: -8 }}>
              <div className="am-card-glow"></div>
              <div className="am-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="am-card-number">01</div>
              <h4 className="am-card-title">Slow Inbound Response</h4>
              <p className="am-card-text">
                You&apos;re paying for leads. Your team takes hours to respond. Competitors get there first.
              </p>
              <div className="am-card-stat">
                <span className="am-stat-number">78%</span>
                <span className="am-stat-label">of leads buy from first responder</span>
              </div>
            </motion.div>

            <motion.div className="am-problem-card-v2" variants={cardVariant} whileHover={{ y: -8 }}>
              <div className="am-card-glow"></div>
              <div className="am-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <div className="am-card-number">02</div>
              <h4 className="am-card-title">Cold Leads Sitting</h4>
              <p className="am-card-text">
                Thousands of old leads sitting untouched. Those people are buying cars elsewhere.
              </p>
              <div className="am-card-stat">
                <span className="am-stat-number">$2.4M</span>
                <span className="am-stat-label">avg. revenue left in dead CRM</span>
              </div>
            </motion.div>

            <motion.div className="am-problem-card-v2" variants={cardVariant} whileHover={{ y: -8 }}>
              <div className="am-card-glow"></div>
              <div className="am-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="am-card-number">03</div>
              <h4 className="am-card-title">Unreliable BDC</h4>
              <p className="am-card-text">
                High payroll. High turnover. Constant training. Leads still slip through cracks.
              </p>
              <div className="am-card-stat">
                <span className="am-stat-number">67%</span>
                <span className="am-stat-label">annual BDC turnover rate</span>
              </div>
            </motion.div>

            <motion.div className="am-problem-card-v2" variants={cardVariant} whileHover={{ y: -8 }}>
              <div className="am-card-glow"></div>
              <div className="am-card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16.5 3.5l-3 3m0-3l3 3"
                  />
                </svg>
              </div>
              <div className="am-card-number">04</div>
              <h4 className="am-card-title">Missed Service Calls</h4>
              <p className="am-card-text">
                Phone rings. Voicemail picks up. Every missed call is a missed RO.
              </p>
              <div className="am-card-stat">
                <span className="am-stat-number">$340</span>
                <span className="am-stat-label">avg. revenue per missed call</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* WHO WE ARE SECTION */}
        <motion.div
          className="who-we-are-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
        >
          <div className="wwa-grid">
            <motion.div
              className="wwa-content"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="wwa-eyebrow">
                <span className="wwa-eyebrow-line"></span>
                <span>Who We Are</span>
              </div>

              <h3 className="wwa-headline">
                Built by <span className="wwa-highlight">car people</span>,
                <br />
                for car people.
              </h3>

              <div className="wwa-story">
                <p className="wwa-lead">
                  Visquanta was founded by automotive veterans who spent years watching dealerships
                  struggle with the same problems: missed leads, disconnected tools, and vendors
                  who don&apos;t understand the business.
                </p>
                <p>
                  We&apos;ve sat in your shoes. We know what it&apos;s like to lose a deal because a
                  lead sat in a queue for four hours. We know the frustration of paying five
                  different vendors for tools that don&apos;t talk to each other.
                </p>
                <p>
                  That&apos;s why we built AutoMaster Suite, a single platform designed
                  specifically for automotive retail, by people who&apos;ve worked the desk,
                  managed the BDC, and felt the pressure of month end.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="wwa-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="wwa-video-card" onClick={() => setIsVideoOpen(true)}>
                <div className="wwa-video-badge">
                  <span className="wwa-video-dot"></span>
                  Meet the Team
                </div>
                <div className="wwa-video-thumbnail">
                  <img
                    src="https://img.youtube.com/vi/FOlaUITzCkc/maxresdefault.jpg"
                    alt="Video thumbnail"
                  />
                  <div className="wwa-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div className="wwa-video-overlay"></div>
                </div>
              </div>

              <div className="wwa-stats-row">
                <div className="wwa-stat">
                  <span className="wwa-stat-num">50+</span>
                  <span className="wwa-stat-label">
                    Years Combined
                    <br />
                    Auto Experience
                  </span>
                </div>
                <div className="wwa-stat">
                  <span className="wwa-stat-num">100+</span>
                  <span className="wwa-stat-label">
                    Dealerships
                    <br />
                    Served
                  </span>
                </div>
                <div className="wwa-stat">
                  <span className="wwa-stat-num">$35M+</span>
                  <span className="wwa-stat-label">
                    Revenue
                    <br />
                    Generated
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Value cards row */}
          <motion.div
            className="wwa-values-row"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="wwa-value-card">
              <div className="wwa-value-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4>Automotive First</h4>
              <p>Every feature built specifically for dealership workflows</p>
            </div>
            <div className="wwa-value-card">
              <div className="wwa-value-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h4>Dedicated Success</h4>
              <p>Your own manager who knows the automotive industry</p>
            </div>
            <div className="wwa-value-card">
              <div className="wwa-value-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4>Results Obsessed</h4>
              <p>We only win when you sell more cars and service more ROs</p>
            </div>
            <div className="wwa-value-card">
              <div className="wwa-value-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4>Always Available</h4>
              <p>24/7 platform uptime with round the clock support</p>
            </div>
          </motion.div>
        </motion.div>

        {/* PRODUCTS SECTION */}
        <motion.div
          className="am-products-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
        >
          <h3 className="am-section-title am-center">What Does AutoMaster Suite Include?</h3>

          <div className="am-product-feature">
            <div className="am-product-content">
              <div className="am-product-number">01</div>
              <h4 className="am-product-title">Speed to Lead</h4>
              <div className="am-aeo-capsule small">
                <span className="am-aeo-tag">AEO</span>
                Leads contacted in &lt; 60s are 21x more likely to convert.
              </div>
              <p className="am-product-text">Responds in under 60 seconds. 24/7/365.</p>
            </div>
            <div className="am-product-visual">
              <div className="am-product-mockup">
                <div className="am-mockup-header">
                  <span className="am-mockup-dot"></span>
                  <span className="am-mockup-dot"></span>
                  <span className="am-mockup-dot"></span>
                </div>
                <div className="am-mockup-content">
                  <div className="am-alert-preview">
                    <span className="am-alert-icon">⚡</span>
                    <span>New Lead: John D., 2024 Silverado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="am-product-feature am-reverse">
            <div className="am-product-content">
              <div className="am-product-number">02</div>
              <h4 className="am-product-title">Lead Reactivation</h4>
              <div className="am-aeo-capsule small">
                <span className="am-aeo-tag">AEO</span>
                AI SMS re engages cold leads to book appointments.
              </div>
              <p className="am-product-text">Seth Wadley Auto Group sold 17 extra cars in November.</p>
            </div>
            <div className="am-product-visual">
              <div className="am-product-mockup">
                <div className="am-mockup-header">
                  <span className="am-mockup-dot"></span>
                  <span className="am-mockup-dot"></span>
                  <span className="am-mockup-dot"></span>
                </div>
                <div className="am-mockup-content">
                  <div className="am-sms-preview">
                    <div className="am-sms-bubble">
                      Still looking for that Camry? We have new incentives this month.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="am-comparison">
            <h4 className="am-comparison-title">Why One System Beats Ten</h4>
            <div className="am-comparison-grid">
              <div className="am-comparison-old">
                <h5>OLD WAY</h5>
                <ul>
                  <li>Separate Lead Tool</li>
                  <li>Outsourced BDC</li>
                  <li>Separate Chat Widget</li>
                  <li>After hours service</li>
                </ul>
              </div>
              <div className="am-comparison-vs">VS</div>
              <div className="am-comparison-new">
                <h5>AUTOMASTER SUITE</h5>
                <ul>
                  <li>Speed to Lead</li>
                  <li>Lead Reactivation</li>
                  <li>Website Chat</li>
                  <li>Service Drive Pro</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BLOG SECTION */}
        <motion.div
          className="am-blog-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
        >
          <div className="am-section-header">
            <div className="am-section-eyebrow">
              <div className="am-eyebrow-line"></div>
              <span>The Visquanta Insight</span>
              <div className="am-eyebrow-line"></div>
            </div>
            <h3 className="am-section-title">Latest From Our Blog</h3>
          </div>

          <motion.div
            className="am-blog-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            <motion.article
              className="am-blog-card"
              variants={cardVariant}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              <div className="am-blog-image"></div>
              <div className="am-blog-content">
                <span className="am-blog-tag">Digital Drive</span>
                <h4 className="am-blog-title">Ultimate Guide to CRM Database Reactivation</h4>
                <div className="am-blog-meta">
                  <span>Dec 2024</span>
                  <Link href="#" className="am-blog-link">
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
            <motion.article
              className="am-blog-card"
              variants={cardVariant}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              <div className="am-blog-image"></div>
              <div className="am-blog-content">
                <span className="am-blog-tag">Industry</span>
                <h4 className="am-blog-title">Top 7 Third Party Lead Providers</h4>
                <div className="am-blog-meta">
                  <span>Dec 2024</span>
                  <Link href="#" className="am-blog-link">
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
            <motion.article
              className="am-blog-card"
              variants={cardVariant}
              whileHover={{ scale: 1.02, y: -8 }}
            >
              <div className="am-blog-image"></div>
              <div className="am-blog-content">
                <span className="am-blog-tag">Digital Drive</span>
                <h4 className="am-blog-title">How AI Revives Cold CRM Data</h4>
                <div className="am-blog-meta">
                  <span>Nov 2024</span>
                  <Link href="#" className="am-blog-link">
                    Read More →
                  </Link>
                </div>
              </div>
            </motion.article>
          </motion.div>

          <div className="am-center">
            <Link href="#" className="btn-secondary">
              <span>View All Posts</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* FINAL CTA */}
        <motion.div
          className="am-final-cta"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInScale}
        >
          <h3 className="am-cta-headline">
            One System. Five Tools.
            <br />
            Zero Leads Left Behind.
          </h3>
          <div className="am-cta-actions">
            <Link href="#" className="btn-primary">
              <span>Book a Discovery Call</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <div className="am-phone">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="am-phone-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+1 786 686 6554</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            className="video-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className="video-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="video-modal-close"
                onClick={() => setIsVideoOpen(false)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="video-modal-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/FOlaUITzCkc?autoplay=1"
                  title="Meet the Visquanta Team"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
