"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

import { NAV_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F172A]/70 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20 py-2"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image 
            src="/logokweb.webp" 
            alt="Kendariweb Logo" 
            width={220} 
            height={60} 
            className={`object-contain w-auto transition-all duration-300 ${
              scrolled ? "h-10" : "h-12"
            }`}
            style={{ width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative px-4 py-2.5 text-sm font-medium text-[#94A3B8] transition-colors hover:text-[#F8FAFC] group rounded-full hover:bg-white/5"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            className="bg-[#2563EB] text-white hover:bg-[#2563EB]/90 shadow-lg shadow-[#2563EB]/25 px-5"
            size="lg"
            render={<Link href="/contact" />}
          >
            Konsultasi Gratis
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#F8FAFC] hover:bg-white/10"
                />
              }
            >
              <Menu className="size-5" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] bg-[#0F172A] border-l border-white/10 p-0"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              {/* Mobile Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center"
                >
                  <Image 
                    src="/logokweb.webp" 
                    alt="Kendariweb Logo" 
                    width={200} 
                    height={50} 
                    className="object-contain h-9 w-auto" 
                    style={{ width: "auto" }}
                  />
                </Link>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center rounded-lg px-4 py-3 text-sm font-medium text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Mobile CTA */}
                <div className="mt-6 px-4">
                  <Button
                    className="w-full bg-[#2563EB] text-white hover:bg-[#2563EB]/90 shadow-lg shadow-[#2563EB]/25"
                    size="lg"
                    render={
                      <Link
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                      />
                    }
                  >
                    Konsultasi Gratis
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
