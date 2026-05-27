import { theme } from "@/globals/theme";
import { Pressable } from "react-native";
import styled from "styled-components/native";

export const Container = styled(Pressable)`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 100px;
    right: 0;

    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: ${theme.colors.lightGreen};

    z-index: 3;
`;