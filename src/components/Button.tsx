// Button.tsx
"use client";

import { useEffect, useState } from "react";
import { Sun, CloudDrizzle, Settings } from "lucide-react";

// Firebase imports
import { database } from "@/utils/firebase"; // Adjust path accordingly
import { ref, onValue, set } from "firebase/database";

export default function Button() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null); // null = loading
  const [isAuto, setIsAuto] = useState<boolean | null>(null);

  const dbRefOpen = ref(database, "open");
  const dbRefAuto = ref(database, "auto");

  // Load current state from Firebase
  useEffect(() => {
    const unsubscribeOpen = onValue(dbRefOpen, (snapshot) => {
      const data = snapshot.val();
      setIsOpen(data);
    });

    const unsubscribeAuto = onValue(dbRefAuto, (snapshot) => {
      const data = snapshot.val();
      setIsAuto(data);
    });

    return () => {
      unsubscribeOpen();
      unsubscribeAuto();
    };
  }, []);

  // Handle button click and update Firebase
const handleClick = (mode: "open" | "close" | "auto") => {
  if (mode === "auto") {
    set(dbRefAuto, true)
      .then(() => {
        // Optional: log event
        const timestamp = Date.now();
        set(ref(database, `logs/${timestamp}`), `SmartRack automatic mode enabled via webapp`);
      })
      .catch((error) => {
        console.error("Failed to update auto mode:", error);
      });
  } else {
    const newState = mode === "open";
    const action = newState ? "open" : "close";

    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to leave it permanently ${action}? This disables automatic operation.`
    );

    if (!confirmed) return;

    set(dbRefOpen, newState)
      .then(() => {
        set(dbRefAuto, false); // Turn off auto
        // Optional: log event
        const timestamp = Date.now();
        set(
          ref(database, `logs/${timestamp}`),
          `SmartRack ${newState ? "opened" : "closed"} via webapp`
        );
      })
      .catch((error) => {
        console.error("Failed to update LED state:", error);
      });
  }
};

  // Loading state
  if (isOpen === null || isAuto === null) {
    return (
      <div className="max-w-[90%] w-full md:max-w-[600px] h-[60px] bg-white rounded-md shadow-md flex items-center justify-center mx-4">
        <span>Loading...</span>
      </div>
    );
  }

  const isActiveOpen = !isAuto && isOpen === true;
  const isActiveClose = !isAuto && isOpen === false;
  const isActiveAuto = isAuto === true;

  return (
  <div className="max-w-[90%] w-full md:max-w-[600px] h-[60px] bg-white rounded-md shadow-md flex text-sm overflow-hidden mx-4">
    {/* Open Button */}
    <button
      type="button"
      onClick={() => handleClick("open")}
      className={`flex-1 flex items-center justify-center py-3 px-2 transition-colors ${
        isActiveOpen
          ? "text-white"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      <div className={`flex flex-col items-center justify-center px-8 py-1 rounded-md ${
        isActiveOpen
          ? "bg-blue-600"
          : "bg-transparent"
      }`}>
        <Sun size={20} strokeWidth={isActiveOpen ? 2.5 : 1.5} />
        <span className="text-xs mt-1">Open</span>
      </div>
    </button>

    {/* Auto Button */}
    <button
      type="button"
      onClick={() => handleClick("auto")}
      className={`flex-1 flex items-center justify-center py-3 px-2 transition-colors ${
        isActiveAuto
          ? "text-white"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      <div className={`flex flex-col items-center justify-center px-8 py-1 rounded-md ${
        isActiveAuto
          ? "bg-blue-600"
          : "bg-transparent"
      }`}>
        <Settings size={20} strokeWidth={isActiveAuto ? 2.5 : 1.5} />
        <span className="text-xs mt-1">Auto</span>
      </div>
    </button>

    {/* Close Button */}
    <button
      type="button"
      onClick={() => handleClick("close")}
      className={`flex-1 flex items-center justify-center py-3 px-2 transition-colors ${
        isActiveClose
          ? "text-white"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      <div className={`flex flex-col items-center justify-center px-8 py-1 rounded-md ${
        isActiveClose
          ? "bg-blue-600"
          : "bg-transparent"
      }`}>
        <CloudDrizzle size={20} strokeWidth={isActiveClose ? 2.5 : 1.5} />
        <span className="text-xs mt-1">Close</span>
      </div>
    </button>
  </div>
);
}