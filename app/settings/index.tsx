import { ProtectedRoute } from "@/components/ProtectedRoute";
import { theme } from "@/globals/theme";
import { useAuth } from "@/stores/auth-store";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import IonIcon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    AvatarImage,
    Container,
    Header,
    MenuArea,
    MenuItem,
    MenuItemLeft,
    MenuItemText,
    Name,
    Username,
    VersionText,
} from "@/styles/settings";

const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

export default function Settings() {
    const { user, logout } = useAuth();
    const router = useRouter();

    async function handleLogout() {
        await logout();
        router.replace("/login");
    }

    return (
        <ProtectedRoute>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={["bottom"]}>
                <Container>
                    <Header>
                        <AvatarImage source={{ uri: user?.avatar || FALLBACK_AVATAR }} />
                        <Name>{user?.name}</Name>
                        <Username>@{user?.username}</Username>
                    </Header>

                    <MenuArea>
                        <MenuItem onPress={() => router.push(`/profile/${user?.id}`)}>
                            <MenuItemLeft>
                                <IonIcon name="person-outline" size={20} color={theme.colors.lightGreen} />
                                <MenuItemText>Meu perfil</MenuItemText>
                            </MenuItemLeft>
                            <IonIcon name="chevron-forward" size={18} color={theme.colors.heavyGray} />
                        </MenuItem>

                        <MenuItem onPress={handleLogout}>
                            <MenuItemLeft>
                                <IonIcon name="log-out-outline" size={20} color={theme.colors.orange} />
                                <MenuItemText danger>Sair</MenuItemText>
                            </MenuItemLeft>
                        </MenuItem>

                        <VersionText>Naturale v{Constants.expoConfig?.version}</VersionText>
                    </MenuArea>
                </Container>
            </SafeAreaView>
        </ProtectedRoute>
    );
}
