"use client";

import { ReactNode, useState } from "react";

import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";

const FlipItem = ({
  title,
  last,
  first,
  children,
}: {
  title: string;
  last?: boolean;
  first?: boolean;
  children: Readonly<ReactNode>;
}) => {
  const [flip, setFlip] = useState(first ? false : true);

  return (
    <div>
      <label className={"w-full flex items-center justify-between p-4 "}>
        <p className="pl-2 font-semibold">{title}</p>
        <input
          type="checkbox"
          className="hidden"
          checked={flip}
          onChange={() => setFlip((prev) => !prev)}
        />
        <HiChevronRight className={!flip ? "rotate-90" : ""} size={30} />
      </label>

      <div
        className={
          "w-full bg-white border-y overflow-hidden " +
          (flip ? (last ? "border-y-0 h-0" : " h-0") : "")
        }
      >
        {children}
      </div>
    </div>
  );
};

export default FlipItem;
