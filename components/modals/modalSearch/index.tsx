import React, { useEffect, useRef, useState } from "react";
import {
    Modal,
    Pressable,
    TextInput,
    StyleSheet,
    View,
    NativeSyntheticEvent,
    TextInputSubmitEditingEventData,
} from "react-native";

import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useLoader } from "@/stores/loader-store";
import { toast } from "@backpackapp-io/react-native-toast";
import { useSearch } from "@/stores/search-store";

type SearchOverlayModalProps = {
    visible: boolean;
    onClose: () => void;
};

export function SearchOverlayModal({
    visible,
    onClose,
}: SearchOverlayModalProps) {
    const setLoading = useLoader((state) => state.setLoading);
    const inputRef = useRef<TextInput | null>(null);
    const search = useSearch((state) => state.search);
    const setSearch = useSearch((state) => state.setSearch);

    const [value, setValue] = useState<string>("");

    useEffect(() => {
        if (visible) {
            const timeout = setTimeout(() => {
                inputRef.current?.focus();
            }, 150);

            return () => clearTimeout(timeout);
        }

        setValue("");
    }, [visible]);

    function handleSubmit() {
        try {
            setLoading(true);
            setSearch(value);
            onClose();
        } catch { }
        finally {
            setLoading(false);
        }
    }

    function handleClose() {
        setSearch("");
        onClose();
    }

    useEffect(() => {
        if (search)
            setValue(search);
    }, [])

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose}>
                <Pressable style={styles.container} onPress={() => { }}>
                    <Pressable onPress={handleClose}>
                        <Ionicons name="trash-outline" size={18} />
                    </Pressable>

                    <TextInput
                        ref={inputRef}
                        value={value}
                        onChangeText={setValue}
                        placeholder="Buscar..."
                        placeholderTextColor="#999"
                        onSubmitEditing={handleSubmit}
                        style={styles.input}
                    />

                    <Pressable onPress={onClose}>
                        <Ionicons name="close-outline" size={22} />
                    </Pressable>

                </Pressable>

            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    container: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",

        padding: 12,
        gap: 8,

        borderRadius: 12,

        width: "90%",
    },

    input: {
        flex: 1,
        fontSize: 14,
        height: 40,
        color: "#000",
    },
});