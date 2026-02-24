import styled from "styled-components/native";
import { theme } from "./theme";

export const InputText = styled.TextInput`
    background-color: ${theme.colors.buttonBackground};
    border-radius: ${theme.paddings.m};
    padding: ${theme.paddings.m} ${theme.paddings.s};

    font-size: 14px;
`;