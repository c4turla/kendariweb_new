"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ArrowLeft, Save, Sparkles, Loader2, Upload, Link as LinkIcon, Image as ImageIcon, CheckCircle2, AlertTriangle, XCircle, TrendingUp } from "lucide-react";
import Link from "next/link";
import { upsertPost } from "@/app/actions/blog";
import { uploadImage } from "@/app/actions/upload";
import { toast } from "sonner";
import RichTextEditor from "@/components/ui/rich-text-editor";

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&[a-z]+;/gi, " ")
    .trim();
}
function countWords(html: string): number {
  const text = stripHtml(html);
  return text ? text.split(/\s+/).filter(Boolean).length : 0;
}
function countH1(html: string): number {
  return (html.match(/<h1[^>]*>/gi) || []).length;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string | null;
  image: string | null;
  category: string | null;
  status: string;
}

type SeoStatus = "good" | "warn" | "bad";

function seoColor(status: SeoStatus): string {
  if (status === "good") return "text-emerald-400";
  if (status === "warn") return "text-amber-400";
  return "text-red-400";
}
function seoBg(status: SeoStatus): string {
  if (status === "good") return "bg-emerald-400";
  if (status === "warn") return "bg-amber-400";
  return "bg-red-400";
}
function SeoIcon({ status }: { status: SeoStatus }) {
  const cls = "w-3.5 h-3.5";
  if (status === "good") return <CheckCircle2 className={`${cls} text-emerald-400`} />;
  if (status === "warn") return <AlertTriangle className={`${cls} text-amber-400`} />;
  return <XCircle className={`${cls} text-red-400`} />;
}

export default function BlogForm({ initialPost }: { initialPost?: Post | null }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: initialPost?.title || "",
    slug: initialPost?.slug || "",
    description: initialPost?.description || "",
    image: initialPost?.image || "",
    category: initialPost?.category || "Tutorial",
    status: initialPost?.status || "draft",
    content: initialPost?.content || "",
  });

  const [imageUploadMode, setImageUploadMode] = useState<"url" | "upload">("url");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const seo = useMemo(() => {
    const titleLen = form.title.length;
    const descLen = form.description.length;
    const slugLen = form.slug.length;
    const wc = countWords(form.content);
    const h1c = countH1(form.content);
    const hasImg = !!form.image;

    const titleStatus: SeoStatus = titleLen === 0 ? "bad" : titleLen >= 30 && titleLen <= 65 ? "good" : "warn";
    const descStatus: SeoStatus = descLen === 0 ? "bad" : descLen >= 120 && descLen <= 160 ? "good" : "warn";
    const slugStatus: SeoStatus = slugLen === 0 ? "bad" : slugLen <= 75 ? "good" : "warn";
    const contentStatus: SeoStatus = wc >= 300 ? "good" : "warn";
    const h1Status: SeoStatus = h1c === 1 ? "good" : h1c === 0 ? "warn" : "bad";
    const imageStatus: SeoStatus = hasImg ? "good" : "warn";

    let score = 0;
    if (titleStatus === "good") score += 20;
    else if (titleStatus === "warn") score += 10;
    if (descStatus === "good") score += 20;
    else if (descStatus === "warn") score += 10;
    if (slugStatus === "good") score += 15;
    else if (slugStatus === "warn") score += 7;
    if (contentStatus === "good") score += 20;
    else if (contentStatus === "warn") score += 5;
    if (h1Status === "good") score += 15;
    if (imageStatus === "good") score += 10;

    return { titleLen, descLen, slugLen, wc, h1c, hasImg, titleStatus, descStatus, slugStatus, contentStatus, h1Status, imageStatus, score };
  }, [form.title, form.description, form.slug, form.content, form.image]);

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
        toast.success("Gambar berhasil diunggah");
      } else {
        toast.error(res.error || "Gagal mengunggah gambar");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan sistem saat mengunggah gambar");
    } finally {
      setIsUploadingImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm(prev => {
      const updated = { ...prev, title: val };
      if (!initialPost) {
        updated.slug = val
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .trim();
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const cleanContent = form.content.replace(/<[^>]*>/g, "").trim();
    if (!cleanContent || cleanContent === "") {
      setError("Konten artikel wajib diisi.");
      toast.error("Konten artikel wajib diisi.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    if (initialPost?.id) {
      formData.append("id", initialPost.id);
    }
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("image", form.image);
    formData.append("category", form.category);
    formData.append("status", form.status);
    formData.append("content", form.content);

    try {
      const res = await upsertPost(null, formData);
      if (res.success) {
        toast.success(initialPost ? "Artikel berhasil diperbarui!" : "Artikel baru berhasil ditambahkan!", {
          duration: 4000
        });
        router.push("/dashboard/blog");
        router.refresh();
      } else {
        setError(res.error || "Gagal menyimpan artikel.");
        toast.error(res.error || "Gagal menyimpan artikel.");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem.");
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pb-16">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/blog">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-zinc-400 hover:text-white border border-[#1f1f23] rounded-xl hover:bg-zinc-900">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {initialPost ? "Edit Blog Post" : "Buat Artikel Baru"}
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            {initialPost ? "Perbarui informasi dan konten artikel Anda" : "Tulis artikel baru berkualitas untuk landing page Anda"}
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

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main fields (left) */}
          <div className="xl:col-span-3 space-y-5">
            <div className="border border-[#1f1f23] rounded-2xl p-6 bg-[#0f0f11] space-y-5">
              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-300 text-xs font-semibold">Judul Artikel</Label>
                  <div className="flex items-center gap-1.5">
                    <SeoIcon status={seo.titleStatus} />
                    <span className={`text-[10px] font-mono font-semibold ${seoColor(seo.titleStatus)}`}>
                      {seo.titleLen}/30-65
                    </span>
                  </div>
                </div>
                <Input
                  required
                  placeholder="Contoh: Belajar Next.js 15 untuk Pemula"
                  value={form.title}
                  onChange={handleTitleChange}
                  className="h-11 bg-[#161619] border-[#1f1f23] text-white placeholder:text-zinc-600 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/20 rounded-xl"
                />
                {seo.titleLen > 0 && seo.titleStatus !== "good" && (
                  <p className={`text-[10px] ${seoColor(seo.titleStatus)}`}>
                    {seo.titleStatus === "warn" && (seo.titleLen < 30 ? "Judul terlalu pendek, idealnya 30-65 karakter" : "Judul terlalu panjang, idealnya 30-65 karakter")}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Label className="text-zinc-300 text-xs font-semibold">Slug URL</Label>
                    <SeoIcon status={seo.slugStatus} />
                  </div>
                  <span className="text-[10px] text-zinc-600 font-mono">
                    /blog/{form.slug || "nama-slug"}
                    <span className={`ml-1 ${seoColor(seo.slugStatus)}`}>({seo.slugLen})</span>
                  </span>
                </div>
                <Input
                  required
                  placeholder="belajar-nextjs-15-pemula"
                  value={form.slug}
                  onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") }))}
                  className="h-11 bg-[#161619] border-[#1f1f23] text-white placeholder:text-zinc-600 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/20 rounded-xl font-mono text-xs"
                />
                {seo.slugLen > 0 && seo.slugStatus === "warn" && (
                  <p className="text-[10px] text-amber-400">Slug terlalu panjang, idealnya di bawah 75 karakter</p>
                )}
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-300 text-xs font-semibold">Deskripsi Singkat / Meta Description</Label>
                  <div className="flex items-center gap-1.5">
                    <SeoIcon status={seo.descStatus} />
                    <span className={`text-[10px] font-mono font-semibold ${seoColor(seo.descStatus)}`}>
                      {seo.descLen}/120-160
                    </span>
                  </div>
                </div>
                <Textarea
                  placeholder="Tulis ringkasan singkat artikel di sini (120-160 karakter ideal)..."
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="bg-[#161619] border-[#1f1f23] text-white placeholder:text-zinc-600 focus-visible:border-blue-600/60 focus-visible:ring-blue-600/20 rounded-xl text-xs"
                />
                {seo.descLen > 0 && seo.descStatus !== "good" && (
                  <p className={`text-[10px] ${seoColor(seo.descStatus)}`}>
                    {seo.descLen < 120 ? `Meta description terlalu pendek (${seo.descLen} karakter). Idealnya 120-160 karakter untuk meningkatkan CTR.` : `Meta description terlalu panjang (${seo.descLen} karakter). Idealnya 120-160 karakter.`}
                  </p>
                )}
              </div>

              {/* Content Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-300 text-xs font-semibold">Konten Lengkap (WYSIWYG Editor)</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <SeoIcon status={seo.contentStatus} />
                      <span className={`text-[10px] font-mono font-semibold ${seoColor(seo.contentStatus)}`}>
                        {seo.wc} kata
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <SeoIcon status={seo.h1Status} />
                      <span className={`text-[10px] font-mono font-semibold ${seoColor(seo.h1Status)}`}>
                        H1: {seo.h1c}
                      </span>
                    </div>
                  </div>
                </div>
                <RichTextEditor 
                  value={form.content} 
                  onChange={(val) => setForm(prev => ({ ...prev, content: val }))}
                  placeholder="Tulis artikel berkualitas Anda di sini..."
                />
                <div className="flex flex-col gap-1 mt-1">
                  {(!form.content || seo.wc < 300) && (
                    <p className={`text-[10px] ${seoColor(seo.contentStatus)} flex items-center gap-1`}>
                      <AlertTriangle className="w-3 h-3" />
                      {!form.content ? "Konten belum diisi. Minimal 300 kata agar dianggap substantial oleh search engine." : `Konten baru ${seo.wc} kata. Target minimal 300 kata untuk SEO optimal.`}
                    </p>
                  )}
                  {form.content && seo.h1c !== 1 && (
                    <p className={`text-[10px] ${seoColor(seo.h1Status)} flex items-center gap-1`}>
                      <AlertTriangle className="w-3 h-3" />
                      {seo.h1c === 0 ? "Tidak ada H1. Gunakan tepat 1 heading H1 sebagai judul utama artikel." : `Terlalu banyak H1 (${seo.h1c}). Gunakan tepat 1 H1 per halaman.`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar configuration (right) */}
          <div className="space-y-5">
            {/* SEO Score Card */}
            <div className="border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11] space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                SEO Score
              </h3>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 40 40" className="w-12 h-12 -rotate-90">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#1f1f23" strokeWidth="4" />
                    <circle cx="20" cy="20" r="16" fill="none"
                      stroke={seo.score >= 80 ? "#10b981" : seo.score >= 50 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="4" strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 16}
                      strokeDashoffset={2 * Math.PI * 16 * (1 - seo.score / 100)}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <span className="absolute text-xs font-extrabold text-white">{seo.score}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[10px] font-bold ${seo.score >= 80 ? "text-emerald-400" : seo.score >= 50 ? "text-amber-400" : "text-red-400"}`}>
                    {seo.score >= 80 ? "Excellent" : seo.score >= 50 ? "Perlu Optimasi" : "Butuh Perbaikan"}
                  </span>
                  <span className="text-[10px] text-zinc-500">Skor SEO artikel ini</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-1 border-t border-[#1f1f23]/60">
                {[
                  { label: "Judul", value: seo.titleLen, target: "30-65 karakter", status: seo.titleStatus },
                  { label: "Meta Desc", value: seo.descLen, target: "120-160 karakter", status: seo.descStatus },
                  { label: "Slug", value: seo.slugLen, target: "<75 karakter", status: seo.slugStatus },
                  { label: "Konten", value: seo.wc, target: "≥300 kata", status: seo.contentStatus },
                  { label: "Heading H1", value: seo.h1c, target: "1 H1", status: seo.h1Status },
                  { label: "Cover Image", value: seo.hasImg ? "✓" : "✗", target: "Ada gambar", status: seo.imageStatus },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-2">
                    <span className="text-[10px] text-zinc-500 w-20 shrink-0">{item.label}</span>
                    <div className="flex-1 h-1 bg-[#1f1f23] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${seoBg(item.status)}`}
                        style={{ width: `${Math.min(100, (item.status === "good" ? 100 : item.status === "warn" ? 50 : 20))}%` }} />
                    </div>
                    <span className={`text-[10px] font-mono font-semibold w-24 text-right ${seoColor(item.status)}`}>
                      {item.value} / {item.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-[#1f1f23] rounded-2xl p-6 bg-[#0f0f11] space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 border-b border-[#1f1f23]/60 pb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                Pengaturan Artikel
              </h3>

              <div className="space-y-2">
                <Label className="text-zinc-300 text-xs font-semibold">Kategori Artikel</Label>
          <Select
            value={form.category}
            onValueChange={(val) => setForm(prev => ({ ...prev, category: val || "" }))}
          >
                  <SelectTrigger className="h-11 bg-[#161619] border-[#1f1f23] text-white rounded-xl focus:border-blue-600/60 focus:ring-blue-600/20">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f0f11] border-[#1f1f23] text-white">
                    <SelectItem value="Tutorial" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Tutorial</SelectItem>
                    <SelectItem value="Teknologi" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Teknologi</SelectItem>
                    <SelectItem value="Bisnis" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Bisnis</SelectItem>
                    <SelectItem value="Desain" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Desain</SelectItem>
                    <SelectItem value="Tips & Trik" className="focus:bg-zinc-800 text-zinc-300 focus:text-white">Tips & Trik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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
                  <div className="flex items-center gap-1.5">
                    <Label className="text-zinc-300 text-xs font-semibold">Cover Image</Label>
                    <SeoIcon status={seo.imageStatus} />
                  </div>
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
                          <span>Pilih file gambar (Maks 5MB)</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
                
                {!seo.hasImg && (
                  <p className="text-[10px] text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Cover image belum diisi. Gambar penting untuk SEO dan social sharing.
                  </p>
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
                    <img 
                      src={form.image} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800";
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
                    Simpan Artikel
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
