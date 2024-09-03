export type CharName = "보통" | "과식" | "소식";

export interface StatisticsData {
  rank: {
    [key: number]: CharName;
  };
  cpfGraph: {
    carbs: number;
    protein: number;
    fat: number;
    calory: number;
  };
  dailyGraph: {
    [key: string]: number;
  };
}

export type CPFKey = "carbs" | "protein" | "fat" | "calory";
