"use client";
import Navigator from "@/components/main/Navigator";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HiDownload } from "@react-icons/all-files/hi/HiDownload";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [menuFlip, setMenuFlip] = useState(true);
  useEffect(() => {
    setMenuFlip(true);
  }, [pathname]);
  return (
    <header className="sm:h-screen h-max sm:w-40 w-full fixed top-0 left-0 bg-white dark:bg-cusdark z-10 flex flex-col sm:p-4 p-1 sm:shadow-border justify-center sm:justify-start gap-4">
      <div className="w-full self-center flex items-center gap-1 justify-between px-3 ">
        <div className="flex items-center gap-1 ">
          <Image
            src={"/mealmory_logo.svg"}
            alt="밀모리 로고"
            width={0}
            height={0}
            className="w-full h-auto"
            priority
          />
          <p>MealMory</p>
        </div>
        <button className="sm:hidden " onClick={() => setMenuFlip(false)}>
          <HiDownload size={30} className=" -rotate-90" />
        </button>
      </div>
      <Navigator
        pathname={pathname}
        navFlip={() => setMenuFlip(true)}
        navClass={
          "absolute flip-nav left-0 top-0 sm:relative sm:translate-x-0 sm:transition-none z-50 h-screen sm:bg-inherit sm:h-full w-full flex flex-col items-end sm:items-start " +
          (menuFlip ? "translate-x-full " : "bg-[rgba(0,0,0,0.35)]")
        }
        middleClass="flex flex-col bg-white dark:bg-cusdark gap-10 sm:gap-4 w-3/4 h-full sm:h-max sm:w-full p-4 sm:p-0 self-end"
        itemClass="flex gap-1 items-center sm:text-base text-2xl"
        navTransition={{
          transition: `transform 150ms ease-in-out ${
            !menuFlip ? "0s" : "200ms"
          }, background 200ms ease-in-out ${menuFlip ? "0s" : "200ms"}`,
        }}
      />
    </header>
  );
}
