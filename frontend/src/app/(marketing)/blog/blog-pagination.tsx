"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

function generatePageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  pages.push(1);

  if (current > 3) {
    pages.push("ellipsis");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push("ellipsis");
  }

  pages.push(total);

  return pages;
}

export function BlogPagination({ currentPage, totalPages }: BlogPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }
      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    },
    [pathname, searchParams],
  );

  const navigateToPage = useCallback(
    (page: number) => {
      window.location.href = createPageUrl(page);
    },
    [createPageUrl],
  );

  if (totalPages <= 1) return null;

  const pages = generatePageNumbers(currentPage, totalPages);
  return (
    <nav
      aria-label="Pagination"
      className="mt-16 flex items-center justify-center gap-1"
    >
      <button
        onClick={() => {
          if (currentPage > 1) {
            navigateToPage(currentPage - 1);
          }
        }}
        disabled={currentPage <= 1}
        className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-[#1E293B]/40 text-[#94A3B8] backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-[#1E293B]/60 hover:text-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-[#1E293B]/40 disabled:hover:text-[#94A3B8]"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page, idx) => {
        if (page === "ellipsis") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex size-10 items-center justify-center text-sm text-[#64748B]"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => {
              if (page !== currentPage) {
                navigateToPage(page);
              }
            }}
            className={`flex size-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/25"
                : "border border-white/10 bg-[#1E293B]/40 text-[#94A3B8] backdrop-blur-sm hover:border-white/20 hover:bg-[#1E293B]/60 hover:text-[#F8FAFC]"
            }`}
            aria-label={`Halaman ${page}`}
            aria-current={isActive ? "page" : undefined}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => {
          if (currentPage < totalPages) {
            navigateToPage(currentPage + 1);
          }
        }}
        disabled={currentPage >= totalPages}
        className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-[#1E293B]/40 text-[#94A3B8] backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-[#1E293B]/60 hover:text-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:bg-[#1E293B]/40 disabled:hover:text-[#94A3B8]"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
