import { db } from "@/db";
import { portfolios } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const GRADIENT_PRESETS = [
  "from-[#2563EB]/80 to-[#06B6D4]/80",
  "from-[#8B5CF6]/80 to-[#2563EB]/80",
  "from-[#06B6D4]/80 to-[#8B5CF6]/80",
  "from-[#2563EB]/80 to-[#8B5CF6]/80",
] as const;

export async function PortfolioSection() {
  // Query only published portfolios from database using Drizzle ORM
  const dbPortfolios = await db.select()
    .from(portfolios)
    .where(eq(portfolios.status, "published"))
    .orderBy(desc(portfolios.createdAt))
    .limit(6);

  return (
    <section id="portfolio" className="relative py-20 sm:py-28 overflow-hidden bg-[#0F172A]">
      {/* Background glowing decorations */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-[#2563EB]/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[#2563EB]/30 bg-[#2563EB]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#06B6D4]">
            Portfolio
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
            Karya Terbaik <span className="gradient-text">Kami</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Hasil karya nyata kami dalam mendevelop solusi digital yang andal untuk klien di berbagai lini industri.
          </p>
        </div>

        {dbPortfolios.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="mx-auto size-12 text-[#94A3B8] mb-4 opacity-50" />
            <p className="text-lg text-[#94A3B8]">Belum ada proyek portfolio terpublikasi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dbPortfolios.map((project, index) => {
              const techList = project.tech ? project.tech.split(",").map(t => t.trim()) : [];
              return (
                <div 
                  key={project.id}
                  className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/[0.06] bg-[#1E293B]/30 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/20 hover:shadow-xl hover:shadow-[#2563EB]/5"
                >
                  {/* Aspect Ratio Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F172A] border-b border-white/5">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized={true}
                      />
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-gradient-to-br opacity-20 ${GRADIENT_PRESETS[index % GRADIENT_PRESETS.length]}`} />
                        {/* Mockup UI Window fallback */}
                        <div className="absolute top-8 left-1/2 w-[85%] -translate-x-1/2 h-[120%] rounded-t-xl bg-[#1E293B] border border-white/10 shadow-2xl overflow-hidden flex flex-col group-hover:top-6 transition-all duration-500 ease-out">
                          <div className="h-6 w-full border-b border-white/5 flex items-center px-3 gap-1.5 bg-black/20">
                            <div className="size-2 rounded-full bg-red-500/50" />
                            <div className="size-2 rounded-full bg-yellow-500/50" />
                            <div className="size-2 rounded-full bg-green-500/50" />
                          </div>
                          <div className="flex-1 p-3 flex gap-3">
                            <div className="w-1/4 h-full flex flex-col gap-2">
                              <div className="h-4 w-full rounded bg-white/10 mb-2" />
                              <div className="h-2 w-full rounded bg-white/5" />
                              <div className="h-2 w-3/4 rounded bg-white/5" />
                            </div>
                            <div className="flex-1 flex flex-col gap-3">
                              <div className="h-12 w-full rounded-md bg-gradient-to-r from-white/10 to-transparent" />
                              <div className="flex-1 rounded-md border border-white/5 bg-black/20" />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Hover Overlay */}
                    {project.url && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0F172A]/70 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-xl bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#2563EB]/30 hover:bg-[#2563EB]/90 transition-all"
                        >
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Lihat Detail
                        </Link>
                      </div>
                    )}

                    {/* Industry Badge */}
                    <div className="absolute left-3 top-3 z-10">
                      <Badge className="border-0 bg-[#0F172A]/75 text-[#F8FAFC] backdrop-blur-md text-[10px]">
                        {project.industry || "General"}
                      </Badge>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute right-3 top-3 z-10">
                      <Badge className="border border-[#2563EB]/30 bg-[#2563EB]/20 text-[#06B6D4] backdrop-blur-md text-[10px]">
                        {project.category || "Web App"}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Info Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 text-lg font-bold text-[#F8FAFC] transition-colors group-hover:text-[#06B6D4] tracking-tight">
                      {project.title}
                    </h3>

                    {/* Tech Badges */}
                    <div className="mb-4 flex flex-wrap gap-1.5">
                      {techList.map((tech) => (
                        <Badge
                          key={tech}
                          className="border border-white/10 bg-[#0F172A]/60 text-[#94A3B8] text-[10px] hover:bg-zinc-800"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Visit Project Link */}
                    {project.url && (
                      <div className="mt-auto pt-2 lg:opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100">
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] transition-colors hover:text-[#06B6D4]"
                        >
                          Kunjungi Website
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        {dbPortfolios.length > 0 && (
          <div className="mt-16 text-center">
            <Link href="/portfolio">
              <Button className="rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-[#F8FAFC] font-semibold text-xs px-6 py-5">
                Lihat Semua Portfolio
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
