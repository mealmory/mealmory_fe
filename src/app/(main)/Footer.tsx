"use client";

import Navigator from "@/components/main/Navigator";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="sm:hidden fixed bottom-0 left-0 w-full z-10 bg-white dark:bg-cusdark p-1">
      <Navigator
        pathname={pathname}
        navClass="w-full"
        middleClass=" flex"
        itemClass="flex-1 flex flex-col justify-center items-center text-xs"
        iconSize={28}
      />
    </footer>
  );
}
