"use client";

import { useEffect, useState } from "react";
import Selector from "../Selector";
import { formattedNumber, getDaysInMonth } from "@/utils/calendarFns";
import TimeDropdown from "./TimeDropdown";
import { useRouter, useSearchParams } from "next/navigation";

interface CalendarProps {
  min?: Date;
  max?: Date;
  endDate: Date;
  startDate?: Date;
  handleDateChange: (target: Date) => void;
  inline?: boolean;
}
const WEEK_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({
  endDate,
  handleDateChange,
  startDate,
  inline,
}: CalendarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeSelect = searchParams.get("select") === "time";

  const [maxDate, setMaxDate] = useState(new Date());

  const [minDate, setMinDate] = useState(new Date("2023-3-14"));
  const [currentYear, setCurrentYear] = useState(
    endDate.getFullYear() || maxDate.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState(
    endDate.getMonth() + 1 || maxDate.getMonth() + 1
  );

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("max") === "1") {
          const newMax = new Date(maxDate);
          newMax.setDate(maxDate.getDate() - 1);
          setMaxDate(newMax);
        }
        const min = localStorage.getItem("sud");
        min && setMinDate(new Date(min));
      }
    }, 150);
  }, []);

  function handlePrevMonth() {
    if (currentMonth === 1) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  }

  function handleNextMonth() {
    if (currentMonth === 12) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  }

  function handleYearMonthClick(isYearClick: boolean) {
    if (isYearClick) {
      return (value: number) => {
        const minMonth = minDate.getMonth() + 1,
          maxMonth = maxDate.getMonth() + 1;

        if (value === maxDate.getFullYear() && currentMonth > maxMonth) {
          setCurrentMonth(maxMonth);
        } else if (value === minDate.getFullYear() && currentMonth < minMonth) {
          setCurrentMonth(minMonth);
        }
        setCurrentYear(value);
      };
    }
    return (value: number) => {
      setCurrentMonth(value);
    };
  }

  function handleDayClick(day: number) {
    handleDateChange(new Date(currentYear, currentMonth - 1, day));
  }

  const years = Array.from(
    {
      length: maxDate.getFullYear() - minDate.getFullYear() + 1,
    },
    (_, i) => maxDate.getFullYear() - i
  );
  const monthLength =
    currentYear === maxDate.getFullYear()
      ? maxDate.getMonth() + 1
      : currentYear === minDate.getFullYear()
      ? 12 - minDate.getMonth()
      : 12;
  const months = Array.from(
    { length: monthLength },
    (_, i) => (currentYear === maxDate.getFullYear() ? monthLength : 12) - i
  );
  const selectOptions = [
    {
      key: "year",
      value: currentYear,
      options: years.map((year) => ({
        name: String(year),
        optionValue: year,
      })),
      handleClick: handleYearMonthClick(true),
    },
    { key: "slash" },
    {
      key: "month",
      value: currentMonth,
      options: months.map((month) => ({
        name: formattedNumber(month),
        optionValue: month,
      })),
      handleClick: handleYearMonthClick(false),
    },
  ];

  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(0);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  function genDayFlag(day: number) {
    const matchedYearMonth = (target: Date) => ({
      bool:
        day > 0 &&
        target.getFullYear() === currentYear &&
        target.getMonth() + 1 === currentMonth,
      targetDay: target.getDate(),
    });
    const endTarget = matchedYearMonth(endDate),
      maxTarget = matchedYearMonth(maxDate),
      minTarget = matchedYearMonth(minDate),
      startTarget = startDate && matchedYearMonth(startDate);
    const dateOfDay = new Date(currentYear, currentMonth - 1, day);
    return {
      selected:
        (endTarget.bool && endTarget.targetDay === day) ||
        (startTarget?.bool && startTarget.targetDay === day),
      disabled:
        (maxTarget.bool && maxTarget.targetDay < day) ||
        (minTarget.bool && minTarget.targetDay > day),
      inRange: startDate && startDate < dateOfDay && endDate > dateOfDay,
    };
  }
  return (
    <div className="w-full max-w-md mx-auto p-4 text-gray-500 dark:text-white flex h-full flex-col md:flex-row justify-between md:w-[820px]  gap-8 ">
      <div className="w-full h-full max-w-md mx-auto md:w-[360px] flex-1">
        <div className="flex justify-between items-center mb-4">
          <ArrowButton
            handleClick={handlePrevMonth}
            isNext={false}
            disabled={
              currentYear === minDate.getFullYear() &&
              currentMonth === minDate.getMonth() + 1
            }
          />
          <div className="flex items-center justify-center">
            {selectOptions.map((item) => {
              if (item.key === "slash")
                return (
                  <div
                    key={item.key}
                    className="h-6 w-[3px] rounded-md bg-cusorange -skew-x-[20deg] mr-2"
                  />
                );
              else {
                const { key, value, options, handleClick } = item;
                if (options && handleClick)
                  return (
                    <Selector
                      key={key}
                      titleClass="text-lg text-cusorange"
                      optionsClassName="max-h-40 overflow-y-scroll"
                      value={value}
                      options={options}
                      handleClick={handleClick}
                    />
                  );
              }
            })}
          </div>
          <ArrowButton
            handleClick={handleNextMonth}
            disabled={
              currentYear === maxDate.getFullYear() &&
              currentMonth === maxDate.getMonth() + 1
            }
            isNext={true}
          />
        </div>
        <div className="h-[24px] grid grid-cols-7 gap-1">
          {WEEK_NAMES.map((day) => (
            <div key={day} className="text-center font-bold h-[24px] ">
              {day}
            </div>
          ))}
        </div>
        <div
          className={
            "h-[calc(100%-70px)] grid grid-cols-7 gap-1 " +
            (timeSelect ? "mb-2" : "")
          }
        >
          {days.map((day, index) => {
            const isCurrentMonth = index >= firstDayOfMonth;
            const { selected, disabled, inRange } = genDayFlag(day);

            return (
              <div
                key={index}
                className={`text-center p-2 cursor-pointer aria-disabled:text-gray-300 aria-disabled:cursor-default w-[40px] ${
                  selected
                    ? "bg-cuspoint text-cusorange shadow-border rounded-2xl"
                    : !isCurrentMonth
                    ? "cursor-default"
                    : inRange
                    ? "rounded-2xl bg-cusbanana shadow-border"
                    : "text-gray-500 dark:text-white"
                }`}
                onClick={() => {
                  if (isCurrentMonth && !disabled) {
                    handleDayClick(day);
                  }
                }}
                aria-disabled={disabled}
              >
                {day === 0 ? "" : day}
              </div>
            );
          })}
        </div>
      </div>
      {timeSelect && (
        <TimeDropdown
          currentDate={endDate}
          handleDateChange={handleDateChange}
          inline={inline}
        />
      )}
    </div>
  );
};

export default Calendar;

const ArrowButton = ({
  handleClick,
  disabled,
  isNext,
}: {
  handleClick: () => void;
  disabled?: boolean;
  isNext: boolean;
}) => {
  return (
    <button
      onClick={handleClick}
      className="text-lg font-bold disabled:invisible "
      disabled={disabled}
    >
      {isNext ? <p>&gt;</p> : <p>&lt;</p>}
    </button>
  );
};
