import { API } from "@/hooks/useApi";
import type { UserDTO } from "@/types/auth";

export function login(data: { email: string, password: string }) {
    return API.post("/user/login", data);
}

export function register(data: UserDTO) {
    return API.post("/user", data);
}