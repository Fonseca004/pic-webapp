import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "@/styles/globals.css";
import Toolbar from "@/components/Toolbar"; 
import BottomNavbar from "@/components/BottomNavbar";
import { RegionProvider } from "@/components/context/RegionContext";
import 'antd/dist/reset.css';

// Load Bricolage Grotesque
const bricolage = Bricolage_Grotesque({
  weight: ['400', '600', '800'], // Optional: choose specific weights
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "SmartRack Web App",
  description: "SmartRack Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${bricolage.variable} antialiased bg-stone-200 text-black`}
      >
        <RegionProvider>
          <div className="min-h-screen flex flex-col">
            {/* Top Navbar */}
            <Toolbar />

            {/* Main Content */}
            <div className="flex-1">{children}</div>

            {/* Bottom Navbar */}
            <BottomNavbar />
          </div>
        </RegionProvider>
      </body>
    </html>
  );
}