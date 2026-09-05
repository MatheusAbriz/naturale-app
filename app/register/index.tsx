import { Input } from "@/components/inputs/input";
import { theme } from "@/globals/theme";
import { register } from "@/services/AuthService";
import { uploadImage } from "@/services/ImageService";
import { useAuth } from "@/stores/auth-store";
import { useLoader } from "@/stores/loader-store";
import { UserDTO } from "@/types/auth";
import { User } from "@/types/auth";
import { toast } from "@backpackapp-io/react-native-toast";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
    AvatarEditBadge,
    AvatarImage,
    AvatarPlaceholder,
    AvatarWrapper,
    Container,
    Divider,
    FieldLabel,
    FieldWrapper,
    FooterLink,
    FooterText,
    FormArea,
    HeroArea,
    HeroSubtitle,
    HeroTitle,
    InputArea,
    RegisterButton,
    RegisterButtonText,
    ScrollArea,
    SectionLabel,
} from "@/styles/register";

export default function Register() {
    const { control, getValues, setValue, watch } = useForm<UserDTO>();
    const { loading, setLoading } = useLoader();
    const { signIn } = useAuth.getState();
    const router = useRouter();
    const [avatarAsset, setAvatarAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const avatarUri = watch("avatar");

    async function pickAvatar() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            toast.error("Permissão para acessar a galeria é necessária.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled) {
            setValue("avatar", result.assets[0].uri);
            setAvatarAsset(result.assets[0]);
        }
    }

    async function submit() {
        try {
            setLoading(true);
            const { name, username, phone, cpf, email, password } = getValues();

            if (!name?.trim()) return toast.error("Informe seu nome.");
            if (!email?.trim()) return toast.error("Informe seu e-mail.");
            if (!password?.trim()) return toast.error("Informe uma senha.");
            if (!phone?.trim()) return toast.error("Informe seu telefone.");
            if (!cpf?.trim()) return toast.error("Informe seu CPF.");

            const avatarUrl = avatarAsset ? await uploadImage(avatarAsset, "usuarios") : "";

            const payload: UserDTO = {
                name,
                username,
                phone,
                cpf,
                email,
                password,
                type: "USER",
                avatar: avatarUrl,
            };

            const res = await register(payload);
            const user: User = {
                ...res.data,
                role: res.data?.type,
            };

            await signIn(user);
            toast.success("Cadastro realizado com sucesso!");
            router.replace("/home");
        } catch (e: any) {
            console.error(e);
            const msg = e?.response?.data ?? "Erro ao realizar cadastro.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.lightGreen }} edges={["top"]}>
            <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollArea showsVerticalScrollIndicator={false}>

                    <HeroArea>
                        <HeroTitle>Criar conta</HeroTitle>
                        <HeroSubtitle>Preencha os dados abaixo para começar</HeroSubtitle>

                        <AvatarWrapper onPress={pickAvatar}>
                            {avatarUri ? (
                                <AvatarImage source={{ uri: avatarUri }} />
                            ) : (
                                <AvatarPlaceholder>
                                    <IonIcon name="person-outline" size={32} color={theme.colors.white} />
                                </AvatarPlaceholder>
                            )}
                            <AvatarEditBadge>
                                <IonIcon name="camera" size={13} color={theme.colors.white} />
                            </AvatarEditBadge>
                        </AvatarWrapper>
                    </HeroArea>

                    <FormArea>
                        <SectionLabel>Dados de acesso</SectionLabel>

                        <FieldWrapper>
                            <FieldLabel>Nome completo *</FieldLabel>
                            <InputArea>
                                <IonIcon name="person-outline" size={18} color={theme.colors.lightGreen} />
                                <Input name="name" control={control} placeholder="Digite seu nome completo" autoCapitalize="words" style={{ flex: 1, backgroundColor: "transparent" }} />
                            </InputArea>
                        </FieldWrapper>

                        <FieldWrapper>
                            <FieldLabel>Nome de usuário</FieldLabel>
                            <InputArea>
                                <IonIcon name="at-outline" size={18} color={theme.colors.lightGreen} />
                                <Input name="username" control={control} placeholder="Digite um apelido" autoCapitalize="none" style={{ flex: 1, backgroundColor: "transparent" }} />
                            </InputArea>
                        </FieldWrapper>

                        <FieldWrapper>
                            <FieldLabel>E-mail *</FieldLabel>
                            <InputArea>
                                <IonIcon name="mail-outline" size={18} color={theme.colors.lightGreen} />
                                <Input name="email" control={control} placeholder="exemplo@gmail.com" autoCapitalize="none" keyboardType="email-address" style={{ flex: 1, backgroundColor: "transparent" }} />
                            </InputArea>
                        </FieldWrapper>

                        <FieldWrapper>
                            <FieldLabel>Senha *</FieldLabel>
                            <InputArea>
                                <IonIcon name="lock-closed-outline" size={18} color={theme.colors.lightGreen} />
                                <Input name="password" control={control} placeholder="******" secureTextEntry textContentType="password" style={{ flex: 1, backgroundColor: "transparent" }} />
                            </InputArea>
                        </FieldWrapper>

                        <Divider />
                        <SectionLabel>Dados pessoais</SectionLabel>

                        <FieldWrapper>
                            <FieldLabel>Telefone *</FieldLabel>
                            <InputArea>
                                <IonIcon name="call-outline" size={18} color={theme.colors.lightGreen} />
                                <Input name="phone" control={control} placeholder="(11) 99999-9999" keyboardType="phone-pad" style={{ flex: 1, backgroundColor: "transparent" }} />
                            </InputArea>
                        </FieldWrapper>

                        <FieldWrapper>
                            <FieldLabel>CPF *</FieldLabel>
                            <InputArea>
                                <IonIcon name="id-card-outline" size={18} color={theme.colors.lightGreen} />
                                <Input name="cpf" control={control} placeholder="000.000.000-00" keyboardType="numeric" style={{ flex: 1, backgroundColor: "transparent" }} />
                            </InputArea>
                        </FieldWrapper>

                        <RegisterButton onPress={submit} disabled={loading}>
                            <RegisterButtonText>
                                {loading ? "Cadastrando..." : "Criar conta"}
                            </RegisterButtonText>
                        </RegisterButton>

                        <FooterText>
                            Já tem uma conta?{" "}
                            <FooterLink onPress={() => router.back()}>
                                Fazer login
                            </FooterLink>
                        </FooterText>
                    </FormArea>

                </ScrollArea>
            </Container>
        </SafeAreaView>
    );
}