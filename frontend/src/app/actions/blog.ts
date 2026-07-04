"use server";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deletePost(id: string) {
  try {
    await db.delete(posts).where(eq(posts.id, id));
    revalidatePath("/dashboard/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return { success: false, error: "Gagal menghapus artikel." };
  }
}

export async function upsertPost(prevState: any, formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") as "draft" | "published" | "archived";

  if (!title || title.trim() === "") {
    return { success: false, error: "Judul artikel wajib diisi." };
  }
  if (!slug || slug.trim() === "") {
    return { success: false, error: "Slug artikel wajib diisi." };
  }
  if (!content || content.trim() === "") {
    return { success: false, error: "Konten artikel wajib diisi." };
  }

  try {
    const data = {
      title,
      slug: slug.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9_-]/g, ""),
      content,
      description: description || null,
      image: image || null,
      category: category || null,
      status: status || "draft",
      publishedAt: status === "published" ? new Date() : null,
      updatedAt: new Date(),
    };

    if (id && id.trim() !== "") {
      await db.update(posts).set(data).where(eq(posts.id, id));
    } else {
      await db.insert(posts).values(data);
    }
  } catch (error: any) {
    console.error("Failed to upsert post:", error);
    if (error.code === "23505" || error.message?.includes("unique constraint")) {
      return { success: false, error: "Slug sudah digunakan. Silakan buat slug yang unik." };
    }
    return { success: false, error: "Terjadi kesalahan saat menyimpan artikel." };
  }

  revalidatePath("/dashboard/blog");
  revalidatePath("/blog");
  return { success: true };
}
