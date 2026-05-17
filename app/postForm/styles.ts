import { theme } from "@/globals/theme";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${theme.colors.lightWhite};
`;

export const Content = styled.View`
    padding: 24px 16px 40px;
    gap: 20px;
`;

export const ImagePickerButton = styled.Pressable<{ hasImage?: boolean }>`
    width: 100%;
    height: 200px;
    border-radius: 16px;
    background-color: ${({ hasImage }) => hasImage ? "transparent" : theme.colors.white};
    border-width: ${({ hasImage }) => hasImage ? "0px" : "2px"};
    border-color: ${theme.colors.heavyGray};
    border-style: dashed;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

export const PickedImage = styled.Image`
    width: 100%;
    height: 100%;
`;

export const ImagePickerText = styled.Text`
    font-size: 14px;
    color: ${theme.colors.heavyGray};
    margin-top: 8px;
`;

export const FieldLabel = styled.Text`
    font-size: 13px;
    font-weight: 600;
    color: ${theme.colors.lightBlack};
    margin-bottom: 6px;
`;

export const FieldWrapper = styled.View`
    gap: 4px;
`;

export const TextAreaInput = styled.TextInput`
    background-color: ${theme.colors.white};
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 15px;
    color: ${theme.colors.black};
    min-height: 100px;
    border-width: 1px;
    border-color: ${theme.colors.lightGray};
`;

export const IngredientsWrapper = styled.View`
    gap: 10px;
`;

export const IngredientRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

export const IngredientInput = styled.TextInput`
    flex: 1;
    background-color: ${theme.colors.white};
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 15px;
    color: ${theme.colors.black};
    border-width: 1px;
    border-color: ${theme.colors.lightGray};
`;

export const AddIngredientButton = styled.Pressable`
    flex-direction: row;
    align-items: center;
    gap: 6px;
    padding: 10px 0;
`;

export const AddIngredientText = styled.Text`
    font-size: 14px;
    color: ${theme.colors.lightGreen};
    font-weight: 600;
`;

export const RemoveIngredientButton = styled.Pressable`
    width: 32px;
    height: 32px;
    border-radius: 16px;
    background-color: ${theme.colors.lightWhite};
    align-items: center;
    justify-content: center;
`;

export const TimeGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
`;

export const TimeChip = styled.Pressable<{ isSelected?: boolean }>`
    padding: 8px 16px;
    border-radius: 20px;
    background-color: ${({ isSelected }) =>
        isSelected ? theme.colors.lightGreen : theme.colors.white};
    border-width: 1px;
    border-color: ${({ isSelected }) =>
        isSelected ? theme.colors.lightGreen : theme.colors.lightGray};
`;

export const TimeChipText = styled.Text<{ isSelected?: boolean }>`
    font-size: 13px;
    font-weight: 500;
    color: ${({ isSelected }) =>
        isSelected ? theme.colors.white : theme.colors.lightBlack};
`;

export const SubmitButton = styled.Pressable<{ disabled?: boolean }>`
    background-color: ${({ disabled }) =>
        disabled ? theme.colors.heavyGray : theme.colors.lightGreen};
    border-radius: 14px;
    padding: 16px;
    align-items: center;
    margin-top: 8px;
`;

export const SubmitButtonText = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.white};
`;

export const SectionDivider = styled.View`
    height: 1px;
    background-color: ${theme.colors.lightGray};
    margin: 0 4px;
`;