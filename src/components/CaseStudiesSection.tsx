'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CaseStudy {
  dealership: string;
  location: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  quote?: string;
  quoteName?: string;
  quoteTitle?: string;
}

const caseStudies: CaseStudy[] = [
  {
    dealership: "Seth Wadley Auto Group",
    location: "Oklahoma",
    challenge: "Thousands of cold leads sitting untouched in CRM for months, representing millions in potential revenue.",
    solution: "Deployed Lead Reactivation AI to systematically re-engage dormant prospects with personalized SMS campaigns.",
    results: [
      { metric: "17", label: "Extra cars sold (Nov)" },
      { metric: "$425K", label: "Revenue recovered" },
      { metric: "2,400", label: "Leads reactivated" }
    ],
    quote: "We had no idea how much money was just sitting there. AutoMaster turned our dead database into our best lead source.",
    quoteName: "Operations Manager",
    quoteTitle: "Seth Wadley Auto Group"
  },
  {
    dealership: "Metro Honda Dealership",
    location: "Florida",
    challenge: "BDC team couldn't respond to leads fast enough. Average response time was 4+ hours, losing deals to faster competitors.",
    solution: "Implemented Speed to Lead for instant AI-powered engagement on all inbound leads, 24/7.",
    results: [
      { metric: "<60s", label: "Response time" },
      { metric: "34%", label: "Close rate increase" },
      { metric: "$890K", label: "Additional revenue" }
    ],
    quote: "Being first to respond changed everything. We went from losing deals to winning them consistently.",
    quoteName: "Sales Director",
    quoteTitle: "Metro Honda"
  },
  {
    dealership: "Thompson Chevrolet",
    location: "Texas",
    challenge: "Service department missing 30% of inbound calls, losing repair orders and frustrating customers.",
    solution: "Deployed Service Intelligence voice AI to answer every call, schedule appointments, and route complex issues.",
    results: [
      { metric: "0", label: "Missed calls" },
      { metric: "156", label: "Extra ROs monthly" },
      { metric: "$53K", label: "Monthly service revenue" }
    ],
    quote: "Every missed call used to cost us $340 in average RO value. Now we capture every single one.",
    quoteName: "Service Manager",
    quoteTitle: "Thompson Chevrolet"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function CaseStudiesSection() {
  return (
    <section className="case-studies-section">
      <div className="case-studies-container">
        <motion.div
          className="case-studies-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="case-studies-badge">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="case-studies-badge-icon">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Proven Results</span>
          </div>
          <h2 className="case-studies-title">
            Real Dealerships. <span className="case-studies-highlight">Real Results.</span>
          </h2>
          <p className="case-studies-subtitle">
            See how automotive retailers are using AutoMaster Suite to capture more leads, close more deals, and maximize service revenue.
          </p>
        </motion.div>

        <motion.div
          className="case-studies-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              className="case-study-card"
              variants={cardVariants}
            >
              <div className="case-study-header">
                <div className="case-study-dealership">
                  <h3 className="case-study-name">{study.dealership}</h3>
                  <span className="case-study-location">{study.location}</span>
                </div>
                <div className="case-study-number">{String(index + 1).padStart(2, '0')}</div>
              </div>

              <div className="case-study-content">
                <div className="case-study-section">
                  <div className="case-study-label">The Challenge</div>
                  <p className="case-study-text">{study.challenge}</p>
                </div>

                <div className="case-study-section">
                  <div className="case-study-label">The Solution</div>
                  <p className="case-study-text">{study.solution}</p>
                </div>

                <div className="case-study-results">
                  <div className="case-study-label">The Results</div>
                  <div className="case-study-metrics">
                    {study.results.map((result, rIndex) => (
                      <div key={rIndex} className="case-study-metric">
                        <span className="case-study-metric-value">{result.metric}</span>
                        <span className="case-study-metric-label">{result.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {study.quote && (
                <div className="case-study-quote">
                  <p>"{study.quote}"</p>
                  <div className="case-study-quote-author">
                    <span className="case-study-quote-name">{study.quoteName}</span>
                    <span className="case-study-quote-title">{study.quoteTitle}</span>
                  </div>
                </div>
              )}

              <Link href="#" className="case-study-link">
                <span>Read Full Case Study</span>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="case-studies-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="case-studies-cta-text">Ready to become our next success story?</p>
          <Link href="#" className="btn-primary">
            <span>Get Your Free Assessment</span>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
