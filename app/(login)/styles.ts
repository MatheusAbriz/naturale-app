import { Button } from "@/components/buttons";
import { NormalText } from "@/globals/texts";
import { theme } from "@/globals/theme";
import { ImageBackground as RnImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

export const Container = styled(SafeAreaView)`
    flex: 1;
    gap: ${theme.paddings.m};

    justify-content: flex-end;
    align-items: center;
`;

export const ImageBackground = styled(RnImageBackground)`
    flex: 1;
    justify-content: space-between;
    align-items: center;

    width: 100%;
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

export const Text = styled(NormalText)`
    color: ${theme.colors.lightOrange};
    font-weight: 800;
    text-align: center;

    font-size: 16px;
`;

export const SubText = styled(NormalText)`
    color: ${theme.colors.buttonBackground};
    text-align: center;
`;

export const Span = styled(SubText)`
    font-weight: 800;
`;

export const Divider = styled.View`
    width: 100%;
    height: 1px;

    border-radius: 25px;
    background-color: ${theme.colors.lightGray};

    margin-top: 8px;
`;