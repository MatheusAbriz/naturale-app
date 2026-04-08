import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button } from "../buttons";

export const InputArea = styled(SafeAreaView)`
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 8px;
    padding: 8px 16px;
    border-top-width: 1px;
    border-top-color: #E5E5E5;
    background-color: #FFF;

    position: absolute;
    bottom: 80px;
    left: 0;
    right: 0;
`;

export const CommentButton = styled(Button)`
    width: 44px;
    height: 44px;
    border-radius: 22px;
    padding: 0;
    flex-shrink: 0;
`;