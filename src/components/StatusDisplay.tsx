// components/StatusDisplay.tsx
"use client";

import { useEffect, useState } from "react";

// Firebase imports
import { database } from "@/utils/firebase";
import { ref, onValue } from "firebase/database";

export default function StatusDisplay() {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const dbRefOpen = ref(database, "open");

  // Load current state from Firebase
  useEffect(() => {
    const unsubscribe = onValue(dbRefOpen, (snapshot) => {
      const data = snapshot.val();
      setIsOpen(data);
    });

    return () => unsubscribe();
  }, []);

  if (isOpen === null) {
    return (
      <div className="max-w-[90%] w-full md:max-w-[600px] h-[60px] bg-white rounded-md shadow-md flex items-center justify-center mx-4">
        <span>Loading...</span>
      </div>
    );
  }

  let displayText = "Unknown";

  if (isOpen === true) {
    displayText = "Aberto";
  } else if (isOpen === false) {
    displayText = "Fechado";
  }

  return (
    <div className="max-w-[90%] w-full md:max-w-[600px] h-[60px] bg-white rounded-md shadow-md flex items-center justify-center mx-4">
      <p className="text-black text-lg md:text-xl">
        SmartRack: <span className="font-bold">{displayText}</span>
      </p>
    </div>
  );
}