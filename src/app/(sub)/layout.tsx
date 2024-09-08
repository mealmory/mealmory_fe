import { ReactNode } from "react";
import SubHeader from "./SubHeader";

export default function SubLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <div className="w-full min-h-rscreen relative max-w-[1200px] mx-auto pt-[55px]">
      <SubHeader />
      <main className="min-h-[calc((var(--vh)*100)-55px)]">{children}</main>
    </div>
  );
}
