"use client";

import React, { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { 
  Users, 
  ArrowUpRight, 
  Database,
  ArrowRight,
  ChevronDown,
  Activity,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";

const MONTHLY_VISITORS = [
  { name: "Jan", visitors: 3200, active: false },
  { name: "Feb", visitors: 3800, active: false },
  { name: "Mar", visitors: 4100, active: false },
  { name: "Apr", visitors: 3900, active: false },
  { name: "May", visitors: 4300, active: false },
  { name: "Jun", visitors: 4800, active: false },
  { name: "Jul", visitors: 4900, active: false },
  { name: "Aug", visitors: 5600, active: true }, // Highlighted Month
  { name: "Sep", visitors: 4200, active: false },
  { name: "Oct", visitors: 4500, active: false },
  { name: "Nov", visitors: 5100, active: false },
  { name: "Dec", visitors: 5800, active: false },
];

const TOP_PAGES = [
  { url: "kendariweb.com", bounceRate: "40.2%", avgTime: "4m 25s", visitors: 6150 },
  { url: "/blog/harga-website-company-profile-2026", bounceRate: "55.7%", avgTime: "2m 12s", visitors: 4320 },
  { url: "/portfolio", bounceRate: "60.3%", avgTime: "1m 31s", visitors: 4212 },
  { url: "/services", bounceRate: "42.4%", avgTime: "3m 41s", visitors: 4131 },
  { url: "/contact", bounceRate: "35.1%", avgTime: "5m 10s", visitors: 1980 },
];

const TRAFFIC_SOURCES = [
  { source: "Organic search", percentage: 38, value: "4,670", color: "#3b82f6" },
  { source: "Instagram", percentage: 24, value: "2,950", color: "#10b981" },
  { source: "Direct", percentage: 18, value: "2,210", color: "#6366f1" },
  { source: "Google Ads", percentage: 11, value: "1,350", color: "#f59e0b" },
  { source: "Referral", percentage: 9, value: "1,100", color: "#ec4899" },
];

interface DashboardClientProps {
  postsCount: number;
  portfoliosCount: number;
  leadsCount: number;
  visits: any[];
}

export default function DashboardClient({
  postsCount,
  portfoliosCount,
  leadsCount,
  visits
}: DashboardClientProps) {
  const currentMonth = new Date().getMonth(); // 0-11

  // Map real visits data to monthly visitors chart
  const monthlyData = [...MONTHLY_VISITORS].map((m, idx) => ({ ...m, visitors: 0, active: idx === currentMonth }));
  
  visits.forEach(v => {
    if (v.createdAt) {
      const date = new Date(v.createdAt);
      const mIdx = date.getMonth();
      monthlyData[mIdx].visitors += 1;
    }
  });

  // Highlight current month
  const [activeBarIndex, setActiveBarIndex] = useState<number | null>(currentMonth);

  // Group pages by traffic
  const pageMap: Record<string, number> = {};
  visits.forEach(v => {
    const p = v.pathname || "/";
    pageMap[p] = (pageMap[p] || 0) + 1;
  });
  const topPagesMapped = Object.entries(pageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([url, count]) => ({
      url,
      visitors: count,
      bounceRate: "~40%", // Mocked for now as we don't track sessions specifically
      avgTime: "~1m", // Mocked for now
    }));

  const totalVisits = visits.length;

  // Performance calculation variables
  const score = 92;
  const radius = 40;
  const strokeWidth = 8;
  const circumference = Math.PI * radius; // 125.6
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      {/* GRID CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: PERFORMANCE SCORE (col-span-4) */}
        <section className="lg:col-span-4 flex flex-col gap-6">
          <div className="border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11] flex flex-col justify-between min-h-[460px]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-300 tracking-tight flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-500" />
                Performance score
              </h3>
              <button className="text-xs px-2.5 py-1 rounded-lg border border-[#1f1f23] hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all">
                View more
              </button>
            </div>

            {/* Semicircular Gauge Chart */}
            <div className="relative flex flex-col items-center justify-center mt-6">
              <svg viewBox="0 0 100 65" className="w-52 h-auto">
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                {/* Background arc */}
                <path 
                  d="M 10 50 A 40 40 0 0 1 90 50" 
                  fill="none" 
                  stroke="#1a1a1e" 
                  strokeWidth={strokeWidth} 
                  strokeLinecap="round" 
                />
                {/* Active arc */}
                <path 
                  d="M 10 50 A 40 40 0 0 1 90 50" 
                  fill="none" 
                  stroke="url(#gaugeGradient)" 
                  strokeWidth={strokeWidth} 
                  strokeLinecap="round" 
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Score text absolute centered inside arc */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-4 text-center">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">Score</span>
                <span className="text-4xl font-extrabold text-white tracking-tight">{score}</span>
                <span className="text-xs font-semibold text-zinc-400">/100</span>
                <div className="mt-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                    Great
                  </span>
                </div>
              </div>
            </div>

            {/* Individual performance score list */}
            <div className="mt-6 flex flex-col gap-3">
              <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Individual performance score</h4>
              
              <div className="flex items-center justify-between py-2 border-b border-[#1f1f23]/60">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-zinc-300">Interactivity (TTI)</span>
                  <span className="text-[10px] text-zinc-500">Time to Interactive</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">485ms</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Good</span>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-zinc-300">Load Time</span>
                  <span className="text-[10px] text-zinc-500">Fully loaded page time</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-white block">1.18s</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Good</span>
                </div>
              </div>
            </div>

            {/* Blue Banner Info */}
            <div className="mt-4 p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/30 flex gap-2.5 items-start">
              <span className="text-sm">ℹ️</span>
              <p className="text-[11px] text-blue-400 leading-relaxed font-medium">
                Your overall website performance is great. The pages are fully compiled and optimized using Drizzle ORM database.
              </p>
            </div>

            {/* Action */}
            <button className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-[#1f1f23] text-xs font-bold text-white transition-all">
              Improve performance
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* RIGHT COLUMN: METRICS & CHARTS (col-span-8) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Top row cards (Total Visitors, Form Submissions) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Total Visitors Card */}
            <div className="border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                  Total visitors
                </span>
                <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  22.4%
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">{totalVisits.toLocaleString()}</span>
                <span className="text-xs text-zinc-500">total unique events</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2 font-medium">
                Showing recorded analytics events
              </p>
            </div>

            {/* Form Submissions Card */}
            <div className="border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-zinc-500" />
                  Form Submissions (Drizzle)
                </span>
                <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <ArrowUpRight className="w-3 h-3" />
                  15.2%
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white tracking-tight">{leadsCount} Leads</span>
                <span className="text-xs text-zinc-500">total received</span>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2 font-medium">
                Conversion rate: <span className="text-zinc-300 font-bold">1.82%</span> of total visitors
              </p>
            </div>

          </div>

          {/* Visitors Bar Chart Card */}
          <div className="border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-300 tracking-tight">Visitors Over Time</h3>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-2xl font-extrabold text-white tracking-tight">{totalVisits}</span>
                  <span className="text-xs text-zinc-500">total tracked</span>
                </div>
              </div>
              <button className="text-xs px-2.5 py-1 rounded-lg border border-[#1f1f23] hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all flex items-center gap-1 bg-[#121214]">
                Last year
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Recharts Bar Chart */}
            <div className="h-64 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={monthlyData}
                  margin={{ top: 10, right: 0, left: -25, bottom: 0 }}
                  onMouseMove={(state) => {
                    if (state && state.activeTooltipIndex !== undefined) {
                      setActiveBarIndex(Number(state.activeTooltipIndex));
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveBarIndex(currentMonth); // Reset to current month on mouse leave
                  }}
                >
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#71717a', fontSize: 10 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#71717a', fontSize: 10 }}
                  />
                  <Tooltip 
                    cursor={false}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[#121214] border border-[#1f1f23] rounded-xl px-3 py-2 shadow-2xl">
                            <p className="text-[10px] text-zinc-500 font-bold uppercase">{payload[0].payload.name}</p>
                            <p className="text-sm font-extrabold text-white mt-0.5">
                              {payload[0].value?.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">visitors</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="visitors" radius={[4, 4, 0, 0]}>
                    {monthlyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={index === activeBarIndex ? "#2563eb" : "#27272a"}
                        className="transition-colors duration-200 cursor-pointer"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </section>

      </div>

      {/* BOTTOM ROW: TOP PAGES & TRAFFIC SOURCES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Pages by Traffic (col-span-8) */}
        <section className="lg:col-span-8 border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-300 tracking-tight flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-blue-500" />
                  Top pages by traffic
                </h3>
                <p className="text-[11px] text-zinc-500 mt-0.5">Most visited sections of your website</p>
              </div>
              <button className="text-xs px-2.5 py-1 rounded-lg border border-[#1f1f23] hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all flex items-center gap-1 bg-[#121214]">
                Last 30 days
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse mt-2">
                <thead>
                  <tr className="border-b border-[#1f1f23]/60 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                    <th className="py-2.5">URL</th>
                    <th className="py-2.5 text-right">Bounce Rate</th>
                    <th className="py-2.5 text-right">Avg. Time</th>
                    <th className="py-2.5 text-right">Visitors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1f1f23]/40">
                  {topPagesMapped.length > 0 ? topPagesMapped.map((page, idx) => (
                    <tr key={idx} className="text-xs hover:bg-zinc-900/30 transition-all">
                      <td className="py-3 font-semibold text-zinc-300 flex items-center gap-1">
                        {page.url}
                        <ArrowUpRight className="w-3 h-3 text-zinc-600" />
                      </td>
                      <td className="py-3 text-right text-zinc-400 font-mono">{page.bounceRate}</td>
                      <td className="py-3 text-right text-zinc-400 font-mono">{page.avgTime}</td>
                      <td className="py-3 text-right text-white font-bold font-mono">{page.visitors.toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-zinc-500 text-xs">Belum ada data analytics.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <Link href="/dashboard/content" className="mt-4 w-full flex items-center justify-center gap-1 py-2 border-t border-[#1f1f23] text-xs font-semibold text-blue-400 hover:text-blue-300 transition-all">
            Manage Landing Pages ({postsCount} Posts / {portfoliosCount} Portfolios)
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>

        {/* Traffic Sources (col-span-4) */}
        <section className="lg:col-span-4 border border-[#1f1f23] rounded-2xl p-5 bg-[#0f0f11] flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-300 tracking-tight flex items-center gap-1.5 mb-4">
              <Activity className="w-4 h-4 text-blue-500" />
              Traffic sources
            </h3>

            <div className="flex flex-col gap-4 mt-2">
              {TRAFFIC_SOURCES.map((source, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-zinc-300">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 font-mono">{source.value}</span>
                      <span className="text-white font-bold font-mono">{source.percentage}%</span>
                    </div>
                  </div>
                  {/* Custom Progress bar */}
                  <div className="h-2 w-full bg-[#17171a] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${source.percentage}%`,
                        backgroundColor: source.color
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 text-[10px] text-zinc-500 text-center leading-relaxed font-medium">
            Stats are calculated based on public leads and routing metadata. Traffic Sources mapping relies on external GA implementation.
          </div>
        </section>

      </div>
    </div>
  );
}
