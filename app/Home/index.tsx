import { Footer } from "@/components/footer";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(){
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Hello World</Text>
      <Footer/>
    </SafeAreaView>
  );
}
