import { InputText } from "@/globals/inputs";
import { Control, Controller, FieldValues } from "react-hook-form";
import { TextInputProps, type StyleProp, TextStyle } from "react-native";

type InputProps = TextInputProps & {
    name: string;
    control: Control<FieldValues>;
    placeholder: string;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    styles?: StyleProp<TextStyle>;
}

export function Input({ name, placeholder, autoCapitalize = "none", control, styles, ...rest }: InputProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <InputText
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize={autoCapitalize}
                    style={styles}
                    {...rest}
                />
            )}
        >
        </Controller>
    )
} ''