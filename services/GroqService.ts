import { API } from "@/hooks/useApi";

export const callGroq = async (userInput: string): Promise<string> => {
    const res = await API.post<{ reply: string }>("/chatbot", { message: userInput });

    return res.data.reply;
};
