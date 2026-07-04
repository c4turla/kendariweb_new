import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { SeoClient } from "./SeoClient";

export const revalidate = 0;

export default async function SeoManagementPage() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.updatedAt));

  const mappedPosts = allPosts.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description || "",
    content: p.content,
    image: p.image || "",
    category: p.category || "",
    updatedAt: p.updatedAt?.toISOString() || "",
    createdAt: p.createdAt?.toISOString() || "",
  }));

  return <SeoClient posts={mappedPosts} />;
}
