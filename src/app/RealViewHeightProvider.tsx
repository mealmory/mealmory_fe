"use client";

import { useEffect } from "react";
import { setViewHeight } from "./(main)/util";

export default function RealViewHeightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setViewHeight();
    window.addEventListener("resize", setViewHeight);
    return () => window.removeEventListener("resize", setViewHeight);
  }, []);
  return <>{children}</>;
}
