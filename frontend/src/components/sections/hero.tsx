"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HERO_METRICS } from "@/lib/data";

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

const metricsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.8,
    },
  },
};

const metricItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// --- Counter Hook ---

function useCountUp(target: number, duration: number = 2000, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTimestamp: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

// --- Metric Card Component ---

function MetricCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Parse numeric part and suffix (e.g. "100+" -> 100, "+")
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const numericValue = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : "";

  const animatedCount = useCountUp(numericValue, 2000, isInView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold gradient-text sm:text-4xl">
        {isInView ? animatedCount : 0}
        {suffix}
      </div>
      <div className="mt-1 text-sm text-muted-foreground sm:text-base">
        {label}
      </div>
    </div>
  );
}

// --- Floating Orb Component ---

function FloatingOrb({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

// --- Hero Section ---

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-[#0F172A]">
        {/* Radial gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,99,235,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(139,92,246,0.1),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_20%_80%,rgba(6,182,212,0.1),transparent)]" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(248,250,252,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(248,250,252,0.5) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Floating gradient orbs */}
      <FloatingOrb
        className="w-96 h-96 bg-[#2563EB] -top-48 -left-48"
        delay={0}
      />
      <FloatingOrb
        className="w-80 h-80 bg-[#8B5CF6] top-1/4 -right-40"
        delay={2}
      />
      <FloatingOrb
        className="w-72 h-72 bg-[#06B6D4] -bottom-36 left-1/3"
        delay={4}
      />
      <FloatingOrb
        className="w-64 h-64 bg-[#2563EB] bottom-1/4 -left-32"
        delay={6}
      />

      {/* Decorative gradient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(37,99,235,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute top-20 right-20 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(139,92,246,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(6,182,212,0.06),transparent_70%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeUpVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06B6D4] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#06B6D4]" />
              </span>
              Jasa Pembuatan Website Profesional
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUpVariants}
            className="mt-8 text-4xl font-bold leading-tight tracking-tight text-[#F8FAFC] sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
          >
            Website Profesional untuk{" "}
            <span className="gradient-text">Bisnis Modern</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-2xl text-lg text-[#94A3B8] sm:text-xl leading-relaxed"
          >
            Kami membantu bisnis berkembang melalui website, aplikasi, dan solusi
            digital modern.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-[#2563EB] text-white hover:bg-[#1d4ed8] rounded-xl shadow-lg shadow-[#2563EB]/25 transition-all hover:shadow-[#2563EB]/40"
              render={
                <Link href="/contact">
                  Konsultasi Gratis
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover/button:translate-x-1" />
                </Link>
              }
            />
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-semibold border-white/15 text-[#F8FAFC] hover:bg-white/5 rounded-xl backdrop-blur-sm"
              render={
                <Link href="/portfolio">
                  Lihat Portfolio
                </Link>
              }
            />
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={metricsContainerVariants}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-3 gap-8 sm:gap-16 relative z-20"
          >
            {HERO_METRICS.map((metric) => (
              <motion.div key={metric.label} variants={metricItemVariants}>
                <MetricCounter value={metric.value} label={metric.label} />
              </motion.div>
            ))}
          </motion.div>

          {/* Project Preview Mockup */}
          <motion.div
            variants={fadeUpVariants}
            className="mt-20 w-full max-w-5xl relative mx-auto"
          >
            {/* Glow behind mockup */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#2563EB]/30 via-[#06B6D4]/30 to-[#8B5CF6]/30 blur-2xl opacity-60" />

            {/* Mockup Frame */}
            <div className="relative rounded-2xl border border-white/10 bg-[#1E293B]/80 p-2 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Browser Header */}
              <div className="flex items-center gap-2 px-3 pb-3 pt-2 border-b border-white/10">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto flex h-6 w-1/3 items-center justify-center rounded-md bg-white/5 text-[10px] text-white/40">
                  kendariweb.com
                </div>
              </div>

              {/* Mockup Content - Abstract UI */}
              <div className="h-[400px] w-full rounded-b-xl bg-[#0F172A] p-6 relative overflow-hidden">
                {/* Abstract UI Elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,#2563EB20,transparent_50%)]" />

                {/* Sidebar + Main Content Layout */}
                <div className="flex h-full gap-6">
                  {/* Sidebar Mockup */}
                  <div className="hidden sm:flex w-48 flex-col gap-4 border-r border-white/5 pr-4">
                    <div className="h-6 w-24 rounded bg-white/10 mb-4" />
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-full rounded bg-white/5" />
                    ))}
                  </div>

                  {/* Main Area Mockup */}
                  <div className="flex-1 flex flex-col gap-6">
                    {/* Header line */}
                    <div className="flex justify-between items-center">
                      <div className="h-8 w-48 rounded bg-gradient-to-r from-[#2563EB]/40 to-[#06B6D4]/40" />
                      <div className="h-8 w-24 rounded bg-white/10" />
                    </div>

                    {/* Hero area inside mockup */}
                    <div className="h-32 w-full rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#2563EB]/20 border border-white/5" />

                    {/* Grid area inside mockup */}
                    <div className="grid grid-cols-2 gap-4 flex-1">
                      <div className="rounded-lg bg-white/5 border border-white/5" />
                      <div className="rounded-lg bg-white/5 border border-white/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

export default HeroSection;
