import { ReactNode } from "react";
import SubHeader from "./SubHeader";

export default function SubLayout({
  children,
  modal,
}: {
  children: Readonly<ReactNode>;
  modal: Readonly<ReactNode>;
}) {
  return (
    <div className="w-full min-h-screen relative max-w-[1200px] mx-auto pt-[55px]">
      <SubHeader />
      {children}
      {modal}
    </div>
  );
}
