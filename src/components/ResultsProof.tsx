'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

interface Stat {
  value: string;
  numericValue: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  dealership: string;
  rating: number;
  avatar: string;
  metric: string;
  metricLabel: string;
}

const stats: Stat[] = [
  {
    value: "$27.4M",
    numericValue: 27.4,
    prefix: "$",
    suffix: "M",
    label: "Extra Revenue",
    sublabel: "Generated for partners",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    value: "6,000+",
    numericValue: 6000,
    suffix: "+",
    label: "Vehicles Sold",
    sublabel: "From reactivated leads",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M19 17h2a2 2 0 002-2v-3a2 2 0 00-2-2h-1l-2-4H6L4 10H3a2 2 0 00-2 2v3a2 2 0 002 2h2m14 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0M9 17a2 2 0 11-4 0m4 0a2 2 0 10-4 0" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    value: "76%",
    numericValue: 76,
    suffix: "%",
    label: "More Sales",
    sublabel: "From cold leads",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    value: "98%",
    numericValue: 98,
    suffix: "%",
    label: "Satisfaction",
    sublabel: "Dealer rated results",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

const testimonials: Testimonial[] = [
  {
    quote: "We recovered $47K in our first 60 days. The ROI was obvious within the first month.",
    name: "Michael Rodriguez",
    title: "Operations Manager",
    dealership: "Seth Wadley Auto Group",
    rating: 5,
    avatar: "MR",
    metric: "$47K",
    metricLabel: "recovered in 60 days"
  },
  {
    quote: "Being first to respond changed everything. We went from losing deals to winning them consistently.",
    name: "Sarah Chen",
    title: "Sales Director",
    dealership: "Metro Honda",
    rating: 5,
    avatar: "SC",
    metric: "3x",
    metricLabel: "more deals won"
  },
  {
    quote: "Every missed call used to cost us $340 in average RO value. Now we capture every single one.",
    name: "James Thompson",
    title: "Service Manager",
    dealership: "Thompson Chevrolet",
    rating: 5,
    avatar: "JT",
    metric: "100%",
    metricLabel: "call capture rate"
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

  return (
    <span>
      {prefix}
      {value >= 1000 ? Math.floor(count).toLocaleString() : count.toFixed(1)}
      {suffix}
    </span>
  );
}

// Premium 3D Card with tilt effect
function PremiumCard({
  children,
  className = '',
  delay = 0,
  isInView
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 400, damping: 30 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      className={`group ${className}`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div
        className="premium-card-inner"
        style={{
          position: 'relative',
          height: '100%',
          borderRadius: '24px',
          background: isHovered
            ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
          boxShadow: isHovered
            ? '0 32px 64px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
            : 'inset 0 1px 0 rgba(255,255,255,0.05)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          backdropFilter: 'blur(12px)',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 50%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: 'none',
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}

export default function ResultsProof() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} style={{
      position: 'relative',
      padding: '140px 0 120px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #080808 50%, #0a0a0a 100%)',
      overflow: 'hidden',
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200%',
        height: '600px',
        background: 'radial-gradient(ellipse at center top, rgba(249,115,22,0.06) 0%, transparent 50%)',
        pointerEvents: 'none',
      }} />

      {/* Grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
        mask: 'radial-gradient(ellipse at center, white 30%, transparent 70%)',
        WebkitMask: 'radial-gradient(ellipse at center, white 30%, transparent 70%)',
      }} />

      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        padding: '0 40px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <motion.header
          style={{ textAlign: 'center', marginBottom: '80px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 20px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%)',
              border: '1px solid rgba(249,115,22,0.25)',
              marginBottom: '32px',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span style={{
              color: '#fb923c',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>
              Proven Results
            </span>
          </motion.div>

          <h2 style={{
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            color: 'white',
            margin: '0 0 24px',
          }}>
            Results That Speak{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              for Themselves
            </span>
          </h2>

          <p style={{
            fontSize: '19px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)',
            maxWidth: '560px',
            margin: '0 auto',
          }}>
            Don't take our word for it — see what dealers are achieving with AutoMaster Suite.
          </p>
        </motion.header>

        {/* Stats Grid - Premium Bento Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          marginBottom: '48px',
        }} className="stats-grid">
          {stats.map((stat, index) => (
            <PremiumCard key={stat.label} delay={0.2 + index * 0.1} isInView={isInView}>
              <div style={{ padding: '40px 32px', textAlign: 'center' }}>
                {/* Icon */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  margin: '0 auto 24px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.08) 100%)',
                  border: '1px solid rgba(249,115,22,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f97316',
                }}>
                  {stat.icon}
                </div>

                {/* Value */}
                <div style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '12px',
                  background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  <AnimatedCounter
                    value={stat.numericValue}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </div>

                {/* Label */}
                <div style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'white',
                  marginBottom: '6px',
                }}>
                  {stat.label}
                </div>

                {/* Sublabel */}
                <div style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.4)',
                }}>
                  {stat.sublabel}
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '64px',
        }} className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <PremiumCard key={index} delay={0.5 + index * 0.1} isInView={isInView}>
              <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Header with metric */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}>
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="#f97316">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Metric badge */}
                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(249,115,22,0.1)',
                    border: '1px solid rgba(249,115,22,0.2)',
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#fb923c',
                    }}>
                      {testimonial.metric}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote style={{
                  fontSize: '16px',
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.75)',
                  margin: '0 0 auto',
                  paddingBottom: '24px',
                  fontStyle: 'normal',
                }}>
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.15) 100%)',
                    border: '1px solid rgba(249,115,22,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#fb923c',
                  }}>
                    {testimonial.avatar}
                  </div>

                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'white',
                      marginBottom: '2px',
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.45)',
                    }}>
                      {testimonial.title} · {testimonial.dealership}
                    </div>
                  </div>
                </div>
              </div>
            </PremiumCard>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            padding: '40px',
            borderRadius: '20px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            margin: 0,
          }}>
            Ready to become our next success story?
          </p>

          <Link
            href="/book-demo"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 28px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: 'white',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(249,115,22,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            Get Your Free Assessment
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        .stats-grid {
          grid-template-columns: repeat(4, 1fr);
        }

        .testimonials-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 1100px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
