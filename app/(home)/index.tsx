import { PostCard } from "@/components/card";
import Comment from "@/components/comment";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/skeleton";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { getPosts } from "@/services/PostService";
import { useFooter } from "@/stores/hide-footer-store";
import { Posts } from "@/types/posts/PostTypes";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  // TODO: Ver possibilidade de caching mais avançado
  const { user } = useAuth();
  const showFooter = useFooter((state) => state.setFooter);
  const { data: posts, isFetching, isLoading, refetch } = useApi({
    queryFn: getPosts,
    queryKey: ["posts", user?.id],
    enabled: !!user,
    staleTime: 60 * 1000, // 1 minuto
    gcTime: 15 * 60 * 1000 // 15 minutos
  });
  const [selectedPost, setSelectedPost] = useState<Posts | null>(null);
  
  const handleOpenComments = useCallback((post: Posts) => {
    showFooter(false);
    setSelectedPost(post);
  }, []);

  const handleCloseComments = useCallback(() => {
    showFooter(true);
    setSelectedPost(null);
  }, []);

  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList 
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 60 }}
          data={isLoading ? Array(6).fill({}) : posts?.data ?? []}
          keyExtractor={(item, index) => 
            isLoading ? index?.toString() : item?.post_id?.toString()
          }
          renderItem={({ item }) => 
            isLoading ? (
              <Skeleton />
            ) : (
              <PostCard post={item} onSuccess={refetch} onOpenComments={handleOpenComments}/>
            )
          }
          refreshing={isFetching}
          onRefresh={refetch}
        />
      </SafeAreaView>
      <Comment
        post={selectedPost}
        isOpen={!!selectedPost}
        onClose={handleCloseComments}
      />
    </ProtectedRoute>
  );
}