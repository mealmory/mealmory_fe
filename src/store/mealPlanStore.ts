import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { MealType, MealItemType, MenuDTO } from "@/app/(sub)/mealplan/mealType";

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
      type: item.did === 4 ? ("self" as MealItemType) : "search",
      id: cmid,
    }));
    set({ mealPlanList: newList });
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
