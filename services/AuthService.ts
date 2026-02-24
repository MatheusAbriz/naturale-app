import { API } from "@/hooks/useApi";

export function login(data: { email: string, password: string }) {
    return API.post("/user/login", data);
}