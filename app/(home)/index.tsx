import { PostCard } from "@/components/card";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/skeleton";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { getPosts } from "@/services/PostService";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  // TODO: Ver possibilidade de caching mais avançado
  const { user } = useAuth();
  const { data: posts, isFetching } = useApi({
    queryFn: getPosts,
    queryKey: ["posts", user?.id]
  });

  
  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {isFetching ? (
            <Skeleton count={6}/>
          ) : (
            posts?.data?.map((post) => (
              <PostCard key={post.postId} post={post} />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
}
