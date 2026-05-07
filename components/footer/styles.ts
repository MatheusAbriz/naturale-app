import { NormalText } from "@/globals/texts";
import { theme } from "@/globals/theme";
import { css, styled } from "styled-components/native";

export const FooterView = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.paddings.l};
    background-color: ${theme.colors.white};
    height: 60px;
`;

export const IconContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column-reverse;
    border-radius: ${theme.paddings.m};
    padding: ${theme.paddings.s} ${theme.paddings.l};
`;

export const TextIcon = styled(NormalText)<{ isActive: boolean }>`
    color: ${theme.colors.lightBlack};

    ${({ isActive }) => isActive && css`
        color: ${theme.colors.states.activeGreen};
        font-weight: bold;
    `}
`;