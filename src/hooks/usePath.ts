"use client";

import { usePathname } from "next/navigation";

const usePath = () => {
  const pathname = usePathname();
  const isShow =
    pathname === "/home" ||
    pathname === "/statistics" ||
    pathname === "/profile" ||
    pathname === "/more";
  return { pathname, isShow };
};

export default usePath;
