import { InputText } from "@/globals/inputs";
import { Control, Controller, FieldValues } from "react-hook-form";

type InputProps = {
    name: string;
    control: Control<FieldValues>;
    placeholder: string;
    autoCapitalize?: "none"
}

export function Input({ name, placeholder, autoCapitalize="none", control }: InputProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <InputText
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize={autoCapitalize}
                />
            )}
        >
        </Controller>
    )
}''