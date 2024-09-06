import { MealType, MealItemType } from "@/app/(sub)/mealplan/mealType";
import { MEAL_ITEM_TITLE } from "@/constants/mainConstants";
import useMealPlanStore from "@/store/mealPlanStore";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { BsX } from "@react-icons/all-files/bs/BsX";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { calcKcal, toFixeNumberTwo } from "../util";

const MealPlanItem = ({
  data,
  first,
  last,
}: {
  data: MealType;
  first?: boolean;
  last?: boolean;
}) => {
  const { setMeal, deleteMeal, setCmid } = useMealPlanStore();
  const { id, menu, amount, kcal, menu_spec, type, unit, value } = data;
  const [showCpf, setShowCpf] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (type === "self" && showCpf) setShowCpf(false);
    else if (type === "search" && !showCpf) setShowCpf(true);
  }, [type]);
  function handleChangeValue(
    key: keyof MealType,
    targetValue:
      | string
      | number
      | { carbs: number; protein: number; fat: number }
  ) {
    const newMeal = { ...data, [key]: targetValue };
    setMeal(newMeal);
  }
  function handleSearchIconClick() {
    setCmid(id);
    router.push("/mealplan/add/division");
  }

  return (
    <div
      className={
        "w-full group bg-cusbanana dark:bg-cusdarkbanana p-2 shadow-border pb-7 " +
        (first
          ? last
            ? "rounded-2xl"
            : "rounded-t-2xl"
          : last
          ? "rounded-b-2xl"
          : "")
      }
    >
      <div className="sm:invisible sm:group-hover:visible mb-2">
        <button
          className="p-1 rounded-full bg-cuspink text-cusorange dark:bg-zinc-700"
          onClick={() => deleteMeal(id)}
        >
          <BsX size={25} />
        </button>
      </div>
      <div className="w-full">
        {/* search: button | self : input */}
        <div className="w-full flex items-center justify-between rounded-xl shadow-border bg-white dark:bg-cusdark p-3 gap-5">
          <p>{MEAL_ITEM_TITLE.menu} :</p>
          <div className="flex-1 flex items-center justify-between point-value px-3 gap-3">
            {type === "search" ? (
              <p className="flex-1" onClick={handleSearchIconClick}>
                {menu}
              </p>
            ) : (
              <input
                className="flex-1 outline-none border-b border-black dark:border-gray-500 dark:rounded-lg pl-2"
                type="text"
                value={menu}
                onChange={(e) => handleChangeValue("menu", e.target.value)}
              />
            )}
            <BsSearch onClick={handleSearchIconClick} />
          </div>
        </div>
        <div className="w-full rounded-xl shadow-border bg-white dark:bg-cusdark p-3 my-4">
          <div className="w-full flex items-center justify-between gap-5 mb-3">
            <p>{MEAL_ITEM_TITLE.weight} :</p>
            <div className="flex-1 flex items-center justify-between pr-2 point-value border-b gap-2 border-black dark:border-gray-500">
              <input
                className="flex-1 pl-2 rounded-lg focus:outline-none "
                type="number"
                value={amount.toString()}
                onChange={(e) =>
                  handleChangeValue("amount", Number(e.target.value))
                }
              />
              <p>{unit === 1 ? "g" : "ml"}</p>
            </div>
          </div>
          <div
            className={
              "w-full flex items-center gap-5 transition-all overflow-hidden " +
              (showCpf ? "h-max p-1" : "h-0")
            }
          >
            {["carbs", "protein", "fat"].map((key) => {
              const specValue = menu_spec[key as keyof typeof menu_spec];
              return (
                <CPFCard
                  key={key}
                  type={type}
                  title={MEAL_ITEM_TITLE[key as keyof typeof menu_spec]}
                  value={
                    type === "search"
                      ? value
                        ? toFixeNumberTwo((specValue / value) * amount)
                        : specValue
                      : specValue
                  }
                  handleChangeCPF={(cpfValue) => {
                    const newCPF = {
                      ...menu_spec,
                      [key]: Number(cpfValue),
                    };
                    handleChangeValue("menu_spec", newCPF);
                  }}
                />
              );
            })}
          </div>
          {type === "self" && (
            <button
              className="w-full flex items-center justify-center gap-2 mt-3 text-cusorange"
              onClick={() => setShowCpf((prev) => !prev)}
            >
              <p>{showCpf ? "탄단지 숨김" : "탄단지 입력"}</p>
              <p className={showCpf ? "-rotate-90" : "rotate-90"}>&gt;</p>
            </button>
          )}
        </div>
        {type === "search" ? (
          <p className="text-center ">
            {MEAL_ITEM_TITLE.calory}:{" "}
            {calcKcal(true, kcal, value, amount).toLocaleString()} kcal
          </p>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <input
              className="p-3 shadow-border rounded-2xl"
              type="number"
              step="0.01"
              value={kcal.toString()}
              onChange={(e) =>
                handleChangeValue("kcal", Number(e.target.value))
              }
            />
            <p>kcal</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealPlanItem;

const CPFCard = ({
  title,
  value,
  type,
  handleChangeCPF,
}: {
  title: string;
  value: number;
  type: MealItemType;
  handleChangeCPF: (value: string) => void;
}) => {
  return (
    <div className="flex-1 shadow-border rounded-xl p-4 ">
      <p className="text-center -translate-y-2">{title}</p>
      {type === "search" ? (
        <p className="text-center">{value}g</p>
      ) : (
        <div className="w-full sm:w-16 sm:mx-auto flex border-b border-black dark:border-gray-500 gap-1">
          <input
            className="w-full text-center outline-none rounded-lg"
            type="number"
            value={value.toString()}
            onChange={(e) => handleChangeCPF(e.target.value)}
          />
          <span>g</span>
        </div>
      )}
    </div>
  );
};
