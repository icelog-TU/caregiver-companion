"use client";

import { useState } from "react";
import { vocabulary, vocabCategories, type VocabItem } from "@/data/vocabulary";

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<"list" | "flashcard">("list");
  const [cardIndex, setCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  const filtered =
    activeCategory === "all"
      ? vocabulary
      : vocabulary.filter((v) => v.category === activeCategory);

  function toggleFlip(id: string) {
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function nextCard() {
    setCardIndex((i) => (i + 1) % filtered.length);
    setCardFlipped(false);
  }

  function prevCard() {
    setCardIndex((i) => (i - 1 + filtered.length) % filtered.length);
    setCardFlipped(false);
  }

  const currentCard = filtered[cardIndex] as VocabItem | undefined;

  return (
    <div className="px-4 py-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">📚 學中文</h1>
        <p className="text-sm text-gray-500">Belajar Bahasa Mandarin</p>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setMode("list")}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === "list" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          📋 詞彙列表 / Daftar Kata
        </button>
        <button
          onClick={() => { setMode("flashcard"); setCardIndex(0); setCardFlipped(false); }}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === "flashcard" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          🃏 閃卡練習 / Kartu Belajar
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-4 px-4">
        <button
          onClick={() => { setActiveCategory("all"); setCardIndex(0); setCardFlipped(false); }}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "all" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"
          }`}
        >
          全部 / Semua
        </button>
        {vocabCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); setCardIndex(0); setCardFlipped(false); }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat.id ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {cat.icon} {cat.zh}
          </button>
        ))}
      </div>

      {/* Flashcard mode */}
      {mode === "flashcard" && currentCard && (
        <div className="flex flex-col items-center">
          <p className="text-xs text-gray-400 mb-4">
            {cardIndex + 1} / {filtered.length}
          </p>
          <div
            className="w-full max-w-sm h-52 cursor-pointer select-none"
            onClick={() => setCardFlipped((f) => !f)}
          >
            <div
              className={`relative w-full h-full transition-all duration-300 ${
                cardFlipped ? "" : ""
              }`}
            >
              {!cardFlipped ? (
                <div className="absolute inset-0 bg-amber-400 rounded-3xl flex flex-col items-center justify-center shadow-lg p-6">
                  <p className="text-5xl font-bold text-white mb-2">{currentCard.zh}</p>
                  <p className="text-lg text-amber-100">{currentCard.pinyin}</p>
                  <p className="text-xs text-amber-200 mt-4">點擊翻面 / Tap untuk balik</p>
                </div>
              ) : (
                <div className="absolute inset-0 bg-white border-2 border-amber-300 rounded-3xl flex flex-col items-center justify-center shadow-lg p-6">
                  <p className="text-3xl font-bold text-gray-800 mb-2">{currentCard.id_lang}</p>
                  {currentCard.example && (
                    <div className="mt-3 text-center border-t border-gray-100 pt-3 w-full">
                      <p className="text-sm text-gray-700">{currentCard.example.zh}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{currentCard.example.id_lang}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={prevCard}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              ← 上一個
            </button>
            <button
              onClick={nextCard}
              className="px-6 py-3 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors"
            >
              下一個 →
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-3">點擊卡片翻面 / Tap kartu untuk balik</p>
        </div>
      )}

      {/* List mode */}
      {mode === "list" && (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isFlipped = flipped.has(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleFlip(item.id)}
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-95 transition-transform"
              >
                <div className="flex">
                  {/* Chinese side */}
                  <div className="bg-amber-400 text-white px-4 py-4 flex flex-col items-center justify-center w-28 flex-shrink-0">
                    <p className="text-2xl font-bold">{item.zh}</p>
                    <p className="text-xs text-amber-100 mt-1">{item.pinyin}</p>
                  </div>
                  {/* Indonesian side */}
                  <div className="flex-1 px-4 py-4 bg-white flex flex-col justify-center">
                    <p className="text-base font-semibold text-gray-800">{item.id_lang}</p>
                    {isFlipped && item.example && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <p className="text-sm text-blue-700">{item.example.zh}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.example.id_lang}</p>
                      </div>
                    )}
                    {item.example && !isFlipped && (
                      <p className="text-xs text-gray-400 mt-1">點擊查看例句 / Tap lihat contoh</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
