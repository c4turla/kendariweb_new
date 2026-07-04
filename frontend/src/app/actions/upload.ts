"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    
    if (!file) {
      return { success: false, error: "Tidak ada file yang diunggah" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueId = uuidv4();
    const originalName = file.name;
    const extension = originalName.split('.').pop();
    const fileName = `${uniqueId}.${extension}`;

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // Ignore if directory exists
    }

    // Write file to public/uploads
    const filePath = join(uploadsDir, fileName);
    await writeFile(filePath, buffer);

    // Return the URL path
    return { success: true, url: `/uploads/${fileName}` };
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: "Gagal mengunggah gambar" };
  }
}
