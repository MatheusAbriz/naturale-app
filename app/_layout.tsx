import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useFooter } from "@/stores/hide-footer-store";
import { useLoader } from "@/stores/loader-store";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { Stack, usePathname } from "expo-router";
import { useAuth } from "@/stores/auth-store";
import { CreatePost } from "@/components/createPost";
import { useSearch } from "@/stores/search-store";
import { IconSearch } from "@/components/icon-search";

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootContent />
          <Toasts />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}

function RootContent() {
  const pathname = usePathname();
  const loading = useLoader((state) => state.loading);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const footer = useFooter((state) => state.footer);
  const search = useSearch((state) => state.search);

  return (
    <>
      {loading && <Loader />}
      <Stack
        screenOptions={{ headerShown: false }}
      />
      {(isAuthenticated && search) && <IconSearch />}
      {(isAuthenticated && !pathname.includes("postForm")) && <CreatePost />}
      {(isAuthenticated && footer) && <Footer />}
    </>
  );
}
