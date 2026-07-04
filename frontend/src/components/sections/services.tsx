"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#2563EB]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-[#8B5CF6]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Layanan{" "}
            <span className="gradient-text">Kami</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#94A3B8]">
            Solusi digital lengkap untuk mengembangkan bisnis Anda
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;

            // Advanced Bento Sizing for 6 items
            let spanClass = "";
            let innerLayoutClass = "flex h-full flex-col";
            let iconSizeClass = "h-12 w-12 mb-5";
            let iconClass = "h-6 w-6";
            
            if (index === 0) {
              // Massive wide card
              spanClass = "sm:col-span-2 lg:col-span-2";
              innerLayoutClass = "flex h-full flex-col md:flex-row md:items-center gap-6";
              iconSizeClass = "h-16 w-16 mb-0 shrink-0";
              iconClass = "h-8 w-8";
            }

            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={`group glass-card relative rounded-[2rem] p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(37,99,235,0.2)] ${spanClass}`}
              >
                {/* Decorative background shape based on index */}
                {index === 0 && (
                  <div className="absolute right-0 top-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-gradient-to-br from-[#2563EB]/20 to-transparent blur-2xl" />
                )}
                {index === 3 && (
                  <div className="absolute left-0 bottom-0 -mb-8 -ml-8 h-48 w-48 rounded-full bg-gradient-to-tr from-[#8B5CF6]/20 to-transparent blur-2xl" />
                )}

                {/* Hover glow overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-[#2563EB]/5 via-transparent to-[#8B5CF6]/5" />

                <div className={`relative z-10 ${innerLayoutClass}`}>
                  {/* Icon */}
                  <div className={`${iconSizeClass} flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] shadow-lg shadow-[#2563EB]/25 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`${iconClass} text-white`} />
                  </div>

                  <div className="flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="mb-3 text-2xl font-bold text-[#F8FAFC] tracking-tight group-hover:text-[#06B6D4] transition-colors">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-[#94A3B8]">
                      {service.description}
                    </p>

                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="bg-[#1E293B] text-[#06B6D4] border border-[#2563EB]/30 hover:bg-[#2563EB]/20 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
