import { LoaderProvider } from "@/contexts/loaderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthContextProvider } from "@/contexts/authContext";
import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <GluestackUIProvider mode="dark">
      <QueryClientProvider client={queryClient}>
        <LoaderProvider>
          <AuthContextProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </AuthContextProvider>
        </LoaderProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}

// function RootContent() {
//   const { loading } = useLoader();
//   const { isAuthenticated } = useAuth();
//   console.warn(isAuthenticated);

//   return (
//     <>
//       {loading && <Loader />}
//       <Stack screenOptions={{ headerShown: false }}>
//         {isAuthenticated ? (
//           <Stack.Screen name="(home)/index" />
//         ) : (
//           <Stack.Screen name="(login)/index" />
//         )}
//       </Stack>
//     </>
//   );
// }
