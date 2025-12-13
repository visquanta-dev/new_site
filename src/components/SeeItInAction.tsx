"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const tabs = [
  { id: "lead-loss", label: "Lead Loss" },
  { id: "speed-to-lead", label: "Speed to Lead" },
  { id: "reviews", label: "Reviews" },
  { id: "service-drive", label: "Service Drive" },
];

type MessageSender = "ai" | "user" | "system";

interface ConversationMessage {
  sender: MessageSender;
  text: string;
  delay: number;
}

interface TabContentItem {
  customerName: string;
  conversation: ConversationMessage[];
  headline: string;
  body: string;
  stats: string[];
  cta: { label: string; href: string };
}

const tabContent: Record<string, TabContentItem> = {
  "lead-loss": {
    customerName: "John",
    conversation: [
      { sender: "ai", text: "Hi John, it's Amy at Westline Motors. Saw you'd looked at the Tucson a little while back — still shopping around?", delay: 0 },
      { sender: "user", text: "Yeah, my lease is up next month.", delay: 2500 },
      { sender: "ai", text: "Got it. Want to swing by for a quick test drive? Thursday could work.", delay: 4500 },
      { sender: "user", text: "Thursday works.", delay: 6500 },
      { sender: "ai", text: "Perfect. I'll book you in for Thursday at 2pm. See you then!", delay: 8000 },
    ],
    headline: "Revive Dead Leads Automatically",
    body: "Your CRM is full of aged leads your team gave up on. AutoMaster re-engages them with natural AI conversations — turning forgotten contacts into booked appointments.",
    stats: ["30%+ leads re-engaged", "5-11% increase in monthly sales", "$0 extra ad spend"],
    cta: { label: "Learn More About Lead Loss Mitigation", href: "/lead-loss-mitigation" },
  },
  "speed-to-lead": {
    customerName: "Maria",
    conversation: [
      { sender: "system", text: "New Lead • AutoTrader • Just Now", delay: 0 },
      { sender: "ai", text: "Hi Maria, it's Amy over at Westline Motors. I just picked up your AutoTrader enquiry about the Tucson — would you like to pop in and see it?", delay: 1500 },
      { sender: "user", text: "Yes! Can I come tomorrow?", delay: 4000 },
      { sender: "ai", text: "Absolutely. We've got 11am or 3pm open.", delay: 5500 },
      { sender: "user", text: "11am works.", delay: 7500 },
      { sender: "ai", text: "Great. I'll get you down for 11am. When you arrive, just ask for Amy.", delay: 9000 },
    ],
    headline: "Respond in Seconds, Not Hours",
    body: "78% of buyers choose the first dealership to respond. AutoMaster engages every lead instantly — day or night — so you never lose to a faster competitor.",
    stats: ["Response in under 60 seconds", "76% after-hours conversion lift", "93% faster than manual follow-up"],
    cta: { label: "Learn More About Speed to Lead", href: "/speed-to-lead" },
  },
  "reviews": {
    customerName: "Sarah",
    conversation: [
      { sender: "ai", text: "Hi Sarah, it's Amy at Westline Motors. Hope you're loving the new GV70. How was everything for you?", delay: 0 },
      { sender: "user", text: "Amazing! David was so helpful.", delay: 2500 },
      { sender: "ai", text: "That's great to hear. If you've got a moment, would you mind leaving us a quick Google review?", delay: 4500 },
      { sender: "user", text: "Sure, happy to!", delay: 6500 },
      { sender: "ai", text: "Thank you so much. Here's the link: g.page/yourdealer 🙏", delay: 8000 },
    ],
    headline: "Turn Happy Customers into 5-Star Reviews",
    body: "Automatically request reviews after every sale and service. Catch negative feedback before it goes public. Boost your CSI scores without manual follow-up.",
    stats: ["75% increase in 5-star reviews", "0.6 CSI score lift in 90 days", "Negative feedback flagged instantly"],
    cta: { label: "Learn More About Reputation Management", href: "/reputation-management" },
  },
  "service-drive": {
    customerName: "Tom",
    conversation: [
      { sender: "ai", text: "Thanks for calling Norman Hyundai Service. How can I help you today?", delay: 0 },
      { sender: "user", text: "I need to book my Elantra for its 30,000 mile service.", delay: 2500 },
      { sender: "ai", text: "Of course! Let me check availability. Can I get your name?", delay: 4500 },
      { sender: "user", text: "Tom Mitchell", delay: 6500 },
      { sender: "ai", text: "Thanks Tom. I've got Friday at 9am or Monday at 2pm. Which works?", delay: 8000 },
      { sender: "user", text: "Friday morning", delay: 10000 },
      { sender: "ai", text: "Perfect, you're all set for Friday at 9am. See you then!", delay: 11500 },
    ],
    headline: "Fill Your Service Bays on Autopilot",
    body: "Our Voice AI answers every call instantly — 24/7. No hold times, no missed calls, no frustrated customers. Just seamless scheduling that sounds completely human.",
    stats: ["Zero missed service calls", "24/7 instant answering", "Sounds 100% human"],
    cta: { label: "Learn More About Service Drive AI", href: "/service-drive-ai" },
  },
};

// Typing indicator component
function TypingIndicator() {
  return (
    <div style={{
      display: "flex",
      gap: "4px",
      padding: "14px 18px",
      background: "#e9e9eb",
      borderRadius: "20px",
      borderBottomLeftRadius: "6px",
      width: "fit-content",
      boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
    }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "#8e8e93"
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Voice Call Modal Component
function VoiceCallModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
          borderRadius: "20px",
          maxWidth: "580px",
          width: "95%",
          boxShadow: "0 50px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%)",
          borderBottom: "1px solid rgba(249,115,22,0.2)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 20px rgba(249,115,22,0.4)"
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: "white", fontSize: "18px", fontWeight: 600, margin: 0 }}>Inbound Service Call</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: "2px 0 0" }}>Today at 2:34 PM • 01:47 duration</p>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(52,199,89,0.15)",
            border: "1px solid rgba(52,199,89,0.3)",
            borderRadius: "20px",
            padding: "6px 14px"
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#34c759" }} />
            <span style={{ color: "#34c759", fontSize: "13px", fontWeight: 600 }}>Appointment Set</span>
          </div>
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.5)",
              fontSize: "18px",
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* Caller Info */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
              <div style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3a3a3c 0%, #2c2c2e 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 600,
                color: "white",
                border: "2px solid rgba(255,255,255,0.1)"
              }}>TM</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "white", fontSize: "18px", fontWeight: 600, margin: 0 }}>Tom Mitchell</p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", margin: "2px 0 0" }}>(405) 555-0187</p>
              </div>
              <div style={{
                background: "rgba(249,115,22,0.1)",
                border: "1px solid rgba(249,115,22,0.25)",
                borderRadius: "6px",
                padding: "4px 10px"
              }}>
                <span style={{ color: "#f97316", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Returning Customer</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "12px" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Vehicle</p>
                <p style={{ color: "white", fontSize: "14px", margin: "4px 0 0", fontWeight: 500 }}>2022 Hyundai Elantra</p>
              </div>
              <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "12px" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>VIN (Last 6)</p>
                <p style={{ color: "white", fontSize: "14px", margin: "4px 0 0", fontWeight: 500 }}>...H84923</p>
              </div>
              <div style={{ flex: 1, background: "rgba(0,0,0,0.3)", borderRadius: "8px", padding: "12px" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Mileage</p>
                <p style={{ color: "white", fontSize: "14px", margin: "4px 0 0", fontWeight: 500 }}>31,247 mi</p>
              </div>
            </div>
          </div>

          {/* Call Summary */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <p style={{ color: "white", fontSize: "14px", fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Call Summary</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 6px", textTransform: "uppercase" }}>Reason for Call</p>
                <p style={{ color: "white", fontSize: "15px", margin: 0, fontWeight: 500 }}>30,000 Mile Service</p>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 6px", textTransform: "uppercase" }}>Service Type</p>
                <p style={{ color: "white", fontSize: "15px", margin: 0, fontWeight: 500 }}>Scheduled Maintenance</p>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 6px", textTransform: "uppercase" }}>Appointment</p>
                <p style={{ color: "#34c759", fontSize: "15px", margin: 0, fontWeight: 500 }}>Friday, 9:00 AM</p>
              </div>
              <div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 6px", textTransform: "uppercase" }}>Estimated RO Value</p>
                <p style={{ color: "white", fontSize: "15px", margin: 0, fontWeight: 500 }}>$389.00</p>
              </div>
            </div>

            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 8px", textTransform: "uppercase" }}>AI Notes</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0, lineHeight: 1.6 }}>
                Customer called to schedule routine 30K service. Confirmed Friday 9AM appointment. Customer mentioned hearing a slight squeak when braking — flagged for technician to inspect brake pads during service.
              </p>
            </div>
          </div>

          {/* Audio Player */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "14px",
            padding: "20px",
            border: "1px solid rgba(255,255,255,0.06)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
              </svg>
              <p style={{ color: "white", fontSize: "14px", fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Call Recording</p>
              <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>01:47</span>
            </div>

            {/* Waveform visualization */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              height: "50px",
              marginBottom: "16px",
              background: "rgba(0,0,0,0.3)",
              borderRadius: "8px",
              padding: "0 16px"
            }}>
              {[3, 6, 10, 5, 12, 7, 9, 5, 11, 7, 13, 5, 9, 7, 11, 5, 7, 9, 5, 12, 7, 10, 5, 8, 3, 6, 10, 5, 12, 7, 9, 5, 11, 7, 13, 5, 9, 7, 11, 5].map((h, i) => (
                <div key={i} style={{
                  width: "3px",
                  height: `${h * 3}px`,
                  background: i < 15 ? "linear-gradient(180deg, #f97316 0%, rgba(249,115,22,0.5) 100%)" : "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)",
                  borderRadius: "2px"
                }} />
              ))}
            </div>

            <audio controls style={{ width: "100%", height: "40px" }} src="/audio/service-call.mp3">
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
            <button style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "white",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download
            </button>
            <button style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: "10px",
              border: "none",
              background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Open in DMS
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SeeItInAction() {
  const [activeTab, setActiveTab] = useState("lead-loss");
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingFor, setTypingFor] = useState<"ai" | "user" | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  const content: TabContentItem = tabContent[activeTab];
  const isServiceDrive = activeTab === "service-drive";

  // Timer for voice call
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isServiceDrive) {
      interval = setInterval(() => {
        setCallSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setCallSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isServiceDrive]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 100, damping: 30 });

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Live typing simulation with continuous loop
  useEffect(() => {
    const conversation = content.conversation;
    let timeouts: NodeJS.Timeout[] = [];
    let loopInterval: NodeJS.Timeout;

    const runConversation = () => {
      // Clear previous state
      setVisibleMessages([]);
      setIsTyping(false);
      setTypingFor(null);

      // Clear any existing timeouts
      timeouts.forEach(t => clearTimeout(t));
      timeouts = [];

      conversation.forEach((msg, index) => {
        // Show typing indicator before message
        const typingTimeout = setTimeout(() => {
          setIsTyping(true);
          setTypingFor(msg.sender as "ai" | "user");
        }, msg.delay);
        timeouts.push(typingTimeout);

        // Show actual message
        const messageTimeout = setTimeout(() => {
          setIsTyping(false);
          setTypingFor(null);
          setVisibleMessages(prev => [...prev, index]);
        }, msg.delay + (msg.sender === "ai" ? 1200 : 800));
        timeouts.push(messageTimeout);
      });
    };

    // Start first conversation
    runConversation();

    // Calculate total duration and loop
    const lastMessage = conversation[conversation.length - 1];
    const totalDuration = lastMessage.delay + 1200 + 2500; // last delay + typing time + pause before restart

    loopInterval = setInterval(() => {
      runConversation();
    }, totalDuration);

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      clearInterval(loopInterval);
    };
  }, [activeTab, content.conversation]);

  // Auto-scroll messages to bottom when new messages appear
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleMessages, isTyping]);

  return (
    <section
      style={{ padding: "140px 0 120px", backgroundColor: "#050505", position: "relative", overflow: "hidden" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Layered Background Effects */}
      {/* Base gradient */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 50%)",
        pointerEvents: "none"
      }} />

      {/* SVG Wireframe Car Blueprint Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        {/* Large wireframe car - left side */}
        <svg
          style={{
            position: "absolute",
            left: "-5%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "45%",
            height: "auto",
            opacity: 0.04,
          }}
          viewBox="0 0 800 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sedan wireframe */}
          <g stroke="rgba(249,115,22,1)" strokeWidth="1.5">
            {/* Body outline */}
            <path d="M50 200 L80 200 L100 180 L180 140 L280 120 L400 115 L520 120 L620 130 L680 150 L720 180 L750 200 L780 200" fill="none" />
            {/* Roof line */}
            <path d="M180 140 L200 100 L350 85 L480 85 L550 100 L620 130" fill="none" />
            {/* Windows */}
            <path d="M210 105 L220 140 L350 135 L350 90 L220 95 Z" fill="none" strokeWidth="1" />
            <path d="M360 90 L360 135 L490 130 L540 105 L480 90 Z" fill="none" strokeWidth="1" />
            {/* Hood lines */}
            <path d="M100 180 L150 175 L180 140" fill="none" strokeWidth="1" />
            {/* Trunk lines */}
            <path d="M620 130 L650 140 L680 150" fill="none" strokeWidth="1" />
            {/* Door lines */}
            <line x1="350" y1="90" x2="350" y2="190" strokeWidth="1" />
            <line x1="490" y1="95" x2="500" y2="190" strokeWidth="1" />
            {/* Wheel wells */}
            <path d="M120 200 Q120 160 180 160 Q240 160 240 200" fill="none" />
            <path d="M560 200 Q560 160 620 160 Q680 160 680 200" fill="none" />
            {/* Ground line */}
            <line x1="30" y1="200" x2="800" y2="200" strokeWidth="0.5" strokeDasharray="10 5" />
            {/* Detail lines */}
            <path d="M100 185 L250 175" fill="none" strokeWidth="0.5" />
            <path d="M550 175 L700 185" fill="none" strokeWidth="0.5" />
            {/* Headlight */}
            <ellipse cx="90" cy="175" rx="15" ry="10" strokeWidth="1" />
            {/* Taillight */}
            <rect x="735" y="170" width="20" height="15" rx="3" strokeWidth="1" />
            {/* Mirror */}
            <ellipse cx="200" cy="130" rx="8" ry="5" strokeWidth="0.75" />
            {/* Door handles */}
            <line x1="300" y1="155" x2="330" y2="155" strokeWidth="1" />
            <line x1="420" y1="155" x2="450" y2="155" strokeWidth="1" />
          </g>
          {/* Blueprint grid marks */}
          <g stroke="rgba(249,115,22,0.5)" strokeWidth="0.5">
            <line x1="0" y1="100" x2="20" y2="100" />
            <line x1="0" y1="150" x2="20" y2="150" />
            <line x1="0" y1="200" x2="20" y2="200" />
            <line x1="100" y1="220" x2="100" y2="240" />
            <line x1="400" y1="220" x2="400" y2="240" />
            <line x1="700" y1="220" x2="700" y2="240" />
          </g>
        </svg>

        {/* SUV wireframe - right side */}
        <svg
          style={{
            position: "absolute",
            right: "-8%",
            top: "55%",
            transform: "translateY(-50%) scaleX(-1)",
            width: "50%",
            height: "auto",
            opacity: 0.03,
          }}
          viewBox="0 0 800 350"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SUV wireframe */}
          <g stroke="rgba(249,115,22,1)" strokeWidth="1.5">
            {/* Body outline */}
            <path d="M50 250 L80 250 L100 220 L140 180 L200 140 L280 110 L520 110 L620 120 L700 160 L740 200 L760 250 L780 250" fill="none" />
            {/* Roof line - boxier for SUV */}
            <path d="M200 140 L220 90 L600 90 L620 120" fill="none" />
            {/* Windows - larger for SUV */}
            <path d="M230 95 L240 135 L380 130 L380 95 Z" fill="none" strokeWidth="1" />
            <path d="M390 95 L390 130 L530 125 L530 95 Z" fill="none" strokeWidth="1" />
            <path d="M540 95 L540 125 L600 120 L600 95 Z" fill="none" strokeWidth="1" />
            {/* Hood */}
            <path d="M100 220 L140 180 L200 140" fill="none" strokeWidth="1" />
            {/* Rear */}
            <path d="M620 120 L700 160" fill="none" strokeWidth="1" />
            {/* Door lines */}
            <line x1="380" y1="95" x2="380" y2="240" strokeWidth="1" />
            <line x1="530" y1="95" x2="540" y2="240" strokeWidth="1" />
            {/* Wheel wells - larger */}
            <path d="M100 250 Q100 190 180 190 Q260 190 260 250" fill="none" />
            <path d="M540 250 Q540 190 620 190 Q700 190 700 250" fill="none" />
            {/* Ground line */}
            <line x1="30" y1="250" x2="800" y2="250" strokeWidth="0.5" strokeDasharray="10 5" />
            {/* Roof rails */}
            <line x1="240" y1="85" x2="580" y2="85" strokeWidth="1" />
            {/* Headlights */}
            <rect x="75" y="205" width="25" height="20" rx="3" strokeWidth="1" />
            {/* Taillights */}
            <rect x="740" y="185" width="15" height="30" rx="2" strokeWidth="1" />
            {/* Side detail */}
            <path d="M140 200 L700 180" fill="none" strokeWidth="0.5" />
            {/* Grille */}
            <rect x="60" y="225" width="35" height="20" rx="2" strokeWidth="1" />
          </g>
        </svg>

        {/* Small sports car wireframe - top accent */}
        <svg
          style={{
            position: "absolute",
            right: "15%",
            top: "8%",
            width: "20%",
            height: "auto",
            opacity: 0.025,
          }}
          viewBox="0 0 400 150"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sports car wireframe */}
          <g stroke="rgba(249,115,22,1)" strokeWidth="1">
            <path d="M20 100 L40 100 L60 85 L120 60 L200 50 L280 50 L340 65 L370 85 L390 100" fill="none" />
            <path d="M120 60 L140 40 L240 35 L280 50" fill="none" />
            <path d="M150 42 L155 58 L230 55 L260 45 L240 38 Z" fill="none" strokeWidth="0.75" />
            <path d="M50 100 Q50 75 90 75 Q130 75 130 100" fill="none" />
            <path d="M270 100 Q270 75 310 75 Q350 75 350 100" fill="none" />
          </g>
        </svg>
      </div>

      {/* Blueprint grid overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(249,115,22,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249,115,22,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />

      {/* Ambient orbs */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "-10%",
        width: "500px",
        height: "500px",
        background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 60%)",
        filter: "blur(80px)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "-10%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 60%)",
        filter: "blur(100px)",
        pointerEvents: "none",
      }} />

      {/* Top edge highlight */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.15), transparent)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          {/* Live Demo Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              color: "#f97316",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "24px",
              padding: "12px 24px",
              background: "rgba(249,115,22,0.1)",
              borderRadius: "9999px",
              border: "1px solid rgba(249,115,22,0.3)",
            }}
          >
            <motion.span
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: "#f97316",
                borderRadius: "50%",
              }}
              animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Live Demo
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 700,
              margin: "0 0 20px 0",
              letterSpacing: "-0.03em",
              color: "white",
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            See It In Action
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "19px",
              margin: 0,
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
            }}
          >
            Watch how AutoMaster Suite handles real conversations — 24/7
          </motion.p>
        </div>

        {/* Premium Tabs */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{
              position: "relative",
              display: "inline-flex",
              background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
              borderRadius: "20px",
              padding: "8px",
              border: "1px solid rgba(255,255,255,0.08)",
              gap: "6px",
              boxShadow: `
                0 20px 50px -20px rgba(0,0,0,0.5),
                0 0 0 1px rgba(255,255,255,0.03) inset
              `,
            }}
          >
            {/* Ambient glow behind active tab */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "20px",
              overflow: "hidden",
              pointerEvents: "none",
            }}>
              <motion.div
                animate={{
                  left: `${tabs.findIndex(t => t.id === activeTab) * 25}%`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "25%",
                  height: "100%",
                  background: "radial-gradient(ellipse at center, rgba(249,115,22,0.15) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
            </div>

            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  position: "relative",
                  padding: "14px 28px",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: "transparent",
                  color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.4)",
                  borderRadius: "14px",
                  fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  zIndex: 1,
                }}
              >
                {/* Active background pill */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTabBg"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.08) 100%)",
                      borderRadius: "14px",
                      border: "1px solid rgba(249,115,22,0.3)",
                      boxShadow: "0 4px 20px rgba(249,115,22,0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {/* Active indicator dot */}
                {activeTab === tab.id && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                      position: "absolute",
                      top: "-2px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "4px",
                      height: "4px",
                      background: "#f97316",
                      borderRadius: "50%",
                      boxShadow: "0 0 8px rgba(249,115,22,0.8)",
                    }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{tab.label}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "100px", alignItems: "center" }}>

          {/* 3D Phone */}
          <div style={{ display: "flex", justifyContent: "center", perspective: "1200px" }}>
            <motion.div
              ref={phoneRef}
              style={{
                position: "relative",
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Ambient glow */}
              <div style={{
                position: "absolute",
                inset: "-80px",
                background: "radial-gradient(circle at 50% 40%, rgba(249,115,22,0.2) 0%, transparent 60%)",
                filter: "blur(60px)",
                pointerEvents: "none",
                transform: "translateZ(-50px)"
              }} />

              {/* Listen to a call arrow - only shows for Service Drive */}
              {isServiceDrive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: "absolute",
                    left: "-130px",
                    bottom: "155px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    pointerEvents: "none",
                    zIndex: 100,
                    transform: "translateZ(100px)",
                  }}
                >
                  <span style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "13px",
                    fontWeight: 500,
                    fontStyle: "italic",
                    whiteSpace: "nowrap",
                  }}>
                    Listen to a call
                  </span>
                  <motion.svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    fill="none"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path
                      d="M0 10 L30 10"
                      stroke="rgba(249,115,22,0.8)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M26 4 L36 10 L26 16"
                      stroke="rgba(249,115,22,0.8)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
              )}

              {/* Phone frame */}
              <div style={{
                position: "relative",
                width: "360px",
                padding: "3px",
                borderRadius: "55px",
                background: "linear-gradient(145deg, #48484a 0%, #2c2c2e 20%, #1c1c1e 50%, #0a0a0a 100%)",
                boxShadow: `
                  0 100px 180px -50px rgba(0,0,0,0.9),
                  0 50px 100px -30px rgba(0,0,0,0.7),
                  0 0 0 1px rgba(255,255,255,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.15)
                `,
                transform: "translateZ(20px)"
              }}>
                {/* Inner bezel */}
                <div style={{
                  borderRadius: "52px",
                  padding: "10px",
                  background: "linear-gradient(180deg, #1c1c1e 0%, #0f0f0f 100%)",
                }}>
                  {/* Screen */}
                  <div style={{
                    borderRadius: "44px",
                    overflow: "hidden",
                    background: "#0d0d0d",
                  }}>

                    {/* Dynamic Island */}
                    <div style={{ display: "flex", justifyContent: "center", paddingTop: "14px", paddingBottom: "8px" }}>
                      <div style={{
                        width: "126px",
                        height: "37px",
                        backgroundColor: "#000",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingRight: "14px",
                      }}>
                        <div style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: "radial-gradient(circle at 30% 30%, #1a1a3a, #000)",
                        }} />
                      </div>
                    </div>

                    {/* Status Bar */}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 28px 12px" }}>
                      <span style={{ color: "white", fontSize: "16px", fontWeight: 600 }}>9:41</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                          <rect x="0" y="9" width="3" height="5" rx="1" fill="white"/>
                          <rect x="5" y="6" width="3" height="8" rx="1" fill="white"/>
                          <rect x="10" y="3" width="3" height="11" rx="1" fill="white"/>
                          <rect x="15" y="0" width="3" height="14" rx="1" fill="rgba(255,255,255,0.3)"/>
                        </svg>
                        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                          <path d="M8.5 10a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
                          <path d="M5 7.5c1-.9 2.2-1.4 3.5-1.4s2.5.5 3.5 1.4" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                          <path d="M1.5 4c2-1.4 4.3-2.2 7-2.2s5 .8 7 2.2" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                        </svg>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div style={{ width: "26px", height: "13px", borderRadius: "4px", border: "1.5px solid rgba(255,255,255,0.5)", padding: "2px" }}>
                            <div style={{ width: "75%", height: "100%", backgroundColor: "#34c759", borderRadius: "2px" }}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Header */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "14px 18px",
                      background: "rgba(255,255,255,0.02)",
                      borderBottom: "1px solid rgba(255,255,255,0.05)"
                    }}>
                      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M9 1L1 9L9 17"/>
                      </svg>
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
                      }}>
                        <span style={{ color: "white", fontWeight: 700, fontSize: "15px" }}>AI</span>
                      </div>
                      <div>
                        <p style={{ color: "white", fontWeight: 600, fontSize: "17px", margin: 0 }}>AutoMaster AI</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{ width: "8px", height: "8px", backgroundColor: "#34c759", borderRadius: "50%" }}
                          />
                          <span style={{ color: "#34c759", fontSize: "13px" }}>Online</span>
                        </div>
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div
                      ref={messagesRef}
                      style={{
                        height: "360px",
                        padding: "20px 14px",
                        overflowY: "auto",
                        scrollBehavior: "smooth",
                        background: "linear-gradient(180deg, #f5f5f5 0%, #ececec 100%)",
                      }}
                    >
                      {content.conversation.map((msg, index) => {
                        const isVisible = visibleMessages.includes(index);
                        if (!isVisible && !(isTyping && typingFor === msg.sender && visibleMessages.length === index)) return null;

                        // Show typing indicator
                        if (isTyping && typingFor === msg.sender && visibleMessages.length === index) {
                          return (
                            <div key={`typing-${index}`} style={{
                              display: "flex",
                              justifyContent: msg.sender === "user" ? "flex-end" : (msg.sender as MessageSender) === "system" ? "center" : "flex-start",
                              marginBottom: "16px"
                            }}>
                              {(msg.sender as MessageSender) !== "system" && msg.sender !== "user" && <TypingIndicator />}
                              {msg.sender === "user" && (
                                <div style={{
                                  padding: "10px 16px",
                                  background: "linear-gradient(135deg, #007aff 0%, #0056b3 100%)",
                                  borderRadius: "16px",
                                  borderBottomRightRadius: "6px",
                                  color: "rgba(255,255,255,0.7)",
                                  fontSize: "13px"
                                }}>
                                  typing...
                                </div>
                              )}
                            </div>
                          );
                        }

                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{
                              display: "flex",
                              justifyContent: msg.sender === "user" ? "flex-end" : msg.sender === "system" ? "center" : "flex-start",
                              marginBottom: "16px"
                            }}
                          >
                            {msg.sender === "system" ? (
                              <span style={{
                                color: "#f97316",
                                fontSize: "11px",
                                fontWeight: 600,
                                padding: "8px 16px",
                                background: "rgba(249,115,22,0.12)",
                                borderRadius: "20px",
                                border: "1px solid rgba(249,115,22,0.25)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                              }}>
                                {msg.text}
                              </span>
                            ) : (
                              <div style={{
                                display: "flex",
                                gap: "10px",
                                maxWidth: "85%",
                                flexDirection: msg.sender === "user" ? "row-reverse" : "row",
                                alignItems: "flex-end"
                              }}>
                                <div style={{
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: "50%",
                                  flexShrink: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "11px",
                                  fontWeight: 700,
                                  background: msg.sender === "ai"
                                    ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                                    : "linear-gradient(135deg, #4a4a4c 0%, #2c2c2e 100%)",
                                  color: "white",
                                }}>
                                  {msg.sender === "ai" ? "AI" : content.customerName.charAt(0)}
                                </div>

                                <div style={{
                                  padding: "12px 16px",
                                  fontSize: "14px",
                                  lineHeight: 1.5,
                                  borderRadius: "20px",
                                  background: msg.sender === "ai"
                                    ? "#e9e9eb"
                                    : "linear-gradient(135deg, #007aff 0%, #0056b3 100%)",
                                  color: msg.sender === "ai" ? "#1a1a1a" : "white",
                                  borderBottomLeftRadius: msg.sender === "ai" ? "6px" : "20px",
                                  borderBottomRightRadius: msg.sender === "user" ? "6px" : "20px",
                                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                }}>
                                  {msg.text}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Voice Call Banner for Service Drive */}
                    {isServiceDrive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          margin: "12px 14px",
                          padding: "14px 16px",
                          background: "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.08) 100%)",
                          borderRadius: "16px",
                          border: "1px solid rgba(249,115,22,0.3)",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={() => setIsModalOpen(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                          {/* Play button */}
                          <div style={{
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 4px 16px rgba(249,115,22,0.5)",
                            flexShrink: 0,
                          }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>

                          {/* Waveform visualization */}
                          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "2px", height: "32px" }}>
                            {[4, 8, 6, 12, 8, 10, 6, 14, 8, 10, 5, 12, 7, 9, 6].map((h, i) => (
                              <motion.div
                                key={i}
                                style={{
                                  width: "3px",
                                  height: `${h * 2}px`,
                                  background: "linear-gradient(180deg, #f97316 0%, rgba(249,115,22,0.4) 100%)",
                                  borderRadius: "2px",
                                }}
                                animate={{ height: [`${h * 2}px`, `${h * 3}px`, `${h * 2}px`] }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.05,
                                  ease: "easeInOut"
                                }}
                              />
                            ))}
                          </div>

                          {/* Info */}
                          <div style={{ textAlign: "right" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-end" }}>
                              <motion.span
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  background: "#ef4444",
                                }}
                              />
                              <span style={{ color: "#ef4444", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Live Recording</span>
                            </div>
                            <span style={{ color: "white", fontSize: "14px", fontWeight: 600 }}>{formatTime(callSeconds)}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Input Bar */}
                    <div style={{
                      padding: "14px 16px",
                      borderTop: "1px solid rgba(255,255,255,0.05)"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "rgba(249,115,22,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"/>
                            <line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                        </div>
                        <div style={{
                          flex: 1,
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "20px",
                          padding: "11px 18px",
                        }}>
                          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "15px" }}>Message</span>
                        </div>
                        <div style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 16px rgba(249,115,22,0.4)"
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 8px" }}>
                      <div style={{ width: "140px", height: "5px", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: "9999px" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reflection/shine effect */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "50%",
                borderRadius: "55px 55px 0 0",
                background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 100%)",
                pointerEvents: "none",
                transform: "translateZ(25px)"
              }} />
            </motion.div>
          </div>

          {/* Content Panel with Premium Card Design */}
          <div style={{ position: "relative" }}>
            {/* Ambient glow behind card */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "120%",
              height: "120%",
              background: "radial-gradient(ellipse at center, rgba(249,115,22,0.08) 0%, transparent 70%)",
              filter: "blur(60px)",
              pointerEvents: "none",
            }} />

            {/* Premium Card Container */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                position: "relative",
                background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                backdropFilter: "blur(20px)",
                borderRadius: "28px",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "48px 44px",
                boxShadow: `
                  0 40px 80px -20px rgba(0,0,0,0.5),
                  0 0 0 1px rgba(255,255,255,0.05) inset,
                  0 1px 0 rgba(255,255,255,0.1) inset
                `,
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "1px",
                background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)",
              }} />

              {/* Subtle grid texture overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px",
                pointerEvents: "none",
                opacity: 0.5,
              }} />

              {/* Corner accent */}
              <div style={{
                position: "absolute",
                top: "-1px",
                right: "-1px",
                width: "80px",
                height: "80px",
                background: "linear-gradient(225deg, rgba(249,115,22,0.15) 0%, transparent 60%)",
                borderRadius: "0 28px 0 0",
                pointerEvents: "none",
              }} />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Eyebrow label */}
                <motion.div
                  key={activeTab + "-eyebrow"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{
                    width: "24px",
                    height: "2px",
                    background: "linear-gradient(90deg, #f97316, rgba(249,115,22,0.3))",
                    borderRadius: "1px",
                  }} />
                  <span style={{
                    color: "#f97316",
                    fontSize: "11px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                  }}>
                    {activeTab.replace("-", " ")}
                  </span>
                </motion.div>

                <motion.h3
                  key={activeTab + "-headline"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    color: "white",
                    fontSize: "clamp(28px, 3.5vw, 40px)",
                    fontWeight: 700,
                    marginBottom: "20px",
                    marginTop: 0,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  {content.headline}
                </motion.h3>

                <motion.p
                  key={activeTab + "-body"}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  style={{
                    color: "rgba(255,255,255,0.6)",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    marginBottom: "36px",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                  }}
                >
                  {content.body}
                </motion.p>

                {/* Premium Stats Grid */}
                <div style={{
                  display: "grid",
                  gap: "12px",
                  marginBottom: "36px",
                }}>
                  {content.stats.map((stat, i) => (
                    <motion.div
                      key={activeTab + "-stat-" + i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "14px 18px",
                        background: "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0.02) 100%)",
                        borderRadius: "14px",
                        border: "1px solid rgba(249,115,22,0.15)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        background: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.1) 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 2px 8px rgba(249,115,22,0.2)",
                      }}>
                        <Check style={{ width: "18px", height: "18px", color: "#f97316" }} strokeWidth={2.5} />
                      </div>
                      <span style={{
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 500,
                        fontSize: "15px",
                        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
                      }}>{stat}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                  marginBottom: "28px",
                }} />

                {/* Premium CTA */}
                <motion.a
                  key={activeTab + "-cta"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  href={content.cta.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 28px",
                    background: "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%)",
                    border: "1px solid rgba(249,115,22,0.3)",
                    borderRadius: "12px",
                    color: "#f97316",
                    fontWeight: 600,
                    textDecoration: "none",
                    fontSize: "14px",
                    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
                    transition: "all 0.3s ease",
                  }}
                >
                  {content.cta.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </motion.a>
              </div>

              {/* Bottom gradient fade */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100px",
                background: "linear-gradient(to top, rgba(5,5,5,0.3) 0%, transparent 100%)",
                pointerEvents: "none",
                borderRadius: "0 0 28px 28px",
              }} />
            </motion.div>
          </div>

        </div>
      </div>


      {/* Voice Call Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <VoiceCallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}
