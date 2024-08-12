"use client";

import FlipItem from "../../FlipItem";
import { MealDetailDTO } from "./page";

const MenuItem = ({
  menu,
  kcal,
  amount,
  unit,
  carbs,
  protein,
  fat,
  last,
  first,
}: MealDetailDTO & { last?: boolean; first?: boolean }) => {
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
    <FlipItem title={menu} last={last} first={first}>
      <div className="flex flex-col gap-3 p-5 bg-white dark:bg-cusdark">
        <p>칼로리 : {kcal.toLocaleString()} kcal</p>
        <p>
          섭취량 : {amount.toLocaleString()}
          {unit}
        </p>

        <div className="rounded-xl shadow-border overflow-hidden">
          <table className="text-center border-collapse border-hidden w-full">
            <tbody>
              {Object.entries({ carbs, protein, fat }).map(([key, value]) => (
                <tr key={key}>
                  <th className="border w-[40%] p-2 font-normal">
                    {translationCdfTitle(key as "carbs" | "protein" | "fat")}
                  </th>
                  <td className="border w-[60%] p-2 font-medium">{value} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </FlipItem>
  );
};

export default MenuItem;
