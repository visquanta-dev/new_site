'use client';

import { motion } from 'framer-motion';

// Car brand logos as inline SVGs for reliability
const brands = [
  {
    name: 'Genesis',
    logo: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="spb-logo-svg">
        <path d="M50 5L20 20l30 15 30-15L50 5zm0 4.5L71.5 20 50 30.5 28.5 20 50 9.5z"/>
        <path d="M50 14l-12 6 12 6 12-6-12-6z"/>
      </svg>
    ),
  },
  {
    name: 'Volkswagen',
    logo: (
      <svg viewBox="0 0 100 100" fill="currentColor" className="spb-logo-svg spb-logo-vw">
        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="5"/>
        <path d="M50 12l-8 30h-5l-12-25h6l9 19 9-19h6l-12 25h-5l8-30h4zM50 58l-8 30h4l8-30 8 30h4l-8-30h-5l-3-10h-3l-3 10h-5z" transform="translate(0, -3)"/>
      </svg>
    ),
  },
  {
    name: 'Kia',
    logo: (
      <svg viewBox="0 0 120 50" fill="currentColor" className="spb-logo-svg">
        <path d="M15 10h8v30h-8V25l-7 15H0L15 10zm25 0h8l15 20V10h8v30h-8L48 20v20h-8V10zm45 0h20v7H93v5h10v6H93v5h12v7H85V10z"/>
      </svg>
    ),
  },
  {
    name: 'Nissan',
    logo: (
      <svg viewBox="0 0 140 50" fill="currentColor" className="spb-logo-svg">
        <ellipse cx="70" cy="25" rx="65" ry="22" fill="none" stroke="currentColor" strokeWidth="3"/>
        <path d="M30 18h6v14h-6zm8 0h6l8 9v-9h5v14h-5l-9-10v10h-5V18zm25 0h6v14h-6zm10 0h14v4h-4v10h-6V22h-4v-4zm18 0h6l5 9 5-9h6l-8 14h-6l-8-14zm25 0h6v14h-6z" transform="translate(-2, 0)"/>
      </svg>
    ),
  },
  {
    name: 'GMC',
    logo: (
      <svg viewBox="0 0 100 40" fill="currentColor" className="spb-logo-svg">
        <path d="M5 8h25v6H13v4h15v6H13v4h17v6H5V8zm30 0h12l6 12 6-12h12v26h-8V18l-6 12h-8l-6-12v16h-8V8zm55 0h25v6H98v14h17v6H90V8z"/>
      </svg>
    ),
  },
  {
    name: 'Mazda',
    logo: (
      <svg viewBox="0 0 140 50" fill="currentColor" className="spb-logo-svg">
        <path d="M70 8c-25 0-45 10-45 17s20 17 45 17 45-10 45-17-20-17-45-17zm0 6c20 0 36 5 36 11s-16 11-36 11-36-5-36-11 16-11 36-11z"/>
        <path d="M70 18c-8 0-15 3-15 7s7 7 15 7 15-3 15-7-7-7-15-7z"/>
      </svg>
    ),
  },
  {
    name: 'Cadillac',
    logo: (
      <svg viewBox="0 0 80 100" fill="currentColor" className="spb-logo-svg spb-logo-tall">
        <path d="M40 5L15 25v50l25 20 25-20V25L40 5zm0 10l17 14v36l-17 13-17-13V29l17-14z"/>
        <rect x="35" y="35" width="10" height="30"/>
        <rect x="25" y="45" width="30" height="10"/>
      </svg>
    ),
  },
  {
    name: 'Hyundai',
    logo: (
      <svg viewBox="0 0 120 60" fill="currentColor" className="spb-logo-svg">
        <ellipse cx="60" cy="30" rx="55" ry="25" fill="none" stroke="currentColor" strokeWidth="4"/>
        <path d="M35 15h10v12h10V15h10v30H55V33H45v12H35V15z"/>
      </svg>
    ),
  },
  {
    name: 'Chevrolet',
    logo: (
      <svg viewBox="0 0 120 80" fill="currentColor" className="spb-logo-svg">
        <path d="M10 30h25v-8h50v8h25v20H85v8H35v-8H10V30zm30-2h40v24H40V28z"/>
      </svg>
    ),
  },
  {
    name: 'Ford',
    logo: (
      <svg viewBox="0 0 140 55" fill="currentColor" className="spb-logo-svg">
        <ellipse cx="70" cy="27.5" rx="65" ry="25" fill="none" stroke="currentColor" strokeWidth="4"/>
        <path d="M35 17h30v6H45v5h18v6H45v11h-10V17zm35 0h20c8 0 12 4 12 10s-4 10-12 10h-10v8H70V17zm10 6v8h8c3 0 5-1 5-4s-2-4-5-4h-8z"/>
      </svg>
    ),
  },
  {
    name: 'Toyota',
    logo: (
      <svg viewBox="0 0 140 90" fill="currentColor" className="spb-logo-svg">
        <ellipse cx="70" cy="45" rx="60" ry="35" fill="none" stroke="currentColor" strokeWidth="4"/>
        <ellipse cx="70" cy="45" rx="35" ry="20" fill="none" stroke="currentColor" strokeWidth="4"/>
        <ellipse cx="70" cy="45" rx="8" ry="35" fill="none" stroke="currentColor" strokeWidth="4"/>
      </svg>
    ),
  },
  {
    name: 'Honda',
    logo: (
      <svg viewBox="0 0 100 70" fill="currentColor" className="spb-logo-svg">
        <path d="M20 10h10v20h40V10h10v50H70V40H30v20H20V10z"/>
      </svg>
    ),
  },
];

export default function SocialProofBar() {
  // Duplicate for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="spb-section">
      <div className="spb-container">
        <motion.p
          className="spb-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by dealerships selling
        </motion.p>

        <div className="spb-marquee-wrapper">
          <div className="spb-marquee">
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="spb-logo-item">
                {brand.logo}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .spb-section {
          background: linear-gradient(180deg, var(--carbon) 0%, #0a0a0a 100%);
          padding: 80px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          overflow: hidden;
        }

        .spb-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .spb-label {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--steel);
          text-align: center;
          margin-bottom: 48px;
        }

        .spb-marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
        }

        .spb-marquee {
          display: flex;
          gap: 64px;
          animation: spb-scroll 40s linear infinite;
          width: max-content;
        }

        .spb-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes spb-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .spb-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          min-width: 100px;
          color: var(--steel);
          opacity: 0.5;
          transition: all 0.4s ease;
          cursor: default;
        }

        .spb-logo-item:hover {
          opacity: 1;
          color: var(--silver);
          transform: scale(1.05);
        }

        .spb-logo-svg {
          height: 32px;
          width: auto;
          max-width: 100px;
        }

        .spb-logo-vw {
          height: 40px;
        }

        .spb-logo-tall {
          height: 44px;
        }

        @media (max-width: 768px) {
          .spb-section {
            padding: 60px 0;
          }

          .spb-marquee {
            gap: 48px;
          }

          .spb-logo-svg {
            height: 28px;
          }

          .spb-logo-item {
            min-width: 80px;
          }
        }
      `}</style>
    </section>
  );
}
