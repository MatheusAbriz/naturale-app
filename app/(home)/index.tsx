import { Footer } from "@/components/footer";
import { useAuth } from "@/hooks/useAuth";
import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(){
  const { logout } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Hello World!!</Text>
      <Button title="Clique aqui" onPress={logout}/>
      <Footer/>
    </SafeAreaView>
  );
}
