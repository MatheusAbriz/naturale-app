import { Loader } from "@/components/loader";
import { LoaderProvider } from "@/contexts/loaderContext";
import { useLoader } from "@/hooks/useLoader";
import { Stack } from "expo-router";

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
  return (
    
    <GluestackUIProvider mode="dark">
      <LoaderProvider>
      <RootContent/>
    </LoaderProvider>
    </GluestackUIProvider>
  
  );
};

function RootContent(){
  const { loading } = useLoader();

  return(<>
    {loading && <Loader/>}
    <Stack screenOptions={{ headerShown: false }}/>
  </>)
}