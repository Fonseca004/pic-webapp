// Button.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sun, CloudDrizzle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// Firebase imports
import { database } from "@/utils/firebase"; // Adjust path accordingly
import { ref, onValue, set } from "firebase/database";

export default function Button() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean | null>(null); // null = loading
  const [loading, setLoading] = useState(true);

  const dbRef = ref(database, "open");

  // Load current state from Firebase
  useEffect(() => {
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setIsOpen(data);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Handle button click and update Firebase
  const handleClick = (newState: boolean) => {
    set(dbRef, newState)
      .then(() => {
        // Optional: log event to /logs
        const timestamp = Date.now();
        set(ref(database, `logs/${timestamp}`), `SmartRack ${newState ? 'opened' : 'closed'} via webapp`);
      })
      .catch((error) => {
        console.error("Failed to update LED state:", error);
      });
  };

  // Simulate active route based on button action
  const isActiveOpen = isOpen === true;
  const isActiveClose = isOpen === false;

  return (
    <div className="max-w-[90%] w-full md:max-w-[600px] h-[60px] bg-white rounded-md shadow-md flex flex-col text-sm overflow-hidden mx-4">
      {/* Bottom Button Bar */}
      <div className="flex divide-x border-t flex-1">
        <button
          type="button"
          onClick={() => handleClick(true)}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 text-center ${
            isActiveOpen ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Sun size={20} strokeWidth={isActiveOpen ? 2.5 : 1.5} />
          <span className="text-xs mt-1">Open</span>
        </button>

        <button
          type="button"
          onClick={() => handleClick(false)}
          className={`flex-1 flex flex-col items-center justify-center py-3 px-2 text-center ${
            isActiveClose ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <CloudDrizzle size={20} strokeWidth={isActiveClose ? 2.5 : 1.5} />
          <span className="text-xs mt-1">Close</span>
        </button>
      </div>
    </div>
  );
}