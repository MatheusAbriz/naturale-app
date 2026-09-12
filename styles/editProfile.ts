import { theme } from "@/globals/theme";
import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${theme.colors.white};
`;

export const ScrollArea = styled.ScrollView`
    flex: 1;
`;

export const BackButton = styled.Pressable`
    padding: 16px;
`;

export const HeroArea = styled.View`
    align-items: center;
    padding: 8px 24px 24px;
    gap: 16px;
`;

export const AvatarWrapper = styled.Pressable`
    align-items: center;
    justify-content: center;
`;

export const AvatarImage = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 44px;
    border-width: 3px;
    border-color: ${theme.colors.lightGray};
`;

export const AvatarEditBadge = styled.View`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 26px;
    height: 26px;
    border-radius: 13px;
    background-color: ${theme.colors.orange};
    align-items: center;
    justify-content: center;
`;

export const FormArea = styled.View`
    padding: 8px 24px 40px;
    gap: 4px;
`;

export const SectionLabel = styled.Text`
    font-size: 12px;
    font-weight: 700;
    color: ${theme.colors.heavyGray};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    margin-top: 16px;
`;

export const FieldWrapper = styled.View`
    gap: 6px;
    margin-bottom: 12px;
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

export const Divider = styled.View`
    height: 1px;
    background-color: ${theme.colors.lightGray};
    margin: 4px 0 4px;
`;

export const SaveButton = styled.Pressable<{ disabled?: boolean }>`
    background-color: ${({ disabled }) =>
        disabled ? theme.colors.heavyGray : theme.colors.lightGreen};
    border-radius: 14px;
    padding: 16px;
    align-items: center;
    margin-top: 16px;
`;

export const SaveButtonText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.white};
`;
