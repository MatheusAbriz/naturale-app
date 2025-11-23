import { FooterView, IconContainer, TextIcon } from "./styles";
import { theme } from "@/globals/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import House from '@react-native-vector-icons/lucide';
import FavoriteBorder from 'react-native-vector-icons/MaterialIcons';
import ChatBubbleOutline from '@react-native-vector-icons/ionicons';
import { useRoute } from "@react-navigation/native";
export function Footer(){
    const insets = useSafeAreaInsets();
    const route = useRoute();

    return(
        <FooterView style={{ paddingBottom: insets.bottom }}>
            <IconContainer isActive={route.name.includes('Home')}>
                <TextIcon isActive={route.name.includes('Home')}>Início</TextIcon>
                <House name="house" size={24} color={theme.colors.lightGreen}/>
            </IconContainer>

            <IconContainer isActive={route.name.includes('Favorites')}>
                <TextIcon isActive={route.name.includes('Favorites')}>Favoritos</TextIcon>
                <FavoriteBorder name="favorite-border" size={24} color={theme.colors.lightGreen}/>
            </IconContainer>

            <IconContainer isActive={route.name.includes('Chat')}>
                <TextIcon isActive={route.name.includes('Chat')}>Chatbot</TextIcon>
                <ChatBubbleOutline name="chatbubble-outline" size={24} color={theme.colors.lightGreen}/>
            </IconContainer>
        </FooterView>
    )
}