import { db } from "@/db";
import { portfolios } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import PortfolioForm from "../../PortfolioForm";

export const metadata = {
  title: "Edit Proyek | Dashboard KendariWeb",
};

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPortfolioPage({ params }: EditPageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const [project] = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.id, id))
    .limit(1);

  if (!project) {
    notFound();
  }

  return <PortfolioForm initialPortfolio={project} />;
}
