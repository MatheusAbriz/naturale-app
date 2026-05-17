import { theme } from "@/globals/theme";
import { Container } from "./styles";
import Plus from "react-native-vector-icons/AntDesign";
import { useRouter } from "expo-router";

export function CreatePost() {
    const router = useRouter();

    return (
        <Container onPress={() => router.push("/postForm")}>
            <Plus
                name="plus"
                size={24}
                color={theme.colors.white}
                style={{ zIndex: 4, }}
            />
        </Container>
    )
}