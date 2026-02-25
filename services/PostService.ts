import { API } from "@/hooks/useApi";
import { Paginated } from "@/types/pagination/PaginationTypes";
import { Posts } from "@/types/posts/PostTypes";

export function getPosts() {
    return API.get<Paginated<Posts[]>>("/posts");
}