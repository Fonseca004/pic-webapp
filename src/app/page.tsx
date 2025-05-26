// app/page.tsx
import Button from "@/components/Button";
import Weather from "@/components/Weather";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">

      {/* Fixed position cards, layered */}
      <div className="fixed bottom-[100px] left-0 right-0 z-20">
        <div className="flex justify-center mb-4">
          <Weather />
        </div>
        <div className="flex justify-center">
          <Button />
        </div>
      </div>
    </div>
  );
}