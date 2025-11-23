import { NormalText } from "@/globals/texts";
import { theme } from "@/globals/theme";
import { styled } from "styled-components/native";

export const FooterView = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1060;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.paddings.l};
    background-color: ${theme.colors.white};
`;

export const IconContainer = styled.View<{ isActive: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    border-radius: ${theme.paddings.m};
    padding: ${theme.paddings.s} ${theme.paddings.l};

    ${({ isActive }) => isActive && `
        background-color: rgba(81, 140, 129, .4);
    `}
`;

export const TextIcon = styled(NormalText)<{ isActive: boolean }>`
    color: ${theme.colors.lightBlack};

    ${({ isActive }) => isActive && `
        color: ${theme.colors.white};
    `}
`;