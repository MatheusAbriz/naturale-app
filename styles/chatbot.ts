import { theme } from "@/globals/theme";
import styled from "styled-components/native";
import { Animated } from "react-native";

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.lightWhite};
`;

export const ChatContent = styled.View`
    padding: 16px;
    gap: 12px;
`;

export const WelcomeContainer = styled.View`
    align-items: center;
    gap: 12px;
    padding: 0 32px;
`;

export const WelcomeAvatar = styled.View`
    width: 72px;
    height: 72px;
    border-radius: 36px;
    background-color: ${theme.colors.lightGreen};
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
`;

export const WelcomeTitle = styled.Text`
    font-size: 18px;
    font-weight: 600;
    color: ${theme.colors.lightBlack};
    text-align: center;
`;

export const WelcomeSubtitle = styled.Text`
    font-size: 14px;
    color: ${theme.colors.heavyGray};
    text-align: center;
    line-height: 20px;
`;

export const UserRow = styled.View`
    align-items: flex-end;
    margin: 0 4px;
`;

export const UserBubble = styled.View`
    background-color: ${theme.colors.lightGreen};
    border-radius: 20px;
    border-top-right-radius: 6px;
    padding: 10px 16px;
    max-width: 78%;
`;

export const UserText = styled.Text`
    color: ${theme.colors.white};
    font-size: 15px;
    line-height: 22px;
`;

export const BotRow = styled.View`
    flex-direction: row;
    align-items: flex-end;
    gap: 8px;
    margin: 0 4px;
`;

export const BotAvatar = styled.View`
    width: 28px;
    height: 28px;
    border-radius: 14px;
    background-color: ${theme.colors.orange};
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const BotBubble = styled.View`
    background-color: #E9E9EB;
    border-radius: 20px;
    border-top-left-radius: 6px;
    padding: 10px 16px;
    max-width: 78%;
`;

export const BotText = styled.Text`
    color: ${theme.colors.black};
    font-size: 15px;
    line-height: 22px;
`;

export const TypingBubble = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: #E9E9EB;
    border-radius: 20px;
    border-top-left-radius: 6px;
    padding: 16px 12px;
    gap: 4px;
`;

export const TypingDot = styled(Animated.View)`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #999;
`;

export const InputArea = styled.View`
    background-color: ${theme.colors.white};
    border-top-width: 1px;
    border-top-color: #E0E0E0;
    padding: 12px 16px 76px 16px;
`;

export const InputRow = styled.View`
    flex-direction: row;
    align-items: flex-end;
    gap: 10px;
`;

export const StyledTextInput = styled.TextInput`
    flex: 1;
    background-color: ${theme.colors.lightWhite};
    border-radius: 20px;
    padding: 10px 16px;
    font-size: 15px;
    color: ${theme.colors.black};
    max-height: 120px;
    line-height: 22px;
`;

export const SendButton = styled.Pressable<{ disabled?: boolean }>`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    background-color: ${theme.colors.lightGreen};
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const CharCount = styled.Text<{ $error?: boolean }>`
    font-size: 11px;
    color: ${({ $error }) => ($error ? "#FF4444" : theme.colors.heavyGray)};
    text-align: right;
    margin-top: 6px;
    padding-right: 4px;
`;

export const ClearButton = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px;
    border-bottom-width: 1px;
    border-bottom-color: #F0F0F0;
`;

export const ClearButtonText = styled.Text`
    font-size: 12px;
    color: ${theme.colors.heavyGray};
`;