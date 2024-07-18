import { create } from "zustand";

export interface MenuRegion {
  division: number;
  category: number;
}

interface MenuRegionStoreType {
  menuRegion: MenuRegion;
  setMenuRegion: (key: keyof MenuRegion, value: number) => void;
  reset: () => void;
}

const useMenuRegion = create<MenuRegionStoreType>((set) => ({
  menuRegion: {
    division: 0,
    category: 0,
  },
  setMenuRegion(key, value) {
    set((state) => ({
      ...state,
      menuRegion: { ...state.menuRegion, [key]: value },
    }));
  },
  reset() {
    set({
      menuRegion: {
        division: 0,
        category: 0,
      },
    });
  },
}));

export default useMenuRegion;
