'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How fast can dealership AI respond to leads?",
    answer: "AutoMaster Suite responds to inbound leads in under 60 seconds, 24/7. This instant response dramatically increases your chances of converting leads, since 78% of buyers choose the first dealership to respond. Our AI engages via SMS with natural, human-like conversations that qualify prospects and book appointments automatically."
  },
  {
    question: "Does AutoMaster Suite integrate with VinSolutions, CDK, and DealerSocket?",
    answer: "Yes. We integrate with all major dealership CRMs and DMS platforms including VinSolutions, CDK, DealerSocket, Elead, ProMax, DriveCentric, Dealertrack, and 40+ others. Our team handles the entire setup for you — no IT resources required from your team. Integrations are read/write, meaning data syncs automatically both ways."
  },
  {
    question: "How do car dealerships reactivate old CRM leads?",
    answer: "AutoMaster Suite uses AI-driven SMS conversations to re-engage aged leads in your CRM. We analyze your database to identify cold leads with buying signals, then launch personalized outreach campaigns. We typically see 30%+ of dormant leads respond, with 5-11% booking appointments — all without adding staff or ad spend."
  },
  {
    question: "What ROI can dealerships expect from AI lead automation?",
    answer: "Dealers using AutoMaster Suite have generated over $27.4M in additional revenue. On average, our clients see a 5-11% increase in monthly unit sales from lead reactivation alone, plus faster response times on new leads. One dealership group sold 17 extra cars in a single month from reactivated leads, recovering $425K in revenue."
  },
  {
    question: "How long does AutoMaster Suite take to set up?",
    answer: "We deliver your custom AutoMaster Suite within 7 business days. Setup includes CRM/DMS integration, AI training customized for your dealership's voice and inventory, and a dedicated Account Success Manager — no IT resources required from your team. Most dealerships are fully operational within the first week."
  },
  {
    question: "Is AutoMaster Suite compliant with TCPA and SMS regulations?",
    answer: "Yes. We conduct monthly compliance audits to ensure all outreach meets state and federal TCPA standards. Our system includes proper opt-out mechanisms, consent tracking, and data retention policies built specifically for automotive. We maintain enterprise-grade security with encrypted data transmission and never sell or share your customer data."
  },
  {
    question: "What is the cost of missed leads for car dealerships?",
    answer: "Slow lead response costs dealerships an estimated 35% of potential sales. Studies show leads contacted in under 60 seconds are 21x more likely to convert than those contacted after 30 minutes. Additionally, the average dealership has $2.4M in potential revenue sitting untouched in aged CRM leads, and each missed service call costs approximately $340 in average RO value."
  },
  {
    question: "Can AI handle service department appointment scheduling?",
    answer: "Yes. Our Service Intelligence module uses voice AI to answer inbound service calls 24/7. It can schedule appointments, answer common questions about hours and services, send automated reminders, and route complex issues to your team. Dealerships using Service Intelligence capture 100% of calls with zero missed opportunities."
  },
  {
    question: "How does reputation management work for dealerships?",
    answer: "AutoMaster Suite automatically requests reviews after every sale and service via SMS. Our AI catches negative feedback before it goes public, allowing you to resolve issues proactively. Dealerships typically see a 75% increase in 5-star reviews and a 0.6 CSI score lift within 90 days — all without manual follow-up."
  },
  {
    question: "What makes AutoMaster Suite different from other dealership AI solutions?",
    answer: "Three things set us apart: First, we're built exclusively for automotive — our AI understands VINs, trade-ins, financing, and dealership workflows. Second, we're a unified platform with five modules in one system, not point solutions duct-taped together. Third, every client gets a dedicated success manager who knows the automotive industry and optimizes your results continuously."
  }
];

// Generate FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* FAQ Schema for SEO */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="faq-section">
        <div className="faq-container">
          <motion.div
            className="faq-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="faq-badge">
              <span className="faq-badge-icon">?</span>
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="faq-title">
              Everything You Need to Know About <span className="faq-highlight">AutoMaster Suite</span>
            </h2>
            <p className="faq-subtitle">
              Get answers to common questions about AI-powered dealership solutions, implementation, integrations, and ROI.
            </p>
          </motion.div>

          <motion.div
            className="faq-grid"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`faq-item ${openIndex === index ? 'faq-item-open' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      className={openIndex === index ? 'faq-icon-rotate' : ''}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="faq-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="faq-cta-text">Still have questions?</p>
            <a href="#" className="faq-cta-link">
              <span>Talk to our team</span>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
