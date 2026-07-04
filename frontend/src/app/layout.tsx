import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kendariweb - Website Profesional untuk Bisnis Modern",
    template: "%s | Kendariweb",
  },
  description:
    "Kami membantu bisnis berkembang melalui website, aplikasi, dan solusi digital modern. 100+ project selesai, 50+ klien puas.",
  keywords: [
    "web development",
    "website company profile",
    "jasa pembuatan website",
    "digital agency",
    "web application",
    "mobile application",
    "UI/UX design",
    "Kendari",
    "Indonesia",
  ],
  authors: [{ name: "Kendariweb" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kendariweb.com",
    siteName: "Kendariweb",
    title: "Kendariweb - Website Profesional untuk Bisnis Modern",
    description:
      "Kami membantu bisnis berkembang melalui website, aplikasi, dan solusi digital modern.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kendariweb - Website Profesional untuk Bisnis Modern",
    description:
      "Kami membantu bisnis berkembang melalui website, aplikasi, dan solusi digital modern.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col relative">
        <main className="flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
