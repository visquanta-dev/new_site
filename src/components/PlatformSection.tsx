'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const capabilities = [
  {
    number: '01',
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
    number: '02',
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

function CapabilityCard({ item, index }: { item: typeof capabilities[0]; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      style={{
        position: 'relative',
        padding: '32px',
        borderRadius: '20px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
        cursor: 'pointer',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      whileHover={{
        y: -4,
        borderColor: 'rgba(249,115,22,0.3)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px -16px rgba(249,115,22,0.15)',
      }}
      className="group"
    >
      {/* Shine sweep effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
        transform: 'skewX(-20deg)',
        transition: 'left 0.6s ease',
        pointerEvents: 'none',
      }} className="group-hover:left-[100%]" />

      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '140px',
        height: '140px',
        background: 'radial-gradient(circle at bottom right, rgba(249,115,22,0.1) 0%, transparent 70%)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
      }} className="group-hover:opacity-100" />

      {/* Header row with icon and number */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '24px',
      }}>
        {/* Icon with glow */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: '-8px',
            background: 'rgba(249,115,22,0.25)',
            borderRadius: '20px',
            filter: 'blur(20px)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
          }} className="group-hover:opacity-100" />
          <div style={{
            position: 'relative',
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316',
            transition: 'all 0.4s ease',
          }} className="group-hover:border-orange-500/50 group-hover:bg-orange-500/20">
            {item.icon}
          </div>
        </div>

        {/* Watermark number */}
        <span style={{
          fontSize: '72px',
          fontWeight: 700,
          color: 'rgba(255,255,255,0.04)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          lineHeight: 1,
          transition: 'color 0.4s ease',
        }} className="group-hover:!text-white/[0.06]">
          {item.number}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        color: 'white',
        fontSize: '28px',
        fontWeight: 700,
        margin: '0 0 12px',
        letterSpacing: '-0.02em',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      }}>
        {item.title}
      </h3>

      {/* Description */}
      <p style={{
        color: 'rgba(255,255,255,0.5)',
        fontSize: '16px',
        lineHeight: 1.7,
        margin: '0',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        flex: 1,
      }}>
        {item.description}
      </p>

      {/* Stat block */}
      <div style={{
        paddingTop: '24px',
        marginTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.12)',
        transition: 'border-color 0.4s ease',
      }} className="group-hover:border-orange-500/30">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
        }}>
          {/* Primary stat */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontSize: '42px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              {item.stat}
            </span>
            <span style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {item.statLabel}
            </span>
          </div>
          
          {/* Secondary stat */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{
              fontSize: '42px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              {item.stat2}
            </span>
            <span style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '13px',
              fontWeight: 500,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {item.stat2Label}
            </span>
          </div>
        </div>
      </div>

      {/* Learn more link - always visible */}
      <Link 
        href={item.link}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '20px',
          paddingTop: '16px',
          textDecoration: 'none',
          transition: 'all 0.3s ease',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <span style={{
          color: '#f97316',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          transition: 'color 0.3s ease',
        }}>
          Learn more
        </span>
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#f97316" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          style={{
            transition: 'transform 0.3s ease',
          }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.div>
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

  return (
    <section 
      ref={sectionRef}
      className="pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-40 relative overflow-hidden"
      style={{
        backgroundColor: '#0a0a0a',
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%',
        height: '120%',
        background: 'radial-gradient(ellipse at center, rgba(249,115,22,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20 md:mb-24 lg:mb-32"
        >
          {/* Eyebrow with lines */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
          }}>
            <div style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5))',
            }} />
            <span style={{
              color: '#f97316',
              fontSize: '13px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            }}>
              The AutoMaster Suite
            </span>
            <div style={{
              width: '40px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(249,115,22,0.5), transparent)',
            }} />
          </div>
          
          <h2 style={{
            color: 'white',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: '0 0 24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          }}>
            Five AI Tools.<br />
            <span style={{ color: 'white' }}>One Unified System.</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '18px',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          }}>
            An AI toolkit for car dealerships designed to drive more revenue by capturing more leads, converting more buyers, and retaining customers across sales and service.
          </p>
        </motion.div>

        {/* Cards Grid - Top Row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            marginBottom: '24px',
          }}
        >
          {capabilities.slice(0, 3).map((item, index) => (
            <CapabilityCard key={item.number} item={item} index={index} />
          ))}
        </motion.div>

        {/* Cards Grid - Bottom Row (Centered) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            maxWidth: '840px',
            margin: '0 auto',
          }}
        >
          {capabilities.slice(3, 5).map((item, index) => (
            <CapabilityCard key={item.number} item={item} index={index + 3} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
