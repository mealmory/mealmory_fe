import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={
          jua.className +
          " overscroll-none overflow-y-scroll min-h-screen w-screen max-w-[2560px] mx-auto"
        }
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
