import { Avatar } from "@/components/avatar";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { theme } from "@/globals/theme";
import { Posts } from "@/types/posts/PostTypes";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import IonIcon from "react-native-vector-icons/Ionicons";

type CardProps = {
    post: Posts;
}

export const PostCard = memo(function PostCard({ post }: CardProps) {
    const [expanded, setExpanded] = useState(false);
    return (
    <Card className="p-0 w-full mx-auto bg-[#F2F2F2] border-b border-gray-300">
        <Box className="flex-row items-center gap-3 py-3 px-3">
            <Avatar url={post?.user?.avatar}/>
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
                    <FeatherIcon name="heart" size={20} color={theme.colors.black} />
                    <Text style={{ color: theme.colors.lightBlack }}>{post?.likes_count}</Text>
                </Box>
                <Box className="flex-row gap-2 items-center">
                    <AwesomeIcon name="comment-o" size={20} color={theme.colors.black} />
                    <Text style={{ color: theme.colors.lightBlack }}>{post?.likes_count}</Text>
                </Box>
            </Box>
            <Box className="flex-row items-center">
                <FeatherIcon name="bookmark" size={20} color={theme.colors.black} /> 
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
    )
})