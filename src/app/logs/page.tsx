// app/logs/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { database, ref, onValue, remove } from '@/utils/firebase'; // Add `remove`

export default function LogsPage() {
  const [logs, setLogs] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    const logsRef = ref(database, 'logs');

    const unsubscribe = onValue(logsRef, (snapshot) => {
      const data = snapshot.val() || {};

      const logList = Object.entries(data)
        .filter((entry) => typeof entry[1] === 'string')
        .map(([key, value]) => ({ key, value: value as string }))
        .sort((a, b) => parseInt(b.key) - parseInt(a.key));

      setLogs(logList);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Function to delete all logs
  const handleDeleteLogs = async () => {
    if (!confirm('Are you sure you want to delete all logs?')) return;

    const logsRef = ref(database, 'logs');
    try {
      await remove(logsRef); // Removes the entire 'logs' node
      setLogs([]); // Clear local state
    } catch (error) {
      console.error('Failed to delete logs:', error);
      alert('Failed to delete logs.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-3xl font-bold mb-6">Logs</h1>

      {/* Delete Button */}
      <button
        onClick={handleDeleteLogs}
        className="mb-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Delete All Logs
      </button>

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