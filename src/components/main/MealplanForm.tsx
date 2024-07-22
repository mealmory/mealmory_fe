"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Selector from "@/components/Selector";
import useMealPlanStore from "@/store/mealPlanStore";

import { MEAL_ITEM_TITLE } from "@/constants/mainConstants";
import { useRouter } from "next/navigation";
import useDate from "@/store/selectDateStore";
import MealPlanItem from "@/app/(sub)/mealplan/add/MealPlanItem";

interface MenuDTO {
  menu: string;
  calory: number;
  weight: number;
  unit: 1 | 0;
  cpfData?: {
    carbs: number;
    protein: number;
    fat: number;
  };
}

interface MealDTO {
  time: string;
  type: 1 | 2 | 3 | 4 | 5;
  total: number;
  menuList: Array<MenuDTO>;
}

const MEAL_TYPES = [
  { name: "아침", optionValue: 1 },
  { name: "점심", optionValue: 2 },
  { name: "저녁", optionValue: 3 },
  { name: "야식", optionValue: 4 },
  { name: "간식", optionValue: 5 },
];

export default function MealplanForm({
  edit,
  selectedType,
  setSelectedType,
}: {
  edit?: boolean;
  selectedType: number;
  setSelectedType: Dispatch<SetStateAction<number>>;
}) {
  const { mealPlanList, editStart, reset } = useMealPlanStore();
  const { selectedDate, init } = useDate();
  const router = useRouter();
  const totalCalory =
    mealPlanList.length > 0 &&
    mealPlanList.map((meal) => meal?.calory).reduce((a, b) => a && b && a + b);

  useEffect(() => {
    if (edit) {
      // fetch response setState
    }
    return () => {
      init();
      if (edit) reset();
    };
  }, []);
  return (
    <div className="min-h-[calc(100vh-55px)] h-full w-full py-2 sm:px-2">
      <div className="flex flex-col-reverse sm:flex-row items-center gap-3 sm:gap-8 w-[96%] mx-auto sm:w-full sm:mx-0">
        {/* meal type , datepicker */}
        <Selector
          className="flex-1 w-full shadow-border rounded-xl p-3 dark:bg-black"
          options={[{ name: "식사 종류", optionValue: 0 }, ...MEAL_TYPES]}
          value={selectedType}
          handleClick={(value: number | string) =>
            typeof value === "number" ? setSelectedType(value) : null
          }
        />
        <button
          className="flex-1 shadow-border p-4 w-full"
          suppressHydrationWarning
          onClick={() => router.push("/calendar", { scroll: false })}
        >
          {selectedDate.toLocaleString()}
        </button>
      </div>
      <div className="my-5">
        {/* menu, weight, unit, calory input */}
        {mealPlanList.map((mealPlan, i) => {
          return (
            mealPlan && (
              <MealPlanItem
                key={mealPlan?.id}
                data={mealPlan}
                first={i === 0 ? true : undefined}
                last={i === mealPlanList.length - 1 ? true : undefined}
              />
            )
          );
        })}
      </div>
      <div className="w-full max-w-96 mx-auto flex flex-col gap-5">
        <button
          className="w-full border-2 border-cusorange text-cusorange p-2"
          onClick={() =>
            router.push("/mealplan/add/division", { scroll: false })
          }
        >
          메뉴 추가하기
        </button>
        <p className="text-center">
          {MEAL_ITEM_TITLE.total} :{" "}
          <span className="text-cusorange text-xl">
            {totalCalory ? totalCalory.toLocaleString() : 0}
          </span>{" "}
          kcal
        </p>
        <button className="w-full bg-cuspoint text-cusorange p-2">
          식단 저장하기
        </button>
      </div>
    </div>
  );
}
