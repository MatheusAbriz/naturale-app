import { theme } from "@/globals/theme";
import ChatBubbleOutline from "@react-native-vector-icons/ionicons";
import House from "@react-native-vector-icons/lucide";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FavoriteBorder from "react-native-vector-icons/MaterialIcons";
import { FooterView, IconContainer, TextIcon } from "./styles";

export function Footer() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const router = useRouter();

  return (
    <FooterView style={{ height: 60 + insets.bottom, paddingBottom: insets.bottom }}>
      <TouchableOpacity onPress={() => router.push("/(home)")}>
        <IconContainer isActive={route.name.includes("(home)")}>
          <TextIcon isActive={route.name.includes("(home)")}>Início</TextIcon>
          <House name="house" size={24} color={theme.colors.lightGreen} />
        </IconContainer>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/(favorites)")}>
        <IconContainer isActive={route.name.includes("(favorites)")}>
          <TextIcon isActive={route.name.includes("(favorites)")}>
            Favoritos
          </TextIcon>
          <FavoriteBorder
            name="favorite-border"
            size={24}
            color={theme.colors.lightGreen}
          />
        </IconContainer>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => console.log("Chat")}>
        <IconContainer isActive={route.name.includes("(chat)")}>
          <TextIcon isActive={route.name.includes("(chat)")}>Chatbot</TextIcon>
          <ChatBubbleOutline
            name="chatbubble-outline"
            size={24}
            color={theme.colors.lightGreen}
          />
        </IconContainer>
      </TouchableOpacity>
    </FooterView>
  );
}
