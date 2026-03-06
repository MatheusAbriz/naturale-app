import { LoaderProvider } from "@/contexts/loaderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthContextProvider } from "@/contexts/authContext";
import "@/global.css";
import { useAuth } from "@/hooks/useAuth";
import { useLoader } from "@/hooks/useLoader";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <GluestackUIProvider mode="dark">
      <QueryClientProvider client={queryClient}>
        <LoaderProvider>
          <AuthContextProvider>
            <GestureHandlerRootView>
              <RootContent />
              <Toasts />
            </GestureHandlerRootView>
          </AuthContextProvider>
        </LoaderProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}

function RootContent() {
  const { loading } = useLoader();
  const { isAuthenticated } = useAuth();

  return (
    <>
      {loading && <Loader />}
      <Stack 
        screenOptions={{ headerShown: false }}
        />
      {isAuthenticated && <Footer />}
    </>
  );
}
