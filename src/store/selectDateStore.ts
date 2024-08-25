import { create } from "zustand";

export type Period = "day" | "week" | "month";

interface UseDate {
  selectedDate: Date;
  period: Period;
  init: () => void;
  changeDate: (newDate: Date) => void;
  changePeriod: (newPeriod: Period) => void;
}

const useDate = create<UseDate>((set) => ({
  selectedDate: new Date(),
  period: "day",
  init: () => set({ selectedDate: new Date(), period: "day" }),
  changeDate: (newDate) => set({ selectedDate: newDate }),
  changePeriod: (newPeriod) => set({ period: newPeriod }),
}));

export default useDate;
