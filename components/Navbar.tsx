"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首頁", subLabel: "Beranda", icon: "🏠" },
  { href: "/rules", label: "工作守則", subLabel: "Peraturan", icon: "📋" },
  { href: "/journal", label: "工作日誌", subLabel: "Jurnal", icon: "📓" },
  { href: "/chat", label: "溝通", subLabel: "Chat", icon: "💬" },
  { href: "/learn", label: "學中文", subLabel: "Belajar", icon: "📚" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b shadow-lg">
      <div className="max-w-2xl mx-auto flex justify-around md:justify-center md:gap-2 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-3 px-3 md:px-5 min-w-0 transition-colors ${
                isActive
                  ? "text-rose-600"
                  : "text-gray-500 hover:text-rose-500"
              }`}
            >
              <span className="text-2xl md:text-xl">{item.icon}</span>
              <span className="text-xs font-semibold mt-0.5 truncate">{item.label}</span>
              <span className="text-[10px] text-gray-400 truncate">{item.subLabel}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
