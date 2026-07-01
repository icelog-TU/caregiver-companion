"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  watchJournal,
  addJournalEntry,
  deleteJournalEntry,
  type FamilyJournalEntry,
} from "@/lib/family";

const choreOptions = [
  { key: "kitchenClean", zh: "廚房清潔", id_lang: "Bersihkan dapur", emoji: "🍳" },
  { key: "livingRoomClean", zh: "客廳/餐廳整理", id_lang: "Rapikan ruang tamu/makan", emoji: "🛋️" },
  { key: "linlinBathroomClean", zh: "琳琳的浴室清潔", id_lang: "Bersihkan kamar mandi Linlin", emoji: "🛁" },
  { key: "ownBathroomClean", zh: "自己的浴室清潔", id_lang: "Bersihkan kamar mandi sendiri", emoji: "🚿" },
] as const;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric", weekday: "short" });
}

const emptyForm: Omit<FamilyJournalEntry, "id" | "createdAt" | "createdByUid"> = {
  date: today(),
  lunch: "",
  dinner: "",
  play: "",
  kitchenClean: false,
  livingRoomClean: false,
  linlinBathroomClean: false,
  ownBathroomClean: false,
  notes: "",
};

export default function JournalPage() {
  const { user, role } = useAuth();
  const canWrite = role === "owner" || role === "caregiver";
  const [entries, setEntries] = useState<FamilyJournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const unsub = watchJournal(setEntries);
    return unsub;
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    await addJournalEntry({ ...form, createdByUid: user.uid });
    setShowForm(false);
    setForm(emptyForm);
  }

  async function handleDelete(id: string) {
    if (confirm("確定刪除這筆記錄？\nYakin ingin menghapus catatan ini?")) {
      await deleteJournalEntry(id);
    }
  }

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">📓 工作日誌</h1>
          <p className="text-sm text-gray-500">Jurnal Kerja</p>
        </div>
        {canWrite && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            + 新增記錄
          </button>
        )}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-800">新增日誌記錄</h2>
                <p className="text-xs text-gray-500">Tambah Catatan Jurnal</p>
              </div>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  日期 <span className="text-gray-400 font-normal">/ Tanggal</span>
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>

              {/* Lunch */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  🍱 午餐 <span className="text-gray-400 font-normal">/ Makan Siang</span>
                </label>
                <textarea
                  placeholder="今天煮了什麼給琳琳吃... / Apa yang dimasak untuk Linlin..."
                  value={form.lunch}
                  onChange={(e) => setForm({ ...form, lunch: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>

              {/* Dinner */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  🍱 晚餐 <span className="text-gray-400 font-normal">/ Makan Malam</span>
                </label>
                <textarea
                  placeholder="今天煮了什麼給琳琳吃... / Apa yang dimasak untuk Linlin..."
                  value={form.dinner}
                  onChange={(e) => setForm({ ...form, dinner: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>

              {/* Play */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  🎈 陪玩 <span className="text-gray-400 font-normal">/ Bermain Bersama</span>
                </label>
                <textarea
                  placeholder="今天陪琳琳做了什麼活動... / Aktivitas bermain hari ini..."
                  value={form.play}
                  onChange={(e) => setForm({ ...form, play: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>

              {/* Chores */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🧹 環境維持 <span className="text-gray-400 font-normal">/ Kebersihan Lingkungan</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {choreOptions.map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setForm({ ...form, [opt.key]: !form[opt.key] })}
                      className={`flex items-center gap-2 py-2 px-3 rounded-xl border text-sm transition-colors text-left ${
                        form[opt.key]
                          ? "bg-green-600 text-white border-green-600"
                          : "border-gray-200 text-gray-600 hover:border-green-400"
                      }`}
                    >
                      <span>{form[opt.key] ? "✅" : opt.emoji}</span>
                      <span className="leading-tight">
                        <span className="block">{opt.zh}</span>
                        <span className={`block text-xs ${form[opt.key] ? "text-green-100" : "text-gray-400"}`}>
                          {opt.id_lang}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  備註 <span className="text-gray-400 font-normal">/ Catatan Tambahan</span>
                </label>
                <textarea
                  placeholder="其他需要記錄的事項... / Hal lain yang perlu dicatat..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                儲存記錄 / Simpan Catatan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-sm">尚無日誌記錄</p>
          <p className="text-xs mt-1">Belum ada catatan jurnal</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => {
            const doneChores = choreOptions.filter((opt) => entry[opt.key]);
            return (
              <div key={entry.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{formatDate(entry.date)}</p>
                  </div>
                  {canWrite && (
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-green-200 hover:text-white text-xs"
                    >
                      刪除
                    </button>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  {entry.lunch && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">🍱 午餐</p>
                      <p className="text-sm text-gray-700 mt-0.5">{entry.lunch}</p>
                    </div>
                  )}
                  {entry.dinner && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">🍱 晚餐</p>
                      <p className="text-sm text-gray-700 mt-0.5">{entry.dinner}</p>
                    </div>
                  )}
                  {entry.play && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">🎈 陪玩</p>
                      <p className="text-sm text-gray-700 mt-0.5">{entry.play}</p>
                    </div>
                  )}
                  {doneChores.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {doneChores.map((opt) => (
                        <span
                          key={opt.key}
                          className="flex items-center gap-1 bg-green-50 text-green-700 rounded-lg px-2.5 py-1 text-xs"
                        >
                          ✅ {opt.zh}
                        </span>
                      ))}
                    </div>
                  )}
                  {entry.notes && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">備註</p>
                      <p className="text-sm text-gray-700 mt-0.5">{entry.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
