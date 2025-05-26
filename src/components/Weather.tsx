// components/Weather.tsx
"use client";

export default function Weather() {
  return (
    <div className="max-w-[90%] w-full md:max-w-[600px] bg-white rounded-md shadow-md mx-4 overflow-hidden">
      {/* Dynamic height with margin-top for toolbar */}
      <div 
        className="h-[calc(100vh_-_290px)] mt-8 flex items-center justify-center"
      >
        {/* Placeholder or future content */}
        <p className="text-gray-700 text-sm">Weather Content</p>
      </div>
    </div>
  );
}