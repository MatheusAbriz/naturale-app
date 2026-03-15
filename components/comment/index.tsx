import { Posts } from "@/types/posts/PostTypes";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";

type CommentProps = {
    post: Posts | null,
    isOpen: boolean,
    onClose: () => void
}

export default function Comment({ post, isOpen, onClose }: CommentProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (isOpen) bottomSheetRef.current?.expand();
        else bottomSheetRef.current?.close();
    }, [isOpen]);

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

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            onClose();
        }
    }, [onClose]);

    return (
        <BottomSheet
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
                <TouchableOpacity className="py-4 border-b border-[#F0F0F0]" onPress={onClose}>
                    <Text className="text-base text-[#333333] font-medium">Edit Message</Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="py-4 border-b border-[#F0F0F0]" onPress={onClose}>
                    <Text className="text-base text-[#333333] font-medium">Mark Unread</Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="py-4 border-b border-[#F0F0F0]" onPress={onClose}>
                    <Text className="text-base text-[#333333] font-medium">Remind Me</Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="py-4 border-b border-[#F0F0F0]" onPress={onClose}>
                    <Text className="text-base text-[#333333] font-medium">Add to Saved Items</Text>
                </TouchableOpacity>                
                
                <TouchableOpacity className="py-4 border-b-0 mt-2" onPress={onClose}>
                    <Text className="text-base text-[#FF3B30] font-medium">Delete</Text>
                </TouchableOpacity>

            </BottomSheetView>
        </BottomSheet>
    );
}