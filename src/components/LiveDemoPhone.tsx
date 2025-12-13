"use client";

import { motion } from "framer-motion";

interface Message {
  sender: "ai" | "user" | "system";
  text: string;
}

interface LiveDemoPhoneProps {
  conversation: Message[];
}

export default function LiveDemoPhone({ conversation }: LiveDemoPhoneProps) {
  return (
    <div className="relative">
      {/* Ambient glow behind phone */}
      <div
        className="absolute -inset-8 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,116,4,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Android Phone Frame */}
      <div
        className="relative w-[300px] md:w-[340px] rounded-[36px] p-[10px]"
        style={{
          background: "linear-gradient(145deg, #1c1c1c 0%, #0a0a0a 100%)",
          boxShadow: `
            0 50px 100px -20px rgba(0,0,0,0.8),
            0 30px 60px -30px rgba(255,116,4,0.1),
            inset 0 1px 0 rgba(255,255,255,0.1),
            inset 0 -1px 0 rgba(0,0,0,0.5)
          `,
        }}
      >
        {/* Side buttons */}
        <div className="absolute right-[-3px] top-[100px] w-[3px] h-[40px] bg-[#1a1a1a] rounded-r-sm" />
        <div className="absolute right-[-3px] top-[160px] w-[3px] h-[60px] bg-[#1a1a1a] rounded-r-sm" />

        {/* Screen */}
        <div
          className="relative w-full rounded-[28px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #0d0d0d 0%, #080808 100%)",
          }}
        >
          {/* Camera punch hole */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-[#0a0a0a] rounded-full z-30 border border-[#1a1a1a]">
            <div className="absolute inset-[3px] rounded-full bg-[#0f1520]" />
          </div>

          {/* Status Bar */}
          <div className="flex justify-between items-center px-5 pt-3 pb-1 text-white text-[11px] relative z-20">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1.5">
              <svg className="w-[14px] h-[14px] opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 18c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-4.9-2.3l1.4 1.4c1.9-1.9 5.1-1.9 7 0l1.4-1.4c-2.7-2.7-7.1-2.7-9.8 0zM3.5 12.1l1.4 1.4c3.9-3.9 10.2-3.9 14.1 0l1.4-1.4c-4.7-4.7-12.2-4.7-16.9 0z"/>
              </svg>
              <div className="flex items-end gap-[2px]">
                <div className="w-[2px] h-[4px] bg-white/80 rounded-sm" />
                <div className="w-[2px] h-[6px] bg-white/80 rounded-sm" />
                <div className="w-[2px] h-[8px] bg-white/80 rounded-sm" />
                <div className="w-[2px] h-[10px] bg-white/80 rounded-sm" />
              </div>
              <div className="flex items-center ml-1">
                <div className="w-[18px] h-[9px] border border-white/80 rounded-[2px] p-[1.5px]">
                  <div className="w-[65%] h-full bg-white/80 rounded-[1px]" />
                </div>
                <div className="w-[1.5px] h-[4px] bg-white/80 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* Chat Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "linear-gradient(180deg, rgba(15,15,15,0.95) 0%, rgba(10,10,10,0.9) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #FF7404 0%, #FF8A1E 100%)",
                boxShadow: "0 4px 15px rgba(255,116,4,0.4)",
              }}
            >
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold">AutoMaster AI</p>
              <p className="text-[#FF7404] text-[10px] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#FF7404] rounded-full animate-pulse" />
                Online
              </p>
            </div>
            <svg className="w-5 h-5 text-white/40" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="6" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="18" r="2" />
            </svg>
          </div>

          {/* Messages Area */}
          <div
            className="h-[340px] md:h-[380px] overflow-y-auto px-3 py-4 space-y-3"
            style={{ scrollbarWidth: "none" }}
          >
            {conversation.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.35,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : message.sender === "system"
                    ? "justify-center"
                    : "justify-start"
                }`}
              >
                {message.sender === "system" ? (
                  <span className="text-[10px] text-[#555] font-medium uppercase tracking-wide">
                    {message.text}
                  </span>
                ) : message.sender === "ai" ? (
                  /* AI Bubble - Glowing Orange */
                  <div className="relative max-w-[80%]">
                    <div
                      className="absolute -inset-2 rounded-2xl pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at center, rgba(255,116,4,0.25) 0%, transparent 70%)",
                        filter: "blur(10px)",
                      }}
                    />
                    <div
                      className="relative px-4 py-2.5 rounded-[18px] rounded-bl-[4px]"
                      style={{
                        background: "linear-gradient(135deg, #FF7404 0%, #FF8A1E 100%)",
                        boxShadow: `
                          0 6px 20px -4px rgba(255,116,4,0.5),
                          inset 0 1px 0 rgba(255,255,255,0.15)
                        `,
                      }}
                    >
                      <p className="text-[13px] leading-[1.4] text-white font-medium">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* User Bubble - Charcoal */
                  <div
                    className="max-w-[80%] px-4 py-2.5 rounded-[18px] rounded-br-[4px]"
                    style={{
                      background: "linear-gradient(135deg, #2a2a2a 0%, #1e1e1e 100%)",
                      boxShadow: `
                        inset 0 1px 2px rgba(0,0,0,0.3),
                        0 2px 8px -2px rgba(0,0,0,0.4)
                      `,
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <p className="text-[13px] leading-[1.4] text-white/90">
                      {message.text}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Input Bar */}
          <div
            className="px-3 py-3"
            style={{
              background: "linear-gradient(180deg, rgba(15,15,15,0.9) 0%, rgba(10,10,10,0.95) 100%)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="flex-1 h-[38px] rounded-full flex items-center px-4"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-[13px] text-[#555]">Type a message...</span>
              </div>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(255,116,4,0.35)",
                    filter: "blur(8px)",
                    transform: "translateY(3px)",
                  }}
                />
                <div
                  className="relative w-[38px] h-[38px] rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #FF7404 0%, #FF8A1E 100%)",
                    boxShadow: "0 4px 15px rgba(255,116,4,0.4)",
                  }}
                >
                  <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Android Nav Bar */}
          <div className="h-[12px] flex items-center justify-center gap-6 bg-black/40">
            <div className="w-[14px] h-[14px] border-[1.5px] border-white/25 rounded-sm" />
            <div className="w-[14px] h-[14px] rounded-full border-[1.5px] border-white/25" />
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "7px solid transparent",
                borderRight: "7px solid transparent",
                borderBottom: "12px solid rgba(255,255,255,0.25)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
