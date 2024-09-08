import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/ThemeProvider";
import KakaoScript from "./KakaoScript";
import { Suspense } from "react";
import RealViewHeightProvider from "./RealViewHeightProvider";

const jua = Jua({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--jua",
  display: "swap",
});

export const metadata: Metadata = {
  title: "밀모리",
  description: "식사의 추억",
  icons: {
    icon: "/mealmory_logo.svg",
  },
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
          " overscroll-none overflow-y-scroll min-h-rscreen w-screen max-w-[2560px] mx-auto relative"
        }
      >
        <ThemeProvider>
          <RealViewHeightProvider>
            <Suspense>
              {children}
              {modal}
            </Suspense>
          </RealViewHeightProvider>
        </ThemeProvider>
        <KakaoScript />
      </body>
    </html>
  );
}
