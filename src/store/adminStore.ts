import { storageGet } from "@/utils/storageFns";
import { create } from "zustand";

interface UseAdmin {
  isAdmin: boolean;
  checkAdmin: () => void;
}

const ADMINISTRATORS = [
  process.env.NEXT_PUBLIC_JF as string,
  process.env.NEXT_PUBLIC_JB as string,
];

const useAmdin = create<UseAdmin>((set) => ({
  isAdmin: false,
  async checkAdmin() {
    const email = await storageGet("email");
    if (typeof email === "string" && ADMINISTRATORS.includes(email)) {
      set({ isAdmin: true });
    } else {
      set({ isAdmin: false });
    }
  },
}));

export default useAmdin;
