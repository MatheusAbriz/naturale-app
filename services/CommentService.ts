import { API } from "@/hooks/useApi";

export function getComments(postId: number | string) {
    //TODO: Tipar corretamente
    return API.get<any>(`/comments/post/${postId}`);
}