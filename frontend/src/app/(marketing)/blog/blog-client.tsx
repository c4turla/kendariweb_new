"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { BlogPagination } from "./blog-pagination";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  date_created: string | null;
  image: string | null;
  imageUrl?: string | null;
}

const gradientPresets = [
  "from-[#2563EB] to-[#06B6D4]",
  "from-[#06B6D4] to-[#10B981]",
  "from-[#8B5CF6] to-[#2563EB]",
  "from-[#F59E0B] to-[#EF4444]",
  "from-[#06B6D4] to-[#8B5CF6]",
  "from-[#2563EB] to-[#8B5CF6]",
];

const patternPresets = [
  "bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:16px_16px]",
  "bg-[linear-gradient(45deg,#ffffff11_25%,transparent_25%,transparent_50%,#ffffff11_50%,#ffffff11_75%,transparent_75%,transparent)] [background-size:24px_24px]",
  "bg-[radial-gradient(ellipse_at_center,#ffffff22_0%,transparent_70%)]",
  "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#ffffff11_10px,#ffffff11_20px)]",
  "bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]",
  "bg-[linear-gradient(90deg,#ffffff11_1px,transparent_1px),linear-gradient(0deg,#ffffff11_1px,transparent_1px)] [background-size:20px_20px]",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogPageClient({
  posts,
  currentPage,
  totalPages,
}: {
  posts: BlogPost[];
  currentPage: number;
  totalPages: number;
}) {
  if (posts.length === 0) {
    return (
      <main className="relative min-h-screen bg-[#0F172A] selection:bg-[#2563EB]/30">
        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="mx-auto size-12 text-[#94A3B8] mb-4" />
            <h1 className="text-4xl font-extrabold text-[#F8FAFC]">Blog</h1>
            <p className="mt-4 text-lg text-[#94A3B8]">Belum ada artikel tersedia. Silakan cek kembali nanti.</p>
          </div>
        </div>
      </main>
    );
  }

  const isFirstPage = currentPage <= 1;
  const featuredPost = isFirstPage && posts.length > 0 ? posts[0] : null;
  const gridPosts = isFirstPage ? posts.slice(1) : posts;

  return (
    <main className="relative min-h-screen bg-[#0F172A] selection:bg-[#2563EB]/30">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[70vw] w-[70vw] rounded-full bg-gradient-to-br from-[#2563EB]/10 to-transparent blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] -right-[20%] h-[60vw] w-[60vw] rounded-full bg-gradient-to-bl from-[#8B5CF6]/10 to-transparent blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        
        {/* ============ HEADER ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-6 backdrop-blur-md">
            <BookOpen className="size-4 text-[#06B6D4]" />
            <span className="text-sm font-medium text-[#F8FAFC]">Insight & Pengetahuan</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl lg:leading-[1.1]">
            Jelajahi Dunia{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
              Digital
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#94A3B8] sm:text-xl">
            Kumpulan artikel, tips, dan panduan terkini untuk membantu mengembangkan bisnis Anda di era modern.
          </p>
        </motion.div>

        {/* ============ FEATURED POST ============ */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative flex flex-col lg:flex-row overflow-hidden rounded-[2rem] border border-white/10 bg-[#1E293B]/40 p-2 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-[#1E293B]/60 shadow-2xl shadow-black/40"
            >
              {/* Image/Gradient Area */}
              <div className={`relative min-h-[300px] lg:w-1/2 overflow-hidden rounded-[1.5rem] ${featuredPost.imageUrl ? '' : `bg-gradient-to-br ${gradientPresets[0]}`}`}>
                        {featuredPost.imageUrl ? (
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={true}
                  />
                ) : (
                  <>
                    <div className={`absolute inset-0 opacity-20 mix-blend-overlay ${patternPresets[0]}`} />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-transparent" />
                  </>
                )}
              </div>

              {/* Content Area */}
              <div className="flex flex-col justify-center p-8 lg:w-1/2 lg:p-12 xl:p-16">
                <div className="flex items-center gap-4 text-sm font-medium text-[#94A3B8] mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="size-4 text-[#06B6D4]" />
                    {formatDate(featuredPost.date_created)}
                  </span>
                </div>

                <h2 className="mb-6 text-3xl font-bold text-[#F8FAFC] leading-tight transition-colors duration-300 group-hover:text-[#06B6D4] lg:text-4xl">
                  {featuredPost.title}
                </h2>

                {featuredPost.excerpt && (
                  <p className="mb-8 text-lg text-[#94A3B8] leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                )}

                <div className="mt-auto flex items-center gap-2 font-semibold text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#06B6D4]">
                  <span>Baca Artikel Penuh</span>
                  <div className="flex size-8 items-center justify-center rounded-full bg-white/5 transition-transform duration-300 group-hover:translate-x-2 group-hover:bg-[#06B6D4]/10">
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* ============ POSTS GRID ============ */}
        {gridPosts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {gridPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                variants={cardVariants}
                className="flex"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#1E293B]/30 backdrop-blur-lg transition-all duration-500 hover:-translate-y-1 hover:border-white/15 hover:bg-[#1E293B]/50 hover:shadow-2xl hover:shadow-[#2563EB]/10"
                >
                  {/* Thumbnail */}
                  <div className="p-2">
                    <div className={`relative h-[220px] w-full overflow-hidden rounded-[1.25rem] ${post.imageUrl ? '' : `bg-gradient-to-br ${gradientPresets[(i + 1) % gradientPresets.length]}`}`}>
                      {post.imageUrl ? (
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          unoptimized={true}
                        />
                      ) : (
                        <>
                          <div className={`absolute inset-0 opacity-20 mix-blend-overlay ${patternPresets[(i + 1) % patternPresets.length]}`} />
                          <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-transparent" />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6 pt-4">
                    <div className="flex items-center gap-3 text-xs font-medium text-[#94A3B8] mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-[#06B6D4]" />
                        {formatDate(post.date_created)}
                      </span>
                    </div>

                    <h3 className="mb-3 text-xl font-bold leading-snug text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#06B6D4] line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="mb-6 flex-1 text-sm leading-relaxed text-[#94A3B8] line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-[#F8FAFC] transition-colors duration-300 group-hover:text-[#06B6D4]">
                      Baca Selengkapnya
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        <BlogPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
