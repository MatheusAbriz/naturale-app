import { Posts } from "@/types/posts/PostTypes";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Avatar } from "../avatar";
import { Button } from "../buttons";
import { Box } from "../ui/box";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

type CardProps = {
    post: Posts;
}

export function PostCard({ post }: CardProps) {
    const [expanded, setExpanded] = useState(false);
    return (
    <Card className="p-0 rounded-lg w-full max-w-[360px] mx-auto my-3">
        <Image
            source={{
            uri: 'https://gluestack.github.io/public-blog-video-assets/saree.png',
            }}
            className="mb-6 h-[240px] max-w-[360px] rounded-lg"
            alt="image"
        />
        <Box className="p-5">
            <Text className="text-lg font-normal mb-2 text-typography-700">
                {post?.title}
            </Text>
            <View className="flex-row mb-6 gap-6">
                <Avatar/>
                <Heading 
                    size="md" 
                    className="mb-4"
                    style={{ flexShrink: 0 }}
                >
                    {post?.user?.username}
                </Heading>

                <View style={{ flex: 1 }}>
                    <Text 
                        size="sm"
                        numberOfLines={expanded ? undefined : 1}
                        style={{ lineHeight: 20 }}
                    >
                        {post?.text}
                    </Text>

                    {!expanded && post?.text?.length > 34 && (
                        <TouchableOpacity
                            onPress={() => setExpanded(true)}
                        >
                            <Text 
                                className="sm mt-2"
                                style={{ color: "#999" }}
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
                                className="sm mt-2"
                            >
                               Ver menos
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {/* <VStack className="mb-6 flex-row gap-x-4 ">
            </VStack> */}
            <Box className="flex-col sm:flex-row">
                <Button 
                    title="Add to cart"
                    onPress={() => console.log("Hi there")}
                />
            </Box>

        </Box>
    </Card>
    )
}