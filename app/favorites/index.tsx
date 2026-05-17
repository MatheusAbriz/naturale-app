import { PostCard } from "@/components/card";
import Comment from "@/components/comment";
import { EmptyList } from "@/components/notFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/skeleton";
import { getFavoritesPosts } from "@/services/PostService";
import { useAuth } from "@/stores/auth-store";
import { useFooter } from "@/stores/hide-footer-store";
import { Posts } from "@/types/posts/PostTypes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "@/globals/theme";

export default function Favorites() {
    const { user } = useAuth.getState();
    const showFooter = useFooter((state) => state.setFooter);
    const [selectedPost, setSelectedPost] = useState<Posts | null>(null);

    const {
        data,
        isLoading,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["favorite-posts", user?.id],
        queryFn: ({ pageParam = 1 }) => getFavoritesPosts(user?.id!, pageParam),
        enabled: !!user,
        initialPageParam: 1,
        staleTime: 60 * 1000,
        gcTime: 15 * 60 * 1000,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.data.pagination;
            return page < totalPages ? page + 1 : undefined;
        },
    });

    const posts = data?.pages.flatMap((page) => page.data.data) ?? [];

    const handleOpenComments = useCallback((post: Posts) => {
        showFooter(false);
        setSelectedPost(post);
    }, []);

    const handleCloseComments = useCallback(() => {
        showFooter(true);
        setSelectedPost(null);
    }, []);

    return (
        <ProtectedRoute>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    style={{ width: "100%" }}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    ListEmptyComponent={!isLoading ? <EmptyList /> : null}
                    data={isLoading ? Array(6).fill({}) : posts}
                    keyExtractor={(item: Posts, index) =>
                        isLoading ? index.toString() : item?.postId?.toString()
                    }
                    renderItem={({ item }) =>
                        isLoading ? (
                            <Skeleton />
                        ) : (
                            <PostCard
                                post={item}
                                onSuccess={refetch}
                                onOpenComments={handleOpenComments}
                            />
                        )
                    }
                    refreshing={isFetching && !isFetchingNextPage}
                    onRefresh={refetch}
                    onEndReached={() => {
                        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
                    }}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isFetchingNextPage ? (
                            <View style={{ paddingVertical: 16 }}>
                                <ActivityIndicator color={theme.colors.lightGreen} />
                            </View>
                        ) : null
                    }
                />
            </SafeAreaView>
            <Comment
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={handleCloseComments}
            />
        </ProtectedRoute>
    );
}