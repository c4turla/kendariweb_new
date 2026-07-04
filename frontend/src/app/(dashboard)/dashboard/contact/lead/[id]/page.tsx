import { db } from "@/db";
import { leads } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { LeadClient } from "./LeadClient";

export const revalidate = 0;

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  const [lead] = await db.select().from(leads).where(eq(leads.id, Number(id)));

  if (!lead) {
    notFound();
  }

  return <LeadClient lead={lead} />;
}
