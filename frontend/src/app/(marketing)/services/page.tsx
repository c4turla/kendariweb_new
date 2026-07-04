"use client";

// Metadata (handled separately in a server layout or generateMetadata):
// title: "Layanan Kami"
// description: "Solusi digital lengkap untuk setiap kebutuhan bisnis Anda. Website, aplikasi, desain, dan maintenance."

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* ============ HERO / TITLE SECTION ============ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Background glows */}
        <div className="pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-[#2563EB]/15 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/2 left-0 h-[400px] w-[400px] rounded-full bg-[#06B6D4]/8 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge
              variant="secondary"
              className="mb-6 bg-[#2563EB]/10 text-[#06B6D4] border border-[#2563EB]/20 px-4 py-1.5 text-sm"
            >
              Our Services
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl">
              Layanan{" "}
              <span className="gradient-text">Kami</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[#94A3B8] sm:text-xl">
              Solusi digital lengkap untuk setiap kebutuhan bisnis Anda.
              Dari website hingga aplikasi mobile, kami siap membantu
              transformasi digital bisnis Anda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ SERVICES GRID ============ */}
      <section className="relative py-12 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {SERVICES.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  variants={cardVariants}
                  className="group glass-card relative rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]"
                >
                  {/* Hover glow overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#8B5CF6]/5" />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon with gradient background */}
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] shadow-lg shadow-[#2563EB]/25">
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Title */}
                    <h2 className="mb-3 text-xl font-bold text-[#F8FAFC] sm:text-2xl">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-relaxed text-[#94A3B8] sm:text-base">
                      {service.description}
                    </p>

                    {/* Features list */}
                    <div className="mb-8 flex-1 space-y-3">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 text-sm text-[#94A3B8]"
                        >
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#06B6D4]" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Feature badges */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="bg-[#2563EB]/10 text-[#06B6D4] border border-[#2563EB]/20 hover:bg-[#2563EB]/20 text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link href="/contact" className="mt-auto">
                      <Button
                        variant="outline"
                        className="w-full border-[#2563EB]/30 text-[#F8FAFC] hover:bg-[#2563EB]/10 hover:border-[#2563EB]/50 transition-all duration-300 group/btn"
                      >
                        Konsultasi
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="relative py-20 sm:py-28">
        {/* Background glows */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[#8B5CF6]/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="glass-card relative overflow-hidden rounded-3xl p-10 sm:p-16 text-center"
          >
            {/* Decorative gradient border effect */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2563EB]/10 via-transparent to-[#8B5CF6]/10" />

            <div className="relative z-10">
              <Badge
                variant="secondary"
                className="mb-6 bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20 px-4 py-1.5 text-sm"
              >
                Custom Solutions
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                Butuh Solusi{" "}
                <span className="gradient-text">Custom?</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#94A3B8]">
                Setiap bisnis memiliki kebutuhan unik. Tim kami siap membantu
                merancang dan membangun solusi digital yang sesuai dengan
                kebutuhan spesifik bisnis Anda.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white px-8 py-3 h-12 text-base font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#2563EB]/25">
                    Konsultasi Gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    className="border-white/10 text-[#F8FAFC] hover:bg-white/5 px-8 py-3 h-12 text-base"
                  >
                    Lihat Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
