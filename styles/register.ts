import { theme } from "@/globals/theme";
import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${theme.colors.white};
`;

export const ScrollArea = styled.ScrollView`
    flex: 1;
`;

export const HeroArea = styled.View`
    width: 100%;
    background-color: ${theme.colors.lightGreen};
    align-items: center;
    padding: 48px 24px 32px;
    gap: 16px;
`;

export const HeroTitle = styled.Text`
    font-size: 26px;
    font-weight: 700;
    color: ${theme.colors.white};
`;

export const HeroSubtitle = styled.Text`
    font-size: 14px;
    color: ${theme.colors.states.activeBackground};
    margin-top: -8px;
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
    border-color: ${theme.colors.white};
`;

export const AvatarPlaceholder = styled.View`
    width: 88px;
    height: 88px;
    border-radius: 44px;
    background-color: rgba(255,255,255,0.2);
    border-width: 3px;
    border-color: ${theme.colors.white};
    align-items: center;
    justify-content: center;
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
    padding: 28px 24px 40px;
    gap: 4px;
`;

export const SectionLabel = styled.Text`
    font-size: 12px;
    font-weight: 700;
    color: ${theme.colors.heavyGray};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 12px;
    margin-top: 8px;
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
    margin: 0 16px;
`;

export const RegisterButton = styled.Pressable<{ disabled?: boolean }>`
    background-color: ${({ disabled }) =>
        disabled ? theme.colors.heavyGray : theme.colors.lightGreen};
    border-radius: 14px;
    padding: 16px;
    align-items: center;
    margin-top: 12px;
    margin-bottom: 16px;
`;

export const RegisterButtonText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.white};
`;

export const FooterText = styled.Text`
    font-size: 14px;
    color: ${theme.colors.heavyGray};
    text-align: center;
`;

export const FooterLink = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.lightGreen};
`;