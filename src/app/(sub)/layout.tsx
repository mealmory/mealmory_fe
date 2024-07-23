import { ReactNode } from "react";
import SubHeader from "./SubHeader";

export default function SubLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="w-full min-h-screen relative max-w-[1200px] mx-auto pt-[55px]">
      <SubHeader />
      {children}
    </div>
  );
}
