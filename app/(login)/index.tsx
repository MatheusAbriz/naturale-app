import BackgroundLogin from "@/assets/images/login-background.png";
import Logo from "@/assets/images/white-logo.svg";
import { Input } from "@/components/inputs/input";
import { theme } from "@/globals/theme";
import { useForm } from "react-hook-form";
import { Text } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { Container, Divider, FormArea, ImageBackground, InputArea, LoginButton } from "./styles";

export default function Login() {
    const { control } = useForm();
    return (
        <Container>
            <ImageBackground
                source={BackgroundLogin}
                resizeMode="cover"
            >
                <Logo width={300} height={300} />

                <FormArea>
                    <InputArea>
                        <Icon
                            name="mail"
                            size={20}
                            color={theme.colors.lightGreen}
                        />
                        <Input
                            name="email"
                            placeholder="exemplo@gmail.com"
                            control={control}
                        />
                    </InputArea>

                    <InputArea>
                        <Icon
                            name="lock"
                            size={20}
                            color={theme.colors.lightGreen}
                        />
                        <Input
                            name="password"
                            secureTextEntry
                            textContentType="password"
                            autoComplete="current-password"
                            placeholder="******"
                            control={control}
                        />
                    </InputArea>

                    <LoginButton
                        title="Entrar"
                        onPress={() => console.log("Ola")}
                    />

                    <Text>Esqueceu sua senha?</Text>
                    <Divider />
                </FormArea>
            </ImageBackground>

        </Container>
    )
};