import { Avatar } from "@/components/avatar";
import Comment from "@/components/comment";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/skeleton";
import { theme } from "@/globals/theme";
import { deletePost, getPostById } from "@/services/PostService";
import { useAuth } from "@/stores/auth-store";
import { useFooter } from "@/stores/hide-footer-store";
import { Posts } from "@/types/posts/PostTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import { toast } from "@backpackapp-io/react-native-toast";
import { useDeleteLike } from "@/hooks/useDeleteLike";
import { useFavoritePost } from "@/hooks/useFavoritePost";
import {
    ActionGroup,
    ActionItem,
    ActionText,
    ActionsRow,
    AuthorName,
    AuthorRow,
    AuthorUsername,
    BackButton,
    CommentsBadge,
    CommentsBadgeText,
    CommentsButton,
    CommentsButtonLeft,
    CommentsButtonText,
    Container,
    Content,
    DescriptionText,
    Divider,
    ErrorText,
    Header,
    HeroImage,
    IngredientBullet,
    IngredientItem,
    IngredientsList,
    IngredientText,
    MetaRow,
    MetaText,
    OwnerActionButton,
    OwnerActionsRow,
    SectionTitle,
    Title,
    TitleRow,
} from "@/styles/post";
import { EmptyList } from "@/components/notFound";

export default function PostDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { user } = useAuth.getState();
    const showFooter = useFooter((state) => state.setFooter);
    const [commentOpen, setCommentOpen] = useState(false);
    const { mutate: mutateLike } = useDeleteLike();
    const { mutate: mutateFavorite } = useFavoritePost();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", Number(id)],
        queryFn: async () => {
            const res = await getPostById(Number(id));
            return res.data as Posts;
        },
        enabled: !!id && !!user?.id,
    });

    const isOwner = !!data && data.user?.id === user?.id;

    function toggleLike() {
        mutateLike(data?.postId!);
    }

    function toggleFavorite() {
        mutateFavorite(data?.postId!);
    }

    function goToAuthorProfile() {
        if (data?.user?.id) router.push(`/profile/${data.user.id}`);
    }

    function handleEditPost() {
        router.push({ pathname: "/postForm", params: { postId: String(data?.postId) } });
    }

    function handleDeletePost() {
        Alert.alert(
            "Excluir receita",
            "Tem certeza que deseja excluir esta receita? Essa ação não pode ser desfeita.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deletePost(data!.postId);
                            await queryClient.invalidateQueries({ queryKey: ["posts", user?.id] });
                            toast.success("Post excluído com sucesso!");
                            router.back();
                        } catch (e) {
                            console.error(e);
                            toast.error("Erro ao excluir post. Tente novamente.");
                        }
                    },
                },
            ]
        );
    }

    const handleOpenComments = useCallback(() => {
        showFooter(false);
        setCommentOpen(true);
    }, []);

    const handleCloseComments = useCallback(() => {
        showFooter(true);
        setCommentOpen(false);
    }, []);

    const ingredients = data?.ingredients
        ? data?.ingredients.split(",").map((i: string) => i.trim()).filter(Boolean)
        : [];

    if (isLoading) return <Skeleton />;

    if (isError || !data) {
        return (
            <EmptyList />
        );
    }

    return (
        <ProtectedRoute>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white, paddingBottom: 40 }} edges={["bottom"]}>

                <BackButton onPress={() => router.back()}>
                    <IonIcon name="arrow-back" size={20} color={theme.colors.white} />
                </BackButton>

                <Container showsVerticalScrollIndicator={false}>
                    <HeroImage source={{ uri: data?.image }} resizeMode="cover" />

                    <Content>
                        <Header>
                            <TitleRow>
                                <Title style={{ flex: 1 }}>{data?.title}</Title>

                                {isOwner && (
                                    <OwnerActionsRow>
                                        <OwnerActionButton onPress={handleEditPost}>
                                            <IonIcon name="pencil-outline" size={16} color={theme.colors.lightBlack} />
                                        </OwnerActionButton>
                                        <OwnerActionButton onPress={handleDeletePost}>
                                            <IonIcon name="trash-outline" size={16} color={theme.colors.orange} />
                                        </OwnerActionButton>
                                    </OwnerActionsRow>
                                )}
                            </TitleRow>

                            <AuthorRow onPress={goToAuthorProfile}>
                                <Avatar url={data?.user?.avatar} />
                                <View>
                                    <AuthorName>{data?.user?.name}</AuthorName>
                                    <AuthorUsername>@{data?.user?.username}</AuthorUsername>
                                </View>
                            </AuthorRow>

                            <MetaRow>
                                <IonIcon name="timer-outline" size={14} color={theme.colors.heavyGray} />
                                <MetaText>{data?.time}</MetaText>
                            </MetaRow>
                        </Header>

                        <Divider />

                        <ActionsRow>
                            <ActionGroup>
                                <ActionItem>
                                    <TouchableOpacity onPress={toggleLike}>
                                        <IonIcon
                                            name={data?.isLiked ? "heart" : "heart-outline"}
                                            size={22}
                                            color={data?.isLiked ? theme.colors.lightGreen : theme.colors.black}
                                        />
                                    </TouchableOpacity>
                                    <ActionText>{data?.likes_count}</ActionText>
                                </ActionItem>

                                <ActionItem>
                                    {/* <TouchableOpacity onPress={handleOpenComments}> */}
                                    <AwesomeIcon name="comment-o" size={20} color={theme.colors.black} />
                                    {/* </TouchableOpacity> */}
                                    <ActionText>{data?.commentCount ?? 0}</ActionText>
                                </ActionItem>
                            </ActionGroup>

                            <TouchableOpacity onPress={toggleFavorite}>
                                <IonIcon
                                    name={data?.isFavorited ? "bookmark" : "bookmark-outline"}
                                    size={22}
                                    color={data?.isFavorited ? theme.colors.lightGreen : theme.colors.black}
                                />
                            </TouchableOpacity>
                        </ActionsRow>

                        <Divider />

                        <View>
                            <SectionTitle>Descrição</SectionTitle>
                            <DescriptionText>{data?.text}</DescriptionText>
                        </View>

                        <Divider />

                        {ingredients.length > 0 && (
                            <View>
                                <SectionTitle>Ingredientes</SectionTitle>
                                <IngredientsList>
                                    {ingredients.map((ingredient: string, index: number) => (
                                        <IngredientItem key={index}>
                                            <IngredientBullet />
                                            <IngredientText>{ingredient}</IngredientText>
                                        </IngredientItem>
                                    ))}
                                </IngredientsList>
                            </View>
                        )}

                        <Divider />

                        <CommentsButton onPress={handleOpenComments}>
                            <CommentsButtonLeft>
                                <IonIcon name="chatbubble-outline" size={18} color={theme.colors.lightBlack} />
                                <CommentsButtonText>Ver comentários</CommentsButtonText>
                            </CommentsButtonLeft>
                            <CommentsBadge>
                                <CommentsBadgeText>{data?.commentCount ?? 0}</CommentsBadgeText>
                            </CommentsBadge>
                        </CommentsButton>

                    </Content>
                </Container>

                <Comment
                    post={data}
                    isOpen={commentOpen}
                    onClose={handleCloseComments}
                />

            </SafeAreaView>
        </ProtectedRoute>
    );
}