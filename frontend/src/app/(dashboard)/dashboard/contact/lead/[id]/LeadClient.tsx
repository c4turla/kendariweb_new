"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Save, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { updateLeadStatus } from "@/app/actions/lead";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Lead {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  projectType: string;
  budget: string | null;
  description: string;
  status: string;
  createdAt: Date;
}

export function LeadClient({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse phone number for WhatsApp URL (assuming Indonesian by default if it doesn't start with country code, but just basic stripping here)
  const waNumber = lead.whatsapp.replace(/\D/g, "");
  const waUrl = `https://wa.me/${waNumber.startsWith('0') ? '62' + waNumber.substring(1) : waNumber}`;

  const handleUpdateStatus = async () => {
    setIsSubmitting(true);
    try {
      const res = await updateLeadStatus(lead.id, status as "new" | "contacted" | "closed");
      if (res.success) {
        toast.success("Status prospek berhasil diperbarui.");
        router.refresh();
      } else {
        toast.error(res.error || "Gagal memperbarui status.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/contact">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white border border-[#1f1f23] rounded-xl hover:bg-zinc-900">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Follow Up: {lead.name}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Tinjau detail kebutuhan proyek klien dan perbarui status followup.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Lead Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="border border-[#1f1f23] rounded-2xl bg-[#0f0f11] overflow-hidden p-6 space-y-8">
            {/* Contact Info section */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-[#1f1f23]/60 pb-3 mb-4">
                Informasi Kontak
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase">Nama Lengkap</span>
                  <p className="text-sm font-semibold text-white">{lead.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase">Terdaftar Pada</span>
                  <p className="text-sm font-medium text-zinc-300 font-mono flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {new Date(lead.createdAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase">Email Address</span>
                  <a href={`mailto:${lead.email}`} className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                    {lead.email}
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase">No. WhatsApp</span>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {lead.whatsapp}
                  </a>
                </div>
              </div>
            </div>

            {/* Project Specs */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-[#1f1f23]/60 pb-3 mb-4">
                Spesifikasi Proyek
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase">Tipe Layanan / Proyek</span>
                  <div className="inline-flex mt-1">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-200 border border-zinc-700">
                      {lead.projectType}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase">Estimasi Budget</span>
                  <p className="text-sm font-mono font-semibold text-emerald-400 mt-1">
                    {lead.budget || "Belum ditentukan"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 bg-[#161619] border border-[#1f1f23] rounded-xl p-4">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase block">Pesan / Deskripsi Proyek</span>
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-medium">
                  {lead.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          <div className="border border-[#1f1f23] rounded-2xl bg-[#0f0f11] p-6 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                Progress Management
              </h3>
              <div className="space-y-3">
                <Label className="text-zinc-300 text-xs font-semibold">Ubah Status</Label>
                <Select value={status} onValueChange={(val) => setStatus(val || status)}>
                  <SelectTrigger className="h-11 bg-[#161619] border-[#1f1f23] text-white rounded-xl focus:border-blue-600/60 focus:ring-blue-600/20">
                    <SelectValue placeholder="Status lead" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f0f11] border-[#1f1f23] text-white">
                    <SelectItem value="new" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        New Lead
                      </div>
                    </SelectItem>
                    <SelectItem value="contacted" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Contacted / Follow Up
                      </div>
                    </SelectItem>
                    <SelectItem value="closed" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-zinc-500"></span>
                        Closed / Selesai
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={handleUpdateStatus} 
                  disabled={isSubmitting || status === lead.status}
                  className="w-full h-10 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</>
                  ) : (
                    <><Save className="w-4 h-4 mr-2" /> Simpan Status</>
                  )}
                </Button>
              </div>
            </div>

            <div className="border-t border-[#1f1f23]/60 pt-6">
               <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-col gap-2">
                <a 
                  href={waUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg shadow-emerald-900/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat via WhatsApp
                </a>
                <a 
                  href={`mailto:${lead.email}?subject=Follow Up Project: ${lead.projectType}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-[#1f1f23] text-white font-bold text-xs transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Kirim Email Balasan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
