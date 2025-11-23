import { ActivityIndicator } from "react-native";
import { Content } from "./styles";
import { theme } from "@/globals/theme";

export function Loader() {
  return (
    <Content>
        <ActivityIndicator size="large" color={theme.colors.lightGreen}/>
    </Content>
  );
}