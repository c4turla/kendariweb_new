export const metadata = {
  title: "Privacy Policy",
  description: "Kebijakan privasi dan perlindungan data pengguna Kendariweb.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 sm:py-32">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-8 sm:p-12">
        <h1 className="mb-8 text-3xl font-bold text-[#F8FAFC] sm:text-4xl">
          Kebijakan Privasi
        </h1>
        <div className="prose prose-invert max-w-none text-[#94A3B8]">
          <p className="mb-4">Terakhir diperbarui: 1 Juli 2026</p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            1. Pendahuluan
          </h2>
          <p className="mb-4">
            Selamat datang di Kendariweb. Kami menghargai privasi Anda dan
            berkomitmen untuk melindungi data pribadi yang Anda bagikan kepada kami.
            Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
            menggunakan, dan melindungi informasi Anda saat Anda menggunakan layanan
            kami.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            2. Informasi yang Kami Kumpulkan
          </h2>
          <p className="mb-4">
            Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara
            langsung kepada kami, seperti:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Nama, alamat email, dan nomor telepon saat Anda menghubungi kami.</li>
            <li>Informasi proyek dan bisnis saat Anda meminta konsultasi.</li>
            <li>Data teknis seperti alamat IP, jenis browser, dan log aktivitas.</li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            3. Penggunaan Informasi
          </h2>
          <p className="mb-4">
            Informasi yang kami kumpulkan digunakan untuk:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Menyediakan, memelihara, dan meningkatkan layanan kami.</li>
            <li>Memproses transaksi dan mengirimkan pemberitahuan terkait.</li>
            <li>Berkomunikasi dengan Anda terkait layanan, penawaran, dan pembaruan.</li>
          </ul>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            4. Keamanan Data
          </h2>
          <p className="mb-4">
            Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi
            informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang
            tidak sah. Namun, tidak ada metode transmisi di internet atau metode
            penyimpanan elektronik yang 100% aman.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            5. Perubahan Kebijakan
          </h2>
          <p className="mb-4">
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap
            perubahan akan dipublikasikan di halaman ini dengan memperbarui tanggal
            "Terakhir diperbarui" di bagian atas.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold text-[#F8FAFC]">
            6. Hubungi Kami
          </h2>
          <p className="mb-4">
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan
            hubungi kami di hello@kendariweb.com.
          </p>
        </div>
      </div>
    </div>
  );
}
