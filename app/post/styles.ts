import { theme } from "@/globals/theme";
import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${theme.colors.white};
`;

export const HeroImage = styled.Image`
    width: 100%;
    height: 280px;
`;

export const BackButton = styled.Pressable`
    position: absolute;
    top: 48px;
    left: 16px;
    width: 38px;
    height: 38px;
    border-radius: 19px;
    background-color: rgba(0, 0, 0, 0.35);
    align-items: center;
    justify-content: center;
    z-index: 10;
`;

export const Content = styled.View`
    padding: 20px 16px 40px;
    gap: 16px;
`;

export const Header = styled.View`
    gap: 8px;
`;

export const Title = styled.Text`
    font-size: 22px;
    font-weight: 700;
    color: ${theme.colors.heavyBlack};
    line-height: 28px;
`;

export const AuthorRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

export const AuthorName = styled.Text`
    font-size: 14px;
    font-weight: 600;
    color: ${theme.colors.lightBlack};
`;

export const AuthorUsername = styled.Text`
    font-size: 13px;
    color: ${theme.colors.heavyGray};
`;

export const MetaRow = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 6px;
`;

export const MetaText = styled.Text`
    font-size: 13px;
    color: ${theme.colors.heavyGray};
`;

export const Divider = styled.View`
    height: 1px;
    background-color: ${theme.colors.lightGray};
`;

export const ActionsRow = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const ActionGroup = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

export const ActionItem = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 6px;
`;

export const ActionText = styled.Text`
    font-size: 14px;
    color: ${theme.colors.lightBlack};
`;

export const SectionTitle = styled.Text`
    font-size: 16px;
    font-weight: 700;
    color: ${theme.colors.lightBlack};
    margin-bottom: 8px;
`;

export const DescriptionText = styled.Text`
    font-size: 15px;
    color: ${theme.colors.lightBlack};
    line-height: 24px;
`;

export const IngredientsList = styled.View`
    gap: 8px;
`;

export const IngredientItem = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    background-color: ${theme.colors.lightWhite};
    border-radius: 10px;
`;

export const IngredientText = styled.Text`
    font-size: 14px;
    color: ${theme.colors.lightBlack};
    flex: 1;
`;

export const IngredientBullet = styled.View`
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${theme.colors.lightGreen};
    flex-shrink: 0;
`;

export const CommentsButton = styled.Pressable`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    background-color: ${theme.colors.lightWhite};
    border-radius: 12px;
`;

export const CommentsButtonLeft = styled.View`
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

export const CommentsButtonText = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: ${theme.colors.lightBlack};
`;

export const CommentsBadge = styled.View`
    background-color: ${theme.colors.lightGreen};
    border-radius: 10px;
    padding: 2px 8px;
`;

export const CommentsBadgeText = styled.Text`
    font-size: 12px;
    font-weight: 600;
    color: ${theme.colors.white};
`;

export const ErrorText = styled.Text`
    font-size: 16px;
    color: ${theme.colors.heavyGray};
    text-align: center;
    margin-top: 40px;
`;