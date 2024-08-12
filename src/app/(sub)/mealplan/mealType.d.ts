export interface MealDetailDTO {
  did: number;
  cid: number;
  fid: number;
  menu: string;
  kcal: number;
  amount: number;
  unit: string;
  carbs: number;
  protein: number;
  fat: number;
}
export interface MealPlanDetailResponse {
  type: number;
  date: string;
  menuList: Array<MealDetailDTO>;
  total: number;
}

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
