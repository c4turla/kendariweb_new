import { Metadata } from "next";
import { BlogPageClient } from "./blog-client";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Blog & Wawasan | KendariWeb",
  description: "Artikel, tutorial, dan berita terbaru seputar dunia web development, mobile apps, dan teknologi digital.",
};

export const revalidate = 0;

const ITEMS_PER_PAGE = 7;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1") || 1);

  const [totalResult] = await db
    .select({ count: count() })
    .from(posts)
    .where(eq(posts.status, "published"));

  const totalPosts = totalResult?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalPosts / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  const dbPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.createdAt))
    .limit(ITEMS_PER_PAGE)
    .offset(offset);

  const mappedPosts = dbPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.description,
    date_created: p.publishedAt
      ? p.publishedAt.toISOString()
      : p.createdAt.toISOString(),
    image: p.image,
    imageUrl: p.image,
  }));

  return (
    <BlogPageClient
      posts={mappedPosts}
      currentPage={safePage}
      totalPages={totalPages}
    />
  );
}
