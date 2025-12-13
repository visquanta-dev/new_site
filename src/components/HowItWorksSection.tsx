'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: "01",
    title: "Onboard",
    description: "White-glove setup with your dedicated success manager",
    day: "Day 1-2"
  },
  {
    number: "02",
    title: "Connect",
    description: "Seamless DMS, CRM & lead source integration",
    day: "Day 3-5"
  },
  {
    number: "03",
    title: "Configure",
    description: "AI trained on your voice, inventory & processes",
    day: "Day 6-8"
  },
  {
    number: "04",
    title: "Convert",
    description: "Go live with instant lead response & engagement",
    day: "Day 9-11"
  },
  {
    number: "05",
    title: "Scale",
    description: "Continuous optimization as your results grow",
    day: "Day 12-14"
  }
];

// Minimal sports car silhouette SVG
function CarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Car body */}
      <path
        d="M10 20C10 20 12 12 20 12H45C50 12 55 14 58 16L70 18C74 18 76 20 76 22V24C76 25 75 26 74 26H68C68 23 65.5 20.5 62.5 20.5C59.5 20.5 57 23 57 26H23C23 23 20.5 20.5 17.5 20.5C14.5 20.5 12 23 12 26H6C5 26 4 25 4 24V22C4 20 6 20 10 20Z"
        fill="url(#carGradient)"
      />
      {/* Windows */}
      <path
        d="M22 14H35C36 14 37 15 37 16V18H20C20 16 21 14 22 14Z"
        fill="rgba(255,255,255,0.15)"
      />
      <path
        d="M39 14H48C51 14 54 15 56 17L54 18H39V14Z"
        fill="rgba(255,255,255,0.1)"
      />
      {/* Wheels */}
      <circle cx="17.5" cy="26" r="5" fill="#1a1a1a" stroke="rgba(255,116,4,0.5)" strokeWidth="1"/>
      <circle cx="17.5" cy="26" r="2" fill="rgba(255,116,4,0.3)"/>
      <circle cx="62.5" cy="26" r="5" fill="#1a1a1a" stroke="rgba(255,116,4,0.5)" strokeWidth="1"/>
      <circle cx="62.5" cy="26" r="2" fill="rgba(255,116,4,0.3)"/>
      {/* Headlight glow */}
      <ellipse cx="74" cy="20" rx="3" ry="2" fill="rgba(255,200,100,0.6)"/>
      <defs>
        <linearGradient id="carGradient" x1="4" y1="12" x2="76" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2a2a2a"/>
          <stop offset="0.5" stopColor="#3a3a3a"/>
          <stop offset="1" stopColor="#2a2a2a"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HowItWorksSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Car moves from left to right based on scroll
  const carX = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "85%"]);
  const carOpacity = useTransform(scrollYProgress, [0.15, 0.25, 0.75, 0.85], [0, 1, 1, 0]);

  return (
    <section className="journey-section" ref={containerRef}>
      {/* Cinematic background layers */}
      <div className="journey-bg">
        <div className="journey-bg-gradient" />
        <div className="journey-bg-noise" />
        <div className="journey-road-glow" />
      </div>

      <div className="journey-container">
        {/* Header */}
        <motion.div
          className="journey-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="journey-eyebrow">The Journey</span>
          <h2 className="journey-title">
            From Signup to <span className="journey-title-accent">ROI</span>
          </h2>
          <p className="journey-subtitle">14 days. Zero code. One dedicated success manager.</p>
        </motion.div>

        {/* The Road/Timeline */}
        <div className="journey-road">
          {/* Animated road line */}
          <motion.div
            className="journey-road-line"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Car traveling on the road */}
          <motion.div
            className="journey-car"
            style={{ left: carX, opacity: carOpacity }}
          >
            <div className="journey-car-glow" />
            <CarIcon className="journey-car-icon" />
            <div className="journey-car-trail" />
          </motion.div>

          {/* Milestone markers */}
          <div className="journey-milestones">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="journey-milestone"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + (index * 0.1),
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                {/* Marker post */}
                <div className="milestone-post">
                  <div className="milestone-beacon" />
                  <span className="milestone-number">{step.number}</span>
                </div>

                {/* Content card */}
                <div className="milestone-card">
                  <span className="milestone-day">{step.day}</span>
                  <h3 className="milestone-title">{step.title}</h3>
                  <p className="milestone-desc">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Destination flag */}
          <motion.div
            className="journey-destination"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="destination-flag">
              <span className="destination-label">ROI</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats integrated into design */}
        <motion.div
          className="journey-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="journey-stat">
            <span className="stat-value">14</span>
            <span className="stat-label">Days</span>
          </div>
          <div className="journey-stat-divider" />
          <div className="journey-stat">
            <span className="stat-value">0</span>
            <span className="stat-label">Code</span>
          </div>
          <div className="journey-stat-divider" />
          <div className="journey-stat">
            <span className="stat-value">1</span>
            <span className="stat-label">Manager</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
