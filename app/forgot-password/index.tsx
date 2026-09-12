import { Input } from "@/components/inputs/input";
import { theme } from "@/globals/theme";
import { forgotPassword, resetPassword } from "@/services/AuthService";
import { useLoader } from "@/stores/loader-store";
import { toast } from "@backpackapp-io/react-native-toast";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Platform } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
    BackButton,
    Container,
    FieldLabel,
    FieldWrapper,
    FooterLink,
    FooterText,
    InputArea,
    Subtitle,
    SubmitButton,
    SubmitButtonText,
    Title,
} from "@/styles/forgotPassword";

type FormValues = {
    email: string;
    code: string;
    newPassword: string;
};

export default function ForgotPassword() {
    const { control, getValues } = useForm<FormValues>();
    const { loading, setLoading } = useLoader();
    const router = useRouter();
    const [step, setStep] = useState<"request" | "confirm">("request");
    const [sentToEmail, setSentToEmail] = useState("");

    async function handleRequestCode() {
        try {
            const { email } = getValues();
            if (!email?.trim()) return toast.error("Informe seu e-mail.");

            setLoading(true);
            await forgotPassword(email);
            setSentToEmail(email);
            setStep("confirm");
            toast.success("Se o e-mail existir, um código foi enviado.");
        } catch (e) {
            console.error(e);
            toast.error("Erro ao solicitar código. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    async function handleConfirmReset() {
        try {
            const { code, newPassword } = getValues();
            if (!code?.trim()) return toast.error("Informe o código recebido por e-mail.");
            if (!newPassword?.trim()) return toast.error("Informe a nova senha.");

            setLoading(true);
            await resetPassword(sentToEmail, code, newPassword);
            toast.success("Senha redefinida com sucesso! Faça login.");
            router.replace("/login");
        } catch (e: any) {
            console.error(e);
            const msg = e?.response?.data?.message ?? "Código inválido ou expirado.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <BackButton onPress={() => router.back()}>
                <IonIcon name="arrow-back" size={22} color={theme.colors.lightBlack} />
            </BackButton>

            <Title>Esqueci minha senha</Title>

            {step === "request" ? (
                <>
                    <Subtitle>
                        Informe o e-mail da sua conta. Se ele existir, vamos enviar um código de 6 dígitos para redefinir sua senha.
                    </Subtitle>

                    <FieldWrapper>
                        <FieldLabel>E-mail</FieldLabel>
                        <InputArea>
                            <IonIcon name="mail-outline" size={18} color={theme.colors.lightGreen} />
                            <Input name="email" control={control} placeholder="exemplo@gmail.com" autoCapitalize="none" keyboardType="email-address" style={{ flex: 1, backgroundColor: "transparent" }} />
                        </InputArea>
                    </FieldWrapper>

                    <SubmitButton onPress={handleRequestCode} disabled={loading}>
                        <SubmitButtonText>{loading ? "Enviando..." : "Enviar código"}</SubmitButtonText>
                    </SubmitButton>
                </>
            ) : (
                <>
                    <Subtitle>
                        Enviamos um código para {sentToEmail}. Digite-o abaixo junto com sua nova senha.
                    </Subtitle>

                    <FieldWrapper>
                        <FieldLabel>Código</FieldLabel>
                        <InputArea>
                            <IonIcon name="key-outline" size={18} color={theme.colors.lightGreen} />
                            <Input name="code" control={control} placeholder="000000" keyboardType="number-pad" maxLength={6} style={{ flex: 1, backgroundColor: "transparent" }} />
                        </InputArea>
                    </FieldWrapper>

                    <FieldWrapper>
                        <FieldLabel>Nova senha</FieldLabel>
                        <InputArea>
                            <IonIcon name="lock-closed-outline" size={18} color={theme.colors.lightGreen} />
                            <Input name="newPassword" control={control} placeholder="******" secureTextEntry textContentType="newPassword" style={{ flex: 1, backgroundColor: "transparent" }} />
                        </InputArea>
                    </FieldWrapper>

                    <SubmitButton onPress={handleConfirmReset} disabled={loading}>
                        <SubmitButtonText>{loading ? "Salvando..." : "Redefinir senha"}</SubmitButtonText>
                    </SubmitButton>

                    <FooterText>
                        Não recebeu o código?{" "}
                        <FooterLink onPress={() => setStep("request")}>Tentar de novo</FooterLink>
                    </FooterText>
                </>
            )}
        </Container>
    );
}
