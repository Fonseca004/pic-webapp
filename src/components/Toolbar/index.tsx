// Toolbar.tsx
export default function Toolbar() {
  return (
    <div className="sticky top-0 left-0 right-0 bg-sky-900 text-white shadow-md z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-center h-16">
        <h1 className="text-lg font-normal">
          <span className="font-bold">Smart</span>
          <span className="font-normal">Rack</span>
        </h1>
      </div>
    </div>
  );
}