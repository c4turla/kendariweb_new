"use server";

import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function submitLead(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const projectType = formData.get("projectType") as string;
  const budget = formData.get("budget") as string | null;
  const description = formData.get("description") as string;

  // Basic Validation
  if (!name || name.trim() === "") {
    return { success: false, message: "Nama lengkap wajib diisi." };
  }
  if (!email || email.trim() === "" || !email.includes("@")) {
    return { success: false, message: "Email tidak valid." };
  }
  if (!whatsapp || whatsapp.trim() === "") {
    return { success: false, message: "Nomor WhatsApp wajib diisi." };
  }
  if (!projectType || projectType.trim() === "") {
    return { success: false, message: "Tipe proyek wajib dipilih." };
  }
  if (!description || description.trim() === "") {
    return { success: false, message: "Deskripsi proyek wajib diisi." };
  }

  try {
    // Insert into DB
    await db.insert(leads).values({
      name,
      email,
      whatsapp,
      projectType,
      budget,
      description,
      status: "new",
    });

    revalidatePath("/dashboard/contact");
    revalidatePath("/");

    return { success: true, message: "Pesan Anda telah terkirim! Tim kami akan segera menghubungi Anda." };
  } catch (error) {
    console.error("Failed to submit lead:", error);
    return { success: false, message: "Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti." };
  }
}

export async function updateLeadStatus(id: number, status: "new" | "contacted" | "closed") {
  try {
    await db.update(leads)
      .set({ status })
      .where(eq(leads.id, id));

    revalidatePath("/dashboard/contact");
    revalidatePath(`/dashboard/contact/lead/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return { success: false, error: "Gagal mengupdate status lead." };
  }
}
