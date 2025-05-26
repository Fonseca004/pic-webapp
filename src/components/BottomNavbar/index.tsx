"use client";

import Link from "next/link";
import { Home, Settings } from "lucide-react"; // ← Changed: Replaced FileText with Settings
import { usePathname } from "next/navigation";

export default function BottomNavbar() {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isSettingsActive = pathname === "/settings"; 

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-blue-700 pb-safe z-10">
      <div className="container mx-auto flex h-navbar flex-row justify-around items-center px-4 py-2 text-white">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center flex-1 min-w-[100px] p-2 ${
            isHomeActive
              ? "font-bold text-white"
              : "font-medium text-white/80"
          }`}
        >
          <Home size={24} strokeWidth={isHomeActive ? 2.5 : 1.5} />
          <span className="text-xs mt-1">Home</span>
          <span
            className={`block mt-1 w-6 h-1 rounded-full transition-all duration-300 ${
              isHomeActive ? "bg-white" : "bg-transparent"
            }`}
          ></span>
        </Link>

        {/* Settings */}
        <Link
          href="/settings" // ← Changed: link from /logs to /settings
          className={`flex flex-col items-center justify-center flex-1 min-w-[100px] p-2 ${
            isSettingsActive
              ? "font-bold text-white"
              : "font-medium text-white/80"
          }`}
        >
          <Settings size={24} strokeWidth={isSettingsActive ? 2.5 : 1.5} />{" "}
          {/* ← Changed: FileText → Settings */}
          <span className="text-xs mt-1">Settings</span> 
          <span
            className={`block mt-1 w-6 h-1 rounded-full transition-all duration-300 ${
              isSettingsActive ? "bg-white" : "bg-transparent"
            }`}
          ></span>
        </Link>
      </div>
    </div>
  );
}