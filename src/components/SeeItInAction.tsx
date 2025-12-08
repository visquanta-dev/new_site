"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "lead-loss", label: "Lead Loss" },
  { id: "speed-to-lead", label: "Speed to Lead" },
  { id: "service-drive", label: "Service Drive" },
  { id: "reviews", label: "Reviews" },
];

const tabContent = {
  "lead-loss": {
    conversation: [
      { sender: "ai", text: "Hi John, this is Sarah from Norman Hyundai. You inquired about a Tucson a few months back — still in the market?" },
      { sender: "user", text: "Actually yeah, my lease is up next month" },
      { sender: "ai", text: "Perfect timing! We have great incentives right now. Would Tuesday or Thursday work for a test drive?" },
      { sender: "user", text: "Thursday works" },
      { sender: "ai", text: "You're set for Thursday at 2pm. See you then!" },
    ],
    headline: "Revive Dead Leads Automatically",
    body: "Your CRM is full of aged leads your team gave up on. AutoMaster re-engages them with natural AI conversations — turning forgotten contacts into booked appointments.",
    stats: ["30%+ leads re-engaged", "5-11% increase in monthly sales", "$0 extra ad spend"],
    cta: { label: "Learn More About Lead Loss Mitigation", href: "/lead-loss-mitigation" },
  },
  "speed-to-lead": {
    conversation: [
      { sender: "system", text: "9:47 PM" },
      { sender: "ai", text: "Hi Maria! Thanks for your interest in the 2024 Sonata. Looking to buy or lease?" },
      { sender: "user", text: "Lease, what's the monthly?" },
      { sender: "ai", text: "Great choice! Leases from $299/mo. Want me to book a test drive this week?" },
      { sender: "user", text: "Yes tomorrow if possible" },
      { sender: "ai", text: "Done! Tomorrow at 11am — ask for Mike in sales." },
    ],
    headline: "Respond in Seconds, Not Hours",
    body: "78% of buyers choose the first dealership to respond. AutoMaster engages every lead instantly — day or night — so you never lose to a faster competitor.",
    stats: ["Response in under 60 seconds", "76% after-hours conversion lift", "93% faster than manual follow-up"],
    cta: { label: "Learn More About Speed to Lead", href: "/speed-to-lead" },
  },
  "service-drive": {
    conversation: [
      { sender: "ai", text: "Hi Tom, your Elantra is due for its 30K service. Want me to schedule that?" },
      { sender: "user", text: "Yeah what's available" },
      { sender: "ai", text: "Friday 9am or Monday 2pm work?" },
      { sender: "user", text: "Friday works" },
      { sender: "ai", text: "Confirmed for Friday 9am. We'll text a reminder the day before." },
    ],
    headline: "Fill Your Service Bays on Autopilot",
    body: "Automated service reminders and scheduling — no phone tag, no missed appointments. Keep customers coming back without lifting a finger.",
    stats: ["Automated service reminders", "Self-scheduling via SMS", "Higher service retention"],
    cta: { label: "Learn More About Service Drive", href: "/service-drive" },
  },
  "reviews": {
    conversation: [
      { sender: "ai", text: "Hi Sarah! Thanks for choosing Genesis of Norman for your GV70. How was your experience?" },
      { sender: "user", text: "Amazing! David was so helpful" },
      { sender: "ai", text: "So glad to hear it! Would you mind leaving a quick Google review?" },
      { sender: "user", text: "Sure, happy to!" },
    ],
    headline: "Turn Happy Customers into 5-Star Reviews",
    body: "Automatically request reviews after every sale and service. Catch negative feedback before it goes public. Boost your CSI scores without manual follow-up.",
    stats: ["75% increase in 5-star reviews", "0.6 CSI score lift in 90 days", "Negative feedback flagged instantly"],
    cta: { label: "Learn More About Reputation Management", href: "/reputation-management" },
  },
};

interface Message {
  sender: "ai" | "user" | "system";
  text: string;
}

interface PhoneMockupProps {
  conversation: Message[];
}

function PhoneMockup({ conversation }: PhoneMockupProps) {
  return (
    <div className="relative">
      {/* iPhone Frame */}
      <div className="w-[280px] md:w-[320px] bg-[#1A1A1A] rounded-[40px] p-3 shadow-2xl border border-[#2A2A2A]">

        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#0A0A0A] rounded-b-2xl" />

        {/* Screen */}
        <div className="bg-[#0A0A0A] rounded-[32px] overflow-hidden">

          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-2 text-white text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3a9 9 0 019 9h-2a7 7 0 00-7-7V3z"/>
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 4h3v16h-3V4zM5 14h3v6H5v-6zm6-4h3v10h-3V10z"/>
              </svg>
            </div>
          </div>

          {/* Chat Header */}
          <div className="px-4 py-3 border-b border-[#2A2A2A] flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">AutoMaster AI</p>
              <p className="text-green-500 text-xs">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[380px] md:h-[420px] overflow-y-auto p-4 space-y-3">
            {conversation.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "system" ? (
                  <span className="text-gray-500 text-xs w-full text-center">
                    {message.text}
                  </span>
                ) : (
                  <div
                    className={`
                      max-w-[85%] px-4 py-2.5 rounded-2xl text-sm
                      ${message.sender === "ai"
                        ? "bg-orange-500 text-white rounded-bl-md"
                        : "bg-[#2A2A2A] text-white rounded-br-md"
                      }
                    `}
                  >
                    {message.text}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="px-4 py-3 border-t border-[#2A2A2A]">
            <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-white text-sm outline-none"
                disabled
              />
              <button className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SeeItInAction() {
  const [activeTab, setActiveTab] = useState("lead-loss");
  const content = tabContent[activeTab as keyof typeof tabContent];

  return (
    <section className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
            Live Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            See It In Action
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Watch how AutoMaster Suite handles real conversations — 24/7
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#141414] rounded-full p-1.5 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid - THIS IS THE CRITICAL PART */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Phone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <PhoneMockup conversation={content.conversation} key={activeTab} />
          </div>

          {/* RIGHT: Content Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                {content.headline}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed">
                {content.body}
              </p>

              <ul className="space-y-3">
                {content.stats.map((stat, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white">{stat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={content.cta.href}
                className="inline-flex items-center gap-2 text-orange-500 font-medium hover:text-orange-400 transition-colors mt-4"
              >
                {content.cta.label}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
