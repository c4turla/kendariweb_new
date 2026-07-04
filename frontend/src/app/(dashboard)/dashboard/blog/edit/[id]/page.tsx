import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import BlogForm from "../../BlogForm";

export const metadata = {
  title: "Edit Artikel | Dashboard KendariWeb",
};

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPostPage({ params }: EditPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!post) {
    notFound();
  }

  return <BlogForm initialPost={post} />;
}
