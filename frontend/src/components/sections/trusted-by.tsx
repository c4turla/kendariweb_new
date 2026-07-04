"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  { name: "Next.js", icon: "▲" },
  { name: "React", icon: "⚛" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁" },
  { name: "Cloudflare", icon: "🌩" },
];

// Duplicate for seamless infinite scroll
const MARQUEE_ITEMS = [...TECH_STACK, ...TECH_STACK];

export function TrustedBy() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className="relative py-16 sm:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-[#94A3B8] mb-10">
          Teknologi Yang Kami Gunakan
        </p>

        {/* Marquee container */}
        <div className="relative">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0F172A] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0F172A] to-transparent" />

          {/* Scrolling track */}
          <div className="marquee-track flex overflow-hidden">
            <div className="flex animate-marquee gap-6">
              {MARQUEE_ITEMS.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="glass-card flex-shrink-0 flex items-center gap-3 rounded-xl px-8 py-4 transition-all hover:border-white/20 hover:scale-105"
                >
                  <span className="text-xl text-[#06B6D4]">{tech.icon}</span>
                  <span className="whitespace-nowrap text-base font-semibold tracking-tight text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Duplicate track for seamless loop */}
            <div className="flex animate-marquee gap-6 pl-6" aria-hidden>
              {MARQUEE_ITEMS.map((tech, index) => (
                <div
                  key={`dup-${tech.name}-${index}`}
                  className="glass-card flex-shrink-0 flex items-center gap-3 rounded-xl px-8 py-4 transition-all hover:border-white/20 hover:scale-105"
                >
                  <span className="text-xl text-[#06B6D4]">{tech.icon}</span>
                  <span className="whitespace-nowrap text-base font-semibold tracking-tight text-[#94A3B8] transition-colors group-hover:text-[#F8FAFC]">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle separator */}
      <div className="mx-auto mt-16 max-w-5xl">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </motion.section>
  );
}
