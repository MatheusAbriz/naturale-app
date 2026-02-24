import BackgroundLogin from "@/assets/images/login-background.png";
import Logo from "@/assets/images/white-logo.svg";
import { Input } from "@/components/inputs/input";
import { theme } from "@/globals/theme";
import { useAuth } from "@/hooks/useAuth";
import { useLoader } from "@/hooks/useLoader";
import { login } from "@/services/AuthService";
import { User } from "@/types/auth";
import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import Icon from "react-native-vector-icons/AntDesign";
import { Container, Divider, FormArea, ImageBackground, InputArea, LoginButton, Span, SubText, Text } from "./styles";

export default function Login() {
    const { control, getValues } = useForm();
    const { loading, setLoading } = useLoader();
    const { signIn } = useAuth();
    const router = useRouter();

    async function submit() {
        try {
            setLoading(true);
            const { email, password } = getValues();
            if(!email || !password) return toast.error("Preencha os campos corretamente!");
            
            const res = await login({ email, password });
            const payload: User = {
                ...res?.data,
                role: res?.data?.type
            }
            
            signIn(payload);
            toast.success("Logado realizado com sucesso, seja bem-vindo!");
            router.push("/(home)");
        } catch (e) {
            console.error(`Erro! ${e}`);
            toast.error("Login inválido!");
        } finally {
            setLoading(false);
        }
    }
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

                    <InputArea style={{ marginBottom: 8 }}>
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
                        onPress={submit}
                        disabled={loading}
                    />

                    <Text>Esqueceu sua senha?</Text>
                    <Divider />

                    <SubText>
                        Não tem uma conta? <Span>Cadastre-se</Span>
                    </SubText>
                </FormArea>
            </ImageBackground>

        </Container>
    )
};