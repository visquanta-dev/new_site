import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SocialProofBar from '@/components/SocialProofBar';
import PlatformSection from '@/components/PlatformSection';
import SeeItInAction from '@/components/SeeItInAction';
import HowItWorksSection from '@/components/HowItWorksSection';
import TrustSection from '@/components/TrustSection';
import AutoMasterSection from '@/components/AutoMasterSection';
import ResultsProof from '@/components/ResultsProof';
import IntegrationsSection from '@/components/IntegrationsSection';
import FAQSection from '@/components/FAQSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      {/* 1. Hero */}
      <Hero />
      {/* 2. Social Proof Bar (Logo Marquee) */}
      <SocialProofBar />
      {/* 3. Five Capabilities - One System */}
      <PlatformSection />
      {/* 4. See It In Action (Tabbed Conversations) */}
      <SeeItInAction />
      {/* 5. From Signup to ROI in Days */}
      <HowItWorksSection />
      {/* 6. What's Costing Your Dealership Sales? */}
      <TrustSection />
      {/* 7. Built by Car People / Who We Are */}
      <AutoMasterSection />
      {/* 8. Results & Proof (Bento Grid) */}
      <ResultsProof />
      {/* 9. Plug & Play Integrations */}
      <IntegrationsSection />
      {/* 10. FAQ (AEO-Optimized) */}
      <FAQSection />
      {/* 11. Final CTA */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
