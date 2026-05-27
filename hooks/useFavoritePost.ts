import { insertFavorite } from "@/services/PostService";
import { useAuth } from "@/stores/auth-store";
import { useSearch } from "@/stores/search-store";
import type { Posts, PostsInfiniteCache } from "@/types/posts/PostTypes";
import { toast } from "@backpackapp-io/react-native-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useFavoritePost() {
    const queryClient = useQueryClient();
    const user = useAuth((state) => state.user);
    const search = useSearch((state) => state.search);

    const updateHomePosts = (postId: number) => (oldData: PostsInfiniteCache | undefined): PostsInfiniteCache | undefined => {
        if (!oldData?.pages) return oldData;
        return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
                ...page,
                data: {
                    ...page.data,
                    data: page.data.data.map((post) => {
                        if (post.postId !== postId) return post;
                        return { ...post, isFavorited: !post.isFavorited };
                    }),
                },
            })),
        };
    };

    const updateFavoritePosts = (postId: number) => (oldData: PostsInfiniteCache | undefined): PostsInfiniteCache | undefined => {
        if (!oldData?.pages) return oldData;

        const alreadyFavorited = oldData.pages.some((page) =>
            page.data.data.some((post) => post.postId === postId)
        );

        if (alreadyFavorited) {
            // Remove o post de todas as páginas
            return {
                ...oldData,
                pages: oldData.pages.map((page) => ({
                    ...page,
                    data: {
                        ...page.data,
                        data: page.data.data.filter((post) => post.postId !== postId),
                    },
                })),
            };
        } else {
            const homePosts = queryClient.getQueryData<PostsInfiniteCache>(["posts", user?.id, search]);
            const postToAdd = homePosts?.pages
                .flatMap((page) => page.data.data)
                .find((post) => post.postId === postId);

            if (!postToAdd) return oldData;

            return {
                ...oldData,
                pages: oldData.pages.map((page, index) => {
                    if (index !== 0) return page;
                    return {
                        ...page,
                        data: {
                            ...page.data,
                            data: [{ ...postToAdd, isFavorited: true }, ...page.data.data],
                        },
                    };
                }),
            };
        }
    };

    const updateDetail = (postId: number) => (oldData: Posts | undefined): Posts | undefined => {
        if (!oldData || oldData.postId !== postId) return oldData;
        return { ...oldData, isFavorited: !oldData.isFavorited };
    };

    return useMutation({
        mutationFn: (postId: number) => insertFavorite(user?.id!, postId),

        onMutate: async (postId) => {
            if (!user?.id) return;

            await queryClient.cancelQueries({ queryKey: ["posts", user.id, search] });
            await queryClient.cancelQueries({ queryKey: ["favorite-posts", user.id] });
            await queryClient.cancelQueries({ queryKey: ["post", postId] });

            const prevPosts = queryClient.getQueryData<PostsInfiniteCache>(["posts", user.id, search]);
            const prevFavorites = queryClient.getQueryData<PostsInfiniteCache>(["favorite-posts", user.id]);
            const prevDetail = queryClient.getQueryData<Posts>(["post", postId]);

            queryClient.setQueryData<PostsInfiniteCache>(["posts", user.id, search], updateHomePosts(postId));
            queryClient.setQueryData<PostsInfiniteCache>(["favorite-posts", user.id], updateFavoritePosts(postId));
            queryClient.setQueryData<Posts>(["post", postId], updateDetail(postId));

            return { prevPosts, prevFavorites, prevDetail, postId };
        },

        onError: (err, _postId, context) => {
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