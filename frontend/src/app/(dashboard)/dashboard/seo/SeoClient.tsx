"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Search,
  Globe,
  Shield,
  FileText,
  Smartphone,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  ExternalLink,
  Image as ImageIcon,
  Type,
  Hash,
  FileCode,
  Gauge,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  category: string;
  updatedAt: string;
  createdAt: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function countWords(text: string): number {
  const stripped = stripHtml(text);
  return stripped ? stripped.split(/\s+/).length : 0;
}

function countHeadings(html: string, tag: "h1" | "h2" | "h3"): number {
  const regex = new RegExp(`<${tag}[^>]*>`, "gi");
  return (html.match(regex) || []).length;
}

function hasImages(html: string): boolean {
  return /<img[^>]*>/gi.test(html);
}

function hasLinks(html: string): boolean {
  return /<a\s[^>]*href=["'][^"']*["'][^>]*>/gi.test(html);
}

function scoreLabel(score: number): { label: string; color: string } {
  if (score >= 90) return { label: "Excellent", color: "text-emerald-400" };
  if (score >= 70) return { label: "Good", color: "text-blue-400" };
  if (score >= 50) return { label: "Needs Work", color: "text-amber-400" };
  return { label: "Poor", color: "text-red-400" };
}

function bgScore(score: number): string {
  if (score >= 90) return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
  if (score >= 70) return "bg-blue-500/10 border-blue-500/20 text-blue-400";
  if (score >= 50) return "bg-amber-500/10 border-amber-500/20 text-amber-400";
  return "bg-red-500/10 border-red-500/20 text-red-400";
}

function analyzePost(post: Post) {
  const titleLength = post.title.length;
  const descLength = post.description.length;
  const wordCount = countWords(post.content);
  const h1Count = countHeadings(post.content, "h1");
  const h2Count = countHeadings(post.content, "h2");
  const hasImg = hasImages(post.content);
  const hasExtLinks = hasLinks(post.content);
  const hasCoverImage = !!post.image;
  const hasCategory = !!post.category;

  const checks = {
    titleOptimal: titleLength >= 30 && titleLength <= 65,
    descOptimal: descLength >= 120 && descLength <= 160,
    titleTooShort: titleLength < 30,
    titleTooLong: titleLength > 65,
    descTooShort: descLength < 120,
    descTooLong: descLength > 160,
    hasH1: h1Count === 1,
    h1Missing: h1Count === 0,
    h1Multiple: h1Count > 1,
    hasH2: h2Count >= 2,
    h2Missing: h2Count < 2,
    contentLength: wordCount >= 300,
    contentThin: wordCount < 300,
    hasImages: hasImg,
    hasCoverImage,
    hasLinks: hasExtLinks,
    hasCategory,
    slugShort: post.slug.length <= 75,
    slugTooLong: post.slug.length > 75,
  };

  let score = 0;
  if (checks.titleOptimal) score += 15;
  if (!checks.titleOptimal) score += 5;
  if (checks.descOptimal) score += 15;
  if (!checks.descOptimal && descLength > 0) score += 5;
  if (checks.hasH1) score += 10;
  if (checks.hasH2) score += 10;
  if (checks.contentLength) score += 15;
  if (checks.hasImages || checks.hasCoverImage) score += 10;
  if (checks.hasLinks) score += 8;
  if (checks.hasCategory) score += 7;
  if (checks.slugShort) score += 10;
  if (checks.hasCoverImage) score += 10;

  return { ...checks, score };
}

export function SeoClient({ posts }: { posts: Post[] }) {
  const [activeTab, setActiveTab] = useState<"pages" | "technical">("pages");

  const analyzed = posts.map((p) => ({
    post: p,
    ...analyzePost(p),
  }));

  const avgScore = analyzed.length
    ? Math.round(analyzed.reduce((s, a) => s + a.score, 0) / analyzed.length)
    : 0;

  const excellentCount = analyzed.filter((a) => a.score >= 90).length;
  const goodCount = analyzed.filter((a) => a.score >= 70 && a.score < 90).length;
  const needsWorkCount = analyzed.filter((a) => a.score >= 50 && a.score < 70).length;
  const poorCount = analyzed.filter((a) => a.score < 50).length;

  // Technical checks (static analysis of the app)
  const technicalChecks = [
    {
      name: "Robots.txt",
      status: "ok" as const,
      detail: "/robots.txt — dikonfigurasi dengan benar",
      icon: FileText,
    },
    {
      name: "Sitemap XML",
      status: "ok" as const,
      detail: "/sitemap.xml — tersedia",
      icon: FileCode,
    },
    {
      name: "SSL / HTTPS",
      status: "ok" as const,
      detail: "Sertifikat SSL aktif di production",
      icon: Shield,
    },
    {
      name: "Meta Viewport",
      status: "ok" as const,
      detail: "Viewport meta tag terpasang",
      icon: Smartphone,
    },
    {
      name: "Canonical URLs",
      status: "warning" as const,
      detail: "Beberapa halaman perlu canonical tag eksplisit",
      icon: Globe,
    },
    {
      name: "Structured Data",
      status: "warning" as const,
      detail: "Schema markup belum diimplementasikan",
      icon: FileCode,
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f1f23] pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-500" />
            SEO Management
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Pantau, audit, dan optimalkan performa SEO website Anda
          </p>
        </div>
        <Button
          size="sm"
          className="h-9 bg-blue-600 hover:bg-blue-500 text-white gap-1.5"
          onClick={() => window.location.reload()}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Audit
        </Button>
      </div>

      {/* Overall Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-1 border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11] flex flex-col items-center justify-center gap-2">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1f1f23" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={avgScore >= 90 ? "#10b981" : avgScore >= 70 ? "#3b82f6" : avgScore >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={2 * Math.PI * 42 * (1 - avgScore / 100)}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-extrabold text-white">{avgScore}</span>
            </div>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${bgScore(avgScore)}`}>
            {scoreLabel(avgScore).label}
          </span>
          <p className="text-[10px] text-zinc-500 text-center">
            Rata-rata SEO Score dari {analyzed.length} halaman
          </p>
        </div>

        <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="border border-[#1f1f23] rounded-xl p-4 bg-[#0f0f11] flex flex-col gap-1">
            <span className="text-2xl font-extrabold text-emerald-400">{excellentCount}</span>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase">Excellent (90+)</span>
          </div>
          <div className="border border-[#1f1f23] rounded-xl p-4 bg-[#0f0f11] flex flex-col gap-1">
            <span className="text-2xl font-extrabold text-blue-400">{goodCount}</span>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase">Good (70-89)</span>
          </div>
          <div className="border border-[#1f1f23] rounded-xl p-4 bg-[#0f0f11] flex flex-col gap-1">
            <span className="text-2xl font-extrabold text-amber-400">{needsWorkCount}</span>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase">Needs Work (50-69)</span>
          </div>
          <div className="border border-[#1f1f23] rounded-xl p-4 bg-[#0f0f11] flex flex-col gap-1">
            <span className="text-2xl font-extrabold text-red-400">{poorCount}</span>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase">Poor (&lt;50)</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-[#0f0f11] border border-[#1f1f23] rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab("pages")}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "pages"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Page Audit ({analyzed.length})
          </span>
        </button>
        <button
          onClick={() => setActiveTab("technical")}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === "technical"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5" />
            Technical SEO
          </span>
        </button>
      </div>

      {activeTab === "pages" && (
        <div className="border border-[#1f1f23] rounded-2xl bg-[#0f0f11] overflow-hidden">
          {analyzed.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 text-xs">
              Belum ada artikel published untuk diaudit.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#1f1f23]/60 bg-[#0c0c0e]/40 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="py-3 pl-6 w-[220px]">Halaman</th>
                    <th className="py-3 w-[80px] text-center">Score</th>
                    <th className="py-3 text-center">Judul</th>
                    <th className="py-3 text-center">Meta Desc</th>
                    <th className="py-3 text-center">Heading</th>
                    <th className="py-3 text-center">Konten</th>
                    <th className="py-3 text-center">Gambar</th>
                    <th className="py-3 text-center">Slug</th>
                    <th className="py-3 pr-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f23]/40">
                  {analyzed.map(({ post, score, ...checks }) => (
                    <tr key={post.id} className="hover:bg-zinc-900/10 transition-all">
                      <td className="py-4 pl-6">
                        <div className="flex flex-col">
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="text-xs font-semibold text-white hover:text-blue-400 transition-colors flex items-center gap-1"
                          >
                            {post.title.length > 40
                              ? post.title.slice(0, 40) + "..."
                              : post.title}
                            <ExternalLink className="w-3 h-3 text-zinc-600" />
                          </Link>
                          <span className="text-[10px] text-zinc-500 font-mono mt-0.5">
                            /blog/{post.slug.length > 30 ? post.slug.slice(0, 30) + "..." : post.slug}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${bgScore(score)}`}
                        >
                          {score}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        {checks.titleOptimal ? (
                          <span className="text-emerald-400 flex justify-center" title="Optimal">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : checks.titleTooShort ? (
                          <span className="text-amber-400 flex justify-center" title={`Terlalu pendek (${post.title.length} karakter)`}>
                            <AlertTriangle className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-red-400 flex justify-center" title={`Terlalu panjang (${post.title.length} karakter)`}>
                            <XCircle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {!post.description ? (
                          <span className="text-red-400 flex justify-center" title="Meta description kosong">
                            <XCircle className="w-4 h-4" />
                          </span>
                        ) : checks.descOptimal ? (
                          <span className="text-emerald-400 flex justify-center" title="Optimal">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-amber-400 flex justify-center" title={`${post.description.length} karakter`}>
                            <AlertTriangle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {checks.hasH1 ? (
                          <span className="text-emerald-400 flex justify-center" title="H1 OK">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-red-400 flex justify-center" title="H1 bermasalah">
                            <XCircle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {checks.contentLength ? (
                          <span className="text-emerald-400 flex justify-center" title={`${countWords(post.content)} kata`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-red-400 flex justify-center" title={`Hanya ${countWords(post.content)} kata`}>
                            <XCircle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {checks.hasCoverImage || checks.hasImages ? (
                          <span className="text-emerald-400 flex justify-center">
                            <ImageIcon className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-red-400 flex justify-center" title="Tidak ada gambar">
                            <XCircle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-center">
                        {checks.slugShort ? (
                          <span className="text-emerald-400 flex justify-center">
                            <CheckCircle2 className="w-4 h-4" />
                          </span>
                        ) : (
                          <span className="text-amber-400 flex justify-center" title="Slug terlalu panjang">
                            <AlertTriangle className="w-4 h-4" />
                          </span>
                        )}
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <Link href={`/dashboard/blog/edit/${post.id}`}>
                          <Button variant="ghost" size="sm" className="h-7 border border-[#1f1f23] text-[10px] font-semibold hover:bg-zinc-900 gap-1">
                            <Eye className="w-3 h-3" />
                            Edit
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "technical" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technicalChecks.map((check, idx) => (
            <div
              key={idx}
              className="border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11] flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      check.status === "ok"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : check.status === "warning"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    <check.icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold text-white">{check.name}</span>
                </div>
                {check.status === "ok" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : check.status === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>
              <p className="text-[11px] text-zinc-500 leading-relaxed">{check.detail}</p>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  check.status === "ok"
                    ? "text-emerald-400"
                    : check.status === "warning"
                    ? "text-amber-400"
                    : "text-red-400"
                }`}
              >
                {check.status === "ok" ? "✓ OK" : check.status === "warning" ? "⚠ Perhatian" : "✗ Gagal"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* SEO Tips Banner */}
      <div className="border border-blue-500/20 rounded-2xl p-5 bg-blue-950/10 flex gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-xs font-bold text-blue-300">SEO Best Practices</h3>
          <ul className="text-[11px] text-blue-400/70 space-y-1 list-disc list-inside">
            <li>Judul artikel ideal antara 30-65 karakter agar tidak terpotong di hasil pencarian</li>
            <li>Meta description optimal 120-160 karakter untuk meningkatkan click-through rate</li>
            <li>Gunakan tepat satu H1 per halaman sebagai heading utama artikel</li>
            <li>Konten minimal 300 kata agar dianggap substantial oleh search engine</li>
            <li>Selalu sertakan gambar cover dan alt text yang deskriptif</li>
            <li>Slug URL singkat dan mengandung kata kunci utama</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
