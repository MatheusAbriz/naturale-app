import { Loader } from "@/components/loader";
import { LoaderProvider } from "@/contexts/loaderContext";
import { useLoader } from "@/hooks/useLoader";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LoaderProvider>
      <RootContent/>
    </LoaderProvider>
  );
};

function RootContent(){
  const { loading } = useLoader();

  return(<>
    {loading && <Loader/>}
    <Stack screenOptions={{ headerShown: false }}/>
  </>)
}