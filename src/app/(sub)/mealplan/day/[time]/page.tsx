"use client";

import Link from "next/link";
import FlipItem from "../../FlipItem";
import { useEffect, useState } from "react";
import { MealPlanDetailResponse } from "../../mealType";
import { customFetch } from "@/utils/fetchClient";

type MealPlanDetailOfDay = Array<
  MealPlanDetailResponse & { id: number; type: string }
>;

export default function MealPlanOfDay({
  params,
}: {
  params: { time: string };
}) {
  const { time } = params;
  const [data, setData] = useState<MealPlanDetailOfDay>();
  useEffect(() => {
    customFetch
      .get<MealPlanDetailOfDay>("meal/info", { time: time })
      .then((res) => {
        if (res.body.code === 0) {
          setData(res.body.data);
        }
      });
  }, []);
  function translationCdfTitle(key: "carbs" | "protein" | "fat") {
    switch (key) {
      case "carbs":
        return "탄수화물";
      case "protein":
        return "단백질";
      case "fat":
        return "지방";
    }
  }
  return (
    <main className="min-h-[calc(100vh-55px)] h-full w-full p-2">
      <div className="rounded-xl shadow-border w-full bg-cusbanana dark:bg-cusdarkbanana">
        {data &&
          data.length > 0 &&
          data.map(({ type, time, total, id, menuList }, i) => {
            if (menuList.length > 0) {
              const { carbs, protein, fat } = menuList.reduce((a, b) => ({
                ...a,
                carbs: a.carbs + b.carbs,
                protein: a.protein + b.protein,
                fat: a.fat + b.fat,
              }));
              const menu_spec = { carbs, protein, fat };
              return (
                <FlipItem
                  title={type}
                  key={id}
                  first={i === 0 ? true : undefined}
                  last={i === data.length - 1 ? true : undefined}
                >
                  <div className="flex flex-col gap-3 p-5 bg-white dark:bg-cusdark">
                    <p>
                      식사 시간 :{" "}
                      <Link
                        href={`/mealplan/time/${id}`}
                        className="font-semibold text-cusorange underline cursor-pointer"
                      >
                        {time.substring(11, 16)}
                      </Link>
                    </p>
                    <p>칼로리 : {total.toLocaleString()} kcal</p>

                    <div className="rounded-xl shadow-border overflow-hidden">
                      <table className="text-center border-collapse border-hidden w-full dark:bg-cusdarkbanana">
                        <tbody>
                          {Object.entries(menu_spec).map(([key, value]) => (
                            <tr key={key}>
                              <th className="border w-[40%] p-2 font-normal">
                                {translationCdfTitle(
                                  key as keyof typeof menu_spec
                                )}
                              </th>
                              <td className="border w-[60%] p-2 font-medium">
                                {value} g
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full p-5 overflow-x-scroll bg-zinc-100 dark:bg-zinc-800">
                    {menuList.map(({ menu, kcal, amount, unit }, i) => (
                      <div
                        key={menu + i}
                        className=" rounded-xl shadow-border p-3 basis-[100%] md:basis-[376px] flex-grow-0 flex-shrink-0  bg-white dark:bg-cusdarkbanana text-center"
                      >
                        <p className="text-center mb-1 text-lg">{menu}</p>
                        <p>칼로리 : {kcal.toLocaleString()} kcal</p>
                        <p>
                          섭취량 : {amount.toLocaleString()} {unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </FlipItem>
              );
            } else {
              return null;
            }
          })}
      </div>
    </main>
  );
}
