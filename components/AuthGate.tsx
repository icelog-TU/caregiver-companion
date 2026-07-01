"use client";

import { useState, type FormEvent } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  type AuthError,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { bootstrapOwner, joinWithCode } from "@/lib/family";
import { useAuth } from "@/lib/auth-context";
import Navbar from "./Navbar";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, role, loading, refreshRole } = useAuth();
  const [mode, setMode] = useState<"choose" | "owner" | "join">("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-sm">
        載入中... / Memuat...
      </div>
    );
  }

  if (user && role) {
    return (
      <>
        {children}
        <Navbar />
      </>
    );
  }

  async function handleOwnerSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        const code = (err as AuthError).code;
        if (code === "auth/user-not-found" || code === "auth/invalid-credential") {
          await createUserWithEmailAndPassword(auth, email, password);
        } else {
          throw err;
        }
      }
      if (auth.currentUser) {
        await bootstrapOwner(auth.currentUser.uid);
        await refreshRole();
      }
    } catch (err) {
      const code = (err as AuthError).code ?? "unknown";
      setError(`登入失敗 (${code})，請確認 Email/密碼 / Login gagal, periksa email/kata sandi`);
      console.error(err);
    } finally {
      setBusy(false);
    }
  }

  async function handleJoinSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }
      const uid = auth.currentUser!.uid;
      await joinWithCode(uid, code.trim().toUpperCase());
      await refreshRole();
    } catch (err) {
      const code = (err as AuthError).code ?? "unknown";
      setError(`代碼錯誤 (${code})，請確認後再試一次 / Kode salah, coba lagi`);
      console.error(err);
    } finally {
      setBusy(false);
    }
  }

  async function handleBack() {
    setError("");
    setEmail("");
    setPassword("");
    setCode("");
    if (auth.currentUser) {
      await signOut(auth);
    }
    setMode("choose");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌸</div>
          <h1 className="text-2xl font-bold text-gray-800">照護助手</h1>
          <p className="text-gray-500 text-sm mt-1">Asisten Perawat</p>
        </div>

        {mode === "choose" && (
          <div className="space-y-3">
            <button
              onClick={() => setMode("owner")}
              className="w-full bg-rose-600 text-white py-4 rounded-2xl font-semibold hover:bg-rose-700 transition-colors"
            >
              👨‍👩‍👧 我是家長 / Saya Orang Tua
            </button>
            <button
              onClick={() => setMode("join")}
              className="w-full bg-teal-600 text-white py-4 rounded-2xl font-semibold hover:bg-teal-700 transition-colors"
            >
              👩‍⚕️ 我是看護或家人 / Saya Perawat atau Keluarga
            </button>
          </div>
        )}

        {mode === "owner" && (
          <form onSubmit={handleOwnerSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">密碼 / Kata Sandi</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              <p className="text-xs text-gray-400 mt-1">第一次登入會自動建立你的帳號 / Pertama kali login akan membuat akun otomatis</p>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-rose-600 text-white py-3 rounded-xl font-semibold hover:bg-rose-700 transition-colors disabled:opacity-50"
            >
              {busy ? "處理中..." : "登入 / Masuk"}
            </button>
            <button type="button" onClick={handleBack} className="w-full text-gray-400 text-sm py-1">
              ← 返回 / Kembali
            </button>
          </form>
        )}

        {mode === "join" && (
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                加入代碼 / Kode Undangan
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="例如 ABC123"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm uppercase tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <p className="text-xs text-gray-400 mt-1">向家長索取你的加入代碼 / Minta kode undangan dari orang tua</p>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="w-full bg-teal-600 text-white py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50"
            >
              {busy ? "處理中..." : "加入 / Gabung"}
            </button>
            <button type="button" onClick={handleBack} className="w-full text-gray-400 text-sm py-1">
              ← 返回 / Kembali
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
