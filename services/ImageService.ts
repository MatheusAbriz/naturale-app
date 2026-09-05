import { API } from "@/hooks/useApi";
import type { ImagePickerAsset } from "expo-image-picker";

type UploadImageResponse = {
    path: string;
    publicUrl: string;
};

export async function uploadImage(asset: ImagePickerAsset, bucket: "posts" | "usuarios") {
    const formData = new FormData();

    formData.append("bucket", bucket);
    formData.append("file", {
        uri: asset.uri,
        name: asset.fileName ?? `${bucket}-${Date.now()}.jpg`,
        type: asset.mimeType ?? "image/jpeg",
    } as any);

    try {
        const res = await API.post<UploadImageResponse>("/images", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return res.data.publicUrl;
    } catch (e: any) {
        console.error("Falha no upload de imagem:", e?.response?.status, e?.response?.data ?? e?.message);
        throw e;
    }
}
