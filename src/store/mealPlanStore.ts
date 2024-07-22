import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { MenuDTO } from "@/components/main/MealplanForm";
export interface MealType {
  id: string;
  type: MealItemType;
  menu: string;
  calory: number;
  weight: number;
  unit: 1 | 0;
  cpfData?: {
    carbs: number;
    protein: number;
    fat: number;
  };
}
export type MealItemType = "search" | "self";

interface MealPlanStoreType {
  mealPlanList: Array<MealType | null>;
  reset: () => void;
  addMeal: (type: MealItemType) => void;
  setMeal: (newMeal: MealType) => void;
  deleteMeal: (id: string) => void;
  editStart: (mealList: Array<MenuDTO>) => void;
  addCPF: (id: string) => void;
  deleteCPF: (id: string) => void;
}

const useMealPlanStore = create<MealPlanStoreType>((set) => ({
  mealPlanList: [],
  reset: () => set({ mealPlanList: [] }),
  editStart: (mealList) => {
    const newList = mealList.map((item) => ({
      ...item,
      type: "self" as MealItemType,
      id: uuid(),
    }));
    set({ mealPlanList: newList });
  },
  addMeal: (type) => {
    set((state) => ({
      mealPlanList: [
        ...state.mealPlanList,
        {
          id: uuid(),
          type: type,
          menu: "",
          calory: 0,
          weight: 0,
          unit: 1,
          cpfData:
            type === "search"
              ? {
                  carbs: 0,
                  protein: 0,
                  fat: 0,
                }
              : undefined,
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
  deleteMeal: (id) => {
    set((state) => {
      const deletedList = state.mealPlanList.filter((meal) => meal?.id !== id);
      return { mealPlanList: deletedList };
    });
  },
  addCPF: (id) => {
    set((state) => {
      const newList = state.mealPlanList.map((meal) =>
        meal?.id === id && !meal.cpfData
          ? { ...meal, cpfData: { carbs: 0, protein: 0, fat: 0 } }
          : meal
      );
      return { mealPlanList: newList };
    });
  },
  deleteCPF: (id) => {
    set((state) => {
      const newList = state.mealPlanList.map((meal) => {
        if (meal?.id === id && meal.cpfData) {
          const { cpfData, ...deletedCpfMeal } = meal;
          return deletedCpfMeal;
        }
        return meal;
      });
      return { mealPlanList: newList };
    });
  },
}));

export default useMealPlanStore;
