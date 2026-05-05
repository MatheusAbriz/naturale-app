import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/types/auth";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;

  signIn: (data: User) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      signIn: async (data) => {
        set({
          user: data,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);