"use client";

import { motion } from "framer-motion";

import { FAQ_ITEMS } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
        <div className="absolute bottom-1/3 -left-40 h-80 w-80 rounded-full bg-[#06B6D4]/10 blur-3xl" />
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
          <h2 className="text-3xl font-bold text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Pertanyaan yang{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Sering Diajukan
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#94A3B8] sm:text-lg">
            Temukan jawaban untuk pertanyaan umum tentang layanan dan proses
            kerja kami.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion>
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <AccordionItem
                  value={index}
                  className="mb-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg px-6 py-1 last:mb-0"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-medium text-[#F8FAFC] hover:no-underline hover:text-[#06B6D4] [&_svg]:text-[#94A3B8]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[#94A3B8] leading-relaxed text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
