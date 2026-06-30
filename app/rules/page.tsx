"use client";

import { useState } from "react";
import { categories, rules } from "@/data/rules";

export default function RulesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredRules =
    activeCategory === "all"
      ? rules
      : rules.filter((r) => r.categoryId === activeCategory);

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">📋 工作守則</h1>
        <p className="text-sm text-gray-500">Peraturan Kerja</p>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
