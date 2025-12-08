'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface Integration {
  name: string;
  category: 'dms' | 'crm' | 'lead';
  logo: string;
}

const integrations: Integration[] = [
  // DMS Systems
  {
    name: "CDK Global",
    category: "dms",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683035c47ec0959e855dc829_CDK_Global%20white.avif"
  },
  {
    name: "Dealertrack",
    category: "dms",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/68303785972641d9b50fab37_dealertrack%20white.avif"
  },
  {
    name: "TITAN DMS",
    category: "dms",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/68303b117151572b502b806b_titan%20DMS%20(1)%20(1).webp"
  },
  {
    name: "Frazer",
    category: "dms",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/68303167b87c5f19ec16c69f_frazer-white%20(2).webp"
  },
  // CRM Systems
  {
    name: "VinSolutions",
    category: "crm",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683031f386647aef7335d0ba_vinsolutions%20white%20(1).png"
  },
  {
    name: "DealerSocket",
    category: "crm",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683035efe444102587fe1083_dealersocket%20white.avif"
  },
  {
    name: "eLead CRM",
    category: "crm",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683036fd7f6a3d1d58acd0d7_elead%20(1).png"
  },
  {
    name: "DriveCentric",
    category: "crm",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/6830b1419b23bac70ff2bfe5_DriveCentric_white.svg"
  },
  {
    name: "ProMax",
    category: "crm",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/6830355c84669a8b421d55d9_promax%20white%20(4).png"
  },
  {
    name: "Eskimo",
    category: "crm",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/683032946b85d54663a4312a_Eskimo%20white%20(1).png"
  },
  // Lead Sources
  {
    name: "CarGurus",
    category: "lead",
    logo: "https://cdn.prod.website-files.com/67f4e135760df55ea3128ae5/6830382f87e3c77508b78951_cargurus-logo-white%20(2).png"
  },
];

const categories = [
  { key: 'all', label: 'All', count: integrations.length },
  { key: 'dms', label: 'DMS', count: integrations.filter(i => i.category === 'dms').length },
  { key: 'crm', label: 'CRM', count: integrations.filter(i => i.category === 'crm').length },
  { key: 'lead', label: 'Lead Sources', count: integrations.filter(i => i.category === 'lead').length },
];

export default function IntegrationsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredIntegrations = activeFilter === 'all'
    ? integrations
    : integrations.filter(i => i.category === activeFilter);

  return (
    <section className="int-section">
      {/* Ambient background effects */}
      <div className="int-bg-glow"></div>
      <div className="int-bg-grid"></div>

      <div className="int-container">
        {/* Header with asymmetric layout */}
        <div className="int-header">
          <motion.div
            className="int-header-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="int-eyebrow">
              <span className="int-eyebrow-line"></span>
              <span className="int-eyebrow-text">Plug & Play</span>
            </div>
            <h2 className="int-title">
              Connects to<br />
              <span className="int-title-accent">Everything</span>
            </h2>
          </motion.div>

          <motion.div
            className="int-header-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="int-desc">
              Your DMS. Your CRM. Your lead sources. AutoMaster Suite
              integrates with <strong>50+ platforms</strong> out of the box—no
              IT project required.
            </p>
            <div className="int-stat-row">
              <div className="int-stat">
                <span className="int-stat-num">50+</span>
                <span className="int-stat-label">Integrations</span>
              </div>
              <div className="int-stat">
                <span className="int-stat-num">5 days</span>
                <span className="int-stat-label">Avg Setup</span>
              </div>
              <div className="int-stat">
                <span className="int-stat-num">0</span>
                <span className="int-stat-label">Code Required</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filter tabs */}
        <motion.div
          className="int-filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`int-filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              <span className="int-filter-label">{cat.label}</span>
              <span className="int-filter-count">{cat.count}</span>
            </button>
          ))}
        </motion.div>

        {/* Integration logos grid */}
        <motion.div
          className="int-logos-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="int-logos-grid">
            {filteredIntegrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                className="int-logo-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="int-logo-inner">
                  <span className="int-logo-badge">{integration.category.toUpperCase()}</span>
                  <div className="int-logo-image">
                    <img
                      src={integration.logo}
                      alt={`${integration.name} logo`}
                      loading="lazy"
                    />
                  </div>
                  <span className="int-logo-name">{integration.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="int-trust"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="int-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Enterprise-grade security</span>
          </div>
          <div className="int-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Real-time data sync</span>
          </div>
          <div className="int-trust-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>24/7 dedicated support</span>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="int-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="int-cta-content">
            <div className="int-cta-left">
              <span className="int-cta-label">Custom Integration?</span>
              <h4 className="int-cta-title">Don't see your platform?</h4>
              <p className="int-cta-text">We build custom integrations for enterprise clients.</p>
            </div>
            <a href="#" className="int-cta-btn">
              <span>Request Integration</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
