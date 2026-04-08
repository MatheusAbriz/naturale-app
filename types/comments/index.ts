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

export type CreateComment = {
    post_id: number,
    user_id: number,
    comment_text: string
};