import { theme } from "@/globals/theme";
import ChatBubbleOutline, { Ionicons } from "@react-native-vector-icons/ionicons";
import House from "@react-native-vector-icons/lucide";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";
import { usePathname, useRouter } from "expo-router";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FavoriteBorder from "react-native-vector-icons/MaterialIcons";
import { FooterView, IconContainer, TextIcon } from "./styles";
import { useState } from "react";
import { SearchOverlayModal } from "../modals/modalSearch";
import { useSearch } from "@/stores/search-store";

export function Footer() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const search = useSearch((state) => state.search);

  const isHomeActive = (pathname.includes("home") || pathname === "/");
  const isFavoritesActive = pathname.includes("favorites");
  const isChatActive = pathname.includes("chat");
  const isSettingsActive = pathname.includes("settings");

  const [searchOpen, setSearchOpen] = useState(false);

  function openSearch() {

    setSearchOpen(true);
  }

  function closeSearch() {
    setSearchOpen(false);
  }


  return (<>
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

      <Pressable onPress={openSearch}>
        <IconContainer>
          <TextIcon isActive={!!search}>Buscar</TextIcon>
          {!!search ? (
            <Ionicons name="search-sharp" size={24} color={theme.colors.lightGreen} />
          ) : (
            <Ionicons name="search-outline" size={24} color={theme.colors.lightGreen} />
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

      <Pressable onPress={() => router.push("/settings")}>
        <IconContainer>
          <TextIcon isActive={isSettingsActive}>Config.</TextIcon>
          {isSettingsActive ? (
            <Ionicons name="settings" size={24} color={theme.colors.states.activeGreen} />
          ) : (
            <Ionicons name="settings-outline" size={24} color={theme.colors.lightGreen} />
          )}
        </IconContainer>
      </Pressable>
    </FooterView>

    {searchOpen && (
      <SearchOverlayModal
        visible={searchOpen}
        onClose={closeSearch}
      />
    )}
  </>);
}
