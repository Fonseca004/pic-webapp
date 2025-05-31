"use client";
import Image from "next/image";
import { Select } from "antd";
import { useRegion } from "@/components/context/RegionContext";

const { Option } = Select;

export default function Settings() {
  const { region, setRegion } = useRegion();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h1 className="text-3xl font-bold">SETTINGS</h1>

      <div className="w-48">
        {/* Label with Geist Sans font */}
        <p 
          className="font-semibold mb-2" 
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          Escolha a sua região:
        </p>

        <Select
          value={region}
          onChange={(value) => setRegion(value)}
          style={{ width: "100%" }}
          options={[
            { label: "Lisboa", value: "1110600" },
            { label: "Porto", value: "1010500" },
            { label: "Coimbra", value: "1030300" },
          ]}
        />
      </div>

      <p>Mudar email / password</p>
      <p>Conectar ao estendal - passkey ou qr code</p>
    </div>
  );
}
