"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Clock } from "lucide-react";

import { PRICING_OPTIONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";

function formatRupiah(amount: number): string {
  return `Rp ${amount.toLocaleString("id-ID")}`;
}

function estimateTimeline(
  projectType: string,
  pages: number,
  featureCount: number
): string {
  const baseWeeks: Record<string, number> = {
    "company-profile": 2,
    "landing-page": 1,
    "portal-berita": 4,
    "web-app": 6,
    "mobile-app": 8,
    ecommerce: 5,
  };

  const weeks =
    (baseWeeks[projectType] ?? 3) +
    Math.ceil(pages / 5) +
    featureCount;

  if (weeks <= 4) return `${weeks} minggu`;
  const months = Math.ceil(weeks / 4);
  return `${months} bulan`;
}

export function PricingCalculator() {
  const [projectType, setProjectType] = useState<string>(
    PRICING_OPTIONS.projectTypes[0].value
  );
  const [pages, setPages] = useState(5);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [maintenance, setMaintenance] = useState<string>(
    PRICING_OPTIONS.maintenance[0].value
  );

  const toggleFeature = (value: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value]
    );
  };

  const totalPrice = useMemo(() => {
    const typePrice =
      PRICING_OPTIONS.projectTypes.find((t) => t.value === projectType)
        ?.basePrice ?? 0;

    const pagePrice = (pages - 1) * 500000;

    const featurePrice = PRICING_OPTIONS.features
      .filter((f) => selectedFeatures.includes(f.value))
      .reduce((sum, f) => sum + f.price, 0);

    const maintenancePrice =
      PRICING_OPTIONS.maintenance.find((m) => m.value === maintenance)
        ?.price ?? 0;

    return typePrice + pagePrice + featurePrice + maintenancePrice;
  }, [projectType, pages, selectedFeatures, maintenance]);

  const timeline = useMemo(
    () => estimateTimeline(projectType, pages, selectedFeatures.length),
    [projectType, pages, selectedFeatures.length]
  );

  return (
    <section
      id="pricing-calculator"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 h-64 w-64 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-[#06B6D4]">
            <Calculator className="size-4" />
            Estimasi Biaya
          </div>
          <h2 className="text-3xl font-bold text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Estimasi Biaya{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Project
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#94A3B8] sm:text-lg">
            Gunakan kalkulator interaktif untuk mendapatkan estimasi biaya dan
            timeline proyek Anda.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Calculator Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 sm:p-8"
          >
            <div className="space-y-8">
              {/* Project Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#F8FAFC]">
                  Jenis Project
                </label>
                <Select
                  value={projectType}
                  onValueChange={(val) => setProjectType(val as string)}
                >
                  <SelectTrigger className="w-full h-10 bg-[#1E293B] border-white/10 text-[#F8FAFC] hover:border-[#2563EB]/50">
                    <SelectValue placeholder="Pilih jenis project" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-white/10 text-[#F8FAFC]">
                    {PRICING_OPTIONS.projectTypes.map((type) => (
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="text-[#F8FAFC] focus:bg-[#2563EB]/20 focus:text-[#F8FAFC]"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Pages */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#F8FAFC]">
                    Jumlah Halaman
                  </label>
                  <span className="rounded-md bg-[#2563EB]/20 px-2.5 py-0.5 text-sm font-semibold text-[#2563EB]">
                    {pages} halaman
                  </span>
                </div>
                <Slider
                  value={[pages]}
                  onValueChange={(val) => setPages(Array.isArray(val) ? val[0] : val)}
                  min={1}
                  max={20}
                  step={1}
                  className="[&_[data-slot=slider-track]]:bg-white/10 [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-[#2563EB] [&_[data-slot=slider-range]]:to-[#06B6D4] [&_[data-slot=slider-thumb]]:border-[#2563EB] [&_[data-slot=slider-thumb]]:bg-white"
                />
                <div className="flex justify-between text-xs text-[#94A3B8]">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Custom Features */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#F8FAFC]">
                  Fitur Tambahan
                </label>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PRICING_OPTIONS.features.map((feature) => {
                    const isActive = selectedFeatures.includes(feature.value);
                    return (
                      <button
                        key={feature.value}
                        type="button"
                        onClick={() => toggleFeature(feature.value)}
                        className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-all ${
                          isActive
                            ? "border-[#2563EB] bg-[#2563EB]/10 text-[#F8FAFC]"
                            : "border-white/10 bg-[#1E293B]/50 text-[#94A3B8] hover:border-white/20"
                        }`}
                      >
                        <span className="font-medium">{feature.label}</span>
                        <span
                          className={`text-xs ${isActive ? "text-[#06B6D4]" : "text-[#94A3B8]"}`}
                        >
                          +{formatRupiah(feature.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Maintenance Plan */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#F8FAFC]">
                  Paket Maintenance
                </label>
                <Select
                  value={maintenance}
                  onValueChange={(val) => setMaintenance(val as string)}
                >
                  <SelectTrigger className="w-full h-10 bg-[#1E293B] border-white/10 text-[#F8FAFC] hover:border-[#2563EB]/50">
                    <SelectValue placeholder="Pilih paket maintenance" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1E293B] border-white/10 text-[#F8FAFC]">
                    {PRICING_OPTIONS.maintenance.map((plan) => (
                      <SelectItem
                        key={plan.value}
                        value={plan.value}
                        className="text-[#F8FAFC] focus:bg-[#2563EB]/20 focus:text-[#F8FAFC]"
                      >
                        {plan.label}
                        {plan.price > 0 && (
                          <span className="ml-2 text-xs text-[#94A3B8]">
                            ({formatRupiah(plan.price)})
                          </span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Result Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Price Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563EB]/20">
                  <Calculator className="size-5 text-[#2563EB]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F8FAFC]">
                  Estimasi Harga
                </h3>
              </div>
              <div className="mb-2">
                <span className="text-sm text-[#94A3B8]">Mulai dari</span>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent sm:text-4xl">
                {formatRupiah(totalPrice)}
              </p>
              <p className="mt-2 text-xs text-[#94A3B8]">
                *Harga bersifat estimasi, hubungi kami untuk penawaran final.
              </p>
            </div>

            {/* Timeline Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#06B6D4]/20">
                  <Clock className="size-5 text-[#06B6D4]" />
                </div>
                <h3 className="text-lg font-semibold text-[#F8FAFC]">
                  Estimasi Timeline
                </h3>
              </div>
              <p className="text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
                {timeline}
              </p>
              <p className="mt-2 text-xs text-[#94A3B8]">
                *Timeline tergantung pada kompleksitas dan revisi.
              </p>
            </div>

            {/* CTA Button */}
            <Button
              className="h-12 w-full bg-[#2563EB] text-white text-base font-semibold hover:bg-[#2563EB]/90 shadow-lg shadow-[#2563EB]/25"
              size="lg"
              render={<Link href="/contact" />}
            >
              Konsultasi Sekarang
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
