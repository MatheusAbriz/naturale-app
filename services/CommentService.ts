import { API } from "@/hooks/useApi";
import { CommentDTO, CreateComment, type CreateReply, type RepliesResponse } from "@/types/comments";

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

export function getReplies(commentId: number) {
    return API.get<RepliesResponse>(`/comments/${commentId}/replies`);
}
 
export function addReply(reply: CreateReply) {
    return API.post<CommentDTO>("/comments/reply", reply);
}