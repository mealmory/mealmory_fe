import { MEAL_ITEM_TITLE } from "@/constants/mainConstants";
import useMealPlanStore, {
  MealItemType,
  MealType,
} from "@/store/mealPlanStore";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { BsX } from "@react-icons/all-files/bs/BsX";
import { useRouter } from "next/navigation";

const MealPlanItem = ({
  data,
  first,
  last,
}: {
  data: MealType;
  first?: boolean;
  last?: boolean;
}) => {
  const { setMeal, addCPF, deleteCPF, deleteMeal } = useMealPlanStore();
  const { id, menu, weight, calory, cpfData, type, unit } = data;
  const router = useRouter();
  function handleChangeValue(
    key: keyof MealType,
    value: string | number | { carbs: number; protein: number; fat: number }
  ) {
    const newMeal = { ...data, [key]: value };
    setMeal(newMeal);
  }

  return (
    <div
      className={
        "w-full group bg-cusbanana p-2 shadow-border pb-7 " +
        (first ? "rounded-t-2xl" : last ? "rounded-b-2xl" : "")
      }
    >
      <div className="sm:invisible sm:group-hover:visible mb-2">
        <button
          className="p-1 rounded-full bg-cuspink text-cusorange"
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
              <p
                className="flex-1"
                onClick={() => router.push("/mealplan/add/division")}
              >
                {menu}
              </p>
            ) : (
              <input
                className="flex-1 outline-none border-b border-black dark:border-gray-500 "
                type="text"
                value={menu}
                onChange={(e) => handleChangeValue("menu", e.target.value)}
              />
            )}
            <BsSearch onClick={() => router.push("/mealplan/add/division")} />
          </div>
        </div>
        <div className="w-full rounded-xl shadow-border bg-white dark:bg-cusdark p-3 my-4">
          <div className="w-full flex items-center justify-between gap-5 mb-3">
            <p>{MEAL_ITEM_TITLE.weight} :</p>
            <div className="flex-1 flex items-center justify-between pr-2 point-value border-b border-black dark:border-gray-500">
              <input
                className="flex-1"
                type="number"
                value={weight}
                onChange={(e) => handleChangeValue("weight", e.target.value)}
              />
              <p>{unit === 1 ? "g" : "ml"}</p>
            </div>
          </div>
          {cpfData && (
            <div className="w-full flex items-center gap-5">
              {Object.entries(cpfData).map(([key, value]) => (
                <CPFCard
                  key={key}
                  type={type}
                  title={MEAL_ITEM_TITLE[key as keyof typeof cpfData]}
                  value={value}
                  handleChangeCPF={(cpfValue) => {
                    const newCPF = {
                      ...cpfData,
                      [key]: cpfValue,
                    };
                    handleChangeValue("cpfData", newCPF);
                  }}
                />
              ))}
            </div>
          )}
          {type === "self" && (
            <button
              className="w-full flex items-center justify-center gap-2 mt-3 text-cusorange"
              onClick={() => (cpfData ? deleteCPF(id) : addCPF(id))}
            >
              <p>{cpfData ? "탄단지 제거" : "탄단지 입력"}</p>
              <p className={cpfData ? "-rotate-90" : "rotate-90"}>&gt;</p>
            </button>
          )}
        </div>
        {type === "search" ? (
          <p className="text-center">
            {MEAL_ITEM_TITLE.calory}: {calory.toLocaleString()} kcal
          </p>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <input
              className="p-3 shadow-border rounded-2xl"
              type="number"
              value={calory}
              onChange={(e) => handleChangeValue("calory", e.target.value)}
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
        <div className="w-full sm:w-16 sm:mx-auto flex border-b border-black dark:border-gray-500">
          <input
            className="w-full text-center outline-none"
            type="number"
            value={value}
            onChange={(e) => handleChangeCPF(e.target.value)}
          />
          <span>g</span>
        </div>
      )}
    </div>
  );
};
