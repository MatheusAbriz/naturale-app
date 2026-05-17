import { insertFavorite } from "@/services/PostService";
import { useAuth } from "@/stores/auth-store";
import type { Posts, PostsCache } from "@/types/posts/PostTypes";
import { toast } from "@backpackapp-io/react-native-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFavoritePost() {
    const queryClient = useQueryClient();
    const user = useAuth((state) => state.user);

    const updateHomePosts = (postId: number) => (oldData: PostsCache | undefined): PostsCache | undefined => {
        if (!oldData?.data?.data) return oldData;
        return {
            ...oldData,
            data: {
                ...oldData.data,
                data: oldData.data.data.map((post) => {
                    if (post.postId !== postId) return post;
                    return { ...post, isFavorited: !post.isFavorited };
                }),
            },
        };
    };

    const updateFavoritePosts = (postId: number) => (oldData: PostsCache | undefined): PostsCache | undefined => {
        if (!oldData?.data?.data) return oldData;

        const list = oldData.data.data;
        const alreadyFavorited = list.some((post) => post.postId === postId);

        let updated: Posts[];
        if (alreadyFavorited) {
            updated = list.filter((post) => post.postId !== postId);
        } else {
            const homePosts = queryClient.getQueryData<PostsCache>(["posts", user?.id]);
            const postToAdd = homePosts?.data?.data.find((post) => post.postId === postId);
            if (!postToAdd) return oldData;
            updated = [{ ...postToAdd, isFavorited: true }, ...list];
        }

        return { ...oldData, data: { ...oldData.data, data: updated } };
    };

    const updateDetail = (postId: number) => (oldData: Posts | undefined): Posts | undefined => {
        if (!oldData || oldData.postId !== postId) return oldData;
        return { ...oldData, isFavorited: !oldData.isFavorited };
    };

    return useMutation({
        mutationFn: (postId: number) => insertFavorite(user?.id!, postId),

        onMutate: async (postId) => {
            if (!user?.id) return;

            await queryClient.cancelQueries({ queryKey: ["posts", user.id] });
            await queryClient.cancelQueries({ queryKey: ["favorite-posts", user.id] });
            await queryClient.cancelQueries({ queryKey: ["post", postId] });

            const prevPosts = queryClient.getQueryData<PostsCache>(["posts", user.id]);
            const prevFavorites = queryClient.getQueryData<PostsCache>(["favorite-posts", user.id]);
            const prevDetail = queryClient.getQueryData<Posts>(["post", postId]);

            queryClient.setQueryData<PostsCache>(["posts", user.id], updateHomePosts(postId));
            queryClient.setQueryData<PostsCache>(["favorite-posts", user.id], updateFavoritePosts(postId));
            queryClient.setQueryData<Posts>(["post", postId], updateDetail(postId));

            return { prevPosts, prevFavorites, prevDetail, postId };
        },

        onError: (err, _postId, context) => {
            console.error(err);
            toast.error(`Erro! ${err}`);
            if (context?.prevPosts)
                queryClient.setQueryData<PostsCache>(["posts", user?.id], context.prevPosts);
            if (context?.prevFavorites)
                queryClient.setQueryData<PostsCache>(["favorite-posts", user?.id], context.prevFavorites);
            if (context?.prevDetail)
                queryClient.setQueryData<Posts>(["post", context.postId], context.prevDetail);
        },
    });
}