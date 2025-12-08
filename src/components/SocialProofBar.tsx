'use client';

import { motion } from 'framer-motion';

const brands = [
  { name: 'Kia', logo: '/images/logos/kia.svg' },
  { name: 'Nissan', logo: '/images/logos/nissan.svg' },
  { name: 'GMC', logo: '/images/logos/gmc.svg' },
  { name: 'Mazda', logo: '/images/logos/mazda.svg' },
  { name: 'Cadillac', logo: '/images/logos/cadillac.svg' },
  { name: 'Hyundai', logo: '/images/logos/hyundai.svg' },
  { name: 'Chevrolet', logo: '/images/logos/chevrolet.svg' },
  { name: 'Ford', logo: '/images/logos/ford.svg' },
  { name: 'Toyota', logo: '/images/logos/toyota.svg' },
  { name: 'Honda', logo: '/images/logos/honda.svg' },
  { name: 'Genesis', logo: '/images/logos/genesis.svg' },
  { name: 'Volkswagen', logo: '/images/logos/volkswagen.svg' },
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
                <span className="spb-logo-text">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
