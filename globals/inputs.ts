import styled from "styled-components/native";
import { theme } from "./theme";

export const InputText = styled.TextInput`
    background-color: ${theme.colors.buttonBackground};
    border-radius: ${theme.paddings.m};

    font-size: 12px;
`;