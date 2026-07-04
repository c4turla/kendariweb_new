import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Link2, Shield, Settings, Server, Globe, Database } from "lucide-react";
import Link from "next/link";

export default function SettingsDashboardPage() {
  const dbUrl = process.env.DATABASE_URL || 'postgresql://catur:K3ndari123%21@localhost:5433/kendariweb';
  
  // Mask password for display
  const maskedUrl = dbUrl.replace(/:([^:@]+)@/, ":******@");

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      <div className="flex items-center justify-between border-b border-[#1f1f23] pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">System Settings</h1>
          <p className="text-xs text-zinc-500 mt-1">
            Configure your landing page general settings and database connections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        
        {/* PostgreSQL / Drizzle API Configuration */}
        <Card className="border-[#1f1f23] rounded-2xl bg-[#0f0f11] text-[#f4f4f5]">
          <CardHeader className="border-b border-[#1f1f23]/60 bg-[#0c0c0e]/30">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5 text-white">
              <Database className="w-4 h-4 text-blue-500" />
              PostgreSQL Database Connection
            </CardTitle>
            <CardDescription className="text-zinc-500 text-xs">
              Link your Drizzle ORM to PostgreSQL database.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-zinc-400">Database Connection URL</span>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900 border border-[#1f1f23] text-xs font-mono text-zinc-300 overflow-x-auto">
                <span className="text-blue-500">PG</span>
                <span>{maskedUrl}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-zinc-400">Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-zinc-300 font-semibold">Active & Connected via Drizzle ORM</span>
              </div>
            </div>
            <div className="pt-2 flex gap-3">
              <Link href="http://localhost:4983" target="_blank">
                <Button size="sm" variant="outline" className="border-[#1f1f23] hover:bg-zinc-800 text-xs font-semibold h-8 bg-zinc-900/50">
                  <Link2 className="mr-1.5 w-3.5 h-3.5 text-zinc-400" />
                  Open Drizzle Studio
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Global SEO Settings */}
        <Card className="border-[#1f1f23] rounded-2xl bg-[#0f0f11] text-[#f4f4f5]">
          <CardHeader className="border-b border-[#1f1f23]/60 bg-[#0c0c0e]/30">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5 text-white">
              <Globe className="w-4 h-4 text-blue-500" />
              Global SEO & Branding
            </CardTitle>
            <CardDescription className="text-zinc-500 text-xs">
              Configure search engine visibility and primary logo assets.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-zinc-400">Primary Website Title</span>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-[#1f1f23] text-xs text-zinc-300 font-medium">
                KendariWeb - Jasa Pembuatan Website Profesional
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-zinc-400">Search Engine Visibility</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                  INDEXABLE
                </span>
                <span className="text-[10px] text-zinc-500 font-medium">Sitemap is updated daily</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Access Controls */}
        <Card className="border-[#1f1f23] rounded-2xl bg-[#0f0f11] text-[#f4f4f5] md:col-span-2">
          <CardHeader className="border-b border-[#1f1f23]/60 bg-[#0c0c0e]/30">
            <CardTitle className="text-sm font-semibold flex items-center gap-1.5 text-white">
              <Shield className="w-4 h-4 text-blue-500" />
              Security & Credentials
            </CardTitle>
            <CardDescription className="text-zinc-500 text-xs">
              Admin user panel rights and session access.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-zinc-300">Admin Role Permissions</span>
              <p className="text-[11px] text-zinc-500 max-w-xl">
                Only authenticated administrators have full read/write access to system assets. Anonymous users are restricted to public reading routes on portfolios and posts.
              </p>
            </div>
            <Button size="sm" variant="outline" className="border-[#1f1f23] hover:bg-zinc-800 text-xs font-semibold h-8 shrink-0 bg-zinc-900/50">
              Manage API Tokens
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
