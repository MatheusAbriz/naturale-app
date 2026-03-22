export type CommentDTO = {
    id: number;
    text: string;
    created_at: string;
    parent_comment_id: number | null;
    name: string;
    username: string;
    avatar: string;
    replies: CommentDTO[];
};