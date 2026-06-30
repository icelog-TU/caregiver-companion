export interface Rule {
  id: string;
  category: string;
  categoryId: string;
  zh: string;
  id_lang: string;
}

export interface RuleCategory {
  id: string;
  zh: string;
  id_lang: string;
  icon: string;
}

export const categories: RuleCategory[] = [
  { id: "schedule", zh: "每日作息", id_lang: "Jadwal Harian", icon: "🕐" },
  { id: "care", zh: "照護工作", id_lang: "Tugas Perawatan", icon: "💊" },
  { id: "hygiene", zh: "衛生清潔", id_lang: "Kebersihan", icon: "🧼" },
  { id: "safety", zh: "安全守則", id_lang: "Keselamatan", icon: "🛡️" },
  { id: "communication", zh: "溝通聯繫", id_lang: "Komunikasi", icon: "📞" },
  { id: "diet", zh: "飲食照護", id_lang: "Nutrisi & Makanan", icon: "🥗" },
];

export const rules: Rule[] = [
  // 每日作息
  {
    id: "s1",
    category: "每日作息",
    categoryId: "schedule",
    zh: "每天早上 7:00 起床，協助孩子洗臉、刷牙、換衣服。",
    id_lang: "Bangun tidur setiap hari pukul 07.00, bantu anak cuci muka, sikat gigi, dan ganti pakaian.",
  },
  {
    id: "s2",
    category: "每日作息",
    categoryId: "schedule",
    zh: "每天晚上 9:00 協助孩子準備就寢，並記錄當天狀況於日誌。",
    id_lang: "Setiap malam pukul 21.00 bantu anak bersiap tidur, dan catat kondisi hari ini di jurnal.",
  },
  {
    id: "s3",
    category: "每日作息",
    categoryId: "schedule",
    zh: "每餐飯前後、如廁後必須洗手。",
    id_lang: "Wajib cuci tangan sebelum dan sesudah makan, serta setelah ke toilet.",
  },
  // 照護工作
  {
    id: "c1",
    category: "照護工作",
    categoryId: "care",
    zh: "每天按照醫生指示，準時給孩子服藥，並記錄用藥時間與劑量。",
    id_lang: "Berikan obat kepada anak tepat waktu sesuai petunjuk dokter, dan catat waktu serta dosisnya.",
  },
  {
    id: "c2",
    category: "照護工作",
    categoryId: "care",
    zh: "注意孩子的精神狀態、食慾與體溫，如有異常立即通知家長。",
    id_lang: "Perhatikan kondisi mental, nafsu makan, dan suhu tubuh anak. Jika ada kelainan, segera beri tahu orang tua.",
  },
  {
    id: "c3",
    category: "照護工作",
    categoryId: "care",
    zh: "陪伴孩子做適當的輕度活動或玩耍，避免劇烈運動。",
    id_lang: "Temani anak melakukan aktivitas ringan atau bermain yang sesuai, hindari olahraga berat.",
  },
  {
    id: "c4",
    category: "照護工作",
    categoryId: "care",
    zh: "每天量體溫一次（早上），如超過 38°C 立即通知家長。",
    id_lang: "Ukur suhu tubuh anak sekali sehari (pagi hari). Jika suhu di atas 38°C, segera hubungi orang tua.",
  },
  // 衛生清潔
  {
    id: "h1",
    category: "衛生清潔",
    categoryId: "hygiene",
    zh: "每天幫孩子洗澡，水溫不可過熱（約 37-38°C）。",
    id_lang: "Mandikan anak setiap hari, suhu air tidak boleh terlalu panas (sekitar 37-38°C).",
  },
  {
    id: "h2",
    category: "衛生清潔",
    categoryId: "hygiene",
    zh: "孩子的床單、衣物每週至少換洗兩次。",
    id_lang: "Sprei dan pakaian anak harus diganti dan dicuci minimal dua kali seminggu.",
  },
  {
    id: "h3",
    category: "衛生清潔",
    categoryId: "hygiene",
    zh: "照護者本身每天洗澡，保持個人清潔衛生。",
    id_lang: "Perawat sendiri harus mandi setiap hari dan menjaga kebersihan diri.",
  },
  // 安全守則
  {
    id: "sf1",
    category: "安全守則",
    categoryId: "safety",
    zh: "孩子不可獨處，照護者必須隨時在旁。",
    id_lang: "Anak tidak boleh ditinggal sendirian. Perawat harus selalu berada di dekatnya.",
  },
  {
    id: "sf2",
    category: "安全守則",
    categoryId: "safety",
    zh: "所有藥品放在孩子拿不到的地方，並上鎖保管。",
    id_lang: "Semua obat-obatan harus disimpan di tempat yang tidak bisa dijangkau anak dan dikunci.",
  },
  {
    id: "sf3",
    category: "安全守則",
    categoryId: "safety",
    zh: "外出時需事先取得家長同意，並告知去向與返回時間。",
    id_lang: "Keluar rumah harus mendapat izin orang tua terlebih dahulu, dan beritahu tujuan serta waktu kembali.",
  },
  // 溝通聯繫
  {
    id: "co1",
    category: "溝通聯繫",
    categoryId: "communication",
    zh: "有任何疑問或緊急狀況，立即透過此 app 或電話聯繫家長。",
    id_lang: "Jika ada pertanyaan atau keadaan darurat, segera hubungi orang tua melalui app ini atau telepon.",
  },
  {
    id: "co2",
    category: "溝通聯繫",
    categoryId: "communication",
    zh: "每天至少在日誌記錄一次孩子的狀況。",
    id_lang: "Catat kondisi anak di jurnal minimal sekali sehari.",
  },
  {
    id: "co3",
    category: "溝通聯繫",
    categoryId: "communication",
    zh: "家長的任何指示必須遵守並確認已收到。",
    id_lang: "Semua instruksi dari orang tua harus dipatuhi dan dikonfirmasi bahwa sudah diterima.",
  },
  // 飲食照護
  {
    id: "d1",
    category: "飲食照護",
    categoryId: "diet",
    zh: "依照醫師建議的飲食清單準備孩子的餐食，避免生食、辛辣、油膩食物。",
    id_lang: "Siapkan makanan anak sesuai daftar diet yang direkomendasikan dokter. Hindari makanan mentah, pedas, dan berminyak.",
  },
  {
    id: "d2",
    category: "飲食照護",
    categoryId: "diet",
    zh: "每天確保孩子攝取足夠的水分（至少 1000ml）。",
    id_lang: "Pastikan anak minum cukup air setiap hari (minimal 1000ml).",
  },
  {
    id: "d3",
    category: "飲食照護",
    categoryId: "diet",
    zh: "孩子若食慾不振，記錄於日誌並通知家長。",
    id_lang: "Jika anak tidak nafsu makan, catat di jurnal dan beri tahu orang tua.",
  },
];
