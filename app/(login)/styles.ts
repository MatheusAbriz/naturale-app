import { Button } from "@/components/buttons";
import { theme } from "@/globals/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    gap: ${theme.paddings.m};

    justify-content: flex-end;
    align-items: center;
`;

export const FormArea = styled(SafeAreaView)`
    width: 100%;
    max-width: 300px;
    gap: ${theme.paddings.m};
`;

export const InputArea = styled.View`
    flex-direction: row;
    align-items: center;
    gap: ${theme.paddings.m};
    
    background-color: ${theme.colors.buttonBackground};
    width: 100%;

    padding: ${theme.paddings.s} ${theme.paddings.l};
    border-radius: ${theme.paddings.m};
`;

export const LoginButton = styled(Button)`
    width: 100%;
    color: ${theme.colors.white};    
    background-color: ${theme.colors.orange};
`;