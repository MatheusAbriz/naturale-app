import { theme } from "@/globals/theme";
import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${theme.colors.white};
    justify-content: center;
    padding: 24px;
`;

export const BackButton = styled.Pressable`
    position: absolute;
    top: 48px;
    left: 16px;
    width: 38px;
    height: 38px;
    border-radius: 19px;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: 24px;
    font-weight: 700;
    color: ${theme.colors.heavyBlack};
    margin-bottom: 8px;
`;

export const Subtitle = styled.Text`
    font-size: 14px;
    color: ${theme.colors.heavyGray};
    margin-bottom: 24px;
    line-height: 20px;
`;

export const FieldWrapper = styled.View`
    gap: 6px;
    margin-bottom: 16px;
`;

export const FieldLabel = styled.Text`
    font-size: 13px;
    font-weight: 600;
    color: ${theme.colors.lightBlack};
`;

export const InputArea = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;

    border-radius: 12px;
    padding: 0 14px;
    border-width: 1px;
    border-color: ${theme.colors.lightGray};
`;

export const SubmitButton = styled.Pressable<{ disabled?: boolean }>`
    background-color: ${({ disabled }) =>
        disabled ? theme.colors.heavyGray : theme.colors.lightGreen};
    border-radius: 14px;
    padding: 16px;
    align-items: center;
    margin-top: 8px;
`;

export const SubmitButtonText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.white};
`;

export const FooterText = styled.Text`
    font-size: 14px;
    color: ${theme.colors.heavyGray};
    text-align: center;
    margin-top: 20px;
`;

export const FooterLink = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.lightGreen};
`;
