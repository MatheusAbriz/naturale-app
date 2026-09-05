import {
    Container,
    ChatContent,
    WelcomeContainer,
    WelcomeAvatar,
    WelcomeTitle,
    WelcomeSubtitle,
    UserRow,
    UserBubble,
    UserText,
    BotRow,
    BotAvatar,
    BotBubble,
    BotText,
    TypingBubble,
    TypingDot,
    InputArea,
    InputRow,
    StyledTextInput,
    SendButton,
    CharCount,
    ClearButton,
    ClearButtonText,
} from "@/styles/chatbot";
import { theme } from "@/globals/theme";
import { toast } from "@backpackapp-io/react-native-toast";
import IonIcon from "react-native-vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    Animated,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { callGroq } from "@/services/GroqService";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useChatStore } from "@/stores/chat-store";

type ChatMessage = {
    id: string;
    role: "user" | "bot";
    content: string;
};

function TypingIndicator() {
    const dots = [
        useRef(new Animated.Value(0.3)).current,
        useRef(new Animated.Value(0.3)).current,
        useRef(new Animated.Value(0.3)).current,
    ];

    useEffect(() => {
        const animations = dots.map((dot, i) =>
            Animated.loop(
                Animated.sequence([
                    Animated.delay(i * 200),
                    Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
                    Animated.timing(dot, { toValue: 0.3, duration: 300, useNativeDriver: true }),
                    Animated.delay(600 - i * 200),
                ])
            )
        );
        Animated.parallel(animations).start();
        return () => animations.forEach((a) => a.stop());
    }, []);

    return (
        <BotRow>
            <BotAvatar>
                <IonIcon name="restaurant-outline" size={14} color={theme.colors.white} />
            </BotAvatar>
            <TypingBubble>
                {dots.map((dot, i) => (
                    <TypingDot key={i} style={{ opacity: dot, transform: [{ scale: dot }] }} />
                ))}
            </TypingBubble>
        </BotRow>
    );
}

function WelcomeMessage() {
    return (
        <WelcomeContainer>
            <WelcomeAvatar>
                <IonIcon name="restaurant-outline" size={36} color={theme.colors.white} />
            </WelcomeAvatar>
            <WelcomeTitle>Olá! Sou seu assistente culinário</WelcomeTitle>
            <WelcomeSubtitle>
                Pergunte sobre receitas, ingredientes, técnicas de preparo ou substituições.
            </WelcomeSubtitle>
        </WelcomeContainer>
    );
}

export default function Chatbot() {
    const { messages, addMessage, clearHistory } = useChatStore();
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    const { control, handleSubmit, reset, watch } = useForm<{ message: string }>();
    const messageValue = watch("message") ?? "";
    const charLength = messageValue.length;
    const isCharLimitReached = charLength >= 255;
    const isSubmitDisabled = loading || charLength < 10 || isCharLimitReached;

    async function handleSend(data: { message: string }) {
        addMessage({ role: "user", content: data.message });
        reset();
        setLoading(true);

        try {
            const reply = await callGroq(data.message);
            addMessage({ role: "bot", content: reply });
        } catch (err) {
            toast.error("Erro interno com o servidor. Tente novamente mais tarde.");
            addMessage({
                role: "bot",
                content: "Desculpe, não consegui processar sua solicitação. Tente novamente.",
            });
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
    }, [messages, loading]);

    function renderMessage({ item }: { item: ChatMessage }) {
        if (item.role === "user") {
            return (
                <UserRow>
                    <UserBubble>
                        <UserText>{item.content}</UserText>
                    </UserBubble>
                </UserRow>
            );
        }

        return (
            <BotRow>
                <BotAvatar>
                    <IonIcon name="restaurant-outline" size={14} color={theme.colors.white} />
                </BotAvatar>
                <BotBubble>
                    <BotText>{item.content}</BotText>
                </BotBubble>
            </BotRow>
        );
    }

    return (
        <ProtectedRoute>
            <Container>
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        {messages.length > 0 && (
                            <ClearButton onPress={clearHistory}>
                                <IonIcon name="trash-outline" size={16} color={theme.colors.heavyGray} />
                                <ClearButtonText>Limpar conversa</ClearButtonText>
                            </ClearButton>
                        )}

                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={(item) => item.id}
                            renderItem={renderMessage}
                            contentContainerStyle={[
                                { padding: 16, gap: 12 },
                                messages.length === 0 && { flex: 1, justifyContent: "center" },
                            ]}
                            ListEmptyComponent={<WelcomeMessage />}
                            ListFooterComponent={loading ? <TypingIndicator /> : null}
                            showsVerticalScrollIndicator={false}
                        />

                        <InputArea>
                            <InputRow>
                                <Controller
                                    control={control}
                                    name="message"
                                    render={({ field: { onChange, value } }) => (
                                        <StyledTextInput
                                            placeholder="Digite sua pergunta..."
                                            placeholderTextColor={theme.colors.heavyGray}
                                            value={value}
                                            onChangeText={onChange}
                                            multiline
                                            maxLength={255}
                                        />
                                    )}
                                />
                                <SendButton onPress={handleSubmit(handleSend)} disabled={isSubmitDisabled}>
                                    <IonIcon name="arrow-up" size={20} color={theme.colors.white} />
                                </SendButton>
                            </InputRow>
                            <CharCount $error={isCharLimitReached}>{charLength}/255</CharCount>
                        </InputArea>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </Container>
        </ProtectedRoute>
    );
}