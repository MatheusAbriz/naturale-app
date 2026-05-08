import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ChatMessage = {
    id: string;
    role: "user" | "bot";
    content: string;
    timestamp: number;
};

type ChatStore = {
    messages: ChatMessage[];
    addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
    clearHistory: () => void;
};

export const useChatStore = create<ChatStore>()(
    persist(
        (set) => ({
            messages: [],

            addMessage: (message) =>
                set((state) => ({
                    messages: [
                        ...state.messages,
                        {
                            ...message,
                            id: Date.now().toString(),
                            timestamp: Date.now(),
                        },
                    ],
                })),

            clearHistory: () => set({ messages: [] }),
        }),
        {
            name: "chat-history",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);