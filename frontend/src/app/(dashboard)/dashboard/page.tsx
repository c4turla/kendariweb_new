import { db } from "@/db";
import { posts, portfolios, leads, analyticsVisits } from "@/db/schema";
import { count } from "drizzle-orm";
import DashboardClient from "./DashboardClient";

export const revalidate = 0;

export default async function DashboardPage() {
  const [postsCountRes] = await db.select({ value: count() }).from(posts);
  const [portfoliosCountRes] = await db.select({ value: count() }).from(portfolios);
  const [leadsCountRes] = await db.select({ value: count() }).from(leads);
  
  // Real visits
  const dbVisits = await db.select().from(analyticsVisits);

  return (
    <DashboardClient 
      postsCount={postsCountRes?.value ?? 0}
      portfoliosCount={portfoliosCountRes?.value ?? 0}
      leadsCount={leadsCountRes?.value ?? 0}
      visits={dbVisits}
    />
  );
}