import { PostCard } from "@/components/card";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/skeleton";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { getPosts } from "@/services/PostService";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  // TODO: Ver possibilidade de caching mais avançado
  const { user } = useAuth();
  const { data: posts, isFetching, isLoading, refetch } = useApi({
    queryFn: getPosts,
    queryKey: ["posts", user?.id],
    staleTime: 60 * 1000, // 1 minuto
    gcTime: 15 * 60 * 1000 // 15 minutos
  });

  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList 
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 60 }}
          data={isLoading ? Array(6).fill({}) : posts?.data ?? []}
          keyExtractor={(item, index) => 
            isLoading ? index?.toString() : item?.postId?.toString()
          }
          renderItem={({ item }) => 
            isLoading ? (
              <Skeleton />
            ) : (
              <PostCard post={item} />
            )
          }
          refreshing={isFetching}
          onRefresh={refetch}
        />
      </SafeAreaView>
    </ProtectedRoute>
  );
}