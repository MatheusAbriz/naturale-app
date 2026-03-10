import { Posts } from "@/types/posts/PostTypes";
import { useState } from "react";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem, ActionsheetItemText } from "../ui/actionsheet";

//TODO: Continuar a implementação do post daqui
type CommentProps = {
    post: Posts,
}

export default function Comment({ post }: CommentProps) {
    const [showAction, setShowAction] = useState(false);
    return (
        <Actionsheet isOpen={showAction} onClose={() => setShowAction(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <ActionsheetItem onPress={() => setShowAction(false)}>
            <ActionsheetItemText>Edit Message</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={() => setShowAction(false)}>
            <ActionsheetItemText>Mark Unread</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={() => setShowAction(false)}>
            <ActionsheetItemText>Remind Me</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem onPress={() => setShowAction(false)}>
            <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
        </ActionsheetItem>
        <ActionsheetItem isDisabled onPress={() => setShowAction(false)}>
            <ActionsheetItemText>Delete</ActionsheetItemText>
        </ActionsheetItem>
        </ActionsheetContent>
    </Actionsheet>
    )
}