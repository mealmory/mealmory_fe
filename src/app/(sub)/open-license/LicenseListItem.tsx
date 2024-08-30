"use client";

import { useState } from "react";

const LicenseListItem = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => {
  const [flip, setFlip] = useState(true);
  return (
    <li
      className={
        "rounded-xl shadow-border p-3 overflow-hidden transition-all " +
        (flip ? "h-[50px]" : "h-[450px]")
      }
    >
      <div
        className="w-full text-xl point-value flex items-center justify-between gap-2 mb-3 cursor-pointer"
        onClick={() => setFlip((prev) => !prev)}
      >
        <p>{name}</p>
        <p
          className={
            "text-cusorange font-bold " +
            (!flip ? "rotate-90 -translate-x-1/2" : "")
          }
        >
          &gt;
        </p>
      </div>
      <div className="h-[calc(100%-30px)] overflow-y-scroll scroll-visible flex flex-col gap-5">
        {children}
      </div>
    </li>
  );
};

export default LicenseListItem;
