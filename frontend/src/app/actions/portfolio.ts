"use server";

import { db } from "@/db";
import { portfolios } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deletePortfolio(id: string) {
  try {
    await db.delete(portfolios).where(eq(portfolios.id, id));
    revalidatePath("/dashboard/portfolio");
    revalidatePath("/portfolio");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete portfolio:", error);
    return { success: false, error: "Gagal menghapus proyek portfolio." };
  }
}

export async function upsertPortfolio(prevState: any, formData: FormData) {
  const id = formData.get("id") as string | null;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const industry = formData.get("industry") as string;
  const image = formData.get("image") as string;
  const tech = formData.get("tech") as string;
  const url = formData.get("url") as string;
  const status = formData.get("status") as "draft" | "published" | "archived";

  if (!title || title.trim() === "") {
    return { success: false, error: "Nama proyek wajib diisi." };
  }

  try {
    const data = {
      title,
      category: category || null,
      industry: industry || null,
      image: image || null,
      tech: tech || null,
      url: url || null,
      status: status || "draft",
      updatedAt: new Date(),
    };

    if (id && id.trim() !== "") {
      await db.update(portfolios).set(data).where(eq(portfolios.id, id));
    } else {
      await db.insert(portfolios).values(data);
    }
  } catch (error: any) {
    console.error("Failed to upsert portfolio:", error);
    return { success: false, error: "Terjadi kesalahan saat menyimpan proyek portfolio." };
  }

  revalidatePath("/dashboard/portfolio");
  revalidatePath("/portfolio");
  revalidatePath("/");
  return { success: true };
}
