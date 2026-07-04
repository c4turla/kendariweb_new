import {
  Globe,
  Smartphone,
  Palette,
  Wrench,
  LayoutDashboard,
  Zap,
  Shield,
  MonitorSmartphone,
  Cpu,
  Scale,
  HeadphonesIcon,
  MessageSquare,
  FileText,
  PenTool,
  Code2,
  TestTube,
  Rocket,
  Settings,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/services", label: "Layanan" },
  { href: "/portfolio", label: "Portofolio" },
  { href: "/pricing", label: "Harga" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "Tentang Kami" },
  { href: "/contact", label: "Kontak" },
] as const;

export const HERO_METRICS = [
  { value: "100+", label: "Project" },
  { value: "50+", label: "Clients" },
  { value: "5+", label: "Years Experience" },
] as const;

export const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Company Profile, Landing Page, Portal Berita, Website Sekolah, dan website custom sesuai kebutuhan bisnis Anda.",
    features: ["Company Profile", "Landing Page", "Portal Berita", "Sekolah"],
  },
  {
    icon: LayoutDashboard,
    title: "Web Application",
    description:
      "Sistem informasi dan aplikasi web custom seperti ERP, CRM, HRIS, dan Inventory management.",
    features: ["ERP", "CRM", "HRIS", "Inventory"],
  },
  {
    icon: Smartphone,
    title: "Mobile Application",
    description:
      "Aplikasi mobile native dan cross-platform untuk iOS dan Android dengan performa tinggi.",
    features: [
      "iOS & Android",
      "Cross-platform",
      "Native Performance",
      "Push Notifications",
    ],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Desain antarmuka yang modern, intuitif, dan user-friendly untuk pengalaman pengguna terbaik.",
    features: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "Visual Design",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Dukungan teknis dan pemeliharaan berkelanjutan untuk menjaga performa website Anda.",
    features: [
      "24/7 Monitoring",
      "Bug Fixes",
      "Performance Tuning",
      "Updates",
    ],
  },
] as const;

export const WHY_CHOOSE_US = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description:
      "Pengerjaan cepat dan tepat waktu tanpa mengorbankan kualitas.",
    gradient: "from-[#2563EB] to-[#06B6D4]", // Blue to Cyan
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    description:
      "Tampilan sempurna di semua perangkat, dari desktop hingga mobile.",
    gradient: "from-[#06B6D4] to-[#10B981]", // Cyan to Emerald
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    description:
      "Menggunakan teknologi terkini untuk performa dan keamanan terbaik.",
    gradient: "from-[#8B5CF6] to-[#2563EB]", // Purple to Blue
  },
  {
    icon: Shield,
    title: "Keamanan Terjamin",
    description:
      "Implementasi best practice keamanan untuk melindungi data sistem Anda.",
    gradient: "from-[#EF4444] to-[#F59E0B]", // Red to Amber
  },
  {
    icon: Scale,
    title: "Scalable Architecture",
    description: "Arsitektur yang siap berkembang seiring pertumbuhan bisnis.",
    gradient: "from-[#F59E0B] to-[#10B981]", // Amber to Emerald
  },
  {
    icon: HeadphonesIcon,
    title: "After Sales Support",
    description:
      "Dukungan purna jual yang responsif dan berkelanjutan.",
    gradient: "from-[#10B981] to-[#06B6D4]", // Emerald to Cyan
  },
] as const;

export const PORTFOLIO_ITEMS = [
  {
    title: "PT Sultra Dinamika Utama",
    category: "Website",
    industry: "Corporate",
    image: "/portfolio/portfolio-1.jpg",
    tech: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    url: "#",
  },
  {
    title: "Sistem Informasi Akademik",
    category: "Web App",
    industry: "Education",
    image: "/portfolio/portfolio-2.jpg",
    tech: ["React", "Node.js", "MongoDB"],
    url: "#",
  },
  {
    title: "Rumah Makan Nusantara",
    category: "Website",
    industry: "F&B",
    image: "/portfolio/portfolio-3.jpg",
    tech: ["Next.js", "Tailwind CSS"],
    url: "#",
  },
  {
    title: "Klinik Sehat App",
    category: "Mobile App",
    industry: "Healthcare",
    image: "/portfolio/portfolio-4.jpg",
    tech: ["React Native", "Firebase"],
    url: "#",
  },
  {
    title: "Hotel Booking Platform",
    category: "Web App",
    industry: "Hospitality",
    image: "/portfolio/portfolio-5.jpg",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    url: "#",
  },
  {
    title: "E-Commerce Dashboard",
    category: "UI Design",
    industry: "Retail",
    image: "/portfolio/portfolio-6.jpg",
    tech: ["Figma", "Adobe XD"],
    url: "#",
  },
] as const;

export const PORTFOLIO_FILTERS = [
  "Semua",
  "Website",
  "Mobile App",
  "Web App",
  "UI Design",
] as const;

export const TESTIMONIALS = [
  {
    name: "Ahmad Rizki",
    company: "PT Sultra Dinamika",
    role: "CEO",
    image: "/testimonials/client-1.jpg",
    rating: 5,
    text: "Kendariweb berhasil membuat website company profile yang sangat profesional. Tim sangat responsif dan hasil kerjanya memuaskan. Sangat direkomendasikan!",
  },
  {
    name: "Siti Nurhaliza",
    company: "Klinik Sehat",
    role: "Owner",
    image: "/testimonials/client-2.jpg",
    rating: 5,
    text: "Aplikasi booking yang dibuatkan sangat memudahkan operasional klinik kami. Pasien jadi lebih mudah membuat janji temu. Terima kasih Kendariweb!",
  },
  {
    name: "Budi Santoso",
    company: "Hotel Panorama",
    role: "General Manager",
    image: "/testimonials/client-3.jpg",
    rating: 5,
    text: "Platform booking hotel kami jadi lebih modern dan mudah digunakan. Conversion rate meningkat 40% setelah redesign oleh Kendariweb.",
  },
  {
    name: "Diana Putri",
    company: "Toko Berkah",
    role: "Owner",
    image: "/testimonials/client-4.jpg",
    rating: 5,
    text: "Website toko online kami sekarang sangat profesional. Pelanggan merasa lebih percaya berbelanja. Pelayanan after sales juga sangat baik.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: 1,
    icon: MessageSquare,
    title: "Consultation",
    description:
      "Diskusi kebutuhan dan tujuan proyek Anda secara mendalam.",
  },
  {
    step: 2,
    icon: FileText,
    title: "Proposal",
    description:
      "Pembuatan proposal detail termasuk timeline dan estimasi biaya.",
  },
  {
    step: 3,
    icon: PenTool,
    title: "Design",
    description: "Perancangan UI/UX yang modern dan user-friendly.",
  },
  {
    step: 4,
    icon: Code2,
    title: "Development",
    description:
      "Pengembangan dengan teknologi modern dan best practices.",
  },
  {
    step: 5,
    icon: TestTube,
    title: "Testing",
    description: "Pengujian menyeluruh untuk memastikan kualitas.",
  },
  {
    step: 6,
    icon: Rocket,
    title: "Deployment",
    description: "Peluncuran website ke server production.",
  },
  {
    step: 7,
    icon: Settings,
    title: "Maintenance",
    description: "Pemeliharaan dan dukungan teknis berkelanjutan.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Berapa biaya pembuatan website?",
    answer:
      "Biaya pembuatan website bervariasi tergantung kompleksitas dan fitur yang dibutuhkan. Website company profile mulai dari Rp 1 jutaan, sedangkan web application custom mulai dari Rp 4 jutaan. Hubungi kami untuk konsultasi gratis dan estimasi yang lebih akurat.",
  },
  {
    question: "Berapa lama waktu pengerjaan?",
    answer:
      "Waktu pengerjaan tergantung pada jenis dan kompleksitas proyek. Website company profile biasanya selesai dalam 2-4 minggu, sedangkan web application bisa memakan waktu 1-3 bulan. Kami akan memberikan timeline yang jelas di awal proyek.",
  },
  {
    question: "Apakah termasuk domain dan hosting?",
    answer:
      "Ya, kami menyediakan paket lengkap termasuk domain dan hosting. Kami juga bisa menggunakan domain dan hosting yang sudah Anda miliki jika diperlukan.",
  },
  {
    question: "Apakah ada layanan maintenance?",
    answer:
      "Ya, kami menyediakan paket maintenance bulanan yang mencakup backup berkala, update keamanan, monitoring performa, dan perbaikan bug. Ini memastikan website Anda selalu dalam kondisi optimal.",
  },
  {
    question: "Apakah bisa bayar cicilan?",
    answer:
      "Ya, kami menyediakan opsi pembayaran bertahap. Biasanya pembayaran dibagi menjadi 2-3 termin sesuai milestone proyek. Silakan diskusikan dengan tim kami untuk arrangement yang sesuai.",
  },
  {
    question: "Apakah website responsive untuk mobile?",
    answer:
      "Tentu saja! Semua website yang kami buat sudah mobile-responsive by default. Kami memastikan tampilan dan fungsi optimal di semua perangkat, dari desktop hingga smartphone.",
  },
  {
    question: "Bagaimana proses revisi desain?",
    answer:
      "Kami memberikan 3 kali revisi major pada tahap desain. Setiap revisi akan didiskusikan dan dikonfirmasi sebelum melanjutkan ke tahap development. Revisi minor bisa dilakukan kapan saja selama proses development.",
  },
  {
    question: "Teknologi apa yang digunakan?",
    answer:
      "Kami menggunakan teknologi modern seperti Next.js, React, TypeScript, Tailwind CSS, dan PostgreSQL. Untuk mobile app, kami menggunakan React Native. Stack teknologi dipilih berdasarkan kebutuhan dan skala proyek.",
  },
  {
    question: "Apakah ada garansi setelah website selesai?",
    answer:
      "Ya, kami memberikan garansi 30 hari setelah website live. Selama periode garansi, kami akan memperbaiki bug dan masalah teknis tanpa biaya tambahan.",
  },
] as const;

export const PRICING_OPTIONS = {
  projectTypes: [
    { value: "company-profile", label: "Company Profile", basePrice: 1500000 },
    { value: "landing-page", label: "Landing Page", basePrice: 1000000 },
    { value: "portal-berita", label: "Portal Berita", basePrice: 3000000 },
    { value: "web-app", label: "Web Application", basePrice: 5000000 },
    { value: "mobile-app", label: "Mobile Application", basePrice: 8000000 },
    { value: "ecommerce", label: "E-Commerce", basePrice: 4000000 },
  ],
  features: [
    { value: "cms", label: "Content Management System", price: 1000000 },
    { value: "payment", label: "Payment Gateway", price: 1500000 },
    { value: "auth", label: "User Authentication", price: 800000 },
    { value: "dashboard", label: "Admin Dashboard", price: 1500000 },
    { value: "api", label: "API Integration", price: 1500000 },
    { value: "analytics", label: "Analytics Dashboard", price: 800000 },
  ],
  maintenance: [
    { value: "none", label: "Tanpa Maintenance", price: 0 },
    { value: "basic", label: "Basic (3 bulan)", price: 800000 },
    { value: "standard", label: "Standard (6 bulan)", price: 1500000 },
    { value: "premium", label: "Premium (12 bulan)", price: 2500000 },
  ],
} as const;

export const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "Tentang Kami" },
    { href: "/about#team", label: "Tim Kami" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Kontak" },
  ],
  services: [
    { href: "/services#website", label: "Pembuatan Website" },
    { href: "/services#webapp", label: "Aplikasi Web" },
    { href: "/services#mobile", label: "Aplikasi Mobile" },
    { href: "/services#design", label: "Desain UI/UX" },
    { href: "/services#maintenance", label: "Maintenance" },
  ],
  resources: [
    { href: "/pricing", label: "Harga & Paket" },
    { href: "/portfolio", label: "Portofolio" },
    { href: "/blog", label: "Blog" },
    { href: "#faq", label: "FAQ" },
  ],
} as const;

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/kendariweb",
  facebook: "https://facebook.com/kendariweb",
  linkedin: "https://linkedin.com/company/kendariweb",
  whatsapp: "https://wa.me/6285340517686",
} as const;

export const CONTACT_INFO = {
  email: "support@kendariweb.com",
  phone: "+62 853 4051 7686",
  whatsapp: "6285340517686",
  address: "Kendari, Sulawesi Tenggara, Indonesia",
} as const;
