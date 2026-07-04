"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Target, Users, Shield } from "lucide-react";

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// --- Data ---

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Kami selalu mengadopsi teknologi terbaru dan pendekatan kreatif untuk memberikan solusi digital yang inovatif dan relevan.",
    gradient: "from-[#2563EB] to-[#06B6D4]",
    glow: "glow-blue",
  },
  {
    icon: Target,
    title: "Quality",
    description:
      "Setiap project dikerjakan dengan standar kualitas tinggi, mulai dari desain hingga performa dan keamanan.",
    gradient: "from-[#06B6D4] to-[#10B981]",
    glow: "glow-cyan",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Kami percaya kolaborasi erat dengan klien adalah kunci keberhasilan setiap project digital.",
    gradient: "from-[#8B5CF6] to-[#2563EB]",
    glow: "glow-purple",
  },
  {
    icon: Shield,
    title: "Reliability",
    description:
      "Kepercayaan klien adalah prioritas kami. Kami berkomitmen pada delivery tepat waktu dan support jangka panjang.",
    gradient: "from-[#F59E0B] to-[#EF4444]",
    glow: "glow-blue",
  },
];


const stats = [
  { value: "100+", label: "Projects" },
  { value: "50+", label: "Clients" },
  { value: "5+", label: "Years" },
  { value: "99%", label: "Client Satisfaction" },
];

// --- Section Components ---

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-20 h-72 w-72 rounded-full bg-[#8B5CF6]/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06B6D4]/10 blur-[150px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.div variants={fadeUpVariants} className="mb-6">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#94A3B8]">
            Tentang Kami
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUpVariants}
          className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl"
        >
          Tentang{" "}
          <span className="gradient-text">Kami</span>
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          className="mx-auto max-w-2xl text-lg leading-relaxed text-[#94A3B8] sm:text-xl"
        >
          Digital partner terpercaya untuk bisnis di Indonesia
        </motion.p>
      </motion.div>
    </section>
  );
}

function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-4xl"
        >
          <motion.div
            variants={fadeUpVariants}
            className="glass-card rounded-2xl p-8 sm:p-12"
          >
            <h2 className="mb-6 text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
              Cerita <span className="gradient-text">Kami</span>
            </h2>
            <p className="text-lg leading-relaxed text-[#94A3B8]">
              Kendariweb didirikan dengan visi untuk membantu bisnis di Indonesia
              bertransformasi secara digital. Dengan pengalaman lebih dari 5 tahun,
              kami telah membantu 50+ klien dari berbagai industri untuk membangun
              presence digital yang kuat.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleInVariants}
                  className="rounded-xl border border-white/5 bg-white/5 p-4 text-center"
                >
                  <div className="text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-[#94A3B8]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/10 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div variants={fadeUpVariants} className="mb-4">
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-[#94A3B8]">
              Nilai Kami
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUpVariants}
            className="mb-4 text-3xl font-bold text-[#F8FAFC] sm:text-4xl"
          >
            Nilai yang <span className="gradient-text">Kami Pegang</span>
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mb-16 max-w-2xl text-lg text-[#94A3B8]"
          >
            Empat pilar yang menjadi fondasi dalam setiap pekerjaan kami
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                variants={scaleInVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass-card group relative rounded-2xl p-6 transition-colors hover:border-white/20"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${value.gradient}`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#F8FAFC]">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#94A3B8]">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="glass-card overflow-hidden rounded-2xl"
        >
          {/* Gradient top border */}
          <div className="h-1 w-full bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6]" />

          <div className="grid grid-cols-2 divide-x divide-white/5 sm:grid-cols-4">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUpVariants}
                className="group relative p-8 text-center transition-colors hover:bg-white/5 sm:p-10"
              >
                <div className="gradient-text mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-[#94A3B8] sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Page Component ---

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0F172A]">
      <HeroSection />
      <StorySection />
      <ValuesSection />
      <StatsSection />
    </main>
  );
}
