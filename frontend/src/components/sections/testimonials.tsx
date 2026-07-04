"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

import { TESTIMONIALS } from "@/lib/data";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AUTOPLAY_INTERVAL = 5000;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setActiveIndex((prev) => {
        const next = prev + newDirection;
        if (next < 0) return TESTIMONIALS.length - 1;
        if (next >= TESTIMONIALS.length) return 0;
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [activeIndex, paginate]);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section id="testimonials" className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#2563EB]/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-4 py-1.5 text-sm font-medium text-[#8B5CF6]">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Apa Kata{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Klien Kami
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#94A3B8]">
            Kepuasan klien adalah prioritas utama kami. Berikut testimoni dari klien yang telah mempercayakan proyek mereka kepada kami.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation arrows */}
          <button
            onClick={() => paginate(-1)}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-[#1E293B]/80 p-2 text-[#94A3B8] backdrop-blur-sm transition-all hover:border-[#2563EB]/50 hover:bg-[#1E293B] hover:text-[#F8FAFC] lg:-left-16"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-[#1E293B]/80 p-2 text-[#94A3B8] backdrop-blur-sm transition-all hover:border-[#2563EB]/50 hover:bg-[#1E293B] hover:text-[#F8FAFC] lg:-right-16"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Card container */}
          <div className="relative min-h-[320px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full"
              >
                {(() => {
                  const testimonial = TESTIMONIALS[activeIndex];
                  return (
                    <div className="rounded-2xl border border-white/10 bg-[#1E293B]/50 p-8 backdrop-blur-md sm:p-10">
                      {/* Stars */}
                      <div className="mb-6 flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-5 ${
                              i < testimonial.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-transparent text-[#94A3B8]/30"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Review text */}
                      <blockquote className="mb-8 text-lg leading-relaxed text-[#F8FAFC]/90 sm:text-xl">
                        &ldquo;{testimonial.text}&rdquo;
                      </blockquote>

                      {/* Client info */}
                      <div className="flex items-center gap-4">
                        {/* Avatar with gradient */}
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] via-[#06B6D4] to-[#8B5CF6]">
                          <span className="text-sm font-bold text-white">
                            {getInitials(testimonial.name)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#F8FAFC]">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-[#94A3B8]">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-gradient-to-r from-[#2563EB] to-[#06B6D4]"
                    : "w-2 bg-[#94A3B8]/30 hover:bg-[#94A3B8]/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom cards preview (desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 hidden grid-cols-4 gap-4 lg:grid"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                index === activeIndex
                  ? "border-[#2563EB]/50 bg-[#1E293B]/80 shadow-lg shadow-[#2563EB]/10"
                  : "border-white/5 bg-[#1E293B]/30 hover:border-white/10 hover:bg-[#1E293B]/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] transition-opacity ${
                    index === activeIndex ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <span className="text-xs font-bold text-white">
                    {getInitials(testimonial.name)}
                  </span>
                </div>
                <div className="min-w-0">
                  <p
                    className={`truncate text-sm font-medium ${
                      index === activeIndex ? "text-[#F8FAFC]" : "text-[#94A3B8]"
                    }`}
                  >
                    {testimonial.name}
                  </p>
                  <p className="truncate text-xs text-[#94A3B8]/70">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
