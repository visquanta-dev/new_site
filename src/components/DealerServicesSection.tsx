'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const dealerTypes = [
  {
    id: 'independent',
    label: 'Independent Dealers',
    tagline: 'Enterprise power. Independent spirit.',
    description: 'You built your dealership from the ground up. AutoMaster Suite gives you the same AI firepower as the big groups—without the overhead or complexity.',
    link: '/dealers/independent',
    stat: '3x',
    statLabel: 'more leads converted',
    statValue: 75,
  },
  {
    id: 'pre-owned',
    label: 'Pre-Owned Dealers',
    tagline: 'Move metal faster.',
    description: 'In pre-owned, speed is everything. Our AI engages buyers instantly, qualifies their needs, and gets them on your lot before the competition knows they exist.',
    link: '/dealers/pre-owned',
    stat: '<60s',
    statLabel: 'response time',
    statValue: 85,
  },
  {
    id: 'franchise',
    label: 'Franchise Dealers',
    tagline: 'OEM-compliant. Performance-optimized.',
    description: 'Meet manufacturer response requirements effortlessly. AutoMaster integrates with certified systems and maintains brand standards across every touchpoint.',
    link: '/dealers/franchise',
    stat: '100%',
    statLabel: 'OEM compliance',
    statValue: 100,
  },
  {
    id: 'auto-groups',
    label: 'Auto Groups',
    tagline: 'One platform. Every rooftop.',
    description: 'Unified AI across all locations with centralized reporting and per-store customization. Scale your winning playbook instantly across your entire portfolio.',
    link: '/dealers/auto-groups',
    stat: '89%',
    statLabel: 'process consistency',
    statValue: 89,
  },
];

function PremiumGauge({ value, stat, label }: { value: number; stat: string; label: string }) {
  const circumference = 2 * Math.PI * 88;
  const strokeDashoffset = circumference - (value / 100) * circumference * 0.75;

  return (
    <div className="premium-gauge">
      {/* Ambient glow */}
      <div className="gauge-ambient-glow" />

      {/* Outer decorative ring */}
      <svg className="gauge-outer-ring" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.3)" />
            <stop offset="50%" stopColor="rgba(249,115,22,0.1)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0.3)" />
          </linearGradient>
        </defs>
        <circle
          cx="100" cy="100" r="96"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>

      {/* Main gauge */}
      <svg className="gauge-main" viewBox="0 0 200 200">
        <defs>
          {/* Premium gradient for the arc */}
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Inner shadow */}
          <radialGradient id="innerShadow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
          </radialGradient>
        </defs>

        {/* Background circle with inner shadow */}
        <circle cx="100" cy="100" r="88" fill="rgba(10,10,10,0.8)" />
        <circle cx="100" cy="100" r="88" fill="url(#innerShadow)" />

        {/* Track (background arc) */}
        <circle
          cx="100" cy="100" r="88"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          transform="rotate(135 100 100)"
        />

        {/* Tick marks */}
        {[...Array(9)].map((_, i) => {
          const angle = 135 + i * (270 / 8);
          const rad = (angle * Math.PI) / 180;
          const innerR = 72;
          const outerR = i % 2 === 0 ? 80 : 76;
          const x1 = 100 + innerR * Math.cos(rad);
          const y1 = 100 + innerR * Math.sin(rad);
          const x2 = 100 + outerR * Math.cos(rad);
          const y2 = 100 + outerR * Math.sin(rad);
          const isActive = (i / 8) * 100 <= value;

          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isActive ? '#f97316' : 'rgba(255,255,255,0.15)'}
              strokeWidth={i % 2 === 0 ? 2 : 1}
              strokeLinecap="round"
              style={{ transition: 'stroke 0.5s ease' }}
            />
          );
        })}

        {/* Progress arc */}
        <motion.circle
          cx="100" cy="100" r="88"
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          transform="rotate(135 100 100)"
          filter="url(#glow)"
        />

        {/* Needle indicator */}
        <motion.g
          initial={{ rotate: 135 }}
          animate={{ rotate: 135 + (value / 100) * 270 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: '100px 100px' }}
        >
          <circle cx="100" cy="100" r="8" fill="#1a1a1a" stroke="rgba(249,115,22,0.5)" strokeWidth="1" />
          <line
            x1="100" y1="100" x2="100" y2="30"
            stroke="url(#arcGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="100" cy="30" r="4" fill="#f97316" filter="url(#glow)" />
        </motion.g>

        {/* Center decorative rings */}
        <circle cx="100" cy="100" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <circle cx="100" cy="100" r="35" fill="rgba(15,15,15,0.9)" />
      </svg>

      {/* Center content */}
      <div className="gauge-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={stat}
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.4 }}
            className="gauge-center-content"
          >
            <span className="gauge-stat">{stat}</span>
            <span className="gauge-label">{label}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Reflection overlay */}
      <div className="gauge-reflection" />
    </div>
  );
}

export default function DealerServicesSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeDealer, setActiveDealer] = useState(dealerTypes[0].id);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const activeData = dealerTypes.find(d => d.id === activeDealer) || dealerTypes[0];

  return (
    <section className="wif-section" ref={containerRef}>
      {/* Premium layered background */}
      <div className="wif-bg-base" />
      <div className="wif-bg-gradient" />
      <div className="wif-bg-noise" />
      <div className="wif-bg-vignette" />

      {/* Animated ambient orbs */}
      <div className="wif-orb wif-orb-1" />
      <div className="wif-orb wif-orb-2" />

      {/* Subtle grid pattern */}
      <div className="wif-grid-pattern" />

      <div className="wif-container">
        {/* Left side - Navigation */}
        <motion.div
          className="wif-nav-side"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="wif-header">
            <motion.span
              className="wif-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="wif-eyebrow-line" />
              <span>Dealer Services</span>
              <span className="wif-eyebrow-line wif-eyebrow-line-right" />
            </motion.span>

            <motion.h2
              className="wif-title"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Built for how<br /><em>you</em> sell cars
            </motion.h2>

            <motion.p
              className="wif-intro"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Every dealership operates differently. AutoMaster Suite adapts to your unique workflow—not the other way around.
            </motion.p>
          </div>

          <motion.nav
            className="wif-nav"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {dealerTypes.map((dealer, index) => (
              <motion.button
                key={dealer.id}
                className={`wif-nav-item ${activeDealer === dealer.id ? 'active' : ''}`}
                onClick={() => setActiveDealer(dealer.id)}
                onMouseEnter={() => setIsHovering(dealer.id)}
                onMouseLeave={() => setIsHovering(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ x: 8 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="wif-nav-indicator">
                  <span className="wif-nav-indicator-fill" />
                </span>
                <span className="wif-nav-content">
                  <span className="wif-nav-label">{dealer.label}</span>
                  <span className="wif-nav-tagline">{dealer.tagline}</span>
                </span>
                <span className="wif-nav-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>
            ))}
          </motion.nav>
        </motion.div>

        {/* Right side - Premium display card */}
        <motion.div
          className="wif-content-side"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="wif-display-card">
            {/* Card chrome/bezel effect */}
            <div className="wif-card-bezel" />

            {/* Inner card */}
            <div className="wif-card-inner">
              {/* Top accent line */}
              <div className="wif-card-accent-line" />

              {/* Gauge */}
              <PremiumGauge
                value={activeData.statValue}
                stat={activeData.stat}
                label={activeData.statLabel}
              />

              {/* Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDealer}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="wif-card-content"
                >
                  <h3 className="wif-card-title">{activeData.label}</h3>
                  <p className="wif-card-description">{activeData.description}</p>

                  <Link href={activeData.link} className="wif-card-cta">
                    <span className="wif-cta-text">Explore Solutions</span>
                    <span className="wif-cta-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>

              {/* Bottom brand mark */}
              <div className="wif-card-brand">
                <span className="wif-brand-line" />
                <span className="wif-brand-text">AutoMaster Suite</span>
                <span className="wif-brand-line" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
