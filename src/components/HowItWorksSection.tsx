'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Connect",
    subtitle: "Seamless Integration",
    description: "We integrate with your existing DMS, CRM, and lead sources. No IT project required—our team handles the technical setup.",
    duration: "Day 1-2"
  },
  {
    number: "02",
    title: "Configure",
    subtitle: "Custom Training",
    description: "Your dedicated success manager customizes the AI for your dealership's voice, inventory, hours, and unique processes.",
    duration: "Day 3-4"
  },
  {
    number: "03",
    title: "Convert",
    subtitle: "Go Live",
    description: "AutoMaster Suite activates. Leads get instant responses, dormant contacts get re-engaged, service calls get answered.",
    duration: "Day 5-6"
  },
  {
    number: "04",
    title: "Scale",
    subtitle: "Continuous Growth",
    description: "Review performance in your unified dashboard. Your success manager continuously optimizes as you grow.",
    duration: "Day 7+"
  }
];

export default function HowItWorksSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="hiw-section" ref={containerRef}>
      {/* Ambient background effects */}
      <div className="hiw-ambient">
        <div className="hiw-ambient-orb hiw-ambient-orb-1"></div>
        <div className="hiw-ambient-orb hiw-ambient-orb-2"></div>
      </div>
      <div className="hiw-grid-pattern"></div>

      <div className="hiw-container">
        {/* Editorial header */}
        <motion.header
          className="hiw-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="hiw-header-inner">
            <div className="hiw-eyebrow">
              <span className="hiw-eyebrow-line"></span>
              <span className="hiw-eyebrow-text">Implementation</span>
              <span className="hiw-eyebrow-line"></span>
            </div>
            <h2 className="hiw-title">
              From Signup to
              <span className="hiw-title-accent"> ROI in Days</span>
            </h2>
            <p className="hiw-subtitle">
              No lengthy IT projects. No complex migrations. Our white-glove onboarding ensures you're generating results within one week.
            </p>
          </div>
        </motion.header>

        {/* Steps Container */}
        <div className="hiw-steps-wrapper">
          {/* Vertical progress line */}
          <motion.div
            className="hiw-progress-track"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="hiw-progress-fill"></div>
          </motion.div>

          <div className="hiw-steps">
            {steps.map((step, index) => (
              <motion.article
                key={step.number}
                className="hiw-step"
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + (index * 0.15),
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {/* Step marker on timeline */}
                <div className="hiw-step-marker">
                  <div className="hiw-marker-ring">
                    <div className="hiw-marker-dot"></div>
                  </div>
                  <span className="hiw-marker-duration">{step.duration}</span>
                </div>

                {/* Step content card */}
                <div className="hiw-step-card">
                  <div className="hiw-step-number-badge">
                    <span>{step.number}</span>
                  </div>

                  <div className="hiw-step-content">
                    <span className="hiw-step-subtitle">{step.subtitle}</span>
                    <h3 className="hiw-step-title">{step.title}</h3>
                    <p className="hiw-step-desc">{step.description}</p>
                  </div>

                  <div className="hiw-step-accent"></div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom timeline summary */}
        <motion.div
          className="hiw-summary"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <div className="hiw-summary-inner">
            <div className="hiw-summary-stat">
              <span className="hiw-stat-value">7</span>
              <span className="hiw-stat-label">Days to Launch</span>
            </div>
            <div className="hiw-summary-divider"></div>
            <div className="hiw-summary-stat">
              <span className="hiw-stat-value">0</span>
              <span className="hiw-stat-label">Code Required</span>
            </div>
            <div className="hiw-summary-divider"></div>
            <div className="hiw-summary-stat">
              <span className="hiw-stat-value">1</span>
              <span className="hiw-stat-label">Dedicated Manager</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
