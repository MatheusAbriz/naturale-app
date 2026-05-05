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