import type { AxiosResponse } from "axios";
import { UserSimpleDetails } from "../auth"

export type Posts = {
    postId: number,
    title: string,
    text: string,
    ingredients: string,
    image: string,
    time: string,
    likes_count: number,
    isLiked: boolean,
    isFavorited: boolean,
    commentCount: boolean,
    status: boolean,
    user: UserSimpleDetails
}

export type PostsCache = AxiosResponse<{
    data: Posts[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;

export type CreatePostDTO = {
    userId: number | string,
    title: string,
    text: string,
    ingredients: string,
    image: string,
    time: string,
    status: boolean
}