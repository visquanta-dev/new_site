import Link from 'next/link';
import { ReactNode } from 'react';

interface ProductCardProps {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  stat: string;
  statValue?: string;
  isVisible?: boolean;
  delay?: number;
}

export default function ProductCard({
  number,
  icon,
  title,
  description,
  stat,
  isVisible = true,
  delay = 0
}: ProductCardProps) {
  return (
    <div
      className={`product-card ${isVisible ? 'animate-fade-scale' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Spec Sheet Number Badge */}
      <div className="spec-badge">
        <span className="spec-badge-label">SPEC</span>
        <span className="spec-badge-number">{number}</span>
      </div>

      {/* Technical Corner Marks */}
      <div className="corner-mark top-right"></div>

      <div className="product-icon">
        {icon}
      </div>

      <h3 className="product-title">{title}</h3>
      <p className="product-description">{description}</p>

      {/* Performance Stat - Like a vehicle spec */}
      <div className="product-stat-block">
        <div className="stat-indicator"></div>
        <div className="product-stat">{stat}</div>
      </div>

      <Link href="#" className="product-link">
        <span>View Specifications</span>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </div>
  );
}
