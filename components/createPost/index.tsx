import { theme } from "@/globals/theme";
import { Container } from "./styles";
import Plus from "react-native-vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { useFooter } from "@/stores/hide-footer-store";

export function CreatePost() {
    const router = useRouter();
    const showFooter = useFooter((state) => state.footer);

    return (
        showFooter &&
        <Container onPress={() => router.push("/postForm")}>
            <Plus
                name="plus"
                size={24}
                color={theme.colors.white}
            />
        </Container>
    )
}