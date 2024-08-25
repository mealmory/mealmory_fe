import { create } from "zustand";

export type Period = "day" | "week" | "month";

interface UseDate {
  selectedDate: Date;
  period: Period;
  init: () => void;
  changeDate: (newDate: Date) => void;
  changeTime: (hour: number, minute: number) => void;
  changeFullDate: (fullDate: Date) => void;
  changePeriod: (newPeriod: Period) => void;
  time: [number, number];
}

const useDate = create<UseDate>((set) => {
  const now = new Date();
  return {
    selectedDate: now,
    period: "day",
    time: [now.getHours(), now.getMinutes()],
    init: () => {
      const toDay = new Date();
      set({
        selectedDate: toDay,
        period: "day",
        time: [toDay.getHours(), toDay.getMinutes()],
      });
    },

    changeFullDate: (fullDate) =>
      set({
        selectedDate: fullDate,
        time: [fullDate.getHours(), fullDate.getMinutes()],
      }),

    changeDate: (newDate) => {
      set((state) => {
        const changedDate = new Date(
          newDate.getFullYear(),
          newDate.getMonth(),
          newDate.getDate(),
          state.time[0],
          state.time[1]
        );
        return { selectedDate: changedDate };
      });
    },
    changeTime: (hour, minute) =>
      set((state) => {
        const { selectedDate } = state;
        const changedDate = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          hour,
          minute
        );

        return { selectedDate: changedDate, time: [hour, minute] };
      }),
    changePeriod: (newPeriod) => set({ period: newPeriod }),
  };
});

export default useDate;
