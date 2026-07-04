"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";

import { CONTACT_INFO } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { submitLead } from "@/app/actions/lead";
import { toast } from "sonner";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Select options                                                     */
/* ------------------------------------------------------------------ */

const PROJECT_TYPES = [
  { value: "company-profile", label: "Company Profile" },
  { value: "landing-page", label: "Landing Page" },
  { value: "web-application", label: "Web Application" },
  { value: "mobile-application", label: "Mobile Application" },
  { value: "e-commerce", label: "E-Commerce" },
  { value: "other", label: "Other" },
] as const;

const BUDGET_OPTIONS = [
  { value: "under-5", label: "< Rp 5 jt" },
  { value: "5-10", label: "Rp 5-10 jt" },
  { value: "10-20", label: "Rp 10-20 jt" },
  { value: "20-50", label: "Rp 20-50 jt" },
  { value: "above-50", label: "> Rp 50 jt" },
] as const;

/* ------------------------------------------------------------------ */
/*  Form state type                                                    */
/* ------------------------------------------------------------------ */

interface ContactForm {
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  projectType: string;
  budget: string;
  description: string;
}

const initialFormState: ContactForm = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  projectType: "",
  budget: "",
  description: "",
};

/* ------------------------------------------------------------------ */
/*  Contact info items                                                 */
/* ------------------------------------------------------------------ */

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Phone,
    label: "Telepon",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT_INFO.phone,
    href: `https://wa.me/${CONTACT_INFO.whatsapp}`,
  },
  {
    icon: MapPin,
    label: "Alamat",
    value: CONTACT_INFO.address,
    href: null,
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Shared field styles                                                */
/* ------------------------------------------------------------------ */

const inputClasses =
  "h-11 w-full bg-[#1E293B]/80 border-white/10 text-[#F8FAFC] placeholder:text-[#94A3B8]/60 focus-visible:border-[#2563EB]/60 focus-visible:ring-[#2563EB]/30";

const selectTriggerClasses =
  "w-full h-11 bg-[#1E293B]/80 border-white/10 text-[#F8FAFC] hover:border-[#2563EB]/50 data-placeholder:text-[#94A3B8]/60";

const selectContentClasses =
  "bg-[#1E293B] border-white/10 text-[#F8FAFC]";

const selectItemClasses =
  "text-[#F8FAFC] focus:bg-[#2563EB]/20 focus:text-[#F8FAFC]";

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof ContactForm>(
    key: K,
    value: ContactForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const result = await submitLead({ success: false, message: "" }, formData);
      if (result.success) {
        toast.success("Pesan Terkirim!", {
          description: result.message,
          duration: 5000,
        });
        setForm(initialFormState);
      } else {
        toast.error("Gagal Mengirim Pesan", {
          description: result.message || "Silakan periksa kembali form Anda.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi Kesalahan", {
        description: "Silakan coba lagi nanti atau hubungi kami via WhatsApp.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-[#06B6D4]">
              <Mail className="size-4" />
              Contact Us
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-[#F8FAFC] sm:text-5xl lg:text-6xl">
              Hubungi{" "}
              <span className="gradient-text">Kami</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-[#94A3B8] sm:text-xl">
              Siap membantu mewujudkan solusi digital untuk bisnis Anda
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ FORM + CONTACT INFO ============ */}
      <section className="relative pb-20 sm:pb-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* ---------- Lead-gen form (left, wider) ---------- */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-3"
            >
              <div className="glass-card rounded-2xl p-6 sm:p-10">
                <h2 className="mb-2 text-2xl font-bold text-[#F8FAFC]">
                  Kirim Pesan
                </h2>
                <p className="mb-8 text-sm text-[#94A3B8]">
                  Isi formulir di bawah dan tim kami akan segera merespons.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Row 1 — Name & Company */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[#F8FAFC]">Nama</Label>
                      <Input
                        required
                        placeholder="Nama lengkap"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className={inputClasses}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#F8FAFC]">Perusahaan</Label>
                      <Input
                        placeholder="Nama perusahaan"
                        value={form.company}
                        onChange={(e) => updateField("company", e.target.value)}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Row 2 — Email & WhatsApp */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[#F8FAFC]">Email</Label>
                      <Input
                        required
                        type="email"
                        placeholder="email@contoh.com"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className={inputClasses}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#F8FAFC]">WhatsApp</Label>
                      <Input
                        required
                        type="tel"
                        placeholder="08xxxxxxxxxx"
                        value={form.whatsapp}
                        onChange={(e) =>
                          updateField("whatsapp", e.target.value)
                        }
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  {/* Row 3 — Project Type & Budget */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-[#F8FAFC]">Jenis Project</Label>
                      <Select
                        value={form.projectType}
                        onValueChange={(val) =>
                          updateField("projectType", val as string)
                        }
                      >
                        <SelectTrigger className={selectTriggerClasses}>
                          <SelectValue placeholder="Pilih jenis project" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClasses}>
                          {PROJECT_TYPES.map((type) => (
                            <SelectItem
                              key={type.value}
                              value={type.value}
                              className={selectItemClasses}
                            >
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#F8FAFC]">Budget</Label>
                      <Select
                        value={form.budget}
                        onValueChange={(val) =>
                          updateField("budget", val as string)
                        }
                      >
                        <SelectTrigger className={selectTriggerClasses}>
                          <SelectValue placeholder="Pilih range budget" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClasses}>
                          {BUDGET_OPTIONS.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className={selectItemClasses}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Row 4 — Description */}
                  <div className="space-y-2">
                    <Label className="text-[#F8FAFC]">
                      Deskripsi Project
                    </Label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="Ceritakan tentang project yang Anda butuhkan..."
                      value={form.description}
                      onChange={(e) =>
                        updateField("description", e.target.value)
                      }
                      className="w-full bg-[#1E293B]/80 border-white/10 text-[#F8FAFC] placeholder:text-[#94A3B8]/60 focus-visible:border-[#2563EB]/60 focus-visible:ring-[#2563EB]/30"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white text-base font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#2563EB]/25 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="size-5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            className="opacity-25"
                          />
                          <path
                            d="M4 12a8 8 0 018-8"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            className="opacity-75"
                          />
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="size-5" />
                        Kirim Pesan
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* ---------- Contact info sidebar (right) ---------- */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              {/* Contact details card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-6 text-xl font-bold text-[#F8FAFC]">
                  Informasi Kontak
                </h3>

                <div className="space-y-6">
                  {contactItems.map((item) => {
                    const Icon = item.icon;
                    const content = (
                      <div className="flex items-start gap-4 group">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-[#06B6D4]/30 transition-colors">
                          <Icon className="size-4 text-[#06B6D4]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                            {item.label}
                          </p>
                          <p className="mt-1 text-sm font-medium text-[#F8FAFC] break-all group-hover:text-[#06B6D4] transition-colors leading-snug">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );

                    if (item.href) {
                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {content}
                        </a>
                      );
                    }

                    return <div key={item.label}>{content}</div>;
                  })}
                </div>
              </div>

              {/* WhatsApp CTA card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10 border border-[#25D366]/20">
                    <MessageCircle className="size-4 text-[#25D366]" />
                  </div>
                  <h3 className="text-[17px] font-bold text-[#F8FAFC]">
                    Chat WhatsApp
                  </h3>
                </div>

                <p className="mb-6 text-[13px] leading-relaxed text-[#94A3B8]">
                  Butuh respons cepat? Langsung chat via WhatsApp untuk
                  konsultasi gratis.
                </p>

                <a
                  href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Halo, saya tertarik untuk konsultasi mengenai project digital.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full h-11 bg-[#25D366] text-white font-semibold hover:bg-[#25D366]/90 transition-colors shadow-lg shadow-[#25D366]/25">
                    <MessageCircle className="mr-2 size-5" />
                    Chat Sekarang
                  </Button>
                </a>
              </div>

              {/* Office hours card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8">
                <h3 className="mb-4 text-lg font-bold text-[#F8FAFC]">
                  Jam Operasional
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Senin - Jumat</span>
                    <span className="font-medium text-[#F8FAFC]">
                      09:00 - 18:00 WITA
                    </span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Sabtu</span>
                    <span className="font-medium text-[#F8FAFC]">
                      09:00 - 15:00 WITA
                    </span>
                  </div>
                  <div className="h-px bg-white/5" />
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Minggu</span>
                    <span className="font-medium text-[#94A3B8]">Tutup</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
