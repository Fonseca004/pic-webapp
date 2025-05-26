// Button.tsx
"use client";

import Link from "next/link";
import { Sun, CloudDrizzle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Button() {
  const pathname = usePathname();

  const isActiveOpen = pathname === "/open";     // Adjust routes as needed
  const isActiveClose = pathname === "/close";   // Adjust routes as needed

  return (
    <div className="max-w-[90%] w-full md:max-w-[600px] h-[60px] bg-white rounded-md shadow-md flex flex-col text-sm overflow-hidden mx-4">
      {/* Bottom Button Bar */}
      <div className="flex divide-x border-t flex-1">
        <Link
          href="/open"
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 text-center ${
            isActiveOpen ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Sun size={20} strokeWidth={isActiveOpen ? 2.5 : 1.5} />
          <span className="text-xs mt-1">Open</span>
        </Link>

        <Link
          href="/close"
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 text-center ${
            isActiveClose ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <CloudDrizzle size={20} strokeWidth={isActiveClose ? 2.5 : 1.5} />
          <span className="text-xs mt-1">Close</span>
        </Link>
      </div>
    </div>
  );
}