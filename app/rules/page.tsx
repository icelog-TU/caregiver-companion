"use client";

import { useState, useEffect } from "react";
import { categories } from "@/data/rules";
import { useAuth } from "@/lib/auth-context";
import {
  watchRules,
  addRule,
  updateRule,
  deleteRule,
  type FamilyRule,
} from "@/lib/family";

const emptyForm = { categoryId: categories[0].id, zh: "", id_lang: "" };

export default function RulesPage() {
  const { role } = useAuth();
  const isOwner = role === "owner";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [rules, setRules] = useState<FamilyRule[]>([]);
  const [editing, setEditing] = useState<FamilyRule | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    const unsub = watchRules(setRules);
    return unsub;
  }, []);

  const filteredRules =
    activeCategory === "all"
      ? rules
      : rules.filter((r) => r.categoryId === activeCategory);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(rule: FamilyRule) {
    setEditing(rule);
    setForm({ categoryId: rule.categoryId, zh: rule.zh, id_lang: rule.id_lang });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const category = categories.find((c) => c.id === form.categoryId)!;
    if (editing) {
      await updateRule(editing.id, {
        categoryId: form.categoryId,
        category: category.zh,
        zh: form.zh,
        id_lang: form.id_lang,
      });
    } else {
      await addRule({
        categoryId: form.categoryId,
        category: category.zh,
        zh: form.zh,
        id_lang: form.id_lang,
        order: rules.length,
      });
    }
    setShowForm(false);
  }

  async function handleDelete(id: string) {
    if (confirm("確定刪除這條守則？\nYakin ingin menghapus aturan ini?")) {
      await deleteRule(id);
    }
  }

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">📋 工作守則</h1>
          <p className="text-sm text-gray-500">Peraturan Kerja</p>
        </div>
        {isOwner && (
          <button
            onClick={openAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            + 新增守則
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4 scrollbar-hide">
        <button
          onClick={() => setActiveCategory("all")}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          全部 / Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.icon} {cat.zh}
          </button>
        ))}
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">{editing ? "編輯守則" : "新增守則"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">分類 / Kategori</label>
                <select
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.zh}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">中文</label>
                <textarea
                  required
                  value={form.zh}
                  onChange={(e) => setForm({ ...form, zh: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Indonesia</label>
                <textarea
                  required
                  value={form.id_lang}
                  onChange={(e) => setForm({ ...form, id_lang: e.target.value })}
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                儲存 / Simpan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Rules list */}
      <div className="space-y-3">
        {filteredRules.map((rule, idx) => (
          <div
            key={rule.id}
            className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="flex">
              {/* Number */}
              <div className="bg-gray-800 text-white w-10 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                {idx + 1}
              </div>
              <div className="flex-1">
                {/* Chinese */}
                <div className="bg-blue-50 px-4 py-3 border-b border-gray-100">
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">中文</span>
                  <p className="text-gray-800 text-sm mt-1 leading-relaxed">{rule.zh}</p>
                </div>
                {/* Indonesian */}
                <div className="bg-white px-4 py-3">
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">Indonesia</span>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">{rule.id_lang}</p>
                </div>
              </div>
              {isOwner && (
                <div className="flex flex-col justify-center gap-2 px-3 flex-shrink-0">
                  <button onClick={() => openEdit(rule)} className="text-blue-500 text-xs">編輯</button>
                  <button onClick={() => handleDelete(rule.id)} className="text-red-500 text-xs">刪除</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
