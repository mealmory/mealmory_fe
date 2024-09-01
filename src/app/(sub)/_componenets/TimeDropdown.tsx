"use client";
import { useState, useRef, useEffect } from "react";
import { compareDate, formattedNumber } from "../util";
import useDate from "@/store/selectDateStore";

type TimeKey = "hour" | "minute";

const TimeDropdown = ({
  className,
  inline,
  min,
  max,
}: {
  className?: string;
  inline?: boolean;
  min: Date;
  max: Date;
}) => {
  const [flip, setFlip] = useState(inline ? false : true);
  const actionRefs = useRef<(HTMLElement | null)[]>([]);
  const { time, changeTime, selectedDate } = useDate();
  const [hour, minute] = time;
  function handleTimeClick(type: "hour" | "minute", value: number) {
    const newHour = type === "hour" ? value : hour,
      newMinute = type === "minute" ? value : minute;
    changeTime(newHour, newMinute);
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

  function checkTimeDesabled(type: TimeKey, value: number) {
    const isMinDate = compareDate(min, selectedDate).same;
    const isMaxDate = compareDate(max, selectedDate).same;
    const [minHour, minMinute] = [min.getHours(), min.getMinutes()];
    const [maxHour, maxMinute] = [max.getHours(), max.getMinutes()];
    // 최소일이거나 최대일이거나
    if (isMinDate && !isMaxDate) {
      // hour
      if (type === "hour") return value < minHour;
      // minute
      if (hour < minHour) return true;
      if (hour === minHour) return value < minMinute;
      return false;
    }
    if (isMaxDate && !isMinDate) {
      if (type === "hour") return value > maxHour;
      // minute
      if (hour > maxHour) return true;
      if (hour === maxHour) return value > maxMinute;
      return false;
    }
    return false;
  }

  const HOURS = Array.from({ length: 24 }, (_, i) => ({
    name: formattedNumber(i),
    optionValue: i,
    disabled: checkTimeDesabled("hour", i),
  }));
  const MINUTES = Array.from({ length: 60 }, (_, i) => ({
    name: formattedNumber(i),
    optionValue: i,
    disabled: checkTimeDesabled("minute", i),
  }));

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
          "rounded-lg overflow-hidden w-full absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-full border bg-white dark:bg-cusdark flex " +
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
            list={type === "hour" ? HOURS : MINUTES}
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
  list,
}: {
  flip: boolean;
  targetValue: number;
  type: "hour" | "minute";
  list: { name: string; optionValue: number; disabled: boolean }[];
  handleClick: (type: "hour" | "minute", value: number) => void;
}) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const liRefs = useRef<(HTMLElement | null)[]>([]);
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
      {list.map(({ name, optionValue, disabled }, i) => (
        <li
          key={`${name}${optionValue}`}
          ref={(el) => {
            liRefs.current[i + 1] = el;
          }}
          className={
            "p-3 text-center " +
            (targetValue === optionValue
              ? "bg-cuspoint text-cusorange cursor-pointer "
              : disabled
              ? "bg-gray-100 dark:bg-gray-400 cursor-default"
              : " dark:bg-black hover:bg-cusgray dark:hover:bg-gray-700 cursor-pointer")
          }
          onClick={() => {
            !disabled && handleClick(type, optionValue);
          }}
          data-selected={targetValue === optionValue}
        >
          {name}
        </li>
      ))}
    </ul>
  );
};
