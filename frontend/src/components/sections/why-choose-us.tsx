"use client";

import { motion } from "framer-motion";

import { WHY_CHOOSE_US } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-20 sm:py-28">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-[#2563EB]/5 blur-3xl" />
        <div className="absolute -bottom-40 right-1/4 h-80 w-80 rounded-full bg-[#8B5CF6]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
            Keunggulan Kami
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
            Mengapa Memilih{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Kami?
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Kami menghadirkan solusi digital terbaik dengan standar kualitas
            tinggi dan pelayanan yang profesional untuk kesuksesan bisnis Anda.
          </p>
          {/* Gradient accent line */}
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                className="group relative rounded-[2rem] border border-white/[0.06] bg-[#1E293B]/40 p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/10 hover:bg-[#1E293B]/60 hover:shadow-2xl hover:-translate-y-1 sm:p-8"
              >
                {/* Subtle gradient glow in background */}
                <div className={`absolute inset-0 rounded-[2rem] opacity-0 bg-gradient-to-br ${item.gradient} blur-xl transition-opacity duration-500 group-hover:opacity-[0.03]`} />

                {/* Subtle top gradient border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-[#F8FAFC]">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[#94A3B8]">
                  {item.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent sm:inset-x-8" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
