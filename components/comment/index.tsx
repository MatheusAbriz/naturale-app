import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { getComments } from "@/services/CommentService";
import { Posts } from "@/types/posts/PostTypes";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FlatList, Text } from "react-native";
import { Input } from "../inputs/input";
import { CommentItem } from "./comment-item";
import { InputArea } from "./styles";

type CommentProps = {
    post: Posts | null,
    isOpen: boolean,
    onClose: () => void
}

export default function Comment({ post, isOpen, onClose }: CommentProps) {
    const { user } = useAuth();
    const { data: comments } = useApi({
        queryKey: ["comments", post?.post_id, user?.id],
        queryFn: () => getComments(post?.post_id!),
        enabled: !!post && !!user
    });
    const { control } = useForm();

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

    useEffect(() => {
        if (isOpen) bottomSheetRef.current?.expand();
        else bottomSheetRef.current?.close();
    }, [isOpen]);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);

    return (
        <BottomSheet
            style={{ zIndex: 3, flex: 1 }}
            ref={bottomSheetRef}
            index={-1} 
            snapPoints={['40%', '50%']} 
            enablePanDownToClose={true} 
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: '#FFF' }} 
            handleIndicatorStyle={{ backgroundColor: '#CCC', width: 40 }} 
        >
            <BottomSheetView className="flex-1 px-5 pt-3">
                <Text className="text-xl mb-2 text-typography-700 font-semibold">
                    Comentários
                </Text>

                <FlatList
                    data={comments?.msg as any ?? []}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CommentItem comment={item} />}
                    showsVerticalScrollIndicator={false}
                />

                <InputArea>
                    <Input 
                        placeholder="Escreva um comentário..."
                        name="comment"
                        control={control}
                        autoCapitalize="none"
                    />
                </InputArea>
            </BottomSheetView>
        </BottomSheet>
    );
}