import { PostCard } from "@/components/card";
import Comment from "@/components/comment";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/skeleton";
import { EmptyList } from "@/components/notFound";
import { theme } from "@/globals/theme";
import { getMyProfile, getPublicProfile, getUserStats } from "@/services/AuthService";
import { getPostsByUser } from "@/services/PostService";
import { useAuth } from "@/stores/auth-store";
import { useFooter } from "@/stores/hide-footer-store";
import { UserProfile, UserSimpleDetails } from "@/types/auth";
import { Posts } from "@/types/posts/PostTypes";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    AvatarImage,
    BackButton,
    Container,
    EditButton,
    Header,
    InfoArea,
    InfoRow,
    InfoText,
    Name,
    SectionTitle,
    StatBlock,
    StatLabel,
    StatNumber,
    StatsRow,
    Username,
} from "@/styles/profile";

const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

export default function Profile() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { user } = useAuth.getState();
    const showFooter = useFooter((state) => state.setFooter);
    const [selectedPost, setSelectedPost] = useState<Posts | null>(null);
    const isOwnProfile = Number(id) === user?.id;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["profile", Number(id)],
        queryFn: async () => {
            if (isOwnProfile) {
                const res = await getMyProfile(id);
                return res.data as UserProfile;
            }
            const res = await getPublicProfile(id);
            return res.data as UserSimpleDetails;
        },
        enabled: !!id,
    });

    const { data: stats } = useQuery({
        queryKey: ["profile-stats", Number(id)],
        queryFn: async () => {
            const res = await getUserStats(id);
            return res.data;
        },
        enabled: !!id,
    });

    const {
        data: postsPages,
        isLoading: isLoadingPosts,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["user-posts", Number(id)],
        queryFn: ({ pageParam = 1 }) => getPostsByUser(id, pageParam),
        enabled: !!id,
        initialPageParam: 1,
        staleTime: 60 * 1000,
        gcTime: 15 * 60 * 1000,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.data.pagination;
            return page < totalPages ? page + 1 : undefined;
        },
    });

    const posts = postsPages?.pages.flatMap((page) => page.data.data) ?? [];

    const handleOpenComments = useCallback((post: Posts) => {
        showFooter(false);
        setSelectedPost(post);
    }, []);

    const handleCloseComments = useCallback(() => {
        showFooter(true);
        setSelectedPost(null);
    }, []);

    if (isLoading) return <Skeleton />;

    if (isError || !data) {
        return <EmptyList />;
    }

    const phone = isOwnProfile ? (data as UserProfile).phone : undefined;
    const email = isOwnProfile ? (data as UserProfile).email : undefined;

    return (
        <ProtectedRoute>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={["bottom"]}>
                <Container>
                    <BackButton onPress={() => router.back()}>
                        <IonIcon name="arrow-back" size={20} color={theme.colors.white} />
                    </BackButton>

                    {isOwnProfile && (
                        <EditButton onPress={() => router.push("/profile/edit")}>
                            <IonIcon name="create-outline" size={20} color={theme.colors.white} />
                        </EditButton>
                    )}

                    <FlatList
                        style={{ width: "100%" }}
                        contentContainerStyle={{ paddingBottom: 60 }}
                        data={isLoadingPosts ? Array(4).fill({}) : posts}
                        keyExtractor={(item: Posts, index) =>
                            isLoadingPosts ? index.toString() : item?.postId?.toString()
                        }
                        ListHeaderComponent={
                            <>
                                <Header>
                                    <AvatarImage source={{ uri: data.avatar || FALLBACK_AVATAR }} />
                                    <Name>{data.name}</Name>
                                    <Username>@{data.username}</Username>
                                </Header>

                                {isOwnProfile && (
                                    <InfoArea>
                                        {!!email && (
                                            <InfoRow>
                                                <IonIcon name="mail-outline" size={18} color={theme.colors.lightGreen} />
                                                <InfoText>{email}</InfoText>
                                            </InfoRow>
                                        )}
                                        {!!phone && (
                                            <InfoRow>
                                                <IonIcon name="call-outline" size={18} color={theme.colors.lightGreen} />
                                                <InfoText>{phone}</InfoText>
                                            </InfoRow>
                                        )}
                                    </InfoArea>
                                )}

                                <StatsRow>
                                    <StatBlock>
                                        <StatNumber>{stats?.postCount ?? 0}</StatNumber>
                                        <StatLabel>Posts</StatLabel>
                                    </StatBlock>
                                    <StatBlock>
                                        <StatNumber>{stats?.likesReceived ?? 0}</StatNumber>
                                        <StatLabel>Curtidas</StatLabel>
                                    </StatBlock>
                                    <StatBlock>
                                        <StatNumber>{stats?.commentsReceived ?? 0}</StatNumber>
                                        <StatLabel>Comentários</StatLabel>
                                    </StatBlock>
                                </StatsRow>

                                <SectionTitle>Receitas</SectionTitle>
                            </>
                        }
                        ListEmptyComponent={!isLoadingPosts ? <EmptyList /> : null}
                        renderItem={({ item }) =>
                            isLoadingPosts ? (
                                <Skeleton />
                            ) : (
                                <PostCard post={item} onOpenComments={handleOpenComments} />
                            )
                        }
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
                </Container>
            </SafeAreaView>

            <Comment
                post={selectedPost}
                isOpen={!!selectedPost}
                onClose={handleCloseComments}
            />
        </ProtectedRoute>
    );
}
