"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Edit, Eye, Calendar, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DeletePostButton from "./DeletePostButton";

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string | null;
  image: string | null;
  category: string | null;
  status: string;
  publishedAt: Date | null;
  createdAt: Date;
}

const POSTS_PER_PAGE = 8;

function trimTitle(title: string, max = 50): string {
  if (title.length <= max) return title;
  return title.slice(0, max).trimEnd() + "...";
}

export default function BlogListClient({ allPosts }: { allPosts: Post[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = allPosts.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE);

  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      <div className="flex items-center justify-between border-b border-[#1f1f23] pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Blog Posts</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Manage your articles, news, and guides hosted on Drizzle ORM PostgreSQL.
          </p>
        </div>
        <Link href="/dashboard/blog/new">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs h-9">
            <Plus className="mr-1.5 w-4 h-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Search bar */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
        <Input
          placeholder="Cari artikel atau slug..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="h-9 pl-9 pr-8 bg-[#161619] border-[#1f1f23] text-white text-xs placeholder:text-zinc-600 rounded-xl focus-visible:border-blue-600/60"
        />
        {search && (
          <button onClick={() => { setSearch(""); setPage(1); }} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="border border-[#1f1f23] rounded-2xl bg-[#0f0f11] overflow-hidden">
        {allPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <span className="text-3xl mb-3">📝</span>
            <h3 className="text-sm font-semibold text-zinc-300">No blog posts found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs">
              Create articles and publish them to display here.
            </p>
            <Link href="/dashboard/blog/new" className="mt-4">
              <Button size="sm" variant="outline" className="border-[#1f1f23] hover:bg-zinc-900 text-xs">
                Create First Post
              </Button>
            </Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <span className="text-3xl mb-3">🔍</span>
            <h3 className="text-sm font-semibold text-zinc-300">Tidak ditemukan</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Tidak ada artikel dengan kata kunci "{search}"
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="border-b border-[#1f1f23]/60 bg-[#0c0c0e]/40">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3 pl-6">Article</TableHead>
                    <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Category</TableHead>
                    <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Slug</TableHead>
                    <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Status</TableHead>
                    <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Date</TableHead>
                    <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3 text-right pr-6">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-[#1f1f23]/40">
                  {paginated.map((post) => (
                    <TableRow key={post.id} className="hover:bg-zinc-900/10 transition-all border-none">
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          {post.image ? (
                            <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-[#1f1f23] shrink-0">
                              <Image 
                                src={post.image} 
                                alt={post.title} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-10 rounded-lg bg-zinc-900 border border-[#1f1f23] flex items-center justify-center shrink-0 text-zinc-500">
                              <span className="text-[10px]">No IMG</span>
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-semibold text-white truncate" title={post.title}>
                              {trimTitle(post.title)}
                            </span>
                            <span className="text-[10px] text-zinc-500 mt-0.5">
                              /blog/{trimTitle(post.slug, 30)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                          {post.category || "Uncategorized"}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-xs font-mono text-zinc-400 max-w-[120px] truncate" title={post.slug}>
                        /{trimTitle(post.slug, 25)}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wide ${
                          post.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                        }`}>
                          {post.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-xs text-zinc-400 font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <div className="flex justify-end gap-2">
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-[#1f1f23]">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/blog/edit/${post.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-[#1f1f23]">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeletePostButton id={post.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-3 border-t border-[#1f1f23]/60">
                <span className="text-[10px] text-zinc-500">
                  Menampilkan {(safePage - 1) * POSTS_PER_PAGE + 1}-{Math.min(safePage * POSTS_PER_PAGE, filtered.length)} dari {filtered.length} artikel
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevPage}
                    disabled={safePage === 1}
                    className="h-7 w-7 p-0 text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-30 border border-[#1f1f23] rounded-lg"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Button
                      key={p}
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage(p)}
                      className={`h-7 w-7 p-0 text-[10px] font-semibold rounded-lg border ${
                        p === safePage
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900 border-[#1f1f23]"
                      }`}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextPage}
                    disabled={safePage === totalPages}
                    className="h-7 w-7 p-0 text-zinc-400 hover:text-white hover:bg-zinc-900 disabled:opacity-30 border border-[#1f1f23] rounded-lg"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
