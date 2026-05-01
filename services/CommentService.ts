import { API } from "@/hooks/useApi";
import { CreateComment } from "@/types/comments";

export function getComments(postId: number | string, page: number = 0) {
    //TODO: Tipar corretamente
    return API.get<any>(`/comments/post/${postId}/${page}`);
}

export function addComment(comment: CreateComment) {
    return API.post("/comments", comment);
}