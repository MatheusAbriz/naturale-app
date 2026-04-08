import { create } from "zustand";

type LoaderState = {
    loading: boolean,
    setLoading: (value: boolean) => void;
}

export const useLoader = create<LoaderState>((set) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value })
}))