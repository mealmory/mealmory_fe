import { create } from "zustand";
import { v4 as uuid } from "uuid";

export interface MenuDTO {
  did: number;
  cid: number;
  fid: number;
  menu: string;
  kcal: number;
  amount: number;
  unit: 1 | 0;
  menu_spec: {
    carbs: number;
    protein: number;
    fat: number;
  };
  value: number;
}

export interface MealType extends MenuDTO {
  // client identifier
  id: string;
  type: MealItemType;
}
export type MealItemType = "search" | "self";

interface MealPlanStoreType {
  mealPlanList: Array<MealType>;
  cmid: string;
  setCmid: (cmid: string) => void;
  reset: () => void;
  addMeal: (newMeal: { type: MealItemType } & Partial<MenuDTO>) => void;
  setMeal: (newMeal: MealType) => void;
  deleteMeal: (cmid: string) => void;
  editStart: (mealList: Array<MenuDTO>) => void;
}

const useMealPlanStore = create<MealPlanStoreType>((set) => ({
  mealPlanList: [],
  cmid: "",
  setCmid: (cmid) => set({ cmid: cmid }),
  reset: () => set({ mealPlanList: [] }),
  editStart: (mealList) => {
    const cmid = uuid();
    const newList = mealList.map((item) => ({
      ...item,
      type: "self" as MealItemType,
      id: cmid,
    }));
    set({ mealPlanList: newList, cmid });
  },
  addMeal: (newMeal) => {
    const cmid = uuid();
    const { type, did, cid, fid, menu, kcal, amount, unit, menu_spec, value } =
      newMeal;
    set((state) => ({
      mealPlanList: [
        ...state.mealPlanList,
        {
          id: cmid,
          type: type,
          did: did ?? 0,
          cid: cid ?? 0,
          fid: fid ?? 0,
          menu: menu ?? "",
          kcal: kcal ?? 0,
          amount: amount ?? 0,
          unit: unit ?? 1,
          menu_spec: {
            carbs: menu_spec?.carbs ?? 0,
            protein: menu_spec?.protein ?? 0,
            fat: menu_spec?.fat ?? 0,
          },
          value: value ?? 0,
        },
      ],
    }));
  },
  setMeal: (newMeal) => {
    set((state) => {
      const newList = state.mealPlanList.map((meal) =>
        meal?.id === newMeal.id ? newMeal : meal
      );
      return { mealPlanList: newList };
    });
  },
  deleteMeal: (cmid) => {
    set((state) => {
      const deletedList = state.mealPlanList.filter(
        (meal) => meal?.id !== cmid
      );
      return { mealPlanList: deletedList };
    });
  },
}));

export default useMealPlanStore;

export function toFixeNumberTwo(num: number) {
  return +num.toFixed(2);
}
