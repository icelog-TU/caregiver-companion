"use client";

import { useState, useEffect } from "react";
import {
  getJournalEntries,
  saveJournalEntry,
  deleteJournalEntry,
  generateId,
  type JournalEntry,
} from "@/lib/storage";

const moodOptions = [
  { value: "good", zh: "很好", id_lang: "Baik", emoji: "😊" },
  { value: "okay", zh: "普通", id_lang: "Biasa", emoji: "😐" },
  { value: "poor", zh: "不好", id_lang: "Kurang", emoji: "😔" },
] as const;

const appetiteOptions = [
  { value: "good", zh: "胃口好", id_lang: "Nafsu makan baik", emoji: "🍽️" },
  { value: "okay", zh: "普通", id_lang: "Biasa", emoji: "🥄" },
  { value: "poor", zh: "沒食慾", id_lang: "Tidak nafsu makan", emoji: "😶" },
] as const;

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("zh-TW", { year: "numeric", month: "long", day: "numeric", weekday: "short" });
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<JournalEntry, "id" | "createdAt">>({
    date: today(),
    temperature: "",
    mood: "good",
    appetite: "good",
    medication: "",
    activities: "",
    notes: "",
  });

  useEffect(() => {
    setEntries(getJournalEntries());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const entry: JournalEntry = {
      ...form,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    saveJournalEntry(entry);
    setEntries(getJournalEntries());
    setShowForm(false);
    setForm({ date: today(), temperature: "", mood: "good", appetite: "good", medication: "", activities: "", notes: "" });
  }

  function handleDelete(id: string) {
    if (confirm("確定刪除這筆記錄？\nYakin ingin menghapus catatan ini?")) {
      deleteJournalEntry(id);
      setEntries(getJournalEntries());
    }
  }

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">📓 工作日誌</h1>
          <p className="text-sm text-gray-500">Jurnal Kerja</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-700 transition-colors"
        >
          + 新增記錄
        </button>
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

              {/* Temperature */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  體溫 <span className="text-gray-400 font-normal">/ Suhu Tubuh (°C)</span>
                </label>
                <input
                  type="text"
                  placeholder="例如 36.8 / contoh 36.8"
                  value={form.temperature}
                  onChange={(e) => setForm({ ...form, temperature: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              {/* Mood */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  精神狀態 <span className="text-gray-400 font-normal">/ Kondisi Mental</span>
                </label>
                <div className="flex gap-2">
                  {moodOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, mood: opt.value })}
                      className={`flex-1 py-2 rounded-xl border text-sm transition-colors ${
                        form.mood === opt.value
                          ? "bg-green-600 text-white border-green-600"
                          : "border-gray-200 text-gray-600 hover:border-green-400"
                      }`}
                    >
                      {opt.emoji} {opt.zh}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appetite */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  食慾 <span className="text-gray-400 font-normal">/ Nafsu Makan</span>
                </label>
                <div className="flex gap-2">
                  {appetiteOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setForm({ ...form, appetite: opt.value })}
                      className={`flex-1 py-2 rounded-xl border text-sm transition-colors ${
                        form.appetite === opt.value
                          ? "bg-green-600 text-white border-green-600"
                          : "border-gray-200 text-gray-600 hover:border-green-400"
                      }`}
                    >
                      {opt.emoji} {opt.zh}
                    </button>
                  ))}
                </div>
              </div>

              {/* Medication */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  用藥記錄 <span className="text-gray-400 font-normal">/ Catatan Obat</span>
                </label>
                <textarea
                  placeholder="藥名、時間、劑量... / Nama obat, waktu, dosis..."
                  value={form.medication}
                  onChange={(e) => setForm({ ...form, medication: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
              </div>

              {/* Activities */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  今日活動 <span className="text-gray-400 font-normal">/ Aktivitas Hari Ini</span>
                </label>
                <textarea
                  placeholder="今天做了什麼... / Aktivitas yang dilakukan..."
                  value={form.activities}
                  onChange={(e) => setForm({ ...form, activities: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                />
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
            const mood = moodOptions.find((m) => m.value === entry.mood)!;
            const appetite = appetiteOptions.find((a) => a.value === entry.appetite)!;
            return (
              <div key={entry.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">{formatDate(entry.date)}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="text-green-200 hover:text-white text-xs"
                  >
                    刪除
                  </button>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex gap-4">
                    {entry.temperature && (
                      <div className="flex items-center gap-1.5 bg-orange-50 rounded-lg px-3 py-1.5">
                        <span>🌡️</span>
                        <span className="text-sm font-semibold text-orange-700">{entry.temperature}°C</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 bg-blue-50 rounded-lg px-3 py-1.5">
                      <span>{mood.emoji}</span>
                      <span className="text-sm text-blue-700">{mood.zh}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-purple-50 rounded-lg px-3 py-1.5">
                      <span>{appetite.emoji}</span>
                      <span className="text-sm text-purple-700">{appetite.zh}</span>
                    </div>
                  </div>
                  {entry.medication && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">用藥</p>
                      <p className="text-sm text-gray-700 mt-0.5">{entry.medication}</p>
                    </div>
                  )}
                  {entry.activities && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">活動</p>
                      <p className="text-sm text-gray-700 mt-0.5">{entry.activities}</p>
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
