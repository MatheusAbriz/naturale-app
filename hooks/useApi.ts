import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import Constants from "expo-constants";
import { toast } from "@backpackapp-io/react-native-toast";
import { useAuth } from "@/stores/auth-store";

const API_URL = Constants.expoConfig?.extra?.API_URL;

export const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const { user } = useAuth.getState();
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const message =
//       error.response?.data?.message || "Erro na requisição";

//     if (error.response?.status === 403) {
//       useAuth.getState().logout();
//       toast("Sessão expirada, faça login novamente!");
//     } else {
//       toast(message);
//     }

//     return Promise.reject(error);
//   }
// );

type UseQueryApiProps<T> = {
  queryKey: any[];
  queryFn: () => Promise<AxiosResponse<T>>;
  enabled?: boolean;
  staleTime?: number;
  gcTime?: number;
};

export function useApi<T>({
  queryKey,
  queryFn,
  enabled = true,
  staleTime,
  gcTime,
}: UseQueryApiProps<T>): UseQueryResult<T> & {
  request: () => Promise<any>;
} {
  const { user } = useAuth();

  const query = useQuery({
    queryKey,
    queryFn,
    enabled: enabled && !!user?.token,
    staleTime,
    gcTime,
    select: (res: AxiosResponse<T>) => res.data,
  });

  return {
    ...query,
    request: query.refetch,
  };
}