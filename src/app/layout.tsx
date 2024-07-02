import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
          " overscroll-none overflow-y-scroll min-h-screen w-screen max-w-[2560px] mx-auto"
        }
      >
        {children}
      </body>
    </html>
  );
}
