import { insertLike } from "@/services/PostService";
import { useAuth } from "@/stores/auth-store";
import type { Paginated } from "@/types/pagination/PaginationTypes";
import type { Posts } from "@/types/posts/PostTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLike() {
    const queryClient = useQueryClient();
    const user = useAuth((state) => state.user);

    const updatePosts = (postId: number) => (oldData: Paginated<Posts[]>) => {
        if (!oldData) return oldData;

        const list = oldData?.data ?? [];

        const updated = list.map((post: Posts) => {
            if (post.postId !== postId) return post;

            const isLiked = !post.isLiked;

            return {
                ...post,
                isLiked,
                likes_count: isLiked ? post.likes_count + 1 : post.likes_count - 1,
            };
        });

        if (oldData?.data) return { ...oldData, data: updated };
        return updated;
    };

    return useMutation({
        mutationFn: (postId: number) => insertLike(user?.id!, postId),
        onMutate: async (postId) => {
            if (!user?.id) return;

            await queryClient.cancelQueries({ queryKey: ["posts", user.id] });
            await queryClient.cancelQueries({ queryKey: ["favorite-posts", user.id] });

            const prevPosts = queryClient.getQueryData(["posts", user.id]);
            const prevFavorites = queryClient.getQueryData(["favorite-posts", user.id]);

            queryClient.setQueryData(["posts", user.id], updatePosts(postId));
            queryClient.setQueryData(["favorite-posts", user.id], updatePosts(postId));

            return { prevPosts, prevFavorites };
        },
        onError: (_err, _postId, context) => {
            if (context?.prevPosts)
                queryClient.setQueryData(["posts", user?.id], context.prevPosts);
            if (context?.prevFavorites)
                queryClient.setQueryData(["favorite-posts", user?.id], context.prevFavorites);
        },
    });
}