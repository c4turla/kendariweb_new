"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@/lib/data";

export function Cta() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/20 via-[#0F172A] to-[#8B5CF6]/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#2563EB]/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-[#8B5CF6]/50 to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#06B6D4]/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Siap Membawa Bisnis Anda ke{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Level Berikutnya?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#94A3B8] sm:text-lg leading-relaxed">
            Jangan biarkan bisnis Anda tertinggal di era digital. Mulai
            transformasi digital sekarang bersama tim profesional kami dan
            wujudkan website impian Anda.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              className="h-12 px-8 bg-[#2563EB] text-white text-base font-semibold hover:bg-[#2563EB]/90 shadow-lg shadow-[#2563EB]/25"
              size="lg"
              render={<Link href="/contact" />}
            >
              Konsultasi Gratis
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <Button
              className="h-12 px-8 bg-[#25D366] text-white text-base font-semibold hover:bg-[#25D366]/90 shadow-lg shadow-[#25D366]/25"
              size="lg"
              render={
                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Halo Kendariweb, saya tertarik untuk konsultasi mengenai pembuatan website.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle className="mr-2 size-4" />
              WhatsApp
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-sm text-[#94A3B8]"
          >
            Konsultasi gratis, tanpa komitmen. Respons dalam 24 jam.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
