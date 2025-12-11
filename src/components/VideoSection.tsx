'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const videoId = 'FOlaUITzCkc';

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
    <>
      <section
        ref={sectionRef}
        style={{
          padding: '120px 0',
          backgroundColor: '#0a0a0a',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle ambient glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '10%',
          transform: 'translateY(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '80px',
            alignItems: 'center',
          }}>
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Eyebrow */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '24px',
              }}>
                <span style={{
                  width: '48px',
                  height: '1px',
                  background: 'linear-gradient(90deg, #f97316, rgba(249,115,22,0.2))',
                }} />
                <span style={{
                  fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#f97316',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                }}>
                  From Our Team
                </span>
              </div>

              {/* Headline */}
              <h2 style={{
                fontSize: 'clamp(36px, 4vw, 52px)',
                fontWeight: 700,
                color: 'white',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                margin: '0 0 28px 0',
                fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
              }}>
                What Makes{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  AutoMaster Suite
                </span>
                <br />
                Different
              </h2>

              {/* Description */}
              <div style={{ marginBottom: '40px' }}>
                <p style={{
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.8,
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  Hear directly from our Chief Sales Officer about why dealerships
                  choose Visquanta over disconnected tools and unreliable vendors.
                </p>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                  margin: '0 0 20px 0',
                  fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  We've sat in your shoes. We know what it's like to lose a deal because
                  a lead sat in a queue for four hours. We know the frustration of paying
                  five different vendors for tools that don't talk to each other.
                </p>
                <p style={{
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.8,
                  margin: 0,
                  fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                }}>
                  That's why we built AutoMaster Suite—a single platform designed specifically
                  for automotive retail, by people who've worked the desk, managed the BDC,
                  and felt the pressure of month-end.
                </p>
              </div>

              {/* Stats Row */}
              <div style={{
                display: 'flex',
                gap: '40px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}>
                {[
                  { num: '50+', label: 'Years Experience' },
                  { num: '100+', label: 'Dealerships' },
                  { num: '$35M+', label: 'Revenue Generated' },
                ].map((stat, i) => (
                  <div key={i}>
                    <span style={{
                      display: 'block',
                      fontSize: '32px',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                      marginBottom: '6px',
                      fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      letterSpacing: '-0.02em',
                    }}>
                      {stat.num}
                    </span>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.4)',
                      fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Video Card */}
              <div
                onClick={() => setIsVideoOpen(true)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#111',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isHovered
                    ? '0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.15)'
                    : '0 30px 60px -20px rgba(0,0,0,0.5)',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Header bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      background: '#22c55e',
                      borderRadius: '50%',
                      boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                      animation: 'pulse 2s ease-in-out infinite',
                    }} />
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'rgba(255,255,255,0.5)',
                      fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}>
                      Meet the Team
                    </span>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.3)',
                    fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                  }}>
                    2:45
                  </span>
                </div>

                {/* Thumbnail */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                }}>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Video thumbnail - William Voyles"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    }}
                  />

                  {/* Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: isHovered
                      ? 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)'
                      : 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)',
                    transition: 'background 0.4s ease',
                  }} />

                  {/* Play Button */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: isHovered
                      ? 'translate(-50%, -50%) scale(1.08)'
                      : 'translate(-50%, -50%) scale(1)',
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    boxShadow: isHovered
                      ? '0 16px 48px rgba(249,115,22,0.5)'
                      : '0 12px 40px rgba(249,115,22,0.4)',
                  }}>
                    <svg viewBox="0 0 24 24" fill="white" style={{ width: '28px', height: '28px', marginLeft: '3px' }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Speaker info overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    zIndex: 2,
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, rgba(249,115,22,0.3) 0%, rgba(249,115,22,0.1) 100%)',
                      border: '1px solid rgba(249,115,22,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#f97316',
                      fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    }}>
                      WV
                    </div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: 'white',
                        fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                        marginBottom: '2px',
                      }}>
                        William Voyles
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: 'var(--font-body), Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                      }}>
                        Chief Sales Officer
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.92)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: '75%',
                maxWidth: '1100px',
                background: '#0a0a0a',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 50px 100px rgba(0,0,0,0.7)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                style={{
                  position: 'absolute',
                  top: '-56px',
                  right: '0',
                  width: '44px',
                  height: '44px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f97316';
                  e.currentTarget.style.borderColor = '#f97316';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{ width: '20px', height: '20px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Video */}
              <div style={{
                position: 'relative',
                paddingTop: '56.25%',
              }}>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title="What Makes AutoMaster Suite Different"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
