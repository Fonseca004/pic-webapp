// app/logs/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { database, ref, onValue } from '@/utils/firebase';
import Image from "next/image";

export default function LogsPage() {
  const [logs, setLogs] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    const logsRef = ref(database, 'logs');

    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val() || {};
      
      // Convert object into array of { key, value }, and sort by timestamp (descending)
      const logList = Object.entries(data)
        .map(([key, value]) => ({ key, value }))
        .sort((a, b) => parseInt(b.key) - parseInt(a.key)); // newest first

      setLogs(logList);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-3xl font-bold mb-6">Logs</h1>
      <ul className="w-full max-w-2xl space-y-2">
        {logs.length === 0 && <p>No logs available.</p>}
        {logs.map((log) => {
          const date = new Date(parseInt(log.key));
          const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          });

          return (
            <li
              key={log.key}
              className="bg-gray-100 p-4 rounded-md shadow-sm text-sm"
            >
              <strong>{formattedDate}</strong> — {log.value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}