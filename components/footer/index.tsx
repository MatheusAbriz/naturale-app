import { theme } from "@/globals/theme";
import ChatBubbleOutline, { Ionicons } from "@react-native-vector-icons/ionicons";
import House from "@react-native-vector-icons/lucide";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { usePathname, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FavoriteBorder from "react-native-vector-icons/MaterialIcons";
import { FooterView, IconContainer, TextIcon } from "./styles";
import { useAuth } from "@/stores/auth-store";

export function Footer() {
  const logout = useAuth((state) => state.logout);
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const isHomeActive = pathname.includes("home") || pathname === "/";
  const isFavoritesActive = pathname.includes("favorites");
  const isChatActive = pathname.includes("chat");

  return (
    <FooterView style={{ height: 60 + insets.bottom, paddingBottom: insets.bottom }}>

      <Pressable onPress={() => router.push("/home")}>
        <IconContainer>
          <TextIcon isActive={isHomeActive}>Início</TextIcon>
          {isHomeActive ? (
            <FontAwesome6
              name="house"
              iconStyle="solid"
              size={24}
              color={theme.colors.states.activeGreen}
            />
          ) : (
            <House name="house" size={24} color={theme.colors.lightGreen} />
          )}
        </IconContainer>
      </Pressable>

      <Pressable onPress={() => router.push("/favorites")}>
        <IconContainer>
          <TextIcon isActive={isFavoritesActive}>Favoritos</TextIcon>
          {isFavoritesActive ? (
            <FontAwesome6
              name="heart"
              iconStyle="solid"
              size={24}
              color={theme.colors.states.activeGreen}
            />
          ) : (
            <FavoriteBorder
              name="favorite-border"
              size={24}
              color={theme.colors.lightGreen}
            />
          )}
        </IconContainer>
      </Pressable>

      <Pressable onPress={() => router.push("/chatbot")}>
        <IconContainer>
          <TextIcon isActive={isChatActive}>Chatbot</TextIcon>
          {isChatActive ? (
            <ChatBubbleOutline
              name="chatbubble"
              size={24}
              color={theme.colors.states.activeGreen}
            />
          ) : (
            <ChatBubbleOutline
              name="chatbubble-outline"
              size={24}
              color={theme.colors.lightGreen}
            />
          )}
        </IconContainer>
      </Pressable>

      <Pressable onPress={() => logout()}>
        <IconContainer>
          <TextIcon isActive={false}>Sair</TextIcon>
          <Ionicons name="log-out-outline" size={24} color={theme.colors.lightGreen} />
        </IconContainer>
      </Pressable>
    </FooterView>
  );
}
