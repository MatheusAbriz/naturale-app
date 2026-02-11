import { Button } from "react-native";
import styled from "styled-components/native";
import { theme } from "./theme";

export const MyButton = styled(Button)`
    background-color: ${theme.colors.orange};
    color: ${theme.colors.lightWhite};
`;

export const ButtonContainer = styled.TouchableOpacity`
    background-color: ${theme.colors.orange};
    padding: 12px;
    border-radius: 8px;
    align-items: center;
`;

export const ButtonText = styled.Text`
    color: ${theme.colors.lightWhite};
    font-size: 16px;
    font-weight: bold;
`;