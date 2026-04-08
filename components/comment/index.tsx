import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { addComment, getComments } from "@/services/CommentService";
import { useLoader } from "@/stores/loader-store";
import { CommentDTO, CreateComment } from "@/types/comments";
import { Posts } from "@/types/posts/PostTypes";
import { toast } from "@backpackapp-io/react-native-toast";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
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
    const { user } = useAuth();
    const { setLoading } = useLoader();
    const { data: comments, refetch } = useApi({
        queryKey: ["comments", post?.post_id, user?.id],
        queryFn: () => getComments(post?.post_id!),
        enabled: !!post && !!user,
    });
    const { control, getValues, resetField } = useForm();
    const bottomSheetRef = useRef<BottomSheet>(null);

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
                post_id: post?.post_id as number,
                comment_text: comment,
            };

            await addComment(payload);
            resetField("comment");
            toast.success("Comentário inserido com sucesso!");

            await refetch();
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
            <BottomSheetView>
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
                    data={(comments?.msg as CommentDTO[]) ?? []}
                    keyExtractor={(item: CommentDTO) => item.id.toString()}
                    renderItem={({ item }: any) => <CommentItem comment={item} />}
                    showsVerticalScrollIndicator={false}
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