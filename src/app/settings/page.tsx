"use client";
import { Select } from "antd";
import { useRegion } from "@/components/context/RegionContext";

const { Option } = Select;

export default function Settings() {
  const { region, setRegion } = useRegion();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Styled Container with label + select */}
      <div className="w-80 md:w-96">
        <div className="bg-white rounded-md shadow-md overflow-hidden border">
          <div className="p-4 flex flex-col gap-2">
            {/* Label inside the box */}
            <label
              htmlFor="region-select"
              className="text-sm font-semibold text-gray-700"
              style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            >
              Escolha a sua região:
            </label>

            {/* Ant Design Select */}
            <Select
              id="region-select"
              value={region}
              onChange={(value) => setRegion(value)}
              options={[
                { label: "Lisboa", value: "1110600" },
                { label: "Porto", value: "1010500" },
                { label: "Coimbra", value: "1030300" },
              ]}
              className="w-full"
              classNames={{
                popup: {
                  root: 'rounded-md shadow-md'
                }
              }}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        {/* Footnote Below Card */}
        <p className="text-xs text-gray-400 text-center mt-3">
          Informação meteorológica fornecida pelo IPMA.
        </p>
      </div>

      {/* Other settings (commented out for now) */}
      {/*<p>Mudar email / password</p>
      <p>Conectar ao estendal - passkey ou qr code</p>*/}
    </div>
  );
}