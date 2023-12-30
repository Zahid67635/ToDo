import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import QueryWrapper from "./components/QueryWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryWrapper>
          <div className="flex max-w-screen-2xl px-24 mx-auto">
            <div className="w-1/3 bg-slate-50 pt-10 px-3 min-h-screen">
              <Sidebar />
            </div>
            <div className="w-full">
              <Header links={[]} />
              <div className="p-10">{children}</div>
            </div>
          </div>
        </QueryWrapper>
      </body>
    </html>
  );
}
