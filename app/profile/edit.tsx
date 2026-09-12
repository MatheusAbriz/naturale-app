import { Input } from "@/components/inputs/input";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { theme } from "@/globals/theme";
import {
    getMyProfile,
    updateAvatar,
    updateEmail,
    updateName,
    updatePassword,
    updatePhone,
    updateUsername,
} from "@/services/AuthService";
import { uploadImage } from "@/services/ImageService";
import { useAuth } from "@/stores/auth-store";
import { useLoader } from "@/stores/loader-store";
import { UserProfile } from "@/types/auth";
import { toast } from "@backpackapp-io/react-native-toast";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
    AvatarEditBadge,
    AvatarImage,
    AvatarWrapper,
    BackButton,
    Container,
    Divider,
    FieldLabel,
    FieldWrapper,
    FormArea,
    HeroArea,
    InputArea,
    SaveButton,
    SaveButtonText,
    ScrollArea,
    SectionLabel,
} from "@/styles/editProfile";

type FormValues = {
    name: string;
    username: string;
    phone: string;
    email: string;
    avatar: string;
    password: string;
};

export default function EditProfile() {
    const { user, updateUser } = useAuth();
    const { loading, setLoading } = useLoader();
    const router = useRouter();
    const [avatarAsset, setAvatarAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const [original, setOriginal] = useState<UserProfile | null>(null);

    const { control, getValues, setValue, watch } = useForm<FormValues>({
        defaultValues: { name: "", username: "", phone: "", email: "", avatar: "", password: "" },
    });

    const avatarUri = watch("avatar");

    useEffect(() => {
        if (!user?.id) return;
        getMyProfile(user.id).then((res) => {
            const profile = res.data as UserProfile;
            setOriginal(profile);
            setValue("name", profile.name ?? "");
            setValue("username", profile.username ?? "");
            setValue("phone", profile.phone ?? "");
            setValue("email", profile.email ?? "");
            setValue("avatar", profile.avatar ?? "");
        }).catch((e) => {
            console.error(e);
            toast.error("Erro ao carregar seu perfil.");
        });
    }, [user?.id]);

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
        if (!user?.id || !original) return;

        try {
            setLoading(true);
            const { name, username, phone, email, password } = getValues();

            if (!name.trim()) return toast.error("Informe seu nome.");
            if (!email.trim()) return toast.error("Informe seu e-mail.");

            const updates: Promise<unknown>[] = [];
            const storeUpdates: Record<string, string> = {};

            if (name !== original.name) {
                updates.push(updateName(user.id, name));
                storeUpdates.name = name;
            }
            if (username !== original.username) {
                updates.push(updateUsername(user.id, username));
                storeUpdates.username = username;
            }
            if (phone !== original.phone) {
                updates.push(updatePhone(user.id, phone));
            }
            if (email !== original.email) {
                updates.push(updateEmail(user.id, email));
            }
            if (password.trim()) {
                updates.push(updatePassword(user.id, password));
            }
            if (avatarAsset) {
                const avatarUrl = await uploadImage(avatarAsset, "usuarios");
                updates.push(updateAvatar(user.id, avatarUrl));
                storeUpdates.avatar = avatarUrl;
            }

            if (updates.length === 0) {
                toast("Nenhuma alteração para salvar.");
                return router.back();
            }

            await Promise.all(updates);

            if (Object.keys(storeUpdates).length > 0) {
                updateUser(storeUpdates);
            }

            toast.success("Perfil atualizado com sucesso!");
            router.back();
        } catch (e) {
            console.error(e);
            toast.error("Erro ao atualizar perfil. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProtectedRoute>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={["top", "bottom"]}>
                <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <BackButton onPress={() => router.back()}>
                        <IonIcon name="arrow-back" size={22} color={theme.colors.lightBlack} />
                    </BackButton>

                    <ScrollArea showsVerticalScrollIndicator={false}>
                        <HeroArea>
                            <AvatarWrapper onPress={pickAvatar}>
                                <AvatarImage
                                    source={{
                                        uri: avatarUri || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                    }}
                                />
                                <AvatarEditBadge>
                                    <IonIcon name="camera" size={13} color={theme.colors.white} />
                                </AvatarEditBadge>
                            </AvatarWrapper>
                        </HeroArea>

                        <FormArea>
                            <SectionLabel>Dados pessoais</SectionLabel>

                            <FieldWrapper>
                                <FieldLabel>Nome completo</FieldLabel>
                                <InputArea>
                                    <IonIcon name="person-outline" size={18} color={theme.colors.lightGreen} />
                                    <Input name="name" control={control} placeholder="Seu nome" autoCapitalize="words" style={{ flex: 1, backgroundColor: "transparent" }} />
                                </InputArea>
                            </FieldWrapper>

                            <FieldWrapper>
                                <FieldLabel>Nome de usuário</FieldLabel>
                                <InputArea>
                                    <IonIcon name="at-outline" size={18} color={theme.colors.lightGreen} />
                                    <Input name="username" control={control} placeholder="Seu usuário" autoCapitalize="none" style={{ flex: 1, backgroundColor: "transparent" }} />
                                </InputArea>
                            </FieldWrapper>

                            <FieldWrapper>
                                <FieldLabel>Telefone</FieldLabel>
                                <InputArea>
                                    <IonIcon name="call-outline" size={18} color={theme.colors.lightGreen} />
                                    <Input name="phone" control={control} placeholder="(11) 99999-9999" keyboardType="phone-pad" style={{ flex: 1, backgroundColor: "transparent" }} />
                                </InputArea>
                            </FieldWrapper>

                            <Divider />
                            <SectionLabel>Dados de acesso</SectionLabel>

                            <FieldWrapper>
                                <FieldLabel>E-mail</FieldLabel>
                                <InputArea>
                                    <IonIcon name="mail-outline" size={18} color={theme.colors.lightGreen} />
                                    <Input name="email" control={control} placeholder="exemplo@gmail.com" autoCapitalize="none" keyboardType="email-address" style={{ flex: 1, backgroundColor: "transparent" }} />
                                </InputArea>
                            </FieldWrapper>

                            <FieldWrapper>
                                <FieldLabel>Nova senha (opcional)</FieldLabel>
                                <InputArea>
                                    <IonIcon name="lock-closed-outline" size={18} color={theme.colors.lightGreen} />
                                    <Input name="password" control={control} placeholder="Deixe em branco para manter a atual" secureTextEntry textContentType="password" style={{ flex: 1, backgroundColor: "transparent" }} />
                                </InputArea>
                            </FieldWrapper>

                            <SaveButton onPress={submit} disabled={loading}>
                                <SaveButtonText>{loading ? "Salvando..." : "Salvar alterações"}</SaveButtonText>
                            </SaveButton>
                        </FormArea>
                    </ScrollArea>
                </Container>
            </SafeAreaView>
        </ProtectedRoute>
    );
}
