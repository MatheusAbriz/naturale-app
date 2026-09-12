import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/skeleton";
import { EmptyList } from "@/components/notFound";
import { theme } from "@/globals/theme";
import { getMyProfile, getPublicProfile } from "@/services/AuthService";
import { useAuth } from "@/stores/auth-store";
import { UserProfile, UserSimpleDetails } from "@/types/auth";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import IonIcon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    AvatarImage,
    BackButton,
    Container,
    EditButton,
    Header,
    InfoArea,
    InfoRow,
    InfoText,
    Name,
    Username,
} from "@/styles/profile";

const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";

export default function Profile() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { user } = useAuth.getState();
    const isOwnProfile = Number(id) === user?.id;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["profile", Number(id)],
        queryFn: async () => {
            if (isOwnProfile) {
                const res = await getMyProfile(id);
                return res.data as UserProfile;
            }
            const res = await getPublicProfile(id);
            return res.data as UserSimpleDetails;
        },
        enabled: !!id,
    });

    if (isLoading) return <Skeleton />;

    if (isError || !data) {
        return <EmptyList />;
    }

    const phone = isOwnProfile ? (data as UserProfile).phone : undefined;
    const email = isOwnProfile ? (data as UserProfile).email : undefined;

    return (
        <ProtectedRoute>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.white }} edges={["bottom"]}>
                <Container>
                    <BackButton onPress={() => router.back()}>
                        <IonIcon name="arrow-back" size={20} color={theme.colors.white} />
                    </BackButton>

                    {isOwnProfile && (
                        <EditButton onPress={() => router.push("/profile/edit")}>
                            <IonIcon name="create-outline" size={20} color={theme.colors.white} />
                        </EditButton>
                    )}

                    <Header>
                        <AvatarImage source={{ uri: data.avatar || FALLBACK_AVATAR }} />
                        <Name>{data.name}</Name>
                        <Username>@{data.username}</Username>
                    </Header>

                    {isOwnProfile && (
                        <InfoArea>
                            {!!email && (
                                <InfoRow>
                                    <IonIcon name="mail-outline" size={18} color={theme.colors.lightGreen} />
                                    <InfoText>{email}</InfoText>
                                </InfoRow>
                            )}
                            {!!phone && (
                                <InfoRow>
                                    <IonIcon name="call-outline" size={18} color={theme.colors.lightGreen} />
                                    <InfoText>{phone}</InfoText>
                                </InfoRow>
                            )}
                        </InfoArea>
                    )}
                </Container>
            </SafeAreaView>
        </ProtectedRoute>
    );
}
