import { insertLike } from "@/services/PostService";
import { useAuth } from "@/stores/auth-store";
import type { Posts, PostsCache } from "@/types/posts/PostTypes";
import { toast } from "@backpackapp-io/react-native-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLike() {
    const queryClient = useQueryClient();
    const user = useAuth((state) => state.user);

    const updateList = (postId: number) => (oldData: PostsCache | undefined): PostsCache | undefined => {
        if (!oldData?.data?.data) return oldData;
        return {
            ...oldData,
            data: {
                ...oldData.data,
                data: oldData.data.data.map((post) => {
                    if (post.postId !== postId) return post;
                    const isLiked = !post.isLiked;
                    return { ...post, isLiked, likes_count: isLiked ? post.likes_count + 1 : post.likes_count - 1 };
                }),
            },
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

            await queryClient.cancelQueries({ queryKey: ["posts", user.id] });
            await queryClient.cancelQueries({ queryKey: ["favorite-posts", user.id] });
            await queryClient.cancelQueries({ queryKey: ["post", postId] });

            const prevPosts = queryClient.getQueryData<PostsCache>(["posts", user.id]);
            const prevFavorites = queryClient.getQueryData<PostsCache>(["favorite-posts", user.id]);
            const prevDetail = queryClient.getQueryData<Posts>(["post", postId]);

            queryClient.setQueryData<PostsCache>(["posts", user.id], updateList(postId));
            queryClient.setQueryData<PostsCache>(["favorite-posts", user.id], updateList(postId));
            queryClient.setQueryData<Posts>(["post", postId], updateDetail(postId));

            return { prevPosts, prevFavorites, prevDetail, postId };
        },

        onError: (err, postId, context) => {
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