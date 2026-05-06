import { API } from "@/hooks/useApi";
import { Paginated } from "@/types/pagination/PaginationTypes";
import { Posts } from "@/types/posts/PostTypes";

export function getPosts() {
    return API.get<Paginated<Posts[]>>("/posts");
}

export function getFavoritesPosts(userId: number) {
    return API.get<Paginated<Posts[]>>(`/favorites/${userId}`)
}

export function insertLike(userId: number | string, postId: number | string) {
    return API.patch(`/posts/${postId}/like/${userId}`);
}

export function insertFavorite(userId: number | string, postId: number | string) {
    return API.patch(`/favorites/${userId}/${postId}`);
}