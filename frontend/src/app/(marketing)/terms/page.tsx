export const metadata = {
  title: "Terms of Service",
  description: "Syarat dan ketentuan layanan Kendariweb.",
};

export default function TermsOfServicePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 sm:py-32">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 sm:p-12">
        <h1 className="mb-8 text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
          Syarat & Ketentuan Layanan
        </h1>
        <div className="prose prose-invert max-w-none text-[#94A3B8]">
          <p className="mb-4">Terakhir diperbarui: 1 Juli 2026</p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            1. Penerimaan Syarat
          </h2>
          <p className="mb-4">
            Dengan mengakses dan menggunakan layanan Kendariweb, Anda setuju untuk
            terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak setuju dengan
            bagian mana pun dari syarat ini, Anda dilarang menggunakan layanan kami.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            2. Layanan
          </h2>
          <p className="mb-4">
            Kendariweb menyediakan layanan pengembangan website, aplikasi web,
            aplikasi seluler, desain UI/UX, dan layanan pemeliharaan. Ruang lingkup
            layanan akan ditentukan dalam perjanjian proyek atau proposal yang
            disepakati secara terpisah.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            3. Pembayaran
          </h2>
          <p className="mb-4">
            Pembayaran layanan harus dilakukan sesuai dengan jadwal pembayaran yang
            disepakati. Umumnya, kami memerlukan pembayaran uang muka (DP) sebelum
            memulai proyek. Semua biaya tidak dapat dikembalikan (non-refundable)
            kecuali ditentukan lain secara tertulis.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            4. Hak Kekayaan Intelektual
          </h2>
          <p className="mb-4">
            Setelah pembayaran penuh diterima, klien akan memiliki hak kepemilikan
            atas produk akhir yang diserahkan. Kendariweb berhak untuk menampilkan
            proyek tersebut dalam portofolio kami kecuali ada perjanjian kerahasiaan
            (NDA) yang disepakati.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            5. Revisi dan Pemeliharaan
          </h2>
          <p className="mb-4">
            Jumlah revisi selama masa pengembangan akan disesuaikan dengan paket
            yang dipilih. Layanan pemeliharaan setelah proyek selesai tunduk pada
            syarat paket pemeliharaan yang dibeli secara terpisah.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            6. Batasan Tanggung Jawab
          </h2>
          <p className="mb-4">
            Kendariweb tidak akan bertanggung jawab atas kerusakan langsung, tidak
            langsung, insidental, khusus, atau konsekuensial yang timbul dari
            penggunaan atau ketidakmampuan untuk menggunakan layanan kami, termasuk
            namun tidak terbatas pada kehilangan keuntungan atau kehilangan data.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            7. Perubahan Ketentuan
          </h2>
          <p className="mb-4">
            Kami berhak untuk mengubah atau mengganti Syarat dan Ketentuan ini
            kapan saja. Kelanjutan penggunaan layanan setelah perubahan berlaku
            merupakan penerimaan terhadap syarat baru.
          </p>
        </div>
      </div>
    </div>
  );
}
