"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { storageGet } from "@/utils/storageFns";
import TimeDropdown from "../_componenets/TimeDropdown";
import Selector from "@/components/atoms/Selector";
import {
  compareDate,
  compareTime,
  formattedNumber,
  getDaysInMonth,
} from "../util";
import useDate from "@/store/selectDateStore";

interface CalendarProps {
  min?: Date;
  max?: Date;
  startDate?: Date;
  inline?: boolean;
}
const WEEK_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

const Calendar = ({ inline }: CalendarProps) => {
  const searchParams = useSearchParams();
  const { period, selectedDate, changeDate, changeFullDate, time } = useDate();
  const timeSelect = searchParams.get("select") === "time";

  const [maxDate, setMaxDate] = useState(new Date());
  const [minDate, setMinDate] = useState(new Date("2023-3-14"));
  const [currentYear, setCurrentYear] = useState(
    selectedDate.getFullYear() || maxDate.getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState(
    selectedDate.getMonth() + 1 || maxDate.getMonth() + 1
  );

  const router = useRouter();

  useEffect(() => {
    setTimeout(async () => {
      const max = await storageGet("max");
      if (max === "1") {
        const newMax = new Date(
          maxDate.getFullYear(),
          maxDate.getMonth(),
          maxDate.getDate() - 1
        );
        setMaxDate(newMax);
      }
      const min = await storageGet("sud");
      min && setMinDate(new Date(min));
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

  function handleDayClick(day: Date) {
    if (timeSelect) {
      const { same: compareResultMin } = compareDate(minDate, day);
      const { same: compareResultMax } = compareDate(maxDate, day);
      if (compareResultMin) {
        const { under: CompareResultMinTime } = compareTime(
          [minDate.getHours(), minDate.getMinutes()],
          time
        );
        if (CompareResultMinTime) changeFullDate(minDate);
      } else if (compareResultMax) {
        const { over: CompareResultMaxTime } = compareTime(
          [maxDate.getHours(), maxDate.getMinutes()],
          time
        );
        if (CompareResultMaxTime) changeFullDate(maxDate);
      }
    } else {
      changeDate(day);
    }
    router.back();
  }
  // yaers
  const years = Array.from(
    {
      length: maxDate.getFullYear() - minDate.getFullYear() + 1,
    },
    (_, i) => maxDate.getFullYear() - i
  );
  // month
  let monthLength = 12,
    monthStart = 0;
  if (currentYear === maxDate.getFullYear()) {
    monthLength = maxDate.getMonth() + 1;
  }

  if (currentYear === minDate.getFullYear()) {
    const minMonth = minDate.getMonth();
    monthLength -= minMonth;
    monthStart = minMonth;
  }

  const months = Array.from(
    { length: monthLength },
    (_, i) => monthStart + i + 1
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
  // day
  const startDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();
  const endDayOfWeek = new Date(currentYear, currentMonth, 0).getDay();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const days: Date[] = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(new Date(currentYear, currentMonth - 1, i - startDayOfWeek + 1));
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(currentYear, currentMonth - 1, i));
  }

  for (let i = 1; i <= 6 - endDayOfWeek; i++) {
    let nextYear = currentYear,
      nextMonth = 0;
    if (currentMonth > 11) {
      nextYear += 1;
    } else {
      nextMonth = currentMonth;
    }
    days.push(new Date(nextYear, nextMonth, i));
  }

  function genDayFlag(day: Date) {
    const selected =
      selectedDate.getFullYear() === day.getFullYear() &&
      selectedDate.getMonth() === day.getMonth() &&
      selectedDate.getDate() === day.getDate();

    let includePeriod = false;
    if (period === "week") {
      const startOfWeekDate = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate() - day.getDay()
      );
      const startOfWeekEndDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() - selectedDate.getDay()
      );
      includePeriod =
        startOfWeekEndDate.getTime() === startOfWeekDate.getTime();
    } else if (period === "month") {
      includePeriod = selectedDate.getMonth() === day.getMonth();
    }

    return {
      selected,
      disabled:
        compareDate(minDate, day).under || compareDate(maxDate, day).over,
      includePeriod,
    };
  }
  return (
    <div className="w-full max-w-md mx-auto p-4 text-gray-500 dark:text-white flex h-full flex-col md:flex-row justify-between md:w-[820px]  gap-8 ">
      <div className="w-full h-full max-w-md mx-auto md:w-[360px] flex-1">
        <div className="flex items-center justify-between mb-4">
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
            "h-[calc(100%-70px)] grid grid-cols-7 justfy-center gap-1 " +
            (timeSelect ? "mb-2" : "")
          }
        >
          {days.map((day) => {
            const isCurrentMonth = day.getMonth() === currentMonth - 1;
            const { selected, disabled, includePeriod } = genDayFlag(day);

            return (
              <DayButton
                key={day.toLocaleDateString()}
                day={day}
                handleDayClick={handleDayClick}
                isCurrentMonth={isCurrentMonth}
                selected={selected}
                disabled={disabled}
                includePeriod={includePeriod}
              />
            );
          })}
        </div>
      </div>
      {timeSelect && (
        <TimeDropdown inline={inline} min={minDate} max={maxDate} />
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

const DayButton = ({
  day,
  handleDayClick,
  selected,
  isCurrentMonth,
  includePeriod,
  disabled,
}: {
  day: Date;
  handleDayClick: (day: Date) => void;
  selected?: boolean;
  isCurrentMonth: boolean;
  includePeriod?: boolean;
  disabled: boolean;
}) => {
  return (
    <div
      className={`text-center p-2 cursor-pointer mx-auto aria-disabled:text-gray-300 aria-disabled:cursor-default w-[40px] rounded-2xl ${
        selected
          ? "bg-cuspoint text-cusorange shadow-border"
          : includePeriod
          ? "bg-cusbanana shadow-border " +
            (!isCurrentMonth ? "text-gray-300" : "")
          : !isCurrentMonth
          ? "cursor-default bg-gray-200 bg-opacity-30 text-gray-300"
          : "text-gray-500 dark:text-white"
      }`}
      onClick={() => {
        !disabled && isCurrentMonth && handleDayClick(day);
      }}
      aria-disabled={disabled}
      data-date={day.toLocaleDateString()}
    >
      {day.getDate()}
    </div>
  );
};
