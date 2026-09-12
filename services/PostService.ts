import { API } from "@/hooks/useApi";
import { Paginated } from "@/types/pagination/PaginationTypes";
import { Posts, type CreatePostDTO, type UpdatePostDTO } from "@/types/posts/PostTypes";

export function getPosts(page = 1, search="") {
    return API.get<Paginated<Posts[]>>(`/posts?page=${page}&search=${search}`);
}

export function getPostById(postId: number) {
    return API.get<Posts>(`/posts/${postId}`);
}

export function getFavoritesPosts(page=1) {
    return API.get<Paginated<Posts[]>>(`/favorites?page=${page}`)
}

export function insertLike(postId: number | string) {
    return API.patch(`/posts/${postId}/like`);
}

export function insertFavorite(postId: number | string) {
    return API.patch(`/favorites/${postId}`);
}

export async function createPost(data: CreatePostDTO) {
    return API.post("/posts", data);
}

export async function updatePost(postId: number, data: UpdatePostDTO) {
    return API.put(`/posts/${postId}`, data);
}

export async function deletePost(postId: number) {
    return API.delete(`/posts/${postId}`);
}