"use client";

import { motion } from "framer-motion";

import { PROCESS_STEPS } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/5 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center lg:mb-32"
        >
          <span className="mb-4 inline-block rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 px-4 py-1.5 text-sm font-medium text-[#06B6D4]">
            How We Work
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl">
            Proses Kerja{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Kami
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-[#94A3B8]">
            Langkah-langkah sistematis untuk hasil terbaik
          </p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-[64px] h-1 bg-white/5 rounded-full">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] shadow-[0_0_20px_rgba(37,99,235,0.5)]"
              />
            </div>

            <div className="grid grid-cols-7 gap-6">
              {PROCESS_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                    className="relative flex flex-col items-center group"
                  >
                    {/* Icon circle */}
                    <div className="relative z-10 mb-8 flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-[#1E293B] bg-[#0F172A] shadow-xl transition-all duration-300 group-hover:border-[#06B6D4]/50 group-hover:bg-[#1E293B]/50 group-hover:scale-110 group-hover:-translate-y-2">
                      <Icon className="h-12 w-12 text-[#94A3B8] transition-colors duration-300 group-hover:text-[#06B6D4]" />
                      
                      {/* Number badge */}
                      <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-base font-bold text-white shadow-lg shadow-[#2563EB]/30">
                        {step.step}
                      </div>
                    </div>

                    {/* Text content */}
                    <div className="text-center px-2">
                      <h3 className="mb-3 text-xl font-bold text-[#F8FAFC] group-hover:text-[#06B6D4] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#94A3B8]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical connecting line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute bottom-0 left-[27px] top-0 w-0.5 origin-top bg-gradient-to-b from-[#2563EB] via-[#06B6D4] to-[#8B5CF6]"
            />

            {/* Steps list */}
            <div className="flex flex-col gap-8">
              {PROCESS_STEPS.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    className="group relative flex gap-6"
                  >
                    {/* Step circle */}
                    <div className="relative z-10 shrink-0">
                      <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-[#1E293B] transition-all duration-300 group-hover:border-[#2563EB]/50 group-hover:shadow-lg group-hover:shadow-[#2563EB]/20">
                        <Icon className="size-6 text-[#06B6D4] transition-colors duration-300 group-hover:text-[#F8FAFC]" />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] text-[10px] font-bold text-white shadow-lg shadow-[#2563EB]/30">
                        {step.step}
                      </div>
                    </div>

                    {/* Content card */}
                    <div className="flex-1 rounded-xl border border-white/5 bg-[#1E293B]/40 p-5 backdrop-blur-sm transition-all duration-300 group-hover:border-white/10 group-hover:bg-[#1E293B]/60">
                      <h3 className="mb-1.5 text-base font-semibold text-[#F8FAFC]">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#94A3B8]">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
