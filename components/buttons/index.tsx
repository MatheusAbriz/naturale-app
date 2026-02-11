import { ButtonContainer, ButtonText, MyButton } from "@/globals/buttons";
import React from "react";

type ButtonProps = {
    title: string,
    onPress: () => void;
} & React.ComponentProps<typeof MyButton>;

export function Button({ title, onPress }: ButtonProps) {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonText>{title}</ButtonText>
        </ButtonContainer>
    )
}