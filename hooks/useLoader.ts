import { LoaderContext } from "@/contexts/loaderContext";
import { useContext } from "react";

export const useLoader = () => {
    return useContext(LoaderContext);
}