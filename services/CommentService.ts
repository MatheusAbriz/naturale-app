import { API } from "@/hooks/useApi";
import { CommentDTO, CreateComment } from "@/types/comments";

export type CommentsResponse = {
    status: boolean;
    msg: CommentDTO[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export function getComments(postId: number | string, page: number = 1) {
    return API.get<CommentsResponse>(`/comments/post/${postId}`, {
        params: { page, limit: 10 }
    });
}

export function addComment(comment: CreateComment) {
    return API.post("/comments", comment);
}