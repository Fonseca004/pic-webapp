
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Toolbar from "@/components/Toolbar"; 
import BottomNavbar from "@/components/BottomNavbar";
import { RegionProvider } from "@/components/context/RegionContext";
import 'antd/dist/reset.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RegionProvider>
          <div className="min-h-screen flex flex-col bg-stone-200 text-black">
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
