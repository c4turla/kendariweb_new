"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ArrowLeft, Save, Sparkles, Loader2, Link2, Upload, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { upsertPortfolio } from "@/app/actions/portfolio";
import { uploadImage } from "@/app/actions/upload";
import { toast } from "sonner";

interface Portfolio {
  id: string;
  title: string;
  category: string | null;
  industry: string | null;
  image: string | null;
  tech: string | null;
  url: string | null;
  status: string;
}

export default function PortfolioForm({ initialPortfolio }: { initialPortfolio?: Portfolio | null }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: initialPortfolio?.title || "",
    category: initialPortfolio?.category || "Landing Page",
    industry: initialPortfolio?.industry || "General Business",
    image: initialPortfolio?.image || "",
    tech: initialPortfolio?.tech || "",
    url: initialPortfolio?.url || "",
    status: initialPortfolio?.status || "draft",
  });

  const [imageUploadMode, setImageUploadMode] = useState<"url" | "upload">("url");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran gambar terlalu besar (Maks 5MB)");
      return;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await uploadImage(formData);
      if (res.success && res.url) {
        setForm(prev => ({ ...prev, image: res.url! }));
        toast.success("Gambar mockup berhasil diunggah");
      } else {
        toast.error(res.error || "Gagal mengunggah gambar mockup");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem saat mengunggah gambar");
    } finally {
      setIsUploadingImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    if (initialPortfolio?.id) {
      formData.append("id", initialPortfolio.id);
    }
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("industry", form.industry);
    formData.append("image", form.image);
    formData.append("tech", form.tech);
    formData.append("url", form.url);
    formData.append("status", form.status);

    try {
      const res = await upsertPortfolio(null, formData);
      if (res.success) {
        toast.success(initialPortfolio ? "Proyek berhasil diperbarui!" : "Proyek baru berhasil ditambahkan!", {
          duration: 4000
        });
        router.push("/dashboard/portfolio");
        router.refresh();
      } else {
        setError(res.error || "Gagal menyimpan proyek.");
        toast.error(res.error || "Gagal menyimpan proyek.");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/portfolio">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white border border-[#1f1f23] rounded-xl hover:bg-zinc-900">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {initialPortfolio ? "Edit Project Portfolio" : "Tambah Proyek Baru"}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {initialPortfolio ? "Perbarui informasi dan tampilan proyek Anda" : "Tambahkan proyek showcase baru berkualitas untuk klien"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main fields (left) */}
          <div className="md:col-span-2 space-y-5">
            <div className="border border-[#1f1f23] rounded-2xl p-6 bg-[#0f0f11] space-y-5">
              <div className="space-y-2">
                <Label className="text-zinc-300 text-xs font-semibold">Nama Proyek / Client</Label>
                <Input
                  required
                  placeholder="Contoh: Rumah Ria E-Commerce"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  className="h-11 bg-[#161619] border-[#1f1f23] text-white placeholder:text-zinc-600 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/20 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs font-semibold">Kategori Proyek</Label>
          <Select
            value={form.category}
            onValueChange={(val) => setForm(prev => ({ ...prev, category: val || "" }))}
          >
                    <SelectTrigger className="h-11 bg-[#161619] border-[#1f1f23] text-white rounded-xl focus:border-blue-600/60 focus:ring-blue-600/20">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0f0f11] border-[#1f1f23] text-white">
                      <SelectItem value="Landing Page" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Landing Page</SelectItem>
                      <SelectItem value="Company Profile Website" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Company Profile Website</SelectItem>
                      <SelectItem value="E-Commerce Website" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">E-Commerce Website</SelectItem>
                      <SelectItem value="Web Application" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Web Application</SelectItem>
                      <SelectItem value="Mobile Application" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Mobile Application</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-zinc-300 text-xs font-semibold">Industri Bisnis</Label>
                  <Input
                    placeholder="Contoh: Fashion & Apparel, F&B, Agriculture"
                    value={form.industry}
                    onChange={(e) => setForm(prev => ({ ...prev, industry: e.target.value }))}
                    className="h-11 bg-[#161619] border-[#1f1f23] text-white placeholder:text-zinc-600 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/20 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300 text-xs font-semibold">Tech Stack (Pisahkan dengan koma)</Label>
                <Input
                  placeholder="React, Next.js, Drizzle, TailwindCSS"
                  value={form.tech}
                  onChange={(e) => setForm(prev => ({ ...prev, tech: e.target.value }))}
                  className="h-11 bg-[#161619] border-[#1f1f23] text-white placeholder:text-zinc-600 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/20 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300 text-xs font-semibold">URL Proyek Aktif</Label>
                <div className="relative">
                  <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <Input
                    placeholder="https://rumahria.com"
                    value={form.url}
                    onChange={(e) => setForm(prev => ({ ...prev, url: e.target.value }))}
                    className="h-11 pl-10 bg-[#161619] border-[#1f1f23] text-white placeholder:text-zinc-600 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/20 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar configurations */}
          <div className="space-y-5">
            <div className="border border-[#1f1f23] rounded-2xl p-6 bg-[#0f0f11] space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-[#1f1f23]/60 pb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Pengaturan Proyek
              </h3>

              <div className="space-y-2">
                <Label className="text-zinc-300 text-xs font-semibold">Status Penerbitan</Label>
          <Select
            value={form.status}
            onValueChange={(val) => setForm(prev => ({ ...prev, status: val || "draft" }))}
          >
                  <SelectTrigger className="h-11 bg-[#161619] border-[#1f1f23] text-white rounded-xl focus:border-blue-600/60 focus:ring-blue-600/20">
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f0f11] border-[#1f1f23] text-white">
                    <SelectItem value="draft" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Draft</SelectItem>
                    <SelectItem value="published" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Published</SelectItem>
                    <SelectItem value="archived" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-300 text-xs font-semibold">Cover Mockup Image</Label>
                  <div className="flex bg-[#161619] rounded-lg p-0.5 border border-[#1f1f23]">
                    <button
                      type="button"
                      onClick={() => setImageUploadMode("url")}
                      className={`px-2 py-1 text-[10px] rounded-md transition-colors flex items-center gap-1 font-medium ${
                        imageUploadMode === "url" 
                          ? "bg-zinc-800 text-white shadow-sm" 
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <LinkIcon className="w-3 h-3" />
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageUploadMode("upload")}
                      className={`px-2 py-1 text-[10px] rounded-md transition-colors flex items-center gap-1 font-medium ${
                        imageUploadMode === "upload" 
                          ? "bg-zinc-800 text-white shadow-sm" 
                          : "text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <Upload className="w-3 h-3" />
                      Upload
                    </button>
                  </div>
                </div>

                {imageUploadMode === "url" ? (
                  <Input
                    placeholder="https://images.unsplash.com/..."
                    value={form.image}
                    onChange={(e) => setForm(prev => ({ ...prev, image: e.target.value }))}
                    className="h-11 bg-[#161619] border-[#1f1f23] text-white placeholder:text-zinc-600 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/20 rounded-xl text-xs"
                  />
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                    />
                    <div className="h-11 bg-[#161619] border border-[#1f1f23] rounded-xl flex items-center justify-center gap-2 text-xs text-zinc-400 hover:bg-[#1a1a1d] hover:text-zinc-300 transition-colors border-dashed">
                      {isUploadingImage ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                          <span>Mengunggah...</span>
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4" />
                          <span>Pilih file mockup (Maks 5MB)</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {imageUploadMode === "upload" && form.image && (
                  <div className="text-[10px] text-zinc-500 flex items-center justify-between bg-zinc-900/50 p-2 rounded-lg border border-white/5">
                    <span className="truncate pr-2">{form.image.split('/').pop()}</span>
                    <button 
                      type="button" 
                      onClick={() => setForm(prev => ({ ...prev, image: "" }))}
                      className="text-red-400 hover:text-red-300 font-medium shrink-0"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              {form.image && (
                <div className="space-y-2">
                  <Label className="text-zinc-500 text-[10px] uppercase font-semibold">Preview Cover</Label>
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#1f1f23]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={form.image} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800";
                      }}
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/10 disabled:opacity-50 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Simpan Proyek
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
