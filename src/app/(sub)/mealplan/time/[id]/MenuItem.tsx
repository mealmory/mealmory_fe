"use client";

import { useState } from "react";
import { MenuData } from "./page";
import { HiChevronRight } from "@react-icons/all-files/hi/HiChevronRight";

const MenuItem = ({
  menu,
  calory,
  weight,
  unit,
  cpfGraph,
  last,
  first,
}: MenuData & { last?: boolean; first?: boolean }) => {
  const [flip, setFlip] = useState(first ? false : true);

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
    <div className="">
      <label className={"w-full flex items-center justify-between p-4 "}>
        <p className="pl-2 font-semibold">{menu}</p>
        <input type="checkbox" className="hidden" />
        <HiChevronRight
          className={!flip ? "rotate-90" : ""}
          size={30}
          onClick={() => setFlip((prev) => !prev)}
        />
      </label>

      <div
        className={
          "w-full bg-white border-y flex flex-col gap-3 overflow-hidden " +
          (flip ? (last ? "border-y-0 p-0 h-0" : "p-0 h-0") : "p-5")
        }
      >
        <p>칼로리 : {calory}</p>
        <p>
          섭취량 : {weight}
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
      </div>
    </div>
  );
};

export default MenuItem;
