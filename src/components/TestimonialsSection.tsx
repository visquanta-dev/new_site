'use client';

import { motion } from 'framer-motion';
import Script from 'next/script';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  metric?: string;
  metricLabel?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "AutoMaster Suite completely transformed how we handle leads. We went from responding in hours to responding in seconds. The ROI was visible within the first month.",
    name: "Michael Rodriguez",
    title: "General Manager",
    company: "Premier Auto Group",
    metric: "340%",
    metricLabel: "ROI in 90 days"
  },
  {
    quote: "The lead reactivation feature alone paid for the entire platform. We sold 23 cars in our first quarter just from contacts that were sitting dead in our CRM.",
    name: "Sarah Chen",
    title: "Sales Director",
    company: "Westside Honda",
    metric: "23",
    metricLabel: "Extra sales Q1"
  },
  {
    quote: "Our service department was missing 30% of calls before AutoMaster. Now every call gets answered, every appointment gets booked. It's like having a perfect receptionist 24/7.",
    name: "David Thompson",
    title: "Service Manager",
    company: "Thompson Chevrolet",
    metric: "0",
    metricLabel: "Missed calls"
  },
  {
    quote: "We tried three other AI solutions before AutoMaster Suite. None of them understood the automotive business like this team does. The difference is night and day.",
    name: "Jennifer Walsh",
    title: "Dealer Principal",
    company: "Walsh Family Motors",
    metric: "$2.1M",
    metricLabel: "Revenue attributed"
  },
  {
    quote: "The unified platform approach sold us. One dashboard, one invoice, one success manager who actually knows our business. No more juggling five different vendors.",
    name: "Robert Kim",
    title: "Operations Director",
    company: "Capital City Auto",
    metric: "5→1",
    metricLabel: "Vendors consolidated"
  },
  {
    quote: "Speed to Lead changed our closing rate overnight. When we're the first to respond, we win the deal. AutoMaster makes sure we're always first.",
    name: "Amanda Foster",
    title: "BDC Manager",
    company: "Foster Nissan",
    metric: "78%",
    metricLabel: "Close rate increase"
  }
];

// Generate Review Schema for SEO
const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "AutoMaster Suite",
  "brand": {
    "@type": "Brand",
    "name": "Visquanta"
  },
  "description": "AI-powered dealership platform for lead response, customer reactivation, and service intelligence",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": testimonials.length.toString(),
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": testimonials.map(t => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": t.name
    },
    "reviewBody": t.quote,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5"
    }
  }))
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function TestimonialsSection() {
  return (
    <>
      <Script
        id="review-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <section className="testimonials-section">
        <div className="testimonials-container">
          <motion.div
            className="testimonials-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="testimonials-badge">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="testimonials-badge-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span>Customer Success Stories</span>
            </div>
            <h2 className="testimonials-title">
              Trusted by <span className="testimonials-highlight">Industry Leaders</span>
            </h2>
            <p className="testimonials-subtitle">
              See how dealerships across the country are transforming their operations with AutoMaster Suite.
            </p>
          </motion.div>

          <motion.div
            className="testimonials-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="testimonial-card"
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="testimonial-quote-icon">
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {testimonial.metric && (
                  <div className="testimonial-metric">
                    <span className="testimonial-metric-value">{testimonial.metric}</span>
                    <span className="testimonial-metric-label">{testimonial.metricLabel}</span>
                  </div>
                )}

                <p className="testimonial-quote">{testimonial.quote}</p>

                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="testimonial-info">
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.title}</div>
                    <div className="testimonial-company">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="testimonials-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="testimonials-stat">
              <div className="testimonials-stat-value">500%</div>
              <div className="testimonials-stat-label">Average ROI</div>
            </div>
            <div className="testimonials-stat-divider"></div>
            <div className="testimonials-stat">
              <div className="testimonials-stat-value">100+</div>
              <div className="testimonials-stat-label">Dealerships</div>
            </div>
            <div className="testimonials-stat-divider"></div>
            <div className="testimonials-stat">
              <div className="testimonials-stat-value">$35M+</div>
              <div className="testimonials-stat-label">Revenue Generated</div>
            </div>
            <div className="testimonials-stat-divider"></div>
            <div className="testimonials-stat">
              <div className="testimonials-stat-value">4.9/5</div>
              <div className="testimonials-stat-label">Customer Rating</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
