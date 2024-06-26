import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
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
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "none";
  const showFlag =
    pathname === "/home" ||
    pathname === "/graph" ||
    pathname === "/profile" ||
    pathname === "/more";
  return (
    <html lang="ko">
      <body className={inter.className + " overscroll-none"}>
        <main className="flex h-screen w-screen justify-between flex-col sm:flex-row">
          {showFlag && <Navigator />}
          {children}
        </main>
      </body>
    </html>
  );
}
