"use client";

import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";
import { useEffect, useRef, useState } from "react";

const Selector = ({
  className,
  titleClass,
  options,
  value,
  handleClick,
  optionsClassName,
}: {
  className?: string;
  titleClass?: string;
  optionsClassName?: string;
  options: Array<{ name: string; optionValue: number }>;
  value: number | string;
  handleClick: (value: number) => void;
}) => {
  const [flip, setFlip] = useState(true);
  const optionRefs = useRef<(HTMLElement | null)[]>([]);
  const selectedOption = options.find((option) => option.optionValue === value);
  const handleOptionClick = (value: number) => {
    handleClick(value);
    setFlip(true);
  };

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      const isOutSideClick = optionRefs.current.every(
        (ref) => ref && !ref.contains(e.target as HTMLElement)
      );
      if (isOutSideClick) {
        setFlip(true);
      }
    };
    if (!flip) {
      document.addEventListener("mousedown", handleOutSideClick);
    } else {
      document.removeEventListener("mousedown", handleOutSideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [flip, options]);
  return (
    <div className={"relative " + (className ?? "")}>
      <button
        className={
          "flex items-center justify-between w-full " + (titleClass ?? "")
        }
        onClick={() => setFlip((prev) => !prev)}
        ref={(el) => {
          optionRefs.current[0] = el;
        }}
      >
        <p>{selectedOption?.name}</p>
        <HiChevronRight className="rotate-90" size={30} />
      </button>
      {!flip && (
        <ul
          className={
            "rounded-lg absolute -bottom-1 left-0 translate-y-full w-full border bg-white dark:bg-cusdark " +
            (optionsClassName ?? "overflow-hidden")
          }
        >
          {options.map(({ name, optionValue }, i) => (
            <li
              key={optionValue}
              className={
                `${options[0].name}-option ` +
                "p-2 cursor-pointer " +
                (value === optionValue
                  ? "bg-cuspoint text-cusorange "
                  : " dark:bg-black hover:bg-cusgray dark:hover:bg-gray-700")
              }
              onClick={() => {
                handleOptionClick(optionValue);
              }}
              ref={(el) => {
                optionRefs.current[i + 1] = el;
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selector;
