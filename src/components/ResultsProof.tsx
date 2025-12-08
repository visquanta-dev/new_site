'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface Stat {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  dealership: string;
  rating: number;
}

const stats: Stat[] = [
  { value: "$27.4M", numericValue: 27.4, prefix: "$", suffix: "M", label: "Extra Revenue", sublabel: "Generated for partners" },
  { value: "6,000+", numericValue: 6000, suffix: "+", label: "Vehicles Sold", sublabel: "From reactivated leads" },
  { value: "76%", numericValue: 76, suffix: "%", label: "More Sales", sublabel: "From cold leads" },
  { value: "98%", numericValue: 98, suffix: "%", label: "Satisfaction", sublabel: "Dealer rated results" },
];

const testimonials: Testimonial[] = [
  {
    quote: "We recovered $47K in our first 60 days. The ROI was obvious within the first month.",
    name: "Operations Manager",
    title: "General Manager",
    dealership: "Seth Wadley Auto Group",
    rating: 5
  },
  {
    quote: "Being first to respond changed everything. We went from losing deals to winning them consistently.",
    name: "Sales Director",
    title: "Sales Director",
    dealership: "Metro Honda",
    rating: 5
  },
  {
    quote: "Every missed call used to cost us $340 in average RO value. Now we capture every single one.",
    name: "Service Manager",
    title: "Service Manager",
    dealership: "Thompson Chevrolet",
    rating: 5
  }
];

function AnimatedCounter({ value, prefix = "", suffix = "", isInView }: { value: number; prefix?: string; suffix?: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  const displayValue = value >= 1000 ? count.toFixed(0) : count.toFixed(1);

  return (
    <span>
      {prefix}
      {value >= 1000 ? Math.floor(count).toLocaleString() : count.toFixed(1)}
      {suffix}
    </span>
  );
}

export default function ResultsProof() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="rp-section" ref={containerRef}>
      {/* Background */}
      <div className="rp-bg-gradient"></div>

      <div className="rp-container">
        {/* Header */}
        <motion.header
          className="rp-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="rp-eyebrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Proven Results</span>
          </div>
          <h2 className="rp-title">
            Results That Speak <span className="rp-title-accent">for Themselves</span>
          </h2>
          <p className="rp-subtitle">
            Don't take our word for it — see what dealers are achieving.
          </p>
        </motion.header>

        {/* Bento Grid */}
        <div className="rp-bento">
          {/* Stats Row */}
          <div className="rp-stats-row">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rp-stat-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <span className="rp-stat-value">
                  <AnimatedCounter
                    value={stat.numericValue}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </span>
                <span className="rp-stat-label">{stat.label}</span>
                <span className="rp-stat-sublabel">{stat.sublabel}</span>
              </motion.div>
            ))}
          </div>

          {/* Testimonials Row */}
          <div className="rp-testimonials-row">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="rp-testimonial-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <div className="rp-testimonial-stars">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="rp-testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="rp-testimonial-author">
                  <span className="rp-author-name">{testimonial.name}</span>
                  <span className="rp-author-dealership">{testimonial.dealership}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="rp-cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p className="rp-cta-text">Ready to become our next success story?</p>
          <a href="/book-demo" className="rp-cta-btn">
            <span>Get Your Free Assessment</span>
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
