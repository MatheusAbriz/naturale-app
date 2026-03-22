import { LoaderProvider } from "@/contexts/loaderContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { AuthContextProvider } from "@/contexts/authContext";
import "@/global.css";
import { useAuth } from "@/hooks/useAuth";
import { useLoader } from "@/hooks/useLoader";
import { useFooter } from "@/stores/hide-footer-store";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    },
  },
});

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="dark">
      <QueryClientProvider client={queryClient}>
        <LoaderProvider>
          <AuthContextProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
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
  const footer = useFooter((state) => state.footer);

  return (
    <>
      {loading && <Loader />}
      <Stack 
        screenOptions={{ headerShown: false }}
        />
      {(isAuthenticated && footer) && <Footer />}
    </>
  );
}
