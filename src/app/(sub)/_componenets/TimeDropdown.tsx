"use client";
import { formattedNumber } from "@/utils/calendarFns";
import { useState, useRef, useEffect, ReactNode } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => ({
  name: formattedNumber(i),
  optionValue: i,
}));
const MINUTES = Array.from({ length: 60 }, (_, i) => ({
  name: formattedNumber(i),
  optionValue: i,
}));

const TimeDropdown = ({
  currentDate,
  className,
  handleDateChange,
  inline,
}: {
  currentDate: Date;
  handleDateChange: (target: Date) => void;
  className?: string;
  inline?: boolean;
}) => {
  const [flip, setFlip] = useState(inline ? false : true);
  const actionRefs = useRef<(HTMLElement | null)[]>([]);

  const hour = currentDate.getHours(),
    minute = currentDate.getMinutes();

  function handleTimeClick(type: "hour" | "minute", value: number) {
    const year = currentDate.getFullYear(),
      month = currentDate.getMonth(),
      day = currentDate.getDate(),
      hour = type === "hour" ? value : currentDate.getHours(),
      minute = type === "minute" ? value : currentDate.getMinutes();
    handleDateChange(new Date(year, month, day, hour, minute));
  }

  useEffect(() => {
    const handleOutSideClick = (e: MouseEvent) => {
      const isOutSideClick = actionRefs.current.every(
        (ref) => ref && !ref.contains(e.target as HTMLElement)
      );

      if (isOutSideClick) {
        !inline && setFlip(true);
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
  }, [flip]);

  return (
    <div className="flex items-center relative w-full md:w-[120px] h-max justify-center">
      <button
        className={
          "flex items-center text-lg w-full justify-center shadow-border py-2 px-1 " +
          (className ?? "")
        }
        onClick={() => !inline && setFlip((prev) => !prev)}
        ref={(el) => {
          actionRefs.current[0] = el;
        }}
      >
        <p className="flex-1 text-center">{`${formattedNumber(hour)}`}</p>
        <p>:</p>
        <p className="flex-1 text-center">{`${formattedNumber(minute)}`}</p>
      </button>

      <div
        ref={(el) => {
          actionRefs.current[1] = el;
        }}
        className={
          "rounded-lg w-full absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full border bg-white dark:bg-cusdark flex " +
          (flip ? "md:hidden" : "")
        }
      >
        {[
          { type: "hour", targetValue: hour },
          { type: "minute", targetValue: minute },
        ].map(({ type, targetValue }) => (
          <Ul
            key={type}
            type={type as "hour" | "minute"}
            targetValue={targetValue}
            flip={flip}
            handleClick={handleTimeClick}
          />
        ))}
      </div>
    </div>
  );
};
export default TimeDropdown;

const Ul = ({
  flip,
  targetValue,
  type,
  handleClick,
}: {
  flip: boolean;
  targetValue: number;
  type: "hour" | "minute";
  handleClick: (type: "hour" | "minute", value: number) => void;
}) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const liRefs = useRef<(HTMLElement | null)[]>([]);
  const list = type === "hour" ? HOURS : MINUTES;
  useEffect(() => {
    const target = liRefs.current.find((el) => {
      return el?.dataset.selected === "true";
    });
    target && target.scrollIntoView();
  }, []);
  useEffect(() => {
    if (!flip) {
      const target = liRefs.current.find((el) => {
        return el?.dataset.selected === "true";
      });
      target && target.scrollIntoView();
    }
  }, [flip]);
  return (
    <ul
      ref={ulRef}
      className="max-h-40 md:max-h-60 overflow-y-scroll flex-1 scroll-hide"
    >
      {list.map(({ name, optionValue }, i) => (
        <li
          key={`${name}${optionValue}`}
          ref={(el) => {
            liRefs.current[i + 1] = el;
          }}
          className={
            "p-3 cursor-pointer text-center " +
            (targetValue === optionValue
              ? "bg-cuspoint text-cusorange "
              : " dark:bg-black hover:bg-cusgray dark:hover:bg-gray-700")
          }
          onClick={() => {
            handleClick(type, optionValue);
          }}
          data-selected={targetValue === optionValue}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
