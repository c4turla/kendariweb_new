"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { PORTFOLIO_FILTERS } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  title: string;
  category: string;
  industry: string;
  image: string | null;
  tech: string[];
  url: string;
}

const GRADIENT_PRESETS = [
  "from-[#2563EB]/80 to-[#06B6D4]/80",
  "from-[#8B5CF6]/80 to-[#2563EB]/80",
  "from-[#06B6D4]/80 to-[#8B5CF6]/80",
  "from-[#2563EB]/80 to-[#8B5CF6]/80",
  "from-[#06B6D4]/80 to-[#2563EB]/80",
  "from-[#8B5CF6]/80 to-[#06B6D4]/80",
] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25 },
  },
};

export function PortfolioClient({ initialItems }: { initialItems: PortfolioItem[] }) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof PORTFOLIO_FILTERS)[number]>("Semua");

  const filteredItems =
    activeFilter === "Semua"
      ? initialItems
      : initialItems.filter((item) => item.category === activeFilter);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0F172A]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#2563EB]/5 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full bg-[#06B6D4]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pb-12 pt-28 text-center sm:pb-16 sm:pt-36"
        >
          <span className="mb-4 inline-block rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#8B5CF6]">
            Portfolio
          </span>
          <h1 className="mt-4 text-4xl font-bold text-[#F8FAFC] sm:text-5xl lg:text-6xl">
            Portfolio{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Kami
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Hasil karya terbaik kami untuk klien di berbagai industri
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {PORTFOLIO_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 sm:px-6 ${
                activeFilter === filter
                  ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25"
                  : "border border-white/10 bg-[#1E293B]/50 text-[#94A3B8] hover:border-[#2563EB]/30 hover:bg-[#1E293B] hover:text-[#F8FAFC]"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 pb-20 sm:pb-28 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.title}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1E293B]/50 backdrop-blur-sm transition-all duration-300 hover:border-[#2563EB]/20 hover:shadow-xl hover:shadow-[#2563EB]/5">
                  {/* Subtle top gradient border on hover */}
                  <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#8B5CF6]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Image or Mockup */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F172A] border-b border-white/5">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={true}
                      />
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${GRADIENT_PRESETS[index % GRADIENT_PRESETS.length]}`} />
                        
                        {/* Mockup UI Window fallback */}
                        <div className="absolute top-8 left-1/2 w-[85%] -translate-x-1/2 h-[120%] rounded-t-xl bg-[#1E293B] border border-white/10 shadow-2xl overflow-hidden flex flex-col group-hover:top-6 transition-all duration-500 ease-out">
                          <div className="h-6 w-full border-b border-white/5 flex items-center px-3 gap-1.5 bg-black/20">
                            <div className="size-2 rounded-full bg-red-500/50" />
                            <div className="size-2 rounded-full bg-yellow-500/50" />
                            <div className="size-2 rounded-full bg-green-500/50" />
                          </div>
                          <div className="flex-1 p-3 flex gap-3">
                            <div className="w-1/4 h-full flex flex-col gap-2">
                              <div className="h-4 w-full rounded bg-white/10 mb-2" />
                              <div className="h-2 w-full rounded bg-white/5" />
                              <div className="h-2 w-3/4 rounded bg-white/5" />
                              <div className="h-2 w-5/6 rounded bg-white/5" />
                            </div>
                            <div className="flex-1 flex flex-col gap-3">
                              <div className="h-16 w-full rounded-md bg-gradient-to-r from-white/10 to-transparent" />
                              <div className="flex gap-2 h-10">
                                <div className="flex-1 rounded-md bg-white/5" />
                                <div className="flex-1 rounded-md bg-white/5" />
                              </div>
                              <div className="flex-1 rounded-md border border-white/5 bg-black/20" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/70 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                      <Button
                        className="bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30 hover:bg-[#2563EB]/90"
                        render={
                          <Link
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                      >
                        <ExternalLink className="mr-1.5 h-4 w-4" />
                        Lihat Detail
                      </Button>
                    </div>

                    {/* Industry Badge */}
                    <div className="absolute left-3 top-3 z-10">
                      <Badge className="border-0 bg-[#0F172A]/70 text-[#F8FAFC] backdrop-blur-md">
                        {item.industry}
                      </Badge>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute right-3 top-3 z-10">
                      <Badge className="border border-[#2563EB]/30 bg-[#2563EB]/20 text-[#06B6D4] backdrop-blur-md">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="mb-3 text-base font-semibold text-[#F8FAFC] transition-colors group-hover:text-[#06B6D4] sm:text-lg">
                      {item.title}
                    </h3>

                    {/* Tech Stack Badges */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {item.tech.map((tech) => (
                        <Badge
                          key={tech}
                          className="border border-white/10 bg-[#0F172A]/60 text-[#94A3B8]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Lihat Detail Link */}
                    <div className="lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100">
                      <Link
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563EB] transition-colors hover:text-[#06B6D4]"
                      >
                        Lihat Detail
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
