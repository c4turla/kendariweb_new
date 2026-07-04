import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Calendar, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function ContactSubmissionsDashboardPage() {
  // Fetch form submission leads directly using Drizzle ORM PostgreSQL
  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      <div className="flex items-center justify-between border-b border-[#1f1f23] pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Form Submissions</h1>
          <p className="text-xs text-zinc-500 mt-1">
            View and manage leads submitted via your website contact forms.
          </p>
        </div>
      </div>

      <div className="border border-[#1f1f23] rounded-2xl bg-[#0f0f11] overflow-hidden">
        {allLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <span className="text-3xl mb-3">📥</span>
            <h3 className="text-sm font-semibold text-zinc-300">No submissions yet</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs">
              When visitors fill out the contact form on your landing page, their leads will show up here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-[#1f1f23]/60 bg-[#0c0c0e]/40">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3 pl-6">Prospect</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Project Details</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Message / Req</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Status</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Date</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3 text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-[#1f1f23]/40">
                {allLeads.map((lead) => (
                  <TableRow key={lead.id} className="hover:bg-zinc-900/10 transition-all border-none">
                    {/* Prospect Info */}
                    <TableCell className="py-4 pl-6">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-white">{lead.name}</span>
                        <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1 font-mono">
                          <Mail className="w-3 h-3" />
                          {lead.email}
                        </span>
                        <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-0.5 font-mono">
                          <Phone className="w-3 h-3" />
                          {lead.whatsapp}
                        </span>
                      </div>
                    </TableCell>

                    {/* Project details */}
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-zinc-300">{lead.projectType}</span>
                        <span className="text-[10px] text-zinc-500 mt-1 font-mono">{lead.budget || "No budget specified"}</span>
                      </div>
                    </TableCell>

                    {/* Description message */}
                    <TableCell className="py-4 max-w-xs">
                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                        {lead.description}
                      </p>
                    </TableCell>

                    {/* Status badge */}
                    <TableCell className="py-4">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold border uppercase tracking-wide ${
                        lead.status === 'new' 
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                          : lead.status === 'contacted'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                      }`}>
                        {lead.status}
                      </span>
                    </TableCell>

                    {/* Date */}
                    <TableCell className="py-4 text-xs text-zinc-400 font-medium">
                      <span className="flex items-center gap-1.5 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        }) : "Recently"}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="py-4 text-right pr-6">
                      <Link href={`/dashboard/contact/lead/${lead.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 border border-[#1f1f23] text-xs font-semibold hover:bg-zinc-900">
                          Follow Up
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
