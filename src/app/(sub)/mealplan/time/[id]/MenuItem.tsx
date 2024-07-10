"use client";

import FlipItem from "../../FlipItem";
import { MenuData } from "./page";

const MenuItem = ({
  menu,
  calory,
  weight,
  unit,
  cpfGraph,
  last,
  first,
}: MenuData & { last?: boolean; first?: boolean }) => {
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
      <>
        <p>칼로리 : {calory.toLocaleString()} kcal</p>
        <p>
          섭취량 : {weight.toLocaleString()}
          {unit === 0 ? "g" : "ml"}
        </p>
        {cpfGraph && (
          <div className="rounded-xl shadow-border overflow-hidden">
            <table className="text-center border-collapse border-hidden w-full">
              <tbody>
                {Object.entries(cpfGraph).map(([key, value]) => (
                  <tr key={key}>
                    <th className="border w-[40%] p-2 font-normal">
                      {translationCdfTitle(key as keyof typeof cpfGraph)}
                    </th>
                    <td className="border w-[60%] p-2 font-medium">
                      {value} g
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    </FlipItem>
  );
};

export default MenuItem;
