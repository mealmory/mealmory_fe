"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Selector from "@/components/Selector";
import useMealPlanStore, {
  MenuDTO,
  toFixeNumberTwo,
} from "@/store/mealPlanStore";

import { MEAL_ITEM_TITLE } from "@/constants/mainConstants";
import { usePathname, useRouter } from "next/navigation";
import useDate from "@/store/selectDateStore";
import MealPlanItem from "@/components/main/MealPlanItem";
import { customFetch, fetchClient, fetcher } from "@/utils/fetchClient";
import { menuTypeTransform } from "@/utils/mealplanFns";
import { toFetchTimeString } from "@/utils/timestamp";
import Swal from "sweetalert2";

interface MealDTO {
  date: string;
  type: 1 | 2 | 3 | 4 | 5;
  total: number;
  menuList: Array<MenuDTO>;
}

interface MealInfoType {
  type: "아침" | "점심" | "져녁" | "야식" | "간식";
  date: string;
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
  const { selectedDate, init, changeDate } = useDate();
  const router = useRouter();
  const totalCalory =
    mealPlanList.length > 0 &&
    mealPlanList.map((meal) => meal?.kcal).reduce((a, b) => a && b && a + b);
  const pathname = usePathname();
  useEffect(() => {
    if (edit) {
      // fetch response setState
      const id = pathname.split("/").at(-1);
      fetchClient<MealInfoType>(`dummy/meal/info?id=${id}`)
        .then((res) => res.body.data)
        .then((data) => {
          setSelectedType(menuTypeTransform(data.type));
          editStart(data.menuList);
          changeDate(new Date(data.date));
        });
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
          className="flex-1 shadow-border p-4 w-full dark:bg-cusdarkbanana"
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
          onClick={() => {
            router.push("/mealplan/add/division", { scroll: false });
          }}
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
        <button
          className="w-full bg-cuspoint text-cusorange p-2"
          onClick={() => {
            if (mealPlanList.length > 0 && typeof totalCalory === "number") {
              const menuList = mealPlanList.map(
                ({
                  menu,
                  kcal,
                  did,
                  cid,
                  fid,
                  menu_spec,
                  unit,
                  amount,
                  type,
                  value,
                }) => {
                  function calcMenuSpec(num?: number) {
                    if (num) {
                      if (type === "search") {
                        return value
                          ? toFixeNumberTwo((num / value) * amount)
                          : num;
                      }
                      return num;
                    }
                    return undefined;
                  }

                  const spec = {
                    carbs: calcMenuSpec(menu_spec.carbs),
                    fat: calcMenuSpec(menu_spec.fat),
                    protein: calcMenuSpec(menu_spec.protein),
                  };
                  return {
                    menu,
                    kcal,
                    amount,
                    did,
                    cid,
                    fid,
                    menu_spec: spec,
                    unit,
                  };
                }
              );
              const result = {
                time: toFetchTimeString(selectedDate),
                total: totalCalory,
                type: selectedType,
                menuList: JSON.stringify(menuList),
              };
              customFetch.post("meal/add", result).then((res) => {
                const ok = res.body.code === 0;
                Swal.fire({
                  title: ok
                    ? "식단을 성공적으로 저장했습니다."
                    : "식단 저장에 실패햇습니다. 잠시 후 다시 시도해 주세요",
                  icon: ok ? "success" : "error",
                });
              });
            }
          }}
        >
          식단 저장하기
        </button>
      </div>
    </div>
  );
}
