"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import Selector from "@/components/atoms/Selector";
import useMealPlanStore from "@/store/mealPlanStore";

import { MEAL_ITEM_TITLE } from "@/constants/mainConstants";
import { usePathname, useRouter } from "next/navigation";
import useDate from "@/store/selectDateStore";
import { customFetch } from "@/utils/fetchClient";
import { toFetchTimeString } from "@/utils/timeFns";
import Swal from "sweetalert2";
import { errorAlert } from "@/utils/alertFns";
import { MealPlanDetailResponse } from "@/app/(sub)/mealplan/mealType";
import MealPlanItem from "../_componenets/MealPlanItem";
import { reCalcMenuSpec, calcMenuSpec, toKRLocaleString } from "../util";

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
  const id = edit ? pathname.split("/").at(-1) : undefined;
  useEffect(() => {
    if (edit) {
      // fetch response setState
      id &&
        customFetch
          .get<MealPlanDetailResponse[]>("meal/info", { id: id })
          .then((res) => {
            if (res.body.code === 0) {
              const data = res.body.data[0].menuList.map((items) => {
                const { carbs, protein, fat, unit, ...item } = items;
                const value = item.did === 4 ? 0 : 100;
                return {
                  ...item,
                  menu_spec: {
                    carbs: reCalcMenuSpec(
                      item.did !== 4,
                      value,
                      item.amount,
                      carbs
                    ),
                    protein: reCalcMenuSpec(
                      item.did !== 4,
                      value,
                      item.amount,
                      protein
                    ),
                    fat: reCalcMenuSpec(
                      item.did !== 4,
                      value,
                      item.amount,
                      fat
                    ),
                  },
                  unit: unit === "g" ? (1 as 1 | 0) : 0,
                  value,
                };
              });
              editStart(data);
            } else {
              const code = res.body.code;
              errorAlert(
                String(code)[0] === "2" || String(code)[0] === "3"
                  ? "잘못된 접근입니다."
                  : "데이터를 가져올 수 없습니다.",
                "",
                () => {
                  (String(code)[0] === "2" || String(code)[0] === "3") &&
                    router.back();
                }
              );
            }
          });
    } else {
      init();
    }
    return () => {
      reset();
    };
  }, []);

  function handleSaveClick() {
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
          return {
            menu,
            kcal,
            amount,
            did,
            cid,
            fid,
            carbs: calcMenuSpec(
              type === "search",
              value,
              amount,
              menu_spec.carbs
            ),
            fat: calcMenuSpec(type === "search", value, amount, menu_spec.fat),
            protein: calcMenuSpec(
              type === "search",
              value,
              amount,
              menu_spec.protein
            ),
            unit,
          };
        }
      );

      const result = {
        time: edit ? undefined : toFetchTimeString(selectedDate),
        total: totalCalory,
        type: edit ? undefined : selectedType,
        menuList: JSON.stringify(menuList),
      };

      if (edit) {
        id &&
          customFetch.put("meal/edit", { ...result, id }).then((res) => {
            const ok = res.body.code === 0;
            Swal.fire({
              title: ok
                ? "식단을 성공적으로 수정했습니다."
                : "식단 수정에 실패햇습니다. 잠시 후 다시 시도해 주세요",
              icon: ok ? "success" : "error",
            }).then(() => {
              ok && router.back();
            });
          });
      } else {
        const nullData = menuList.length === 0 || selectedType === 0;
        if (nullData) {
          const text =
            menuList.length === 0
              ? "식사 메뉴가 필요합니다."
              : selectedType === 0
              ? "식사 종류를 선택해 주세요."
              : "잘못된 입력값입니다.";

          Swal.fire({ text, icon: "error" });
          return;
        }
        customFetch.post("meal/add", result).then((res) => {
          const { code } = res.body;
          Swal.fire({
            title:
              code === 0
                ? "식단을 성공적으로 저장했습니다."
                : code === 1008
                ? "존재하는 식단 종류입니다. 간식 외에는 하루에 한번만 저장이 가능합니다."
                : "식단 저장에 실패햇습니다. 잠시 후 다시 시도해 주세요",
            icon: code === 0 ? "success" : "error",
          }).then(() => {
            code === 0 && router.back();
          });
        });
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-55px)] h-full w-full py-2 sm:px-2">
      <div className="flex flex-col-reverse sm:flex-row items-center gap-3 sm:gap-8 w-[96%] mx-auto sm:w-full sm:mx-0">
        {/* meal type , datepicker */}
        {!edit && (
          <Selector
            className="flex-1 w-full shadow-border rounded-xl p-3 dark:bg-black"
            options={[{ name: "식사 종류", optionValue: 0 }, ...MEAL_TYPES]}
            value={selectedType}
            handleClick={(value: number | string) =>
              typeof value === "number" ? setSelectedType(value) : null
            }
          />
        )}
        <button
          className="flex-1 shadow-border p-4 w-full dark:bg-cusdarkbanana disabled:bg-zinc-100"
          suppressHydrationWarning
          onClick={() =>
            router.push("/calendar?select=time", { scroll: false })
          }
          disabled={edit}
        >
          {toKRLocaleString(selectedDate)}
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
          onClick={handleSaveClick}
        >
          식단 저장하기
        </button>
      </div>
    </div>
  );
}
