import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

interface LoginStore {
  login: boolean;
  setLogin: (flag: boolean) => void;
  setCheckLogin: () => void;
}

export const useAuthStore = create<LoginStore>(set => ({
  login: false,
  setLogin: (flag: boolean) => set({login: flag}),
  setCheckLogin: async () => {
    const accessToken = await AsyncStorage.getItem('ac');
    if (accessToken) {
      set({login: true});
    } else {
      set({login: false});
    }
  },
}));
