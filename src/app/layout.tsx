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
          " overscroll-none overflow-y-scroll w-screen max-w-[2560px] mx-auto relative sm:pl-40 sm:pt-0 pt-10"
        }
      >
        <Navigator />
        <main className="h-full sm:min-h-screen w-full text-xl sm:text-base">
          {children}
        </main>
      </body>
    </html>
  );
}
