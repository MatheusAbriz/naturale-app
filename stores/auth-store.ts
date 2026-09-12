import { Platform } from "react-native";
import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { User } from "@/types/auth";

const secureStorage: StateStorage = {
  getItem: (name) => SecureStore.getItemAsync(name),
  setItem: (name, value) => SecureStore.setItemAsync(name, value),
  removeItem: (name) => SecureStore.deleteItemAsync(name),
};

const authStorage = Platform.OS === "web" ? AsyncStorage : secureStorage;

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;

  signIn: (data: User) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      signIn: async (data) => {
        set({
          user: data,
          isAuthenticated: true,
        });
      },

      updateUser: (data) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...data } });
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
      storage: createJSONStorage(() => authStorage),
    }
  )
);