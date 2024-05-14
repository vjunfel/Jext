import { Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Jext",
  description: "Twitter clone website using NextJS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="flex justify-between max-w-6xl mx-auto">
          <div className="hidden sm:inline border-r h-screen">
            <Sidebar />
          </div>
          <div>
            {children}
          </div>
          <div className="lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]">
            <div className="sticky top-0 bg-white py-2">
              <input type="text" placeholder="Search" className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2" />
            </div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
