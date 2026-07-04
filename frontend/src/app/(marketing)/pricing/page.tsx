"use client";

import { motion, type Variants } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pricingTiers = [
  {
    name: "Starter",
    price: "Rp 1 jt - 3 jt",
    description: "Company profile, landing page",
    features: [
      "1-5 halaman",
      "Responsive design",
      "Domain + Hosting 1 tahun",
      "1 bulan maintenance",
      "Free konsultasi",
    ],
    popular: false,
  },
  {
    name: "Business",
    price: "Rp 4 jt - 8 jt",
    description: "Web application, e-commerce",
    features: [
      "5-15 halaman",
      "Custom design",
      "CMS",
      "Admin dashboard",
      "3 bulan maintenance",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Hubungi Kami",
    description: "Custom systems, mobile app",
    features: [
      "Unlimited halaman",
      "Custom features",
      "API integration",
      "Mobile responsive",
      "6 bulan maintenance",
      "Priority support",
    ],
    popular: false,
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 -left-40 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-[#06B6D4]/8 blur-3xl" />
      </div>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-[#06B6D4]">
              Pricing
            </div>
            <h1 className="text-3xl font-bold text-[#F8FAFC] sm:text-4xl lg:text-5xl">
              Harga &{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
                Paket
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#94A3B8] sm:text-lg">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda
            </p>
          </motion.div>

          {/* Pricing cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-3"
          >
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                className={`group relative flex flex-col rounded-2xl border backdrop-blur-lg transition-all duration-300 ${
                  tier.popular
                    ? "border-[#2563EB] bg-white/[0.07] shadow-lg shadow-[#2563EB]/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {/* Gradient border glow on hover */}
                <div
                  className={`pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    tier.popular ? "" : "bg-gradient-to-b from-[#2563EB]/20 via-[#06B6D4]/10 to-[#8B5CF6]/20"
                  }`}
                  style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude", padding: "1px", borderRadius: "1rem" }}
                />

                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#2563EB] text-white px-3 py-1 text-xs font-semibold shadow-lg shadow-[#2563EB]/30">
                      Popular
                    </Badge>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  {/* Tier header */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#F8FAFC]">
                      {tier.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#94A3B8]">
                      {tier.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent sm:text-4xl">
                      {tier.price}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="mb-8 flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-[#94A3B8]"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-[#06B6D4]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <Button
                    className={`h-11 w-full text-sm font-semibold transition-all duration-300 ${
                      tier.popular
                        ? "bg-[#2563EB] text-white hover:bg-[#2563EB]/90 shadow-lg shadow-[#2563EB]/25"
                        : "border-white/10 bg-white/5 text-[#F8FAFC] hover:bg-white/10 hover:border-white/20"
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                    render={<Link href="/contact" />}
                  >
                    Mulai Sekarang
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Custom package CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[#F8FAFC] sm:text-3xl">
                Butuh paket{" "}
                <span className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] bg-clip-text text-transparent">
                  custom?
                </span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[#94A3B8]">
                Setiap bisnis itu unik. Hubungi kami untuk mendiskusikan
                kebutuhan spesifik Anda dan dapatkan penawaran yang disesuaikan.
              </p>
              <Button
                className="mt-6 h-11 bg-[#2563EB] px-8 text-sm font-semibold text-white hover:bg-[#2563EB]/90 shadow-lg shadow-[#2563EB]/25"
                size="lg"
                render={<Link href="/contact" />}
              >
                Hubungi Kami
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
