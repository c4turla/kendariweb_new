import "dotenv/config";

import { db } from "./src/db";
import { posts, portfolios } from "./src/db/schema";
import { eq } from "drizzle-orm";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seedSampleData() {
  console.log("Seeding sample blog posts and portfolios...");

  const blogPosts = [
    {
      title: "Membuat Website Company Profile Modern dengan Next.js 15",
      slug: "membuat-website-company-profile-modern-dengan-nextjs-15",
      content: `<p>Di era digital saat ini, memiliki website company profile bukan lagi pilihan tetapi menjadi keharusan bagi setiap bisnis yang ingin tetap kompetitif. Website company profile berfungsi sebagai kartu nama digital perusahaan yang menawarkan gambaran komprehensif tentang visi, misi, produk, layanan, dan prestasi perusahaan kepada calon klien, investor, dan mitra bisnis.</p><p>Next.js 15 hadir dengan berbagai peningkatan performa dan fitur baru yang membuat pengembangan website company profile menjadi lebih efisien dan scalable. Dalam artikel ini, kita akan membahas langkah demi langkah membuat website company profile modern menggunakan Next.js 15, Tailwind CSS, dan beberapa library pendukung lainnya.</p><h2>Keunggulan Next.js 15 untuk Company Profile</h2><ul><li>Server Components yang mengurangi JavaScript yang dikirim ke browser</li><li>Streaming SSR untuk pemuatan konten yang lebih cepat</li><li>Image Optimization built-in</li><li>Route Groups untuk organisasi kode yang lebih baik</li><li>Enhanced Metadata API untuk SEO yang optimal</li></ul><p>Dengan kombinasi Next.js 15 dan Tailwind CSS, kita dapat membuat website company profile yang tidak hanya visually appealing tetapi juga sangat performant dan SEO-friendly.</p>`,
      description: "Panduan lengkap membuat website company profile modern menggunakan Next.js 15 dengan Tailwind CSS dan best practices terkini.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
      category: "Tutorial",
      status: "published",
    },
    {
      title: "Tips Memilih Desain Website yang Sesuai dengan Target Pasar",
      slug: "tips-memilih-desain-website-yang-sesuai-dengan-target-pasar",
      content: `<p>Memilih desain website yang tepat sangat penting karena website merupakan representasi visual merek Anda di dunia online. Desain yang tidak tepat justru bisa menjauhkan potensi klien alihalih menarik mereka. Dalam artikel ini, kita akan membahas beberapa tips penting untuk memilih desain website yang sesuai dengan target pasar dan tujuan bisnis Anda.</p><h2>1. Pahami Identitas Merek Anda</h2><p>Sebelum memulai proses desain, pastikan Anda memiliki pemahaman yang jelas tentang identitas merek Anda. Termasuk nilai-nilai inti, personality merek, dan posisi pasar yang ingin Anda capai.</p><h2>2. Riset Preferensi Target Audiens</h2><p>Setiap segmen pasar memiliki preferensi visual yang berbeda. Misalnya, audiens yang lebih muda mungkin lebih tertarik dengan desain yang berani dan menggunakan animasi, sementara audiens profesional mungkin lebih menyukai desain yang minimalis dan profesional.</p><h2>3. Pertimbangkan Prinsip Usability dan Aksesibilitas</h2><p>Desain yang bagus bukan hanya tentang estetika tetapi juga tentang fungsionalitas. Pastikan desain website Anda mematuhi prinsip usability dasar dan standar aksesibilitas seperti WCAG.</p><p>Dengan mempertimbangkan faktor-faktor di atas, Anda dapat memilih desain website yang tidak hanya menarik secara visual tetapi juga efektif dalam mencapai tujuan bisnis Anda.</p>`,
      description: "Panduan praktis untuk memilih desain website yang sesuai dengan karakteristik target pasar dan tujuan bisnis Anda.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      category: "Desain",
      status: "published",
    },
    {
      title: "5 Tren Teknologi Web Development yang Akan Dominasi Tahun 2026",
      slug: "5-tren-teknologi-web-development-yang-akan-dominasi-tahun-2026",
      content: `<p>Dunia web development terus berkembang dengan pesat, bringing teknologi baru dan pendekatan inovatif yang mengubah cara kita membangun aplikasi web. Sebelum memasuki tahun 2026, penting bagi pengembang dan pemilik bisnis untuk tetap update dengan tren terbaru sehingga bisa tetap kompetitif dan menyajikan pengalaman terbaik bagi pengguna.</p><h2>1. AI-Integrated Development</h2><p>Kecerdasan buatan mulai terintegrasi secara mendalam dalam proses pengembangan web. Dari pembuatan kode otomatis menggunakan GitHub Copilot hingga desain UI yang dihasilkan oleh AI, teknologi ini mempercepat siklus pengembangan dan meningkatkan kualitas output.</p><h2>2. Edge Computing dan Serverless Architecture</h2><p>Pemrosesan data yang lebih dekat dengan pengguna akhir melalui edge computing mengurangi latensi secara signifikan. Platform seperti Vercel Edge Functions dan Cloudflare Workers membuat deployment aplikasi global menjadi lebih mudah dan ekonomis.</p><h2>3. WebAssembly untuk Performa Tinggi</h2><p>WebAssembly (Wasm) memungkinkan eksekusi kode dengan kecepatan hampir native di browser, membuka peluang untuk aplikasi yang intensif komputasi seperti video editing, 3D rendering, dan game berjalan langsung di browser tanpa plugin.</p><h2>4. Progressive Web Apps (PWA) Tahap Lanjut</h2><p>PWA terus evolusi dengan dukungan yang lebih baik untuk fitur sistem operasi seperti offline sync, push notifications, dan akses ke hardware perangkat. Tahun 2026 akan melihat adopsi PWA yang lebih luas di sektor e-commerce dan layanan berbasis langganan.</p><h2>5. Component-Driven Architecture dengan Framework Modern</h2><p>Pendekatan berbasis komponen menjadi standar de facto dengan library seperti React, Vue, dan Svelte yang terus mature. Tren baru adalah adopsi framework yang menekankan pada server-first approach seperti Astro dan Qwik yang mengirimkan hampir nol JavaScript ke browser untuk halaman statis.</p><p>Dengan memahami dan mengadopsi tren-tren ini, pengembang web dapat membangun solusi yang lebih inovatif, efisien, dan siap menghadapi tantangan masa depan.</p>`,
      description: "Diskusi mengenai lima tren teknologi web development yang diprediksi akan dominating industri pada tahun 2026.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
      category: "Teknologi",
      status: "published",
    },
    {
      title: "Mengapa Memilih Layanan Pengembangan Website Profesional?",
      slug: "mengapa-memilih-layanan-pengembangan-website-profesional",
      content: `<p>Banyak pemilik usaha kecil dan menengah masih berpikir bahwa membuat website bisa dilakukan sendiri menggunakan website builder atau template gratis. Meskipun pendekatan ini mungkin tampak menghemat biaya pada awalnya, ada banyak alasan mengapa merupakan investasi yang lebih baik untuk menggunakan layanan pengembangan website profesional seperti yang ditawarkan oleh agensi web development terpercaya.</p><h2>1. Kustomisasi yang Sesuai dengan Kebutuhan Bisnis</h2><p>Website builder umumnya memberikan Anda pilihan terbatas dalam hal desain dan fungsionalitas. Tim pengembangan profesional dapat membuat solusi yang sepenuhnya tailored sesuai dengan proses bisnis unik Anda, integrasi dengan sistem yang sudah ada, dan spesifikasi teknis tertentu.</p><h2>2. Kode yang Bersih, Terstruktur, dan Mudah Di-Maintain</h2><p>Pengembang profesional mengikuti best practices dan standar kode yang memastikan hasil akhir tidak hanya bekerja dengan baik tetapi juga mudah untuk dipelihara dan dikembangkan di masa depan. Ini sangat penting untuk menghindari teknological utang yang bisa membebani bisnis Anda di kemudian hari.</p><h2>3. Optimasi Performa dan SEO yang Maksimal</h2><p>Tim profesional memiliki keahlian dalam mengoptimasi kecepatan muat website, struktur data untuk SEO, dan implementasi teknik-teknik terkini seperti lazy loading, code splitting, dan server-side rendering yang bisa meningkatkan peringkat pencarian dan konversi pengunjung.</p><h2>4. Keamanan yang Terjamin</h2><p>Keamanan website adalah aspek kritis yang sering diabaikan oleh pemilik website pemula. Pengembang profesional menerapkan lapisan keamanan yang tepat termasuk HTTPS, header keamanan, pembaruan reguler, dan proteksi terhadap serangan umum seperti XSS dan CSRF.</p><h2>5. Dukungan Teknical yang Terus-Menerus</h2><p>Dengan layanan profesional, Anda tidak hanya mendapatkan website sekali lalu lalu tinggalkan. Anda memperoleh paket maintenance yang meliputi pembaruan reguler, backup data, monitoring performa, dan dukungan teknis ketika terjadi masalah.</p><p>Investasi dalam layanan pengembangan website profesional bukan hanya biaya, melainkan investasi strategis yang akan memberikan return yang signifikan dalam jangka panjang melalui peningkatan citra merek, pengalaman pengguna yang lebih baik, dan konversi yang lebih tinggi.</p>`,
      description: "Alasan mengapa memilih layanan pengembangan website profesional merupakan pilihan yang lebih baik dibandingkan solusi DIY atau website builder.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
      category: "Bisnis",
      status: "published",
    },
    {
      title: "Cara Mengukur Keberhasilan Website melalui Metrik KPI yang Tepat",
      slug: "cara-mengukur-keberhasilan-website-melalui-metrik-kpi-yang-tepat",
      content: `<p>Membuat website adalah hanya langkah pertama dalam perjalanan digital bisnis. Untuk memastikan investasi website Anda memberikan hasil yang optimal, penting untuk mengukur kinerjanya menggunakan metrik kunci yang tepat. Artikel ini akan membahas berbagai KPI website yang penting dan cara mengukurnya secara efektif.</p><h2>1. Traffic dan Sumber Pengunjung</h2><ul><li>Total Visits: Jumlah total kunjungan ke website dalam periode tertentu</li><li>Unique Visitors: Jumlah pengunjung unik yang mengakses website</li><li>Traffic Sources: Persentase pengunjung berdasarkan sumber (organik, berbayar, media sosial, direkte, referral)</li></ul><h2>2. Metrik Keterlibatan (Engagement)</h2><ul><li>Bounce Rate: Persentase pengunjung yang meninggalkan website setelah hanya melihat satu halaman</li><li>Average Session Duration: Rata-rata waktu yang pengunjung habiskan di website per kunjungan</li><li>Pages per Session: Rata-rata jumlah halaman yang dilihat per kunjungan</li></ul><h2>3. Metrik Konversi</h2><ul><li>Conversion Rate: Persentase pengunjung yang menyelesaikan tindakan yang diinginkan (misalnya mengisi form kontat, melakukan pembelian, mendaftar newsletter)</li><li>Goal Completion Value: Nilai monetari yang dihasilkan dari setiap konversi</li></ul><h2>4. Kinerja Teknis</h2><ul><li>Page Load Time: Waktu yang diperlukan untuk sepenuhnya memuat sebuah halaman</li><li>Time to First Byte (TTFB): Waktu yang diperlukan server untuk merespons permintaan pertama</li><li>Mobile Responsiveness: Sejauhmana website berfungsi dan terlihat baik di perangkat seluler</li></ul><p> Dengan memantau metrik-metrik ini secara rutin, Anda dapat membuat keputusan berbasis data untuk meningkatkan performa website Anda dan memastikan bahwa ia terus memberikan nilai bagi bisnis Anda.</p>`,
      description: "Panduan lengkap tentang metrik kunci kinerja website (KPI) yang harus dipantau untuk mengukur keberhasilan online bisnis Anda.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      category: "Tips & Trik",
      status: "published",
    },
    {
      title: "Integrasi Chatbot Cerdas ke Website untuk Peningkatan Layanan Konsumen",
      slug: "integrasi-chatbot-cerdas-ke-website-untuk-peningkatan-layanan-konsumen",
      content: `<p>Layanan konsumen yang baik adalah salah satu pilar kunci dalam membangun loyalitas pelanggan dan reputasi merek yang positif. Dalam era digital saat ini, integrasi chatbot cerdas ke website menjadi solusi inovatif untuk memberikan dukungan konsumen 24/7 tanpa perlu meningkatkan secara signifikan biaya operasional.</p><h2>Manfaat Chatbot untuk Website Bisnis</h2><ul><li>Ketersediaan 24/7: Chatbot dapat memberikan respons instan kapan saja, bahkan di luar jam kerja kantor</li><li>Skalabilitas: Satu chatbot bisa menangani ratusan bahkan ribuan percakapan sekaligus tanpa peningkatan biaya linear</li><li>Konsistensi: Respons yang diberikan konsisten dan berdasarkan basis pengetahuan yang telah ditentukan</li><li>Pengumpulan Data: Setiap interaksi dengan chatbot menghasilkan data berharga yang bisa digunakan untuk memperbaiki layanan dan produk</li><li>Cost Efficiency: Mengurangi kebutuhan akan staf konsumen untuk pertanyaan-pertanyaan rutin sehingga tim bisa fokus pada masalah yang lebih kompleks</li></ul><h2>Membangun Chatbot yang Efektif</h2><p>Untuk membangun chatbot yang benar-benar meningkatkan layanan konsumen, ada beberapa langkah penting:</p><ol><li>Definisikan Tujuan dan Cakupan: Jelaskan secara spesifik apa yang ingin Anda capai dengan chatbot dan tipe pertanyaan apa yang akan ditangani</li><li>Pilih Platform yang Tepat: Ada banyak platform chatbot mulai dari solusi no-code seperti ManyChat hingga framework pembangunan seperti Microsoft Bot Framework atau Rasa</li><li>Latih dengan Data yang Relevan: Berikan chatbot akses ke basis pengetahuan yang mencakup informasi produk, FAQ, dan panduan troubleshooting</li><li>Integrasi ke Website: Pastikan chatbot terintegrasi dengan lancar ke website Anda dengan tampilan yang tidak mengganggu pengguna</li><li>Monitor dan Tingkatkan: Secara rutin analisis percakapan chatbot dan perbarui basis pengetahuan berdasarkan umpan balik pengguna</li></ol><p> Dengan pendekatan yang tepat, integrasi chatbot tidak hanya akan meningkatkan kepuasan konsumen tetapi juga memberikan wawasan berharga yang bisa digunakan untuk pertumbuhan bisnis.</p>`,
      description: "Manfaat dan panduan implementasi chatbot cerdas di website untuk meningkatkan layanan konsumen dan efisiensi operasional.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
      category: "Teknologi",
      status: "published",
    },
    {
      title: "Strategi Konten yang Efektif untuk Meningkatkan SEO Website Secara Organik",
      slug: "strategi-konten-yang-efektif-untuk-meningkatkan-seo-website-secara-organik",
      content: `<p>Search Engine Optimization (SEO) tetap menjadi salah satu strategi paling penting untuk meningkatkan visibilitas website secara organik tanpa harus mengandalkan iklan berbayar terus-menerus. Namun, SEO bukan lagi hanya tentang stuffing kata kunci atau memperoleh sebanyak mungkin backlink. Pendekatan SEO modern menekankan pada kualitas dan relevansi konten sebagai dasar utama.</p><p>Artikel ini akan membahas strategi konten yang efektif untuk meningkatkan SEO website Anda secara organik dengan fokus pada pembuatan konten bernilai yang menarik dan memuaskan audiens target Anda.</p><h2>1. Pahami Intensi Pencari (Search Intent)</h2><p>Dasar dari strategi konten SEO yang efektif adalah memahami maksud atau tujuan di balik kata kunci yang dicari oleh pengguna. Ada empat tipe utama search intent:</p><ul><li>Informational: Pengguna mencari informasi atau jawaban atas pertanyaan tertentu</li><li>Navigational: Pengguna mencari website atau halaman tertentu</li><li>Transactional: Pengguna berniat untuk melakukan transaksi seperti pembelian atau pendaftaran</li><li>Commercial Investigation: Pengguna sedang membandingkan produk atau layanan sebelum membuat keputusan pembelian</li></ul><p> Dengan memahami search intent, Anda bisa menciptakan konten yang tepat sasaran dan memberikan nilai yang sebenarnya kepada audiens Anda.</p><h2>2. Buat Konten yang Comprehensive dan Authoritative</h2><p>Algoritma pencarian modern seperti Google memberi prioritas kepada konten yang menunjukkan keahlian, otoritas, dan kepercayaan (E-A-T). Untuk mencapai ini:</p><ul><li>Buat konten yang menyeluruh dan menjawab semua aspek dari suatu topik</li><li>Sertakan data, statistik, dan kutukan dari sumber terpercaya</li><li>Tunjukkan biografinya penulis yang relevan dengan topik yang dibahas</li><li>Dapatkan backlink dari website otoritas dalam niche Anda</li></ul><h2>3. Optimasi untuk Fitur Rich Snippet</h2><p>Memanfaatkan struktur data (schema markup) agar konten Anda bisa ditampilkan sebagai rich snippet di hasil pencarian, meningkatkan click-through rate secara signifikan.</p><h2>4. Konsistensi dan Keberlanjutan</h2><p>SEO adalah proses jangka panjang yang memerlukan upaya konsisten. Jadwalkan pembaruan konten secara teratur dan pantau performa menggunakan alat seperti Google Search Console dan Google Analytics.</p><p> Dengan menerapkan strategi konten yang tepat, Anda tidak hanya akan meningkatkan peringkat pencarian website Anda tetapi juga membangun otoritas merek dan kepercayaan di kalangan audiens target Anda.</p>`,
      description: "Strategi konten yang efektif untuk meningkatkan SEO website secara organik melalui pemahaman search intent dan pembuatan konten berototitas.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
      category: "Tips & Trik",
      status: "published",
    },
    {
      title: "Memahami Perbedaan antara Website Statis, Dinamis, dan Hybrid",
      slug: "memahami-perbedaan-antara-website-statis-dinamis-dan-hybrid",
      content: `<p>Dalam dunia pengembangan web, terdapat tiga kategori utama website berdasarkan cara mereka mengirimkan konten dan berinteraksi dengan pengguna: website statis, dinamis, dan hybrid. Memahami perbedaan antara ketiganya sangat penting untuk memilih arsitektur yang tepat berdasarkan kebutuhan spesifik proyek Anda.</p><h2>Website Statis</h2><p>Website statis adalah jenis website paling dasar yang menghantar file HTML, CSS, dan JavaScript yang sudah siap langsung dari server tanpa pemrosesan apa-apa. Konten website statis tetap sama untuk setiap pengunjung kecuali jika file tersebut diperbarui secara manual oleh pengembang.</p><p>Keunggulan website statis:</p><ul><li>Kecepatan luar biasa karena tidak ada pemrosesan di server</li><li>Hosting yang murah dan mudah (bisa bahkan di layanan gratis seperti GitHub Pages atau Netlify)</li><li>Keamanan yang tinggi karena tidak ada basis data atau logika server yang bisa dieksploitasi</lihan yang bisa dieksploitasi</li><li>Skalabilitas yang excellent karena hanya perlu mengirimkan file statis</li></ul><p>Keterbatasan website statis:</p><ul><li>Tidak bisa mempersonalisasi konten berdasarkan pengguna atau data real-time</li><li>Membutuhkan pembaruan manual untuk setiap perubahan konten</li><li>Tidak cocok untuk aplikasi yang memerlukan interaksi kompleks dengan pengguna</li></ul><h2>Website Dinamis</h2><p>Website dinamis menghasilkan konten secara real-time di server berdasarkan permintaan pengguna, basis data, dan logika aplikasi. Contoh klasik meliputi platform e-commerce, jejaring sosial, dan sistem manajemen konten (CMS).</p><p>Keunggulan website dinamis:</p><ul><li>Kemampuan untuk memberikan konten yang dipersonalisasi berdasarkan preferensi pengguna, lokasi, dan perilaku sebelumnya</li><li>Fungsionalitas interaktif yang kompleks seperti formulir, keranjang belanja, dan sistem pengguna</li><li>Kemampuan untuk menangani basis data besar dan transaksi yang kompleks</li></ul><p>Keterbatasan website dinamis:</p><ul><li>Kecepatan yang lebih lambat karena pemrosesan di server diperlukan untuk setiap permintaan</li><li>Biaya hosting dan pemeliharaan yang lebih tinggi</li><li>Kompleksitas teknis yang lebih tinggi membutuhkan tim pengembang yang lebih besar</li><li>Risiko keamanan yang lebih besar karena terdapat lebih banyak titik rentan</li></ul><h2>Website Hybrid (Static Site Generation + Client-Side Rendering)</h2><p>Pendekatan hybrid menggabungkan keuntungan dari website statis dan dinamis dengan strategi seperti Static Site Generation (SSG) dan Incremental Static Regeneration (ISR). Next.js merupakan contoh kerangka kerja yang sangat populer untuk pendekatan ini.</p><p>Dalam model hybrid:</p><ul><li>Halaman yang tidak berubah dihasilkan sebagai file statis pada build time untuk kecepatan maksimal</li><li>Halaman yang membutuhkan data real-time atau interaksi pengguna dirender pada sisi klien atau menggunakan data yang di-fetch pada runtime</li><li>Memungkinkan kombinasi antara kecepatan statis dan fungsionalitas dinamis sesuai kebutuhan</li></ul><p>Pemilihan antara website statis, dinamis, dan hybrid seharusnya didasarkan pada:</p><ul><li>Frekuensi pembaruan konten</li><li>Kebutuhan untuk personalisasi dan interaksi real-time</li><li>Anggaran pengembangan dan hosting</li><li>Persyaratan keamanan dan skalabilitas</li><li>Pengalaman teknis tim pengembang</li></ul><p>Dengan memahami perbedaan antara ketiganya, Anda dapat membuat keputusan yang tepat mengenai arsitektur website yang paling sesuai untuk tujuan bisnis dan teknis Anda.</p>`,
      description: "Panduan lengkap memahami perbedaan antara website statis, dinamis, dan hybrid serta kapan menggunakan masing-masing tipe.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      category: "Teknologi",
      status: "published",
    },
    {
      title: "Manajemen Proyek Pengembangan Website yang Efektif untuk Tim Kecil",
      slug: "manajemen-proyek-pengembangan-website-yang-efektif-untuk-tim-kecil",
      content: `<p>Pengembangan website bahkan untuk tim kecil bisa menjadi tantangan yang signifikan jika tidak ada struktur manajemen proyek yang tepat. Tanpa pendekatan yang terorganisasi, proyek bisa mengalami scope creep, tenggat waktu terlewat, dan hasil akhir yang tidak sesuai dengan ekspektasi klien. Artikel ini akan membahas praktik terbaik manajemen proyek pengembangan website yang efektif khususnya untuk tim kecil dengan sumber terbatas.</p><h2>1. Pendekatan Agile yang Disesuaikan</h2><p>Meskipun metodologi Agile seperti Scrum mungkin terlalu formal bagi tim sangat kecil, prinsip-prinsip intinya tetap sangat berharga:</p><ul><li>Pembagian proyek menjadi sprint atau iterasi yang berdurasi 1-2 minggu</li><li>Rapat harian singkat (stand-up meeting) untuk menyinkronkan progres dan menghambat penghalang</li><li>Review dan retrospective di akhir setiap iterasi untuk belajar dari pengalaman dan meningkatkan proses</li></ul><p>Kunci adalah menjaga siklus umpan balik yang singkat sehingga perubahan bisa diadopsi dengan cepat tanpa banyak overhead administrasi.</p><h2>2. Alat dan Teknik yang Tepat</h2><p>Tim kecil harus memilih alat yang tepat bisa meningkatkan produktivitas secara signifikan tanpa harus mengeluarkan biaya besar:</p><ul><li>Sistem manajemen tugas yang sederhana seperti Trello, Asana bahkan GitHub Projects untuk melacak pekerjaan</li><li>Platform komunikasi terpusat seperti Slack atau Discord untuk diskusi tim</li><li>Sistem kontrol versi yang baik seperti Git dengan branching model yang jelas</li><li>Lingkungan pengembangan yang terstandardisasi menggunakan Docker atau setup seragam untuk menghindari masalah "works on my machine"</li></ul><h2>3. Definisi yang Jelas dari Scope dan Kepuasan</h2><p>Salah satu penyebab utama kegagalan proyek adalah kurangnya definisi yang jelas tentang apa yang termasuk dan tidak termasuk dalam scope proyek. Untuk mengatasi ini:</p><ul><li>Buat dokumen scope yang terperinci yang menyampaikan fitur-fitur, fungsi-fitur, dan batasan teknis</li><li>Dapatkan persetujuan tertulis dari pemangku kepentingan sebelum mulai pekerjaan pengembangan</li><li>Gunakan teknik seperti user stories dan acceptance criteria untuk menjelaskan ekspektasi secara detail</li></ul><h2>4. Pengujian Berkelanjutan dan Strategi Peluncuran</h2><p>Meskirim ukuran tim kecil tidak berarti harus mengorbankan kualitas. Implementasikan strategi pengujian yang teratur:</p><ul><li>Pengujian unit untuk komponen atau fungsi individu</li><li>Pengujian integrasi untuk memastikan bagian-bagian dari sistem bekerja bersama dengan baik</li><li>Pengujian fungsional dari perspektif pengguna akhir</li><li>Pengujian regresi untuk memastikan perubahan baru tidak merusak fungsionalitas yang sudah ada</li></ul><p>Strategi peluncuran yang baik juga sangat penting. Pertimbangkan pendekatan seperti soft launch atau beta testing ke sekelompok pengguna sebelum peluncuran penuh guna mengumpulkan umpan balik dan melakukan penyesuaian.</p><p>Dengan menerapkan praktik manajemen proyek yang tepat bahkan dengan sumber terbatas, tim kecil dapat berhasil mengirimkan website berkualitas tinggi yang sesuai dengan ekspektasi klien dan tujuan bisnis.</p>`,
      description: "Panduan manajemen proyek pengembangan website yang efektif untuk tim kecil dengan fokus pada pendekatan agile yang disesuaikan dan alat yang tepat.",
      image: "https://images.unsplash.com/photo-1526401394332-ff034c9b878f?w=1200&q=80",
      category: "Bisnis",
      status: "published",
    },
    {
      title: "Optimasi Database untuk Aplikasi Web Skala Besar",
      slug: "optimasi-database-untuk-aplikasi-web-skala-besar",
      content: `<p>Seiring pertumbuhan bisnis dan jumlah pengguna, performa database menjadi faktor kritis yang menentukan keberhasilan aplikasi web. Tanpa optimasi yang tepat, website yang awalnya responsif bisa menjadi lambat, tidak stabil, dan menimbulkan pengalaman buruk bagi pengguna.</p><h2>1. Indeksasi yang Tepat</h2><p>Indeks yang tepat dapat meningkatkan kecepatan query hingga ratusan kali lipat. Namun, indeks yang berlebihan justru akan memperlambat operasi INSERT dan UPDATE karena database harus memperbarui semua indeks setiap ada perubahan data.</p><h2>2. Query Optimization</h2><p>Memahami execution plan sangat penting untuk mengidentifikasi bottleneck query. Beberapa teknik optimasi query meliputi: menghindari SELECT *, menggunakan JOIN dengan tepat, membatasi hasil dengan LIMIT, dan menggunakan subquery hanya bila diperlukan.</p><h2>3. Database Connection Pooling</h2><p>Menggunakan connection pool seperti PgBouncer untuk PostgreSQL atau mekanisme pooling built-in pada ORM seperti Drizzle/Prisma dapat mengurangi overhead koneksi dan meningkatkan throughput aplikasi secara signifikan.</p><h2>4. Caching Strategy</h2><p>Implementasi caching di berbagai layer (browser cache, CDN, application cache, dan database query cache) dapat mengurangi beban database secara dramatis. Tools seperti Redis sangat populer untuk application-level caching.</p><p>Dengan menerapkan strategi optimasi database yang tepat, aplikasi web Anda akan tetap responsif dan stabil bahkan saat menangani jutaan pengguna secara bersamaan.</p>`,
      description: "Panduan praktis mengoptimasi database untuk aplikasi web skala besar, mencakup indeksasi, optimasi query, connection pooling, dan strategi caching.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
      category: "Teknologi",
      status: "published",
    },
  ];

  const portfolioList = [
    {
      title: "Website Company Profile - Perusahaan Konsultan Keuangan Jakarta",
      slug: "website-company-profile-konsultan-keuangan-jakarta",
      category: "Company Profile Website",
      industry: "Jasa Keuangan & Konsultan",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
      tech: "React, Next.js 15, Tailwind CSS, Framer Motion, Contentful (headless CMS)",
      url: "https://konsultankeuangan.example.com",
      status: "published",
    },
    {
      title: "Toko Online Fashion Berbasis Marketplace",
      slug: "toko-online-fashion-berbasis-marketplace",
      category: "E-Commerce Website",
      industry: "Fashion & Apparel",
      image: "https://images.unsplash.com/photo-1441986300917-64674bb6574e?w=1200&q=80",
      tech: "Next.js 15, Stripe, Prisma, PostgreSQL, Tailwind CSS, SWR",
      url: "https://trendstore.example.com",
      status: "published",
    },
    {
      title: "Aplikasi Pemesanan Makanan Online untuk Restoran Lokal",
      slug: "aplikasi-pemesanan-makanan-online-restoran-lokal",
      category: "Mobile Application",
      industry: "Restoran & Kuliner",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
      tech: "React Native, Firebase (Auth, Firestore, Cloud Functions), Redux Toolkit, Expo",
      url: "https://apps.apple.com/id/app/makananku",
      status: "published",
    },
    {
      title: "Sistem Informasi Manajemen Stok untuk Gudang Logistik",
      slug: "sistem-informasi-manajemen-stok-gudang-logistik",
      category: "Web Application",
      industry: "Logistik & Gudang",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd4e?w=1200&q=80",
      tech: "Vue 3, Nuxt 3, Pinia, Vuetify, Node.js Express, MongoDB",
      url: "https://stokku.example.com",
      status: "published",
    },
    {
      title: "Platform Pembelajaran Online untuk Kursus Bahasa",
      slug: "platform-pembelajaran-online-kursus-bahasa",
      category: "Web Application",
      industry: "Pendidikan & Pelatihan",
      image: "https://images.unsplash.com/photo-1496646115838-78f0e31e5e86?w=1200&q=80",
      tech: "Laravel 11, Livewire, Alpine.js, Tailwind CSS, Pusher (WebSockets), MySQL",
      url: "https://belajarbahasa.example.com",
      status: "published",
    },
  ];

  try {
    // Insert blog posts
    for (const post of blogPosts) {
      // Check if slug already exists
      const existing = await db
        .select({ id: posts.id })
        .from(posts)
        .where(eq(posts.slug, post.slug))
        .limit(1);

      if (existing.length === 0) {
        await db
          .insert(posts)
          .values({
            title: post.title,
            slug: post.slug,
            content: post.content,
            description: post.description,
            image: post.image,
            category: post.category,
            status: post.status as "draft" | "published" | "archived",
          });
        console.log(`✅ Inserted blog post: "${post.title}"`);
      } else {
        console.log(`⚠️ Blog post with slug "${post.slug}" already exists, skipping`);
      }
    }

    // Insert portfolios using raw SQL
    const existingCount = await pool.query(`SELECT COUNT(*) FROM portfolios`);
    if (parseInt(existingCount.rows[0].count) === 0) {
      for (const portfolio of portfolioList) {
      await pool.query(
        `INSERT INTO portfolios (title, category, industry, image, tech, url, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
        [portfolio.title, portfolio.category, portfolio.industry, portfolio.image, portfolio.tech, portfolio.url, portfolio.status]
      );
        console.log(`✅ Inserted portfolio: "${portfolio.title}"`);
      }
      console.log("\n🎉 Sample data seeding completed!");
    } else {
      console.log(`⚠️ Portfolios already exist (${existingCount.rows[0].count} rows), skipping`);
      console.log("\n🎉 Sample data seeding completed!");
    }
  } catch (error) {
    console.error("❌ Error seeding sample data:", error);
  }
}

seedSampleData();