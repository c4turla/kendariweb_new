import { db } from "@/db";
import { portfolios } from "@/db/schema";
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
import { Plus, Edit, Trash2, Eye, Link2, Briefcase } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DeletePortfolioButton from "./DeletePortfolioButton";

export const revalidate = 0;

export default async function PortfolioDashboardPage() {
  // Query all portfolios from Drizzle ORM PostgreSQL
  const allPortfolios = await db.select().from(portfolios).orderBy(desc(portfolios.createdAt));

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      <div className="flex items-center justify-between border-b border-[#1f1f23] pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Portfolios</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Manage your project show-cases and case-studies hosted on Drizzle ORM PostgreSQL.
          </p>
        </div>
        <Link href="/dashboard/portfolio/new">
          <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs h-9">
            <Plus className="mr-1.5 w-4 h-4" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="border border-[#1f1f23] rounded-2xl bg-[#0f0f11] overflow-hidden">
        {allPortfolios.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <span className="text-3xl mb-3">💼</span>
            <h3 className="text-sm font-semibold text-zinc-300">No portfolios found</h3>
            <p className="text-xs text-zinc-500 mt-1 max-w-xs">
              Add your portfolio projects to display here.
            </p>
            <Link href="/dashboard/portfolio/new" className="mt-4">
              <Button size="sm" variant="outline" className="border-[#1f1f23] hover:bg-zinc-900 text-xs">
                Create First Project
              </Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-[#1f1f23]/60 bg-[#0c0c0e]/40">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3 pl-6">Project</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Category / Industry</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Tech Stack</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3">Status</TableHead>
                  <TableHead className="text-zinc-500 font-semibold text-[10px] uppercase tracking-wider py-3 text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-[#1f1f23]/40">
                {allPortfolios.map((project) => {
                  const techList = project.tech ? project.tech.split(",").map(t => t.trim()) : [];
                  return (
                    <TableRow key={project.id} className="hover:bg-zinc-900/10 transition-all border-none">
                      <TableCell className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          {project.image ? (
                            <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-[#1f1f23] shrink-0">
                              <Image 
                                src={project.image} 
                                alt={project.title} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-10 rounded-lg bg-zinc-900 border border-[#1f1f23] flex items-center justify-center shrink-0 text-zinc-500">
                              <Briefcase className="w-4 h-4 text-zinc-600" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-white line-clamp-1">{project.title}</span>
                            {project.url && (
                              <a 
                                href={project.url} 
                                target="_blank" 
                                className="text-[10px] text-blue-400 flex items-center gap-0.5 mt-0.5 hover:underline"
                              >
                                <Link2 className="w-2.5 h-2.5" />
                                Visit Live Website
                              </a>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-zinc-300">{project.category || "-"}</span>
                          <span className="text-[10px] text-zinc-500 mt-0.5">{project.industry || "General"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {techList.length > 0 ? (
                            techList.map((t, idx) => (
                              <span 
                                key={idx} 
                                className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-zinc-900 border border-[#1f1f23] text-zinc-400"
                              >
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-zinc-500 font-mono">-</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold border uppercase tracking-wide ${
                          project.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                        }`}>
                          {project.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-right pr-6">
                        <div className="flex justify-end gap-2">
                          {project.url && (
                            <a href={project.url} target="_blank">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-[#1f1f23]">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                          <Link href={`/dashboard/portfolio/edit/${project.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-[#1f1f23]">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeletePortfolioButton id={project.id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
