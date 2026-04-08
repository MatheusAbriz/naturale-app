import { API } from "@/hooks/useApi";
import { CreateComment } from "@/types/comments";

export function getComments(postId: number | string) {
    //TODO: Tipar corretamente
    return API.get<any>(`/comments/post/${postId}`);
}

export function addComment(comment: CreateComment) {
    return API.post("/comments", comment);
}