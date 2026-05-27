import { create } from "zustand";

type SearchStore = {
  search: string;
  setSearch: (value: string) => void;
  clearSearch: () => void;
};

export const useSearch = create<SearchStore>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
  clearSearch: () => set({ search: "" }),
}));