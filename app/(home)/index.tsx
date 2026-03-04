import { PostCard } from "@/components/card";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UserRoles } from "@/enums/AuthEnums";
import { Posts } from "@/types/posts/PostTypes";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  //TODO: Ver possibilidade de caching mais avançado
  // const { data: posts, isFetching } = useApi({
  //   queryFn: getPosts,
  //   queryKey: ["posts"]
  // });
  // const isLoading = isFetching && posts?.total! === 0;
  const isLoading = false;
  const posts: Posts[] = [
  {
    postId: 1,
    title: "Bolo de Chocolate Cremoso",
    text: "Uma receita simples e deliciosa de bolo de chocolate com cobertura cremosa.",
    ingredients: "Farinha, Açúcar, Chocolate em pó, Ovos, Leite, Manteiga",
    image: "mock-image-1.jpg",
    time: "45 min",
    likes_count: 124,
    status: true,
    user: {
      id: 10,
      name: "Mariana Silva",
      username: "marisilva",
      avatar: "mock-avatar-1.jpg",
      type: UserRoles.USER
    }
  },
  {
    postId: 2,
    title: "Macarrão ao Molho Pesto",
    text: "Aprenda a fazer um pesto tradicional italiano em poucos minutos.",
    ingredients: "Macarrão, Manjericão, Azeite, Alho, Nozes, Parmesão",
    image: "mock-image-2.jpg",
    time: "25 min",
    likes_count: 89,
    status: true,
    user: {
      id: 11,
      name: "Carlos Mendes",
      username: "carlmendes",
      avatar: "mock-avatar-2.jpg",
      type: UserRoles.USER
    }
  },
  {
    postId: 3,
    title: "Panqueca Americana",
    text: "Panquecas fofinhas perfeitas para o café da manhã.",
    ingredients: "Farinha, Leite, Ovos, Açúcar, Fermento, Manteiga",
    image: "mock-image-3.jpg",
    time: "20 min",
    likes_count: 56,
    status: true,
    user: {
      id: 12,
      name: "Juliana Rocha",
      username: "juju_rocha",
      avatar: "mock-avatar-3.jpg",
      type: UserRoles.USER
    }
  },
  {
    postId: 4,
    title: "Hambúrguer Artesanal",
    text: "Hambúrguer suculento feito em casa com ingredientes frescos.",
    ingredients: "Carne moída, Sal, Pimenta, Queijo, Pão, Alface, Tomate",
    image: "mock-image-4.jpg",
    time: "35 min",
    likes_count: 210,
    status: true,
    user: {
      id: 13,
      name: "Rafael Souza",
      username: "rafa_souza",
      avatar: "mock-avatar-4.jpg",
      type: UserRoles.USER
    }
  },
  {
    postId: 5,
    title: "Salada Fitness Completa",
    text: "Uma salada nutritiva e equilibrada para o dia a dia.",
    ingredients: "Alface, Rúcula, Frango grelhado, Tomate, Cenoura, Quinoa",
    image: "mock-image-5.jpg",
    time: "15 min",
    likes_count: 73,
    status: false,
    user: {
      id: 14,
      name: "Fernanda Lima",
      username: "fernandalima",
      avatar: "mock-avatar-5.jpg",
      type: UserRoles.USER
    }
  }
];
  
  return (
    <ProtectedRoute>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {isLoading ? (
            // TODO: Implementar Skeleton
            <Text>Carregando...</Text>
          ) : (
            posts?.map((post) => (
              <PostCard post={post} />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ProtectedRoute>
  );
}
