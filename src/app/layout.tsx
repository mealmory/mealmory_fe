import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigator from "@/components/Navigator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MealMory",
  description: "식사의 추억",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={
          inter.className +
          " overscroll-none overflow-hidden sm:overflow-auto flex h-screen w-screen justify-between flex-col sm:flex-row max-w-[2560px] mx-auto"
        }
      >
        <Navigator />
        <main className="sm:h-full flex-1 w-full text-xl sm:text-base overflow-y-scroll">
          {children}
        </main>
      </body>
    </html>
  );
}
