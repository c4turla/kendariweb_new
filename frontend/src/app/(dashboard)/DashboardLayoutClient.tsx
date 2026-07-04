"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  Undo2, 
  Redo2, 
  Eye, 
  Database,
  Plus,
  HelpCircle,
  TrendingUp,
  Search,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#09090b] text-[#f4f4f5]">
      {/* 1. FAR LEFT STRIP (COLLAPSED QUICK NAVIGATION) */}
      <aside className="w-16 flex flex-col items-center justify-between py-4 border-r border-[#18181b] bg-[#0c0c0e]">
        {/* Top Logo */}
        <div className="flex flex-col items-center gap-6">
          <Link href="/dashboard" className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-500 hover:bg-blue-600/20 transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </Link>

          {/* Quick Icons */}
          <nav className="flex flex-col gap-2 mt-4">
            <Link 
              href="/dashboard" 
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                isLinkActive("/dashboard") && pathname === "/dashboard"
                  ? "bg-zinc-800 text-white" 
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
              title="Overview"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard/blog" 
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                isLinkActive("/dashboard/blog") 
                  ? "bg-zinc-800 text-white" 
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
              title="Blog"
            >
              <MessageSquare className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard/portfolio" 
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                isLinkActive("/dashboard/portfolio") 
                  ? "bg-zinc-800 text-white" 
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
              title="Portfolio"
            >
              <Briefcase className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard/contact" 
              className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                isLinkActive("/dashboard/contact") 
                  ? "bg-zinc-800 text-white" 
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
              title="Form Submissions"
            >
              <Database className="w-5 h-5" />
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-3">
          <Link 
            href="/dashboard/settings" 
            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
              isLinkActive("/dashboard/settings") 
                ? "bg-zinc-800 text-white" 
                : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900"
            }`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* 2. SECOND COLUMN (EXPANDED SIDEBAR PANEL) */}
      <aside className="w-60 flex flex-col justify-between border-r border-[#18181b] bg-[#0c0c0e]">
        <div className="flex flex-col py-4 px-4 overflow-y-auto">
          {/* Header Organization Brand */}
          <div className="flex items-center justify-between pb-4 border-b border-[#18181b] mb-4">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white tracking-tight flex items-center gap-1.5">
                KendariWeb
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold uppercase tracking-wider">
                  CMS
                </span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono tracking-tight mt-0.5">
                kendariweb.com
              </span>
            </div>
          </div>

          {/* Group 1: CMS Management */}
          <div className="mb-6">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">CMS Management</span>
            </div>
            <div className="flex flex-col gap-1">
              <Link 
                href="/dashboard"
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isLinkActive("/dashboard") && pathname === "/dashboard"
                    ? "bg-zinc-900 text-white border-l-2 border-blue-500"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Overview
              </Link>
              <Link 
                href="/dashboard/blog"
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isLinkActive("/dashboard/blog")
                    ? "bg-zinc-900 text-white border-l-2 border-blue-500"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                Blog Posts
              </Link>
              <Link 
                href="/dashboard/portfolio"
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isLinkActive("/dashboard/portfolio")
                    ? "bg-zinc-900 text-white border-l-2 border-blue-500"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Portfolios
              </Link>
              <Link 
                href="/dashboard/contact"
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isLinkActive("/dashboard/contact")
                    ? "bg-zinc-900 text-white border-l-2 border-blue-500"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                }`}
              >
                <Database className="w-4 h-4" />
                Submissions
              </Link>
            </div>
          </div>

          {/* Group 2: Analytics & Performance */}
          <div className="mb-6">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Analytics</span>
              <button className="text-zinc-500 hover:text-white">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <button 
                onClick={() => alert("Traffic Analytics is fully integrated inside the Dashboard Overview.")}
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all text-left"
              >
                <BarChart3 className="w-4 h-4" />
                Traffic Analytics
              </button>
              <Link 
                href="/dashboard/seo"
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all text-left"
              >
                <TrendingUp className="w-4 h-4" />
                SEO Management
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info inside sidebar */}
        <div className="p-4 border-t border-[#18181b] flex items-center justify-between bg-[#0a0a0c]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
              KW
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">Admin User</span>
              <span className="text-[10px] text-zinc-500">Administrator</span>
            </div>
          </div>
          <Link href="/dashboard/settings" className="text-zinc-500 hover:text-white">
            <Settings className="w-4 h-4 animate-spin-slow" />
          </Link>
        </div>
      </aside>

      {/* 3. MAIN PANE */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#09090b]">
        {/* Top Header Row */}
        <header className="h-14 border-b border-[#18181b] px-6 flex items-center justify-between bg-[#0c0c0e]/80 backdrop-blur-md">
          {/* Left info: Breadcrumb navigation */}
          <div className="flex items-center gap-2.5 text-xs text-zinc-500">
            <Link href="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
              <span className="text-sm">🏠</span>
              <span className="font-semibold text-zinc-300">Overview</span>
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="font-mono text-zinc-500">kendariweb.com</span>
          </div>

          {/* Right actions: Undo, Redo, Preview, Share, Publish */}
          <div className="flex items-center gap-3">
            {/* Undo/Redo */}
            <div className="flex items-center border border-[#18181b] rounded-lg overflow-hidden bg-[#121214]">
              <button className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors border-r border-[#18181b]" title="Undo">
                <Undo2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors" title="Redo">
                <Redo2 className="w-4 h-4" />
              </button>
            </div>

            {/* Share / Collab Icon */}
            <button className="p-1.5 border border-[#18181b] hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors bg-[#121214]" title="Collaborate">
              <span className="text-xs font-semibold px-0.5">👥 Share</span>
            </button>

            {/* Preview Button */}
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="h-8 border-[#18181b] hover:bg-zinc-800 text-zinc-300 gap-1.5 bg-[#121214]">
                <Eye className="w-3.5 h-3.5" />
                Live Preview
              </Button>
            </Link>

            {/* Publish Button */}
            <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/20 px-4">
              Publish
            </Button>
          </div>
        </header>

        {/* Inner page content container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#09090b]">
          {children}
        </main>
      </div>
    </div>
  );
}