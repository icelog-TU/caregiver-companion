export interface VocabItem {
  id: string;
  zh: string;
  pinyin: string;
  id_lang: string;
  category: string;
  example?: { zh: string; id_lang: string };
}

export interface VocabCategory {
  id: string;
  zh: string;
  id_lang: string;
  icon: string;
}

export const vocabCategories: VocabCategory[] = [
  { id: "body", zh: "身體部位", id_lang: "Bagian Tubuh", icon: "🧍" },
  { id: "symptoms", zh: "症狀感受", id_lang: "Gejala & Perasaan", icon: "🤒" },
  { id: "medicine", zh: "藥品照護", id_lang: "Obat & Perawatan", icon: "💊" },
  { id: "daily", zh: "日常用語", id_lang: "Ungkapan Sehari-hari", icon: "💬" },
  { id: "food", zh: "飲食相關", id_lang: "Makanan & Minuman", icon: "🍱" },
  { id: "emergency", zh: "緊急用語", id_lang: "Ungkapan Darurat", icon: "🚨" },
];

export const vocabulary: VocabItem[] = [
  // 身體部位
  { id: "b1", zh: "頭", pinyin: "tóu", id_lang: "kepala", category: "body" },
  { id: "b2", zh: "肚子", pinyin: "dù zi", id_lang: "perut", category: "body" },
  { id: "b3", zh: "手", pinyin: "shǒu", id_lang: "tangan", category: "body" },
  { id: "b4", zh: "腳", pinyin: "jiǎo", id_lang: "kaki", category: "body" },
  { id: "b5", zh: "嘴巴", pinyin: "zuǐ bā", id_lang: "mulut", category: "body" },
  { id: "b6", zh: "眼睛", pinyin: "yǎn jīng", id_lang: "mata", category: "body" },
  { id: "b7", zh: "耳朵", pinyin: "ěr duǒ", id_lang: "telinga", category: "body" },
  { id: "b8", zh: "鼻子", pinyin: "bí zi", id_lang: "hidung", category: "body" },

  // 症狀感受
  { id: "sy1", zh: "痛", pinyin: "tòng", id_lang: "sakit / nyeri", category: "symptoms", example: { zh: "哪裡痛？", id_lang: "Di mana yang sakit?" } },
  { id: "sy2", zh: "發燒", pinyin: "fā shāo", id_lang: "demam", category: "symptoms" },
  { id: "sy3", zh: "想吐", pinyin: "xiǎng tù", id_lang: "mual / ingin muntah", category: "symptoms" },
  { id: "sy4", zh: "頭暈", pinyin: "tóu yūn", id_lang: "pusing", category: "symptoms" },
  { id: "sy5", zh: "累", pinyin: "lèi", id_lang: "lelah / capek", category: "symptoms" },
  { id: "sy6", zh: "不舒服", pinyin: "bù shū fú", id_lang: "tidak enak badan", category: "symptoms" },
  { id: "sy7", zh: "冷", pinyin: "lěng", id_lang: "dingin / kedinginan", category: "symptoms" },
  { id: "sy8", zh: "熱", pinyin: "rè", id_lang: "panas", category: "symptoms" },

  // 藥品照護
  { id: "m1", zh: "藥", pinyin: "yào", id_lang: "obat", category: "medicine" },
  { id: "m2", zh: "吃藥", pinyin: "chī yào", id_lang: "minum obat", category: "medicine", example: { zh: "吃藥的時間到了。", id_lang: "Sudah waktunya minum obat." } },
  { id: "m3", zh: "體溫", pinyin: "tǐ wēn", id_lang: "suhu tubuh", category: "medicine" },
  { id: "m4", zh: "量體溫", pinyin: "liáng tǐ wēn", id_lang: "ukur suhu tubuh", category: "medicine" },
  { id: "m5", zh: "溫度計", pinyin: "wēn dù jì", id_lang: "termometer", category: "medicine" },
  { id: "m6", zh: "打針", pinyin: "dǎ zhēn", id_lang: "suntik", category: "medicine" },
  { id: "m7", zh: "醫院", pinyin: "yī yuàn", id_lang: "rumah sakit", category: "medicine" },
  { id: "m8", zh: "護士", pinyin: "hù shi", id_lang: "perawat", category: "medicine" },

  // 日常用語
  { id: "d1", zh: "早安", pinyin: "zǎo ān", id_lang: "selamat pagi", category: "daily" },
  { id: "d2", zh: "謝謝", pinyin: "xiè xiè", id_lang: "terima kasih", category: "daily" },
  { id: "d3", zh: "好", pinyin: "hǎo", id_lang: "baik / oke", category: "daily" },
  { id: "d4", zh: "不好意思", pinyin: "bù hǎo yì si", id_lang: "permisi / maaf", category: "daily" },
  { id: "d5", zh: "請", pinyin: "qǐng", id_lang: "tolong / silakan", category: "daily" },
  { id: "d6", zh: "我不懂", pinyin: "wǒ bù dǒng", id_lang: "saya tidak mengerti", category: "daily" },
  { id: "d7", zh: "再說一次", pinyin: "zài shuō yī cì", id_lang: "tolong ulangi", category: "daily" },
  { id: "d8", zh: "等一下", pinyin: "děng yī xià", id_lang: "tunggu sebentar", category: "daily" },

  // 飲食相關
  { id: "f1", zh: "吃飯", pinyin: "chī fàn", id_lang: "makan", category: "food" },
  { id: "f2", zh: "喝水", pinyin: "hē shuǐ", id_lang: "minum air", category: "food" },
  { id: "f3", zh: "肚子餓", pinyin: "dù zi è", id_lang: "lapar", category: "food" },
  { id: "f4", zh: "不想吃", pinyin: "bù xiǎng chī", id_lang: "tidak mau makan", category: "food" },
  { id: "f5", zh: "好吃", pinyin: "hǎo chī", id_lang: "enak", category: "food" },
  { id: "f6", zh: "熱的", pinyin: "rè de", id_lang: "yang panas", category: "food" },
  { id: "f7", zh: "冷的", pinyin: "lěng de", id_lang: "yang dingin", category: "food" },

  // 緊急用語
  { id: "e1", zh: "幫忙", pinyin: "bāng máng", id_lang: "tolong!", category: "emergency" },
  { id: "e2", zh: "緊急", pinyin: "jǐn jí", id_lang: "darurat", category: "emergency" },
  { id: "e3", zh: "叫救護車", pinyin: "jiào jiù hù chē", id_lang: "panggil ambulans", category: "emergency" },
  { id: "e4", zh: "打電話給醫生", pinyin: "dǎ diàn huà gěi yī shēng", id_lang: "telepon dokter", category: "emergency" },
  { id: "e5", zh: "她不呼吸了", pinyin: "tā bù hū xī le", id_lang: "dia tidak bernafas", category: "emergency" },
  { id: "e6", zh: "快來", pinyin: "kuài lái", id_lang: "cepat kemari", category: "emergency" },
];
