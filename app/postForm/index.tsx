import { Input } from "@/components/inputs/input";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { theme } from "@/globals/theme";
import { createPost } from "@/services/PostService";
import { uploadImage } from "@/services/ImageService";
import { useAuth } from "@/stores/auth-store";
import { useLoader } from "@/stores/loader-store";
import { toast } from "@backpackapp-io/react-native-toast";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
    AddIngredientButton,
    AddIngredientText,
    Container,
    Content,
    FieldLabel,
    FieldWrapper,
    ImagePickerButton,
    ImagePickerText,
    IngredientInput,
    IngredientRow,
    IngredientsWrapper,
    PickedImage,
    RemoveIngredientButton,
    SectionDivider,
    SubmitButton,
    SubmitButtonText,
    TextAreaInput,
    TimeChip,
    TimeChipText,
    TimeGrid,
} from "@/styles/postForm";
import { Footer } from "@/components/footer";
import { useQueryClient } from "@tanstack/react-query";

const TIME_OPTIONS = ["15min", "30min", "45min", "1h", "1h30", "2h", "2h30", "3h+"];

type FormValues = {
    title: string;
    text: string;
    ingredients: { value: string }[];
    time: string;
    image: string;
};

export default function CreatePost() {
    const { user } = useAuth.getState();
    const { setLoading, loading } = useLoader();
    const router = useRouter();
    const queryClient = useQueryClient();

    const { control, getValues, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            title: "",
            text: "",
            ingredients: [{ value: "" }],
            time: "",
            image: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    });

    const [imageAsset, setImageAsset] = useState<ImagePicker.ImagePickerAsset | null>(null);
    const selectedTime = watch("time");
    const imageUri = watch("image");

    async function pickImage() {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            toast.error("Permissão para acessar a galeria é necessária.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled) {
            setValue("image", result.assets[0].uri);
            setImageAsset(result.assets[0]);
        }
    }

    async function submit() {
        try {
            const { title, text, ingredients, time, image } = getValues();

            if (!title.trim()) return toast.error("Adicione um título.");
            if (!text.trim()) return toast.error("Adicione uma descrição.");
            if (!image || !imageAsset) return toast.error("Adicione uma imagem.");
            if (!time) return toast.error("Selecione o tempo de preparo.");

            const filledIngredients = ingredients.filter((i) => i.value.trim());
            if (filledIngredients.length === 0)
                return toast.error("Adicione ao menos um ingrediente.");

            setLoading(true);

            const imageUrl = await uploadImage(imageAsset, "posts");

            await createPost({
                userId: user?.id!,
                title,
                text,
                ingredients: filledIngredients.map((i) => i.value).join(", "),
                image: imageUrl,
                time,
                status: true,
            });

            await queryClient.invalidateQueries({
                queryKey: ["posts", user?.id],
            });

            toast.success("Post criado com sucesso!");

            router.back();
        } catch (e) {
            console.error(e);
            toast.error("Erro ao criar post. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProtectedRoute>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.lightWhite }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <Container>
                        <Content>

                            <FieldWrapper>
                                <FieldLabel>Foto do prato</FieldLabel>
                                <ImagePickerButton hasImage={!!imageUri} onPress={pickImage}>
                                    {imageUri ? (
                                        <PickedImage source={{ uri: imageUri }} resizeMode="cover" />
                                    ) : (
                                        <>
                                            <IonIcon name="camera-outline" size={32} color={theme.colors.heavyGray} />
                                            <ImagePickerText>Toque para escolher uma foto</ImagePickerText>
                                        </>
                                    )}
                                </ImagePickerButton>
                            </FieldWrapper>

                            <SectionDivider />

                            <FieldWrapper>
                                <FieldLabel>Título da receita</FieldLabel>
                                <Input
                                    name="title"
                                    control={control}
                                    placeholder="Ex: Frango grelhado com legumes"
                                />
                            </FieldWrapper>

                            <FieldWrapper>
                                <FieldLabel>Descrição</FieldLabel>
                                <Controller
                                    control={control}
                                    name="text"
                                    render={({ field: { onChange, value } }) => (
                                        <TextAreaInput
                                            placeholder="Descreva o modo de preparo..."
                                            placeholderTextColor={theme.colors.heavyGray}
                                            value={value}
                                            onChangeText={onChange}
                                            multiline
                                            maxLength={500}
                                        />
                                    )}
                                />
                            </FieldWrapper>

                            <SectionDivider />

                            <FieldWrapper>
                                <FieldLabel>Ingredientes</FieldLabel>
                                <IngredientsWrapper>
                                    {fields.map((field, index) => (
                                        <IngredientRow key={field.id}>
                                            <Controller
                                                control={control}
                                                name={`ingredients.${index}.value`}
                                                render={({ field: { onChange, value } }) => (
                                                    <IngredientInput
                                                        placeholder={`Ingrediente ${index + 1}`}
                                                        placeholderTextColor={theme.colors.heavyGray}
                                                        value={value}
                                                        onChangeText={onChange}
                                                    />
                                                )}
                                            />
                                            {fields.length > 1 && (
                                                <RemoveIngredientButton onPress={() => remove(index)}>
                                                    <IonIcon
                                                        name="close"
                                                        size={16}
                                                        color={theme.colors.orange}
                                                    />
                                                </RemoveIngredientButton>
                                            )}
                                        </IngredientRow>
                                    ))}

                                    <AddIngredientButton onPress={() => append({ value: "" })}>
                                        <IonIcon name="add-circle-outline" size={18} color={theme.colors.lightGreen} />
                                        <AddIngredientText>Adicionar ingrediente</AddIngredientText>
                                    </AddIngredientButton>
                                </IngredientsWrapper>
                            </FieldWrapper>

                            <SectionDivider />

                            <FieldWrapper>
                                <FieldLabel>Tempo de preparo</FieldLabel>
                                <TimeGrid>
                                    {TIME_OPTIONS.map((option) => (
                                        <TimeChip
                                            key={option}
                                            isSelected={selectedTime === option}
                                            onPress={() => setValue("time", option)}
                                        >
                                            <TimeChipText isSelected={selectedTime === option}>
                                                {option}
                                            </TimeChipText>
                                        </TimeChip>
                                    ))}
                                </TimeGrid>
                            </FieldWrapper>

                            <SubmitButton onPress={submit} disabled={loading}>
                                <SubmitButtonText>
                                    {loading ? "Publicando..." : "Publicar receita"}
                                </SubmitButtonText>
                            </SubmitButton>

                        </Content>
                    </Container>
                </KeyboardAvoidingView>
            </SafeAreaView>
            <Footer />
        </ProtectedRoute>
    );
}