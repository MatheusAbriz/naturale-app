import { useLoader } from "@/hooks/useLoader";
import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(){
  const { setLoading } = useLoader();

  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  return (
    <SafeAreaView>
      <Text>Hello World</Text>
    </SafeAreaView>
  );
}
