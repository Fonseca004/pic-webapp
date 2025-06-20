// app/page.tsx
import Button from "@/components/Button";
import WeatherCardList from "@/components/WeatherCardList";
import StatusDisplay from "@/components/StatusDisplay";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full">

      {/* Fixed position cards, layered */}
      <div className="fixed bottom-[100px] left-0 right-0 z-20">
        <div className="flex justify-center mb-4">
          <WeatherCardList />
        </div>

        <div className="flex justify-center mb-4">
          <StatusDisplay />
        </div>

        <div className="flex justify-center">
          <Button />
        </div>
      </div>
    </div>
  );
}

