"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return (
    <div
      className="fixed w-full h-full left-0 top-0 bg-black bg-opacity-35 sm:flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <div
        className="w-full h-full md:w-[360px] sm:h-[680px] overflow-hidden bg-white dark:bg-cusdark sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
