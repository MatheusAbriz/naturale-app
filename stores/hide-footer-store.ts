import { create } from "zustand";

type FooterState = {
    footer: boolean;
    setFooter: (value: boolean) => void;
}

export const useFooter = create<FooterState>((set) => ({
    footer: true,
    setFooter: (value: boolean) => set({ footer: value }),
}));