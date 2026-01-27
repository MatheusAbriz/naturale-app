import { Loader } from "@/components/loader";
import { LoaderProvider } from "@/contexts/loaderContext";
import { useLoader } from "@/hooks/useLoader";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    
    <GluestackUIProvider mode="dark">
      <QueryClientProvider client={queryClient}>
        <LoaderProvider>
          <RootContent/>
        </LoaderProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  
  );
};

function RootContent(){
  const { loading } = useLoader();
  const { isAuthenticated } = useAuth();

  return(<>
    {loading && <Loader/>}
    <Stack screenOptions={{ headerShown: false }}>
    {isAuthenticated ? (
        <Stack.Screen name="(home)/index"/>
    ) : (
      <Stack.Screen name="(login)/index"/>
    )}
    </Stack>
  </>)
}