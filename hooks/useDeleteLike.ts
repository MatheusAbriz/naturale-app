import { insertLike } from "@/services/PostService";
import { useAuth } from "@/stores/auth-store";
import { useSearch } from "@/stores/search-store";
import type { Posts, PostsInfiniteCache } from "@/types/posts/PostTypes";
import { toast } from "@backpackapp-io/react-native-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLike() {
    const queryClient = useQueryClient();
    const user = useAuth((state) => state.user);
    const search = useSearch((state) => state.search);

    const updateList = (postId: number) => (oldData: PostsInfiniteCache | undefined): PostsInfiniteCache | undefined => {
        if (!oldData?.pages) return oldData;
        return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
                ...page,
                data: {
                    ...page.data,
                    data: page.data.data.map((post) => {
                        if (post.postId !== postId) return post;
                        const isLiked = !post.isLiked;
                        return { ...post, isLiked, likes_count: isLiked ? post.likes_count + 1 : post.likes_count - 1 };
                    }),
                },
            })),
        };
    };

    const updateDetail = (postId: number) => (oldData: Posts | undefined): Posts | undefined => {
        if (!oldData || oldData.postId !== postId) return oldData;
        const isLiked = !oldData.isLiked;
        return {
            ...oldData,
            isLiked,
            likes_count: isLiked ? oldData.likes_count + 1 : oldData.likes_count - 1,
        };
    };

    return useMutation({
        mutationFn: (postId: number) => insertLike(user?.id!, postId),

        onMutate: async (postId) => {
            if (!user?.id) return;

            await queryClient.cancelQueries({ queryKey: ["posts", user.id, search] });
            await queryClient.cancelQueries({ queryKey: ["favorite-posts", user.id] });
            await queryClient.cancelQueries({ queryKey: ["post", postId] });

            const prevPosts = queryClient.getQueryData<PostsInfiniteCache>(["posts", user.id, search]);
            const prevFavorites = queryClient.getQueryData<PostsInfiniteCache>(["favorite-posts", user.id]);
            const prevDetail = queryClient.getQueryData<Posts>(["post", postId]);

            queryClient.setQueryData<PostsInfiniteCache>(["posts", user.id, search], updateList(postId));
            queryClient.setQueryData<PostsInfiniteCache>(["favorite-posts", user.id], updateList(postId));
            queryClient.setQueryData<Posts>(["post", postId], updateDetail(postId));

            return { prevPosts, prevFavorites, prevDetail, postId };
        },

        onError: (err, postId, context) => {
            console.error(err);
            toast.error(`Erro! ${err}`);
            if (context?.prevPosts)
                queryClient.setQueryData<PostsInfiniteCache>(["posts", user?.id, search], context.prevPosts);
            if (context?.prevFavorites)
                queryClient.setQueryData<PostsInfiniteCache>(["favorite-posts", user?.id], context.prevFavorites);
            if (context?.prevDetail)
                queryClient.setQueryData<Posts>(["post", context.postId], context.prevDetail);
        },
    });
}