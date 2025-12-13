'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';

// Lead Reactivation is featured (index 0), Speed to Lead is secondary (index 1)
const capabilities = [
  {
    number: '01',
    title: 'Lead Reactivation',
    description: 'Conversational AI digs into your CRM, reactivates stalled prospects, rebuilds interest, and turns dead leads into booked appointments that generate new revenue without extra ad spend.',
    stat: '30%',
    statLabel: 're-engagement',
    stat2: '5-11%',
    stat2Label: 'sales increase',
    link: '/products/lead-reactivation',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    featured: true,
  },
  {
    number: '02',
    title: 'Speed to Lead',
    description: 'AutoTrader, Cars.com, CarGurus, Meta, any inbound leads get a personalized 60-sec response, so you never miss a lead again and qualify every prospect.',
    stat: '21x',
    statLabel: 'higher conversion',
    stat2: '<60s',
    stat2Label: 'response time',
    link: '/products/speed-to-lead',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Website Widget',
    description: 'Convert website visitors into qualified buyers with real time engagement that answers questions, captures intent, and books appointments 24/7.',
    stat: '24/7',
    statLabel: 'availability',
    stat2: '3x',
    stat2Label: 'more leads',
    link: '/products/website-widget',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Reputation Management',
    description: 'Monitor, respond to, and strengthen your online reputation with conversational AI that addresses every review quickly and professionally.',
    stat: '<5min',
    statLabel: 'response time',
    stat2: '75%',
    stat2Label: 'more reviews',
    link: '/products/reputation-management',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Service Drive AI',
    description: 'Voice AI answers every service call, schedules appointments, handles inquiries. Zero missed calls.',
    stat: '100%',
    statLabel: 'calls answered',
    stat2: '24/7',
    stat2Label: 'availability',
    link: '/products/service-drive-ai',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

// Animated counter component
function AnimatedStat({ value, isVisible }: { value: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isVisible) return;

    // Parse the value to check if it's a number we can animate
    const numMatch = value.match(/^([<>]?)(\d+(?:\.\d+)?)(.*)/);
    if (!numMatch) {
      setDisplayValue(value);
      return;
    }

    const prefix = numMatch[1];
    const num = parseFloat(numMatch[2]);
    const suffix = numMatch[3];

    let start = 0;
    const duration = 1500;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(num * eased);

      setDisplayValue(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value]);

  return <>{displayValue}</>;
}

// 3D Tilt Card wrapper
function TiltCard({
  children,
  className = '',
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

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
      variants={itemVariants}
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
        style={{
          position: 'relative',
          height: '100%',
          padding: featured ? '48px' : '32px',
          borderRadius: '28px',
          background: featured
            ? 'linear-gradient(180deg, rgba(249,115,22,0.1) 0%, rgba(20,20,20,0.95) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          border: featured
            ? '1px solid rgba(249,115,22,0.3)'
            : '1px solid rgba(255,255,255,0.06)',
          transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
          boxShadow: isHovered
            ? featured
              ? '0 40px 80px -20px rgba(249,115,22,0.3), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 0 1px rgba(249,115,22,0.15)'
              : '0 32px 64px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(249,115,22,0.1)'
            : featured
              ? 'inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px -8px rgba(0,0,0,0.3)'
              : 'inset 0 1px 0 rgba(255,255,255,0.04)',
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Glow effect on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '24px',
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,115,22,0.15) 0%, transparent 50%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}

// Featured Hero Card (Lead Reactivation)
function FeaturedCard({ item, isVisible }: { item: typeof capabilities[0]; isVisible: boolean }) {
  return (
    <TiltCard featured className="col-span-full">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', zIndex: 1 }}>
        {/* Decorative corner accents */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Top row: Icon + Badge + Number */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* Icon with animated ring */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                inset: '-4px',
                borderRadius: '20px',
                background: 'conic-gradient(from 0deg, rgba(249,115,22,0.4), rgba(249,115,22,0.1), rgba(249,115,22,0.4))',
                animation: 'spin 8s linear infinite',
                opacity: 0.5,
              }} />
              <div style={{
                position: 'relative',
                width: '64px',
                height: '64px',
                borderRadius: '18px',
                background: 'linear-gradient(135deg, rgba(249,115,22,0.25) 0%, rgba(249,115,22,0.1) 100%)',
                border: '1px solid rgba(249,115,22,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f97316',
                backdropFilter: 'blur(8px)',
              }}>
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            {/* Featured badge */}
            <span style={{
              padding: '8px 18px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.1) 100%)',
              border: '1px solid rgba(249,115,22,0.35)',
              color: '#fb923c',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              boxShadow: '0 2px 12px rgba(249,115,22,0.15)',
            }}>
              Most Popular
            </span>
          </div>
          {/* Number watermark */}
          <span style={{
            fontSize: '120px',
            fontWeight: 800,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 0.75,
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            {item.number}
          </span>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '720px' }}>
          <h3 style={{
            color: 'white',
            fontSize: 'clamp(36px, 4.5vw, 48px)',
            fontWeight: 700,
            margin: '0 0 20px',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
          }}>
            {item.title}
          </h3>
          <p style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '18px',
            lineHeight: 1.75,
            margin: 0,
            maxWidth: '640px',
          }}>
            {item.description}
          </p>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '64px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div>
            <div style={{
              fontSize: 'clamp(52px, 6vw, 72px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}>
              <AnimatedStat value={item.stat} isVisible={isVisible} />
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginTop: '12px',
            }}>
              {item.statLabel}
            </div>
          </div>
          <div>
            <div style={{
              fontSize: 'clamp(52px, 6vw, 72px)',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}>
              <AnimatedStat value={item.stat2} isVisible={isVisible} />
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginTop: '12px',
            }}>
              {item.stat2Label}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Link
              href={item.link}
              className="group/btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(249,115,22,0.35), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              Learn more
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-1">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

// Standard Card (for other capabilities)
function StandardCard({ item, isVisible }: { item: typeof capabilities[0]; isVisible: boolean }) {
  return (
    <TiltCard>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 1 }}>
        {/* Subtle corner glow */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }} className="group-hover:opacity-100" />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.08) 100%)',
            border: '1px solid rgba(249,115,22,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316',
            transition: 'all 0.4s ease',
            boxShadow: '0 4px 12px rgba(249,115,22,0.1)',
          }} className="group-hover:bg-orange-500/25 group-hover:border-orange-500/40 group-hover:shadow-[0_8px_24px_rgba(249,115,22,0.2)]">
            {item.icon}
          </div>
          <span style={{
            fontSize: '72px',
            fontWeight: 800,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 0.75,
          }}>
            {item.number}
          </span>
        </div>

        {/* Content */}
        <h3 style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: 700,
          margin: '0 0 14px',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}>
          {item.title}
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '15px',
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
        }}>
          {item.description}
        </p>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '40px',
          marginTop: '28px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          transition: 'border-color 0.4s ease',
        }} className="group-hover:border-orange-500/15">
          <div>
            <div style={{
              fontSize: '36px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              <AnimatedStat value={item.stat} isVisible={isVisible} />
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginTop: '8px',
            }}>
              {item.statLabel}
            </div>
          </div>
          <div>
            <div style={{
              fontSize: '36px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              <AnimatedStat value={item.stat2} isVisible={isVisible} />
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginTop: '8px',
            }}>
              {item.stat2Label}
            </div>
          </div>
        </div>

        {/* Link */}
        <Link
          href={item.link}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px',
            color: '#f97316',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          <span className="group-hover:underline underline-offset-4">Learn more</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </TiltCard>
  );
}

export default function PlatformSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Lead Reactivation (featured), then the rest
  const featuredItem = capabilities[0];
  const secondaryItems = capabilities.slice(1);

  return (
    <section
      ref={sectionRef}
      className="pt-32 pb-28 md:pt-40 md:pb-36 lg:pt-52 lg:pb-48 relative overflow-hidden"
      style={{
        backgroundColor: '#080808',
      }}
    >
      {/* Background effects */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '160%',
        height: '90%',
        background: 'radial-gradient(ellipse at center top, rgba(249,115,22,0.05) 0%, transparent 45%)',
        pointerEvents: 'none',
      }} />
      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        pointerEvents: 'none',
        opacity: 0.5,
      }} />
      {/* Bottom border */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }} />

      <div style={{
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '0 32px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-24 md:mb-32 lg:mb-36"
        >
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '32px',
          }}>
            <div style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.6))',
            }} />
            <span style={{
              color: '#fb923c',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
            }}>
              The AutoMaster Suite
            </span>
            <div style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(249,115,22,0.6), transparent)',
            }} />
          </div>

          <h2 style={{
            color: 'white',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
            margin: '0 0 28px',
          }}>
            Five AI Tools.<br />
            One Unified System.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '19px',
            lineHeight: 1.8,
            maxWidth: '660px',
            margin: '0 auto',
          }}>
            An AI toolkit for car dealerships designed to drive more revenue by capturing more leads, converting more buyers, and retaining customers.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '28px',
          }}
          className="bento-grid"
        >
          {/* Featured Card - Lead Reactivation (Full Width) */}
          <FeaturedCard item={featuredItem} isVisible={isVisible} />

          {/* Standard Cards - 2x2 Grid */}
          {secondaryItems.map((item) => (
            <StandardCard key={item.number} item={item} isVisible={isVisible} />
          ))}
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .bento-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
