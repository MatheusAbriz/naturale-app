import { theme } from "@/globals/theme";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${theme.colors.white};
`;

export const Header = styled.View`
    width: 100%;
    background-color: ${theme.colors.lightGreen};
    align-items: center;
    padding: 48px 24px 32px;
    gap: 12px;
`;

export const BackButton = styled.Pressable`
    position: absolute;
    top: 48px;
    left: 16px;
    width: 38px;
    height: 38px;
    border-radius: 19px;
    background-color: rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

export const EditButton = styled.Pressable`
    position: absolute;
    top: 48px;
    right: 16px;
    width: 38px;
    height: 38px;
    border-radius: 19px;
    background-color: rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

export const AvatarImage = styled.Image`
    width: 96px;
    height: 96px;
    border-radius: 48px;
    border-width: 3px;
    border-color: ${theme.colors.white};
`;

export const Name = styled.Text`
    font-size: 20px;
    font-weight: 700;
    color: ${theme.colors.white};
`;

export const Username = styled.Text`
    font-size: 14px;
    color: ${theme.colors.states.activeBackground};
`;

export const InfoArea = styled.View`
    padding: 24px;
    gap: 16px;
`;

export const InfoRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background-color: ${theme.colors.lightWhite};
    border-radius: 12px;
`;

export const InfoText = styled.Text`
    font-size: 15px;
    color: ${theme.colors.lightBlack};
`;
