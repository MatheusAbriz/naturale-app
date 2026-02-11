import { theme } from "@/globals/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
    gap: ${theme.paddings.m};
`;

export const InputArea = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${theme.paddings.m};
    
    background-color: ${theme.colors.buttonBackground};
    
    width: 100%;
    max-width: 300px;

    margin: 0 auto;
    padding: ${theme.paddings.s} ${theme.paddings.l};
    border-radius: ${theme.paddings.m};
`;