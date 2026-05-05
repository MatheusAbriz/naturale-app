import { useAuth } from "@/stores/auth-store";
import { addComment, getComments } from "@/services/CommentService";
import { CommentDTO, CreateComment } from "@/types/comments";
import { Posts } from "@/types/posts/PostTypes";
import { toast } from "@backpackapp-io/react-native-toast";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import { Input } from "../inputs/input";
import { CommentItem } from "./comment-item";
import { CommentButton, InputArea } from "./styles";

type CommentProps = {
    post: Posts | null;
    isOpen: boolean;
    onClose: () => void;
};

export default function Comment({ post, isOpen, onClose }: CommentProps) {
    const { user } = useAuth.getState();
    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["comments", post?.postId, user?.id],
        queryFn: ({ pageParam = 1 }) => getComments(post?.postId!, pageParam),
        enabled: !!post && !!user,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { page, totalPages } = lastPage.data.pagination;
            return page < totalPages ? page + 1 : undefined;
        },
    });

    const { control, getValues, resetField } = useForm();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const comments = data?.pages.flatMap(page => page.data.msg) ?? [];
    const queryClient = useQueryClient();

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior="close"
            />
        ),
        []
    );

    async function createComment() {
        try {
            const { comment } = getValues();

            if (!comment?.trim()) return;

            const payload: CreateComment = {
                user_id: user?.id as number,
                post_id: post?.postId as number,
                comment_text: comment,
            };

            await addComment(payload);
            resetField("comment");
            toast.success("Comentário inserido com sucesso!");

            await queryClient.invalidateQueries({ queryKey: ["comments"] });
        } catch (e) {
            console.error(e);
            toast.error(e);
        }
    }

    useEffect(() => {
        if (isOpen) bottomSheetRef.current?.expand();
        else bottomSheetRef.current?.close();
    }, [isOpen]);

    const handleSheetChanges = useCallback(
        (index: number) => {
            if (index === -1 && isOpen) onClose();
        },
        [onClose, isOpen]
    );


    return (
        <BottomSheet
            style={{ zIndex: 3 }}
            ref={bottomSheetRef}
            index={-1}
            snapPoints={["45%", "80%"]}
            enablePanDownToClose={true}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: "#FFF" }}
            handleIndicatorStyle={{ backgroundColor: "#CCC", width: 40 }}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
        >
            <BottomSheetView style={{ flex: 1 }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        textAlign: "center",
                        paddingVertical: 4,
                        paddingHorizontal: 20,
                        color: "#1a1a1a",
                    }}
                >
                    Comentários
                </Text>
            </BottomSheetView>
            <BottomSheetFlatList
                style={{ flex: 1, paddingTop: 24 }}
                data={comments}
                keyExtractor={(item: CommentDTO) => item.id.toString()}
                renderItem={({ item }: any) => <CommentItem comment={item} />}
                onEndReached={() => {
                    if (hasNextPage && !isFetchingNextPage) {
                        fetchNextPage();
                    }
                }}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 70 }}
            />

            <InputArea>
                <Input
                    placeholder="Escreva um comentário..."
                    name="comment"
                    control={control}
                    autoCapitalize="none"
                    style={{ flex: 1 }}
                />
                <CommentButton title="➤" onPress={createComment} />
            </InputArea>
        </BottomSheet>
    );
}