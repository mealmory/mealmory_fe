import { create } from "zustand";

interface UseDate {
  selectedDate: Date;
  init: () => void;
  changeDate: (newDate: Date) => void;
}

const useDate = create<UseDate>((set) => ({
  selectedDate: new Date(),
  init: () => set({ selectedDate: new Date() }),
  changeDate: (newDate) => set({ selectedDate: newDate }),
}));

export default useDate;
