'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface Integration {
  name: string;
  category: 'dms' | 'crm' | 'lead';
  logo: string;
}

const integrations: Integration[] = [
  // DMS Systems
  { name: "CDK Global", category: "dms", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683035c47ec0959e855dc829_CDK_Global%20white.avif" },
  { name: "Dealertrack", category: "dms", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/68303785972641d9b50fab37_dealertrack%20white.avif" },
  { name: "TITAN DMS", category: "dms", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/68303b117151572b502b806b_titan%20DMS%20(1)%20(1).webp" },
  { name: "Frazer", category: "dms", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/68303167b87c5f19ec16c69f_frazer-white%20(2).webp" },
  // CRM Systems
  { name: "VinSolutions", category: "crm", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683031f386647aef7335d0ba_vinsolutions%20white%20(1).png" },
  { name: "DealerSocket", category: "crm", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683035efe444102587fe1083_dealersocket%20white.avif" },
  { name: "eLead CRM", category: "crm", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683036fd7f6a3d1d58acd0d7_elead%20(1).png" },
  { name: "DriveCentric", category: "crm", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/6830b1419b23bac70ff2bfe5_DriveCentric_white.svg" },
  { name: "ProMax", category: "crm", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/6830355c84669a8b421d55d9_promax%20white%20(4).png" },
  { name: "Eskimo", category: "crm", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683032946b85d54663a4312a_Eskimo%20white%20(1).png" },
  // Lead Sources
  { name: "CarGurus", category: "lead", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/6830382f87e3c77508b78951_cargurus-logo-white%20(2).png" },
  { name: "AutoTrader", category: "lead", logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/6830382f87e3c77508b78951_cargurus-logo-white%20(2).png" },
];

// Split into rows for flowing animation
const row1 = integrations.slice(0, 6);
const row2 = integrations.slice(6, 12);

function LogoItem({ integration, index }: { integration: Integration; index: number }) {
  return (
    <motion.div
      className="int-logo-item"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div className="int-logo-glow" />
      <img
        src={integration.logo}
        alt={integration.name}
        loading="lazy"
        className="int-logo-img"
      />
      <span className="int-logo-tooltip">{integration.name}</span>
    </motion.div>
  );
}

export default function IntegrationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const row1X = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const row2X = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={sectionRef} className="int-section">
      {/* Background */}
      <div className="int-bg">
        <div className="int-bg-gradient" />
        <div className="int-bg-lines" />
        <div className="int-bg-orb int-bg-orb-1" />
        <div className="int-bg-orb int-bg-orb-2" />
      </div>

      <div className="int-container">
        {/* Header - Centered Premium */}
        <motion.header
          className="int-header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="int-eyebrow">
            <div className="int-eyebrow-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span>Seamless Integrations</span>
          </div>

          <h2 className="int-title">
            Connects to{' '}
            <span className="int-title-accent">Everything</span>
          </h2>

          <p className="int-subtitle">
            Your DMS. Your CRM. Your lead sources. AutoMaster Suite integrates with
            <strong> 50+ platforms</strong> out of the box—no IT project required.
          </p>
        </motion.header>

        {/* Stats Row */}
        <motion.div
          className="int-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="int-stat">
            <span className="int-stat-value">50+</span>
            <span className="int-stat-label">Integrations</span>
          </div>
          <div className="int-stat-divider" />
          <div className="int-stat">
            <span className="int-stat-value">5</span>
            <span className="int-stat-unit">days</span>
            <span className="int-stat-label">Average Setup</span>
          </div>
          <div className="int-stat-divider" />
          <div className="int-stat">
            <span className="int-stat-value">0</span>
            <span className="int-stat-label">Code Required</span>
          </div>
        </motion.div>

        {/* Flowing Logo Rows */}
        <div className="int-logos-wrapper">
          {/* Row 1 - Flows left on scroll */}
          <motion.div className="int-logos-row" style={{ x: row1X }}>
            <div className="int-logos-track">
              {[...row1, ...row1].map((integration, index) => (
                <LogoItem key={`r1-${index}`} integration={integration} index={index % row1.length} />
              ))}
            </div>
          </motion.div>

          {/* Center Hub Visual */}
          <motion.div
            className="int-hub"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="int-hub-ring int-hub-ring-outer" />
            <div className="int-hub-ring int-hub-ring-middle" />
            <div className="int-hub-ring int-hub-ring-inner" />
            <div className="int-hub-core">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="int-hub-label">AutoMaster</span>
          </motion.div>

          {/* Row 2 - Flows right on scroll */}
          <motion.div className="int-logos-row int-logos-row-reverse" style={{ x: row2X }}>
            <div className="int-logos-track">
              {[...row2, ...row2].map((integration, index) => (
                <LogoItem key={`r2-${index}`} integration={integration} index={index % row2.length} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Category Tags */}
        <motion.div
          className="int-categories"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="int-category">
            <span className="int-category-dot int-category-dot-dms" />
            <span>DMS Systems</span>
          </div>
          <div className="int-category">
            <span className="int-category-dot int-category-dot-crm" />
            <span>CRM Platforms</span>
          </div>
          <div className="int-category">
            <span className="int-category-dot int-category-dot-lead" />
            <span>Lead Sources</span>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="int-trust"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="int-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Enterprise Security</span>
          </div>
          <div className="int-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Real-time Sync</span>
          </div>
          <div className="int-trust-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>24/7 Support</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="int-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="int-cta-text">Don't see your platform?</p>
          <Link href="/contact" className="int-cta-btn">
            Request Integration
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>

      <style jsx global>{`
        .int-section {
          position: relative;
          padding: 140px 0;
          background: #050505;
          overflow: hidden;
        }

        .int-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .int-bg-gradient {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 200%;
          height: 100%;
          background: radial-gradient(ellipse at center top, rgba(249,115,22,0.04) 0%, transparent 50%);
        }

        .int-bg-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 120px 120px;
          mask: linear-gradient(180deg, transparent, white 20%, white 80%, transparent);
        }

        .int-bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
        }

        .int-bg-orb-1 {
          width: 400px;
          height: 400px;
          background: rgba(249,115,22,0.15);
          top: 20%;
          left: -10%;
        }

        .int-bg-orb-2 {
          width: 300px;
          height: 300px;
          background: rgba(249,115,22,0.1);
          bottom: 20%;
          right: -5%;
        }

        .int-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .int-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .int-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px 10px 14px;
          border-radius: 100px;
          background: linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%);
          border: 1px solid rgba(249,115,22,0.2);
          margin-bottom: 28px;
        }

        .int-eyebrow-icon {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(249,115,22,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f97316;
        }

        .int-eyebrow span {
          color: #fb923c;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .int-title {
          font-size: clamp(44px, 6vw, 72px);
          font-weight: 700;
          color: white;
          line-height: 1.05;
          letter-spacing: -0.035em;
          margin: 0 0 24px;
        }

        .int-title-accent {
          background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .int-subtitle {
          font-size: 18px;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          max-width: 600px;
          margin: 0 auto;
        }

        .int-subtitle strong {
          color: rgba(255,255,255,0.8);
          font-weight: 600;
        }

        /* Stats */
        .int-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          margin-bottom: 80px;
        }

        .int-stat {
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .int-stat-value {
          font-size: 56px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .int-stat-unit {
          font-size: 24px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
        }

        .int-stat-label {
          width: 100%;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 8px;
        }

        .int-stat-divider {
          width: 1px;
          height: 60px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.1), transparent);
        }

        /* Logo Rows */
        .int-logos-wrapper {
          position: relative;
          margin: 0 -40px;
          padding: 40px 0;
        }

        .int-logos-row {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .int-logos-row-reverse {
          margin-bottom: 0;
        }

        .int-logos-track {
          display: flex;
          gap: 24px;
        }

        .int-logo-item {
          position: relative;
          width: 140px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 24px;
          border-radius: 16px;
          background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
          cursor: default;
        }

        .int-logo-item:hover {
          background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
          border-color: rgba(249,115,22,0.3);
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(249,115,22,0.1);
        }

        .int-logo-glow {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at 50% 50%, rgba(249,115,22,0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .int-logo-item:hover .int-logo-glow {
          opacity: 1;
        }

        .int-logo-img {
          max-width: 100%;
          max-height: 36px;
          object-fit: contain;
          filter: brightness(0.7) grayscale(0.3);
          transition: all 0.4s ease;
        }

        .int-logo-item:hover .int-logo-img {
          filter: brightness(1) grayscale(0);
        }

        .int-logo-tooltip {
          position: absolute;
          bottom: -32px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(0,0,0,0.9);
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 12px;
          font-weight: 500;
          color: white;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .int-logo-item:hover .int-logo-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Center Hub */
        .int-hub {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 160px;
          height: 160px;
          z-index: 10;
        }

        .int-hub-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(249,115,22,0.2);
        }

        .int-hub-ring-outer {
          inset: 0;
          animation: pulse-ring 3s ease-in-out infinite;
        }

        .int-hub-ring-middle {
          inset: 20px;
          border-color: rgba(249,115,22,0.3);
          animation: pulse-ring 3s ease-in-out infinite 0.5s;
        }

        .int-hub-ring-inner {
          inset: 40px;
          border-color: rgba(249,115,22,0.4);
          animation: pulse-ring 3s ease-in-out infinite 1s;
        }

        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.7; }
        }

        .int-hub-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 72px;
          height: 72px;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.15) 100%);
          border: 1px solid rgba(249,115,22,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f97316;
          box-shadow: 0 0 60px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .int-hub-label {
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #fb923c;
          white-space: nowrap;
        }

        /* Categories */
        .int-categories {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-top: 64px;
          margin-bottom: 48px;
        }

        .int-category {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }

        .int-category-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .int-category-dot-dms { background: #3b82f6; }
        .int-category-dot-crm { background: #10b981; }
        .int-category-dot-lead { background: #f97316; }

        /* Trust */
        .int-trust {
          display: flex;
          justify-content: center;
          gap: 48px;
          padding: 32px 0;
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          margin-bottom: 64px;
        }

        .int-trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.4);
          font-size: 14px;
        }

        .int-trust-item svg {
          color: rgba(249,115,22,0.6);
        }

        /* CTA */
        .int-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
        }

        .int-cta-text {
          font-size: 17px;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        .int-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
          color: white;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(249,115,22,0.35), inset 0 1px 0 rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .int-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.2);
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .int-stats {
            gap: 32px;
          }

          .int-stat-value {
            font-size: 44px;
          }

          .int-hub {
            width: 120px;
            height: 120px;
          }

          .int-hub-core {
            width: 56px;
            height: 56px;
          }
        }

        @media (max-width: 768px) {
          .int-section {
            padding: 100px 0;
          }

          .int-container {
            padding: 0 24px;
          }

          .int-stats {
            flex-direction: column;
            gap: 24px;
          }

          .int-stat-divider {
            width: 60px;
            height: 1px;
          }

          .int-stat-value {
            font-size: 48px;
          }

          .int-logos-wrapper {
            margin: 0 -24px;
          }

          .int-logo-item {
            width: 100px;
            height: 56px;
            padding: 12px 16px;
          }

          .int-logo-img {
            max-height: 28px;
          }

          .int-hub {
            display: none;
          }

          .int-categories {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }

          .int-trust {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .int-cta {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
