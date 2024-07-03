"use client";

import { usePathname } from "next/navigation";

const usePath = () => {
  const pathname = usePathname();
  const isShow =
    pathname === "/main" ||
    pathname === "/main/graph" ||
    pathname === "/main/profile" ||
    pathname === "/main/more";
  return { pathname, isShow };
};

export default usePath;
