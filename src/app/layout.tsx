import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import KakaoScript from "./KakaoScript";
import { Suspense } from "react";

const jua = Jua({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--jua",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MealMory",
  description: "식사의 추억",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={
          jua.className +
          " overscroll-none overflow-y-scroll min-h-screen w-screen max-w-[2560px] mx-auto relative"
        }
      >
        <ThemeProvider>
          <Suspense>
            {children}
            {modal}
          </Suspense>
        </ThemeProvider>
        <KakaoScript />
      </body>
    </html>
  );
}
