import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc } from "drizzle-orm";
import BlogListClient from "./BlogListClient";

export const revalidate = 0;

export default async function BlogDashboardPage() {
  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return <BlogListClient allPosts={allPosts} />;
}
