"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string | null;
  date_created: string | null;
  image: string | null;
  imageUrl?: string | null;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogDetailClient({ post }: { post: PostDetail }) {
  // Clean up duplicate title and fix text wrapping in the content
  let cleanContent = post.content;
  if (cleanContent) {
    // Replace all non-breaking spaces with normal spaces to ensure proper text wrapping
    cleanContent = cleanContent.replace(/&nbsp;/g, " ").replace(/\u00a0/g, " ");

    const normalizedTitle = post.title.toLowerCase().replace(/[^a-z0-9]/g, "");
    const h1Match = cleanContent.match(/^(?:<p[^>]*>[\s ]*<\/p>)*[\s ]*<h1[^>]*>(.*?)<\/h1>/i);
    if (h1Match) {
      const h1TextNormalized = h1Match[1]
        .replace(/<[^>]*>/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      
      if (h1TextNormalized === normalizedTitle) {
        cleanContent = cleanContent.replace(/^(?:<p[^>]*>[\s ]*<\/p>)*[\s ]*<h1[^>]*>.*?<\/h1>/i, "");
      }
    }
  }

  return (
    <main className="relative min-h-screen bg-[#0F172A] selection:bg-[#2563EB]/30">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[70vw] w-[70vw] rounded-full bg-gradient-to-br from-[#2563EB]/10 to-transparent blur-[120px] mix-blend-screen" />
        <div className="absolute top-[40%] -right-[20%] h-[60vw] w-[60vw] rounded-full bg-gradient-to-bl from-[#8B5CF6]/10 to-transparent blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#06B6D4] mb-8"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-4 text-sm font-medium text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 text-[#06B6D4]" />
                {formatDate(post.date_created)}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            {post.title}
          </h1>

          {/* Excerpt/Description */}
          {post.excerpt && (
            <p className="mt-6 text-lg text-[#94A3B8] leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </motion.header>

        {/* Featured Image */}
        {(post.imageUrl || post.image) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12 overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              src={post.imageUrl || post.image || ""}
              alt={post.title}
              width={1200}
              height={630}
              className="w-full object-cover"
              priority
              unoptimized={true}
            />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg prose-invert max-w-none
            prose-headings:text-[#F8FAFC] prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#CBD5E1] prose-p:leading-relaxed
            prose-a:text-[#06B6D4] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#F8FAFC]
            prose-ul:text-[#CBD5E1] prose-ol:text-[#CBD5E1]
            prose-li:text-[#CBD5E1]
            prose-code:text-[#06B6D4] prose-code:bg-[#1E293B] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-blockquote:border-l-[#2563EB] prose-blockquote:text-[#94A3B8]
            prose-img:rounded-xl prose-img:border prose-img:border-white/10"
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />

        {/* Share & Back */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex items-center justify-between border-t border-white/10 pt-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#06B6D4]"
          >
            <ArrowLeft className="size-4" />
            Kembali ke Blog
          </Link>

          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.excerpt || "",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
          >
            <Share2 className="mr-2 size-4" />
            Bagikan
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
