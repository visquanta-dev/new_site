"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

// ===========================================
// DATA
// ===========================================

const tabs = [
  { id: "lead-loss", label: "Lead Loss" },
  { id: "speed-to-lead", label: "Speed to Lead" },
  { id: "service-drive", label: "Service Drive" },
  { id: "reviews", label: "Reviews" },
];

const tabContent: Record<string, {
  conversation: Array<{ sender: "ai" | "user" | "system"; text: string }>;
  customerName: string;
  headline: string;
  body: string;
  stats: string[];
  cta: { label: string; href: string };
}> = {
  "lead-loss": {
    customerName: "John",
    conversation: [
      { sender: "ai", text: "Hi John! You inquired about a Tucson a few months back — still in the market?" },
      { sender: "user", text: "Yeah, my lease is up next month" },
      { sender: "ai", text: "Great timing! Would Thursday work for a test drive?" },
      { sender: "user", text: "Thursday works" },
      { sender: "ai", text: "You're set for Thursday at 2pm. See you then!" },
    ],
    headline: "Revive Dead Leads Automatically",
    body: "Your CRM is full of aged leads your team gave up on. AutoMaster re-engages them with natural AI conversations — turning forgotten contacts into booked appointments.",
    stats: ["30%+ leads re-engaged", "5-11% increase in monthly sales", "$0 extra ad spend"],
    cta: { label: "Learn More About Lead Loss Mitigation", href: "/lead-loss-mitigation" },
  },
  "speed-to-lead": {
    customerName: "Maria",
    conversation: [
      { sender: "system", text: "AutoTrader Lead • 9:47 PM" },
      { sender: "ai", text: "Hi Maria! Saw your inquiry on the Tucson. Still interested?" },
      { sender: "user", text: "Yes! Can I see it tomorrow?" },
      { sender: "ai", text: "Absolutely! 11am or 3pm?" },
      { sender: "user", text: "11am works" },
      { sender: "ai", text: "Done! Ask for Mike 👍" },
    ],
    headline: "Respond in Seconds, Not Hours",
    body: "78% of buyers choose the first dealership to respond. AutoMaster engages every lead instantly — day or night — so you never lose to a faster competitor.",
    stats: ["Response in under 60 seconds", "76% after-hours conversion lift", "93% faster than manual follow-up"],
    cta: { label: "Learn More About Speed to Lead", href: "/speed-to-lead" },
  },
  "service-drive": {
    customerName: "Tom",
    conversation: [
      { sender: "ai", text: "Hi Tom, your Elantra is due for its 30K service. Want to schedule?" },
      { sender: "user", text: "Yeah what's available?" },
      { sender: "ai", text: "Friday 9am or Monday 2pm?" },
      { sender: "user", text: "Friday works" },
      { sender: "ai", text: "Confirmed for Friday 9am!" },
    ],
    headline: "Fill Your Service Bays on Autopilot",
    body: "Automated service reminders and scheduling — no phone tag, no missed appointments. Keep customers coming back without lifting a finger.",
    stats: ["Automated service reminders", "Self-scheduling via SMS", "Higher service retention"],
    cta: { label: "Learn More About Service Drive", href: "/service-drive" },
  },
  "reviews": {
    customerName: "Sarah",
    conversation: [
      { sender: "ai", text: "Hi Sarah! How was your experience with your new GV70?" },
      { sender: "user", text: "Amazing! David was so helpful" },
      { sender: "ai", text: "So glad! Would you leave us a quick Google review?" },
      { sender: "user", text: "Sure, happy to!" },
      { sender: "ai", text: "Thanks Sarah! Here's the link 🙏" },
    ],
    headline: "Turn Happy Customers into 5-Star Reviews",
    body: "Automatically request reviews after every sale and service. Catch negative feedback before it goes public. Boost your CSI scores without manual follow-up.",
    stats: ["75% increase in 5-star reviews", "0.6 CSI score lift in 90 days", "Negative feedback flagged instantly"],
    cta: { label: "Learn More About Reputation Management", href: "/reputation-management" },
  },
};

// ===========================================
// AUTO-PLAYING CHAT COMPONENT
// ===========================================

function AutoPlayChat({ 
  conversation,
  tabId,
  customerName
}: { 
  conversation: Array<{ sender: "ai" | "user" | "system"; text: string }>;
  tabId: string;
  customerName: string;
}) {
  const [isPaused, setIsPaused] = useState(false);

  // Double the conversation for seamless loop
  const doubledConversation = [...conversation, ...conversation];

  return (
    <div 
      className="h-[320px] overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient fade at top */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      
      {/* Scrolling container */}
      <motion.div
        className="flex flex-col gap-3 px-3 py-4"
        animate={{
          y: isPaused ? undefined : [0, "-50%"]
        }}
        transition={{
          y: {
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }
        }}
        style={{ willChange: "transform" }}
      >
        {doubledConversation.map((message, index) => (
          <div
            key={`${tabId}-${index}`}
            className={`flex ${
              message.sender === "user" 
                ? "justify-end" 
                : message.sender === "system" 
                  ? "justify-center" 
                  : "justify-start"
            }`}
          >
            {message.sender === "system" ? (
              <span className="text-gray-500 text-[10px] py-1 px-3 bg-white/5 rounded-full">
                {message.text}
              </span>
            ) : (
              <div className={`flex gap-2 max-w-[90%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold ${
                  message.sender === "ai" 
                    ? "bg-gradient-to-br from-orange-500 to-orange-600 text-white" 
                    : "bg-zinc-500 text-white"
                }`}>
                  {message.sender === "ai" ? "AI" : customerName.charAt(0)}
                </div>
                
                {/* Message Content */}
                <div className={`flex flex-col gap-0.5 ${message.sender === "user" ? "items-end" : "items-start"}`}>
                  {/* Name Label */}
                  <span className={`text-[10px] font-medium px-1 ${
                    message.sender === "ai" 
                      ? "text-orange-400" 
                      : "text-zinc-400"
                  }`}>
                    {message.sender === "ai" ? "AutoMaster AI" : customerName}
                  </span>
                  {/* Message Bubble */}
                  <div
                    className={`px-3 py-2 text-[12px] leading-relaxed ${
                      message.sender === "ai"
                        ? "bg-white text-black rounded-2xl rounded-tl-sm shadow-md"
                        : "bg-zinc-600 text-white rounded-2xl rounded-tr-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ===========================================
// PHONE MOCKUP
// ===========================================

function PhoneMockup({ 
  conversation,
  tabId,
  customerName
}: { 
  conversation: Array<{ sender: "ai" | "user" | "system"; text: string }>;
  tabId: string;
  customerName: string;
}) {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-full" />
      
      {/* Phone Frame */}
      <div 
        className="relative w-[300px] sm:w-[320px] rounded-[50px] p-[4px]"
        style={{
          background: "linear-gradient(145deg, #2a2a2c 0%, #1a1a1c 50%, #0f0f10 100%)",
          boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.05)"
        }}
      >
        {/* Inner bezel */}
        <div 
          className="rounded-[46px] p-[8px]"
          style={{ background: "#0a0a0a" }}
        >
          {/* Screen */}
          <div 
            className="rounded-[40px] overflow-hidden bg-[#0a0a0a]"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)" }}
          >
            {/* Dynamic Island */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-[90px] h-[26px] bg-black rounded-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#1a1a1a] mr-6" />
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 py-1">
              <span className="text-white text-[13px] font-semibold">9:41</span>
              <div className="flex items-center gap-1.5">
                <svg width="16" height="11" viewBox="0 0 18 12" fill="white">
                  <rect x="0" y="7" width="3" height="5" rx="0.5" fillOpacity="0.3"/>
                  <rect x="5" y="4" width="3" height="8" rx="0.5" fillOpacity="0.5"/>
                  <rect x="10" y="2" width="3" height="10" rx="0.5" fillOpacity="0.7"/>
                  <rect x="15" y="0" width="3" height="12" rx="0.5"/>
                </svg>
                <svg width="14" height="10" viewBox="0 0 16 12" fill="white">
                  <path d="M8 10a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"/>
                  <path d="M4.5 7.5c1-.7 2.2-1.2 3.5-1.2s2.5.5 3.5 1.2" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  <path d="M1.5 4.5c1.8-1.2 4-1.9 6.5-1.9s4.7.7 6.5 1.9" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                </svg>
                <div className="flex items-center">
                  <div className="w-[22px] h-[10px] rounded-sm border border-white/50 p-[1px]">
                    <div className="w-[65%] h-full bg-white rounded-sm"/>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-[14px]">AutoMaster AI</p>
                <p className="text-green-500 text-[11px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online
                </p>
              </div>
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>

            {/* Auto-Playing Messages */}
            <AutoPlayChat conversation={conversation} tabId={tabId} customerName={customerName} />

            {/* Input Bar */}
            <div className="px-3 py-2.5 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className="flex-1 bg-[#1c1c1e] rounded-full px-4 py-2 border border-white/10">
                  <span className="text-gray-500 text-sm">Type a message...</span>
                </div>
                <button className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center py-2">
              <div className="w-28 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Side Buttons */}
      <div className="absolute -right-[3px] top-[100px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-r" />
      <div className="absolute -left-[3px] top-[75px] w-[3px] h-[25px] bg-[#2a2a2a] rounded-l" />
      <div className="absolute -left-[3px] top-[110px] w-[3px] h-[25px] bg-[#2a2a2a] rounded-l" />
      <div className="absolute -left-[3px] top-[145px] w-[3px] h-[25px] bg-[#2a2a2a] rounded-l" />
    </div>
  );
}

// ===========================================
// MAIN COMPONENT
// ===========================================

export function SeeItInAction() {
  const [activeTab, setActiveTab] = useState("lead-loss");
  const content = tabContent[activeTab];

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Live Demo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch how AutoMaster Suite handles real conversations — 24/7
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-[#141414] rounded-full border border-[#2A2A2A]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-5 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id 
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25" 
                    : "text-gray-400 hover:text-white hover:bg-[#1A1A1A]"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Phone */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup 
              conversation={content.conversation} 
              tabId={activeTab}
              customerName={content.customerName}
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                  {content.headline}
                </h3>
                
                <p className="text-gray-400 text-lg leading-relaxed">
                  {content.body}
                </p>
                
                <ul className="space-y-4">
                  {content.stats.map((stat) => (
                    <li key={stat} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                        <Check className="w-3.5 h-3.5 text-orange-500" strokeWidth={3} />
                      </div>
                      <span className="text-white font-medium">{stat}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={content.cta.href}
                  className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-400 transition-colors group pt-2"
                >
                  {content.cta.label}
                  <svg 
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SeeItInAction;
