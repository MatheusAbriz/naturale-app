import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast } from "@backpackapp-io/react-native-toast";
import { useAuth } from "@/stores/auth-store";
import { useFooter } from "@/stores/hide-footer-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

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

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      const { setFooter } = useFooter.getState();
      setFooter(false);
      useAuth.getState().logout();
      toast("Sessão expirada, faça login novamente!");
    }

    return Promise.reject(error);
  }
);

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