'use client';

import { useEffect, useRef, useState } from 'react';

export default function TrustSection() {
  const logos = ['Genesis', 'Volkswagen', 'Hyundai', 'Honda', 'Seth Wadley'];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="trust-section">
      <div className="trust-content">
        <p className={`trust-label ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          Trusted by leading dealerships nationwide
        </p>
        <div className="trust-logos">
          {logos.map((logo, index) => (
            <span
              key={logo}
              className={`trust-logo ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
