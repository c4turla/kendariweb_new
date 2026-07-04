import { Metadata } from "next";
import { PortfolioClient } from "./portfolio-client";
import { db } from "@/db";
import { portfolios } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Portfolio | KendariWeb",
  description: "Lihat hasil karya KendariWeb dalam pembuatan website, aplikasi mobile, dan solusi digital lainnya.",
};

export const revalidate = 0;

export default async function PortfolioPage() {
  // Query only published portfolios sorted by creation date
  const dbPortfolios = await db.select()
    .from(portfolios)
    .where(eq(portfolios.status, "published"))
    .orderBy(desc(portfolios.createdAt));

  const mappedPortfolios = dbPortfolios.map(p => ({
    title: p.title,
    category: p.category ?? "Landing Page",
    industry: p.industry ?? "General",
    image: p.image,
    tech: p.tech ? p.tech.split(",").map(t => t.trim()) : [],
    url: p.url ?? "#"
  }));

  return (
    <PortfolioClient initialItems={mappedPortfolios} />
  );
}
