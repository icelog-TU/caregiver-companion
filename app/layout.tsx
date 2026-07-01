import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import AuthGate from "@/components/AuthGate";

export const metadata: Metadata = {
  title: "照護助手 | Asisten Perawat",
  description: "照護工作守則、日誌與溝通平台 | Panduan kerja, jurnal, dan komunikasi perawat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="bg-rose-50 min-h-screen antialiased">
        <div className="max-w-2xl mx-auto min-h-screen bg-white shadow-sm">
          <main className="pb-24 md:pb-8 md:pt-16">
            <AuthProvider>
              <AuthGate>{children}</AuthGate>
            </AuthProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
