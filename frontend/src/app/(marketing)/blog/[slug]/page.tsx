import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailClient } from "./blog-detail-client";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for existing posts to improve performance
export async function generateStaticParams() {
  try {
    const allPosts = await db.query.posts.findMany({
      where: eq(posts.status, "published"),
      columns: {
        slug: true,
      },
    });
    return allPosts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for blog detail:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });
    if (!post) {
      return {
        title: "Blog Not Found | KendariWeb",
      };
    }
    return {
      title: `${post.title} | KendariWeb`,
      description: post.description || "Artikel dan berita terbaru dari KendariWeb.",
    };
  } catch (error) {
    return {
      title: "Blog | KendariWeb",
    };
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const post = await db.query.posts.findFirst({
    where: eq(posts.slug, slug),
  });

  if (!post) {
    notFound();
  }

  return (
    <BlogDetailClient post={{ 
      id: post.id, 
      title: post.title, 
      content: post.content, 
      date_created: post.createdAt?.toISOString() || new Date().toISOString(), 
      slug: post.slug, 
      excerpt: post.description || "", 
      image: post.image || "" 
    }} />
  );
}
