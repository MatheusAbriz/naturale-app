import { Footer } from "@/components/footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Text } from "react-native";

export default function Favorites() {
    return (
        <ProtectedRoute>
            <Footer />
            <Text>Texto Favorito</Text>
        </ProtectedRoute>
    )
}