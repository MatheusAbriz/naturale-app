import { theme } from "@/globals/theme";
import { Container } from "./styles";
import Plus from "react-native-vector-icons/AntDesign";
import { useSearch } from "@/stores/search-store";
import Ionicons from "@react-native-vector-icons/ionicons";

export function IconSearch() {
    const search = useSearch((state) => state.search);
    const clearSearch = useSearch((state) => state.clearSearch);

    return (
        search &&
        <Container onPress={clearSearch}>
            <Ionicons name="trash-outline" size={24} color={theme.colors.white} />

        </Container>
    )
}