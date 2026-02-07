import { Footer } from "@/components/footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@react-navigation/elements";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1 }}>
        <Button screen="(login)/index">Clique</Button>
        <Footer />
      </SafeAreaView>
    </ProtectedRoute>
  );
}
