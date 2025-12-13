'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    days: 'DAY 1-3',
    eyebrow: 'GET STARTED',
    title: 'Onboard',
    description: 'Sign the contract and we take it from here. Our team handles all the technical setup—you just answer a few questions.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '02',
    days: 'DAY 4-7',
    eyebrow: 'CUSTOM TRAINING',
    title: 'Configure',
    description: "We train the AI on your dealership's hours, processes, and how your team talks. It sounds like your best salesperson.",
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    days: 'DAY 8-10',
    eyebrow: 'GO LIVE',
    title: 'Convert',
    description: 'Our AI starts texting your old leads. Dormant contacts reply. Appointments start filling your calendar.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    number: '04',
    days: 'DAY 11-14',
    eyebrow: 'OPTIMIZE & REFINE',
    title: 'Perfect',
    description: 'We review every conversation and optimize weekly. Your AI gets smarter every day.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    number: '05',
    days: 'DAY 14+',
    eyebrow: 'CONTINUOUS GROWTH',
    title: 'Scale',
    description: 'Track every lead, call, and appointment in one dashboard. See exactly what works.',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

const stats = [
  { value: '14', label: 'DAYS TO LAUNCH' },
  { value: '<24hr', label: 'FIRST LEAD' },
  { value: '0', label: 'IT REQUIRED' },
];

function TimelineCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className="group"
      style={{
        position: 'relative',
        padding: '28px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      whileHover={{
        borderColor: 'rgba(249,115,22,0.4)',
        boxShadow: '0 30px 60px -20px rgba(249,115,22,0.2)',
        y: -8,
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #f97316, transparent)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }} className="group-hover:opacity-100" />

      {/* Corner glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '120px',
        height: '120px',
        background: 'radial-gradient(circle at 100% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '20px',
      }}>
        {/* Icon */}
        <motion.div 
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%)',
            border: '1px solid rgba(249,115,22,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f97316',
          }}
          whileHover={{ scale: 1.05 }}
        >
          {step.icon}
        </motion.div>

        {/* Number */}
        <span style={{
          fontSize: '56px',
          fontWeight: 800,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          lineHeight: 0.8,
          letterSpacing: '-0.05em',
        }}>
          {step.number}
        </span>
      </div>

      {/* Eyebrow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '10px',
      }}>
        <div style={{
          width: '16px',
          height: '2px',
          background: '#f97316',
          borderRadius: '1px',
        }} />
        <span style={{
          color: '#f97316',
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        }}>
          {step.eyebrow}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        color: 'white',
        fontSize: '26px',
        fontWeight: 700,
        margin: '0 0 12px',
        letterSpacing: '-0.02em',
        fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      }}>
        {step.title}
      </h3>

      {/* Description */}
      <p style={{
        color: 'rgba(255,255,255,0.5)',
        fontSize: '14px',
        lineHeight: 1.7,
        margin: 0,
        fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        flex: 1,
      }}>
        {step.description}
      </p>
    </motion.div>
  );
}

function TimelineDot({ index, days }: { index: number; days: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
      }}
    >
      {/* Dot */}
      <div style={{
        position: 'relative',
        width: '20px',
        height: '20px',
      }}>
        {/* Outer glow ring */}
        <motion.div
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            inset: '-4px',
            background: '#f97316',
            borderRadius: '50%',
            filter: 'blur(4px)',
          }}
        />
        {/* Core dot */}
        <div style={{
          position: 'absolute',
          inset: '2px',
          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(249,115,22,0.6), inset 0 1px 1px rgba(255,255,255,0.3)',
          border: '2px solid rgba(255,255,255,0.2)',
        }} />
      </div>

      {/* Premium Days pill */}
      <div style={{
        padding: '8px 18px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.08) 100%)',
        border: '1px solid rgba(249,115,22,0.4)',
        boxShadow: '0 4px 20px rgba(249,115,22,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
      }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'white',
          letterSpacing: '0.1em',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
        }}>
          {days}
        </span>
      </div>
    </motion.div>
  );
}

export default function ImplementationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const lineWidth = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
    { stiffness: 50, damping: 20 }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '140px 0',
        backgroundColor: '#030303',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }} />
        
        {/* Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.04) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }} />
      </div>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          {/* Eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '28px',
          }}>
            <div style={{
              width: '50px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.6))',
            }} />
            <span style={{
              color: '#f97316',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            }}>
              Implementation
            </span>
            <div style={{
              width: '50px',
              height: '1px',
              background: 'linear-gradient(90deg, rgba(249,115,22,0.6), transparent)',
            }} />
          </div>

          <h2 style={{
            color: 'white',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            margin: '0 0 24px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            From Signup to{' '}
            <span style={{
              background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              ROI
            </span>
            {' '}in Two Weeks
          </h2>

          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '18px',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          }}>
            No lengthy IT projects. No complex migrations. Our white-glove onboarding ensures you're generating results within two weeks.
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div ref={timelineRef} style={{ position: 'relative' }}>
          
          {/* Timeline track */}
          <div 
            style={{
              position: 'absolute',
              top: '9px',
              left: '10%',
              right: '10%',
              height: '2px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '1px',
              zIndex: 1,
            }}
          >
            {/* Animated progress */}
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: lineWidth,
                background: 'linear-gradient(90deg, #f97316 0%, rgba(249,115,22,0.3) 100%)',
                borderRadius: '1px',
                boxShadow: '0 0 30px rgba(249,115,22,0.5)',
              }}
            />
          </div>

          {/* Dots row */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
              marginBottom: '40px',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {steps.map((step, index) => (
              <div key={step.number} style={{ display: 'flex', justifyContent: 'center' }}>
                <TimelineDot index={index} days={step.days} />
              </div>
            ))}
          </div>

          {/* Cards grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
              gap: '20px',
            }}
          >
            {steps.map((step, index) => (
              <TimelineCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            marginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ 
                y: -4,
                borderColor: 'rgba(249,115,22,0.3)',
              }}
              style={{
                textAlign: 'center',
                padding: '32px 48px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                border: '1px solid rgba(255,255,255,0.06)',
                minWidth: '180px',
                transition: 'border-color 0.3s ease',
              }}
            >
              <div style={{
                fontSize: '56px',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginBottom: '12px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
