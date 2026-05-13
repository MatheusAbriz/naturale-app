import axios from "axios";
import Constants from "expo-constants";

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

export const callGroq = async (userInput: string): Promise<string> => {
    const res = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
            model: "openai/gpt-oss-20b",
            messages: [
                {
                    role: "system",
                    content: "Você é um assistente culinário. Lembre de limitar suas respostas a mais ou menos 500 caracteres. Não corte a mensagem no meio. Ao invés disso, faça-a caber em 500 caracteres.",
                },
                { role: "user", content: userInput },
            ],
            temperature: 0.7,
        },
        {
            headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json",
            },
        }
    );

    return res.data.choices[0].message.content;
};