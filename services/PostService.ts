import { API } from "@/hooks/useApi";
import { Paginated } from "@/types/pagination/PaginationTypes";
import { Posts, type CreatePostDTO } from "@/types/posts/PostTypes";

export function getPosts(page = 1, search="") {
    return API.get<Paginated<Posts[]>>(`/posts?page=${page}&search=${search}`);
}

export function getPostById(postId: number, userId: number) {
    return API.get<Posts>(`/posts/${postId}/${userId}`);
}

export function getFavoritesPosts(userId: number, page=1) {
    return API.get<Paginated<Posts[]>>(`/favorites/${userId}?page=${page}`)
}

export function insertLike(userId: number | string, postId: number | string) {
    return API.patch(`/posts/${postId}/like/${userId}`);
}

export function insertFavorite(userId: number | string, postId: number | string) {
    return API.patch(`/favorites/${userId}/${postId}`);
}

export async function createPost(data: CreatePostDTO) {
    return API.post("/posts", data);
}