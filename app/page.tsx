import Link from "next/link";

const sections = [
  {
    href: "/rules",
    icon: "📋",
    zh: "工作守則",
    id_lang: "Peraturan Kerja",
    desc_zh: "照護工作的規定與注意事項",
    desc_id: "Aturan dan hal-hal yang perlu diperhatikan",
    color: "from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400",
    iconBg: "bg-blue-100",
  },
  {
    href: "/journal",
    icon: "📓",
    zh: "工作日誌",
    id_lang: "Jurnal Kerja",
    desc_zh: "每日記錄孩子的狀況",
    desc_id: "Catatan kondisi anak setiap hari",
    color: "from-green-50 to-green-100 border-green-200 hover:border-green-400",
    iconBg: "bg-green-100",
  },
  {
    href: "/chat",
    icon: "💬",
    zh: "溝通平台",
    id_lang: "Komunikasi",
    desc_zh: "與家長互相留言溝通",
    desc_id: "Kirim pesan kepada orang tua",
    color: "from-purple-50 to-purple-100 border-purple-200 hover:border-purple-400",
    iconBg: "bg-purple-100",
  },
  {
    href: "/learn",
    icon: "📚",
    zh: "學中文",
    id_lang: "Belajar Bahasa Mandarin",
    desc_zh: "照護常用詞彙與發音",
    desc_id: "Kosakata perawatan dan cara membacanya",
    color: "from-amber-50 to-amber-100 border-amber-200 hover:border-amber-400",
    iconBg: "bg-amber-100",
  },
];

export default function HomePage() {
  return (
    <div className="px-4 py-6">
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🌸</div>
        <h1 className="text-2xl font-bold text-gray-800">照護助手</h1>
        <p className="text-gray-500 text-sm mt-1">Asisten Perawat</p>
        <div className="mt-3 mx-auto w-16 h-0.5 bg-rose-300 rounded-full" />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <span className="text-2xl">🚨</span>
        <div>
          <p className="font-semibold text-red-700 text-sm">緊急聯絡 | Kontak Darurat</p>
          <p className="text-red-600 text-xs mt-0.5">如有緊急狀況，立即撥打家長電話</p>
          <p className="text-red-500 text-xs">Jika darurat, segera hubungi orang tua</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`flex items-center gap-4 p-4 rounded-2xl border bg-gradient-to-r ${s.color} transition-all active:scale-95`}
          >
            <div className={`${s.iconBg} rounded-xl p-3 text-3xl flex-shrink-0`}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-base font-bold text-gray-800">{s.zh}</span>
                <span className="text-xs text-gray-500">{s.id_lang}</span>
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{s.desc_zh}</p>
              <p className="text-xs text-gray-400">{s.desc_id}</p>
            </div>
            <span className="text-gray-400 flex-shrink-0">›</span>
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-8">
        以愛照護 · Merawat dengan Cinta 💕
      </p>
    </div>
  );
}
