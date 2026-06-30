"use client";

import { useState, useEffect, useRef } from "react";
import { getMessages, saveMessage, generateId, type Message } from "@/lib/storage";

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sender, setSender] = useState<"parent" | "caregiver">("parent");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const msg: Message = {
      id: generateId(),
      sender,
      text: text.trim(),
      timestamp: new Date().toISOString(),
    };
    saveMessage(msg);
    setMessages(getMessages());
    setText("");
  }

  function formatTime(iso: string) {
    return new Date(iso).toLocaleString("zh-TW", {
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100 bg-white">
        <h1 className="text-xl font-bold text-gray-800">💬 溝通平台</h1>
        <p className="text-sm text-gray-500">Komunikasi</p>
      </div>

      {/* Sender toggle */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
        <p className="text-xs text-gray-500 mb-2">我是 / Saya adalah:</p>
        <div className="flex gap-2">
          <button
            onClick={() => setSender("parent")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              sender === "parent"
                ? "bg-purple-600 text-white"
                : "bg-white border border-gray-200 text-gray-600"
            }`}
          >
            👨‍👩‍👧 家長 (Orang Tua)
          </button>
          <button
            onClick={() => setSender("caregiver")}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              sender === "caregiver"
                ? "bg-teal-600 text-white"
                : "bg-white border border-gray-200 text-gray-600"
            }`}
          >
            👩‍⚕️ 看護 (Perawat)
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">💬</p>
            <p className="text-sm">尚無訊息</p>
            <p className="text-xs mt-1">Belum ada pesan</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isParent = msg.sender === "parent";
            return (
              <div
                key={msg.id}
                className={`flex ${isParent ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] ${isParent ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <span className="text-xs text-gray-400 px-1">
                    {isParent ? "👨‍👩‍👧 家長" : "👩‍⚕️ 看護"} · {formatTime(msg.timestamp)}
                  </span>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      isParent
                        ? "bg-purple-600 text-white rounded-tr-sm"
                        : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 items-end"
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend(e);
            }
          }}
          placeholder={sender === "parent" ? "輸入訊息..." : "Ketik pesan..."}
          rows={2}
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className={`px-4 py-2 rounded-xl text-white text-sm font-semibold transition-colors flex-shrink-0 ${
            sender === "parent" ? "bg-purple-600 hover:bg-purple-700" : "bg-teal-600 hover:bg-teal-700"
          } disabled:opacity-40`}
        >
          送出
        </button>
      </form>
    </div>
  );
}
