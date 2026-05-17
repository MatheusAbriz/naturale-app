import { Avatar } from "@/components/avatar";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { theme } from "@/globals/theme";
import { useFooter } from "@/stores/hide-footer-store";
import { Paginated } from "@/types/pagination/PaginationTypes";
import { Posts } from "@/types/posts/PostTypes";
import { toast } from "@backpackapp-io/react-native-toast";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useDeleteLike } from "@/hooks/useDeleteLike";
import { useFavoritePost } from "@/hooks/useFavoritePost";
import { useRouter } from "expo-router";

type CardProps = {
    post: Posts;
    onOpenComments: (post: Posts) => void;
    onSuccess: (options?: RefetchOptions) => Promise<QueryObserverResult<Paginated<Posts[]>, Error>>;
}

export const PostCard = memo(function PostCard({ post, onSuccess, onOpenComments }: CardProps) {
    const showFooter = useFooter((state) => state.setFooter);
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const { mutate, isPending } = useDeleteLike();
    const { mutate: mutateFavorite, isPending: isFavoritedPending } = useFavoritePost();

    async function toggleLike() {
        try {
            mutate(post?.postId);
        } catch (e) {
            console.error(e);
            toast.error(`Erro! ${e}`);
        }
    };

    async function toggleFavorite() {
        try {
            mutateFavorite(post?.postId);
        } catch (e) {
            console.error(e);
            toast.error("Erro! Tente novamente mais tarde");
        }
    };

    function handleOpenComments() {
        showFooter(false);
        onOpenComments(post!);
    }

    return (
        <Pressable
            onPress={() => router.push(`/post/${post?.postId}`)}
        >
            <Card className="p-0 w-full mx-auto bg-[#F2F2F2] border-b border-gray-300">
                <Box className="flex-row items-center gap-3 py-3 px-3">
                    <Avatar url={post?.user?.avatar} />
                    <Heading
                        size="md"
                        style={{ flexShrink: 0, color: theme.colors.heavyBlack }}
                    >
                        {post?.user?.username ?? post?.user?.name}
                    </Heading>
                </Box>
                <Image
                    source={{
                        uri: post.image,
                    }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    style={{ width: '100%', height: 280, marginBottom: 16 }}
                />
                <Box className="flex-row items-center justify-between gap-3 px-3">
                    <Box className="flex-row gap-4 items-center">
                        <Box className="flex-row gap-2 items-center">
                            <TouchableOpacity disabled={isPending} onPress={toggleLike}>
                                <Icon name={post?.isLiked ? "heart" : "heart-outline"} size={20} color={post?.isLiked ? theme.colors.lightGreen : theme.colors.black} />
                            </TouchableOpacity>
                            <Text style={{ color: theme.colors.lightBlack }}>{post?.likes_count}</Text>
                        </Box>
                        <Box className="flex-row gap-2 items-center">
                            <TouchableOpacity onPress={handleOpenComments}>
                                <AwesomeIcon name="comment-o" size={20} color={theme.colors.black} />
                            </TouchableOpacity>
                            <Text style={{ color: theme.colors.lightBlack }}>{post?.commentCount}</Text>
                        </Box>
                    </Box>
                    <Box className="flex-row items-center">
                        <TouchableOpacity disabled={isFavoritedPending} onPress={toggleFavorite}>
                            <Icon name={post?.isFavorited ? "bookmark" : "bookmark-outline"} size={20} color={post?.isFavorited ? theme.colors.lightGreen : theme.colors.black} />
                        </TouchableOpacity>
                    </Box>
                </Box>
                <Box className="p-3">
                    <Text className="text-xl mb-2 text-typography-700 font-semibold" style={{ color: theme.colors.lightBlack }}>
                        {post?.title}
                    </Text>
                    <View className="flex-row mb-1 gap-6">
                        <View style={{ flex: 1 }}>
                            <Text
                                size="md"
                                numberOfLines={expanded ? undefined : 1}
                                style={{ lineHeight: 20, color: theme.colors.lightBlack }}
                            >
                                {post?.text}
                            </Text>

                            {!expanded && post?.text?.length > 50 && (
                                <TouchableOpacity
                                    onPress={() => setExpanded(true)}
                                >
                                    <Text
                                        className="text-sm mt-2"
                                        style={{ color: theme.colors.lightBlack }}
                                    >
                                        Ver mais...
                                    </Text>
                                </TouchableOpacity>
                            )}
                            {expanded && (
                                <TouchableOpacity
                                    onPress={() => setExpanded(false)}
                                >
                                    <Text
                                        className="text-sm mt-2"
                                        style={{ color: theme.colors.lightBlack }}
                                    >
                                        Ver menos
                                    </Text>
                                </TouchableOpacity>
                            )}
                            <Box className="flex-row items-center gap-2 mt-4">
                                <IonIcon name="timer-outline" size={16} color={theme.colors.lightBlack} />
                                <Text className="text-xs" style={{ color: theme.colors.lightBlack }}>{post?.time}</Text>
                            </Box>
                        </View>
                    </View>
                </Box>
            </Card>
        </Pressable>
    )
})