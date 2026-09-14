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

export const AvatarImage = styled.Image`
    width: 72px;
    height: 72px;
    border-radius: 36px;
    border-width: 3px;
    border-color: ${theme.colors.white};
`;

export const Name = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: ${theme.colors.white};
`;

export const Username = styled.Text`
    font-size: 14px;
    color: ${theme.colors.states.activeBackground};
`;

export const MenuArea = styled.View`
    padding: 24px;
    gap: 12px;
`;

export const MenuItem = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: ${theme.colors.lightWhite};
    border-radius: 12px;
`;

export const MenuItemLeft = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

export const MenuItemText = styled.Text<{ danger?: boolean }>`
    font-size: 15px;
    font-weight: 600;
    color: ${({ danger }) => (danger ? theme.colors.orange : theme.colors.lightBlack)};
`;

export const VersionText = styled.Text`
    font-size: 12px;
    color: ${theme.colors.heavyGray};
    text-align: center;
    margin-top: 16px;
`;
