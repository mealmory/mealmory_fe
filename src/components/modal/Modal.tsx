"use client";

import { BsX } from "@react-icons/all-files/bs/BsX";
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
        className="w-full h-full md:w-4/5 md:min-w-[768px] sm:h-max overflow-y-scroll bg-white dark:bg-cusdark sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2 w-full flex justify-end pr-2">
          <button className="p-1" onClick={() => router.back()}>
            <BsX size={25} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
