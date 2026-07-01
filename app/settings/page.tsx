"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getCodes, regenerateCodes } from "@/lib/family";

export default function SettingsPage() {
  const { role, loading } = useAuth();
  const [caregiverCode, setCaregiverCode] = useState<string | undefined>();
  const [familyCode, setFamilyCode] = useState<string | undefined>();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (role === "owner") {
      getCodes().then(({ caregiverCode, familyCode }) => {
        setCaregiverCode(caregiverCode);
        setFamilyCode(familyCode);
      });
    }
  }, [role]);

  async function handleGenerate() {
    setBusy(true);
    try {
      const codes = await regenerateCodes();
      setCaregiverCode(codes.caregiverCode);
      setFamilyCode(codes.familyCode);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return null;

  if (role !== "owner") {
    return (
      <div className="px-4 py-16 text-center text-gray-400">
        <p className="text-4xl mb-3">🔒</p>
        <p className="text-sm">只有家長可以查看此頁面</p>
        <p className="text-xs mt-1">Hanya orang tua yang bisa melihat halaman ini</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">⚙️ 設定</h1>
        <p className="text-sm text-gray-500">Pengaturan</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-4">
        <p className="text-sm font-semibold text-blue-700 mb-1">👩‍⚕️ 看護加入代碼 / Kode Undangan Perawat</p>
        <p className="text-3xl font-bold tracking-widest text-blue-900 text-center py-3">
          {caregiverCode ?? "尚未產生"}
        </p>
        <p className="text-xs text-blue-500">看護輸入此代碼可以寫工作日誌、查看守則、使用留言板</p>
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6">
        <p className="text-sm font-semibold text-amber-700 mb-1">🏠 家人加入代碼 / Kode Undangan Keluarga</p>
        <p className="text-3xl font-bold tracking-widest text-amber-900 text-center py-3">
          {familyCode ?? "尚未產生"}
        </p>
        <p className="text-xs text-amber-500">家人輸入此代碼可以查看守則、日誌並使用留言板，但不能寫日誌或編輯守則</p>
      </div>

      <button
        onClick={handleGenerate}
        disabled={busy}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50"
      >
        {busy ? "產生中..." : caregiverCode ? "重新產生代碼（舊代碼會失效）" : "產生加入代碼"}
      </button>
    </div>
  );
}
